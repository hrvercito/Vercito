/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { FAQItem } from '../../../types';
import { HelpCircle, Plus, Trash2, Edit2, Save } from 'lucide-react';

export const FAQEditor: React.FC = () => {
  const { cmsData, updateFaqs, isSaving } = useCMS();
  const [faqs, setFaqs] = useState<FAQItem[]>([...cmsData.faqs]);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSave = async (updated: FAQItem[]) => {
    setFaqs(updated);
    const ok = await updateFaqs(updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setEditingFaq(null);
      setIsAddingNew(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this FAQ question?')) {
      const filtered = faqs.filter((f) => f.id !== id);
      handleSave(filtered);
    }
  };

  const handleAddNew = () => {
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      category: 'Admissions',
      question: 'What are the document requirements for European universities?',
      answer: 'Standard document checklist includes Academic Transcripts, Passport, SOP, Reference Letters, and MOI or IELTS score report.',
    };
    setEditingFaq(newFaq);
    setIsAddingNew(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    let updated: FAQItem[];
    if (isAddingNew) {
      updated = [editingFaq, ...faqs];
    } else {
      updated = faqs.map((f) => (f.id === editingFaq.id ? editingFaq : f));
    }
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#D4AF37]" />
            <span>Frequently Asked Questions (FAQ) CMS</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Add, update, or remove questions organized by category (Admissions, Visa, Scholarships, Finances).
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs flex items-center gap-1.5 hover:bg-[#E2C044] transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {editingFaq && (
        <form onSubmit={handleFormSubmit} className="p-6 rounded-2xl bg-slate-900 text-white border border-white/20 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-serif text-lg font-bold text-[#D4AF37]">
              {isAddingNew ? 'Add New FAQ Item' : `Editing FAQ`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingFaq(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Category</label>
              <select
                value={editingFaq.category}
                onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value as any })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Admissions">Admissions</option>
                <option value="Scholarships">Scholarships</option>
                <option value="Visa & Embassy">Visa & Embassy</option>
                <option value="Finances">Finances</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 mb-1 font-semibold">Question Text</label>
              <input
                type="text"
                required
                value={editingFaq.question}
                onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-300 mb-1 font-semibold">Answer Explanation</label>
              <textarea
                rows={3}
                required
                value={editingFaq.answer}
                onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setEditingFaq(null)}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] text-xs font-extrabold hover:bg-[#E2C044]"
            >
              Save FAQ
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {faqs.map((f) => (
          <div
            key={f.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase">
                  {f.category}
                </span>
              </div>
              <h3 className="font-serif text-sm font-bold text-slate-900 dark:text-white">
                {f.question}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {f.answer}
              </p>
            </div>

            <div className="flex items-center gap-1 self-end md:self-start">
              <button
                onClick={() => {
                  setEditingFaq(f);
                  setIsAddingNew(false);
                }}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-[#D4AF37]/20 text-slate-700 dark:text-slate-200"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(f.id)}
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
