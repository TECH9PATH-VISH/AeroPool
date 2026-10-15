import React, { useState } from 'react';
import { formatCurrency } from '../utils/helpers';
import {
  X,
  QrCode,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  CreditCard,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

const ESCROW_UPI_ID = '8271665209@ptyes';
const ESCROW_NAME = 'AeroPool Mobility Transit Escrow';

export const UpiPaymentModal = ({ isOpen, onClose, pool, perPersonFare, onPaymentSuccess }) => {
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [step, setStep] = useState('pay'); // 'pay' | 'confirm'

  if (!isOpen) return null;

  const transactionNote = `AeroPool-${pool.id.substring(0, 14)}`;
  const upiIntentUrl = `upi://pay?pa=${ESCROW_UPI_ID}&pn=${encodeURIComponent(
    ESCROW_NAME
  )}&am=${perPersonFare}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    upiIntentUrl
  )}&format=svg`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(ESCROW_UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmPayment = (e) => {
    e?.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onPaymentSuccess({
        utr: utrNumber || `UTR-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        amount: perPersonFare,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-navy-900 via-navy-800 to-sky-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-sky-300 block">
                AeroPool Transit Escrow
              </span>
              <h3 className="text-base font-bold">Split Cab Fare Payment</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-navy-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[82vh] overflow-y-auto">
          
          {/* Amount Callout */}
          <div className="bg-gradient-to-br from-emerald-50 to-sky-50 border border-emerald-200 rounded-2xl p-4 text-center">
            <span className="text-xs font-semibold text-slate-600 block">Your Split Share to Pay:</span>
            <div className="text-3xl font-black text-navy-900 mt-1">
              ₹{perPersonFare.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-emerald-700 mt-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Held in escrow until airport pillar meet-up</span>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center text-center space-y-3">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
              <img
                src={qrCodeUrl}
                alt="AeroPool UPI QR Code"
                className="w-44 h-44 object-contain"
                loading="eager"
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
              Scan with <strong>Google Pay, PhonePe, Paytm, CRED or BHIM</strong> to transfer exactly ₹{perPersonFare}.
            </p>

            {/* UPI ID Copy Bar */}
            <div className="w-full bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between text-xs font-mono">
              <div className="text-left truncate pr-2">
                <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">
                  Escrow UPI VPA:
                </span>
                <span className="font-bold text-navy-900">{ESCROW_UPI_ID}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold transition-all text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Direct Pay button for Mobile Browsers */}
            <a
              href={upiIntentUrl}
              className="w-full py-2.5 px-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-all sm:hidden"
            >
              <Smartphone className="w-4 h-4 text-sky-400" />
              <span>Open Installed UPI App</span>
            </a>
          </div>

          {/* Verification Step: UTR / Reference */}
          <form onSubmit={handleConfirmPayment} className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between mb-1">
                <span>12-Digit UPI Ref / UTR No. (Optional):</span>
                <span className="text-[10px] text-slate-400 font-normal">From your UPI app receipt</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 4289 1928 3810"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                maxLength={20}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="bg-sky-50 border border-sky-200/80 rounded-xl p-3 text-[11px] text-slate-600 leading-relaxed flex items-start space-x-2">
              <Clock className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
              <span>
                Once collected into <strong>{ESCROW_UPI_ID}</strong>, the full fare of ₹{pool.totalBaseFare} will be paid to chauffeur <strong>{pool.driverName.split(' ')[0]}</strong> ({pool.vehiclePlate}) at the meeting point.
              </span>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2"
            >
              {isVerifying ? (
                <span>Confirming Escrow Deposit...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>I Have Sent ₹{perPersonFare} — Confirm My Seat</span>
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
