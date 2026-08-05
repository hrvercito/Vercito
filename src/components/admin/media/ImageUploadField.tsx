/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Trash2, RotateCcw, Eye, FolderOpen, Link2, Check, AlertCircle } from 'lucide-react';
import { ImageCropperModal } from './ImageCropperModal';
import { ImageConfirmDeleteModal } from './ImageConfirmDeleteModal';
import { ImagePreviewModal } from './ImagePreviewModal';
import { MediaLibraryModal } from './MediaLibraryModal';
import { useCMS } from '../../../context/CMSContext';
import { MediaItem } from '../../../types';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  aspectRatio?: '16:9' | '1:1' | '4:3' | 'free';
  defaultImage?: string;
  allowSvg?: boolean;
  category?: 'hero' | 'university' | 'destination' | 'scholarship' | 'blog' | 'profile' | 'general';
  className?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  aspectRatio = '16:9',
  defaultImage,
  allowSvg = true,
  category = 'general',
  className = '',
}) => {
  const { addMediaItem } = useCMS();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [cropperSrc, setCropperSrc] = useState<string | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Validate and handle file input selection
  const processFile = (file: File) => {
    setErrorMsg(null);

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowSvg) {
      allowedTypes.push('image/svg+xml');
    }

    if (!allowedTypes.includes(file.type)) {
      setErrorMsg('Unsupported file format. Please select JPG, JPEG, PNG, WEBP, or SVG.');
      setTimeout(() => setErrorMsg(null), 5000);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image size too large (max 10MB). Please select a smaller image.');
      setTimeout(() => setErrorMsg(null), 5000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        if (file.type === 'image/svg+xml') {
          // Direct update for SVG
          handleFinalSave(dataUrl, file.name, file.size, file.type);
        } else {
          // Open cropper for bitmap image
          setCropperSrc(dataUrl);
        }
      }
    };
    reader.onerror = () => {
      setErrorMsg('Image upload failed. Please try again.');
      setTimeout(() => setErrorMsg(null), 5000);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Finalize image save & add to Media Library
  const handleFinalSave = async (
    dataUrl: string,
    fileName: string = 'uploaded-image.webp',
    fileSize: number = 100000,
    fileType: string = 'image/webp'
  ) => {
    onChange(dataUrl);

    // Save to Media Library
    const newMedia: MediaItem = {
      id: 'media-' + Date.now(),
      name: fileName,
      url: dataUrl,
      size: fileSize,
      type: fileType,
      uploadedAt: new Date().toISOString(),
      category: category as any,
    };
    await addMediaItem(newMedia);
    setCropperSrc(null);
  };

  const handleCropComplete = (croppedUrl: string) => {
    handleFinalSave(croppedUrl);
  };

  const handleRemoveImage = () => {
    onChange('');
    setShowConfirmDelete(false);
  };

  const handleRestoreDefault = () => {
    if (defaultImage) {
      onChange(defaultImage);
    }
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-200">{label}</label>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-[11px] font-semibold flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Image Container & Drag Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group relative rounded-2xl bg-slate-900 border-2 transition-all overflow-hidden flex flex-col justify-center items-center p-2 ${
          isDragOver ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/15 hover:border-[#D4AF37]/70'
        }`}
      >
        {value ? (
          <div className="relative w-full h-44 sm:h-52 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={value}
              alt={label}
              className={`w-full h-full ${aspectRatio === '1:1' ? 'object-contain p-2' : 'object-cover'}`}
            />

            {/* Hover / Permanent Camera Overlay */}
            <div className="absolute inset-0 bg-slate-950/60 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-[#0B1F3A] border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B1F3A] font-extrabold text-xs flex items-center gap-2 shadow-xl transition-all"
              >
                <Camera className="w-4 h-4 shrink-0" />
                <span>📷 Change Image</span>
              </button>

              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowMediaLibrary(true)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center gap-1"
                  title="Select from Media Library"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="hidden sm:inline">Library</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowFullPreview(true)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center gap-1"
                  title="View Full Image"
                >
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">View</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowConfirmDelete(true)}
                  className="px-2.5 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-[11px] font-semibold flex items-center gap-1"
                  title="Remove Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              </div>
            </div>

            {/* Mobile Permanent Floating Camera Badge */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="sm:hidden absolute bottom-2 right-2 px-3 py-1.5 rounded-xl bg-[#0B1F3A]/90 border border-[#D4AF37] text-[#D4AF37] font-extrabold text-[11px] flex items-center gap-1.5 shadow-lg backdrop-blur-md"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Change</span>
            </button>
          </div>
        ) : (
          /* Empty Upload Dropzone */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-40 sm:h-48 border-2 border-dashed border-white/20 hover:border-[#D4AF37] rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer text-center space-y-2 transition-all bg-slate-950/40"
          >
            <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">📷 Upload or Change Image</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Tap or drag & drop (JPG, PNG, WEBP, SVG max 10MB)
              </p>
            </div>
          </div>
        )}

        {/* Hidden File Input with Camera support for mobile devices */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg,image/svg+xml"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Action Toolbar below image */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-[11px] font-bold flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Upload Image</span>
          </button>

          <button
            type="button"
            onClick={() => setShowMediaLibrary(true)}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-[11px] font-bold flex items-center gap-1.5"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Media Library</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {defaultImage && (
            <button
              type="button"
              onClick={handleRestoreDefault}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 text-[11px] font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restore Default</span>
            </button>
          )}

          {value && (
            <button
              type="button"
              onClick={() => setShowConfirmDelete(true)}
              className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-[11px] font-medium flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Remove</span>
            </button>
          )}
        </div>
      </div>



      {/* Cropper Modal */}
      {cropperSrc && (
        <ImageCropperModal
          imageSrc={cropperSrc}
          aspectRatioPreset={aspectRatio}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropperSrc(null)}
        />
      )}

      {/* Remove Confirmation Modal */}
      <ImageConfirmDeleteModal
        isOpen={showConfirmDelete}
        onConfirm={handleRemoveImage}
        onCancel={() => setShowConfirmDelete(false)}
      />

      {/* Full Preview Modal */}
      <ImagePreviewModal
        isOpen={showFullPreview}
        imageSrc={value}
        onClose={() => setShowFullPreview(false)}
        title={label}
      />

      {/* Media Library Selector Modal */}
      <MediaLibraryModal
        isOpen={showMediaLibrary}
        onClose={() => setShowMediaLibrary(false)}
        onSelectImage={(selectedUrl) => {
          onChange(selectedUrl);
        }}
      />
    </div>
  );
};
