import React, { useState } from 'react';
import { Download, Printer, Copy, Check } from 'lucide-react';
import { groupByCategory } from '../../services/groceryService';

export default function GroceryActions({ items = [] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!items || items.length === 0) return;
    
    const grouped = groupByCategory(items);
    let text = "My Smart Grocery List\n\n";
    
    Object.entries(grouped).forEach(([category, catItems]) => {
      text += `[${category}]\n`;
      catItems.forEach(item => {
        const check = item.checked ? "[x]" : "[ ]";
        text += `${check} ${item.name} (${item.quantity} ${item.unit})\n`;
      });
      text += '\n';
    });
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExport = (type) => {
    alert(`The ${type} export feature is coming in the next update!`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button 
        onClick={() => handleExport('PDF')}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm font-medium text-sm active:bg-slate-100"
      >
        <Download size={16} className="text-slate-500" />
        PDF
      </button>
      <button 
        onClick={() => handleExport('Print')}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm font-medium text-sm active:bg-slate-100"
      >
        <Printer size={16} className="text-slate-500" />
        Print
      </button>
      <button 
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors shadow-sm font-medium text-sm active:bg-emerald-200 min-w-[100px] justify-center"
      >
        {copied ? (
          <>
            <Check size={16} className="text-emerald-600" />
            Copied!
          </>
        ) : (
          <>
            <Copy size={16} className="text-emerald-600" />
            Copy List
          </>
        )}
      </button>
    </div>
  );
}
