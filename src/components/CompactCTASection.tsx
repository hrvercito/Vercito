/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Send, Calendar, Sparkles, ShieldCheck } from 'lucide-react';

interface CompactCTASectionProps {
  onOpenApplication?: () => void;
  onOpenCounseling?: () => void;
}

export const CompactCTASection: React.FC<CompactCTASectionProps> = ({
  onOpenApplication,
  onOpenCounseling,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-[#0B1F3A] via-[#071B36] to-[#041122] text-white border-t border-white/10 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          <span>Ready to Study Abroad?</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
          Start Your Global Education Journey with Vercito Today
        </h2>

        <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
          Get personalized admission guidance, tuition fee waiver assessment, and step-by-step visa assistance from certified international education experts.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {onOpenApplication && (
            <button
              onClick={onOpenApplication}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#e2bd44] text-[#0B1F3A] font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Apply Online Now</span>
            </button>
          )}

          {onOpenCounseling && (
            <button
              onClick={onOpenCounseling}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Book Free Counseling</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
