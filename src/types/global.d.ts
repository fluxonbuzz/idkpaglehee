import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
  
  interface Window {
    showToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
  }

  // Add type for SVG elements
  interface SVGSVGElement {
    className?: string;
  }
}

export {};
