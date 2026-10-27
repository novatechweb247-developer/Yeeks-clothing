import { useState } from 'react';
import { X, Plus, Edit2, Trash2, Package, Image as ImageIcon, Phone, CheckCircle, ShoppingBag } from 'lucide-react';
import { Product, HeroSlide, StoreInfo, Order } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  heroSlides: HeroSlide[];
  onSaveHeroSlide: (slide: HeroSlide) => void;
  storeInfo: StoreInfo;
  onSaveStoreInfo: (info: StoreInfo) => void;
  orders: Order[];
  categories: string[];
}

export default function AdminModal({
  isOpen,
  onClose,
  products,
  onSaveProduct,
  onDeleteProduct,
  heroSlides,
  onSaveHeroSlide,
  storeInfo,
  onSaveStoreInfo,
  orders,
  categories
}: AdminModalProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'hero' | 'settings' | 'orders'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [currentStoreInfo, setCurrentStoreInfo] = useState<StoreInfo>(storeInfo);

  if (!isOpen) return null;

  const handleProductSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProd: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      salePrice: formData.get('salePrice') ? Number(formData.get('salePrice')) : undefined,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      images: [formData.get('image1') as string, formData.get('image2') as string].filter(Boolean),
      sizes: (formData.get('sizes') as string).split(',').map((s) => s.trim()),
      colors: (formData.get('colors') as string).split(',').map((c) => c.trim()),
      inStock: formData.get('inStock') === 'true',
      stockQuantity: Number(formData.get('stockQuantity') || 10),
      isFeatured: formData.get('isFeatured') === 'true',
      isNewArrival: formData.get('isNewArrival') === 'true',
      isBestSeller: formData.get('isBestSeller') === 'true',
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString()
    };
    onSaveProduct(newProd);
    setEditingProduct(null);
    setIsCreatingProduct(false);
  };

  const handleSlideSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingSlide) return;
    const formData = new FormData(e.currentTarget);
    const updatedSlide: HeroSlide = {
      ...editingSlide,
      headline: formData.get('headline') as string,
      subtitle: formData.get('subtitle') as string,
      buttonText: formData.get('buttonText') as string,
      image: formData.get('image') as string
    };
    onSaveHeroSlide(updatedSlide);
    setEditingSlide(null);
  };

  const handleStoreInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSaveStoreInfo(currentStoreInfo);
    alert('Store information updated successfully.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#FAF7F2] shadow-2xl overflow-hidden my-8 min-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#171717] text-[#FAF7F2] p-6 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A36A] font-semibold block">
              Management Portal
            </span>
            <h2 className="font-serif text-2xl font-bold">Yeeks Boutique Admin Center</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:text-[#C5A36A] transition-colors"
            aria-label="Close Admin"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="bg-white border-b border-[#E9DFD1] px-6 flex gap-8">
          {[
            { id: 'products', label: 'Products Catalogue', icon: Package },
            { id: 'hero', label: 'Hero Slides', icon: ImageIcon },
            { id: 'orders', label: 'Customer Orders', icon: ShoppingBag },
            { id: 'settings', label: 'Store Settings', icon: Phone }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingProduct(null);
                  setIsCreatingProduct(false);
                  setEditingSlide(null);
                }}
                className={`flex items-center gap-2 py-4 text-xs uppercase tracking-widest font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#C5A36A] text-[#C5A36A]'
                    : 'border-transparent text-[#77736D] hover:text-[#171717]'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#171717]">Catalogue Management</h3>
                  <p className="text-xs text-[#77736D]">Add, edit, price, and organize store garments.</p>
                </div>
                {!isCreatingProduct && !editingProduct && (
                  <button
                    onClick={() => setIsCreatingProduct(true)}
                    className="bg-[#171717] hover:bg-[#C5A36A] text-white px-5 py-2.5 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add New Product
                  </button>
                )}
              </div>

              {/* Create / Edit Form */}
              {(isCreatingProduct || editingProduct) && (
                <div className="bg-white border border-[#E9DFD1] p-6 mb-8 shadow-sm">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#E9DFD1]">
                    <h4 className="font-serif text-lg font-bold text-[#171717]">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h4>
                    <button
                      onClick={() => {
                        setIsCreatingProduct(false);
                        setEditingProduct(null);
                      }}
                      className="text-[#77736D] hover:text-[#171717]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Product Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        defaultValue={editingProduct?.name || ''}
                        className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Category *</label>
                      <select
                        name="category"
                        defaultValue={editingProduct?.category || categories[0]}
                        className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Price (₦) *</label>
                      <input
                        type="number"
                        name="price"
                        required
                        defaultValue={editingProduct?.price || ''}
                        className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Sale Price (₦) (Optional)</label>
                      <input
                        type="number"
                        name="salePrice"
                        defaultValue={editingProduct?.salePrice || ''}
                        className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Description *</label>
                      <textarea
                        name="description"
                        required
                        rows={3}
                        defaultValue={editingProduct?.description || ''}
                        className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Primary Image URL *</label>
                      <input
                        type="url"
                        name="image1"
                        required
                        defaultValue={editingProduct?.images[0] || ''}
                        className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Secondary Image URL (Hover)</label>
                      <input
                        type="url"
                        name="image2"
                        defaultValue={editingProduct?.images[1] || ''}
                        className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Sizes (comma separated) *</label>
                      <input
                        type="text"
                        name="sizes"
                        required
                        defaultValue={editingProduct?.sizes.join(', ') || 'XS, S, M, L, XL'}
                        className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Colours (comma separated) *</label>
                      <input
                        type="text"
                        name="colors"
                        required
                        defaultValue={editingProduct?.colors.join(', ') || 'Champagne Gold, Rich Black'}
                        className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-6 md:col-span-2 pt-2">
                      <label className="flex items-center gap-2 text-xs uppercase font-semibold cursor-pointer">
                        <input type="checkbox" name="inStock" value="true" defaultChecked={editingProduct ? editingProduct.inStock : true} className="accent-[#C5A36A]" /> In Stock
                      </label>
                      <label className="flex items-center gap-2 text-xs uppercase font-semibold cursor-pointer">
                        <input type="checkbox" name="isFeatured" value="true" defaultChecked={editingProduct?.isFeatured} className="accent-[#C5A36A]" /> Featured
                      </label>
                      <label className="flex items-center gap-2 text-xs uppercase font-semibold cursor-pointer">
                        <input type="checkbox" name="isNewArrival" value="true" defaultChecked={editingProduct?.isNewArrival} className="accent-[#C5A36A]" /> New Arrival
                      </label>
                      <label className="flex items-center gap-2 text-xs uppercase font-semibold cursor-pointer">
                        <input type="checkbox" name="isBestSeller" value="true" defaultChecked={editingProduct?.isBestSeller} className="accent-[#C5A36A]" /> Best Seller
                      </label>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-[#E9DFD1]">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingProduct(false);
                          setEditingProduct(null);
                        }}
                        className="bg-gray-200 text-[#171717] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#171717] hover:bg-[#C5A36A] text-white px-8 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors"
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Product List Table */}
              <div className="bg-white border border-[#E9DFD1] overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-[#E9DFD1] text-[11px] uppercase tracking-wider text-[#77736D]">
                      <th className="p-4">Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9DFD1]">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-[#FAF7F2]/50">
                        <td className="p-4 flex items-center gap-3">
                          <img src={product.images[0]} alt="" className="w-12 h-14 object-cover bg-[#FAF7F2]" />
                          <div>
                            <span className="font-serif font-semibold text-[#171717] block">{product.name}</span>
                            <span className="text-[10px] text-[#77736D]">ID: {product.id}</span>
                          </div>
                        </td>
                        <td className="p-4 text-xs text-[#77736D]">{product.category}</td>
                        <td className="p-4 text-xs font-bold text-[#171717]">
                          ₦{(product.salePrice || product.price).toLocaleString()}
                        </td>
                        <td className="p-4 text-xs">
                          <span className={`px-2 py-1 text-[10px] uppercase font-semibold ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.inStock ? 'In Stock' : 'Out'}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setIsCreatingProduct(false);
                            }}
                            className="p-2 bg-[#FAF7F2] hover:bg-[#C5A36A] hover:text-white transition-colors"
                            aria-label="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${product.name}?`)) {
                                onDeleteProduct(product.id);
                              }
                            }}
                            className="p-2 bg-[#FAF7F2] hover:bg-red-600 hover:text-white transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* HERO SLIDES TAB */}
          {activeTab === 'hero' && (
            <div>
              <div className="mb-6">
                <h3 className="font-serif text-xl font-bold text-[#171717]">Hero Banner Management</h3>
                <p className="text-xs text-[#77736D]">Customize the cinematic hero slides displayed on the homepage.</p>
              </div>

              {editingSlide ? (
                <div className="bg-white border border-[#E9DFD1] p-6 mb-8">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#E9DFD1]">
                    <h4 className="font-serif text-lg font-bold">Edit Hero Slide</h4>
                    <button onClick={() => setEditingSlide(null)}><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={handleSlideSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Headline</label>
                      <input type="text" name="headline" required defaultValue={editingSlide.headline} className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Subtitle</label>
                      <input type="text" name="subtitle" required defaultValue={editingSlide.subtitle} className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Button Text</label>
                      <input type="text" name="buttonText" required defaultValue={editingSlide.buttonText} className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Image URL</label>
                      <input type="url" name="image" required defaultValue={editingSlide.image} className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <button type="button" onClick={() => setEditingSlide(null)} className="bg-gray-200 px-6 py-2.5 text-xs uppercase font-semibold">Cancel</button>
                      <button type="submit" className="bg-[#171717] hover:bg-[#C5A36A] text-white px-8 py-2.5 text-xs uppercase tracking-widest font-semibold">Save Slide</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {heroSlides.map((slide, idx) => (
                    <div key={slide.id} className="bg-white border border-[#E9DFD1] overflow-hidden flex flex-col">
                      <div className="relative aspect-[16/9] bg-[#FAF7F2]">
                        <img src={slide.image} alt="" className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-[#171717] text-white text-[10px] px-2 py-0.5">Slide {idx + 1}</span>
                      </div>
                      <div className="p-4 flex flex-col flex-grow justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-sm mb-1">{slide.headline}</h4>
                          <p className="text-xs text-[#77736D] line-clamp-2">{slide.subtitle}</p>
                        </div>
                        <button
                          onClick={() => setEditingSlide(slide)}
                          className="mt-4 w-full bg-[#FAF7F2] hover:bg-[#C5A36A] hover:text-white py-2 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit Slide
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div>
              <div className="mb-6">
                <h3 className="font-serif text-xl font-bold text-[#171717]">Customer Orders</h3>
                <p className="text-xs text-[#77736D]">Review orders initiated by customers via WhatsApp checkout.</p>
              </div>

              {orders.length === 0 ? (
                <div className="bg-white border border-[#E9DFD1] p-12 text-center text-[#77736D]">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">No customer orders recorded yet during this session.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-white border border-[#E9DFD1] p-6 shadow-sm">
                      <div className="flex justify-between items-start pb-4 border-b border-[#E9DFD1]">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-[#C5A36A] font-bold">{ord.id}</span>
                          <h4 className="font-serif text-lg font-bold text-[#171717]">{ord.customerName}</h4>
                          <span className="text-xs text-[#77736D]">Phone: {ord.phone} | Address: {ord.address}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-bold text-[#171717]">₦{ord.totalAmount.toLocaleString()}</span>
                          <span className="block text-[11px] text-green-700 bg-green-50 px-2.5 py-0.5 rounded mt-1 font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> {ord.status}
                          </span>
                        </div>
                      </div>
                      <div className="pt-4">
                        <h5 className="text-xs uppercase tracking-wider font-semibold text-[#77736D] mb-2">Ordered Items:</h5>
                        <div className="space-y-1">
                          {ord.items.map((item, i) => (
                            <div key={i} className="text-xs text-[#171717] flex justify-between">
                              <span>{item.quantity}x {item.productName} ({item.size}, {item.color})</span>
                              <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div>
              <div className="mb-6">
                <h3 className="font-serif text-xl font-bold text-[#171717]">Store & Contact Settings</h3>
                <p className="text-xs text-[#77736D]">Update business phone, WhatsApp number, and brand information.</p>
              </div>

              <div className="bg-white border border-[#E9DFD1] p-6 max-w-2xl">
                <form onSubmit={handleStoreInfoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Business Name</label>
                    <input
                      type="text"
                      value={currentStoreInfo.name}
                      onChange={(e) => setCurrentStoreInfo({ ...currentStoreInfo, name: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Business Phone</label>
                    <input
                      type="text"
                      value={currentStoreInfo.phone}
                      onChange={(e) => setCurrentStoreInfo({ ...currentStoreInfo, phone: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-1">WhatsApp Number (e.g. 2349037327260)</label>
                    <input
                      type="text"
                      value={currentStoreInfo.whatsappNumber}
                      onChange={(e) => setCurrentStoreInfo({ ...currentStoreInfo, whatsappNumber: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Store Tagline</label>
                    <input
                      type="text"
                      value={currentStoreInfo.tagline}
                      onChange={(e) => setCurrentStoreInfo({ ...currentStoreInfo, tagline: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-1">About Boutique Text</label>
                    <textarea
                      rows={4}
                      value={currentStoreInfo.aboutText}
                      onChange={(e) => setCurrentStoreInfo({ ...currentStoreInfo, aboutText: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#E9DFD1] p-3 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#171717] hover:bg-[#C5A36A] text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    Save Settings
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
