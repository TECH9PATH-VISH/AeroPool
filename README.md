# 🛫 AeroPool — Jay Prakash Narayan Airport, Patna (PAT) Shared-Cab Platform

> **Intelligent airport shared-cab pooling platform standardized for Jay Prakash Narayan Airport, Patna (PAT / VEPT). Matching incoming flight passengers heading in the same geographic direction to split travel costs, optimize vehicle luggage capacity, and accelerate airport departures across Patna city and Bihar transit corridors.**

Built with **React**, **Tailwind CSS v4**, **Lucide Icons**, and a clean travel-tech aesthetic customized specifically for Patna Airport arrivals.

---

## 🚀 Key Features & Standardized Patna Airport Flows

### 1. Landing Page & Passenger Request Flow (`/book`)
* **Patna Flight Auto-Lookup**: Search or select incoming flights arriving at Patna Airport (e.g. `6E-2126` DEL, `AI-407` DEL, `6E-6383` BLR, `6E-2433` BOM, `SG-8721` DEL, `6E-852` CCU, `QP-1512` BLR) with real schedule timings, airlines, and aircraft specs.
* **Geographic Patna Destination Zones**:
  * **Boring Road / Boring Canal Rd & Patliputra** (~6.2 km, ₹300 solo)
  * **Bailey Road / Raja Bazar & IGIMS Hub** (~3.5 km, ₹220 solo)
  * **Patna Junction / Fraser Rd & Dak Bunglow** (~6.5 km, ₹340 solo)
  * **Kankarbagh / Rajendra Nagar & Doctors Colony** (~8.5 km, ₹380 solo)
  * **Danapur Cantt / Saguna More & Gola Road** (~9.8 km, ₹400 solo)
  * **AIIMS Patna / Phulwari Sharif & Anisabad** (~7.5 km, ₹320 solo)
  * **Gandhi Maidan / Exhibition Rd & PMCH** (~9.0 km, ₹380 solo)
  * **Bihta / IIT Patna & Academic Tech Hub** (~32.0 km, ₹980 solo)
* **Luggage Volume Matrix**:
  * *Backpack / Cabin Bag only* (0.5 baggage units)
  * *1 Standard Suitcase* (1.0 baggage units)
  * *2+ Large Check-in Bags* (2.5 baggage units — **automatically triggers 6-seater Innova Crysta SUV upgrade** to prevent trunk overflows).
* **Seat & Buffer Preferences**: 1–4 passenger slots with 15m, 30m, or 45m arrival buffer windows.
* **Instant Projected Savings**: Live on-form quote comparing solo airport taxi fares with shared rides (up to 75% savings).

### 2. Smart Matching & Group Clustering Engine (`/matches`)
* **Dynamic Grouping Algorithm**: Clusters incoming passengers landing within a $\pm$30-minute window heading to the same zone.
* **Live Dashboard Cards**: Displays current group capacity (e.g. 2/4 matched with masked avatars), flight timelines, assigned vehicle (Sedan vs SUV), real-time boot capacity bar, and per-person split rates.
* **Instant Actions**: "Join Group" with luggage confirmation or "Create New Pool" with custom settings.

### 3. Live Coordination Hub & Dashboard (`/dashboard`)
* **Active Countdown Timer**: Real-time ticking timer counting down to flight touchdown and meet-up window.
* **Designated Meeting Points**: Shows assigned curbside pickup pillars (*e.g., “Pillar No. 3, Outside Arrival Gate B, Terminal 1”*).
* **Co-Passenger Profile Cards**: Masked privacy names, verified traveler badges, and individual luggage baggage breakdown.
* **Vehicle & Driver Specs**: Assigned vehicle model (e.g. *Maruti Suzuki Dzire Tour* / *Toyota Innova Crysta ZX*), authentic Bihar commercial license plate (`BR 01 ...`), chauffeur name, and fleet rating.
* **Lock vs. Wait Dispatch Toggle**: Toggle between *"Wait for more co-flyers"* to maximize discount or *"Lock & Book Now"* for immediate departure.

### 4. Transparent Fare Splitting & UPI Escrow
* Flat airport rate $\div$ number of passengers = per-person split share.
* Co-passenger payment settlement status table with escrow protection.
* Instant QR payment via UPI (PhonePe, G-Pay, Paytm, BHIM, CRED).

### 5. Temporary Group Coordination Feed (Live Chat)
* One-tap quick status pills (*“🛬 Deboarded at Patna Runway 25”*, *“🧳 Waiting at Baggage Belt 2”*, *“📍 Reached Pillar 3”*, *“🚗 Spotted the Cab”*).
* Interactive real-time messaging between matched flyers.

### 6. Fare & Carbon Calculator (`/estimator`) & Terminal Guide (`/terminal-map`)
* **Estimator**: Interactive simulator for Patna destination zones, passenger splits, and carbon emissions offset.
* **Terminal Guide**: Visual Patna Airport layout featuring Terminal 1 gates, baggage carousels (Belts 1–3), customs exits, and curbside pickup pillars (Pillars 1–8).

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
