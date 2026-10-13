import React from 'react';
import { usePool } from '../context/PoolContext';
import { Plane, Car, ShieldCheck, Heart, Sparkles, MapPin, ExternalLink } from 'lucide-react';

export const Footer = () => {
  const { setActiveTab } = usePool();

  return (
    <footer className="bg-navy-900 border-t border-navy-800 text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('book')}>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-glow">
                <Plane className="w-5 h-5 transform -rotate-45" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                AeroPool
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Intelligent airport shared-cab pooling platform matching incoming flight passengers heading in the same geographic direction. Splitting transit costs, guaranteeing trunk luggage space, and accelerating airport departures.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400 bg-navy-800/80 px-3 py-1.5 rounded-xl border border-navy-700/80 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Airport Staging & Dispatch Network Active</span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('book')} className="hover:text-sky-400 transition-colors">
                  Find a Ride / Book Pool
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('matches')} className="hover:text-sky-400 transition-colors">
                  Active Pools Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-sky-400 transition-colors">
                  Live Pool Hub & Chat
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('estimator')} className="hover:text-sky-400 transition-colors">
                  Fare & Carbon Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('terminal-map')} className="hover:text-sky-400 transition-colors">
                  Airport Terminal Map
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Guarantees */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Airport Transit Safety</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Masked passenger profiles</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Luggage trunk capacity check</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Verified student & flight IDs</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Prepaid flat split rates</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} AeroPool Technologies. Designed for seamless airport mobility.
          </div>
          <div className="flex items-center space-x-4">
            <span>Terminal 1, 2 & 3 Support</span>
            <span>•</span>
            <span>Zero Luggage Bottleneck Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
