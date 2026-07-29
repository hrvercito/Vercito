import React, { useState } from 'react';
import { FileText, Sparkles, CheckCircle2, AlertTriangle, Copy, Check, RefreshCw, Upload, FileCode } from 'lucide-react';
import { reviewSOPWithGemini, SOPReviewResult } from '../../lib/gemini';

export const SOPReviewer: React.FC = () => {
  const [sopText, setSopText] = useState('');
  const [targetProgram, setTargetProgram] = useState('Master in Computer Science');
  const [targetCountry, setTargetCountry] = useState('Italy');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviewResult, setReviewResult] = useState<SOPReviewResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyzeSOP = async () => {
    if (!sopText.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await reviewSOPWithGemini(sopText, targetProgram, targetCountry);
      setReviewResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyImprovedSOP = () => {
    if (!reviewResult?.improvedSOP) return;
    navigator.clipboard.writeText(reviewResult.improvedSOP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (text) setSopText(text);
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
            AI Statement of Purpose (SOP) Evaluator
          </div>
          <h2 className="text-2xl font-bold font-serif text-white">
            AI SOP Review & Smart Generator
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl">
            Upload or paste your SOP draft. Our AI admissions evaluator checks grammar, motivation, academic structure, and generates an optimized version.
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4 bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            Target Application Details
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Intended Program / Degree
            </label>
            <input
              type="text"
              value={targetProgram}
              onChange={(e) => setTargetProgram(e.target.value)}
              placeholder="e.g. Master in Artificial Intelligence"
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Country
            </label>
            <select
              value={targetCountry}
              onChange={(e) => setTargetCountry(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="Italy">Italy</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Hungary">Hungary</option>
              <option value="USA">USA</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Upload SOP File (.txt / .doc)
            </label>
            <label className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:border-[#D4AF37] transition-colors text-xs text-slate-600 dark:text-slate-400">
              <Upload className="w-4 h-4 text-[#D4AF37]" />
              <span>Choose Document</span>
              <input type="file" accept=".txt,.doc,.docx" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <button
            onClick={handleAnalyzeSOP}
            disabled={isAnalyzing || !sopText.trim()}
            className="w-full py-3 bg-[#0B1F3A] hover:bg-[#1E3A8A] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all border border-[#D4AF37]/30 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                <span>Evaluating SOP with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Run AI SOP Evaluation</span>
              </>
            )}
          </button>
        </div>

        <div className="lg:col-span-2 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Paste or Type Your Statement of Purpose Below:
          </label>
          <textarea
            value={sopText}
            onChange={(e) => setSopText(e.target.value)}
            rows={14}
            placeholder="Paste your Statement of Purpose (SOP) here..."
            className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-[#D4AF37] font-sans leading-relaxed"
          />
        </div>
      </div>

      {/* Review Result Section */}
      {reviewResult && (
        <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          {/* Scores Overview */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                  SOP Evaluation Scorecard
                </h3>
                <p className="text-xs text-slate-500">
                  Strength Rating: <strong className="text-blue-600">{reviewResult.recommendationStrength}</strong>
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
                <div className="text-[10px] text-slate-500 font-semibold">Grammar</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">{reviewResult.grammarScore}%</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-center">
                <div className="text-[10px] text-slate-500 font-semibold">Structure</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">{reviewResult.structureScore}%</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-center">
                <div className="text-[10px] text-slate-500 font-semibold">Uniqueness</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">{reviewResult.uniquenessScore}%</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-center">
                <div className="text-[10px] text-slate-500 font-semibold">Professionalism</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">{reviewResult.professionalismScore}%</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl text-center">
                <div className="text-[10px] text-slate-500 font-semibold">Motivation</div>
                <div className="text-base font-bold text-slate-900 dark:text-white">{reviewResult.motivationScore}%</div>
              </div>
            </div>
          </div>

          {/* Highlighted Mistakes */}
          <div className="bg-rose-50/50 dark:bg-rose-950/20 p-5 rounded-2xl border border-rose-200 dark:border-rose-900/50 space-y-3">
            <h4 className="font-bold text-sm text-rose-800 dark:text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Highlighted Mistakes & Suggested Improvements</span>
            </h4>
            <div className="space-y-3">
              {reviewResult.highlightedMistakes.map((m, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-rose-100 dark:border-rose-900/30 text-xs space-y-1">
                  <div className="text-rose-700 dark:text-rose-400 font-semibold line-through">
                    "{m.text}"
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    💡 Better: "{m.suggestion}"
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Reason: {m.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improved SOP Generator Output */}
          <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-[#D4AF37]/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h4 className="font-bold text-sm text-white font-serif">
                  AI Generated Improved SOP Version
                </h4>
              </div>
              <button
                onClick={handleCopyImprovedSOP}
                className="px-3 py-1.5 bg-[#D4AF37] text-[#0B1F3A] font-bold rounded-lg text-xs flex items-center gap-1.5 hover:bg-amber-400 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy SOP'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-xl text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto border border-slate-800">
              {reviewResult.improvedSOP}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
