import React from 'react';

export default function ProgressBar({ 
  percentage, 
  label, 
  subLabel,
  colorClass = "bg-wellness-500",
  trackClass = "bg-wellness-100",
  sizeClass = "h-2",
  labelClass = "text-wellness-700 uppercase tracking-wider",
  subLabelClass = "text-slate-500"
}) {
  const safePercentage = Math.min(100, Math.max(0, percentage || 0));

  return (
    <div className="w-full">
      {(label || subLabel) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className={`text-xs font-semibold ${labelClass}`}>
              {label}
            </span>
          )}
          {subLabel && (
            <span className={`text-xs font-semibold ${subLabelClass}`}>
              {subLabel}
            </span>
          )}
        </div>
      )}
      <div className={`overflow-hidden text-xs flex rounded-full ${trackClass} ${sizeClass} mb-4`}>
        <div
          style={{ width: `${safePercentage}%` }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-out ${colorClass}`}
        />
      </div>
    </div>
  );
}
