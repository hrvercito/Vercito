/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { BlogPost } from '../../../types';
import { ImageUploadField } from '../media/ImageUploadField';
import { BookOpen, Plus, Trash2, Edit2, Clock, User } from 'lucide-react';

export const BlogEditor: React.FC = () => {
  const { cmsData, updateBlogs, isSaving } = useCMS();
  const [blogs, setBlogs] = useState<BlogPost[]>([...cmsData.blogs]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSave = async (updated: BlogPost[]) => {
    setBlogs(updated);
    const ok = await updateBlogs(updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setEditingBlog(null);
      setIsAddingNew(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this blog post / guide?')) {
      const filtered = blogs.filter((b) => b.id !== id);
      handleSave(filtered);
    }
  };

  const handleAddNew = () => {
    const newBlog: BlogPost = {
      id: `b-${Date.now()}`,
      title: 'New Study Guide for Europe',
      slug: `guide-${Date.now()}`,
      excerpt: 'Comprehensive step-by-step guide for Bangladeshi students applying for European higher education.',
      content: 'Full article content describing admissions, scholarship eligibility, embassy visa appointment booking, and bank solvency documentation.',
      category: 'Visa Guide',
      author: 'VERCITO Editorial Team',
      date: 'July 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
      tags: ['Europe Admissions', 'Visa Guide', 'Scholarship'],
    };
    setEditingBlog(newBlog);
    setIsAddingNew(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    let updated: BlogPost[];
    if (isAddingNew) {
      updated = [editingBlog, ...blogs];
    } else {
      updated = blogs.map((b) => (b.id === editingBlog.id ? editingBlog : b));
    }
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            <span>Blog & Country Guides CMS</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Publish and manage educational articles, DSU guides, blocked account tutorials, and visa tips.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs flex items-center gap-1.5 hover:bg-[#E2C044] transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Article</span>
        </button>
      </div>

      {editingBlog && (
        <form onSubmit={handleFormSubmit} className="p-6 rounded-2xl bg-slate-900 text-white border border-white/20 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-serif text-lg font-bold text-[#D4AF37]">
              {isAddingNew ? 'Add New Guide Article' : `Editing Article`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingBlog(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block text-slate-300 mb-1 font-semibold">Article Title</label>
              <input
                type="text"
                required
                value={editingBlog.title}
                onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Category</label>
              <select
                value={editingBlog.category}
                onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value as any })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Scholarships">Scholarships</option>
                <option value="Visa Guide">Visa Guide</option>
                <option value="Blocked Account">Blocked Account</option>
                <option value="Admissions">Admissions</option>
                <option value="Student Life">Student Life</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Author</label>
              <input
                type="text"
                value={editingBlog.author}
                onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Publish Date</label>
              <input
                type="text"
                value={editingBlog.date}
                onChange={(e) => setEditingBlog({ ...editingBlog, date: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Read Time (e.g. "5 min read")</label>
              <input
                type="text"
                value={editingBlog.readTime}
                onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-3">
              <ImageUploadField
                label="Blog Cover Image"
                value={editingBlog.image}
                onChange={(url) => setEditingBlog({ ...editingBlog, image: url })}
                aspectRatio="16:9"
                category="blog"
                defaultImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-300 mb-1 font-semibold">Short Excerpt</label>
              <textarea
                rows={2}
                required
                value={editingBlog.excerpt}
                onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-slate-300 mb-1 font-semibold">Full Article Body Content</label>
              <textarea
                rows={5}
                required
                value={editingBlog.content}
                onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setEditingBlog(null)}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] text-xs font-extrabold hover:bg-[#E2C044]"
            >
              Save Article
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase">
                  {post.category}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingBlog(post);
                      setIsAddingNew(false);
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-[#D4AF37]/20 text-slate-700 dark:text-slate-200"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-1.5 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300 hover:bg-red-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span>{post.author}</span>
              <span>{post.date} • {post.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
