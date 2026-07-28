import React from 'react';
import { Download, Printer, Share2 } from 'lucide-react';

export default function GroceryActions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm font-medium text-sm">
        <Download size={16} className="text-slate-500" />
        PDF
      </button>
      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm font-medium text-sm">
        <Printer size={16} className="text-slate-500" />
        Print
      </button>
      <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors shadow-sm font-medium text-sm">
        <Share2 size={16} className="text-emerald-600" />
        Share
      </button>
    </div>
  );
}
