import { useEffect, useState } from 'react'

type IconName = 'arrow' | 'search' | 'menu' | 'close' | 'globe' | 'play' | 'plus'

const icon = (name: IconName) => {
  const paths: Record<IconName, string> = {
    arrow: 'M4 12h15m-6-6 6 6-6 6',
    search: 'm19 19-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z',
    menu: 'M4 7h16M4 12h16M4 17h16',
    close: 'm6 6 12 12M18 6 6 18',
    globe:
      'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.2-2.45 3.3-5.45 3.3-9S14.2 5.45 12 3m0 18c-2.2-2.45-3.3-5.45-3.3-9S9.8 5.45 12 3M3 12h18',
    play: 'm9 6 9 6-9 6V6Z',
    plus: 'M12 5v14M5 12h14',
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  )
}

const heroSlides = [
  {
    eyebrow: 'The next horizon is open',
    title: 'Make tomorrow\nuseful.',
    text: 'We pair human imagination with intelligent technology to help ambitious organizations move with clarity, confidence, and momentum.',
    image:
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1800&q=85',
  },
  {
    eyebrow: 'Signal over noise',
    title: 'Build what\nmatters next.',
    text: 'From first insight to lasting impact, Northstar helps teams turn complex possibilities into practical progress.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85',
  },
  {
    eyebrow: 'A better kind of scale',
    title: 'Grow with\npurpose.',
    text: 'Connected experiences, resilient systems, and a culture of learning for the pace of a changing world.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=85',
  },
]

const capabilities = [
  [
    '01',
    'Intelligent products',
    'Transform bold ideas into products people return to.',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
  ],
  [
    '02',
    'Digital foundations',
    'Make every layer of your business faster, safer, and more adaptable.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
  ],
  [
    '03',
    'Experience design',
    'Create human moments that make complex things feel simple.',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80',
  ],
  [
    '04',
    'Responsible AI',
    'Put intelligence to work with context, care, and accountability.',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80',
  ],
]

const industries = [
  'Financial services',
  'Healthcare',
  'Manufacturing',
  'Mobility',
  'Retail & brands',
  'Energy & climate',
]

const industryImages = [
  'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
]

const pageContent: Record<
  string,
  {
    eyebrow: string
    title: string
    intro: string
    items: string[]
    image: string
  }
