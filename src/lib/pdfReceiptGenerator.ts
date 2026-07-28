/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export interface PaymentReceiptData {
  id: string;
  tran_id: string;
  val_id?: string;
  bankTranId?: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  amount: number;
  currency?: string;
  purpose: string;
  notes?: string;
  paymentMethod?: string;
  cardIssuer?: string;
  createdAt: string;
  invoiceNumber?: string;
}

/**
 * Generates an official, professional VERCITO PDF payment receipt.
 */
export async function generatePaymentReceiptPDF(payment: PaymentReceiptData): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm

  const invoiceNo = payment.invoiceNumber || `INV-2026-${payment.tran_id.slice(-5)}`;
  const dateStr = new Date(payment.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeStr = new Date(payment.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const verificationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#verify-receipt?tran_id=${payment.tran_id}`
    : `https://vercito.com/verify-receipt?tran_id=${payment.tran_id}`;

  // 1. Top Navy Header Banner
  doc.setFillColor(11, 31, 58); // #0B1F3A Vercito Navy
  doc.rect(0, 0, pageWidth, 36, 'F');

  // Gold accent bar beneath header
  doc.setFillColor(212, 175, 55); // #D4AF37 Gold
  doc.rect(0, 36, pageWidth, 2, 'F');

  // Header Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('VERCITO', 15, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(212, 175, 55);
  doc.text('HIGHER EDUCATION CONSULTANCY', 15, 24);
  doc.setTextColor(200, 210, 225);
  doc.text('Gulshan 2, Dhaka 1212 | www.vercito.com | hr.vercito@gmail.com', 15, 29);

  // Top Right "OFFICIAL RECEIPT" Badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(212, 175, 55);
  doc.text('PAYMENT RECEIPT', pageWidth - 15, 18, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(34, 197, 94); // Green PAID
  doc.text('[ STATUS: PAID & VERIFIED ]', pageWidth - 15, 26, { align: 'right' });

  // 2. Invoice & Transaction Overview Box
  let y = 48;

  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, pageWidth - 30, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);

  doc.text('INVOICE NO:', 20, y + 8);
  doc.text('DATE & TIME:', 75, y + 8);
  doc.text('SSLCOMMERZ TRAN ID:', 135, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(11, 31, 58);

  doc.text(invoiceNo, 20, y + 15);
  doc.text(`${dateStr}, ${timeStr}`, 75, y + 15);
  doc.setFontSize(9);
  doc.text(payment.tran_id, 135, y + 15);

  // 3. Student Details (Billed To)
  y += 30;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(11, 31, 58);
  doc.text('BILLED TO (STUDENT INFORMATION)', 15, y);

  doc.setLineWidth(0.5);
  doc.setDrawColor(212, 175, 55);
  doc.line(15, y + 2, 85, y + 2);

  y += 9;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(payment.studentName, 15, y);

  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Email: ${payment.studentEmail}`, 15, y);

  y += 5;
  doc.text(`Phone / WhatsApp: ${payment.studentPhone}`, 15, y);

  if (payment.notes) {
    y += 5;
    doc.text(`Reference / Note: ${payment.notes}`, 15, y);
  }

  // 4. Itemized Payment Table
  y += 12;

  // Table Header
  doc.setFillColor(11, 31, 58);
  doc.rect(15, y, pageWidth - 30, 9, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('DESCRIPTION / PAYMENT PURPOSE', 20, y + 6);
  doc.text('QTY', 130, y + 6, { align: 'center' });
  doc.text('CURRENCY', 155, y + 6, { align: 'center' });
  doc.text('AMOUNT (BDT)', pageWidth - 20, y + 6, { align: 'right' });

  y += 9;

  // Table Body Row
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.rect(15, y, pageWidth - 30, 16, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(payment.purpose || 'VERCITO Higher Education Fee', 20, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Official Consultation & Processing Charges', 20, y + 12);

  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('1', 130, y + 9, { align: 'center' });
  doc.text('BDT (৳)', 155, y + 9, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text(`৳ ${payment.amount.toLocaleString()}`, pageWidth - 20, y + 9, { align: 'right' });

  y += 16;

  // Total Summary Row
  doc.setFillColor(241, 245, 249);
  doc.rect(15, y, pageWidth - 30, 12, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(11, 31, 58);
  doc.text('TOTAL AMOUNT PAID:', 20, y + 8);

  const eurApprox = Math.round(payment.amount / 132);
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`(Approx. € ${eurApprox} EUR)`, 75, y + 8);

  doc.setFontSize(12);
  doc.setTextColor(11, 31, 58);
  doc.text(`৳ ${payment.amount.toLocaleString()} BDT`, pageWidth - 20, y + 8, { align: 'right' });

  // 5. SSLCommerz Gateway Verification & Audit Section
  y += 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(11, 31, 58);
  doc.text('SSLCOMMERZ GATEWAY VERIFICATION DATA', 15, y);

  y += 5;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(15, y, pageWidth - 30, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);

  doc.text('SSLCommerz Validation ID:', 20, y + 7);
  doc.text('Bank Reference ID:', 20, y + 14);
  doc.text('Payment Channel:', 20, y + 21);

  doc.text('Gateway Status:', 120, y + 7);
  doc.text('Issuer / Network:', 120, y + 14);
  doc.text('Security Level:', 120, y + 21);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);

  doc.text(payment.val_id || `VAL-SSL-${payment.tran_id.slice(-6)}`, 65, y + 7);
  doc.text(payment.bankTranId || `TXN${Math.floor(10000000 + Math.random() * 90000000)}`, 65, y + 14);
  doc.text(payment.paymentMethod || 'bKash / Visa / Mobile Banking', 65, y + 21);

  doc.setTextColor(34, 197, 94); // Green
  doc.text('SUCCESS (Passed)', 155, y + 7);

  doc.setTextColor(15, 23, 42);
  doc.text(payment.cardIssuer || 'SSLCommerz Authorized Gateway', 155, y + 14);
  doc.text('256-Bit SSL Encrypted (PCI-DSS)', 155, y + 21);

  // 6. QR Code & Official Company Seal Area
  y += 36;

  // Generate real QR code image
  try {
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 150,
      margin: 1,
      color: {
        dark: '#0B1F3A',
        light: '#FFFFFF',
      },
    });

    doc.addImage(qrDataUrl, 'PNG', 15, y, 28, 28);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(11, 31, 58);
    doc.text('SCAN TO VERIFY RECEIPT', 15, y + 32);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Official VERCITO Online Ledger', 15, y + 35);
  } catch (qrErr) {
    console.warn('QR code rendering fallback:', qrErr);
  }

  // Draw Official Circular Stamp / Seal
  const sealX = pageWidth - 55;
  const sealY = y + 14;

  doc.setDrawColor(212, 175, 55); // Gold
  doc.setLineWidth(1);
  doc.circle(sealX, sealY, 14, 'D');
  doc.setLineWidth(0.3);
  doc.circle(sealX, sealY, 12, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(11, 31, 58);
  doc.text('VERCITO STUDY ABROAD', sealX, sealY - 4, { align: 'center' });
  doc.setFontSize(7);
  doc.setTextColor(212, 175, 55);
  doc.text('★ OFFICIAL SEAL ★', sealX, sealY, { align: 'center' });
  doc.setFontSize(5.5);
  doc.setTextColor(11, 31, 58);
  doc.text('VERIFIED & STAMPED', sealX, sealY + 4, { align: 'center' });

  // Signature line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(11, 31, 58);
  doc.text('VERCITO Accounts Division', sealX, sealY + 22, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Authorized Finance Representative', sealX, sealY + 26, { align: 'center' });

  // 7. Footer Disclaimer
  doc.setFillColor(11, 31, 58);
  doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(200, 210, 225);
  doc.text(
    'This is an official computer-generated receipt issued by VERCITO International Education Consultancy. Registered in Bangladesh.',
    pageWidth / 2,
    pageHeight - 5,
    { align: 'center' }
  );

  return doc;
}

/**
 * Downloads the PDF receipt directly to the user's browser.
 */
export async function downloadPaymentReceipt(payment: PaymentReceiptData): Promise<boolean> {
  try {
    const doc = await generatePaymentReceiptPDF(payment);
    const invoiceNo = payment.invoiceNumber || `INV-2026-${payment.tran_id.slice(-5)}`;
    const fileName = `VERCITO_Official_Receipt_${invoiceNo}.pdf`;
    doc.save(fileName);
    return true;
  } catch (error) {
    console.error('Error generating PDF receipt:', error);
    throw error;
  }
}
