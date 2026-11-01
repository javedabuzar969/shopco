import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronRight, ChevronLeft, BadgeCheck } from "lucide-react";
import Stars from "../components/Stars";
import ProductCard from "../components/ProductCard";
import { testimonials } from "../data";
import { useProducts } from "../productContext";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import heroSvg from "@/imports/shop-co.image.Main-DjG-FNVr.Woblo.svg";

const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];

const dressStyles = [
  { label: "Casual", img: "photo-1662893992324-397132d77dbd", style: "Casual" },
  { label: "Formal", img: "photo-1742740265356-eb2480afad8a", style: "Formal" },
  { label: "Party",  img: "photo-1651002223348-3717f55cf6cd", style: "Party" },
  { label: "Gym",    img: "photo-1670421102344-c19b30c471f0", style: "Gym" },
];

function Star4({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <path d="M28 0C28 15.464 15.464 28 0 28C15.464 28 28 40.536 28 56C28 40.536 40.536 28 56 28C40.536 28 28 15.464 28 0Z" fill="black" />
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { newArrivals, topSelling } = useProducts();
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"new" | "top">("new");

  function scrollTestimonials(dir: "left" | "right") {
    testimonialsRef.current?.scrollBy({ left: dir === "left" ? -380 : 380, behavior: "smooth" });
  }

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-[#F2F0F1]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 grid lg:grid-cols-2 gap-0 items-end min-h-[560px]">
          <div className="pt-16 pb-10 lg:pb-0 flex flex-col gap-6">
            <h1
              className="font-black leading-none tracking-tighter text-[2.6rem] sm:text-[4rem] lg:text-[4.5rem] uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Find Clothes<br />That Matches<br />Your Style
            </h1>
            <p className="text-gray-600 text-base max-w-[440px] leading-relaxed">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <div>
              <Link
                to="/Shop"
                className="inline-block bg-black text-white rounded-full px-9 py-3.5 text-[15px] font-medium hover:bg-gray-800 transition-colors"
              >
                Shop Now
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 border-t border-black/10">
              {[["200+", "International Brands"], ["2,000+", "High-Quality Products"], ["30,000+", "Happy Customers"]].map(([num, label]) => (
                <div key={label} className="flex flex-col">
                  <span className="font-black text-2xl sm:text-3xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>{num}</span>
                  <span className="text-gray-500 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-end h-full relative">
            <div className="absolute top-8 right-16"><Star4 size={56} /></div>
            <div className="absolute top-28 left-2"><Star4 size={28} /></div>
            <ImageWithFallback
              src={heroSvg}
              alt="Man and woman wearing stylish clothes"
              className="max-h-[620px] w-full object-contain object-bottom"
            />
          </div>
        </div>
        {/* Mobile hero */}
        <div className="lg:hidden flex justify-center bg-[#F2F0F1] pb-6">
          <ImageWithFallback
            src={heroSvg}
            alt="Man and woman wearing stylish clothes"
            className="w-full max-w-sm object-contain"
          />
        </div>
      </section>

      {/* ── BRANDS STRIP ─────────────────────────────────── */}
      <section className="bg-black py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-around gap-6 flex-wrap">
          {brands.map(b => (
            <span
              key={b}
              className="text-white font-black text-xl sm:text-2xl lg:text-3xl tracking-tight whitespace-nowrap"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────── */}
      <section id="new-arrivals" className="py-14 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Tabs */}
        <div className="flex justify-center gap-10 mb-10 border-b border-gray-200">
          {(["new", "top"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-black text-2xl sm:text-3xl uppercase tracking-tight transition-all ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {tab === "new" ? "New Arrivals" : "Top Selling"}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {(activeTab === "new" ? newArrivals : topSelling).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link
            to="/Shop"
            className="border border-gray-300 rounded-full px-14 py-3 text-[15px] font-medium hover:bg-gray-50 transition-colors"
          >
            View All
          </Link>
        </div>
      </section>

      <div className="border-b border-gray-200 max-w-[1440px] mx-auto px-16" />

      {/* ── BROWSE BY DRESS STYLE ─────────────────────────  */}
      <section className="py-14 bg-[#F0F0F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <h2
            className="text-center font-black text-3xl sm:text-4xl uppercase mb-10 tracking-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Browse by Dress Style
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {dressStyles.map(({ label, img, style }) => (
              <div
                key={label}
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-40 sm:h-56"
                onClick={() => navigate(`/Shop?style=${style}`)}
              >
                <img
                  src={`https://images.unsplash.com/${img}?w=400&h=300&fit=crop&auto=format&q=80`}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <span
                  className="absolute top-4 left-4 font-black text-lg sm:text-xl bg-white/80 px-3 py-1 rounded-lg"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-16 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-10">
          <h2
            className="font-black text-3xl sm:text-4xl uppercase tracking-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Our Happy Customers
          </h2>
          <div className="flex gap-2">
            <button onClick={() => scrollTestimonials("left")} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scrollTestimonials("right")} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div
          ref={testimonialsRef}
          className="flex gap-5 overflow-x-auto pb-2 cursor-grab"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map(({ name, stars, review }) => (
            <div key={name} className="flex-shrink-0 w-[340px] border border-gray-200 rounded-2xl p-7 flex flex-col gap-3">
              <Stars count={stars} />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base">{name}</span>
                <BadgeCheck size={18} className="text-green-500" />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* spacer for footer newsletter overlap */}
      <div className="h-8 bg-white" />
    </div>
  );
}