> = {
  about: {
    eyebrow: 'Northstar / who we are',
    title: 'A different\nkind of partner.',
    intro:
      'Northstar is a global transformation studio helping organizations turn important ideas into useful, lasting change.',
    items: [
      'People first, always',
      'Independent thinking, connected delivery',
      'Progress measured in the real world',
    ],
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85',
  },
  capabilities: {
    eyebrow: 'Northstar / what we do',
    title: 'Make complexity\nwork harder.',
    intro:
      'Our capabilities bring strategy, design, engineering, and intelligence together around the moments that matter most.',
    items: [
      'Strategy & advisory',
      'Products & experiences',
      'Data, cloud & platforms',
      'Responsible intelligence',
    ],
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85',
  },
  industries: {
    eyebrow: 'Northstar / industries',
    title: 'Context changes\neverything.',
    intro:
      'Deep understanding of the systems, pressures, and possibilities shaping the sectors we serve.',
    items: [
      'Financial services',
      'Healthcare',
      'Manufacturing',
      'Mobility',
      'Retail & brands',
      'Energy & climate',
    ],
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=85',
  },
  insights: {
    eyebrow: 'Northstar / ideas & insights',
    title: 'A clearer view\nof what is next.',
    intro:
      'Research, stories, and honest points of view for leaders navigating the spaces between now and next.',
    items: [
      'The signal report',
      'Field notes',
      'Studio conversations',
      'Briefing room',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=85',
  },
  careers: {
    eyebrow: 'Northstar / careers',
    title: 'Come build\nwhat matters.',
    intro:
      'Bring your point of view, your questions, and your appetite for making useful things with good people.',
    items: ['Designers', 'Engineers', 'Strategists', 'Researchers'],
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=85',
  },
  contact: {
    eyebrow: 'Northstar / contact',
    title: 'Let’s find\na way forward.',
    intro:
      'Tell us what you are trying to change. We will bring the right minds to the conversation.',
    items: [
      'hello@northstar.digital',
      '+1 212 555 0198',
      'New York · London · Singapore',
    ],
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85',
  },
}

type PageName = keyof typeof pageContent

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    ['Who we are', 'about'],
    ['What we do', 'capabilities'],
    ['Industries', 'industries'],
    ['Ideas & insights', 'insights'],
    ['Careers', 'careers'],
  ]

  return (
    <>
      <div className="utility">
        <span>Northstar Digital Group</span>
        <div className="utility-links">
          <span>Investor relations</span>
          <span>Perspectives</span>
          <span>
            {icon('globe')} Global / EN
          </span>
        </div>
      </div>

      <header className={scrolled ? 'header is-scrolled' : 'header'}>
        <a href="#/home" className="brand" aria-label="Northstar home">
          <span className="brand-mark">N</span>
          <span>
            northstar<span className="brand-dot">.</span>
          </span>
        </a>

        <nav className="desktop-nav">
          {navItems.map(([label, route]) => (
            <a href={`#/${route}`} key={route}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-button" aria-label="Search">
            {icon('search')}
          </button>
          <a className="contact-link" href="#/contact">
            Let's talk <span>{icon('arrow')}</span>
          </a>
          <button
            className="menu-trigger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {icon(menuOpen ? 'close' : 'menu')}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-inner">
            <p className="eyebrow light">Explore Northstar</p>
            {navItems.map(([label, route]) => (
              <a
                href={`#/${route}`}
                key={route}
                onClick={() => setMenuOpen(false)}
              >
                {label}
                <span>{icon('arrow')}</span>
              </a>
            ))}
            <a href="#/contact" className="mobile-talk">
              Start a conversation <span>{icon('arrow')}</span>
            </a>
          </div>
        </div>
      )}
    </>
  )
}

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="#/home" className="brand brand-footer">
          <span className="brand-mark">N</span>
          <span>
            northstar<span className="brand-dot">.</span>
          </span>
        </a>
        <p>
          Human ingenuity,
          <br />
          made useful.
        </p>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Northstar Digital Group</span>
        <div>
          <a href="#/contact">Privacy</a>
          <a href="#/contact">Accessibility</a>
          <a href="#/contact">LinkedIn</a>
        </div>
        <a href="#top" className="back-top">
          Back to top {icon('arrow')}
        </a>
      </div>
    </footer>
  )
}

