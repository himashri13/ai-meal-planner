import React from 'react';

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-wellness-700 uppercase tracking-wider">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-semibold text-slate-500">
          {progress}% Completed
        </span>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-wellness-100">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-wellness-500 transition-all duration-500 ease-out"
        />
      </div>
    </div>
  );
}
