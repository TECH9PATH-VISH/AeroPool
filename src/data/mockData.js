// AeroPool Comprehensive Mock Data Layer
// Realistic flights, airport zones, terminals, existing pools, and chat presets

export const AIRPORTS = [
  { code: 'JFK', name: 'John F. Kennedy Intl Airport', city: 'New York', currency: '$', symbol: '$' },
  { code: 'SFO', name: 'San Francisco Intl Airport', city: 'San Francisco', currency: '$', symbol: '$' },
  { code: 'DEL', name: 'Indira Gandhi Intl Airport', city: 'New Delhi', currency: '₹', symbol: '₹' },
  { code: 'BLR', name: 'Kempegowda Intl Airport', city: 'Bengaluru', currency: '₹', symbol: '₹' },
  { code: 'LHR', name: 'London Heathrow Airport', city: 'London', currency: '£', symbol: '£' },
];

export const CURRENT_AIRPORT = AIRPORTS[2]; // Default to DEL/BLR or universal multi-currency mode

export const TERMINALS = [
  { id: 'T1', name: 'Terminal 1 (Domestic Budget)', gates: 'Gates 1 - 24', pickupPoint: 'Pillar 4, Outside Exit Gate 2' },
  { id: 'T2', name: 'Terminal 2 (Domestic & Regional)', gates: 'Gates 25 - 48', pickupPoint: 'Pillar 9, Commercial Cab Bay' },
  { id: 'T3', name: 'Terminal 3 (International & Premium)', gates: 'Gates 50 - 90', pickupPoint: 'Pillar 14, Forecourt Lane 3' },
];

export const DESTINATION_ZONES = [
  {
    id: 'downtown',
    name: 'Downtown / Central Business Dist.',
    distanceKm: 28,
    typicalSoloFare: 1350,
    soloFareUSD: 45,
    popularLandmarks: ['City Square', 'Grand Central Hotel', 'Regent Street', 'Financial Plaza'],
    description: 'Central commercial hub, high-density hotel district & metro junction'
  },
  {
    id: 'tech_park',
    name: 'Tech Park Sector V / Cyber City',
    distanceKm: 38,
    typicalSoloFare: 1650,
    soloFareUSD: 54,
    popularLandmarks: ['Tech Boulevard Gate 3', 'Silicon Towers', 'Innovation Hub', 'WeWork Cyber Hub'],
    description: 'IT Corridor, tech corporate headquarters & software campus'
  },
  {
    id: 'university',
    name: 'University Town / Campus South',
    distanceKm: 22,
    typicalSoloFare: 1100,
    soloFareUSD: 36,
    popularLandmarks: ['Central University Gate', 'Student Village Dorms', 'Medical College Circle'],
    description: 'Academic campuses, student housing & research institutes'
  },
  {
    id: 'suburb_north',
    name: 'Greenfield Valley / Northern Suburbs',
    distanceKm: 45,
    typicalSoloFare: 1950,
    soloFareUSD: 62,
    popularLandmarks: ['Greenfield Residences', 'Pine Hills Club', 'Expressway Junction Gate'],
    description: 'Residential gated communities and quiet northern suburbs'
  },
  {
    id: 'neighbor_city',
    name: 'Neighboring Industrial Corridor',
    distanceKm: 55,
    typicalSoloFare: 2400,
    soloFareUSD: 75,
    popularLandmarks: ['Manufacturing Zone North', 'Express Highway Toll Plaza', 'Logistics Hub'],
    description: 'Inter-district highway transit corridor'
  }
];

