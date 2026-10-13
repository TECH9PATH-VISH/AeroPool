// AeroPool Utility Functions & Calculations

import { FLIGHT_DATABASE, DESTINATION_ZONES, LUGGAGE_TIERS } from '../data/mockData';

// Currency formatting (supports INR or USD)
export const formatCurrency = (amount, currency = '₹') => {
  if (currency === '$') {
    const usd = Math.round(amount / 30);
    return `$${usd}`;
  }
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

// Find flight by number or prefix
export const lookupFlight = (query) => {
  if (!query) return null;
  const clean = query.trim().toUpperCase().replace(/\s+/g, '-');
  return FLIGHT_DATABASE.find(
    (f) => f.flightNumber.toUpperCase() === clean || f.flightNumber.replace('-', '').toUpperCase() === clean
  ) || null;
};

// Calculate luggage capacity units
export const getLuggageUnits = (tierId) => {
  const tier = LUGGAGE_TIERS.find((t) => t.id === tierId);
  return tier ? tier.capacityUnits : 1.0;
};

// Determine vehicle based on total luggage units and passenger count
export const determineVehicleType = (members, newLuggageTier = null) => {
  let totalUnits = members.reduce((acc, m) => acc + (m.units || getLuggageUnits(m.luggageTier)), 0);
  if (newLuggageTier) {
    totalUnits += getLuggageUnits(newLuggageTier);
  }

  const hasHeavyLuggage = members.some((m) => m.luggageTier === 'heavy_bags') || newLuggageTier === 'heavy_bags';
  const totalCount = members.length + (newLuggageTier ? 1 : 0);

  // If heavy luggage is present, total units > 3.0, or passenger count is 4 with suitcases -> SUV
  if (hasHeavyLuggage || totalUnits > 3.0 || totalCount > 4) {
    return {
      type: 'SUV',
      model: 'Toyota Innova Crysta / Ertiga XL',
      capacityDesc: 'Spacious 6-Seater with 4-5 Bag Trunk Boot',
      totalUnits,
      maxLuggageUnits: 6.0,
      reason: hasHeavyLuggage ? 'Upgraded due to large check-in bags' : 'High luggage volume across group'
    };
  }

  return {
    type: 'Sedan',
    model: 'Toyota Camry / Honda City / Dzire Prime',
    capacityDesc: '4-Passenger Sedan with standard boot',
    totalUnits,
    maxLuggageUnits: 3.0,
    reason: 'Standard luggage volume fits comfortably'
  };
};

// Calculate countdown string (e.g., "24 mins 10 secs")
export const getCountdownTime = (targetDateIso) => {
  const target = new Date(targetDateIso).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { isPast: true, text: 'Landed / Arriving Now' };
  }

  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    isPast: false,
    text: `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`,
    minutes,
    seconds
  };
};

// Calculate dynamic savings percentage
export const calculateSavings = (soloFare, sharedFare) => {
  if (!soloFare || !sharedFare) return 0;
  const saving = ((soloFare - sharedFare) / soloFare) * 100;
  return Math.max(0, Math.round(saving));
};

// Estimate CO2 savings (approx 0.18 kg CO2 per km solo taxi passenger)
export const calculateCO2Saved = (distanceKm, occupantsCount) => {
  if (occupantsCount <= 1) return 0;
  // A single shared vehicle emits ~0.22 kg CO2/km instead of N individual cars (N * 0.20 kg CO2/km)
  const soloTotal = distanceKm * 0.20 * occupantsCount;
  const sharedTotal = distanceKm * 0.24;
  const saved = Math.max(0, soloTotal - sharedTotal);
  return parseFloat(saved.toFixed(1));
};

// Generate realistic airport meeting pillar
export const getMeetingPointForTerminal = (terminalId) => {
  switch (terminalId) {
    case 'T1':
      return 'Pillar 4, Outside Exit Gate 2 (Terminal 1 Arrivals)';
    case 'T2':
      return 'Pillar 9, Commercial Cab Bay 3 (Terminal 2 Arrivals)';
    case 'T3':
    default:
      return 'Pillar 14, Forecourt Lane 3 (Terminal 3 Arrivals)';
  }
};
