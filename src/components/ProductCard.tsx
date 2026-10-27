import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onQuickView,
  onSelectProduct,
  onAddToCart
}: ProductCardProps) {
  const formatNaira = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div className="group flex flex-col bg-white border border-[#E9DFD1]/60 transition-smooth hover:shadow-lg">
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF7F2] cursor-pointer">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          onClick={() => onSelectProduct(product)}
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            onClick={() => onSelectProduct(product)}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="bg-[#171717] text-[#FAF7F2] text-[10px] uppercase tracking-widest px-2 py-1 font-semibold">
              New
            </span>
          )}
          {product.salePrice && (
            <span className="bg-[#C5A36A] text-white text-[10px] uppercase tracking-widest px-2 py-1 font-semibold">
              Sale
            </span>
          )}
          {product.isBestSeller && !product.salePrice && (
            <span className="bg-[#C5A36A] text-white text-[10px] uppercase tracking-widest px-2 py-1 font-semibold">
              Best Seller
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-colors z-10 ${
            isFavorite
              ? 'bg-[#C5A36A] text-white'
              : 'bg-white/80 backdrop-blur-sm text-[#171717] hover:bg-[#C5A36A] hover:text-white'
          }`}
          aria-label="Save to Favorites"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Quick actions overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 bg-white/90 hover:bg-white text-[#171717] py-2.5 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 backdrop-blur-sm shadow-sm transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-[#171717] hover:bg-[#C5A36A] text-white p-2.5 transition-colors"
            aria-label="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#77736D] mb-1">
          {product.category}
        </span>
        <h3
          onClick={() => onSelectProduct(product)}
          className="font-serif text-base font-semibold text-[#171717] mb-2 cursor-pointer hover:text-[#C5A36A] transition-colors line-clamp-1"
        >
          {product.name}
        </h3>
        <div className="mt-auto flex items-center gap-3">
          {product.salePrice ? (
            <>
              <span className="text-sm font-bold text-[#171717]">
                {formatNaira(product.salePrice)}
              </span>
              <span className="text-xs text-[#77736D] line-through">
                {formatNaira(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-[#171717]">
              {formatNaira(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
