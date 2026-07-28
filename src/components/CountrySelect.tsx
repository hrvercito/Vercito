/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, Globe } from 'lucide-react';

export interface CountryOption {
  name: string;
  subtitle: string;
}

export const SUPPORTED_COUNTRIES: CountryOption[] = [
  { name: 'Australia', subtitle: 'Scholarships & Post Study Work' },
  { name: 'Austria', subtitle: 'OeAD Scholarship' },
  { name: 'Belgium', subtitle: 'VLIR-UOS Scholarship' },
  { name: 'Canada', subtitle: 'SDS & PGWP' },
  { name: 'China', subtitle: 'CSC Scholarship' },
  { name: 'Cyprus', subtitle: 'University Scholarships' },
  { name: 'Czech Republic', subtitle: 'Government Scholarships' },
  { name: 'Denmark', subtitle: 'Danish Government Scholarships' },
  { name: 'Estonia', subtitle: 'Dora Scholarship' },
  { name: 'Finland', subtitle: 'Tuition Scholarships' },
  { name: 'France', subtitle: 'Campus France Scholarships' },
  { name: 'Germany', subtitle: 'Tuition-Free Public Universities' },
  { name: 'Hungary', subtitle: 'Stipendium Hungaricum' },
  { name: 'Ireland', subtitle: 'Government of Ireland Scholarship' },
  { name: 'Italy', subtitle: 'DSU Scholarship & Public Universities' },
  { name: 'Japan', subtitle: 'MEXT Scholarship' },
  { name: 'Latvia', subtitle: 'Government Scholarships' },
  { name: 'Lithuania', subtitle: 'State Scholarships' },
  { name: 'Malaysia', subtitle: 'MTCP Scholarship' },
  { name: 'Malta', subtitle: 'Government Scholarships' },
  { name: 'Netherlands', subtitle: 'Holland Scholarship' },
  { name: 'New Zealand', subtitle: 'Manaaki Scholarship' },
  { name: 'Norway', subtitle: 'Public Universities' },
  { name: 'Poland', subtitle: 'NAWA Scholarship' },
  { name: 'Portugal', subtitle: 'Merit Scholarships' },
  { name: 'Singapore', subtitle: 'ASEAN Scholarships' },
  { name: 'South Korea', subtitle: 'Global Korea Scholarship (GKS)' },
  { name: 'Spain', subtitle: 'Erasmus & University Scholarships' },
  { name: 'Sweden', subtitle: 'Swedish Institute Scholarship' },
  { name: 'Switzerland', subtitle: 'Swiss Government Excellence Scholarship' },
  { name: 'United Arab Emirates (UAE)', subtitle: 'University Merit Scholarships' },
  { name: 'United Kingdom', subtitle: 'Chevening & Russell Group' },
  { name: 'USA', subtitle: 'STEM, Scholarships & OPT' },
].sort((a, b) => a.name.localeCompare(b.name));

interface CountrySelectProps {
  value: string;
  onChange: (countryName: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Select Target Country...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const selectedCountry = SUPPORTED_COUNTRIES.find(
    (c) => c.name.toLowerCase() === value.toLowerCase()
  ) || { name: value || 'Italy', subtitle: 'DSU Scholarship & Public Universities' };

  const filteredCountries = SUPPORTED_COUNTRIES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q)
    );
  });

  const handleSelect = (countryName: string) => {
    onChange(countryName);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
          {label}
        </label>
      )}

      {/* Select Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-left text-xs text-white focus:outline-none focus:border-[#D4AF37] flex items-center justify-between gap-3 shadow-sm hover:border-white/30 transition-all"
      >
        <div className="flex items-center gap-2.5 truncate">
          <Globe className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <div className="truncate">
            <span className="font-bold text-white block truncate">{selectedCountry.name}</span>
            <span className="text-[10px] text-slate-400 block truncate font-normal">
              {selectedCountry.subtitle}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#D4AF37]' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#0B1F3A] border-2 border-[#D4AF37] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          {/* Search Box */}
          <div className="p-2.5 border-b border-white/10 bg-slate-900/90 sticky top-0 z-10">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or scholarship..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-64 overflow-y-auto divide-y divide-white/5 p-1 scrollbar-thin scrollbar-thumb-white/20">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No matching country found.
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = c.name.toLowerCase() === value.toLowerCase();
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleSelect(c.name)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-white'
                        : 'hover:bg-white/10 text-slate-200'
                    }`}
                  >
                    <div className="truncate">
                      <span className="font-bold text-xs block text-white truncate">
                        {c.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate font-normal">
                        {c.subtitle}
                      </span>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
