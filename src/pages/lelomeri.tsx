// src/pages/aes-tool.tsx
import { useState, useRef, ChangeEvent } from 'react';
import { Upload, Download, Lock, Unlock, X, File, Key } from 'lucide-react';
import Head from 'next/head';
import toast from 'react-hot-toast';

export default function AESTool() {
  const [file, setFile] = useState<File | null>(null);
  const [key, setKey] = useState<string>('realnauticrick20');
  const [output, setOutput] = useState<Uint8Array | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('decrypt');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setOutput(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setOutput(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const processFile = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    if (!key) {
      toast.error('Please enter an encryption key');
      return;
    }

    setIsProcessing(true);
    toast.loading(`${mode === 'encrypt' ? 'Encrypting' : 'Decrypting'} file...`);

    try {
      const fileBuffer = await file.arrayBuffer();
      const result = mode === 'encrypt' 
        ? await encryptAES(new Uint8Array(fileBuffer), key)
        : await decryptAES(new Uint8Array(fileBuffer), key);
      
      setOutput(result);
      toast.success(`File ${mode}ed successfully!`);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${mode} file: ${err instanceof Error ? err.message : 'Invalid key or file format'}`);
    } finally {
      setIsProcessing(false);
      toast.dismiss();
    }
  };

  const prepareKey = (key: string): Uint8Array => {
    const encoder = new TextEncoder();
    const keyBuffer = encoder.encode(key);
    const keyData = new Uint8Array(32); // Using 256-bit key for better security
    
    // Fill keyData with keyBuffer, padding with zeros if needed
    for (let i = 0; i < keyData.length; i++) {
      keyData[i] = keyBuffer[i % keyBuffer.length];
    }
    
    return keyData;
  };

  const encryptAES = async (data: Uint8Array, key: string): Promise<Uint8Array> => {
    const keyData = prepareKey(key);
    const iv = crypto.getRandomValues(new Uint8Array(16)); // Random IV for better security
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-CBC' },
      false,
      ['encrypt']
    );

    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-CBC',
        iv: iv,
      },
      cryptoKey,
      data
    );

    // Combine IV and encrypted data for output
    const result = new Uint8Array(iv.length + (encrypted as ArrayBuffer).byteLength);
    result.set(iv, 0);
    result.set(new Uint8Array(encrypted), iv.length);
    
    return result;
  };

  const decryptAES = async (data: Uint8Array, key: string): Promise<Uint8Array> => {
    // First 16 bytes are IV
    if (data.length < 16) {
      throw new Error('Invalid encrypted file format - missing IV');
    }
    
    const iv = data.slice(0, 16);
    const encryptedData = data.slice(16);
    const keyData = prepareKey(key);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-CBC' },
      false,
      ['decrypt']
    );

    try {
      const decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-CBC',
          iv: iv,
        },
        cryptoKey,
        encryptedData
      );

      // Check if the decrypted data is text
      const decryptedArray = new Uint8Array(decrypted);
      if (isLikelyText(decryptedArray)) {
        return decryptedArray;
      } else {
        // If not text, return as-is (binary data)
        return decryptedArray;
      }
    } catch (err) {
      throw new Error('Decryption failed. Please check your key and ensure the file is properly encrypted.');
    }
  };

  // Helper function to check if data is likely text
  const isLikelyText = (data: Uint8Array): boolean => {
    const decoder = new TextDecoder('utf-8', { fatal: true });
    try {
      decoder.decode(data);
      return true;
    } catch (e) {
      return false;
    }
  };

  const downloadResult = () => {
    if (!output || !file) return;
    
    let fileName = file.name.replace(/\.[^/.]+$/, '');
    if (mode === 'encrypt') {
      fileName += '.enc';
    } else if (file.name.endsWith('.enc')) {
      // Try to determine original extension for decrypted files
      const decryptedText = new TextDecoder().decode(output);
      if (decryptedText.startsWith('{') || decryptedText.startsWith('[')) {
        fileName += '.json';
      } else if (decryptedText.includes('<html') || decryptedText.includes('<!DOCTYPE')) {
        fileName += '.html';
      } else {
        fileName += '.txt';
      }
    } else {
      fileName += '.dec';
    }
    
    const blob = new Blob([output], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetTool = () => {
    setFile(null);
    setOutput(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Head>
        <title>AES Tool | Shiva X Mods</title>
      </Head>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          Shiva X Mods
        </h1>

        <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
          <div className="p-8">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setMode('encrypt')}
                  className={`px-4 py-2 rounded-md font-medium ${mode === 'encrypt' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Lock size={16} /> Encrypt
                  </div>
                </button>
                <button
                  onClick={() => setMode('decrypt')}
                  className={`px-4 py-2 rounded-md font-medium ${mode === 'decrypt' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Unlock size={16} /> Decrypt
                  </div>
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div 
              className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center mb-6 cursor-pointer hover:border-blue-500 transition"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              {file ? (
                <div className="flex flex-col items-center">
                  <File size={48} className="text-blue-400 mb-2" />
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetTool();
                    }}
                    className="mt-3 text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <X size={14} /> Remove file
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-1">
                    Drag & drop your file here
                  </p>
                  <p className="text-gray-400">or click to browse</p>
                  <p className="text-xs text-gray-500 mt-3">
                    Supports any file type (txt, dat, etc.)
                  </p>
                </>
              )}
            </div>

            {/* Key Input */}
            <div className="mb-6">
              <label htmlFor="key" className="block text-sm font-medium text-gray-300 mb-2">
                AES Key (16-32 characters recommended)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key size={18} className="text-gray-400" />
                </div>
                <input
                  id="key"
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your encryption key"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Default key: "realnauticrick20"
              </p>
            </div>

            {/* Process Button */}
            <button
              onClick={processFile}
              disabled={isProcessing || !file}
              className={`w-full py-3 px-4 rounded transition flex items-center justify-center gap-2 mb-4 ${
                isProcessing || !file
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold'
              }`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  {mode === 'encrypt' ? <Lock size={18} /> : <Unlock size={18} />}
                  {mode === 'encrypt' ? 'Encrypt File' : 'Decrypt File'}
                </>
              )}
            </button>

            {/* Output Section */}
            {output && (
              <div className="mt-6 border-t border-gray-700 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Download size={20} className="text-green-400" />
                    Processed File Ready
                  </h3>
                  <button
                    onClick={downloadResult}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded flex items-center gap-2"
                  >
                    <Download size={16} /> Download
                  </button>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-3">
                    <File size={24} className="text-blue-400" />
                    <div>
                      <p className="font-medium">
                        {file.name.replace(/\.[^/.]+$/, '') + 
                         (mode === 'encrypt' ? '.enc' : file.name.endsWith('.enc') ? '' : '.dec')}
                      </p>
                      <p className="text-sm text-gray-400">
                        {(output.byteLength / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={resetTool}
                  className="mt-4 text-sm text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <X size={14} /> Process another file
                </button>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-8 bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                How to use this tool
              </h3>
              <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
                <li>Select your game file (CSV, TXT, or encrypted .enc file)</li>
                <li>Use the default key "realnauticrick20" or enter your own</li>
                <li>Choose encrypt or decrypt mode</li>
                <li>Click the process button</li>
                <li>Download the result when ready</li>
              </ul>
              <div className="mt-4 text-xs text-gray-400">
                <p className="font-medium">Credits:</p>
                <p>Coded by Fluxon & Shiva XD</p>
                <p className="mt-1">For Shiva X Mods Community</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
