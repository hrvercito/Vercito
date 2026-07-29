/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  COUNTRY_DESTINATIONS,
  UNIVERSITY_PARTNERS,
  SCHOLARSHIPS,
  SUCCESS_STORIES,
  FAQS,
  DOCUMENT_CHECKLIST,
  BLOG_POSTS,
} from './mockData';
import { UNIVERSITIES_DATABASE } from './universitiesDatabase';
import {
  CountryDestination,
  UniversityPartner,
  Scholarship,
  SuccessStory,
  FAQItem,
  DocumentChecklistItem,
  BlogPost,
  FounderProfile,
  ContactInfo,
} from '../types';

export interface CMSHeroContent {
  topBadgeBn: string;
  topBadgeEn: string;
  title1Bn: string;
  title1En: string;
  title2Bn: string;
  title2En: string;
  subtitleBn: string;
  subtitleEn: string;
  evaluateAiBn: string;
  evaluateAiEn: string;
  bookConsultationBn: string;
  bookConsultationEn: string;
  stat1ValBn: string;
  stat1ValEn: string;
  stat1LabelBn: string;
  stat1LabelEn: string;
  stat2ValBn: string;
  stat2ValEn: string;
  stat2LabelBn: string;
  stat2LabelEn: string;
  stat3ValBn: string;
  stat3ValEn: string;
  stat3LabelBn: string;
  stat3LabelEn: string;
  stat4ValBn: string;
  stat4ValEn: string;
  stat4LabelBn: string;
  stat4LabelEn: string;
  widgetBadgeBn: string;
  widgetBadgeEn: string;
  widgetTitleBn: string;
  widgetTitleEn: string;
  widgetCountryLabelBn: string;
  widgetCountryLabelEn: string;
  widgetDegreeLabelBn: string;
  widgetDegreeLabelEn: string;
  widgetScoreLabelBn: string;
  widgetScoreLabelEn: string;
  analyzeBtnBn: string;
  analyzeBtnEn: string;
}

export interface CMSData {
  hero: CMSHeroContent;
  destinations: CountryDestination[];
  universities: UniversityPartner[];
  scholarships: Scholarship[];
  testimonials: SuccessStory[];
  faqs: FAQItem[];
  visaChecklist: DocumentChecklistItem[];
  blogs: BlogPost[];
  founderProfile: FounderProfile;
  contactInfo: ContactInfo;
}

export const DEFAULT_FOUNDER_PROFILE: FounderProfile = {
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
};

export const DEFAULT_CONTACT_INFO: ContactInfo = {
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
};

export const DEFAULT_CMS_DATA: CMSData = {
  hero: {
    topBadgeBn: 'ইউরোপ ও আমেরিকা উচ্চশিক্ষা এবং সরকারি স্কলারশিপ স্পেশালিস্ট',
    topBadgeEn: 'Europe & USA Higher Education & Student Visa Specialist',
    title1Bn: 'ইউরোপ ও আমেরিকার সেরা বিশ্ববিদ্যালয়ে',
    title1En: 'Shape Your Global Future In',
    title2Bn: 'আপনার উচ্চশিক্ষার স্বপ্ন পূরণ করুন',
    title2En: "Europe & America's Top Universities",
    subtitleBn:
      'বাংলাদেশি শিক্ষার্থীদের জন্য ১০০% স্কলারশিপ, বিনা টিউশন ফি-তে ইটালি, জার্মানি, আমেরিকা, ফ্রান্স ও ইউরোপিয়ান ইউনিয়নের শীর্ষ বিশ্ববিদ্যালয়ে ভর্তি ও নির্ভরযোগ্য ভিসা প্রসেসিং।',
    subtitleEn:
      '100% Scholarship Assistance, Tuition-Free Public Universities, and Expert Visa Processing for Bangladeshi Students targeting Italy, Germany, USA, France, and EU destinations.',
    evaluateAiBn: 'এআই দিয়ে যোগ্যতা যাচাই করুন',
    evaluateAiEn: 'Evaluate Profile with AI',
    bookConsultationBn: 'ফ্রি কাউন্সেলিং বুক করুন',
    bookConsultationEn: 'Book Free Counseling',
    stat1ValBn: '৯৮.৮%',
    stat1ValEn: '98.8%',
    stat1LabelBn: 'ভিসা সাফল্যের হার',
    stat1LabelEn: 'Visa Success Rate',
    stat2ValBn: '€৭,০০০',
    stat2ValEn: '€7,000',
    stat2LabelBn: 'বার্ষিক ডিএসইউ স্কলারশিপ',
    stat2LabelEn: 'Max Annual DSU Grant',
    stat3ValBn: '৩,৫০০+',
    stat3ValEn: '3,500+',
    stat3LabelBn: 'সফল শিক্ষার্থী',
    stat3LabelEn: 'Successful Students',
    stat4ValBn: '১০০%',
    stat4ValEn: '100%',
    stat4LabelBn: 'টিউশন ফি ওয়েভার সুবিধা',
    stat4LabelEn: 'Tuition Waiver Support',
    widgetBadgeBn: 'তাত্ক্ষণিক অ্যাসেসমেন্ট',
    widgetBadgeEn: 'Instant Check',
    widgetTitleBn: 'ইউরোপ ও আমেরিকায় ভর্তির যোগ্যতা যাচাই',
    widgetTitleEn: 'Check Admission Eligibility',
    widgetCountryLabelBn: 'পছন্দের দেশ / গন্তব্য',
    widgetCountryLabelEn: 'Target Country / Destination',
    widgetDegreeLabelBn: 'ডিগ্রির স্তর',
    widgetDegreeLabelEn: 'Degree Level',
    widgetScoreLabelBn: 'আইইএলটিএস / ইংরেজি দক্ষতা',
    widgetScoreLabelEn: 'IELTS / English Score',
    analyzeBtnBn: 'আমার যোগ্যতা বিশ্লেষণ করুন',
    analyzeBtnEn: 'Analyze My Eligibility',
  },
  destinations: COUNTRY_DESTINATIONS,
  universities: (() => {
    const map = new Map<string, UniversityPartner>();
    UNIVERSITIES_DATABASE.forEach(u => map.set(u.id, u));
    UNIVERSITY_PARTNERS.forEach(u => {
      if (!map.has(u.id)) {
        map.set(u.id, u);
      }
    });
    return Array.from(map.values());
  })(),
  scholarships: SCHOLARSHIPS,
  testimonials: SUCCESS_STORIES,
  faqs: FAQS,
  visaChecklist: DOCUMENT_CHECKLIST,
  blogs: BLOG_POSTS,
  founderProfile: DEFAULT_FOUNDER_PROFILE,
  contactInfo: DEFAULT_CONTACT_INFO,
};
