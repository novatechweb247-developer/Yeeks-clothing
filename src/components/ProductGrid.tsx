import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  categories: string[];
  initialCategory?: string;
  initialSearch?: string;
  favorites: string[];
  onToggleFavorite: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({
  products,
  categories,
  initialCategory = 'All',
  initialSearch = '',
  favorites,
  onToggleFavorite,
  onQuickView,
  onSelectProduct,
  onAddToCart
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(100000);
  const [onlyNewArrivals, setOnlyNewArrivals] = useState<boolean>(false);
  const [onlySale, setOnlySale] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Extract all available sizes and colors for filters
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  const allColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.colors.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Size filter
      if (selectedSize !== 'All' && !p.sizes.includes(selectedSize)) {
        return false;
      }
      // Color filter
      if (selectedColor !== 'All' && !p.colors.includes(selectedColor)) {
        return false;
      }
      // Price range
      const effectivePrice = p.salePrice || p.price;
      if (effectivePrice > priceRange) {
        return false;
      }
      // New arrivals
      if (onlyNewArrivals && !p.isNewArrival) {
        return false;
      }
      // Sale
      if (onlySale && !p.salePrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;
      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, selectedSize, selectedColor, priceRange, onlyNewArrivals, onlySale, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedSize('All');
    setSelectedColor('All');
    setPriceRange(100000);
    setOnlyNewArrivals(false);
    setOnlySale(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#E9DFD1]">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-2">
            Boutique Catalogue
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717]">
            {selectedCategory === 'All' ? 'All Collections' : selectedCategory}
          </h1>
          <p className="text-sm text-[#77736D] mt-1">
            Showing {filteredProducts.length} exquisite pieces
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736D]" />
            <input
              type="text"
              placeholder="Search garments, styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E9DFD1] py-2.5 pl-10 pr-4 text-sm text-[#171717] focus:outline-none focus:border-[#C5A36A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77736D] hover:text-[#171717]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden inline-flex items-center gap-2 bg-white border border-[#E9DFD1] px-4 py-2.5 text-xs uppercase tracking-widest font-semibold text-[#171717]"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-[#E9DFD1] py-2.5 px-4 text-xs uppercase tracking-widest font-semibold text-[#171717] focus:outline-none focus:border-[#C5A36A]"
          >
            <option value="featured">Sort: Featured</option>
            <option value="newest">Sort: Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop & Mobile drawer) */}
        <div
          className={`${
            mobileFiltersOpen ? 'fixed inset-0 z-50 bg-[#FAF7F2] p-6 overflow-y-auto block' : 'hidden'
          } lg:block lg:col-span-1 space-y-8 bg-white lg:bg-transparent p-6 lg:p-0 border lg:border-none border-[#E9DFD1]`}
        >
          {mobileFiltersOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-[#E9DFD1] lg:hidden mb-4">
              <h3 className="font-serif text-lg font-bold">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] mb-4">
              Categories
            </h4>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`text-left text-sm py-1 transition-colors ${
                  selectedCategory === 'All' ? 'text-[#C5A36A] font-semibold' : 'text-[#77736D] hover:text-[#171717]'
                }`}
              >
                All Collections
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left text-sm py-1 transition-colors ${
                    selectedCategory === cat ? 'text-[#C5A36A] font-semibold' : 'text-[#77736D] hover:text-[#171717]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] mb-4">
              Size
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSize('All')}
                className={`px-3 py-1.5 text-xs uppercase font-medium border ${
                  selectedSize === 'All'
                    ? 'bg-[#171717] text-white border-[#171717]'
                    : 'bg-white text-[#171717] border-[#E9DFD1] hover:border-[#C5A36A]'
                }`}
              >
                All
              </button>
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 text-xs uppercase font-medium border ${
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

          {/* Color */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] mb-4">
              Colour
            </h4>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setSelectedColor('All')}
                className={`text-left text-sm py-1 ${
                  selectedColor === 'All' ? 'text-[#C5A36A] font-semibold' : 'text-[#77736D]'
                }`}
              >
                All Colours
              </button>
              {allColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`text-left text-sm py-1 ${
                    selectedColor === color ? 'text-[#C5A36A] font-semibold' : 'text-[#77736D]'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] mb-4">
              <span>Max Price</span>
              <span className="text-[#C5A36A]">₦{priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#C5A36A]"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 text-sm text-[#171717] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyNewArrivals}
                onChange={(e) => setOnlyNewArrivals(e.target.checked)}
                className="accent-[#C5A36A] w-4 h-4"
              />
              New Arrivals Only
            </label>
            <label className="flex items-center gap-3 text-sm text-[#171717] cursor-pointer">
              <input
                type="checkbox"
                checked={onlySale}
                onChange={(e) => setOnlySale(e.target.checked)}
                className="accent-[#C5A36A] w-4 h-4"
              />
              Sale Items Only
            </label>
          </div>

          {/* Clear Filters */}
          <button
            onClick={handleClearFilters}
            className="w-full bg-[#E9DFD1]/50 hover:bg-[#E9DFD1] text-[#171717] py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            Clear All Filters
          </button>

          {mobileFiltersOpen && (
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full bg-[#171717] text-white py-3 text-xs uppercase tracking-widest font-semibold mt-6"
            >
              Apply Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#E9DFD1] p-12">
              <h3 className="font-serif text-2xl font-bold text-[#171717] mb-2">
                No matching garments found
              </h3>
              <p className="text-sm text-[#77736D] mb-6">
                Try adjusting your search criteria or clearing your filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-[#171717] text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A36A] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                  onQuickView={onQuickView}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
