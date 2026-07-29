/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { VercitoLogo } from './VercitoLogo';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Initializing VERCITO Higher Education Portal...',
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1F3A] text-white p-6 overflow-hidden select-none">
      {/* Background Animated Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-6">
        {/* Animated Emblem Frame */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative p-6 rounded-3xl bg-slate-900/80 border border-[#D4AF37]/40 shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute -top-3 -right-3 bg-[#D4AF37] text-[#0B1F3A] p-1.5 rounded-xl shadow-lg animate-bounce">
            <Sparkles className="w-4 h-4 font-bold" />
          </div>
          <VercitoLogo variant="full" size="lg" isDarkBg={true} />
        </motion.div>

        {/* Loading Indicator */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
            <span className="flex items-center gap-1 text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4" />
              <span>VERCITO Global Portal</span>
            </span>
            <span className="font-mono text-[11px] text-amber-200">2026 Intake</span>
          </div>

          {/* Animated Gold Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-white/10 p-0.5">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="h-full w-2/3 bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#D4AF37] rounded-full shadow-lg"
            />
          </div>

          <p className="text-xs text-slate-300 font-medium tracking-wide animate-pulse pt-1">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
