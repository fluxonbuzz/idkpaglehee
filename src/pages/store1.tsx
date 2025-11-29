import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Zap, Star, Tag, Gift, ShieldCheck, Download, X, Check, ArrowRight, Home, Users, AlertCircle, Clock, Plus, Edit, Trash2, Search, Heart, ChevronRight, ChevronLeft, Menu, User, Package, Settings, MessageCircle, LogOut, Bell, CreditCard, MapPin, BarChart3, Camera, QrCode, Shirt } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Product {
  id: string;
  name: string;
  category: 'bundle' | 'account' | 'tool' | 'service' | 'mod' | 'jersey';
  price: number;
  original_price?: number;
  description: string;
  features?: string[];
  tags?: string[];
  seller_contact?: string;
  mod_options?: {
    name: string;
    price: number;
  }[];
  is_pre_order?: boolean;
  pre_order_discount?: {
    original_price: number;
    discount_price: number;
    end_date: string;
  };
  images?: string[];
  jersey_file?: string;
  jersey_thumbnail?: string;
  is_exclusive?: boolean;
  qr_code?: string;
}

interface CartItem extends Product {
  quantity: number;
  selectedMod?: {
    name: string;
    price: number;
  };
}

interface DiscountCode {
  code: string;
  discount: number;
  minPurchase: number;
  type: 'percentage' | 'fixed';
}

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

// Toast Notification
const Toast = ({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error' | 'info'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-[100] p-4 rounded-2xl backdrop-blur-lg border transition-all duration-300 animate-slide-in ${
      type === 'success' 
        ? 'bg-red-500/10 border-red-500/30 text-red-300' 
        : type === 'error'
        ? 'bg-red-500/10 border-red-500/30 text-red-300'
        : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          type === 'success' ? 'bg-red-400' : type === 'error' ? 'bg-red-400' : 'bg-blue-400'
        }`}></div>
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Success Animation Component
const SuccessAnimation = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 text-center max-w-sm mx-4">
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale">
          <Check size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Order Placed!</h3>
        <p className="text-gray-300">Your order has been confirmed</p>
      </div>
    </div>
  );
};

// Order Progress Tracker
const OrderProgress = ({ status }: { status: string }) => {
  const steps = [
    { key: 'pending', label: 'Ordered' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const currentIndex = steps.findIndex(step => step.key === status);

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.key} className="flex flex-col items-center flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
            index <= currentIndex
              ? 'bg-red-500 border-red-500 text-white'
              : 'bg-gray-700 border-gray-600 text-gray-400'
          }`}>
            {index < currentIndex ? <Check size={14} /> : index + 1}
          </div>
          <span className={`text-xs mt-2 text-center ${
            index <= currentIndex ? 'text-red-400' : 'text-gray-400'
          }`}>
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div className={`h-1 flex-1 mt-4 -mx-4 z-0 ${
              index < currentIndex ? 'bg-red-500' : 'bg-gray-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

// Support Chat Component
const SupportChat = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = { id: Date.now(), text: newMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, 
        { id: Date.now() + 1, text: 'Thanks for your message. Our team will get back to you soon!', sender: 'bot' }
      ]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-end p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-gray-800/90 backdrop-blur-lg rounded-2xl w-full max-w-md h-96 shadow-xl border border-red-800/30">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <MessageCircle size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold">Support Chat</h3>
              <p className="text-xs text-gray-400">@redstorebot</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        
        <div className="h-64 p-4 overflow-y-auto space-y-3">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs p-3 rounded-2xl ${
                message.sender === 'user' 
                  ? 'bg-red-600 text-white rounded-br-none' 
                  : 'bg-gray-700 text-gray-100 rounded-bl-none'
              }`}>
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 p-3 rounded-2xl rounded-bl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
            <button
              onClick={sendMessage}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-2xl transition-all active:scale-95"
            >
              <MessageCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Smart Search Component
