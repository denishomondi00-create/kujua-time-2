import { baseLayout } from '../layouts/base-layout';

export function bookingConfirmationEmail(vars: {
  clientName: string; eventTypeName: string; bookingDate: string;
  bookingTime: string; bookingReference: string; rescheduleLink?: string;
  cancelLink?: string; businessName?: string; accentColor?: string;
}): string {
  const content = `
    <h3>Booking Confirmed</h3>
    <p>Hi ${vars.clientName},</p>
    <p>Your <strong>${vars.eventTypeName}</strong> session is confirmed.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      <tr><td style="padding:8px 0;color:#868e96">Date</td><td style="padding:8px 0;font-weight:600">${vars.bookingDate}</td></tr>
      <tr><td style="padding:8px 0;color:#868e96">Time</td><td style="padding:8px 0;font-weight:600">${vars.bookingTime}</td></tr>
      <tr><td style="padding:8px 0;color:#868e96">Reference</td><td style="padding:8px 0;font-weight:600">${vars.bookingReference}</td></tr>
    </table>
    ${vars.rescheduleLink ? `<p><a href="${vars.rescheduleLink}">Reschedule</a>` : ''}
    ${vars.cancelLink ? ` | <a href="${vars.cancelLink}">Cancel</a></p>` : ''}
  `;
  return baseLayout(content, { businessName: vars.businessName, accentColor: vars.accentColor });
}
