/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, ExternalLink, Download, Copy, Check } from 'lucide-react';

interface ImagePreviewModalProps {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  imageSrc,
  isOpen,
  onClose,
  title = 'Full Image View',
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !imageSrc) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(imageSrc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0B1F3A] border-2 border-[#D4AF37] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-serif font-bold text-white text-base sm:text-lg">{title}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Copy Image URL</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 flex-1 overflow-auto flex items-center justify-center bg-slate-950/50">
          <img
            src={imageSrc}
            alt="Full Preview"
            className="max-w-full max-h-[70vh] rounded-2xl object-contain border border-white/10 shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};
