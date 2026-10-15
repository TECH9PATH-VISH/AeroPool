import React, { useState, useMemo } from 'react';
import { usePool } from '../context/PoolContext';
import { DESTINATION_ZONES, TERMINALS } from '../data/mockData';
import { PoolCard } from '../components/PoolCard';
import { JoinPoolModal } from '../components/JoinPoolModal';
import { CreatePoolModal } from '../components/CreatePoolModal';
import {
  Users,
  Filter,
  PlusCircle,
  Plane,
  Sparkles,
  Car,
  Truck,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  Search
} from 'lucide-react';

export const MatchesPage = () => {
  const { pools, myActivePoolId, searchCriteria, setActiveTab } = usePool();

  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedTerminal, setSelectedTerminal] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState('all');
  const [sortBy, setSortBy] = useState('savings'); // savings, arrival, seats
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedPoolForJoin, setSelectedPoolForJoin] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Dynamic grouping and filtering logic
  const filteredPools = useMemo(() => {
    return pools.filter((pool) => {
      // Zone filter
      if (selectedZone !== 'all' && pool.destinationZone !== selectedZone) return false;
      // Terminal filter
      if (selectedTerminal !== 'all' && pool.terminal !== selectedTerminal) return false;
      // Vehicle type filter
      if (selectedVehicle !== 'all' && pool.vehicleType !== selectedVehicle) return false;
      // Search query (pool name, destination, driver, flight numbers)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = pool.name.toLowerCase().includes(query);
        const matchesAddress = pool.destinationAddress.toLowerCase().includes(query);
        const matchesFlights = pool.currentMembers.some((m) => m.flightNumber.toLowerCase().includes(query));
        if (!matchesName && !matchesAddress && !matchesFlights) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'savings') return b.savingsPercent - a.savingsPercent;
      if (sortBy === 'seats') return (b.maxCapacity - b.currentMembers.length) - (a.maxCapacity - a.currentMembers.length);
      // default: earliest arrival window
      return new Date(a.landingTimestamp).getTime() - new Date(b.landingTimestamp).getTime();
    });
  }, [pools, selectedZone, selectedTerminal, selectedVehicle, searchQuery, sortBy]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & Matching Status Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Flight Clustering Algorithm Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Airport Cab Matching & Group Clusters
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Matching incoming passengers landing within ±30 minutes with identical destination zones. Luggage volume matrix prevents trunk overflows.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex-shrink-0 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-navy-900 hover:bg-navy-800 text-white shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-sky-400" />
            <span>Create New Pool</span>
          </button>
        </div>

        {/* Dynamic Criteria Context Pill */}
        <div className="mt-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-700">
            <Plane className="w-4 h-4 text-sky-600 transform -rotate-45" />
            <span>
              Searching matches for Flight: <strong>{searchCriteria.flightNumber}</strong> ({searchCriteria.terminal})
            </span>
            <span className="text-slate-300">|</span>
            <span>
              Destination: <strong>{DESTINATION_ZONES.find((z) => z.id === searchCriteria.destinationZone)?.name || 'All Zones'}</strong>
            </span>
          </div>

          <button
            onClick={() => setActiveTab('book')}
            className="text-xs text-sky-600 hover:text-sky-700 font-bold underline"
          >
            Modify Search Criteria
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Search box */}
          <div className="relative lg:col-span-1">
            <input
              type="text"
              placeholder="Search destination, flight..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          </div>

          {/* Zone filter */}
          <div>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Destination Zones</option>
              {DESTINATION_ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name.split('/')[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Terminal filter */}
          <div>
            <select
              value={selectedTerminal}
              onChange={(e) => setSelectedTerminal(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Airport Terminals</option>
              {TERMINALS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.id} ({t.name.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Type filter */}
          <div>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Vehicle Types</option>
              <option value="Sedan">Standard Sedan (Fits ~3 Bags)</option>
              <option value="SUV">High-Capacity SUV (Fits 5-6 Bags)</option>
            </select>
          </div>

          {/* Sort order */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500"
            >
              <option value="savings">Sort: Highest Savings (%)</option>
              <option value="arrival">Sort: Earliest Landing Window</option>
              <option value="seats">Sort: Most Open Seats</option>
            </select>
          </div>

        </div>

      </div>

      {/* Pools Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong>{filteredPools.length}</strong> matching airport pools
          </span>
          <span className="flex items-center space-x-1 text-emerald-600 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Split fare drops as more flyers join!</span>
          </span>
        </div>

        {filteredPools.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">No pools match your exact filter criteria</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Be the first passenger heading to this destination and let other incoming flyers join you!
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-500 text-white shadow-md"
            >
              Create New Airport Pool Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPools.map((pool) => (
              <PoolCard
                key={pool.id}
                pool={pool}
                onJoinClick={setSelectedPoolForJoin}
                isUserMember={myActivePoolId === pool.id}
              />
            ))}
          </div>
        )}
      </div>

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
