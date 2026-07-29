import React, { useState } from 'react';
import { Briefcase, Sparkles, CheckCircle2, Copy, Check, RefreshCw, Upload, ShieldCheck, FileCheck } from 'lucide-react';
import { reviewCVWithGemini, CVReviewResult } from '../../lib/gemini';

export const CVReviewer: React.FC = () => {
  const [cvText, setCvText] = useState('');
  const [studyLevel, setStudyLevel] = useState("Master's Degree");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviewResult, setReviewResult] = useState<CVReviewResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyzeCV = async () => {
    if (!cvText.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await reviewCVWithGemini(cvText, studyLevel);
      setReviewResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyCV = () => {
    if (!reviewResult?.improvedCVFormat) return;
    navigator.clipboard.writeText(reviewResult.improvedCVFormat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (text) setCvText(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#0B1F3A] p-6 rounded-2xl text-white border border-[#D4AF37]/30 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI Resume & ATS Europass Optimizer
          </div>
          <h2 className="text-2xl font-bold font-serif text-white">
            AI CV Review & Academic ATS Score
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl">
            Upload your CV or paste plain text. AI checks European ATS compatibility, format, skill alignment, and creates an optimized Europass resume format.
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4 bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#D4AF37]" />
            Target Academic Level
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Study Program Level
            </label>
            <select
              value={studyLevel}
              onChange={(e) => setStudyLevel(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="PhD / Doctorate">PhD / Doctorate</option>
              <option value="Diploma / Foundation">Diploma / Foundation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Upload Resume File (.txt / .doc)
            </label>
            <label className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:border-[#D4AF37] transition-colors text-xs text-slate-600 dark:text-slate-400">
              <Upload className="w-4 h-4 text-[#D4AF37]" />
              <span>Choose Resume File</span>
              <input type="file" accept=".txt,.doc,.docx" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <button
            onClick={handleAnalyzeCV}
            disabled={isAnalyzing || !cvText.trim()}
            className="w-full py-3 bg-[#0B1F3A] hover:bg-[#1E3A8A] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all border border-[#D4AF37]/30 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                <span>Analyzing CV with ATS AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Run AI CV Review</span>
              </>
            )}
          </button>
        </div>

        <div className="lg:col-span-2 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Paste CV Text or Content Below:
          </label>
          <textarea
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            rows={12}
            placeholder="Paste your CV text here..."
            className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-[#D4AF37] font-sans leading-relaxed"
          />
        </div>
      </div>

      {/* Results */}
      {reviewResult && (
        <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          {/* Scores Overview */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                  CV Evaluation & ATS Scorecard
                </h3>
                <p className="text-xs text-slate-500">
                  ATS Compatibility: <strong className="text-emerald-600 font-bold">{reviewResult.atsCompatibilityScore}% Passed</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#0B1F3A] p-3 rounded-2xl text-center border border-[#D4AF37]/40 min-w-[110px]">
                  <div className="text-[10px] text-[#D4AF37] font-semibold uppercase">Overall Score</div>
                  <div className="text-2xl font-black text-white">{reviewResult.overallScore} <span className="text-xs font-normal text-slate-400">/100</span></div>
                </div>
              </div>
            </div>

            {/* Sub-Score Meters */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-center">
                <div className="text-[10px] text-slate-500 font-semibold">Format</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">{reviewResult.formatScore}%</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-center">
                <div className="text-[10px] text-slate-500 font-semibold">Skills</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">{reviewResult.skillsScore}%</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-center">
                <div className="text-[10px] text-slate-500 font-semibold">Experience</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">{reviewResult.experienceScore}%</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-center">
                <div className="text-[10px] text-slate-500 font-semibold">Achievements</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">{reviewResult.achievementsScore}%</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-center">
                <div className="text-[10px] text-slate-500 font-semibold">Language</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">{reviewResult.languageScore}%</div>
              </div>
            </div>
          </div>

          {/* ATS Suggestions */}
          <div className="bg-amber-50/50 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>ATS Optimization Suggestions</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {reviewResult.atsSuggestions.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Europass Format Generator */}
          <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-[#D4AF37]/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h4 className="font-bold text-sm text-white font-serif">
                  Generated Europass Academic Resume Template
                </h4>
              </div>
              <button
                onClick={handleCopyCV}
                className="px-3 py-1.5 bg-[#D4AF37] text-[#0B1F3A] font-bold rounded-lg text-xs flex items-center gap-1.5 hover:bg-amber-400 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Europass CV'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-xl text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto border border-slate-800">
              {reviewResult.improvedCVFormat}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
