import { useState, useRef } from 'react';
import { Upload, Download, Lock, Unlock, X, File, Key } from 'lucide-react';

export default function AESTool() {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState('realnauticrick20');
  const [output, setOutput] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState('decrypt');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const fileInputRef = useRef(null);

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setOutput(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setOutput(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const prepareKey = (keyString) => {
    const encoder = new TextEncoder();
    const keyBuffer = encoder.encode(keyString);
    const keyData = new Uint8Array(32); // 256-bit key
    
    // Fill keyData with keyBuffer, repeating if necessary
    for (let i = 0; i < keyData.length; i++) {
      keyData[i] = keyBuffer[i % keyBuffer.length];
    }
    
    return keyData;
  };

  const encryptAES = async (data, keyString) => {
    try {
      const keyData = prepareKey(keyString);
      const iv = crypto.getRandomValues(new Uint8Array(16));
      
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

      // Combine IV and encrypted data
      const result = new Uint8Array(iv.length + encrypted.byteLength);
      result.set(iv, 0);
      result.set(new Uint8Array(encrypted), iv.length);
      
      return result;
    } catch (error) {
      throw new Error('Encryption failed: ' + error.message);
    }
  };

  const decryptAES = async (data, keyString) => {
    try {
      // First 16 bytes are IV
      if (data.length < 16) {
        throw new Error('Invalid encrypted file format - file too small');
      }
      
      const iv = data.slice(0, 16);
      const encryptedData = data.slice(16);
      const keyData = prepareKey(keyString);
      
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'AES-CBC' },
        false,
        ['decrypt']
      );

      const decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-CBC',
          iv: iv,
        },
        cryptoKey,
        encryptedData
      );

      return new Uint8Array(decrypted);
    } catch (error) {
      throw new Error('Decryption failed - please check your key and ensure the file is properly encrypted');
    }
  };

  const processFile = async () => {
    if (!file) {
      showMessage('Please select a file', 'error');
      return;
    }

    if (!key.trim()) {
      showMessage('Please enter an encryption key', 'error');
      return;
    }

    setIsProcessing(true);
    showMessage(`${mode === 'encrypt' ? 'Encrypting' : 'Decrypting'} file...`, 'loading');

    try {
      const fileBuffer = await file.arrayBuffer();
      const result = mode === 'encrypt' 
        ? await encryptAES(new Uint8Array(fileBuffer), key)
        : await decryptAES(new Uint8Array(fileBuffer), key);
      
      setOutput(result);
      showMessage(`File ${mode}ed successfully!`, 'success');
    } catch (err) {
      console.error(err);
      showMessage(err.message || `Failed to ${mode} file`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!output || !file) return;
    
    let fileName = file.name.replace(/\.[^/.]+$/, '');
    
    if (mode === 'encrypt') {
      fileName += '.enc';
    } else if (file.name.endsWith('.enc')) {
      // Try to determine original extension for decrypted files
      try {
        const decryptedText = new TextDecoder().decode(output);
        if (decryptedText.trim().startsWith('{') || decryptedText.trim().startsWith('[')) {
          fileName += '.json';
        } else if (decryptedText.includes('<html') || decryptedText.includes('<!DOCTYPE')) {
          fileName += '.html';
        } else if (decryptedText.includes(',') && decryptedText.includes('\n')) {
          fileName += '.csv';
        } else {
          fileName += '.txt';
        }
      } catch (e) {
        // If it's not text, keep as binary
        fileName += '.dat';
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
      {/* Message Toast */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          messageType === 'success' ? 'bg-green-600' :
          messageType === 'error' ? 'bg-red-600' :
          messageType === 'loading' ? 'bg-blue-600' : 'bg-gray-600'
        }`}>
          <div className="flex items-center gap-2">
            {messageType === 'loading' && (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span className="text-sm font-medium">{message}</span>
          </div>
        </div>
      )}

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
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    mode === 'encrypt' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Lock size={16} /> Encrypt
                  </div>
                </button>
                <button
                  onClick={() => setMode('decrypt')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    mode === 'decrypt' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Unlock size={16} /> Decrypt
                  </div>
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div 
              className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center mb-6 cursor-pointer hover:border-blue-500 transition-colors"
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
                    className="mt-3 text-sm text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
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
                    Supports any file type (txt, csv, dat, enc, etc.)
                  </p>
                </>
              )}
            </div>

            {/* Key Input */}
            <div className="mb-6">
              <label htmlFor="key" className="block text-sm font-medium text-gray-300 mb-2">
                AES Key (any length supported)
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
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your encryption key"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Default key: "realnauticrick20" • Key will be padded to 256-bit internally
              </p>
            </div>

            {/* Process Button */}
            <button
              onClick={processFile}
              disabled={isProcessing || !file || !key.trim()}
              className={`w-full py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 mb-4 font-medium ${
                isProcessing || !file || !key.trim()
                  ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                  : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              }`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
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
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
                  >
                    <Download size={16} /> Download
                  </button>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-3">
                    <File size={24} className="text-blue-400" />
                    <div>
                      <p className="font-medium">
                        {(() => {
                          let fileName = file.name.replace(/\.[^/.]+$/, '');
                          if (mode === 'encrypt') {
                            return fileName + '.enc';
                          } else if (file.name.endsWith('.enc')) {
                            try {
                              const decryptedText = new TextDecoder().decode(output);
                              if (decryptedText.trim().startsWith('{') || decryptedText.trim().startsWith('[')) {
                                return fileName + '.json';
                              } else if (decryptedText.includes(',') && decryptedText.includes('\n')) {
                                return fileName + '.csv';
                              } else {
                                return fileName + '.txt';
                              }
                            } catch (e) {
                              return fileName + '.dat';
                            }
                          } else {
                            return fileName + '.dec';
                          }
                        })()}
                      </p>
                      <p className="text-sm text-gray-400">
                        {(output.byteLength / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={resetTool}
                  className="mt-4 text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
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
                <li>Select your file (any format: CSV, TXT, DAT, or encrypted .enc file)</li>
                <li>Use the default key "realnauticrick20" or enter your own custom key</li>
                <li>Choose encrypt mode to secure your files or decrypt mode to restore them</li>
                <li>Click the process button and wait for completion</li>
                <li>Download the result when ready</li>
              </ul>
              <div className="mt-4 p-3 bg-blue-900/30 rounded border border-blue-700">
                <p className="text-sm text-blue-200 font-medium">🔒 Security Note:</p>
                <p className="text-xs text-blue-300 mt-1">
                  This tool uses AES-256-CBC encryption with random IV for each encryption. 
                  Keep your encryption key safe - without it, your files cannot be recovered!
                </p>
              </div>
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
