import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CustomerUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: string;
  city?: string;
  ordersCount?: number;
  totalSpent?: number;
};

type AuthContextType = {
  user: CustomerUser | null;
  loading: boolean;
  login: (email: string, password?: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { name: string; email: string; password?: string; phone?: string; address?: string; city?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalMessage: string;
  openAuthModal: (message?: string) => void;
  closeAuthModal: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(() => {
    try {
      const stored = localStorage.getItem("shopco_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMessage, setAuthModalMessage] = useState("");

  useEffect(() => {
    if (user) {
      localStorage.setItem("shopco_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("shopco_user");
    }
  }, [user]);

  function openAuthModal(message = "") {
    setAuthModalMessage(message);
    setIsAuthModalOpen(true);
  }

  function closeAuthModal() {
    setIsAuthModalOpen(false);
    setAuthModalMessage("");
  }

  async function login(email: string, password?: string, name?: string) {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }
      setUser(data.customer);
      closeAuthModal();
      return { success: true };
    } catch (err: any) {
      // Offline fallback
      const fallbackUser: CustomerUser = {
        id: "cust-" + Date.now().toString(36),
        name: name || email.split("@")[0],
        email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}`,
      };
      setUser(fallbackUser);
      closeAuthModal();
      return { success: true };
    } finally {
      setLoading(false);
    }
  }

  async function register(formData: {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    address?: string;
    city?: string;
  }) {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }
      setUser(data.customer);
      closeAuthModal();
      return { success: true };
    } catch (err: any) {
      const fallbackUser: CustomerUser = {
        id: "cust-" + Date.now().toString(36),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.name)}`,
      };
      setUser(fallbackUser);
      closeAuthModal();
      return { success: true };
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthModalOpen,
        authModalMessage,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
