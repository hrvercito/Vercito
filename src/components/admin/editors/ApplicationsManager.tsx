/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FolderKanban,
  CreditCard,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  FileText,
  ShieldCheck,
  Building2,
  Filter,
  Eye,
  Send,
  AlertCircle
} from 'lucide-react';
import { DetailedApplication, PaymentTransaction } from '../../../types';

const INITIAL_APPLICATIONS: DetailedApplication[] = [
  {
    id: 'APP-2026-101',
    studentEmail: 'tanvir.hossain@gmail.com',
    fullName: 'Tanvir Hossain',
    phone: '+880 1711-889911',
    passportNumber: 'A09876543',
    passportExpiry: '2030-08-15',
    nationality: 'Bangladeshi',
    previousVisaRefusal: false,
    preferredIntake: 'September 2026',
    preferredCountry: 'Italy',
    preferredUniversity: 'Politecnico di Milano',
    intendedProgram: 'M.Sc. Computer Science',
    programLevel: "Master's",
    academicHistory: [
      { degree: "Bachelor's in CSE", gpa: '3.42 / 4.00', passingYear: '2025', institution: 'BRAC University' }
    ],
    englishTestDetails: {
      testType: 'IELTS',
      overallScore: '7.0',
      bandDetails: 'L: 7.5, R: 7.0, W: 6.5, S: 7.0'
    },
    uploadedDocuments: [
      { id: 'd1', name: 'Valid MRP Passport Copy.pdf', category: 'Passport', fileUrl: '#', uploadedAt: '2026-02-10' },
      { id: 'd2', name: 'B.Sc Academic Transcript.pdf', category: 'Academic Transcript', fileUrl: '#', uploadedAt: '2026-02-10' },
      { id: 'd3', name: 'Europass SOP & Motivation Letter.pdf', category: 'SOP/CV', fileUrl: '#', uploadedAt: '2026-02-11' }
    ],
    status: 'Reviewing',
    counselorAssigned: 'Shahriar Kabir (Gulshan Branch)',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-12'
  },
  {
    id: 'APP-2026-102',
    studentEmail: 'nusrat.jahan@gmail.com',
    fullName: 'Nusrat Jahan',
    phone: '+880 1819-223344',
    passportNumber: 'B12345678',
    passportExpiry: '2031-01-20',
    nationality: 'Bangladeshi',
    previousVisaRefusal: false,
    preferredIntake: 'September 2026',
    preferredCountry: 'Germany',
    preferredUniversity: 'Technical University of Munich (TUM)',
    intendedProgram: 'M.Sc. Robotics & AI',
    programLevel: "Master's",
    academicHistory: [
      { degree: "Bachelor's in EEE", gpa: '3.78 / 4.00', passingYear: '2024', institution: 'BUET' }
    ],
    englishTestDetails: {
      testType: 'IELTS',
      overallScore: '7.5',
      bandDetails: 'L: 8.0, R: 8.0, W: 7.0, S: 7.0'
    },
    uploadedDocuments: [
      { id: 'd4', name: 'Passport Copy Nusrat.pdf', category: 'Passport', fileUrl: '#', uploadedAt: '2026-02-01' },
      { id: 'd5', name: 'Fintiba Blocked Account Letter.pdf', category: 'Bank Solvency', fileUrl: '#', uploadedAt: '2026-02-05' }
    ],
    status: 'Offer Letter Issued',
    counselorAssigned: 'Anika Tabassum (German Desk)',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-14'
  }
];

const INITIAL_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'TXN-901',
    studentEmail: 'tanvir.hossain@gmail.com',
    studentName: 'Tanvir Hossain',
    amountBDT: 15000,
    paymentMethod: 'bKash',
    transactionId: 'BK8923419023',
    purpose: 'University Application & Universitaly Portal Submission Fee',
    status: 'Verified',
    date: '2026-02-11',
    adminNotes: 'Payment confirmed in bKash Merchant Account.'
  },
  {
    id: 'TXN-902',
    studentEmail: 'nusrat.jahan@gmail.com',
    studentName: 'Nusrat Jahan',
    amountBDT: 25000,
    paymentMethod: 'Bank Transfer',
    transactionId: 'EBL-TRF-0029341',
    purpose: 'Uni-Assist & Embassy Legalization Support Fee',
    status: 'Pending',
    date: '2026-02-15',
  }
];

