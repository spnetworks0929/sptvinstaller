
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Tv,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'TV Mounting Mississauga | Professional TV Installation',
  description:
    'Professional TV mounting in Mississauga, Ontario. TV wall installation, fireplace mounting, full-motion brackets, cable concealment and home theatre setup. Request an appointment with SP TV Installer.',
  keywords: [
    'TV mounting Mississauga',
    'TV installation Mississauga',
    'TV wall mounting Mississauga',
    'TV installer Mississauga',
    'fireplace TV mounting Mississauga',
    'TV mounting near me',
    'home theatre installation Mississauga',
  ],
  alternates: {
    canonical: 'https://sptvinstaller.com/locations/mississauga',
  },
  openGraph: {
    title: 'TV Mounting Mississauga | SP TV Installer',
    description:
      'Professional TV mounting and installation services in Mississauga, Ontario. Request an appointment online with no upfront payment.',
    url: 'https://sptvinstaller.com/locations/mississauga',
    type: 'website',
  },
};

const services = [
  {
    title: 'Standard TV Wall Mounting',
    description:
      'Secure, professional installation for a clean and modern TV setup in your living room, bedroom or office.',
  },
  {
    title: 'Full-Motion TV Mounting',
    description:
      'Adjustable TV brackets that allow you to swivel, tilt and position your screen for comfortable viewing.',
  },
  {
    title: 'Fireplace TV Mounting',
    description:
      'Carefully planned TV installation above suitable fireplaces, with attention to wall structure, viewing height and heat exposure.',
  },
  {
    title: 'Large-Screen TV Installation',
    description:
      'Professional mounting for larger televisions, including 65-inch, 75-inch, 85-inch and oversized screens.',
  },
  {
    title: 'Cable Concealment',
    description:
      'Neat cable management and concealment options to help create a clean, organized entertainment space.',
  },
  {
    title: 'Home Theatre Installation',
    description:
      'Custom home theatre setups, entertainment systems and professionally mounted displays.',
  },
];

const nearbyAreas = [
  'Mississauga',
  'Port Credit',
  'Streetsville',
  'Meadowvale',
  'Cooksville',
  'Erin Mills',
  'Clarkson',
  'Malton',
  'Square One',
  'Lakeview',
  'Etobicoke',
  'Oakville',
  'Brampton',
  'Milton',
  'Toronto',
];

const faqs = [
  {
    question: 'How much does TV mounting cost in Mississauga?',
    answer:
      'TV mounting estimates generally range from $40 to $200 depending on television size and installation requirements. Mounting brackets, special wall conditions and additional services may affect the final quote.',
  },
  {
    question: 'Can you mount a TV above a fireplace?',
    answer:
      'Yes. We offer fireplace TV mounting where the wall structure, fireplace clearances and heat conditions are suitable. Our team reviews the installation requirements before confirming the job.',
  },
  {
    question: 'Do you provide TV wall mounts?',
    answer:
      'Yes. SP TV Installer can supply fixed, tilting, full-motion and heavy-duty TV mounting brackets. Mount pricing is confirmed separately.',
  },
  {
    question: 'Do I need to pay a deposit to book?',
    answer:
      'No. You can submit an appointment request online without an upfront payment. Our team will contact you to confirm availability and final pricing.',
  },
  {
    question: 'Do you install TVs in condos and apartments?',
    answer:
      'Yes. We provide TV mounting for houses, condos, apartments, offices and other suitable commercial spaces. Please let us know about any building or wall restrictions.',
  },
];

