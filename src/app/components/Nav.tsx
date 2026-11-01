import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, ShoppingCart, Menu, X, ChevronDown, User, LogOut, ShieldCheck } from "lucide-react";
import { useCart } from "../context";
import { useAuth } from "../authContext";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [q, setQ] = useState("");
  const { count } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) navigate(`/Shop?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-4 flex items-center gap-5">
        <button className="lg:hidden flex-shrink-0" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link
          to="/"
          className="text-xl sm:text-2xl font-black tracking-tight flex-shrink-0"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          SHOP.CO
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium">
          <Link to="/Shop" className="flex items-center gap-1 hover:text-gray-500 transition-colors">
            Shop <ChevronDown size={14} />
          </Link>
          <Link to="/Shop?sale=true" className="hover:text-gray-500 transition-colors">On Sale</Link>
          <Link to="/Shop" className="hover:text-gray-500 transition-colors">New Arrivals</Link>
          <Link to="/Shop" className="hover:text-gray-500 transition-colors">Brands</Link>
        </nav>

        <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-[577px]">
          <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-2.5 gap-2 w-full">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              type="text"
              placeholder="Search for products..."
              className="bg-transparent outline-none text-sm flex-1 placeholder:text-gray-400"
            />
          </div>
        </form>

        <div className="flex items-center gap-3 ml-auto lg:ml-0">
          <Search size={22} className="lg:hidden cursor-pointer" onClick={() => setOpen(!open)} />
          <Link to="/Cart" className="relative cursor-pointer hover:scale-110 transition-transform">
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>

          {/* User Account / Profile Menu */}
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-xs font-semibold hidden sm:inline max-w-[100px] truncate">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown size={14} className="text-gray-500" />
              </button>
            ) : (
              <button
                onClick={() => openAuthModal()}
                className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all shadow-xs"
                title="Sign In / Register"
              >
                <User size={16} />
              </button>
            )}

            {/* Dropdown Menu */}
            {userDropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    <ShieldCheck size={11} /> Connected to Dashboard
                  </span>
                </div>

                <div className="py-1">
                  <Link
                    to="/Cart"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    <ShoppingCart size={15} /> My Cart ({count})
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium text-left"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-gray-100 px-6 pt-4 pb-6 bg-white">
          <form onSubmit={handleSearch} className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-2.5 gap-2 mb-5">
            <Search size={16} className="text-gray-400" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              type="text"
              placeholder="Search for products..."
              className="bg-transparent outline-none text-sm flex-1"
            />
          </form>
          <ul className="flex flex-col gap-4 text-[15px] font-medium">
            {[["Shop", "/Shop"], ["On Sale", "/Shop?sale=true"], ["New Arrivals", "/Shop"], ["Brands", "/Shop"]].map(([label, href]) => (
              <li key={label}>
                <Link to={href} className="hover:text-gray-500 transition-colors" onClick={() => setOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
