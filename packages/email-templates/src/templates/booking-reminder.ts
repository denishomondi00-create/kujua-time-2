import { baseLayout } from '../layouts/base-layout';

export function bookingReminderEmail(vars: {
  clientName: string; eventTypeName: string; bookingDate: string;
  bookingTime: string; hoursUntil: string; businessName?: string;
}): string {
  const content = `
    <h3>Upcoming Session Reminder</h3>
    <p>Hi ${vars.clientName},</p>
    <p>Your <strong>${vars.eventTypeName}</strong> session is in <strong>${vars.hoursUntil}</strong>.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      <tr><td style="padding:8px 0;color:#868e96">Date</td><td style="padding:8px 0;font-weight:600">${vars.bookingDate}</td></tr>
      <tr><td style="padding:8px 0;color:#868e96">Time</td><td style="padding:8px 0;font-weight:600">${vars.bookingTime}</td></tr>
    </table>
    <p>We look forward to seeing you!</p>
  `;
  return baseLayout(content, { businessName: vars.businessName });
}
