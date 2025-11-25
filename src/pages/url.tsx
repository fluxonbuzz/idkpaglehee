import { useEffect, useState, useRef } from 'react';
import { 
  Link, 
  Copy, 
  QrCode, 
  BarChart3, 
  Calendar,
  Trash2,
  Edit3,
  ExternalLink,
  Filter,
  Search,
  Plus,
  Crown,
  Clock,
  Globe,
  CheckCircle,
  AlertCircle,
  Download
} from 'lucide-react';

interface ShortUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  lastClicked: string | null;
  qrCode: string;
  title: string;
  tags: string[];
}

export default function URLShortener() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Particle Background (same as your admin dashboard)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }> = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: `hsl(${Math.random() * 20 + 40}, 70%, 60%)`,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (120 - distance) / 120 * 0.1;
            ctx.lineWidth = 0.3;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load URLs on component mount
  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    try {
      const response = await fetch('/api/shorten');
      if (response.ok) {
        const data = await response.json();
        setUrls(data);
      }
    } catch (error) {
      console.error('Failed to load URLs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl) return;

    setLoading(true);
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: originalUrl,
          customCode: customCode || undefined,
          title: title || undefined,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
        }),
      });

      if (response.ok) {
        const newUrl = await response.json();
        setUrls(prev => [newUrl, ...prev]);
        setOriginalUrl('');
        setCustomCode('');
        setTitle('');
        setTags('');
        setActiveTab('manage');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create short URL');
      }
    } catch (error) {
      alert('Failed to create short URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedUrl(text);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const deleteUrl = async (id: string) => {
    if (!confirm('Are you sure you want to delete this URL?')) return;
    
    // In a real app, call DELETE API
    setUrls(prev => prev.filter(url => url.id !== id));
  };

  const filteredUrls = urls.filter(url =>
    url.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 relative overflow-hidden">
      {/* 3D Animated Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="bg-yellow-900/30 backdrop-blur-xl border-b border-yellow-500/20">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-20 rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-yellow-500 to-amber-600 p-3 rounded-2xl border border-yellow-400/30">
                    <Link className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                    SX URL SHORTENER
                  </h1>
                  <p className="text-yellow-200 text-sm mt-1">Advanced URL Management Platform</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 text-yellow-200">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-sm font-medium">{urls.length} URLs</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-yellow-900/30 backdrop-blur-xl rounded-2xl p-2 mb-8 border border-yellow-500/20">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg'
                  : 'text-yellow-200 hover:text-white'
              }`}
            >
              <Plus className="h-4 w-4 inline mr-2" />
              Create New
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'manage'
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg'
                  : 'text-yellow-200 hover:text-white'
              }`}
            >
              <Link className="h-4 w-4 inline mr-2" />
              Manage URLs ({urls.length})
            </button>
          </div>

          {/* Create URL Form */}
          {activeTab === 'create' && (
            <div className="bg-yellow-900/20 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8 shadow-2xl mb-8">
              <h2 className="text-2xl font-bold text-yellow-100 mb-6">Create Short URL</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-yellow-200 text-sm font-medium mb-2">
                    Destination URL *
                  </label>
                  <input
                    type="url"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="https://example.com/very-long-url-path"
                    className="w-full px-4 py-3 bg-yellow-900/50 border border-yellow-500/30 rounded-xl text-white placeholder-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent backdrop-blur-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-yellow-200 text-sm font-medium mb-2">
                      Custom Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                      placeholder="my-custom-link"
                      className="w-full px-4 py-3 bg-yellow-900/50 border border-yellow-500/30 rounded-xl text-white placeholder-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-yellow-200 text-sm font-medium mb-2">
                      Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="My Awesome Link"
                      className="w-full px-4 py-3 bg-yellow-900/50 border border-yellow-500/30 rounded-xl text-white placeholder-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-yellow-200 text-sm font-medium mb-2">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="marketing, social, campaign"
                    className="w-full px-4 py-3 bg-yellow-900/50 border border-yellow-500/30 rounded-xl text-white placeholder-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !originalUrl}
                  className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-900 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    <>
                      <Plus className="h-5 w-5 inline mr-2" />
                      Create Short URL
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Manage URLs */}
          {activeTab === 'manage' && (
            <div className="bg-yellow-900/20 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4 sm:mb-0">Your Short URLs</h2>
                
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400/60" />
                  <input
                    type="text"
                    placeholder="Search URLs, titles, tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-yellow-900/50 border border-yellow-500/30 rounded-xl text-white placeholder-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent backdrop-blur-sm w-full sm:w-64"
                  />
                </div>
              </div>

              {filteredUrls.length === 0 ? (
                <div className="text-center py-12">
                  <Link className="h-16 w-16 text-yellow-400/40 mx-auto mb-4" />
                  <p className="text-yellow-200 text-lg">No URLs found</p>
                  <p className="text-yellow-400/60">Create your first short URL to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredUrls.map((url) => (
                    <div
                      key={url.id}
                      className="bg-yellow-900/40 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6 transition-all hover:border-yellow-500/40"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1 mb-4 lg:mb-0 lg:mr-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-white">{url.title}</h3>
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                                {url.clicks} clicks
                              </span>
                              {url.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-amber-500/10 text-amber-300 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <Globe className="h-4 w-4 text-yellow-400 mr-2" />
                              <span className="text-yellow-200 truncate">{url.originalUrl}</span>
                            </div>
                            
                            <div className="flex items-center text-sm">
                              <Link className="h-4 w-4 text-green-400 mr-2" />
                              <span className="text-green-300 font-mono">{url.shortUrl}</span>
                              <button
                                onClick={() => copyToClipboard(url.shortUrl)}
                                className="ml-2 p-1 hover:bg-yellow-500/20 rounded transition-colors"
                              >
                                {copiedUrl === url.shortUrl ? (
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                ) : (
                                  <Copy className="h-4 w-4 text-yellow-400" />
                                )}
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 mt-3 text-xs text-yellow-400/60">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Created {formatDate(url.createdAt)}
                            </div>
                            {url.lastClicked && (
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Last click {formatDate(url.lastClicked)}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => window.open(url.shortUrl, '_blank')}
                            className="p-2 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-colors"
                            title="Test URL"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => copyToClipboard(url.qrCode)}
                            className="p-2 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors"
                            title="Download QR Code"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => deleteUrl(url.id)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
                            title="Delete URL"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-yellow-900/40 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6 text-center">
              <div className="bg-yellow-500/20 p-3 rounded-xl inline-flex mb-3">
                <Link className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-yellow-100 font-semibold">Total URLs</h3>
              <p className="text-2xl font-bold text-yellow-300 mt-2">{urls.length}</p>
            </div>
            
            <div className="bg-amber-900/40 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 text-center">
              <div className="bg-amber-500/20 p-3 rounded-xl inline-flex mb-3">
                <BarChart3 className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-amber-100 font-semibold">Total Clicks</h3>
              <p className="text-2xl font-bold text-amber-300 mt-2">
                {urls.reduce((sum, url) => sum + url.clicks, 0)}
              </p>
            </div>
            
            <div className="bg-orange-900/40 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 text-center">
              <div className="bg-orange-500/20 p-3 rounded-xl inline-flex mb-3">
                <Crown className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-orange-100 font-semibold">Most Popular</h3>
              <p className="text-lg font-bold text-orange-300 mt-2 truncate">
                {urls.length > 0 
                  ? urls.reduce((prev, current) => (prev.clicks > current.clicks) ? prev : current).title
                  : 'N/A'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0px) translateX(0);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