function InspiredPage({ page }: { page: PageName }) {
  const content = pageContent[page]

  return (
    <div className="inspired-page">
      <section
        className="page-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(11,13,16,.92), rgba(11,13,16,.38)), url(${content.image})`,
        }}
      >
        <div>
          <p className="eyebrow light">{content.eyebrow}</p>
          <h1>
            {content.title.split('\n').map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero-copy">{content.intro}</p>
          <a className="button button-lime" href="#page-detail">
            Explore the view <span>{icon('arrow')}</span>
          </a>
        </div>
      </section>

      <section className="page-detail section-pad" id="page-detail">
        <div className="section-label">
          <span>01</span>
          <span>Northstar / original perspective</span>
        </div>
        <div className="intro-grid">
          <h2>
            Useful ideas for
            <br />
            <em>the next chapter.</em>
          </h2>
          <div>
            <p className="lead">{content.intro}</p>
            <div className="page-items">
              {content.items.map((item, index) => (
                <a href="#/contact" key={item}>
                  <span>0{index + 1}</span>
                  {item}
                  <span>{icon('arrow')}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="statement">
        <div className="statement-orbit" />
        <div className="statement-content">
          <p className="eyebrow light">A point of view</p>
          <h2>
            Make the future
            <br />
            <em>feel closer.</em>
          </h2>
          <p>
            We bring the right questions, disciplines, and people together to
            make meaningful progress tangible.
          </p>
          <a className="button button-outline" href="#/home">
            Back to Northstar <span>{icon('arrow')}</span>
          </a>
        </div>
      </section>
    </div>
  )
}

function HomePage() {
  const [slide, setSlide] = useState(0)
  const [activeIndustry, setActiveIndustry] = useState(0)
  const current = heroSlides[slide]

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((currentSlide) => (currentSlide + 1) % heroSlides.length),
      6500,
    )

    return () => window.clearInterval(timer)
  }, [])

  return (
    <main id="top">
      <section className="hero">
        <div
          className="hero-image"
          style={{ backgroundImage: `url(${current.image})` }}
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="eyebrow light">{current.eyebrow}</p>
          <h1>
            {current.title.split('\n').map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero-copy">{current.text}</p>
          <a className="button button-lime" href="#about">
            Discover our point of view <span>{icon('arrow')}</span>
          </a>
        </div>

        <div className="hero-meta">
          <span>00{slide + 1}</span>
          <div className="hero-lines">
            {heroSlides.map((heroSlide, index) => (
              <button
                className={index === slide ? 'active' : ''}
                key={heroSlide.eyebrow}
                onClick={() => setSlide(index)}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
          <span>03</span>
        </div>

        <div className="scroll-cue">
          <span>Scroll to explore</span>
          <i />
        </div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="section-label">
          <span>01</span>
          <span>Northstar / a better direction</span>
        </div>
        <div className="intro-grid">
          <h2>
            Technology should
            <br />
            <em>feel like progress.</em>
          </h2>
          <div className="intro-body">
            <p className="lead">
              We are a global team of strategists, designers, engineers, and
              curious minds. Together, we turn the promise of technology into
              outcomes that make life and business better.
            </p>
            <a className="text-link" href="#capabilities">
              Meet Northstar <span>{icon('arrow')}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="marquee">
        <div>
          MAKE THE COMPLEX <span>•</span> POSSIBLE <span>•</span> MAKE THE
          COMPLEX <span>•</span> POSSIBLE <span>•</span>
        </div>
      </section>

      <section className="capabilities section-pad" id="capabilities">
        <div className="section-label">
          <span>02</span>
          <span>What we do / capabilities</span>
        </div>
        <div className="section-heading">
          <h2>
            From signal
            <br />
            <em>to significance.</em>
          </h2>
          <p>
            Practical expertise for the decisions that shape what comes next.
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map(([number, title, text, image]) => (
            <article className="capability-card" key={number}>
              <div
                className="card-image"
                style={{ backgroundImage: `url(${image})` }}
              >
                <span>{number}</span>
                <span className="card-plus">{icon('plus')}</span>
              </div>
              <div className="card-copy">
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#contact" aria-label={`Learn more about ${title}`}>
                  {icon('arrow')}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="statement">
        <div className="statement-orbit" />
        <div className="statement-content">
          <p className="eyebrow light">The Northstar promise</p>
          <h2>
            Different perspectives.
            <br />
            <em>One clear direction.</em>
          </h2>
          <p>
            We believe the most durable progress happens when people, planet,
            and performance move forward together.
          </p>
          <a className="button button-outline" href="#contact">
            Our approach <span>{icon('arrow')}</span>
          </a>
        </div>
      </section>

      <section className="industries section-pad" id="industries">
        <div className="section-label">
          <span>03</span>
          <span>Where we focus / industries</span>
        </div>
        <div className="industry-layout">
          <div className="industry-list">
            {industries.map((industry, index) => (
              <button
                key={industry}
                className={
                  activeIndustry === index
                    ? 'industry-item active'
                    : 'industry-item'
                }
                onClick={() => setActiveIndustry(index)}
              >
                <span>0{index + 1}</span>
                {industry}
                <span className="industry-arrow">{icon('arrow')}</span>
              </button>
            ))}
          </div>
          <div
            className="industry-image"
            style={{
              backgroundImage: `url(${industryImages[activeIndustry]})`,
            }}
          >
            <div className="industry-caption">
              <p>Perspective {activeIndustry + 1}</p>
              <h3>
                Building a more human future for{' '}
                {industries[activeIndustry].toLowerCase()}.
              </h3>
              <a href="#insights">
                Explore the work <span>{icon('arrow')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="insights section-pad" id="insights">
        <div className="section-label">
          <span>04</span>
          <span>Ideas & insights / perspectives</span>
        </div>
        <div className="section-heading">
          <h2>
            Stay curious.
            <br />
            <em>Go further.</em>
          </h2>
          <a className="text-link" href="#insights">
            View all insights <span>{icon('arrow')}</span>
          </a>
        </div>
        <div className="insight-grid">
          <article className="insight-feature">
            <div
              className="insight-image"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80)',
              }}
            />
            <p className="eyebrow">Field notes / 06.18.26</p>
            <h3>Why the best AI strategies start with a better question.</h3>
            <a href="#contact">
              Read perspective <span>{icon('arrow')}</span>
            </a>
          </article>

          <div className="insight-stack">
            <article>
              <span className="insight-number">01</span>
              <p className="eyebrow">Research report</p>
              <h3>The quiet revolution in customer experience</h3>
              <a href="#contact">
                Read more <span>{icon('arrow')}</span>
              </a>
            </article>
            <article>
              <span className="insight-number">02</span>
              <p className="eyebrow">Point of view</p>
              <h3>Designing resilient businesses in an uncertain world</h3>
              <a href="#contact">
                Read more <span>{icon('arrow')}</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="careers" id="careers">
        <div className="career-image" />
        <div className="career-copy">
          <p className="eyebrow">05 / Careers</p>
          <h2>
            Bring your
            <br />
            <em>whole self.</em>
          </h2>
          <p>
            Big questions need different minds. Join a team where your
            curiosity has room to become something real.
          </p>
          <a className="button button-lime" href="#contact">
            Find your place <span>{icon('arrow')}</span>
          </a>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-inner">
          <p className="eyebrow">Have a good question?</p>
          <h2>
            Let's make a
            <br />
            <em>new direction.</em>
          </h2>
          <a
            className="contact-arrow"
            href="mailto:hello@northstar.digital"
            aria-label="Email Northstar"
          >
            {icon('arrow')}
          </a>
          <p className="contact-email">hello@northstar.digital</p>
        </div>
      </section>
    </main>
  )
}

function App() {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash
    return hash.startsWith('#/')
      ? hash.replace('#/', '').split('/')[0] || 'home'
      : 'home'
  })

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash
      setRoute(
        hash.startsWith('#/')
          ? hash.replace('#/', '').split('/')[0] || 'home'
          : 'home',
      )
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const isInspiredPage = route !== 'home' && route in pageContent

  return (
    <div className="site-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&display=swap');

        :root {
          --scarlet: #E11D2A;
          --scarlet-hover: #BF1420;
          --scarlet-accent: #FF3344;
          --scarlet-glow: rgba(225, 29, 42, 0.4);
          --ink: #111317;
          --muted: #6B7280;
          --white: #FFFFFF;
          --surface: #F8F9FA;
          --line: rgba(17, 19, 23, 0.12);
          --dark: #0B0D10;
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; color: var(--ink); background: var(--white); font-family: "DM Sans", sans-serif; }
        a { color: inherit; text-decoration: none; }
        button { color: inherit; font: inherit; }
        svg { width: 1.25rem; height: 1.25rem; display: block; }
        .site-shell { overflow: hidden; background: var(--white); }
        .utility { height: 34px; padding: 0 5vw; display: flex; align-items: center; justify-content: space-between; background: var(--dark); color: #E5E7EB; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,.07); }
        .utility-links { display: flex; gap: 24px; align-items: center; }
        .utility-links span { display: flex; gap: 6px; align-items: center; cursor: pointer; transition: color .2s; }
        .utility-links span:hover { color: var(--scarlet-accent); }
        .utility-links svg { width: 13px; height: 13px; }
        .header { height: 82px; padding: 0 5vw; display: flex; align-items: center; justify-content: space-between; position: absolute; z-index: 5; width: 100%; color: white; transition: .3s ease; }
        .header.is-scrolled { position: fixed; top: 0; background: rgba(11,13,16,.96); backdrop-filter: blur(12px); height: 68px; border-bottom: 1px solid rgba(225,29,42,.2); }
        .brand { display: flex; gap: 10px; align-items: center; font-size: 20px; font-weight: 600; letter-spacing: -.06em; color: white; }
        .brand-mark { width: 29px; height: 29px; display: grid; place-items: center; background: var(--scarlet); color: white; font-size: 17px; font-weight: 700; border-radius: 2px; }
        .brand-dot { color: var(--scarlet); }
        .desktop-nav { display: flex; gap: clamp(18px, 2.4vw, 42px); margin-left: auto; margin-right: 5vw; font-size: 12px; }
        .desktop-nav a, .footer a { transition: color .2s, opacity .2s; }
        .desktop-nav a:hover, .footer a:hover { color: var(--scarlet-accent); opacity: 1; }
        .header-actions { display: flex; gap: 24px; align-items: center; }
        .icon-button, .menu-trigger { padding: 0; border: 0; background: transparent; cursor: pointer; color: inherit; transition: color .2s; }
        .icon-button:hover, .menu-trigger:hover { color: var(--scarlet-accent); }
        .icon-button svg, .menu-trigger svg { width: 20px; height: 20px; }
        .contact-link { display: flex; gap: 8px; align-items: center; font-size: 13px; transition: color .2s; }
        .contact-link:hover { color: var(--scarlet-accent); }
        .contact-link svg, .text-link svg, .button svg, .card-copy a svg, .industry-caption a svg, .insight-grid a svg { width: 18px; }
        .menu-trigger { display: none; }
        .mobile-menu { position: fixed; inset: 68px 0 0; z-index: 4; background: var(--dark); color: white; }
        .mobile-menu-inner { padding: 48px 8vw; display: flex; flex-direction: column; }
        .mobile-menu a { padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,.15); display: flex; justify-content: space-between; font-size: 25px; transition: color .2s; }
        .mobile-menu a:hover { color: var(--scarlet-accent); }
        .mobile-menu a svg { width: 21px; }
        .mobile-talk { color: var(--scarlet) !important; margin-top: 18px; border: 0 !important; font-size: 18px !important; }
        .eyebrow { margin: 0 0 25px; color: var(--muted); font-size: 10px; letter-spacing: .16em; text-transform: uppercase; font-weight: 600; }
        .eyebrow.light { color: var(--scarlet-accent); }
        .hero, .page-hero { min-height: min(780px, 92vh); height: 780px; position: relative; color: white; background: var(--dark); }
        .hero-image, .hero-overlay { position: absolute; inset: 0; }
        .hero-image { background-size: cover; background-position: center; transition: background-image .7s ease; }
        .hero-overlay { background: linear-gradient(90deg, rgba(11,13,16,.88), rgba(225,29,42,.15) 65%, rgba(11,13,16,.3)); }
        .hero-content, .page-hero > div { position: absolute; left: 10vw; top: 50%; transform: translateY(-39%); max-width: 670px; }
        .page-hero { background-size: cover; background-position: center; }
        h1, h2, h3, p { margin-top: 0; }
        h1 { margin-bottom: 25px; font-size: clamp(55px, 8vw, 112px); line-height: .91; letter-spacing: -.075em; font-weight: 500; }
        h1 span, h2 span { display: block; }
        h2 { margin-bottom: 30px; font-size: clamp(43px, 5.5vw, 80px); line-height: .96; letter-spacing: -.07em; font-weight: 500; }
        em { font-family: "Playfair Display", serif; font-weight: 500; }
        .hero-copy { max-width: 440px; margin-bottom: 35px; color: rgba(255,255,255,.86); line-height: 1.55; font-size: 16px; }
        .button { display: inline-flex; gap: 30px; align-items: center; padding: 16px 19px; font-size: 12px; font-weight: 600; transition: all .2s ease; cursor: pointer; }
        .button-lime, .button-scarlet { background: var(--scarlet); color: white; }
        .button-lime:hover, .button-scarlet:hover { background: var(--scarlet-hover); transform: translateY(-2px); box-shadow: 0 8px 20px var(--scarlet-glow); }
        .button-outline { border: 1px solid rgba(255,255,255,.6); color: white; }
        .button-outline:hover { background: var(--scarlet); border-color: var(--scarlet); color: white; transform: translateY(-2px); box-shadow: 0 8px 20px var(--scarlet-glow); }
        .hero-meta { position: absolute; right: 5vw; bottom: 55px; display: flex; gap: 17px; align-items: center; font-size: 11px; }
        .hero-lines { display: flex; gap: 5px; }
        .hero-lines button { width: 48px; height: 2px; padding: 0; border: 0; background: rgba(255,255,255,.35); cursor: pointer; transition: background .2s; }
        .hero-lines button.active { background: var(--scarlet); }
        .scroll-cue { position: absolute; left: 5vw; bottom: 42px; display: flex; gap: 18px; align-items: center; color: rgba(255,255,255,.7); font-size: 10px; text-transform: uppercase; letter-spacing: .14em; }
        .scroll-cue i { width: 48px; height: 1px; background: var(--scarlet); }
        .section-pad { padding: 125px 10vw; }
        .section-label { display: flex; gap: 35px; margin-bottom: 75px; color: var(--muted); font-size: 10px; text-transform: uppercase; letter-spacing: .15em; font-weight: 600; }
        .section-label span:first-child { color: var(--scarlet); font-weight: 700; }
        .intro { background: var(--white); }
        .intro-grid, .section-heading { display: grid; grid-template-columns: 1fr 1fr; gap: 8vw; }
        .intro h2, .section-heading h2 { margin: 0; }
        .lead { max-width: 440px; margin: 8px 0 28px; font-size: 20px; line-height: 1.5; color: var(--ink); }
        .text-link, .card-copy a, .industry-caption a, .insight-grid a { display: inline-flex; gap: 14px; align-items: center; font-size: 12px; font-weight: 600; transition: color .2s; }
        .text-link { color: var(--scarlet); }
        .text-link:hover { color: var(--scarlet-hover); }
        .marquee { overflow: hidden; padding: 22px 0; background: var(--scarlet); color: white; white-space: nowrap; font-size: clamp(28px, 4vw, 58px); letter-spacing: -.05em; font-weight: 600; }
        .marquee div { animation: marquee 24s linear infinite; }
        .marquee span { margin: 0 18px; font-family: serif; }
        @keyframes marquee { to { transform: translateX(-35%); } }
        .capabilities { background: var(--white); }
        .section-heading { align-items: end; margin-bottom: 65px; }
        .section-heading p { max-width: 250px; margin-bottom: 7px; color: var(--muted); line-height: 1.5; }
        .capability-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .card-image { aspect-ratio: .78; position: relative; background-size: cover; background-position: center; color: white; overflow: hidden; }
        .card-image:after, .industry-image:after, .career-image:after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.2), transparent 50%, rgba(0,0,0,.6)); }
        .card-image > span { position: absolute; z-index: 1; top: 18px; left: 18px; font-size: 11px; font-weight: 600; }
        .card-image .card-plus { right: 17px; left: auto; transition: color .2s, transform .2s; }
        .capability-card:hover .card-plus { color: var(--scarlet-accent); transform: rotate(90deg); }
        .card-plus svg { width: 20px; }
        .card-copy { padding: 21px 3px; position: relative; }
        .card-copy h3 { margin-bottom: 9px; font-size: 17px; letter-spacing: -.04em; }
        .card-copy p { min-height: 48px; margin-bottom: 18px; color: var(--muted); font-size: 13px; line-height: 1.45; }
        .card-copy a { color: var(--ink); }
        .card-copy a:hover { color: var(--scarlet); }
        .statement { min-height: 650px; padding: 110px 10vw; position: relative; overflow: hidden; display: grid; place-items: center; background: var(--dark); color: white; text-align: center; }
        .statement-orbit { position: absolute; width: 850px; height: 360px; border: 1px solid rgba(225,29,42,.5); border-radius: 50%; transform: rotate(-22deg); }
        .statement-orbit:after { content: ""; position: absolute; inset: 35px -70px; border: 1px solid rgba(225,29,42,.2); border-radius: 50%; }
        .statement-content { position: relative; max-width: 680px; }
        .statement-content h2 { margin-bottom: 25px; }
        .statement-content > p:not(.eyebrow) { max-width: 450px; margin: 0 auto 32px; color: #D1D5DB; line-height: 1.55; }
        .industries { background: var(--surface); }
        .industry-layout { display: grid; grid-template-columns: .8fr 1.2fr; gap: 7vw; }
        .industry-item { width: 100%; padding: 20px 0; display: grid; grid-template-columns: 45px 1fr 25px; align-items: center; border: 0; border-top: 1px solid var(--line); background: transparent; text-align: left; cursor: pointer; font-size: clamp(17px, 2vw, 25px); letter-spacing: -.05em; transition: color .2s, padding-left .2s; color: var(--ink); }
        .industry-item:last-child { border-bottom: 1px solid var(--line); }
        .industry-item > span:first-child { color: var(--muted); font-size: 10px; letter-spacing: 0; }
        .industry-arrow { opacity: 0; transition: .2s; }
        .industry-item:hover { color: var(--scarlet); padding-left: 8px; }
        .industry-item.active { color: var(--scarlet); font-weight: 600; padding-left: 8px; }
        .industry-item.active .industry-arrow { opacity: 1; color: var(--scarlet); }
        .industry-image { min-height: 480px; position: relative; background-size: cover; background-position: center; color: white; display: flex; align-items: end; transition: background-image .4s; }
        .industry-caption { z-index: 1; padding: 35px; }
        .industry-caption p { margin-bottom: 17px; color: var(--scarlet-accent); font-size: 10px; text-transform: uppercase; letter-spacing: .15em; font-weight: 600; }
        .industry-caption h3 { max-width: 460px; margin-bottom: 25px; font-size: clamp(25px, 3vw, 42px); line-height: 1; letter-spacing: -.06em; font-weight: 500; }
        .industry-caption a { color: white; transition: color .2s; }
        .industry-caption a:hover { color: var(--scarlet-accent); }
        .insights { background: var(--white); }
        .insights .section-heading { align-items: center; }
        .insight-grid { display: grid; grid-template-columns: 1.25fr .75fr; gap: 7vw; }
        .insight-image { aspect-ratio: 1.65; margin-bottom: 24px; background-size: cover; background-position: center; }
        .insight-feature h3 { max-width: 600px; margin-bottom: 20px; font-size: clamp(27px, 3.3vw, 45px); line-height: 1; letter-spacing: -.06em; font-weight: 500; }
        .insight-feature > a { display: inline-flex; gap: 12px; align-items: center; font-size: 12px; font-weight: 600; color: var(--scarlet); transition: color .2s; }
        .insight-feature > a:hover { color: var(--scarlet-hover); }
        .insight-stack article { padding: 23px 0 35px; border-top: 1px solid var(--line); }
        .insight-number { float: right; color: var(--scarlet); font-size: 11px; font-weight: 700; }
        .insight-stack h3 { max-width: 310px; margin: 0 0 25px; font-size: 23px; line-height: 1.05; letter-spacing: -.05em; font-weight: 500; }
        .insight-stack article a { color: var(--ink); transition: color .2s; }
        .insight-stack article a:hover { color: var(--scarlet); }
        .careers { display: grid; grid-template-columns: 1fr 1fr; background: var(--scarlet); color: white; }
        .career-image { min-height: 600px; position: relative; background: url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85') center/cover; }
        .career-copy { padding: 110px 10vw; color: white; }
        .career-copy .eyebrow { color: rgba(255, 255, 255, 0.85); }
        .career-copy h2 { margin-bottom: 25px; }
        .career-copy > p:not(.eyebrow) { max-width: 350px; margin-bottom: 32px; line-height: 1.55; color: rgba(255, 255, 255, 0.9); }
        .careers .button { background: white; color: var(--scarlet); }
        .careers .button:hover { background: #F8F9FA; color: var(--scarlet-hover); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); }
        .contact { background: var(--surface); text-align: center; }
        .contact-inner { position: relative; }
        .contact h2 { font-size: clamp(55px, 8vw, 110px); }
        .contact-arrow { width: 70px; height: 70px; margin: 20px auto; display: grid; place-items: center; border-radius: 50%; background: var(--scarlet); color: white; transition: all .25s ease; box-shadow: 0 8px 24px var(--scarlet-glow); }
        .contact-arrow:hover { background: var(--scarlet-hover); transform: scale(1.08); box-shadow: 0 12px 30px var(--scarlet-glow); }
        .contact-arrow svg { width: 28px; }
        .contact-email { margin: 18px 0 0; font-size: 13px; font-weight: 500; }
        .page-detail { background: var(--white); }
        .page-items { border-top: 1px solid var(--line); }
        .page-items a { display: grid; grid-template-columns: 42px 1fr 24px; gap: 12px; align-items: center; padding: 18px 0; border-bottom: 1px solid var(--line); font-size: 15px; transition: color .2s; }
        .page-items a:hover { color: var(--scarlet); }
        .page-items a > span:first-child { color: var(--muted); font-size: 10px; }
        .page-items a:hover > span:first-child { color: var(--scarlet); }
        .page-items a svg { width: 18px; transition: transform .2s; }
        .page-items a:hover svg { transform: translateX(4px); }
        .footer { padding: 60px 5vw 28px; background: var(--dark); color: white; border-top: 1px solid rgba(225,29,42,.2); }
        .footer-top { display: flex; align-items: start; justify-content: space-between; padding-bottom: 100px; }
        .brand-footer { color: white; }
        .footer-top p { color: var(--scarlet-accent); font-family: "Playfair Display", serif; font-size: 27px; line-height: 1; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; color: #9CA3AF; font-size: 10px; }
        .footer-bottom div { display: flex; gap: 25px; }
        .back-top { display: flex; gap: 10px; align-items: center; color: white; transition: color .2s; }
        .back-top:hover { color: var(--scarlet-accent); }
        .back-top svg { width: 15px; transform: rotate(-90deg); }

        @media (max-width: 900px) {
          .desktop-nav, .contact-link, .icon-button { display: none; }
          .menu-trigger { display: block; }
          .hero, .page-hero { height: 720px; }
          .hero-content, .page-hero > div { left: 8vw; right: 8vw; }
          .section-pad { padding: 90px 8vw; }
          .capability-grid { grid-template-columns: repeat(2, 1fr); }
          .industry-layout, .insight-grid { grid-template-columns: 1fr; gap: 45px; }
          .industry-image { min-height: 420px; }
          .careers { grid-template-columns: 1fr; }
          .career-image { min-height: 420px; }
          .career-copy { padding: 80px 8vw; }
        }

        @media (max-width: 600px) {
          .utility { padding: 0 6vw; }
          .utility > span { font-size: 9px; }
          .utility-links span:not(:last-child) { display: none; }
          .header { padding: 0 6vw; }
          .hero, .page-hero { min-height: 680px; height: 88vh; }
          .hero-content, .page-hero > div { top: 47%; }
          .hero-copy { font-size: 14px; }
          .hero-meta { right: 6vw; bottom: 30px; }
          .scroll-cue { left: 6vw; bottom: 30px; }
          .scroll-cue span { display: none; }
          h1 { font-size: clamp(54px, 16vw, 82px); }
          .section-pad { padding: 75px 6vw; }
          .section-label { margin-bottom: 48px; }
          .intro-grid, .section-heading { grid-template-columns: 1fr; gap: 25px; }
          .lead { font-size: 18px; }
          .capability-grid { grid-template-columns: 1fr 1fr; gap: 20px 10px; }
          .card-image { aspect-ratio: .82; }
          .card-copy h3 { font-size: 15px; }
          .card-copy p { min-height: auto; font-size: 12px; }
          .statement { min-height: 570px; padding: 75px 8vw; }
          .statement-orbit { width: 600px; height: 280px; }
          .industry-image { min-height: 390px; }
          .industry-caption { padding: 25px; }
          .insight-grid { gap: 35px; }
          .career-image { min-height: 300px; }
          .footer-top { padding-bottom: 70px; }
          .footer-bottom { flex-wrap: wrap; gap: 22px; }
          .footer-bottom div { order: 3; width: 100%; }
          .footer-top p { font-size: 22px; }
        }
      `}</style>

      <SiteHeader />
      {isInspiredPage ? (
        <InspiredPage page={route as PageName} />
      ) : (
        <HomePage />
      )}
      <SiteFooter />
    </div>
  )
}

export default App
