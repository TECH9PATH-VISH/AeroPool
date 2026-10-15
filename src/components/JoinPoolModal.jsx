import React, { useState } from 'react';
import { usePool } from '../context/PoolContext';
import { formatCurrency } from '../utils/helpers';
import { LuggageSelector } from './LuggageSelector';
import { X, Users, Plane, MapPin, Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const JoinPoolModal = ({ pool, isOpen, onClose }) => {
  const { joinPool, searchCriteria, currency } = usePool();
  const [selectedLuggage, setSelectedLuggage] = useState(searchCriteria.luggageTier || 'medium_suitcase');
  const [flightNumber, setFlightNumber] = useState(searchCriteria.flightNumber || '6E-2132');

  if (!isOpen || !pool) return null;

  const currentCount = pool.currentMembers.length;
  const newCount = currentCount + 1;
  const simulatedNewFare = Math.round(pool.totalBaseFare / newCount);

  const handleConfirm = () => {
    joinPool(pool.id, {
      luggageTier: selectedLuggage,
      flightNumber
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-navy-900 to-navy-800 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-sky-400 block">
              Confirm Airport Pool Match
            </span>
            <h3 className="text-lg font-bold">{pool.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-navy-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Destination & Terminal summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Arrival Terminal:</span>
              <span className="font-bold text-navy-900 bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md">
                {pool.terminal}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Destination:</span>
              <span className="font-bold text-slate-800 text-right truncate max-w-[240px]">
                {pool.destinationAddress}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Designated Meeting Pillar:</span>
              <span className="font-bold text-sky-700">{pool.meetingPoint}</span>
            </div>
          </div>

          {/* Fare instant reduction visual */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Your Split Price with {newCount} Passengers:</span>
              </span>
              <div className="text-[11px] text-emerald-600 mt-0.5">
                Solo Taxi: <span className="line-through">{formatCurrency(pool.soloTaxiFare, currency)}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-emerald-700">
                {formatCurrency(simulatedNewFare, currency)}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 block">/ person</span>
            </div>
          </div>

          {/* Confirm Your Luggage */}
          <LuggageSelector value={selectedLuggage} onChange={setSelectedLuggage} />

          {/* Confirm Your Flight number */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Your Flight Number:
            </label>
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-900 uppercase"
            />
          </div>

          <div className="text-[11px] text-slate-500 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>
              By joining, you agree to meet co-flyers at the designated pillar within the 30-min buffer window.
            </span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/25 flex items-center space-x-1.5"
          >
            <span>Confirm & Join Pool</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
