import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { 
  ShoppingCart, 
  Zap, 
  Star, 
  Tag, 
  Gift, 
  ShieldCheck, 
  Download, 
  X, 
  Check, 
  ArrowRight, 
  Home, 
  Users, 
  AlertCircle, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Heart, 
  ChevronRight, 
  ChevronLeft, 
  Menu, 
  User, 
  Package, 
  Settings, 
  MessageCircle, 
  LogOut, 
  Bell, 
  CreditCard, 
  MapPin, 
  BarChart3,
  Shirt,
  Camera,
  QrCode,
  Crown,
  Sparkles,
  Upload,
  Image,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

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
  jersey_details?: {
    team: string;
    player: string;
    season: string;
    size: string;
    condition: string;
    thumbnail: string;
    download_url: string;
  };
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
        ? 'bg-green-500/20 border-green-500/30 text-green-300' 
        : type === 'error'
        ? 'bg-red-500/20 border-red-500/30 text-red-300'
        : 'bg-blue-500/20 border-blue-500/30 text-blue-300'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          type === 'success' ? 'bg-green-400' : type === 'error' ? 'bg-red-400' : 'bg-blue-400'
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
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale">
          <Check size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Order Placed!</h3>
        <p className="text-gray-300">Your order has been confirmed</p>
      </div>
    </div>
  );
};

// QR Code Modal Component
const QRCodeModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-gray-800/90 backdrop-blur-lg rounded-3xl max-w-md w-full border border-red-500/30">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <QrCode className="text-red-400" />
              Complete Payment
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="text-center mb-6">
            <div className="w-64 h-64 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-red-500/30">
              <div className="text-center">
                <QrCode size={80} className="text-red-400 mx-auto mb-2" />
                <p className="text-red-300 text-sm">Scan QR Code to Pay</p>
                <p className="text-gray-400 text-xs mt-1">Amount: ₹2,499</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Scan the QR code with your payment app to complete the transaction
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle size={16} className="text-red-400" />
              <p className="text-red-300 text-sm">
                After payment, our team will verify and confirm your order within 24 hours
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-2xl transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle size={16} />
              Payment Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Jersey Uploader Component
