import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Minus, Plus, ShoppingCart, ChevronRight } from "lucide-react";
import Stars from "../components/Stars";
import ProductCard from "../components/ProductCard";
import { findProduct, imgUrl, COLORS, SIZES } from "../data";
import { useCart } from "../context";
import { useProducts } from "../productContext";

export default function ProductDetail() {
  const { name } = useParams<{ name: string }>();
  const { addItem } = useCart();
  const { getProductByName, shopProducts } = useProducts();

  const product = getProductByName(name ?? "") || findProduct(decodeURIComponent(name ?? ""));

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize,  setSelectedSize]  = useState("");
  const [qty,           setQty]           = useState(1);
  const [added,         setAdded]         = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setSelectedColor("");
    setSelectedSize("");
    setQty(1);
    setAdded(false);
  }, [name]);

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-24 flex flex-col items-center gap-6 text-center">
        <h1 className="font-black text-4xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Product Not Found
        </h1>
        <p className="text-gray-500">We can't seem to find the page you are looking for</p>
        <Link to="/" className="bg-black text-white rounded-full px-9 py-3 font-medium hover:bg-gray-800 transition-colors">
          Back to home
        </Link>
      </div>
    );
  }

  const salePrice = product.discount > 0
    ? Math.round(product.cost * (1 - product.discount / 100))
    : null;

  const colorLabel = COLORS.find(c => c.key === selectedColor)?.label ?? "Any";

  function handleAddToCart() {
    addItem({
      id:       product.id,
      name:     product.name,
      imgKey:   product.imgKey,
      cost:     salePrice ?? product.cost,
      color:    colorLabel,
      size:     selectedSize || "Any",
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  // Related products (same type, different id)
  const related = shopProducts
    .filter(p => p.type === product.type && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link to="/Shop" className="hover:text-black transition-colors">Shop</Link>
        <ChevronRight size={14} />
        <span className="text-black font-medium truncate max-w-[200px]">{product.name}</span>
      </div>

      {/* Main layout */}
      <div className="flex flex-wrap gap-8 lg:gap-14 justify-center lg:justify-start">
        {/* Image */}
        <div className="bg-[#F0EEED] rounded-2xl flex-shrink-0 w-full sm:w-[420px] lg:w-[500px] aspect-square overflow-hidden">
          <img
            src={imgUrl(product.imgKey, 600, 600)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-[280px] flex flex-col gap-5">
          <h1 className="font-black text-2xl sm:text-4xl leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {product.name}
          </h1>

          <div className="flex items-center gap-3 flex-wrap">
            <Stars count={product.stars} size={20} />
            <span className="text-sm text-gray-500">({Math.floor(product.stars * 80)} Reviews)</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-black text-3xl">${salePrice ?? product.cost}</span>
            {product.discount > 0 && (
              <>
                <span className="text-gray-400 line-through text-xl">${product.cost}</span>
                <span className="text-red-500 text-sm font-bold bg-red-50 border border-red-100 px-3 py-1 rounded-full">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed text-sm max-w-[520px]">{product.description}</p>

          <hr className="border-gray-100" />

          {/* Color selector */}
          <div>
            <p className="font-bold text-sm mb-3">Select Colors</p>
            <div className="flex gap-2.5 flex-wrap">
              {COLORS.map(c => (
                <button
                  key={c.key}
                  title={c.label}
                  onClick={() => setSelectedColor(c.key === selectedColor ? "" : c.key)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${c.bg} ${
                    selectedColor === c.key
                      ? "ring-2 ring-offset-2 ring-black scale-110"
                      : "hover:scale-105 hover:ring-1 hover:ring-gray-300"
                  }`}
                >
                  {selectedColor === c.key && (
                    <svg className="w-4 h-4 text-white drop-shadow" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Size selector */}
          <div>
            <p className="font-bold text-sm mb-3">Choose Size</p>
            <div className="flex gap-3 flex-wrap">
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s === selectedSize ? "" : s)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    selectedSize === s
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Quantity + Add to Cart */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center bg-gray-100 rounded-full select-none overflow-hidden">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-sm transition-all ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {added ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* You might also like */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2
            className="text-center font-black text-2xl sm:text-3xl uppercase mb-8 tracking-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
