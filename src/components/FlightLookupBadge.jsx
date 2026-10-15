import React, { useState, useEffect } from 'react';
import { FLIGHT_DATABASE } from '../data/mockData';
import { lookupFlight } from '../utils/helpers';
import { Plane, CheckCircle2, Clock, MapPin, AlertCircle, Sparkles } from 'lucide-react';

export const FlightLookupBadge = ({ value, onChange, onSelectFlight }) => {
  const [query, setQuery] = useState(value || '');
  const [flightInfo, setFlightInfo] = useState(() => lookupFlight(value));
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setQuery(value || '');
    const found = lookupFlight(value);
    setFlightInfo(found);
  }, [value]);

  const handleInputChange = (e) => {
    const val = e.target.value.toUpperCase();
    setQuery(val);
    onChange(val);
    const found = lookupFlight(val);
    setFlightInfo(found);
    if (found && onSelectFlight) {
      onSelectFlight(found);
    }
  };

  const handleSelectPredefined = (flight) => {
    setQuery(flight.flightNumber);
    onChange(flight.flightNumber);
    setFlightInfo(flight);
    setShowDropdown(false);
    if (onSelectFlight) {
      onSelectFlight(flight);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
          <span>Flight Number</span>
          <span className="text-xs text-sky-600 font-semibold">(Live Airport Route Lookup)</span>
        </label>
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-xs text-sky-600 hover:text-sky-700 font-semibold flex items-center space-x-1 underline decoration-sky-300"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Browse Today's Arrivals</span>
        </button>
      </div>

      <div className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. 6E-2132, AI-806, UK-996, EK-512"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
            className="w-full uppercase font-mono tracking-wider pl-10 pr-24 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm font-bold shadow-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Plane className="w-4 h-4 transform -rotate-45" />
          </div>

          {flightInfo ? (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified</span>
              </span>
            </div>
          ) : query.length >= 3 ? (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-[11px] text-sky-700 font-medium bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                Custom Entry
              </span>
            </div>
          ) : null}
        </div>

        {/* Real Flights Dropdown */}
        {showDropdown && (
          <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-30 max-h-56 overflow-y-auto divide-y divide-slate-100">
            <div className="p-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 flex items-center justify-between">
              <span>Live Scheduled Arrivals • IGI Airport (DEL)</span>
              <button
                type="button"
                onClick={() => setShowDropdown(false)}
                className="text-slate-500 hover:text-slate-800"
              >
                Close ✕
              </button>
            </div>
            {FLIGHT_DATABASE.map((f) => (
              <button
                key={f.flightNumber}
                type="button"
                onClick={() => handleSelectPredefined(f)}
                className="w-full px-3.5 py-2.5 text-left hover:bg-sky-50/70 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono font-bold text-sm text-navy-900 bg-slate-100 px-2 py-0.5 rounded group-hover:bg-sky-100 group-hover:text-sky-800">
                    {f.flightNumber}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{f.airline}</span>
                    <span className="text-[11px] text-slate-500">From {f.origin}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-800 block">ETA {f.scheduledArrival}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Terminal {f.terminal}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Flight Detail Live Preview Banner */}
      {flightInfo && (
        <div className="bg-gradient-to-r from-sky-50 via-slate-50 to-blue-50 border border-sky-200/80 rounded-xl p-3 shadow-xs animate-in fade-in">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {flightInfo.airlineCode}
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-navy-900">
                  {flightInfo.airline} ({flightInfo.flightNumber})
                </h4>
                <p className="text-[11px] text-slate-600">
                  Route: <strong>{flightInfo.origin}</strong> ➔ Indira Gandhi Intl (DEL)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1 text-slate-700 font-medium">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>ETA: <strong>{flightInfo.scheduledArrival}</strong></span>
              </div>
              <div className="flex items-center space-x-1 text-slate-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>Gate/Bay: <strong>{flightInfo.terminal}</strong></span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  flightInfo.status.includes('Delayed')
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                ● {flightInfo.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
