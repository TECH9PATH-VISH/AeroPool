import React, { useState, useEffect } from 'react';
import { usePool } from '../context/PoolContext';
import { formatCurrency } from '../utils/helpers';
import { INITIAL_POOLS } from '../data/mockData';
import {
  Car,
  Navigation,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Share2,
  MessageSquare,
  Sparkles,
  Luggage,
  Users,
  Compass,
  ArrowRight,
  RefreshCw,
  Zap,
  Volume2
} from 'lucide-react';

export const LiveTrackingPage = () => {
  const {
    activePool,
    userProfile,
    currency,
    setActiveTab,
    rideTracking,
    setRideTracking,
    ridePin,
    showToast,
    sendChatMessage
  } = usePool();

  const [callModalOpen, setCallModalOpen] = useState(false);
  const [fastForward, setFastForward] = useState(false);

  // Active pool fallback
  const pool = activePool || INITIAL_POOLS[0];

  const {
    status = 'en_route',
    distanceKm = 1.4,
    etaMinutes = 4,
    progress = 25,
    speedKmH = 28,
    locationText = 'Approaching Terminal 3 Curbside Forecourt'
  } = rideTracking || {};

  // Live simulation tick: cab moves closer to the airport pillar over time
  useEffect(() => {
    if (status === 'arrived') return;

    const intervalTime = fastForward ? 800 : 3000;
    const interval = setInterval(() => {
      setRideTracking((prev) => {
        if (!prev) return prev;
        const newProgress = Math.min(100, prev.progress + (fastForward ? 12 : 3));
        const newDist = Math.max(0, +(prev.distanceKm - (fastForward ? 0.3 : 0.08)).toFixed(2));
        const newEta = Math.max(0, Math.ceil((newDist / 25) * 60));

        let newStatus = prev.status;
        let newLocation = prev.locationText;

        const pillarName = pool?.meetingPoint?.split(',')[0] || 'Pillar 3';

        if (newProgress >= 100 || newDist <= 0.05) {
          newStatus = 'arrived';
          newLocation = `Arrived at ${pillarName} (Patna Airport Terminal 1 Forecourt)`;
          showToast(`Cab (${pool?.vehiclePlate || 'Airport Taxi'}) has arrived at ${pillarName}!`, 'success');
        } else if (newProgress > 60) {
          newLocation = 'Turned into Patna Airport Terminal 1 Commercial Cab Lane';
        } else if (newProgress > 30) {
          newLocation = 'Passing Bihar Flying Club & Airport Road';
        }

        return {
          ...prev,
          progress: newProgress,
          distanceKm: newDist,
          etaMinutes: newEta,
          status: newStatus,
          locationText: newLocation
        };
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [fastForward, status, pool?.meetingPoint, setRideTracking, showToast]);

  const handleResetSimulation = () => {
    setRideTracking({
      status: 'en_route',
      distanceKm: 1.8,
      etaMinutes: 5,
      progress: 5,
      speedKmH: 32,
      locationText: 'Shaheed Pir Ali Khan Marg / Airport Perimeter Road'
    });
    showToast('Cab radar simulation reset to 1.8 km.', 'info');
  };

  const handleDriverCall = () => {
    setCallModalOpen(true);
  };

  const handleShareTrip = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Live tracking link copied to clipboard!', 'success');
  };

  if (!pool) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 shadow-card">
        <Car className="w-12 h-12 text-sky-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-navy-900">No Active Booked Ride</h3>
        <p className="text-xs text-slate-500 mt-2">
          Join or create an airport cab pool first to view real-time live GPS tracking.
        </p>
        <button
          onClick={() => setActiveTab('book')}
          className="mt-6 px-5 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs"
        >
          Find a Ride
        </button>
      </div>
    );
  }

  const isArrived = status === 'arrived';

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Banner: Rapido/Uber Live Status Pill Bar */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-sky-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-navy-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
                isArrived
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40'
                  : 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isArrived ? 'bg-emerald-400' : 'bg-sky-400 animate-ping'}`} />
                <span>{isArrived ? 'CAB ARRIVED AT PICKUP PILLAR' : 'DRIVER ON THE WAY TO AIRPORT CURB'}</span>
              </span>

              <span className="text-xs bg-navy-800/80 text-slate-300 font-mono px-2.5 py-0.5 rounded-full border border-navy-700">
                {pool.vehiclePlate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isArrived ? (
                <span className="text-emerald-400">Your Cab Has Arrived!</span>
              ) : (
                <span>
                  Arriving in <strong className="text-sky-300 font-mono">{etaMinutes} mins</strong> (~{distanceKm} km)
                </span>
              )}
            </h1>

            <p className="text-xs text-slate-300 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
              <span>Meeting Point: <strong>{pool.meetingPoint}</strong></span>
            </p>
          </div>

          {/* Ride Start PIN Box (Uber/Rapido Style) */}
          <div className="bg-navy-800/90 backdrop-blur-md border-2 border-sky-400/60 p-4 sm:p-5 rounded-2xl flex items-center space-x-4 self-start md:self-center shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                RIDE START SECURITY PIN
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-emerald-400">
                {ridePin}
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Share with driver {pool.driverName.split(' ')[0]} to start trip
              </span>
            </div>
          </div>

        </div>

        {/* Live GPS Progress Bar */}
        <div className="mt-5 pt-4 border-t border-navy-800/80">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-medium">
            <span className="flex items-center space-x-1">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>{locationText}</span>
            </span>
            <span className="font-mono text-sky-300 font-bold">
              {isArrived ? 'Arrived (0 km)' : `${distanceKm} km away • ${speedKmH} km/h`}
            </span>
          </div>

          <div className="w-full bg-navy-950 rounded-full h-2.5 overflow-hidden border border-navy-700/60 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isArrived
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                  : 'bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Radar Map on Left + Driver & Manifest on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* LEFT COLUMN: Animated Uber/Rapido Interactive Route Map (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-slate-950 rounded-3xl border border-navy-800 p-5 sm:p-6 text-white shadow-card relative overflow-hidden flex flex-col justify-between min-h-[480px]">
            
            {/* Ambient Map Glow */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

            {/* Map Header Overlay */}
            <div className="relative z-20 flex items-center justify-between bg-navy-900/90 backdrop-blur-md p-3 px-4 rounded-2xl border border-navy-700 shadow-sm text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-slate-200">Live Satellite Telemetry • IGI Terminal 3</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setFastForward(!fastForward)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center space-x-1 ${
                    fastForward
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-navy-800 text-slate-300 border-navy-700 hover:text-white'
                  }`}
                  title="Fast forward simulation to see instant arrival"
                >
                  <Zap className="w-3 h-3" />
                  <span>{fastForward ? 'Speed: 4x Active' : 'Speed: 1x (Fast Forward)'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetSimulation}
                  className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white border border-navy-700"
                  title="Reset distance simulation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Animated SVG Visual Map */}
            <div className="relative z-10 my-4 flex-1 flex items-center justify-center">
              <svg viewBox="0 0 700 420" className="w-full h-full max-h-[380px] drop-shadow-md">
                
                {/* Airport Roads Network */}
                <path
                  d="M 60 360 C 140 360, 200 300, 260 250 C 330 190, 420 180, 520 200 C 580 215, 620 260, 620 320"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="24"
                  strokeLinecap="round"
                />
                <path
                  d="M 60 360 C 140 360, 200 300, 260 250 C 330 190, 420 180, 520 200 C 580 215, 620 260, 620 320"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="6"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  className="animate-pulse"
                />

                {/* Terminal 1 Building Footprint */}
                <g transform="translate(480, 80)">
                  <rect width="180" height="90" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                  <text x="90" y="35" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                    PATNA AIRPORT (PAT)
                  </text>
                  <text x="90" y="55" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="900">
                    TERMINAL 1 FORECOURT
                  </text>
                  <text x="90" y="72" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                    Arrivals Gate & Baggage Belts
                  </text>
                </g>

                {/* Pickup Target: Designated Pillar */}
                <g transform="translate(560, 220)">
                  <circle r="28" fill="#0284c7" fillOpacity="0.15" />
                  <circle r="18" fill="#0284c7" fillOpacity="0.3" className="animate-ping" />
                  <circle r="10" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                  
                  {/* Pillar Label Badge */}
                  <rect x="-60" y="16" width="120" height="26" rx="6" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
                  <text x="0" y="33" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                    📍 {pool.meetingPoint ? pool.meetingPoint.split(',')[0] : 'Pillar 3'} Meet-up
                  </text>
                </g>

                {/* User Location Marker ("You are here") */}
                <g transform="translate(480, 220)">
                  <circle r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <rect x="-45" y="-30" width="90" height="22" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="1" />
                  <text x="0" y="-16" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                    👤 You (Exit Gate)
                  </text>
                </g>

                {/* Dynamic Moving Cab Icon along path */}
                {(() => {
                  // Coordinate interpolation based on progress (0% to 100%)
                  const p = progress / 100;
                  // Bezier-like waypoint interpolation
                  const x = 80 + p * (560 - 80);
                  const y = 350 - Math.sin(p * Math.PI) * 140;

                  return (
                    <g transform={`translate(${x}, ${y})`}>
                      {/* Pulse shadow */}
                      <circle r="22" fill="#38bdf8" fillOpacity="0.25" className="animate-ping" />
                      <circle r="16" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                      
                      {/* Cab icon SVG */}
                      <g transform="translate(-8, -8) scale(0.65)">
                        <path
                          d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
                          fill="#ffffff"
                        />
                      </g>

                      {/* Plate Floating Tag */}
                      <rect x="-45" y="-32" width="90" height="20" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                      <text x="0" y="-18" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">
                        {pool.vehiclePlate}
                      </text>
                    </g>
                  );
                })()}

              </svg>
            </div>

            {/* Bottom Real-Time Telemetry Bar */}
            <div className="relative z-20 bg-navy-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-navy-700 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="border-r border-navy-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Estimated Distance</span>
                <span className="text-sm sm:text-base font-extrabold text-white font-mono">{distanceKm} km</span>
              </div>
              <div className="border-r border-navy-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Time to Arrival</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono">
                  {isArrived ? 'At Pillar' : `${etaMinutes} mins`}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Approach Speed</span>
                <span className="text-sm sm:text-base font-extrabold text-sky-400 font-mono">{speedKmH} km/h</span>
              </div>
            </div>

          </div>

          {/* Quick Pillar Navigation Helper */}
          <div className="bg-sky-50 border border-sky-200/90 rounded-2xl p-4 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold">
                {pool?.meetingPoint?.match(/Pillar\s*(\d+)/i)?.[1] || '3'}
              </div>
              <div>
                <span className="font-bold text-navy-900 block">Where to wait for your cab:</span>
                <span className="text-slate-600 text-[11px]">{pool.meetingPoint}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('terminal-map')}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-sky-100 text-sky-700 font-bold border border-sky-200 text-xs transition-colors"
            >
              Open Terminal Walking Map
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Driver Info, Calling, Co-Riders, & Escrow Receipt (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Driver & Vehicle Profile Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-5 sm:p-6 space-y-4">
            
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                    alt={pool.driverName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-sky-400 shadow-sm"
                  />
                  <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 text-white rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-navy-900">{pool.driverName}</h3>
                  <p className="text-xs text-slate-500">
                    ★ <strong>{pool.driverRating}</strong> (2,410+ Airport Airport Trips)
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                    Verified Bihar Commercial Chauffeur (Patna Airport Registered)
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono font-bold bg-slate-100 px-2.5 py-1 rounded-lg text-slate-800 block border border-slate-200">
                  {pool.vehiclePlate}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">Silver Sedan</span>
              </div>
            </div>

            {/* Vehicle Model & Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/70">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Vehicle Model</span>
                <span className="font-bold text-slate-800">{pool.vehicleModel}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Trunk Boot Capacity</span>
                <span className="font-bold text-emerald-600">3/4 Bags Stowed</span>
              </div>
            </div>

            {/* Quick Action Dial Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={handleDriverCall}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Chauffeur</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                <span>Group Chat</span>
              </button>

              <button
                type="button"
                onClick={handleShareTrip}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-600" />
                <span>Share Status</span>
              </button>
            </div>

          </div>

          {/* Co-Passengers Manifest */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-sky-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900">
                  Confirmed Co-Travelers ({pool.currentMembers.length} Riders)
                </h4>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                All Split Payments Confirmed
              </span>
            </div>

            <div className="space-y-2">
              {pool.currentMembers.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 border border-slate-200/60"
                >
                  <div className="flex items-center space-x-2.5">
                    <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-slate-800 block">
                        {m.name} {m.id === userProfile.id ? '(You)' : ''}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Flight {m.flightNumber}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-slate-600 block">
                      {m.luggageTier === 'heavy_bags' ? '2+ Bags' : '1 Suitcase'}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                      ✓ Paid via UPI
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Escrow Guarantee Pill */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2 text-emerald-900">
            <div className="flex items-center space-x-2 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>AeroPool Escrow Protection Active</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Your fare is securely held in vault (8271665209@ptyes). The driver will only receive the payout after all passengers confirm onboarding at Pillar 14.
            </p>
          </div>

        </div>

      </div>

      {/* Simulated Call Chauffeur Modal */}
      {callModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-pulse">
              <Phone className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-base font-bold text-navy-900">Connecting to Chauffeur...</h4>
              <p className="text-xs text-slate-500 mt-0.5">{pool.driverName} ({pool.vehiclePlate})</p>
              <div className="font-mono text-sm font-bold text-slate-800 mt-2">+91 98112 40918</div>
            </div>

            <p className="text-[11px] text-slate-500">
              "Hi, I am entering Terminal 3 commercial lane 3 near Pillar 14 right now. I will turn on hazard lights."
            </p>

            <button
              onClick={() => setCallModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
            >
              End Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
