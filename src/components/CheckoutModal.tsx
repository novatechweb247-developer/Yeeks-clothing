import { useState } from 'react';
import { X, MessageCircle, ShieldCheck } from 'lucide-react';
import { CartItem, StoreInfo } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  storeInfo: StoreInfo;
  onOrderComplete: (orderData: any) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  storeInfo,
  onOrderComplete
}: CheckoutModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

  const merchandiseSubtotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || !city || !state) {
      alert('Please fill in all required delivery details.');
      return;
    }

    // Format WhatsApp Message
    let itemsText = cart
      .map(
        (item) =>
          `• ${item.product.name} (${item.selectedSize}, ${item.selectedColor}) — Qty: ${item.quantity} — ${formatNaira(
            (item.product.salePrice || item.product.price) * item.quantity
          )}`
      )
      .join('\n');

    const message = `Hello ${storeInfo.name}, I would like to place an order.

Customer Name: ${customerName}
Phone: ${phone}
Delivery Address: ${address}, ${city}, ${state}
${notes ? `Delivery Notes: ${notes}` : ''}

Items:
${itemsText}

Merchandise Subtotal: ${formatNaira(merchandiseSubtotal)}

Please confirm availability and delivery details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${storeInfo.whatsappNumber}?text=${encodedMessage}`;

    const orderRecord = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customerName,
      phone,
      address: `${address}, ${city}, ${state}`,
      notes,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        size: item.selectedSize,
        color: item.selectedColor,
        quantity: item.quantity,
        price: item.product.salePrice || item.product.price
      })),
      totalAmount: merchandiseSubtotal,
      date: new Date().toISOString(),
      status: 'Pending WhatsApp Confirmation' as const
    };

    onOrderComplete(orderRecord);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] shadow-2xl p-6 sm:p-10 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#171717] hover:text-[#C5A36A]"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-2">
            Secure Order Processing
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            Complete Your Order
          </h2>
          <p className="text-xs text-[#77736D] mt-1">
            Orders are confirmed directly through WhatsApp with our boutique concierge.
          </p>
        </div>

        {/* Order Summary Box */}
        <div className="bg-white border border-[#E9DFD1] p-4 mb-6">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717] mb-3">
            Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs text-[#77736D]">
                <span>
                  {item.quantity}x {item.product.name} ({item.selectedSize}, {item.selectedColor})
                </span>
                <span className="font-semibold text-[#171717]">
                  {formatNaira((item.product.salePrice || item.product.price) * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E9DFD1] mt-3 pt-3 flex justify-between text-sm font-bold text-[#171717]">
            <span>Merchandise Subtotal</span>
            <span className="text-[#C5A36A]">{formatNaira(merchandiseSubtotal)}</span>
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmitOrder} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Amina Yusuf"
                className="w-full bg-white border border-[#E9DFD1] p-3 text-sm focus:outline-none focus:border-[#C5A36A]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 08012345678"
                className="w-full bg-white border border-[#E9DFD1] p-3 text-sm focus:outline-none focus:border-[#C5A36A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-1">
              Delivery Address *
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 14 Victoria Island Road"
              className="w-full bg-white border border-[#E9DFD1] p-3 text-sm focus:outline-none focus:border-[#C5A36A]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Lagos"
                className="w-full bg-white border border-[#E9DFD1] p-3 text-sm focus:outline-none focus:border-[#C5A36A]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-1">
                State *
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Lagos State"
                className="w-full bg-white border border-[#E9DFD1] p-3 text-sm focus:outline-none focus:border-[#C5A36A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-1">
              Delivery Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please deliver between 10am - 4pm"
              className="w-full bg-white border border-[#E9DFD1] p-3 text-sm focus:outline-none focus:border-[#C5A36A]"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Send Order via WhatsApp & Confirm
            </button>
            <p className="text-[11px] text-[#77736D] text-center mt-3 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#C5A36A]" /> No upfront online payment required. Pay upon confirmation.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
