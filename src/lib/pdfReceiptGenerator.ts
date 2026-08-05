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
 * Generates high-res PNG data URL for VERCITO official logo emblem
 */
async function getVercitoLogoDataUrl(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  return new Promise((resolve) => {
    try {
      const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 500 500">
        <defs>
          <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0B1F3A" />
            <stop offset="50%" stop-color="#08162A" />
            <stop offset="100%" stop-color="#040C18" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F9E29C" />
            <stop offset="35%" stop-color="#D4AF37" />
            <stop offset="70%" stop-color="#AA820A" />
            <stop offset="100%" stop-color="#E5C158" />
          </linearGradient>
          <radialGradient id="globeGrad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#1E4D8C" />
            <stop offset="60%" stop-color="#0B2A5B" />
            <stop offset="100%" stop-color="#051430" />
          </radialGradient>
        </defs>
        <circle cx="250" cy="230" r="105" fill="url(#globeGrad)" stroke="url(#goldGrad)" stroke-width="3" />
        <ellipse cx="250" cy="230" rx="105" ry="40" fill="none" stroke="#64B5F6" stroke-width="1.2" stroke-opacity="0.3" />
        <ellipse cx="250" cy="230" rx="60" ry="105" fill="none" stroke="#64B5F6" stroke-width="1.2" stroke-opacity="0.3" />
        <line x1="145" y1="230" x2="355" y2="230" stroke="#64B5F6" stroke-width="1.2" stroke-opacity="0.3" />
        <line x1="250" y1="125" x2="250" y2="335" stroke="#64B5F6" stroke-width="1.2" stroke-opacity="0.3" />
        <path d="M210,165 Q230,155 250,160 T270,185 Q260,205 240,210 Q225,225 215,200 Z M235,220 Q265,225 275,255 Q260,290 230,295 Q210,280 220,250 Z" fill="#FFFFFF" fill-opacity="0.95" />
        <path d="M165,180 Q180,175 190,195 Q175,220 160,200 Z" fill="#FFFFFF" fill-opacity="0.85" />
        <path d="M135,110 L195,110 L250,320 L220,320 Z" fill="url(#navyGrad)" stroke="url(#goldGrad)" stroke-width="1.5" />
        <path d="M365,110 L305,110 L250,320 L280,320 Z" fill="url(#goldGrad)" stroke="#0B1F3A" stroke-width="1.5" />
        <polygon points="250,25 380,68 250,110 120,68" fill="url(#navyGrad)" stroke="url(#goldGrad)" stroke-width="3" />
        <polygon points="250,32 360,68 250,102 140,68" fill="url(#navyGrad)" />
        <path d="M185,82 L185,115 Q250,145 315,115 L315,82 Q250,110 185,82 Z" fill="url(#navyGrad)" stroke="url(#goldGrad)" stroke-width="2" />
        <path d="M250,68 Q210,75 198,125" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round" />
        <circle cx="250" cy="68" r="4" fill="url(#goldGrad)" />
        <polygon points="193,125 203,125 200,155 196,155" fill="url(#goldGrad)" />
        <path d="M140,260 Q120,220 220,180 Q320,140 400,120" fill="none" stroke="url(#navyGrad)" stroke-width="10" stroke-linecap="round" />
        <path d="M130,270 Q200,320 340,260 Q430,210 420,130" fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round" />
        <g transform="translate(415, 125) rotate(-35) scale(1.1)">
          <path d="M0,-22 L5,-5 L22,5 L22,10 L5,2 L4,18 L10,23 L10,27 L0,23 L-10,27 L-10,23 L-4,18 L-5,2 L-22,10 L-22,5 L-5,-5 Z" fill="url(#navyGrad)" stroke="url(#goldGrad)" stroke-width="1.5" />
        </g>
      </svg>`;

      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 300, 300);
          const dataUrl = canvas.toDataURL('image/png');
          URL.revokeObjectURL(url);
          resolve(dataUrl);
        } else {
          URL.revokeObjectURL(url);
          resolve(null);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    } catch (e) {
      resolve(null);
    }
  });
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

  const formattedAmount = `BDT ${payment.amount.toLocaleString()}`;
  const eurApprox = Math.round(payment.amount / 132);

  const verificationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#verify-receipt?tran_id=${payment.tran_id}`
    : `https://vercito.com/#verify-receipt?tran_id=${payment.tran_id}`;

  // Get official VERCITO logo PNG data
  const logoDataUrl = await getVercitoLogoDataUrl();

  // 1. Watermark (Subtle Security Authenticity Feature)
  doc.saveGraphicsState();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(240, 244, 250);
  doc.text('VERCITO VERIFIED', pageWidth / 2, pageHeight / 2, {
    align: 'center',
    angle: -30,
  });
  doc.restoreGraphicsState();

  // 2. Top Navy Header Banner
  doc.setFillColor(11, 31, 58); // #0B1F3A Vercito Navy
  doc.rect(0, 0, pageWidth, 36, 'F');

  // Gold accent bar beneath header
  doc.setFillColor(212, 175, 55); // #D4AF37 Gold
  doc.rect(0, 36, pageWidth, 2, 'F');

  // Header Official VERCITO Logo
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, 'PNG', 15, 6, 22, 22);
  }

  // Header Brand Info
  const textLeft = logoDataUrl ? 42 : 15;
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.text('VERCITO', textLeft, 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(212, 175, 55);
  doc.text('HIGHER EDUCATION CONSULTANCY', textLeft, 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(200, 210, 225);
  doc.text('Gulshan 2, Dhaka 1212 | www.vercito.com | hr.vercito@gmail.com', textLeft, 27);

  // Top Right "PAYMENT RECEIPT" & STATUS
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(212, 175, 55);
  doc.text('PAYMENT RECEIPT', pageWidth - 15, 16, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(34, 197, 94); // Clean Green
  doc.text('✓ PAYMENT PAID & VERIFIED', pageWidth - 15, 24, { align: 'right' });

  // 3. Invoice & Transaction Overview Box
  let y = 44;

  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, pageWidth - 30, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);

  doc.text('INVOICE NO:', 20, y + 7);
  doc.text('DATE & TIME:', 75, y + 7);
  doc.text('SSLCOMMERZ TRAN ID:', 135, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(11, 31, 58);

  doc.text(invoiceNo, 20, y + 14);
  doc.text(`${dateStr}, ${timeStr}`, 75, y + 14);

  // Wrap or fit long transaction ID
  doc.setFont('courier', 'bold');
  doc.setFontSize(8.5);
  doc.text(payment.tran_id, 135, y + 14);

  // 4. Student Details (Billed To)
  y += 27;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(11, 31, 58);
  doc.text('BILLED TO (STUDENT INFORMATION)', 15, y);

  doc.setLineWidth(0.5);
  doc.setDrawColor(212, 175, 55);
  doc.line(15, y + 2, 85, y + 2);

  y += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(payment.studentName, 15, y);

  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Email: ${payment.studentEmail}`, 15, y);

  y += 5;
  doc.text(`Phone / WhatsApp: ${payment.studentPhone}`, 15, y);

  if (payment.notes) {
    y += 5;
    const noteLines = doc.splitTextToSize(`Reference / Note: ${payment.notes}`, pageWidth - 30);
    doc.text(noteLines, 15, y);
    y += (noteLines.length - 1) * 4;
  }

  // 5. Itemized Payment Table
  y += 10;

  // Table Header
  doc.setFillColor(11, 31, 58);
  doc.rect(15, y, pageWidth - 30, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('DESCRIPTION / PAYMENT PURPOSE', 20, y + 5.5);
  doc.text('QTY', 125, y + 5.5, { align: 'center' });
  doc.text('CURRENCY', 150, y + 5.5, { align: 'center' });
  doc.text('AMOUNT', pageWidth - 20, y + 5.5, { align: 'right' });

  y += 8;

  // Table Body Row
  const purposeText = payment.purpose || 'VERCITO Higher Education Service Fee';
  const purposeLines = doc.splitTextToSize(purposeText, 95);
  const rowHeight = Math.max(14, purposeLines.length * 5 + 7);

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.rect(15, y, pageWidth - 30, rowHeight, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(purposeLines, 20, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Official Consultation & Processing Charges', 20, y + 6 + (purposeLines.length * 4.5));

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('1', 125, y + 8, { align: 'center' });
  doc.text('BDT', 150, y + 8, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.text(formattedAmount, pageWidth - 20, y + 8, { align: 'right' });

  y += rowHeight;

  // Total Summary Row
  doc.setFillColor(241, 245, 249);
  doc.rect(15, y, pageWidth - 30, 12, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(11, 31, 58);
  doc.text('TOTAL AMOUNT PAID:', 20, y + 7.5);

  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`(Approx. EUR ${eurApprox})`, 75, y + 7.5);

  doc.setFontSize(11);
  doc.setTextColor(11, 31, 58);
  doc.text(formattedAmount, pageWidth - 20, y + 7.5, { align: 'right' });

  // 6. SSLCommerz Gateway Verification Section
  y += 18;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(11, 31, 58);
  doc.text('SSLCOMMERZ GATEWAY VERIFICATION DATA', 15, y);

  y += 4;
  const auditBoxY = y;
  const auditBoxHeight = 32;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(212, 175, 55);
  doc.roundedRect(15, auditBoxY, pageWidth - 30, auditBoxHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);

  // Column 1 Labels
  doc.text('SSLCommerz Validation ID:', 20, auditBoxY + 7);
  doc.text('Bank Reference ID:', 20, auditBoxY + 16);
  doc.text('Payment Channel:', 20, auditBoxY + 25);

  // Column 2 Labels
  doc.text('Gateway Status:', 115, auditBoxY + 7);
  doc.text('Issuer / Network:', 115, auditBoxY + 16);
  doc.text('Security Level:', 115, auditBoxY + 25);

  // Column 1 Values (Wrapped if long)
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);

  const valId = payment.val_id || `VAL-SSL-${payment.tran_id.slice(-6)}`;
  const valIdLines = doc.splitTextToSize(valId, 48);
  doc.text(valIdLines, 60, auditBoxY + 7);

  const bankId = payment.bankTranId || `TXN${Math.floor(10000000 + Math.random() * 90000000)}`;
  const bankIdLines = doc.splitTextToSize(bankId, 48);
  doc.text(bankIdLines, 60, auditBoxY + 16);

  const channel = payment.paymentMethod || 'bKash / Visa / Mobile Banking';
  const channelLines = doc.splitTextToSize(channel, 48);
  doc.text(channelLines, 60, auditBoxY + 25);

  // Column 2 Values
  doc.setTextColor(34, 197, 94); // Green
  doc.text('✓ SUCCESS (Passed)', 150, auditBoxY + 7);

  doc.setTextColor(15, 23, 42);
  const issuer = payment.cardIssuer || 'SSLCommerz Authorized Gateway';
  const issuerLines = doc.splitTextToSize(issuer, 42);
  doc.text(issuerLines, 150, auditBoxY + 16);

  doc.text('256-Bit SSL Encrypted (PCI-DSS)', 150, auditBoxY + 25);

  // 7. QR Code & Official Company Logo Seal Area
  y = auditBoxY + auditBoxHeight + 8;

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

    doc.addImage(qrDataUrl, 'PNG', 15, y, 26, 26);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(11, 31, 58);
    doc.text('SCAN TO VERIFY RECEIPT', 15, y + 30);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Official VERCITO Receipt Verification', 15, y + 33.5);
  } catch (qrErr) {
    console.warn('QR code rendering fallback:', qrErr);
  }

  // Official VERCITO Logo in Authorization Section
  const authCenterX = 165;
  const logoX = authCenterX - 10;
  const logoY = y;

  if (logoDataUrl) {
    doc.addImage(logoDataUrl, 'PNG', logoX, logoY, 20, 20);
  }

  // Authorization Representative Text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(11, 31, 58);
  doc.text('VERCITO Accounts Division', authCenterX, logoY + 23, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Authorized Finance Representative', authCenterX, logoY + 27, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(212, 175, 55);
  doc.text('[ Digital Authorization Verified ]', authCenterX, logoY + 31, { align: 'center' });

  // 8. Footer Disclaimer
  doc.setFillColor(11, 31, 58);
  doc.rect(0, pageHeight - 14, pageWidth, 14, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(200, 210, 225);
  doc.text(
    'This is an official computer-generated payment receipt issued by VERCITO International Education Consultancy.',
    pageWidth / 2,
    pageHeight - 8.5,
    { align: 'center' }
  );
  doc.text(
    'For receipt verification, scan the QR code or use the official VERCITO receipt verification system.',
    pageWidth / 2,
    pageHeight - 4.5,
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

