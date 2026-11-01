import { useState } from "react";
import { X, Mail, Lock, User, Phone, MapPin, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "../authContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMessage, login, register, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regCity, setRegCity] = useState("");

  if (!isAuthModalOpen) return null;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!loginEmail.trim()) {
      setError("Please enter your email");
      return;
    }
    const res = await login(loginEmail.trim(), loginPassword);
    if (!res.success) {
      setError(res.error || "Login failed");
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!regName.trim() || !regEmail.trim()) {
      setError("Please enter your full name and email");
      return;
    }
    const res = await register({
      name: regName.trim(),
      email: regEmail.trim(),
      password: regPassword,
      phone: regPhone.trim(),
      address: regAddress.trim(),
      city: regCity.trim(),
    });
    if (!res.success) {
      setError(res.error || "Registration failed");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 relative">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-6 sm:p-8 pb-4 text-center">
          <h2
            className="text-2xl sm:text-3xl font-black tracking-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            SHOP.CO
          </h2>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">
            {mode === "login" ? "Welcome Back" : "Create Customer Account"}
          </p>

          {authModalMessage && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-medium text-left flex items-start gap-2">
              <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <span>{authModalMessage}</span>
            </div>
          )}

          {/* Mode Switch Tabs */}
          <div className="flex bg-[#F0F0F0] rounded-full p-1 mt-5">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                mode === "login" ? "bg-black text-white shadow-sm" : "text-gray-600 hover:text-black"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                mode === "register" ? "bg-black text-white shadow-sm" : "text-gray-600 hover:text-black"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-6 sm:mx-8 mb-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium flex items-center gap-2">
            <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Forms */}
        <div className="p-6 sm:p-8 pt-0">
          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <div className="flex items-center bg-[#F0F0F0] rounded-2xl px-4 py-3 gap-2.5">
                  <Mail size={16} className="text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="bg-transparent outline-none text-sm w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                <div className="flex items-center bg-[#F0F0F0] rounded-2xl px-4 py-3 gap-2.5">
                  <Lock size={16} className="text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="bg-transparent outline-none text-sm w-full"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50 mt-2"
              >
                {loading ? "Signing In..." : "Sign In & Continue"}
                {!loading && <ArrowRight size={16} />}
              </button>

              <p className="text-center text-xs text-gray-500 mt-3">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="font-bold text-black underline underline-offset-2"
                >
                  Create one now
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                <div className="flex items-center bg-[#F0F0F0] rounded-2xl px-4 py-2.5 gap-2.5">
                  <User size={16} className="text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmed Khan"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="bg-transparent outline-none text-sm w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                <div className="flex items-center bg-[#F0F0F0] rounded-2xl px-4 py-2.5 gap-2.5">
                  <Mail size={16} className="text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="bg-transparent outline-none text-sm w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <div className="flex items-center bg-[#F0F0F0] rounded-2xl px-3 py-2.5 gap-2">
                    <Phone size={15} className="text-gray-400" />
                    <input
                      type="tel"
                      placeholder="0300 1234567"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="bg-transparent outline-none text-xs w-full"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                  <div className="flex items-center bg-[#F0F0F0] rounded-2xl px-3 py-2.5 gap-2">
                    <MapPin size={15} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Karachi / Lahore"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      className="bg-transparent outline-none text-xs w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Shipping Address</label>
                <input
                  type="text"
                  placeholder="Street address, house number"
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  className="bg-[#F0F0F0] rounded-2xl px-4 py-2.5 text-xs w-full outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Create Password</label>
                <div className="flex items-center bg-[#F0F0F0] rounded-2xl px-4 py-2.5 gap-2.5">
                  <Lock size={16} className="text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="bg-transparent outline-none text-sm w-full"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50 mt-2"
              >
                {loading ? "Creating Account..." : "Register & Start Shopping"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
