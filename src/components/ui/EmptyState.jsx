import React from 'react';

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action = null,
  iconClassName = "text-slate-400",
  containerClassName = "bg-slate-100"
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in-95 duration-300 h-full px-4">
      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 ${containerClassName}`}>
        {Icon && <Icon size={32} className={`sm:w-9 sm:h-9 ${iconClassName}`} />}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-sm mx-auto mb-6">
        {description}
      </p>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
}
