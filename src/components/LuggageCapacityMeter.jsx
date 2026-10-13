import React from 'react';
import { Briefcase, Luggage, Boxes, Truck, ShieldCheck, Car } from 'lucide-react';

export const LuggageCapacityMeter = ({ vehicleType, members = [] }) => {
  const isSUV = vehicleType === 'SUV';
  const maxUnits = isSUV ? 6.0 : 3.0;

  const currentUnits = members.reduce((sum, m) => {
    return sum + (m.units || (m.luggageTier === 'heavy_bags' ? 2.5 : m.luggageTier === 'medium_suitcase' ? 1.0 : 0.5));
  }, 0);

  const percentage = Math.min(100, Math.round((currentUnits / maxUnits) * 100));

  let statusColor = 'bg-emerald-500';
  let badgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let statusText = 'Optimal Trunk Space Available';

  if (percentage > 85) {
    statusColor = 'bg-amber-500';
    badgeColor = 'text-amber-700 bg-amber-50 border-amber-200';
    statusText = 'Trunk Boot Nearing Maximum';
  } else if (percentage > 60) {
    statusColor = 'bg-sky-500';
    badgeColor = 'text-sky-700 bg-sky-50 border-sky-200';
    statusText = 'Comfortable Vehicle Fit';
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 font-bold text-slate-800">
          {isSUV ? <Truck className="w-4 h-4 text-sky-600" /> : <Car className="w-4 h-4 text-sky-600" />}
          <span>{isSUV ? '6-Seater SUV Luggage Capacity' : 'Sedan Trunk Boot Capacity'}</span>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
          {currentUnits.toFixed(1)} / {maxUnits.toFixed(1)} Units ({percentage}%)
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
        <div
          className={`h-full ${statusColor} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Passenger luggage breakdown tags */}
      <div className="flex items-center flex-wrap gap-1.5 pt-1">
        {members.map((m, idx) => (
          <span
            key={m.id || idx}
            className="inline-flex items-center space-x-1 text-[11px] bg-white border border-slate-200/90 rounded-md px-2 py-0.5 text-slate-600"
          >
            {m.luggageTier === 'heavy_bags' ? (
              <Boxes className="w-3 h-3 text-amber-500" />
            ) : m.luggageTier === 'medium_suitcase' ? (
              <Luggage className="w-3 h-3 text-sky-500" />
            ) : (
              <Briefcase className="w-3 h-3 text-slate-400" />
            )}
            <span className="font-semibold text-slate-700">{m.name.split(' ')[0]}:</span>
            <span className="text-[10px] text-slate-500">
              {m.luggageTier === 'heavy_bags' ? 'Large Bags' : m.luggageTier === 'medium_suitcase' ? '1 Suitcase' : 'Cabin'}
            </span>
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
        <span>{statusText}</span>
        <span className="font-medium text-slate-600 flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Airport Gate Guarantee</span>
        </span>
      </div>
    </div>
  );
};
