/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCw, RefreshCw, Check, X, Crop, Move } from 'lucide-react';

interface ImageCropperModalProps {
  imageSrc: string;
  aspectRatioPreset?: '16:9' | '1:1' | '4:3' | 'free';
  onCropComplete: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  imageSrc,
  aspectRatioPreset = '16:9',
  onCropComplete,
  onCancel,
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '4:3' | 'free'>(aspectRatioPreset);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
    };
  }, [imageSrc]);

  // Handle drag pan
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  const handleSaveCrop = () => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Determine target dimensions
    let targetWidth = 1200;
    let targetHeight = 675; // 16:9 default

    if (aspectRatio === '1:1') {
      targetWidth = 800;
      targetHeight = 800;
    } else if (aspectRatio === '4:3') {
      targetWidth = 1024;
      targetHeight = 768;
    } else if (aspectRatio === 'free') {
      targetWidth = img.naturalWidth || 1200;
      targetHeight = img.naturalHeight || 800;
      if (targetWidth > 1400) {
        const ratio = targetHeight / targetWidth;
        targetWidth = 1400;
        targetHeight = Math.round(targetWidth * ratio);
      }
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Fill background
    ctx.fillStyle = '#0B1F3A';
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    ctx.save();
    // Center of canvas
    ctx.translate(targetWidth / 2, targetHeight / 2);
    ctx.rotate((rotation * Math.PI) / 180);

    // Calculate image draw size with zoom
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const targetRatio = targetWidth / targetHeight;

    let drawWidth = targetWidth;
    let drawHeight = targetHeight;

    if (imgRatio > targetRatio) {
      drawHeight = targetHeight;
      drawWidth = targetHeight * imgRatio;
    } else {
      drawWidth = targetWidth;
      drawHeight = targetWidth / imgRatio;
    }

    drawWidth *= zoom;
    drawHeight *= zoom;

    // Apply offsets
    const drawX = -drawWidth / 2 + offset.x * (targetWidth / 400);
    const drawY = -drawHeight / 2 + offset.y * (targetHeight / 300);

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();

    // Export optimized WEBP / JPEG
    const croppedUrl = canvas.toDataURL('image/webp', 0.85);
    onCropComplete(croppedUrl);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0B1F3A] border-2 border-[#D4AF37] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-white text-base sm:text-lg">Crop & Adjust Image</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Crop Stage */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col items-center justify-center overflow-hidden space-y-4">
          <div
            className="relative w-full h-64 sm:h-80 bg-slate-900 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center cursor-move select-none touch-none shadow-inner"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            {/* Guide overlay box */}
            <div
              className={`pointer-events-none absolute border-2 border-[#D4AF37] shadow-[0_0_0_9999px_rgba(11,31,58,0.7)] z-10 transition-all ${
                aspectRatio === '1:1'
                  ? 'w-56 h-56 rounded-2xl'
                  : aspectRatio === '4:3'
                  ? 'w-72 h-54 rounded-2xl'
                  : 'w-full max-w-sm h-48 rounded-2xl'
              }`}
            />

            {/* Transformable Image Container */}
            <div
              className="absolute transition-transform duration-75 ease-out"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom}) rotate(${rotation}deg)`,
              }}
            >
              <img
                src={imageSrc}
                alt="Crop target"
                className="max-w-none max-h-none h-64 sm:h-80 object-contain pointer-events-none"
              />
            </div>

            <div className="absolute bottom-2 left-2 z-20 px-2.5 py-1 rounded-lg bg-slate-900/90 text-[10px] text-slate-300 font-mono border border-white/10 flex items-center gap-1">
              <Move className="w-3 h-3 text-[#D4AF37]" />
              <span>Drag to position</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="w-full space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-white/10">
            {/* Aspect Ratio Selector */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-400">Aspect Ratio:</span>
              <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    aspectRatio === '16:9'
                      ? 'bg-[#D4AF37] text-[#0B1F3A]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  16:9 Banner
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('1:1')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    aspectRatio === '1:1'
                      ? 'bg-[#D4AF37] text-[#0B1F3A]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  1:1 Square
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('free')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    aspectRatio === 'free'
                      ? 'bg-[#D4AF37] text-[#0B1F3A]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Original
                </button>
              </div>
            </div>

            {/* Zoom Slider */}
            <div className="flex items-center gap-3 text-xs">
              <ZoomOut className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <ZoomIn className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="w-10 text-right font-mono text-[11px] text-[#D4AF37]">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            {/* Rotation & Reset */}
            <div className="flex items-center justify-between pt-1 border-t border-white/10">
              <button
                type="button"
                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Rotate 90°</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Crop</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-slate-900 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-bold transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveCrop}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] text-xs font-extrabold flex items-center gap-2 shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Replace Image</span>
          </button>
        </div>
      </div>
    </div>
  );
};
