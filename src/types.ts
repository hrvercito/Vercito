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

export interface FounderProfile {
  name: string;
  designation: string;
  photo: string;
  bio: string;
  experienceYears: string;
  expertise: string[];
  languages: string[];
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  quote: string;
  achievements: string[];
}

export interface OfficeLocation {
  id: string;
  name: string;
  subtitle: string;
  address: string;
  phoneNumbers: string[];
  email: string;
  officeHours: string;
  googleMapsUrl: string;
  mapEmbedSrc: string;
  image: string;
}

export interface ContactInfo {
  hotline: string;
  whatsappNumber: string;
  email: string;
  headOfficeAddress: string;
  offices: OfficeLocation[];
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}

export type AdmissionChance = 'Excellent' | 'Very Good' | 'Good' | 'Moderate' | 'Low';

export interface RecommendedUniversityDetail {
  name: string;
  country: string;
  qsRanking: number | string;
  type: 'Public' | 'Private' | 'Polytechnic';
  tuitionFee: string;
  scholarshipAvailability: string;
  applicationDeadline: string;
  matchReason: string;
}

export interface RecommendedScholarshipDetail {
  name: string;
  coverage: string;
  eligibility: string;
  deadline: string;
  winningProbability: 'Very High' | 'High' | 'Moderate' | 'Low';
}

export interface EnglishRequirementBreakdown {
  ieltsRequired: boolean;
  ieltsNotes?: string;
  ieltsWaiverAvailable: boolean;
  moiAccepted: boolean;
  duolingoAccepted: boolean;
  pteAccepted: boolean;
  toeflAccepted: boolean;
}

export interface EstimatedCostBreakdown {
  tuitionFee: string;
  livingCost: string;
  visaFee: string;
  healthInsurance: string;
  totalEstimatedBudget: string;
}

export interface ProfileEvaluationInput {
  // Required Fields
  fullName: string;
  email: string;
  phone: string;
  currentEducationLevel: string;
  cgpaOrGpa: string;
  englishProficiency: string;
  preferredCountry: string;
  preferredUniversity: string;
  intendedSubject: string;
  preferredIntake: string;
  passportAvailable: 'Yes' | 'No';
  nationality: string;
  estimatedBudget: string;
  scholarshipPreference: 'Full Scholarship' | 'Partial Scholarship' | 'Self-Funded' | 'Any';
  preferredStudyLevel: 'Bachelors' | 'Masters' | 'PhD' | 'Diploma' | 'Language Programs';

  // Optional Fields
  workExperience?: string;
  visaRefusal?: string;
  visaRefusalDetails?: string;
  studyMode?: 'On-Campus' | 'Hybrid' | 'Distance Learning';
  additionalNotes?: string;

  // Upload Metadata
  transcriptFileName?: string;
  certificateFileName?: string;
  passportFileName?: string;
  cvFileName?: string;
  englishReportFileName?: string;
}

export interface ProfileEvaluationResult {
  eligibilityScore: number;
  admissionChance: AdmissionChance;
  recommendedUniversities: RecommendedUniversityDetail[];
  recommendedScholarships: RecommendedScholarshipDetail[];
  englishRequirements: EnglishRequirementBreakdown;
  estimatedCost: EstimatedCostBreakdown;
  documentChecklist: {
    missingDocuments: string[];
    requiredDocuments: string[];
  };
  nextStepsActionPlan: string[];
  personalizedAdvice: string;
  visaFeasibility: string;
}

export interface AIAssessmentRecord {
  id: string;
  createdAt: string;
  input: ProfileEvaluationInput;
  result: ProfileEvaluationResult;
  status: 'New Assessment' | 'In Review' | 'Contacted' | 'Converted to Application' | 'Archived';
  assignedCounselor?: string;
  encryptedToken?: string;
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

export type ApplicationStatus =
  | 'Application Received'
  | 'Document Review'
  | 'Additional Documents Required'
  | 'Application Under Review'
  | 'University Review'
  | 'Offer Received'
  | 'Conditional Offer'
  | 'Final Decision'
  | 'Application Completed';

export interface StudentAccount {
  id: string; // e.g. "USR-1001"
  fullName: string;
  email: string;
  passwordHash?: string;
  phone: string;
  district: string;
  dateOfBirth: string;
  nationality: string;
  fullAddress?: string;
  registeredAt: string;
  status: 'Active' | 'Suspended';
}

export interface ApplicationDocItem {
  id: string;
  docType: 'passport' | 'certificates' | 'transcripts' | 'englishTest' | 'cv' | 'sop' | 'recommendation' | 'other';
  title: string;
  fileName: string;
  status: 'Provided' | 'Not Provided' | 'Under Review' | 'Approved' | 'Action Needed';
  uploadDate: string;
  fileSize?: string;
}

export interface ApplicationTimelineEvent {
  id: string;
  status: ApplicationStatus;
  date: string;
  note: string;
  updatedBy: string;
}

export interface ApplicationRecord {
  id: string; // Unique Application ID e.g. "VER-APP-2026-100001"
  studentUserId: string; // Owner User ID for strict privacy check
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  studentDistrict: string;

  // Selected University Details
  universityId: string;
  universityName: string;
  universityLogo: string;
  country: string;
  city: string;
  selectedCourse: string;
  degreeLevel: string;
  intake: string;
  tuitionFeeEUR: number;
  applicationFeeEUR: number;
  applicationDeadline: string;

  // Applicant Personal Info
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  fullAddress: string;

  // Academic Info
  previousEducation: string;
  institutionName: string;
  academicSubject: string;
  cgpa: string;
  graduationYear: string;

  // English Proficiency
  englishTestType: 'IELTS' | 'PTE' | 'TOEFL' | 'Duolingo' | 'MOI' | 'None';
  englishScore: string;
  testDate: string;

  // Application Documents
  documents: Record<string, ApplicationDocItem>;

  // Status & Meta
  status: ApplicationStatus;
  isDraft: boolean;
  submissionDate: string;
  lastUpdated: string;
  timeline: ApplicationTimelineEvent[];
  additionalNotes?: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
  uploadedAt: string;
  category?: 'hero' | 'university' | 'destination' | 'scholarship' | 'blog' | 'profile' | 'general';
}

