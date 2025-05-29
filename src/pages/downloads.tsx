// src/pages/downloads.tsx
import { useState, KeyboardEvent } from 'react';
import { Download, Upload, CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';

export default function DownloadsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle Ctrl + * key combination
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey && e.key === '*') {
      setShowLogin(true);
    }
  };

  const handleLogin = () => {
    if (password === '1234') {
      setIsAuthenticated(true);
      setShowLogin(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploaded(false);
      setUploadProgress(0);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploaded(true);
          // In a real app, you would handle the file upload here
          // and provide a download link after successful upload
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-12" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Login Modal */}
      {showLogin && !isAuthenticated && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="text-blue-600" />
              <h2 className="text-xl font-semibold">Admin Access</h2>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex gap-4">
              <button
                onClick={handleLogin}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
          Downloads
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get the latest mods and game files directly from our servers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Download Card */}
        <div className="bg-gradient-to-br from-blue-50 to-gray-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Download className="text-blue-600" />
            <h2 className="text-xl font-semibold">Current Version</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Version</span>
              <span className="font-mono">v2.5.1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Release Date</span>
              <span>June 15, 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">File Size</span>
              <span>1.2 GB</span>
            </div>
            <Link 
              href="/downloads/crick-fusion-v2.5.1.zip"
              className="block w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition-colors"
            >
              <span className="flex items-center justify-center">
                Download Now <Download className="ml-2 h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        {/* Upload Card - Only visible when authenticated */}
        {isAuthenticated && (
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-400 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="text-blue-800" />
              <h2 className="text-xl font-semibold text-black">Upload Your Mod</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".zip,.rar,.7z"
                  className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-800 hover:file:bg-blue-200"
                />
                <p className="text-sm text-gray-600">
                  Upload .zip, .rar, or .7z files (max 2GB)
                </p>
              </div>
              
              {file && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-black">
                    <span>{file.name}</span>
                    <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <div 
                      className="bg-blue-800 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!file || isUploaded}
                className={`w-full px-4 py-3 rounded-md flex justify-center items-center transition-colors ${
                  !file || isUploaded
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-800 hover:bg-blue-900 text-white'
                }`}
              >
                {isUploaded ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" /> Upload Complete
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Upload Mod
                  </>
                )}
              </button>

              {isUploaded && (
                <div className="text-center">
                  <Link 
                    href={`/downloads/${file?.name}`}
                    className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Download Uploaded File
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
