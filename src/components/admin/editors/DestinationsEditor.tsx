/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { CountryDestination, UniversityPartner } from '../../../types';
import { Globe, Plus, Trash2, Edit2, Save, Check, Building2, ShieldAlert, Image, ArrowUp, ArrowDown } from 'lucide-react';

export const DestinationsEditor: React.FC = () => {
  const { cmsData, updateDestinations, updateUniversities, isSaving } = useCMS();
  const [destinations, setDestinations] = useState<CountryDestination[]>([...cmsData.destinations]);
  const [universities, setUniversities] = useState<UniversityPartner[]>([...cmsData.universities]);
  const [activeTab, setActiveTab] = useState<'countries' | 'universities'>('countries');

  const [editingCountry, setEditingCountry] = useState<CountryDestination | null>(null);
  const [editingUni, setEditingUni] = useState<UniversityPartner | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Country actions
  const handleSaveCountries = async (updated: CountryDestination[]) => {
    setDestinations(updated);
    const ok = await updateDestinations(updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setEditingCountry(null);
      setIsAddingNew(false);
    }
  };

  const handleSaveUniversities = async (updated: UniversityPartner[]) => {
    setUniversities(updated);
    const ok = await updateUniversities(updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setEditingUni(null);
      setIsAddingNew(false);
    }
  };

  const handleDeleteCountry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      const filtered = destinations.filter((c) => c.id !== id);
      handleSaveCountries(filtered);
    }
  };

  const handleDeleteUni = (id: string) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      const filtered = universities.filter((u) => u.id !== id);
      handleSaveUniversities(filtered);
    }
  };

  const handleAddNewCountry = () => {
    const newDest: CountryDestination = {
      id: `c-${Date.now()}`,
      name: 'New Destination',
      flag: '🇪🇺',
      capital: 'Capital City',
      image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=800',
      tuitionRange: { min: 0, max: 3000 },
      livingCostMonthly: { min: 400, max: 700 },
      workRights: '20 Hours/Week during semester & 40 Hours during vacations',
      postStudyWorkVisa: '18 Months Job Seeking Visa',
      popularMajors: ['Computer Science', 'Automotive Engineering', 'Business Management'],
      topUniversitiesCount: 15,
      scholarshipAvailability: 'High',
      intakeSeasons: ['September / Winter', 'February / Spring'],
      languageRequirement: 'IELTS 6.0 / MOI Waiver Accepted',
      visaSuccessRate: 98,
      keyHighlights: ['Zero or Low Tuition Fees', 'Government Regional Grants Available'],
      overview: 'Excellent study destination for Bangladeshi international students.',
    };
    setEditingCountry(newDest);
    setIsAddingNew(true);
  };

  const handleAddNewUni = () => {
    const newUni: UniversityPartner = {
      id: `u-${Date.now()}`,
      name: 'New Partner University',
      country: 'Italy',
      city: 'Rome',
      logo: 'https://images.unsplash.com/photo-1592280771190-3e292355726d?auto=format&fit=crop&q=80&w=200',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
      ranking: 150,
      established: 1850,
      type: 'Public',
      featuredPrograms: ['M.Sc. Data Science', 'B.Sc. Mechanical Engineering'],
      tuitionFeePerYearEUR: 1000,
      englishWaiverPossible: true,
      scholarshipsOffered: ['100% Regional DSU Grant', 'Merit Waiver'],
    };
    setEditingUni(newUni);
    setIsAddingNew(true);
  };

  const saveEditingCountryForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCountry) return;
    let updated: CountryDestination[];
    if (isAddingNew) {
      updated = [editingCountry, ...destinations];
    } else {
      updated = destinations.map((c) => (c.id === editingCountry.id ? editingCountry : c));
    }
    handleSaveCountries(updated);
  };

  const saveEditingUniForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUni) return;
    let updated: UniversityPartner[];
    if (isAddingNew) {
      updated = [editingUni, ...universities];
    } else {
      updated = universities.map((u) => (u.id === editingUni.id ? editingUni : u));
    }
    handleSaveUniversities(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#D4AF37]" />
            <span>Destinations & Partner Universities CMS</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage country cards, tuition fees, visa rates, and top European university entries.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold">
            <button
              onClick={() => {
                setActiveTab('countries');
                setEditingCountry(null);
                setEditingUni(null);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'countries'
                  ? 'bg-[#0B1F3A] text-[#D4AF37] dark:bg-[#D4AF37] dark:text-[#0B1F3A] shadow-md'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Destinations ({destinations.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('universities');
                setEditingCountry(null);
                setEditingUni(null);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'universities'
                  ? 'bg-[#0B1F3A] text-[#D4AF37] dark:bg-[#D4AF37] dark:text-[#0B1F3A] shadow-md'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Universities ({universities.length})
            </button>
          </div>

          <button
            onClick={activeTab === 'countries' ? handleAddNewCountry : handleAddNewUni}
            className="px-3.5 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs flex items-center gap-1.5 hover:bg-[#E2C044] transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>{activeTab === 'countries' ? 'Add Country' : 'Add University'}</span>
          </button>
        </div>
      </div>

      {/* Editor Modal / Form overlay for Country */}
      {editingCountry && (
        <form onSubmit={saveEditingCountryForm} className="p-6 rounded-2xl bg-slate-900 text-white border border-white/20 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-serif text-lg font-bold text-[#D4AF37]">
              {isAddingNew ? 'Add New Study Destination' : `Editing: ${editingCountry.name}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingCountry(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Country Name</label>
              <input
                type="text"
                required
                value={editingCountry.name}
                onChange={(e) => setEditingCountry({ ...editingCountry, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Flag Emoji</label>
              <input
                type="text"
                required
                value={editingCountry.flag}
                onChange={(e) => setEditingCountry({ ...editingCountry, flag: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Capital City</label>
              <input
                type="text"
                required
                value={editingCountry.capital}
                onChange={(e) => setEditingCountry({ ...editingCountry, capital: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 mb-1 font-semibold">Cover Image URL</label>
              <input
                type="text"
                required
                value={editingCountry.image}
                onChange={(e) => setEditingCountry({ ...editingCountry, image: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Visa Success Rate (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={editingCountry.visaSuccessRate}
                onChange={(e) => setEditingCountry({ ...editingCountry, visaSuccessRate: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Tuition Min (€/yr)</label>
              <input
                type="number"
                value={editingCountry.tuitionRange.min}
                onChange={(e) =>
                  setEditingCountry({
                    ...editingCountry,
                    tuitionRange: { ...editingCountry.tuitionRange, min: Number(e.target.value) },
                  })
                }
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Tuition Max (€/yr)</label>
              <input
                type="number"
                value={editingCountry.tuitionRange.max}
                onChange={(e) =>
                  setEditingCountry({
                    ...editingCountry,
                    tuitionRange: { ...editingCountry.tuitionRange, max: Number(e.target.value) },
                  })
                }
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Scholarship Grant Availability</label>
              <select
                value={editingCountry.scholarshipAvailability}
                onChange={(e) =>
                  setEditingCountry({
                    ...editingCountry,
                    scholarshipAvailability: e.target.value as any,
                  })
                }
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Full Grant Available">Full Grant Available</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-300 mb-1 font-semibold">Overview Description</label>
              <textarea
                rows={2}
                value={editingCountry.overview}
                onChange={(e) => setEditingCountry({ ...editingCountry, overview: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setEditingCountry(null)}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] text-xs font-extrabold hover:bg-[#E2C044]"
            >
              Save Destination
            </button>
          </div>
        </form>
      )}

      {/* Editor Modal for University */}
      {editingUni && (
        <form onSubmit={saveEditingUniForm} className="p-6 rounded-2xl bg-slate-900 text-white border border-white/20 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-serif text-lg font-bold text-[#D4AF37]">
              {isAddingNew ? 'Add Partner University' : `Editing: ${editingUni.name}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingUni(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">University Name</label>
              <input
                type="text"
                required
                value={editingUni.name}
                onChange={(e) => setEditingUni({ ...editingUni, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Country</label>
              <input
                type="text"
                required
                value={editingUni.country}
                onChange={(e) => setEditingUni({ ...editingUni, country: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">City</label>
              <input
                type="text"
                required
                value={editingUni.city}
                onChange={(e) => setEditingUni({ ...editingUni, city: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">QS World Ranking</label>
              <input
                type="number"
                value={editingUni.ranking}
                onChange={(e) => setEditingUni({ ...editingUni, ranking: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Tuition Fee (€/yr)</label>
              <input
                type="number"
                value={editingUni.tuitionFeePerYearEUR}
                onChange={(e) => setEditingUni({ ...editingUni, tuitionFeePerYearEUR: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">MOI / English Waiver Possible?</label>
              <select
                value={editingUni.englishWaiverPossible ? 'true' : 'false'}
                onChange={(e) => setEditingUni({ ...editingUni, englishWaiverPossible: e.target.value === 'true' })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="true">Yes - English Waiver Allowed</option>
                <option value="false">No - IELTS Mandatory</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-300 mb-1 font-semibold">Image URL</label>
              <input
                type="text"
                value={editingUni.image}
                onChange={(e) => setEditingUni({ ...editingUni, image: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setEditingUni(null)}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] text-xs font-extrabold hover:bg-[#E2C044]"
            >
              Save University
            </button>
          </div>
        </form>
      )}

      {/* Destinations List */}
      {activeTab === 'countries' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{c.flag}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingCountry(c);
                        setIsAddingNew(false);
                      }}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-[#D4AF37]/20 text-slate-700 dark:text-slate-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCountry(c.id)}
                      className="p-1.5 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300 hover:bg-red-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                    {c.name} ({c.capital})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                    {c.overview}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200 dark:border-white/10">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tuition/Yr:</span>
                    <span className="font-bold text-[#D4AF37]">€{c.tuitionRange.min} - €{c.tuitionRange.max}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Visa Rate:</span>
                    <span className="font-bold text-emerald-500">{c.visaSuccessRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Universities List */}
      {activeTab === 'universities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((u) => (
            <div
              key={u.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold">
                    QS #{u.ranking} Global
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingUni(u);
                        setIsAddingNew(false);
                      }}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-[#D4AF37]/20 text-slate-700 dark:text-slate-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUni(u.id)}
                      className="p-1.5 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300 hover:bg-red-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                    {u.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {u.city}, {u.country} • {u.type} University
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-semibold pt-2 border-t border-slate-100 dark:border-white/5">
                  <span className="text-slate-600 dark:text-slate-300">
                    Fee: {u.tuitionFeePerYearEUR === 0 ? '€0 (Tuition Free)' : `€${u.tuitionFeePerYearEUR}/yr`}
                  </span>
                  <span className="text-emerald-500">
                    {u.englishWaiverPossible ? '✓ MOI Allowed' : 'IELTS Req'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
