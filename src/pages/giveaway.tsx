'use client';

import { MapPin, Compass, Globe, Satellite, Layers, Clock, User, Lock, ArrowRight, X, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LocationTracker() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [locations, setLocations] = useState([]);
  const [permissionStatus, setPermissionStatus] = useState('idle');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' })
        .then(permissionStatus => {
          setPermissionStatus(permissionStatus.state);
          permissionStatus.onchange = () => {
            setPermissionStatus(permissionStatus.state);
          };
        });
    }
  }, []);

  const startTracking = () => {
    if (!tracking) {
      setTracking(true);
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = {
            lat: latitude,
            lng: longitude,
            time: new Date().toLocaleTimeString(),
            id: Date.now()
          };
          setUserLocation(newLocation);
          setLocations(prev => [...prev, newLocation]);
        },
        (error) => {
          console.error('Error getting location:', error);
          setTracking(false);
        },
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setTracking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            GEO TRACKER
          </h1>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-blue-300 transition-colors flex items-center">
                  History <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-blue-300 transition-colors">Settings</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-gray-900 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Menu</h2>
          <button 
            className="p-1 rounded-md text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link 
                href="/" 
                className="block hover:text-blue-300 transition-colors p-2 rounded hover:bg-gray-800"
                onClick={() => setSidebarOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/history" 
                className="block hover:text-blue-300 transition-colors p-2 rounded hover:bg-gray-800 flex items-center"
                onClick={() => setSidebarOpen(false)}
              >
                History <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link 
                href="/settings" 
                className="block hover:text-blue-300 transition-colors p-2 rounded hover:bg-gray-800"
                onClick={() => setSidebarOpen(false)}
              >
                Settings
              </Link>
            </li>
            <li>
              <div 
                className="block bg-blue-900/50 text-blue-300 p-2 rounded border border-blue-700"
              >
                Live Tracking
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-600 rounded-full blur opacity-75"></div>
              <div className="relative bg-gray-800 p-4 rounded-full border-2 border-blue-500">
                <Compass className="h-12 w-12 text-blue-400" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Location Tracker
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Track and visualize your movement in real-time with high precision
          </p>
        </div>

        {/* Main Tracking Card */}
        <div className="my-16 bg-gradient-to-br from-blue-900/50 to-gray-800/50 p-8 rounded-xl border border-blue-500/30">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="p-4 bg-blue-900/30 rounded-full border border-blue-500">
                <Satellite className="h-16 w-16 text-blue-400" />
              </div>
            </div>
            <div className="text-center md:text-left w-full">
              <h2 className="text-3xl font-bold mb-4">Live Location Tracking</h2>
              
              <div className="space-y-6 max-w-md mx-auto md:mx-0 w-full">
                {/* Location Status */}
                <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-blue-300">Current Status</h3>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      tracking ? 'bg-green-900/50 text-green-300' : 'bg-gray-800 text-gray-400'
                    }`}>
                      {tracking ? 'ACTIVE' : 'INACTIVE'}
                    </div>
                  </div>
                  {userLocation ? (
                    <div className="mt-2 text-sm">
                      <p>Lat: {userLocation.lat.toFixed(6)}</p>
                      <p>Lng: {userLocation.lng.toFixed(6)}</p>
                      <p className="text-gray-400 text-xs mt-1">Updated: {userLocation.time}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm mt-1">No location data available</p>
                  )}
                </div>

                {/* Permission Status */}
                <div className={`p-4 rounded-lg border-l-4 ${
                  permissionStatus === 'granted' ? 'border-green-500 bg-green-900/20' : 
                  permissionStatus === 'denied' ? 'border-red-500 bg-red-900/20' : 
                  'border-amber-500 bg-amber-900/20'
                }`}>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span className="font-medium">
                      Permission: {permissionStatus.toUpperCase()}
                    </span>
                  </div>
                  {permissionStatus === 'denied' && (
                    <p className="text-xs mt-1 text-gray-400">
                      Location access denied. Please update your browser settings.
                    </p>
                  )}
                </div>

                {/* Control Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={startTracking}
                    className={`px-6 py-3 rounded-lg font-medium border transition-colors flex-1 flex items-center justify-center gap-2 ${
                      tracking 
                        ? 'bg-red-900/50 hover:bg-red-800 border-red-700 text-red-300' 
                        : 'bg-blue-900/50 hover:bg-blue-800 border-blue-700 text-blue-300'
                    }`}
                    disabled={permissionStatus === 'denied'}
                  >
                    {tracking ? (
                      <>
                        <X className="h-5 w-5" /> Stop Tracking
                      </>
                    ) : (
                      <>
                        <MapPin className="h-5 w-5" /> Start Tracking
                      </>
                    )}
                  </button>
                  
                  <Link 
                    href="/history" 
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium border border-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Layers className="h-5 w-5" /> View History
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Visualization Placeholder */}
        <div className="my-16 bg-gray-800/30 p-8 rounded-xl border border-cyan-500/30">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-8 w-8 text-cyan-400" />
            <h2 className="text-2xl font-bold">Map Visualization</h2>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg border border-gray-700 h-96 flex items-center justify-center">
            {userLocation ? (
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="absolute -inset-4 bg-cyan-600 rounded-full blur opacity-20 animate-pulse"></div>
                  <div className="relative bg-gray-800 p-6 rounded-full border-2 border-cyan-500">
                    <MapPin className="h-12 w-12 text-cyan-400" />
                  </div>
                </div>
                <p className="mt-4 text-cyan-300">Your location is being tracked</p>
                <p className="text-sm text-gray-400 mt-2">
                  Latitude: {userLocation.lat.toFixed(6)}<br />
                  Longitude: {userLocation.lng.toFixed(6)}
                </p>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Globe className="h-16 w-16 mx-auto mb-4" />
                <p>No location data available</p>
                <p className="text-sm mt-2">Start tracking to see your position on the map</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Locations */}
        <div className="my-16 bg-gray-800/30 p-8 rounded-xl border border-blue-500/30">
          <h2 className="text-3xl font-bold mb-8">Recent Locations</h2>
          
          {locations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.slice(-6).reverse().map((loc, index) => (
                <div key={loc.id} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-blue-300">Point {locations.length - index}</h3>
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded">{loc.time}</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-400">Lat:</span> {loc.lat.toFixed(6)}</p>
                    <p><span className="text-gray-400">Lng:</span> {loc.lng.toFixed(6)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4" />
              <p>No location history yet</p>
              <p className="text-sm mt-2">Start tracking to record your locations</p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Privacy */}
          <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-8 w-8 text-purple-400" />
              <h2 className="text-2xl font-bold">Privacy First</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>All data stays on your device</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>No location data is shared or stored externally</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-400 mt-0.5" />
                <span>Clear your history anytime</span>
              </li>
            </ul>
          </div>

          {/* Accuracy */}
          <div className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <Compass className="h-8 w-8 text-blue-400" />
              <h2 className="text-2xl font-bold">High Accuracy</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-300 mb-1">GPS Positioning</h3>
                <p className="text-sm">Uses your device's GPS for best accuracy</p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-cyan-500">
                <h3 className="font-bold text-cyan-300 mb-1">Multiple Sources</h3>
                <p className="text-sm">Combines WiFi, cellular and GPS data</p>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-cyan-500/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="h-8 w-8 text-cyan-400" />
              <h2 className="text-2xl font-bold">Track History</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="flex-shrink-0 h-5 w-5 text-cyan-400 mt-0.5" />
                <span>View your complete movement history</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="flex-shrink-0 h-5 w-5 text-cyan-400 mt-0.5" />
                <span>Filter by date and time ranges</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="flex-shrink-0 h-5 w-5 text-cyan-400 mt-0.5" />
                <span>Export your data for analysis</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                  GEO TRACKER
                </h2>
                <p className="text-gray-500 text-sm mt-1">Your privacy-first location tracker</p>
              </div>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-gray-400 hover:text-blue-300 transition-colors">Privacy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-blue-300 transition-colors">Terms</Link>
                <Link href="/contact" className="text-gray-400 hover:text-blue-300 transition-colors">Contact</Link>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} GEO TRACKER. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
