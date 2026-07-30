/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickAccessSection } from './components/QuickAccessSection';
import { WhyChooseVercito } from './components/WhyChooseVercito';
import { FeaturedUniversitiesHomepage } from './components/FeaturedUniversitiesHomepage';
import { SimpleApplicationProcess } from './components/SimpleApplicationProcess';
import { CompactCTASection } from './components/CompactCTASection';
import { PageHeaderBanner } from './components/PageHeaderBanner';

import { VisaProcessSteps } from './components/VisaProcessSteps';
import { DocumentGuideSection } from './components/DocumentGuideSection';
import { CampusGallerySection } from './components/CampusGallerySection';
import { CourseSelectionStepper } from './components/CourseSelectionStepper';
import { StudyDestinations } from './components/StudyDestinations';
import { ServicesSection } from './components/ServicesSection';
import { ScholarshipCalculator } from './components/ScholarshipCalculator';
import { UniversityPartners } from './components/UniversityPartners';
import { StudentJourney } from './components/StudentJourney';
import { SuccessStories } from './components/SuccessStories';
import { VisaChecklistTool } from './components/VisaChecklistTool';
import { BlogSection } from './components/BlogSection';
import { FAQSection } from './components/FAQSection';
import { PaymentSection } from './components/PaymentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { AIEvaluatorModal } from './components/AIEvaluatorModal';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { OnlineApplicationModal } from './components/OnlineApplicationModal';
import { StudentPortalModal } from './components/StudentPortalModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AIAssistantWidget } from './components/AIAssistantWidget';
import { LanguageProvider } from './i18n/LanguageContext';
import { LanguageBanner } from './components/LanguageBanner';
import { SitemapModal } from './components/SitemapModal';

import { CMSProvider, useCMS } from './context/CMSContext';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { LoadingScreen } from './components/LoadingScreen';

import { BrandIdentityShowcase } from './components/BrandIdentityShowcase';
import { Currency } from './types';

