/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { MediaItem } from '../../../types';
import { Search, Upload, Check, Trash2, Image as ImageIcon, X, Calendar, HardDrive } from 'lucide-react';

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (mediaUrl: string) => void;
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
}) => {
  const { cmsData, addMediaItem, deleteMediaItem } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mediaList: MediaItem[] = cmsData.mediaLibrary || [];

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

    if (!allowedTypes.includes(file.type)) {
      setErrorMsg('Unsupported file format. Please upload JPG, PNG, WEBP, or SVG.');
      setTimeout(() => setErrorMsg(null), 4000);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image size too large. Maximum file size is 10MB.');
      setTimeout(() => setErrorMsg(null), 4000);
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
      setTimeout(() => setErrorMsg(null), 4000);
    };
    reader.readAsDataURL(file);
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0B1F3A] border-2 border-[#D4AF37] rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-white text-lg">Select from Media Library</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Filter */}
        <div className="p-4 bg-slate-900/60 border-b border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search media items by name..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <label className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-[#0B1F3A] font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all shrink-0">
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload New Image'}</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Media Grid */}
        <div className="p-6 flex-1 overflow-y-auto">
          {filteredMedia.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <ImageIcon className="w-12 h-12 mx-auto text-slate-600" />
              <p className="text-xs font-semibold">No media items found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl bg-slate-900/90 border border-white/10 overflow-hidden hover:border-[#D4AF37] transition-all flex flex-col shadow-lg"
                >
                  <div className="relative h-32 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectImage(item.url);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-[11px] shadow-md flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Select</span>
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (window.confirm(`Delete ${item.name} from Media Library?`)) {
                            await deleteMediaItem(item.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white shadow-md"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 flex-1 flex flex-col justify-between space-y-1">
                    <p className="text-[11px] font-bold text-slate-200 truncate">{item.name}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{formatBytes(item.size || 0)}</span>
                      <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
