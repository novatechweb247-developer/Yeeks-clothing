import { Category } from '../types';

interface ShopByCategoryProps {
  categories: Category[];
  onSelectCategory: (categoryName: string) => void;
}

export default function ShopByCategory({ categories, onSelectCategory }: ShopByCategoryProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-2">
          Curated Collections
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717] tracking-tight">
          Shop By Category
        </h2>
        <div className="w-12 h-[2px] bg-[#C5A36A] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onSelectCategory(category.name)}
            className="group relative h-96 overflow-hidden cursor-pointer bg-[#E9DFD1]"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors" />

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A36A] font-semibold block mb-1">
                Explore
              </span>
              <h3 className="text-2xl font-serif font-bold mb-2">
                {category.name}
              </h3>
              <p className="text-xs text-[#FAF7F2]/80 line-clamp-2 font-light mb-4">
                {category.description}
              </p>
              <span className="inline-flex items-center text-xs uppercase tracking-widest text-[#FAF7F2] font-semibold group-hover:text-[#C5A36A] transition-colors">
                Browse Collection →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
