import React, { useState, useRef, useEffect } from 'react';
import { usePool } from '../context/PoolContext';
import { Send, Sparkles, ShieldCheck, MapPin, CheckCheck, Clock, Luggage } from 'lucide-react';

export const LiveChatFeed = ({ pool }) => {
  const { sendChatMessage, userProfile } = usePool();
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef(null);

  const quickPills = [
    { label: '🛬 Just deboarded flight', text: 'Just stepped off the aircraft. Heading towards baggage claim now!' },
    { label: '🧳 Waiting at Baggage Carousel', text: 'Waiting for my bags at the carousel. Should be done in 10 mins.' },
    { label: '📍 Reached Airport Pillar', text: `I have arrived at ${pool.meetingPoint.split(',')[0]}! Looking out for everyone.` },
    { label: '⏰ Small delay (~10m)', text: 'Flight took a longer taxi to gate. Delayed by ~10 minutes, thanks for waiting!' },
    { label: '🚗 Spotted the Cab', text: `I see our cab (${pool.vehiclePlate || 'Airport Bay'}) near the curb!` }
  ];

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [pool.chatMessages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(pool.id, inputText);
    setInputText('');
  };

  const handleQuickSend = (text) => {
    sendChatMessage(pool.id, text);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card flex flex-col h-[520px] overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 bg-navy-900 text-white flex items-center justify-between border-b border-navy-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="text-sm font-bold tracking-tight">Airport Pool Live Coordination</h4>
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Meeting Point: <strong className="text-sky-300">{pool.meetingPoint.split(',')[0]}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-1.5 text-xs bg-navy-800/80 px-2.5 py-1 rounded-full border border-navy-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] text-slate-300 font-medium">Encrypted & Masked</span>
        </div>
      </div>

      {/* Quick Action Pill Bar */}
      <div className="p-2 bg-slate-100 border-b border-slate-200 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center space-x-2">
        <span className="text-[10px] uppercase font-bold text-slate-400 pl-1 flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-sky-500" />
          <span>Quick:</span>
        </span>
        {quickPills.map((pill, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleQuickSend(pill.text)}
            className="text-xs bg-white hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 transition-all font-medium flex-shrink-0 shadow-2xs"
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
        {pool.chatMessages.map((msg) => {
          if (msg.isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <div className="bg-sky-50/90 border border-sky-200/70 text-sky-900 text-xs px-3 py-1.5 rounded-xl text-center max-w-md shadow-2xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                  <span className="font-medium text-[11px] leading-relaxed">{msg.text}</span>
                  <span className="text-[10px] text-sky-500 pl-1">{msg.timestamp}</span>
                </div>
              </div>
            );
          }

          const isMe = msg.senderId === userProfile.id;

          return (
            <div key={msg.id} className={`flex items-end space-x-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
              {!isMe && (
                <div className="w-7 h-7 rounded-full bg-navy-800 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-2xs">
                  {msg.senderName?.[0] || 'U'}
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-2xs text-xs ${
                  isMe
                    ? 'bg-sky-500 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                }`}
              >
                {!isMe && (
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="font-bold text-[11px] text-navy-900">{msg.senderName}</span>
                    <span className="text-[9px] text-slate-400">Co-Flyer</span>
                  </div>
                )}

                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                <div
                  className={`flex items-center justify-end space-x-1 mt-1 text-[10px] ${
                    isMe ? 'text-sky-100' : 'text-slate-400'
                  }`}
                >
                  <Clock className="w-2.5 h-2.5" />
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-white ml-0.5" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Box Form */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Message co-passengers (e.g. 'At Belt 4 with red suitcase')..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-md shadow-sky-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
