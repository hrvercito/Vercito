# VERCITO — European Higher Education Consultancy

> **Shaping Futures Beyond Borders** | EST. 2026
>
> Premium, European-standard study abroad consultancy platform for Bangladeshi students targeting top-ranked public & private universities in Italy, Germany, France, Hungary, Spain, Portugal, Greece, Malta, Netherlands, and Poland.

---

## 🌟 Key Features & Architecture

- **Multilingual Support (13 Languages)**:
  - **Primary**: বাংলা (Bengali - Noto Sans / Unicode compliant)
  - **Secondary & European**: English, Italian, German, French, Hungarian, Spanish, Portuguese, Greek, Dutch, Polish, Finnish, Swedish.
  - Automatic browser language detection with floating suggestion banner and persistent URL path routing (`/bn`, `/it`, `/de`, etc.).
- **Dynamic SEO Sitemap Generator**:
  - Downloadable `sitemap.xml` modal compliant with Google Search Console `hreflang` standards.
- **AI Profile Eligibility Evaluator**:
  - Interactive profile checker calculating admission chances, DSU scholarship eligibility, and visa likelihood based on GPA, degree, and IELTS score.
- **Italian DSU Scholarship Calculator**:
  - Live calculation of Italy's €7,000/year living grant, free university accommodation, and 100% tuition waivers based on family ISEE/family income.
- **Interactive Study Destinations**:
  - Dedicated insights for 10 European nations with real-time EUR (€) to BDT (৳) currency converter.
- **Interactive University Partners & Visa Checklist Tool**:
  - Comprehensive embassy document checklist (embassy appointment, police clearance, apostille/attestation, bank solvent statement, block account).
- **Corporate Brand Identity Suite**:
  - Full display of all 12 corporate brand collaterals including Logo Vector Emblem, Executive Business Card, Staff ID Card, Letterhead, Envelope, Rubber Stamp, Facebook Cover, Office Signboard, Email Signature, Company Profile, and Social Media Kit.
- **WhatsApp Live Chat Integration**:
  - Direct connection to VERCITO counselors (+880 1912-114343).

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **bun** / **yarn**

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Define environment variables (e.g. `VITE_GEMINI_API_KEY` or `GEMINI_API_KEY` for Gemini AI integration):

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying Directly to Netlify

This project is pre-configured with `netlify.toml` and `public/_redirects` for seamless deployment.

### Option A: Netlify Drag & Drop (Fastest)

1. Build the production bundle locally:
   ```bash
   npm run build
   ```
2. Log in to [Netlify App](https://app.netlify.com/).
3. Drag and drop the generated `dist/` directory into Netlify Sites.

### Option B: Netlify GitHub / Git Integration (Recommended)

1. Push this repository to GitHub or GitLab.
2. Go to **Netlify Dashboard** → **Add new site** → **Import an existing project**.
3. Select your repository.
4. Set the following Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node Version**: `20`
5. Add Environment Variables (if using Gemini AI server API routes):
   - `GEMINI_API_KEY` = *your_key*
6. Click **Deploy Site**.

---

## ⚡ Deploying to Vercel

1. Import your Git repository into [Vercel](https://vercel.com/).
2. Vercel automatically detects Vite:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**.

---

## 📁 Project Structure

```
├── public/
│   ├── _redirects            # Netlify SPA routing rules
│   └── robots.txt            # Search engine crawler instructions
├── src/
│   ├── components/
│   │   ├── AIEvaluatorModal.tsx        # AI Profile Check Modal
│   │   ├── AppointmentBookingModal.tsx # Consultation Booking Modal
│   │   ├── BlogSection.tsx             # European Education Guides
│   │   ├── BrandIdentityShowcase.tsx   # Corporate Collateral Suite (12 Items)
│   │   ├── ContactSection.tsx          # Office Address & Map
│   │   ├── FAQSection.tsx              # Frequently Asked Questions
│   │   ├── Footer.tsx                  # Footer & Sitemap Trigger
│   │   ├── Hero.tsx                    # Animated Hero & Quick Feasibility
│   │   ├── LanguageBanner.tsx          # Floating Language Detection Banner
│   │   ├── LanguageSwitcher.tsx        # Dropdown Language Switcher
│   │   ├── Navbar.tsx                  # Responsive Navigation Bar
│   │   ├── OnlineApplicationModal.tsx  # Direct EU Application Form
│   │   ├── ScholarshipCalculator.tsx   # DSU Italy Grant Calculator
│   │   ├── ServicesSection.tsx         # Admission & Visa Services
│   │   ├── SitemapModal.tsx            # Multilingual XML Sitemap Generator
│   │   ├── StudentJourney.tsx          # Step-by-Step Admission Process
│   │   ├── StudyDestinations.tsx       # 10 EU Target Countries
│   │   ├── SuccessStories.tsx          # Student Testimonials
│   │   ├── UniversityPartners.tsx      # EU Public Universities
│   │   ├── VisaChecklistTool.tsx       # Embassy Visa Preparation
│   │   └── WhatsAppWidget.tsx          # Floating Live Chat Widget
│   ├── i18n/
│   │   ├── LanguageContext.tsx         # Language State & Auto-Detection
│   │   ├── languages.ts                # Metadata for 13 Languages
│   │   └── translations.ts             # Unicode Bengali & Multi-lang Dictionary
│   ├── App.tsx                         # Main React Application Entry Point
│   ├── main.tsx                        # DOM Rendering Root
│   └── index.css                       # Global Tailwind CSS Styles
├── netlify.toml                        # Netlify deployment configuration
├── package.json                        # Project dependencies & scripts
├── vite.config.ts                      # Vite build configuration
└── README.md                           # Documentation & Deployment Guide
```

---

## 🏢 Corporate Information

- **Company**: VERCITO International Education Consultancy
- **Slogan**: *Shaping Futures Beyond Borders*
- **Founder & CEO**: Md Sohel Rana
- **Head Office**: Gulshan-2, Dhaka-1212, Bangladesh
- **Future Europe Office**: Portugal
- **Phone / WhatsApp**: +880 1912-114343
- **Email**: hr.vercito@gmail.com
- **Website**: [https://vercito.eu](https://vercito.eu)

---

© 2026 VERCITO International Education Consultancy. All rights reserved.
