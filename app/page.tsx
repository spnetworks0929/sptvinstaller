
import WhatsAppButton from './WhatsAppButton';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Clock3,
  Star,
  MapPin,
  MoveUpRight,
} from 'lucide-react';

export default function Home() {
  return (
    <>
      <header className="nav wrap">
        <Link className="brand" href="/">
          <span className="brandmark">SP</span>
          <span>TV <b>INSTALLER</b></span>
        </Link>

        <nav>
          <a href="#services">Services</a>
          <a href="#mounts">TV Mounts</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#areas">Service Areas</a>
        </nav>

        <a className="topContact" href="tel:+12263367339">
          (226) 336-7339
        </a>
        <a className="topContact emailTop" href="mailto:info@sptvinstaller.com">
          info@sptvinstaller.com
        </a>

        <Link className="navcta" href="/book">
          Book installation <ArrowRight size={16} />
        </Link>
      </header>

      <main>
        <section className="hero">
          <div className="heroPhoto" />
          <div className="heroShade" />
          <div className="wrap heroContent">
            <div className="eyebrow light">
              <span className="dot" /> PROFESSIONAL TV MOUNTING · CANADA & USA
            </div>
            <h1>
              Beautifully mounted.
              <br />
              <em>Effortlessly booked.</em>
            </h1>
            <p>
              Expert TV installation that elevates your space. Request your
              preferred installation date. Our team will contact you to confirm
              availability and final pricing. No payment required to request
              an appointment.
            </p>
            <div className="heroActions">
              <Link className="btn gold" href="/book">
                Book your installation <ArrowRight size={18} />
              </Link>
              <a className="textlink" href="#services">
                Explore services <MoveUpRight size={16} />
              </a>
            </div>
            <div className="heroProof">
              <span><Check size={17} /> Easy online booking</span>
              <span><Check size={17} /> Professional installation</span>
              <span><Check size={17} /> Clear upfront pricing</span>
            </div>
          </div>
        </section>

        <section className="trust wrap">
          <div>
            <Star size={20} />
            <b>Premium service</b>
            <small>Careful, clean installation</small>
          </div>
          <div>
            <ShieldCheck size={20} />
            <b>Installed with care</b>
            <small>Safety-first workmanship</small>
          </div>
          <div>
            <Clock3 size={20} />
            <b>Your time matters</b>
            <small>Flexible appointment requests</small>
          </div>
          <div>
            <MapPin size={20} />
            <b>Two countries</b>
            <small>Canada & United States</small>
          </div>
        </section>

        <section id="services" className="section wrap">
          <div className="sectionTop">
            <div>
              <div className="eyebrow">THE SERVICES</div>
              <h2>
                Every screen deserves
                <br />
                the perfect setting.
              </h2>
            </div>
            <p>
              From a clean, flush-mounted look to a flexible viewing setup,
              find the installation that fits your home.
            </p>
          </div>

          <div className="serviceGrid">
            <article className="serviceCard">
              <div className="servicePhoto photo1" />
              <div className="serviceBody">
                <span>01 / ESSENTIAL</span>
                <h3>Standard wall mount</h3>
                <p>A refined, secure fit for a minimalist finish.</p>
                <Link href="/book?service=standard">
                  From $40 <ArrowRight size={17} />
                </Link>
              </div>
            </article>

            <article className="serviceCard">
              <div className="servicePhoto photo2" />
              <div className="serviceBody">
                <span>02 / FLEXIBLE</span>
                <h3>Full-motion mounting</h3>
                <p>Enjoy the perfect angle from every seat.</p>
                <Link href="/book?service=full">
                  From $50 <ArrowRight size={17} />
                </Link>
              </div>
            </article>

            <article className="serviceCard">
              <div className="servicePhoto photo3" />
              <div className="serviceBody">
                <span>03 / SIGNATURE</span>
                <h3>Fireplace & custom</h3>
                <p>Considered solutions for statement spaces.</p>
                <Link href="/book?service=fireplace">
                  From $50 <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          </div>

          <p className="fine">
            TV mounting estimates: up to 43" $40–$100; 44–54" $50–$150;
            55–65" $50–$200; 66–85" $50–$200; over 85" $75–$200.
            Final quote depends on installation requirements.
          </p>
        </section>

        <section id="how" className="steps">
          <div className="wrap">
            <div className="eyebrow">SIMPLE BY DESIGN</div>
            <h2>
              From booking to beautiful
              <br />
              in three easy steps.
            </h2>
            <div className="stepGrid">
              <div>
                <span>01</span>
                <h3>Tell us about your TV</h3>
                <p>Choose the screen size, mount type, and installation location.</p>
              </div>
              <div>
                <span>02</span>
                <h3>Choose your time</h3>
                <p>Browse available appointments and reserve your preferred slot.</p>
              </div>
              <div>
                <span>03</span>
                <h3>We handle the rest</h3>
                <p>
                  Submit your request with no deposit. Our team will contact
                  you to confirm your appointment.
                </p>
              </div>
            </div>
            <Link href="/book" className="btn dark">
              Find your appointment <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section id="about" className="section wrap extraSection">
          <div className="eyebrow">ABOUT SP TV INSTALLER</div>
          <h2>Hands-on installation experience since 2015.</h2>
          <p>
            We specialize in professional TV wall mounting, carefully planned
            entertainment spaces, and custom home theatre installations.
            With more than 5,000 TVs mounted and over 100 custom home theatres
            built, our team focuses on secure installation, thoughtful
            placement, and a clean finished result.
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
        </section>

        <section id="mounts" className="section wrap extraSection">
          <div className="eyebrow">SUPPLY + INSTALL</div>
          <h2>We sell TV mounts, too.</h2>
          <p>
            Need a bracket? Ask us about fixed, tilting, full-motion and
            heavy-duty TV mounts. We can supply the right mount and install
            it professionally. Mount pricing is separate and confirmed
            before installation.
          </p>
          <div className="mountGrid">
            {[
              'Fixed / low-profile mounts',
              'Tilting TV mounts',
              'Full-motion / swivel mounts',
              'Heavy-duty large TV mounts',
            ].map((s, i) => (
              <div className="mountCard" key={s}>
                <span>0{i + 1}</span>
                <h3>{s}</h3>
                <p>Ask our team for compatible options and pricing.</p>
              </div>
            ))}
          </div>

          <h3 className="animationHeading">
            See how professional TV mounting works
          </h3>
          <img
            className="mountAnimation"
            src="/tv-mounting-animation.gif"
            alt="Animated steps of SP TV Installer fitting a TV bracket, hanging a television and demonstrating adjustable mounts"
            loading="lazy"
          />
          <div>
            <Link href="/book" className="btn dark">
              Request TV mounting + bracket <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        {/* GOOGLE REVIEWS SECTION */}
        <section id="reviews" className="section wrap extraSection">
          <div className="eyebrow">CUSTOMER FEEDBACK</div>
          <h2>Your feedback matters.</h2>
          <p>
            Had your TV installed by SP TV Installer? Share your honest experience
            with other customers. You can also explore feedback on Google.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginTop: '24px',
            }}
          >
            <a
              className="btn gold"
              href="https://g.page/r/CbEssiIgFwRSEBM/review"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave Us a Google Review <Star size={17} />
            </a>

            <a
              className="btn dark"
              href="https://www.google.com/search?q=SP+TV+Installer+reviews"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Google Reviews <ArrowRight size={17} />
            </a>
          </div>

          <p
            style={{
              fontSize: '14px',
              marginTop: '20px',
              opacity: 0.75,
            }}
          >
            Already had your TV installed by our team?
            We would appreciate your honest feedback.
          </p>
        </section>

        <section id="areas" className="section wrap extraSection">
          <div className="eyebrow">WHERE WE WORK</div>
          <h2>TV mounting across the GTA and Greater Houston.</h2>
          <p>
            Serving Toronto and communities within approximately 200 km,
            plus Houston and surrounding areas. Availability is confirmed
            for each address.
          </p>

          <div className="areaGrid">
            <div>
              <h3>Ontario, Canada</h3>
              <p>
                Toronto, Etobicoke, North York, Scarborough, Mississauga,
                Brampton, Vaughan, Markham, Richmond Hill, Oakville,
                Burlington, Milton, Hamilton, Stoney Creek, St. Catharines,
                Niagara Falls, Ajax, Pickering, Whitby, Oshawa, Newmarket,
                Aurora, Caledon, Bolton, Georgetown, Guelph, Cambridge,
                Kitchener, Waterloo, Brantford, Stratford, Barrie, Innisfil,
                Bradford, Orangeville and nearby communities.
              </p>
              <div>
                <Link href="/locations/toronto">
                  Toronto & GTA TV mounting →
                </Link>
              </div>
              <div>
                <Link href="/locations/kitchener-waterloo">
                  Kitchener, Waterloo & Cambridge TV mounting →
                </Link>
              </div>
            </div>

            <div>
              <h3>Texas, USA</h3>
              <p>
                Houston, Katy, Cypress, Sugar Land, Richmond, Rosenberg,
                Fulshear, Missouri City, Pearland, Friendswood, League City,
                Webster, Pasadena, Deer Park, Baytown, Channelview, Humble,
                Kingwood, Atascocita, Spring, The Woodlands, Tomball,
                Magnolia, Conroe, Stafford, Bellaire, West University Place
                and nearby communities.
              </p>
              <Link href="/locations/houston">
                Houston service details →
              </Link>
            </div>
          </div>
        </section>

        <section id="why" className="bottomCta wrap">
          <div>
            <div className="eyebrow light">YOUR SPACE, ELEVATED</div>
            <h2>
              Ready for a cleaner,
              <br />
              more beautiful setup?
            </h2>
            <p>Let’s get your TV exactly where it belongs.</p>
            <Link href="/book" className="btn gold">
              Schedule installation <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <section id="projects" className="section wrap">
          <div className="eyebrow">OUR RECENT WORK</div>
          <h2>Real installations. Beautiful results.</h2>
          <p>
            From clean TV mounting to custom entertainment spaces,
            explore our recent projects.
          </p>
          <div className="projectStats">
            <div>
              <strong>5,000+</strong>
              <span>TVs mounted</span>
            </div>
            <div>
              <strong>100+</strong>
              <span>Custom home theatres built</span>
            </div>
          </div>

          <div className="projectGallery">
            {[
              'project-01.jpg',
              'project-03.jpg',
              'project-04.jpg',
              'project-05.jpg',
              'project-06.jpg',
              'project-07.jpg',
              'project-08.jpg',
              'project-09.jpg',
              'project-10.jpg',
              'project-11.jpg',
              'project-12.jpg',
              'project-13.jpg',
            ].map((file) => (
              <figure key={file}>
                <img
                  src={`/projects/${file}`}
                  alt="SP TV Installer recent TV mounting and entertainment installation project"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>
      </main>

      <WhatsAppButton />

      <footer className="footer wrap">
        <div className="brand">
          <span className="brandmark">SP</span>
          <span>TV <b>INSTALLER</b></span>
        </div>
        <p>
          Professional TV mounting · Canada & USA ·{' '}
          <a href="tel:+12263367339">(226) 336-7339</a>
          {' '}·{' '}
          <a href="mailto:info@sptvinstaller.com">
            info@sptvinstaller.com
          </a>
        </p>
        <span>© {new Date().getFullYear()} SP TV Installer</span>
      </footer>
    </>
  );
}
