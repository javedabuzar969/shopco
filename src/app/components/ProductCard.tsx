import { useNavigate } from "react-router";
import Stars from "./Stars";
import { imgUrl } from "../data";
import type { Product } from "../data";

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const sale = product.discount > 0
    ? Math.round(product.cost * (1 - product.discount / 100))
    : null;

  return (
    <div
      className="cursor-pointer group flex flex-col gap-2"
      onClick={() => navigate(`/Shop/${encodeURIComponent(product.name)}`)}
    >
      <div className="bg-[#F0EEED] rounded-2xl overflow-hidden aspect-square">
        <img
          src={imgUrl(product.imgKey, 400, 400)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="font-bold text-[15px] leading-snug mt-1 line-clamp-1">{product.name}</h3>
      <Stars count={product.stars} />
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-bold text-lg">${sale ?? product.cost}</span>
        {product.discount > 0 && (
          <>
            <span className="text-gray-400 line-through text-sm">${product.cost}</span>
            <span className="text-red-500 text-xs font-medium bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          </>
        )}
      </div>
    </div>
  );
}
