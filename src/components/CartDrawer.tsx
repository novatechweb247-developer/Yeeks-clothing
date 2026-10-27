import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  onWhatsAppCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onWhatsAppCheckout
}: CartDrawerProps) {
  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

  const merchandiseSubtotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
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
              {/* Header */}
              <div className="p-6 border-b border-[#E9DFD1] flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[#C5A36A]" />
                  <h2 className="font-serif text-lg font-bold text-[#171717]">
                    Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-[#171717] hover:text-[#C5A36A] transition-colors"
                  aria-label="Close bag"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag className="w-12 h-12 text-[#77736D]/40 mx-auto mb-4" />
                    <h3 className="font-serif text-xl font-bold text-[#171717] mb-2">
                      Your bag is empty
                    </h3>
                    <p className="text-sm text-[#77736D] mb-6">
                      Explore our exquisite collections and find your style statement.
                    </p>
                    <button
                      onClick={onClose}
                      className="bg-[#171717] text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A36A] transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item, index) => {
                    const price = item.product.salePrice || item.product.price;
                    return (
                      <div
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                        className="flex gap-4 p-4 bg-white border border-[#E9DFD1]/60"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover object-center bg-[#FAF7F2]"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-sm font-semibold text-[#171717] line-clamp-1">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(index)}
                                className="text-[#77736D] hover:text-red-600 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-xs text-[#77736D] mt-1 space-x-2">
                              <span>Size: {item.selectedSize}</span>
                              <span>•</span>
                              <span>Colour: {item.selectedColor}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-[#E9DFD1] bg-[#FAF7F2]">
                              <button
                                onClick={() => onUpdateQuantity(index, -1)}
                                className="px-2.5 py-1 text-xs text-[#171717]"
                              >
                                -
                              </button>
                              <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(index, 1)}
                                className="px-2.5 py-1 text-xs text-[#171717]"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-sm font-bold text-[#171717]">
                              {formatNaira(price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-[#E9DFD1] space-y-4">
                  <div className="flex items-center justify-between text-sm text-[#77736D]">
                    <span>Merchandise Subtotal</span>
                    <span className="font-bold text-[#171717] text-base">
                      {formatNaira(merchandiseSubtotal)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#77736D]">
                    Delivery fees and taxes calculated at checkout or confirmed via WhatsApp.
                  </p>

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={onProceedToCheckout}
                      className="w-full bg-[#171717] hover:bg-[#C5A36A] text-white py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      Proceed to Order Form <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onWhatsAppCheckout}
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" /> Instant WhatsApp Order
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
