import { baseLayout } from '../layouts/base-layout';

export function paymentReceiptEmail(vars: {
  clientName: string; amount: string; currency: string;
  eventTypeName: string; bookingReference: string; businessName?: string;
}): string {
  const content = `
    <h3>Payment Receipt</h3>
    <p>Hi ${vars.clientName},</p>
    <p>We received your payment for <strong>${vars.eventTypeName}</strong>.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      <tr><td style="padding:8px 0;color:#868e96">Amount</td><td style="padding:8px 0;font-weight:600">${vars.currency} ${vars.amount}</td></tr>
      <tr><td style="padding:8px 0;color:#868e96">Reference</td><td style="padding:8px 0;font-weight:600">${vars.bookingReference}</td></tr>
    </table>
    <p>Thank you for your payment!</p>
  `;
  return baseLayout(content, { businessName: vars.businessName });
}
