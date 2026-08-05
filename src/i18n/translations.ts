/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SupportedLanguage } from './languages';

export interface Dictionary {
  [key: string]: string;

  // Navigation
  'nav.home': string;
  'nav.about': string;
  'nav.destinations': string;
  'nav.services': string;
  'nav.scholarships': string;
  'nav.universities': string;
  'nav.languagePrograms': string;
  'nav.studentPortal': string;
  'nav.payments': string;
  'nav.blog': string;
  'nav.faq': string;
  'nav.contact': string;
  'nav.login': string;
  'nav.aiCheck': string;
  'nav.bookConsultation': string;
  'nav.applyOnline': string;
  'nav.applyNow': string;
  'nav.viewMyApplication': string;
  'nav.sitemap': string;
  'nav.tagline': string;

  // Hero Section
  'hero.applyNow': string;
  'HERO.APPLYNOW': string;
  'hero.viewMyApplication': string;
  'HERO.VIEWMYAPPLICATION': string;
  'hero.targetCountry': string;
  'hero.targetcountry': string;
  'hero.degreeLevel': string;
  'hero.degreelevel': string;
  'hero.ieltsScore': string;
  'hero.ieltsscore': string;
  'hero.analyzeEligibility': string;
  'HERO.ANALYZEELIGIBILITY': string;
  'hero.instantCheck': string;
  'HERO.INSTANTCHECK': string;
  'hero.checkEligibility': string;
  'hero.visaSuccess': string;
  'hero.maxScholarship': string;
  'hero.studentsPlaced': string;
  'hero.tuitionWaiver': string;
  'hero.topBadge': string;
  'hero.title1': string;
  'hero.title2': string;
  'hero.subtitle': string;
  'hero.evaluateAi': string;
  'hero.bookConsultation': string;
  'hero.stat1Val': string;
  'hero.stat1Label': string;
  'hero.stat2Val': string;
  'hero.stat2Label': string;
  'hero.stat3Val': string;
  'hero.stat3Label': string;
  'hero.stat4Val': string;
  'hero.stat4Label': string;
  'hero.widgetBadge': string;
  'hero.widgetTitle': string;
  'hero.widgetCountryLabel': string;
  'hero.widgetDegreeLabel': string;
  'hero.widgetScoreLabel': string;
  'hero.analyzeBtn': string;
  'hero.bookConsultation': string;
  'hero.stat1Val': string;
  'hero.stat1Label': string;
  'hero.stat2Val': string;
  'hero.stat2Label': string;
  'hero.stat3Val': string;
  'hero.stat3Label': string;
  'hero.stat4Val': string;
  'hero.stat4Label': string;
  'hero.widgetBadge': string;
  'hero.widgetTitle': string;
  'hero.widgetCountryLabel': string;
  'hero.widgetDegreeLabel': string;
  'hero.widgetScoreLabel': string;
  'hero.analyzeBtn': string;

  // Legacy Hero aliases for safety
  'hero.badge': string;
  'hero.titleLine1': string;
  'hero.titleLine2': string;
  'hero.ctaAIEvaluator': string;
  'hero.ctaBook': string;
  'hero.ctaApply': string;
  'hero.statsVisa': string;
  'hero.statsVisaLabel': string;
  'hero.statsStudents': string;
  'hero.statsStudentsLabel': string;
  'hero.statsGrants': string;
  'hero.statsGrantsLabel': string;
  'hero.quickWidgetTitle': string;
  'hero.quickWidgetDesc': string;
  'hero.quickSelectDegree': string;
  'hero.quickSelectCountry': string;
  'hero.quickCheckBtn': string;

  // Study Destinations
  'destinations.tag': string;
  'destinations.title': string;
  'destinations.subtitle': string;
  'destinations.applyNow': string;
  'destinations.tuition': string;
  'destinations.livingCost': string;
  'destinations.workRights': string;
  'destinations.postStudy': string;
  'destinations.scholarship': string;
  'destinations.visaSuccess': string;
  'destinations.perYear': string;
  'destinations.perMonth': string;

  // Services
  'services.tag': string;
  'services.title': string;
  'services.subtitle': string;
  'services.bookConsultation': string;
  'services.startApplication': string;

  // Scholarship Calculator
  'calculator.tag': string;
  'calculator.title': string;
  'calculator.subtitle': string;
  'calculator.inputGpa': string;
  'calculator.inputIelts': string;
  'calculator.inputCountry': string;
  'calculator.calculateBtn': string;
  'calculator.eligibleTitle': string;
  'calculator.matchScore': string;
  'calculator.applyGrant': string;

  // Partner Universities
  'partners.tag': string;
  'partners.title': string;
  'partners.subtitle': string;
  'partners.ranking': string;
  'partners.tuition': string;
  'partners.englishWaiver': string;
  'partners.applyNow': string;

  // Student Journey
  'journey.tag': string;
  'journey.title': string;
  'journey.subtitle': string;
  'journey.duration': string;
  'journey.actionItems': string;

  // Success Stories / Testimonials
  'testimonials.tag': string;
  'testimonials.title': string;
  'testimonials.subtitle': string;
  'testimonials.filterAll': string;
  'testimonials.studentsIn': string;
  'testimonials.visaApproved': string;
  'testimonials.scholarshipWon': string;

  // Visa Checklist
  'checklist.tag': string;
  'checklist.title': string;
  'checklist.subtitle': string;
  'checklist.filterAll': string;
  'checklist.filterAcademic': string;
  'checklist.filterFinancial': string;
  'checklist.filterEmbassy': string;
  'checklist.filterApp': string;
  'checklist.mandatory': string;
  'checklist.bdNote': string;

  // Blog
  'blog.tag': string;
  'blog.title': string;
  'blog.subtitle': string;
  'blog.readMore': string;

