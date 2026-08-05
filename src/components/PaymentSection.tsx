/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Receipt,
  Download,
  X,
  AlertCircle,
  QrCode,
  Loader2,
  History,
  FileText
} from 'lucide-react';
import { Currency } from '../types';
import { downloadPaymentReceipt, PaymentReceiptData } from '../lib/pdfReceiptGenerator';
import { OfficialReceiptModal } from './OfficialReceiptModal';
import { useTranslation } from '../i18n/LanguageContext';

interface PaymentSectionProps {
  currency?: Currency;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ currency = 'BDT' }) => {
  const { t, language } = useTranslation();
  const isBn = language === 'bn';

  // Preset Payment Categories
  const presetPackages = [
    {
      id: 'assessment',
      title: isBn ? 'প্রোফাইল অ্যাসেসমেন্ট ও রিভিউ' : 'Profile Assessment & Review',
      amountBDT: 1500,
      amountEUR: 12,
      desc: isBn ? 'ট্রান্সক্রিপ্ট মূল্যায়ন, এসওপি গাইডলাইন এবং ইউনিভার্সিটি শর্টলিস্ট' : 'Expert evaluation of transcripts, SOP guidance & university shortlist',
      popular: false,
    },
    {
      id: 'application',
      title: isBn ? 'ইউনিভার্সিটি অ্যাপ্লিকেশন ফি' : 'University Application Fee',
      amountBDT: 5000,
      amountEUR: 38,
      desc: isBn ? 'ইউরোপীয় বিশ্ববিদ্যালয় আবেদন পোর্টালের অফিশিয়াল ফি' : 'Official submission fee for European university application portal',
      popular: true,
    },
    {
      id: 'visa_deposit',
      title: isBn ? 'ভিসা লিগ্যালাইজেশন ও ভিএফএস ডিপোজিট' : 'Visa Legalization & VFS Deposit',
      amountBDT: 15000,
      amountEUR: 115,
      desc: isBn ? 'এমওএফএ অ্যাটেস্টেশন, সিআইএমইএ কম্পারেবিলিটি ও ভিসা ফাইল প্রস্তুত' : 'MOFA attestation, CIMEA statement of comparability & visa file prep',
      popular: false,
    },
    {
      id: 'custom',
      title: isBn ? 'কাস্টম ফি এর পরিমাণ' : 'Custom Fee Amount',
      amountBDT: 0,
      amountEUR: 0,
      desc: isBn ? 'কাউন্সেলর প্রদত্ত নির্দিষ্ট ইনভয়েস নম্বর বা সার্ভিস ফি লিখুন' : 'Enter invoice number or specific fee provided by your counselor',
      popular: false,
    },
  ];

  const [selectedPackage, setSelectedPackage] = useState<string>('application');
  const [customAmount, setCustomAmount] = useState<string>('2500');
  const [selectedPaymentMethodCategory, setSelectedPaymentMethodCategory] = useState<'all' | 'mobile' | 'cards' | 'banking'>('all');

  // Form Fields
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [invoiceNote, setInvoiceNote] = useState('');

  // Execution & PDF States
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // Payment History State (Persisted in localStorage)
  const [paymentHistory, setPaymentHistory] = useState<PaymentReceiptData[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Active Gateway Modal State
  const [gatewayModalData, setGatewayModalData] = useState<{
    tran_id: string;
    amount: number;
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    purpose: string;
  } | null>(null);

  // Completed Payment Receipt Modal
  const [receiptData, setReceiptData] = useState<PaymentReceiptData | null>(null);

  // Load payment history on mount & handle URL callback redirects
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vercito_student_payments');
      if (saved) {
        setPaymentHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading payment history:', e);
    }

    // Check if coming back from redirect callback or scanning QR code
    const hash = window.location.hash;
    if (hash && hash.includes('payment-status')) {
      const params = new URLSearchParams(hash.split('?')[1] || '');
      const tran_id = params.get('tran_id');
      const status = params.get('status');

      if (tran_id && status === 'SUCCESS') {
        fetch(`/api/payment/status/${tran_id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.payment) {
              handlePaymentSuccess(data.payment);
            }
          })
          .catch((err) => console.error('Error fetching callback payment status:', err));
      }
    } else if (hash && hash.includes('verify-receipt')) {
      const params = new URLSearchParams(hash.split('?')[1] || '');
      const tran_id = params.get('tran_id');

      if (tran_id) {
        fetch(`/api/payment/status/${tran_id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.payment) {
              setReceiptData(data.payment);
            }
          })
          .catch((err) => console.error('Error fetching verified receipt status:', err));
      }
    }
  }, []);

  // Save successful payment to local history & state
  const handlePaymentSuccess = (payment: PaymentReceiptData) => {
    setReceiptData(payment);
    setPaymentHistory((prev) => {
      const exists = prev.some((p) => p.tran_id === payment.tran_id);
      const updated = exists
        ? prev.map((p) => (p.tran_id === payment.tran_id ? payment : p))
        : [payment, ...prev];
      try {
        localStorage.setItem('vercito_student_payments', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving to local storage:', e);
      }
      return updated;
    });

    // Auto generate receipt PDF
    triggerReceiptDownload(payment);
  };

  // Get active payable amount
  const getPayableAmountBDT = (): number => {
    if (selectedPackage === 'custom') {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) || parsed <= 0 ? 0 : Math.round(parsed);
    }
    const pkg = presetPackages.find((p) => p.id === selectedPackage);
    return pkg ? pkg.amountBDT : 5000;
  };

  const activeAmountBDT = getPayableAmountBDT();
  const activeAmountEUR = Math.round(activeAmountBDT / 132);

  // Trigger PDF Generation & Download
  const triggerReceiptDownload = async (payment: PaymentReceiptData) => {
    setIsGeneratingPdf(true);
    setPdfError(null);
    try {
      await downloadPaymentReceipt(payment);
    } catch (err: any) {
      console.error('Failed to generate PDF receipt:', err);
      setPdfError(
        'Unable to render PDF receipt. Please check browser pop-up permissions or try downloading again from Payment History.'
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Handle Pay Now click -> Calls backend SSLCommerz Init
  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    if (!studentName.trim()) {
      setPaymentError('Please enter your full student name.');
      return;
    }
    if (!studentEmail.trim() || !studentEmail.includes('@')) {
      setPaymentError('Please enter a valid email address.');
      return;
    }
    if (!studentPhone.trim() || studentPhone.length < 8) {
      setPaymentError('Please enter a valid phone number (e.g. 01712345678).');
      return;
    }
    if (activeAmountBDT < 10) {
      setPaymentError('Payment amount must be at least BDT 10.');
      return;
    }

    setIsLoading(true);

    const activePkg = presetPackages.find((p) => p.id === selectedPackage);
    const purposeTitle = activePkg && activePkg.id !== 'custom' ? activePkg.title : 'VERCITO Custom Service Fee';

    try {
      const res = await fetch('/api/payment/sslcommerz/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          studentEmail,
          studentPhone,
          amount: activeAmountBDT,
          currency: 'BDT',
          purpose: purposeTitle,
          notes: invoiceNote,
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.gatewayUrl && !data.gatewayUrl.includes('#sslcommerz-checkout')) {
          // Redirect directly to SSLCommerz official gateway page
          window.location.href = data.gatewayUrl;
        } else {
          // Open official-styled SSLCommerz Gateway checkout modal on screen
          setGatewayModalData({
            tran_id: data.tran_id,
            amount: data.amount || activeAmountBDT,
            studentName,
            studentEmail,
            studentPhone,
            purpose: purposeTitle,
          });
        }
      } else {
        setPaymentError(data.message || 'Failed to initialize SSLCommerz gateway.');
      }
    } catch (err) {
      console.error('Payment initiation error:', err);
      setPaymentError('Network error connecting to SSLCommerz server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Process selected payment inside gateway checkout modal
  const handleCompleteGatewayPayment = async (methodName: string, issuerName: string) => {
    if (!gatewayModalData) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/payment/sslcommerz/complete-direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tran_id: gatewayModalData.tran_id,
          paymentMethod: methodName,
          cardIssuer: issuerName,
        }),
      });

      const data = await res.json();
      if (data.success && data.payment) {
        setGatewayModalData(null);
        handlePaymentSuccess(data.payment);
      } else {
        alert(data.message || 'Payment processing failed.');
      }
    } catch (err) {
      alert('Error verifying payment status.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="payment" className="py-20 md:py-28 bg-[#071426] text-white relative overflow-hidden">
      {/* Background Lighting & Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isBn ? 'পিসিআই-ডিএসএস লেভেল ১ এনক্রিপ্টেড ও সুরক্ষিত' : 'PCI-DSS Level 1 Encryption Verified'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {isBn ? 'নিরাপদ পেমেন্ট গেটওয়ে' : 'Secure Payment Gateway'}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'মোবাইল ব্যাংকিং (বিকাশ, নগদ, রকেট), ব্যাংক কার্ড এবং নেট ব্যাংকিং ব্যবহার করে নিরাপদে অ্যাপ্লিকেশন ফি, প্রসেসিং ডিপোজিট ও লিগ্যালাইজেশন চার্জ পরিশোধ করুন।'
              : 'Pay application fees, evaluation deposits, and legalization charges safely using Bangladeshi Mobile Banking, International Bank Cards, or NetBanking.'}
          </p>

          {/* Prompt required text & Payment History Button */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm font-extrabold tracking-wide text-white uppercase bg-[#0B1F3A] px-4 py-1.5 rounded-xl border border-[#D4AF37]/40 shadow-inner">
                {isBn ? 'এসএসএল কমার্জ পরিচালিত নিরাপদ পেমেন্ট' : 'Secure Payments Powered by SSLCommerz'}
              </span>
            </div>

            {paymentHistory.length > 0 && (
              <button
                onClick={() => setShowHistoryModal(true)}
                className="px-4 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <History className="w-4 h-4" />
                <span>{isBn ? `আমার রসিদসমূহ (${paymentHistory.length})` : `My Receipts (${paymentHistory.length})`}</span>
              </button>
            )}
          </div>
        </div>

        {/* Payment Methods Logo Grid Horizontal Showcase */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#0B1F3A]/90 border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                {isBn ? 'সমর্থিত পেমেন্ট মাধ্যমসমূহ' : 'Supported SSLCommerz Channels'}
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
              {[
                { id: 'all', labelBn: 'সব মাধ্যম', labelEn: 'All Methods' },
                { id: 'mobile', labelBn: 'মোবাইল ব্যাংকিং', labelEn: 'Mobile Banking' },
                { id: 'cards', labelBn: 'কার্ড (Visa/MC)', labelEn: 'Cards (Visa/MC)' },
                { id: 'banking', labelBn: 'ইন্টারনেট ব্যাংকিং', labelEn: 'Internet Banking' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPaymentMethodCategory(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedPaymentMethodCategory === tab.id
                      ? 'bg-[#D4AF37] text-[#0B1F3A]'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {isBn ? tab.labelBn : tab.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Horizontal Grid of SSLCommerz Payment Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
            {/* 1. Visa */}
            {(selectedPaymentMethodCategory === 'all' || selectedPaymentMethodCategory === 'cards') && (
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] transition-all group">
                <div className="h-8 flex items-center justify-center">
                  <span className="font-sans text-xl font-black italic tracking-tighter text-blue-400 group-hover:scale-110 transition-transform">
                    VISA
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-300 mt-1 uppercase">Visa Card</span>
              </div>
            )}

            {/* 2. Mastercard */}
            {(selectedPaymentMethodCategory === 'all' || selectedPaymentMethodCategory === 'cards') && (
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] transition-all group">
                <div className="h-8 flex items-center justify-center gap-0.5">
                  <div className="w-5 h-5 rounded-full bg-red-500 opacity-90" />
                  <div className="w-5 h-5 rounded-full bg-amber-500 -ml-2.5 opacity-90" />
                </div>
                <span className="text-[10px] font-bold text-slate-300 mt-1 uppercase">Mastercard</span>
              </div>
            )}

            {/* 3. bKash */}
            {(selectedPaymentMethodCategory === 'all' || selectedPaymentMethodCategory === 'mobile') && (
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-pink-950/40 border border-pink-500/30 hover:border-pink-400 transition-all group">
                <div className="h-8 flex items-center justify-center">
                  <span className="font-extrabold text-base text-pink-400 tracking-tight group-hover:scale-110 transition-transform">
                    bKash
                  </span>
                </div>
                <span className="text-[10px] font-bold text-pink-300 mt-1 uppercase">bKash</span>
              </div>
            )}

            {/* 4. Nagad */}
            {(selectedPaymentMethodCategory === 'all' || selectedPaymentMethodCategory === 'mobile') && (
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-orange-950/40 border border-orange-500/30 hover:border-orange-400 transition-all group">
                <div className="h-8 flex items-center justify-center">
                  <span className="font-extrabold text-base text-orange-400 tracking-tight group-hover:scale-110 transition-transform">
                    Nagad
                  </span>
                </div>
                <span className="text-[10px] font-bold text-orange-300 mt-1 uppercase">Nagad</span>
              </div>
            )}

            {/* 5. Rocket */}
            {(selectedPaymentMethodCategory === 'all' || selectedPaymentMethodCategory === 'mobile') && (
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 transition-all group">
                <div className="h-8 flex items-center justify-center">
                  <span className="font-extrabold text-base text-purple-300 tracking-tight group-hover:scale-110 transition-transform">
                    Rocket
                  </span>
                </div>
                <span className="text-[10px] font-bold text-purple-300 mt-1 uppercase">DBBL Rocket</span>
              </div>
            )}

            {/* 6. Mobile Banking */}
            {(selectedPaymentMethodCategory === 'all' || selectedPaymentMethodCategory === 'mobile') && (
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] transition-all group">
                <div className="h-8 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-bold text-slate-300 mt-1 uppercase">Mobile Banking</span>
              </div>
            )}

            {/* 7. Internet Banking */}
            {(selectedPaymentMethodCategory === 'all' || selectedPaymentMethodCategory === 'banking') && (
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] transition-all group">
                <div className="h-8 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-bold text-slate-300 mt-1 uppercase">Internet Banking</span>
              </div>
            )}

            {/* 8. Bank Cards */}
            {(selectedPaymentMethodCategory === 'all' || selectedPaymentMethodCategory === 'cards') && (
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] transition-all group">
                <div className="h-8 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-bold text-slate-300 mt-1 uppercase">Bank Cards</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Payment Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Select Invoice / Package */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span>Select Payment Purpose</span>
            </h3>

            <div className="space-y-3">
              {presetPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    selectedPackage === pkg.id
                      ? 'bg-gradient-to-r from-[#0B1F3A] to-[#122E58] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#0B1F3A] text-[9px] font-black uppercase tracking-wider">
                      Most Common
                    </span>
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPackage === pkg.id ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-slate-500'
                        }`}
                      >
                        {selectedPackage === pkg.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#0B1F3A]" />}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white">{pkg.title}</h4>
                        <p className="text-xs text-slate-300 mt-0.5 font-light">{pkg.desc}</p>
                      </div>
                    </div>

                    {pkg.id !== 'custom' && (
                      <div className="text-right shrink-0">
                        <span className="font-bold text-base text-[#D4AF37]">
                          ৳{pkg.amountBDT.toLocaleString()}
                        </span>
                        <p className="text-[10px] text-slate-400">≈ €{pkg.amountEUR}</p>
                      </div>
                    )}
                  </div>

                  {pkg.id === 'custom' && selectedPackage === 'custom' && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Enter Custom Fee Amount (BDT)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-sm font-bold text-[#D4AF37]">৳</span>
                        <input
                          type="number"
                          min="10"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="e.g. 2500"
                          className="w-full pl-8 pr-4 py-2 rounded-lg bg-black/40 border border-[#D4AF37]/40 text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Total Summary Box */}
            <div className="p-4 rounded-xl bg-[#0B1F3A] border border-[#D4AF37]/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Payable Amount</span>
                <p className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> No hidden Gateway convenience charges
                </p>
              </div>

              <div className="text-right">
                <span className="font-serif font-black text-2xl text-[#D4AF37]">
                  ৳{activeAmountBDT.toLocaleString()}
                </span>
                <p className="text-xs text-slate-300 font-mono">≈ €{activeAmountEUR} EUR</p>
              </div>
            </div>
          </div>

          {/* Right Column: Student Details & Pay Now Form */}
          <div className="lg:col-span-7 bg-[#0B1F3A] p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/30 shadow-2xl relative">
            <h3 className="font-serif text-xl font-bold text-white mb-6 flex items-center justify-between">
              <span>Student & Invoice Information</span>
              <span className="text-xs font-mono text-[#D4AF37] px-2.5 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                SSLCommerz Secured
              </span>
            </h3>

            {paymentError && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{paymentError}</span>
              </div>
            )}

            <form onSubmit={handleInitiatePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Full Student Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Tanvir Hossain"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Phone / WhatsApp Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="01712345678"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Invoice Note / Target Country / Counselor Ref (Optional)
                </label>
                <input
                  type="text"
                  value={invoiceNote}
                  onChange={(e) => setInvoiceNote(e.target.value)}
                  placeholder="e.g. Italy DSU Application - Counselor Ashfaq"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                />
              </div>

              {/* Requirement: Premium "Pay Now" Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A028] text-[#0B1F3A] font-extrabold text-base tracking-wider uppercase shadow-xl shadow-[#D4AF37]/25 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#0B1F3A]" />
                      <span>Connecting to SSLCommerz...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 text-[#0B1F3A]" />
                      <span>PAY NOW ৳{activeAmountBDT.toLocaleString()}</span>
                      <ArrowRight className="w-5 h-5 text-[#0B1F3A]" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> SSLCommerz 256-bit AES Encryption
                </span>
                <span>Auto Instant SMS & Receipt</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* SSLCommerz Direct Gateway Checkout Modal */}
      {gatewayModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0B1F3A] rounded-2xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* SSLCommerz Header */}
            <div className="bg-gradient-to-r from-[#0B1F3A] via-[#122A4E] to-[#0B1F3A] p-4 border-b border-[#D4AF37]/30 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                <div>
                  <h4 className="font-bold text-sm text-white leading-tight">SSLCommerz Hosted Checkout</h4>
                  <p className="text-[10px] text-emerald-400">Merchant: VERCITO STUDY ABROAD</p>
                </div>
              </div>

              <button
                onClick={() => setGatewayModalData(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Payment Info */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Transaction ID:</span>
                  <span className="font-mono text-[#D4AF37]">{gatewayModalData.tran_id}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Student Name:</span>
                  <span className="font-semibold text-white">{gatewayModalData.studentName}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Payable Amount:</span>
                  <span className="font-serif font-black text-base text-[#D4AF37]">
                    ৳{gatewayModalData.amount.toLocaleString()} BDT
                  </span>
                </div>
              </div>

              <p className="text-xs font-bold text-slate-300 text-center uppercase tracking-wider">
                Select SSLCommerz Payment Channel
              </p>

              {/* Payment Method Channels */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* bKash */}
                <button
                  onClick={() => handleCompleteGatewayPayment('bKash', 'bKash Mobile Financial Service')}
                  className="p-3 rounded-xl bg-pink-950/60 border border-pink-500/40 hover:bg-pink-900/80 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center font-bold text-white text-xs">
                    bK
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-pink-200">bKash</span>
                    <span className="text-[10px] text-pink-400">Mobile Wallet</span>
                  </div>
                </button>

                {/* Nagad */}
                <button
                  onClick={() => handleCompleteGatewayPayment('Nagad', 'Nagad Digital Financial Service')}
                  className="p-3 rounded-xl bg-orange-950/60 border border-orange-500/40 hover:bg-orange-900/80 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-white text-xs">
                    Ng
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-orange-200">Nagad</span>
                    <span className="text-[10px] text-orange-400">Mobile Wallet</span>
                  </div>
                </button>

                {/* Visa / Card */}
                <button
                  onClick={() => handleCompleteGatewayPayment('Visa Card', 'Standard Chartered / City Bank')}
                  className="p-3 rounded-xl bg-blue-950/60 border border-blue-500/40 hover:bg-blue-900/80 transition-all flex items-center gap-3 group"
                >
                  <CreditCard className="w-6 h-6 text-blue-400 shrink-0" />
                  <div className="text-left">
                    <span className="block text-xs font-bold text-blue-200">Visa Card</span>
                    <span className="text-[10px] text-blue-400">Credit / Debit</span>
                  </div>
                </button>

                {/* Mastercard */}
                <button
                  onClick={() => handleCompleteGatewayPayment('Mastercard', 'EBL / BRAC Bank')}
                  className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 hover:bg-amber-900/80 transition-all flex items-center gap-3 group"
                >
                  <CreditCard className="w-6 h-6 text-amber-400 shrink-0" />
                  <div className="text-left">
                    <span className="block text-xs font-bold text-amber-200">Mastercard</span>
                    <span className="text-[10px] text-amber-400">Credit / Debit</span>
                  </div>
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setGatewayModalData(null)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Cancel and Return to VERCITO Website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completed Payment Receipt Modal */}
      {receiptData && (
        <OfficialReceiptModal
          receipt={receiptData}
          onClose={() => setReceiptData(null)}
        />
      )}

      {/* Payment History Drawer Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#0B1F3A] rounded-2xl border border-[#D4AF37]/50 shadow-2xl p-6 space-y-6 relative text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-xl font-bold">Your Official Payment Receipts</h3>
              </div>

              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentHistory.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm space-y-2">
                <FileText className="w-10 h-10 mx-auto text-slate-500 mb-2" />
                <p>No past payment receipts found on this device.</p>
                <p className="text-xs text-slate-500">
                  Receipts generated for completed SSLCommerz payments will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
                {paymentHistory.map((item) => (
                  <div
                    key={item.tran_id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-[#D4AF37] font-bold">{item.tran_id}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          SUCCESS
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white">{item.purpose}</h4>
                      <div className="text-xs text-slate-400 mt-1 space-x-3">
                        <span>Paid by: {item.studentName}</span>
                        <span>•</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-between sm:justify-end border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                      <div className="text-right">
                        <span className="font-serif font-black text-base text-[#D4AF37] block">
                          ৳{item.amount.toLocaleString()} BDT
                        </span>
                        <span className="text-[10px] text-slate-400 block">{item.paymentMethod || 'SSLCommerz'}</span>
                      </div>

                      <button
                        onClick={() => triggerReceiptDownload(item)}
                        disabled={isGeneratingPdf}
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/15 shrink-0"
                      >
                        <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Receipt PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs uppercase"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