export const FLIGHT_DATABASE = [
  {
    flightNumber: 'AI-402',
    airline: 'Air India',
    airlineCode: 'AI',
    origin: 'Mumbai (BOM)',
    scheduledArrival: '18:45',
    status: 'On Time',
    terminal: 'T3',
    aircraft: 'Boeing 787-8'
  },
  {
    flightNumber: '6E-512',
    airline: 'IndiGo Airlines',
    airlineCode: '6E',
    origin: 'Bengaluru (BLR)',
    scheduledArrival: '18:55',
    status: 'Landing Soon',
    terminal: 'T2',
    aircraft: 'Airbus A321neo'
  },
  {
    flightNumber: 'UK-814',
    airline: 'Vistara / Air India Express',
    airlineCode: 'UK',
    origin: 'Kolkata (CCU)',
    scheduledArrival: '19:10',
    status: 'On Time',
    terminal: 'T3',
    aircraft: 'Airbus A320neo'
  },
  {
    flightNumber: 'SG-238',
    airline: 'SpiceJet',
    airlineCode: 'SG',
    origin: 'Hyderabad (HYD)',
    scheduledArrival: '19:15',
    status: 'Delayed (+15m)',
    terminal: 'T1',
    aircraft: 'Boeing 737 MAX'
  },
  {
    flightNumber: 'EK-510',
    airline: 'Emirates',
    airlineCode: 'EK',
    origin: 'Dubai (DXB)',
    scheduledArrival: '19:30',
    status: 'On Time',
    terminal: 'T3',
    aircraft: 'Boeing 777-300ER'
  },
  {
    flightNumber: 'BA-143',
    airline: 'British Airways',
    airlineCode: 'BA',
    origin: 'London Heathrow (LHR)',
    scheduledArrival: '19:40',
    status: 'Approaching',
    terminal: 'T3',
    aircraft: 'Airbus A350-1000'
  },
  {
    flightNumber: 'UA-802',
    airline: 'United Airlines',
    airlineCode: 'UA',
    origin: 'Newark (EWR)',
    scheduledArrival: '20:05',
    status: 'Scheduled',
    terminal: 'T3',
    aircraft: 'Boeing 787-9'
  },
  {
    flightNumber: 'QP-133',
    airline: 'Akasa Air',
    airlineCode: 'QP',
    origin: 'Goa (GOI)',
    scheduledArrival: '18:30',
    status: 'Landed',
    terminal: 'T1',
    aircraft: 'Boeing 737 MAX 8'
  }
];

export const LUGGAGE_TIERS = [
  {
    id: 'cabin_only',
    title: 'Backpack / Cabin Bag',
    subtitle: 'Fits easily in footwell or trunk',
    capacityUnits: 0.5,
    icon: 'briefcase',
    requiresSUV: false,
    maxPassengersInSedan: 4
  },
  {
    id: 'medium_suitcase',
    title: '1 Standard Suitcase',
    subtitle: '1 Medium Check-in Bag (20-24")',
    capacityUnits: 1.0,
    icon: 'luggage',
    requiresSUV: false,
    maxPassengersInSedan: 3
  },
  {
    id: 'heavy_bags',
    title: '2+ Large Check-in Bags',
    subtitle: 'Heavy / Oversized Luggage (28"+)',
    capacityUnits: 2.5,
    icon: 'boxes',
    requiresSUV: true,
    badge: 'Triggers SUV Requirement',
    maxPassengersInSedan: 2
  }
];

