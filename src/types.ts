/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Currency = 'EUR' | 'BDT';

export interface CountryDestination {
  id: string;
  name: string;
  flag: string;
  capital: string;
  image: string;
  tuitionRange: { min: number; max: number }; // in EUR per year
  livingCostMonthly: { min: number; max: number }; // in EUR per month
  workRights: string;
  postStudyWorkVisa: string;
  popularMajors: string[];
  topUniversitiesCount: number;
  scholarshipAvailability: 'High' | 'Medium' | 'Full Grant Available';
  intakeSeasons: string[];
  languageRequirement: string;
  visaSuccessRate: number; // percentage
  keyHighlights: string[];
  overview: string;
}

export interface UniversityPartner {
  id: string;
  name: string;
  country: string;
  city: string;
  logo: string;
  image: string;
  ranking: number; // QS World Ranking or European Ranking
  established: number;
  type: 'Public' | 'Private' | 'Polytechnic';
  featuredPrograms: string[];
  tuitionFeePerYearEUR: number;
  englishWaiverPossible: boolean;
  scholarshipsOffered: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  badge?: string;
}

export interface Scholarship {
  id: string;
  name: string;
  country: string;
  coverage: string; // e.g. "100% Tuition + €7,000/yr Stipend + Free Meals"
  minCGPA: number;
  minIELTS: number;
  deadline: string;
  description: string;
  eligiblePrograms: string[];
  isFullyFunded: boolean;
}

export interface SuccessStory {
  id: string;
  studentName: string;
  homeCity: string; // e.g. "Dhaka, Bangladesh"
  homeCityBn?: string;
  university: string;
  country: string;
  degree: string;
  degreeBn?: string;
  scholarshipWon?: string;
  scholarshipWonBn?: string;
  photo: string;
  quote: string;
  quoteBn?: string;
  visaApprovalYear: number;
  fieldOfStudy: string;
  ieltsScore?: string;
}

export interface JourneyStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  keyActionItems: string[];
}

export interface DocumentChecklistItem {
  id: string;
  category: 'Academic' | 'Financial' | 'Legal/Embassy' | 'Application';
  title: string;
  description: string;
  isMandatory: boolean;
  bangladeshNotes?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Scholarships' | 'Visa Guide' | 'Blocked Account' | 'Student Life' | 'Admissions';
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  category: 'Admissions' | 'Visa & Embassy' | 'Scholarships' | 'Finances' | 'General';
  question: string;
  answer: string;
}

export interface ProfileEvaluationInput {
  fullName: string;
  email: string;
  phone: string;
  currentEducationLevel: string; // e.g., "HSC / A-Levels" | "Bachelors Graduate" | "Masters"
  cgpaOrGpa: string;
  englishProficiency: string; // "IELTS 6.5+" | "IELTS 6.0" | "Duolingo / PTE" | "MOI / English Waiver"
  intendedDegree: string; // "Bachelors" | "Masters" | "PhD"
  preferredCountry: string;
  budgetPerYearEUR: string;
  intendedSubject: string;
}

export interface ProfileEvaluationResult {
  eligibilityScore: number; // 0-100
  recommendedCountries: { name: string; matchPercentage: number; reason: string }[];
  suggestedUniversities: string[];
  eligibleScholarships: string[];
  visaFeasibility: string;
  personalizedAdvice: string;
}

export interface AppointmentBooking {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  preferredBranch: 'Dhaka Head Office (Gulshan 2)' | 'Chittagong Office (GEC Circle)' | 'Online Video Consultation';
  preferredDate: string;
  preferredTimeSlot: string;
  studyCountryInterest: string;
  intendedDegree: string;
  comments?: string;
}

export interface OnlineApplication {
  fullName: string;
  email: string;
  phone: string;
  district: string;
  targetCountry: string;
  preferredUniversity: string;
  intendedProgram: string;
  cgpa: string;
  ieltsStatus: string;
  passportStatus: 'Available' | 'In Progress' | 'Not Yet Applied';
  additionalDetails?: string;
}
