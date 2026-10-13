import React from 'react';
import { LUGGAGE_TIERS } from '../data/mockData';
import { Briefcase, Luggage, Boxes, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

export const LuggageSelector = ({ value, onChange, compact = false }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'luggage':
        return <Luggage className="w-5 h-5" />;
      case 'boxes':
      default:
        return <Boxes className="w-5 h-5" />;
    }
  };

  const selectedTier = LUGGAGE_TIERS.find((t) => t.id === value) || LUGGAGE_TIERS[1];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-slate-800 flex items-center space-x-2">
          <span>Luggage Volume Matrix</span>
          <span className="text-xs font-normal text-slate-500">(Crucial for Airport Pools)</span>
        </label>
        {selectedTier.requiresSUV && (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse-subtle">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Triggers SUV Upgrade</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {LUGGAGE_TIERS.map((tier) => {
          const isSelected = value === tier.id;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => onChange(tier.id)}
              className={`relative text-left p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-sky-500 bg-sky-50/70 ring-2 ring-sky-500/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? tier.requiresSUV
                          ? 'bg-amber-500 text-white'
                          : 'bg-sky-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {getIcon(tier.icon)}
                  </div>
                  {isSelected && (
                    <span className="text-sky-600">
                      <CheckCircle className="w-5 h-5 fill-sky-100" />
                    </span>
                  )}
                </div>

                <div className="font-bold text-sm text-slate-900 leading-snug">{tier.title}</div>
                <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{tier.subtitle}</div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Trunk Units:</span>
                <span
                  className={`font-bold px-1.5 py-0.5 rounded ${
                    tier.requiresSUV
                      ? 'bg-amber-100 text-amber-700 font-extrabold'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tier.capacityUnits} {tier.capacityUnits > 1 ? 'Units' : 'Unit'}
                </span>
              </div>

              {tier.requiresSUV && (
                <div className="mt-2 text-[10px] text-amber-700 bg-amber-50 rounded-lg p-1.5 border border-amber-200/80 font-medium leading-tight">
                  ⚠️ Large check-in bags require 6-seater SUV boots to fit all matched passengers comfortably.
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Trunk boot capacity indicator helper */}
      <div className="bg-slate-100/80 border border-slate-200/80 rounded-xl p-3 flex items-start space-x-2.5 text-xs text-slate-600">
        <ShieldAlert className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>AeroPool Trunk Guarantee:</strong> Standard airport cabs fail when 3 passengers each bring large suitcases. Our algorithm monitors collective trunk volume in real-time, auto-dispatching high-capacity vehicles (Toyota Innova Crysta / Ertiga) whenever luggage units exceed 3.0!
        </p>
      </div>
    </div>
  );
};