export const ApplicationsManager: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'apps' | 'payments'>('apps');
  const [applications, setApplications] = useState<DetailedApplication[]>(INITIAL_APPLICATIONS);
  const [payments, setPayments] = useState<PaymentTransaction[]>(INITIAL_PAYMENTS);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState<DetailedApplication | null>(null);

  // Filtered Applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.passportNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.preferredUniversity.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (appId: string, newStatus: DetailedApplication['status']) => {
    setApplications(
      applications.map((a) => (a.id === appId ? { ...a, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : a))
    );
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] });
    }
  };

  const handleVerifyPayment = (payId: string, isApproved: boolean) => {
    setPayments(
      payments.map((p) =>
        p.id === payId
          ? { ...p, status: isApproved ? 'Verified' : 'Rejected', adminNotes: isApproved ? 'Verified by Admin' : 'Transaction ID not matching' }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-serif">
            <FolderKanban className="w-5 h-5 text-[#D4AF37]" />
            <span>Student Applications & Payments Control Center</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track student dossiers, audit mandatory passport credentials, and verify bKash / Bank transfers.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('apps')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'apps'
                ? 'bg-[#D4AF37] text-[#0B1F3A] shadow-md font-extrabold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Applications ({applications.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('payments')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'payments'
                ? 'bg-[#D4AF37] text-[#0B1F3A] shadow-md font-extrabold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payments & Receipts ({payments.length})</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'apps' ? (
        <div className="space-y-6">
          {/* Filter / Search Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-white/10">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search student name, email, passport number or target uni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-[#D4AF37]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-800 border border-white/10 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="All">All Statuses</option>
                <option value="Application Submitted">Application Submitted</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Offer Letter Issued">Offer Letter Issued</option>
                <option value="Visa Processing">Visa Processing</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
          </div>

          {/* Applications List Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 text-[10px] font-mono uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4">Ref ID / Student</th>
                  <th className="py-3.5 px-4">Passport No. (Mandatory)</th>
                  <th className="py-3.5 px-4">Target Destination</th>
                  <th className="py-3.5 px-4">English / CGPA</th>
                  <th className="py-3.5 px-4">Current Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{app.fullName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{app.studentEmail}</div>
                      <span className="text-[10px] text-[#D4AF37] font-semibold">{app.id}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-[#D4AF37]">
                      {app.passportNumber || 'N/A (Missing)'}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{app.preferredUniversity}</div>
                      <div className="text-[10px] text-slate-400">{app.preferredCountry} • {app.intendedProgram}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-200">CGPA {app.academicHistory[0]?.gpa || 'N/A'}</div>
                      <div className="text-[10px] text-emerald-400 font-bold">{app.englishTestDetails.testType} {app.englishTestDetails.overallScore}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value as any)}
                        className="p-1.5 rounded-lg bg-slate-800 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Application Submitted">Application Submitted</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Missing Documents">Missing Documents</option>
                        <option value="Offer Letter Issued">Offer Letter Issued</option>
                        <option value="Visa Processing">Visa Processing</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B1F3A] font-bold transition-all text-xs flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Dossier</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dossier Detail Modal / Drawer */}
          {selectedApp && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              <div className="w-full max-w-2xl bg-slate-900 border border-white/15 rounded-3xl p-6 text-white space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37]">
                      {selectedApp.id}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white mt-1">
                      {selectedApp.fullName}'s Admission Dossier
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-800 rounded-xl border border-white/10">
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">Passport Number</span>
                    <span className="font-mono text-sm font-bold text-[#D4AF37]">{selectedApp.passportNumber}</span>
                  </div>

                  <div className="p-3 bg-slate-800 rounded-xl border border-white/10">
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">Contact WhatsApp / Email</span>
                    <span className="font-bold text-white">{selectedApp.phone} • {selectedApp.studentEmail}</span>
                  </div>

                  <div className="p-3 bg-slate-800 rounded-xl border border-white/10 sm:col-span-2">
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">Target University & Degree</span>
                    <span className="font-bold text-white text-sm">{selectedApp.preferredUniversity} ({selectedApp.preferredCountry})</span>
                    <p className="text-slate-300 mt-0.5">{selectedApp.intendedProgram} • Intake: {selectedApp.preferredIntake}</p>
                  </div>
                </div>

                {/* Uploaded Documents Gallery */}
                <div className="p-4 bg-slate-800/80 rounded-2xl border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Uploaded Documents Gallery</span>
                  </h4>

                  <div className="divide-y divide-white/10 text-xs">
                    {selectedApp.uploadedDocuments.map((doc) => (
                      <div key={doc.id} className="py-2 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-white block">{doc.name}</span>
                          <span className="text-[10px] text-slate-400">{doc.category} • {doc.uploadedAt}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          Verified
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 text-xs font-bold hover:bg-white/20"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Payments Tab */
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-sm">Payment Transactions & Receipt Verification</h3>
              <p className="text-xs text-slate-400">Verify bKash, Nagad, or Bank transfers submitted by students.</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 text-[10px] font-mono uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Amount & Method</th>
                  <th className="py-3.5 px-4">Transaction Ref</th>
                  <th className="py-3.5 px-4">Purpose</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{p.studentName}</div>
                      <div className="text-[10px] text-slate-400">{p.studentEmail}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-[#D4AF37] text-sm">BDT {p.amountBDT.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400">{p.paymentMethod}</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                      {p.transactionId}
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      {p.purpose}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === 'Verified'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : p.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      {p.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleVerifyPayment(p.id, true)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-bold text-[11px] hover:bg-emerald-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleVerifyPayment(p.id, false)}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold text-[11px] hover:bg-rose-500/30"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsManager;
