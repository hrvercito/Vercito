/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { ContactInfo, OfficeLocation } from '../../../types';
import { ImageUploadField } from '../media/ImageUploadField';
import { PhoneCall, Save, MapPin, Mail, Globe, MessageCircle, Plus, Trash2 } from 'lucide-react';

export const ContactInfoEditor: React.FC = () => {
  const { cmsData, updateContactInfo, isSaving } = useCMS();
  const [contactInfo, setContactInfo] = useState<ContactInfo>(
    cmsData.contactInfo || {
      hotline: '+880 1711 000000',
      whatsappNumber: '8801711000000',
      email: 'info@vercito.com',
      headOfficeAddress: 'Level 7, VERCITO Tower, Road 11, Block D, Gulshan 2, Dhaka-1212, Bangladesh',
      offices: [
        {
          id: 'dhaka',
          name: 'Dhaka Head Office (Gulshan 2)',
          subtitle: 'Primary European & Schengen Admissions Hub',
          address: 'Level 7, VERCITO Tower, Road 11, Block D, Gulshan 2, Dhaka-1212, Bangladesh',
          phoneNumbers: ['+880 1711 000000', '+880 1700 000000'],
          email: 'dhaka@vercito.com',
          officeHours: 'Saturday – Thursday: 10:00 AM – 07:00 PM (Friday Closed)',
          googleMapsUrl: 'https://maps.google.com/?q=Gulshan+2+Dhaka',
          mapEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.582372583804!2d90.4125!3d23.7915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f0000001%3A0x1!2sGulshan+2%2C+Dhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
        },
        {
          id: 'chattogram',
          name: 'Chattogram Branch Office (GEC Circle)',
          subtitle: 'Port City European Counseling Center',
          address: 'Suite 4A, Equity Central, GEC Circle, CDA Avenue, Chattogram',
          phoneNumbers: ['+880 1800 000000', '+880 1811 000000'],
          email: 'ctg@vercito.com',
          officeHours: 'Saturday – Thursday: 10:00 AM – 07:00 PM (Friday Closed)',
          googleMapsUrl: 'https://maps.google.com/?q=GEC+Circle+Chittagong',
          mapEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.8788!2d91.8211!3d22.3587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3752ec3000000001%3A0x1!2sGEC+Circle%2C+Chittagong!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd',
          image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000',
        },
      ],
      socialLinks: {
        facebook: 'https://facebook.com/vercito',
        youtube: 'https://youtube.com/vercito',
        linkedin: 'https://linkedin.com/company/vercito',
        whatsapp: 'https://wa.me/8801711000000',
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateContactInfo(contactInfo);
  };

  const handleUpdateOffice = (index: number, updatedOffice: OfficeLocation) => {
    const updatedList = [...contactInfo.offices];
    updatedList[index] = updatedOffice;
    setContactInfo({ ...contactInfo, offices: updatedList });
  };

  const handleAddOffice = () => {
    const newOffice: OfficeLocation = {
      id: 'office-' + Date.now(),
      name: 'New Branch Office',
      subtitle: 'Regional Student Counseling Center',
      address: 'Suite 101, Commercial Center, Bangladesh',
      phoneNumbers: ['+880 1700 000000'],
      email: 'branch@vercito.com',
      officeHours: 'Saturday – Thursday: 10:00 AM – 07:00 PM',
      googleMapsUrl: 'https://maps.google.com',
      mapEmbedSrc: '',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
    };
    setContactInfo({ ...contactInfo, offices: [...contactInfo.offices, newOffice] });
  };

  const handleRemoveOffice = (index: number) => {
    if (window.confirm('Remove this office location?')) {
      const updatedList = contactInfo.offices.filter((_, i) => i !== index);
      setContactInfo({ ...contactInfo, offices: updatedList });
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div className="border-b border-white/10 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold flex items-center gap-2">
          <PhoneCall className="w-6 h-6 text-[#D4AF37]" />
          <span>Manage Contact Information & Office Locations</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Edit telephone hotlines, email addresses, physical office addresses, Google Maps embeds, and social links stored in Cloud Firestore.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* General Contact Info */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-bold text-sm text-[#D4AF37] border-b border-white/10 pb-2">
            Primary Contact Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">24/7 Hotline Number *</label>
              <input
                type="text"
                required
                value={contactInfo.hotline}
                onChange={(e) => setContactInfo({ ...contactInfo, hotline: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Primary WhatsApp Number *</label>
              <input
                type="text"
                required
                value={contactInfo.whatsappNumber}
                onChange={(e) => setContactInfo({ ...contactInfo, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Main Support Email *</label>
              <input
                type="email"
                required
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block font-semibold mb-1">Head Office Postal Address *</label>
              <input
                type="text"
                required
                value={contactInfo.headOfficeAddress}
                onChange={(e) => setContactInfo({ ...contactInfo, headOfficeAddress: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-bold text-sm text-[#D4AF37] border-b border-white/10 pb-2">
            Official Social Media Handles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold mb-1">Facebook Page URL</label>
              <input
                type="text"
                value={contactInfo.socialLinks?.facebook || ''}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    socialLinks: { ...contactInfo.socialLinks, facebook: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">YouTube Channel URL</label>
              <input
                type="text"
                value={contactInfo.socialLinks?.youtube || ''}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    socialLinks: { ...contactInfo.socialLinks, youtube: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">LinkedIn Page URL</label>
              <input
                type="text"
                value={contactInfo.socialLinks?.linkedin || ''}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    socialLinks: { ...contactInfo.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">WhatsApp Channel / Direct URL</label>
              <input
                type="text"
                value={contactInfo.socialLinks?.whatsapp || ''}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    socialLinks: { ...contactInfo.socialLinks, whatsapp: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/15 text-white"
              />
            </div>
          </div>
        </div>

        {/* Physical Offices List */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="font-bold text-sm text-[#D4AF37]">
              Physical Office Locations ({contactInfo.offices.length})
            </h3>
            <button
              type="button"
              onClick={handleAddOffice}
              className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-amber-400 text-[#0B1F3A] font-extrabold text-[11px] flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Office Location</span>
            </button>
          </div>

          <div className="space-y-6">
            {contactInfo.offices.map((office, idx) => (
              <div key={office.id || idx} className="p-4 rounded-xl bg-slate-800/80 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#D4AF37]">Office #{idx + 1}: {office.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveOffice(idx)}
                    className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold"
                    title="Remove Office"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Office Name</label>
                    <input
                      type="text"
                      value={office.name}
                      onChange={(e) => handleUpdateOffice(idx, { ...office, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Subtitle Tag</label>
                    <input
                      type="text"
                      value={office.subtitle}
                      onChange={(e) => handleUpdateOffice(idx, { ...office, subtitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      value={office.email}
                      onChange={(e) => handleUpdateOffice(idx, { ...office, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold mb-1">Street Address</label>
                    <input
                      type="text"
                      value={office.address}
                      onChange={(e) => handleUpdateOffice(idx, { ...office, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Office Hours</label>
                    <input
                      type="text"
                      value={office.officeHours}
                      onChange={(e) => handleUpdateOffice(idx, { ...office, officeHours: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold mb-1">Google Maps Direct Link</label>
                    <input
                      type="text"
                      value={office.googleMapsUrl}
                      onChange={(e) => handleUpdateOffice(idx, { ...office, googleMapsUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/15 text-white"
                    />
                  </div>

                  <div className="sm:col-span-2 md:col-span-3">
                    <ImageUploadField
                      label="Office Building / Interior Photo"
                      value={office.image || ''}
                      onChange={(url) => handleUpdateOffice(idx, { ...office, image: url })}
                      aspectRatio="16:9"
                      category="general"
                      defaultImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C5A028] text-[#0B1F3A] font-extrabold text-xs flex items-center gap-2 shadow-xl hover:brightness-110"
          >
            <Save className="w-4 h-4" />
            <span>Save Contact Info to Firestore</span>
          </button>
        </div>
      </form>
    </div>
  );
};
