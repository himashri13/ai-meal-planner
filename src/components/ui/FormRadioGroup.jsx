import React from 'react';
import { useWatch } from 'react-hook-form';

export default function FormRadioGroup({ 
  name, 
  options, 
  control, 
  register, 
  className = "grid grid-cols-1 sm:grid-cols-2 gap-3" 
}) {
  const selectedValue = useWatch({
    control,
    name,
  });

  return (
    <div className={className}>
      {options.map(opt => (
        <label 
          key={opt.value} 
          className={`cursor-pointer px-4 py-3 rounded-xl border transition-all ${
            selectedValue === opt.value 
              ? 'bg-wellness-50 border-wellness-500 text-wellness-800 shadow-sm' 
              : 'bg-white border-slate-200 text-slate-600 hover:border-wellness-300'
          }`}
        >
          <input 
            type="radio" 
            value={opt.value} 
            {...register(name)} 
            className="sr-only" 
          />
          <span className="block font-medium text-sm">{opt.label}</span>
          {opt.desc && <span className="block text-xs text-slate-500 mt-1">{opt.desc}</span>}
        </label>
      ))}
    </div>
  );
}
