/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CMSData,
  DEFAULT_CMS_DATA,
  CMSHeroContent,
} from '../data/defaultCMSData';
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
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  User,
} from '../lib/firebase';

interface CMSContextType {
  cmsData: CMSData;
  isLoading: boolean;
  isSaving: boolean;
  saveMessage: string | null;
  adminToken: string | null;
  adminUser: User | null;
  isAdminLoggedIn: boolean;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; message?: string }>;
  logoutAdmin: () => Promise<void>;
  updateHero: (heroData: CMSHeroContent) => Promise<boolean>;
  updateDestinations: (destinations: CountryDestination[]) => Promise<boolean>;
  updateUniversities: (universities: UniversityPartner[]) => Promise<boolean>;
  updateScholarships: (scholarships: Scholarship[]) => Promise<boolean>;
  updateTestimonials: (testimonials: SuccessStory[]) => Promise<boolean>;
  updateFaqs: (faqs: FAQItem[]) => Promise<boolean>;
  updateVisaChecklist: (checklist: DocumentChecklistItem[]) => Promise<boolean>;
  updateBlogs: (blogs: BlogPost[]) => Promise<boolean>;
  updateFounderProfile: (profile: FounderProfile) => Promise<boolean>;
  updateContactInfo: (contactInfo: ContactInfo) => Promise<boolean>;
  resetToDefaultCMS: () => Promise<boolean>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'vercito_cms_content_v2';
const ADMIN_TOKEN_KEY = 'vercito_admin_token';

// List of allowed administrator emails
const ADMIN_EMAILS = [
  'hr.vercito@gmail.com',
  'admin@vercito.com',
  'ceo@vercito.com',
  'md@vercito.com',
];

