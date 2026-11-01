import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router";
import { SlidersHorizontal, ChevronDown, ChevronRight, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { COLORS, type Product } from "../data";
import { useProducts } from "../productContext";

const TYPES   = ["T-shirts", "Shirts", "Jeans", "Shorts"];
const STYLES  = ["Casual", "Formal", "Party", "Gym"];
const SORT_OPTIONS = ["Most Popular", "Newest", "Price: Low to High", "Price: High to Low"];

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer py-1">
      <span className="text-sm text-gray-700">{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 cursor-pointer" />
    </label>
  );
}

function Section({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100 pb-4">
      <button
        className="flex w-full items-center justify-between py-3 font-bold text-base select-none"
        onClick={onToggle}
      >
        {title}
        <ChevronDown size={18} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="flex flex-col gap-1 mt-1">{children}</div>}
    </div>
  );
}

const RANGE_STYLE = `
  .rs { position:absolute; width:100%; height:0; top:50%; outline:none; background:transparent; -webkit-appearance:none; appearance:none; pointer-events:none; }
  .rs::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; border-radius:50%; background:#000; cursor:pointer; pointer-events:all; border:2px solid #fff; box-shadow:0 0 0 1.5px #000; margin-top:-10px; }
  .rs::-moz-range-thumb { width:20px; height:20px; border-radius:50%; background:#000; cursor:pointer; pointer-events:all; border:2px solid #fff; box-shadow:0 0 0 1.5px #000; }
  .rs::-webkit-slider-runnable-track { height:0; }
  .rs::-moz-range-track { height:0; background:transparent; }
`;

function RangeSlider({ min, max, value, onChange }: {
  min: number; max: number; value: [number, number]; onChange: (v: [number, number]) => void;
}) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="py-6 px-1">
      <style>{RANGE_STYLE}</style>
      <div className="relative mx-2" style={{ height: "4px" }}>
        {/* Track */}
        <div className="absolute inset-0 rounded-full bg-gray-200" />
        {/* Active fill */}
        <div
          className="absolute top-0 bottom-0 rounded-full bg-black"
          style={{ left: `${pct(value[0])}%`, right: `${100 - pct(value[1])}%` }}
        />
        {/* Min thumb — raise z-index when near max so it stays reachable */}
        <input
          type="range" className="rs" min={min} max={max} value={value[0]}
          onChange={e => onChange([Math.min(+e.target.value, value[1] - 20), value[1]])}
          style={{ zIndex: value[0] >= value[1] - 20 ? 5 : 3 }}
        />
        {/* Max thumb */}
        <input
          type="range" className="rs" min={min} max={max} value={value[1]}
          onChange={e => onChange([value[0], Math.max(+e.target.value, value[0] + 20)])}
          style={{ zIndex: 4 }}
        />
      </div>
      <div className="flex justify-between mt-6 text-sm font-medium text-gray-700">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
}

