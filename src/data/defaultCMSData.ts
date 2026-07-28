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
import {
  CountryDestination,
  UniversityPartner,
  Scholarship,
  SuccessStory,
  FAQItem,
  DocumentChecklistItem,
  BlogPost,
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
}

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
  universities: UNIVERSITY_PARTNERS,
  scholarships: SCHOLARSHIPS,
  testimonials: SUCCESS_STORIES,
  faqs: FAQS,
  visaChecklist: DOCUMENT_CHECKLIST,
  blogs: BLOG_POSTS,
};
