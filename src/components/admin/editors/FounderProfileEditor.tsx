/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { FounderProfile } from '../../../types';
import { ImageUploadField } from '../media/ImageUploadField';
import { UserCheck, Save, Award, Mail, Phone, Linkedin, MessageCircle, Quote } from 'lucide-react';

export const FounderProfileEditor: React.FC = () => {
  const { cmsData, updateFounderProfile, isSaving } = useCMS();
  const [profile, setProfile] = useState<FounderProfile>(
    cmsData.founderProfile || {
      name: 'Engr. Kazi Ashraful Islam',
      designation: 'Founder & CEO',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
      bio: 'Visionary higher education strategist with 12+ years of expertise in European university pre-enrollment, Universitaly portals, DSU scholarships, and embassy visa protocols. Personally guided over 3,500 Bangladeshi students.',
      experienceYears: '12+ Years Experience',
      expertise: ['Schengen Visa Regulations', 'Universitaly Portal', 'Strategic Education Planning', 'University Alliances'],
      languages: ['English', 'Bengali', 'Italian (Basic)'],
      email: 'ceo@vercito.com',
      phone: '+880 1711 000001',
      whatsapp: '8801711000001',
      linkedin: 'https://linkedin.com/in/vercito-ceo',
      quote: 'Empowering Bangladeshi scholars with transparent, 100% scholarship-backed higher education across Europe and America.',
      achievements: ['3,500+ Successful Students', '98.8% Visa Success Rate', '€7M+ Total Scholarships Won'],
    }
  );

  const [expertiseInput, setExpertiseInput] = useState(profile.expertise.join(', '));
  const [languagesInput, setLanguagesInput] = useState(profile.languages.join(', '));
  const [achievementsInput, setAchievementsInput] = useState(profile.achievements.join(', '));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile: FounderProfile = {
      ...profile,
      expertise: expertiseInput.split(',').map((s) => s.trim()).filter(Boolean),
      languages: languagesInput.split(',').map((s) => s.trim()).filter(Boolean),
      achievements: achievementsInput.split(',').map((s) => s.trim()).filter(Boolean),
    };

    setProfile(updatedProfile);
    await updateFounderProfile(updatedProfile);
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div className="border-b border-white/10 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-[#D4AF37]" />
          <span>Manage Founder & Executive Leadership Profile</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Edit the Founder biography, executive quotes, contact channels, and achievements displayed across the website and saved in Firestore.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Basic Info Grid */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-bold text-sm text-[#D4AF37] border-b border-white/10 pb-2">
            Identity & Designation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Founder Full Name *</label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Official Designation *</label>
              <input
                type="text"
                required
                value={profile.designation}
                onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Experience Years Tag *</label>
              <input
                type="text"
                required
                value={profile.experienceYears}
                onChange={(e) => setProfile({ ...profile, experienceYears: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploadField
                label="Founder Executive Portrait Photo"
                value={profile.photo}
                onChange={(url) => setProfile({ ...profile, photo: url })}
                aspectRatio="1:1"
                category="profile"
                defaultImage="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Direct Email *</label>
              <input
                type="email"
                required
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">WhatsApp Number (e.g. 8801711000001)</label>
              <input
                type="text"
                value={profile.whatsapp}
                onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">LinkedIn Profile URL</label>
              <input
                type="text"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>
          </div>
        </div>

        {/* Bio & Vision Statement */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-bold text-sm text-[#D4AF37] border-b border-white/10 pb-2">
            Biography & Executive Quote
          </h3>

          <div>
            <label className="block font-semibold mb-1">Full Biography & Achievements Story *</label>
            <textarea
              rows={4}
              required
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Featured Executive Quote / Vision Statement</label>
            <textarea
              rows={2}
              value={profile.quote}
              onChange={(e) => setProfile({ ...profile, quote: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
            />
          </div>
        </div>

        {/* Tags & Achievements */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-bold text-sm text-[#D4AF37] border-b border-white/10 pb-2">
            Core Expertise, Languages & Achievements
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Core Expertise (comma-separated)</label>
              <textarea
                rows={3}
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
                placeholder="Schengen Visa Regulations, Universitaly Portal, Strategic Education Planning"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Languages Spoken (comma-separated)</label>
              <textarea
                rows={3}
                value={languagesInput}
                onChange={(e) => setLanguagesInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
                placeholder="English, Bengali, Italian"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Key Achievements (comma-separated)</label>
              <textarea
                rows={3}
                value={achievementsInput}
                onChange={(e) => setAchievementsInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
                placeholder="3,500+ Successful Students, 98.8% Visa Success Rate"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C5A028] text-[#0B1F3A] font-extrabold text-xs flex items-center gap-2 shadow-xl hover:brightness-110"
          >
            <Save className="w-4 h-4" />
            <span>Save Founder Profile to Firestore</span>
          </button>
        </div>
      </form>
    </div>
  );
};
