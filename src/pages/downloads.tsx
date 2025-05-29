// src/pages/downloads.tsx
import { useState } from 'react';
import { Download, ArrowRight, Upload, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function DownloadsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);

  // Fixed file handling with proper type checking
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setIsUploaded(false);
    setUploadProgress(0);
  };

  const handleUpload = () => {
    if (!file) return;
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
          Downloads
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get the latest mods and game files
        </p>
      </div>

      {/* File upload section */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <input 
              type="file"
              onChange={handleFileChange}
              accept=".zip,.rar,.7z"
              className="w-full p-2 border rounded-md"
            />
            <p className="text-sm text-gray-500">
              Upload .zip, .rar, or .7z files (max 2GB)
            </p>
          </div>
          
          {file && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{file.name}</span>
                <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: ${uploadProgress}% }}
                ></div>
              </div>
            </div>
          )}

          <button 
            onClick={handleUpload}
            disabled={!file || isUploaded}
            className={`w-full p-3 rounded-md flex justify-center items-center 
              ${!file || isUploaded ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
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
        </div>
      </div>
    </div>
  );
}