  // FAQ
  'faq.tag': string;
  'faq.title': string;
  'faq.subtitle': string;

  // Contact
  'contact.tag': string;
  'contact.title': string;
  'contact.subtitle': string;
  'contact.dhakaOffice': string;
  'contact.ctgOffice': string;
  'contact.phone': string;
  'contact.email': string;
  'contact.hours': string;

  // Footer
  'footer.tagline': string;
  'footer.aboutText': string;
  'footer.officeLocations': string;
  'FOOTER.OFFICELOCATIONS': string;
  'footer.quickLinks': string;
  'footer.services': string;
  'footer.countries': string;
  'footer.rights': string;
  'footer.sitemap': string;

  // Language Banner
  'langBanner.notice': string;
  'langBanner.switchBtn': string;
  'langBanner.keepBtn': string;

  // Sitemap Modal
  'sitemap.title': string;
  'sitemap.subtitle': string;
  'sitemap.downloadXml': string;
  'sitemap.close': string;

  // New UX & Redesign Keys
  'nav.infoGuidelines': string;
  'nav.infoGuidelinesDesc': string;
  'nav.studentPortal': string;
  'nav.studentPortalDesc': string;
  'nav.adminPanel': string;
  'nav.adminPanelDesc': string;
  'nav.supportContact': string;
  'nav.supportContactDesc': string;

  'hero.startAppBtn': string;
  'hero.costEstimatorBtn': string;

  'process.tag': string;
  'process.title': string;
  'process.subtitle': string;

  'docGuide.tag': string;
  'docGuide.title': string;
  'docGuide.subtitle': string;
  'docGuide.mandatory': string;
  'docGuide.expandDetails': string;
  'docGuide.hideDetails': string;

  'gallery.tag': string;
  'gallery.title': string;
  'gallery.subtitle': string;
  'gallery.allCountries': string;

  'stepper.tag': string;
  'stepper.title': string;
  'stepper.subtitle': string;
  'stepper.step1Title': string;
  'stepper.step2Title': string;
  'stepper.step3Title': string;
  'stepper.selectUni': string;
  'stepper.selectCourse': string;
  'stepper.addonsTitle': string;
  'stepper.totalBudget': string;
  'stepper.tuitionEst': string;
  'stepper.livingEst': string;
  'stepper.vercitoFee': string;
  'stepper.grandTotal': string;
  'stepper.applyWithPlan': string;

  'portal.title': string;
  'portal.subtitle': string;
  'portal.trackPlaceholder': string;
  'portal.trackBtn': string;
  'portal.uploadTab': string;
  'portal.trackTab': string;
  'portal.uploadTitle': string;
  'portal.uploadDesc': string;

