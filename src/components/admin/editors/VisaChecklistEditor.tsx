/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { DocumentChecklistItem } from '../../../types';
import { ShieldCheck, Plus, Trash2, Edit2, CheckSquare } from 'lucide-react';

export const VisaChecklistEditor: React.FC = () => {
  const { cmsData, updateVisaChecklist, isSaving } = useCMS();
  const [checklist, setChecklist] = useState<DocumentChecklistItem[]>([...cmsData.visaChecklist]);
  const [editingItem, setEditingItem] = useState<DocumentChecklistItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSave = async (updated: DocumentChecklistItem[]) => {
    setChecklist(updated);
    const ok = await updateVisaChecklist(updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setEditingItem(null);
      setIsAddingNew(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this checklist item?')) {
      const filtered = checklist.filter((item) => item.id !== id);
      handleSave(filtered);
    }
  };

  const handleAddNew = () => {
    const newItem: DocumentChecklistItem = {
      id: `doc-${Date.now()}`,
      category: 'Academic',
      title: 'MOFA & Education Board Document Legalization',
      description: 'Attestation of SSC, HSC & Bachelors Degree certificates by Ministry of Education & MOFA Dhaka.',
      isMandatory: true,
      bangladeshNotes: 'Required for VFS appointment in Dhaka & CIMEA / Uni-Italia / APS validation.',
    };
    setEditingItem(newItem);
    setIsAddingNew(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    let updated: DocumentChecklistItem[];
    if (isAddingNew) {
      updated = [editingItem, ...checklist];
    } else {
      updated = checklist.map((item) => (item.id === editingItem.id ? editingItem : item));
    }
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <span>Visa Document Checklist CMS</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Edit required embassy documents, MOFA attestations, financial solvency proof, and Bangladesh specific instructions.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs flex items-center gap-1.5 hover:bg-[#E2C044] transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Checklist Item</span>
        </button>
      </div>

      {editingItem && (
        <form onSubmit={handleFormSubmit} className="p-6 rounded-2xl bg-slate-900 text-white border border-white/20 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-serif text-lg font-bold text-[#D4AF37]">
              {isAddingNew ? 'Add Visa Document Requirement' : `Editing Document Item`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Category</label>
              <select
                value={editingItem.category}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Academic">Academic</option>
                <option value="Financial">Financial</option>
                <option value="Legal/Embassy">Legal/Embassy</option>
                <option value="Application">Application</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Is Mandatory?</label>
              <select
                value={editingItem.isMandatory ? 'true' : 'false'}
                onChange={(e) => setEditingItem({ ...editingItem, isMandatory: e.target.value === 'true' })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="true">Mandatory Document</option>
                <option value="false">Optional / Supporting</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-300 mb-1 font-semibold">Document Title</label>
              <input
                type="text"
                required
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-300 mb-1 font-semibold">Description</label>
              <textarea
                rows={2}
                required
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[#D4AF37] mb-1 font-semibold">Bangladesh Specific Guidance Note</label>
              <textarea
                rows={2}
                value={editingItem.bangladeshNotes || ''}
                onChange={(e) => setEditingItem({ ...editingItem, bangladeshNotes: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] text-xs font-extrabold hover:bg-[#E2C044]"
            >
              Save Requirement
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {checklist.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase">
                  {item.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.isMandatory
                      ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                      : 'bg-slate-100 dark:bg-white/10 text-slate-500'
                  }`}
                >
                  {item.isMandatory ? 'Mandatory' : 'Optional'}
                </span>
              </div>
              <h3 className="font-serif text-sm font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>
              {item.bangladeshNotes && (
                <p className="text-[11px] text-[#D4AF37] bg-[#D4AF37]/10 p-2 rounded-xl border border-[#D4AF37]/20 font-medium">
                  <strong>BD Note:</strong> {item.bangladeshNotes}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1 self-end md:self-start">
              <button
                onClick={() => {
                  setEditingItem(item);
                  setIsAddingNew(false);
                }}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-[#D4AF37]/20 text-slate-700 dark:text-slate-200"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300 hover:bg-red-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
