# SP TV Installer — website starter

Premium, mobile-responsive Next.js homepage and multi-step booking flow, with Prisma-backed technician slots, Stripe deposit checkout, verified Stripe webhook confirmation, Resend confirmation email, customer booking status page, and password-protected admin dashboard.

## Quick start
1. Install Node.js 20+ and run `npm install`.
2. Copy `.env.example` to `.env` and fill in the keys. **Never commit `.env`.**
3. Run `npx prisma generate && npm run db:push && npm run db:seed`.
4. Run `npm run dev` and open http://localhost:3000. Admin: `/admin`.
5. For local Stripe webhooks: `stripe listen --forward-to localhost:3000/api/stripe/webhook` and put the resulting signing secret into `.env`.
6. Configure a verified sender domain in Resend and set `RESEND_API_KEY` and `EMAIL_FROM`.

## Architecture
- `/`: premium homepage
- `/book`: customer service selection, real-time available slot lookup, contact details, Stripe deposit checkout
- `/booking/[token]`: private customer status page
- `/admin`: password-protected operations dashboard and manual UTC slot publishing
- `GET /api/slots`: technician availability, excluding booked and blocked slots
- `POST /api/bookings`: validated booking and atomic slot reservation via unique slot relation; creates Stripe Checkout session
- `POST /api/stripe/webhook`: signature-verified payment confirmation, email trigger, expired-session cleanup
- `POST /api/admin/login`, `/api/admin/slots`: staff actions

## IMPORTANT: before production
This is a **working starter architecture**, not a production-certified scheduling service. Do not take live payments until the following are implemented and tested:
- Replace SQLite with hosted Postgres and use migrations for production hosting. Configure backups and logging.
- Implement timezone-aware scheduling by technician (currently demo slots are UTC and the UI displays local device time). Enforce working hours, travel buffers, geographic coverage, and daylight saving time.
- Implement expiry cleanup for abandoned pending bookings even if Stripe's webhook delivery fails, plus retry/reconciliation for delayed webhooks. The current webhook releases expired checkouts only when the event arrives.
- Improve admin auth to per-user accounts with MFA, rate limiting, CSRF defenses, and audit logs. Password login here is a starter only.
- Add email queue/retries, staff notifications, customer cancellation/reschedule, photo upload, privacy policy, terms, deposit/refund policy, and customer support details.
- Add actual installation photos licensed for commercial use. Current hero/service photography uses remote Unsplash Source URLs for visual placeholders and may not load reliably.
- Verify applicable taxes, payment processing, and consumer disclosure rules in both countries. Listed prices are illustrative and in CAD or USD depending on country.
- Add comprehensive unit, integration, webhook and end-to-end tests and monitor production errors.
- Customize cities, technician roster, branding, logo, contact details, domain, prices, and operating hours.

## Security notes
Stripe session success redirects are NOT treated as proof of payment; only verified webhooks confirm a booking. Customer status pages use unguessable access tokens. Do not expose admin secrets in client code. Admin password must be 16+ characters and ADMIN_SESSION_SECRET must be a different long random string.


## Latest release notes
- All 13 supplied installation photographs are in `public/projects/` and displayed on the homepage.
- Pricing: up to 43 inches $40–100; 44–54 $50–150; 55–65 $50–200; 66–85 $50–200; over 85 $75–200. Prices are ranges; displayed estimate uses the minimum, final price determined on site.
- Booking requires no Stripe payment or deposit; confirmation happens when a booking is saved. Set up database, slots and email environment variables before accepting bookings.
- Optional WhatsApp contact: set `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel Project Settings > Environment Variables and redeploy. No number means no WhatsApp button.
- Upload the **contents of this folder**, not the ZIP file, to the GitHub repository root.

## Business contact
- Phone and WhatsApp: +1 (226) 336-7339
- Email: info@sptvinstaller.com
- WhatsApp button defaults to this number; override using NEXT_PUBLIC_WHATSAPP_NUMBER in Vercel.
- For automated booking confirmation emails, verify sptvinstaller.com with Resend and configure RESEND_API_KEY and EMAIL_FROM in Vercel.

## November 2026: SEO and lead generation update

- Home page: contact details, experience since 2015, TV mount sales, animated mounting guide, real project photos (requested project-02 removed), service areas and Google review link (no unverified rating or fabricated reviews).
- Location pages: `/locations/toronto` and `/locations/houston`; sitemap and robots metadata.
- Booking form: preferred date/time and optional supply of TV mount; **request only**, no payment, `PENDING_CONFIRMATION`.
- Email: customer acknowledgment and staff notification via Resend. Configure `RESEND_API_KEY`, verified `EMAIL_FROM`, and `BOOKING_NOTIFICATION_EMAIL`. PrivateEmail hosting alone does not configure Resend; verify the sending domain with the email provider and maintain PrivateEmail MX records.
- Set `NEXT_PUBLIC_BASE_URL` to your actual domain. WhatsApp number via `NEXT_PUBLIC_WHATSAPP_NUMBER`.

### IMPORTANT: database before going live

This starter uses Prisma SQLite (`DATABASE_URL=file:./dev.db`). Vercel's deployment filesystem is not a persistent SQLite database, so **live bookings will not work reliably** on Vercel as-is. Migrate Prisma to a persistent hosted database (such as managed PostgreSQL), change the datasource provider, configure `DATABASE_URL` in Vercel, and run the schema migration before publishing the booking form. Do not accept real customer requests until an end-to-end test confirms database writes and email delivery.

The revised schema adds `preferredDate`, `preferredTime`, `needsMount`, and optional technician/slot relations. Run `npx prisma format`, `npx prisma validate`, and `npx prisma db push` in a configured development environment, then `npm run build`. Schema changes require database migration. Production setup was **not** tested against a live Vercel environment.

### GitHub upload

Upload the **contents of this ZIP** to the repository root, not the ZIP itself or an extra enclosing directory. Replace the existing `app`, `lib`, `prisma`, `public`, and root config files. Delete the old `public/projects/project-02.jpg` in GitHub if it is still tracked; simply omitting it from an upload will not delete it from the repository. Do not upload `.env` files with real secrets.
