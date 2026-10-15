import React, { useState } from 'react';
import { usePool } from '../context/PoolContext';
import { formatCurrency } from '../utils/helpers';
import { UpiPaymentModal } from './UpiPaymentModal';
import {
  Receipt,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  DollarSign,
  Wallet,
  Users,
  Split,
  QrCode,
  Truck,
  Car,
  Lock
} from 'lucide-react';

export const FareSplitCard = ({ pool }) => {
  const { currency, userProfile, markPaymentSettled, showToast, sendChatMessage } = usePool();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [isDriverSettled, setIsDriverSettled] = useState(false);

  const myMember = pool.currentMembers.find((m) => m.id === userProfile.id);
  const isMyPaymentDone = myMember?.paymentStatus === 'paid';

  const memberCount = pool.currentMembers.length;
  const baseRate = pool.totalBaseFare;
  const perPerson = Math.round(baseRate / Math.max(1, memberCount));
  const soloFare = pool.soloTaxiFare;
  const savings = Math.max(0, soloFare - perPerson);

  const paidMembersCount = pool.currentMembers.filter((m) => m.paymentStatus === 'paid').length;
  const escrowCollectedAmount = paidMembersCount * perPerson;
  const isEscrowFullyFunded = escrowCollectedAmount >= baseRate;

  const handlePayClick = () => {
    if (selectedMethod === 'upi') {
      setShowUpiModal(true);
    } else {
      markPaymentSettled(pool.id, userProfile.id);
      showToast(
        `Payment of ${formatCurrency(perPerson, currency)} completed via ${
          selectedMethod === 'apple_pay' ? 'Apple/GPay' : 'Card'
        }!`,
        'success'
      );
    }
  };

  const handleUpiSuccess = (receiptData) => {
    markPaymentSettled(pool.id, userProfile.id);
    showToast(`Transferred ₹${perPerson} to 8271665209@ptyes (Ref: ${receiptData.utr.substring(0, 10)})`, 'success');
    sendChatMessage(
      pool.id,
      `✅ Paid my split share (₹${perPerson}) to escrow 8271665209@ptyes. Ref: ${receiptData.utr}`
    );
  };

  const handleSettleDriverFare = () => {
    setIsDriverSettled(true);
    showToast(
      `Full fare of ₹${baseRate} disbursed from escrow (8271665209@ptyes) to chauffeur ${pool.driverName.split(' ')[0]}!`,
      'success'
    );
    sendChatMessage(
      pool.id,
      `🚕 Chauffeur payout complete! ₹${baseRate} disbursed from escrow to driver ${pool.driverName} (${pool.vehiclePlate}).`
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-navy-900">Fare Split & Escrow Settlement</h4>
            <p className="text-xs text-slate-500">Government Flat Airport Rate ÷ {memberCount} Flyers</p>
          </div>
        </div>

        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Save {formatCurrency(savings, currency)} ({pool.savingsPercent || 60}%)
        </span>
      </div>

      {/* Calculations table */}
      <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
        <div className="flex items-center justify-between text-slate-600">
          <span>Airport Meter Base Rate</span>
          <span className="font-semibold text-slate-900">{formatCurrency(pool.soloTaxiFare, currency)}</span>
        </div>

        {pool.vehicleType === 'SUV' && (
          <div className="flex items-center justify-between text-amber-700">
            <span>6-Seater SUV Luggage Upgrade (Fleet Flat)</span>
            <span className="font-semibold">+{formatCurrency(pool.totalBaseFare - pool.soloTaxiFare, currency)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-slate-600">
          <span>Toll Plaza & Airport Entry Access</span>
          <span className="font-semibold text-emerald-600">Included (₹0 Extra)</span>
        </div>

        <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-slate-800">
          <span>Total Driver Payable Fare</span>
          <span className="text-sm">{formatCurrency(baseRate, currency)}</span>
        </div>

        <div className="pt-2 border-t border-dashed border-slate-300 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Split className="w-3.5 h-3.5 text-sky-600" />
            <span className="font-bold text-sky-900">Equal Share per Passenger ({baseRate} ÷ {memberCount})</span>
          </div>
          <span className="text-base font-extrabold text-sky-600">
            {formatCurrency(perPerson, currency)}
          </span>
        </div>
      </div>

      {/* Passenger Split Status list */}
      <div>
        <h5 className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
          <span className="flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Passenger Settlement Status</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {paidMembersCount}/{memberCount} Settled
          </span>
        </h5>

        <div className="space-y-1.5">
          {pool.currentMembers.map((m) => {
            const isMe = m.id === userProfile.id;
            const isPaid = m.paymentStatus === 'paid';
            return (
              <div
                key={m.id}
                className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-200/70"
              >
                <div className="flex items-center space-x-2">
                  <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="font-semibold text-slate-800">
                    {m.name} {isMe ? '(You)' : ''}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="font-bold text-slate-700">{formatCurrency(perPerson, currency)}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center space-x-1 ${
                      isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isPaid ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : null}
                    <span>{isPaid ? 'Escrow Deposited' : 'Pending'}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Escrow Collection & Cab Chauffeur Settlement Box */}
      <div className="bg-gradient-to-r from-navy-900 to-sky-950 text-white rounded-xl p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-1.5 text-xs text-sky-300 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AeroPool Escrow Vault</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Collected at: <strong className="font-mono text-emerald-300">8271665209@ptyes</strong>
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Funds in Vault</span>
            <span className="text-sm font-black text-emerald-400">
              ₹{escrowCollectedAmount} / ₹{baseRate}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Assigned Chauffeur</span>
            <span className="font-bold text-white">{pool.driverName.split('(')[0]}</span>
            <span className="text-[10px] text-sky-400 block font-mono">{pool.vehiclePlate}</span>
          </div>

          <div>
            {isDriverSettled ? (
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 text-xs font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Driver Paid ₹{baseRate}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleSettleDriverFare}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
              >
                <span>Pay Driver Full Fare (₹{baseRate})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pay My Share for Current Passenger */}
      {myMember && (
        <div className="pt-2 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-700">Payment Option:</div>
            <span className="text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full font-bold">
              Direct to 8271665209@ptyes
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'upi', label: 'Instant UPI (QR/App)', icon: QrCode },
              { id: 'apple_pay', label: 'G-Pay / Apple', icon: Wallet },
              { id: 'card', label: 'Corporate Card', icon: CreditCard }
            ].map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-2 rounded-xl border text-center transition-all text-xs font-semibold flex flex-col items-center justify-center space-y-1 ${
                    selectedMethod === method.id
                      ? 'border-sky-500 bg-sky-50 text-sky-800 ring-2 ring-sky-500/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-sky-600" />
                  <span className="text-[11px]">{method.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handlePayClick}
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 ${
              isMyPaymentDone
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/20'
            }`}
          >
            {isMyPaymentDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Share Paid ({formatCurrency(perPerson, currency)}) — Click to Re-verify</span>
              </>
            ) : (
              <>
                <QrCode className="w-4 h-4" />
                <span>Pay ₹{perPerson} via UPI Escrow (8271665209@ptyes)</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Interactive UPI Payment Modal */}
      <UpiPaymentModal
        isOpen={showUpiModal}
        onClose={() => setShowUpiModal(false)}
        pool={pool}
        perPersonFare={perPerson}
        onPaymentSuccess={handleUpiSuccess}
      />

    </div>
  );
};
