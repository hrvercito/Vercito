import React, { useState, useMemo } from 'react';
import { Building2, Search, Filter, Trophy, Calendar, ExternalLink, Sparkles, CheckCircle2, DollarSign, Award, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { UNIVERSITIES_DATABASE } from '../../data/universitiesDatabase';
import { ProfileEvaluationInput, UniversityPartner } from '../../types';
import { calculateAllUniversityMatches } from '../../lib/gemini';

interface UniversityMatcherProps {
  profileForm: ProfileEvaluationInput;
  onApplyUniversity?: (uniName: string, country: string) => void;
}

export const UniversityMatcher: React.FC<UniversityMatcherProps> = ({
  profileForm,
  onApplyUniversity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'overall' | 'admission' | 'scholarship' | 'visa' | 'ranking'>('overall');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  // Compute matches for all universities
  const allMatches = useMemo(() => {
    return calculateAllUniversityMatches(profileForm);
  }, [profileForm]);

  // Extract unique countries
  const countries = useMemo(() => {
    const list = Array.from(new Set(allMatches.map((m) => m.country))).sort();
    return ['All', ...list];
  }, [allMatches]);

  // Filter & Sort
  const filteredMatches = useMemo(() => {
    let result = [...allMatches];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.universityName.toLowerCase().includes(q) ||
          m.country.toLowerCase().includes(q) ||
          m.matchReason.toLowerCase().includes(q)
      );
    }

    if (selectedCountryFilter !== 'All') {
      result = result.filter((m) => m.country.toLowerCase() === selectedCountryFilter.toLowerCase());
    }

    if (difficultyFilter !== 'All') {
      result = result.filter((m) => m.admissionDifficulty.toLowerCase() === difficultyFilter.toLowerCase());
    }

    result.sort((a, b) => {
      if (sortBy === 'admission') return b.admissionMatchPercentage - a.admissionMatchPercentage;
      if (sortBy === 'scholarship') return b.scholarshipMatchPercentage - a.scholarshipMatchPercentage;
      if (sortBy === 'visa') return b.visaSuccessPercentage - a.visaSuccessPercentage;
      if (sortBy === 'ranking') {
        const rA = parseInt(a.qsRanking.replace(/[^0-9]/g, '')) || 9999;
        const rB = parseInt(b.qsRanking.replace(/[^0-9]/g, '')) || 9999;
        return rA - rB;
      }
      return b.overallMatchPercentage - a.overallMatchPercentage;
    });

    return result;
  }, [allMatches, searchQuery, selectedCountryFilter, difficultyFilter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#0B1F3A] p-6 rounded-2xl text-white border border-[#D4AF37]/30 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Building2 className="w-40 h-40 text-[#D4AF37]" />
        </div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI Global University Match Engine
          </div>
          <h2 className="text-2xl font-bold text-white font-serif">
            Matches for <span className="text-[#D4AF37]">{profileForm.fullName || 'Student'}</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl">
            Compared your profile (CGPA: {profileForm.cgpaOrGpa || 'N/A'}, Subject: {profileForm.intendedSubject}) against{' '}
            <strong className="text-white">{allMatches.length} European & Global Universities</strong>.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search university or subject..."
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-xs focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>

        {/* Country Filter */}
        <div className="relative">
          <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <select
            value={selectedCountryFilter}
            onChange={(e) => setSelectedCountryFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-xs focus:ring-2 focus:ring-[#D4AF37]"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                Country: {c}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="relative">
          <Award className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-xs focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="All">Difficulty: All Levels</option>
            <option value="Moderate">Moderate</option>
            <option value="Competitive">Competitive</option>
            <option value="Highly Selective">Highly Selective</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="relative">
          <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-xs focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="overall">Sort: Highest Match Score</option>
            <option value="admission">Sort: Admission Match %</option>
            <option value="scholarship">Sort: Scholarship Match %</option>
            <option value="visa">Sort: Visa Success %</option>
            <option value="ranking">Sort: QS World Ranking</option>
          </select>
        </div>
      </div>

      {/* University Match Cards List */}
      <div className="space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600 dark:text-slate-300 font-medium text-sm">No matching universities found.</p>
            <p className="text-slate-400 text-xs mt-1">Try resetting search filters or changing target country.</p>
          </div>
        ) : (
          filteredMatches.map((uni, idx) => (
            <div
              key={`${uni.universityName}-${idx}`}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37]/50 transition-all duration-200 shadow-sm hover:shadow-md group relative"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Basic Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                      Rank #{idx + 1} Match
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                      📍 {uni.country}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium">
                      🏆 {uni.qsRanking}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        uni.admissionDifficulty === 'Moderate'
                          ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                          : uni.admissionDifficulty === 'Competitive'
                          ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                          : 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      Difficulty: {uni.admissionDifficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif group-hover:text-[#0B1F3A] dark:group-hover:text-[#D4AF37] transition-colors">
                    {uni.universityName}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    💡 <strong className="text-slate-800 dark:text-slate-200">Why it matches:</strong> {uni.matchReason}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{uni.tuitionFee}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>Deadline: {uni.applicationDeadline}</span>
                    </div>
                  </div>
                </div>

                {/* Match Score Badges Grid */}
                <div className="flex flex-col sm:flex-row items-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-5">
                  <div className="grid grid-cols-3 md:flex md:flex-col gap-2 text-center w-full md:w-auto">
                    {/* Admission Match */}
                    <div className="bg-blue-50 dark:bg-blue-950/40 p-2.5 rounded-xl border border-blue-100 dark:border-blue-800/50 min-w-[90px]">
                      <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
                        Admission
                      </div>
                      <div className="text-base font-bold text-blue-700 dark:text-blue-300">
                        {uni.admissionMatchPercentage}%
                      </div>
                    </div>

                    {/* Scholarship Match */}
                    <div className="bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-100 dark:border-amber-800/50 min-w-[90px]">
                      <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
                        Scholarship
                      </div>
                      <div className="text-base font-bold text-amber-700 dark:text-amber-300">
                        {uni.scholarshipMatchPercentage}%
                      </div>
                    </div>

                    {/* Visa Success */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-800/50 min-w-[90px]">
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                        Visa Success
                      </div>
                      <div className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                        {uni.visaSuccessPercentage}%
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  {onApplyUniversity && (
                    <button
                      onClick={() => onApplyUniversity(uni.universityName, uni.country)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-[#0B1F3A] hover:bg-[#1E3A8A] text-white font-medium rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
