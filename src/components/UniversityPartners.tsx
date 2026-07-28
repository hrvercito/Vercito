/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Building2,
  Search,
  GraduationCap,
  Award,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  Zap,
  Bookmark,
  CheckCircle2,
  Star,
  Globe,
  MapPin,
  Sparkles,
  BookOpen,
  DollarSign,
  X,
  FileCheck,
} from 'lucide-react';
import { Currency, UniversityPartner } from '../types';
import { useCMS } from '../context/CMSContext';
import { UniversityDetailModal } from './UniversityDetailModal';
import { UniversityCompareDrawer } from './UniversityCompareDrawer';

interface UniversityPartnersProps {
  currency: Currency;
  onSelectUniversityForApplication: (uniName: string) => void;
}

export const UniversityPartners: React.FC<UniversityPartnersProps> = ({
  currency,
  onSelectUniversityForApplication,
}) => {
  const { cmsData } = useCMS();
  const UNIVERSITY_PARTNERS = cmsData.universities || [];

  // Filtering States
  const [search, setSearch] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('All');
  const [selectedProgramLevel, setSelectedProgramLevel] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedEnglishTest, setSelectedEnglishTest] = useState('All');
  const [selectedTuitionRange, setSelectedTuitionRange] = useState('All');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Modals & Drawers States
  const [selectedUniversity, setSelectedUniversity] = useState<UniversityPartner | null>(null);
  const [comparedUnis, setComparedUnis] = useState<UniversityPartner[]>([]);
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vercito_bookmarked_unis');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const EUR_TO_BDT_RATE = 132;
  const formatMoney = (amountEUR?: number) => {
    if (amountEUR === undefined || amountEUR === null) return 'Contact Admissions';
    if (amountEUR === 0) return 'Tuition Free (€0)';
    if (currency === 'BDT') {
      const bdt = Math.round(amountEUR * EUR_TO_BDT_RATE);
      return `৳${bdt.toLocaleString('en-IN')}/yr`;
    }
    return `€${amountEUR.toLocaleString('en-US')}/yr`;
  };

  // Dynamically extract available countries from the university database
  const availableCountries = useMemo(() => {
    const set = new Set<string>();
    UNIVERSITY_PARTNERS.forEach((u) => {
      if (u.country) set.add(u.country);
    });
    return ['All', ...Array.from(set).sort()];
  }, [UNIVERSITY_PARTNERS]);

  // Handle Bookmarks
  const toggleBookmark = (uniId: string) => {
    setBookmarkedIds((prev) => {
      const updated = prev.includes(uniId) ? prev.filter((id) => id !== uniId) : [...prev, uniId];
      localStorage.setItem('vercito_bookmarked_unis', JSON.stringify(updated));
      return updated;
    });
  };

  // Handle Compare
  const toggleCompare = (uni: UniversityPartner) => {
    setComparedUnis((prev) => {
      const exists = prev.some((u) => u.id === uni.id);
      if (exists) {
        return prev.filter((u) => u.id !== uni.id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 universities at a time.');
        return prev;
      }
      setShowCompareDrawer(true);
      return [...prev, uni];
    });
  };

  // Filter Logic
  const filteredUnis = useMemo(() => {
    return UNIVERSITY_PARTNERS.filter((u) => {
      // Search
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        u.name.toLowerCase().includes(searchLower) ||
        u.city.toLowerCase().includes(searchLower) ||
        u.country.toLowerCase().includes(searchLower) ||
        (u.featuredPrograms && u.featuredPrograms.some((p) => p.toLowerCase().includes(searchLower)));

      // Country
      const matchesCountry = selectedCountryFilter === 'All' || u.country === selectedCountryFilter;

      // Program Level
      const matchesLevel =
        selectedProgramLevel === 'All' ||
        (u.programLevels && u.programLevels.includes(selectedProgramLevel as any));

      // Type
      const matchesType = selectedType === 'All' || u.type === selectedType;

      // English Test / Waiver
      let matchesEnglish = true;
      if (selectedEnglishTest === 'No IELTS') {
        matchesEnglish = u.englishWaiverPossible === true || (u.englishRequirementTypes && u.englishRequirementTypes.includes('No IELTS'));
      } else if (selectedEnglishTest === 'MOI Accepted') {
        matchesEnglish = u.moiAccepted !== false || (u.englishRequirementTypes && u.englishRequirementTypes.includes('MOI Accepted'));
      } else if (selectedEnglishTest === 'Duolingo Accepted') {
        matchesEnglish = u.duolingoAccepted === true || (u.englishRequirementTypes && u.englishRequirementTypes.includes('Duolingo Accepted'));
      } else if (selectedEnglishTest === 'PTE Accepted') {
        matchesEnglish = u.pteAccepted === true || (u.englishRequirementTypes && u.englishRequirementTypes.includes('PTE Accepted'));
      }

      // Tuition Range
      let matchesTuition = true;
      const fee = u.tuitionFeePerYearEUR ?? 0;
      if (selectedTuitionRange === 'Free') {
        matchesTuition = fee === 0;
      } else if (selectedTuitionRange === 'Low') {
        matchesTuition = fee > 0 && fee <= 3000;
      } else if (selectedTuitionRange === 'Medium') {
        matchesTuition = fee > 3000 && fee <= 12000;
      } else if (selectedTuitionRange === 'High') {
        matchesTuition = fee > 12000;
      }

      return matchesSearch && matchesCountry && matchesLevel && matchesType && matchesEnglish && matchesTuition;
    });
  }, [
    UNIVERSITY_PARTNERS,
    search,
    selectedCountryFilter,
    selectedProgramLevel,
    selectedType,
    selectedEnglishTest,
    selectedTuitionRange,
  ]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCountryFilter('All');
    setSelectedProgramLevel('All');
    setSelectedType('All');
    setSelectedEnglishTest('All');
    setSelectedTuitionRange('All');
  };

  return (
    <section id="universities" className="py-24 bg-white dark:bg-[#0B1F3A] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>100+ Global University Database</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            Explore Universities Worldwide
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Search top public and private universities across the USA, UK, Canada, Europe, Asia, and Australia. Filter by tuition fee, English waiver, QS ranking, and available scholarships.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          {/* Main Search and Country Filter Row */}
          <div className="flex flex-col lg:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by university name, city, or program..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37] transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Country Selector Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 lg:pb-0 no-scrollbar">
              {availableCountries.slice(0, 10).map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCountryFilter(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCountryFilter === c
                      ? 'bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] shadow-md font-bold'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#D4AF37]'
                  }`}
                >
                  {c === 'All' ? '🌐 All Countries' : c}
                </button>
              ))}
              {availableCountries.length > 10 && (
                <select
                  value={availableCountries.slice(10).includes(selectedCountryFilter) ? selectedCountryFilter : ''}
                  onChange={(e) => setSelectedCountryFilter(e.target.value || 'All')}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="">More Countries ({availableCountries.length - 10})</option>
                  {availableCountries.slice(10).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 shrink-0 ${
                showAdvancedFilters
                  ? 'bg-[#D4AF37] text-[#0B1F3A] border-[#D4AF37]'
                  : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-[#D4AF37]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filter Expansion */}
          {showAdvancedFilters && (
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {/* Degree Level */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase text-slate-400 font-mono">
                  Degree Level
                </label>
                <select
                  value={selectedProgramLevel}
                  onChange={(e) => setSelectedProgramLevel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="All">All Degrees</option>
                  <option value="Bachelor's">Bachelor's Degrees</option>
                  <option value="Master's">Master's Degrees</option>
                  <option value="PhD">PhD Doctorates</option>
                  <option value="Diploma">Diploma Programs</option>
                  <option value="Foundation">Foundation Track</option>
                  <option value="Language Programs">Language Programs</option>
                  <option value="Preparatory Programs">Preparatory Programs</option>
                </select>
              </div>

              {/* Institution Type */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase text-slate-400 font-mono">
                  Institution Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="All">All Types (Public & Private)</option>
                  <option value="Public">Public University</option>
                  <option value="Private">Private University</option>
                  <option value="Polytechnic">Polytechnic / Institute</option>
                </select>
              </div>

              {/* English Requirements */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase text-slate-400 font-mono">
                  English Waiver & Test
                </label>
                <select
                  value={selectedEnglishTest}
                  onChange={(e) => setSelectedEnglishTest(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="All">Any Requirement</option>
                  <option value="No IELTS">No IELTS / IELTS Waived</option>
                  <option value="MOI Accepted">MOI Accepted</option>
                  <option value="Duolingo Accepted">Duolingo Accepted</option>
                  <option value="PTE Accepted">PTE Accepted</option>
                </select>
              </div>

              {/* Tuition Range */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase text-slate-400 font-mono">
                  Tuition Fee Range
                </label>
                <select
                  value={selectedTuitionRange}
                  onChange={(e) => setSelectedTuitionRange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="All">All Tuition Rates</option>
                  <option value="Free">Tuition Free (€0)</option>
                  <option value="Low">Low Tuition (€1 to €3,000/yr)</option>
                  <option value="Medium">Mid Tuition (€3,000 to €12,000/yr)</option>
                  <option value="High">Over €12,000/yr</option>
                </select>
              </div>

              {/* Reset Filters */}
              <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-between pt-2">
                <span className="text-slate-500 font-medium">
                  Showing <strong>{filteredUnis.length}</strong> of <strong>{UNIVERSITY_PARTNERS.length}</strong> universities
                </span>
                <button
                  onClick={resetFilters}
                  className="text-[#D4AF37] font-bold hover:underline transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Bar summary */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>
            Found <strong className="text-slate-900 dark:text-white">{filteredUnis.length}</strong> matching institutions
          </span>
          {comparedUnis.length > 0 && (
            <button
              onClick={() => setShowCompareDrawer(true)}
              className="text-[#D4AF37] font-bold flex items-center gap-1.5 hover:underline"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Comparing ({comparedUnis.length} / 3)</span>
            </button>
          )}
        </div>

        {/* Universities Grid */}
        {filteredUnis.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-4">
            <Building2 className="w-12 h-12 mx-auto text-slate-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
              No Universities Matched Your Filters
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search query, country selection, or tuition range filters to explore available opportunities.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUnis.map((uni) => {
              const isBookmarked = bookmarkedIds.includes(uni.id);
              const isCompared = comparedUnis.some((u) => u.id === uni.id);

              return (
                <div
                  key={uni.id}
                  className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Image Banner */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={uni.image}
                      alt={uni.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-black/30" />

                    {/* Country & Type Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5">
                      <span>{uni.logo}</span>
                      <span>{uni.country}</span>
                    </div>

                    {/* Quick Bookmark & Compare Buttons */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(uni);
                        }}
                        title={isCompared ? 'Remove from compare' : 'Add to compare'}
                        className={`p-2 rounded-full border transition-all ${
                          isCompared
                            ? 'bg-[#D4AF37] text-[#0B1F3A] border-[#D4AF37]'
                            : 'bg-black/50 text-white border-white/20 hover:bg-black/80'
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(uni.id);
                        }}
                        title={isBookmarked ? 'Saved' : 'Save to favorites'}
                        className={`p-2 rounded-full border transition-all ${
                          isBookmarked
                            ? 'bg-rose-500 text-white border-rose-500'
                            : 'bg-black/50 text-white border-white/20 hover:bg-black/80'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    {/* QS Ranking & Location */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {uni.city}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-[#D4AF37] text-[#0B1F3A] font-extrabold uppercase text-[10px]">
                        QS Rank #{uni.ranking}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => setSelectedUniversity(uni)}
                        className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white leading-snug mb-2 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] cursor-pointer transition-colors"
                      >
                        {uni.name}
                      </h3>

                      <div className="flex items-center justify-between text-xs mb-3 text-slate-600 dark:text-slate-300">
                        <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 font-semibold text-[10px]">
                          {uni.type}
                        </span>
                        <span className="font-extrabold text-[#0B1F3A] dark:text-[#D4AF37]">
                          {formatMoney(uni.tuitionFeePerYearEUR)}
                        </span>
                      </div>

                      {/* Featured Programs */}
                      <div className="space-y-1.5 mb-3">
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                          Featured Specializations:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-200">
                          {uni.featuredPrograms.slice(0, 3).map((prog, idx) => (
                            <li key={idx} className="flex items-center gap-1.5 truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                              <span className="truncate">{prog}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Grant / Waiver Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {uni.englishWaiverPossible && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                            ✓ MOI / No IELTS Waiver
                          </span>
                        )}
                        {uni.scholarshipsOffered && uni.scholarshipsOffered.length > 0 && (
                          <span className="px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-slate-800 dark:text-[#D4AF37] font-bold text-[10px]">
                            🏆 {uni.scholarshipsOffered[0]}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedUniversity(uni)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-white/20 transition-all"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => onSelectUniversityForApplication(uni.name)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1"
                      >
                        <span>Apply</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedUniversity && (
        <UniversityDetailModal
          university={selectedUniversity}
          onClose={() => setSelectedUniversity(null)}
          currency={currency}
          onApply={onSelectUniversityForApplication}
          isBookmarked={bookmarkedIds.includes(selectedUniversity.id)}
          onToggleBookmark={toggleBookmark}
          isCompared={comparedUnis.some((u) => u.id === selectedUniversity.id)}
          onToggleCompare={toggleCompare}
        />
      )}

      {/* Compare Drawer */}
      {showCompareDrawer && comparedUnis.length > 0 && (
        <UniversityCompareDrawer
          comparedUnis={comparedUnis}
          onRemove={(id) => setComparedUnis((prev) => prev.filter((u) => u.id !== id))}
          onClear={() => setComparedUnis([])}
          onClose={() => setShowCompareDrawer(false)}
          currency={currency}
          onApply={onSelectUniversityForApplication}
        />
      )}
    </section>
  );
};
