import React, { useState } from 'react';
import { usePool } from '../context/PoolContext';
import { Plane, Car, Users, LayoutDashboard, Calculator, MapPin, RefreshCw, ChevronDown, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';

export const Navbar = () => {
  const { activeTab, setActiveTab, pools, myActivePoolId, currency, setCurrency, resetToMockData, userProfile } = usePool();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'book', label: 'Find a Ride', icon: Plane, badge: null },
    { id: 'matches', label: 'Active Pools', icon: Users, badge: pools.filter(p => p.status === 'matching').length },
    { id: 'dashboard', label: 'Live Pool Hub', icon: LayoutDashboard, dot: !!myActivePoolId },
    { id: 'estimator', label: 'Fare Calculator', icon: Calculator, badge: null },
    { id: 'terminal-map', label: 'Terminal Map', icon: MapPin, badge: null },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-navy-700 text-white shadow-lg transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('book')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 shadow-glow text-white">
              <Plane className="w-6 h-6 transform -rotate-45" />
              <Car className="w-4 h-4 absolute bottom-1 right-1 text-white bg-navy-900 rounded-full p-0.5 border border-sky-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent">
                  AeroPool
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-sky-500/20 text-sky-400 border border-sky-400/30 rounded-full">
                  Airport Rideshare
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Incoming Flight Co-Passenger Pool
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-navy-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  
                  {item.badge !== null && item.badge > 0 && (
                    <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-navy-900 text-sky-300' : 'bg-sky-500/30 text-sky-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {item.dot && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute top-2 right-2" />
                  )}
                  {item.dot && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-2 right-2" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Currency Toggle, Reset & User Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Currency switch */}
            <div className="flex items-center bg-navy-800 border border-navy-700 rounded-lg p-0.5 text-xs font-semibold">
              <button
                onClick={() => setCurrency('₹')}
                className={`px-2 py-1 rounded transition-colors ${
                  currency === '₹' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
                title="Indian Rupee"
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('$')}
                className={`px-2 py-1 rounded transition-colors ${
                  currency === '$' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
                title="US Dollar"
              >
                $ USD
              </button>
            </div>

            {/* Quick Demo Reset */}
            <button
              onClick={resetToMockData}
              title="Reset Demo Flight & Pool Data"
              className="p-2 text-slate-400 hover:text-white hover:bg-navy-800 rounded-lg transition-colors border border-navy-700"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* User Profile Pill */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-navy-800 transition-colors border border-navy-700 bg-navy-800/60"
              >
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-8 h-8 rounded-full object-cover border border-sky-400"
                />
                <div className="text-left hidden lg:block pr-1">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-white">{userProfile.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <span className="text-[10px] text-emerald-400 font-medium">Verified Passenger</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Profile dropdown modal */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-navy-900 border border-navy-700 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center space-x-3 pb-3 border-b border-navy-800">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-12 h-12 rounded-full border-2 border-sky-400"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{userProfile.name}</h4>
                      <p className="text-xs text-slate-400">{userProfile.email}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span className="text-[11px] text-emerald-400 font-medium">{userProfile.badge}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-3 text-center">
                    <div className="bg-navy-800/80 p-2 rounded-xl border border-navy-700/60">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Lifetime Savings</span>
                      <span className="text-sm font-extrabold text-emerald-400">
                        {currency === '$' ? `$${userProfile.totalSavedUSD}` : `₹${userProfile.totalSavedINR.toLocaleString()}`}
                      </span>
                    </div>
                    <div className="bg-navy-800/80 p-2 rounded-xl border border-navy-700/60">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Carbon Saved</span>
                      <span className="text-sm font-extrabold text-sky-400">
                        {userProfile.totalCO2SavedKg} kg CO₂
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-navy-800/40 p-2.5 rounded-xl border border-navy-700/40">
                    🔒 <strong>Privacy Mode Active:</strong> Your full phone number and personal info remain masked to matched pool co-travelers until ride boarding.
                  </div>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setActiveTab('dashboard');
                    }}
                    className="w-full mt-3 py-2 text-xs font-bold text-center bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-colors"
                  >
                    View Active Pool & Badges
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2.5 border-t border-navy-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center py-1 px-2 rounded-lg text-[11px] font-semibold transition-colors ${
                  isActive ? 'text-sky-400 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 mb-0.5" />
                  {item.badge !== null && item.badge > 0 && (
                    <span className="absolute -top-1 -right-2 px-1 text-[9px] font-extrabold bg-sky-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.dot && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5" />
                  )}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
