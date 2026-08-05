/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { MediaItem } from '../../../types';
import {
  FolderOpen,
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  Eye,
  Image as ImageIcon,
  HardDrive,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { ImagePreviewModal } from '../media/ImagePreviewModal';
import { ImageConfirmDeleteModal } from '../media/ImageConfirmDeleteModal';

export const MediaLibraryManager: React.FC = () => {
  const { cmsData, addMediaItem, deleteMediaItem } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mediaList: MediaItem[] = cmsData.mediaLibrary || [];

  const filteredMedia = mediaList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/svg+xml'];

    if (!allowedTypes.includes(file.type)) {
      setErrorMsg('Unsupported file format. Please upload JPG, JPEG, PNG, WEBP, or SVG.');
      setTimeout(() => setErrorMsg(null), 5000);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size too large. Maximum file size is 10MB.');
      setTimeout(() => setErrorMsg(null), 5000);
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const newItem: MediaItem = {
          id: 'media-' + Date.now(),
          name: file.name,
          url: dataUrl,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
          category: 'general',
        };
        await addMediaItem(newItem);
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Image upload failed. Please try again.');
      setIsUploading(false);
      setTimeout(() => setErrorMsg(null), 5000);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatBytes = (bytes: number) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-[#D4AF37]" />
            <span>Media Library ({mediaList.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Upload, search, manage, and reuse image assets across all website CMS sections.
          </p>
        </div>

        <label className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-[#0B1F3A] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg,image/svg+xml"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search images by name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-white/10 overflow-x-auto">
          {['all', 'university', 'destination', 'scholarship', 'blog', 'profile'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-[#0B1F3A]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
          <ImageIcon className="w-12 h-12 mx-auto text-slate-600" />
          <p className="text-xs font-semibold text-slate-400">
            No media assets found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-slate-900 border border-white/10 overflow-hidden hover:border-[#D4AF37] transition-all flex flex-col shadow-xl"
            >
              <div className="relative h-36 sm:h-40 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  <button
                    type="button"
                    onClick={() => setPreviewUrl(item.url)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-sky-400 shadow-md"
                    title="View Image"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    className="p-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold shadow-md"
                    title="Copy Link"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white shadow-md"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-900 flex-1 flex flex-col justify-between space-y-2 border-t border-white/5">
                <p className="text-xs font-bold text-slate-200 truncate">{item.name}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <HardDrive className="w-3 h-3 text-[#D4AF37]" />
                    <span>{formatBytes(item.size)}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Preview */}
      {previewUrl && (
        <ImagePreviewModal
          imageSrc={previewUrl}
          isOpen={!!previewUrl}
          onClose={() => setPreviewUrl(null)}
        />
      )}

      {/* Delete Confirmation */}
      <ImageConfirmDeleteModal
        isOpen={!!deleteTarget}
        onConfirm={async () => {
          if (deleteTarget) {
            await deleteMediaItem(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
        message={`Are you sure you want to delete ${deleteTarget?.name || 'this image'} from the Media Library?`}
      />
    </div>
  );
};