const SearchBar = ({ onSearch, onResultSelect, products }: { onSearch: (query: string) => void; onResultSelect: (product: Product) => void; products: Product[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
    
    if (value.length > 1) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 backdrop-blur-sm"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {results.map(product => (
            <div
              key={product.id}
              onClick={() => {
                onResultSelect(product);
                setIsOpen(false);
                setQuery('');
              }}
              className="p-4 border-b border-gray-700/50 last:border-b-0 hover:bg-gray-700/50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center">
                  {product.category === 'jersey' ? (
                    <Shirt size={20} className="text-white" />
                  ) : (
                    <span className="text-white text-sm">📦</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{product.name}</h4>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-1">{product.description}</p>
                </div>
                <div className="text-red-300 font-bold">₹{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && typeof window !== 'undefined' && window.innerWidth < 768 && (
        <div className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => setIsOpen(false)} className="p-2">
                <ChevronLeft size={20} />
              </button>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  autoFocus
                />
              </div>
            </div>
            
            <div className="space-y-2">
              {results.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    onResultSelect(product);
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:bg-gray-700/50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center">
                      {product.category === 'jersey' ? (
                        <Shirt size={24} className="text-white" />
                      ) : (
                        <span className="text-white">📦</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-gray-400 text-sm mt-1">{product.description}</p>
                      <div className="text-red-300 font-bold mt-2">₹{product.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// QR Code Modal Component
const QRCodeModal = ({ qrCode, onClose }: { qrCode: string; onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
    <div className="relative bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 max-w-sm w-full border border-red-800/50">
      <div className="text-center">
        <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <QrCode size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-bold mb-4">Payment QR Code</h3>
        <div className="bg-white p-4 rounded-2xl mb-6">
          <img 
            src={qrCode} 
            alt="Payment QR Code" 
            className="w-full h-auto rounded-xl"
          />
        </div>
        <p className="text-gray-300 text-sm mb-6">
          Scan this QR code to complete your payment. Your order will be confirmed after payment verification.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-2xl transition-all active:scale-95"
        >
          I've Completed Payment
        </button>
      </div>
    </div>
  </div>
);

// Jersey Uploader Component
const JerseyUploader = ({ onUploadComplete }: { onUploadComplete: () => void }) => {
  const [uploading, setUploading] = useState(false);
  const [jerseyData, setJerseyData] = useState({
    name: '',
    price: 0,
    original_price: 0,
    description: '',
    is_exclusive: false,
    jersey_file: null as File | null,
    jersey_thumbnail: null as File | null,
    qr_code: null as File | null
  });

  const handleUpload = async () => {
    if (!jerseyData.name || !jerseyData.price || !jerseyData.jersey_file || !jerseyData.jersey_thumbnail) {
      alert('Please fill all required fields and upload both jersey file and thumbnail');
      return;
    }

    setUploading(true);
    const token = localStorage.getItem('authToken');
    
    try {
      const formData = new FormData();
      formData.append('name', jerseyData.name);
      formData.append('price', jerseyData.price.toString());
      formData.append('original_price', jerseyData.original_price.toString());
      formData.append('description', jerseyData.description);
      formData.append('category', 'jersey');
      formData.append('is_exclusive', jerseyData.is_exclusive.toString());
      formData.append('jersey_file', jerseyData.jersey_file);
      formData.append('jersey_thumbnail', jerseyData.jersey_thumbnail);
      if (jerseyData.qr_code) {
        formData.append('qr_code', jerseyData.qr_code);
      }

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      
      alert('Jersey uploaded successfully!');
      setJerseyData({
        name: '',
        price: 0,
        original_price: 0,
        description: '',
        is_exclusive: false,
        jersey_file: null,
        jersey_thumbnail: null,
        qr_code: null
      });
      onUploadComplete();
    } catch (error) {
      alert('Failed to upload jersey');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Shirt size={20} /> Upload New Jersey
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Jersey Name"
          value={jerseyData.name}
          onChange={(e) => setJerseyData({...jerseyData, name: e.target.value})}
          className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
        <input
          type="number"
          placeholder="Price"
          value={jerseyData.price}
          onChange={(e) => setJerseyData({...jerseyData, price: Number(e.target.value)})}
          className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
        <input
          type="number"
          placeholder="Original Price (optional)"
          value={jerseyData.original_price}
          onChange={(e) => setJerseyData({...jerseyData, original_price: Number(e.target.value)})}
          className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="exclusive"
            checked={jerseyData.is_exclusive}
            onChange={(e) => setJerseyData({...jerseyData, is_exclusive: e.target.checked})}
            className="rounded"
          />
          <label htmlFor="exclusive" className="text-sm text-gray-300">
            Exclusive Jersey
          </label>
        </div>
        <textarea
          placeholder="Description"
          value={jerseyData.description}
          onChange={(e) => setJerseyData({...jerseyData, description: e.target.value})}
          rows={3}
          className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white md:col-span-2 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
        
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Jersey File (Required)</label>
            <input
              type="file"
              accept=".zip,.rar,.7z,.pdf"
              onChange={(e) => setJerseyData({...jerseyData, jersey_file: e.target.files?.[0] || null})}
              className="w-full bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Jersey Thumbnail (Required)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setJerseyData({...jerseyData, jersey_thumbnail: e.target.files?.[0] || null})}
              className="w-full bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">QR Code (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setJerseyData({...jerseyData, qr_code: e.target.files?.[0] || null})}
              className="w-full bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload Jersey'}
      </button>
    </div>
  );
};

// Admin Panel Component
const AdminPanel = ({ 
  isOpen, 
  onClose, 
  products, 
  onProductUpdate,
  adminSection 
}: { 
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onProductUpdate: () => void;
  adminSection: string;
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'account',
    price: 0,
    description: '',
    tags: [],
    features: [],
    images: ['/product-placeholder.jpg']
  });

  const saveProduct = async (product: Partial<Product>) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please login to manage products');
      return;
    }

    try {
      const isUpdate = editingProduct && editingProduct.id;
      const method = isUpdate ? 'PUT' : 'POST';
      const url = isUpdate ? `/api/products/${editingProduct.id}` : '/api/products';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || errorData.message || 'Failed to save product');
      }

      await onProductUpdate();
      setEditingProduct(null);
      setNewProduct({
        name: '',
        category: 'account',
        price: 0,
        description: '',
        tags: [],
        features: [],
        images: ['/product-placeholder.jpg']
      });
      alert('Product saved successfully!');
    } catch (error: any) {
      alert('Failed to save product: ' + (error.message || 'Unknown error'));
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please login to manage products');
      return;
    }

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete product');
      }

      await onProductUpdate();
      alert('Product deleted successfully!');
    } catch (error: any) {
      alert('Failed to delete product: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-gray-800/90 backdrop-blur-lg rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-red-800/50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Panel - {adminSection.charAt(0).toUpperCase() + adminSection.slice(1)}</h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-gray-600/50 transition"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto">
            {['dashboard', 'products', 'jerseys', 'orders', 'users', 'settings'].map((section) => (
              <button
                key={section}
                onClick={() => window.location.hash = section}
                className={`px-4 py-2 rounded-2xl transition-all whitespace-nowrap ${
                  adminSection === section 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {adminSection === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-bold mb-2">Total Products</h3>
                <p className="text-3xl font-bold text-red-400">{products.length}</p>
              </div>
              <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-bold mb-2">Total Orders</h3>
                <p className="text-3xl font-bold text-green-400">24</p>
              </div>
              <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-bold mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-blue-400">₹12,459</p>
              </div>
            </div>
          )}

          {adminSection === 'products' && (
            <div className="space-y-6">
              <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
                <h3 className="text-lg font-bold mb-4">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={editingProduct ? editingProduct.name : newProduct.name || ''}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({...editingProduct, name: e.target.value})
                      : setNewProduct({...newProduct, name: e.target.value})
                    }
                    className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                  <select
                    value={editingProduct ? editingProduct.category : newProduct.category}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({...editingProduct, category: e.target.value as any})
                      : setNewProduct({...newProduct, category: e.target.value as any})
                    }
                    className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  >
                    <option value="account">Premium Account</option>
                    <option value="tool">Game Tool</option>
                    <option value="service">Custom Service</option>
                    <option value="mod">Mod Menu</option>
                    <option value="bundle">Bundle</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price"
                    value={editingProduct ? editingProduct.price : newProduct.price || ''}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({...editingProduct, price: Number(e.target.value)})
                      : setNewProduct({...newProduct, price: Number(e.target.value)})
                    }
                    className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                  <input
                    type="number"
                    placeholder="Original Price (optional)"
                    value={editingProduct ? editingProduct.original_price || '' : newProduct.original_price || ''}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({...editingProduct, original_price: e.target.value ? Number(e.target.value) : undefined})
                      : setNewProduct({...newProduct, original_price: e.target.value ? Number(e.target.value) : undefined})
                    }
                    className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                  <textarea
                    placeholder="Description"
                    value={editingProduct ? editingProduct.description : newProduct.description || ''}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({...editingProduct, description: e.target.value})
                      : setNewProduct({...newProduct, description: e.target.value})
                    }
                    rows={3}
                    className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white md:col-span-2 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={((editingProduct ? editingProduct.tags : newProduct.tags) || []).join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                      editingProduct 
                        ? setEditingProduct({...editingProduct, tags})
                        : setNewProduct({...newProduct, tags})
                    }}
                    className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white md:col-span-2 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                  <input
                    type="text"
                    placeholder="Features (comma separated)"
                    value={((editingProduct ? editingProduct.features : newProduct.features) || []).join(', ')}
                    onChange={(e) => {
                      const features = e.target.value.split(',').map(feature => feature.trim()).filter(feature => feature);
                      editingProduct 
                        ? setEditingProduct({...editingProduct, features})
                        : setNewProduct({...newProduct, features})
                    }}
                    className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white md:col-span-2 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => editingProduct ? saveProduct(editingProduct) : saveProduct(newProduct)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-2xl transition-all active:scale-95"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  {editingProduct && (
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-2xl transition-all active:scale-95"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Existing Products ({products.length})</h3>
                <div className="space-y-3">
                  {products.map(product => (
                    <div key={product.id} className="bg-gray-700/30 rounded-2xl p-4 border border-gray-600/30">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-bold">{product.name}</h4>
                          <p className="text-sm text-gray-300 mt-1">{product.description}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">
                              {product.category}
                            </span>
                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                              ₹{product.price}
                            </span>
                            {product.original_price && (
                              <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                                Was ₹{product.original_price}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="p-2 bg-blue-600/50 hover:bg-blue-600/70 rounded-2xl transition-all active:scale-95"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 bg-red-600/50 hover:bg-red-600/70 rounded-2xl transition-all active:scale-95"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No products yet. Add your first product above!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {adminSection === 'jerseys' && (
            <div className="space-y-6">
              <JerseyUploader onUploadComplete={onProductUpdate} />
              
              <div>
                <h3 className="text-lg font-bold mb-4">Existing Jerseys</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.filter(p => p.category === 'jersey').map(jersey => (
                    <div key={jersey.id} className="bg-gray-700/30 rounded-2xl p-4 border border-gray-600/30">
                      <div className="flex items-start gap-4">
                        {jersey.jersey_thumbnail ? (
                          <img 
                            src={jersey.jersey_thumbnail} 
                            alt={jersey.name}
                            className="w-20 h-20 rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center">
                            <Shirt size={24} className="text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-bold">{jersey.name}</h4>
                          <p className="text-sm text-gray-300 mt-1">{jersey.description}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">
                              ₹{jersey.price}
                            </span>
                            {jersey.is_exclusive && (
                              <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                                Exclusive
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingProduct(jersey)}
                            className="p-2 bg-blue-600/50 hover:bg-blue-600/70 rounded-2xl transition-all active:scale-95"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteProduct(jersey.id)}
                            className="p-2 bg-red-600/50 hover:bg-red-600/70 rounded-2xl transition-all active:scale-95"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {products.filter(p => p.category === 'jersey').length === 0 && (
                    <div className="text-center py-8 text-gray-400 md:col-span-2">
                      No jerseys yet. Upload your first jersey above!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {adminSection === 'orders' && (
            <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-bold mb-4">Order Management</h3>
              <div className="text-center py-8 text-gray-400">
                Order management system will be implemented here
              </div>
            </div>
          )}

          {adminSection === 'users' && (
            <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-bold mb-4">User Management</h3>
              <div className="text-center py-8 text-gray-400">
                User management system will be implemented here
              </div>
            </div>
          )}

          {adminSection === 'settings' && (
            <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-bold mb-4">Store Settings</h3>
              <div className="text-center py-8 text-gray-400">
                Store settings will be implemented here
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const discountCodes: DiscountCode[] = [
  { code: 'WELCOME10', discount: 10, minPurchase: 100, type: 'percentage' },
  { code: 'RED20', discount: 20, minPurchase: 200, type: 'percentage' },
  { code: 'SAVE50', discount: 50, minPurchase: 250, type: 'fixed' }
];

export default function StorePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [discountError, setDiscountError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedMod, setSelectedMod] = useState<{ name: string; price: number } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [me, setMe] = useState<User | null>(null);
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [showSupport, setShowSupport] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [adminSection, setAdminSection] = useState('dashboard');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [currentQRCode, setCurrentQRCode] = useState('');

  const cartIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const initializeApp = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setAuthLoading(false);
        router.push('/login?redirect=/store');
        return;
      }

      try {
        const meRes = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (meRes.ok) {
          const meData = await meRes.json();
          const userData = meData.user || meData;
          
          setMe({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role || 'user'
          });
          
          await loadInitialData();
        } else {
          localStorage.removeItem('authToken');
          setAuthLoading(false);
          router.push('/login?redirect=/store');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
        setAuthLoading(false);
        router.push('/login?redirect=/store');
      }
    };

    initializeApp();
  }, []);

  const loadInitialData = async () => {
    await Promise.all([
      loadProducts(),
      loadOrders(),
      loadWishlist()
    ]);
    
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('redstore-cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          setCart([]);
        }
      }
    }
    
    setAuthLoading(false);
  };

  const loadProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to load products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  const loadOrders = async () => {
    setOrdersLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const res = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        setMyOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      setMyOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  const loadWishlist = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const res = await fetch('/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        setWishlist(data.wishlist?.map((item: any) => item.product_id) || []);
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('redstore-cart', JSON.stringify(cart));
    }
  }, [cart]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const animateCart = () => {
    if (cartIconRef.current) {
      cartIconRef.current.classList.add('animate-bounce');
      setTimeout(() => {
        cartIconRef.current?.classList.remove('animate-bounce');
      }, 600);
    }
  };

  const toggleWishlist = async (productId: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      showToast('Please login to manage wishlist', 'error');
      return;
    }

    try {
      const isInWishlist = wishlist.includes(productId);
      const method = isInWishlist ? 'DELETE' : 'POST';
      const url = isInWishlist ? `/api/wishlist/${productId}` : '/api/wishlist';

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: !isInWishlist ? JSON.stringify({ product_id: productId }) : undefined
      });

      if (res.ok) {
        setWishlist(prev => {
          const newWishlist = isInWishlist
            ? prev.filter(id => id !== productId)
            : [...prev, productId];
          
          showToast(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
          return newWishlist;
        });
      } else {
        throw new Error('Failed to update wishlist');
      }
    } catch (error) {
      showToast('Failed to update wishlist', 'error');
    }
  };

  const addToCart = (product: Product) => {
    if (product.category === 'mod' && product.mod_options && product.mod_options.length > 0 && !selectedMod) {
      showToast('Please select a mod option first', 'error');
      return;
    }

    const existingItemIndex = cart.findIndex(
      item => item.id === product.id && 
      (!product.mod_options || item.selectedMod?.name === selectedMod?.name)
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const cartItem: CartItem = {
        ...product,
        quantity: 1,
        selectedMod: selectedMod || undefined
      };
      setCart([...cart, cartItem]);
    }

    setSelectedProduct(null);
    setSelectedMod(null);
    animateCart();
    
    const itemName = selectedMod ? `${product.name} - ${selectedMod.name}` : product.name;
    showToast(`${itemName} added to cart!`);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    showToast('Item removed from cart');
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
  };

  const applyDiscount = () => {
    const code = discountCodes.find(dc => dc.code === discountCode.toUpperCase());
    if (!code) {
      setDiscountError('Invalid discount code');
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.selectedMod ? item.selectedMod.price : item.price) * item.quantity, 0);
    if (subtotal < code.minPurchase) {
      setDiscountError(`Minimum purchase of ₹${code.minPurchase} required`);
      return;
    }

    setAppliedDiscount(code);
    setDiscountError('');
    showToast('Discount applied successfully!');
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    showToast('Discount removed');
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.selectedMod ? item.selectedMod.price : item.price) * item.quantity, 0);
    
    let discount = 0;
    if (appliedDiscount) {
      if (appliedDiscount.type === 'percentage') {
        discount = subtotal * (appliedDiscount.discount / 100);
      } else {
        discount = appliedDiscount.discount;
      }
    }

    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login?redirect=/store');
      return;
    }

    if (!agreeToTerms) {
      setDiscountError('You must agree to the terms and conditions');
      return;
    }

    if (cart.length === 0) {
      setDiscountError('Your cart is empty');
      return;
    }

    // Check if any product has QR code
    const productWithQR = cart.find(item => item.qr_code);
    if (productWithQR) {
      setCurrentQRCode(productWithQR.qr_code!);
      setShowQRCode(true);
      return;
    }

    await processCheckout();
  };

  const processCheckout = async () => {
    setCheckoutLoading(true);
    setDiscountError('');

    try {
      const { subtotal, discount, total } = calculateTotal();
      
      const orderPayload = {
        items: cart.map((item) => ({
          product_id: item.id,
          name: item.selectedMod ? `${item.name} - ${item.selectedMod.name}` : item.name,
          quantity: item.quantity,
          unit_price: item.selectedMod ? item.selectedMod.price : item.price,
          selected_mod: item.selectedMod || null,
          category: item.category,
        })),
        discount: appliedDiscount ? { 
          code: appliedDiscount.code, 
          amount: discount 
        } : null,
        subtotal: subtotal,
        total: total,
        status: 'pending',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ order: orderPayload }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || errorData.error || 'Failed to create order');
      }

      const data = await res.json();

      setCart([]);
      localStorage.removeItem('redstore-cart');
      setShowCart(false);
      setShowSuccess(true);
      
      await loadOrders();
      
      showToast('Order placed successfully! You can view your order in "My Orders" section.');
      
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to place order. Please try again.';
      setDiscountError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Enhanced Slide Bar Component with Red Theme
  const SlideBar = () => (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
      <div className="relative w-80 h-full bg-gray-800/90 backdrop-blur-lg border-r border-red-800/30 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Red Store
            </h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-gray-600/50 transition"
            >
              <X size={16} />
            </button>
          </div>
          
          {me && (
            <div className="mb-8 p-4 bg-gray-700/30 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold">
                  {me.name?.charAt(0) || me.email.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{me.name || 'User'}</div>
                  <div className="text-sm text-gray-400">{me.email}</div>
                  <div className="text-xs text-red-300 capitalize mt-1">{me.role}</div>
                </div>
              </div>
            </div>
          )}
          
          <nav className="space-y-2 mb-8">
            <button 
              onClick={() => { setActiveTab('home'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                activeTab === 'home' ? 'bg-red-600/20 text-red-300' : 'hover:bg-gray-700/50'
              }`}
            >
              <Home size={20} /> Home
            </button>
            <button 
              onClick={() => { setActiveTab('orders'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                activeTab === 'orders' ? 'bg-red-600/20 text-red-300' : 'hover:bg-gray-700/50'
              }`}
            >
              <Package size={20} /> My Orders
            </button>
            <button 
              onClick={() => { setActiveTab('wishlist'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                activeTab === 'wishlist' ? 'bg-red-600/20 text-red-300' : 'hover:bg-gray-700/50'
              }`}
            >
              <Heart size={20} /> Wishlist
            </button>
            <button 
              onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                activeTab === 'profile' ? 'bg-red-600/20 text-red-300' : 'hover:bg-gray-700/50'
              }`}
            >
              <User size={20} /> Profile
            </button>
          </nav>

          {me?.role === 'admin' && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Admin</h3>
              <nav className="space-y-2">
                {['dashboard', 'products', 'jerseys', 'orders', 'users', 'settings'].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      setAdminSection(section);
                      setShowAdminPanel(true);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${
                      adminSection === section ? 'bg-red-600/20 text-red-300' : 'hover:bg-gray-700/50'
                    }`}
                  >
                    {section === 'dashboard' && <BarChart3 size={18} />}
                    {section === 'products' && <Package size={18} />}
                    {section === 'jerseys' && <Shirt size={18} />}
                    {section === 'orders' && <ShoppingCart size={18} />}
                    {section === 'users' && <Users size={18} />}
                    {section === 'settings' && <Settings size={18} />}
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          )}

          <div className="space-y-2">
            <button 
              onClick={() => { setShowSupport(true); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-700/50 transition-all"
            >
              <MessageCircle size={20} /> Support Chat
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('authToken');
                localStorage.removeItem('redstore-cart');
                localStorage.removeItem('redstore-wishlist');
                setMe(null);
                setMyOrders([]);
                setCart([]);
                setWishlist([]);
                router.push('/login');
              }}
              className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-500/20 text-red-400 transition-all"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Bottom Navigation Component
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-lg border-t border-gray-700/50 z-40 md:hidden">
      <div className="flex justify-around items-center p-3">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'orders', icon: Package, label: 'Orders' },
          { id: 'wishlist', icon: Heart, label: 'Wishlist' },
          { id: 'profile', icon: User, label: 'Profile' }
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center p-2 rounded-2xl transition-all flex-1 mx-1 ${
              activeTab === id ? 'text-red-400 bg-red-600/20' : 'text-gray-400'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Render different sections based on active tab
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'orders':
        return <OrdersSection orders={myOrders} />;
      case 'wishlist':
        return <WishlistSection 
          products={products.filter(p => wishlist.includes(p.id))}
          onProductSelect={setSelectedProduct}
          onWishlistToggle={toggleWishlist}
        />;
      case 'profile':
        return <ProfileSection user={me} />;
      default:
        return <HomeSection 
          products={products}
          searchQuery={searchQuery}
          onProductSelect={setSelectedProduct}
          onWishlistToggle={toggleWishlist}
          wishlist={wishlist}
          productsLoading={productsLoading}
        />;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading store...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white pb-16 md:pb-0">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showSuccess && <SuccessAnimation onComplete={() => setShowSuccess(false)} />}
      {showSupport && <SupportChat onClose={() => setShowSupport(false)} />}
      {showQRCode && <QRCodeModal qrCode={currentQRCode} onClose={processCheckout} />}

      <SlideBar />

      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        products={products}
        onProductUpdate={loadProducts}
        adminSection={adminSection}
      />

      <header className="bg-gray-800/30 backdrop-blur-xl sticky top-0 z-40 border-b border-red-800/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-2xl bg-gray-700/50 hover:bg-gray-600/50 transition-all active:scale-95"
              >
                <Menu size={20} />
              </button>
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                Red Store
              </Link>
            </div>

            {activeTab === 'home' && (
              <div className="hidden md:flex flex-1 max-w-md mx-4">
                <SearchBar 
                  onSearch={setSearchQuery}
                  onResultSelect={setSelectedProduct}
                  products={products}
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              {me?.role === 'admin' && (
                <button 
                  onClick={() => setShowAdminPanel(true)}
                  className="p-2 rounded-2xl bg-red-700/50 hover:bg-red-600/50 transition-all active:scale-95"
                >
                  <ShieldCheck size={20} />
                </button>
              )}
              <button 
                ref={cartIconRef}
                onClick={() => setShowCart(true)}
                className="relative p-2 rounded-2xl bg-red-700/50 hover:bg-red-600/50 transition-all active:scale-95"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {activeTab === 'home' && (
            <div className="mt-3 md:hidden">
              <SearchBar 
                onSearch={setSearchQuery}
                onResultSelect={setSelectedProduct}
                products={products}
              />
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {renderActiveSection()}
      </main>

      <BottomNav />

      {showCart && (
        <CartDrawer
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          discountCode={discountCode}
          onDiscountCodeChange={setDiscountCode}
          appliedDiscount={appliedDiscount}
          onApplyDiscount={applyDiscount}
          onRemoveDiscount={removeDiscount}
          discountError={discountError}
          agreeToTerms={agreeToTerms}
          onAgreeToTermsChange={setAgreeToTerms}
          onCheckout={handleCheckout}
          checkoutLoading={checkoutLoading}
          calculateTotal={calculateTotal}
        />
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          selectedMod={selectedMod}
          onModSelect={setSelectedMod}
          onAddToCart={addToCart}
          onClose={() => {
            setSelectedProduct(null);
            setSelectedMod(null);
          }}
        />
      )}
    </div>
  );
}

// Section Components
const HomeSection = ({ products, searchQuery, onProductSelect, onWishlistToggle, wishlist, productsLoading }: any) => {
  const categoryNames = {
    bundle: 'Special Bundles',
    account: 'Premium Accounts',
    tool: 'Game Tools',
    service: 'Custom Services',
    mod: 'Mod Menus',
    jersey: 'Exclusive Jerseys'
  };

  const filteredProducts = (category: string) => 
    products.filter((product: any) => 
      product.category === category &&
      (searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const allProducts = searchQuery ? 
    products.filter((product: any) => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) : products;

  if (productsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-800/30 rounded-2xl border border-gray-700/50 overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-700/50"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-700/50 rounded mb-3"></div>
              <div className="h-4 bg-gray-700/50 rounded mb-2"></div>
              <div className="h-4 bg-gray-700/50 rounded w-2/3 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-700/50 rounded w-20"></div>
                <div className="h-10 bg-gray-700/50 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <section className="mb-12 text-center">
        <div className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-2xl text-sm font-medium mb-6 shadow-lg backdrop-blur-sm">
          🎮 Premium Digital Products
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-300 to-orange-400 bg-clip-text text-transparent leading-tight">
          Game Like A Pro
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Exclusive accounts, tools, and jerseys for serious gamers
        </p>
      </section>

      {/* Exclusive Jerseys Section with Glowing Effect */}
      {!searchQuery && filteredProducts('jersey').length > 0 && (
        <section id="jerseys" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <div className="relative">
                <Shirt size={24} className="text-red-400" />
                <div className="absolute inset-0 text-red-400 blur-sm opacity-75">
                  <Shirt size={24} />
                </div>
              </div>
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Exclusive Jerseys
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts('jersey').map((product: any) => (
              <JerseyCard 
                key={product.id}
                product={product}
                onSelect={onProductSelect}
                onWishlistToggle={onWishlistToggle}
                isInWishlist={wishlist.includes(product.id)}
              />
            ))}
          </div>
        </section>
      )}

      {!searchQuery ? (
        Object.entries(categoryNames).map(([categoryKey, categoryName]) => {
          if (categoryKey === 'jersey') return null; // Already handled above
          
          const categoryProducts = filteredProducts(categoryKey);
          if (categoryProducts.length === 0) return null;
          
          return (
            <section key={categoryKey} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  {categoryKey === 'bundle' && <Gift size={24} className="text-orange-400" />}
                  {categoryKey === 'account' && <ShieldCheck size={24} className="text-red-400" />}
                  {categoryKey === 'tool' && <Zap size={24} className="text-blue-400" />}
                  {categoryKey === 'service' && <Star size={24} className="text-yellow-400" />}
                  {categoryKey === 'mod' && <Download size={24} className="text-green-400" />}
                  {categoryName}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product: any) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onSelect={onProductSelect}
                    onWishlistToggle={onWishlistToggle}
                    isInWishlist={wishlist.includes(product.id)}
                  />
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.map((product: any) => (
            product.category === 'jersey' ? (
              <JerseyCard 
                key={product.id}
                product={product}
                onSelect={onProductSelect}
                onWishlistToggle={onWishlistToggle}
                isInWishlist={wishlist.includes(product.id)}
              />
            ) : (
              <ProductCard 
                key={product.id}
                product={product}
                onSelect={onProductSelect}
                onWishlistToggle={onWishlistToggle}
                isInWishlist={wishlist.includes(product.id)}
              />
            )
          ))}
        </div>
      )}
    </>
  );
};

const OrdersSection = ({ orders }: any) => (
  <div>
    <h2 className="text-2xl font-bold mb-8">My Orders</h2>
    {orders.length === 0 ? (
      <div className="text-center py-16">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">No orders yet</p>
      </div>
    ) : (
      <div className="space-y-6">
        {orders.map((order: any) => (
          <div key={order.id} className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <OrderProgress status={order.status} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Order ID</div>
                <div className="font-medium">#{order.id?.slice(0, 8)}</div>
              </div>
              <div>
                <div className="text-gray-400">Date</div>
                <div className="font-medium">
                  {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Total</div>
                <div className="font-medium">₹{order.total || 0}</div>
              </div>
              <div>
                <div className="text-gray-400">Status</div>
                <div className={`font-medium ${
                  order.status === 'delivered' ? 'text-green-400' : 
                  order.status === 'cancelled' ? 'text-red-400' : 
                  'text-yellow-400'
                }`}>
                  {order.status || 'pending'}
                </div>
              </div>
            </div>
            {order.admin_message && (
              <div className="mt-4 p-3 rounded-lg border border-blue-500/30 bg-blue-500/10 text-sm">
                <div className="text-gray-300">Message from Admin</div>
                <div className="text-white font-medium mt-1">{order.admin_message}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

const WishlistSection = ({ products, onProductSelect, onWishlistToggle }: any) => (
  <div>
    <h2 className="text-2xl font-bold mb-8">My Wishlist</h2>
    {products.length === 0 ? (
      <div className="text-center py-16">
        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Your wishlist is empty</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          product.category === 'jersey' ? (
            <JerseyCard 
              key={product.id}
              product={product}
              onSelect={onProductSelect}
              onWishlistToggle={onWishlistToggle}
              isInWishlist={true}
            />
          ) : (
            <ProductCard 
              key={product.id}
              product={product}
              onSelect={onProductSelect}
              onWishlistToggle={onWishlistToggle}
              isInWishlist={true}
            />
          )
        ))}
      </div>
    )}
  </div>
);

const ProfileSection = ({ user }: any) => (
  <div>
    <h2 className="text-2xl font-bold mb-8">My Profile</h2>
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
          {user?.name?.charAt(0) || user?.email.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-xl font-bold">{user?.name || 'User'}</h3>
          <p className="text-gray-400">{user?.email}</p>
          <div className="text-sm text-red-300 mt-1 capitalize">{user?.role}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold">Account Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Member since</span>
              <span>2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Orders</span>
              <span>12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Wishlist</span>
              <span>8</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-700/50 hover:bg-gray-600/50 transition">
              <CreditCard size={18} /> Payment Methods
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-700/50 hover:bg-gray-600/50 transition">
              <MapPin size={18} /> Addresses
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-700/50 hover:bg-gray-600/50 transition">
              <Bell size={18} /> Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Product Card Component
const ProductCard = ({ product, onSelect, onWishlistToggle, isInWishlist }: any) => {
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlistAnimating(true);
    onWishlistToggle(product.id);
    setTimeout(() => setIsWishlistAnimating(false), 600);
  };

  return (
    <div 
      className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 transition-all hover:scale-[1.02] hover:shadow-2xl overflow-hidden group cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700/50 rounded-2xl mx-auto mb-2 flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-sm text-gray-400">Product Image</p>
          </div>
        </div>
        
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
            isInWishlist 
              ? 'bg-orange-500/20 text-orange-400' 
              : 'bg-gray-900/30 text-gray-400 hover:bg-orange-500/20 hover:text-orange-400'
          } ${isWishlistAnimating ? 'animate-ping' : ''}`}
        >
          <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
        
        {product.is_pre_order && (
          <div className="absolute top-3 left-3 bg-yellow-500/20 backdrop-blur-sm text-yellow-300 px-3 py-1 rounded-full text-xs font-medium">
            PRE-ORDER
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold line-clamp-2">{product.name}</h3>
          <div className="text-right">
            <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="text-sm line-through text-gray-400 block">₹{product.original_price}</span>
            )}
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
          className={`w-full font-bold py-3 rounded-2xl transition-all active:scale-95 ${
            product.is_pre_order
              ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700'
              : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
          }`}
        >
          {product.is_pre_order ? 'Pre-Order Now' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// Jersey Card Component with Glowing Effect
const JerseyCard = ({ product, onSelect, onWishlistToggle, isInWishlist }: any) => {
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlistAnimating(true);
    onWishlistToggle(product.id);
    setTimeout(() => setIsWishlistAnimating(false), 600);
  };

  return (
    <div 
      className={`bg-gray-800/30 backdrop-blur-sm rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-2xl overflow-hidden group cursor-pointer ${
        product.is_exclusive 
          ? 'border-red-500/50 shadow-lg shadow-red-500/20 glow' 
          : 'border-gray-700/50'
      }`}
      onClick={() => onSelect(product)}
    >
      <div className="relative">
        {product.jersey_thumbnail ? (
          <img 
            src={product.jersey_thumbnail} 
            alt={product.name}
            className="h-48 w-full object-cover rounded-2xl"
          />
        ) : (
          <div className="h-48 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700/50 rounded-2xl mx-auto mb-2 flex items-center justify-center">
                <Shirt size={24} className="text-white" />
              </div>
              <p className="text-sm text-gray-400">Jersey Image</p>
            </div>
          </div>
        )}
        
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
            isInWishlist 
              ? 'bg-orange-500/20 text-orange-400' 
              : 'bg-gray-900/30 text-gray-400 hover:bg-orange-500/20 hover:text-orange-400'
          } ${isWishlistAnimating ? 'animate-ping' : ''}`}
        >
          <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
        
        {product.is_exclusive && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            ⭐ EXCLUSIVE
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold line-clamp-2">{product.name}</h3>
          <div className="text-right">
            <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="text-sm line-through text-gray-400 block">₹{product.original_price}</span>
            )}
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 rounded-2xl transition-all active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Product Modal Component
const ProductModal = ({ 
  product, 
  selectedMod, 
  onModSelect, 
  onAddToCart, 
  onClose 
}: { 
  product: Product;
  selectedMod: { name: string; price: number } | null;
  onModSelect: (mod: { name: string; price: number } | null) => void;
  onAddToCart: (product: Product) => void;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
    <div className="relative bg-gray-800/80 backdrop-blur-lg rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-red-800/30">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold">{product.name}</h3>
            {product.is_pre_order && (
              <div className="text-sm text-yellow-300 mt-2 flex items-center gap-2">
                <Clock size={16} /> Pre-Order Available
              </div>
            )}
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-gray-600/50 transition"
          >
            <X size={16} />
          </button>
        </div>
        
        {product.category === 'jersey' && product.jersey_thumbnail ? (
          <img 
            src={product.jersey_thumbnail} 
            alt={product.name}
            className="w-full h-64 object-cover rounded-2xl mb-6"
          />
        ) : (
          <div className="h-64 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700/50 rounded-2xl mx-auto mb-2 flex items-center justify-center">
                {product.category === 'jersey' ? (
                  <Shirt size={24} className="text-white" />
                ) : (
                  <span className="text-2xl">📦</span>
                )}
              </div>
              <p className="text-sm text-gray-400">Product Image</p>
            </div>
          </div>
        )}
        
        <p className="text-gray-300 my-6">{product.description}</p>
        
        {product.features && product.features.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold mb-3">Features</h4>
            <div className="space-y-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check size={16} className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {product.mod_options && product.mod_options.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold mb-3">Select Mod</h4>
            <div className="space-y-2">
              {product.mod_options.map((mod, index) => (
                <div 
                  key={index}
                  onClick={() => onModSelect(mod)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedMod?.name === mod.name 
                      ? 'border-red-500 bg-red-900/30' 
                      : 'border-gray-700 hover:border-red-500/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{mod.name}</span>
                    <span className="text-red-300 font-bold">₹{mod.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-6 border-t border-gray-700/50">
          <div>
            <span className="text-3xl font-bold">
              ₹{selectedMod ? selectedMod.price : product.price}
            </span>
            {product.original_price && (
              <span className="text-sm line-through text-gray-400 ml-2">₹{product.original_price}</span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.mod_options && product.mod_options.length > 0 && !selectedMod}
            className={`font-bold py-3 px-8 rounded-2xl transition-all active:scale-95 ${
              (product.mod_options && product.mod_options.length > 0 && !selectedMod) 
                ? 'opacity-50 cursor-not-allowed' 
                : product.is_pre_order
                  ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700'
                  : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
            }`}
          >
            {product.is_pre_order ? 'Pre-Order Now' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Cart Drawer Component
const CartDrawer = ({
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  discountCode,
  onDiscountCodeChange,
  appliedDiscount,
  onApplyDiscount,
  onRemoveDiscount,
  discountError,
  agreeToTerms,
  onAgreeToTermsChange,
  onCheckout,
  checkoutLoading,
  calculateTotal
}: any) => (
  <div className="fixed inset-0 z-50 overflow-hidden">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
    <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-800/80 backdrop-blur-lg border-l border-red-800/30 shadow-xl overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <ShoppingCart size={24} /> Your Cart
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-gray-600/50 transition"
          >
            <X size={16} />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-700/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-400 mb-6">Your cart is empty</p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-2xl transition-all active:scale-95"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.map((item: any, index: number) => (
                <div 
                  key={index} 
                  className="rounded-2xl p-4 border border-gray-700/50 bg-gray-900/20 backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold line-clamp-2">
                        {item.selectedMod ? `${item.name} - ${item.selectedMod.name}` : item.name}
                      </h3>
                      {item.is_pre_order && (
                        <span className="text-xs text-yellow-300 bg-yellow-500/10 px-2 py-1 rounded-full">Pre-Order</span>
                      )}
                      {item.category === 'jersey' && (
                        <span className="text-xs text-red-300 bg-red-500/10 px-2 py-1 rounded-full ml-2">Jersey</span>
                      )}
                    </div>
                    <button 
                      onClick={() => onRemoveItem(index)}
                      className="w-6 h-6 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition ml-2"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-700/50 rounded-xl hover:bg-gray-600/50 transition"
                      >
                        -
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-700/50 rounded-xl hover:bg-gray-600/50 transition"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-lg">
                      ₹{(item.selectedMod ? item.selectedMod.price : item.price) * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Tag size={16} /> Discount Code
                </h3>
                {appliedDiscount ? (
                  <div className="bg-green-900/20 border border-green-800/50 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <span className="font-bold">{appliedDiscount.code}</span>
                      <span className="text-sm text-gray-300 ml-2">
                        ({appliedDiscount.discount}{appliedDiscount.type === 'percentage' ? '% off' : '₹ off'})
                      </span>
                    </div>
                    <button 
                      onClick={onRemoveDiscount}
                      className="text-gray-300 hover:text-white transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => onDiscountCodeChange(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 backdrop-blur-sm"
                    />
                    <button
                      onClick={onApplyDiscount}
                      className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-2xl transition-all active:scale-95"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {discountError && (
                  <p className="text-red-400 text-sm mt-2">{discountError}</p>
                )}
              </div>
              
              <div className="bg-gray-700/30 rounded-2xl p-5 border border-gray-600/30">
                <h3 className="font-bold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal</span>
                    <span>₹{calculateTotal().subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Discount</span>
                      <span className="text-green-400">
                        -₹{calculateTotal().discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-gray-600/30">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text">
                      ₹{calculateTotal().total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/20 rounded-2xl p-4 border border-gray-600/20">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={() => onAgreeToTermsChange(!agreeToTerms)}
                    className="mt-1 rounded"
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the terms and understand that digital products are non-refundable after delivery.
                  </span>
                </label>
              </div>
              
              <button
                onClick={onCheckout}
                disabled={!agreeToTerms || checkoutLoading}
                className={`w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl transition-all active:scale-95 ${
                  !agreeToTerms || checkoutLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {checkoutLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
