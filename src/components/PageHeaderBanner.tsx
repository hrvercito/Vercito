/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface PageHeaderBannerProps {
  title: string;
  subtitle: string;
  category: string;
  onBackToHome: () => void;
}

export const PageHeaderBanner: React.FC<PageHeaderBannerProps> = ({
  title,
  subtitle,
  category,
  onBackToHome,
}) => {
  return (
    <div className="pt-24 sm:pt-28 pb-8 sm:pb-12 bg-gradient-to-b from-[#041122] via-[#071B36] to-[#0B1F3A] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Back button */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <button
              onClick={onBackToHome}
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 font-bold cursor-pointer"
            >
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[#D4AF37] font-semibold">{category}</span>
          </div>

          <button
            onClick={onBackToHome}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all flex items-center gap-1.5 border border-white/10 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-normal mt-2 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
