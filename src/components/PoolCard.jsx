import React from 'react';
import { usePool } from '../context/PoolContext';
import { DESTINATION_ZONES } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';
import { LuggageCapacityMeter } from './LuggageCapacityMeter';
import { Users, Car, Truck, Plane, MapPin, Clock, ArrowRight, CheckCircle2, Lock, Unlock, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

export const PoolCard = ({ pool, onJoinClick, isUserMember = false }) => {
  const { currency, togglePoolLock, myActivePoolId, setActiveTab } = usePool();
  const zone = DESTINATION_ZONES.find((z) => z.id === pool.destinationZone);

  const isLocked = pool.status === 'locked';
  const isFull = pool.currentMembers.length >= pool.maxCapacity;

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 shadow-card hover:shadow-card-hover overflow-hidden flex flex-col justify-between ${
        isUserMember
          ? 'border-sky-500 ring-2 ring-sky-400/20 bg-gradient-to-b from-sky-50/30 to-white'
          : 'border-slate-200/90 hover:border-slate-300'
      }`}
    >
      {/* Top Banner / Zone Title & Status Badge */}
      <div className="p-5 pb-4 border-b border-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full bg-navy-900 text-sky-400">
                {pool.terminal} Arrivals
              </span>
              {pool.vehicleType === 'SUV' ? (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center space-x-1">
                  <Truck className="w-3 h-3 text-amber-600" />
                  <span>SUV Upgraded</span>
                </span>
              ) : (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 flex items-center space-x-1">
                  <Car className="w-3 h-3 text-slate-500" />
                  <span>Sedan</span>
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-navy-900 mt-2 flex items-center space-x-1.5">
              <span>{pool.name}</span>
              {isUserMember && (
                <span className="text-xs font-bold text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full">
                  Your Pool
                </span>
              )}
            </h3>
            
            <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{pool.destinationAddress}</span>
            </p>
          </div>

          {/* Savings Badge */}
          <div className="text-right flex-shrink-0">
            <div className="bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded-xl shadow-xs flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SAVE {pool.savingsPercent}%</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
              vs Solo Airport Taxi
            </span>
          </div>
        </div>

        {/* Flight arrival timelines */}
        <div className="mt-3.5 bg-slate-50 rounded-xl p-2.5 border border-slate-200/70 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Plane className="w-4 h-4 text-sky-600 flex-shrink-0 transform -rotate-45" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Landing Window</span>
              <span className="font-bold text-slate-800">{pool.flightArrivalWindow}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Meeting Point</span>
            <span className="font-semibold text-slate-700 text-[11px] truncate max-w-[140px] block">
              {pool.meetingPoint.split(',')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Middle Content: Co-passengers & Luggage Meter */}
      <div className="p-5 space-y-4">
        
        {/* Passenger slots */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-700 flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-sky-600" />
              <span>Passengers Matched</span>
            </span>
            <span className="font-bold text-navy-900">
              {pool.currentMembers.length} / {pool.maxCapacity} seats filled
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: pool.maxCapacity }).map((_, idx) => {
              const member = pool.currentMembers[idx];
              if (member) {
                return (
                  <div
                    key={member.id || idx}
                    className="flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-200 text-center relative group"
                    title={`${member.name} (${member.flightNumber}) - ${member.badge}`}
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-9 h-9 rounded-full object-cover border-2 border-sky-400 shadow-xs"
                    />
                    <span className="text-[10px] font-bold text-slate-800 mt-1 truncate w-full">
                      {member.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] font-mono text-sky-600 font-bold">
                      {member.flightNumber}
                    </span>
                  </div>
                );
              }
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 text-slate-400"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-medium mt-1">Open Seat</span>
                  <span className="text-[9px] text-slate-400">Available</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Luggage Capacity Meter */}
        <LuggageCapacityMeter vehicleType={pool.vehicleType} members={pool.currentMembers} />

        {/* Pricing comparison card */}
        <div className="bg-gradient-to-r from-sky-50 to-indigo-50/50 border border-sky-100 rounded-xl p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Solo Taxi Fare</span>
            <span className="text-xs line-through text-slate-400 font-semibold">
              {formatCurrency(pool.soloTaxiFare, currency)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-sky-700 block">Your Split Share</span>
            <div className="flex items-baseline space-x-1 justify-end">
              <span className="text-lg font-extrabold text-navy-900">
                {formatCurrency(pool.currentPerPersonFare, currency)}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">/ person</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Action Footer */}
      <div className="p-5 pt-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
        {isUserMember ? (
          <>
            <button
              onClick={() => togglePoolLock(pool.id)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 border ${
                isLocked
                  ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              {isLocked ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pool Locked (Departing)</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Waiting for More</span>
                </>
              )}
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-navy-900 hover:bg-navy-800 text-white transition-all flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <span>Coordination Hub</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </>
        ) : (
          <>
            <div className="text-xs text-slate-500">
              {isFull ? (
                <span className="font-bold text-amber-700">Vehicle Full</span>
              ) : (
                <span>
                  <strong className="text-slate-800">{pool.maxCapacity - pool.currentMembers.length} seats</strong> remaining
                </span>
              )}
            </div>

            <button
              disabled={isFull}
              onClick={() => onJoinClick(pool)}
              className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                isFull
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/25 active:scale-95'
              }`}
            >
              <span>Join Group</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
