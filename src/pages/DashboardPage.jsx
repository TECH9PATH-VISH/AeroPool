import React, { useState, useEffect } from 'react';
import { usePool } from '../context/PoolContext';
import { DESTINATION_ZONES } from '../data/mockData';
import { formatCurrency, getCountdownTime } from '../utils/helpers';
import { LiveChatFeed } from '../components/LiveChatFeed';
import { FareSplitCard } from '../components/FareSplitCard';
import { LuggageCapacityMeter } from '../components/LuggageCapacityMeter';
import { TerminalMapModal } from '../components/TerminalMapModal';
import {
  Clock,
  MapPin,
  Car,
  Truck,
  Users,
  ShieldCheck,
  Lock,
  Unlock,
  AlertCircle,
  PhoneCall,
  Navigation,
  LogOut,
  Sparkles,
  Plane,
  Luggage,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const DashboardPage = () => {
  const { activePool, myActivePoolId, togglePoolLock, leavePool, setActiveTab, currency, userProfile } = usePool();

  const [countdown, setCountdown] = useState(() =>
    activePool ? getCountdownTime(activePool.landingTimestamp) : { isPast: false, text: '25m 00s' }
  );

  // Live timer tick
  useEffect(() => {
    if (!activePool) return;
    const interval = setInterval(() => {
      setCountdown(getCountdownTime(activePool.landingTimestamp));
    }, 1000);
    return () => clearInterval(interval);
  }, [activePool?.landingTimestamp]);

  if (!activePool) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-12 text-center space-y-4 my-10 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
          <Car className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-navy-900">No Active Pool Joined Yet</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          You haven't matched with an airport pool yet. Browse available incoming flights or initiate your own ride!
        </p>
        <div className="pt-2 flex justify-center space-x-3">
          <button
            onClick={() => setActiveTab('book')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-500 text-white shadow-md shadow-sky-500/20"
          >
            Find a Ride / Search Pools
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200"
          >
            View Active Pools
          </button>
        </div>
      </div>
    );
  }

  const isLocked = activePool.status === 'locked';
  const zone = DESTINATION_ZONES.find((z) => z.id === activePool.destinationZone);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner: Active Pool Booking Confirmation */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-sky-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-700 relative overflow-hidden">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Left Column: Pool Identity & Destination */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Active Booking Confirmed</span>
              </span>
              <span className="text-xs text-sky-300 font-mono bg-navy-800 px-2.5 py-1 rounded-full border border-navy-700">
                Ref: {activePool.id.toUpperCase()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {activePool.name}
            </h1>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-300">
              <span className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>{activePool.destinationAddress}</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center space-x-1">
                <Plane className="w-4 h-4 text-sky-400 transform -rotate-45" />
                <span>Terminal {activePool.terminal} Arrivals</span>
              </span>
            </div>
          </div>

          {/* Right Column: Live Countdown to Meet-up */}
          <div className="bg-navy-800/90 backdrop-blur-md border border-navy-700 p-4 sm:p-5 rounded-2xl flex items-center space-x-4 self-start lg:self-center shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Landing / Meet-up Window:
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                {countdown.text}
              </div>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Arrivals Gate Window: {activePool.flightArrivalWindow}
              </span>
            </div>
          </div>

        </div>

        {/* Status Lock Bar */}
        <div className="mt-6 pt-5 border-t border-navy-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Dispatch Status:</span>
            <span
              className={`font-bold px-2.5 py-0.5 rounded-full ${
                isLocked
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
              }`}
            >
              {isLocked ? '🔒 Locked (Depart Immediately)' : '🟢 Open for Co-Flyers to Split Fare'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => togglePoolLock(activePool.id)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-navy-700 hover:bg-navy-600 text-white transition-colors border border-navy-600 flex items-center space-x-1.5"
            >
              {isLocked ? <Unlock className="w-3.5 h-3.5 text-sky-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isLocked ? 'Unlock for More Co-Flyers' : 'Lock & Book Now'}</span>
            </button>

            <button
              onClick={() => leavePool(activePool.id)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-300 hover:bg-rose-950/40 transition-colors border border-rose-800/60 flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Leave Pool</span>
            </button>
          </div>
        </div>

      </div>

      {/* Main Grid: Left Details & Right Live Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Vehicle Details, Co-passengers, Meeting Point, Fare Split (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Designated Meeting Point Alert Box */}
          <div className="bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-white border-2 border-sky-400/60 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black tracking-wider text-sky-700 block">
                    Designated Airport Meeting Point
                  </span>
                  <h3 className="text-base font-extrabold text-navy-900">
                    {activePool.meetingPoint}
                  </h3>
                </div>
              </div>

              <span className="text-[11px] font-bold text-sky-800 bg-sky-100 px-2.5 py-1 rounded-full border border-sky-200">
                Terminal {activePool.terminal}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Once you clear customs with your luggage, head towards the glass automatic exit doors and locate <strong>{activePool.meetingPoint.split(',')[0]}</strong> on the curbside forecourt.
            </p>
          </div>

          {/* Assigned Vehicle & Driver Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                {activePool.vehicleType === 'SUV' ? (
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                    <Truck className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                    <Car className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-navy-900">{activePool.vehicleModel}</h4>
                  <p className="text-xs text-slate-500">
                    Plate: <strong className="font-mono text-slate-800">{activePool.vehiclePlate}</strong>
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                ★ {activePool.driverRating} Fleet Rating
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Chauffeur</span>
                <span className="font-semibold text-slate-800">{activePool.driverName}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Vehicle Classification</span>
                <span className="font-bold text-navy-900">
                  {activePool.vehicleType === 'SUV' ? 'High-Capacity 6-Seater SUV' : 'Standard 4-Seater Sedan'}
                </span>
              </div>
            </div>

            {/* Trunk Meter */}
            <LuggageCapacityMeter
              vehicleType={activePool.vehicleType}
              members={activePool.currentMembers}
            />
          </div>

          {/* Matched Co-Passengers Profile Cards */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-sky-600" />
                <h4 className="text-sm font-bold text-navy-900">
                  Matched Co-Passengers ({activePool.currentMembers.length} / {activePool.maxCapacity})
                </h4>
              </div>
              <span className="text-xs text-slate-400">Masked for Privacy</span>
            </div>

            <div className="space-y-3">
              {activePool.currentMembers.map((member) => {
                const isMe = member.id === userProfile.id;
                return (
                  <div
                    key={member.id}
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isMe
                        ? 'border-sky-300 bg-sky-50/50'
                        : 'border-slate-200 bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-sky-400"
                      />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-navy-900">
                            {member.maskedName || member.name}
                          </span>
                          <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                        </div>
                        <span className="text-[11px] text-emerald-700 font-medium block">
                          {member.badge}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-right">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Flight</span>
                        <span className="font-mono font-bold text-slate-800">{member.flightNumber}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Baggage</span>
                        <span className="font-semibold text-slate-700">
                          {member.luggageTier === 'heavy_bags'
                            ? '2+ Large Bags'
                            : member.luggageTier === 'medium_suitcase'
                            ? '1 Suitcase'
                            : 'Cabin only'}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          member.paymentStatus === 'paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {member.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transparent Fare Splitting Component */}
          <FareSplitCard pool={activePool} />

        </div>

        {/* RIGHT COLUMN: Real-Time Chat & Coordination (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <LiveChatFeed pool={activePool} />

          {/* Quick Terminal Guide helper */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-card space-y-3">
            <div className="flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-sky-400" />
              <h4 className="text-xs font-bold tracking-wide uppercase text-sky-300">
                Pillar Location Reminder
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your pickup is registered at <strong>{activePool.meetingPoint}</strong>. Need help locating the baggage belts or exits?
            </p>
            <button
              onClick={() => setActiveTab('terminal-map')}
              className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-navy-800 hover:bg-navy-700 border border-slate-700 text-white transition-colors"
            >
              Open Full Interactive Airport Terminal Map
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
