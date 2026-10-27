import { Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { StoreInfo } from '../types';

interface FooterProps {
  storeInfo: StoreInfo;
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
}

export default function Footer({ storeInfo, setActiveTab, onOpenAdmin }: FooterProps) {
  const whatsappUrl = `https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(
    'Hello Yeeks Clothing Enterprise, I would like to join your VIP updates list.'
  )}`;

  return (
    <footer className="bg-[#171717] text-[#FAF7F2] pt-16 pb-12 border-t border-[#C5A36A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-widest block text-white">
              YEEKS
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A36A] block -mt-2">
              Clothing Enterprise
            </span>
            <p className="text-xs text-[#FAF7F2]/70 leading-relaxed pt-2">
              {storeInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A36A]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-[#C5A36A] transition-colors">
                  Shop All Collections
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('new-arrivals')} className="hover:text-[#C5A36A] transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('collections')} className="hover:text-[#C5A36A] transition-colors">
                  Featured Edits
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-[#C5A36A] transition-colors">
                  About Boutique
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A36A]">
              Contact Concierge
            </h4>
            <div className="space-y-2.5 text-xs text-[#FAF7F2]/80">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A36A]" /> {storeInfo.phone}
              </p>
              <a
                href={`https://wa.me/${storeInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366] hover:underline"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Orders & Support
              </a>
              <p className="flex items-center gap-2 pt-1 text-[#FAF7F2]/60">
                <ShieldCheck className="w-4 h-4 text-[#C5A36A]" /> Verified Quality Guarantee
              </p>
            </div>
          </div>

          {/* WhatsApp / Newsletter Updates CTA */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A36A]">
              WhatsApp VIP Updates
            </h4>
            <p className="text-xs text-[#FAF7F2]/70">
              Receive direct notifications when new seasonal collections arrive.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 text-xs uppercase tracking-widest font-semibold transition-colors w-full justify-center"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> Join VIP WhatsApp List
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/50 gap-4">
          <p>© 2026 Yeeks Clothing Enterprise. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#C5A36A] transition-colors uppercase tracking-widest text-[10px]"
            >
              Boutique Admin Center
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('contact')} className="hover:text-[#C5A36A] transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
