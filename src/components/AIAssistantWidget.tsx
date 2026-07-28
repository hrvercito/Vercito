/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  GraduationCap,
  Award,
  Globe,
  FileCheck,
  Languages,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithGeminiCounselor, evaluateProfileWithGemini, getGeminiApiKey } from '../lib/gemini';
import { ProfileEvaluationInput } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AIAssistantWidgetProps {
  onOpenAppointment?: () => void;
  onOpenApplication?: () => void;
}

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({
  onOpenAppointment,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'analyze'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        '👋 Assalamu Alaikum! I am **VERCITO AI Education Specialist**.\n\nI can help you in **English & বাংলা (Bengali)** with:\n• 🏫 University recommendations in Italy, Germany, France, etc.\n• 💶 Italian DSU €7,000 grants & European scholarships\n• 🌐 Choosing the best European country for your budget & field\n• 📊 Complete profile evaluation (GPA, IELTS, Degree)\n\nHow can I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [profileForm, setProfileForm] = useState<ProfileEvaluationInput>({
    fullName: '',
    currentEducationLevel: 'Bachelor / Honors',
    cgpaOrGpa: '3.25 / 4.0',
    englishProficiency: 'IELTS 6.5',
    intendedDegree: 'Masters',
    preferredCountry: 'Italy',
    budgetPerYearEUR: '3000',
    intendedSubject: 'Computer Science & Engineering',
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...chatHistory, userMsg];
    setChatHistory(newHistory);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const apiHistory = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      let replyText = '';
      if (getGeminiApiKey()) {
        replyText = await chatWithGeminiCounselor(text, apiHistory);
      } else {
        const res = await fetch('/api/ai-counselor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, chatHistory: apiHistory }),
        });
        const data = await res.json();
        replyText = data.reply || 'Our admissions specialists in Gulshan are always ready to assist you!';
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('AI chat error:', err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          '✅ **VERCITO Guidance**:\n\nEuropean public universities offer high visa success rates and 100% tuition waivers for Bangladeshi students. For personalized file assessment, you can also book a free 1-on-1 counseling session at our Gulshan-2 office or call **+880 1912-114343**.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunProfileAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const promptText = `📊 Evaluate my profile: Name: ${profileForm.fullName || 'Student'}, Degree: ${profileForm.intendedDegree}, GPA: ${profileForm.cgpaOrGpa}, English: ${profileForm.englishProficiency}, Field: ${profileForm.intendedSubject}, Target Country: ${profileForm.preferredCountry}, Budget: €${profileForm.budgetPerYearEUR}/year.`;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setMode('chat');

    try {
      if (getGeminiApiKey()) {
        const evalResult = await evaluateProfileWithGemini(profileForm);
        const formattedReply = `🎯 **VERCITO AI Profile Assessment Result**\n\n` +
          `⭐ **Admission & Visa Match Score**: **${evalResult.eligibilityScore}%**\n\n` +
          `🌍 **Recommended Target Countries**:\n` +
          evalResult.recommendedCountries.map((c) => `• **${c.name}** (${c.matchPercentage}% match): ${c.reason}`).join('\n') +
          `\n\n🏫 **Suggested Public Universities**:\n` +
          evalResult.suggestedUniversities.map((u) => `• ${u}`).join('\n') +
          `\n\n💶 **Eligible Scholarships**:\n` +
          evalResult.eligibleScholarships.map((s) => `• ${s}`).join('\n') +
          `\n\n🛂 **Visa Feasibility**: ${evalResult.visaFeasibility}\n\n` +
          `💡 **Expert Advice**: ${evalResult.personalizedAdvice}`;

        setChatHistory((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: formattedReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        await handleSendMessage(promptText);
      }
    } catch (err) {
      await handleSendMessage(promptText);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessageText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className={`${line.trim() === '' ? 'h-2' : 'my-0.5'}`}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[92vw] sm:w-[400px] h-[520px] max-h-[80vh] rounded-3xl bg-[#0B1F3A] text-white border border-[#D4AF37]/40 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-3.5 bg-gradient-to-r from-[#0B1F3A] via-slate-900 to-[#0B1F3A] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-amber-200 text-[#0B1F3A] flex items-center justify-center font-bold shadow-md">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-extrabold text-white flex items-center gap-1.5">
                    <span>VERCITO AI Specialist</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-mono font-bold">
                      GEMINI
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-300 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>European Education • Bangla & EN</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mode Toggle Tabs */}
            <div className="flex border-b border-white/10 bg-[#071426] p-1 shrink-0 gap-1">
              <button
                onClick={() => setMode('chat')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                  mode === 'chat'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Live AI Counselor</span>
              </button>
              <button
                onClick={() => setMode('analyze')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                  mode === 'analyze'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Profile Checker</span>
              </button>
            </div>

            {/* CHAT MODE */}
            {mode === 'chat' && (
              <div className="flex-1 flex flex-col min-h-0 bg-slate-950/80">
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin"
                >
                  {chatHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2 ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-6 h-6 rounded-lg bg-[#D4AF37] text-[#0B1F3A] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-slate-800 text-white border border-[#D4AF37]/30 rounded-tr-none'
                            : 'bg-[#0B1F3A] text-slate-200 border border-white/10 rounded-tl-none shadow-md'
                        }`}
                      >
                        {formatMessageText(msg.content)}
                        <span className="block text-[8px] text-slate-400 mt-1 text-right font-mono">
                          {msg.timestamp}
                        </span>
                      </div>

                      {msg.role === 'user' && (
                        <div className="w-6 h-6 rounded-lg bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-center gap-1.5 text-[10px] text-[#D4AF37] p-2 bg-[#0B1F3A]/60 rounded-xl w-fit border border-[#D4AF37]/30">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>Gemini is evaluating...</span>
                    </div>
                  )}
                </div>

                {/* Quick Action Chips */}
                <div className="p-1.5 border-t border-white/10 bg-[#071426] overflow-x-auto whitespace-nowrap flex gap-1 scrollbar-none shrink-0">
                  <button
                    onClick={() => handleSendMessage('Suggest top European public universities for my profile.')}
                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 hover:text-white flex items-center gap-1 shrink-0"
                  >
                    <GraduationCap className="w-3 h-3 text-[#D4AF37]" />
                    <span>Universities</span>
                  </button>

                  <button
                    onClick={() => handleSendMessage('Tell me about Italy DSU scholarship & 100% tuition waiver.')}
                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 hover:text-white flex items-center gap-1 shrink-0"
                  >
                    <Award className="w-3 h-3 text-[#D4AF37]" />
                    <span>Italy DSU Grant</span>
                  </button>

                  <button
                    onClick={() => handleSendMessage('বাংলাতে ইউরোপীয় স্টুডেন্ট ভিসা প্রসেস বুঝিয়ে বলুন।')}
                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 hover:text-white flex items-center gap-1 shrink-0"
                  >
                    <Languages className="w-3 h-3 text-[#D4AF37]" />
                    <span>বাংলা উত্তর</span>
                  </button>

                  <button
                    onClick={() => handleSendMessage('Compare Germany vs Italy for Masters.')}
                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 hover:text-white flex items-center gap-1 shrink-0"
                  >
                    <Globe className="w-3 h-3 text-[#D4AF37]" />
                    <span>Germany vs Italy</span>
                  </button>
                </div>

                {/* Input Field */}
                <div className="p-2.5 bg-[#0B1F3A] border-t border-white/10 flex items-center gap-1.5 shrink-0">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask in English or বাংলা..."
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-extrabold text-xs hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {onOpenAppointment && (
                  <div className="p-1.5 bg-[#071426] border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 px-3">
                    <span>Gulshan-2 Office</span>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenAppointment();
                      }}
                      className="text-[#D4AF37] font-bold hover:underline flex items-center gap-0.5"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Book Free Counseling</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* PROFILE CHECK MODE */}
            {mode === 'analyze' && (
              <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-950/90 text-xs">
                <form onSubmit={handleRunProfileAnalysis} className="space-y-2">
                  <div>
                    <label className="block text-[10px] font-medium text-slate-300 mb-0.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      placeholder="e.g. Md Tanvir Hossain"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-medium text-slate-300 mb-0.5">
                        Current Degree
                      </label>
                      <select
                        value={profileForm.currentEducationLevel}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, currentEducationLevel: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                      >
                        <option value="HSC / A-Levels">HSC / A-Levels</option>
                        <option value="Bachelor / Honors">Bachelor / Honors</option>
                        <option value="Masters">Masters</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-slate-300 mb-0.5">
                        CGPA / GPA
                      </label>
                      <input
                        type="text"
                        value={profileForm.cgpaOrGpa}
                        onChange={(e) => setProfileForm({ ...profileForm, cgpaOrGpa: e.target.value })}
                        placeholder="3.25 / 4.0"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-medium text-slate-300 mb-0.5">
                        English Score
                      </label>
                      <input
                        type="text"
                        value={profileForm.englishProficiency}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, englishProficiency: e.target.value })
                        }
                        placeholder="IELTS 6.5 / MOI Waiver"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-slate-300 mb-0.5">
                        Target Country
                      </label>
                      <select
                        value={profileForm.preferredCountry}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, preferredCountry: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                      >
                        <option value="Italy">Italy (DSU Grant)</option>
                        <option value="Germany">Germany (Tuition Free)</option>
                        <option value="France">France</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Spain">Spain</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-300 mb-0.5">
                      Intended Subject
                    </label>
                    <input
                      type="text"
                      value={profileForm.intendedSubject}
                      onChange={(e) => setProfileForm({ ...profileForm, intendedSubject: e.target.value })}
                      placeholder="e.g. Computer Science / Business"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/15 text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-extrabold text-xs shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5 mt-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isLoading ? 'Analyzing...' : 'Analyze Profile with Gemini'}</span>
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-[#0B1F3A] via-slate-900 to-[#0B1F3A] text-white border-2 border-[#D4AF37] shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 relative group"
        aria-label="Open AI Education Assistant"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0B1F3A]" />
        </div>
        <span className="hidden sm:inline-block text-xs font-bold font-serif text-[#D4AF37] pr-1">
          AI Counselor
        </span>
      </button>
    </div>
  );
};
