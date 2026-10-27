import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenSearch: () => void;
  phone: string;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  onOpenSearch,
  phone
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'New Arrivals', id: 'new-arrivals' },
    { name: 'Collections', id: 'collections' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#171717] text-[#FAF7F2] text-xs py-2 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-4">
        <span>Complimentary Delivery on Orders Over ₦100,000</span>
        <span className="hidden md:inline">•</span>
        <a 
          href={`tel:${phone}`} 
          className="hidden md:flex items-center gap-1 text-[#C5A36A] hover:underline"
        >
          <Phone className="w-3.5 h-3.5" /> Call/WhatsApp: {phone}
        </a>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm py-4'
            : 'bg-[#FAF7F2] py-5 border-b border-[#E9DFD1]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#171717] hover:text-[#C5A36A] transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo / Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer text-center md:text-left"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#171717] block">
              YEEKS
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#77736D] block -mt-1 font-medium">
              Clothing Enterprise
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm uppercase tracking-wider transition-colors relative py-1 ${
                  activeTab === link.id
                    ? 'text-[#C5A36A] font-semibold'
                    : 'text-[#171717] hover:text-[#C5A36A]'
                }`}
              >
                {link.name}
                {activeTab === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A36A]"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#171717] hover:text-[#C5A36A] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenFavorites}
              className="p-2 text-[#171717] hover:text-[#C5A36A] transition-colors relative"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C5A36A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={onOpenCart}
              className="p-2 text-[#171717] hover:text-[#C5A36A] transition-colors relative"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#171717] text-[#FAF7F2] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#FAF7F2] flex flex-col pt-6 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-6 border-b border-[#E9DFD1]">
              <div>
                <span className="font-serif text-xl font-bold tracking-widest text-[#171717]">
                  YEEKS
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#77736D] block">
                  Clothing Enterprise
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#171717] hover:text-[#C5A36A]"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-8 flex flex-col space-y-6">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 + 0.1 }}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-xl font-serif tracking-wide py-2 border-b border-[#E9DFD1]/50 ${
                    activeTab === link.id ? 'text-[#C5A36A] font-semibold' : 'text-[#171717]'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            <div className="mt-auto pb-12 pt-6 flex flex-col gap-4">
              <button
                onClick={() => handleNavClick('shop')}
                className="w-full bg-[#171717] text-[#FAF7F2] py-3.5 uppercase tracking-widest text-sm font-semibold rounded-none hover:bg-[#C5A36A] transition-colors text-center"
              >
                Shop Now
              </button>
              <div className="text-center text-xs text-[#77736D] pt-4 border-t border-[#E9DFD1]">
                <p>Call or WhatsApp: {phone}</p>
                <p className="mt-1">Yeeks Clothing Enterprise © 2026</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
