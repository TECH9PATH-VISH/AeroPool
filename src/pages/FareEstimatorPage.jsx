import React, { useState } from 'react';
import { usePool } from '../context/PoolContext';
import { DESTINATION_ZONES, LUGGAGE_TIERS } from '../data/mockData';
import { formatCurrency, calculateSavings, calculateCO2Saved } from '../utils/helpers';
import { LuggageSelector } from '../components/LuggageSelector';
import {
  Calculator,
  Users,
  Car,
  Truck,
  Sparkles,
  Leaf,
  DollarSign,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const FareEstimatorPage = () => {
  const { currency, setSearchCriteria, setActiveTab } = usePool();

  const [selectedZoneId, setSelectedZoneId] = useState('tech_park');
  const [passengerCount, setPassengerCount] = useState(3);
  const [luggageTier, setLuggageTier] = useState('medium_suitcase');
  const [isLateNight, setIsLateNight] = useState(false);

  const zone = DESTINATION_ZONES.find((z) => z.id === selectedZoneId) || DESTINATION_ZONES[0];

  // Calculations
  const isSUV = luggageTier === 'heavy_bags' || passengerCount >= 4;
  let baseSoloFare = zone.typicalSoloFare;
  if (isLateNight) baseSoloFare = Math.round(baseSoloFare * 1.15);

  const totalVehicleFare = isSUV ? Math.round(baseSoloFare * 1.15) : baseSoloFare;
  const perPersonShared = Math.round(totalVehicleFare / passengerCount);
  const totalSavedPerPerson = Math.max(0, baseSoloFare - perPersonShared);
  const savingsPct = calculateSavings(baseSoloFare, perPersonShared);
  const co2Saved = calculateCO2Saved(zone.distanceKm, passengerCount);

  const handleLaunchPool = () => {
    setSearchCriteria((prev) => ({
      ...prev,
      destinationZone: selectedZoneId,
      luggageTier: luggageTier,
      passengerCount: 1
    }));
    setActiveTab('book');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Airport Cab Fare & Carbon Savings Calculator
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Interactive simulator to model split transit expenses and carbon offset across airport zones
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8 space-y-6">
          
          {/* Zone Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">
              1. Select Geographic Destination Zone:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DESTINATION_ZONES.map((z) => {
                const isSelected = selectedZoneId === z.id;
                return (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setSelectedZoneId(z.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/70 text-navy-900 ring-2 ring-sky-500/20'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold">{z.name.split('/')[0]}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      ~{z.distanceKm} km • Standard Solo: {formatCurrency(z.typicalSoloFare, currency)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Passenger Count Slider / Pill Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Number of Matched Passengers:
              </label>
              <span className="text-xs font-extrabold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                {passengerCount} {passengerCount === 1 ? 'Solo Rider' : 'Flyers Sharing Cab'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {[1, 2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setPassengerCount(count)}
                  className={`py-3 rounded-xl border text-center transition-all ${
                    passengerCount === count
                      ? 'border-sky-500 bg-sky-50 text-sky-700 font-extrabold ring-2 ring-sky-500/20 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50'
                  }`}
                >
                  <div className="text-sm">{count}</div>
                  <div className="text-[10px] text-slate-400">
                    {count === 1 ? 'Solo' : `${count}-Way Split`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Luggage Tier */}
          <div>
            <LuggageSelector value={luggageTier} onChange={setLuggageTier} />
          </div>

          {/* Night Time Toggle */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <div>
                <span className="font-bold text-slate-800 block">Late Night Flight Arrival (11 PM - 5 AM)</span>
                <span className="text-[11px] text-slate-500">Applies standard 15% late-night airport meter surcharge</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsLateNight(!isLateNight)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                isLateNight ? 'bg-sky-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  isLateNight ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

        {/* Right Output Summary Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-gradient-to-br from-navy-900 to-navy-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-700 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-navy-700">
              <span className="text-xs uppercase font-bold text-sky-400 tracking-wider">
                Simulated Output
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/30">
                SAVE {savingsPct}%
              </span>
            </div>

            {/* Price Comparison Block */}
            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-400 block">Regular Solo Airport Taxi:</span>
                <span className="text-xl font-bold text-slate-400 line-through">
                  {formatCurrency(baseSoloFare, currency)}
                </span>
              </div>

              <div className="bg-navy-800/80 border border-navy-700 p-4 rounded-2xl">
                <span className="text-xs text-sky-300 font-semibold block">Your Shared AeroPool Fare:</span>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                    {formatCurrency(perPersonShared, currency)}
                  </span>
                  <span className="text-xs text-slate-400">/ person</span>
                </div>
                <div className="text-xs text-emerald-300 font-medium mt-1">
                  You pocket {formatCurrency(totalSavedPerPerson, currency)} instantly!
                </div>
              </div>
            </div>

            {/* Vehicle Assigned */}
            <div className="bg-navy-800/50 border border-navy-700/60 p-3.5 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                {isSUV ? <Truck className="w-4 h-4 text-amber-400" /> : <Car className="w-4 h-4 text-sky-400" />}
                <span className="text-slate-300">Vehicle Assigned:</span>
              </div>
              <span className="font-bold text-white">
                {isSUV ? 'Toyota Innova Crysta (SUV)' : 'Toyota Camry / Sedan'}
              </span>
            </div>

            {/* Environmental CO2 Savings */}
            <div className="bg-emerald-950/40 border border-emerald-500/30 p-3.5 rounded-xl flex items-center space-x-3 text-xs">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-emerald-300 block">
                  {co2Saved} kg Carbon Offset
                </span>
                <span className="text-[11px] text-slate-300">
                  Reduced airport road congestion by combining {passengerCount} solo vehicles into 1 pool.
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={handleLaunchPool}
              className="w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-extrabold bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center space-x-2"
            >
              <span>Book Ride with These Parameters</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
