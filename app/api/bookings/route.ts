
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { services, sizes } from '@/lib/pricing';

export const runtime = 'nodejs';

const BUSINESS_EMAIL = 'info@sptvinstaller.com';
const BUSINESS_PHONE = '(226) 336-7339';

const schema = z.object({
  customerName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().min(5).max(200),
  postal: z.string().trim().min(3).max(20),
  notes: z.string().max(1000).optional(),
  country: z.enum(['CA', 'US']),
  city: z.string().trim().min(2).max(100),
  service: z.string(),
  size: z.string(),
  wall: z.string().max(100),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferredTime: z.string().min(2).max(100),
  needsMount: z.boolean().default(false),
  website: z.string().max(200).optional(),
});

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[char] || char;
  });
}

function emailLayout(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SP TV Installer</title>
</head>
<body style="margin:0;padding:24px;background:#f7f8fa;font-family:Arial,Helvetica,sans-serif;color:#20252b;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:28px;border:1px solid #e5e7eb;border-radius:8px;">
    <h2 style="margin-top:0;color:#17365d;">SP TV Installer</h2>

    ${content}

    <hr style="border:0;border-top:1px solid #e5e7eb;margin:24px 0;" />

    <p style="font-size:13px;line-height:1.6;color:#555;">
      SP TV Installer<br />
      Phone: ${BUSINESS_PHONE}<br />
      Email: ${BUSINESS_EMAIL}
    </p>
  </div>
</body>
</html>
`;
}

export async function POST(req: NextRequest) {
  if (Number(req.headers.get('content-length') || 0) > 12000) {
    return NextResponse.json(
      { error: 'Request is too large.' },
      { status: 413 }
    );
  }

  let input: z.infer<typeof schema>;

  try {
    input = schema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: 'Please check your booking details.' },
      { status: 400 }
    );
  }

  // Basic spam protection
  if (input.website) {
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  }

  const selectedService = services.find(
    (service) => service.id === input.service
  );

  const selectedSize = sizes.find(
    (size) => size.id === input.size
  );

  if (!selectedService || !selectedSize) {
    return NextResponse.json(
      { error: 'Invalid installation selection.' },
      { status: 400 }
    );
  }

  // Preserve the existing future-date validation.
  if (input.preferredDate < new Date().toISOString().slice(0, 10)) {
    return NextResponse.json(
      { error: 'Please select a future date.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  const from = process.env.EMAIL_FROM;

  const notificationEmail =
    process.env.BOOKING_NOTIFICATION_EMAIL || BUSINESS_EMAIL;

  if (!apiKey || !from) {
    return NextResponse.json(
      {
        error:
          'Booking email is not configured yet. Please call (226) 336-7339.',
      },
      { status: 503 }
    );
  }

  const reference = crypto.randomUUID()
    .slice(0, 8)
    .toUpperCase();

  const details: [string, string][] = [
    ['Reference', reference],
    ['Name', input.customerName],
    ['Phone', input.phone],
    ['Email', input.email],
    ['Address', input.address],
    ['City', input.city],
    ['Postal / ZIP', input.postal],
    ['Country', input.country],
    ['Installation type', selectedService.label],
    ['TV size', selectedSize.label],
    ['Wall type', input.wall],
    [
      'Supply TV mount',
      input.needsMount ? 'Yes (quote separately)' : 'No',
    ],
    ['Preferred date', input.preferredDate],
    ['Preferred time', input.preferredTime],
    ['Notes', input.notes || 'None'],
  ];

  const detailsHtml = `
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${details
        .map(
          ([label, value]) => `
          <tr>
            <th style="text-align:left;padding:9px 6px;border-bottom:1px solid #eee;vertical-align:top;">
              ${escapeHtml(label)}
            </th>
            <td style="padding:9px 6px;border-bottom:1px solid #eee;vertical-align:top;">
              ${escapeHtml(value)}
            </td>
          </tr>
        `
        )
        .join('')}
    </table>
  `;

  const detailsText = details
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');

  const staffHtml = emailLayout(`
    <h3>New TV installation request</h3>

    <p><strong>Status: Pending confirmation</strong></p>

    <p>A customer has submitted a new installation request.</p>

    ${detailsHtml}

    <p>
      No deposit has been requested.
      Contact the customer to confirm availability,
      appointment details and final pricing.
    </p>
  `);

  const staffText = `
New TV installation request
Status: Pending confirmation

${detailsText}

No deposit requested.
Contact the customer to confirm the appointment.
  `.trim();

  const customerHtml = emailLayout(`
    <h3>We received your installation request</h3>

    <p>Hello ${escapeHtml(input.customerName)},</p>

    <p>
      Thank you for choosing SP TV Installer.
      We have received your TV installation request.
    </p>

    <p>
      Our team will contact you to confirm availability,
      your installation date and time, and final pricing.
    </p>

    <p>
      <strong>Your appointment is not yet confirmed.</strong>
    </p>

    <p>No deposit or online payment is required.</p>

    <h3>Your request details</h3>

    <p>
      <strong>Booking reference:</strong>
      ${escapeHtml(reference)}
    </p>

    <p>
      <strong>Preferred date:</strong>
      ${escapeHtml(input.preferredDate)}
    </p>

    <p>
      <strong>Preferred time:</strong>
      ${escapeHtml(input.preferredTime)}
    </p>

    <p>
      <strong>Installation address:</strong><br />
      ${escapeHtml(input.address)}<br />
      ${escapeHtml(input.city)},
      ${escapeHtml(input.postal)}<br />
      ${escapeHtml(input.country)}
    </p>

    <p>
      <strong>Installation type:</strong>
      ${escapeHtml(selectedService.label)}
    </p>

    <p>
      <strong>TV size:</strong>
      ${escapeHtml(selectedSize.label)}
    </p>

    <p>
      If you need to update your request,
      simply reply to this email.
    </p>

    <p>
      Thank you,<br />
      SP TV Installer Team
    </p>
  `);

  const customerText = `
SP TV Installer

Hello ${input.customerName},

Thank you for choosing SP TV Installer.

We have received your TV installation request.

Our team will contact you to confirm availability,
appointment details and final pricing.

Your appointment is not yet confirmed.
No deposit or online payment is required.

BOOKING DETAILS

Reference: ${reference}
Preferred date: ${input.preferredDate}
Preferred time: ${input.preferredTime}
Address: ${input.address}, ${input.city}, ${input.postal}
Country: ${input.country}
Installation type: ${selectedService.label}
TV size: ${selectedSize.label}

If you need to update your request,
simply reply to this email.

Thank you,
SP TV Installer Team

Phone: ${BUSINESS_PHONE}
Email: ${BUSINESS_EMAIL}
  `.trim();

  try {
    const resend = new Resend(apiKey);

    // First send the booking details to SP TV Installer.
    const staffResult = await resend.emails.send({
      from,
      to: notificationEmail,
      replyTo: input.email,
      subject: `New TV installation request | ${input.city} | ${reference}`,
      html: staffHtml,
      text: staffText,
    });

    if (staffResult.error) {
      console.error(
        'Business booking email failed:',
        staffResult.error
      );

      return NextResponse.json(
        {
          error:
            'We could not send your request. Please call (226) 336-7339.',
        },
        { status: 502 }
      );
    }

    // Send a separate confirmation to the customer.
    // A customer email failure must not erase a successful
    // business notification.
    try {
      const customerResult = await resend.emails.send({
        from,
        to: input.email,
        replyTo: BUSINESS_EMAIL,
        subject: `SP TV Installer | Installation request ${reference}`,
        html: customerHtml,
        text: customerText,
      });

      if (customerResult.error) {
        console.error(
          'Customer confirmation failed:',
          customerResult.error
        );
      }
    } catch (customerError) {
      console.error(
        'Customer confirmation failed:',
        customerError
      );
    }

    return NextResponse.json(
      {
        success: true,
        reference,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      'Booking email service unavailable:',
      error
    );

    return NextResponse.json(
      {
        error:
          'We could not send your request. Please call (226) 336-7339.',
      },
      { status: 502 }
    );
  }
}
