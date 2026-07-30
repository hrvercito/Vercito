/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApplicationRecord, UniversityPartner, ApplicationStatus } from '../types';
import { useAuth } from './AuthContext';

interface ApplicationContextType {
  applications: ApplicationRecord[];
  activeApplication: ApplicationRecord | null;
  startNewApplicationSession: (university: UniversityPartner) => ApplicationRecord;
  checkSavedDraftForUni: (universityId: string) => ApplicationRecord | null;
  loadApplicationSession: (appId: string) => { success: boolean; application?: ApplicationRecord; error?: string };
  saveApplicationDraft: (appData: ApplicationRecord) => void;
  submitApplicationRecord: (appData: ApplicationRecord) => ApplicationRecord;
  getUserApplications: (userId?: string) => ApplicationRecord[];
  getApplicationWithPrivacyCheck: (appId: string, requestingUserId?: string) => { success: boolean; application?: ApplicationRecord; error?: string };
  updateApplicationStatusByAdmin: (appId: string, newStatus: ApplicationStatus, note?: string) => void;
}

const INITIAL_SEEDED_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'VER-APP-2026-100001',
    studentUserId: 'USR-1001',
    studentName: 'Tanvir Hossain',
    studentEmail: 'tanvir@gmail.com',
    studentPhone: '+880 1812 345678',
    studentDistrict: 'Dhaka',

    universityId: 'politecnico-di-milano',
    universityName: 'Politecnico di Milano',
    universityLogo: '🇮🇹',
    country: 'Italy',
    city: 'Milan',
    selectedCourse: 'M.Sc. Computer Science & Engineering',
    degreeLevel: "Master's",
    intake: 'Fall (September 2026)',
    tuitionFeeEUR: 3900,
    applicationFeeEUR: 50,
    applicationDeadline: '30 April 2026',

    fullName: 'Tanvir Hossain',
    dateOfBirth: '2001-05-15',
    nationality: 'Bangladeshi',
    fullAddress: 'House 42, Road 11, Banani, Dhaka-1213',

    previousEducation: "Bachelor's Degree",
    institutionName: 'Dhaka University',
    academicSubject: 'Computer Science',
    cgpa: '3.65 / 4.00',
    graduationYear: '2024',

    englishTestType: 'IELTS',
    englishScore: '7.5 Overall (L:8.0, R:7.5, W:7.0, S:7.0)',
    testDate: '2025-11-10',

    documents: {
      passport: { id: 'doc-1', docType: 'passport', title: 'Passport Copy', fileName: 'Tanvir_Passport_Page.pdf', status: 'Approved', uploadDate: '2026-02-10' },
      certificates: { id: 'doc-2', docType: 'certificates', title: 'B.Sc. Certificate', fileName: 'DU_BSc_Certificate.pdf', status: 'Approved', uploadDate: '2026-02-10' },
      transcripts: { id: 'doc-3', docType: 'transcripts', title: 'Academic Transcript', fileName: 'DU_Official_Transcript.pdf', status: 'Approved', uploadDate: '2026-02-10' },
      englishTest: { id: 'doc-4', docType: 'englishTest', title: 'IELTS Result TRF', fileName: 'IELTS_Academic_TRF.pdf', status: 'Approved', uploadDate: '2026-02-10' },
      cv: { id: 'doc-5', docType: 'cv', title: 'Curriculum Vitae', fileName: 'Tanvir_CV_Europass.pdf', status: 'Approved', uploadDate: '2026-02-10' },
      sop: { id: 'doc-6', docType: 'sop', title: 'Statement of Purpose', fileName: 'Polimi_SOP_Tanvir.pdf', status: 'Approved', uploadDate: '2026-02-10' },
    },

    status: 'Application Received',
    isDraft: false,
    submissionDate: '12 February 2026',
    lastUpdated: '12 February 2026',
    timeline: [
      {
        id: 'tl-1',
        status: 'Application Received',
        date: '12 February 2026',
        note: 'Application dossier registered into VERCITO European System.',
        updatedBy: 'System',
      },
    ],
  },
  {
    id: 'VER-APP-2026-100002',
    studentUserId: 'USR-1001',
    studentName: 'Tanvir Hossain',
    studentEmail: 'tanvir@gmail.com',
    studentPhone: '+880 1812 345678',
    studentDistrict: 'Dhaka',

    universityId: 'technical-university-of-munich',
    universityName: 'Technical University of Munich (TUM)',
    universityLogo: '🇩🇪',
    country: 'Germany',
    city: 'Munich',
    selectedCourse: 'M.Sc. Data Engineering and Analytics',
    degreeLevel: "Master's",
    intake: 'Winter (October 2026)',
    tuitionFeeEUR: 0,
    applicationFeeEUR: 75,
    applicationDeadline: '31 May 2026',

    fullName: 'Tanvir Hossain',
    dateOfBirth: '2001-05-15',
    nationality: 'Bangladeshi',
    fullAddress: 'House 42, Road 11, Banani, Dhaka-1213',

    previousEducation: "Bachelor's Degree",
    institutionName: 'Dhaka University',
    academicSubject: 'Computer Science',
    cgpa: '3.65 / 4.00',
    graduationYear: '2024',

    englishTestType: 'IELTS',
    englishScore: '7.5 Overall',
    testDate: '2025-11-10',

    documents: {
      passport: { id: 'doc-201', docType: 'passport', title: 'Passport Copy', fileName: 'Tanvir_Passport.pdf', status: 'Approved', uploadDate: '2026-02-14' },
      certificates: { id: 'doc-202', docType: 'certificates', title: 'B.Sc. Degree', fileName: 'BSc_Degree_Notarized.pdf', status: 'Approved', uploadDate: '2026-02-14' },
      transcripts: { id: 'doc-203', docType: 'transcripts', title: 'Transcript', fileName: 'Academic_Transcripts_DU.pdf', status: 'Approved', uploadDate: '2026-02-14' },
      cv: { id: 'doc-204', docType: 'cv', title: 'TUM Specific CV', fileName: 'CV_Germany_Format.pdf', status: 'Approved', uploadDate: '2026-02-14' },
    },

    status: 'Document Review',
    isDraft: false,
    submissionDate: '14 February 2026',
    lastUpdated: '15 February 2026',
    timeline: [
      { id: 'tl-201', status: 'Application Received', date: '14 February 2026', note: 'Submitted for TUM dossier.', updatedBy: 'System' },
      { id: 'tl-202', status: 'Document Review', date: '15 February 2026', note: 'VPD evaluation and document review in progress by VERCITO Counselors.', updatedBy: 'Counselor Desk' },
    ],
  },
  {
    id: 'VER-APP-2026-100003',
    studentUserId: 'USR-1002',
    studentName: 'Nusrat Jahan',
    studentEmail: 'nusrat@gmail.com',
    studentPhone: '+880 1711 987654',
    studentDistrict: 'Chittagong',

    universityId: 'university-of-bologna',
    universityName: 'University of Bologna',
    universityLogo: '🇮🇹',
    country: 'Italy',
    city: 'Bologna',
    selectedCourse: 'M.Sc. Artificial Intelligence',
    degreeLevel: "Master's",
    intake: 'Fall (September 2026)',
    tuitionFeeEUR: 1570,
    applicationFeeEUR: 30,
    applicationDeadline: '15 May 2026',

    fullName: 'Nusrat Jahan',
    dateOfBirth: '2002-08-20',
    nationality: 'Bangladeshi',
    fullAddress: 'GEC Circle, Nasirabad, Chittagong',

    previousEducation: "Bachelor's Degree",
    institutionName: 'Chittagong University of Engineering & Technology',
    academicSubject: 'Electrical & Electronic Engineering',
    cgpa: '3.80 / 4.00',
    graduationYear: '2024',

    englishTestType: 'IELTS',
    englishScore: '7.0 Overall',
    testDate: '2025-10-05',

    documents: {
      passport: { id: 'doc-301', docType: 'passport', title: 'Passport Copy', fileName: 'Nusrat_Passport.pdf', status: 'Approved', uploadDate: '2026-02-01' },
      certificates: { id: 'doc-302', docType: 'certificates', title: 'B.Sc. Certificate', fileName: 'CUET_BSc_Cert.pdf', status: 'Approved', uploadDate: '2026-02-01' },
      transcripts: { id: 'doc-303', docType: 'transcripts', title: 'Academic Transcript', fileName: 'CUET_Transcripts.pdf', status: 'Approved', uploadDate: '2026-02-01' },
      englishTest: { id: 'doc-304', docType: 'englishTest', title: 'IELTS Result', fileName: 'IELTS_Nusrat.pdf', status: 'Approved', uploadDate: '2026-02-01' },
    },

    status: 'Application Received',
    isDraft: false,
    submissionDate: '01 February 2026',
    lastUpdated: '01 February 2026',
    timeline: [
      { id: 'tl-301', status: 'Application Received', date: '01 February 2026', note: 'Bologna Application registered.', updatedBy: 'System' },
    ],
  },
];

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('vercito_all_applications_v2');
      return saved ? JSON.parse(saved) : INITIAL_SEEDED_APPLICATIONS;
    } catch {
      return INITIAL_SEEDED_APPLICATIONS;
    }
  });

  const [activeApplication, setActiveApplication] = useState<ApplicationRecord | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('vercito_all_applications_v2', JSON.stringify(applications));
    } catch {
      // ignore
    }
  }, [applications]);

  // Generate a brand new unique Application ID and session every time Apply Now is clicked
  const startNewApplicationSession = (university: UniversityPartner): ApplicationRecord => {
    const studentId = currentUser?.id || 'USR-1001';
    const studentName = currentUser?.fullName || 'Applicant Student';
    const studentEmail = currentUser?.email || 'student@gmail.com';
    const studentPhone = currentUser?.phone || '+880 1800 000000';
    const studentDistrict = currentUser?.district || 'Dhaka';

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newAppId = `VER-APP-2026-${randomNum}`;
    const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

    const newApp: ApplicationRecord = {
      id: newAppId,
      studentUserId: studentId,
      studentName: studentName,
      studentEmail: studentEmail,
      studentPhone: studentPhone,
      studentDistrict: studentDistrict,

      universityId: university.id,
      universityName: university.name,
      universityLogo: university.logo,
      country: university.country,
      city: university.city,
      selectedCourse: university.featuredPrograms?.[0] || 'Master Degree Program',
      degreeLevel: university.programLevels?.[0] || "Master's",
      intake: university.intakes?.[0] || 'Fall Intake (August / September)',
      tuitionFeeEUR: university.tuitionFeePerYearEUR || 0,
      applicationFeeEUR: university.applicationFeeEUR || 0,
      applicationDeadline: university.applicationDeadline || 'Rolling Admissions',

      fullName: currentUser?.fullName || '',
      dateOfBirth: currentUser?.dateOfBirth || '2001-05-15',
      nationality: currentUser?.nationality || 'Bangladeshi',
      fullAddress: currentUser?.fullAddress || 'Dhaka, Bangladesh',

      previousEducation: "Bachelor's Degree",
      institutionName: 'Dhaka University',
      academicSubject: 'Computer Science',
      cgpa: '3.50 / 4.00',
      graduationYear: '2024',

      englishTestType: 'IELTS',
      englishScore: '7.0 Overall (L:7.5, R:7.0, W:6.5, S:7.0)',
      testDate: '2025-10-15',

      documents: {
        passport: { id: `doc-p-${newAppId}`, docType: 'passport', title: 'Passport Copy', fileName: 'Passport_Copy.pdf', status: 'Provided', uploadDate: nowStr },
        certificates: { id: `doc-c-${newAppId}`, docType: 'certificates', title: 'Academic Certificates', fileName: 'Academic_Degree.pdf', status: 'Provided', uploadDate: nowStr },
        transcripts: { id: `doc-t-${newAppId}`, docType: 'transcripts', title: 'Academic Transcripts', fileName: 'Official_Transcripts.pdf', status: 'Provided', uploadDate: nowStr },
        englishTest: { id: `doc-e-${newAppId}`, docType: 'englishTest', title: 'English Test / MOI', fileName: 'IELTS_TRF_Result.pdf', status: 'Provided', uploadDate: nowStr },
        cv: { id: `doc-v-${newAppId}`, docType: 'cv', title: 'Curriculum Vitae', fileName: 'CV_Resume.pdf', status: 'Provided', uploadDate: nowStr },
        sop: { id: `doc-s-${newAppId}`, docType: 'sop', title: 'Statement of Purpose', fileName: 'SOP_Letter.pdf', status: 'Provided', uploadDate: nowStr },
      },

      status: 'Application Received',
      isDraft: true,
      submissionDate: nowStr,
      lastUpdated: nowStr,
      timeline: [],
    };

    setApplications((prev) => [newApp, ...prev]);
    setActiveApplication(newApp);
    return newApp;
  };

  const checkSavedDraftForUni = (universityId: string): ApplicationRecord | null => {
    if (!currentUser) return null;
    const draft = applications.find(
      (app) => app.studentUserId === currentUser.id && app.universityId === universityId && app.isDraft === true
    );
    return draft || null;
  };

  const loadApplicationSession = (appId: string) => {
    const currentUserId = currentUser?.id || 'USR-1001';
    const found = applications.find((a) => a.id === appId);
    if (!found) {
      return { success: false, error: 'Application record not found.' };
    }
    if (found.studentUserId !== currentUserId) {
      return { success: false, error: 'ACCESS_DENIED' };
    }
    setActiveApplication(found);
    return { success: true, application: found };
  };

  const saveApplicationDraft = (appData: ApplicationRecord) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appData.id ? { ...appData, isDraft: true, lastUpdated: new Date().toLocaleDateString('en-GB') } : app))
    );
  };

  const submitApplicationRecord = (appData: ApplicationRecord): ApplicationRecord => {
    const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    const submittedApp: ApplicationRecord = {
      ...appData,
      isDraft: false,
      status: 'Application Received',
      submissionDate: nowStr,
      lastUpdated: nowStr,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          status: 'Application Received',
          date: nowStr,
          note: `Official application submitted for ${appData.universityName}. Assigned Application ID: ${appData.id}.`,
          updatedBy: 'System',
        },
      ],
    };

    setApplications((prev) => {
      const exists = prev.some((a) => a.id === submittedApp.id);
      if (exists) {
        return prev.map((a) => (a.id === submittedApp.id ? submittedApp : a));
      }
      return [submittedApp, ...prev];
    });

    setActiveApplication(submittedApp);
    return submittedApp;
  };

  const getUserApplications = (userId?: string): ApplicationRecord[] => {
    const targetId = userId || currentUser?.id || 'USR-1001';
    return applications.filter((a) => a.studentUserId === targetId);
  };

  // STRICT PRIVACY OWNERSHIP CHECK
  const getApplicationWithPrivacyCheck = (appId: string, requestingUserId?: string) => {
    const activeUserId = requestingUserId || currentUser?.id || 'GUEST';
    const found = applications.find((a) => a.id.trim().toUpperCase() === appId.trim().toUpperCase());

    if (!found) {
      return { success: false, error: 'Application not found with provided ID.' };
    }

    if (found.studentUserId !== activeUserId) {
      return {
        success: false,
        error: 'ACCESS_DENIED: You do not have permission to access or view this application dossier. It belongs to another registered student account.',
      };
    }

    return { success: true, application: found };
  };

  const updateApplicationStatusByAdmin = (appId: string, newStatus: ApplicationStatus, note?: string) => {
    const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const newTimelineEvent = {
            id: `tl-admin-${Date.now()}`,
            status: newStatus,
            date: nowStr,
            note: note || `Status updated to ${newStatus} by VERCITO Desk.`,
            updatedBy: 'VERCITO Admin',
          };
          return {
            ...app,
            status: newStatus,
            lastUpdated: nowStr,
            timeline: [newTimelineEvent, ...app.timeline],
          };
        }
        return app;
      })
    );
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        activeApplication,
        startNewApplicationSession,
        checkSavedDraftForUni,
        loadApplicationSession,
        saveApplicationDraft,
        submitApplicationRecord,
        getUserApplications,
        getApplicationWithPrivacyCheck,
        updateApplicationStatusByAdmin,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
};
