import React, { useState } from 'react';
import { usePool } from '../context/PoolContext';
import { DESTINATION_ZONES, TERMINALS } from '../data/mockData';
import { formatCurrency, calculateSavings } from '../utils/helpers';
import { FlightLookupBadge } from '../components/FlightLookupBadge';
import { LuggageSelector } from '../components/LuggageSelector';
import { PoolCard } from '../components/PoolCard';
import { JoinPoolModal } from '../components/JoinPoolModal';
import { CreatePoolModal } from '../components/CreatePoolModal';
import {
  Plane,
  Car,
  Users,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  PlusCircle,
  HelpCircle,
  Leaf,
  DollarSign
} from 'lucide-react';

export const BookRidePage = () => {
  const { searchCriteria, setSearchCriteria, setActiveTab, pools, myActivePoolId, currency } = usePool();

  const [flightNumber, setFlightNumber] = useState(searchCriteria.flightNumber || '6E-2132');
  const [arrivalDate, setArrivalDate] = useState(searchCriteria.arrivalDate || new Date().toISOString().split('T')[0]);
  const [arrivalTime, setArrivalTime] = useState(searchCriteria.arrivalTime || '19:15');
  const [terminal, setTerminal] = useState(searchCriteria.terminal || 'T3');
  const [destinationZone, setDestinationZone] = useState(searchCriteria.destinationZone || 'gurugram_cybercity');
  const [destinationAddress, setDestinationAddress] = useState(
    searchCriteria.destinationAddress || 'DLF CyberHub (Building 10 / Tower B), DLF Phase 2'
  );
  const [luggageTier, setLuggageTier] = useState(searchCriteria.luggageTier || 'medium_suitcase');
  const [passengerCount, setPassengerCount] = useState(searchCriteria.passengerCount || 1);
  const [maxWaitBuffer, setMaxWaitBuffer] = useState(searchCriteria.maxWaitBuffer || 30);

  const [selectedPoolForJoin, setSelectedPoolForJoin] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState(false);

  // Selected Zone info
  const selectedZone = DESTINATION_ZONES.find((z) => z.id === destinationZone) || DESTINATION_ZONES[0];
  const soloFare = selectedZone.typicalSoloFare;
  const estimatedSharedFare = Math.round(soloFare / 3);
  const estimatedSavings = calculateSavings(soloFare, estimatedSharedFare);

  const handleFlightSelect = (flight) => {
    setFlightNumber(flight.flightNumber);
    setTerminal(flight.terminal);
    setArrivalTime(flight.scheduledArrival);
  };

  const handleZoneChange = (zoneId) => {
    setDestinationZone(zoneId);
    const z = DESTINATION_ZONES.find((item) => item.id === zoneId);
    if (z && z.popularLandmarks[0]) {
      setDestinationAddress(z.popularLandmarks[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCriteria({
      flightNumber,
      arrivalDate,
      arrivalTime,
      terminal,
      destinationZone,
      destinationAddress,
      luggageTier,
      passengerCount,
      maxWaitBuffer
    });
    setActiveTab('matches');
  };

  // Filter matching pools for the landing preview
  const relevantPools = pools.filter((p) => p.destinationZone === destinationZone || p.terminal === terminal).slice(0, 2);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Travel-Tech Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-sky-950 text-white shadow-2xl p-6 sm:p-10 lg:p-12 border border-navy-700">
        
        {/* Ambient Glow & Decorative Air Route */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Airport Cab Pooling Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none">
            Split Airport Rides with Co-Flyers.
            <span className="block mt-2 bg-gradient-to-r from-sky-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Save up to 75% on Transit.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            AeroPool automatically clusters incoming passengers landing within ±30 minutes heading in the same geographic zone. Luggage volume matrix prevents trunk overflow, auto-upgrading to SUVs when needed!
          </p>

          {/* Quick Stats Metrics */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-navy-800/80 backdrop-blur-sm border border-navy-700/80 p-3 sm:p-4 rounded-2xl">
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold block">Avg Passenger Savings</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">65% – 75%</span>
            </div>
            <div className="bg-navy-800/80 backdrop-blur-sm border border-navy-700/80 p-3 sm:p-4 rounded-2xl">
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold block">Trunk Boot Capacity</span>
              <span className="text-xl sm:text-2xl font-black text-sky-400">Guaranteed</span>
            </div>
            <div className="bg-navy-800/80 backdrop-blur-sm border border-navy-700/80 p-3 sm:p-4 rounded-2xl">
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold block">Verified Co-Travelers</span>
              <span className="text-xl sm:text-2xl font-black text-white">100% ID Safe</span>
            </div>
            <div className="bg-navy-800/80 backdrop-blur-sm border border-navy-700/80 p-3 sm:p-4 rounded-2xl">
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold block">Carbon Reduction</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">-60% CO₂</span>
            </div>
          </div>
        </div>

      </section>

      {/* Main Booking & Request Flow Card */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8 lg:p-10 -mt-6 sm:-mt-8 relative z-20">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 flex items-center space-x-2">
              <span>Find Matching Airport Pools</span>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                Step 1 of 2
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Enter your arrival flight details and destination to discover instant shared cabs
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200"
          >
            <PlusCircle className="w-4 h-4 text-sky-600" />
            <span>Create Custom Pool Instead</span>
          </button>
        </div>

        {/* The Booking Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          
          {/* SECTION A: Flight & Arrival Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <Plane className="w-4 h-4 text-sky-500 transform -rotate-45" />
              <span>A. Flight & Arrival Timeline</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Flight Number Lookup */}
              <div className="md:col-span-1">
                <FlightLookupBadge
                  value={flightNumber}
                  onChange={setFlightNumber}
                  onSelectFlight={handleFlightSelect}
                />
              </div>

              {/* Arrival Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-bold text-slate-800 block mb-1">Arrival Date:</label>
                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-3 text-xs sm:text-sm font-semibold text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-800 block mb-1">Landing Time:</label>
                  <input
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-3 text-xs sm:text-sm font-semibold text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500 font-mono"
                  />
                </div>
              </div>

              {/* Airport Terminal Selector */}
              <div>
                <label className="text-sm font-bold text-slate-800 block mb-1">Airport Terminal:</label>
                <select
                  value={terminal}
                  onChange={(e) => setTerminal(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-3 text-xs sm:text-sm font-semibold text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500"
                >
                  {TERMINALS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.id})
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Pickup: {TERMINALS.find((t) => t.id === terminal)?.pickupPoint}
                </span>
              </div>

            </div>
          </div>

          {/* SECTION B: Destination & Drop-off Zone */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-sky-500" />
              <span>B. Destination & Drop-off Zone</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Destination Area Selector */}
              <div>
                <label className="text-sm font-bold text-slate-800 block mb-1">Geographic Drop-off Zone:</label>
                <select
                  value={destinationZone}
                  onChange={(e) => handleZoneChange(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-bold text-navy-900 shadow-sm focus:ring-2 focus:ring-sky-500"
                >
                  {DESTINATION_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} (~{zone.distanceKm} km)
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">{selectedZone.description}</p>
              </div>

              {/* Specific Address with auto-suggestions */}
              <div className="relative">
                <label className="text-sm font-bold text-slate-800 block mb-1">
                  Specific Drop-off Address / Landmark:
                </label>
                <input
                  type="text"
                  value={destinationAddress}
                  onChange={(e) => setDestinationAddress(e.target.value)}
                  onFocus={() => setAddressSuggestions(true)}
                  placeholder="e.g. DLF CyberHub Tower B, One Horizon Center, or Select CITYWALK"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500"
                />
                
                {/* Popular landmarks auto-suggestions */}
                {addressSuggestions && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-20 p-2 divide-y divide-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 flex items-center justify-between">
                      <span>Popular Drop-offs in {selectedZone.name.split('/')[0]}</span>
                      <button
                        type="button"
                        onClick={() => setAddressSuggestions(false)}
                        className="text-slate-500 hover:text-slate-800"
                      >
                        ✕
                      </button>
                    </div>
                    {selectedZone.popularLandmarks.map((landmark, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setDestinationAddress(landmark);
                          setAddressSuggestions(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-sky-50 hover:text-sky-800 rounded-lg transition-colors font-medium flex items-center space-x-2"
                      >
                        <MapPin className="w-3.5 h-3.5 text-sky-500" />
                        <span>{landmark}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* SECTION C: Luggage Volume Matrix */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <LuggageSelector value={luggageTier} onChange={setLuggageTier} />
          </div>

          {/* SECTION D: Seat & Budget Preference */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <Users className="w-4 h-4 text-sky-500" />
              <span>D. Seat & Buffer Preferences</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Number of Travelers */}
              <div>
                <label className="text-sm font-bold text-slate-800 block mb-1">
                  Traveling With (Seats Needed):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setPassengerCount(count)}
                      className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        passengerCount === count
                          ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-500/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {count} {count === 1 ? 'Solo' : 'Seats'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Acceptable wait time buffer */}
              <div>
                <label className="text-sm font-bold text-slate-800 block mb-1">
                  Acceptable Wait Window Buffer:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 15, label: '15 Mins', hint: 'Fastest' },
                    { val: 30, label: '30 Mins', hint: 'Balanced' },
                    { val: 45, label: '45 Mins', hint: 'Max Split' }
                  ].map((buf) => (
                    <button
                      key={buf.val}
                      type="button"
                      onClick={() => setMaxWaitBuffer(buf.val)}
                      className={`py-2 px-1 rounded-xl border text-center transition-all ${
                        maxWaitBuffer === buf.val
                          ? 'border-sky-500 bg-sky-50 text-sky-800 ring-2 ring-sky-500/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{buf.label}</div>
                      <div className="text-[10px] text-slate-400">{buf.hint}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Instant Fare Quote & Savings Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/90 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <div className="flex items-center space-x-2 text-emerald-800">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-extrabold">Instant Projected Savings Preview</h4>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Zone: <strong>{selectedZone.name}</strong> (~{selectedZone.distanceKm} km)
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs">
                <span className="text-slate-500">
                  Solo Airport Meter: <span className="line-through">{formatCurrency(soloFare, currency)}</span>
                </span>
                <span className="font-bold text-emerald-700">
                  Shared Pool Rate: ~{formatCurrency(estimatedSharedFare, currency)} / person
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 sm:border-l sm:border-emerald-200/80 sm:pl-6">
              <div className="text-center">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600">
                  Save ~{estimatedSavings}%
                </span>
                <span className="text-[11px] font-bold text-slate-500 block">
                  Keep {formatCurrency(soloFare - estimatedSharedFare, currency)} in pocket
                </span>
              </div>
            </div>
          </div>

          {/* Main Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl text-sm sm:text-base font-extrabold bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-xl shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
            >
              <span>Find Airport Cab Matches</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-slate-400 mt-2">
              Matches incoming flights landing within $\pm$30 minutes with identical zone destination
            </p>
          </div>

        </form>

      </section>

      {/* Featured Active Pools Preview Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-navy-900 flex items-center space-x-2">
              <Users className="w-5 h-5 text-sky-600" />
              <span>Live Active Pools Matching Incoming Flights</span>
            </h3>
            <p className="text-xs text-slate-500">
              Real-time clusters forming right now at the airport arrivals gates
            </p>
          </div>

          <button
            onClick={() => setActiveTab('matches')}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center space-x-1"
          >
            <span>View All ({pools.length}) Pools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {relevantPools.map((pool) => (
            <PoolCard
              key={pool.id}
              pool={pool}
              onJoinClick={setSelectedPoolForJoin}
              isUserMember={myActivePoolId === pool.id}
            />
          ))}
        </div>
      </section>

      {/* Modals */}
      <JoinPoolModal
        isOpen={!!selectedPoolForJoin}
        pool={selectedPoolForJoin}
        onClose={() => setSelectedPoolForJoin(null)}
      />

      <CreatePoolModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

    </div>
  );
};
