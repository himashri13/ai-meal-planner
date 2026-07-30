import React from 'react';

const ActionCard = ({ label, icon: Icon, colorClass, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 card hover:shadow-md transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-wellness-500 focus-visible:ring-offset-1"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${colorClass}`}>
        <Icon size={24} className="text-white" />
      </div>
      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{label}</span>
    </button>
  );
}

export default React.memo(ActionCard);
