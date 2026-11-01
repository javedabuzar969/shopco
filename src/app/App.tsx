import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router";
import { CartProvider } from "./context";
import { AuthProvider } from "./authContext";
import { ProductProvider } from "./productContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <ScrollRestoration />
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <h1
        className="font-black text-5xl sm:text-7xl text-gray-100"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        404
      </h1>
      <p className="font-bold text-xl text-gray-800">Page Not Found</p>
      <p className="text-gray-500 max-w-sm">We can't seem to find the page you are looking for.</p>
      <a
        href="/"
        className="bg-black text-white rounded-full px-9 py-3.5 font-medium hover:bg-gray-800 transition-colors"
      >
        Back to home
      </a>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
        <NotFound />
      </div>
    ),
    children: [
      { index: true,          element: <Home /> },
      { path: "Shop",         element: <Shop /> },
      { path: "Shop/:name",   element: <ProductDetail /> },
      { path: "Cart",         element: <Cart /> },
      { path: "NewArrival",   element: <Home /> },
      { path: "TopSelling",   element: <Home /> },
      { path: "OnSale",       element: <Shop /> },
      { path: "*",            element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
