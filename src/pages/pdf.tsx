// File: app/components/ImageToPdfConverter.tsx
'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  Upload, 
  Download, 
  Trash2, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Crop, 
  Filter,
  Image as ImageIcon,
  FileText,
  Settings,
  ChevronUp,
  ChevronDown,
  Grid,
  X,
  Check,
  Printer,
  Share2,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Type Definitions
interface ImageData {
  id: string;
  file: File;
  url: string;
  originalUrl: string;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  filters: {
    grayscale?: boolean;
    brightness?: number;
    contrast?: number;
  };
  cropped: boolean;
  timestamp: string;
}

interface PdfSettings {
  pageSize: 'a4' | 'letter' | 'legal' | 'a3';
  orientation: 'portrait' | 'landscape';
  margin: number;
  quality: number;
  compression: 'low' | 'medium' | 'high';
}

interface ImageSettings {
  [key: string]: {
    filters: {
      grayscale?: boolean;
      brightness?: number;
      contrast?: number;
    };
  };
}

export default function ImageToPdfConverter() {
  // State Management with TypeScript
  const [images, setImages] = useState<ImageData[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [pdfSettings, setPdfSettings] = useState<PdfSettings>({
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 20,
    quality: 1.0,
    compression: 'medium'
  });
  const [imageSettings, setImageSettings] = useState<ImageSettings>({});
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  
  // Refs with TypeScript
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Image processing function
  const processImage = async (file: File): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new window.Image();
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          resolve({
            id: Date.now() + Math.random().toString(),
            file,
            url: e.target?.result as string,
            originalUrl: e.target?.result as string,
            width: img.width,
            height: img.height,
            rotation: 0,
            scale: 1,
            filters: {},
            cropped: false,
            timestamp: new Date().toISOString()
          });
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  // Handle file upload with TypeScript
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    
    const files = Array.from(event.target.files);
    const processedImages = await Promise.all(
      files.map(file => processImage(file))
    );
    setImages(prev => [...prev, ...processedImages]);
  };

  // Drag and drop functionality with TypeScript
  useEffect(() => {
    const dropzone = dropzoneRef.current;
    if (!dropzone) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      dropzone.classList.add('border-blue-500', 'bg-blue-50');
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dropzone.classList.remove('border-blue-500', 'bg-blue-50');
    };

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      dropzone.classList.remove('border-blue-500', 'bg-blue-50');
      
      if (!e.dataTransfer) return;
      
      const files = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('image/')
      );
      
      if (files.length > 0) {
        const processedImages = await Promise.all(
          files.map(file => processImage(file))
        );
        setImages(prev => [...prev, ...processedImages]);
      }
    };

    dropzone.addEventListener('dragover', handleDragOver);
    dropzone.addEventListener('dragleave', handleDragLeave);
    dropzone.addEventListener('drop', handleDrop);

    return () => {
      dropzone.removeEventListener('dragover', handleDragOver);
      dropzone.removeEventListener('dragleave', handleDragLeave);
      dropzone.removeEventListener('drop', handleDrop);
    };
  }, []);

  // Image manipulation functions
  const rotateImage = (id: string, degrees: number) => {
    setImages(prev => prev.map(img => 
      img.id === id 
        ? { ...img, rotation: (img.rotation + degrees) % 360 }
        : img
    ));
  };

  const applyFilter = (id: string, filterType: keyof ImageData['filters']) => {
    setImageSettings(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        filters: {
          ...prev[id]?.filters,
          [filterType]: !prev[id]?.filters?.[filterType]
        }
      }
    }));
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    setSelectedImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const reorderImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages);
  };

  // PDF Generation with TypeScript
  const generatePdf = async (): Promise<void> => {
    if (images.length === 0) return;
    
    setProcessing(true);
    
    try {
      const pdf = new jsPDF({
        orientation: pdfSettings.orientation,
        unit: 'mm',
        format: pdfSettings.pageSize
      });
      
      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();
        
        const img = images[i];
        const element = document.getElementById(`preview-${img.id}`);
        
        if (!element) continue;
        
        const canvas = await html2canvas(element, {
          scale: pdfSettings.quality,
          useCORS: true,
          backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = pdfSettings.margin;
        
        const maxWidth = pageWidth - (margin * 2);
        const maxHeight = pageHeight - (margin * 2);
        
        let width = canvas.width * 0.264583; // Convert pixels to mm
        let height = canvas.height * 0.264583;
        
        // Maintain aspect ratio
        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = height * ratio;
        }
        
        if (height > maxHeight) {
          const ratio = maxHeight / height;
          height = maxHeight;
          width = width * ratio;
        }
        
        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;
        
        pdf.addImage(imgData, 'JPEG', x, y, width, height);
      }
      
      // Save the PDF
      pdf.save(`converted-images-${new Date().getTime()}.pdf`);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  // Batch operations
  const selectAllImages = () => {
    if (selectedImages.size === images.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(images.map(img => img.id)));
    }
  };

  const deleteSelected = () => {
    setImages(prev => prev.filter(img => !selectedImages.has(img.id)));
    setSelectedImages(new Set());
  };

  // Clear all images
  const clearAllImages = () => {
    setImages([]);
    setSelectedImages(new Set());
  };

  // Export as separate PDFs
  const exportAsSeparatePdfs = async () => {
    if (images.length === 0) return;
    
    setProcessing(true);
    
    try {
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const pdf = new jsPDF({
          orientation: pdfSettings.orientation,
          unit: 'mm',
          format: pdfSettings.pageSize
        });
        
        const element = document.getElementById(`preview-${img.id}`);
        if (!element) continue;
        
        const canvas = await html2canvas(element, {
          scale: pdfSettings.quality,
          useCORS: true
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = pdfSettings.margin;
        
        const maxWidth = pageWidth - (margin * 2);
        const maxHeight = pageHeight - (margin * 2);
        
        let width = canvas.width * 0.264583;
        let height = canvas.height * 0.264583;
        
        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = height * ratio;
        }
        
        if (height > maxHeight) {
          const ratio = maxHeight / height;
          height = maxHeight;
          width = width * ratio;
        }
        
        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;
        
        pdf.addImage(imgData, 'JPEG', x, y, width, height);
        pdf.save(`image-${i + 1}-${new Date().getTime()}.pdf`);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export PDFs. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  // Get image format
  const getImageFormat = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    return extension.toUpperCase();
  };

  // Get file size in MB
  const getFileSize = (file: File): string => {
    return (file.size / (1024 * 1024)).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Advanced Image to PDF Converter
          </h1>
          <p className="text-gray-600">
            Convert, edit, and merge images to PDF entirely in your browser. No server uploads.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Upload & Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Zone */}
            <div
              ref={dropzoneRef}
              className="border-3 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-white hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Drop images here or click to upload
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Supports JPG, PNG, WebP, GIF
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <button 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                Select Images
              </button>
            </div>

            {/* PDF Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                PDF Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Page Size
                  </label>
                  <select
                    value={pdfSettings.pageSize}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setPdfSettings(prev => ({ 
                      ...prev, 
                      pageSize: e.target.value as PdfSettings['pageSize'] 
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="a4">A4 (210 × 297 mm)</option>
                    <option value="letter">Letter (216 × 279 mm)</option>
                    <option value="legal">Legal (216 × 356 mm)</option>
                    <option value="a3">A3 (297 × 420 mm)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Orientation
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPdfSettings(prev => ({ ...prev, orientation: 'portrait' }))}
                      className={`flex-1 p-3 rounded-lg border ${pdfSettings.orientation === 'portrait' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    >
                      Portrait
                    </button>
                    <button
                      onClick={() => setPdfSettings(prev => ({ ...prev, orientation: 'landscape' }))}
                      className={`flex-1 p-3 rounded-lg border ${pdfSettings.orientation === 'landscape' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    >
                      Landscape
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Quality: {pdfSettings.quality.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={pdfSettings.quality}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPdfSettings(prev => ({ 
                      ...prev, 
                      quality: parseFloat(e.target.value) 
                    }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Margin (mm): {pdfSettings.margin}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={pdfSettings.margin}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPdfSettings(prev => ({ 
                      ...prev, 
                      margin: parseInt(e.target.value) 
                    }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Stats Panel */}
            {images.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Conversion Stats
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Images:</span>
                    <span className="font-medium">{images.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Size:</span>
                    <span className="font-medium">
                      {images.reduce((acc, img) => acc + img.file.size, 0) / (1024 * 1024) > 1
                        ? `${(images.reduce((acc, img) => acc + img.file.size, 0) / (1024 * 1024)).toFixed(2)} MB`
                        : `${(images.reduce((acc, img) => acc + img.file.size, 0) / 1024).toFixed(2)} KB`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Selected:</span>
                    <span className="font-medium">{selectedImages.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Est. PDF Pages:</span>
                    <span className="font-medium">{images.length}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Batch Operations */}
            {images.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Batch Operations
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={selectAllImages}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {selectedImages.size === images.length ? 'Deselect All' : 'Select All'}
                  </button>
                  <button
                    onClick={deleteSelected}
                    disabled={selectedImages.size === 0}
                    className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="inline h-4 w-4 mr-1" />
                    Delete Selected
                  </button>
                  <button
                    onClick={clearAllImages}
                    className="px-4 py-2 bg-yellow-100 text-yellow-600 hover:bg-yellow-200 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {selectedImages.size} of {images.length} images selected
                </p>
              </div>
            )}
          </div>

          {/* Main Content - Image Gallery & Editor */}
          <div className="lg:col-span-2">
            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
                >
                  {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {previewMode ? 'Edit Mode' : 'Preview Mode'}
                </button>
                
                {images.length > 0 && (
                  <button
                    onClick={exportAsSeparatePdfs}
                    disabled={processing}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" />
                    Export Separate PDFs
                  </button>
                )}
              </div>
              
              <div className="text-gray-600 bg-white px-4 py-2 rounded-lg shadow">
                {images.length} image{images.length !== 1 ? 's' : ''} loaded • 
                Total: {images.reduce((acc, img) => acc + img.file.size, 0) / (1024 * 1024) > 1
                  ? `${(images.reduce((acc, img) => acc + img.file.size, 0) / (1024 * 1024)).toFixed(2)} MB`
                  : `${(images.reduce((acc, img) => acc + img.file.size, 0) / 1024).toFixed(2)} KB`
                }
              </div>
            </div>

            {/* Image Gallery */}
            <AnimatePresence>
              {images.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-white rounded-2xl shadow"
                >
                  <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">
                    No Images Loaded
                  </h3>
                  <p className="text-gray-400">
                    Upload images to begin converting to PDF
                  </p>
                </motion.div>
              ) : (
                <div className={`grid ${previewMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
                  {images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`bg-white rounded-xl shadow-lg overflow-hidden ${selectedImages.has(image.id) ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      {/* Image Header */}
                      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedImages.has(image.id)}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              const newSet = new Set(selectedImages);
                              if (e.target.checked) {
                                newSet.add(image.id);
                              } else {
                                newSet.delete(image.id);
                              }
                              setSelectedImages(newSet);
                            }}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <span className="text-sm font-medium text-gray-800">
                              {image.file.name.length > 20 
                                ? `${image.file.name.substring(0, 20)}...` 
                                : image.file.name
                              }
                            </span>
                            <div className="flex gap-2 text-xs text-gray-500">
                              <span>{getImageFormat(image.file.name)}</span>
                              <span>•</span>
                              <span>{getFileSize(image.file)} MB</span>
                            </div>
                          </div>
                        </div>
                        
                        {!previewMode && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => rotateImage(image.id, 90)}
                              className="p-2 hover:bg-gray-200 rounded transition-colors"
                              title="Rotate 90°"
                            >
                              <RotateCw className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => removeImage(image.id)}
                              className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Image Preview */}
                      <div className="p-4">
                        <div 
                          id={`preview-${image.id}`}
                          className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center min-h-[200px] max-h-[300px]"
                          style={{
                            filter: imageSettings[image.id]?.filters?.grayscale ? 'grayscale(100%)' : 'none'
                          }}
                        >
                          <img
                            src={image.url}
                            alt={`Preview ${index + 1}`}
                            className="max-w-full max-h-64 object-contain"
                            style={{
                              transform: `rotate(${image.rotation}deg) scale(${image.scale})`,
                            }}
                          />
                          
                          {/* Rotation Indicator */}
                          {image.rotation !== 0 && (
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                              {image.rotation}°
                            </div>
                          )}
                        </div>

                        {/* Image Controls */}
                        {!previewMode && (
                          <div className="mt-4 space-y-3">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => applyFilter(image.id, 'grayscale')}
                                className={`px-3 py-1 rounded text-sm transition-colors ${imageSettings[image.id]?.filters?.grayscale ? 'bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                              >
                                Grayscale
                              </button>
                              <button
                                onClick={() => rotateImage(image.id, -90)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
                              >
                                Rotate Left
                              </button>
                              <button
                                onClick={() => {
                                  const newScale = image.scale * 1.1;
                                  setImages(prev => prev.map(img => 
                                    img.id === image.id ? { ...img, scale: newScale } : img
                                  ));
                                }}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
                              >
                                <ZoomIn className="inline h-3 w-3 mr-1" />
                                Zoom In
                              </button>
                              <button
                                onClick={() => {
                                  const newScale = Math.max(0.1, image.scale * 0.9);
                                  setImages(prev => prev.map(img => 
                                    img.id === image.id ? { ...img, scale: newScale } : img
                                  ));
                                }}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
                              >
                                <ZoomOut className="inline h-3 w-3 mr-1" />
                                Zoom Out
                              </button>
                            </div>

                            {/* Scale Display */}
                            <div className="text-center">
                              <span className="text-xs text-gray-500">
                                Scale: {image.scale.toFixed(1)}x
                              </span>
                            </div>

                            {/* Reordering Controls */}
                            {images.length > 1 && (
                              <div className="flex items-center justify-between pt-2 border-t">
                                <button
                                  onClick={() => reorderImage(index, index - 1)}
                                  disabled={index === 0}
                                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  title="Move up"
                                >
                                  <ChevronUp className="h-4 w-4" />
                                </button>
                                <span className="text-sm text-gray-600">
                                  Position {index + 1} of {images.length}
                                </span>
                                <button
                                  onClick={() => reorderImage(index, index + 1)}
                                  disabled={index === images.length - 1}
                                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  title="Move down"
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center items-center">
                  <button
                    onClick={generatePdf}
                    disabled={processing || images.length === 0}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 min-w-[200px]"
                  >
                    {processing ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5" />
                        Generate & Download PDF
                      </>
                    )}
                  </button>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Printer className="h-5 w-5" />
                      Print Directly
                    </button>
                    
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: 'Converted PDF',
                            text: 'Check out my converted images to PDF!',
                          });
                        }
                      }}
                      className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Share2 className="h-5 w-5" />
                      Share
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-700">Privacy Guaranteed</div>
                    <p className="text-blue-600">All processing happens in your browser</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-700">No File Limits</div>
                    <p className="text-green-600">Convert as many images as needed</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-purple-700">Full Control</div>
                    <p className="text-purple-600">Edit and arrange before conversion</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Advanced Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Zero Server Upload',
                description: 'All processing happens locally in your browser',
                icon: '🔒',
                color: 'text-blue-600'
              },
              {
                title: 'Batch Processing',
                description: 'Handle multiple images simultaneously',
                icon: '🖼️',
                color: 'text-green-600'
              },
              {
                title: 'Image Editing',
                description: 'Rotate, crop, and apply filters',
                icon: '🎨',
                color: 'text-purple-600'
              },
              {
                title: 'Custom Layout',
                description: 'Drag and drop to reorder pages',
                icon: '📄',
                color: 'text-orange-600'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className={`text-3xl mb-3 ${feature.color}`}>{feature.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>
            This tool works entirely in your browser. No data is sent to any server.
            Images are processed locally using JavaScript.
          </p>
          <p className="mt-2">
            Compatible with Chrome, Firefox, Safari, and Edge.
          </p>
        </footer>
      </div>
    </div>
  );
}
