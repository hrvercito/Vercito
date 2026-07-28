/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Currency = 'EUR' | 'BDT';

export type UserRole = 'Student' | 'Counselor' | 'Admin';

export type ProgramLevel = 
  | "Bachelor's" 
  | "Master's" 
  | 'PhD' 
  | 'Diploma' 
  | 'Foundation' 
  | 'Language Programs' 
  | 'Preparatory Programs';

export type EnglishRequirementTag = 
  | 'IELTS Required' 
  | 'IELTS Waived' 
  | 'No IELTS' 
  | 'MOI Accepted' 
  | 'Duolingo Accepted' 
  | 'PTE Accepted'
  | 'TOEFL Accepted';

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

export interface UniversityReview {
  id: string;
  studentName: string;
  studentCountry: string;
  rating: number;
  comment: string;
  program: string;
  year: string;
}

export interface UniversityPartner {
  id: string;
  name: string;
  country: string;
  city: string;
  logo: string;
  image: string;
  ranking: number; // QS World Ranking
  theRanking?: number; // THE Ranking
  established: number;
  type: 'Public' | 'Private' | 'Polytechnic';
  featuredPrograms: string[];
  tuitionFeePerYearEUR: number; // Master's default/average
  tuitionFeeBachelorEUR?: number;
  tuitionFeeMasterEUR?: number;
  tuitionFeePhDEUR?: number;
  scholarshipsOffered: string[];
  scholarshipAmount?: string;
  applicationFeeEUR?: number;
  livingCostMonthlyEUR?: number;
  englishWaiverPossible: boolean;
  intakes: string[];
  applicationDeadline: string;
  durationYears: string;
  requiredDocuments: string[];
  programLevels: ProgramLevel[];
  englishRequirementTypes: EnglishRequirementTag[];
  ieltsRequirement?: string;
  bachelorPrograms?: string[];
  masterPrograms?: string[];
  phdPrograms?: string[];
  foundationPrograms?: string[];
  diplomaPrograms?: string[];
  languagePrograms?: string[];
  preparatoryPrograms?: string[];
  internshipAvailable?: boolean;
  partTimeWorkPermission?: string;
  postStudyWorkVisa?: string;
  officialWebsite?: string;
  admissionEmail?: string;
  videoUrl?: string;
  mediaImages?: string[];
  overview?: string;
  admissionRequirements?: string[];
  studentReviews?: UniversityReview[];
  mapLocation?: { lat: number; lng: number; address: string };
  enabled?: boolean;
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
  fundingType?: '100% Fully Funded' | 'Partial Tuition Grant' | 'Monthly Stipend' | 'Government Subsidy';
  eligibilityCriteria?: string[];
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
  passportNumber: string; // MANDATORY
  district: string;
  targetCountry: string;
  preferredUniversity: string;
  intendedProgram: string;
  cgpa: string;
  ieltsStatus: string;
  passportStatus: 'Available' | 'In Progress' | 'Not Yet Applied';
  additionalDetails?: string;
}

// Mandatory & Detailed Application Interface for Student Portal
export interface DetailedApplication {
  id: string;
  studentEmail: string;
  fullName: string;
  phone: string;
  passportNumber: string; // MANDATORY
  passportExpiry: string;
  nationality: string;
  previousVisaRefusal: boolean;
  visaRefusalDetails?: string;
  preferredIntake: string;
  preferredCountry: string;
  preferredUniversity: string;
  intendedProgram: string;
  programLevel: ProgramLevel;
  academicHistory: {
    degree: string;
    gpa: string;
    passingYear: string;
    institution: string;
  }[];
  englishTestDetails: {
    testType: 'IELTS' | 'PTE' | 'Duolingo' | 'MOI' | 'None';
    overallScore: string;
    bandDetails?: string;
  };
  uploadedDocuments: {
    id: string;
    name: string;
    category: 'Passport' | 'Academic Transcript' | 'Certificate' | 'Police Clearance' | 'Bank Solvency' | 'SOP/CV';
    fileUrl: string;
    uploadedAt: string;
  }[];
  status: 'Application Submitted' | 'Reviewing' | 'Missing Documents' | 'Offer Letter Issued' | 'Visa Processing' | 'Approved' | 'Rejected';
  counselorAssigned?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentTransaction {
  id: string;
  studentEmail: string;
  studentName: string;
  amountBDT: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Bank Transfer';
  transactionId: string;
  receiptUrl?: string;
  purpose: string; // e.g. "Application Fee", "Embassy Appointment Support", "CIMEA Verification"
  status: 'Pending' | 'Verified' | 'Rejected';
  date: string;
  adminNotes?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderEmail: string;
  senderName: string;
  senderRole: UserRole | 'AutoReply';
  text: string;
  attachmentName?: string;
  attachmentUrl?: string;
  timestamp: string;
  isRead: boolean;
}

export interface NotificationItem {
  id: string;
  targetEmail: string;
  title: string;
  message: string;
  type: 'Application Submitted' | 'Payment Received' | 'Offer Letter' | 'Missing Documents' | 'Visa Update' | 'Interview Schedule';
  channel: 'Email' | 'WhatsApp' | 'SMS';
  date: string;
  isRead: boolean;
}

