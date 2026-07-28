/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, X, CheckCircle2, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { AppointmentBooking } from '../types';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [booking, setBooking] = useState<AppointmentBooking>({
    fullName: '',
    email: '',
    phone: '',
    preferredBranch: 'Dhaka Head Office (Gulshan 2)',
    preferredDate: '2026-08-05',
    preferredTimeSlot: '11:00 AM - 12:00 PM',
    studyCountryInterest: 'Italy',
    intendedDegree: 'Masters',
    comments: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'VRC-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(code);
    setIsSubmitted(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#0B1F3A', '#FFFFFF'],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1">
                <Calendar className="w-4 h-4" />
                <span>1-on-1 Senior Counseling</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] dark:text-white">
                Book Free Consultation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Meet our European education specialists in Gulshan 2, Chittagong, or online via Zoom.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanzim Rahman"
                    value={booking.fullName}
                    onChange={(e) => setBooking({ ...booking, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1700 000000"
                    value={booking.phone}
                    onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tanzim@gmail.com"
                    value={booking.email}
                    onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Branch Location *
                  </label>
                  <select
                    value={booking.preferredBranch}
                    onChange={(e) =>
                      setBooking({
                        ...booking,
                        preferredBranch: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Dhaka Head Office (Gulshan 2)">Dhaka Head Office (Gulshan 2)</option>
                    <option value="Chittagong Office (GEC Circle)">Chittagong Office (GEC Circle)</option>
                    <option value="Online Video Consultation">Online Video Consultation (Zoom)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={booking.preferredDate}
                    onChange={(e) => setBooking({ ...booking, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={booking.preferredTimeSlot}
                    onChange={(e) => setBooking({ ...booking, preferredTimeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                    <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                    <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Target Study Country
                  </label>
                  <select
                    value={booking.studyCountryInterest}
                    onChange={(e) => setBooking({ ...booking, studyCountryInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Italy">Italy (DSU Grant)</option>
                    <option value="Germany">Germany (Tuition-Free)</option>
                    <option value="France">France</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Spain">Spain</option>
                    <option value="Portugal">Portugal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Intended Degree
                  </label>
                  <select
                    value={booking.intendedDegree}
                    onChange={(e) => setBooking({ ...booking, intendedDegree: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Bachelors">Bachelors Degree</option>
                    <option value="Masters">Masters Degree</option>
                    <option value="PhD">PhD / Research</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-extrabold text-sm shadow-xl hover:brightness-110 transition-all text-center"
                >
                  Confirm Free Appointment
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Confirmation Pass Screen */
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto text-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-[#D4AF37]">Appointment Confirmed</span>
              <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] dark:text-white mt-1">
                We Look Forward to Meeting You!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2">
                Your consultation token <strong className="text-[#D4AF37]">{confirmationCode}</strong> has been created. A confirmation SMS & email have been sent to {booking.email}.
              </p>
            </div>

            {/* Token Card */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2 font-bold">
                <span>Location:</span>
                <span className="text-[#D4AF37]">{booking.preferredBranch}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2">
                <span>Date & Time:</span>
                <span>{booking.preferredDate} ({booking.preferredTimeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span>Applicant:</span>
                <span>{booking.fullName} ({booking.phone})</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-3 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs"
              >
                Done & Return to Site
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
