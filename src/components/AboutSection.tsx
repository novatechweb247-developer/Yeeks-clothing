import { StoreInfo } from '../types';

interface AboutSectionProps {
  storeInfo: StoreInfo;
  onExploreShop: () => void;
}

export default function AboutSection({ storeInfo, onExploreShop }: AboutSectionProps) {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-2">
          About Yeeks Clothing Enterprise
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#171717] tracking-tight">
          A Boutique For Your Personal Style
        </h1>
        <div className="w-12 h-[2px] bg-[#C5A36A] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="aspect-[4/5] bg-[#E9DFD1] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
            alt="Boutique interior"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
            Timeless Elegance & Contemporary Sophistication
          </h2>
          <p className="text-sm sm:text-base text-[#77736D] leading-relaxed">
            {storeInfo.aboutText}
          </p>
          <p className="text-sm sm:text-base text-[#77736D] leading-relaxed">
            From exquisite dresses and tailored suits to traditional occasion wear and premium accessories, every piece in our catalogue is chosen with uncompromising standards of quality and grace.
          </p>
          <div className="pt-4">
            <button
              onClick={onExploreShop}
              className="bg-[#171717] hover:bg-[#C5A36A] text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
            >
              Explore Our Collections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
