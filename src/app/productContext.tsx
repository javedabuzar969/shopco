import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, homeProducts as fallbackHome, shopProducts as fallbackShop, imgUrl } from "./data";

type ProductContextType = {
  products: Product[];
  homeProducts: Product[];
  shopProducts: Product[];
  newArrivals: Product[];
  topSelling: Product[];
  onSale: Product[];
  loading: boolean;
  refreshProducts: () => Promise<void>;
  getProductByName: (name: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
};

const ProductContext = createContext<ProductContextType>(null!);

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/products`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Format products to match Product type interface
          const mapped: Product[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            sku: item.sku,
            imgKey: item.imgKey || "1",
            place: item.place || "shop",
            homeType: item.homeType,
            style: item.style || "Casual",
            style2: item.style2 || "",
            type: item.type || item.category || "T-shirts",
            stars: item.stars || item.rating || 4.5,
            cost: item.cost || item.price || 120,
            discount: item.discount || 0,
            description: item.description,
            colors: item.colors || ["10", "9", "4"],
          }));
          setProducts(mapped);
          return;
        }
      }
    } catch (err) {
      console.warn("Could not fetch products from API, falling back to static:", err);
    } finally {
      setLoading(false);
    }

    // Fallback if API is offline
    const combined = [...fallbackHome];
    fallbackShop.forEach((sp) => {
      if (!combined.some((p) => p.id === sp.id)) combined.push(sp);
    });
    setProducts(combined);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtered views
  const newArrivals = products.filter((p) => p.homeType === "newarrival" || p.place === "home").slice(0, 8);
  const topSelling = products.filter((p) => p.homeType === "topselling").slice(0, 8);
  const onSale = products.filter((p) => (p.discount && p.discount > 0) || p.homeType === "onsale");

  const homeFiltered = products.filter((p) => p.place === "home" || p.place === "both");
  const shopFiltered = products; // Shop displays all products

  function getProductByName(name: string) {
    const decoded = decodeURIComponent(name).toLowerCase();
    return products.find(
      (p) => p.name.toLowerCase() === decoded || p.id.toLowerCase() === decoded
    );
  }

  function getProductById(id: string) {
    return products.find((p) => p.id === id);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        homeProducts: homeFiltered.length > 0 ? homeFiltered : products,
        shopProducts: shopFiltered,
        newArrivals: newArrivals.length > 0 ? newArrivals : products.slice(0, 4),
        topSelling: topSelling.length > 0 ? topSelling : products.slice(4, 8),
        onSale: onSale.length > 0 ? onSale : products.slice(0, 4),
        loading,
        refreshProducts: fetchProducts,
        getProductByName,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within a ProductProvider");
  return ctx;
}
