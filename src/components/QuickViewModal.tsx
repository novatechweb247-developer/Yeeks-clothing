import ProductDetailModal from './ProductDetailModal';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  onWhatsAppOrder: (product: Product, size: string, color: string, qty: number) => void;
}

export default function QuickViewModal(props: QuickViewModalProps) {
  return <ProductDetailModal {...props} />;
}
