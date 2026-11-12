
import { Resend } from 'resend';
import type { Booking } from '@prisma/client';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    })[char] || char
  );

const businessEmail = 'info@sptvinstaller.com';
const businessPhone = '(226) 336-7339';

const emailLayout = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:24px;background:#f7f8fa;font-family:Arial,Helvetica,sans-serif;color:#20252b;">
  <div style="max-width:600px;margin:auto;background:#ffffff;padding:30px;border:1px solid #e5e7eb;border-radius:8px;">
    <h2 style="margin-top:0;color:#172b4d;">SP TV Installer</h2>
    ${content}
    <hr style="border:0;border-top:1px solid #e5e7eb;margin:24px 0;" />
    <p style="font-size:13px;color:#555;">
      SP TV Installer<br />
      Phone: ${businessPhone}<br />
      Email: ${businessEmail}
    </p>
  </div>
</body>
</html>`;

export async function sendBookingRequest(b: Booking) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const from =
    process.env.EMAIL_FROM ||
    'SP TV Installer <bookings@sptvinstaller.com>';

  const reference = escapeHtml(b.id);
  const customerName = escapeHtml(b.customerName);
  const preferredDate = escapeHtml(b.preferredDate || 'To be arranged');
  const preferredTime = escapeHtml(b.preferredTime || 'To be arranged');

  const details = `
    <p><strong>Booking reference:</strong> ${reference}</p>
    <p><strong>Name:</strong> ${customerName}</p>
    <p><strong>Phone:</strong> ${escapeHtml(b.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(b.email)}</p>
    <p><strong>Address:</strong> ${escapeHtml(b.address)}</p>
    <p><strong>City:</strong> ${escapeHtml(b.city)}</p>
    <p><strong>Postal / ZIP:</strong> ${escapeHtml(b.postal)}</p>
    <p><strong>Country:</strong> ${escapeHtml(b.country)}</p>
    <p><strong>TV size:</strong> ${escapeHtml(b.tvSize)}</p>
    <p><strong>Installation type:</strong> ${escapeHtml(b.mountType)}</p>
    <p><strong>Wall type:</strong> ${escapeHtml(b.wallType)}</p>
    <p><strong>Supply TV mount:</strong> ${b.needsMount ? 'Yes' : 'No'}</p>
    <p><strong>Preferred date:</strong> ${preferredDate}</p>
    <p><strong>Preferred time:</strong> ${preferredTime}</p>
    <p><strong>Notes:</strong> ${escapeHtml(b.notes || 'None')}</p>
  `;

  const customerHtml = emailLayout(`
    <h3>We received your installation request</h3>
    <p>Hello ${customerName},</p>
    <p>Thank you for choosing SP TV Installer.</p>
    <p>We have received your TV installation request.
    Our team will contact you to confirm availability,
    your appointment details and final pricing.</p>
    <p><strong>Your appointment is not yet confirmed.</strong></p>
    <p>No deposit or online payment is required.</p>
    <h3>Your request details</h3>
    ${details}
    <p>If you need to make changes, simply reply to this email.</p>
    <p>Thank you,<br />SP TV Installer Team</p>
  `);

  const customerText = `
SP TV Installer

Hello ${b.customerName},

Thank you for choosing SP TV Installer.

We received your TV installation request.
Our team will contact you to confirm availability,
appointment details and final pricing.

Your appointment is not yet confirmed.
No deposit or online payment is required.

Booking reference: ${b.id}
Preferred date: ${b.preferredDate || 'To be arranged'}
Preferred time: ${b.preferredTime || 'To be arranged'}
Installation address: ${b.address}, ${b.city}, ${b.postal}

Questions? Reply to this email or call ${businessPhone}.

SP TV Installer
${businessEmail}
  `.trim();

  const customer = await resend.emails.send({
    from,
    to: b.email,
    replyTo: businessEmail,
    subject: 'SP TV Installer | We received your installation request',
    html: customerHtml,
    text: customerText,
  });

  if (customer.error) {
    console.error('Customer email error:', customer.error);
    throw new Error(customer.error.message);
  }

  const staff = await resend.emails.send({
    from,
    to: process.env.BOOKING_NOTIFICATION_EMAIL || businessEmail,
    replyTo: b.email,
    subject: `New TV installation request | ${b.city}`,
    html: emailLayout(`
      <h3>New installation request</h3>
      <p><strong>Status: Pending confirmation</strong></p>
      ${details}
      <p>Contact the customer to confirm the appointment.</p>
    `),
    text: `
New TV installation request
Status: Pending confirmation

Reference: ${b.id}
Name: ${b.customerName}
Phone: ${b.phone}
Email: ${b.email}
Address: ${b.address}, ${b.city}, ${b.postal}
Country: ${b.country}
TV size: ${b.tvSize}
Mounting: ${b.mountType}
Wall: ${b.wallType}
Supply mount: ${b.needsMount ? 'Yes' : 'No'}
Preferred date: ${b.preferredDate || 'To be arranged'}
Preferred time: ${b.preferredTime || 'To be arranged'}
Notes: ${b.notes || 'None'}
    `.trim(),
  });

  if (staff.error) {
    console.error('Staff email error:', staff.error);
    throw new Error(staff.error.message);
  }
}
