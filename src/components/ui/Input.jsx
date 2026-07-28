import React from 'react';

const Input = React.forwardRef(({ label, id, error, className = '', rightElement, ...props }, ref) => {
  const errorId = `${id}-error`;

  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full px-4 py-2.5 rounded-xl border bg-white/50 backdrop-blur-sm transition-all duration-200 outline-none
            ${rightElement ? 'pr-11' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100 text-red-900 placeholder-red-300' 
              : 'border-slate-200 hover:border-wellness-300 focus:border-wellness-500 focus:ring-4 focus:ring-wellness-100 text-slate-900 placeholder-slate-400'
            }`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <span id={errorId} className="text-sm text-red-500 mt-1" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
