# 🛫 AeroPool — Airport Shared-Cab & Pool Platform

> **Intelligent airport shared-cab pooling platform that matches incoming flight passengers heading in the same geographic direction to split travel costs, optimize vehicle capacity, and eliminate airport transit delays.**

Built with **React**, **Tailwind CSS v4**, **Lucide Icons**, and a clean travel-tech aesthetic inspired by modern airline and ride-sharing applications.

---

## 🚀 Key Features & User Flows

### 1. Landing Page & Passenger Request Flow (`/book`)
* **Flight Auto-Lookup**: Search or select incoming flights (e.g. `AI-402`, `6E-512`, `UK-814`, `EK-510`, `BA-143`) with automatic airline details, route origins, and arrival times.
* **Geographic Destination Zones**: Target key zones (*Downtown Central*, *Tech Park Sector V*, *University Town*, *Greenfield Valley Suburbs*, *Industrial Corridor*) with landmark auto-suggestions.
* **Luggage Volume Matrix**:
  * *Backpack / Cabin Bag only* (0.5 baggage units)
  * *1 Standard Suitcase* (1.0 baggage units)
  * *2+ Large Check-in Bags* (2.5 baggage units — **automatically triggers 6-seater SUV upgrade** to prevent trunk overflows).
* **Seat & Buffer Preferences**: 1–4 passenger slots with 15m, 30m, or 45m arrival buffer windows.
* **Instant Projected Savings**: Live on-form quote comparing solo airport taxi fares with shared rides (~60%–75% savings).

### 2. Smart Matching & Group Clustering Engine (`/matches`)
* **Dynamic Grouping Algorithm**: Clusters incoming passengers landing within a $\pm$30-minute window heading to the same zone.
* **Live Dashboard Cards**: Displays current group capacity (e.g. 2/4 matched with masked avatars), flight timelines, assigned vehicle (Sedan vs SUV), real-time boot capacity bar, and per-person split rates.
* **Instant Actions**: "Join Group" with luggage confirmation or "Create New Pool" with custom settings.

### 3. Live Coordination Hub & Dashboard (`/dashboard`)
* **Active Countdown Timer**: Real-time ticking timer counting down to flight touchdown and meet-up window.
* **Designated Meeting Points**: Shows assigned curbside pickup pillars (*e.g., “Pillar No. 14, Forecourt Lane 3, Terminal 3”*).
* **Co-Passenger Profile Cards**: Masked privacy names, verified traveler/student badges, and individual luggage baggage breakdown.
* **Vehicle & Driver Specs**: Assigned vehicle model (e.g. *Toyota Innova Crysta ZX* / *Toyota Camry Hybrid*), license plate, chauffeur name, and fleet rating.
* **Lock vs. Wait Dispatch Toggle**: Toggle between *"Wait for more co-flyers"* to maximize discount or *"Lock & Book Now"* for immediate departure.

### 4. Transparent Fare Splitting Calculator
* Flat airport rate $\div$ number of passengers = per-person split share.
* Co-passenger payment settlement status table.
* Simulated payment actions via Apple Pay / G-Pay, Instant UPI, or Corporate Card.

### 5. Temporary Group Coordination Feed (Live Chat)
* One-tap quick status pills (*“🛬 Just deboarded flight”*, *“🧳 Waiting at Baggage Carousel”*, *“📍 Reached Airport Pillar”*, *“⏰ Small delay”*, *“🚗 Spotted the Cab”*).
* Simulated interactive real-time messaging between matched flyers.

### 6. Fare & Carbon Calculator (`/estimator`) & Terminal Guide (`/terminal-map`)
* **Estimator**: Interactive sliders for zones, passenger counts, luggage tiers, and late-night surcharges with real-time kg CO₂ emissions offset metrics.
* **Terminal Guide**: Visual airport arrivals terminal diagram featuring deboarding gates, baggage carousels (Belts 1–8), customs exits, curbside pickup pillars (Pillars 1–20), and dedicated cab bays.

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 19 + Vite
* **Styling**: Tailwind CSS v4 + `@tailwindcss/vite`
* **Icons**: Lucide React
* **State Management**: React Context (`PoolContext.jsx`) with `localStorage` persistence
* **Data Layer**: Comprehensive realistic mock database (`mockData.js`)

---

## 📦 Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* npm

### Installation

```bash
# Clone the repository
git clone https://github.com/TECH9PATH-VISH/AeroPool.git

# Navigate to project directory
cd AeroPool

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

---

## 📂 Project Structure

```
AeroPool/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Navigation, currency toggle, user badge
│   │   ├── Footer.jsx               # Platform info & safety guarantees
│   │   ├── FlightLookupBadge.jsx    # Flight search & airline details
│   │   ├── LuggageSelector.jsx      # Baggage matrix with SUV trigger
│   │   ├── LuggageCapacityMeter.jsx # Vehicle boot progress indicator
│   │   ├── PoolCard.jsx             # Group cluster card with savings badge
│   │   ├── JoinPoolModal.jsx        # Confirmation modal with dynamic split
│   │   ├── CreatePoolModal.jsx      # Custom pool launch modal
│   │   ├── LiveChatFeed.jsx         # Live coordination chat & status pills
│   │   ├── FareSplitCard.jsx        # Transparent fare split calculator
│   │   ├── TerminalMapModal.jsx     # Visual airport layout diagram
│   │   └── Toast.jsx                # Toast alerts
│   ├── context/
│   │   └── PoolContext.jsx          # State management & pooling logic
│   ├── data/
│   │   └── mockData.js              # Comprehensive flights, zones & pools
│   ├── pages/
│   │   ├── BookRidePage.jsx         # Landing page & booking flow
│   │   ├── MatchesPage.jsx          # Matching & clustering engine
│   │   ├── DashboardPage.jsx        # Active pool status & live chat
│   │   ├── FareEstimatorPage.jsx    # Fare & CO2 calculator simulator
│   │   └── TerminalGuidePage.jsx    # Airport terminal guide & meeting map
│   ├── utils/
│   │   └── helpers.js               # Vehicle determination & calculation utils
│   ├── App.jsx                      # App root
│   ├── index.css                    # Tailwind CSS v4 styles
│   └── main.jsx                     # Vite entry point
├── package.json
└── vite.config.js                   # Vite configuration
```

---

## 📄 License
MIT License. Built for seamless airport transit mobility.