  // Modals
  'modals.aiTitle': string;
  'modals.aiDesc': string;
  'modals.appointmentTitle': string;
  'modals.appointmentDesc': string;
  'modals.applicationTitle': string;
  'modals.applicationDesc': string;
  'modals.submit': string;
  'modals.close': string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Dictionary> = {
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.destinations': 'গন্তব্যসমূহ',
    'nav.services': 'সেবাসমূহ',
    'nav.scholarships': 'স্কলারশিপ',
    'nav.universities': 'বিশ্ববিদ্যালয়',
    'nav.testimonials': 'সাফল্যের গল্প',
    'nav.visaChecklist': 'ভিসা চেকলিস্ট',
    'nav.blog': 'ব্লগ ও নির্দেশিকা',
    'nav.faq': 'প্রশ্নোত্তর',
    'nav.contact': 'যোগাযোগ',
    'nav.languagePrograms': 'ভাষা প্রোগ্রাম',
    'nav.studentPortal': 'স্টুডেন্ট পোর্টাল',
    'nav.payments': 'পেমেন্ট গেটওয়ে',
    'nav.login': 'এডমিন / স্টুডেন্ট লগইন',
    'nav.aiCheck': 'এআই যোগ্যতা পরীক্ষা',
    'nav.bookConsultation': 'পরামর্শ বুক করুন',
    'nav.applyOnline': 'অনলাইন আবেদন',
    'nav.applyNow': 'অনলাইন আবেদন',
    'nav.viewMyApplication': 'আমার আবেদন দেখুন',
    'nav.sitemap': 'সাইটম্যাপ',
    'nav.tagline': 'সীমানা ছাড়িয়ে আপনার ভবিষ্যৎ গঠন',

    // Hero Section (Used in Hero.tsx)
    'hero.applyNow': 'এখনই আবেদন করুন',
    'HERO.APPLYNOW': 'এখনই আবেদন করুন',
    'hero.viewMyApplication': 'আমার আবেদন দেখুন',
    'HERO.VIEWMYAPPLICATION': 'আমার আবেদন দেখুন',
    'hero.targetCountry': 'লক্ষ্য দেশ',
    'hero.targetcountry': 'লক্ষ্য দেশ',
    'hero.degreeLevel': 'ডিগ্রির স্তর',
    'hero.degreelevel': 'ডিগ্রির স্তর',
    'hero.ieltsScore': 'আইইএলটিএস স্কোর',
    'hero.ieltsscore': 'আইইএলটিএস স্কোর',
    'hero.analyzeEligibility': 'যোগ্যতা যাচাই করুন',
    'HERO.ANALYZEELIGIBILITY': 'যোগ্যতা যাচাই করুন',
    'hero.instantCheck': 'তাত্ক্ষণিক অ্যাসেসমেন্ট',
    'HERO.INSTANTCHECK': 'তাত্ক্ষণিক অ্যাসেসমেন্ট',
    'hero.checkEligibility': 'ইউরোপ ও আমেরিকায় ভর্তির যোগ্যতা যাচাই',
    'hero.visaSuccess': 'ভিসা সাফল্যের হার',
    'hero.maxScholarship': 'বার্ষিক সর্বোচ্চ স্কলারশিপ',
    'hero.studentsPlaced': 'সফল শিক্ষার্থী',
    'hero.tuitionWaiver': 'টিউশন ফি ওয়েভার সুবিধা',
    'hero.topBadge': 'ইউরোপ ও আমেরিকা উচ্চশিক্ষা এবং সরকারি স্কলারশিপ স্পেশালিস্ট',
    'hero.title1': 'ইউরোপ ও আমেরিকার সেরা বিশ্ববিদ্যালয়ে',
    'hero.title2': 'আপনার উচ্চশিক্ষার স্বপ্ন পূরণ করুন',
    'hero.subtitle': 'বাংলাদেশি শিক্ষার্থীদের জন্য ১০০% স্কলারশিপ, বিনা টিউশন ফি-তে ইটালি, জার্মানি, আমেরিকা, ফ্রান্স ও ইউরোপিয়ান ইউনিয়নের শীর্ষ বিশ্ববিদ্যালয়ে ভর্তি ও নির্ভরযোগ্য ভিসা প্রসেসিং।',
    'hero.evaluateAi': 'এআই দিয়ে যোগ্যতা যাচাই করুন',
    'hero.bookConsultation': 'ফ্রি কাউন্সেলিং বুক করুন',
    'hero.stat1Val': '৯৮.৮%',
    'hero.stat1Label': 'ভিসা সাফল্যের হার',
    'hero.stat2Val': '€৭,০০০',
    'hero.stat2Label': 'বার্ষিক ডিএসইউ স্কলারশিপ',
    'hero.stat3Val': '৩,৫০০+',
    'hero.stat3Label': 'সফল শিক্ষার্থী',
    'hero.stat4Val': '১০০%',
    'hero.stat4Label': 'টিউশন ফি ওয়েভার সুবিধা',
    'hero.widgetBadge': 'তাত্ক্ষণিক অ্যাসেসমেন্ট',
    'hero.widgetTitle': 'ইউরোপ ও আমেরিকায় ভর্তির যোগ্যতা যাচাই',
    'hero.widgetCountryLabel': 'পছন্দের দেশ / গন্তব্য',
    'hero.widgetDegreeLabel': 'ডিগ্রির স্তর',
    'hero.widgetScoreLabel': 'আইইএলটিএস / ইংরেজি দক্ষতা',
    'hero.analyzeBtn': 'আমার যোগ্যতা বিশ্লেষণ করুন',

    // Legacy Hero aliases
    'hero.badge': 'ইউরোপ ও আমেরিকা উচ্চশিক্ষা ও সরকারি স্কলারশিপ স্পেশালিস্ট',
    'hero.titleLine1': 'ইউরোপ ও আমেরিকার সেরা বিশ্ববিদ্যালয়ে',
    'hero.titleLine2': '১০০% স্কলারশিপে উচ্চশিক্ষা',
    'hero.ctaAIEvaluator': 'ফ্রি এআই প্রোফাইল চেক',
    'hero.ctaBook': 'পরামর্শ বুক করুন',
    'hero.ctaApply': 'অনলাইন আবেদন করুন',
    'hero.statsVisa': '৯৮.৮%',
    'hero.statsVisaLabel': 'ভিসা সাফল্যের হার',
    'hero.statsStudents': '৩,৫০০+',
    'hero.statsStudentsLabel': 'সফল শিক্ষার্থী',
    'hero.statsGrants': '€৮.৫ মিলিয়ন+',
    'hero.statsGrantsLabel': 'অর্জিত স্কলারশিপ ফান্ড',
    'hero.quickWidgetTitle': 'আপনার যোগ্যতা যাচাই করুন',
    'hero.quickWidgetDesc': '১ মিনিটে ইউরো স্কলারশিপ ও ভর্তির সুযোগ দেখুন',
    'hero.quickSelectDegree': 'ডিগ্রি লেভেল নির্বাচন করুন',
    'hero.quickSelectCountry': 'পছন্দের দেশ',
    'hero.quickCheckBtn': 'যোগ্যতা পরীক্ষা করুন',

    // Study Destinations
    'destinations.tag': 'উচ্চশিক্ষার দেশসমূহ',
    'destinations.title': 'ইউরোপ ও আমেরিকার সেরা গন্তব্যসমূহ',
    'destinations.subtitle': 'বিনামূল্যে বা স্বল্প খরচে আন্তর্জাতিক মানের শিক্ষা ও উজ্জ্বল ক্যারিয়ার গড়ার সেরা সুযোগ।',
    'destinations.applyNow': 'এখনই আবেদন করুন',
    'destinations.tuition': 'টিউশন ফি:',
    'destinations.livingCost': 'জীবনযাত্রার খরচ:',
    'destinations.workRights': 'কাজের অধিকার:',
    'destinations.postStudy': 'পড়াশোনা পরবর্তী ভিসা:',
    'destinations.scholarship': 'স্কলারশিপ সুযোগ:',
    'destinations.visaSuccess': 'ভিসা সাফল্যের হার:',
    'destinations.perYear': '/বছর',
    'destinations.perMonth': '/মাস',

    // Services
    'services.tag': 'আমাদের প্রিমিয়াম সেবাসমূহ',
    'services.title': 'ভর্তি থেকে ভিসা ও স্কলারশিপ পর্যন্ত পূর্ণাঙ্গ সহায়তা',
    'services.subtitle': 'অভিজ্ঞ কাউন্সিলর ও ডকুমেন্ট স্পেশালিস্টদের মাধ্যমে শতভাগ নির্ভুল আবেদন প্রক্রিয়া।',
    'services.bookConsultation': 'পরামর্শের জন্য যোগাযোগ করুন',
    'services.startApplication': 'আবেদন শুরু করুন',

    // Scholarship Calculator
    'calculator.tag': 'স্কলারশিপ ক্যালকুলেটর',
    'calculator.title': 'আপনার স্কলারশিপের সম্ভাবনা হিসেব করুন',
    'calculator.subtitle': 'আপনার জিপিএ ও আইইএলটিএস স্কোরের ওপর ভিত্তি করে সম্ভাব্য স্কলারশিপ দেখুন।',
    'calculator.inputGpa': 'আপনার সিজিপিএ / জিপিএ (৪.০ স্কেল):',
    'calculator.inputIelts': 'আইইএলটিএস ব্যান্ড স্কোর:',
    'calculator.inputCountry': 'লক্ষ্যস্থল দেশ:',
    'calculator.calculateBtn': 'স্কলারশিপ গণনা করুন',
    'calculator.eligibleTitle': 'আপনার জন্য উপযুক্ত স্কলারশিপসমূহ:',
    'calculator.matchScore': 'ম্যাচ স্কোর:',
    'calculator.applyGrant': 'স্কলারশিপের জন্য আবেদন করুন',

    // Partner Universities
    'partners.tag': 'পার্টনার বিশ্ববিদ্যালয়সমূহ',
    'partners.title': 'ইউরোপ ও আমেরিকার শীর্ষ সারির বিশ্ববিদ্যালয়',
    'partners.subtitle': 'পাবলিক ও প্রাইভেট বিশ্ববিদ্যালয়ে ইংরেজি মাধ্যমে আন্তর্জাতিক শিক্ষার সুযোগ।',
    'partners.ranking': 'ওয়ার্ল্ড র‍্যাংকিং:',
    'partners.tuition': 'টিউশন ফি:',
    'partners.englishWaiver': 'আইইএলটিএস ওয়েভার সম্ভব',
    'partners.applyNow': 'আবেদন করুন',

    // Student Journey
    'journey.tag': 'আপনার ৬ ধাপের যাত্রা',
    'journey.title': 'ভার্সিটো-র সাথে বিদেশে পৌঁছানোর সঠিক ধাপ',
    'journey.subtitle': 'প্রথম ফ্রি কাউন্সিলিং থেকে শুরু করে ফ্লাইট ও আবাসন ব্যবস্থা পর্যন্ত স্বচ্ছ প্রক্রিয়া।',
    'journey.duration': 'সময়কাল:',
    'journey.actionItems': 'প্রধান পদক্ষেপসমূহ:',

    // Success Stories / Testimonials
    'testimonials.tag': 'সফল শিক্ষার্থীদের অভিজ্ঞতা',
    'testimonials.title': 'ইউরোপ ও আমেরিকায় অধ্যয়নরত আমাদের সফল বাংলাদেশি শিক্ষার্থী',
    'testimonials.subtitle': 'ভার্সিটো-র নির্ভরযোগ্য দিকনির্দেশনায় শতভাগ ভিসা ও স্কলারশিপ পেয়ে বিদেশে অধ্যয়নরত বাংলাদেশি শিক্ষার্থীদের সত্যিকারের অভিজ্ঞতা।',
    'testimonials.filterAll': 'সকল সফল গল্প',
    'testimonials.studentsIn': '{country}-তে অধ্যয়নরত শিক্ষার্থী',
    'testimonials.visaApproved': 'ভিসা অনুমোদিত',
    'testimonials.scholarshipWon': 'স্কলারশিপ বিজয়ী:',

    // Visa Checklist
    'checklist.tag': 'ভিসা ও ডকুমেন্ট চেকলিস্ট',
    'checklist.title': 'ভিসা আবেদনের জন্য প্রয়োজনীয় কাগজপত্র',
    'checklist.subtitle': 'ভিসা রিজেকশন এড়াতে আমাদের চেকলিস্ট অনুসরণ করে ফাইল প্রস্তুত করুন।',
    'checklist.filterAll': 'সব ডকুমেন্ট',
    'checklist.filterAcademic': 'একাডেমিক সার্টিফিকেট',
    'checklist.filterFinancial': 'ব্যাংক ও আর্থিক বিবরণী',
    'checklist.filterEmbassy': 'এমবেসি ও পুলিশ ক্লিয়ারেন্স',
    'checklist.filterApp': 'আবেদন ও আবেদনপত্র',
    'checklist.mandatory': 'বাধ্যতামূলক',
    'checklist.bdNote': 'বাংলাদেশি শিক্ষার্থীদের জন্য বিশেষ নোট:',

    // Blog
    'blog.tag': 'ব্লগ ও তথ্য সহায়িকা',
    'blog.title': 'উচ্চশিক্ষা ও ভিসা সংক্রান্ত আপডেট',
    'blog.subtitle': 'স্কলারশিপ, এমবেসি অ্যাপয়েন্টমেন্ট ও উচ্চশিক্ষার খুঁটিনাটি জানতে আমাদের আর্টিকেলগুলো পড়ুন।',
    'blog.readMore': 'বিস্তারিত পড়ুন',

    // FAQ
    'faq.tag': 'সাধারণ জিজ্ঞাসাবলী',
    'faq.title': 'সচরাচর জিজ্ঞাসিত প্রশ্ন ও উত্তর',
    'faq.subtitle': 'আপনার মনে থাকা প্রশ্নগুলোর সঠিক উত্তর জেনে নিন।',

    // Contact
    'contact.tag': 'যোগাযোগ করুন',
    'contact.title': 'আমাদের অফিসে আসুন বা অনলাইনে কথা বলুন',
    'contact.subtitle': 'ঢাকা ও চট্টগ্রামের অফিসে এসে আমাদের সিনিয়র কাউন্সিলরদের সাথে সরাসরি দেখা করুন।',
    'contact.dhakaOffice': 'ঢাকা অফিস (গুলশান-১)',
    'contact.ctgOffice': 'চট্টগ্রাম অফিস (জিইসি)',
    'contact.phone': 'ফোন / হোয়াটসঅ্যাপ:',
    'contact.email': 'ইমেইল:',
    'contact.hours': 'খোলা থাকে:',

    // Footer
    'footer.tagline': 'সীমানা ছাড়িয়ে আপনার ভবিষ্যৎ গঠন',
    'footer.aboutText': 'ভার্সিটো হলো বাংলাদেশের শীর্ষস্থানীয় উচ্চশিক্ষা পরামর্শক প্রতিষ্ঠান, যা ইউরোপ ও আমেরিকার বিশ্বখ্যাত বিশ্ববিদ্যালয়ে ভর্তি, ১০০% স্কলারশিপ, বিনা টিউশন ফি এবং বিশেষজ্ঞ ভিসা প্রসেসিং সেবা প্রদান করে।',
    'footer.officeLocations': 'আমাদের অফিসের ঠিকানা',
    'FOOTER.OFFICELOCATIONS': 'আমাদের অফিসের ঠিকানা',
    'footer.quickLinks': 'দ্রুত লিঙ্কসমূহ',
    'footer.services': 'সেবাসমূহ',
    'footer.countries': 'জনপ্রিয় দেশসমূহ',
    'footer.rights': 'সর্বস্বত্ব সংরক্ষিত।',
    'footer.sitemap': 'সাইটম্যাপ ও এসইও ইন্ডেক্স',

    // Language Banner
    'langBanner.notice': 'আপনার সুবিধার জন্য ভাষা নির্বাচন করার সুবিধা রয়েছে। আপনি কি {langName} ভাষায় ওয়েবসাইটটি দেখতে চান?',
    'langBanner.switchBtn': '{langName} পরিবর্তন করুন',
    'langBanner.keepBtn': 'বর্তমানে রাখুন',

    // Sitemap Modal
    'sitemap.title': 'সাইটম্যাপ ও এসইও ইন্ডেক্স',
    'sitemap.subtitle': 'আপনার পছন্দের ভাষায় পেজ বেছে নিন',
    'sitemap.downloadXml': 'সরাসরি Sitemap XML ডাউনলোড করুন',
    'sitemap.close': 'বন্ধ করুন',

    // New UX & Redesign Keys (BN)
    'nav.infoGuidelines': 'তথ্য ও নির্দেশিকা',
    'nav.infoGuidelinesDesc': 'ইউরোপ ও আমেরিকা স্টাডি ও ভিসা প্রসেস এর সম্পূর্ণ তথ্য',
    'nav.studentPortal': 'স্টুডেন্ট পোর্টাল',
    'nav.studentPortalDesc': 'আপনার আবেদন এবং ভিসা ফাইলের স্ট্যাটাস ট্র্যাক ও সাবমিট করুন',
    'nav.adminPanel': 'এডমিন প্যানেল',
    'nav.adminPanelDesc': 'ম্যানেজমেন্ট প্যানেল ও অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন',
    'nav.supportContact': 'সাপোর্ট ও যোগাযোগ',
    'nav.supportContactDesc': 'আমাদের টিম এবং ঢাকা/চট্টগ্রাম অফিসের সাথে যোগাযোগ করুন',

    'hero.startAppBtn': 'নতুন আবেদন শুরু করুন',
    'hero.costEstimatorBtn': 'বাজেট ও খরচ হিসাবকারী',

    'process.tag': 'ভিসা প্রসেসিং ধাপসমূহ',
    'process.title': 'ইউরোপ ও আমেরিকার ৪ ধাপের ভিসা প্রসেস',
    'process.subtitle': 'ফাইল যাচাই থেকে শুরু করে ভিসাপ্রাপ্তি ও বিদেশে পৌঁছানো পর্যন্ত স্পষ্ট পদক্ষেপ।',

    'docGuide.tag': 'ডকুমেন্ট নির্দেশিকা',
    'docGuide.title': 'ভিসা আবেদনের জন্য প্রয়োজনীয় কাগজপত্র',
    'docGuide.subtitle': 'বাংলাদেশি শিক্ষার্থীদের জন্য এমবেসি ফাইল প্রস্তুতির সম্পূর্ণ গাইড ও নিয়মাবলী।',
    'docGuide.mandatory': 'বাধ্যতামূলক / প্রয়োজনীয়',
    'docGuide.expandDetails': 'প্রস্তুতি নিয়মাবলী দেখুন',
    'docGuide.hideDetails': 'নিয়ম বন্ধ করুন',

    'gallery.tag': 'ক্যাম্পাস ও স্টুডেন্ট লাইফ',
    'gallery.title': 'ইউরোপ ও আমেরিকার ক্যাম্পাস গ্যালােি',
    'gallery.subtitle': 'আমাদের শিক্ষার্থীদের আন্তর্জাতিক বিশ্ববিদ্যালয় জীবন ও মনোরম ক্যাম্পাস পরিবেশ।',
    'gallery.allCountries': 'সব দেশ',

    'stepper.tag': 'বাজেট ও কোর্স সিলেকশন টুল',
    'stepper.title': 'বিশ্ববিদ্যালয় ও কোর্স সিলেক্টর (বাজেট ক্যালকুলেটর)',
    'stepper.subtitle': 'আপনার কাঙ্ক্ষিত কোর্স বেছে নিন, অতিরিক্ত সেবাসমূহ যোগ করুন এবং মোট বাজেট দেখুন।',
    'stepper.step1Title': 'ধাপ ১: বিশ্ববিদ্যালয় ও কোর্স',
    'stepper.step2Title': 'ধাপ ২: অতিরিক্ত সেবাসমূহ',
    'stepper.step3Title': 'ধাপ ৩: মোট বাজেট ও খরচ',
    'stepper.selectUni': 'বিশ্ববিদ্যালয় নির্বাচন করুন',
    'stepper.selectCourse': 'কোর্স / প্রোগ্রাম নির্বাচন করুন',
    'stepper.addonsTitle': 'প্রয়োজনীয় সার্ভিস প্যাকেজ যুক্ত করুন',
    'stepper.totalBudget': 'আনুমানিক মোট বাজেট সারাংশ',
    'stepper.tuitionEst': 'বার্ষিক আনুমানিক টিউশন ফি:',
    'stepper.livingEst': 'বার্ষিক প্রাক্কলিত জীবনযাত্রার খরচ:',
    'stepper.vercitoFee': 'ভার্সিটো প্রসেসিং ও লিগ্যালাইজেশন ফি:',
    'stepper.grandTotal': 'সর্বমোট আনুমানিক বাজেট:',
    'stepper.applyWithPlan': 'এই প্ল্যান নিয়ে আবেদন শুরু করুন',

    'portal.title': 'ভার্সিটো স্টুডেন্ট পোর্টাল',
    'portal.subtitle': 'আপনার ভর্তি ও ভিসা আবেদনের লাইভ অগ্রগতি ট্র্যাক করুন বা ডকুমেন্ট জমা দিন',
    'portal.trackPlaceholder': 'আপনার ফাইল রেফারেন্স আইডি দিন (যেমন: VRC-2026-8891)',
    'portal.trackBtn': 'স্ট্যাটাস চেক করুন',
    'portal.uploadTab': 'নতুন ফাইল জমা দিন',
    'portal.trackTab': 'ফাইল ট্র্যাকিং',
    'portal.uploadTitle': 'আপনার ডকুমেন্টস আপলোড করুন',
    'portal.uploadDesc': 'পিডিএফ বা ইমেজ ফরম্যাটে মূল একাডেমিক ফাইল ও সার্টিফিকেট আপলোড করুন',

    // Modals
    'modals.aiTitle': 'এআই প্রোফাইল ইভালুয়েশন',
    'modals.aiDesc': 'আপনার তথ্য প্রদান করুন, আমাদের এআই সিস্টেম ১ মিনিটে আপনার এডমিশন ও স্কলারশিপের সম্ভাবনা বিশ্লেষণ করবে।',
    'modals.appointmentTitle': '১-অন-১ ফ্রি কাউন্সেলিং বুক করুন',
    'modals.appointmentDesc': 'আমাদের সিনিয়র ইউরোপিয়ান অ্যাডমিশন বিশেষজ্ঞের সাথে পরামর্শের সময় বুক করুন।',
    'modals.applicationTitle': 'অনলাইন অ্যাপ্লিকেশন পোর্টাল',
    'modals.applicationDesc': 'আপনার প্রাথমিক ডকুমেন্টস আপলোড করে অ্যাডমিশন প্রসেস শুরু করুন।',
    'modals.submit': 'আবেদন জমা দিন',
    'modals.close': 'বন্ধ করুন',
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.destinations': 'Destinations',
    'nav.services': 'Services',
    'nav.scholarships': 'Scholarships',
    'nav.universities': 'Universities',
    'nav.testimonials': 'Success Stories',
    'nav.visaChecklist': 'Visa Checklist',
    'nav.blog': 'Blog & Guides',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.languagePrograms': 'Language Programs',
    'nav.studentPortal': 'Student Portal',
    'nav.payments': 'Payment Gateway',
    'nav.login': 'Login',
    'nav.aiCheck': 'AI Eligibility Check',
    'nav.bookConsultation': 'Book Consultation',
    'nav.applyOnline': 'Apply Online',
    'nav.applyNow': 'Apply Online',
    'nav.viewMyApplication': 'View My Application',
    'nav.sitemap': 'Sitemap',
    'nav.tagline': 'Shaping Futures Beyond Borders',

    // Hero Section (Used in Hero.tsx)
    'hero.applyNow': 'Apply Now',
    'HERO.APPLYNOW': 'Apply Now',
    'hero.viewMyApplication': 'View My Application',
    'HERO.VIEWMYAPPLICATION': 'View My Application',
    'hero.targetCountry': 'Target Country',
    'hero.targetcountry': 'Target Country',
    'hero.degreeLevel': 'Degree Level',
    'hero.degreelevel': 'Degree Level',
    'hero.ieltsScore': 'IELTS / English Score',
    'hero.ieltsscore': 'IELTS / English Score',
    'hero.analyzeEligibility': 'Analyze My Eligibility',
    'HERO.ANALYZEELIGIBILITY': 'Analyze My Eligibility',
    'hero.instantCheck': 'Instant Check',
    'HERO.INSTANTCHECK': 'Instant Check',
    'hero.checkEligibility': 'Check Admission Eligibility',
    'hero.visaSuccess': 'Visa Success Rate',
    'hero.maxScholarship': 'Max Annual Scholarship',
    'hero.studentsPlaced': 'Successful Students',
    'hero.tuitionWaiver': 'Tuition Waiver Support',
    'hero.topBadge': 'Europe & USA Higher Education & Student Visa Specialist',
    'hero.title1': 'Shape Your Global Future In',
    'hero.title2': 'Europe & America\'s Top Universities',
    'hero.subtitle': '100% Scholarship Assistance, Tuition-Free Public Universities, and Expert Visa Processing for Bangladeshi Students targeting Italy, Germany, USA, France, and EU destinations.',
    'hero.evaluateAi': 'Evaluate Profile with AI',
    'hero.bookConsultation': 'Book Free Counseling',
    'hero.stat1Val': '98.8%',
    'hero.stat1Label': 'Visa Success Rate',
    'hero.stat2Val': '€7,000',
    'hero.stat2Label': 'Max Annual DSU Grant',
    'hero.stat3Val': '3,500+',
    'hero.stat3Label': 'Successful Students',
    'hero.stat4Val': '100%',
    'hero.stat4Label': 'Tuition Waiver Support',
    'hero.widgetBadge': 'Instant Check',
    'hero.widgetTitle': 'Check Admission Eligibility',
    'hero.widgetCountryLabel': 'Target Country / Destination',
    'hero.widgetDegreeLabel': 'Degree Level',
    'hero.widgetScoreLabel': 'IELTS / English Score',
    'hero.analyzeBtn': 'Analyze My Eligibility',

    // Legacy Hero aliases
    'hero.badge': 'Europe & USA Higher Education & Scholarship Specialist',
    'hero.titleLine1': 'Top European & US Universities',
    'hero.titleLine2': '100% Scholarship Higher Education',
    'hero.ctaAIEvaluator': 'Free AI Profile Check',
    'hero.ctaBook': 'Book Consultation',
    'hero.ctaApply': 'Apply Online',
    'hero.statsVisa': '98.8%',
    'hero.statsVisaLabel': 'Visa Success Rate',
    'hero.statsStudents': '3,500+',
    'hero.statsStudentsLabel': 'Successful Scholars',
    'hero.statsGrants': '€8.5 Million+',
    'hero.statsGrantsLabel': 'Scholarship Grants Secured',
    'hero.quickWidgetTitle': 'Check Eligibility',
    'hero.quickWidgetDesc': 'Calculate scholarship match in 1 minute',
    'hero.quickSelectDegree': 'Select Degree Level',
    'hero.quickSelectCountry': 'Target Country',
    'hero.quickCheckBtn': 'Check Eligibility Now',

    // Study Destinations
    'destinations.tag': 'Study Destinations',
    'destinations.title': 'Top European & US Destinations for Bangladeshi Students',
    'destinations.subtitle': 'World-class academic excellence, zero or affordable tuition, and strong international post-study career opportunities.',
    'destinations.applyNow': 'Apply Now',
    'destinations.tuition': 'Tuition Fee:',
    'destinations.livingCost': 'Living Expense:',
    'destinations.workRights': 'Work Rights:',
    'destinations.postStudy': 'Post-Study Visa:',
    'destinations.scholarship': 'Scholarship Grants:',
    'destinations.visaSuccess': 'Visa Success Rate:',
    'destinations.perYear': '/year',
    'destinations.perMonth': '/month',

    // Services
    'services.tag': 'Our Premium Services',
    'services.title': 'End-to-End Guidance from Application to Visa & Arrival',
    'services.subtitle': 'Meticulous document vetting, SOP editing, and embassy interview coaching by experienced European education experts.',
    'services.bookConsultation': 'Book Consultation',
    'services.startApplication': 'Start Application',

    // Scholarship Calculator
    'calculator.tag': 'Scholarship Calculator',
    'calculator.title': 'Calculate Your Scholarship Probability',
    'calculator.subtitle': 'Instant assessment based on CGPA, IELTS, and target country funding guidelines.',
    'calculator.inputGpa': 'Your CGPA / GPA (4.0 Scale):',
    'calculator.inputIelts': 'IELTS Band Score:',
    'calculator.inputCountry': 'Target Country:',
    'calculator.calculateBtn': 'Calculate Scholarship Match',
    'calculator.eligibleTitle': 'Matched Scholarship Opportunities:',
    'calculator.matchScore': 'Match Score:',
    'calculator.applyGrant': 'Apply for Scholarship',

    // Partner Universities
    'partners.tag': 'Partner Universities',
    'partners.title': 'Premier European & American Universities',
    'partners.subtitle': 'Top-ranked public and private institutions offering English-taught undergraduate and postgraduate programs.',
    'partners.ranking': 'World Ranking:',
    'partners.tuition': 'Tuition Fee:',
    'partners.englishWaiver': 'MOI / English Waiver Possible',
    'partners.applyNow': 'Apply Now',

    // Student Journey
    'journey.tag': 'Your 6-Step Roadmap',
    'journey.title': 'Your Seamless Journey Abroad with VERCITO',
    'journey.subtitle': 'Transparent, step-by-step roadmap from initial profile assessment to embassy submission and housing setup.',
    'journey.duration': 'Timeline:',
    'journey.actionItems': 'Key Milestone Steps:',

    // Success Stories / Testimonials
    'testimonials.tag': 'Proven Student Track Record',
    'testimonials.title': 'Bangladeshi Scholars Thriving in Europe & USA',
    'testimonials.subtitle': 'Real stories from Bangladeshi students who achieved admission and student visas with VERCITO\'s expert guidance.',
    'testimonials.filterAll': 'All Verified Stories',
    'testimonials.studentsIn': 'Students in {country}',
    'testimonials.visaApproved': 'Visa Granted',
    'testimonials.scholarshipWon': 'Scholarship Won:',

    // Visa Checklist
    'checklist.tag': 'Visa & Document Checklist',
    'checklist.title': 'Required Embassy Documents for Student Visa',
    'checklist.subtitle': 'Prepare a 100% compliant visa file to avoid rejection using our comprehensive checklist.',
    'checklist.filterAll': 'All Documents',
    'checklist.filterAcademic': 'Academic Documents',
    'checklist.filterFinancial': 'Financial & Bank Audit',
    'checklist.filterEmbassy': 'Embassy & MOFA Legalization',
    'checklist.filterApp': 'Application Forms',
    'checklist.mandatory': 'Mandatory',
    'checklist.bdNote': 'Special Note for Bangladeshi Applicants:',

    // Blog
    'blog.tag': 'Insights & Guides',
    'blog.title': 'Latest Guidance on Admission & Visas',
    'blog.subtitle': 'Expert articles on European scholarships, VFS booking tips, and embassy interview preparation.',
    'blog.readMore': 'Read Full Guide',

    // FAQ
    'faq.tag': 'Frequently Asked Questions',
    'faq.title': 'Got Questions? We Have Answers',
    'faq.subtitle': 'Clear answers to common questions about studying in Europe and America.',

    // Contact
    'contact.tag': 'Contact Us',
    'contact.title': 'Visit Our Offices or Connect Online',
    'contact.subtitle': 'Book an appointment at our Gulshan or Chittagong offices for direct 1-on-1 counseling.',
    'contact.dhakaOffice': 'Dhaka Office (Gulshan-1)',
    'contact.ctgOffice': 'Chittagong Office (GEC Circle)',
    'contact.phone': 'Phone / WhatsApp:',
    'contact.email': 'Email:',
    'contact.hours': 'Office Hours:',

    // Footer
    'footer.tagline': 'Shaping Futures Beyond Borders',
    'footer.aboutText': 'VERCITO is a premier higher education consultancy in Bangladesh specializing in European and American university admissions, 100% scholarship assistance, tuition-free public universities, and expert visa guidance.',
    'footer.officeLocations': 'OUR OFFICE LOCATIONS',
    'FOOTER.OFFICELOCATIONS': 'OUR OFFICE LOCATIONS',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.countries': 'Top Destinations',
    'footer.rights': 'All rights reserved.',
    'footer.sitemap': 'Sitemap & SEO Index',

    // Language Banner
    'langBanner.notice': 'We detected your preferred language. Would you like to view the website in {langName}?',
    'langBanner.switchBtn': 'Switch to {langName}',
    'langBanner.keepBtn': 'Keep Current',

    // Sitemap Modal
    'sitemap.title': 'Sitemap & Language Index',
    'sitemap.subtitle': 'Select your preferred language version',
    'sitemap.downloadXml': 'Download Sitemap XML',
    'sitemap.close': 'Close',

    // New UX & Redesign Keys (EN)
    'nav.infoGuidelines': 'Info & Guidelines',
    'nav.infoGuidelinesDesc': 'Comprehensive European & US study and visa process guides',
    'nav.studentPortal': 'Student Portal',
    'nav.studentPortalDesc': 'Submit documents and track your admission & visa file status',
    'nav.adminPanel': 'Admin Panel',
    'nav.adminPanelDesc': 'Access the administrative portal and CMS management dashboard',
    'nav.supportContact': 'Support & Contact',
    'nav.supportContactDesc': 'Get in touch with our expert team at Dhaka and Chittagong offices',

    'hero.startAppBtn': 'Start New Application',
    'hero.costEstimatorBtn': 'Budget & Cost Estimator',

    'process.tag': 'Visa Processing Steps',
    'process.title': '4-Step Visa & Admission Pathway for Europe & USA',
    'process.subtitle': 'A clear, transparent roadmap from document verification to embassy filing and arrival.',

    'docGuide.tag': 'Document Guide',
    'docGuide.title': 'Required Documents & Preparation Guidelines',
    'docGuide.subtitle': 'Comprehensive preparation rules and attestation requirements for Bangladeshi students.',
    'docGuide.mandatory': 'Mandatory / Required',
    'docGuide.expandDetails': 'View Preparation Rules',
    'docGuide.hideDetails': 'Hide Rules',

    'gallery.tag': 'Campus & Student Life',
    'gallery.title': 'Campus Life & Universities Across Europe & USA',
    'gallery.subtitle': 'Glimpse into the vibrant academic and cultural life of our Bangladeshi scholars abroad.',
    'gallery.allCountries': 'All Countries',

    'stepper.tag': 'Course & Budget Selector',
    'stepper.title': 'University & Course Selection Stepper',
    'stepper.subtitle': 'Select your preferred university & degree, configure support services, and calculate total budget.',
    'stepper.step1Title': 'Step 1: University & Program',
    'stepper.step2Title': 'Step 2: Additional Services',
    'stepper.step3Title': 'Step 3: Estimated Budget',
    'stepper.selectUni': 'Select Partner University',
    'stepper.selectCourse': 'Select Degree Program',
    'stepper.addonsTitle': 'Select Additional Support Services',
    'stepper.totalBudget': 'Estimated Budget Summary',
    'stepper.tuitionEst': 'Estimated Annual Tuition Fee:',
    'stepper.livingEst': 'Estimated Annual Living Costs:',
    'stepper.vercitoFee': 'Vercito Processing & Legalization Fee:',
    'stepper.grandTotal': 'Total Estimated Budget:',
    'stepper.applyWithPlan': 'Start Application with This Plan',

    'portal.title': 'VERCITO Student Portal',
    'portal.subtitle': 'Track your application status in real-time or submit new document files.',
    'portal.trackPlaceholder': 'Enter file reference ID (e.g. VRC-2026-8891)',
    'portal.trackBtn': 'Check File Status',
    'portal.uploadTab': 'Submit New File',
    'portal.trackTab': 'Track Application Status',
    'portal.uploadTitle': 'Upload Application Documents',
    'portal.uploadDesc': 'Upload academic transcripts, passport, or bank statements in PDF/Image format.',

    // Modals
    'modals.aiTitle': 'AI Profile Assessment',
    'modals.aiDesc': 'Provide your academic details to receive an instant AI evaluation of your admission and scholarship prospects.',
    'modals.appointmentTitle': 'Book 1-on-1 Free Counseling',
    'modals.appointmentDesc': 'Schedule a face-to-face or virtual session with our senior study abroad counselor.',
    'modals.applicationTitle': 'Online Admission Portal',
    'modals.applicationDesc': 'Upload your transcripts and resume to initiate your application.',
    'modals.submit': 'Submit Application',
    'modals.close': 'Close',
  },
};
