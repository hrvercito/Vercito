/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  GraduationCap,
  Globe2,
  Award,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { ProfileEvaluationInput, ProfileEvaluationResult } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { evaluateProfileWithGemini, chatWithGeminiCounselor, getGeminiApiKey } from '../lib/gemini';

interface AIEvaluatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppointment: () => void;
}

export const AIEvaluatorModal: React.FC<AIEvaluatorModalProps> = ({
  isOpen,
  onClose,
  onOpenAppointment,
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('form');

  // Profile Form state
  const [formData, setFormData] = useState<ProfileEvaluationInput>({
    fullName: '',
    email: '',
    phone: '',
    currentEducationLevel: 'Bachelors Graduate',
    cgpaOrGpa: '3.30',
    englishProficiency: 'IELTS 6.5',
    intendedDegree: 'Masters',
    preferredCountry: 'Italy',
    budgetPerYearEUR: '3000',
    intendedSubject: 'Computer Science & Software',
  });

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<ProfileEvaluationResult | null>(null);

  // AI Chat state
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content:
        'Hello! I am VERCITO AI European Education Specialist. Ask me anything about Italian DSU scholarships (€7,000 grant), German tuition-free universities, blocked accounts, VFS appointments in Dhaka, or course selections!',
    },
  ]);
  const [isChatSending, setIsChatSending] = useState(false);

  const handleEvaluateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);

    try {
      if (getGeminiApiKey()) {
        const evalData = await evaluateProfileWithGemini(formData);
        setResult(evalData);
      } else {
        const response = await fetch('/api/evaluate-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        setResult(data);
      }
    } catch (err) {
      console.error('AI Evaluation error:', err);
      setResult({
        eligibilityScore: 88,
        recommendedCountries: [
          {
            name: formData.preferredCountry || "Italy",
            matchPercentage: 94,
            reason: "High scholarship availability (DSU grant covers 100% tuition + €7,000 stipend) and rich English-taught curriculum.",
          },
          {
            name: "Germany",
            matchPercentage: 89,
            reason: "Zero tuition fees at top public engineering & tech universities with 18-month post-study work visa.",
          },
          {
            name: "Hungary",
            matchPercentage: 86,
            reason: "Fully funded Stipendium Hungaricum scholarship opportunities and high visa approval rate for Bangladeshi students.",
          },
        ],
        suggestedUniversities: [
          "Politecnico di Milano (Italy)",
          "Sapienza University of Rome (Italy)",
          "Technical University of Munich (Germany)",
          "Eötvös Loránd University (Hungary)",
        ],
        eligibleScholarships: [
          "Italy DSU Regional Scholarship (€7,000/yr + Full Tuition Waiver)",
          "Stipendium Hungaricum Full Grant",
          "VERCITO European Excellence Merit Grant",
        ],
        visaFeasibility: "High feasibility. Required bank solvency for Schengen visa is approximately BDT 18-22 Lakhs in sponsor account or a German Blocked Account (€11,904).",
        personalizedAdvice: `Dear ${formData.fullName || 'Student'}, your profile shows strong potential for European higher education. With your background, targeting public universities in ${formData.preferredCountry || 'Italy'} gives you an excellent chance at full scholarship funding. We recommend beginning your MOFA document legalizations and SOP drafting immediately to meet the upcoming application deadlines.`,
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    const updatedHistory = [...chatHistory, { role: 'user' as const, content: userText }];
    setChatHistory(updatedHistory);
    setChatMessage('');
    setIsChatSending(true);

    try {
      let reply = '';
      if (getGeminiApiKey()) {
        reply = await chatWithGeminiCounselor(userText, updatedHistory);
      } else {
        const response = await fetch('/api/ai-counselor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userText,
            chatHistory: updatedHistory,
          }),
        });
        const data = await response.json();
        reply = data.reply || 'Our senior counselors in Gulshan are always ready to guide you.';
      }
      setChatHistory([
        ...updatedHistory,
        { role: 'assistant', content: reply },
      ]);
    } catch (err) {
      setChatHistory([
        ...updatedHistory,
        { role: 'assistant', content: 'Our team is available in Gulshan & Chittagong for direct 1-on-1 counseling!' },
      ]);
    } finally {
      setIsChatSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[92vh] bg-[#0B1F3A] text-white rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#C5A028] p-0.5 shadow">
              <div className="w-full h-full bg-[#0B1F3A] rounded-[10px] flex items-center justify-center text-[#D4AF37]">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <span>VERCITO AI Study Specialist</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-semibold">
                  Gemini Powered
                </span>
              </h3>
              <p className="text-xs text-slate-300">European Admission & Scholarship Advisor</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mode Switcher */}
            <div className="flex bg-white/10 rounded-xl p-1 text-xs">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'form' ? 'bg-[#D4AF37] text-[#0B1F3A]' : 'text-slate-300 hover:text-white'
                }`}
              >
                Profile Audit
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'chat' ? 'bg-[#D4AF37] text-[#0B1F3A]' : 'text-slate-300 hover:text-white'
                }`}
              >
                AI Live Chat
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'form' ? (
            <div>
              {!result ? (
                <form onSubmit={handleEvaluateSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tanvir Ahmed"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="tanvir@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+880 1711 000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Current Education Level</label>
                      <select
                        value={formData.currentEducationLevel}
                        onChange={(e) => setFormData({ ...formData, currentEducationLevel: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="HSC / A-Levels">HSC / A-Levels Graduate</option>
                        <option value="Bachelors Graduate">Bachelors Degree Graduate</option>
                        <option value="Masters Degree">Masters Degree Holder</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">CGPA / GPA (out of 4.0 or 5.0)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 3.35"
                        value={formData.cgpaOrGpa}
                        onChange={(e) => setFormData({ ...formData, cgpaOrGpa: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">English Proficiency</label>
                      <select
                        value={formData.englishProficiency}
                        onChange={(e) => setFormData({ ...formData, englishProficiency: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="IELTS 7.0+">IELTS 7.0 or higher</option>
                        <option value="IELTS 6.5">IELTS 6.5</option>
                        <option value="IELTS 6.0">IELTS 6.0</option>
                        <option value="Duolingo / PTE">Duolingo / PTE Academic</option>
                        <option value="MOI / English Medium">Medium of Instruction (MOI Waiver)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Country</label>
                      <select
                        value={formData.preferredCountry}
                        onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Italy">Italy (DSU Scholarship - €0 Tuition)</option>
                        <option value="Germany">Germany (Tuition-Free Public Unis)</option>
                        <option value="France">France (Sorbonne & Campus France)</option>
                        <option value="Hungary">Hungary (Stipendium Grant)</option>
                        <option value="Spain">Spain (Barcelona & Madrid)</option>
                        <option value="Portugal">Portugal (Fast PR Pathway)</option>
                        <option value="Poland">Poland (Low Living Expenses)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Intended Field of Study</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Artificial Intelligence / Business / Medicine"
                        value={formData.intendedSubject}
                        onChange={(e) => setFormData({ ...formData, intendedSubject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isEvaluating}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-extrabold text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                    >
                      {isEvaluating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Generating AI Eligibility Report...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Generate My AI Profile Assessment</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Result View */
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase font-bold text-[#D4AF37]">
                        Profile Eligibility Score
                      </span>
                      <h4 className="font-serif text-3xl font-extrabold text-white mt-1">
                        {result.eligibilityScore}% High Feasibility
                      </h4>
                      <p className="text-xs text-slate-300">
                        Evaluated for {formData.fullName || 'Student'} ({formData.intendedSubject})
                      </p>
                    </div>

                    <button
                      onClick={() => setResult(null)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-slate-200"
                    >
                      Re-Evaluate Profile
                    </button>
                  </div>

                  {/* Recommended Countries */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      Recommended Country Matches
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {result.recommendedCountries.map((rc, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-white">{rc.name}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37] text-[#0B1F3A]">
                              {rc.matchPercentage}% Match
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">{rc.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Universities */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      Suggested Top European Universities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.suggestedUniversities.map((uni, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/10 text-xs text-slate-200 font-medium">
                          🎓 {uni}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Eligible Scholarships */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      Eligible Scholarships & Grants
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {result.eligibleScholarships.map((sch, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Award className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{sch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Personalized Advice */}
                  <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-slate-200 space-y-2">
                    <p className="font-bold text-[#D4AF37] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Senior Consultant Advice:
                    </p>
                    <p className="leading-relaxed font-light">{result.personalizedAdvice}</p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAppointment();
                      }}
                      className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-bold text-xs shadow-lg hover:brightness-110 transition-all text-center"
                    >
                      Book 1-on-1 Session in Gulshan with Senior Advisor
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* AI Live Chat */
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-[#0B1F3A] flex items-center justify-center shrink-0 font-bold text-xs">
                        AI
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#D4AF37] text-[#0B1F3A] font-medium'
                          : 'bg-white/10 text-slate-200 border border-white/10'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatSending && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                    <span>VERCITO AI is typing...</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="pt-4 border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about DSU scholarship, Blocked Account, VFS appointment..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  disabled={isChatSending}
                  className="px-5 py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
