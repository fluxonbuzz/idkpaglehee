// src/pages/screenshot.tsx
import { Tag, Percent, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ScreenshotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center mb-2">
          <Tag className="w-12 h-12 text-purple-400" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
          NEW DISCOUNT CODE
        </h1>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-purple-800/30 p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 text-purple-900/20">
            <Percent className="w-24 h-24" strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Percent className="w-8 h-8 text-yellow-300" />
              <div className="text-5xl font-bold text-yellow-300">WELCOME10</div>
            </div>
            <p className="text-xl text-gray-300">10% off on your purchase</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-lg text-gray-400 mb-8">
          <ShoppingCart className="w-5 h-5" />
          <span>Minimum purchase of ₹100 required</span>
        </div>
        
        <Link 
          href="/store" 
          className="mt-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition text-lg"
        >
          Shop Now <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