export const isUserAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  return (
    ADMIN_EMAILS.includes(cleanEmail) ||
    cleanEmail.endsWith('@vercito.com') ||
    cleanEmail.includes('vercito')
  );
};

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmsData, setCmsData] = useState<CMSData>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached CMS data', e);
      }
    }
    return DEFAULT_CMS_DATA;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  });

  const isAdminLoggedIn = !!adminToken;

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isUserAdmin(user.email)) {
        setAdminUser(user);
        const token = user.uid || 'firebase_verified_admin';
        setAdminToken(token);
        localStorage.setItem(ADMIN_TOKEN_KEY, token);
      } else if (user && !isUserAdmin(user.email)) {
        // Sign out non-admin user
        signOut(auth);
        setAdminUser(null);
        setAdminToken(null);
        localStorage.removeItem(ADMIN_TOKEN_KEY);
      } else {
        setAdminUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to Firestore 'cms/main_content' document in real-time
  useEffect(() => {
    let unsubscribeFirestore: (() => void) | null = null;

    try {
      const cmsRef = doc(db, 'cms', 'main_content');
      unsubscribeFirestore = onSnapshot(
        cmsRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const firestoreData = snapshot.data() as CMSData;
            if (firestoreData && firestoreData.hero) {
              setCmsData((prev) => ({
                ...DEFAULT_CMS_DATA,
                ...firestoreData,
              }));
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(firestoreData));
            }
          } else {
            // First time initialization: seed Firestore with DEFAULT_CMS_DATA
            setDoc(cmsRef, DEFAULT_CMS_DATA, { merge: true }).catch((err) =>
              console.warn('Initial Firestore CMS seeding notice:', err)
            );
          }
          setIsLoading(false);
        },
        (error) => {
          console.warn('Firestore CMS snapshot listener notice (using local storage fallback):', error);
          setIsLoading(false);
        }
      );
    } catch (e) {
      console.warn('Firestore initialization fallback:', e);
      setIsLoading(false);
    }

    return () => {
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  // Save updated CMS data to Firestore and Local Storage
  const saveToFirestoreAndLocal = async (updatedData: CMSData): Promise<boolean> => {
    setIsSaving(true);
    setSaveMessage(null);
    try {
      // 1. Update React state & Local Storage immediately
      setCmsData(updatedData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));

      // 2. Persist to Firestore
      const cmsRef = doc(db, 'cms', 'main_content');
      await setDoc(cmsRef, updatedData, { merge: true });

      setSaveMessage('Saved successfully! Changes synced to Cloud Firestore.');
      setTimeout(() => setSaveMessage(null), 4000);
      return true;
    } catch (err: any) {
      console.warn('Firestore save notice (saved to local state):', err);
      setSaveMessage('Saved in local browser state.');
      setTimeout(() => setSaveMessage(null), 4000);
      return true;
    } finally {
      setIsSaving(false);
    }
  };

  // Firebase Email/Password Admin Login
  const loginAdmin = async (email: string, pass: string) => {
    if (!isUserAdmin(email)) {
      return {
        success: false,
        message: 'Access denied',
      };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      if (isUserAdmin(user.email)) {
        setAdminUser(user);
        const token = user.uid;
        setAdminToken(token);
        localStorage.setItem(ADMIN_TOKEN_KEY, token);
        return { success: true };
      } else {
        await signOut(auth);
        return { success: false, message: 'Access denied' };
      }
    } catch (firebaseErr: any) {
      return {
        success: false,
        message: 'Access denied',
      };
    }
  };

  // Firebase Google Sign-In Admin Login
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (isUserAdmin(user.email)) {
        setAdminUser(user);
        const token = user.uid;
        setAdminToken(token);
        localStorage.setItem(ADMIN_TOKEN_KEY, token);
        return { success: true };
      } else {
        await signOut(auth);
        return {
          success: false,
          message: 'Access denied',
        };
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      return {
        success: false,
        message: 'Access denied',
      };
    }
  };

  // Logout
  const logoutAdmin = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Sign out notice:', e);
    }
    setAdminUser(null);
    setAdminToken(null);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  };

  // Section Update Helpers
  const updateHero = (heroData: CMSHeroContent) => {
    const updated = { ...cmsData, hero: heroData };
    return saveToFirestoreAndLocal(updated);
  };

  const updateDestinations = (destinations: CountryDestination[]) => {
    const updated = { ...cmsData, destinations };
    return saveToFirestoreAndLocal(updated);
  };

  const updateUniversities = (universities: UniversityPartner[]) => {
    const updated = { ...cmsData, universities };
    return saveToFirestoreAndLocal(updated);
  };

  const updateScholarships = (scholarships: Scholarship[]) => {
    const updated = { ...cmsData, scholarships };
    return saveToFirestoreAndLocal(updated);
  };

  const updateTestimonials = (testimonials: SuccessStory[]) => {
    const updated = { ...cmsData, testimonials };
    return saveToFirestoreAndLocal(updated);
  };

  const updateFaqs = (faqs: FAQItem[]) => {
    const updated = { ...cmsData, faqs };
    return saveToFirestoreAndLocal(updated);
  };

  const updateVisaChecklist = (visaChecklist: DocumentChecklistItem[]) => {
    const updated = { ...cmsData, visaChecklist };
    return saveToFirestoreAndLocal(updated);
  };

  const updateBlogs = (blogs: BlogPost[]) => {
    const updated = { ...cmsData, blogs };
    return saveToFirestoreAndLocal(updated);
  };

  const updateFounderProfile = (founderProfile: FounderProfile) => {
    const updated = { ...cmsData, founderProfile };
    return saveToFirestoreAndLocal(updated);
  };

  const updateContactInfo = (contactInfo: ContactInfo) => {
    const updated = { ...cmsData, contactInfo };
    return saveToFirestoreAndLocal(updated);
  };

  const resetToDefaultCMS = () => {
    return saveToFirestoreAndLocal(DEFAULT_CMS_DATA);
  };

  return (
    <CMSContext.Provider
      value={{
        cmsData,
        isLoading,
        isSaving,
        saveMessage,
        adminToken,
        adminUser,
        isAdminLoggedIn,
        isAdminAuthenticated: isAdminLoggedIn,
        loginAdmin,
        loginWithGoogle,
        logoutAdmin,
        updateHero,
        updateDestinations,
        updateUniversities,
        updateScholarships,
        updateTestimonials,
        updateFaqs,
        updateVisaChecklist,
        updateBlogs,
        updateFounderProfile,
        updateContactInfo,
        resetToDefaultCMS,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