function Sidebar({ onClose, onApply, initial }: {
  onClose?: () => void;
  onApply: (f: Filters) => void;
  initial: Filters;
}) {
  const [open, setOpen] = useState({ type: true, price: true, colors: true, style: true });
  const [f, setF] = useState<Filters>(initial);

  function toggle(key: keyof typeof open) {
    setOpen(p => ({ ...p, [key]: !p[key] }));
  }

  function toggleType(t: string) {
    setF(p => ({ ...p, types: p.types.includes(t) ? p.types.filter(x => x !== t) : [...p.types, t] }));
  }

  function toggleStyle(s: string) {
    setF(p => ({ ...p, styles: p.styles.includes(s) ? p.styles.filter(x => x !== s) : [...p.styles, s] }));
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-xl">Filters</span>
        <div className="flex gap-2">
          <button onClick={() => setF({ types: [], styles: [], price: [0, 500], color: "" })} className="text-xs text-gray-500 hover:text-black">Reset</button>
          {onClose && <button onClick={onClose}><X size={20} /></button>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-0">
        <Section title="Type" open={open.type} onToggle={() => toggle("type")}>
          {TYPES.map(t => (
            <CheckRow key={t} label={t} checked={f.types.includes(t)} onChange={() => toggleType(t)} />
          ))}
        </Section>

        <Section title="Price" open={open.price} onToggle={() => toggle("price")}>
          <RangeSlider min={0} max={500} value={f.price} onChange={v => setF(p => ({ ...p, price: v }))} />
        </Section>

        <Section title="Colors" open={open.colors} onToggle={() => toggle("colors")}>
          <div className="flex flex-wrap gap-2 mt-2">
            {COLORS.map(c => (
              <button
                key={c.key}
                title={c.label}
                onClick={() => setF(p => ({ ...p, color: p.color === c.key ? "" : c.key }))}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${c.bg} ${f.color === c.key ? "ring-2 ring-offset-1 ring-black scale-110" : "hover:scale-110"}`}
              >
                {f.color === c.key && (
                  <svg className="w-4 h-4 text-white drop-shadow" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Dress Style" open={open.style} onToggle={() => toggle("style")}>
          {STYLES.map(s => (
            <CheckRow key={s} label={s} checked={f.styles.includes(s)} onChange={() => toggleStyle(s)} />
          ))}
        </Section>
      </div>

      <button
        onClick={() => onApply(f)}
        className="mt-6 w-full bg-black text-white rounded-full py-3 font-bold text-sm hover:bg-gray-800 transition-colors"
      >
        Apply Filter
      </button>
    </div>
  );
}

type Filters = { types: string[]; styles: string[]; price: [number, number]; color: string };

function applyFilters(products: Product[], f: Filters, q: string): Product[] {
  return products.filter(p => {
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (f.types.length && !f.types.includes(p.type)) return false;
    if (f.styles.length && !f.styles.includes(p.style) && !f.styles.includes(p.style2)) return false;
    if (p.cost < f.price[0] || p.cost > f.price[1]) return false;
    if (f.color && p.colors && !p.colors.includes(f.color)) return false;
    return true;
  });
}

export default function Shop() {
  const [params] = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [sortOpen, setSortOpen] = useState(false);

  const styleParam = params.get("style") ?? "";
  const saleParam  = params.get("sale")  === "true";
  const qParam     = params.get("q")     ?? "";

  const [filters, setFilters] = useState<Filters>({
    types: [],
    styles: styleParam ? [styleParam] : [],
    price: [0, 500],
    color: "",
  });

  useEffect(() => {
    if (styleParam) setFilters(f => ({ ...f, styles: [styleParam] }));
  }, [styleParam]);

  const { shopProducts: liveProducts } = useProducts();

  let products = applyFilters(saleParam ? liveProducts.filter(p => p.discount > 0) : liveProducts, filters, qParam);

  if (sort === "Price: Low to High") products = [...products].sort((a, b) => a.cost - b.cost);
  if (sort === "Price: High to Low") products = [...products].sort((a, b) => b.cost - a.cost);
  if (sort === "Newest") products = [...products].reverse();

  const handleApply = useCallback((f: Filters) => {
    setFilters(f);
    setMobileOpen(false);
  }, []);

  const activeCount = filters.types.length + filters.styles.length + (filters.color ? 1 : 0) +
    (filters.price[0] > 0 || filters.price[1] < 500 ? 1 : 0);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-black font-medium">Shop</span>
        {styleParam && <><ChevronRight size={14} /><span className="text-black font-medium">{styleParam}</span></>}
      </div>

      <div className="flex gap-6">
        {/* Sidebar desktop */}
        <aside className="hidden lg:flex flex-col w-[280px] flex-shrink-0 border border-gray-200 rounded-2xl p-5 h-fit sticky top-24">
          <Sidebar onApply={handleApply} initial={filters} />
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <h1 className="font-black text-2xl sm:text-3xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {styleParam || (saleParam ? "On Sale" : "All Products")}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Showing 1-{products.length} of {products.length} Products</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Mobile filter btn */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeCount > 0 && <span className="bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">{activeCount}</span>}
              </button>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  {sort} <ChevronDown size={14} className={sortOpen ? "rotate-180" : ""} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-20 min-w-[200px]">
                    {SORT_OPTIONS.map(o => (
                      <button
                        key={o}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${sort === o ? "font-bold" : ""}`}
                        onClick={() => { setSort(o); setSortOpen(false); }}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeCount > 0 && (
            <div className="flex gap-2 flex-wrap mb-4">
              {filters.types.map(t => (
                <span key={t} className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm">
                  {t}
                  <button onClick={() => setFilters(f => ({ ...f, types: f.types.filter(x => x !== t) }))} className="ml-1 hover:text-red-500"><X size={12} /></button>
                </span>
              ))}
              {filters.styles.map(s => (
                <span key={s} className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm">
                  {s}
                  <button onClick={() => setFilters(f => ({ ...f, styles: f.styles.filter(x => x !== s) }))} className="ml-1 hover:text-red-500"><X size={12} /></button>
                </span>
              ))}
            </div>
          )}

          {/* Grid */}
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <p className="text-lg font-medium">Sorry, nothing here...</p>
              <button onClick={() => setFilters({ types: [], styles: [], price: [0, 500], color: "" })} className="mt-4 text-sm underline hover:text-black">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </main>
      </div>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-white z-50 p-5 overflow-y-auto shadow-xl">
            <Sidebar onClose={() => setMobileOpen(false)} onApply={handleApply} initial={filters} />
          </div>
        </>
      )}
    </div>
  );
}
