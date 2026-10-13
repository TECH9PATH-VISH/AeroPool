import React, { useState } from 'react';
import { usePool } from '../context/PoolContext';
import { DESTINATION_ZONES, TERMINALS } from '../data/mockData';
import { FlightLookupBadge } from './FlightLookupBadge';
import { LuggageSelector } from './LuggageSelector';
import { X, PlusCircle, Car, Truck, Clock, MapPin, Sparkles } from 'lucide-react';

export const CreatePoolModal = ({ isOpen, onClose }) => {
  const { createPool, searchCriteria } = usePool();

  const [formData, setFormData] = useState({
    poolName: '',
    flightNumber: searchCriteria.flightNumber || 'AI-402',
    terminal: searchCriteria.terminal || 'T3',
    destinationZone: searchCriteria.destinationZone || 'downtown',
    destinationAddress: searchCriteria.destinationAddress || 'Downtown Central Plaza',
    luggageTier: searchCriteria.luggageTier || 'medium_suitcase',
    maxWaitBuffer: '30'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    createPool(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-navy-900 via-navy-800 to-sky-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Initiate New Airport Pool</h3>
              <p className="text-xs text-slate-300">Start a group for incoming co-passengers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-navy-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Flight Number */}
          <FlightLookupBadge
            value={formData.flightNumber}
            onChange={(val) => setFormData({ ...formData, flightNumber: val })}
            onSelectFlight={(f) => setFormData({ ...formData, flightNumber: f.flightNumber, terminal: f.terminal })}
          />

          {/* Terminal & Wait Buffer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Arrival Terminal:</label>
              <select
                value={formData.terminal}
                onChange={(e) => setFormData({ ...formData, terminal: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-sky-500"
              >
                {TERMINALS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Max Wait Time Buffer:</label>
              <select
                value={formData.maxWaitBuffer}
                onChange={(e) => setFormData({ ...formData, maxWaitBuffer: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-sky-500"
              >
                <option value="15">15 Minutes (Express Depart)</option>
                <option value="30">30 Minutes (Recommended)</option>
                <option value="45">45 Minutes (Maximum Discount)</option>
              </select>
            </div>
          </div>

          {/* Destination Zone & Specific Address */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Destination Zone:</label>
            <select
              value={formData.destinationZone}
              onChange={(e) => {
                const zone = DESTINATION_ZONES.find((z) => z.id === e.target.value);
                setFormData({
                  ...formData,
                  destinationZone: e.target.value,
                  destinationAddress: zone?.popularLandmarks[0] || formData.destinationAddress
                });
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-sky-500"
            >
              {DESTINATION_ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name} (~{z.distanceKm} km)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Specific Drop-off Address:</label>
            <input
              type="text"
              value={formData.destinationAddress}
              onChange={(e) => setFormData({ ...formData, destinationAddress: e.target.value })}
              placeholder="e.g. Grand Central Hotel, Downtown or Tech Boulevard"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Luggage Tier */}
          <LuggageSelector
            value={formData.luggageTier}
            onChange={(val) => setFormData({ ...formData, luggageTier: val })}
          />

          {/* Pool Name (Optional) */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Custom Pool Label (Optional):</label>
            <input
              type="text"
              value={formData.poolName}
              onChange={(e) => setFormData({ ...formData, poolName: e.target.value })}
              placeholder="e.g. Cyber City Tech Flight Pool"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/25"
            >
              Launch Pool & Start Matching
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
