import React from 'react';

const LoadingSpinner = ({ message = "Loading...", fullScreen = true }) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wellness-600" aria-label="Loading" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      {message && <p className="text-slate-500 font-medium text-sm animate-pulse">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wellness-50">
        {content}
      </div>
    );
  }

  return <div className="p-8 flex justify-center">{content}</div>;
};

export default React.memo(LoadingSpinner);
