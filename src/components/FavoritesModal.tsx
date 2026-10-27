import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function FavoritesModal({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onAddToCart,
  onSelectProduct
}: FavoritesModalProps) {
  if (!isOpen) return null;

  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-[#E9DFD1] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-[#C5A36A] fill-current" />
                <h2 className="font-serif text-lg font-bold text-[#171717]">
                  Saved Favorites ({favorites.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#171717] hover:text-[#C5A36A]"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {favorites.length === 0 ? (
                <div className="text-center py-20">
                  <Heart className="w-12 h-12 text-[#77736D]/40 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-bold text-[#171717] mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-sm text-[#77736D] mb-6">
                    Tap the heart icon on any garment to save your favorites.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-[#171717] text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A36A] transition-colors"
                  >
                    Explore Catalogue
                  </button>
                </div>
              ) : (
                favorites.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-4 bg-white border border-[#E9DFD1]/60"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-24 object-cover object-center bg-[#FAF7F2] cursor-pointer"
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4
                            onClick={() => {
                              onSelectProduct(product);
                              onClose();
                            }}
                            className="font-serif text-sm font-semibold text-[#171717] cursor-pointer hover:text-[#C5A36A] line-clamp-1"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveFavorite(product)}
                            className="text-[#77736D] hover:text-red-600"
                            aria-label="Remove favorite"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-xs text-[#77736D] block mt-1">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-bold text-[#171717]">
                          {formatNaira(product.salePrice || product.price)}
                        </span>
                        <button
                          onClick={() => {
                            onAddToCart(product);
                            onClose();
                          }}
                          className="bg-[#171717] hover:bg-[#C5A36A] text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
