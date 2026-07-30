import React, { Component } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-wellness-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg border border-slate-100 flex flex-col items-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
              <AlertOctagon size={32} />
            </div>
            
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong</h1>
            <p className="text-slate-500 mb-8">
              We encountered an unexpected error while loading this component. Please try reloading the page.
            </p>
            
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            >
              <RotateCcw size={18} />
              Reload Page
            </button>

            {import.meta.env?.MODE === 'development' && this.state.error && (
              <div className="mt-6 w-full text-left bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-auto">
                <p className="text-xs text-slate-700 font-mono whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
