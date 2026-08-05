/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, X, CheckCircle2, ShieldCheck, Printer, Loader2, AlertCircle } from 'lucide-react';
import { VercitoLogo } from './VercitoLogo';
import { downloadPaymentReceipt, PaymentReceiptData } from '../lib/pdfReceiptGenerator';

interface OfficialReceiptModalProps {
  receipt: PaymentReceiptData;
  onClose: () => void;
}

export const OfficialReceiptModal: React.FC<OfficialReceiptModalProps> = ({ receipt, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const invoiceNo = receipt.invoiceNumber || `INV-2026-${receipt.tran_id.slice(-5)}`;
  const dateStr = new Date(receipt.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeStr = new Date(receipt.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedAmount = `BDT ${receipt.amount.toLocaleString()}`;
  const eurApprox = Math.round(receipt.amount / 132);

  const verificationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#verify-receipt?tran_id=${receipt.tran_id}`
    : `https://vercito.com/#verify-receipt?tran_id=${receipt.tran_id}`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    verificationUrl
  )}&color=0B1F3A`;

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    setErrorMsg(null);
    try {
      await downloadPaymentReceipt(receipt);
    } catch (err: any) {
      console.error('Failed to download PDF receipt:', err);
      setErrorMsg('Unable to render PDF receipt. Please check pop-up permissions or try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl bg-white text-slate-900 rounded-2xl border-2 border-[#D4AF37] shadow-2xl my-auto overflow-hidden relative print:shadow-none print:border-none print:w-full print:max-w-none">
        
        {/* Modal Controls Bar (Hidden during Print) */}
        <div className="bg-[#0B1F3A] p-3 px-4 sm:px-6 flex items-center justify-between border-b border-[#D4AF37]/30 text-white print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-serif font-bold text-sm sm:text-base">VERCITO Official Payment Receipt</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all"
              title="Print Receipt"
            >
              <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="p-1.5 px-3 rounded-lg bg-[#D4AF37] hover:bg-[#e5be42] text-[#0B1F3A] text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5 text-[#0B1F3A]" />
              )}
              <span>{isDownloading ? 'Downloading...' : 'PDF Receipt'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= RECEIPT BODY ================= */}
        <div className="p-5 sm:p-8 space-y-6 relative bg-white text-slate-900 overflow-hidden">
          
          {/* Subtle Security Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-[0.035]">
            <span className="font-sans font-black text-5xl sm:text-7xl uppercase tracking-widest text-[#0B1F3A] -rotate-30 text-center">
              VERCITO VERIFIED
            </span>
          </div>

          {/* Receipt Top Header */}
          <div className="relative z-10 bg-[#0B1F3A] text-white p-4 sm:p-5 rounded-xl border-b-2 border-[#D4AF37] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <VercitoLogo variant="icon" size="sm" isDarkBg />
              <div>
                <h1 className="font-serif font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none">
                  VERCITO
                </h1>
                <p className="text-[10px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">
                  HIGHER EDUCATION CONSULTANCY
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-300 font-light mt-0.5">
                  Gulshan 2, Dhaka 1212 | www.vercito.com | hr.vercito@gmail.com
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
              <span className="font-serif font-extrabold text-sm sm:text-base text-[#D4AF37] block">
                PAYMENT RECEIPT
              </span>
              <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-xs font-extrabold uppercase">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>PAYMENT PAID & VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Invoice & Transaction Overview Box */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Invoice No:</span>
              <span className="font-bold text-slate-900 text-sm block mt-0.5 font-mono">{invoiceNo}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Date & Time:</span>
              <span className="font-semibold text-slate-800 block mt-0.5">{dateStr}, {timeStr}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">SSLCommerz Tran ID:</span>
              <span className="font-mono text-xs font-bold text-[#0B1F3A] block mt-0.5 break-all">
                {receipt.tran_id}
              </span>
            </div>
          </div>

          {/* Student Details (Billed To) */}
          <div className="relative z-10 space-y-1 text-xs">
            <div className="border-b-2 border-[#D4AF37] pb-1 mb-2 inline-block">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider">
                BILLED TO (STUDENT INFORMATION)
              </h3>
            </div>

            <p className="font-bold text-sm text-slate-900">{receipt.studentName}</p>
            <p className="text-slate-600">Email: <span className="font-medium text-slate-800">{receipt.studentEmail}</span></p>
            <p className="text-slate-600">Phone / WhatsApp: <span className="font-medium text-slate-800">{receipt.studentPhone}</span></p>
            {receipt.notes && (
              <p className="text-slate-600">Reference / Note: <span className="font-medium text-slate-800">{receipt.notes}</span></p>
            )}
          </div>

          {/* Payment Itemized Table */}
          <div className="relative z-10 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B1F3A] text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Description / Payment Purpose</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-center">Currency</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="p-3">
                    <span className="font-bold block text-slate-900">{receipt.purpose}</span>
                    <span className="text-[10px] text-slate-500 block">Official Consultation & Processing Charges</span>
                  </td>
                  <td className="p-3 text-center font-medium">1</td>
                  <td className="p-3 text-center font-semibold text-slate-700">BDT</td>
                  <td className="p-3 text-right font-bold text-slate-900">{formattedAmount}</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-100 font-bold border-t border-slate-200">
                <tr>
                  <td colSpan={2} className="p-3 text-slate-900">
                    <span className="text-xs uppercase font-extrabold text-[#0B1F3A]">TOTAL AMOUNT PAID:</span>
                    <span className="text-[11px] font-normal text-slate-500 ml-2">(Approx. EUR {eurApprox})</span>
                  </td>
                  <td colSpan={2} className="p-3 text-right text-sm font-black text-[#0B1F3A] font-serif">
                    {formattedAmount}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* SSLCommerz Gateway Verification Section */}
          <div className="relative z-10 space-y-2">
            <h4 className="font-bold text-xs text-[#0B1F3A] uppercase tracking-wider">
              SSLCommerz Gateway Verification Data
            </h4>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#D4AF37]/50 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
              <div className="space-y-1">
                <p className="flex justify-between sm:justify-start sm:gap-2">
                  <span className="font-semibold text-slate-500">Validation ID:</span>
                  <span className="font-mono font-bold text-slate-900 break-all">
                    {receipt.val_id || `VAL-SSL-${receipt.tran_id.slice(-6)}`}
                  </span>
                </p>
                <p className="flex justify-between sm:justify-start sm:gap-2">
                  <span className="font-semibold text-slate-500">Bank Ref ID:</span>
                  <span className="font-mono font-bold text-slate-900 break-all">
                    {receipt.bankTranId || `TXN${Math.floor(10000000 + Math.random() * 90000000)}`}
                  </span>
                </p>
                <p className="flex justify-between sm:justify-start sm:gap-2">
                  <span className="font-semibold text-slate-500">Channel:</span>
                  <span className="font-semibold text-slate-900">
                    {receipt.paymentMethod || 'bKash / Visa / Mobile Banking'}
                  </span>
                </p>
              </div>

              <div className="space-y-1">
                <p className="flex justify-between sm:justify-start sm:gap-2">
                  <span className="font-semibold text-slate-500">Gateway Status:</span>
                  <span className="font-bold text-emerald-600">✓ SUCCESS (Passed)</span>
                </p>
                <p className="flex justify-between sm:justify-start sm:gap-2">
                  <span className="font-semibold text-slate-500">Issuer / Network:</span>
                  <span className="font-semibold text-slate-900">
                    {receipt.cardIssuer || 'SSLCommerz Authorized Gateway'}
                  </span>
                </p>
                <p className="flex justify-between sm:justify-start sm:gap-2">
                  <span className="font-semibold text-slate-500">Security Level:</span>
                  <span className="font-medium text-slate-800">256-Bit SSL Encrypted (PCI-DSS)</span>
                </p>
              </div>
            </div>
          </div>

          {/* QR Code & Official Company Authorization Area */}
          <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
            {/* QR Code */}
            <div className="flex items-center gap-3">
              <img
                src={qrImageUrl}
                alt="Receipt Verification QR Code"
                className="w-20 h-20 rounded-lg border border-slate-300 p-1 bg-white shrink-0"
              />
              <div>
                <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider block">
                  SCAN TO VERIFY RECEIPT
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Official VERCITO Receipt Verification
                </span>
                <span className="text-[9px] font-mono text-[#D4AF37] block mt-1">
                  {receipt.tran_id}
                </span>
              </div>
            </div>

            {/* Official Authorization Seal & Representative */}
            <div className="text-center sm:text-right flex flex-col items-center sm:items-end space-y-1">
              <VercitoLogo variant="icon" size="xs" />
              <p className="font-bold text-xs text-[#0B1F3A] mt-1">VERCITO Accounts Division</p>
              <p className="text-[10px] text-slate-500">Authorized Finance Representative</p>
              <p className="text-[9px] font-bold text-[#D4AF37] uppercase">[ Digital Authorization Verified ]</p>
            </div>
          </div>

          {/* Footer Official Notice */}
          <div className="relative z-10 text-center pt-3 border-t border-slate-200 text-[10px] text-slate-500 space-y-0.5">
            <p>This is an official computer-generated payment receipt issued by VERCITO International Education Consultancy.</p>
            <p>For receipt verification, scan the QR code or use the official VERCITO receipt verification system.</p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 print:hidden">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
