import React, { useState } from 'react';
import { TERMINALS } from '../data/mockData';
import { MapPin, Navigation, Car, Luggage, ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

export const TerminalMapModal = ({ activeTerminal = 'T3', activePillar = 'Pillar 14' }) => {
  const [selectedTerminal, setSelectedTerminal] = useState(activeTerminal);

  const pillars = [
    { num: 2, label: 'Prepaid Taxi', active: false },
    { num: 4, label: 'T1 App Cab Gate', active: activePillar.includes('Pillar 4') },
    { num: 7, label: 'Hotel Shuttles', active: false },
    { num: 9, label: 'T2 Commercial Bay', active: activePillar.includes('Pillar 9') },
    { num: 12, label: 'Lane 2 Pickups', active: activePillar.includes('Pillar 12') },
    { num: 14, label: 'AeroPool Express Hub (T3)', active: activePillar.includes('Pillar 14') },
    { num: 16, label: 'Forecourt Lane 3', active: activePillar.includes('Pillar 16') },
    { num: 18, label: 'Bus & Coach Bay', active: false },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <Navigation className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-navy-900">Interactive Airport Terminal & Meeting Point Guide</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visual pickup zones, meeting pillars, and baggage carousel walking paths
          </p>
        </div>

        {/* Terminal Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          {TERMINALS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTerminal(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedTerminal === t.id
                  ? 'bg-white text-navy-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.id} ({t.name.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Visual Terminal Layout Graphic */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-inner">
        
        {/* Background Runway Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Airport Zones Diagram */}
        <div className="relative z-10 space-y-6">
          
          {/* Flight Runway & Arrival Gates */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-slate-200">Terminal {selectedTerminal} Arrival Flight Gates (1 - 36)</span>
            </div>
            <span className="text-[11px] text-sky-400 font-mono">Flight Deboarding Zone</span>
          </div>

          {/* Walking Corridor / Down Arrow */}
          <div className="flex justify-center">
            <span className="text-[11px] text-slate-400 font-medium bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              ⬇ Escalators & Immigration Corridor ⬇
            </span>
          </div>

          {/* Baggage Claim Carousels */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-bold text-slate-300 flex items-center space-x-1.5">
                <Luggage className="w-4 h-4 text-sky-400" />
                <span>Baggage Claim Hall (Carousels 1 - 8)</span>
              </span>
              <span className="text-[10px] text-slate-400">Average wait: 12-18 mins</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center text-[10px] font-mono">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div
                  key={num}
                  className={`p-1.5 rounded-lg border ${
                    num === 4 || num === 5
                      ? 'border-sky-500/60 bg-sky-500/20 text-sky-300 font-bold'
                      : 'border-slate-700 bg-slate-800/40 text-slate-400'
                  }`}
                >
                  Belt {num}
                </div>
              ))}
            </div>
          </div>

          {/* Exit Gate Doors */}
          <div className="flex items-center justify-around py-1 text-xs">
            <div className="bg-navy-800 border border-slate-700 px-4 py-1.5 rounded-lg text-slate-300 text-[11px] font-bold">
              🚪 Customs Exit Gate A
            </div>
            <div className="bg-navy-800 border border-slate-700 px-4 py-1.5 rounded-lg text-slate-300 text-[11px] font-bold">
              🚪 Customs Exit Gate B
            </div>
          </div>

          {/* Designated Meeting Pillars Row */}
          <div>
            <div className="text-xs font-bold text-sky-300 mb-2 flex items-center justify-between">
              <span>Airport Curbside Pillars & Meeting Forecourt:</span>
              <span className="text-[10px] text-emerald-400 font-normal">● Highlighted = AeroPool Staging Zone</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {pillars.map((pillar) => (
                <div
                  key={pillar.num}
                  className={`p-3 rounded-xl border transition-all text-left relative ${
                    pillar.active
                      ? 'bg-gradient-to-br from-sky-500/30 to-blue-600/30 border-sky-400 ring-2 ring-sky-400/40 shadow-glow'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                        pillar.active
                          ? 'bg-sky-400 text-slate-900 font-mono'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      Pillar #{pillar.num}
                    </span>
                    {pillar.active && <CheckCircle2 className="w-4 h-4 text-sky-300" />}
                  </div>

                  <p className="text-[11px] font-bold text-slate-200 mt-2">{pillar.label}</p>
                  {pillar.active && (
                    <span className="text-[10px] text-emerald-300 font-semibold block mt-0.5">
                      Your Pool Driver Stationed Here
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cab Pickup Lane */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Car className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-slate-200">Express Cab Bays 1 - 6 (Dedicated Pickup Lanes)</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">Vehicle Entry & Staging Authorized</span>
          </div>

        </div>
      </div>

      {/* Helpful Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
          <div className="font-bold text-slate-800 flex items-center space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[11px]">1</span>
            <span>Collect Checked Bags</span>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Follow the arrivals signage towards carousels. Notify your group on live chat when bags appear.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
          <div className="font-bold text-slate-800 flex items-center space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[11px]">2</span>
            <span>Head to Exit Pillars</span>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Exit through the automatic glass doors into the open arrivals forecourt. Look up for pillar numbers.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
          <div className="font-bold text-slate-800 flex items-center space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[11px]">3</span>
            <span>Board Shared Vehicle</span>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Verify driver license plate on the dashboard. Load luggage into the trunk and depart smoothly!
          </p>
        </div>
      </div>
    </div>
  );
};
