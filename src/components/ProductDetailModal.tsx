import { useState } from 'react';
import { X, Heart, ShoppingBag, MessageCircle, Check, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  onWhatsAppOrder: (product: Product, size: string, color: string, qty: number) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onWhatsAppOrder
}: ProductDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/80 hover:bg-white text-[#171717] rounded-full transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery */}
          <div className="p-6 md:p-8 bg-white flex flex-col gap-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF7F2]">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.salePrice && (
                <span className="absolute top-4 left-4 bg-[#C5A36A] text-white text-xs uppercase tracking-widest px-3 py-1 font-semibold">
                  Sale
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 aspect-[3/4] flex-shrink-0 overflow-hidden border-2 transition-colors ${
                      selectedImage === img ? 'border-[#C5A36A]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#77736D] font-semibold">
                  {product.category}
                </span>
                <button
                  onClick={() => onToggleFavorite(product)}
                  className={`p-2 rounded-full border transition-colors ${
                    isFavorite
                      ? 'bg-[#C5A36A] text-white border-[#C5A36A]'
                      : 'border-[#E9DFD1] text-[#171717] hover:border-[#C5A36A]'
                  }`}
                  aria-label="Favorite"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717] mb-3">
                {product.name}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-bold text-[#171717]">
                      {formatNaira(product.salePrice)}
                    </span>
                    <span className="text-base text-[#77736D] line-through">
                      {formatNaira(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-[#171717]">
                    {formatNaira(product.price)}
                  </span>
                )}
                <span className="text-xs uppercase tracking-wider px-2.5 py-1 bg-[#E9DFD1]/60 text-[#171717] font-medium">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <p className="text-sm text-[#77736D] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] mb-2">
                    Select Size: <span className="text-[#C5A36A]">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-xs uppercase font-semibold border transition-colors ${
                          selectedSize === size
                            ? 'bg-[#171717] text-white border-[#171717]'
                            : 'bg-white text-[#171717] border-[#E9DFD1] hover:border-[#C5A36A]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] mb-2">
                    Select Colour: <span className="text-[#C5A36A]">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-xs uppercase font-semibold border transition-colors ${
                          selectedColor === color
                            ? 'bg-[#171717] text-white border-[#171717]'
                            : 'bg-white text-[#171717] border-[#E9DFD1] hover:border-[#C5A36A]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] mb-2">
                  Quantity
                </label>
                <div className="flex items-center w-32 border border-[#E9DFD1] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-[#171717] hover:bg-[#FAF7F2]"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-[#171717] hover:bg-[#FAF7F2]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#E9DFD1]">
              <button
                onClick={handleAddToCartClick}
                className="w-full bg-[#171717] text-white py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A36A] transition-colors flex items-center justify-center gap-2"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#C5A36A]" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                  </>
                )}
              </button>

              <button
                onClick={() => onWhatsAppOrder(product, selectedSize, selectedColor, quantity)}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Order via WhatsApp (09037327260)
              </button>

              <div className="flex items-center justify-around pt-3 text-[11px] text-[#77736D]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#C5A36A]" /> Authenticity Guaranteed
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-[#C5A36A]" /> Prompt Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
