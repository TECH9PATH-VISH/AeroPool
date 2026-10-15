import React, { useState } from 'react';
import { usePool } from '../context/PoolContext';
import { TerminalMapModal } from '../components/TerminalMapModal';
import { TERMINALS } from '../data/mockData';
import { MapPin, Navigation, Luggage, Phone, AlertCircle, ShieldCheck, Clock, ExternalLink } from 'lucide-react';

export const TerminalGuidePage = () => {
  const { activePool } = usePool();
  const currentTerminal = activePool?.terminal || 'T1';
  const currentPillar = activePool?.meetingPoint || 'Pillar 3';

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                Patna Airport (PAT) Terminal & Meeting Point Guide
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Official layout map for Jay Prakash Narayan Airport arrival gates, baggage reclaim belts, and cab pickup pillars
              </p>
            </div>
          </div>

          {activePool && (
            <div className="bg-sky-50 border border-sky-200/80 px-4 py-2.5 rounded-2xl text-xs flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-sky-600" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Your Current Meeting Point:</span>
                <span className="font-extrabold text-navy-900">{activePool.meetingPoint}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Terminal Map Interactive Visualization */}
      <TerminalMapModal activeTerminal={currentTerminal} activePillar={currentPillar} />

      {/* Airport Terminal Specific Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TERMINALS.map((t) => (
          <div
            key={t.id}
            className={`bg-white rounded-2xl border p-5 space-y-3 shadow-card ${
              currentTerminal === t.id
                ? 'border-sky-500 ring-2 ring-sky-400/20'
                : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-navy-900 text-sky-400">
                {t.id}
              </span>
              {currentTerminal === t.id && (
                <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                  Your Pool Terminal
                </span>
              )}
            </div>

            <h3 className="text-base font-bold text-navy-900">{t.name}</h3>
            <p className="text-xs text-slate-500">{t.gates}</p>
            {t.airlines && (
              <p className="text-[11px] text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100 font-medium">
                Airlines: {t.airlines}
              </p>
            )}

            <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
              <div className="text-slate-400 font-bold uppercase text-[10px]">Staging Point:</div>
              <div className="font-semibold text-slate-800 flex items-start space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                <span>{t.pickupPoint}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Security Assistance: 24/7 Available</span>
              <span className="font-semibold text-sky-600">Ext 4410</span>
            </div>
          </div>
        ))}
      </div>

      {/* Essential Tips For Smooth Pooling */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-700">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Airport Pooling Safety & Etiquette Rules</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-navy-800/80 p-4 rounded-xl border border-navy-700 space-y-1.5">
            <h4 className="font-bold text-sky-300">1. Update Chat Upon Landing</h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Use the quick status buttons in the Live Coordination tab as soon as your aircraft turns into the gate so co-flyers know your progress.
            </p>
          </div>

          <div className="bg-navy-800/80 p-4 rounded-xl border border-navy-700 space-y-1.5">
            <h4 className="font-bold text-sky-300">2. Respect Wait Buffer</h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              If an incoming flight encounters minor baggage carousel delays, the group buffer ensures no passenger gets left behind stranded.
            </p>
          </div>

          <div className="bg-navy-800/80 p-4 rounded-xl border border-navy-700 space-y-1.5">
            <h4 className="font-bold text-sky-300">3. Verify License Plate</h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Check that the vehicle registration matches the plate displayed on your Active Pool screen before stowing bags in the trunk.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
