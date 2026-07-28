import React from 'react';

const RadioCard = React.forwardRef(({ label, description, icon: Icon, id, checked, className = '', ...props }, ref) => {
  return (
    <label
      htmlFor={id}
      className={`relative flex cursor-pointer rounded-2xl border p-4 shadow-sm focus:outline-none transition-all duration-200
        ${checked 
          ? 'bg-wellness-50 border-wellness-500 ring-1 ring-wellness-500 shadow-wellness-500/20' 
          : 'bg-white border-slate-200 hover:border-wellness-300 hover:bg-slate-50'
        } ${className}`}
    >
      <input
        type="radio"
        id={id}
        ref={ref}
        className="sr-only"
        checked={checked}
        {...props}
      />
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          {Icon && (
            <div className={`mr-4 p-2 rounded-xl flex-shrink-0 transition-colors ${checked ? 'bg-wellness-200 text-wellness-800' : 'bg-slate-100 text-slate-500'}`}>
              <Icon size={24} />
            </div>
          )}
          <div className="text-sm">
            <p className={`font-medium ${checked ? 'text-wellness-900' : 'text-slate-900'}`}>
              {label}
            </p>
            {description && (
              <p className={`mt-1 ${checked ? 'text-wellness-700' : 'text-slate-500'}`}>
                {description}
              </p>
            )}
          </div>
        </div>
        <div className={`h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors
          ${checked ? 'border-wellness-600 bg-wellness-600' : 'border-slate-300 bg-white'}`}>
          {checked && <div className="h-2 w-2 rounded-full bg-white" />}
        </div>
      </div>
    </label>
  );
});

RadioCard.displayName = 'RadioCard';

export default RadioCard;
