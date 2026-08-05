/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { useTranslation } from '../i18n/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  Building2,
  Calendar,
  Linkedin,
  Video,
  Globe,
  Award,
  ShieldCheck,
  Star,
  ChevronLeft,
  ChevronRight,
  Headphones,
  X,
  ExternalLink,
  Lock,
  Zap,
  Users,
  MessageCircle,
  Bot,
  ArrowRight,
  UserCheck,
  Check
} from 'lucide-react';

interface ContactSectionProps {
  onOpenAppointment: () => void;
  onOpenAIEvaluator?: () => void;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photo: string;
  bio: string;
  experience: string;
  expertise: string[];
  languages: string[];
  office: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  isLeadership?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenAppointment,
  onOpenAIEvaluator,
}) => {
  const { t, language } = useTranslation();
  const isBn = language === 'bn';
  const { cmsData } = useCMS();
  const founder = cmsData.founderProfile;
  const contactInfo = cmsData.contactInfo;

  // Modal states for Video Meeting and Callback Request
  const [activeModalMember, setActiveModalMember] = useState<TeamMember | null>(null);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [callbackForm, setCallbackForm] = useState({
    name: '',
    phone: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    topic: 'Admission & Visa Consultation',
  });

  // Video Meeting booking form inside modal
  const [videoSubmitted, setVideoSubmitted] = useState(false);
  const [videoForm, setVideoForm] = useState({
    studentName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '03:00 PM',
  });

  // Contact Form state
  const [contactFormData, setContactFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredOffice: 'Dhaka Head Office (Gulshan 2)',
    preferredContactMethod: 'WhatsApp',
    inquiryType: 'Admission',
    subject: '',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Office Map toggle view state
  const [activeMapOffice, setActiveMapOffice] = useState<'dhaka' | 'chattogram'>('dhaka');

  // Testimonials Slider state
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Team Data (Founder & CEO dynamically sourced from CMS Firestore)
  const teamMembers: TeamMember[] = [
    {
      id: 'ceo',
      name: founder?.name || 'Engr. Kazi Ashraful Islam',
      designation: founder?.designation || 'Founder & CEO',
      photo: founder?.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
      bio: founder?.bio || 'Visionary higher education strategist with 12+ years of expertise in European university pre-enrollment, Universitaly portals, DSU scholarships, and embassy visa protocols. Personally guided over 3,500 Bangladeshi students.',
      experience: founder?.experienceYears || '12+ Years Experience',
      expertise: founder?.expertise && founder.expertise.length > 0 ? founder.expertise : ['Schengen Visa Regulations', 'Universitaly Portal', 'Strategic Education Planning', 'University Alliances'],
      languages: founder?.languages && founder.languages.length > 0 ? founder.languages : ['English', 'Bengali', 'Italian (Basic)'],
      office: 'Dhaka Head Office (Gulshan 2)',
      email: founder?.email || 'ceo@vercito.com',
      phone: founder?.phone || '+880 1711 000001',
      whatsapp: founder?.whatsapp || '8801711000001',
      linkedin: founder?.linkedin || 'https://linkedin.com/in/vercito-ceo',
      isLeadership: true,
    },
    {
      id: 'md',
      name: 'Nusrat Jahan Chowdhury',
      designation: 'Managing Director',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      bio: 'Operations and compliance chief overseeing VFS Global embassy liaison, MOFA document legalizations, CIMEA equivalencies, and regional scholarship grant disbursements across Italy, Germany, and France.',
      experience: '10+ Years Experience',
      expertise: ['Embassy Legalizations', 'DSU & ER.GO Grants', 'CIMEA Equivalency', 'Student Compliance'],
      languages: ['English', 'Bengali', 'German (B1)'],
      office: 'Dhaka Head Office (Gulshan 2)',
      email: 'md@vercito.com',
      phone: '+880 1711 000002',
      whatsapp: '8801711000002',
      linkedin: 'https://linkedin.com/in/vercito-md',
      isLeadership: true,
    },
    {
      id: 'counselor',
      name: 'Tanvir Ahmed Siddique',
      designation: 'Senior Admission Counselor',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      bio: 'Specialist in Italian State University course matching, English medium waivers (MOI), pre-enrollment eligibility screening, and step-by-step Universitaly application submission.',
      experience: '7+ Years Experience',
      expertise: ['Universitaly Enrollment', 'Academic Profile Audit', 'Course Matching', 'MOI Waivers'],
      languages: ['English', 'Bengali'],
      office: 'Dhaka Head Office (Gulshan 2)',
      email: 'admission@vercito.com',
      phone: '+880 1700 000003',
      whatsapp: '880170000003',
      linkedin: 'https://linkedin.com/in/vercito-tanvir',
    },
    {
      id: 'scholarship',
      name: 'Sabrina Rahman',
      designation: 'Scholarship Advisor',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
      bio: 'Expert in securing 100% tuition waivers and DSU regional grants (Tuscany, Lazio, Lombardy, Emilia-Romagna) including ISEE Parificato tax family income documentation.',
      experience: '6+ Years Experience',
      expertise: ['DSU Regional Grants', 'ISEE Parificato', 'DAAD Scholarships', 'Housing Subsidies'],
      languages: ['English', 'Bengali'],
      office: 'Dhaka Head Office (Gulshan 2)',
      email: 'scholarship@vercito.com',
      phone: '+880 1700 000004',
      whatsapp: '880170000004',
      linkedin: 'https://linkedin.com/in/vercito-sabrina',
    },
    {
      id: 'visa',
      name: 'Mahmudul Hasan Chowdhury',
      designation: 'Visa Specialist',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
      bio: 'VFS Dhaka and Italian/German Embassy dossier audit specialist. Maintains a 98.4% visa success record by verifying bank solvency, sponsor affidavits, and travel health insurance.',
      experience: '8+ Years Experience',
      expertise: ['VFS Embassy Dossier Audit', 'Bank Solvency Verification', 'Schengen Type D Visa', 'Sponsor Affidavits'],
      languages: ['English', 'Bengali'],
      office: 'Chattogram Branch Office (GEC)',
      email: 'visa@vercito.com',
      phone: '+880 1800 000005',
      whatsapp: '880180000005',
      linkedin: 'https://linkedin.com/in/vercito-mahmud',
    },
    {
      id: 'success',
      name: 'Farhana Akter',
      designation: 'Student Success Manager',
      photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=800',
      bio: 'Leads post-visa pre-departure briefings, airport transfers, accommodation booking in Milan/Rome/Munich, Codice Fiscale tax code, and Permesso di Soggiorno residence permits.',
      experience: '5+ Years Experience',
      expertise: ['Codice Fiscale & Residency', 'European Housing Search', 'Pre-Departure Orientation', 'Student Relocation'],
      languages: ['English', 'Bengali', 'Italian'],
      office: 'Chattogram Branch Office (GEC)',
      email: 'support@vercito.com',
      phone: '+880 1800 000006',
      whatsapp: '880180000006',
      linkedin: 'https://linkedin.com/in/vercito-farhana',
    },
    {
      id: 'ai-counselor',
      name: 'VERCITO AI Study Counselor',
      designation: 'AI Study Counselor (24/7 Virtual Assistant)',
      photo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      bio: 'Powered by Gemini AI, trained specifically on European university course catalogs, Universitaly guidelines, DSU scholarship rules, and Schengen embassy requirements.',
      experience: 'Instant 24/7 Virtual Assistant',
      expertise: ['Real-time Profile Assessment', 'AI SOP & CV Review', 'Universitaly Matching', 'Instant Visa Score'],
      languages: ['English', 'Bengali', 'Italian', 'German', 'French'],
      office: 'Cloud Virtual Desk (Global 24/7)',
      email: 'ai@vercito.com',
      phone: '+880 1700 000000',
      whatsapp: '880170000000',
      linkedin: 'https://linkedin.com/company/vercito',
    },
  ];

  const leadershipMembers = teamMembers.filter((m) => m.isLeadership);

  // Student Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: 'Saimon Ahmed Siddiqui',
      country: 'Italy',
      university: 'Politecnico di Milano',
      program: 'M.Sc. Computer Science & Engineering',
      rating: 5,
      review:
        'VERCITO handled my Universitaly pre-enrollment and DSU regional scholarship flawlessly. Engr. Ashraful Sir and the visa team ensured my embassy dossier had zero flaws. Got my Italian Type D visa in just 14 days!',
      year: '2025 Intake',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 2,
      name: 'Anika Tabassum',
      country: 'Germany',
      university: 'Technical University of Munich (TUM)',
      program: 'B.Sc. Data Engineering',
      rating: 5,
      review:
        'The team in Gulshan 2 helped me convert my HSC board transcript, open my Expatrio blocked account, and arrange my German Embassy appointment smoothly. 100% transparent and highly trustworthy consultancy in Bangladesh!',
      year: '2025 Intake',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 3,
      name: 'Rafiqul Islam',
      country: 'France',
      university: 'Sorbonne University Paris',
      program: 'M.Sc. Artificial Intelligence',
      rating: 5,
      review:
        'Campus France interview guidance and SOP review by VERCITO AI and senior counselors was exceptional. I secured a full fee waiver and state accommodation in Paris.',
      year: '2024 Intake',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    },
    {
      id: 4,
      name: 'Mahzabin Chowdhury',
      country: 'Hungary',
      university: 'University of Debrecen',
      program: 'M.Sc. Biotechnology & Health Science',
      rating: 5,
      review:
        'Stipendium Hungaricum scholarship pre-screening was spot on! The Chattogram branch team supported my document attestation and embassy submission with complete care.',
      year: '2025 Intake',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300',
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSubmitted(true);
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVideoSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-[#071325] text-slate-900 dark:text-slate-100 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ======================================================== */}
        {/* HEADER & HERO TITLE BAR */}
        {/* ======================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 text-[#0B1F3A] dark:text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Connect With VERCITO Senior Leadership & Counselors</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight leading-tight">
            Higher Education Advisory & Embassy Contact Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl mx-auto font-normal leading-relaxed">
            Walk into our flagship Gulshan 2 Dhaka or GEC Circle Chattogram offices, consult our executive leadership team, or connect directly via AI & WhatsApp.
          </p>

          {/* Quick Jump Buttons */}
          <div className="flex flex-wrap justify-center gap-2 pt-2 text-xs font-bold">
            <a
              href="#leadership"
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 text-[#0B1F3A] dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-sm"
            >
              👔 Meet Leadership
            </a>
            <a
              href="#team"
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 text-[#0B1F3A] dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-sm"
            >
              👥 Student Success Team
            </a>
            <a
              href="#offices"
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 text-[#0B1F3A] dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-sm"
            >
              🏢 Office Locations
            </a>
            <a
              href="#contact-form"
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 text-[#0B1F3A] dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-sm"
            >
              ✉️ Send Direct Message
            </a>
            <a
              href="#trust"
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 text-[#0B1F3A] dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-sm"
            >
              ⭐ Why Trust VERCITO
            </a>
          </div>
        </div>


        {/* ======================================================== */}
        {/* MEET OUR LEADERSHIP SECTION */}
        {/* ======================================================== */}
        <div id="leadership" className="space-y-10 scroll-mt-24">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">Executive Management</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white">
              Meet Our Leadership
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
              Direct guidance from industry pioneers who pioneered European admission pathways for Bangladeshi scholars.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {leadershipMembers.map((leader) => (
              <div
                key={leader.id}
                className="bg-gradient-to-br from-[#0B1F3A] via-[#122A4E] to-[#0B1F3A] text-white p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37] transition-all duration-300"
              >
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-all" />

                <div className="relative z-10 space-y-6">
                  {/* Executive Header Card */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="relative shrink-0">
                      <img
                        src={leader.photo}
                        alt={leader.name}
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-xl"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] text-[#0B1F3A] p-1.5 rounded-lg shadow-lg">
                        <Award className="w-4 h-4 font-bold" />
                      </div>
                    </div>

                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <div className="inline-block px-3 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-[11px] font-bold">
                        {leader.designation}
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                        {leader.name}
                      </h3>
                      <p className="text-xs text-amber-200/90 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                        <span>{leader.experience}</span>
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {leader.bio}
                      </p>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                      Core Strategic Expertise:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {leader.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 text-[11px] font-medium border border-white/10"
                        >
                          ✓ {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white/5 p-3.5 rounded-2xl border border-white/10">
                    <a
                      href={`mailto:${leader.email}`}
                      className="flex items-center gap-2 text-slate-300 hover:text-[#D4AF37] transition-colors truncate"
                    >
                      <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{leader.email}</span>
                    </a>

                    <a
                      href={`tel:${leader.phone}`}
                      className="flex items-center gap-2 text-slate-300 hover:text-[#D4AF37] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{leader.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="relative z-10 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href={`https://wa.me/${leader.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#0077B5] hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all text-center"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>

                  <button
                    onClick={() => setActiveModalMember(leader)}
                    className="py-2.5 px-3 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-[#0B1F3A] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all text-center"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Meeting</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ======================================================== */}
        {/* OUR LEADERSHIP & STUDENT SUCCESS TEAM */}
        {/* ======================================================== */}
        <div id="team" className="space-y-10 scroll-mt-24">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">Complete Support Network</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white">
              Our Leadership & Student Success Team
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
              Dedicated specialists guiding every phase of your journey — from initial profile assessment to post-visa relocation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Card Top */}
                  <div className="flex items-start gap-4">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-[#D4AF37] shrink-0 shadow-md group-hover:scale-105 transition-transform"
                    />
                    <div className="space-y-1 flex-1">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0B1F3A] dark:text-[#D4AF37] font-bold text-[10px] border border-slate-200 dark:border-slate-700">
                        {member.office}
                      </span>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#D4AF37] line-clamp-1">
                        {member.designation}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        ⏱ {member.experience}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 font-normal">
                    {member.bio}
                  </p>

                  {/* Languages Spoken */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <Globe className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>Languages: <strong>{member.languages.join(', ')}</strong></span>
                  </div>

                  {/* Expertise Badges */}
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.slice(0, 3).map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>

                  {/* Direct Contact Links */}
                  <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 truncate">
                      <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Grid */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={`https://wa.me/${member.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white border border-emerald-200 dark:border-emerald-800 font-bold flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-[#0077B5] hover:text-white border border-sky-200 dark:border-sky-800 font-bold flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>

                  <button
                    onClick={() => setActiveModalMember(member)}
                    className="py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 hover:bg-[#0B1F3A] hover:text-white border border-blue-200 dark:border-blue-800 font-bold flex items-center justify-center gap-1.5 transition-all text-center col-span-1"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video Call</span>
                  </button>

                  <button
                    onClick={onOpenAppointment}
                    className="py-2 px-3 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#0B1F3A] dark:text-[#D4AF37] hover:dark:text-[#0B1F3A] border border-[#D4AF37]/40 font-extrabold flex items-center justify-center gap-1.5 transition-all text-center col-span-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Appointment</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ======================================================== */}
        {/* OFFICE LOCATIONS & INTERACTIVE GOOGLE MAPS */}
        {/* ======================================================== */}
        <div id="offices" className="space-y-10 scroll-mt-24">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">Physical Counseling Hubs</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white">
              Our Office Locations in Bangladesh
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
              Equipped with private counseling suites, document attestation desks, and visa preparation facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dhaka Head Office Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
                    alt="Dhaka Office"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1F3A] text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold border border-[#D4AF37]/40">
                    Flagship Head Office
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1F3A] dark:text-white">
                    Dhaka Head Office (Gulshan 2)
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-semibold">Primary European & Schengen Admissions Hub</p>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Level 7, VERCITO Tower, Road 11, Block D, Gulshan 2, Dhaka-1212, Bangladesh</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>+880 1711 000000 / +880 1700 000000</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>dhaka@vercito.com</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Saturday – Thursday: 10:00 AM – 07:00 PM (Friday Closed)</span>
                  </p>
                </div>
              </div>

              {/* Map View & Directions */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="https://maps.google.com/?q=Gulshan+2+Dhaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <button
                  onClick={onOpenAppointment}
                  className="w-full py-3 px-4 rounded-xl bg-[#0B1F3A] hover:bg-[#1E3A8A] text-[#D4AF37] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all border border-[#D4AF37]/30"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Dhaka Office Visit</span>
                </button>
              </div>
            </div>

            {/* Chattogram Branch Office Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000"
                    alt="Chattogram Office"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1F3A] text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold border border-[#D4AF37]/40">
                    Greater Chattogram Hub
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1F3A] dark:text-white">
                    Chattogram Branch Office (GEC Circle)
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-semibold">Port City European Counseling Center</p>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Suite 4A, Equity Central, GEC Circle, CDA Avenue, Chattogram</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>+880 1800 000000 / +880 1811 000000</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>ctg@vercito.com</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Saturday – Thursday: 10:00 AM – 07:00 PM (Friday Closed)</span>
                  </p>
                </div>
              </div>

              {/* Map View & Directions */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="https://maps.google.com/?q=GEC+Circle+Chittagong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <button
                  onClick={onOpenAppointment}
                  className="w-full py-3 px-4 rounded-xl bg-[#0B1F3A] hover:bg-[#1E3A8A] text-[#D4AF37] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all border border-[#D4AF37]/30"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Chattogram Office Visit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Embedded Google Maps Container */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  <span>Interactive Google Maps Navigation</span>
                </h3>
                <p className="text-xs text-slate-500">Switch map view between Gulshan 2 Head Office and GEC Circle Chittagong.</p>
              </div>

              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setActiveMapOffice('dhaka')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeMapOffice === 'dhaka'
                      ? 'bg-[#0B1F3A] text-[#D4AF37] shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Dhaka Head Office
                </button>
                <button
                  onClick={() => setActiveMapOffice('chattogram')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeMapOffice === 'chattogram'
                      ? 'bg-[#0B1F3A] text-[#D4AF37] shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Chattogram Branch
                </button>
              </div>
            </div>

            <div className="h-80 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative bg-slate-100 dark:bg-slate-800">
              {activeMapOffice === 'dhaka' ? (
                <iframe
                  title="Gulshan 2 Dhaka Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.582372583804!2d90.4125!3d23.7915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f0000001%3A0x1!2sGulshan+2%2C+Dhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <iframe
                  title="GEC Circle Chattogram Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.8788!2d91.8211!3d22.3587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3752ec3000000001%3A0x1!2sGEC+Circle%2C+Chittagong!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>


        {/* ======================================================== */}
        {/* CONTACT FORM SECTION */}
        {/* ======================================================== */}
        <div id="contact-form" className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 scroll-mt-24">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">Direct Advisory Channel</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] dark:text-white">
              Send Direct Message to VERCITO Admission Desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Fill out your details below and our senior counselors will analyze your request and respond within 2 working hours.
            </p>
          </div>

          {contactSubmitted ? (
            <div className="p-8 sm:p-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-emerald-900 dark:text-emerald-200">
                Inquiry Successfully Lodged!
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                Thank you, <strong>{contactFormData.fullName}</strong>. Our admission team at <strong>{contactFormData.preferredOffice}</strong> has received your inquiry regarding <strong>{contactFormData.inquiryType}</strong> and will reach out via <strong>{contactFormData.preferredContactMethod}</strong> ({contactFormData.phone || contactFormData.email}).
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-colors"
                >
                  Send Another Inquiry
                </button>
                <button
                  onClick={onOpenAppointment}
                  className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] text-[#D4AF37] text-xs font-extrabold shadow-md hover:bg-[#1E3A8A] transition-colors"
                >
                  Book In-Person Office Appointment
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Ahmed Siddique"
                    value={contactFormData.fullName}
                    onChange={(e) => setContactFormData({ ...contactFormData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tanvir@gmail.com"
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1700 000000"
                    value={contactFormData.phone}
                    onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all"
                  />
                </div>

                {/* Preferred Office */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                    Preferred Office Location *
                  </label>
                  <select
                    value={contactFormData.preferredOffice}
                    onChange={(e) => setContactFormData({ ...contactFormData, preferredOffice: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all"
                  >
                    <option value="Dhaka Head Office (Gulshan 2)">Dhaka Head Office (Gulshan 2)</option>
                    <option value="Chattogram Branch Office (GEC Circle)">Chattogram Branch Office (GEC Circle)</option>
                  </select>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                    Preferred Contact Method *
                  </label>
                  <select
                    value={contactFormData.preferredContactMethod}
                    onChange={(e) => setContactFormData({ ...contactFormData, preferredContactMethod: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all"
                  >
                    <option value="WhatsApp">WhatsApp Message</option>
                    <option value="Phone">Direct Phone Call</option>
                    <option value="Email">Email Response</option>
                  </select>
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                    Inquiry Category *
                  </label>
                  <select
                    value={contactFormData.inquiryType}
                    onChange={(e) => setContactFormData({ ...contactFormData, inquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all"
                  >
                    <option value="Admission">University Admission & Pre-Enrollment</option>
                    <option value="Scholarship">DSU & Merit Scholarship Assistance</option>
                    <option value="Visa">Schengen Visa & VFS File Audit</option>
                    <option value="Language Program">IELTS / PTE / MOI Language Prep</option>
                    <option value="Payment">SSLCommerz Fee Payment Query</option>
                    <option value="General Inquiry">General Advisory & Consultation</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Inquiry regarding Master in CS pre-enrollment for Italy 2026 intake"
                    value={contactFormData.subject}
                    onChange={(e) => setContactFormData({ ...contactFormData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1.5">
                    Detailed Message / Academic Background *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Mention your degree background, CGPA, passing year, IELTS band score, and preferred country..."
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#0B1F3A] hover:brightness-110 text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-3 border border-[#D4AF37]/40"
              >
                <Send className="w-5 h-5 text-[#D4AF37]" />
                <span>Submit Direct Inquiry to Senior Counselors</span>
              </button>
            </form>
          )}
        </div>


        {/* ======================================================== */}
        {/* LIVE SUPPORT HUB */}
        {/* ======================================================== */}
        <div className="bg-gradient-to-r from-[#0B1F3A] via-[#122A4E] to-[#0B1F3A] text-white p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/40 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="relative z-10 text-center space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">Instant Touchpoints</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white">
              24/7 Live Support Channels
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
              Need immediate assistance? Choose your preferred instant support option below.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Chat with Founder */}
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-[#D4AF37] transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">Chat with Founder</h3>
                <p className="text-xs text-slate-300">Direct executive priority response from Engr. Ashraful Islam.</p>
              </div>
              <a
                href="https://wa.me/8801711000001"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs text-center flex items-center justify-center gap-1.5 hover:bg-amber-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Founder</span>
              </a>
            </div>

            {/* 2. Chat with Admission Team */}
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-[#D4AF37] transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">Chat Admission Team</h3>
                <p className="text-xs text-slate-300">Instant answers regarding deadline & pre-enrollment checks.</p>
              </div>
              <a
                href="https://wa.me/880170000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-white font-extrabold text-xs text-center flex items-center justify-center gap-1.5 hover:bg-emerald-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Admission WhatsApp</span>
              </a>
            </div>

            {/* 3. Request Callback */}
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-[#D4AF37] transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">Request Callback</h3>
                <p className="text-xs text-slate-300">Schedule a phone callback from a counselor at your convenient time.</p>
              </div>
              <button
                onClick={() => {
                  setCallbackSubmitted(false);
                  setIsCallbackModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-sky-500 text-white font-extrabold text-xs text-center flex items-center justify-center gap-1.5 hover:bg-sky-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Request Call</span>
              </button>
            </div>

            {/* 4. AI Counselor */}
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10 hover:border-[#D4AF37] transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white">AI Study Counselor</h3>
                <p className="text-xs text-slate-300">24/7 automated course eligibility & scholarship checker.</p>
              </div>
              <button
                onClick={onOpenAIEvaluator}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E2C044] text-[#0B1F3A] font-extrabold text-xs text-center flex items-center justify-center gap-1.5 hover:brightness-110 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Talk to AI Counselor</span>
              </button>
            </div>
          </div>
        </div>


        {/* ======================================================== */}
        {/* WHY STUDENTS TRUST VERCITO (TRUST & HIGHLIGHTS) */}
        {/* ======================================================== */}
        <div id="trust" className="space-y-12 scroll-mt-24">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">Proven Success Records</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white">
              Why Students Trust VERCITO
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
              Over a decade of ethical higher education counseling, 100% transparent procedures, and guaranteed student satisfaction.
            </p>
          </div>

          {/* Animated Counters Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-1 shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-[#D4AF37]">5,000+</div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400">Students Guided</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-1 shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-[#D4AF37]">100+</div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400">Partner Universities</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-1 shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-[#D4AF37]">30+</div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400">Study Destinations</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-1 shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">98.4%</div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400">Visa Success Record</div>
            </div>
          </div>

          {/* 12 Trust Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Scholarship Assistance', desc: 'Expert guidance for DSU, DAAD, and 100% tuition waivers.' },
              { title: 'Visa Application Support', desc: 'Complete VFS dossier audit & bank solvency compliance.' },
              { title: 'Secure SSLCommerz Payment Gateway', desc: 'Verified local BDT bank & mobile banking payments.' },
              { title: 'AI-Powered Student Portal', desc: 'Track your university applications in real time.' },
              { title: '24/7 Student Support', desc: 'Direct access to senior counselors via phone & WhatsApp.' },
              { title: 'Professional Document Review', desc: 'SOP, CV, & LOR refinement by academic editors.' },
              { title: 'AI Eligibility Assessment', desc: 'Instant university matching based on your CGPA.' },
              { title: 'Fast Application Processing', desc: 'Expedited pre-enrollment submission on Universitaly.' },
              { title: 'Transparent Admission Process', desc: 'Zero hidden fees with clear contract terms.' },
              { title: 'Embassy Legalization Guarantee', desc: 'Notary, Ministry, and MOFA attestation assistance.' },
              { title: 'Pre-Departure Briefings', desc: 'Flight booking, forex card setup, and packing checklists.' },
              { title: 'Post-Arrival Accommodation Assistance', desc: 'Airport pick-up & Codice Fiscale tax permit support.' },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3 hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 font-extrabold text-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ======================================================== */}
        {/* STUDENT TESTIMONIALS SLIDER */}
        {/* ======================================================== */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">Verified Reviews</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] dark:text-white">
                Student Success Stories
              </h2>
            </div>

            {/* Slider Nav Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-[#D4AF37] hover:text-[#0B1F3A] text-slate-700 dark:text-slate-300 transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-[#D4AF37] hover:text-[#0B1F3A] text-slate-700 dark:text-slate-300 transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
              <img
                src={testimonials[currentTestimonialIndex].photo}
                alt={testimonials[currentTestimonialIndex].name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-lg shrink-0"
              />

              <div className="space-y-4 text-center md:text-left flex-1">
                {/* Rating */}
                <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                  {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-500 font-bold ml-2">5.0 / 5.0 Rating</span>
                </div>

                <p className="text-sm sm:text-base font-serif italic text-slate-700 dark:text-slate-200 leading-relaxed">
                  "{testimonials[currentTestimonialIndex].review}"
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs">
                  <strong className="text-slate-900 dark:text-white font-bold text-sm">
                    {testimonials[currentTestimonialIndex].name}
                  </strong>
                  <span className="text-slate-400">•</span>
                  <span className="text-[#0B1F3A] dark:text-[#D4AF37] font-bold">
                    {testimonials[currentTestimonialIndex].university} ({testimonials[currentTestimonialIndex].country})
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{testimonials[currentTestimonialIndex].program}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px]">
                    ✓ Visa Granted ({testimonials[currentTestimonialIndex].year})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* ======================================================== */}
        {/* BOOK A FREE CONSULTATION (CTA BANNER) */}
        {/* ======================================================== */}
        <div className="bg-gradient-to-r from-[#0B1F3A] via-[#122A4E] to-[#0B1F3A] text-white p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/50 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>Take The First Step Today</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Secure Your European University Admission?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Book a 1-on-1 free consultation with our senior admission counselors in Gulshan 2 or GEC Circle Chattogram today.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={onOpenAppointment}
              className="py-3.5 px-6 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-[#0B1F3A] font-extrabold text-xs shadow-xl transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Consultation</span>
            </button>

            <button
              onClick={onOpenAIEvaluator}
              className="py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Talk to AI Counselor</span>
            </button>

            <a
              href="https://wa.me/880170000000"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Now</span>
            </a>

            <a
              href="tel:+880170000000"
              className="py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>


        {/* ======================================================== */}
        {/* FOOTER CONTACT BAR & EMERGENCY HELPLINE */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            {/* Emergency Hotline */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 tracking-wider block">
                🚨 Emergency Student Support
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">+880 1711 000000</p>
              <p className="text-slate-500 text-[11px]">24/7 Helpline for ongoing visa & flight departures</p>
            </div>

            {/* Official WhatsApp */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider block">
                💬 Official WhatsApp
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">+880 1700 000000</p>
              <p className="text-slate-500 text-[11px]">Instant admission & pre-enrollment desk</p>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                ✉️ Official Email
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">info@vercito.com</p>
              <p className="text-slate-500 text-[11px]">Formal inquiries & university partnerships</p>
            </div>

            {/* Office Hours */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider block">
                ⏰ Office Hours
              </span>
              <p className="font-bold text-xs text-slate-900 dark:text-white">Sat - Thu: 10:00 AM - 07:00 PM</p>
              <p className="text-slate-500 text-[11px]">Friday Closed (Emergency Helpline Open)</p>
            </div>
          </div>

          {/* Social Links Bar */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>Connect with VERCITO Higher Education across official social channels:</span>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-[#0B1F3A] transition-colors">
                Facebook
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-[#0077B5] transition-colors">
                LinkedIn
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-rose-500 transition-colors">
                Instagram
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-red-600 transition-colors">
                YouTube
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* VIDEO MEETING / APPOINTMENT MODAL */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeModalMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => {
                  setActiveModalMember(null);
                  setVideoSubmitted(false);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={activeModalMember.photo}
                  alt={activeModalMember.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-md shrink-0"
                />
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                    Schedule Meeting with {activeModalMember.name}
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-semibold">{activeModalMember.designation}</p>
                </div>
              </div>

              {videoSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    Meeting Confirmed!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Your appointment with <strong>{activeModalMember.name}</strong> on <strong>{videoForm.preferredDate || 'Tomorrow'}</strong> at <strong>{videoForm.preferredTime}</strong> has been logged. Google Meet details sent to {videoForm.email}.
                  </p>
                  <button
                    onClick={() => {
                      setActiveModalMember(null);
                      setVideoSubmitted(false);
                    }}
                    className="mt-2 px-4 py-2 bg-[#0B1F3A] text-white rounded-xl text-xs font-bold"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVideoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Saimon Chowdhury"
                      value={videoForm.studentName}
                      onChange={(e) => setVideoForm({ ...videoForm, studentName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="student@gmail.com"
                        value={videoForm.email}
                        onChange={(e) => setVideoForm({ ...videoForm, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
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
                        value={videoForm.phone}
                        onChange={(e) => setVideoForm({ ...videoForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={videoForm.preferredDate}
                        onChange={(e) => setVideoForm({ ...videoForm, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Preferred Time *
                      </label>
                      <select
                        value={videoForm.preferredTime}
                        onChange={(e) => setVideoForm({ ...videoForm, preferredTime: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                      >
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0B1F3A] hover:bg-[#1E3A8A] text-[#D4AF37] font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Video className="w-4 h-4" />
                    <span>Confirm Meeting Reservation</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* ======================================================== */}
      {/* CALLBACK REQUEST MODAL */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isCallbackModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => setIsCallbackModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                  <span>Request Phone Callback</span>
                </h3>
                <p className="text-xs text-slate-500">Leave your number and a counselor will call you back within 30 minutes.</p>
              </div>

              {callbackSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    Callback Logged!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Thank you <strong>{callbackForm.name}</strong>. A counselor will reach out to <strong>{callbackForm.phone}</strong> during {callbackForm.preferredTime}.
                  </p>
                  <button
                    onClick={() => setIsCallbackModalOpen(false)}
                    className="mt-2 px-4 py-2 bg-[#0B1F3A] text-white rounded-xl text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mahbub Alam"
                      value={callbackForm.name}
                      onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1700 000000"
                      value={callbackForm.phone}
                      onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Preferred Call Window
                    </label>
                    <select
                      value={callbackForm.preferredTime}
                      onChange={(e) => setCallbackForm({ ...callbackForm, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                    >
                      <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                      <option value="Evening (5:00 PM - 7:00 PM)">Evening (5:00 PM - 7:00 PM)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0B1F3A] hover:bg-[#1E3A8A] text-[#D4AF37] font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Request Urgent Callback</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
