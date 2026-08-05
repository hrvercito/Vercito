/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Download,
  AlertCircle,
  FileText
} from 'lucide-react';
import { downloadPaymentReceipt, PaymentReceiptData } from '../../../lib/pdfReceiptGenerator';
import { OfficialReceiptModal } from '../../OfficialReceiptModal';

interface PaymentItem {
  id: string;
  tran_id: string;
  val_id?: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  amount: number;
  currency: string;
  purpose: string;
  notes?: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';
  paymentMethod?: string;
  bankTranId?: string;
  cardType?: string;
  cardIssuer?: string;
  createdAt: string;
  updatedAt: string;
  invoiceNumber?: string;
}

export const PaymentsManager: React.FC = () => {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [selectedVerificationModal, setSelectedVerificationModal] = useState<any | null>(null);
  const [previewReceiptModal, setPreviewReceiptModal] = useState<PaymentReceiptData | null>(null);

  const adminToken = "vercito_admin_session_token_2026_verified";

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/payments', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.payments)) {
        setPayments(data.payments);
      }
    } catch (err) {
      console.error('Failed to fetch admin payments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleDownloadReceipt = async (pay: PaymentItem) => {
    setDownloadingId(pay.tran_id);
    setPdfError(null);
    try {
      await downloadPaymentReceipt(pay);
    } catch (err: any) {
      console.error('Error downloading receipt in admin:', err);
      setPdfError(`Failed to generate PDF for ${pay.tran_id}`);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleVerifyTransaction = async (tran_id: string) => {
    setVerifyingId(tran_id);
    try {
      const res = await fetch('/api/admin/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ tran_id }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedVerificationModal(data);
        fetchPayments();
      } else {
        alert(data.message || 'Verification failed');
      }
    } catch (err) {
      alert('Error verifying payment transaction');
    } finally {
      setVerifyingId(null);
    }
  };

  const filteredPayments = payments.filter((p) => {
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      p.studentName.toLowerCase().includes(q) ||
      p.studentEmail.toLowerCase().includes(q) ||
      p.studentPhone.includes(q) ||
      p.tran_id.toLowerCase().includes(q) ||
      p.purpose.toLowerCase().includes(q);

    return matchesStatus && matchesQuery;
  });

  const totalSuccessfulBDT = payments
    .filter((p) => p.status === 'SUCCESS')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B1F3A] p-6 rounded-2xl border border-white/10 text-white">
        <div>
          <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>SSLCommerz Real-Time Verification Engine</span>
          </div>
          <h2 className="font-serif text-2xl font-bold">Payment Transactions Manager</h2>
          <p className="text-xs text-slate-300">
            Track student application fees, DSU processing charges, and verify bank transaction references.
          </p>
        </div>

        <button
          onClick={fetchPayments}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/15 transition-all shrink-0"
        >
          <RefreshCw className={`w-4 h-4 text-[#D4AF37] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Records</span>
        </button>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A]/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Received Volume</span>
          <div className="font-serif text-2xl font-black text-[#D4AF37] mt-1">
            ৳{totalSuccessfulBDT.toLocaleString()} BDT
          </div>
          <span className="text-[11px] text-emerald-500 font-semibold mt-0.5 inline-block">
            Verified via SSLCommerz Network
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A]/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Successful Payments</span>
          <div className="font-serif text-2xl font-black text-emerald-500 mt-1">
            {payments.filter((p) => p.status === 'SUCCESS').length}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 inline-block">
            Out of {payments.length} total attempts
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1F3A]/80 border border-slate-200 dark:border-white/10 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending / Processing</span>
          <div className="font-serif text-2xl font-black text-amber-500 mt-1">
            {payments.filter((p) => p.status === 'PENDING').length}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 inline-block">
            Awaiting student gateway completion
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#0B1F3A]/80 p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, email, phone, transaction ID..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['ALL', 'SUCCESS', 'PENDING', 'FAILED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-[#0B1F3A] dark:bg-[#D4AF37] text-white dark:text-[#0B1F3A]'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-[#0B1F3A]/80 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
        {filteredPayments.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
            <CreditCard className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p>No payment records match your current filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Student Details</th>
                  <th className="p-4">Purpose</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Channel</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#D4AF37]">
                      {pay.tran_id}
                      <span className="block text-[10px] text-slate-400 font-sans font-normal mt-0.5">
                        {new Date(pay.createdAt).toLocaleDateString()} {new Date(pay.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-bold block text-slate-900 dark:text-white">{pay.studentName}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{pay.studentEmail}</span>
                      <span className="text-[10px] text-slate-400">{pay.studentPhone}</span>
                    </td>

                    <td className="p-4 max-w-xs">
                      <span className="font-semibold block text-slate-800 dark:text-slate-200">{pay.purpose}</span>
                      {pay.notes && <span className="text-[10px] text-slate-400 italic block">{pay.notes}</span>}
                    </td>

                    <td className="p-4 font-serif font-bold text-sm text-slate-900 dark:text-white">
                      ৳{pay.amount.toLocaleString()} BDT
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-bold text-[10px] uppercase text-slate-700 dark:text-slate-300">
                        {pay.paymentMethod || 'SSLCommerz'}
                      </span>
                      {pay.bankTranId && (
                        <span className="block text-[10px] font-mono text-emerald-500 mt-0.5">
                          Bank Ref: {pay.bankTranId}
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      {pay.status === 'SUCCESS' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> SUCCESS
                        </span>
                      )}
                      {pay.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px] border border-amber-500/30">
                          <Clock className="w-3 h-3" /> PENDING
                        </span>
                      )}
                      {pay.status === 'FAILED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-[10px] border border-red-500/30">
                          <XCircle className="w-3 h-3" /> FAILED
                        </span>
                      )}
                      {pay.status === 'CANCELLED' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-500 dark:text-slate-400 font-bold text-[10px] border border-slate-500/30">
                          CANCELLED
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {pay.status === 'SUCCESS' && (
                          <>
                            <button
                              onClick={() => setPreviewReceiptModal(pay)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 font-bold text-[11px] flex items-center gap-1 border border-[#D4AF37]/30 transition-all shrink-0"
                              title="View Official Receipt"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>View Receipt</span>
                            </button>

                            <button
                              onClick={() => handleDownloadReceipt(pay)}
                              disabled={downloadingId === pay.tran_id}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold text-[11px] flex items-center gap-1 border border-emerald-500/30 transition-all shrink-0"
                              title="Download Official PDF Receipt"
                            >
                              <Download className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{downloadingId === pay.tran_id ? 'Rendering...' : 'Receipt PDF'}</span>
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => handleVerifyTransaction(pay.tran_id)}
                          disabled={verifyingId === pay.tran_id}
                          className="px-2.5 py-1.5 rounded-lg bg-[#0B1F3A] dark:bg-white/10 text-[#D4AF37] dark:text-white hover:bg-[#122E58] dark:hover:bg-white/20 font-bold text-[11px] transition-all border border-[#D4AF37]/30 shrink-0"
                        >
                          {verifyingId === pay.tran_id ? 'Verifying...' : 'SSLCommerz Verify'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SSLCommerz Direct Verification Dialog Modal */}
      {selectedVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0B1F3A] rounded-2xl border-2 border-[#D4AF37] p-6 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                <h3 className="font-serif text-lg font-bold">SSLCommerz Validation Certificate</h3>
              </div>

              <button
                onClick={() => setSelectedVerificationModal(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span>Validation ID:</span>
                <span className="text-[#D4AF37]">{selectedVerificationModal.sslcommerzValidation?.val_id}</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span className="text-white">{selectedVerificationModal.sslcommerzValidation?.tran_id}</span>
              </div>
              <div className="flex justify-between">
                <span>Bank Transaction Ref:</span>
                <span className="text-emerald-400">{selectedVerificationModal.sslcommerzValidation?.bank_tran_id}</span>
              </div>
              <div className="flex justify-between">
                <span>Channel Issuer:</span>
                <span className="text-slate-200">{selectedVerificationModal.sslcommerzValidation?.card_issuer}</span>
              </div>
              <div className="flex justify-between">
                <span>Risk Level Assessment:</span>
                <span className="text-emerald-400">{selectedVerificationModal.sslcommerzValidation?.risk_level}</span>
              </div>
              <div className="flex justify-between">
                <span>Verification Signature:</span>
                <span className="text-xs text-slate-400 truncate max-w-[200px]">
                  {selectedVerificationModal.sslcommerzValidation?.verify_sign}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const p = payments.find(x => x.tran_id === selectedVerificationModal.sslcommerzValidation?.tran_id);
                  if (p) handleDownloadReceipt(p);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs uppercase flex items-center justify-center gap-2 hover:bg-[#e5be42]"
              >
                <Download className="w-4 h-4 text-[#0B1F3A]" />
                <span>Download PDF Receipt</span>
              </button>

              <button
                onClick={() => setSelectedVerificationModal(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs uppercase hover:bg-white/20 border border-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Receipt Preview Modal */}
      {previewReceiptModal && (
        <OfficialReceiptModal
          receipt={previewReceiptModal}
          onClose={() => setPreviewReceiptModal(null)}
        />
      )}
    </div>
  );
};
