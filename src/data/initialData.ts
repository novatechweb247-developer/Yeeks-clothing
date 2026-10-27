import { Product, Category, HeroSlide, Review, StoreInfo } from '../types';

export const initialStoreInfo: StoreInfo = {
  name: "Yeeks Clothing Enterprise",
  phone: "09037327260",
  whatsappNumber: "2349037327260",
  tagline: "Your Style. Your Statement. Timeless Elegance.",
  aboutText: "Yeeks Clothing Enterprise brings fashion discovery and boutique shopping together in one convenient place. Explore our available collections and contact us for assistance with your order."
};

export const initialHeroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    headline: "YOUR STYLE. YOUR STATEMENT.",
    subtitle: "Discover clothing that complements your individuality, with styles for everyday wear and special occasions.",
    buttonText: "SHOP NOW",
    buttonLink: "shop",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "slide-2",
    headline: "FRESH STYLES. TIMELESS CONFIDENCE.",
    subtitle: "Explore new arrivals and discover pieces to refresh your wardrobe with effortless grace.",
    buttonText: "EXPLORE NEW ARRIVALS",
    buttonLink: "new-arrivals",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "slide-3",
    headline: "FASHION THAT FEELS LIKE YOU.",
    subtitle: "Find your next favourite look at Yeeks Clothing Enterprise, crafted for the modern individual.",
    buttonText: "EXPLORE COLLECTIONS",
    buttonLink: "collections",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1600&auto=format&fit=crop"
  }
];

export const initialCategories: Category[] = [
  {
    id: "womens-clothing",
    name: "Women's Clothing",
    image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=800&auto=format&fit=crop",
    description: "Chic ensembles, everyday elegance, and standout silhouettes."
  },
  {
    id: "mens-clothing",
    name: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop",
    description: "Sharp tailoring, premium shirts, and refined casual wear."
  },
  {
    id: "dresses",
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    description: "From cocktail numbers to flowing maxi dresses for any celebration."
  },
  {
    id: "tops-and-shirts",
    name: "Tops and Shirts",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
    description: "Versatile blouses, statement tees, and immaculate button-downs."
  },
  {
    id: "trousers-and-skirts",
    name: "Trousers and Skirts",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop",
    description: "Tailored trousers, pleated skirts, and sophisticated bottoms."
  },
  {
    id: "traditional-and-occasion",
    name: "Traditional and Occasion Wear",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop",
    description: "Exquisite cultural pieces and majestic attire for special moments."
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop",
    description: "The finishing touches: statement bags, scarves, and elegant details."
  }
];

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "Aurelia Silk Wrap Midi Dress",
    price: 45000,
    salePrice: 38000,
    category: "Dresses",
    description: "Luxurious silk wrap midi dress designed for effortless grace. Features a V-neckline, tie waist, and fluid drape that moves beautifully with every step.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Champagne Gold", "Emerald Green", "Midnight Black"],
    inStock: true,
    stockQuantity: 12,
    isFeatured: true,
    isNewArrival: true,
    createdAt: "2026-10-01"
  },
  {
    id: "prod-2",
    name: "Executive Tailored Linen Blazer",
    price: 55000,
    category: "Men's Clothing",
    description: "Immaculately structured linen blazer tailored for modern sophistication. Breathable fabric makes it ideal for both business meetings and evening gatherings.",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Warm Beige", "Rich Black", "Navy Blue"],
    inStock: true,
    stockQuantity: 8,
    isFeatured: true,
    isBestSeller: true,
    createdAt: "2026-09-15"
  },
  {
    id: "prod-3",
    name: "Royal Ankara Heritage Kaftan Set",
    price: 65000,
    salePrice: 58000,
    category: "Traditional and Occasion Wear",
    description: "A stunning celebration of heritage craftsmanship. Featuring intricate embroidery accents on premium rich fabric, tailored for distinguished presence.",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Burgundy & Gold", "Royal Blue & Silver", "Black & Gold"],
    inStock: true,
    stockQuantity: 10,
    isFeatured: true,
    isNewArrival: true,
    createdAt: "2026-10-10"
  },
  {
    id: "prod-4",
    name: "Serena Pleated Satin Midi Skirt",
    price: 28000,
    category: "Trousers and Skirts",
    description: "Lustrous pleated satin skirt that catches the light with every movement. Pair with a crisp blouse or fitted knit for an immaculate look.",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Soft Ivory", "Champagne", "Obsidian"],
    inStock: true,
    stockQuantity: 15,
    isBestSeller: true,
    createdAt: "2026-09-20"
  },
  {
    id: "prod-5",
    name: "Minimalist Cashmere Blend Turtleneck",
    price: 32000,
    category: "Tops and Shirts",
    description: "Supremely soft cashmere-blend turtleneck offering luxurious warmth and sleek silhouette styling.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Warm Beige", "Soft Ivory", "Rich Black"],
    inStock: true,
    stockQuantity: 20,
    isNewArrival: true,
    createdAt: "2026-10-12"
  },
  {
    id: "prod-6",
    name: "Classic High-Waist Wide Leg Trousers",
    price: 36000,
    category: "Trousers and Skirts",
    description: "Impeccably draped wide-leg trousers designed with high-rise waist and crisp pressed creases for an elongating, sophisticated silhouette.",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Warm Beige", "Ivory"],
    inStock: true,
    stockQuantity: 14,
    isFeatured: true,
    createdAt: "2026-09-30"
  },
  {
    id: "prod-7",
    name: "Artisanal Leather Crossbody Handbag",
    price: 48000,
    salePrice: 42000,
    category: "Accessories",
    description: "Crafted from premium genuine leather with polished gold-tone hardware. The perfect companion for both daytime errands and evening galas.",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["Standard"],
    colors: ["Cognac Brown", "Rich Black", "Champagne"],
    inStock: true,
    stockQuantity: 7,
    isBestSeller: true,
    createdAt: "2026-09-01"
  },
  {
    id: "prod-8",
    name: "Gentleman's Crisp Poplin Shirt",
    price: 26000,
    category: "Men's Clothing",
    description: "Crisp cotton poplin shirt tailored for a clean, sharp fit. An indispensable staple for every discerning gentleman's wardrobe.",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Crisp White", "Soft Sky Blue", "Warm Ivory"],
    inStock: true,
    stockQuantity: 18,
    isNewArrival: true,
    createdAt: "2026-10-05"
  }
];

export const initialReviews: Review[] = [
  {
    id: "rev-1",
    author: "Chinyere O.",
    rating: 5,
    comment: "The quality of the Aurelia Silk Dress is simply breathtaking! Ordering via WhatsApp was seamless and delivery was prompt.",
    date: "2 days ago",
    itemPurchased: "Aurelia Silk Wrap Midi Dress"
  },
  {
    id: "rev-2",
    author: "Oluwaseun A.",
    rating: 5,
    comment: "Exceptional tailoring and top-tier fabric. Yeeks Clothing Enterprise is now my go-to boutique for formal and traditional wear.",
    date: "1 week ago",
    itemPurchased: "Royal Ankara Heritage Kaftan Set"
  },
  {
    id: "rev-3",
    author: "Fatima M.",
    rating: 5,
    comment: "Stunning presentation and the customer service on WhatsApp is extremely polite and efficient. Highly recommended!",
    date: "2 weeks ago",
    itemPurchased: "Serena Pleated Satin Midi Skirt"
  }
];
