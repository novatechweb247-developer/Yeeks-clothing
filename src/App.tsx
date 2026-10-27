import { useState, useEffect } from 'react';
import {
  initialStoreInfo,
  initialHeroSlides,
  initialCategories,
  initialProducts,
  initialReviews
} from './data/initialData';
import { Product, HeroSlide, StoreInfo, CartItem, Order } from './types';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShopByCategory from './components/ShopByCategory';
import ProductGrid from './components/ProductGrid';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import FavoritesModal from './components/FavoritesModal';
import AdminModal from './components/AdminModal';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { Star, ArrowRight, MessageCircle } from 'lucide-react';

export default function App() {
  // Loading screen state
  const [showLoading, setShowLoading] = useState(true);

  // Persistent storage states
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(() => {
    const saved = localStorage.getItem('yeeks_store_info');
    return saved ? JSON.parse(saved) : initialStoreInfo;
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('yeeks_hero_slides');
    return saved ? JSON.parse(saved) : initialHeroSlides;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('yeeks_categories');
    return saved ? JSON.parse(saved) : initialCategories.map((c) => c.name);
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('yeeks_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('yeeks_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('yeeks_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('yeeks_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // UI Navigation & Modals
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('yeeks_store_info', JSON.stringify(storeInfo));
  }, [storeInfo]);

  useEffect(() => {
    localStorage.setItem('yeeks_hero_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem('yeeks_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('yeeks_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('yeeks_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('yeeks_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('yeeks_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart Handlers
  const handleAddToCart = (product: Product, size: string = product.sizes[0] || 'Standard', color: string = product.colors[0] || 'Default', quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Favorites Handler
  const handleToggleFavorite = (product: Product) => {
    setFavorites((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  // WhatsApp Single Product Order
  const handleWhatsAppOrderProduct = (product: Product, size: string, color: string, qty: number) => {
    const price = product.salePrice || product.price;
    const subtotal = price * qty;
    const message = `Hello ${storeInfo.name}, I would like to place an order.

Item: ${product.name}
Size: ${size}
Colour: ${color}
Quantity: ${qty}
Price: ₦${price.toLocaleString()}
Subtotal: ₦${subtotal.toLocaleString()}

Please confirm availability and delivery details.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${storeInfo.whatsappNumber}?text=${encoded}`, '_blank');
  };

  // WhatsApp Cart Order
  const handleWhatsAppCartOrder = () => {
    if (cart.length === 0) return;
    const subtotal = cart.reduce((s, i) => s + (i.product.salePrice || i.product.price) * i.quantity, 0);
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.product.name} (${item.selectedSize}, ${item.selectedColor}) — Qty: ${item.quantity} — ₦${(
            (item.product.salePrice || item.product.price) * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const message = `Hello ${storeInfo.name}, I would like to place an order.

Items:
${itemsText}

Merchandise Subtotal: ₦${subtotal.toLocaleString()}

Please confirm availability and delivery details.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${storeInfo.whatsappNumber}?text=${encoded}`, '_blank');
  };

  // Admin Handlers
  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts((prev) => {
      const index = prev.findIndex((p) => p.id === updatedProduct.id);
      if (index > -1) {
        const copy = [...prev];
        copy[index] = updatedProduct;
        return copy;
      }
      return [updatedProduct, ...prev];
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleSaveHeroSlide = (updatedSlide: HeroSlide) => {
    setHeroSlides((prev) => prev.map((s) => (s.id === updatedSlide.id ? updatedSlide : s)));
  };

  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#171717] flex flex-col font-sans">
      {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenSearch={() => {
          setActiveTab('shop');
          window.scrollTo({ top: 500, behavior: 'smooth' });
        }}
        phone={storeInfo.phone}
      />

      <main className="flex-grow">
        {/* HOME TAB: HOMEPAGE IN EXACT REQUIRED SECTION ORDER */}
        {activeTab === 'home' && (
          <div>
            {/* 1. Premium 3-Slide Hero */}
            <Hero
              slides={heroSlides}
              onShopClick={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 2. Shop by Category */}
            <ShopByCategory
              categories={initialCategories}
              onSelectCategory={(catName) => {
                setSelectedCategoryFilter(catName);
                setActiveTab('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 3. New Arrivals */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-2">
                    Freshly Curated
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-[#171717]">New Arrivals</h2>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('new-arrivals');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs uppercase tracking-widest font-semibold text-[#171717] hover:text-[#C5A36A] flex items-center gap-1"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.filter((p) => p.isNewArrival).slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p)}
                  />
                ))}
              </div>
            </section>

            {/* 4. Featured Products */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-y border-[#E9DFD1]/60">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-2">
                  Exquisite Selection
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#171717]">Featured Garments</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.filter((p) => p.isFeatured).slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p)}
                  />
                ))}
              </div>
            </section>

            {/* 5. Boutique Brand Introduction */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-2">
                Yeeks Clothing Enterprise
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#171717] mb-6 leading-tight">
                Crafted for Grace, Tailored for Confidence
              </h2>
              <p className="text-base sm:text-lg text-[#77736D] max-w-3xl mx-auto leading-relaxed mb-8">
                {storeInfo.aboutText}
              </p>
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#171717] hover:bg-[#C5A36A] text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
              >
                Discover Our Story
              </button>
            </section>

            {/* 6. Best Sellers */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-2">
                    Client Favourites
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-[#171717]">Best Sellers</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.filter((p) => p.isBestSeller).slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p)}
                  />
                ))}
              </div>
            </section>

            {/* 7. Fashion Editorial / Style Inspiration */}
            <section className="relative py-32 bg-[#171717] text-white my-16 overflow-hidden">
              <div className="absolute inset-0 opacity-40">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop"
                  alt="Editorial"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative max-w-4xl mx-auto px-6 text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-3">
                  Editorial Style Note
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif font-bold mb-6 leading-tight">
                  "Elegance is when the inside is as beautiful as the outside."
                </h2>
                <p className="text-sm sm:text-base text-[#FAF7F2]/80 mb-8 max-w-xl mx-auto font-light">
                  Explore our seasonal styling guide for pairing classic silhouettes with statement accessories.
                </p>
                <button
                  onClick={() => {
                    setActiveTab('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#FAF7F2] text-[#171717] hover:bg-[#C5A36A] hover:text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
                >
                  Shop The Editorial Edit
                </button>
              </div>
            </section>

            {/* 8. Promotional Banner */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="bg-[#E9DFD1]/50 border border-[#E9DFD1] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#C5A36A] font-bold block mb-2">
                    Complimentary Consultation
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mb-2">
                    Need Personal Styling Assistance?
                  </h3>
                  <p className="text-sm text-[#77736D] max-w-xl">
                    Our boutique fashion consultants are available on WhatsApp to assist with sizing, outfit pairing, and traditional occasion attire.
                  </p>
                </div>
                <a
                  href={`https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Yeeks Clothing Enterprise, I would like personal styling advice.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shadow-md"
                >
                  <MessageCircle className="w-5 h-5 fill-current" /> Chat with Consultant
                </a>
              </div>
            </section>

            {/* 9. Customer Testimonials */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-t border-[#E9DFD1]/60">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-2">
                  Client Experiences
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717]">
                  Loved by Our Patrons
                </h2>
                <div className="w-12 h-[2px] bg-[#C5A36A] mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {initialReviews.map((rev) => (
                  <div key={rev.id} className="bg-[#FAF7F2] p-8 border border-[#E9DFD1]/60 flex flex-col justify-between">
                    <div>
                      <div className="flex text-[#C5A36A] mb-4">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-[#171717] italic leading-relaxed mb-6 font-serif">
                        "{rev.comment}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#E9DFD1]">
                      <span className="font-bold text-xs uppercase tracking-wider text-[#171717] block">
                        {rev.author}
                      </span>
                      <span className="text-[11px] text-[#77736D]">
                        Purchased: {rev.itemPurchased}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 10. WhatsApp Updates CTA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block mb-2">
                Stay Connected
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#171717] mb-4">
                Join Yeeks VIP WhatsApp Channel
              </h2>
              <p className="text-sm text-[#77736D] mb-8 max-w-lg mx-auto">
                Be the first to preview seasonal lookbooks and exclusive limited-edition releases.
              </p>
              <a
                href={`https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Yeeks Clothing Enterprise, please add me to your VIP WhatsApp list.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5 fill-current" /> Join VIP List on WhatsApp
              </a>
            </section>
          </div>
        )}

        {/* SHOP TAB */}
        {activeTab === 'shop' && (
          <ProductGrid
            products={products}
            categories={categories}
            initialCategory={selectedCategoryFilter}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
          />
        )}

        {/* NEW ARRIVALS TAB */}
        {activeTab === 'new-arrivals' && (
          <ProductGrid
            products={products.filter((p) => p.isNewArrival)}
            categories={categories}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
          />
        )}

        {/* COLLECTIONS TAB */}
        {activeTab === 'collections' && (
          <ShopByCategory
            categories={initialCategories}
            onSelectCategory={(catName) => {
              setSelectedCategoryFilter(catName);
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <AboutSection
            storeInfo={storeInfo}
            onExploreShop={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <ContactSection
            storeInfo={storeInfo}
            onExploreShop={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      <Footer
        storeInfo={storeInfo}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Modals & Drawers */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isFavorite={favorites.includes(selectedProduct.id)}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={(prod, size, color, qty) => handleAddToCart(prod, size, color, qty)}
          onWhatsAppOrder={(prod, size, color, qty) => handleWhatsAppOrderProduct(prod, size, color, qty)}
        />
      )}

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          isFavorite={favorites.includes(quickViewProduct.id)}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={(prod, size, color, qty) => {
            handleAddToCart(prod, size, color, qty);
            setQuickViewProduct(null);
          }}
          onWhatsAppOrder={(prod, size, color, qty) => handleWhatsAppOrderProduct(prod, size, color, qty)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onWhatsAppCheckout={() => {
          setIsCartOpen(false);
          handleWhatsAppCartOrder();
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        storeInfo={storeInfo}
        onOrderComplete={(newOrder) => {
          setOrders((prev) => [newOrder, ...prev]);
          setCart([]);
          setIsCheckoutOpen(false);
        }}
      />

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={products.filter((p) => favorites.includes(p.id))}
        onRemoveFavorite={handleToggleFavorite}
        onAddToCart={(p) => handleAddToCart(p)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onSaveProduct={handleSaveProduct}
        onDeleteProduct={handleDeleteProduct}
        heroSlides={heroSlides}
        onSaveHeroSlide={handleSaveHeroSlide}
        storeInfo={storeInfo}
        onSaveStoreInfo={(info) => setStoreInfo(info)}
        orders={orders}
        categories={categories}
      />
    </div>
  );
}
