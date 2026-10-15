import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AeroPool caught an error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('aeropool_pools');
      localStorage.removeItem('aeropool_data_version');
      localStorage.removeItem('aeropool_active_id');
    } catch (e) {
      console.warn(e);
    }
    window.location.href = window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/30">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-bold">AeroPool Temporary Glitch</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              An unexpected display issue occurred. Don't worry, your pool data is safe. Click below to refresh the airport schedule feed.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={this.handleReset}
                className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset & Reload App</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
