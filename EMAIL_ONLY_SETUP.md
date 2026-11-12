# SP TV Installer — Email-only booking setup

The `/api/bookings` endpoint now sends booking details directly to Resend. It does not write to Prisma/SQLite, take a payment, or reserve an appointment slot. The customer is redirected to `/booking/received` only when the staff email send succeeds.

1. Verify the domain `sptvinstaller.com` in Resend, including the DNS records provided there.
2. Create a Resend API key and keep it secret.
3. In Vercel → Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY`: secret API key
   - `EMAIL_FROM`: `SP TV Installer <bookings@sptvinstaller.com>` (the domain must be verified)
   - `BOOKING_NOTIFICATION_EMAIL`: `info@sptvinstaller.com`
   - `NEXT_PUBLIC_BASE_URL`: `https://sptvinstaller.vercel.app`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `12263367339` (only if this is the WhatsApp number)
4. Apply to Production and redeploy after saving.
5. Submit a test booking and verify the staff email arrives (including spam folder), then verify the customer receipt.

**Important:** This email-only flow does not save bookings in a database, guarantee deliverability, or prevent all spam. For high-volume use, add rate limiting, monitoring, and an email provider fallback. Existing legacy admin/slot/status routes are not used by the new email-only booking form and may still depend on Prisma. Do not use them until configured or removed. There is no permanent booking history in this version: keep incoming booking emails in a dedicated mailbox folder.
