// src/pages/rc24-tool.tsx
import { useState, useRef, ChangeEvent } from 'react';
import { Upload, Download, Lock, Unlock, X, File, Key } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

export default function RC24Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [key, setKey] = useState<string>('');
  const [output, setOutput] = useState<Uint8Array | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const processFile = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    if (!key) {
      setError('Please enter a key');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const fileBuffer = await file.arrayBuffer();
      const result = await rc24Process(new Uint8Array(fileBuffer), key, mode);
      setOutput(result);
    } catch (err) {
      setError(`Failed to ${mode} file: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const rc24Process = async (data: Uint8Array, key: string, mode: 'encrypt' | 'decrypt'): Promise<Uint8Array> => {
    // This is a simplified RC24-like algorithm for demonstration
    // Note: Real RC24 would use a more complex algorithm
    
    // Convert key to bytes (pad or truncate to 24 bytes)
    const keyBytes = new TextEncoder().encode(key);
    const effectiveKey = new Uint8Array(24);
    for (let i = 0; i < 24; i++) {
      effectiveKey[i] = keyBytes[i % keyBytes.length] ^ (i * 11);
    }

    // Process each byte
    const result = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      const keyByte = effectiveKey[i % 24];
      result[i] = mode === 'encrypt' 
        ? data[i] ^ keyByte 
        : data[i] ^ keyByte;
    }

    return result;
  };

  const downloadResult = () => {
    if (!output) return;
    
    const blob = new Blob([output], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name || 'file'}.${mode === 'encrypt' ? 'enc' : 'dec'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetTool = () => {
    setFile(null);
    setKey('');
    setOutput(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Head>
        <title>RC24 Tool | Shiva X Mods</title>
      </Head>

      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            Shiva X Mods
          </Link>
          <nav className="flex gap-6">
            <Link href="/store" className="hover:text-blue-400 transition">Store</Link>
            <Link href="/downloads" className="hover:text-blue-400 transition">Games</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            RC24 File Tool
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'} cricket game files with RC24 algorithm
          </p>
        </section>

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
                    Supports .dat, .pak, .bin files used in cricket games
                  </p>
                </>
              )}
            </div>

            {/* Key Input */}
            <div className="mb-6">
              <label htmlFor="key" className="block text-sm font-medium text-gray-300 mb-2">
                RC24 Key
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
            </div>

            {/* Process Button */}
            <button
              onClick={processFile}
              disabled={isProcessing || !file || !key}
              className={`w-full py-3 px-4 rounded transition flex items-center justify-center gap-2 mb-4 ${
                isProcessing || !file || !key
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

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

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
                        {file?.name || 'file'}.{mode === 'encrypt' ? 'enc' : 'dec'}
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
                <li>Select your cricket game file (usually .dat, .pak, or .bin)</li>
                <li>Enter the correct RC24 key (game-specific or provided with mods)</li>
                <li>Choose whether to encrypt or decrypt the file</li>
                <li>Click the process button and wait for completion</li>
                <li>Download the processed file</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                Note: This is a simplified RC24 implementation. For some games, you may need additional processing.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
