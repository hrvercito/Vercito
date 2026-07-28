/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { SuccessStory } from '../../../types';
import { Quote, Plus, Trash2, Edit2, Star, MapPin } from 'lucide-react';

export const TestimonialsEditor: React.FC = () => {
  const { cmsData, updateTestimonials, isSaving } = useCMS();
  const [stories, setStories] = useState<SuccessStory[]>([...cmsData.testimonials]);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSave = async (updated: SuccessStory[]) => {
    setStories(updated);
    const ok = await updateTestimonials(updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setEditingStory(null);
      setIsAddingNew(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this student review/testimonial?')) {
      const filtered = stories.filter((s) => s.id !== id);
      handleSave(filtered);
    }
  };

  const handleAddNew = () => {
    const newStory: SuccessStory = {
      id: `s-${Date.now()}`,
      studentName: 'Name of Student',
      homeCity: 'Dhaka, Bangladesh',
      homeCityBn: 'ঢাকা, বাংলাদেশ',
      university: 'Politecnico di Milano',
      country: 'Italy',
      degree: 'M.Sc. Computer Science',
      degreeBn: 'এম.এসসি. কম্পিউটার সাইন্স',
      scholarshipWon: 'DSU Full Scholarship (€7,000/yr)',
      scholarshipWonBn: 'ডিএসইউ ফুল স্কলারশিপ (বছরে €৭,০০০)',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
      quote: 'VERCITO guided me through every step from university selection to DSU scholarship documents!',
      quoteBn: 'ভার্সিটো আমার বিশ্ববিদ্যালয় নির্বাচন থেকে শুরু করে স্কলারশিপ আবেদনের সব প্রক্রিয়ায় চমৎকার সাহায্য করেছে!',
      visaApprovalYear: 2025,
      fieldOfStudy: 'Engineering',
      ieltsScore: 'IELTS 7.0',
    };
    setEditingStory(newStory);
    setIsAddingNew(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory) return;
    let updated: SuccessStory[];
    if (isAddingNew) {
      updated = [editingStory, ...stories];
    } else {
      updated = stories.map((s) => (s.id === editingStory.id ? editingStory : s));
    }
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Quote className="w-5 h-5 text-[#D4AF37]" />
            <span>Testimonials & Success Stories CMS</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage student visa approvals, quotes, scholarship highlights, and photos in both Bangla & English.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs flex items-center gap-1.5 hover:bg-[#E2C044] transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {editingStory && (
        <form onSubmit={handleFormSubmit} className="p-6 rounded-2xl bg-slate-900 text-white border border-white/20 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-serif text-lg font-bold text-[#D4AF37]">
              {isAddingNew ? 'Add New Testimonial' : `Editing: ${editingStory.studentName}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingStory(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Student Full Name</label>
              <input
                type="text"
                required
                value={editingStory.studentName}
                onChange={(e) => setEditingStory({ ...editingStory, studentName: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-[#D4AF37] mb-1 font-semibold">Home City (English)</label>
              <input
                type="text"
                required
                value={editingStory.homeCity}
                onChange={(e) => setEditingStory({ ...editingStory, homeCity: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[#D4AF37] mb-1 font-semibold">Home City (Bangla)</label>
              <input
                type="text"
                value={editingStory.homeCityBn || ''}
                onChange={(e) => setEditingStory({ ...editingStory, homeCityBn: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">University</label>
              <input
                type="text"
                required
                value={editingStory.university}
                onChange={(e) => setEditingStory({ ...editingStory, university: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Country</label>
              <input
                type="text"
                required
                value={editingStory.country}
                onChange={(e) => setEditingStory({ ...editingStory, country: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Visa Approval Year</label>
              <input
                type="number"
                value={editingStory.visaApprovalYear}
                onChange={(e) => setEditingStory({ ...editingStory, visaApprovalYear: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Degree (English)</label>
              <input
                type="text"
                value={editingStory.degree}
                onChange={(e) => setEditingStory({ ...editingStory, degree: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Degree (Bangla)</label>
              <input
                type="text"
                value={editingStory.degreeBn || ''}
                onChange={(e) => setEditingStory({ ...editingStory, degreeBn: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Photo Image URL</label>
              <input
                type="text"
                value={editingStory.photo}
                onChange={(e) => setEditingStory({ ...editingStory, photo: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 mb-1 font-semibold">Scholarship Won (English)</label>
              <input
                type="text"
                value={editingStory.scholarshipWon || ''}
                onChange={(e) => setEditingStory({ ...editingStory, scholarshipWon: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Scholarship Won (Bangla)</label>
              <input
                type="text"
                value={editingStory.scholarshipWonBn || ''}
                onChange={(e) => setEditingStory({ ...editingStory, scholarshipWonBn: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-300 mb-1 font-semibold">Student Quote Review (English)</label>
              <textarea
                rows={2}
                value={editingStory.quote}
                onChange={(e) => setEditingStory({ ...editingStory, quote: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[#D4AF37] mb-1 font-semibold">Student Quote Review (Bangla / বাংলা)</label>
              <textarea
                rows={2}
                value={editingStory.quoteBn || ''}
                onChange={(e) => setEditingStory({ ...editingStory, quoteBn: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setEditingStory(null)}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] text-xs font-extrabold hover:bg-[#E2C044]"
            >
              Save Review
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((s) => (
          <div
            key={s.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#D4AF37]">
                  Visa Approved {s.visaApprovalYear} ({s.country})
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingStory(s);
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

              <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-3">
                "{s.quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-3">
              <img
                src={s.photo}
                alt={s.studentName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37]"
              />
              <div className="text-xs min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-white truncate">{s.studentName}</h4>
                <p className="text-[10px] text-slate-500 truncate">{s.university}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
