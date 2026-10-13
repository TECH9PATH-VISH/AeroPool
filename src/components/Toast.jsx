import React, { useEffect } from 'react';
import { usePool } from '../context/PoolContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast, closeToast } = usePool();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      closeToast();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-sky-400" />;
    }
  };

  const getBorder = () => {
    switch (toast.type) {
      case 'success':
        return 'border-emerald-500/50 bg-navy-900/95';
      case 'error':
        return 'border-rose-500/50 bg-navy-900/95';
      case 'info':
      default:
        return 'border-sky-500/50 bg-navy-900/95';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div
        className={`flex items-start space-x-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-md text-white ${getBorder()}`}
      >
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1 text-xs font-semibold leading-relaxed">
          {toast.message}
        </div>
        <button
          onClick={closeToast}
          className="text-slate-400 hover:text-white transition-colors p-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
