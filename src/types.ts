export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  category: string;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  stockQuantity: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface HeroSlide {
  id: string;
  headline: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  itemPurchased: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface StoreInfo {
  name: string;
  phone: string;
  whatsappNumber: string;
  tagline: string;
  aboutText: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  notes?: string;
  items: {
    productId: string;
    productName: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  date: string;
  status: 'Pending WhatsApp Confirmation' | 'Confirmed';
}