export const INITIAL_POOLS = [
  {
    id: 'pool-cyber-1',
    name: 'Tech Corridor Express',
    destinationZone: 'tech_park',
    destinationAddress: 'Cyber City Sector V, Building 10, Silicon Plaza',
    terminal: 'T3',
    meetingPoint: 'Pillar 14, Terminal 3 Arrival Forecourt',
    flightArrivalWindow: '18:40 - 19:15',
    landingTimestamp: new Date(Date.now() + 28 * 60 * 1000).toISOString(),
    status: 'matching', // matching, locked, completed
    maxCapacity: 4,
    currentMembers: [
      {
        id: 'user-1',
        name: 'Kavya R.',
        maskedName: 'Kavya R. (***402)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        badge: 'Verified Tech Professional',
        flightNumber: 'AI-402',
        luggageTier: 'cabin_only',
        luggageDescription: '1 Laptop Backpack + 1 Cabin Duffel',
        units: 0.5,
        joinedAt: '18:10',
        paymentStatus: 'paid'
      },
      {
        id: 'user-2',
        name: 'Rohan M.',
        maskedName: 'Rohan M. (***512)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        badge: 'Top Rated Co-Traveler (★ 4.9)',
        flightNumber: '6E-512',
        luggageTier: 'medium_suitcase',
        luggageDescription: '1 Medium Trolley Suitcase',
        units: 1.0,
        joinedAt: '18:15',
        paymentStatus: 'paid'
      }
    ],
    vehicleType: 'Sedan', // Sedan or SUV
    vehicleModel: 'Toyota Camry Hybrid (Silver)',
    vehiclePlate: 'DL 01 AB 9284',
    driverName: 'Rajesh Kumar (Uber Airport Fleet)',
    driverRating: 4.88,
    totalBaseFare: 1650,
    soloTaxiFare: 1650,
    currentPerPersonFare: 825,
    targetPerPersonFare: 412, // when 4/4 filled
    savingsPercent: 50,
    maxWaitBufferMins: 30,
    co2SavedKg: 5.4,
    chatMessages: [
      {
        id: 'm1',
        senderId: 'system',
        senderName: 'AeroPool Dispatch',
        text: 'Pool created! Matching incoming passengers headed to Tech Park Sector V.',
        timestamp: '18:10',
        isSystem: true
      },
      {
        id: 'm2',
        senderId: 'user-1',
        senderName: 'Kavya R.',
        text: 'Hi everyone! My flight AI-402 has started final descent. Will be at baggage claim in ~20 mins.',
        timestamp: '18:12',
        isSystem: false
      },
      {
        id: 'm3',
        senderId: 'user-2',
        senderName: 'Rohan M.',
        text: 'Hey Kavya! Landing right behind you on 6E-512. Looking forward to splitting the ride!',
        timestamp: '18:16',
        isSystem: false
      }
    ]
  },
  {
    id: 'pool-downtown-2',
    name: 'Downtown Executive Commute',
    destinationZone: 'downtown',
    destinationAddress: 'Grand Central Plaza & Regent Street, Downtown',
    terminal: 'T3',
    meetingPoint: 'Pillar 12, Terminal 3 Lane 2',
    flightArrivalWindow: '18:50 - 19:25',
    landingTimestamp: new Date(Date.now() + 35 * 60 * 1000).toISOString(),
    status: 'matching',
    maxCapacity: 4,
    currentMembers: [
      {
        id: 'user-3',
        name: 'Arjun V.',
        maskedName: 'Arjun V. (***814)',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        badge: 'Verified Airport Frequent Flyer',
        flightNumber: 'UK-814',
        luggageTier: 'heavy_bags',
        luggageDescription: '2 Large Check-in Suitcases',
        units: 2.5,
        joinedAt: '18:20',
        paymentStatus: 'paid'
      },
      {
        id: 'user-4',
        name: 'Sara K.',
        maskedName: 'Sara K. (***510)',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        badge: 'Verified Consultant',
        flightNumber: 'EK-510',
        luggageTier: 'medium_suitcase',
        luggageDescription: '1 Strolley + 1 Handbag',
        units: 1.0,
        joinedAt: '18:24',
        paymentStatus: 'paid'
      },
      {
        id: 'user-5',
        name: 'Dev P.',
        maskedName: 'Dev P. (***402)',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        badge: 'Verified Traveler',
        flightNumber: 'AI-402',
        luggageTier: 'cabin_only',
        luggageDescription: '1 Backpack only',
        units: 0.5,
        joinedAt: '18:28',
        paymentStatus: 'paid'
      }
    ],
    vehicleType: 'SUV', // Upgraded to SUV because Arjun has heavy_bags!
    vehicleModel: 'Toyota Innova Crysta ZX (Pearl White)',
    vehiclePlate: 'DL 03 XY 7711',
    driverName: 'Sukhvinder Singh (Fleet Leader)',
    driverRating: 4.95,
    totalBaseFare: 1750, // Slightly higher for SUV
    soloTaxiFare: 1450,
    currentPerPersonFare: 583,
    targetPerPersonFare: 437,
    savingsPercent: 60,
    maxWaitBufferMins: 25,
    co2SavedKg: 8.2,
    chatMessages: [
      {
        id: 'm10',
        senderId: 'system',
        senderName: 'AeroPool Dispatch',
        text: 'Vehicle auto-upgraded to Premium 6-Seater SUV due to 2+ large check-in bags in group.',
        timestamp: '18:20',
        isSystem: true
      },
      {
        id: 'm11',
        senderId: 'user-3',
        senderName: 'Arjun V.',
        text: 'Thanks for the upgrade! I have two heavy bags from my Europe conference, so the SUV boot space is perfect.',
        timestamp: '18:22',
        isSystem: false
      },
      {
        id: 'm12',
        senderId: 'user-4',
        senderName: 'Sara K.',
        text: 'Super convenient! My flight EK-510 just touched down. Waiting for carousel 7.',
        timestamp: '18:26',
        isSystem: false
      }
    ]
  },
  {
    id: 'pool-univ-3',
    name: 'University Student Squad Pool',
    destinationZone: 'university',
    destinationAddress: 'University South Gate, Student Residential Quad',
    terminal: 'T1',
    meetingPoint: 'Pillar 4, Terminal 1 Exit Gate B',
    flightArrivalWindow: '18:30 - 19:00',
    landingTimestamp: new Date(Date.now() + 14 * 60 * 1000).toISOString(),
    status: 'locked', // Ready to dispatch!
    maxCapacity: 4,
    currentMembers: [
      {
        id: 'user-6',
        name: 'Aisha N.',
        maskedName: 'Aisha N. (***238)',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        badge: 'Verified Student ID (Campus Ambassador)',
        flightNumber: 'SG-238',
        luggageTier: 'medium_suitcase',
        luggageDescription: '1 Duffle + 1 Suitcase',
        units: 1.0,
        joinedAt: '18:02',
        paymentStatus: 'paid'
      },
      {
        id: 'user-7',
        name: 'Tanmay B.',
        maskedName: 'Tanmay B. (***133)',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        badge: 'Verified Student ID',
        flightNumber: 'QP-133',
        luggageTier: 'cabin_only',
        luggageDescription: '1 Backpack',
        units: 0.5,
        joinedAt: '18:05',
        paymentStatus: 'paid'
      },
      {
        id: 'user-8',
        name: 'Meera S.',
        maskedName: 'Meera S. (***512)',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
        badge: 'Verified Student ID',
        flightNumber: '6E-512',
        luggageTier: 'medium_suitcase',
        luggageDescription: '1 Suitcase',
        units: 1.0,
        joinedAt: '18:09',
        paymentStatus: 'paid'
      },
      {
        id: 'user-9',
        name: 'Kabir G.',
        maskedName: 'Kabir G. (***402)',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        badge: 'Verified Student ID',
        flightNumber: 'AI-402',
        luggageTier: 'cabin_only',
        luggageDescription: '1 Backpack',
        units: 0.5,
        joinedAt: '18:14',
        paymentStatus: 'paid'
      }
    ],
    vehicleType: 'Sedan',
    vehicleModel: 'Honda City i-VTEC (Metallic Grey)',
    vehiclePlate: 'DL 02 CD 4589',
    driverName: 'Amit Verma (Airport Taxi Co-op)',
    driverRating: 4.91,
    totalBaseFare: 1100,
    soloTaxiFare: 1100,
    currentPerPersonFare: 275,
    targetPerPersonFare: 275,
    savingsPercent: 75,
    maxWaitBufferMins: 20,
    co2SavedKg: 9.6,
    chatMessages: [
      {
        id: 'm20',
        senderId: 'system',
        senderName: 'AeroPool Dispatch',
        text: 'Pool is FULL (4/4)! Max discount unlocked: 75% savings applied. Driver Amit is stationed at Pillar 4.',
        timestamp: '18:14',
        isSystem: true
      },
      {
        id: 'm21',
        senderId: 'user-6',
        senderName: 'Aisha N.',
        text: 'Yay! ₹275 only each instead of ₹1,100! See you all at Pillar 4 in 15 mins.',
        timestamp: '18:16',
        isSystem: false
      }
    ]
  },
  {
    id: 'pool-suburb-4',
    name: 'Greenfield Valley Neighborhood Ride',
    destinationZone: 'suburb_north',
    destinationAddress: 'Pine Hills Country Club & North Expressway Gate',
    terminal: 'T3',
    meetingPoint: 'Pillar 16, Terminal 3 Arrival Area',
    flightArrivalWindow: '19:30 - 20:10',
    landingTimestamp: new Date(Date.now() + 55 * 60 * 1000).toISOString(),
    status: 'matching',
    maxCapacity: 4,
    currentMembers: [
      {
        id: 'user-10',
        name: 'Vikram S.',
        maskedName: 'Vikram S. (***143)',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        badge: 'Verified Resident (Pine Hills RWA)',
        flightNumber: 'BA-143',
        luggageTier: 'heavy_bags',
        luggageDescription: '2 Large Bags + Golf Kit',
        units: 2.5,
        joinedAt: '18:22',
        paymentStatus: 'paid'
      }
    ],
    vehicleType: 'SUV',
    vehicleModel: 'Hyundai Alcazar (Phantom Black)',
    vehiclePlate: 'DL 08 BK 3320',
    driverName: 'Manpreet Singh',
    driverRating: 4.87,
    totalBaseFare: 2050,
    soloTaxiFare: 1950,
    currentPerPersonFare: 2050,
    targetPerPersonFare: 512,
    savingsPercent: 0,
    maxWaitBufferMins: 45,
    co2SavedKg: 0,
    chatMessages: [
      {
        id: 'm30',
        senderId: 'system',
        senderName: 'AeroPool Dispatch',
        text: 'Pool created by Vikram S. Waiting for co-passengers to Greenfield Valley.',
        timestamp: '18:22',
        isSystem: true
      }
    ]
  }
];

export const MOCK_USER_PROFILE = {
  id: 'current-user-1',
  name: 'Alex Mercer',
  maskedName: 'Alex M. (You)',
  email: 'alex.mercer@techcorp.io',
  phone: '+1 (555) 019-2834',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  badge: 'Verified Traveler & Tech Pro',
  rating: 4.96,
  totalTrips: 18,
  totalSavedINR: 14200,
  totalSavedUSD: 460,
  totalCO2SavedKg: 64.8
};
