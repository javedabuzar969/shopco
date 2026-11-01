import { useState, useRef } from "react";
import { Link } from "react-router";
import { Trash2, ChevronRight, Tag, ShieldCheck } from "lucide-react";
import { useCart } from "../context";
import { useAuth } from "../authContext";
import CheckoutModal from "../components/CheckoutModal";
import { imgUrl } from "../data";

export default function Cart() {
  const { items, count, total, removeItem, updateQty, clearCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const [discount, setDiscount] = useState(0);
  const [promoState, setPromoState] = useState<"idle" | "ok" | "err">("idle");
  const [confirmed, setConfirmed] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const promoRef = useRef<HTMLInputElement>(null);

  function applyPromo(e: React.FormEvent) {
    e.preventDefault();
    const code = promoRef.current?.value?.trim() ?? "";
    if (code === "Moemen") { setDiscount(20); setPromoState("ok"); }
    else if (code === "MeMo") { setDiscount(100); setPromoState("ok"); }
    else { setDiscount(0); setPromoState("err"); }
  }

  function checkout() {
    if (!user) {
      openAuthModal("Please sign in or create an account to proceed with your order.");
      return;
    }
    setIsCheckoutOpen(true);
  }

  // ── Confirmed state ──────────────────────────────────────
  if (confirmed) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16 flex flex-col-reverse lg:flex-row items-center gap-12 min-h-[60vh]">
        <div className="text-center flex flex-col items-center gap-5">
          <h1 className="font-black text-3xl sm:text-5xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Thank You for Your Purchase!
          </h1>
          <p className="text-gray-500">Your order has been placed successfully.</p>
          <Link to="/Shop" className="bg-black text-white rounded-full px-9 py-3.5 font-medium hover:bg-gray-800 transition-colors">
            Go to Shop
          </Link>
        </div>
        <div className="flex-shrink-0">
          <div className="w-72 h-72 bg-green-50 rounded-full flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
              <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // ── Empty cart ───────────────────────────────────────────
  if (count === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16 flex flex-col-reverse lg:flex-row items-center gap-12 min-h-[60vh]">
        <div className="text-center flex flex-col items-center gap-5">
          <h1 className="font-black text-3xl sm:text-5xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Your Cart is Empty!
          </h1>
          <p className="text-gray-500">Must add items on the card before you proceed to checkout</p>
          <Link to="/Shop" className="bg-black text-white rounded-full px-9 py-3.5 font-medium hover:bg-gray-800 transition-colors">
            Go to Shop
          </Link>
        </div>
        <div className="flex-shrink-0">
          <div className="w-72 h-72 bg-gray-50 rounded-full flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // ── Cart with items ──────────────────────────────────────
  const discountAmt = Math.round(total * discount / 100);
  const delivery     = 15;
  const finalTotal   = total - discountAmt + delivery;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-black font-medium">Cart</span>
      </div>

      <h1 className="font-black text-3xl sm:text-4xl mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        Your Cart
      </h1>

      <div className="flex flex-wrap gap-5 items-start">
        {/* Items list */}
        <div className="flex-grow min-w-0 border border-gray-200 rounded-2xl p-5 flex flex-col gap-5">
          {items.map((item, idx) => (
            <div key={`${item.id}-${item.color}-${item.size}`}>
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="flex gap-4 flex-wrap">
                  <div className="bg-gray-100 rounded-xl w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden">
                    <img
                      src={imgUrl(item.imgKey, 200, 200)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg leading-snug max-w-[240px] truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Size: <span className="text-black font-medium">{item.size}</span></p>
                      <p className="text-sm text-gray-500">Color: <span className="text-black font-medium">{item.color}</span></p>
                    </div>
                    <span className="font-bold text-xl">${item.cost}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between gap-4">
                  <button
                    onClick={() => removeItem(item.id, item.color, item.size)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="flex items-center bg-gray-100 rounded-full select-none overflow-hidden">
                    <button
                      onClick={() => updateQty(item.id, item.color, item.size, -1)}
                      className="w-10 h-10 text-2xl flex items-center justify-center hover:bg-gray-200 transition-colors font-light"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.color, item.size, 1)}
                      className="w-10 h-10 text-2xl flex items-center justify-center hover:bg-gray-200 transition-colors font-light"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              {idx < items.length - 1 && <hr className="mt-5 border-gray-100" />}
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="border border-gray-200 rounded-2xl p-5 sm:min-w-[400px] flex-grow sm:flex-grow-0 flex flex-col gap-4">
          <h2 className="font-bold text-xl">Order Summary</h2>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold">${total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Discount (-{discount}%)</span>
              <span className="font-bold text-red-500">-${discountAmt}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery Fee</span>
              <span className="font-bold">${delivery}</span>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-black text-xl">${finalTotal}</span>
            </div>
          </div>

          {/* Promo code */}
          <form onSubmit={applyPromo} className="flex flex-col gap-2 mt-2">
            <div className="flex gap-2 flex-wrap">
              <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2.5 gap-2 min-w-[180px]">
                <Tag size={16} className="text-gray-400" />
                <input
                  ref={promoRef}
                  type="text"
                  placeholder="Add promo code"
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white rounded-full px-5 py-2.5 text-sm font-bold hover:bg-gray-800 transition-colors"
              >
                Apply
              </button>
            </div>
            {promoState === "err" && (
              <p className="text-red-500 text-xs font-medium text-center">Wrong promo code, please try again!</p>
            )}
            {promoState === "ok" && (
              <p className="text-green-600 text-xs font-medium text-center">Promo code applied successfully</p>
            )}
            {promoState === "idle" && (
              <p className="text-gray-400 text-xs text-center">Use promo code <strong className="text-black">Moemen</strong> for 20% discount</p>
            )}
          </form>

          <button
            onClick={checkout}
            className="w-full bg-black text-white rounded-full py-3.5 font-bold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            Go to Checkout
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={() => setConfirmed(true)}
        discount={discount}
      />
    </div>
  );
}
