/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StudyDestinations } from './components/StudyDestinations';
import { ServicesSection } from './components/ServicesSection';
import { ScholarshipCalculator } from './components/ScholarshipCalculator';
import { UniversityPartners } from './components/UniversityPartners';
import { StudentJourney } from './components/StudentJourney';
import { SuccessStories } from './components/SuccessStories';
import { VisaChecklistTool } from './components/VisaChecklistTool';
import { BlogSection } from './components/BlogSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { AIEvaluatorModal } from './components/AIEvaluatorModal';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { OnlineApplicationModal } from './components/OnlineApplicationModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AIAssistantWidget } from './components/AIAssistantWidget';
import { LanguageProvider } from './i18n/LanguageContext';
import { LanguageBanner } from './components/LanguageBanner';
import { SitemapModal } from './components/SitemapModal';

import { BrandIdentityShowcase } from './components/BrandIdentityShowcase';
import { Currency } from './types';

export function AppContent() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('vercito_theme') === 'dark';
  });
  const [currency, setCurrency] = useState<Currency>('EUR');

  // Modals state
  const [isAIEvaluatorOpen, setIsAIEvaluatorOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const [selectedCountryForApp, setSelectedCountryForApp] = useState('Italy');
  const [selectedUniForApp, setSelectedUniForApp] = useState('Politecnico di Milano');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vercito_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vercito_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleCurrency = () => setCurrency(currency === 'EUR' ? 'BDT' : 'EUR');

  const handleOpenApplicationWithUni = (uniName: string) => {
    setSelectedUniForApp(uniName);
    setIsApplicationOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 selection:bg-[#D4AF37] selection:text-[#0B1F3A]">
      {/* Navigation Bar */}
      <Navbar
        isDarkMode={isDark}
        onToggleDarkMode={toggleTheme}
        currency={currency}
        onToggleCurrency={toggleCurrency}
        onOpenAIEvaluator={() => setIsAIEvaluatorOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenApplication={() => setIsApplicationOpen(true)}
      />

      <main>
        {/* Animated Hero Section with Quick Eligibility Widget */}
        <Hero
          onOpenAIEvaluator={() => setIsAIEvaluatorOpen(true)}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* Study Destinations (Italy, Germany, France, Hungary, Spain, Portugal, Greece, Malta, Netherlands, Poland) */}
        <StudyDestinations
          currency={currency}
          onSelectCountryForApplication={(countryName) => {
            setSelectedCountryForApp(countryName);
            setIsApplicationOpen(true);
          }}
        />

        {/* Comprehensive Services */}
        <ServicesSection
          onOpenAppointment={() => setIsAppointmentOpen(true)}
          onOpenApplication={() => setIsApplicationOpen(true)}
        />

        {/* Scholarship Section & Grant Calculator */}
        <ScholarshipCalculator
          currency={currency}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
          onOpenApplication={() => setIsApplicationOpen(true)}
        />

        {/* Partner Universities Grid */}
        <UniversityPartners
          currency={currency}
          onSelectUniversityForApplication={handleOpenApplicationWithUni}
        />

        {/* 6-Step Student Journey Timeline */}
        <StudentJourney onOpenAppointment={() => setIsAppointmentOpen(true)} />

        {/* Success Stories & Verified Testimonials */}
        <SuccessStories />

        {/* Visa Process & Document Checklist Tool */}
        <VisaChecklistTool />

        {/* Knowledge Base & Country Guides Blog */}
        <BlogSection />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Corporate Brand Identity Showcase & Collateral Suite */}
        <BrandIdentityShowcase />

        {/* Direct Contact & Gulshan/Chittagong Office Booking */}
        <ContactSection onOpenAppointment={() => setIsAppointmentOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Language Detection Suggestion Banner */}
      <LanguageBanner />

      {/* SEO Sitemap Modal */}
      <SitemapModal />

      {/* Floating WhatsApp Live Chat */}
      <WhatsAppWidget />

      {/* Floating AI Counselor Assistant */}
      <AIAssistantWidget
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenApplication={() => setIsApplicationOpen(true)}
      />

      {/* Modals */}
      <AIEvaluatorModal
        isOpen={isAIEvaluatorOpen}
        onClose={() => setIsAIEvaluatorOpen(false)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      <AppointmentBookingModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />

      <OnlineApplicationModal
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        initialCountry={selectedCountryForApp}
        initialUniversity={selectedUniForApp}
      />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
