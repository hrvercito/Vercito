/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { Scholarship } from '../../../types';
import { ImageUploadField } from '../media/ImageUploadField';
import { Award, Plus, Trash2, Edit2, Save, Check } from 'lucide-react';

export const ScholarshipsEditor: React.FC = () => {
  const { cmsData, updateScholarships, isSaving } = useCMS();
  const [scholarships, setScholarships] = useState<Scholarship[]>([...cmsData.scholarships]);
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSaveScholarships = async (updated: Scholarship[]) => {
    setScholarships(updated);
    const ok = await updateScholarships(updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setEditingScholarship(null);
      setIsAddingNew(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this scholarship entry?')) {
      const filtered = scholarships.filter((s) => s.id !== id);
      handleSaveScholarships(filtered);
    }
  };

  const handleAddNew = () => {
    const newSch: Scholarship = {
      id: `sch-${Date.now()}`,
      name: 'New Government / University Scholarship',
      country: 'Italy',
      coverage: '100% Tuition Waiver + €7,000 Annual Stipend',
      minCGPA: 3.0,
      minIELTS: 6.0,
      deadline: 'June 30',
      description: 'Fully funded scholarship covering full tuition, free canteen meals, and yearly cash living allowance.',
      eligiblePrograms: ['All Masters Programs', 'Bachelors Degrees'],
      isFullyFunded: true,
    };
    setEditingScholarship(newSch);
    setIsAddingNew(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScholarship) return;
    let updated: Scholarship[];
    if (isAddingNew) {
      updated = [editingScholarship, ...scholarships];
    } else {
      updated = scholarships.map((s) => (s.id === editingScholarship.id ? editingScholarship : s));
    }
    handleSaveScholarships(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <span>Scholarships & Grants CMS</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Add, edit, and organize European & American government and university scholarships.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs flex items-center gap-1.5 hover:bg-[#E2C044] transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Scholarship</span>
        </button>
      </div>

      {editingScholarship && (
        <form onSubmit={handleFormSubmit} className="p-6 rounded-2xl bg-slate-900 text-white border border-white/20 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-serif text-lg font-bold text-[#D4AF37]">
              {isAddingNew ? 'Add New Scholarship Entry' : `Editing: ${editingScholarship.name}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingScholarship(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block text-slate-300 mb-1 font-semibold">Scholarship Title / Name</label>
              <input
                type="text"
                required
                value={editingScholarship.name}
                onChange={(e) => setEditingScholarship({ ...editingScholarship, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Country</label>
              <input
                type="text"
                required
                value={editingScholarship.country}
                onChange={(e) => setEditingScholarship({ ...editingScholarship, country: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 mb-1 font-semibold">Grant Coverage Summary</label>
              <input
                type="text"
                required
                value={editingScholarship.coverage}
                onChange={(e) => setEditingScholarship({ ...editingScholarship, coverage: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Application Deadline</label>
              <input
                type="text"
                value={editingScholarship.deadline}
                onChange={(e) => setEditingScholarship({ ...editingScholarship, deadline: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Min CGPA Requirement</label>
              <input
                type="number"
                step="0.1"
                value={editingScholarship.minCGPA}
                onChange={(e) => setEditingScholarship({ ...editingScholarship, minCGPA: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Min IELTS Requirement</label>
              <input
                type="number"
                step="0.5"
                value={editingScholarship.minIELTS}
                onChange={(e) => setEditingScholarship({ ...editingScholarship, minIELTS: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Is Fully Funded?</label>
              <select
                value={editingScholarship.isFullyFunded ? 'true' : 'false'}
                onChange={(e) => setEditingScholarship({ ...editingScholarship, isFullyFunded: e.target.value === 'true' })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="true">Yes - 100% Fully Funded</option>
                <option value="false">Partial Tuition Waiver / Grant</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <ImageUploadField
                label="Scholarship / Grant Banner Image"
                value={(editingScholarship as any).image || ''}
                onChange={(url) => setEditingScholarship({ ...editingScholarship, image: url } as any)}
                aspectRatio="16:9"
                category="scholarship"
                defaultImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-300 mb-1 font-semibold">Full Description & Eligibility Notes</label>
              <textarea
                rows={3}
                value={editingScholarship.description}
                onChange={(e) => setEditingScholarship({ ...editingScholarship, description: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setEditingScholarship(null)}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] text-xs font-extrabold hover:bg-[#E2C044]"
            >
              Save Scholarship
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scholarships.map((s) => (
          <div
            key={s.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold">
                  {s.country} • {s.isFullyFunded ? 'Fully Funded' : 'Partial Grant'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingScholarship(s);
                      setIsAddingNew(false);
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-[#D4AF37]/20 text-slate-700 dark:text-slate-200"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-1.5 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300 hover:bg-red-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                  {s.name}
                </h3>
                <p className="text-xs font-semibold text-[#D4AF37] mt-1">
                  {s.coverage}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {s.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Min CGPA: {s.minCGPA} | IELTS: {s.minIELTS}</span>
              <span>Deadline: {s.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