export default function MississaugaPage() {
  return (
    <>
      <header className="nav wrap">
        <Link className="brand" href="/">
          <span className="brandmark">SP</span>
          <span>
            TV <b>INSTALLER</b>
          </span>
        </Link>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#projects">Projects</Link>
          <Link href="/#areas">Service Areas</Link>
        </nav>

        <a className="topContact" href="tel:+12263367339">
          (226) 336-7339
        </a>

        <Link className="navcta" href="/book">
          Book installation <ArrowRight size={16} />
        </Link>
      </header>

      <main>
        <section
          className="section wrap"
          style={{ paddingTop: '75px', paddingBottom: '55px' }}
        >
          <div className="eyebrow">
            <MapPin size={15} /> MISSISSAUGA, ONTARIO
          </div>

          <h1 style={{ maxWidth: '850px', lineHeight: 1.12 }}>
            Professional TV Mounting
            <br />
            in Mississauga
          </h1>

          <p
            style={{
              maxWidth: '760px',
              fontSize: '18px',
              lineHeight: 1.8,
              marginTop: '22px',
            }}
          >
            Looking for professional TV mounting in Mississauga?
            SP TV Installer provides secure TV wall installation,
            full-motion mounting, fireplace TV installation,
            cable concealment and custom home theatre services.
            We serve homes, condos, apartments and businesses
            throughout Mississauga and nearby communities.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              marginTop: '28px',
            }}
          >
            <Link className="btn gold" href="/book">
              Request TV Installation <ArrowRight size={18} />
            </Link>

            <a className="btn dark" href="tel:+12263367339">
              <Phone size={17} /> Call (226) 336-7339
            </a>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '22px',
              marginTop: '30px',
            }}
          >
            <span>
              <CheckCircle2 size={16} /> No upfront deposit
            </span>
            <span>
              <ShieldCheck size={16} /> Professional installation
            </span>
            <span>
              <Tv size={16} /> All TV sizes
            </span>
          </div>
        </section>

        <section className="section wrap extraSection">
          <div className="eyebrow">OUR SERVICES</div>

          <h2>TV Installation Services in Mississauga</h2>

          <p>
            From standard wall mounting to custom entertainment
            installations, our team helps you choose a suitable
            mounting solution for your space.
          </p>

          <div className="serviceGrid" style={{ marginTop: '30px' }}>
            {services.map((service) => (
              <article className="serviceCard" key={service.title}>
                <div className="serviceBody">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href="/book">
                    Request installation <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section wrap extraSection">
          <div className="eyebrow">TRANSPARENT ESTIMATES</div>

          <h2>TV Mounting Prices in Mississauga</h2>

          <p>
            We offer estimates based on your television size
            and installation requirements.
          </p>

          <div style={{ overflowX: 'auto', marginTop: '25px' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>
                    TV Size
                  </th>
                  <th style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>
                    Estimated Installation Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Up to 43 inches', '$40–$100'],
                  ['44–54 inches', '$50–$150'],
                  ['55–65 inches', '$50–$200'],
                  ['66–85 inches', '$50–$200'],
                  ['Over 85 inches', '$75–$200'],
                ].map(([size, price]) => (
                  <tr key={size}>
                    <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                      {size}
                    </td>
                    <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                      {price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="fine" style={{ marginTop: '18px' }}>
            Prices are estimates. TV mount hardware, wall conditions,
            additional wiring and special installation requirements
            may affect final pricing. No deposit is required to
            request an appointment.
          </p>
        </section>

        <section className="section wrap extraSection">
          <div className="eyebrow">LOCAL SERVICE AREAS</div>

          <h2>Serving Mississauga and Nearby Communities</h2>

          <p>
            SP TV Installer provides TV wall mounting throughout
            Mississauga, including Port Credit, Streetsville,
            Meadowvale, Erin Mills, Cooksville and surrounding
            neighbourhoods. We also accept appointment requests
            from nearby GTA communities.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '25px',
            }}
          >
            {nearbyAreas.map((area) => (
              <span
                key={area}
                style={{
                  padding: '10px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '30px',
                }}
              >
                <MapPin size={13} /> {area}
              </span>
            ))}
          </div>

          <p style={{ marginTop: '24px' }}>
            Looking for installation elsewhere?
            Explore our{' '}
            <Link href="/locations/toronto">
              Toronto and GTA TV mounting services
            </Link>
            {' '}or{' '}
            <Link href="/locations/kitchener-waterloo">
              Kitchener-Waterloo TV mounting services
            </Link>.
          </p>
        </section>

        <section className="section wrap extraSection">
          <div className="eyebrow">WHY SP TV INSTALLER</div>

          <h2>Experience You Can Count On</h2>

          <p>
            Our team has hands-on installation experience dating
            back to 2015, with more than 5,000 TVs mounted and
            over 100 custom home theatres built.
          </p>

          <div className="projectStats">
            <div>
              <strong>2015</strong>
              <span>Serving customers since</span>
            </div>
            <div>
              <strong>5,000+</strong>
              <span>TVs mounted</span>
            </div>
            <div>
              <strong>100+</strong>
              <span>Custom home theatres</span>
            </div>
          </div>

          <div style={{ marginTop: '25px' }}>
            <Link className="btn dark" href="/#projects">
              View Recent Projects <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section className="section wrap extraSection">
          <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>

          <h2>Mississauga TV Mounting FAQs</h2>

          <div style={{ marginTop: '25px' }}>
            {faqs.map((faq) => (
              <details
                key={faq.question}
                style={{
                  borderBottom: '1px solid #ddd',
                  padding: '18px 0',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '17px',
                  }}
                >
                  {faq.question}
                </summary>
                <p style={{ marginTop: '12px', lineHeight: 1.7 }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="section wrap extraSection">
          <div className="eyebrow">CUSTOMER FEEDBACK</div>

          <h2>Share Your Experience</h2>

          <p>
            Already had your TV installed by SP TV Installer?
            We'd appreciate your honest feedback on Google.
          </p>

          <a
            className="btn dark"
            href="https://g.page/r/CbEssiIgFwRSEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: '20px' }}
          >
            Leave a Google Review <Star size={17} />
          </a>
        </section>

        <section className="bottomCta wrap">
          <div>
            <div className="eyebrow light">
              BOOK YOUR INSTALLATION
            </div>

            <h2>
              Ready to Mount Your TV
              <br />
              in Mississauga?
            </h2>

            <p>
              Tell us about your TV and preferred installation
              date. Our team will contact you to confirm
              availability and final pricing.
            </p>

            <Link href="/book" className="btn gold">
              Request an Appointment <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer wrap">
        <div className="brand">
          <span className="brandmark">SP</span>
          <span>
            TV <b>INSTALLER</b>
          </span>
        </div>

        <p>
          Professional TV mounting in Mississauga and the GTA ·{' '}
          <a href="tel:+12263367339">(226) 336-7339</a>
          {' '}·{' '}
          <a href="mailto:info@sptvinstaller.com">
            info@sptvinstaller.com
          </a>
        </p>

        <span>
          © {new Date().getFullYear()} SP TV Installer
        </span>
      </footer>
    </>
  );
}
