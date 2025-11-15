import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  MessageCircle, 
  Send, 
  Shield, 
  User, 
  Mail, 
  FileText, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Twitter,
  MessageSquare,
  ExternalLink,
  RotateCw,
  Sparkles
} from 'lucide-react';

interface AppealForm {
  username: string;
  email: string;
  platform: 'discord' | 'telegram' | 'whatsapp' | 'other';
  reason: string;
  explanation: string;
  contact_method: string;
}

export default function BanAppealPage() {
  const router = useRouter();
  const [form, setForm] = useState<AppealForm>({
    username: '',
    email: '',
    platform: 'discord',
    reason: '',
    explanation: '',
    contact_method: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateSubmit, setAnimateSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Partial<AppealForm>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Background Animation
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

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
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
            ctx.globalAlpha = (100 - distance) / 100 * 0.2;
            ctx.lineWidth = 0.5;
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

  const validateForm = (): boolean => {
    const newErrors: Partial<AppealForm> = {};

    if (!form.username.trim()) newErrors.username = 'Username is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.reason.trim()) newErrors.reason = 'Please select a reason';
    if (!form.explanation.trim()) newErrors.explanation = 'Please explain your situation';
    if (!form.contact_method.trim()) newErrors.contact_method = 'Contact method is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setAnimateSubmit(true);

    try {
      const res = await fetch('/api/appeals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || 'Failed to submit appeal');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      window.alert(err?.message || 'Something went wrong submitting your appeal. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setAnimateSubmit(false), 400);
    }
  };

  const handleInputChange = (field: keyof AppealForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
      case 'discord':
        return <MessageCircle className="w-5 h-5" />;
      case 'telegram':
        return <Send className="w-5 h-5" />;
      case 'whatsapp':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <MessageCircle className="w-5 h-5" />;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
        
        <div className="relative z-10 bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            Appeal Submitted!
          </h1>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Your ban appeal has been received. We'll review your case and contact you via {form.contact_method} within 24-48 hours.
          </p>
          
          <div className="bg-gray-700/50 rounded-2xl p-4 mb-6 border border-gray-600/50">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Next Steps:</h3>
            <ul className="text-sm text-gray-300 space-y-1 text-left">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Wait for our team to review
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-400" />
                Check your email for updates
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-purple-400" />
                Be available on {form.platform}
              </li>
            </ul>
          </div>
          
          <button
            onClick={() => {
              setIsSubmitted(false);
              setForm({
                username: '',
                email: '',
                platform: 'discord',
                reason: '',
                explanation: '',
                contact_method: ''
              });
              setCurrentStep(1);
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Submit Another Appeal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Floating Icons */}
      <div className="absolute top-10 left-10 animate-float">
        <Shield className="w-8 h-8 text-purple-400/30" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <MessageCircle className="w-6 h-6 text-blue-400/30" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <User className="w-7 h-7 text-green-400/30" />
      </div>
      <div className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: '1.5s' }}>
        <FileText className="w-8 h-8 text-pink-400/30" />
      </div>

      <div className="relative z-10 bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8 text-center border-b border-purple-500/30">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Ban Appeal
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Submit your appeal to get back into the community
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center px-8 pt-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step === currentStep
                  ? 'bg-purple-600 border-purple-500 text-white scale-110'
                  : step < currentStep
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-gray-700 border-gray-600 text-gray-400'
              }`}>
                {step < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 transition-all duration-300 ${
                  step < currentStep ? 'bg-green-500' : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4" />
                    Username *
                  </label>
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="Your banned username"
                  />
                  {errors.username && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <MessageCircle className="w-4 h-4" />
                  Platform Where Banned *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['discord', 'telegram', 'whatsapp', 'other'].map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => handleInputChange('platform', platform)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                        form.platform === platform
                          ? 'border-purple-500 bg-purple-600/20 scale-105'
                          : 'border-gray-600 bg-gray-700/50 hover:border-purple-500/50 hover:scale-102'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <PlatformIcon platform={platform} />
                        <span className="text-sm font-medium text-white capitalize">
                          {platform}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Appeal Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <FileText className="w-4 h-4" />
                  Reason for Ban *
                </label>
                <select
                  value={form.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                >
                  <option value="">Select a reason...</option>
                  <option value="spam">Spam/Advertising</option>
                  <option value="harassment">Harassment</option>
                  <option value="cheating">Cheating/Exploits</option>
                  <option value="toxicity">Toxic Behavior</option>
                  <option value="misunderstanding">Misunderstanding</option>
                  <option value="other">Other</option>
                </select>
                {errors.reason && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.reason}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <FileText className="w-4 h-4" />
                  Your Explanation *
                </label>
                <textarea
                  value={form.explanation}
                  onChange={(e) => handleInputChange('explanation', e.target.value)}
                  rows={5}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                  placeholder="Please explain your situation, why you should be unbanned, and what you'll do differently..."
                />
                {errors.explanation && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.explanation}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Contact & Submit */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Send className="w-4 h-4" />
                  Preferred Contact Method *
                </label>
                <input
                  type="text"
                  value={form.contact_method}
                  onChange={(e) => handleInputChange('contact_method', e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="e.g., Discord: username#1234, Telegram: @username, Email, etc."
                />
                {errors.contact_method && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.contact_method}
                  </p>
                )}
              </div>

              <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-4">
                <h3 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Important Notes
                </h3>
                <ul className="text-sm text-blue-300 space-y-1">
                  <li>• Appeals are typically reviewed within 24-48 hours</li>
                  <li>• Be honest and detailed in your explanation</li>
                  <li>• Ensure your contact information is correct</li>
                  <li>• Multiple appeals for the same case may be ignored</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                currentStep === 1
                  ? 'invisible'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/50'
              }`}
            >
              Back
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.min(3, prev + 1))}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${animateSubmit ? 'submit-3d' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <RotateCw className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Appeal
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Footer Links */}
        <div className="bg-gray-900/50 border-t border-gray-700/50 p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span>Need help?</span>
              <div className="flex gap-3">
                <a href="#" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
                <a href="#" className="flex items-center gap-1 hover:text-purple-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Discord
                </a>
                <a href="#" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>All appeals are reviewed by our moderation team</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .submit-3d {
          transform: perspective(600px) translateZ(0) rotateX(8deg) scale(0.98);
          box-shadow: 0 12px 24px rgba(16, 185, 129, 0.35);
        }
        .submit-3d:active {
          transform: perspective(600px) translateZ(0) rotateX(12deg) scale(0.96);
        }
      `}</style>
    </div>
  );
}