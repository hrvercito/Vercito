/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { UniversityPartner } from '../../../types';
import { ImageUploadField } from '../media/ImageUploadField';
import {
  Building2,
  Plus,
  Trash2,
  Edit2,
  Save,
  Search,
  Globe,
  Award,
  Check,
  X,
  ExternalLink,
  DollarSign
} from 'lucide-react';

export const UniversitiesEditor: React.FC = () => {
  const { cmsData, updateUniversities, isSaving } = useCMS();
  const [universities, setUniversities] = useState<UniversityPartner[]>(cmsData.universities || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUni, setEditingUni] = useState<UniversityPartner | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Sync state when cmsData updates
  React.useEffect(() => {
    setUniversities(cmsData.universities || []);
  }, [cmsData.universities]);

  const filteredUnis = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveAll = async (updatedList: UniversityPartner[]) => {
    setUniversities(updatedList);
    await updateUniversities(updatedList);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this university from the CMS database?')) {
      const updated = universities.filter((u) => u.id !== id);
      await handleSaveAll(updated);
    }
  };

  const handleSaveSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUni) return;

    let updatedList: UniversityPartner[];
    if (isAddingNew) {
      updatedList = [editingUni, ...universities];
    } else {
      updatedList = universities.map((u) => (u.id === editingUni.id ? editingUni : u));
    }

    await handleSaveAll(updatedList);
    setEditingUni(null);
    setIsAddingNew(false);
  };

  const startNewUniversity = () => {
    const newUni: UniversityPartner = {
      id: 'uni-' + Date.now(),
      name: 'New Partner University',
      country: 'Italy',
      city: 'Milan',
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=200',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
      ranking: 150,
      established: 1980,
      type: 'Public',
      featuredPrograms: ['M.Sc. Computer Engineering', 'M.Sc. International Business'],
      tuitionFeePerYearEUR: 2500,
      scholarshipsOffered: ['DSU Regional Grant (100% Fee Waiver + €7,000 Stipend)'],
      englishWaiverPossible: true,
      intakes: ['September (Autumn)', 'February (Spring)'],
      applicationDeadline: '30 May 2026',
      durationYears: '2 Years',
      requiredDocuments: ['Passport', 'Bachelor Transcript', 'CV', 'SOP'],
      programLevels: ["Master's"],
      englishRequirementTypes: ['MOI Accepted', 'IELTS Required'],
      overview: 'Top-ranked public university offering tuition-free higher education for international students.',
      enabled: true,
    };
    setEditingUni(newUni);
    setIsAddingNew(true);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#D4AF37]" />
            <span>Manage Universities ({universities.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Add, update, or edit top partner universities, tuition fees, rankings, and scholarship eligibility stored in Cloud Firestore.
          </p>
        </div>

        <button
          onClick={startNewUniversity}
          className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-[#0B1F3A] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New University</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search universities by name, country, or city..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
        />
      </div>

      {/* Modal / Inline Editor for Single University */}
      {editingUni && (
        <div className="p-6 rounded-2xl bg-slate-900 border-2 border-[#D4AF37] shadow-2xl space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-serif text-lg font-bold text-[#D4AF37] flex items-center gap-2">
              <Edit2 className="w-5 h-5" />
              <span>{isAddingNew ? 'Add New University' : 'Edit University Details'}</span>
            </h3>
            <button
              onClick={() => {
                setEditingUni(null);
                setIsAddingNew(false);
              }}
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveSingle} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">University Name *</label>
                <input
                  type="text"
                  required
                  value={editingUni.name}
                  onChange={(e) => setEditingUni({ ...editingUni, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Country *</label>
                <input
                  type="text"
                  required
                  value={editingUni.country}
                  onChange={(e) => setEditingUni({ ...editingUni, country: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={editingUni.city}
                  onChange={(e) => setEditingUni({ ...editingUni, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">QS World Ranking</label>
                <input
                  type="number"
                  value={editingUni.ranking || ''}
                  onChange={(e) => setEditingUni({ ...editingUni, ranking: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Institution Type</label>
                <select
                  value={editingUni.type}
                  onChange={(e) => setEditingUni({ ...editingUni, type: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                  <option value="Polytechnic">Polytechnic</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Tuition Fee Per Year (€)</label>
                <input
                  type="number"
                  value={editingUni.tuitionFeePerYearEUR || 0}
                  onChange={(e) => setEditingUni({ ...editingUni, tuitionFeePerYearEUR: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
                />
              </div>

              {/* University Logo Upload */}
              <div className="sm:col-span-2 md:col-span-1">
                <ImageUploadField
                  label="University Logo"
                  value={editingUni.logo || ''}
                  onChange={(url) => setEditingUni({ ...editingUni, logo: url })}
                  aspectRatio="1:1"
                  category="university"
                  defaultImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=200"
                />
              </div>

              {/* Cover Image Upload */}
              <div className="sm:col-span-2 md:col-span-2">
                <ImageUploadField
                  label="University Cover Image"
                  value={editingUni.image || ''}
                  onChange={(url) => setEditingUni({ ...editingUni, image: url })}
                  aspectRatio="16:9"
                  category="university"
                  defaultImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Official Website URL</label>
                <input
                  type="url"
                  value={editingUni.officialWebsite || ''}
                  onChange={(e) => setEditingUni({ ...editingUni, officialWebsite: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">English Waiver Possible?</label>
                <select
                  value={editingUni.englishWaiverPossible ? 'true' : 'false'}
                  onChange={(e) => setEditingUni({ ...editingUni, englishWaiverPossible: e.target.value === 'true' })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
                >
                  <option value="true">Yes (MOI Accepted)</option>
                  <option value="false">No (IELTS/TOEFL Mandatory)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Overview & Description</label>
              <textarea
                rows={3}
                value={editingUni.overview || ''}
                onChange={(e) => setEditingUni({ ...editingUni, overview: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setEditingUni(null);
                  setIsAddingNew(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save to Firestore</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* University Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUnis.map((uni) => (
          <div
            key={uni.id}
            className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-[#D4AF37]/50 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={uni.logo || uni.image}
                    alt={uni.name}
                    className="w-10 h-10 rounded-xl object-cover border border-white/20 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white line-clamp-1">{uni.name}</h4>
                    <p className="text-xs text-[#D4AF37] font-medium">
                      📍 {uni.city}, {uni.country}
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-[#D4AF37] font-bold text-[10px] shrink-0 border border-amber-500/30">
                  #{uni.ranking || 'N/A'} QS
                </span>
              </div>

              <div className="text-[11px] text-slate-300 space-y-1">
                <p>Type: <strong>{uni.type}</strong></p>
                <p>Tuition Fee: <strong>€{uni.tuitionFeePerYearEUR}/yr</strong></p>
                <p>English Waiver: <strong>{uni.englishWaiverPossible ? 'Available (MOI)' : 'IELTS Required'}</strong></p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              {uni.officialWebsite && (
                <a
                  href={uni.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-slate-400 hover:text-[#D4AF37] flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Website</span>
                </a>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingUni(uni);
                    setIsAddingNew(false);
                  }}
                  className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-bold"
                  title="Edit University"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(uni.id)}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold"
                  title="Delete University"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
