import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function ResponsiveModal({ isOpen, onClose, title, children }) {
  
  // Prevent body scroll and listen for Escape key when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-toast flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative bg-slate-50 w-full sm:w-auto sm:min-w-[600px] max-w-4xl h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-8 sm:zoom-in-95 duration-300"
      >
        {/* Mobile Pull Handle */}
        <div className="w-full flex justify-center pt-3 sm:hidden pb-1 bg-white">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 bg-white border-b border-slate-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-grow relative hide-scrollbar">
          {children}
        </div>
      </div>
      
    </div>
  );
}
