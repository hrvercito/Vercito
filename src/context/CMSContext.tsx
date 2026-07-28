/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CMSData, DEFAULT_CMS_DATA, CMSHeroContent } from '../data/defaultCMSData';
import {
  CountryDestination,
  UniversityPartner,
  Scholarship,
  SuccessStory,
  FAQItem,
  DocumentChecklistItem,
  BlogPost,
} from '../types';

interface CMSContextType {
  cmsData: CMSData;
  isLoading: boolean;
  isSaving: boolean;
  saveMessage: string | null;
  adminToken: string | null;
  isAdminLoggedIn: boolean;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logoutAdmin: () => void;
  updateHero: (heroData: CMSHeroContent) => Promise<boolean>;
  updateDestinations: (destinations: CountryDestination[]) => Promise<boolean>;
  updateUniversities: (universities: UniversityPartner[]) => Promise<boolean>;
  updateScholarships: (scholarships: Scholarship[]) => Promise<boolean>;
  updateTestimonials: (testimonials: SuccessStory[]) => Promise<boolean>;
  updateFaqs: (faqs: FAQItem[]) => Promise<boolean>;
  updateVisaChecklist: (checklist: DocumentChecklistItem[]) => Promise<boolean>;
  updateBlogs: (blogs: BlogPost[]) => Promise<boolean>;
  resetToDefaultCMS: () => Promise<boolean>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'vercito_cms_content_v1';
const ADMIN_TOKEN_KEY = 'vercito_admin_token';

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

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  });

  const isAdminLoggedIn = !!adminToken;

  // Fetch live CMS data from backend on mount
  useEffect(() => {
    let isMounted = true;
    const fetchCMSData = async () => {
      try {
        const res = await fetch('/api/cms/content');
        if (res.ok) {
          const data = await res.json();
          if (data && !data.error && data.hero) {
            if (isMounted) {
              setCmsData(data);
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
            }
          }
        }
      } catch (err) {
        console.warn('Backend CMS endpoint unreachable, using local storage fallback.', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCMSData();
    return () => {
      isMounted = false;
    };
  }, []);

  const saveToServerAndLocal = async (updatedData: CMSData): Promise<boolean> => {
    setIsSaving(true);
    setSaveMessage(null);
    try {
      // 1. Save to local storage for instant UI state update
      setCmsData(updatedData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));

      // 2. Persist to backend
      const res = await fetch('/api/cms/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setSaveMessage('Saved successfully! Changes are live on the website.');
        setTimeout(() => setSaveMessage(null), 4000);
        return true;
      } else {
        setSaveMessage('Saved locally. (Server response error)');
        return true;
      }
    } catch (err) {
      console.error('Error saving CMS data:', err);
      setSaveMessage('Saved locally in browser storage.');
      return true;
    } finally {
      setIsSaving(false);
    }
  };

  const loginAdmin = async (email: string, pass: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        setAdminToken(data.token);
        localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (err) {
      return { success: false, message: 'Server connection error during login' };
    }
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  };

  const updateHero = (heroData: CMSHeroContent) => {
    const updated = { ...cmsData, hero: heroData };
    return saveToServerAndLocal(updated);
  };

  const updateDestinations = (destinations: CountryDestination[]) => {
    const updated = { ...cmsData, destinations };
    return saveToServerAndLocal(updated);
  };

  const updateUniversities = (universities: UniversityPartner[]) => {
    const updated = { ...cmsData, universities };
    return saveToServerAndLocal(updated);
  };

  const updateScholarships = (scholarships: Scholarship[]) => {
    const updated = { ...cmsData, scholarships };
    return saveToServerAndLocal(updated);
  };

  const updateTestimonials = (testimonials: SuccessStory[]) => {
    const updated = { ...cmsData, testimonials };
    return saveToServerAndLocal(updated);
  };

  const updateFaqs = (faqs: FAQItem[]) => {
    const updated = { ...cmsData, faqs };
    return saveToServerAndLocal(updated);
  };

  const updateVisaChecklist = (visaChecklist: DocumentChecklistItem[]) => {
    const updated = { ...cmsData, visaChecklist };
    return saveToServerAndLocal(updated);
  };

  const updateBlogs = (blogs: BlogPost[]) => {
    const updated = { ...cmsData, blogs };
    return saveToServerAndLocal(updated);
  };

  const resetToDefaultCMS = () => {
    return saveToServerAndLocal(DEFAULT_CMS_DATA);
  };

  return (
    <CMSContext.Provider
      value={{
        cmsData,
        isLoading,
        isSaving,
        saveMessage,
        adminToken,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        updateHero,
        updateDestinations,
        updateUniversities,
        updateScholarships,
        updateTestimonials,
        updateFaqs,
        updateVisaChecklist,
        updateBlogs,
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
