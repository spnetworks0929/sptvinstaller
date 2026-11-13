
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TV Mounting Toronto & GTA | SP TV Installer',
  description:
    'Professional TV mounting in Toronto, Mississauga, Brampton and the GTA. Fireplace mounting, full-motion brackets and home theatres. Request installation online.',
  alternates: {
    canonical: 'https://sptvinstaller.com/locations/toronto',
  },
};

export default function Page() {
  return (
    <main className="locationPage wrap">
      <Link href="/">← SP TV Installer</Link>

      <div className="eyebrow">
        TORONTO & GTA TV INSTALLATION
      </div>

      <h1>
        Professional TV Mounting & Installation
        in Toronto and the GTA
      </h1>

      <p>
        Looking for professional TV mounting in Toronto
        or the Greater Toronto Area? SP TV Installer
        provides TV wall mounting, fireplace TV
        installation, full-motion mount installation
        and custom home theatre services.
      </p>

      <p>
        With hands-on installation experience since
        2015, our team helps homeowners and businesses
        securely mount televisions of different sizes.
        We also supply compatible TV wall mounts.
      </p>

      <h2>Our TV Installation Services</h2>

      <ul>
        <li>Standard flat-screen TV wall mounting</li>
        <li>Fixed and tilting TV mount installation</li>
        <li>Full-motion and swivel TV mounting</li>
        <li>TV installation above fireplaces</li>
        <li>Large-screen TV mounting, including 75-inch and 85-inch TVs</li>
        <li>TV mount supply and installation</li>
        <li>Custom home theatre installation</li>
        <li>Residential and commercial TV mounting</li>
      </ul>

      <h2>TV Mounting Service Areas</h2>

      <p>
        We serve Toronto, Etobicoke, North York,
        Scarborough, Mississauga, Brampton, Vaughan,
        Markham, Richmond Hill, Oakville, Burlington,
        Milton, Hamilton, Kitchener, Waterloo,
        Cambridge, Guelph, Barrie, Oshawa, Ajax,
        Pickering, Whitby, St. Catharines,
        Niagara Falls and surrounding areas
        within approximately 200 km of Toronto.
      </p>

      <h2>Why Choose SP TV Installer?</h2>

      <ul>
        <li>Hands-on installation experience since 2015</li>
        <li>TV mounting for a wide range of screen sizes</li>
        <li>Fixed, tilting and full-motion mounting options</li>
        <li>TV mounts available for purchase</li>
        <li>No upfront deposit required to request an appointment</li>
        <li>Installation date and pricing confirmed by our team</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>Do you install TVs above fireplaces?</h3>
      <p>
        Yes. Fireplace TV mounting is available
        where the wall structure, heat conditions
        and installation requirements are suitable.
      </p>

      <h3>Do you provide TV mounting brackets?</h3>
      <p>
        Yes. We offer compatible TV wall mounts,
        including fixed, tilting and full-motion options.
      </p>

      <h3>Can I book TV mounting online?</h3>
      <p>
        Yes. Submit an installation request online.
        Our team will contact you to confirm
        availability, appointment details and final pricing.
        No upfront payment is required.
      </p>

      <h2>Request Your TV Installation</h2>

      <p>
        Ready to mount your TV? Submit your request
        and our team will contact you to confirm
        the installation details.
      </p>

      <Link className="btn dark" href="/book">
        Request an Appointment →
      </Link>

      <p>
        Call{' '}
        <a href="tel:+12263367339">
          (226) 336-7339
        </a>
        {' '}or email{' '}
        <a href="mailto:info@sptvinstaller.com">
          info@sptvinstaller.com
        </a>.
      </p>

      <p>
        <Link href="/">
          Back to SP TV Installer homepage
        </Link>
      </p>
    </main>
  );
}
