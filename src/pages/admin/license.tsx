import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { 
  Shield, 
  Key, 
  Sparkles, 
  Copy, 
  CheckCircle, 
  Zap,
  Cpu,
  Lock,
  Globe,
  Calendar,
  Smartphone,
  Crown
} from 'lucide-react';

export default function AdminLicense() {
  const [animatedBg, setAnimatedBg] = useState(true);
  const [authToken, setAuthToken] = useState<string>('');
  const [plan, setPlan] = useState<string>('toolbox');
  const [days, setDays] = useState<number>(30);
  const [deviceId, setDeviceId] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Particle Background
  useEffect(() => {
    if (!animatedBg) return;

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

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (100 - distance) / 100 * 0.1;
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
  }, [animatedBg]);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setResult('');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
      const res = await fetch('/api/license/create', {
        method: 'POST',
        headers,
        body: JSON.stringify({ days, plan, deviceId: deviceId || undefined })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed');
      setResult(data.key);
    } catch (e: any) {
      setResult(`Error: ${e?.message || 'Failed'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const plans = [
    { value: 'toolbox', label: 'Toolbox', icon: Cpu, color: 'from-blue-500 to-cyan-500' },
    { value: 'squadeditor', label: 'Squad Editor', icon: Globe, color: 'from-purple-500 to-pink-500' },
    { value: 'all', label: 'All Access', icon: Crown, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-gray-900">
      <Head>
        <title>Admin • License Generator</title>
      </Head>

      {/* Animated Background */}
      {animatedBg && (
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      )}
      
      {/* Static Gradient Background */}
      {!animatedBg && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
      )}

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite linear`
            }}
          />
        ))}
      </div>

      {/* Header Controls */}
      <div className="absolute top-6 right-6 z-10">
        <button 
          onClick={() => setAnimatedBg(!animatedBg)}
          className="bg-gray-800/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl px-4 py-3 flex items-center gap-3 hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 group"
        >
          <Sparkles className={`w-5 h-5 transition-all ${animatedBg ? 'text-cyan-400' : 'text-gray-400'}`} />
          <span className="font-medium">{animatedBg ? '3D Effects ON' : '3D Effects OFF'}</span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 rounded-full"></div>
              <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-2xl border border-cyan-400/30">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent ml-6 tracking-tight">
              License Generator
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Create secure device-bound license keys with advanced protection
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl">
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl">
                <Key className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Generate License Key
                </h2>
                <p className="text-gray-400 text-sm">Create secure access tokens</p>
              </div>
            </div>

            {/* Auth Status */}
            <div className={`mb-6 p-4 rounded-2xl border backdrop-blur-sm ${
              authToken 
                ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5" />
                <span className="font-medium">
                  {authToken ? 'Admin authenticated • Ready to generate keys' : 'Authentication required • Visit /admin/login'}
                </span>
              </div>
            </div>

            {/* Form Grid */}
            <div className="space-y-6">
              {/* Plan Selection */}
              <div>
                <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-4 uppercase tracking-wide">
                  <Cpu className="w-4 h-4" />
                  Select Plan
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((p) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.value}
                        onClick={() => setPlan(p.value)}
                        className={`p-4 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 ${
                          plan === p.value
                            ? `border-cyan-500 bg-gradient-to-r ${p.color} scale-105 shadow-2xl`
                            : 'border-gray-600 bg-gray-700/50 hover:border-cyan-500/50 hover:scale-102'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <Icon className={`w-8 h-8 ${
                            plan === p.value ? 'text-white' : 'text-gray-400'
                          }`} />
                          <span className={`font-bold text-lg ${
                            plan === p.value ? 'text-white' : 'text-gray-300'
                          }`}>
                            {p.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration & Device */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wide">
                    <Calendar className="w-4 h-4" />
                    Duration (days)
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={days} 
                      onChange={(e) => setDays(parseInt(e.target.value || '0', 10))}
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-lg font-medium"
                      min="1"
                      max="365"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wide">
                    <Smartphone className="w-4 h-4" />
                    Device ID (optional)
                  </label>
                  <input 
                    value={deviceId} 
                    onChange={(e) => setDeviceId(e.target.value)}
                    placeholder="Leave empty for first-use binding"
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  />
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!authToken || isGenerating}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 ${
                  authToken && !isGenerating
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:scale-105 shadow-2xl'
                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-6 h-6 animate-spin" />
                    Generating Secure Key...
                  </>
                ) : (
                  <>
                    <Key className="w-6 h-6" />
                    Generate License Key
                  </>
                )}
              </button>

              {/* Result */}
              {result && (
                <div className="mt-6 p-6 bg-gray-700/30 border border-cyan-500/30 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-cyan-400 font-mono text-lg break-all bg-gray-800/50 p-4 rounded-xl border border-cyan-500/20">
                        {result}
                      </div>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: Shield, label: 'Secure Encryption', value: 'AES-256' },
              { icon: Lock, label: 'Device Binding', value: 'Hardware ID' },
              { icon: Zap, label: 'Generation Speed', value: '< 100ms' }
            ].map((stat, index) => (
              <div key={stat.label} className="bg-gray-800/40 backdrop-blur-xl border border-cyan-500/10 rounded-2xl p-6 text-center">
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                <div className="text-white font-bold text-lg">{stat.value}</div>
              </div>
            ))}
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
            transform: translateY(-15px) translateX(8px);
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
