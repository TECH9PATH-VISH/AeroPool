import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_POOLS, MOCK_USER_PROFILE, DESTINATION_ZONES, TERMINALS } from '../data/mockData';
import { determineVehicleType, calculateSavings, calculateCO2Saved, getMeetingPointForTerminal } from '../utils/helpers';

const PoolContext = createContext();

export const PoolProvider = ({ children }) => {
  // Load pools from localStorage or fallback
  const [pools, setPools] = useState(() => {
    try {
      const saved = localStorage.getItem('aeropool_pools');
      return saved ? JSON.parse(saved) : INITIAL_POOLS;
    } catch (e) {
      return INITIAL_POOLS;
    }
  });

  // Current active pool ID that the user has joined
  const [myActivePoolId, setMyActivePoolId] = useState(() => {
    try {
      const saved = localStorage.getItem('aeropool_active_id');
      return saved || 'pool-cyber-1';
    } catch (e) {
      return 'pool-cyber-1';
    }
  });

  // Active navigation tab: 'book' | 'matches' | 'dashboard' | 'estimator' | 'terminal-map'
  const [activeTab, setActiveTab] = useState('book');

  // Currency toggle: '₹' or '$'
  const [currency, setCurrency] = useState('₹');

  // Search criteria from the booking form
  const [searchCriteria, setSearchCriteria] = useState({
    flightNumber: 'AI-402',
    arrivalDate: new Date().toISOString().split('T')[0],
    arrivalTime: '18:45',
    terminal: 'T3',
    destinationZone: 'tech_park',
    destinationAddress: 'Cyber City Sector V, Building 10, Silicon Plaza',
    luggageTier: 'medium_suitcase',
    passengerCount: 1,
    maxWaitBuffer: 30
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aeropool_pools', JSON.stringify(pools));
      if (myActivePoolId) {
        localStorage.setItem('aeropool_active_id', myActivePoolId);
      } else {
        localStorage.removeItem('aeropool_active_id');
      }
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [pools, myActivePoolId]);

  // Join an existing pool
  const joinPool = (poolId, userCustomData = {}) => {
    const pool = pools.find((p) => p.id === poolId);
    if (!pool) return false;

    if (pool.currentMembers.length >= pool.maxCapacity) {
      showToast('This pool has reached maximum vehicle capacity!', 'error');
      return false;
    }

    const luggageTier = userCustomData.luggageTier || searchCriteria.luggageTier || 'cabin_only';
    const luggageUnits = luggageTier === 'heavy_bags' ? 2.5 : luggageTier === 'medium_suitcase' ? 1.0 : 0.5;

    const newMember = {
      id: MOCK_USER_PROFILE.id,
      name: MOCK_USER_PROFILE.name,
      maskedName: `${MOCK_USER_PROFILE.name.split(' ')[0]} ${MOCK_USER_PROFILE.name.split(' ')[1]?.[0] || ''}. (You)`,
      avatar: MOCK_USER_PROFILE.avatar,
      badge: MOCK_USER_PROFILE.badge,
      flightNumber: userCustomData.flightNumber || searchCriteria.flightNumber || 'AI-402',
      luggageTier,
      luggageDescription: luggageTier === 'heavy_bags' ? '2+ Large Bags' : luggageTier === 'medium_suitcase' ? '1 Standard Suitcase' : 'Backpack / Handbag',
      units: luggageUnits,
      joinedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentStatus: 'pending'
    };

    const updatedMembers = [...pool.currentMembers, newMember];
    const newCount = updatedMembers.length;

    // Recalculate vehicle and fare
    const vehicleInfo = determineVehicleType(updatedMembers);
    const zoneInfo = DESTINATION_ZONES.find((z) => z.id === pool.destinationZone);
    const baseFare = vehicleInfo.type === 'SUV' ? Math.round((zoneInfo?.typicalSoloFare || 1400) * 1.15) : (zoneInfo?.typicalSoloFare || 1400);
    const perPerson = Math.round(baseFare / newCount);
    const savings = calculateSavings(pool.soloTaxiFare, perPerson);
    const co2 = calculateCO2Saved(zoneInfo?.distanceKm || 30, newCount);

    const updatedPool = {
      ...pool,
      currentMembers: updatedMembers,
      vehicleType: vehicleInfo.type,
      vehicleModel: vehicleInfo.model,
      totalBaseFare: baseFare,
      currentPerPersonFare: perPerson,
      savingsPercent: savings,
      co2SavedKg: co2,
      chatMessages: [
        ...pool.chatMessages,
        {
          id: `msg-${Date.now()}`,
          senderId: 'system',
          senderName: 'AeroPool Dispatch',
          text: `${newMember.name} joined the pool from flight ${newMember.flightNumber}. Fare dropped to ${currency}${perPerson}/person!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSystem: true
        }
      ]
    };

    setPools((prev) => prev.map((p) => (p.id === poolId ? updatedPool : p)));
    setMyActivePoolId(poolId);
    showToast(`Successfully joined "${pool.name}"! Instant saving: ${savings}%`, 'success');
    setActiveTab('dashboard');
    return true;
  };

  // Leave active pool
  const leavePool = (poolId) => {
    const pool = pools.find((p) => p.id === poolId);
    if (!pool) return;

    const remainingMembers = pool.currentMembers.filter((m) => m.id !== MOCK_USER_PROFILE.id);
    if (remainingMembers.length === 0) {
      // If pool becomes empty, keep or remove
      setPools((prev) => prev.filter((p) => p.id !== poolId));
    } else {
      const vehicleInfo = determineVehicleType(remainingMembers);
      const zoneInfo = DESTINATION_ZONES.find((z) => z.id === pool.destinationZone);
      const baseFare = vehicleInfo.type === 'SUV' ? Math.round((zoneInfo?.typicalSoloFare || 1400) * 1.15) : (zoneInfo?.typicalSoloFare || 1400);
      const perPerson = Math.round(baseFare / remainingMembers.length);

      const updatedPool = {
        ...pool,
        currentMembers: remainingMembers,
        vehicleType: vehicleInfo.type,
        vehicleModel: vehicleInfo.model,
        currentPerPersonFare: perPerson,
        savingsPercent: calculateSavings(pool.soloTaxiFare, perPerson)
      };
      setPools((prev) => prev.map((p) => (p.id === poolId ? updatedPool : p)));
    }

    if (myActivePoolId === poolId) {
      setMyActivePoolId(null);
    }
    showToast('Left airport cab pool.', 'info');
  };

  // Create a brand new pool
  const createPool = (formData) => {
    const zone = DESTINATION_ZONES.find((z) => z.id === formData.destinationZone) || DESTINATION_ZONES[0];
    const initialUnits = formData.luggageTier === 'heavy_bags' ? 2.5 : formData.luggageTier === 'medium_suitcase' ? 1.0 : 0.5;

    const creator = {
      id: MOCK_USER_PROFILE.id,
      name: MOCK_USER_PROFILE.name,
      maskedName: `${MOCK_USER_PROFILE.name.split(' ')[0]} ${MOCK_USER_PROFILE.name.split(' ')[1]?.[0] || ''}. (You)`,
      avatar: MOCK_USER_PROFILE.avatar,
      badge: MOCK_USER_PROFILE.badge,
      flightNumber: formData.flightNumber || 'AI-402',
      luggageTier: formData.luggageTier,
      luggageDescription: formData.luggageTier === 'heavy_bags' ? '2+ Large Bags' : formData.luggageTier === 'medium_suitcase' ? '1 Suitcase' : 'Backpack only',
      units: initialUnits,
      joinedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentStatus: 'pending'
    };

    const vehicleInfo = determineVehicleType([creator]);
    const baseFare = vehicleInfo.type === 'SUV' ? Math.round(zone.typicalSoloFare * 1.15) : zone.typicalSoloFare;

    const newPoolId = `pool-${Date.now()}`;
    const newPool = {
      id: newPoolId,
      name: formData.poolName || `${zone.name.split('/')[0].trim()} Airport Express`,
      destinationZone: zone.id,
      destinationAddress: formData.destinationAddress || zone.popularLandmarks[0],
      terminal: formData.terminal || 'T3',
      meetingPoint: getMeetingPointForTerminal(formData.terminal || 'T3'),
      flightArrivalWindow: `${formData.arrivalTime || '18:45'} ± 30m`,
      landingTimestamp: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      status: 'matching',
      maxCapacity: 4,
      currentMembers: [creator],
      vehicleType: vehicleInfo.type,
      vehicleModel: vehicleInfo.model,
      vehiclePlate: 'DL 05 TC ' + Math.floor(1000 + Math.random() * 9000),
      driverName: 'Surinder Pal (Airport Fleet Pro)',
      driverRating: 4.92,
      totalBaseFare: baseFare,
      soloTaxiFare: zone.typicalSoloFare,
      currentPerPersonFare: baseFare,
      targetPerPersonFare: Math.round(baseFare / 4),
      savingsPercent: 0,
      maxWaitBufferMins: parseInt(formData.maxWaitBuffer, 10) || 30,
      co2SavedKg: 0,
      chatMessages: [
        {
          id: `msg-${Date.now()}`,
          senderId: 'system',
          senderName: 'AeroPool Dispatch',
          text: `Pool initiated by ${creator.name}. Open for co-passengers landing at ${formData.terminal || 'T3'} headed to ${zone.name}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSystem: true
        }
      ]
    };

    setPools((prev) => [newPool, ...prev]);
    setMyActivePoolId(newPoolId);
    showToast(`Pool "${newPool.name}" created! Now matching other incoming flyers.`, 'success');
    setActiveTab('dashboard');
    return newPoolId;
  };

  // Toggle Lock status ("Wait for more passengers" vs "Lock & Book Now")
  const togglePoolLock = (poolId) => {
    setPools((prev) =>
      prev.map((pool) => {
        if (pool.id !== poolId) return pool;
        const newStatus = pool.status === 'locked' ? 'matching' : 'locked';
        const msg =
          newStatus === 'locked'
            ? 'Pool LOCKED! Ride confirmed. Driver dispatched to airport meeting point.'
            : 'Pool UNLOCKED. Now accepting more co-travelers to split fare further.';

        return {
          ...pool,
          status: newStatus,
          chatMessages: [
            ...pool.chatMessages,
            {
              id: `msg-${Date.now()}`,
              senderId: 'system',
              senderName: 'AeroPool Dispatch',
              text: msg,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isSystem: true
            }
          ]
        };
      })
    );
    showToast('Pool status updated successfully!', 'info');
  };

  // Send interactive chat message
  const sendChatMessage = (poolId, text) => {
    if (!text || !text.trim()) return;

    setPools((prev) =>
      prev.map((pool) => {
        if (pool.id !== poolId) return pool;
        const newMessage = {
          id: `msg-${Date.now()}-${Math.random()}`,
          senderId: MOCK_USER_PROFILE.id,
          senderName: MOCK_USER_PROFILE.name,
          text: text.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSystem: false
        };
        return {
          ...pool,
          chatMessages: [...pool.chatMessages, newMessage]
        };
      })
    );
  };

  // Toggle payment status for user in pool
  const markPaymentSettled = (poolId, userId) => {
    setPools((prev) =>
      prev.map((pool) => {
        if (pool.id !== poolId) return pool;
        const updatedMembers = pool.currentMembers.map((m) => {
          if (m.id === userId) {
            return {
              ...m,
              paymentStatus: m.paymentStatus === 'paid' ? 'pending' : 'paid'
            };
          }
          return m;
        });
        return { ...pool, currentMembers: updatedMembers };
      })
    );
    showToast('Payment status updated!', 'success');
  };

  // Reset to default mock data
  const resetToMockData = () => {
    setPools(INITIAL_POOLS);
    setMyActivePoolId('pool-cyber-1');
    localStorage.removeItem('aeropool_pools');
    localStorage.removeItem('aeropool_active_id');
    showToast('Reset to demo data successfully.', 'info');
  };

  const activePool = pools.find((p) => p.id === myActivePoolId) || pools[0] || null;

  return (
    <PoolContext.Provider
      value={{
        pools,
        myActivePoolId,
        setMyActivePoolId,
        activePool,
        activeTab,
        setActiveTab,
        currency,
        setCurrency,
        searchCriteria,
        setSearchCriteria,
        joinPool,
        leavePool,
        createPool,
        togglePoolLock,
        sendChatMessage,
        markPaymentSettled,
        resetToMockData,
        toast,
        showToast,
        closeToast,
        userProfile: MOCK_USER_PROFILE
      }}
    >
      {children}
    </PoolContext.Provider>
  );
};

export const usePool = () => useContext(PoolContext);