const JerseyUploader = ({ onUploadComplete }: { onUploadComplete: () => void }) => {
  const [uploading, setUploading] = useState(false);
  const [jerseyData, setJerseyData] = useState({
    name: '',
    team: '',
    player: '',
    season: '2024',
    size: 'M',
    condition: 'New',
    price: 0,
    original_price: 0,
    description: '',
    is_exclusive: false,
    thumbnail: null as File | null,
    jersey_file: null as File | null
  });

  const handleUpload = async () => {
    if (!jerseyData.thumbnail || !jerseyData.jersey_file) {
      alert('Please select both thumbnail and jersey file');
      return;
    }

    setUploading(true);
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      
      formData.append('name', jerseyData.name);
      formData.append('team', jerseyData.team);
      formData.append('player', jerseyData.player);
      formData.append('season', jerseyData.season);
      formData.append('size', jerseyData.size);
      formData.append('condition', jerseyData.condition);
      formData.append('price', jerseyData.price.toString());
      formData.append('original_price', jerseyData.original_price.toString());
      formData.append('description', jerseyData.description);
      formData.append('is_exclusive', jerseyData.is_exclusive.toString());
      formData.append('category', 'jersey');
      formData.append('thumbnail', jerseyData.thumbnail);
      formData.append('jersey_file', jerseyData.jersey_file);

      const response = await fetch('/api/admin/jerseys/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      
      alert('Jersey uploaded successfully!');
      setJerseyData({
        name: '',
        team: '',
        player: '',
        season: '2024',
        size: 'M',
        condition: 'New',
        price: 0,
        original_price: 0,
        description: '',
        is_exclusive: false,
        thumbnail: null,
        jersey_file: null
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
        <Shirt className="text-red-400" />
        Upload New Jersey
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Jersey Name"
          value={jerseyData.name}
          onChange={(e) => setJerseyData({...jerseyData, name: e.target.value})}
          className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
        <input
          type="text"
          placeholder="Team"
          value={jerseyData.team}
          onChange={(e) => setJerseyData({...jerseyData, team: e.target.value})}
          className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
        <input
          type="text"
          placeholder="Player Name"
          value={jerseyData.player}
          onChange={(e) => setJerseyData({...jerseyData, player: e.target.value})}
          className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
        <select
          value={jerseyData.season}
          onChange={(e) => setJerseyData({...jerseyData, season: e.target.value})}
          className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          <option value="2024">2024 Season</option>
          <option value="2023">2023 Season</option>
          <option value="2022">2022 Season</option>
          <option value="2021">2021 Season</option>
        </select>
        <select
          value={jerseyData.size}
          onChange={(e) => setJerseyData({...jerseyData, size: e.target.value})}
          className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">Extra Large</option>
        </select>
        <select
          value={jerseyData.condition}
          onChange={(e) => setJerseyData({...jerseyData, condition: e.target.value})}
          className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={jerseyData.price}
          onChange={(e) => setJerseyData({...jerseyData, price: Number(e.target.value)})}
          className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
        <input
          type="number"
          placeholder="Original Price"
          value={jerseyData.original_price}
          onChange={(e) => setJerseyData({...jerseyData, original_price: Number(e.target.value)})}
          className="bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
        />
      </div>

      <textarea
        placeholder="Description"
        value={jerseyData.description}
        onChange={(e) => setJerseyData({...jerseyData, description: e.target.value})}
        rows={3}
        className="w-full bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-red-500/50"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setJerseyData({...jerseyData, thumbnail: e.target.files?.[0] || null})}
            className="w-full bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Jersey File (ZIP/PDF)</label>
          <input
            type="file"
            accept=".zip,.pdf"
            onChange={(e) => setJerseyData({...jerseyData, jersey_file: e.target.files?.[0] || null})}
            className="w-full bg-gray-600/50 border border-gray-500/50 rounded-2xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 mb-4">
        <input
          type="checkbox"
          checked={jerseyData.is_exclusive}
          onChange={(e) => setJerseyData({...jerseyData, is_exclusive: e.target.checked})}
          className="rounded border-gray-600 bg-gray-700 text-red-500 focus:ring-red-500"
        />
        <span className="text-gray-300 flex items-center gap-2">
          <Crown className="w-4 h-4 text-yellow-400" />
          Mark as Exclusive Jersey
        </span>
      </label>

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {uploading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload size={16} />
            Upload Jersey
          </>
        )}
      </button>
    </div>
  );
};

// Glowing Exclusive Jersey Section
const ExclusiveJerseysSection = ({ jerseys, onJerseySelect }: { jerseys: Product[], onJerseySelect: (jersey: Product) => void }) => {
  const exclusiveJerseys = jerseys.filter(jersey => 
    jersey.category === 'jersey' && jersey.jersey_details
  );

  return (
    <section id="jerseys" className="mb-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-yellow-500/20 border border-red-500/30 px-6 py-2 rounded-2xl mb-4">
          <Crown className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-300 font-bold">EXCLUSIVE JERSEYS</span>
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
          Premium Collection
        </h2>
        <p className="text-gray-300 mt-2">Limited edition jerseys for true fans</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exclusiveJerseys.map((jersey, index) => (
          <div
            key={jersey.id}
            className="group relative bg-gradient-to-br from-red-500/10 to-yellow-500/10 rounded-3xl border border-red-500/20 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer"
            onClick={() => onJerseySelect(jersey)}
          >
            {/* Glowing Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
            
            <div className="relative p-6">
              {/* Exclusive Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                <Crown size={12} />
                EXCLUSIVE
              </div>

              {/* Jersey Image */}
              <div className="w-full h-48 bg-gradient-to-br from-red-900/30 to-yellow-900/30 rounded-2xl flex items-center justify-center mb-4 border border-red-500/20">
                <div className="text-center">
                  <Shirt size={48} className="text-red-400 mx-auto mb-2" />
                  <p className="text-red-300 text-sm">Jersey Preview</p>
                </div>
              </div>

              {/* Jersey Details */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{jersey.name}</h3>
                <div className="flex justify-center items-center gap-4 text-sm text-gray-300 mb-3">
                  <span>{jersey.jersey_details?.team}</span>
                  <span>•</span>
                  <span>{jersey.jersey_details?.player}</span>
                </div>
                <div className="flex justify-center gap-2 mb-4">
                  <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs">
                    {jersey.jersey_details?.season}
                  </span>
                  <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs">
                    {jersey.jersey_details?.size}
                  </span>
                  <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">
                    {jersey.jersey_details?.condition}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                    ₹{jersey.price}
                  </span>
                  {jersey.original_price && (
                    <span className="text-sm line-through text-gray-400">
                      ₹{jersey.original_price}
                    </span>
                  )}
                </div>

                <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Shirt size={16} />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {exclusiveJerseys.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500/10 to-yellow-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <Shirt className="w-12 h-12 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Exclusive Jerseys Yet</h3>
          <p className="text-gray-400">Check back later for premium jersey releases</p>
        </div>
      )}
    </section>
  );
};

// Main Store Component with Red iOS Theme
export default function StorePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [me, setMe] = useState<User | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminSection, setAdminSection] = useState('dashboard');

  // Red iOS Theme Styles
  const theme = {
    background: 'bg-gradient-to-br from-gray-900 to-red-900',
    header: 'bg-gray-800/30 backdrop-blur-xl border-b border-red-500/20',
    card: 'bg-gray-800/30 backdrop-blur-sm border border-red-500/20',
    button: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
    text: {
      primary: 'text-white',
      secondary: 'text-gray-300',
      accent: 'text-red-400'
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const handleCheckout = () => {
    setShowQR(true);
  };

  const handlePaymentConfirm = () => {
    setShowQR(false);
    showToast('Payment confirmed! Your order is being processed.', 'success');
    // Here you would typically send the order to your backend
  };

  // Enhanced Slide Bar with Red Theme
  const SlideBar = () => (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
      <div className="relative w-80 h-full bg-gray-800/90 backdrop-blur-lg border-r border-red-500/20 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
              SX Store
            </h2>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'jerseys', icon: Shirt, label: 'Jerseys' },
              { id: 'orders', icon: Package, label: 'Orders' },
              { id: 'profile', icon: User, label: 'Profile' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setSidebarOpen(false);
                  if (id === 'jerseys') {
                    setTimeout(() => {
                      document.getElementById('jerseys')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${
                  activeTab === id ? 'bg-red-500/20 text-red-300' : 'hover:bg-gray-700/50'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </nav>

          {/* Admin Section */}
          {me?.role === 'admin' && (
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Admin</h3>
              <button
                onClick={() => {
                  setShowAdminPanel(true);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 text-red-300 hover:bg-red-500/20 transition-all"
              >
                <Settings size={20} />
                Admin Panel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme.background} text-white pb-20`}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showQR && <QRCodeModal onClose={() => setShowQR(false)} onConfirm={handlePaymentConfirm} />}

      {/* Header */}
      <header className={`sticky top-0 z-40 ${theme.header}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-2xl bg-gray-700/50 hover:bg-gray-600/50 transition-all"
            >
              <Menu size={20} />
            </button>
            
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
              SX Store
            </h1>

            <button 
              onClick={() => setShowCart(true)}
              className="relative p-2 rounded-2xl bg-red-500/20 hover:bg-red-500/30 transition-all"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-2xl text-sm font-medium mb-6">
            🎮 Premium Digital Store
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-300 to-red-400 bg-clip-text text-transparent">
            Game Like A Pro
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Exclusive accounts, tools, and premium jerseys for serious gamers
          </p>
        </section>

        {/* Exclusive Jerseys Section */}
        <ExclusiveJerseysSection 
          jerseys={products} 
          onJerseySelect={setSelectedProduct}
        />

        {/* Other product sections would go here */}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-lg border-t border-gray-700/50 z-40">
        <div className="flex justify-around items-center p-3">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'jerseys', icon: Shirt, label: 'Jerseys' },
            { id: 'orders', icon: Package, label: 'Orders' },
            { id: 'profile', icon: User, label: 'Profile' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                if (id === 'jerseys') {
                  setTimeout(() => {
                    document.getElementById('jerseys')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`flex flex-col items-center p-2 rounded-2xl transition-all flex-1 mx-1 ${
                activeTab === id ? 'text-red-400 bg-red-500/20' : 'text-gray-400'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Admin Panel */}
      {showAdminPanel && (
        <AdminPanel
          isOpen={showAdminPanel}
          onClose={() => setShowAdminPanel(false)}
          products={products}
          onProductUpdate={() => {}} // You would implement this
          adminSection={adminSection}
          onSectionChange={setAdminSection}
        />
      )}
    </div>
  );
}

// Enhanced Admin Panel with Jersey Uploader
const AdminPanel = ({ 
  isOpen, 
  onClose, 
  products, 
  onProductUpdate,
  adminSection,
  onSectionChange 
}: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-gray-800/90 backdrop-blur-lg rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-red-500/30">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Admin Navigation */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {['dashboard', 'jerseys', 'products', 'orders', 'users', 'settings'].map((section) => (
              <button
                key={section}
                onClick={() => onSectionChange(section)}
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

          {/* Jersey Upload Section */}
          {adminSection === 'jerseys' && (
            <JerseyUploader onUploadComplete={onProductUpdate} />
          )}

          {/* Other admin sections... */}
        </div>
      </div>
    </div>
  );
};
