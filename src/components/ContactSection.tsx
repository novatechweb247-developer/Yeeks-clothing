import { Phone, MessageCircle, ShoppingBag, MapPin } from 'lucide-react';
import { StoreInfo } from '../types';

interface ContactSectionProps {
  storeInfo: StoreInfo;
  onExploreShop: () => void;
}

export default function ContactSection({ storeInfo, onExploreShop }: ContactSectionProps) {
  const whatsappUrl = `https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(
    'Hello Yeeks Clothing Enterprise, I would like to inquire about your collections.'
  )}`;

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-2">
        Get In Touch
      </span>
      <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#171717] tracking-tight mb-4">
        {storeInfo.name}
      </h1>
      <p className="text-sm text-[#77736D] max-w-lg mx-auto mb-12">
        We are delighted to assist you with your wardrobe selections, custom inquiries, and order tracking.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <a
          href={`tel:${storeInfo.phone}`}
          className="bg-white border border-[#E9DFD1] p-8 flex flex-col items-center justify-center hover:border-[#C5A36A] transition-colors group"
        >
          <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C5A36A] group-hover:text-white transition-colors text-[#171717]">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#171717] mb-1">Call the Boutique</h3>
          <p className="text-xs text-[#77736D] mb-4">{storeInfo.phone}</p>
          <span className="text-xs uppercase tracking-widest text-[#C5A36A] font-semibold">
            Call Now →
          </span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-[#E9DFD1] p-8 flex flex-col items-center justify-center hover:border-[#25D366] transition-colors group"
        >
          <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#25D366] group-hover:text-white transition-colors text-[#25D366]">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#171717] mb-1">Chat on WhatsApp</h3>
          <p className="text-xs text-[#77736D] mb-4">Instant Response</p>
          <span className="text-xs uppercase tracking-widest text-[#25D366] font-semibold">
            Open Chat →
          </span>
        </a>

        <button
          onClick={onExploreShop}
          className="bg-white border border-[#E9DFD1] p-8 flex flex-col items-center justify-center hover:border-[#C5A36A] transition-colors group text-left"
        >
          <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C5A36A] group-hover:text-white transition-colors text-[#171717]">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#171717] mb-1">Browse Collections</h3>
          <p className="text-xs text-[#77736D] mb-4">Shop Online</p>
          <span className="text-xs uppercase tracking-widest text-[#C5A36A] font-semibold">
            Explore →
          </span>
        </button>
      </div>

      <div className="bg-white border border-[#E9DFD1] p-6 inline-flex items-center gap-3 text-xs text-[#77736D]">
        <MapPin className="w-4 h-4 text-[#C5A36A]" />
        <span>Yeeks Clothing Enterprise • Premium Fashion Boutique</span>
      </div>
    </div>
  );
}