export function AppContent() {
  const { isAdminAuthenticated, isLoading } = useCMS();
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.hash === '#admin' || window.location.pathname.startsWith('/admin');
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('vercito_theme') === 'dark';
  });
  const [currency, setCurrency] = useState<Currency>('EUR');

  // Modals state
  const [isAIEvaluatorOpen, setIsAIEvaluatorOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);

  const [selectedCountryForApp, setSelectedCountryForApp] = useState('Italy');
  const [selectedUniForApp, setSelectedUniForApp] = useState('Politecnico di Milano');

  const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash || '#');

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash || '#';
      setCurrentHash(hash);
      setIsAdminView(hash === '#admin' || window.location.pathname.startsWith('/admin'));

      if (hash === '#portal' || hash === '#student-portal') {
        setIsStudentPortalOpen(true);
      }
    };
    window.addEventListener('hashchange', checkHash);
    checkHash();
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

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

  const handleOpenApplicationWithUni = (uniName: string, country?: string) => {
    if (country) setSelectedCountryForApp(country);
    setSelectedUniForApp(uniName);
    setIsApplicationOpen(true);
  };

  const returnToSite = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  if (isLoading) {
    return <LoadingScreen message="Loading VERCITO Global Education System..." />;
  }

  // If in Admin mode
  if (isAdminView) {
    if (isAdminAuthenticated) {
      return <AdminLayout onReturnToSite={returnToSite} />;
    }
    return <AdminLogin onLoginSuccess={() => setIsAdminView(true)} onReturnToSite={returnToSite} />;
  }

  // Route flags
  const isUniversitiesPage = currentHash === '#universities';
  const isDestinationsPage = currentHash === '#destinations';
  const isServicesPage = currentHash === '#services';
  const isAboutPage = currentHash === '#about' || currentHash === '#process-steps';
  const isFAQPage = currentHash === '#faq';
  const isScholarshipsPage = currentHash === '#scholarships' || currentHash === '#language-programs';
  const isBlogPage = currentHash === '#blog';
  const isContactPage = currentHash === '#contact';
  const isPaymentPage = currentHash === '#payment';

  const isSubPage =
    isUniversitiesPage ||
    isDestinationsPage ||
    isServicesPage ||
    isAboutPage ||
    isFAQPage ||
    isScholarshipsPage ||
    isBlogPage ||
    isContactPage ||
    isPaymentPage;

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
        onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
      />

      <main>
        {!isSubPage && (
          /* ================= COMPACT HOMEPAGE ================= */
          <>
            {/* 1. Hero Section */}
            <Hero
              onOpenAIEvaluator={() => setIsAIEvaluatorOpen(true)}
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenApplication={() => setIsApplicationOpen(true)}
              onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
            />

            {/* 2. Quick Access Section */}
            <QuickAccessSection
              onExploreUniversities={() => (window.location.hash = '#universities')}
              onCheckEligibility={() => setIsAIEvaluatorOpen(true)}
              onApplyOnline={() => setIsApplicationOpen(true)}
              onViewApplication={() => setIsStudentPortalOpen(true)}
            />

            {/* 3. Why Choose Vercito Section */}
            <WhyChooseVercito onLearnMore={() => (window.location.hash = '#about')} />

            {/* 4. Featured Universities (3-4 cards) */}
            <FeaturedUniversitiesHomepage
              currency={currency}
              onViewAllUniversities={() => (window.location.hash = '#universities')}
              onSelectUniversityForApplication={handleOpenApplicationWithUni}
            />

            {/* 5. Simple 4-Step Application Process */}
            <SimpleApplicationProcess onStartApplication={() => setIsApplicationOpen(true)} />

            {/* 6. Compact Call-To-Action Section */}
            <CompactCTASection
              onOpenApplication={() => setIsApplicationOpen(true)}
              onOpenCounseling={() => setIsAppointmentOpen(true)}
            />
          </>
        )}

        {/* ================= DEDICATED SEPARATE PAGES ================= */}

        {/* Universities Page */}
        {isUniversitiesPage && (
          <>
            <PageHeaderBanner
              category="Universities"
              title="Partner Universities Directory"
              subtitle="Browse accredited European & American universities, filter by tuition budgets, scholarship eligibility, and apply directly."
              onBackToHome={() => (window.location.hash = '#')}
            />
            <UniversityPartners
              currency={currency}
              onSelectUniversityForApplication={handleOpenApplicationWithUni}
            />
            <CourseSelectionStepper
              currency={currency}
              onOpenApplicationWithUni={handleOpenApplicationWithUni}
            />
          </>
        )}

        {/* Countries / Destinations Page */}
        {isDestinationsPage && (
          <>
            <PageHeaderBanner
              category="Destinations"
              title="Global Study Destinations"
              subtitle="Explore top European and American study destinations with comprehensive tuition, visa success rate, and post-study work guides."
              onBackToHome={() => (window.location.hash = '#')}
            />
            <StudyDestinations
              currency={currency}
              onSelectCountryForApplication={(countryName) => {
                setSelectedCountryForApp(countryName);
                setIsApplicationOpen(true);
              }}
              onOpenAIEvaluator={() => setIsAIEvaluatorOpen(true)}
            />
          </>
        )}

        {/* Services Page */}
        {isServicesPage && (
          <>
            <PageHeaderBanner
              category="Services"
              title="Our Professional Services"
              subtitle="Complete end-to-end international student services, from university shortlisting and SOP preparation to embassy file audits and flight departure."
              onBackToHome={() => (window.location.hash = '#')}
            />
            <ServicesSection
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenApplication={() => setIsApplicationOpen(true)}
            />
            <DocumentGuideSection />
            <VisaChecklistTool />
          </>
        )}

        {/* About Us Page */}
        {isAboutPage && (
          <>
            <PageHeaderBanner
              category="About Us"
              title="About Vercito Higher Education"
              subtitle="Empowering international students since 2026 with a proven 98.8% visa success rate and dedicated student support."
              onBackToHome={() => (window.location.hash = '#')}
            />
            <VisaProcessSteps onOpenAppointment={() => setIsAppointmentOpen(true)} />
            <CampusGallerySection />
            <StudentJourney onOpenAppointment={() => setIsAppointmentOpen(true)} />
            <SuccessStories onOpenApplication={() => setIsApplicationOpen(true)} />
            <BrandIdentityShowcase />
          </>
        )}

        {/* FAQ Page */}
        {isFAQPage && (
          <>
            <PageHeaderBanner
              category="FAQ"
              title="Frequently Asked Questions"
              subtitle="Clear answers to common questions regarding admissions, DSU scholarships, bank statement audits, and embassy visas."
              onBackToHome={() => (window.location.hash = '#')}
            />
            <FAQSection />
          </>
        )}

        {/* Scholarships Page */}
        {isScholarshipsPage && (
          <>
            <PageHeaderBanner
              category="Scholarships"
              title="Scholarships & Tuition Waiver Grants"
              subtitle="Calculate your grant eligibility and explore regional tuition waiver programs up to €7,000 annually."
              onBackToHome={() => (window.location.hash = '#')}
            />
            <ScholarshipCalculator
              currency={currency}
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenApplication={() => setIsApplicationOpen(true)}
            />
          </>
        )}

        {/* Blog Page */}
        {isBlogPage && (
          <>
            <PageHeaderBanner
              category="Blog"
              title="Study Abroad Guides & News"
              subtitle="Latest insights, embassy rules, living cost guides, and student success stories."
              onBackToHome={() => (window.location.hash = '#')}
            />
            <BlogSection />
          </>
        )}

        {/* Contact Page */}
        {isContactPage && (
          <>
            <PageHeaderBanner
              category="Contact"
              title="Contact Vercito Specialists"
              subtitle="Visit our Gulshan (Dhaka) or Chittagong offices or schedule an online video consultation."
              onBackToHome={() => (window.location.hash = '#')}
            />
            <ContactSection
              onOpenAppointment={() => setIsAppointmentOpen(true)}
              onOpenAIEvaluator={() => setIsAIEvaluatorOpen(true)}
            />
          </>
        )}

        {/* Payments Page */}
        {isPaymentPage && (
          <>
            <PageHeaderBanner
              category="Payments"
              title="Secure Payment Portal"
              subtitle="Pay official application processing fees or tuition deposits securely via SSLCommerz gateway."
              onBackToHome={() => (window.location.hash = '#')}
            />
            <PaymentSection currency={currency} />
          </>
        )}
      </main>

      {/* Requirement 10: Footer with Company Info, Quick Links & Admin Console Link */}
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

      <StudentPortalModal
        isOpen={isStudentPortalOpen}
        onClose={() => setIsStudentPortalOpen(false)}
        onOpenApplyNow={() => setIsApplicationOpen(true)}
      />
    </div>
  );
}

export function App() {
  return (
    <CMSProvider>
      <LanguageProvider>
        <AuthProvider>
          <ApplicationProvider>
            <AppContent />
          </ApplicationProvider>
        </AuthProvider>
      </LanguageProvider>
    </CMSProvider>
  );
}

export default App;
