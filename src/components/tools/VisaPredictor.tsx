import React, { useState } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, AlertTriangle, Building2, Globe2, FileText, ArrowRight, DollarSign } from 'lucide-react';
import { ProfileEvaluationInput } from '../../types';
import { predictVisaSuccess, VisaPredictionResult } from '../../lib/gemini';

interface VisaPredictorProps {
  profileForm: ProfileEvaluationInput;
}

export const VisaPredictor: React.FC<VisaPredictorProps> = ({ profileForm }) => {
  const [formState, setFormState] = useState<ProfileEvaluationInput>(profileForm);
  const [prediction, setPrediction] = useState<VisaPredictionResult>(() => predictVisaSuccess(profileForm));

  const handleRecalculate = () => {
    const res = predictVisaSuccess(formState);
    setPrediction(res);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#0B1F3A] p-6 rounded-2xl text-white border border-[#D4AF37]/30 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI Schengen & Global Visa Predictor
          </div>
          <h2 className="text-2xl font-bold font-serif text-white">
            Visa Success Probability & Embassy Risk Estimator
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl">
            Calculated for embassy procedures in Bangladesh based on academics, financial solvency, English score, target country, and prior visa history.
          </p>
        </div>
      </div>

      {/* Input Form & Live Score Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parameters Form */}
        <div className="lg:col-span-1 bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            Visa Evaluation Parameters
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Academic CGPA / GPA
            </label>
            <input
              type="text"
              value={formState.cgpaOrGpa}
              onChange={(e) => setFormState({ ...formState, cgpaOrGpa: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Embassy Country
            </label>
            <input
              type="text"
              value={formState.preferredCountry}
              onChange={(e) => setFormState({ ...formState, preferredCountry: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              English Score / Test Type
            </label>
            <input
              type="text"
              value={formState.englishProficiency}
              onChange={(e) => setFormState({ ...formState, englishProficiency: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Previous Visa Refusal?
            </label>
            <select
              value={formState.visaRefusal}
              onChange={(e) => setFormState({ ...formState, visaRefusal: e.target.value as any })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="No">No Prior Visa Refusal</option>
              <option value="Yes">Yes (Prior Refusal History)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Passport Status
            </label>
            <select
              value={formState.passportAvailable}
              onChange={(e) => setFormState({ ...formState, passportAvailable: e.target.value as any })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="Yes">Passport Available</option>
              <option value="No">Not Available Yet</option>
            </select>
          </div>

          <button
            onClick={handleRecalculate}
            className="w-full py-3 bg-[#0B1F3A] hover:bg-[#1E3A8A] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all border border-[#D4AF37]/30"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Update Visa Prediction</span>
          </button>
        </div>

        {/* Prediction Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Main Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    prediction.riskLevel === 'Low Risk'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : prediction.riskLevel === 'Moderate Risk'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  ● {prediction.riskLevel}
                </span>
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white mt-2">
                  Estimated Visa Feasibility
                </h3>
                <p className="text-xs text-slate-500">
                  Target Country: <strong>{formState.preferredCountry}</strong>
                </p>
              </div>

              <div className="bg-[#0B1F3A] p-4 rounded-2xl text-center border border-[#D4AF37]/40 min-w-[130px]">
                <div className="text-[10px] text-[#D4AF37] font-semibold uppercase">Visa Success</div>
                <div className="text-3xl font-black text-white">{prediction.visaSuccessPercentage}%</div>
              </div>
            </div>

            {/* Positive Factors */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Positive Visa Strengths:</span>
              </h4>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {prediction.positiveFactors.map((pf, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{pf}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Factors */}
            {prediction.riskFactors.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Risk Concerns to Address:</span>
                </h4>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {prediction.riskFactors.map((rf, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>{rf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Improvement Suggestions */}
          <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Step-by-Step Improvement Suggestions for Embassy Success</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {prediction.improvementSuggestions.map((sug, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solvency & Financial Guide */}
          <div className="bg-amber-50/50 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-600" />
              <span>Bank Solvency & Sponsor Requirements</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {prediction.sponsorAndFinancialGuide}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
