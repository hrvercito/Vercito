/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const WHATSAPP_NUMBER = '8801700000000'; // Official VERCITO WhatsApp Line placeholder

  const sendWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-4 w-80 sm:w-88 rounded-2xl bg-[#0B1F3A] text-white border border-[#D4AF37]/30 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#0B1F3A] to-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg font-bold">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white flex items-center gap-1">
                    <span>VERCITO WhatsApp</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-slate-300">Gulshan Admissions Team • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3 bg-[#071426]">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 leading-relaxed">
                👋 Assalamu Alaikum! Welcome to VERCITO. How can our European Education Counselors assist you today?
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Quick Actions:</p>
                <button
                  onClick={() =>
                    sendWhatsApp(
                      'Hello VERCITO! I want to know about Italy DSU Scholarship (€7,000 grant + €0 tuition).'
                    )
                  }
                  className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>🇮🇹 Inquiry: Italy DSU Scholarship</span>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                </button>

                <button
                  onClick={() =>
                    sendWhatsApp(
                      'Hello VERCITO! Please guide me regarding German Public Universities & Blocked Account.'
                    )
                  }
                  className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>🇩🇪 Inquiry: Germany Blocked Account</span>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                </button>

                <button
                  onClick={() =>
                    sendWhatsApp(
                      'Hello VERCITO! I would like to book a 1-on-1 counseling session in Gulshan, Dhaka.'
                    )
                  }
                  className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>📍 Book Gulshan 2 Counseling</span>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>

              {/* Custom Input */}
              <div className="pt-2 flex gap-1.5">
                <input
                  type="text"
                  placeholder="Type your question..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  onClick={() => {
                    if (customMsg.trim()) sendWhatsApp(customMsg);
                  }}
                  className="px-3 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full bg-emerald-500 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative group"
        aria-label="Open WhatsApp Support"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-[#0B1F3A]" />
      </button>
    </div>
  );
};
