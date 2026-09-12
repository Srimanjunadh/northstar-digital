import { useEffect, useRef, useState } from 'react'

// Configuration for image placeholder mode
const TEMP_IMAGE_SRC = '/temp-image.png'

type PageRoute = 'home' | 'about' | 'capabilities' | 'industries' | 'insights' | 'careers' | 'contact'

type IconName =
  | 'arrow-right'
  | 'chevron-left'
  | 'chevron-right'
  | 'search'
  | 'menu'
  | 'close'
  | 'globe'
  | 'play'
  | 'external'
  | 'cpu'
  | 'cloud'
  | 'shield'
  | 'chart'
  | 'layers'
  | 'activity'
  | 'factory'
  | 'car'
  | 'heart'
  | 'shopping'
  | 'zap'
  | 'phone'
  | 'email'
  | 'award'
  | 'users'
  | 'check'

function Icon({ name, className = 'w-4 h-4' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, JSX.Element> = {
    'arrow-right': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    ),
    'chevron-left': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    ),
    'chevron-right': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    ),
    search: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
    ),
    menu: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    ),
    close: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    ),
    globe: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    ),
    play: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    ),
    external: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    ),
    cpu: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    ),
    cloud: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
    ),
    shield: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
    chart: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    ),
    layers: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    ),
    activity: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
    factory: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    ),
    car: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zM3 9l2.5-5h13L21 9v8a1 1 0 01-1 1h-1a2 2 0 01-4 0H9a2 2 0 01-4 0H4a1 1 0 01-1-1V9z" />
    ),
    heart: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    ),
    shopping: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    ),
    zap: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
    phone: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
    email: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    award: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V4m0 4l3-3m-3 3l-3-3m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    users: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
    check: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    ),
  }

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths[name]}
    </svg>
  )
}

// -------------------------------------------------------------
// ImageBox Component:
// Signature Norstar White & Red design system with subtle corner markers,
// crisp white surface, and red badge housing the user's uploaded temp image.
// -------------------------------------------------------------
interface ImageBoxProps {
  label?: string
  aspectRatio?: string
  className?: string
  dark?: boolean
  imageSrc?: string
}

function ImageBox({
  label = 'Image Box',
  aspectRatio = 'aspect-[16/9]',
  className = '',
  dark = false,
  imageSrc = TEMP_IMAGE_SRC,
}: ImageBoxProps) {
  const isRealPhoto = imageSrc && imageSrc !== TEMP_IMAGE_SRC

  return (
    <div
      className={`relative group overflow-hidden select-none flex items-center justify-center transition-all duration-300 ${aspectRatio} ${className} ${
        dark
          ? 'bg-neutral-900/95 border border-red-500/20 text-white/50'
          : 'bg-white border border-neutral-200/90 shadow-sm hover:border-[#DE0826] text-neutral-400'
      }`}
    >
      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-[#DE0826] opacity-60 z-20" />
      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-[#DE0826] opacity-60 z-20" />
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-[#DE0826] opacity-60 z-20" />
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-[#DE0826] opacity-60 z-20" />

      {isRealPhoto ? (
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={imageSrc}
            alt={label}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {label && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 pt-6 flex items-end">
              <span className="text-[11px] font-semibold text-white tracking-wide">
                {label}
              </span>
            </div>
          )}
        </div>
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #DE0826 1px, transparent 0)',
              backgroundSize: '16px 16px',
            }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
            <div
              className={`relative rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-105 shadow-md ${
                dark ? 'bg-[#DE0826] text-white' : 'bg-[#DE0826] text-white'
              } w-16 h-16 md:w-20 md:h-20`}
            >
              <img
                src={imageSrc}
                alt={label}
                className="w-full h-full object-contain p-2 filter invert"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
            {label && (
              <span className="mt-2.5 text-[10px] tracking-wider uppercase font-semibold text-gray-500 group-hover:text-[#DE0826] transition-colors">
                {label}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// -------------------------------------------------------------
// -------------------------------------------------------------
// Site Search Directory (Intelligent Search Index)
// -------------------------------------------------------------
interface SearchResultItem {
  title: string
  category: string
  route: PageRoute
  description: string
  keywords: string[]
}

const siteSearchIndex: SearchResultItem[] = [
  {
    title: 'Careers & Job Opportunities',
    category: 'Careers',
    route: 'careers',
    description: 'Explore rewarding careers and leadership pathways across 90+ countries with Tech Mahindra.',
    keywords: ['job', 'jobs', 'career', 'careers', 'hiring', 'openings', 'work', 'join', 'culture', 'vacancies'],
  },
  {
    title: 'The TechM Way & Diversity Culture',
    category: 'Careers',
    route: 'careers',
    description: 'Our culture of freedom to explore, innovate, and rise together as limitless innovators.',
    keywords: ['culture', 'techm way', 'diversity', 'inclusion', 'people', 'careers', 'growth'],
  },
  {
    title: 'About Tech Mahindra & Leadership',
    category: 'About Us',
    route: 'about',
    description: 'Corporate overview, executive leadership, Mahindra Group heritage, and sustainability initiatives.',
    keywords: ['mahindra', 'about', 'company', 'leadership', 'executives', 'brand', 'sustainability', 'heritage'],
  },
  {
    title: 'Scale at Speed™ & Corporate Brand',
    category: 'About Us',
    route: 'about',
    description: 'Our brand promise to help global enterprises scale at speed with agile, AI-first technologies.',
    keywords: ['mahindra', 'brand', 'scale at speed', 'promise', 'about', 'partner ecosystem'],
  },
  {
    title: 'Global Office Locations & Directory',
    category: 'Contact Us',
    route: 'contact',
    description: 'Browse 33+ country offices, addresses, direct contacts, and global delivery centers worldwide.',
    keywords: ['location', 'locations', 'office', 'offices', 'address', 'global', 'cities', 'where', 'dallas', 'london', 'headquarters'],
  },
  {
    title: 'Contact Us & Service Enquiries',
    category: 'Contact Us',
    route: 'contact',
    description: 'Get in touch with our solutions experts for service requests, vendor registration, or investor inquiries.',
    keywords: ['contact', 'email', 'phone', 'reach', 'enquiry', 'service request', 'touch', 'support', 'help'],
  },
  {
    title: 'Enterprise Digital Applications',
    category: 'Capabilities',
    route: 'capabilities',
    description: 'SAP, ServiceNow, Oracle, Microsoft Business Applications, Salesforce, and Pega ecosystems.',
    keywords: ['application', 'applications', 'enterprise applications', 'sap', 'servicenow', 'oracle', 'salesforce', 'pega', 'microsoft'],
  },
  {
    title: 'Agentic Development & Legacy Modernization',
    category: 'Capabilities',
    route: 'capabilities',
    description: 'Autonomous AI agents and intelligent code generation to modernize enterprise legacy architectures.',
    keywords: ['applications', 'modernization', 'agentic', 'development', 'software', 'cloud', 'devops', 'legacy'],
  },
  {
    title: 'Artificial Intelligence & Cognitive Solutions',
    category: 'Capabilities',
    route: 'capabilities',
    description: 'AI Delivered Right: Enterprise generative AI, cognitive architectures, and agentic workflows.',
    keywords: ['ai', 'artificial intelligence', 'genai', 'machine learning', 'cognitive', 'capabilities', 'makers lab'],
  },
  {
    title: 'Digital Core & Cloud Infrastructure',
    category: 'Capabilities',
    route: 'capabilities',
    description: 'Cloud consulting, hybrid infrastructure, 5G network services, and cyber security protection.',
    keywords: ['cloud', 'infrastructure', 'network', 'cyber security', 'telecom', 'core', 'services'],
  },
  {
    title: 'Communications & Telecom Solutions',
    category: 'Industries',
    route: 'industries',
    description: 'Next-generation network transformation, OSS/BSS modernization, 5G rollout, and telco AI.',
    keywords: ['telecom', 'communications', 'network', '5g', 'oss', 'bss', 'telco', 'industries'],
  },
  {
    title: 'Banking, Financial Services & Insurance (BFSI)',
    category: 'Industries',
    route: 'industries',
    description: 'Digital core banking, payment modernizations, fraud detection, and regulatory compliance.',
    keywords: ['banking', 'finance', 'financial', 'insurance', 'bfsi', 'fintech', 'industries'],
  },
  {
    title: 'Retail & Consumer Goods',
    category: 'Industries',
    route: 'industries',
    description: 'Store of the Future: omnichannel commerce, smart supply chains, and AI merchandising.',
    keywords: ['retail', 'consumer goods', 'store of the future', 'ecommerce', 'supply chain', 'industries'],
  },
  {
    title: 'Case Studies, Analyst Insights & Events',
    category: 'Insights',
    route: 'insights',
    description: 'Explore research reports, earnings announcements, client case studies, and Dreamforce 2026 highlights.',
    keywords: ['insights', 'case study', 'case studies', 'analyst', 'report', 'white paper', 'press release', 'news', 'events'],
  },
]

// -------------------------------------------------------------
// 1. Main Navigation Header with Full Mega-Menu System & Search
// Matching Tech Mahindra reference screenshots exactly
// -------------------------------------------------------------
interface NavbarProps {
  currentRoute: PageRoute
  onRouteChange: (route: PageRoute) => void
}

type MegaMenuTab = 'about' | 'capabilities' | 'industries' | 'insights' | 'careers' | null

function Navbar({ currentRoute, onRouteChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<MegaMenuTab>(null)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 60)
    }
  }, [searchOpen])

  // Escape key closes search and menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setOpenMenu(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavClick = (route: PageRoute) => {
    setOpenMenu(null)
    setSearchOpen(false)
    setMobileOpen(false)
    onRouteChange(route)
  }

  const handleMenuHover = (tab: MegaMenuTab) => {
    setSearchOpen(false)
    setOpenMenu(tab)
  }

  const closeMenu = () => {
    setOpenMenu(null)
  }

  const filteredResults = siteSearchIndex.filter((item) => {
    if (!searchQuery.trim()) return false
    const q = searchQuery.toLowerCase().trim()
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q))
    )
  })

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return
    if (filteredResults.length > 0) {
      const top = filteredResults[0]
      setSearchOpen(false)
      onRouteChange(top.route)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePopularTagClick = (_tag: string, route: PageRoute) => {
    setSearchOpen(false)
    onRouteChange(route)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header
        onMouseLeave={closeMenu}
        className={`fixed top-0 inset-x-0 w-full z-50 bg-white transition-all duration-200 border-b border-gray-200 ${
          scrolled ? 'shadow-md py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo with Red Geometric Emblem (Name collapses when scrolled) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group cursor-pointer border-0 bg-transparent text-left py-1"
          >
            <div className="flex items-center">
              {/* Red Emblem */}
              <svg
                viewBox="0 0 32 32"
                className="w-8 h-7 sm:w-9 sm:h-8 fill-[#DE0826] transition-transform duration-300 group-hover:scale-105 shrink-0"
              >
                <polygon points="0,10 32,0 32,22 0,32" />
              </svg>

              {/* Brand Name Text: Fades out and collapses when scrolled down */}
              <div
                className={`flex flex-col leading-none select-none transition-all duration-300 ease-in-out origin-left ${
                  scrolled
                    ? 'max-w-0 opacity-0 -translate-x-3 pointer-events-none overflow-hidden m-0'
                    : 'max-w-[160px] opacity-100 translate-x-0 ml-2.5 sm:ml-3 overflow-visible'
                }`}
              >
                <span className="font-extrabold text-sm tracking-tight text-gray-950 uppercase leading-none">
                  Nor<span className="text-[#DE0826]">star</span>
                </span>
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mt-0.5 leading-none">
                  Digital
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links with Mega-Menu Hover Triggers */}
          <nav className="hidden lg:flex items-center space-x-8 text-[13px] font-bold tracking-wider text-gray-900 uppercase">
            {/* ABOUT US */}
            <div
              className="relative py-3"
              onMouseEnter={() => handleMenuHover('about')}
            >
              <button
                onClick={() => handleNavClick('about')}
                className={`transition-colors cursor-pointer border-0 bg-transparent uppercase pb-1 ${
                  openMenu === 'about' || (openMenu === null && currentRoute === 'about')
                    ? 'text-gray-950 font-extrabold border-b-2 border-gray-950'
                    : 'text-gray-700 hover:text-gray-950'
                }`}
              >
                About Us
              </button>
            </div>

            {/* CAPABILITIES */}
            <div
              className="relative py-3"
              onMouseEnter={() => handleMenuHover('capabilities')}
            >
              <button
                onClick={() => handleNavClick('capabilities')}
                className={`transition-colors cursor-pointer border-0 bg-transparent uppercase pb-1 ${
                  openMenu === 'capabilities' ||
                  (openMenu === null && currentRoute === 'capabilities')
                    ? 'text-gray-950 font-extrabold border-b-2 border-gray-950'
                    : 'text-gray-700 hover:text-gray-950'
                }`}
              >
                Capabilities
              </button>
            </div>

            {/* INDUSTRIES */}
            <div
              className="relative py-3"
              onMouseEnter={() => handleMenuHover('industries')}
            >
              <button
                onClick={() => handleNavClick('industries')}
                className={`transition-colors cursor-pointer border-0 bg-transparent uppercase pb-1 ${
                  openMenu === 'industries' ||
                  (openMenu === null && currentRoute === 'industries')
                    ? 'text-gray-950 font-extrabold border-b-2 border-gray-950'
                    : 'text-gray-700 hover:text-gray-950'
                }`}
              >
                Industries
              </button>
            </div>

            {/* INSIGHTS */}
            <div
              className="relative py-3"
              onMouseEnter={() => handleMenuHover('insights')}
            >
              <button
                onClick={() => handleNavClick('insights')}
                className={`transition-colors cursor-pointer border-0 bg-transparent uppercase pb-1 ${
                  openMenu === 'insights' ||
                  (openMenu === null && currentRoute === 'insights')
                    ? 'text-gray-950 font-extrabold border-b-2 border-gray-950'
                    : 'text-gray-700 hover:text-gray-950'
                }`}
              >
                Insights
              </button>
            </div>

            {/* CAREERS */}
            <div
              className="relative py-3"
              onMouseEnter={() => handleMenuHover('careers')}
            >
              <button
                onClick={() => handleNavClick('careers')}
                className={`transition-colors cursor-pointer border-0 bg-transparent uppercase pb-1 ${
                  openMenu === 'careers' ||
                  (openMenu === null && currentRoute === 'careers')
                    ? 'text-gray-950 font-extrabold border-b-2 border-gray-950'
                    : 'text-gray-700 hover:text-gray-950'
                }`}
              >
                Careers
              </button>
            </div>

            {/* CONTACT US - Direct Separate Page Link (No Mega-Menu Dropdown) */}
            <div
              className="relative py-3"
              onMouseEnter={() => {
                setOpenMenu(null)
                setSearchOpen(false)
              }}
            >
              <button
                onClick={() => handleNavClick('contact')}
                className={`transition-colors cursor-pointer border-0 bg-transparent uppercase pb-1 ${
                  currentRoute === 'contact'
                    ? 'text-gray-950 font-extrabold border-b-2 border-gray-950'
                    : 'text-gray-700 hover:text-[#DE0826]'
                }`}
              >
                Contact Us
              </button>
            </div>
          </nav>

          {/* Right Action Icons (Search & Region Selector matching screenshots) */}
          <div className="flex items-center space-x-4">
            {/* Search Toggle Icon */}
            <button
              onClick={() => {
                setOpenMenu(null)
                setSearchOpen(!searchOpen)
              }}
              aria-label="Search"
              className={`p-1.5 transition-colors cursor-pointer bg-transparent border-0 ${
                searchOpen ? 'text-[#DE0826]' : 'text-gray-700 hover:text-gray-950'
              }`}
            >
              <Icon name="search" className="w-4 h-4" />
            </button>

            <span className="text-gray-300 font-light hidden sm:inline select-none">|</span>

            <div className="hidden sm:flex items-center space-x-1.5 border border-gray-200 rounded px-2.5 py-1 text-xs text-gray-700 hover:border-gray-400 cursor-pointer bg-gray-50/50">
              <Icon name="globe" className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-[#DE0826] text-[10px]">▼</span>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#DE0826]"
              aria-label="Toggle navigation"
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SEARCH OVERLAY PANEL (Matching Reference Screenshot) */}
        {/* ========================================================= */}
        {searchOpen && (
          <div className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-2xl z-50 animate-fadeIn">
            <div className="max-w-[1050px] mx-auto px-6 sm:px-12 pt-12 pb-14">
              {/* Search Bar Row with Solid Bottom Border Line */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSearchSubmit()
                }}
                className="relative flex items-center border-b border-gray-900 pb-3"
              >
                {/* Thin Outline Magnifying Glass */}
                <div className="text-gray-800 pr-4 pl-1 shrink-0">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>

                {/* Search Text Input */}
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full bg-transparent text-2xl sm:text-3xl md:text-4xl text-gray-900 placeholder-gray-400 font-light focus:outline-none tracking-normal"
                />

                {/* Submit Arrow (Thin Right Arrow) */}
                <button
                  type="submit"
                  aria-label="Submit Search"
                  className="text-gray-800 hover:text-[#DE0826] transition-colors p-1 cursor-pointer bg-transparent border-0 shrink-0 ml-2"
                >
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="13 6 19 12 13 18" />
                  </svg>
                </button>
              </form>

              {/* POPULAR SEARCHES Framed Section */}
              <div className="mt-10 sm:mt-12 relative border border-[#EACDCD] rounded-none p-6 sm:p-7 pt-6">
                {/* Header Badge breaking top border */}
                <span className="absolute -top-2.5 left-5 bg-white px-2.5 text-[11px] font-extrabold uppercase tracking-wider text-[#7A0019]">
                  POPULAR SEARCHES
                </span>

                {/* 4 Popular Search Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 sm:gap-5">
                  {[
                    { label: 'Jobs', route: 'careers' as PageRoute },
                    { label: 'Mahindra', route: 'about' as PageRoute },
                    { label: 'Locations', route: 'contact' as PageRoute },
                    { label: 'Applications', route: 'capabilities' as PageRoute },
                  ].map((tag) => (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => handlePopularTagClick(tag.label, tag.route)}
                      className="inline-flex items-center bg-white border border-gray-300 hover:border-gray-900 hover:shadow-xs px-6 py-2.5 sm:px-7 sm:py-3 transition-all cursor-pointer text-gray-900 text-sm sm:text-base font-normal group"
                    >
                      <span>{tag.label}</span>
                      <span className="ml-2 text-[#DE0826] text-xs font-semibold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Interactive Search Results */}
              {searchQuery.trim().length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100 animate-fadeIn">
                  <div className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-3">
                    Matching Results ({filteredResults.length})
                  </div>
                  {filteredResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[260px] overflow-y-auto pr-2">
                      {filteredResults.map((res, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSearchOpen(false)
                            onRouteChange(res.route)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                          className="p-3.5 rounded border border-gray-200 hover:border-[#DE0826] hover:bg-gray-50/70 transition-all cursor-pointer flex flex-col justify-between group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-extrabold text-[#DE0826] uppercase tracking-wider">
                              {res.category}
                            </span>
                            <span className="text-xs text-gray-400 group-hover:text-[#DE0826] group-hover:translate-x-0.5 transition-transform">
                              →
                            </span>
                          </div>
                          <h5 className="text-sm font-bold text-gray-950 group-hover:text-[#DE0826] transition-colors">
                            {res.title}
                          </h5>
                          <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                            {res.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-sm text-gray-500">
                      No direct matches found for "{searchQuery}". Try selecting one of the popular searches above.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DESKTOP MEGA-MENUS CONTAINER */}
        {/* ========================================================= */}
        {openMenu && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-2xl z-50 animate-fadeIn"
            onMouseEnter={() => setOpenMenu(openMenu)}
            onMouseLeave={closeMenu}
          >
            {/* 1. ABOUT US MEGA-MENU */}
            {openMenu === 'about' && (
              <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-10">
                <div className="grid grid-cols-12 gap-10 items-start">
                  {/* Left Column: Heading */}
                  <div className="col-span-2">
                    <h3 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                      About Us
                    </h3>
                  </div>

                  {/* Middle Column 1: Corporate Overview */}
                  <div className="col-span-3">
                    <h4 className="font-bold text-[14px] text-gray-950 mb-3.5">
                      Corporate Overview
                    </h4>
                    <ul className="space-y-2 text-[13px] text-gray-700">
                      {[
                        'Leadership',
                        'Our Brand',
                        'Sustainability',
                        'Recognition',
                        'Customer Speak',
                        'Partners Ecosystem',
                        'Portfolio Companies',
                      ].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => handleNavClick('about')}
                            className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left font-normal"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Middle Column 2: News, IR, Citizenship, Centricity */}
                  <div className="col-span-4 space-y-4">
                    <div>
                      <button
                        onClick={() => handleNavClick('about')}
                        className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                      >
                        News
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() => handleNavClick('about')}
                        className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                      >
                        Investor Relations
                      </button>
                    </div>

                    <div>
                      <h4 className="font-bold text-[14px] text-gray-950 mb-2">
                        Corporate Citizenship
                      </h4>
                      <ul className="space-y-1.5 text-[13px] text-gray-700">
                        {[
                          'Tech Mahindra Foundation',
                          'Mahindra Educational Institutions',
                          'Individual Social Responsibility',
                        ].map((item) => (
                          <li key={item}>
                            <button
                              onClick={() => handleNavClick('about')}
                              className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left font-normal"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <button
                        onClick={() => handleNavClick('about')}
                        className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                      >
                        Customer Centricity
                      </button>
                    </div>
                  </div>

                  {/* Right Column: 2 Featured Cards */}
                  <div className="col-span-3 flex flex-col space-y-4">
                    {/* Card 1: Scale at Speed */}
                    <div
                      onClick={() => handleNavClick('about')}
                      className="relative h-[145px] overflow-hidden group cursor-pointer bg-black"
                    >
                      <img
                        src="/images/home_racing.jpg"
                        alt="Scale at Speed"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 flex flex-col justify-between">
                        <span className="text-[11px] font-semibold text-white/90 border-b border-white/60 pb-0.5 inline-block self-start">
                          Our Promise
                        </span>
                        <div>
                          <h5 className="text-sm font-bold text-white leading-tight">
                            Scale at Speed™
                          </h5>
                          <span className="text-[10px] font-extrabold text-white tracking-wider uppercase mt-1 inline-block group-hover:underline">
                            LEARN MORE
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: AI Delivered Right */}
                    <div
                      onClick={() => handleNavClick('about')}
                      className="relative h-[145px] overflow-hidden group cursor-pointer bg-black"
                    >
                      <img
                        src="/images/thinking_ribbon.jpg"
                        alt="AI Delivered Right"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 flex flex-col justify-between">
                        <span className="text-[11px] font-semibold text-white/90 border-b border-white/60 pb-0.5 inline-block self-start">
                          AI Delivered Right
                        </span>
                        <div>
                          <span className="text-[10px] font-extrabold text-white tracking-wider uppercase mt-2 inline-block group-hover:underline">
                            LEARN MORE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CAPABILITIES MEGA-MENU */}
            {openMenu === 'capabilities' && (
              <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-10 space-y-8">
                {/* Top Section: Our Services */}
                <div className="grid grid-cols-12 gap-10 items-start">
                  {/* Left Column: Heading */}
                  <div className="col-span-2">
                    <h3 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                      Our Services
                    </h3>
                  </div>

                  {/* Middle Column 1: TechM Consulting, Application Services, Digital Core */}
                  <div className="col-span-3 space-y-4">
                    <div>
                      <button
                        onClick={() => handleNavClick('capabilities')}
                        className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block mb-3.5"
                      >
                        TechM Consulting
                      </button>
                    </div>

                    <div>
                      <h4 className="font-bold text-[14px] text-gray-950 mb-2">
                        Application Services
                      </h4>
                      <ul className="space-y-1.5 text-[13px] text-gray-700">
                        {[
                          'Agentic Development and Modernization Services',
                          'Intelligent Automation',
                          'Testing Services',
                          'Performance Engineering',
                        ].map((item) => (
                          <li key={item}>
                            <button
                              onClick={() => handleNavClick('capabilities')}
                              className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left font-normal leading-snug"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-1">
                      <h4 className="font-bold text-[14px] text-gray-950 mb-2">
                        Digital Core Services
                      </h4>
                      <ul className="space-y-1.5 text-[13px] text-gray-700">
                        {[
                          'Cloud & Infrastructure Services',
                          'Cloud Consulting',
                          'Network Services',
                          'Cyber Security',
                        ].map((item) => (
                          <li key={item}>
                            <button
                              onClick={() => handleNavClick('capabilities')}
                              className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left font-normal"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Middle Column 2: Engineering, Data Analytics, AI, Digital Enterprise */}
                  <div className="col-span-4 space-y-3">
                    <button
                      onClick={() => handleNavClick('capabilities')}
                      className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                    >
                      Engineering Services
                    </button>

                    <button
                      onClick={() => handleNavClick('capabilities')}
                      className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                    >
                      Data Analytics
                    </button>

                    <button
                      onClick={() => handleNavClick('capabilities')}
                      className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                    >
                      Artificial Intelligence
                    </button>

                    <div className="pt-2">
                      <h4 className="font-bold text-[14px] text-gray-950 mb-2">
                        Digital Enterprise Applications
                      </h4>
                      <ul className="space-y-1 text-[13px] text-gray-700">
                        {[
                          'Microsoft Business Applications',
                          'Enterprise Digital Solutions',
                          'SAP',
                          'ServiceNow',
                          'Oracle',
                          'Salesforce',
                          'Pega',
                        ].map((item) => (
                          <li key={item}>
                            <button
                              onClick={() => handleNavClick('capabilities')}
                              className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left font-normal"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Middle Column 3: BPS, Experience, Integrated, Sustainability */}
                  <div className="col-span-3 space-y-4">
                    <button
                      onClick={() => handleNavClick('capabilities')}
                      className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                    >
                      Business Process Services
                    </button>

                    <button
                      onClick={() => handleNavClick('capabilities')}
                      className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                    >
                      Experience Services
                    </button>

                    <div>
                      <h4 className="font-bold text-[14px] text-gray-950 mb-2">
                        Integrated Offerings
                      </h4>
                      <button
                        onClick={() => handleNavClick('capabilities')}
                        className="text-[13px] text-gray-700 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block font-normal"
                      >
                        Global Capability Centers
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() => handleNavClick('capabilities')}
                        className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                      >
                        Sustainability Services
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Spotlight */}
                <div className="pt-6 border-t border-gray-100 grid grid-cols-12 gap-10 items-center">
                  <div className="col-span-2">
                    <h3 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                      Spotlight
                    </h3>
                  </div>

                  <div className="col-span-3">
                    <button
                      onClick={() => handleNavClick('capabilities')}
                      className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                    >
                      Products & Platforms
                    </button>
                    <div className="mt-2">
                      <button
                        onClick={() => handleNavClick('capabilities')}
                        className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                      >
                        Scale at Speed™
                      </button>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <button
                      onClick={() => handleNavClick('capabilities')}
                      className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                    >
                      Innovation, R&D - Makers Lab
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. INDUSTRIES MEGA-MENU */}
            {openMenu === 'industries' && (
              <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-10">
                <div className="grid grid-cols-12 gap-10 items-start">
                  {/* Left Column: Heading */}
                  <div className="col-span-2">
                    <h3 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                      Industries
                    </h3>
                  </div>

                  {/* Middle Column 1: Financial to Insurance */}
                  <div className="col-span-3">
                    <ul className="space-y-3 text-[14px] font-bold text-gray-950">
                      {[
                        'Banking & Financial Services',
                        'Communications',
                        'Education',
                        'Energy & Utilities',
                        'Healthcare & Life Sciences',
                        'Hi Tech',
                        'Insurance',
                      ].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => handleNavClick('industries')}
                            className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Middle Column 2: Manufacturing to Travel */}
                  <div className="col-span-4">
                    <ul className="space-y-3 text-[14px] font-bold text-gray-950">
                      {[
                        'Manufacturing',
                        'Media & Entertainment',
                        'Oil & Gas',
                        'Private Equity',
                        'Professional Services',
                        'Retail & Consumer Goods',
                        'Travel, Transportation, Logistics & Hospitality',
                      ].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => handleNavClick('industries')}
                            className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: 2 Featured Cards */}
                  <div className="col-span-3 flex flex-col space-y-4">
                    {/* Card 1: Store of the Future */}
                    <div
                      onClick={() => handleNavClick('industries')}
                      className="relative h-[145px] overflow-hidden group cursor-pointer bg-black"
                    >
                      <img
                        src="/images/ind_retail.jpg"
                        alt="Store of the Future"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 flex flex-col justify-between">
                        <span className="text-[11px] font-semibold text-white/90 border-b border-white/60 pb-0.5 inline-block self-start">
                          Featured Report
                        </span>
                        <div>
                          <h5 className="text-sm font-bold text-white leading-tight">
                            Store of the Future: Research Report
                          </h5>
                          <span className="text-[10px] font-extrabold text-white tracking-wider uppercase mt-1 inline-block group-hover:underline">
                            READ MORE
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: MIT Tech Review */}
                    <div
                      onClick={() => handleNavClick('industries')}
                      className="relative h-[145px] overflow-hidden group cursor-pointer bg-black"
                    >
                      <img
                        src="/images/cap_engineering.jpg"
                        alt="Product Development with AI"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 flex flex-col justify-between">
                        <span className="text-[11px] font-semibold text-white/90 border-b border-white/60 pb-0.5 inline-block self-start">
                          Featured White Paper
                        </span>
                        <div>
                          <h5 className="text-xs font-bold text-white leading-snug">
                            Product Development with AI and Sustainability: TechM x MIT Technology Review Report
                          </h5>
                          <span className="text-[10px] font-extrabold text-white tracking-wider uppercase mt-1 inline-block group-hover:underline">
                            READ MORE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. INSIGHTS MEGA-MENU */}
            {openMenu === 'insights' && (
              <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-10">
                <div className="grid grid-cols-12 gap-10 items-start">
                  {/* Left Column: Heading */}
                  <div className="col-span-2">
                    <h3 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                      Insights
                    </h3>
                  </div>

                  {/* Middle Column: Links List */}
                  <div className="col-span-7">
                    <ul className="space-y-3.5 text-[14px] font-bold text-gray-950">
                      {['Case Studies', 'Views', 'Analyst Insights', 'News', 'Events'].map(
                        (item) => (
                          <li key={item}>
                            <button
                              onClick={() => handleNavClick('insights')}
                              className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                            >
                              {item}
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Right Column: 2 Featured Cards */}
                  <div className="col-span-3 flex flex-col space-y-4">
                    {/* Card 1: Press Release */}
                    <div
                      onClick={() => handleNavClick('insights')}
                      className="relative h-[145px] overflow-hidden group cursor-pointer bg-black"
                    >
                      <img
                        src="/images/insights_hero.jpg"
                        alt="Q1 EBIT Press Release"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 flex flex-col justify-between">
                        <span className="text-[11px] font-semibold text-white/90 border-b border-white/60 pb-0.5 inline-block self-start">
                          Featured Press Release
                        </span>
                        <div>
                          <h5 className="text-xs font-bold text-white leading-snug">
                            Tech Mahindra Q1 FY27 EBIT rises to ₹2,264 crores, up 53.3% YoY; New deal-wins at USD 1,078 Mn - up 33% YoY
                          </h5>
                          <span className="text-[10px] font-extrabold text-white tracking-wider uppercase mt-1 inline-block group-hover:underline">
                            READ MORE
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Dreamforce Event */}
                    <div
                      onClick={() => handleNavClick('insights')}
                      className="relative h-[145px] overflow-hidden group cursor-pointer bg-black"
                    >
                      <img
                        src="/images/event_dreamforce.jpg"
                        alt="Dreamforce 2026"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 flex flex-col justify-between">
                        <span className="text-[11px] font-semibold text-white/90 border-b border-white/60 pb-0.5 inline-block self-start">
                          Featured Event
                        </span>
                        <div>
                          <h5 className="text-xs font-bold text-white leading-snug">
                            Tech Mahindra at Dreamforce 2026: Turning AI into a Co-Worker
                          </h5>
                          <span className="text-[10px] font-extrabold text-white tracking-wider uppercase mt-1 inline-block group-hover:underline">
                            READ MORE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. CAREERS MEGA-MENU */}
            {openMenu === 'careers' && (
              <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-10">
                <div className="grid grid-cols-12 gap-10 items-start">
                  {/* Left Column: Heading */}
                  <div className="col-span-2">
                    <h3 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                      Careers
                    </h3>
                  </div>

                  {/* Middle Column: Links List */}
                  <div className="col-span-7">
                    <ul className="space-y-3.5 text-[14px] font-bold text-gray-950">
                      {['The TechM Way', 'Diversity & Inclusion', 'Join Us'].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => handleNavClick('careers')}
                            className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: 2 Featured Cards */}
                  <div className="col-span-3 flex flex-col space-y-4">
                    {/* Card 1: Rubicon Case Study */}
                    <div
                      onClick={() => handleNavClick('careers')}
                      className="relative h-[145px] overflow-hidden group cursor-pointer bg-black"
                    >
                      <img
                        src="/images/story_racing.jpg"
                        alt="Rubicon 2.0"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 flex flex-col justify-between">
                        <span className="text-[11px] font-semibold text-white/90 border-b border-white/60 pb-0.5 inline-block self-start">
                          Featured Case Study
                        </span>
                        <div>
                          <h5 className="text-sm font-bold text-white leading-tight">
                            Outpacing Change with Rubicon 2.0
                          </h5>
                          <span className="text-[10px] font-extrabold text-white tracking-wider uppercase mt-1 inline-block group-hover:underline">
                            READ MORE
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Stockmann Case Study */}
                    <div
                      onClick={() => handleNavClick('careers')}
                      className="relative h-[145px] overflow-hidden group cursor-pointer bg-black"
                    >
                      <img
                        src="/images/case_ribbon.jpg"
                        alt="Stockmann Case Study"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 flex flex-col justify-between">
                        <span className="text-[11px] font-semibold text-white/90 border-b border-white/60 pb-0.5 inline-block self-start">
                          Featured Case Study
                        </span>
                        <div>
                          <h5 className="text-xs font-bold text-white leading-snug">
                            Stockmann Cuts Supplier Onboarding from Weeks to Hours with PIM-First Automation
                          </h5>
                          <span className="text-[10px] font-extrabold text-white tracking-wider uppercase mt-1 inline-block group-hover:underline">
                            READ MORE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[56px] bottom-0 bg-white overflow-y-auto p-6 z-50 animate-fadeIn">
            <div className="flex flex-col space-y-4 text-base font-semibold text-gray-800">
              {/* Home */}
              <button
                onClick={() => handleNavClick('home')}
                className="py-2.5 border-b border-gray-100 flex items-center justify-between text-left hover:text-[#DE0826]"
              >
                <span>Home</span>
                <Icon name="chevron-right" className="w-4 h-4 text-gray-400" />
              </button>

              {/* About Us Accordion */}
              <div className="border-b border-gray-100 pb-2">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleNavClick('about')}
                    className="py-2 font-bold text-left hover:text-[#DE0826] flex-grow"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() =>
                      setMobileSubmenu(mobileSubmenu === 'about' ? null : 'about')
                    }
                    className="p-2 text-gray-400"
                  >
                    <Icon
                      name={mobileSubmenu === 'about' ? 'close' : 'chevron-right'}
                      className="w-4 h-4"
                    />
                  </button>
                </div>
                {mobileSubmenu === 'about' && (
                  <div className="pl-4 py-2 space-y-2 text-sm text-gray-600 font-normal">
                    <div className="font-semibold text-gray-900">Corporate Overview</div>
                    {['Leadership', 'Our Brand', 'Sustainability', 'Recognition'].map((i) => (
                      <div
                        key={i}
                        onClick={() => handleNavClick('about')}
                        className="cursor-pointer hover:text-[#DE0826]"
                      >
                        {i}
                      </div>
                    ))}
                    <div className="font-semibold text-gray-900 pt-2">Corporate Citizenship</div>
                    <div
                      onClick={() => handleNavClick('about')}
                      className="cursor-pointer hover:text-[#DE0826]"
                    >
                      Tech Mahindra Foundation
                    </div>
                  </div>
                )}
              </div>

              {/* Capabilities Accordion */}
              <div className="border-b border-gray-100 pb-2">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleNavClick('capabilities')}
                    className="py-2 font-bold text-left hover:text-[#DE0826] flex-grow"
                  >
                    Capabilities
                  </button>
                  <button
                    onClick={() =>
                      setMobileSubmenu(
                        mobileSubmenu === 'capabilities' ? null : 'capabilities'
                      )
                    }
                    className="p-2 text-gray-400"
                  >
                    <Icon
                      name={
                        mobileSubmenu === 'capabilities' ? 'close' : 'chevron-right'
                      }
                      className="w-4 h-4"
                    />
                  </button>
                </div>
                {mobileSubmenu === 'capabilities' && (
                  <div className="pl-4 py-2 space-y-2 text-sm text-gray-600 font-normal">
                    <div className="font-semibold text-gray-900">Our Services</div>
                    {[
                      'TechM Consulting',
                      'Application Services',
                      'Digital Core Services',
                      'Engineering Services',
                      'Artificial Intelligence',
                      'Business Process Services',
                    ].map((i) => (
                      <div
                        key={i}
                        onClick={() => handleNavClick('capabilities')}
                        className="cursor-pointer hover:text-[#DE0826]"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Industries Accordion */}
              <div className="border-b border-gray-100 pb-2">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleNavClick('industries')}
                    className="py-2 font-bold text-left hover:text-[#DE0826] flex-grow"
                  >
                    Industries
                  </button>
                  <button
                    onClick={() =>
                      setMobileSubmenu(
                        mobileSubmenu === 'industries' ? null : 'industries'
                      )
                    }
                    className="p-2 text-gray-400"
                  >
                    <Icon
                      name={
                        mobileSubmenu === 'industries' ? 'close' : 'chevron-right'
                      }
                      className="w-4 h-4"
                    />
                  </button>
                </div>
                {mobileSubmenu === 'industries' && (
                  <div className="pl-4 py-2 space-y-2 text-sm text-gray-600 font-normal">
                    {[
                      'Banking & Financial Services',
                      'Communications',
                      'Healthcare & Life Sciences',
                      'Hi Tech',
                      'Manufacturing',
                      'Retail & Consumer Goods',
                    ].map((i) => (
                      <div
                        key={i}
                        onClick={() => handleNavClick('industries')}
                        className="cursor-pointer hover:text-[#DE0826]"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Insights */}
              <button
                onClick={() => handleNavClick('insights')}
                className="py-2.5 border-b border-gray-100 flex items-center justify-between text-left hover:text-[#DE0826]"
              >
                <span>Insights</span>
                <Icon name="chevron-right" className="w-4 h-4 text-gray-400" />
              </button>

              {/* Careers */}
              <button
                onClick={() => handleNavClick('careers')}
                className="py-2.5 border-b border-gray-100 flex items-center justify-between text-left hover:text-[#DE0826]"
              >
                <span>Careers</span>
                <Icon name="chevron-right" className="w-4 h-4 text-gray-400" />
              </button>

              {/* Contact Us - Separate Page Action */}
              <button
                onClick={() => handleNavClick('contact')}
                className="mt-6 bg-[#DE0826] hover:bg-[#BE001D] text-white py-3 rounded text-center font-bold text-sm shadow-md"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to preserve content flow behind fixed navbar */}
      <div
        className={`w-full transition-all duration-200 ${
          scrolled ? 'h-[54px] sm:h-[58px]' : 'h-[62px] sm:h-[66px]'
        }`}
        aria-hidden="true"
      />

      {/* Dimmed backdrop when mega menu or search is open */}
      {(openMenu || searchOpen) && (
        <div
          onClick={() => {
            closeMenu()
            setSearchOpen(false)
          }}
          className="fixed inset-0 top-[60px] bg-black/40 backdrop-blur-[2px] z-40 transition-opacity cursor-pointer"
        />
      )}
    </>
  )
}

// -------------------------------------------------------------
// CAPABILITIES PAGE IMPLEMENTATION
// Exactly matching the reference screenshot!
// -------------------------------------------------------------
interface CapabilityItem {
  id: number
  title: string
  category: string
  gradient: string
  iconType: string
  image: string
  description: string
  services: string[]
}

const allCapabilitiesList: CapabilityItem[] = [
  {
    id: 1,
    title: 'Agentic Development and Modernization Services',
    category: 'Autonomous Workflows & Modernization',
    gradient: 'from-[#0B3C8A] via-[#1E40AF] to-[#172554]',
    iconType: 'blue-streak',
    image: '/images/cap_agentic.jpg',
    description:
      'Leverage autonomous AI agents and intelligent software generation to modernize enterprise legacy architectures, accelerate refactoring, and automate software delivery pipelines.',
    services: [
      'Agentic Software Engineering & Code Generation',
      'Legacy Modernization & Cloud Refactoring',
      'Autonomous DevOps & Continuous Deployment',
      'AI-Powered Microservices Migration',
    ],
  },
  {
    id: 2,
    title: 'Artificial Intelligence',
    category: 'Cognitive & Generative AI',
    gradient: 'from-[#E31837] via-[#9B113B] to-[#4A081A]',
    iconType: 'magenta-mesh',
    image: '/images/cap_ai.jpg',
    description:
      'Enterprise-grade generative AI, bespoke large language model customization, ethical AI governance, and computer vision designed to drive real business ROI.',
    services: [
      'Enterprise Generative AI Platforms',
      'Custom LLM Fine-Tuning & RAG Architecture',
      'Responsible & Sovereign AI Governance',
      'Computer Vision & Edge Intelligence',
    ],
  },
  {
    id: 3,
    title: 'Business Process Services',
    category: 'Operations & Process Re-engineering',
    gradient: 'from-neutral-700 via-neutral-800 to-neutral-950',
    iconType: 'architectural-fan',
    image: '/images/cap_bps.jpg',
    description:
      'Cognitive business operations, intelligent omnichannel customer experiences, digital finance, supply chain management, and automated back-office transformation.',
    services: [
      'Digital Customer Experience (CX) Orchestration',
      'Intelligent Finance & Accounting (F&A)',
      'Cognitive Supply Chain & Logistics Operations',
      'Human-in-the-Loop AI Process Moderation',
    ],
  },
  {
    id: 4,
    title: 'Cloud and Infrastructure Services',
    category: 'Hybrid & Multi-Cloud Platforms',
    gradient: 'from-[#4C1D95] via-[#2E1065] to-[#1E1B4B]',
    iconType: 'floating-spheres',
    image: '/images/cap_cloud.jpg',
    description:
      'Full-lifecycle cloud consulting, zero-downtime migration, automated FinOps cost optimization, and secure multi-cloud operations at global enterprise scale.',
    services: [
      'Cloud Strategy & Zero-Downtime Migration',
      'Automated FinOps & Cost Governance',
      'Hybrid Cloud & Multi-Cloud Management',
      'Cloud-Native Kubernetes & Microservices',
    ],
  },
  {
    id: 5,
    title: 'Digital Enterprise Applications',
    category: 'ERP, CRM & Modern Workflows',
    gradient: 'from-[#7C3AED] via-[#6D28D9] to-[#4C1D95]',
    iconType: 'geometric-lavender',
    image: '/images/cap_digital.jpg',
    description:
      'Next-generation ERP and CRM modernization across SAP S/4HANA, Salesforce, ServiceNow, Oracle Cloud, and composable enterprise applications.',
    services: [
      'SAP S/4HANA Enterprise Transformation',
      'Salesforce Hyperforce & Customer 360',
      'ServiceNow Enterprise Workflow Automation',
      'Composable API-First Application Architecture',
    ],
  },
  {
    id: 6,
    title: 'Engineering Services',
    category: 'Product & Hardware Innovation',
    gradient: 'from-neutral-900 via-stone-800 to-black',
    iconType: 'turbine-blade',
    image: '/images/cap_engineering.jpg',
    description:
      'End-to-end product design, electric vehicle software stacks, industrial IoT digital twins, avionics engineering, and embedded hardware architectures.',
    services: [
      'Connected Electric Vehicle (EV) Engineering',
      'Digital Twins & Industrial IoT Platforms',
      'Aerospace & Defense Systems Engineering',
      'Embedded Software & Chip-to-Cloud Hardware',
    ],
  },
  {
    id: 7,
    title: 'Experience Services',
    category: 'Human-Centric Design & Spatial UX',
    gradient: 'from-emerald-600 via-teal-700 to-emerald-950',
    iconType: 'green-ribbon',
    image: '/images/cap_experience.jpg',
    description:
      'Brand storytelling, human-centered UI/UX design, omnichannel commerce journeys, and immersive 3D spatial computing environments.',
    services: [
      'Omnichannel Experience & Design Systems',
      'Spatial Computing & AR/VR Virtual Experiences',
      'Customer Data Platforms & Personalization',
      'Conversion Rate & UX Behavioral Analytics',
    ],
  },
  {
    id: 8,
    title: 'Network Services',
    category: '5G, Telco Cloud & Open RAN',
    gradient: 'from-[#9A3412] via-[#78350F] to-[#451A03]',
    iconType: 'copper-cable',
    image: '/images/cap_network.jpg',
    description:
      'Pioneering open RAN architectures, private 5G enterprise networks, telco cloud infrastructure, and autonomous zero-touch network operations.',
    services: [
      'Private 5G Enterprise Network Deployment',
      'Open RAN Integration & Telco Cloud Core',
      'Autonomous Zero-Touch Network Operations',
      'Broadband & Fiber Network Modernization',
    ],
  },
  {
    id: 9,
    title: 'Testing Services',
    category: 'Quality Engineering & Assurance',
    gradient: 'from-[#1E1B4B] via-[#0F172A] to-black',
    iconType: 'indigo-crescent',
    image: '/images/cap_testing.jpg',
    description:
      'AI-driven test automation, continuous quality engineering, non-functional performance testing, and cybersecurity validation across digital touchpoints.',
    services: [
      'Autonomous AI-Driven Test Automation',
      'Performance, Scalability & Chaos Engineering',
      'Mobile & Omnichannel Device Testing Labs',
      'Continuous Security & Compliance Verification',
    ],
  },
]


// -------------------------------------------------------------
// Industries Page Implementation (Matching Norstar Reference)
// -------------------------------------------------------------
interface IndustryItem {
  id: string
  name: string
  category: 'all' | 'financial' | 'tech' | 'industrial' | 'consumer'
  categoryLabel: string
  tagline: string
  description: string
  gradient: string
  accentColor: string
  image: string
  iconName: IconName
  solutions: string[]
  impactMetric: string
  impactLabel: string
}

const allIndustriesList: IndustryItem[] = [
  {
    id: 'banking-financial',
    name: 'Banking and Financial Services',
    category: 'financial',
    categoryLabel: 'Financial Services & Capital Markets',
    tagline: 'Next-Gen Core Banking & Digital Finance Platforms',
    description:
      'Accelerating financial modernization with intelligent digital banking, AI fraud defense, open finance APIs, and next-gen wealth ecosystems.',
    gradient: 'from-blue-900 via-indigo-900 to-slate-900',
    accentColor: '#2563EB',
    image: '/images/ind_banking.jpg',
    iconName: 'chart',
    solutions: [
      'Cloud-Native Core Banking Modernization',
      'AI-Powered AML & Fraud Risk Detection',
      'Open Banking & BaaS API Architecture',
      'Intelligent Wealth & Digital Asset Ecosystems',
    ],
    impactMetric: '40% Faster Settlement',
    impactLabel: 'Serving 8 of the top 10 global financial institutions',
  },
  {
    id: 'communications',
    name: 'Communications',
    category: 'tech',
    categoryLabel: 'Communications & Hi-Tech',
    tagline: '5G Telco Cloud, Open RAN & Autonomous Networks',
    description:
      'Empowering telecom operators to transform from legacy telcos to agile techcos with 5G orchestration, autonomous network ops, and AI customer care.',
    gradient: 'from-indigo-900 via-purple-900 to-blue-950',
    accentColor: '#4F46E5',
    image: '/images/ind_communications.jpg',
    iconName: 'phone',
    solutions: [
      '5G Telco Cloud Architecture & Edge Compute',
      'Open RAN Virtualization & Interoperability',
      'AI Autonomous Network Operations (AIOps)',
      'Next-Gen BSS/OSS Microservices Modernization',
    ],
    impactMetric: '300M+ Subscribers',
    impactLabel: 'Supported across 50+ tier-1 operators worldwide',
  },
  {
    id: 'education',
    name: 'Education',
    category: 'consumer',
    categoryLabel: 'Healthcare, Retail & Services',
    tagline: 'Hybrid Digital Campuses & Adaptive AI Learning',
    description:
      'Transforming higher education and enterprise learning with personalized learning platforms, digital campus infrastructures, and data-driven student success engines.',
    gradient: 'from-teal-900 via-emerald-900 to-cyan-950',
    accentColor: '#0D9488',
    image: '/images/ind_education.jpg',
    iconName: 'award',
    solutions: [
      'Hybrid Digital Campus Infrastructure',
      'Adaptive AI Personalized Learning Engines',
      'University ERP & Student Information Systems',
      'Student Engagement & Analytics Dashboards',
    ],
    impactMetric: '1.5M+ Students',
    impactLabel: 'Empowered across 40+ leading universities',
  },
  {
    id: 'energy-utilities',
    name: 'Energy and Utilities',
    category: 'industrial',
    categoryLabel: 'Energy & Industrial',
    tagline: 'Smart Grids, Distributed Energy & Net-Zero ESG',
    description:
      'Modernizing legacy electrical, water, and gas networks with smart meter infrastructure, renewable grid integration, and predictive asset reliability.',
    gradient: 'from-amber-900 via-yellow-900 to-orange-950',
    accentColor: '#D97706',
    image: '/images/ind_energy.jpg',
    iconName: 'zap',
    solutions: [
      'Smart Grid & Advanced Metering Infrastructure (AMI)',
      'Renewable Distributed Energy Resource Management',
      'Net-Zero Carbon Accounting & ESG Reporting',
      'Predictive Grid Asset Reliability & Digital Twins',
    ],
    impactMetric: '25% Outage Cut',
    impactLabel: 'Across 350+ global utility transformations',
  },
  {
    id: 'healthcare-life-sciences',
    name: 'Healthcare and Life Sciences',
    category: 'consumer',
    categoryLabel: 'Healthcare, Retail & Services',
    tagline: 'Connected IoMT, AI Diagnostics & Clinical Trials',
    description:
      'Reimagining patient care and life sciences through interoperable EHR ecosystems, decentralized clinical trial platforms, and AI-accelerated drug discovery workflows.',
    gradient: 'from-rose-900 via-pink-900 to-red-950',
    accentColor: '#E11D48',
    image: '/images/ind_healthcare.jpg',
    iconName: 'heart',
    solutions: [
      'Connected Patient Ecosystems & Remote IoMT',
      'Decentralized Clinical Trial Digitalization',
      'HIPAA-Compliant Healthcare Cloud Platforms',
      'AI Diagnostic Assistance & Medical Imaging Workflows',
    ],
    impactMetric: '15M+ Patient Lives',
    impactLabel: '30% faster clinical discovery cycles',
  },
  {
    id: 'hi-tech',
    name: 'Hi-Tech',
    category: 'tech',
    categoryLabel: 'Communications & Hi-Tech',
    tagline: 'Semiconductor VLSI, Embedded Systems & Cloud SaaS',
    description:
      'Partnering with the world’s leading technology pioneers to design silicon, build embedded firmware, scale enterprise SaaS, and architect autonomous AI hardware.',
    gradient: 'from-cyan-900 via-sky-900 to-blue-950',
    accentColor: '#0284C7',
    image: '/images/ind_hitech.jpg',
    iconName: 'cpu',
    solutions: [
      'Semiconductor VLSI & Silicon Tape-Out Engineering',
      'Embedded Firmware & Edge AI Integration',
      'Hyperscale Cloud SaaS Platform Engineering',
      'Product Lifecycle Management (PLM) Digital Twins',
    ],
    impactMetric: '100+ Tape-Outs',
    impactLabel: '99.8% first-pass silicon engineering success',
  },
  {
    id: 'insurance-technology',
    name: 'Insurance Technology and Services',
    category: 'financial',
    categoryLabel: 'Financial Services & Capital Markets',
    tagline: 'Autonomous Claims, AI Underwriting & Digital InsurTech',
    description:
      'Empowering P&C, life, and commercial insurers to achieve straight-through claims processing, algorithmic underwriting, and modern policy administration.',
    gradient: 'from-sky-900 via-blue-900 to-indigo-950',
    accentColor: '#0369A1',
    image: '/images/ind_insurance.jpg',
    iconName: 'shield',
    solutions: [
      'Straight-Through Claims Automation',
      'AI Underwriting & Actuarial Risk Modeling',
      'Core Guidewire & Duck Creek Modernization',
      'Digital Policyholder & Broker Omnichannel Portals',
    ],
    impactMetric: '60% Faster Claims',
    impactLabel: '45% reduction in operational cost per policy',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    category: 'industrial',
    categoryLabel: 'Energy & Industrial',
    tagline: 'Industry 4.0, Smart Factories & Autonomous Robotics',
    description:
      'Digitizing industrial manufacturing with shop-floor IoT, predictive maintenance, supply chain digital twins, and autonomous robotics for high-throughput output.',
    gradient: 'from-stone-900 via-zinc-900 to-neutral-950',
    accentColor: '#78716C',
    image: '/images/ind_manufacturing.jpg',
    iconName: 'factory',
    solutions: [
      'Industry 4.0 Smart Factory Orchestration',
      'Supply Chain End-to-End Digital Twins',
      'Predictive Machine Maintenance & OT Security',
      'Automated Guided Vehicles (AGV) & MES Systems',
    ],
    impactMetric: '35% Downtime Cut',
    impactLabel: 'Across 400+ connected manufacturing plants',
  },
  {
    id: 'media-entertainment',
    name: 'Media and Entertainment',
    category: 'tech',
    categoryLabel: 'Communications & Hi-Tech',
    tagline: 'Cloud Media Supply Chains, AI Video & OTT Streaming',
    description:
      'Empowering studios, broadcasters, and streamers to manage digital media assets in the cloud, automate subtitling and localization, and stream ultra-low latency content.',
    gradient: 'from-fuchsia-900 via-purple-900 to-violet-950',
    accentColor: '#9333EA',
    image: '/images/ind_media.jpg',
    iconName: 'play',
    solutions: [
      'Cloud Media Asset Supply Chain & MAM',
      'Ultra-Low Latency OTT Video Streaming Platforms',
      'AI Automated Video Metadata & Localization',
      'Virtual Studio & Immersive 3D Production',
    ],
    impactMetric: '10B+ Streams/Mo',
    impactLabel: '99.999% broadcast-grade streaming reliability',
  },
  {
    id: 'oil-gas',
    name: 'Oil and Gas',
    category: 'industrial',
    categoryLabel: 'Energy & Industrial',
    tagline: 'Digital Oilfields, Pipeline IoT & Decarbonization',
    description:
      'Delivering end-to-end digital transformation for upstream, midstream, and downstream operations with remote wellhead monitoring, pipeline SCADA, and carbon reduction.',
    gradient: 'from-orange-950 via-amber-950 to-neutral-950',
    accentColor: '#EA580C',
    image: '/images/ind_oilgas.jpg',
    iconName: 'layers',
    solutions: [
      'Upstream Digital Oilfield Remote Monitoring',
      'Refinery Asset Integrity IoT & Predictive SRE',
      'Pipeline Leak Detection & Autonomous SCADA',
      'Energy Transition & Emissions Decarbonization',
    ],
    impactMetric: '20% Lower OPEX',
    impactLabel: '10,000+ wellheads under continuous digital surveillance',
  },
  {
    id: 'private-equity',
    name: 'Private Equity',
    category: 'financial',
    categoryLabel: 'Financial Services & Capital Markets',
    tagline: 'Tech Due Diligence, 100-Day EBITDA Value Creation',
    description:
      'Partnering with buyout and growth equity funds to conduct technical and cyber due diligence, accelerate portfolio EBITDA expansion, and orchestrate carve-out integrations.',
    gradient: 'from-slate-900 via-gray-900 to-zinc-950',
    accentColor: '#475569',
    image: '/images/ind_privateequity.jpg',
    iconName: 'chart',
    solutions: [
      'Pre-Deal Tech & Cybersecurity Due Diligence',
      'Rapid 100-Day EBITDA Value Acceleration',
      'Complex IT Carve-Outs & M&A Systems Integration',
      'Cross-Portfolio Tech Synergies & Vendor Rationalization',
    ],
    impactMetric: '3.2x Digital Value',
    impactLabel: 'Enterprise value multiple across 180+ PE portfolios',
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    category: 'consumer',
    categoryLabel: 'Healthcare, Retail & Services',
    tagline: 'PSA Automation, Enterprise Practice ERP & AI Knowledge',
    description:
      'Modernizing global law firms, consultancies, accounting practices, and advisory organizations with intelligent billing, talent allocation, and generative AI research.',
    gradient: 'from-zinc-900 via-slate-900 to-gray-950',
    accentColor: '#64748B',
    image: '/images/ind_professionalservices.jpg',
    iconName: 'users',
    solutions: [
      'Professional Services Automation (PSA) & Talent Allocation',
      'Enterprise Billing, Practice ERP & Time-Capture',
      'Generative AI Knowledge Synthesis & Document Discovery',
      'Zero-Trust Enterprise Confidentiality & Cyber Defense',
    ],
    impactMetric: '40% Utilization Boost',
    impactLabel: 'For top global accounting, consulting & legal firms',
  },
  {
    id: 'retail-consumer-goods',
    name: 'Retail and Consumer Goods',
    category: 'consumer',
    categoryLabel: 'Healthcare, Retail & Services',
    tagline: 'Composable Omnichannel Commerce & AI Demand Sensing',
    description:
      'Empowering consumer brands and retail enterprises to integrate physical stores and digital channels with headless commerce, AI inventory forecasting, and smart store IoT.',
    gradient: 'from-red-900 via-rose-900 to-stone-900',
    accentColor: '#DE0826',
    image: '/images/ind_retail.jpg',
    iconName: 'shopping',
    solutions: [
      'Headless & Composable Omnichannel Commerce',
      'AI Demand Sensing & Real-Time Inventory Optimization',
      'Smart Store Computer Vision & Autonomous Checkout',
      'Hyper-Personalized Customer Loyalty & Promotion Engines',
    ],
    impactMetric: '22% Higher AOV',
    impactLabel: '99.5% real-time inventory tracking accuracy',
  },
  {
    id: 'travel-transportation',
    name: 'Travel, Transportation, Logistics, and Hospitality',
    category: 'consumer',
    categoryLabel: 'Healthcare, Retail & Services',
    tagline: 'Smart Passenger Systems, Fleet Telematics & Dynamic Logistics',
    description:
      'Transforming airlines, railways, cargo fleets, and hospitality chains with modern passenger service systems, intelligent route telematics, and contactless guest experiences.',
    gradient: 'from-sky-950 via-cyan-950 to-blue-900',
    accentColor: '#0284C7',
    image: '/images/ind_travel.jpg',
    iconName: 'car',
    solutions: [
      'Airline Passenger Service Systems (PSS) & Retailing',
      'Fleet Telematics, Asset Tracking & Dynamic Route Dispatch',
      'Smart Airport & Terminal Operational Control Hubs',
      'Hospitality Contactless Guest Journey Platforms',
    ],
    impactMetric: '250M+ Passengers',
    impactLabel: 'Served annually across 80+ airlines & transit hubs',
  },
]


// -------------------------------------------------------------
// Insights Page Implementation (Matching Tech Mahindra Reference)
// -------------------------------------------------------------
interface CaseStudyItem {
  id: string
  title: string
  category: string
  image: string
  summary: string
  metric: string
  client: string
}

interface EventItem {
  id: string
  day: string
  monthYear: string
  title: string
  location: string
  avatar: string
  details: string
}

const caseStudiesList: CaseStudyItem[] = [
  {
    id: 'port-logistics',
    title: 'A Leading Port & Container Terminal Operator Reduces Turnaround Time by 40% with SAP S/4HANA Transformation',
    category: 'Supply Chain & Logistics',
    image: '/images/case_port.jpg',
    summary:
      'Engineered an enterprise-grade digital twin and SAP S/4HANA core modernization across 24 maritime terminals, optimizing berth scheduling and crane utilization in real-time.',
    metric: '40% Faster Vessel Turnaround',
    client: 'Global Port Authority',
  },
  {
    id: 'payment-automation',
    title: 'Global Payments Leader Automates 85% of Invoice Approvals with Agentic AI',
    category: 'Financial Services',
    image: '/images/case_ribbon.jpg',
    summary:
      'Deployed autonomous multi-agent systems to validate complex invoices, cross-reference trade contracts, and detect fraudulent reconciliations with sub-second latency.',
    metric: '85% Autonomous Invoice Clearance',
    client: 'Tier-1 FinTech Leader',
  },
  {
    id: 'insurance-guidewire',
    title: 'Leading North American Insurer Reimagines Insurance Operations with Guidewire Cloud Optimization',
    category: 'Insurance & Risk',
    image: '/images/case_consult.jpg',
    summary:
      'Migrated legacy on-prem policy systems to Guidewire Cloud with automated CI/CD resilience, reducing claims settlement latency while elevating broker satisfaction by 65%.',
    metric: '65% Broker Satisfaction Surge',
    client: 'Fortune 500 Insurer',
  },
]

const upcomingEventsList: EventItem[] = [
  {
    id: 'semicon-india',
    day: '17',
    monthYear: 'MAR 2026',
    title: 'Norstar is a Gold Sponsor at SEMICON India 2026',
    location: 'Yashobhoomi Convention Center, New Delhi | Booth #B24',
    avatar: '/images/event_semicon.jpg',
    details: 'Join our semiconductor VLSI architects for live demonstrations of AI-driven silicon verification and automotive chip design accelerators.',
  },
  {
    id: 'nrf-paris',
    day: '15',
    monthYear: 'APR 2026',
    title: "Join Norstar at NRF 2026: Retail's Big Show Europe",
    location: 'Paris Expo Porte de Versailles, Paris, France | Stand #C12',
    avatar: '/images/event_nrf.jpg',
    details: 'Experience headless commerce in action with computer-vision checkout, AI demand forecasting, and real-time omnichannel inventory engines.',
  },
  {
    id: 'dreamforce-sf',
    day: '15',
    monthYear: 'OCT 2026',
    title: 'Norstar at Dreamforce 2026: Turning AI into Co-Worker',
    location: 'Moscone Center, San Francisco, California',
    avatar: '/images/event_dreamforce.jpg',
    details: 'Keynote panel exploring autonomous CRM agents, generative client intelligence, and zero-downtime Salesforce enterprise migrations.',
  },
]


// -------------------------------------------------------------
// Careers Page Implementation (Matching Tech Mahindra Reference)
// -------------------------------------------------------------
interface JobRole {
  id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
}

const openRolesList: JobRole[] = [
  {
    id: 'ai-architect',
    title: 'Senior Agentic AI & LLM Systems Architect',
    department: 'Artificial Intelligence CoE',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    experience: '7+ Years',
    description:
      'Lead the architecture of enterprise multi-agent swarms, foundational model fine-tuning, and cognitive automation pipelines for Fortune 500 clients.',
  },
  {
    id: 'cloud-sre',
    title: 'Lead Cloud SRE & Sovereign FinOps Specialist',
    department: 'Cloud & Infrastructure',
    location: 'London, UK / Hybrid',
    type: 'Full-time',
    experience: '5+ Years',
    description:
      'Design multi-cloud sovereign landing zones, Kubernetes clusters, and automated cost-optimization engines with zero-downtime tolerance.',
  },
  {
    id: 'erp-consultant',
    title: 'Principal SAP S/4HANA Modernization Consultant',
    department: 'Enterprise Applications',
    location: 'New York, NY / Hybrid',
    type: 'Full-time',
    experience: '8+ Years',
    description:
      'Lead global ERP core migration programs, composable supply chain architectures, and business process re-engineering.',
  },
  {
    id: 'ux-director',
    title: 'Digital Experience & Spatial UX Director',
    department: 'Experience Services',
    location: 'Bengaluru, India / Hybrid',
    type: 'Full-time',
    experience: '6+ Years',
    description:
      'Direct omnichannel design systems, headless digital storefronts, and immersive spatial computing experiences for consumer brands.',
  },
]


// -------------------------------------------------------------
// Contact Us Page Implementation (Matching Reference Screenshot)
// -------------------------------------------------------------
interface OfficeLocation {
  country: string
  cities: { name: string; address: string; phone: string; email: string }[]
}

const globalOfficesData: OfficeLocation[] = [
  {
    country: 'United States',
    cities: [
      {
        name: 'Dallas Corporate Headquarters',
        address: '6000 Connection Drive, Irving, TX 75039',
        phone: '+1 (800) 246-8324',
        email: 'usa@techmahindra.com',
      },
      {
        name: 'San Jose Innovation Center',
        address: '2880 Zanker Road, Suite 203, San Jose, CA 95134',
        phone: '+1 (408) 555-0199',
        email: 'sanjose@techmahindra.com',
      },
      {
        name: 'New York Financial Hub',
        address: '1350 Avenue of the Americas, Floor 22, New York, NY 10019',
        phone: '+1 (212) 555-0182',
        email: 'nyc@techmahindra.com',
      },
    ],
  },
  {
    country: 'Australia',
    cities: [
      {
        name: 'Sydney Regional Office',
        address: 'Level 14, 100 Mount Street, North Sydney, NSW 2060',
        phone: '+61 2 8000 1234',
        email: 'australia@techmahindra.com',
      },
      {
        name: 'Melbourne Delivery Hub',
        address: 'Level 22, 500 Collins Street, Melbourne, VIC 3000',
        phone: '+61 3 9000 5678',
        email: 'melbourne@techmahindra.com',
      },
    ],
  },
  {
    country: 'Austria',
    cities: [
      {
        name: 'Vienna Client Center',
        address: 'Am Belvedere 10, 1100 Wien, Austria',
        phone: '+43 1 234 5678',
        email: 'vienna@techmahindra.com',
      },
    ],
  },
  {
    country: 'Bahrain',
    cities: [
      {
        name: 'Manama Regional Hub',
        address: 'Bahrain Financial Harbour, West Tower, Manama',
        phone: '+973 1700 0000',
        email: 'me@techmahindra.com',
      },
    ],
  },
  {
    country: 'Belgium',
    cities: [
      {
        name: 'Brussels Office',
        address: 'Avenue Louise 523, 1050 Bruxelles, Belgium',
        phone: '+32 2 555 1234',
        email: 'belgium@techmahindra.com',
      },
    ],
  },
  {
    country: 'Brazil',
    cities: [
      {
        name: 'São Paulo Tech Hub',
        address: 'Av. Paulista, 1374 - Bela Vista, São Paulo - SP',
        phone: '+55 11 3000 0000',
        email: 'latam@techmahindra.com',
      },
    ],
  },
  {
    country: 'Bulgaria',
    cities: [
      {
        name: 'Sofia Delivery Center',
        address: 'Megapark, 115G Tsarigradsko Shosse Blvd, Sofia',
        phone: '+359 2 800 0000',
        email: 'sofia@techmahindra.com',
      },
    ],
  },
  {
    country: 'Canada',
    cities: [
      {
        name: 'Toronto Innovation Hub',
        address: '200 Bay Street, Suite 2900, Toronto, ON M5J 2J2',
        phone: '+1 (416) 800-1200',
        email: 'canada@techmahindra.com',
      },
    ],
  },
  {
    country: 'China',
    cities: [
      {
        name: 'Shanghai Client Center',
        address: 'Unit 1801, 18F, Plaza 66, Nanjing West Road, Shanghai',
        phone: '+86 21 6000 0000',
        email: 'china@techmahindra.com',
      },
    ],
  },
  {
    country: 'Denmark',
    cities: [
      {
        name: 'Copenhagen Office',
        address: 'Tuborg Havnevej 18, 2900 Hellerup, Denmark',
        phone: '+45 39 00 00 00',
        email: 'nordics@techmahindra.com',
      },
    ],
  },
  {
    country: 'Finland',
    cities: [
      {
        name: 'Helsinki Hub',
        address: 'Keilaranta 1, 02150 Espoo, Finland',
        phone: '+358 9 800 0000',
        email: 'nordics@techmahindra.com',
      },
    ],
  },
  {
    country: 'France',
    cities: [
      {
        name: 'Paris Hub',
        address: 'Tour Ariane, 5 Place de la Pyramide, 92088 Paris La Défense',
        phone: '+33 1 40 00 00 00',
        email: 'france@techmahindra.com',
      },
    ],
  },
  {
    country: 'Germany',
    cities: [
      {
        name: 'Munich Digital Center',
        address: 'Parkstadt Schwabing, Walter-Gropius-Straße 23, 80807 München',
        phone: '+49 89 2000 0000',
        email: 'germany@techmahindra.com',
      },
    ],
  },
  {
    country: 'India',
    cities: [
      {
        name: 'Pune Global Campus',
        address: 'Rajiv Gandhi Infotech Park, Phase 3, Hinjawadi, Pune 411057',
        phone: '+91 20 6601 8100',
        email: 'india@techmahindra.com',
      },
      {
        name: 'Bengaluru AI & Engineering Center',
        address: 'Electronics City Phase 1, Hosur Road, Bengaluru 560100',
        phone: '+91 80 4000 2000',
        email: 'blr@techmahindra.com',
      },
      {
        name: 'Hyderabad Technology Hub',
        address: 'Infocity, Madhapur, Hyderabad 500081',
        phone: '+91 40 6636 1000',
        email: 'hyd@techmahindra.com',
      },
    ],
  },
  {
    country: 'Ireland',
    cities: [
      {
        name: 'Dublin European Centre',
        address: 'Grand Canal Dock, Dublin 2, Ireland',
        phone: '+353 1 600 0000',
        email: 'ireland@techmahindra.com',
      },
    ],
  },
  {
    country: 'Italy',
    cities: [
      {
        name: 'Milan Office',
        address: 'Via Turati 29, 20121 Milano MI, Italy',
        phone: '+39 02 8000 0000',
        email: 'italy@techmahindra.com',
      },
    ],
  },
  {
    country: 'Japan',
    cities: [
      {
        name: 'Tokyo Client Hub',
        address: 'Roppongi Hills Mori Tower, 6-10-1 Roppongi, Minato-ku, Tokyo',
        phone: '+81 3 5000 0000',
        email: 'japan@techmahindra.com',
      },
    ],
  },
  {
    country: 'Malaysia',
    cities: [
      {
        name: 'Kuala Lumpur Tech Center',
        address: 'Menara Maxis, Kuala Lumpur City Centre, 50088 Kuala Lumpur',
        phone: '+60 3 2000 0000',
        email: 'apac@techmahindra.com',
      },
    ],
  },
  {
    country: 'Mexico',
    cities: [
      {
        name: 'Mexico City Hub',
        address: 'Paseo de la Reforma 222, Juárez, Cuauhtémoc, 06600 Ciudad de México',
        phone: '+52 55 5000 0000',
        email: 'latam@techmahindra.com',
      },
    ],
  },
  {
    country: 'Netherlands',
    cities: [
      {
        name: 'Amsterdam Hub',
        address: 'Gustav Mahlerplein 2, 1082 MA Amsterdam',
        phone: '+31 20 800 0000',
        email: 'benelux@techmahindra.com',
      },
    ],
  },
  {
    country: 'New Zealand',
    cities: [
      {
        name: 'Auckland Office',
        address: 'Level 21, ANZ Centre, 23-29 Albert St, Auckland 1010',
        phone: '+64 9 900 0000',
        email: 'anz@techmahindra.com',
      },
    ],
  },
  {
    country: 'Norway',
    cities: [
      {
        name: 'Oslo Delivery Hub',
        address: 'Karenslyst Allé 11, 0278 Oslo, Norway',
        phone: '+47 22 00 00 00',
        email: 'nordics@techmahindra.com',
      },
    ],
  },
  {
    country: 'Philippines',
    cities: [
      {
        name: 'Manila BPO Center',
        address: 'Bonifacio Global City, Taguig, Metro Manila',
        phone: '+63 2 800 0000',
        email: 'apac@techmahindra.com',
      },
    ],
  },
  {
    country: 'Poland',
    cities: [
      {
        name: 'Warsaw Delivery Center',
        address: 'Rondo Daszyńskiego 1, 00-843 Warszawa',
        phone: '+48 22 500 0000',
        email: 'poland@techmahindra.com',
      },
    ],
  },
  {
    country: 'Qatar',
    cities: [
      {
        name: 'Doha Business Hub',
        address: 'Tornado Tower, West Bay, Doha, Qatar',
        phone: '+974 4400 0000',
        email: 'me@techmahindra.com',
      },
    ],
  },
  {
    country: 'Saudi Arabia',
    cities: [
      {
        name: 'Riyadh Regional Office',
        address: 'King Fahd Road, Al Olaya, Riyadh 12213',
        phone: '+966 11 400 0000',
        email: 'ksa@techmahindra.com',
      },
    ],
  },
  {
    country: 'Singapore',
    cities: [
      {
        name: 'APAC Headquarters',
        address: '1 Changi Business Park Crescent, Plaza 8, Singapore 486025',
        phone: '+65 6000 1000',
        email: 'apac@techmahindra.com',
      },
    ],
  },
  {
    country: 'South Africa',
    cities: [
      {
        name: 'Johannesburg Center',
        address: 'Sandton City Office Tower, 5th St, Sandhurst, Sandton',
        phone: '+27 11 700 0000',
        email: 'africa@techmahindra.com',
      },
    ],
  },
  {
    country: 'Spain',
    cities: [
      {
        name: 'Madrid Office',
        address: 'Paseo de la Castellana 95, 28046 Madrid',
        phone: '+34 91 700 0000',
        email: 'spain@techmahindra.com',
      },
    ],
  },
  {
    country: 'Sweden',
    cities: [
      {
        name: 'Stockholm Nordic HQ',
        address: 'Mäster Samuelsgatan 42, 111 57 Stockholm',
        phone: '+46 8 500 0000',
        email: 'nordics@techmahindra.com',
      },
    ],
  },
  {
    country: 'Switzerland',
    cities: [
      {
        name: 'Zurich Office',
        address: 'Gotthardstrasse 26, 8002 Zürich',
        phone: '+41 44 200 0000',
        email: 'swiss@techmahindra.com',
      },
    ],
  },
  {
    country: 'United Arab Emirates',
    cities: [
      {
        name: 'Dubai Internet City Hub',
        address: 'Building 14, Dubai Internet City, Dubai',
        phone: '+971 4 390 0000',
        email: 'me@techmahindra.com',
      },
    ],
  },
  {
    country: 'United Kingdom',
    cities: [
      {
        name: 'London Corporate Office',
        address: '25 Canada Square, Floor 33, Canary Wharf, London E14 5LB',
        phone: '+44 20 7000 8000',
        email: 'uk@techmahindra.com',
      },
      {
        name: 'Milton Keynes Tech Campus',
        address: 'Exchange House, 450 Midsummer Blvd, Milton Keynes MK9 2EA',
        phone: '+44 1908 555 000',
        email: 'mk@techmahindra.com',
      },
    ],
  },
]

function ContactPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<OfficeLocation>(globalOfficesData[0])
  const [chatBubbleOpen, setChatBubbleOpen] = useState(true)

  // Form State
  const [enquiryType, setEnquiryType] = useState('Request for Service')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('United States')
  const [message, setMessage] = useState('')
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index)
  }

  const filteredOffices = globalOfficesData.filter(
    (item) =>
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cities.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!privacyAgreed) {
      alert('Please agree to our Privacy Policy to submit your enquiry.')
      return
    }
    setSubmitted(true)
  }

  const contactAccordionItems = [
    {
      title: 'Request for Service',
      description:
        'Partner with Tech Mahindra to co-create AI-first enterprise architectures, modernize legacy workloads, or accelerate digital transformation across telecom, financial, cloud, and engineering domains.',
      enquiryType: 'Request for Service',
      contact: 'solutions@techmahindra.com | +1 (800) 246-8324',
    },
    {
      title: 'Join Tech Mahindra',
      description:
        'Explore rewarding careers and leadership pathways across 90+ countries. Rise to new heights with our collaborative global workforce of over 150,000 innovators.',
      enquiryType: 'Join Tech Mahindra',
      contact: 'careers@techmahindra.com',
    },
    {
      title: 'Vendor Registration',
      description:
        'Join our world-class supply chain. We welcome innovative technology, cloud, and hardware vendors committed to sustainability, ethics, and quality engineering.',
      enquiryType: 'Vendor Registration',
      contact: 'procurement@techmahindra.com',
    },
    {
      title: 'Investor Information',
      description:
        'Access financial earnings, SEC and regulatory filings, ESG sustainability reports, shareholder governance, and analyst transcripts.',
      enquiryType: 'Investor Information',
      contact: 'investor.relations@techmahindra.com',
    },
    {
      title: 'Other Requests',
      description:
        'For global media, public relations, keynote appearances, corporate citizenship partnerships, and general queries.',
      enquiryType: 'Other Requests',
      contact: 'media.enquiries@techmahindra.com',
    },
  ]

  return (
    <div className="bg-[#EFECE6] text-gray-900 min-h-screen font-sans">
      {/* 1. Header & 5-Item Expandable Accordion (Matching Screenshot Top) */}
      <section className="bg-[#EFECE6] pt-14 pb-20 px-6 md:px-12 border-b border-gray-300">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-3 font-heading">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-gray-700 font-normal mb-12">
            We would love to hear from you!
          </p>

          {/* 5 Full-Width Accordion Rows with Horizontal Lines */}
          <div className="border-t border-gray-300/80">
            {contactAccordionItems.map((item, idx) => {
              const isOpen = openAccordion === idx
              return (
                <div key={idx} className="border-b border-gray-300/80 transition-colors">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between py-6 text-left group cursor-pointer border-0 bg-transparent"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-950 group-hover:text-[#DE0826] transition-colors font-heading">
                      {item.title}
                    </span>
                    <span className="text-2xl font-light text-gray-800 group-hover:text-[#DE0826] transition-colors pr-2">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-8 pt-2 text-gray-700 text-sm sm:text-base leading-relaxed animate-fadeIn max-w-4xl">
                      <p className="mb-4 text-gray-800">{item.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white/80 rounded border border-gray-300">
                        <span className="text-xs font-semibold text-gray-700">
                          Direct Contact: <strong className="text-gray-950">{item.contact}</strong>
                        </span>
                        <button
                          onClick={() => {
                            setEnquiryType(item.enquiryType)
                            const el = document.getElementById('contact-form-section')
                            if (el) el.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className="bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-colors cursor-pointer border-0 shrink-0"
                        >
                          Submit Inquiry Below
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 2. Global Offices & World Map (Matching Screenshot Middle) */}
      <section className="py-16 md:py-24 bg-[#EFECE6] border-b border-gray-300">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Office Search & Country Directory */}
            <div className="lg:col-span-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-6 font-heading">
                Tech Mahindra's Offices
              </h2>

              {/* Search bar with magnifying glass on the right */}
              <div className="relative mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by office location"
                  className="w-full pl-4 pr-10 py-3 text-xs sm:text-sm bg-transparent border-b-2 border-gray-400 text-gray-900 placeholder-gray-500 focus:border-gray-950 focus:outline-none"
                />
                <div className="absolute right-3 top-3.5 text-gray-600 pointer-events-none">
                  <Icon name="search" className="w-4 h-4" />
                </div>
              </div>

              {/* Scrollable Country List matching screenshot */}
              <div className="max-h-[340px] overflow-y-auto pr-2 space-y-1 divide-y divide-gray-200/60">
                {filteredOffices.map((office) => {
                  const isSelected = selectedCountry.country === office.country
                  return (
                    <button
                      key={office.country}
                      onClick={() => setSelectedCountry(office)}
                      className={`w-full text-left py-2.5 px-2 transition-colors cursor-pointer border-0 bg-transparent flex items-center justify-between text-sm ${
                        isSelected
                          ? 'text-[#DE0826] font-extrabold'
                          : 'text-gray-800 hover:text-gray-950 font-normal'
                      }`}
                    >
                      <span>{office.country}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#DE0826]" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Selected Country Facilities Card */}
              {selectedCountry && (
                <div className="mt-6 p-5 bg-white/90 rounded border border-gray-300/80 shadow-xs">
                  <div className="text-xs uppercase tracking-wider font-bold text-[#DE0826] mb-3">
                    {selectedCountry.country} Office Locations ({selectedCountry.cities.length})
                  </div>
                  <div className="space-y-3.5">
                    {selectedCountry.cities.map((city, cIdx) => (
                      <div key={cIdx} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                        <div className="font-bold text-xs sm:text-sm text-gray-950">{city.name}</div>
                        <div className="text-xs text-gray-600 mt-0.5">{city.address}</div>
                        <div className="text-xs text-gray-700 mt-1">
                          📞 {city.phone} • ✉️ {city.email}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Pinned World Map */}
            <div className="lg:col-span-7">
              <div className="relative rounded overflow-hidden shadow-md border border-gray-300 bg-white group">
                <img
                  src="/images/contact_world_map.jpg"
                  alt="Tech Mahindra Global Offices Map"
                  className="w-full aspect-[16/10] object-cover"
                />

                {/* Regional Pin Callouts Over World Map */}
                <div className="absolute top-[28%] left-[22%] -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 bg-[#DE0826] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                  <span>North America</span>
                </div>
                <div className="absolute top-[24%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 bg-[#DE0826] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                  <span>Europe</span>
                </div>
                <div className="absolute top-[42%] left-[55%] -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 bg-[#DE0826] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                  <span>Middle East</span>
                </div>
                <div className="absolute top-[45%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 bg-[#DE0826] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                  <span>Asia</span>
                </div>
                <div className="absolute top-[52%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 bg-[#DE0826] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                  <span>Africa</span>
                </div>
                <div className="absolute top-[68%] left-[84%] -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 bg-[#DE0826] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                  <span>Australia</span>
                </div>
                <div className="absolute top-[62%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1.5 bg-[#DE0826] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                  <span>Latin America</span>
                </div>
              </div>

              {/* Office Scale Stats Bar */}
              <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-gray-600 font-medium px-1">
                <span>✓ 90+ Countries Worldwide</span>
                <span>✓ 150+ Development & Delivery Hubs</span>
                <span>✓ 24/7 Global Managed Support</span>
              </div>
            </div>
          </div>

          {/* Hiring & Recruitment Fraud Disclaimer Banner (Matching Screenshot Strip) */}
          <div className="mt-12 p-4 bg-[#E5E0D5] border border-gray-300 rounded text-[11px] text-gray-700 leading-relaxed font-normal">
            <strong>Disclaimer:</strong> Beware of fraudulent persons / agencies falsely claiming to be hiring on behalf of Tech Mahindra. Tech Mahindra does not ask for money or any deposit from candidates for any employment opportunity. Tech Mahindra shall not be held liable for any loss or damage incurred as a result of dealings with such fraudulent entities.
          </div>
        </div>
      </section>

      {/* 3. Deep Crimson "Get In Touch" Section (Matching Screenshot Form) */}
      <section
        id="contact-form-section"
        className="py-20 md:py-28 bg-[#520018] text-white relative overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Title */}
            <div className="lg:col-span-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
                Get In Touch
              </h2>
            </div>

            {/* Right Column: Information & Form */}
            <div className="lg:col-span-8">
              <div className="mb-8">
                <h4 className="text-base font-bold text-white mb-1">
                  Need more information?
                </h4>
                <p className="text-xs sm:text-sm text-white/80 font-normal">
                  We will take approximately 2-3 working days to respond to your enquiry.
                </p>
              </div>

              {submitted ? (
                <div className="bg-white/10 backdrop-blur-md rounded p-8 border border-white/20 text-center animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4 border border-green-500/40">
                    <Icon name="check" className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                    Thank You, {firstName || 'Partner'}!
                  </h3>
                  <p className="text-sm text-white/80 max-w-md mx-auto mb-6">
                    Your enquiry regarding <strong>{enquiryType}</strong> has been received. Our team will contact you within 2-3 working days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFirstName('')
                      setLastName('')
                      setEmail('')
                      setMessage('')
                      setOrganisation('')
                      setJobTitle('')
                      setPhone('')
                    }}
                    className="border border-white text-white font-bold text-xs uppercase tracking-widest px-8 py-3 bg-transparent hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-7">
                  {/* Type of enquiry */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-2 font-semibold">
                      * Type of enquiry
                    </label>
                    <select
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value)}
                      className="w-full bg-transparent border-b border-white/40 text-white text-sm py-2.5 px-0 focus:border-white focus:outline-none cursor-pointer"
                    >
                      <option value="Request for Service" className="bg-[#520018] text-white">
                        Select an enquiry type
                      </option>
                      <option value="Request for Service" className="bg-[#520018] text-white">
                        Request for Service
                      </option>
                      <option value="Join Tech Mahindra" className="bg-[#520018] text-white">
                        Join Tech Mahindra (Careers)
                      </option>
                      <option value="Vendor Registration" className="bg-[#520018] text-white">
                        Vendor Registration
                      </option>
                      <option value="Investor Information" className="bg-[#520018] text-white">
                        Investor Information
                      </option>
                      <option value="Other Requests" className="bg-[#520018] text-white">
                        Other Requests
                      </option>
                    </select>
                  </div>

                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                        * First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                        * Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email & Organization Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                        * Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                        * Organization
                      </label>
                      <input
                        type="text"
                        required
                        value={organisation}
                        onChange={(e) => setOrganisation(e.target.value)}
                        className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Job Title & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                      * Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-transparent border-b border-white/40 text-white text-sm py-2.5 px-0 focus:border-white focus:outline-none cursor-pointer"
                    >
                      <option value="United States" className="bg-[#520018] text-white">
                        Select Country
                      </option>
                      {globalOfficesData.map((o) => (
                        <option key={o.country} value={o.country} className="bg-[#520018] text-white">
                          {o.country}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                      * Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2 focus:border-white focus:outline-none resize-y"
                    />
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="space-y-3 pt-2 text-xs text-white/90">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyAgreed}
                        onChange={(e) => setPrivacyAgreed(e.target.checked)}
                        className="mt-0.5 rounded border-white/40 text-[#DE0826] focus:ring-0 cursor-pointer"
                      />
                      <span>
                        By clicking Submit, you agree to our{' '}
                        <a href="#privacy" className="underline hover:text-white">
                          Privacy Policy
                        </a>.
                      </span>
                    </label>

                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newsletterSubscribed}
                        onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                        className="mt-0.5 rounded border-white/40 text-[#DE0826] focus:ring-0 cursor-pointer"
                      />
                      <span>
                        Subscribe to receive the latest updates on events, news and thought leadership from Tech Mahindra.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="border border-white text-white font-bold text-xs uppercase tracking-widest px-10 py-3.5 bg-transparent hover:bg-white/15 transition-all duration-300 cursor-pointer"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Inquiry Assistant Widget (Matching Screenshot Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-end space-x-3 select-none">
        {chatBubbleOpen && (
          <div className="bg-white rounded p-3.5 shadow-2xl border border-gray-200 max-w-xs text-xs text-gray-800 leading-relaxed animate-fadeIn relative">
            <button
              onClick={() => setChatBubbleOpen(false)}
              className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-600 p-0.5"
              aria-label="Close message"
            >
              ×
            </button>
            <p>
              Hello! Thank you for visiting our Contact Us page. How may we help submit your inquiry to Tech Mahindra?
            </p>
          </div>
        )}
        <button
          onClick={() => setChatBubbleOpen(!chatBubbleOpen)}
          aria-label="Contact Assistant"
          className="w-12 h-12 rounded-full bg-[#DE0826] hover:bg-[#BE001D] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer border-0"
        >
          <Icon name="email" className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// Global Contact Us Section (Featured Before Footer On Every Page)
// -------------------------------------------------------------
function ContactUsSection() {
  const [enquiryType, setEnquiryType] = useState('Request for Service')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('United States')
  const [message, setMessage] = useState('')
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!privacyAgreed) {
      alert('Please agree to the Privacy Policy to submit your enquiry.')
      return
    }
    setSubmitted(true)
  }

  return (
    <section id="contact-us-section" className="py-20 md:py-28 bg-[#4E0519] text-white relative overflow-hidden border-t border-red-950">
      {/* Subtle atmospheric ambient glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#DE0826] rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#DE0826] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Info & Response Time Promise */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 font-heading">
              Contact Us
            </h2>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-md font-normal mb-8">
              Ready to accelerate your digital transformation? Share your vision with our global team of solution architects, engineers, and consultants.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-sm text-white/90">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon name="phone" className="w-4 h-4 text-white" />
                </div>
                <span>+1 (800) 246-8324 / +91 (20) 6601-8100</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/90">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon name="email" className="w-4 h-4 text-white" />
                </div>
                <span>solutions@norstar-digital.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/90">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon name="globe" className="w-4 h-4 text-white" />
                </div>
                <span>150+ Delivery Centers Across 90+ Countries</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 max-w-md shadow-sm">
              <div className="text-xs uppercase tracking-wider font-bold text-red-300 mb-2">
                Direct Response Guarantee
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                All submissions are directly routed to the appropriate sector practice leaders. Expect a tailored response within <strong>24 to 48 hours</strong>.
              </p>
            </div>
          </div>

          {/* Right: The Enterprise Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 text-center animate-fadeIn shadow-xl">
                <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4 border border-green-500/40">
                  <Icon name="check" className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                  Thank You, {firstName || 'Partner'}!
                </h3>
                <p className="text-sm text-white/80 max-w-md mx-auto mb-6">
                  Your enquiry regarding <strong>{enquiryType}</strong> has been received. Our sector specialist will reach out within 24-48 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFirstName('')
                    setLastName('')
                    setEmail('')
                    setMessage('')
                    setOrganisation('')
                    setJobTitle('')
                    setPhone('')
                  }}
                  className="bg-white text-[#4E0519] font-bold text-xs uppercase tracking-widest px-8 py-3 rounded hover:bg-gray-100 transition-colors cursor-pointer border-0"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type of enquiry */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-2 font-semibold">
                    * Type of enquiry
                  </label>
                  <select
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value)}
                    className="w-full bg-[#3D0313] border-b-2 border-white/40 text-white text-sm py-3 px-2 focus:border-white focus:outline-none rounded-none cursor-pointer"
                  >
                    <option value="Request for Service" className="bg-[#3D0313] text-white">Request for Service</option>
                    <option value="Join Norstar" className="bg-[#3D0313] text-white">Join Norstar (Careers)</option>
                    <option value="Vendor Registration" className="bg-[#3D0313] text-white">Vendor Registration</option>
                    <option value="Investor Information" className="bg-[#3D0313] text-white">Investor Information</option>
                    <option value="Media & Press" className="bg-[#3D0313] text-white">Media & Press</option>
                    <option value="Other Requests" className="bg-[#3D0313] text-white">Other Requests</option>
                  </select>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                      * First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2.5 focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                      * Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2.5 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email & Organisation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                      * Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="corporate.email@domain.com"
                      className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2.5 focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                      * Organisation
                    </label>
                    <input
                      type="text"
                      required
                      value={organisation}
                      onChange={(e) => setOrganisation(e.target.value)}
                      placeholder="Company / Institution"
                      className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2.5 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Job Title & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Chief Technology Officer"
                      className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2.5 focus:border-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2.5 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                    * Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#3D0313] border-b-2 border-white/40 text-white text-sm py-3 px-2 focus:border-white focus:outline-none rounded-none cursor-pointer"
                  >
                    <option value="United States" className="bg-[#3D0313] text-white">United States</option>
                    <option value="United Kingdom" className="bg-[#3D0313] text-white">United Kingdom</option>
                    <option value="India" className="bg-[#3D0313] text-white">India</option>
                    <option value="Australia" className="bg-[#3D0313] text-white">Australia</option>
                    <option value="Germany" className="bg-[#3D0313] text-white">Germany</option>
                    <option value="Canada" className="bg-[#3D0313] text-white">Canada</option>
                    <option value="Singapore" className="bg-[#3D0313] text-white">Singapore</option>
                    <option value="United Arab Emirates" className="bg-[#3D0313] text-white">United Arab Emirates</option>
                    <option value="Other" className="bg-[#3D0313] text-white">Other Country</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-1 font-semibold">
                    * Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your requirements or questions with our enterprise team..."
                    className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/40 text-sm py-2.5 focus:border-white focus:outline-none resize-none"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start space-x-3 cursor-pointer select-none text-xs text-white/90">
                    <input
                      type="checkbox"
                      checked={privacyAgreed}
                      onChange={(e) => setPrivacyAgreed(e.target.checked)}
                      className="mt-0.5 rounded border-white/40 text-[#DE0826] focus:ring-0"
                    />
                    <span>
                      By clicking Submit, you agree to our{' '}
                      <a href="#privacy" className="underline hover:text-red-200">
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer select-none text-xs text-white/90">
                    <input
                      type="checkbox"
                      checked={newsletterSubscribed}
                      onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                      className="mt-0.5 rounded border-white/40 text-[#DE0826] focus:ring-0"
                    />
                    <span>
                      Subscribe to receive the latest updates on events, news and thought leadership from Norstar.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="border-2 border-white text-white font-bold text-xs uppercase tracking-widest px-10 py-3.5 hover:bg-white hover:text-[#4E0519] transition-all duration-200 cursor-pointer bg-transparent"
                  >
                    SUBMIT ENQUIRY
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null)
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [appliedRole, setAppliedRole] = useState<string>('')
  const [applySubmitted, setApplySubmitted] = useState(false)
  const [purposeModalOpen, setPurposeModalOpen] = useState(false)
  const [diversityModalOpen, setDiversityModalOpen] = useState(false)
  const [alumniModalOpen, setAlumniModalOpen] = useState(false)
  const [roleSearch, setRoleSearch] = useState('')

  const filteredRoles = openRolesList.filter((role) => {
    return (
      role.title.toLowerCase().includes(roleSearch.toLowerCase()) ||
      role.location.toLowerCase().includes(roleSearch.toLowerCase())
    )
  })

  return (
    <div className="bg-[#FAF8F5] text-gray-900 min-h-screen font-sans">
      {/* 1. Careers Hero Banner */}
      <section className="relative bg-[#FAF8F5] bg-pinstripes border-b border-gray-200 overflow-hidden py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Title & Intro */}
            <div className="lg:col-span-5 pr-0 lg:pr-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight font-heading">
                Careers
              </h1>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-lg font-normal">
                Explore hyper-personalized, technology-led, human-centered experiences that create moments that matter.
              </p>
            </div>

            {/* Right Slanted Hero Graphic matching exact reference screenshot */}
            <div className="lg:col-span-7 flex justify-end">
              <div
                className="w-full max-w-[720px] h-[340px] sm:h-[420px] lg:h-[480px] overflow-hidden shadow-2xl"
                style={{
                  clipPath: 'polygon(0 20%, 100% 0, 100% 80%, 0 100%)'
                }}
              >
                <img
                  src="/images/careers_hero.jpg"
                  alt="Norstar Careers Executive Boardroom"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Alternating Row 1: Meaningful Human Experiences (Image Left, Text Right) */}
      <section className="py-16 md:py-20 bg-[#FAF8F5] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Image of Colleagues in Discussion */}
            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden shadow-md aspect-[16/11] max-w-xl mx-auto lg:mx-0">
                <img
                  src="/images/careers_purpose.jpg"
                  alt="Meaningful human experiences"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right: Copy & Button */}
            <div className="lg:col-span-6">
              <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-normal mb-8 max-w-lg">
                We are a company with the purpose of creating meaningful human experiences for our associates. Let's help you Rise to new heights, the Norstar way.
              </p>
              <button
                onClick={() => setPurposeModalOpen(true)}
                className="bg-[#DE0826] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-none hover:bg-[#BE001D] transition-colors shadow-sm cursor-pointer border-0"
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Alternating Row 2: Diversity and Inclusion (Text Left, Image Right) */}
      <section className="py-16 md:py-20 bg-[#FAF8F5] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Copy & Button */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 mb-4 font-heading">
                Diversity and Inclusion
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal mb-8 max-w-lg">
                The different. The difference. We celebrate both. We are intentionally diverse and globally inclusive.
              </p>
              <button
                onClick={() => setDiversityModalOpen(true)}
                className="bg-[#DE0826] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-none hover:bg-[#BE001D] transition-colors shadow-sm cursor-pointer border-0"
              >
                LEARN MORE
              </button>
            </div>

            {/* Right: Image of Diverse Team Collaborating */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-xl overflow-hidden shadow-md aspect-[16/11] max-w-xl mx-auto lg:mx-0">
                <img
                  src="/images/careers_diversity.jpg"
                  alt="Diversity and Inclusion"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Alternating Row 3: Reconnect with Us (Image Left, Text Right) */}
      <section className="py-16 md:py-20 bg-[#FAF8F5] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Image of Young Professionals at Coffee Table */}
            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden shadow-md aspect-[16/11] max-w-xl mx-auto lg:mx-0">
                <img
                  src="/images/careers_alumni.jpg"
                  alt="Reconnect with Us - Norstar Alumni"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right: Copy & Button */}
            <div className="lg:col-span-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 mb-4 font-heading">
                Reconnect with Us
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal mb-8 max-w-lg">
                Get answers, explore return opportunities, join the alumni community, subscribe to updates in the newsletter and inspire the world with your Norstar story. Be part of our alumni portal.
              </p>
              <button
                onClick={() => setAlumniModalOpen(true)}
                className="bg-[#DE0826] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-none hover:bg-[#BE001D] transition-colors shadow-sm cursor-pointer border-0"
              >
                VISIT ALUMNI PORTAL
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Full-Width Dark Feature Banner: Connect and Grow */}
      <section className="relative bg-[#1a1412] text-white overflow-hidden py-16 md:py-24 border-b border-gray-800">
        {/* Subtle geometric linear accents matching reference screenshot */}
        <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" y1="100%" x2="90%" y2="0" stroke="white" strokeWidth="1" />
            <line x1="25%" y1="100%" x2="105%" y2="0" stroke="white" strokeWidth="1" />
            <line x1="40%" y1="100%" x2="120%" y2="0" stroke="white" strokeWidth="1" />
            <line x1="55%" y1="100%" x2="135%" y2="0" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Image: Both Colleagues clearly visible */}
            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden shadow-2xl aspect-[16/9] max-w-2xl mx-auto lg:mx-0">
                <img
                  src="/images/careers_connect.jpg"
                  alt="Connect and Grow at Norstar"
                  className="w-full h-full object-cover object-left"
                />
              </div>
            </div>

            {/* Right: Copy & White Join Us Button */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 font-heading">
                Connect and Grow
              </h2>
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal mb-8 max-w-md">
                At Norstar, you're not just joining a company, you're joining a community. Let's be limitless together.
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById('open-roles-section')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-white text-gray-950 hover:bg-gray-100 hover:text-[#DE0826] text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-none transition-all shadow-md cursor-pointer border-0"
              >
                JOIN US
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Open Roles Portal */}
      <section id="open-roles-section" className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 font-heading">
                Explore Open Positions
              </h2>
              <p className="text-gray-600 text-sm mt-2 max-w-lg">
                Join a global family of 145,000+ digital innovators scaling solutions that impact millions of lives.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mt-6 md:mt-0 flex items-center space-x-3">
              <input
                type="text"
                value={roleSearch}
                onChange={(e) => setRoleSearch(e.target.value)}
                placeholder="Search roles or locations..."
                className="px-4 py-2.5 text-xs border border-gray-300 rounded focus:border-[#DE0826] focus:outline-none w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] rounded-xl p-6 sm:p-8 transition-all hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-[#DE0826] uppercase tracking-wider">
                      {role.department}
                    </span>
                    <span className="text-xs bg-gray-200/80 px-2.5 py-1 rounded font-medium text-gray-700">
                      {role.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 mb-2 leading-snug font-heading">
                    {role.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 flex items-center space-x-3">
                    <span>📍 {role.location}</span>
                    <span>•</span>
                    <span>⏱ {role.experience}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                    {role.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedRole(role)
                      setAppliedRole(role.title)
                      setApplyModalOpen(true)
                    }}
                    className="bg-[#DE0826] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded hover:bg-[#BE001D] transition-colors cursor-pointer border-0"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRole(role)
                      setAppliedRole(role.title)
                      setApplyModalOpen(true)
                    }}
                    className="text-xs font-semibold text-gray-600 hover:text-[#DE0826] cursor-pointer border-0 bg-transparent"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose Modal */}
      {purposeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl border border-gray-200 p-6 sm:p-8 relative">
            <button
              onClick={() => setPurposeModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer border-0 bg-transparent"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-[#DE0826] uppercase tracking-wider mb-2">Our Culture</div>
            <h3 className="text-2xl font-extrabold text-gray-950 mb-4 font-heading">Rise to New Heights</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              At Norstar, our foundational Rise philosophy guides everything we do. We empower each of our 145,000+ associates through continuous upskilling, mentorship programs, and intrapreneurship labs.
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-3 bg-red-50 rounded-lg text-xs font-semibold text-gray-800 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#DE0826]" />
                <span>Accept No Limits: Challenging convention to invent the future</span>
              </div>
              <div className="p-3 bg-red-50 rounded-lg text-xs font-semibold text-gray-800 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#DE0826]" />
                <span>Alternative Thinking: Fostering innovative solutions through diverse mindsets</span>
              </div>
              <div className="p-3 bg-red-50 rounded-lg text-xs font-semibold text-gray-800 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#DE0826]" />
                <span>Driving Positive Change: Generating sustainable impact for society</span>
              </div>
            </div>
            <button
              onClick={() => setPurposeModalOpen(false)}
              className="w-full bg-[#DE0826] text-white py-2.5 rounded text-xs font-bold hover:bg-[#BE001D] cursor-pointer border-0"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Diversity Modal */}
      {diversityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl border border-gray-200 p-6 sm:p-8 relative">
            <button
              onClick={() => setDiversityModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer border-0 bg-transparent"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-[#DE0826] uppercase tracking-wider mb-2">Belonging at Norstar</div>
            <h3 className="text-2xl font-extrabold text-gray-950 mb-4 font-heading">Intentionally Diverse, Globally Inclusive</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              We operate across 90+ countries with representation from over 100 nationalities. Our Global Inclusion Council oversees equitable pay, equal opportunity leadership tracks, and employee resource groups.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-extrabold text-[#DE0826]">36%+</div>
                <div className="text-[11px] text-gray-500 font-semibold mt-1">Women in Workforce</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-extrabold text-gray-900">90+</div>
                <div className="text-[11px] text-gray-500 font-semibold mt-1">Countries Represented</div>
              </div>
            </div>
            <button
              onClick={() => setDiversityModalOpen(false)}
              className="w-full bg-[#DE0826] text-white py-2.5 rounded text-xs font-bold hover:bg-[#BE001D] cursor-pointer border-0"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Alumni Modal */}
      {alumniModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl border border-gray-200 p-6 sm:p-8 relative">
            <button
              onClick={() => setAlumniModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer border-0 bg-transparent"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-[#DE0826] uppercase tracking-wider mb-2">Alumni Network</div>
            <h3 className="text-2xl font-extrabold text-gray-950 mb-4 font-heading">Welcome Back to Norstar</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Once an associate, always part of the Norstar family. The Alumni Portal offers boomerang return pathways, executive networking, and community updates.
            </p>
            <div className="p-4 bg-red-50 rounded-lg mb-6 text-xs text-gray-800 leading-relaxed">
              Join 50,000+ alumni global innovators exchanging insights and co-creating business partnerships worldwide.
            </div>
            <button
              onClick={() => setAlumniModalOpen(false)}
              className="w-full bg-[#DE0826] text-white py-2.5 rounded text-xs font-bold hover:bg-[#BE001D] cursor-pointer border-0"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full rounded-xl shadow-2xl border border-gray-200 p-6 relative">
            <button
              onClick={() => {
                setApplyModalOpen(false)
                setApplySubmitted(false)
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer border-0 bg-transparent"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>

            {applySubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="check" className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-950 mb-1 font-heading">Application Submitted!</h4>
                <p className="text-xs text-gray-600 mb-6">
                  Thank you for applying for {appliedRole}. Our talent acquisition team will review your profile and follow up within 3 business days.
                </p>
                <button
                  onClick={() => {
                    setApplyModalOpen(false)
                    setApplySubmitted(false)
                  }}
                  className="bg-[#DE0826] text-white px-6 py-2 rounded text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-950 mb-1 font-heading">Apply for Role</h3>
                <p className="text-xs text-gray-500 mb-4 font-semibold text-[#DE0826]">{appliedRole}</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setApplySubmitted(true)
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#DE0826] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@domain.com"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#DE0826] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">LinkedIn Profile / Portfolio</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/alexmorgan"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#DE0826] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Upload Resume (PDF/DOCX)</label>
                    <input
                      type="file"
                      className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-[#DE0826] hover:file:bg-red-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#DE0826] text-white py-2.5 rounded font-bold text-xs hover:bg-[#BE001D] transition-colors mt-3 cursor-pointer border-0"
                  >
                    Submit Application
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function InsightsPage() {
  const [selectedCase, setSelectedCase] = useState<CaseStudyItem | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [newsModalOpen, setNewsModalOpen] = useState(false)
  const [viewsModalOpen, setViewsModalOpen] = useState(false)
  const [regModalOpen, setRegModalOpen] = useState(false)
  const [regSubmitted, setRegSubmitted] = useState(false)

  return (
    <div className="bg-[#FAF8F5] text-gray-900 min-h-screen">
      {/* 1. Hero Section ("Insights") */}
      <section className="relative bg-[#FAF8F5] bg-pinstripes border-b border-gray-200 overflow-hidden py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Breadcrumb Header */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 mb-6 uppercase tracking-wider">
            <span className="hover:text-[#DE0826] cursor-pointer">Home</span>
            <span>/</span>
            <span className="text-[#DE0826]">Insights</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Title & Intro */}
            <div className="lg:col-span-6 pr-0 lg:pr-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                Insights
              </h1>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-lg font-normal">
                Dive in here for our the latest corporate and press releases, case studies, blogs, podcasts, reports and upcoming events.
              </p>
            </div>

            {/* Right Angled Frame with Professional Reviewing Digital Tablet */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-red-500/20 via-blue-500/20 to-purple-500/20 p-2 border border-neutral-300/80 shadow-xl backdrop-blur-md">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-inner">
                  <img
                    src="/images/insights_hero.jpg"
                    alt="Norstar Digital Insights"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle red corner markers */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#DE0826] opacity-80" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#DE0826] opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Press Release: Cisco Cyber Resilience Fabric */}
      <section className="py-16 md:py-24 bg-[#FAF8F5] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Deep Royal Blue Cyber Waves Graphic */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 group cursor-pointer" onClick={() => setNewsModalOpen(true)}>
                <img
                  src="/images/insights_cyber.jpg"
                  alt="Cyber Resilience Fabric"
                  className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#DE0826] text-white text-[11px] font-bold uppercase tracking-wider rounded">
                  Featured News
                </div>
              </div>
            </div>

            {/* Right: Article Copy */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <h2
                  onClick={() => setNewsModalOpen(true)}
                  className="text-2xl sm:text-3xl font-extrabold text-gray-950 leading-snug hover:text-[#DE0826] transition-colors cursor-pointer mb-4"
                >
                  Norstar and Cisco Partner to Launch Cyber Resilience Fabric to Advance Threat Detection and Digital Resilience
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  Norstar, a leading global provider of technology consulting and digital solutions, announced today a strategic collaboration with Cisco to deploy a unified Cyber Resilience Fabric that converges IT/OT telemetry, automated threat neutralization, and AI-first sovereign cloud defense.
                </p>
                <button
                  onClick={() => setNewsModalOpen(true)}
                  className="inline-flex items-center space-x-2 text-sm font-bold text-gray-950 hover:text-[#DE0826] transition-colors group cursor-pointer border-0 bg-transparent p-0"
                >
                  <span>Read More</span>
                  <Icon name="arrow-right" className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#DE0826]" />
                </button>
              </div>

              {/* Progress Line and Action Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-[#DE0826] rounded-full" />
                </div>
                <button
                  onClick={() => setNewsModalOpen(true)}
                  className="bg-[#DE0826] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded hover:bg-[#BE001D] transition-colors shadow-sm self-start sm:self-auto cursor-pointer border-0"
                >
                  SEE ALL NEWS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Views: Quantum Machine Learning */}
      <section className="py-16 md:py-24 bg-[#EBE7DF] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Section Header with Carousel Arrows */}
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950">
              Featured Views
            </h2>
            <div className="flex items-center space-x-2">
              <button
                aria-label="Previous view"
                className="w-10 h-10 rounded-full border border-gray-400/80 hover:border-[#DE0826] hover:text-[#DE0826] bg-transparent flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
              >
                <Icon name="chevron-left" className="w-4 h-4" />
              </button>
              <button
                aria-label="Next view"
                className="w-10 h-10 rounded-full border border-gray-400/80 hover:border-[#DE0826] hover:text-[#DE0826] bg-transparent flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
              >
                <Icon name="chevron-right" className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Article Copy */}
            <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-between">
              <div>
                <h3
                  onClick={() => setViewsModalOpen(true)}
                  className="text-2xl sm:text-3xl font-extrabold text-gray-950 leading-snug hover:text-[#DE0826] transition-colors cursor-pointer mb-4"
                >
                  Quantum Machine Learning vs Classical Deep Learning: A Service-Provider View on the Next Horizon
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  Moving from Classical Deep Learning to Quantum Learning in the modern enterprise, our view deep-dives into quantum annealing, hybrid classical-quantum optimization, and algorithms that will redefine pharmaceutical discovery and cryptographic resilience.
                </p>
                <button
                  onClick={() => setViewsModalOpen(true)}
                  className="inline-flex items-center space-x-2 text-sm font-bold text-gray-950 hover:text-[#DE0826] transition-colors group cursor-pointer border-0 bg-transparent p-0"
                >
                  <span>Read More</span>
                  <Icon name="arrow-right" className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#DE0826]" />
                </button>
              </div>

              {/* Progress Line and Action Button */}
              <div className="mt-8 pt-6 border-t border-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="w-48 h-1 bg-gray-300 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-[#DE0826] rounded-full" />
                </div>
                <button
                  onClick={() => setViewsModalOpen(true)}
                  className="bg-[#DE0826] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded hover:bg-[#BE001D] transition-colors shadow-sm self-start sm:self-auto cursor-pointer border-0"
                >
                  SEE ALL VIEWS
                </button>
              </div>
            </div>

            {/* Right: Quantum Glass Discs Image */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-300 group cursor-pointer" onClick={() => setViewsModalOpen(true)}>
                <img
                  src="/images/insights_quantum.jpg"
                  alt="Quantum Machine Learning Optics"
                  className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Case Studies (3-Card Horizontal Showcase) */}
      <section className="py-16 md:py-24 bg-[#FAF8F5] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950">
              Case Studies
            </h2>
            <div className="flex items-center space-x-2">
              <button
                aria-label="Previous case studies"
                className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#DE0826] hover:text-[#DE0826] bg-white flex items-center justify-center text-gray-700 transition-colors cursor-pointer shadow-sm"
              >
                <Icon name="chevron-left" className="w-4 h-4" />
              </button>
              <button
                aria-label="Next case studies"
                className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#DE0826] hover:text-[#DE0826] bg-white flex items-center justify-center text-gray-700 transition-colors cursor-pointer shadow-sm"
              >
                <Icon name="chevron-right" className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudiesList.map((cs) => (
              <div
                key={cs.id}
                onClick={() => setSelectedCase(cs)}
                className="group bg-[#EBE7DF] hover:bg-white border border-transparent hover:border-[#DE0826] transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer shadow-xs hover:shadow-xl"
              >
                <div>
                  <div className="overflow-hidden rounded-lg mb-6 shadow-sm aspect-[4/3]">
                    <img
                      src={cs.image}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[#DE0826] uppercase tracking-wider block mb-2">
                    {cs.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-[#DE0826] transition-colors leading-snug">
                    {cs.title}
                  </h3>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-300/80 flex items-center justify-between text-xs font-bold text-gray-700 group-hover:text-[#DE0826]">
                  <span>Explore Case Study</span>
                  <Icon name="arrow-right" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar & CTA */}
          <div className="mt-12 flex flex-col items-center justify-center gap-6">
            <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-[#DE0826] rounded-full" />
            </div>
            <button
              onClick={() => setSelectedCase(caseStudiesList[0])}
              className="bg-[#DE0826] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded hover:bg-[#BE001D] transition-colors shadow-sm cursor-pointer border-0"
            >
              SEE ALL CASE STUDIES
            </button>
          </div>
        </div>
      </section>

      {/* 5. Events Section (Upcoming Conferences & Summits) */}
      <section className="py-16 md:py-24 bg-[#EBE7DF] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mb-12">
            Events
          </h2>

          <div className="space-y-6">
            {upcomingEventsList.map((evt) => (
              <div
                key={evt.id}
                onClick={() => {
                  setSelectedEvent(evt)
                  setRegModalOpen(true)
                }}
                className="group bg-[#FAF8F5] hover:bg-white p-6 sm:p-8 rounded-xl border border-gray-300/80 hover:border-[#DE0826] transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer"
              >
                <div className="flex items-center space-x-6">
                  {/* Round City Avatar */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border-2 border-gray-200 shadow-sm">
                    <img
                      src={evt.avatar}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Date Column */}
                  <div className="text-left shrink-0 pr-4 border-r border-gray-200">
                    <div className="text-2xl sm:text-3xl font-extrabold text-gray-950 leading-none">
                      {evt.day}
                    </div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">
                      {evt.monthYear}
                    </div>
                  </div>

                  {/* Title and Location */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-[#DE0826] transition-colors leading-snug">
                      {evt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {evt.location}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-end md:self-center">
                  <span className="inline-flex items-center space-x-2 text-xs font-bold text-[#DE0826] group-hover:text-[#BE001D] tracking-wider uppercase">
                    <span>REGISTER NOW</span>
                    <Icon name="arrow-right" className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Centered CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                setSelectedEvent(upcomingEventsList[0])
                setRegModalOpen(true)
              }}
              className="bg-[#DE0826] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded hover:bg-[#BE001D] transition-colors shadow-sm cursor-pointer border-0"
            >
              SEE ALL EVENTS
            </button>
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white max-w-2xl w-full rounded-xl shadow-2xl border border-gray-200 overflow-hidden relative">
            <div className="relative aspect-[16/9] w-full">
              <img src={selectedCase.image} alt={selectedCase.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 bg-black/60 text-white hover:bg-black p-2 rounded-full cursor-pointer border-0"
              >
                <Icon name="close" className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#DE0826] text-white text-xs font-bold rounded">
                {selectedCase.category}
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 mb-3 leading-snug">
                {selectedCase.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6 font-normal">
                {selectedCase.summary}
              </p>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs uppercase font-bold text-[#DE0826]">Key Transformation Metric</div>
                  <div className="text-lg font-bold text-gray-950 mt-0.5">{selectedCase.metric}</div>
                </div>
                <div className="text-xs text-gray-500 font-semibold">{selectedCase.client}</div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded cursor-pointer border-0"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured News Article Modal */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-2xl w-full rounded-xl shadow-2xl border border-gray-200 p-6 sm:p-8 relative">
            <button
              onClick={() => setNewsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer border-0 bg-transparent"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-[#DE0826] uppercase tracking-wider mb-2">Press Release</div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 mb-4 leading-snug">
              Norstar and Cisco Partner to Launch Cyber Resilience Fabric to Advance Threat Detection and Digital Resilience
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Norstar, a premier provider of digital transformation and enterprise engineering, today announced a strategic partnership with Cisco to co-develop the Cyber Resilience Fabric. This platform integrates Cisco Security Cloud with Norstar’s managed detection engines to deliver autonomous anomaly isolation across hybrid enterprise networks.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              With enterprise attack surfaces expanding across edge IoT, cloud microservices, and remote endpoints, this alliance gives global organizations a unified operational dashboard for proactive resilience and automated compliance governance.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setNewsModalOpen(false)}
                className="bg-[#DE0826] text-white px-6 py-2.5 rounded text-xs font-bold hover:bg-[#BE001D] cursor-pointer border-0"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Featured Views Article Modal */}
      {viewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-2xl w-full rounded-xl shadow-2xl border border-gray-200 p-6 sm:p-8 relative">
            <button
              onClick={() => setViewsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer border-0 bg-transparent"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-[#DE0826] uppercase tracking-wider mb-2">Executive Viewpoint</div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 mb-4 leading-snug">
              Quantum Machine Learning vs Classical Deep Learning: A Service-Provider View on the Next Horizon
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              While classical deep learning excels at pattern recognition across unstructured data, combinatorial optimization problems in logistics, molecule synthesis, and financial risk modeling are reaching computational limits.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              Norstar’s Quantum AI CoE is building hybrid architectures that offload specific NP-hard algorithms to quantum processing units (QPUs) while preserving classical cloud pipelines for data ingestion and user experience.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setViewsModalOpen(false)}
                className="bg-[#DE0826] text-white px-6 py-2.5 rounded text-xs font-bold hover:bg-[#BE001D] cursor-pointer border-0"
              >
                Close Viewpoint
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Registration Modal */}
      {regModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full rounded-xl shadow-2xl border border-gray-200 p-6 relative">
            <button
              onClick={() => {
                setRegModalOpen(false)
                setRegSubmitted(false)
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer border-0 bg-transparent"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>

            {regSubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="check" className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-950 mb-1">Registration Confirmed!</h4>
                <p className="text-xs text-gray-600 mb-6">
                  We look forward to connecting with you at {selectedEvent.title}. A calendar invitation has been sent to your email.
                </p>
                <button
                  onClick={() => {
                    setRegModalOpen(false)
                    setRegSubmitted(false)
                  }}
                  className="bg-[#DE0826] text-white px-6 py-2 rounded text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0">
                    <img src={selectedEvent.avatar} alt={selectedEvent.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-950 leading-tight">{selectedEvent.title}</h4>
                    <span className="text-[11px] text-gray-500">{selectedEvent.day} {selectedEvent.monthYear}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-4">{selectedEvent.details}</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setRegSubmitted(true)
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#DE0826] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@enterprise.com"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#DE0826] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Enterprise Global"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#DE0826] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#DE0826] text-white py-2.5 rounded font-bold text-xs hover:bg-[#BE001D] transition-colors mt-3 cursor-pointer border-0"
                  >
                    Reserve Session Pass
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function IndustriesPage({ onNavigateToCapabilities }: { onNavigateToCapabilities?: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeModal, setActiveModal] = useState<IndustryItem | null>(null)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const filteredIndustries =
    selectedCategory === 'all'
      ? allIndustriesList
      : allIndustriesList.filter((item) => item.category === selectedCategory)

  return (
    <div className="bg-[#FAF8F5] text-gray-900 min-h-screen">
      {/* 1. Hero Section ("Industries") */}
      <section className="relative bg-[#FAF8F5] bg-pinstripes border-b border-gray-200 overflow-hidden py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Breadcrumb Header */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 mb-6 uppercase tracking-wider">
            <span className="hover:text-[#DE0826] cursor-pointer">Home</span>
            <span>/</span>
            <span className="text-[#DE0826]">Industries</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Title & Intro */}
            <div className="lg:col-span-6 pr-0 lg:pr-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                Industries
              </h1>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-lg font-normal">
                As industries converge and new industries emerge, we are re-imagining our strategy, solutions, and platforms as well.
              </p>

              {/* Quick Jump Categories */}
              <div className="flex flex-wrap gap-2 mt-8">
                {[
                  { id: 'all', label: 'All Industries (14)' },
                  { id: 'financial', label: 'Financial & Capital Markets' },
                  { id: 'tech', label: 'Communications & Hi-Tech' },
                  { id: 'industrial', label: 'Energy & Industrial' },
                  { id: 'consumer', label: 'Healthcare, Retail & Services' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`text-xs px-4 py-2 rounded font-semibold transition-all cursor-pointer border ${
                      selectedCategory === tab.id
                        ? 'bg-[#DE0826] text-white border-[#DE0826] shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#DE0826] hover:text-[#DE0826]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Diagonal / Parametric Mesh Art Frame */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-xl border border-neutral-300/80 group bg-[#FAF8F5]">
                <img
                  src="/images/ind_hero_mesh.jpg"
                  alt="Norstar Industries Convergence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 14 Industries Grid (Matching Reference Screenshot) */}
      <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Active filter label */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Showing {filteredIndustries.length} of 14 Industry Sectors
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-semibold text-[#DE0826] hover:underline cursor-pointer"
              >
                Reset to All Sectors
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndustries.map((ind) => (
              <div
                key={ind.id}
                onClick={() => setActiveModal(ind)}
                className="group relative bg-[#EBE7DF] hover:bg-white p-8 flex flex-col justify-between min-h-[340px] border border-transparent hover:border-[#DE0826] transition-all duration-300 cursor-pointer shadow-xs hover:shadow-xl"
              >
                {/* Top/Center: Circular High-Resolution Photo Orb */}
                <div className="w-full flex items-center justify-center pt-4 pb-8">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full shadow-md flex items-center justify-center overflow-hidden border-2 border-white/90 bg-neutral-200 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Bottom Title & Right Arrow (Exact layout from screenshot) */}
                <div className="w-full pt-4 border-t border-gray-300/60 group-hover:border-red-200 transition-colors flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-[#DE0826] transition-colors pr-3 leading-snug">
                    {ind.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 group-hover:text-[#DE0826] group-hover:translate-x-1 transition-all shrink-0">
                    <Icon name="arrow-right" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Cross-Industry Convergence Highlight */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mb-4">
              Cross-Industry Convergence in Action
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Leading organizations no longer operate in industry silos. Norstar builds interoperable digital ecosystems where telecom meets automotive, energy converges with manufacturing, and financial services embed everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF8F5] p-8 border border-gray-200 rounded-xl hover:border-[#DE0826] transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-[#DE0826] text-white flex items-center justify-center mb-6">
                <Icon name="car" className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-3">
                Connected Mobility
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Automotive ER&D merges with 5G telecom edge networks to deliver software-defined vehicles, telematics ecosystems, and autonomous fleets.
              </p>
              <span className="text-xs font-bold text-[#DE0826] flex items-center space-x-1">
                <span>Automotive + Communications</span>
              </span>
            </div>

            <div className="bg-[#FAF8F5] p-8 border border-gray-200 rounded-xl hover:border-[#DE0826] transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-[#DE0826] text-white flex items-center justify-center mb-6">
                <Icon name="zap" className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-3">
                Smart Grids & Factories
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Utilities converge with high-tech manufacturing to optimize energy consumption, monitor supply chains in real time, and achieve Net Zero.
              </p>
              <span className="text-xs font-bold text-[#DE0826] flex items-center space-x-1">
                <span>Energy + Manufacturing</span>
              </span>
            </div>

            <div className="bg-[#FAF8F5] p-8 border border-gray-200 rounded-xl hover:border-[#DE0826] transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-[#DE0826] text-white flex items-center justify-center mb-6">
                <Icon name="shopping" className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-950 mb-3">
                Embedded Finance
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Retail and consumer goods platforms integrate banking APIs for seamless Buy-Now-Pay-Later (BNPL), instant credit scoring, and frictionless checkout.
              </p>
              <span className="text-xs font-bold text-[#DE0826] flex items-center space-x-1">
                <span>Retail + Financial Services</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Global Scale Metrics */}
      <section className="py-14 bg-[#0A0E27] text-white border-b border-gray-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
            <div className="p-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 font-mono">
                1,100+
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Global Enterprise Clients
              </div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#DE0826] mb-2 font-mono">
                14
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Specialized Industry Sectors
              </div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 font-mono">
                40+
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Industry Centers of Excellence
              </div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#DE0826] mb-2 font-mono">
                90+
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Countries Worldwide
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="relative rounded-2xl bg-gradient-to-r from-red-50 via-white to-red-50 border border-red-200 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 mb-4">
                Ready to Accelerate Your Industry Transformation?
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Connect with our vertical sector leads and technology architects to design, build, and deploy your next-generation enterprise solutions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <button
                onClick={() => setContactModalOpen(true)}
                className="bg-[#DE0826] text-white px-8 py-4 rounded font-bold text-sm hover:bg-[#BE001D] transition-colors shadow-md flex items-center justify-center space-x-2 cursor-pointer border-0"
              >
                <span>Talk to an Industry Specialist</span>
                <Icon name="arrow-right" className="w-4 h-4" />
              </button>
              {onNavigateToCapabilities && (
                <button
                  onClick={onNavigateToCapabilities}
                  className="bg-white text-gray-900 border border-gray-300 px-6 py-4 rounded font-bold text-sm hover:border-[#DE0826] hover:text-[#DE0826] transition-colors cursor-pointer"
                >
                  Explore Capabilities
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Detail Modal for Selected Industry */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white max-w-2xl w-full rounded-xl shadow-2xl border border-gray-200 overflow-hidden relative animate-scaleUp">
            {/* Modal Header */}
            <div
              className={`bg-gradient-to-r ${activeModal.gradient} text-white p-6 sm:p-8 relative`}
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer border-0 bg-transparent"
                aria-label="Close"
              >
                <Icon name="close" className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-between pr-8">
                <div>
                  <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded text-[11px] font-bold uppercase tracking-wider mb-3">
                    {activeModal.categoryLabel}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                    {activeModal.name}
                  </h3>
                  <p className="text-white/80 text-sm mt-2">{activeModal.tagline}</p>
                </div>
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/40 shadow-lg shrink-0 hidden sm:block">
                  <img src={activeModal.image} alt={activeModal.name} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">
                  Transformation Overview
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {activeModal.description}
                </p>
              </div>

              {/* Solution Pillars */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3">
                  Key Digital Solutions & Offerings
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModal.solutions.map((sol, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100 text-xs font-medium text-gray-800"
                    >
                      <div className="w-4 h-4 rounded-full bg-red-100 text-[#DE0826] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon name="check" className="w-2.5 h-2.5" />
                      </div>
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Measurable Impact Metric */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase font-bold text-[#DE0826] tracking-wider">
                    Measurable Client Impact
                  </div>
                  <div className="text-lg font-bold text-gray-900 mt-0.5">
                    {activeModal.impactMetric}
                  </div>
                  <div className="text-xs text-gray-600">{activeModal.impactLabel}</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#DE0826] text-white flex items-center justify-center shadow-sm">
                  <Icon name={activeModal.iconName} className="w-6 h-6" />
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setActiveModal(null)
                    setContactModalOpen(true)
                  }}
                  className="flex-1 bg-[#DE0826] text-white py-3 px-5 rounded font-bold text-xs hover:bg-[#BE001D] transition-colors shadow-sm text-center cursor-pointer border-0"
                >
                  Inquire About {activeModal.name} Solutions
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-3 border border-gray-300 rounded font-semibold text-xs text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Dialog Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full rounded-xl shadow-2xl border border-gray-200 p-6 relative">
            <button
              onClick={() => {
                setContactModalOpen(false)
                setContactSubmitted(false)
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer border-0 bg-transparent"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>

            {contactSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="check" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Inquiry Received!
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Thank you. Our industry principal will reach out within 24 hours to arrange an architectural discovery session.
                </p>
                <button
                  onClick={() => {
                    setContactModalOpen(false)
                    setContactSubmitted(false)
                  }}
                  className="bg-[#DE0826] text-white px-6 py-2.5 rounded font-bold text-xs"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Connect with Sector Specialists
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Share your enterprise requirements with our industry practice leads.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setContactSubmitted(true)
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#DE0826] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@enterprise.com"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#DE0826] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Industry Sector
                    </label>
                    <select className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#DE0826] focus:outline-none bg-white">
                      {allIndustriesList.map((ind) => (
                        <option key={ind.id} value={ind.id}>
                          {ind.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Transformation Focus
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your strategic priorities..."
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#DE0826] focus:outline-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#DE0826] text-white py-3 rounded font-bold text-xs hover:bg-[#BE001D] transition-colors mt-2 cursor-pointer border-0"
                  >
                    Submit Industry Inquiry
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function CapabilitiesPage() {
  const [activeModal, setActiveModal] = useState<CapabilityItem | null>(null)

  return (
    <div className="bg-[#FAF8F5] text-gray-900 min-h-screen">
      {/* 1. Hero Section ("Our Capabilities") */}
      <section className="relative bg-[#FAF8F5] bg-pinstripes border-b border-gray-200 overflow-hidden py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Title & Intro */}
            <div className="lg:col-span-6 pr-0 lg:pr-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                Our Capabilities
              </h1>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-lg font-normal">
                Our portfolio of offerings spans competencies, specialisms, and application services that align with our customers changing worlds.
              </p>
            </div>

            {/* Right Diagonal / 3D Modular Mesh Visual Frame */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-teal-500/20 via-cyan-400/20 to-purple-500/20 p-2 border border-neutral-300/80 shadow-xl backdrop-blur-md">
                {/* 3D Parametric Mesh Hero Graphic */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-inner bg-neutral-950">
                  <img
                    src="/images/cap_hero_mesh.jpg"
                    alt="Norstar Enterprise Capabilities Architecture"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                    <span className="text-white text-xs uppercase tracking-widest font-bold drop-shadow">
                      Enterprise Capabilities Matrix
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3x3 Capabilities Grid (Matching Reference Screenshot) */}
      <section className="py-20 md:py-28 bg-[#F5F3ED] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCapabilitiesList.map((cap) => (
              <div
                key={cap.id}
                onClick={() => setActiveModal(cap)}
                className="group relative bg-[#EBE7DF] hover:bg-white rounded-none p-8 flex flex-col justify-between min-h-[340px] border border-transparent hover:border-[#DE0826] transition-all duration-300 cursor-pointer shadow-xs hover:shadow-xl"
              >
                {/* Top/Center: Circular 3D Graphic (Exact match to reference screenshot) */}
                <div className="w-full flex items-center justify-center pt-4 pb-6">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full shadow-xl flex items-center justify-center overflow-hidden border-2 border-neutral-200/80 bg-neutral-900 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={cap.image}
                      alt={cap.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Bottom: Title & Arrow in Row */}
                <div className="flex items-end justify-between pt-6 border-t border-black/5">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#DE0826] transition-colors leading-snug pr-4 max-w-[260px]">
                    {cap.title}
                  </h3>
                  <div className="text-gray-700 group-hover:text-[#DE0826] group-hover:translate-x-1.5 transition-all duration-200 flex-shrink-0">
                    <Icon name="arrow-right" className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Capability Slide-Over Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-red-100">
            {/* Modal Header */}
            <div className={`p-8 bg-gradient-to-r ${activeModal.gradient} text-white relative flex items-center justify-between`}>
              <div className="pr-12">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-200 mb-2 block">
                  {activeModal.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold pr-8">
                  {activeModal.title}
                </h2>
              </div>
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 shadow-lg flex-shrink-0 hidden sm:block">
                <img src={activeModal.image} alt={activeModal.title} className="w-full h-full object-cover" />
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Overview & Impact
              </h4>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                {activeModal.description}
              </p>

              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Key Service Offerings
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {activeModal.services.map((svc) => (
                  <div
                    key={svc}
                    className="flex items-start space-x-2.5 p-3 rounded-lg bg-neutral-50 border border-neutral-200/80 text-xs font-semibold text-gray-800"
                  >
                    <Icon name="check" className="w-4 h-4 text-[#DE0826] flex-shrink-0 mt-0.5" />
                    <span>{svc}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <a
                  href="#contact"
                  onClick={() => setActiveModal(null)}
                  className="inline-flex items-center space-x-2 bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold px-6 py-3 rounded transition-colors shadow-sm"
                >
                  <span>Connect with a Specialist</span>
                  <Icon name="arrow-right" className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActiveModal(null)}
                  className="text-xs font-semibold text-gray-600 hover:text-black py-2 px-4"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// -------------------------------------------------------------
// ABOUT US PAGE IMPLEMENTATION
// -------------------------------------------------------------
const timelineData = [
  {
    year: '1986',
    title: 'Incorporation & Joint Venture',
    description:
      'Incorporated on October 24, 1986, as Norstar Telecom, a pioneering enterprise technology venture delivering specialized software services.',
    tag: 'Foundation',
  },
  {
    year: '1993',
    title: 'Global Expansion & Software Center',
    description:
      'Established first offshore development center outside Mumbai in Pune, initiating software export services to European telecom giants.',
    tag: 'Expansion',
  },
  {
    year: '2001',
    title: 'SEI-CMM Level 5 Certification',
    description:
      'Assessed at SEI-CMM Level 5, marking benchmark quality in enterprise software processes and telecom systems engineering.',
    tag: 'Quality Benchmark',
  },
  {
    year: '2006',
    title: 'Global Expansion & IPO',
    description:
      'Transitioned to Norstar Limited and launched landmark Initial Public Offering (IPO), widely oversubscribed.',
    tag: 'Public Listing',
  },
  {
    year: '2009',
    title: 'Strategic Satyam Acquisition',
    description:
      'Executed landmark strategic acquisitions, transforming Norstar into a top-tier digital systems integrator.',
    tag: 'Mega Acquisition',
  },
  {
    year: '2013',
    title: 'Historic Merger Completion',
    description:
      'Consolidation completed, creating a unified global IT powerhouse of 84,000+ professionals.',
    tag: 'Unified Scale',
  },
  {
    year: '2017',
    title: 'Launch of NXT.NOW™ Framework',
    description:
      'Unveiled the NXT.NOW™ framework focusing on explosive growth in Cloud, 5G, Artificial Intelligence, and Experience Engineering.',
    tag: 'Next-Gen Strategy',
  },
  {
    year: '2021',
    title: '$5 Billion Revenue & Net-Zero Pledge',
    description:
      'Crossed the USD $5.1 Billion revenue milestone; recognized on the CDP Climate A List and Dow Jones Sustainability Emerging Markets Index.',
    tag: 'Global Sustainability',
  },
  {
    year: '2024 - 2026',
    title: 'Scale at Speed™ & Sovereign AI',
    description:
      'Under the leadership of MD & CEO Mohit Joshi, launched the Scale at Speed™ era, cutting-edge Agentic AI platforms, and the new sonic identity Norstar T!ng.',
    tag: 'Current Era',
  },
]

function AboutUsPage() {
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(0)
  const currentTimeline = timelineData[selectedTimelineIndex]

  return (
    <div className="bg-white text-gray-900">
      <section className="relative bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
            <a href="#/home" className="hover:text-[#DE0826]">Home</a>
            <span>/</span>
            <span className="text-[#DE0826] font-bold">About Us</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                About <span className="text-[#DE0826]">Us</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal mb-8 max-w-xl">
                We are digital changemakers – here to disrupt old ideas, blaze new trails, and help enterprises transform and scale at speed.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#timeline"
                  className="inline-flex items-center space-x-2 bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold px-6 py-3.5 rounded transition-all shadow-md"
                >
                  <span>Explore Our Journey</span>
                  <Icon name="arrow-right" className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#leadership"
                  className="inline-flex items-center space-x-2 bg-white border border-gray-300 hover:border-[#DE0826] text-gray-800 hover:text-[#DE0826] text-xs font-bold px-6 py-3.5 rounded transition-all shadow-xs"
                >
                  <span>Meet Leadership</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-xl border-2 border-red-50">
                <ImageBox
                  label="Norstar Global Headquarters"
                  aspectRatio="aspect-[16/10]"
                  dark={false}
                  imageSrc="/images/about_hq.jpg"
                />
                <div className="p-3 bg-white text-xs font-semibold text-gray-600 flex items-center justify-between">
                  <span>Pune • Hyderabad • Dallas • London</span>
                  <span className="text-[#DE0826]">Est. 1986</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div className="px-4">
              <div className="text-3xl md:text-5xl font-extrabold text-[#DE0826] mb-1">
                145K+
              </div>
              <div className="text-xs md:text-sm font-semibold text-gray-800">
                Global Associates
              </div>
              <div className="text-[11px] text-gray-500 mt-1">Diverse Minds & Innovators</div>
            </div>

            <div className="px-4">
              <div className="text-3xl md:text-5xl font-extrabold text-gray-950 mb-1">
                90+
              </div>
              <div className="text-xs md:text-sm font-semibold text-gray-800">
                Countries Operative
              </div>
              <div className="text-[11px] text-gray-500 mt-1">Worldwide Footprint</div>
            </div>

            <div className="px-4">
              <div className="text-3xl md:text-5xl font-extrabold text-[#DE0826] mb-1">
                1,100+
              </div>
              <div className="text-xs md:text-sm font-semibold text-gray-800">
                Global Clients
              </div>
              <div className="text-[11px] text-gray-500 mt-1">Fortune 500 Leaders</div>
            </div>

            <div className="px-4">
              <div className="text-3xl md:text-5xl font-extrabold text-gray-950 mb-1">
                $6.5B+
              </div>
              <div className="text-xs md:text-sm font-semibold text-gray-800">
                USD Annual Revenue
              </div>
              <div className="text-[11px] text-gray-500 mt-1">Norstar Enterprise Scale</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAF8F5] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                Driven by the spirit of <span className="text-[#DE0826]">Rise</span>
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                As a global enterprise technology powerhouse, our purpose is to drive positive change in the lives of our communities, partners, and employees. We believe that when technology pairs with human ingenuity, barriers dissolve.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="w-8 h-8 rounded bg-red-50 text-[#DE0826] flex items-center justify-center font-bold text-xs mb-3">
                    01
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1">Accept No Limits</h4>
                  <p className="text-xs text-gray-600">Question the status quo and think beyond conventional boundaries.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="w-8 h-8 rounded bg-red-50 text-[#DE0826] flex items-center justify-center font-bold text-xs mb-3">
                    02
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1">Alternative Thinking</h4>
                  <p className="text-xs text-gray-600">Innovate fearlessly with fresh angles and digital agility.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                  <div className="w-8 h-8 rounded bg-red-50 text-[#DE0826] flex items-center justify-center font-bold text-xs mb-3">
                    03
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 mb-1">Positive Change</h4>
                  <p className="text-xs text-gray-600">Deliver sustainable impact for people, planet, and progress.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-xl border-2 border-red-50">
                <ImageBox
                  label="The Rise Movement • Empowering Growth"
                  aspectRatio="aspect-[16/10]"
                  dark={false}
                  imageSrc="/images/careers_purpose.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="py-20 md:py-28 bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-950">
              Our Journey Since <span className="text-[#DE0826]">1986</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-3">
              Explore the pivotal moments that shaped Norstar from an Indian telecommunications joint venture into a global digital transformation titan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-red-100 flex flex-col items-center justify-center bg-gradient-to-b from-[#FAF8F5] to-white shadow-2xl p-8 text-center group">
                <div className="absolute inset-0 rounded-full border-4 border-t-[#DE0826] border-r-transparent border-b-transparent border-l-transparent animate-spin duration-10000" />
                
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">
                  HISTORICAL ERA
                </span>
                
                <div className="text-6xl sm:text-7xl font-extrabold text-[#DE0826] tracking-tighter my-2 drop-shadow-xs">
                  {currentTimeline.year}
                </div>

                <span className="px-3 py-1 bg-red-50 text-[#DE0826] font-bold text-xs rounded-full border border-red-200 uppercase tracking-wider">
                  {currentTimeline.tag}
                </span>

                <div className="mt-4 text-xs text-gray-500 font-mono">
                  Milestone 0{selectedTimelineIndex + 1} of 0{timelineData.length}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#FAF8F5] rounded-2xl p-8 border-2 border-red-100 shadow-md mb-8">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-3 py-0.5 bg-[#DE0826] text-white text-xs font-bold rounded">
                    {currentTimeline.year}
                  </span>
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {currentTimeline.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentTimeline.title}
                </h3>

                <p className="text-gray-700 text-base leading-relaxed">
                  {currentTimeline.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Select Year:
                </div>
                <div className="flex flex-wrap gap-2">
                  {timelineData.map((item, idx) => (
                    <button
                      key={item.year}
                      onClick={() => setSelectedTimelineIndex(idx)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedTimelineIndex === idx
                          ? 'bg-[#DE0826] text-white shadow-sm scale-105'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-[#DE0826] hover:text-[#DE0826]'
                      }`}
                    >
                      {item.year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// -------------------------------------------------------------
// 3. Hero Section (Home) - Full-Bleed Automated & Manual Slider
// -------------------------------------------------------------
interface HeroSlideData {
  title: string
  subtitle: string
  cta: string
  badge: string
  image: string
  route: PageRoute
}

const heroSlides: HeroSlideData[] = [
  {
    title: 'Zero Gravity Telco Architecture™',
    subtitle:
      "Our latest research uncovers what's preventing AI from scaling across telecom operations and how operators can build a path to trusted autonomy.",
    cta: 'KNOW MORE',
    badge: 'Research & AI',
    image: '/images/hero_telco_glass.jpg',
    route: 'insights',
  },
  {
    title: 'Scale at Speed™',
    subtitle:
      'Delivering transformative scale at unparalleled speed across 90+ countries with digital consulting, cloud architectures, and autonomous workflows.',
    cta: 'KNOW MORE',
    badge: 'Core Promise',
    image: '/images/home_racing.jpg',
    route: 'about',
  },
  {
    title: 'Autonomous AI for Enterprise',
    subtitle:
      'Pioneering sovereign cognitive intelligence, custom LLM fine-tuning, and responsible AI governance designed to accelerate enterprise productivity.',
    cta: 'KNOW MORE',
    badge: 'Cognitive AI',
    image: '/images/insights_quantum.jpg',
    route: 'capabilities',
  },
  {
    title: 'Cloud & Modern Network Core',
    subtitle:
      'Empowering telecom and enterprise innovators with zero-downtime multi-cloud migrations, Open RAN virtualization, and autonomous network ops.',
    cta: 'KNOW MORE',
    badge: 'Next-Gen Telco',
    image: '/images/cap_hero.jpg',
    route: 'capabilities',
  },
  {
    title: 'Introducing Norstar T!ng',
    subtitle:
      'Amplifying human ingenuity with sound and artificial intelligence. Experience our new sonic identity marking the next phase of enterprise transformation.',
    cta: 'KNOW MORE',
    badge: 'Sonic Launch',
    image: '/images/home_hero.jpg',
    route: 'insights',
  },
]

interface HeroSectionProps {
  onRouteChange?: (route: PageRoute) => void
}

function HeroSection({ onRouteChange }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [prevSlideIndex, setPrevSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const goToSlide = (nextIndex: number) => {
    if (nextIndex === currentSlide) return
    setPrevSlideIndex(currentSlide)
    setCurrentSlide(nextIndex)
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)
  }

  // Automatic slide rotation every 5 seconds, paused on hover
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setPrevSlideIndex(currentSlide)
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused, currentSlide])

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) {
      nextSlide()
    } else if (distance < -minSwipeDistance) {
      prevSlide()
    }
  }

  const handleCtaClick = (route: PageRoute) => {
    if (onRouteChange) {
      onRouteChange(route)
    } else {
      window.location.hash = `#/${route}`
    }
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-neutral-900 lg:h-[calc(100vh-66px)] min-h-[480px] lg:min-h-[540px] lg:max-h-[850px] flex items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Hero Featured Slideshow"
    >
      {/* Background Images - Direct crossfade without black dip */}
      {heroSlides.map((slide, idx) => {
        const isActive = currentSlide === idx
        const isPrev = prevSlideIndex === idx

        return (
          <div
            key={slide.image}
            className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out ${
              isActive
                ? 'opacity-100 z-10'
                : isPrev
                ? 'opacity-100 z-0'
                : 'opacity-0 z-0'
            }`}
            aria-hidden={!isActive}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )
      })}

      {/* Static single gradient overlay - stays perfectly consistent with zero flash or darkening */}
      <div className="absolute inset-0 z-15 bg-gradient-to-r from-black/80 via-black/40 to-black/15 pointer-events-none" />

      {/* Main Slide Content: Left Aligned */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-8 sm:py-12 flex items-center h-full">
        {heroSlides.map((slide, idx) => {
          const isActive = currentSlide === idx
          return (
            <div
              key={slide.title}
              className={`transition-opacity duration-500 ease-in-out max-w-3xl pr-6 sm:pr-12 md:pr-24 ${
                isActive
                  ? 'opacity-100 relative z-20 pointer-events-auto'
                  : 'opacity-0 absolute inset-x-6 sm:inset-x-10 md:inset-x-16 lg:inset-x-20 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                {slide.title}
              </h1>

              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-lg text-gray-200/90 leading-relaxed font-normal max-w-2xl">
                {slide.subtitle}
              </p>

              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => handleCtaClick(slide.route)}
                  className="inline-block border border-white/70 hover:border-white text-white uppercase text-xs sm:text-sm font-semibold tracking-wider px-7 py-3 bg-black/20 hover:bg-white/15 transition-all duration-300 backdrop-blur-xs cursor-pointer"
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Right Edge: Vertical Slide Dash Indicators (Matching Screenshot) */}
      <div
        className="absolute right-6 sm:right-10 md:right-14 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end space-y-3.5"
        aria-label="Slide Selection Indicators"
      >
        {heroSlides.map((slide, idx) => {
          const isActive = currentSlide === idx
          return (
            <button
              key={slide.title}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              className="group py-1 px-1 flex items-center justify-end cursor-pointer bg-transparent border-0 focus:outline-none"
            >
              <span
                className={`block h-[2px] transition-all duration-300 rounded-xs ${
                  isActive
                    ? 'w-9 sm:w-10 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                    : 'w-4 sm:w-5 bg-white/40 group-hover:bg-white/80 group-hover:w-7'
                }`}
              />
            </button>
          )
        })}
      </div>

      {/* Bottom Right: Manual Navigation Controls (< | >) */}
      <div className="absolute bottom-5 sm:bottom-7 md:bottom-8 right-6 sm:right-10 md:right-14 z-30 flex items-center space-x-3.5 select-none">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-0 flex items-center justify-center group focus:outline-none"
        >
          <Icon
            name="chevron-left"
            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5"
          />
        </button>

        <span className="text-white/30 text-sm sm:text-base font-extralight select-none">
          |
        </span>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-0 flex items-center justify-center group focus:outline-none"
        >
          <Icon
            name="chevron-right"
            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>

      {/* Subtle bottom edge separator line */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-white/10 z-20 pointer-events-none" />
    </section>
  )
}

// -------------------------------------------------------------
// 4. "Scale at Speed™ with Tech Mahindra" Feature Section
// Matching Reference Screenshot media_1789187339971.png Exactly
// -------------------------------------------------------------
interface BrandPromiseSectionProps {
  onRouteChange?: (route: PageRoute) => void
}

function BrandPromiseSection({ onRouteChange }: BrandPromiseSectionProps) {
  return (
    <section className="relative bg-[#FAF7F2] border-b border-[#EAE5D9] overflow-hidden lg:h-[calc(100vh-66px)] lg:min-h-[540px] lg:max-h-[850px] flex items-center">
      {/* Background Subtle Isometric Wireframe Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-45 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="techm-iso-grid"
              width="100"
              height="173.2"
              patternUnits="userSpaceOnUse"
            >
              {/* Isometric rhombuses & vertical guides matching reference */}
              <path
                d="M50,0 L100,28.87 L100,86.6 L50,115.47 L0,86.6 L0,28.87 Z"
                fill="none"
                stroke="#CFC8B6"
                strokeWidth="0.8"
              />
              <path
                d="M50,173.2 L100,144.33 L100,86.6 L50,57.73 L0,86.6 L0,144.33 Z"
                fill="none"
                stroke="#CFC8B6"
                strokeWidth="0.8"
              />
              <line x1="50" y1="0" x2="50" y2="173.2" stroke="#CFC8B6" strokeWidth="0.5" />
              <line x1="0" y1="28.87" x2="100" y2="86.6" stroke="#CFC8B6" strokeWidth="0.5" />
              <line x1="0" y1="86.6" x2="100" y2="28.87" stroke="#CFC8B6" strokeWidth="0.5" />
              <line x1="0" y1="144.33" x2="100" y2="86.6" stroke="#CFC8B6" strokeWidth="0.5" />
              <line x1="0" y1="86.6" x2="100" y2="144.33" stroke="#CFC8B6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techm-iso-grid)" />
        </svg>
      </div>

      {/* Main Content & Angled Graphic Layout */}
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-6 max-w-xl">
            {/* Header: Scale at Speed™ in Red */}
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#DE0826] tracking-tight leading-none font-heading">
              Scale at Speed<sup className="text-xl sm:text-2xl font-bold align-top ml-1">™</sup>
            </h2>

            {/* Subheader: with Norstar Digital */}
            <h3 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-gray-950 tracking-tight mt-1.5 sm:mt-2.5 leading-tight font-heading">
              with Nor<span className="text-[#DE0826]">star</span> Digital
            </h3>

            {/* Description Text: Tailored original value proposition */}
            <p className="text-gray-700 text-sm sm:text-base lg:text-[16px] leading-relaxed mt-5 sm:mt-6 mb-8 sm:mb-10 font-normal">
              Empowering forward-thinking enterprises to accelerate digital evolution, build intelligent architectures, and achieve lasting operational agility at unprecedented speed.
            </p>

            {/* Action Buttons: EXPLORE SOLUTIONS & OUR BRAND STORY */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onRouteChange?.('capabilities')}
                className="bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-extrabold uppercase tracking-widest px-8 py-3.5 transition-all shadow-xs cursor-pointer border-0"
              >
                EXPLORE SOLUTIONS
              </button>
              <button
                onClick={() => onRouteChange?.('about')}
                className="bg-transparent hover:bg-[#DE0826]/5 text-[#DE0826] border border-[#DE0826] text-xs font-extrabold uppercase tracking-widest px-7 py-3.5 transition-all cursor-pointer"
              >
                OUR BRAND STORY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Angled Formula Racing Car Graphic on the Right */}
      <div
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50%] xl:w-[51%] h-full z-10 pointer-events-none"
        style={{
          clipPath: 'polygon(0 38%, 68% 0, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        <img
          src="/images/scale_at_speed_racing.jpg"
          alt="Scale at Speed - Norstar High Velocity Digital Innovation"
          className="w-full h-full object-cover object-center pointer-events-auto"
        />
      </div>

      {/* Mobile Responsive Racing Graphic (displays below text on smaller screens) */}
      <div
        className="lg:hidden w-full aspect-[16/10] overflow-hidden relative z-10"
        style={{
          clipPath: 'polygon(0 18%, 65% 0, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        <img
          src="/images/scale_at_speed_racing.jpg"
          alt="Scale at Speed - Norstar High Velocity Digital Innovation"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 5. Podcast Spotlight Section ("S/N: All Signal. No Noise.")
// Exact Match to Reference Screenshot media_1789188177811.png
// -------------------------------------------------------------
function PodcastSection() {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="relative bg-[#08072B] text-white overflow-hidden border-b border-neutral-800 lg:h-[calc(100vh-66px)] lg:min-h-[540px] lg:max-h-[850px] flex items-center">
      {/* 1. Large 3D Isometric Hexagon Wireframe Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="podcast-hex-grid"
              width="140"
              height="242.48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M70,0 L140,40.41 L140,121.24 L70,161.65 L0,121.24 L0,40.41 Z"
                fill="none"
                stroke="#561230"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <path
                d="M70,242.48 L140,202.07 L140,121.24 L70,80.83 L0,121.24 L0,202.07 Z"
                fill="none"
                stroke="#561230"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <line x1="70" y1="0" x2="70" y2="80.83" stroke="#561230" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="70" y1="161.65" x2="70" y2="242.48" stroke="#561230" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="0" y1="121.24" x2="70" y2="161.65" stroke="#561230" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="140" y1="121.24" x2="70" y2="161.65" stroke="#561230" strokeWidth="1" strokeOpacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#podcast-hex-grid)" />
        </svg>
      </div>

      {/* 2. Crimson Wedge on the Right with Vertical Pinstripe Overlay */}
      <div
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[53%] pointer-events-none z-0"
        style={{
          backgroundColor: '#5F0229',
          clipPath: 'polygon(16% 40%, 100% 0%, 100% 100%, 0% 100%)',
        }}
      >
        {/* Vertical Pinstripe Grid Lines matching reference */}
        <div
          className="absolute inset-0 w-full h-full opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, transparent, transparent 11px, rgba(235, 40, 70, 0.5) 11px, rgba(235, 40, 70, 0.5) 12px)',
          }}
        />
      </div>

      {/* 3. Animated Audio Equalizer Soundwave Graphic Behind Right Speaker */}
      <div className="hidden lg:flex absolute right-0 top-[59%] -translate-y-1/2 w-[48%] h-12 pointer-events-none z-[1] items-center justify-end pr-6">
        <div className="relative flex items-center h-10 overflow-visible">
          {/* Flowing Dashed Signal Line with Traveling Pulse */}
          <div className="relative w-28 h-[2px] mr-3 overflow-hidden flex items-center">
            <svg className="w-full h-2 overflow-visible" viewBox="0 0 112 2" fill="none">
              <line
                x1="0"
                y1="1"
                x2="112"
                y2="1"
                stroke="#DE0826"
                strokeWidth="2"
                strokeDasharray="6 6"
                style={{ animation: 'signalDashFlow 1.2s linear infinite' }}
              />
            </svg>
            {/* Gliding Signal Pulse Dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#DE0826]"
              style={{ animation: 'signalPacketGlide 2.2s linear infinite' }}
            />
          </div>

          {/* Dynamic Equalizer Bars with Traveling Wave Motion */}
          <div className="flex items-center space-x-[3.5px] h-10">
            {[
              3, 4, 5, 6, 5, 4, 4, 5, 6, 8, 10, 14, 18, 22, 26, 28, 24, 18, 14, 10,
              8, 6, 8, 10, 14, 18, 20, 22, 18, 14, 10, 8, 6, 5, 4, 3
            ].map((height, idx) => (
              <div
                key={idx}
                className="w-[4.5px] bg-[#DE0826] rounded-full"
                style={{
                  height: `${height}px`,
                  transformOrigin: 'center',
                  animation: `signalBarWave 1.25s ease-in-out ${(idx * 0.045).toFixed(2)}s infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. Cutout Studio Portraits of Executives Standing Directly Over Canvas */}
      <div className="hidden lg:flex absolute right-4 xl:right-10 bottom-0 h-full w-[54%] pointer-events-none z-[2] items-end justify-end">
        <img
          src="/images/executives_duo_final.png"
          alt="Dr. Marcus Vance and Vikram Choudhury in Discussion"
          className="h-[90%] max-h-[470px] w-auto object-contain object-bottom select-none"
        />
      </div>

      {/* 5. Precision Slanted Parallelogram Nameplates */}
      <div className="hidden lg:flex absolute bottom-5 right-6 xl:right-12 z-20 space-x-3 items-end">
        {/* Left Speaker Badge: Dr. Marcus Vance */}
        <div
          className="relative bg-[#EDE7DF] text-left shadow-2xl overflow-hidden cursor-default transition-transform hover:-translate-y-0.5"
          style={{
            clipPath: 'polygon(18px 0, 100% 0, calc(100% - 18px) 100%, 0 100%)',
            width: '235px',
          }}
        >
          {/* Slanted red left stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#DE0826]" />
          <div className="pl-6 pr-4 py-3">
            <div className="font-extrabold text-[12.5px] uppercase text-[#5B0C23] tracking-tight font-heading leading-tight">
              DR. MARCUS VANCE
            </div>
            <div className="text-[10.5px] text-[#2D3748] leading-tight mt-1 font-medium">
              Group Chief Strategy and<br />Transformation Officer, Nexus Global
            </div>
          </div>
        </div>

        {/* Right Speaker Badge: Vikram Choudhury */}
        <div
          className="relative bg-[#EDE7DF] text-left shadow-2xl overflow-hidden cursor-default transition-transform hover:-translate-y-0.5"
          style={{
            clipPath: 'polygon(18px 0, 100% 0, calc(100% - 18px) 100%, 0 100%)',
            width: '235px',
          }}
        >
          {/* Slanted red left stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#DE0826]" />
          <div className="pl-6 pr-4 py-3">
            <div className="font-extrabold text-[12.5px] uppercase text-[#5B0C23] tracking-tight font-heading leading-tight">
              VIKRAM CHOUDHURY
            </div>
            <div className="text-[10.5px] text-[#2D3748] leading-tight mt-1 font-medium">
              Chief Transformation Officer, Norstar<br />Digital
            </div>
          </div>
        </div>
      </div>

      {/* 6. Subtle Scroll Indicator at Bottom Right */}
      <div className="hidden lg:flex absolute bottom-4 right-3 w-6 h-6 rounded-full bg-black/40 border border-white/20 text-white/70 items-center justify-center text-[10px] z-30 select-none">
        ↑
      </div>

      {/* 7. Main Left Column Container */}
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-0 relative z-10">
        <div className="max-w-xl">
          {/* Podcast Brand Logo: S/N All Signal No Noise */}
          <div className="flex flex-col mb-7 select-none">
            <span className="text-4xl sm:text-5xl font-extrabold text-[#DE0826] tracking-tight leading-none font-heading">
              S/N
            </span>
            <span className="text-xs sm:text-[13px] text-white/90 font-medium tracking-wide mt-2 leading-tight">
              All Signal<br />No Noise
            </span>
          </div>

          {/* Podcast Pill Badge with Microphone */}
          <div className="inline-flex items-center space-x-2 bg-[#181D33] border border-white/10 text-white px-3 py-1.5 rounded mb-6">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
            <span className="tracking-widest uppercase text-[11px] font-bold">PODCAST</span>
          </div>

          {/* Episode Title exactly matching typography & accent */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-tight leading-[1.12] mb-8 font-heading">
            Sovereign AI: Why<br />
            Collaboration<br />
            <span className="text-[#DE0826]">Beats</span> Control
          </h2>

          {/* CTA Button: Watch Full Episode */}
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center space-x-3 bg-[#DE0826] hover:bg-[#C2051E] text-white text-xs font-extrabold uppercase tracking-widest px-7 py-3.5 rounded-[3px] transition-all shadow-xl cursor-pointer border-0 group"
          >
            <span className="w-5 h-5 rounded-full bg-white text-[#DE0826] flex items-center justify-center text-[10px] pl-0.5 group-hover:scale-110 transition-transform">
              ▶
            </span>
            <span>WATCH FULL EPISODE</span>
          </button>
        </div>

        {/* Mobile/Tablet Fallback: Speakers & Badges below text */}
        <div className="block lg:hidden mt-10 relative">
          <img
            src="/images/executives_duo_final.png"
            alt="Executive Leaders in Discussion"
            className="w-full max-w-[500px] mx-auto h-auto object-contain"
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center">
            <div className="bg-[#EDE7DF] p-3 border-l-4 border-[#DE0826] shadow-md text-left">
              <div className="font-extrabold text-xs uppercase text-[#5B0C23]">
                DR. MARCUS VANCE
              </div>
              <div className="text-[10px] text-[#2D3748] mt-0.5 font-medium">
                Group Chief Strategy & Transformation Officer, Nexus Global
              </div>
            </div>
            <div className="bg-[#EDE7DF] p-3 border-l-4 border-[#DE0826] shadow-md text-left">
              <div className="font-extrabold text-xs uppercase text-[#5B0C23]">
                VIKRAM CHOUDHURY
              </div>
              <div className="text-[10px] text-[#2D3748] mt-0.5 font-medium">
                Chief Transformation Officer, Norstar Digital
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Episode Playback Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0B0F19] border border-white/20 rounded-xl overflow-hidden shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 cursor-pointer bg-transparent border-0 text-lg"
              aria-label="Close video modal"
            >
              ✕
            </button>
            <div className="flex items-center space-x-2 text-[#DE0826] text-xs font-bold uppercase tracking-wider mb-2">
              <span>S/N PODCAST EPISODE</span>
              <span>•</span>
              <span>32 MIN</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-4">
              Sovereign AI: Why Collaboration Beats Control
            </h3>
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center border border-white/10 mb-6">
              <img
                src="/images/executives_duo_final.png"
                alt="Episode Video Preview"
                className="w-full h-full object-contain opacity-70 bg-[#08072B]"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                <div className="w-16 h-16 rounded-full bg-[#DE0826] text-white flex items-center justify-center text-xl shadow-2xl pl-1 animate-pulse">
                  ▶
                </div>
                <span className="text-xs text-white/90 font-mono mt-3">
                  Streaming HD episode audio & video...
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Dr. Marcus Vance and Vikram Choudhury discuss navigating Sovereign AI architectures, data residency, and why ecosystem collaboration yields far greater strategic velocity than closed control frameworks.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

// -------------------------------------------------------------
// 6. "Latest Thinking" Section
// -------------------------------------------------------------
// -------------------------------------------------------------
// 6. "Latest Thinking" Section
// Asymmetric 3-Column Bento Grid Matching Reference media_1789191273812.png
// -------------------------------------------------------------
const thinkingColumns = {
  col1: [
    {
      id: 'ai-adoption',
      badge: 'ARTICLE | ARTIFICIAL INTELLIGENCE',
      title: 'From AI Adoption to AI Advantage',
      image: '/images/thinking_robot.jpg',
      tall: true,
    },
    {
      id: 'invisible-ai',
      badge: 'ARTICLE | ARTIFICIAL INTELLIGENCE',
      title: 'Invisible AI: Enabling Frictionless Customer Experiences in Europe',
      image: '/images/thinking_spheres.jpg',
      tall: false,
    },
  ],
  col2: [
    {
      id: 'open-banking',
      badge: 'ARTICLE | BANKING AND FINANCIAL SERVICES',
      title: 'Open Banking at an Inflection Point: Why Banks Must Act Now',
      image: '/images/thinking_open_banking.jpg',
      tall: false,
    },
    {
      id: 'security-by-design',
      badge: 'PERSPECTIVE | CYBER SECURITY',
      title: 'Security by Design: A New Model for Trust and Growth',
      image: '/images/thinking_ribbon.jpg',
      tall: false,
    },
    {
      id: 'prepaid-growth',
      badge: 'PERSPECTIVE | TELECOM & NETWORKS',
      title: 'Bold Moves in Prepaid: A New Growth Path for Developed Markets',
      image: '/images/thinking_mobile_calling.jpg',
      tall: false,
    },
  ],
  col3: [
    {
      id: 'agentic-ai-energy',
      badge: 'CASE STUDY | ENERGY & UTILITIES',
      title: 'Agentic AI for Oil and Gas Upstream Operations',
      image: '/images/thinking_energy_engineer.jpg',
      tall: false,
    },
    {
      id: 'autonomous-enterprise',
      badge: 'REPORT | ARTIFICIAL INTELLIGENCE',
      title: 'Engineering Autonomous Enterprise',
      image: '/images/thinking_cubes.jpg',
      tall: true,
    },
  ],
}

function LatestThinkingSection() {
  return (
    <section id="latest-thinking" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 sm:mb-10 lg:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-gray-950 font-heading">
              Latest Thinking
            </h2>
          </div>
          <p className="text-gray-700 text-xs sm:text-sm lg:text-[14px] leading-relaxed max-w-md mt-3 md:mt-0 font-normal">
            Read what we're thinking. Research that uncovers what's next. Perspectives that challenge the status quo. Ideas that help you move your business.
          </p>
        </div>

        {/* 3-Column Asymmetric Grid Architecture Matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {/* Column 1: Tall Card (Top) + Landscape Card (Bottom) */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {thinkingColumns.col1.map((card) => (
              <div
                key={card.id}
                className={`relative overflow-hidden group cursor-pointer bg-neutral-950 shadow-xs hover:shadow-xl transition-all duration-300 ${
                  card.tall
                    ? 'h-[320px] sm:h-[360px] lg:h-[415px]'
                    : 'h-[180px] sm:h-[190px] lg:h-[195px]'
                }`}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 z-20">
                  <span className="inline-flex items-center px-2 py-0.5 bg-black/65 backdrop-blur-xs border border-white/20 text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase select-none">
                    {card.badge}
                  </span>
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-4 sm:p-5 lg:p-6 pointer-events-none">
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-[17px] leading-snug group-hover:text-red-300 transition-colors">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: 3 Landscape Cards Stacked Vertically */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {thinkingColumns.col2.map((card) => (
              <div
                key={card.id}
                className="relative overflow-hidden group cursor-pointer bg-neutral-950 shadow-xs hover:shadow-xl transition-all duration-300 h-[180px] sm:h-[190px] lg:h-[195px]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 z-20">
                  <span className="inline-flex items-center px-2 py-0.5 bg-black/65 backdrop-blur-xs border border-white/20 text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase select-none">
                    {card.badge}
                  </span>
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-4 sm:p-5 lg:p-6 pointer-events-none">
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-[17px] leading-snug group-hover:text-red-300 transition-colors">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: Landscape Card (Top) + Tall Card (Bottom) */}
          <div className="flex flex-col gap-5 lg:gap-6 md:col-span-2 lg:col-span-1">
            {thinkingColumns.col3.map((card) => (
              <div
                key={card.id}
                className={`relative overflow-hidden group cursor-pointer bg-neutral-950 shadow-xs hover:shadow-xl transition-all duration-300 ${
                  card.tall
                    ? 'h-[320px] sm:h-[360px] lg:h-[415px]'
                    : 'h-[180px] sm:h-[190px] lg:h-[195px]'
                }`}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 z-20">
                  <span className="inline-flex items-center px-2 py-0.5 bg-black/65 backdrop-blur-xs border border-white/20 text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase select-none">
                    {card.badge}
                  </span>
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-4 sm:p-5 lg:p-6 pointer-events-none">
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-[17px] leading-snug group-hover:text-red-300 transition-colors">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 7. "the Big Thinkers" Full-Width Banner
// -------------------------------------------------------------
// -------------------------------------------------------------
// 7. "The Big Thinkers" Section
// Matching Reference UI media_1789194494834.png with Cutout Leader
// -------------------------------------------------------------
function BigThinkersSection() {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="relative bg-[#5A0322] text-white overflow-hidden border-b border-neutral-800 lg:h-[calc(100vh-66px)] lg:min-h-[540px] lg:max-h-[850px] flex items-center">
      {/* 1. Diagonal Red Pinstripe Lines on the Right Side (Behind Speaker) */}
      <div
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[58%] xl:w-[55%] pointer-events-none z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-25deg, transparent, transparent 13px, rgba(222, 8, 38, 0.42) 13px, rgba(222, 8, 38, 0.42) 14px)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)',
        }}
      />

      {/* 2. Transparent Executive Cutout Image on the Right */}
      <div className="hidden lg:flex absolute right-6 xl:right-16 bottom-0 h-full w-[48%] xl:w-[44%] pointer-events-none z-[2] items-end justify-center">
        <img
          src="/images/big_thinker_executive.png"
          alt="Executive Leader - The Big Thinkers"
          className="h-[92%] max-h-[520px] w-auto object-contain object-bottom select-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* 3. Subtle Scroll Indicator at Bottom Right */}
      <div className="hidden lg:flex absolute bottom-4 right-3 w-6 h-6 rounded-full bg-black/40 border border-white/20 text-white/70 items-center justify-center text-[10px] z-30 select-none">
        ↑
      </div>

      {/* 4. Left Column Content Container */}
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-0 relative z-10">
        <div className="max-w-xl">
          {/* Logo: The Big Thinkers */}
          <div className="flex flex-col mb-7 select-none">
            <div className="flex items-baseline space-x-1 text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading leading-none">
              <span className="text-white">The</span>
              <span className="text-[#DE0826]">Big</span>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white font-heading leading-tight tracking-tight">
              Thinkers
            </div>
          </div>

          {/* Headline Matching Cadence & Structure */}
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.14] mb-8 font-heading">
            Businesses' Next<br />
            Competitive Advantage—<br />
            Data Discipline
          </h2>

          {/* Speaker Identity: Horizontal White Line + Name & Title */}
          <div className="flex items-center mb-9">
            {/* Horizontal White Line */}
            <div className="w-20 sm:w-28 h-[1.5px] bg-white mr-5 shrink-0 opacity-90" />

            {/* Name and Designation */}
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-white font-heading leading-snug">
                Edara Deepak Chowdary
              </span>
              <span className="text-xs sm:text-[13px] text-[#E06380] font-medium tracking-wide mt-0.5 leading-snug">
                Chief Technology & AI Officer, Norstar Digital
              </span>
            </div>
          </div>

          {/* Rectangular Solid Red READ MORE Button */}
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#DE0826] hover:bg-[#C2051E] text-white text-xs font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-[2px] transition-all shadow-md cursor-pointer border-0 inline-block"
            >
              READ MORE
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Fallback: Portrait below text */}
        <div className="block lg:hidden mt-10 relative">
          <img
            src="/images/big_thinker_executive.png"
            alt="Executive Leader - The Big Thinkers"
            className="w-full max-w-[340px] mx-auto h-auto object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* Interactive Modal for READ MORE */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#1A030A] border border-[#DE0826]/40 rounded-xl overflow-hidden shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 cursor-pointer bg-transparent border-0 text-lg"
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="flex items-center space-x-2 text-[#DE0826] text-xs font-bold uppercase tracking-wider mb-2">
              <span>THE BIG THINKERS EXECUTIVE SERIES</span>
              <span>•</span>
              <span>EXCLUSIVE PERSPECTIVE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-4">
              Businesses' Next Competitive Advantage — Data Discipline
            </h3>
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-white/10">
              <img
                src="/images/big_thinker_executive.png"
                alt="Edara Deepak Chowdary"
                className="w-14 h-14 rounded-full object-cover border border-[#DE0826]"
              />
              <div>
                <h4 className="font-bold text-white text-sm">Edara Deepak Chowdary</h4>
                <p className="text-xs text-[#E06380]">
                  Chief Technology & AI Officer, Norstar Digital
                </p>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-200 leading-relaxed space-y-3">
              <p>
                "In an era where every enterprise has access to vast foundation models, true competitive differentiation is not about model size—it is about data discipline, rigor in data pipelines, and the agility to execute autonomously."
              </p>
              <p>
                "Organizations that succeed at scale treat data as an operational currency, ensuring governance, provenance, and low-latency integration across the entire hybrid cloud ecosystem."
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// -------------------------------------------------------------
// 8. "What's New" Interactive Carousel (Exact Reference Replica)
// -------------------------------------------------------------
interface WhatsNewItem {
  id: number
  type: string
  date: string
  title: string
  image: string
  subtitle?: string
  paragraphs?: string[]
  quote?: string
  quoteAuthor?: string
}

const whatsNewItems: WhatsNewItem[] = [
  {
    id: 1,
    type: 'News',
    date: 'August 04, 2026',
    title: 'Norstar Digital Wins Global AI Cloud Innovation Award at DTW Ignite 2026',
    image: '/images/whatsnew_architectural_fins.jpg',
    subtitle: 'Recognized for pioneering autonomous hybrid cloud orchestrations and cognitive network fabrics.',
    paragraphs: [
      'At the DTW Ignite 2026 Summit in Copenhagen, Norstar Digital was honored with the prestigious Catalyst Innovation Award for its breakthrough Autonomous Cloud Mesh architecture, engineered in collaboration with leading tier-1 telecommunications carriers.',
      'The award acknowledges Norstar Digital’s leadership in deploying self-healing agentic workflows that reduce multi-cloud network latency by 45% while driving sub-millisecond automated workload balancing.',
    ],
    quote: 'This recognition highlights our sustained focus on turning enterprise cloud networks into intelligent, autonomous cognitive ecosystems.',
    quoteAuthor: 'Edara Deepak Chowdary, Chief Technology & AI Officer',
  },
  {
    id: 2,
    type: 'News',
    date: 'July 29, 2026',
    title: 'Norstar Digital Recognized by DWP UK as a Disability Confident Service Provider',
    image: '/images/whatsnew_inclusive_exec.jpg',
    subtitle: 'Securing the highest level of UK government accreditation for accessible workplaces and inclusive engineering.',
    paragraphs: [
      'The Department for Work and Pensions (DWP) UK has formally accredited Norstar Digital as a Disability Confident Leader, recognizing its pioneering workplace policies, adaptive software engineering laboratories, and inclusive leadership development programs.',
      'Through ergonomic physical work hubs and AI-powered assistive workstation tools, Norstar enables team members across all global centers to lead complex technological transformations without physical or sensory barriers.',
    ],
    quote: 'True innovation flourishes when every perspective is valued and empowered to drive transformative impact.',
    quoteAuthor: 'Global People & Culture Council, Norstar Digital',
  },
  {
    id: 3,
    type: 'Press Release',
    date: 'July 28, 2026',
    title: 'Norstar Digital Launches Engineering Experience Centre to Turn Ideas into Impact',
    image: '/images/whatsnew_warehouse_conveyor.jpg',
    subtitle: 'State-of-the-art 50,000 sq ft facility empowers enterprises to test physical AI and autonomous sortation at scale.',
    paragraphs: [
      'Norstar Digital today announced the formal inauguration of its flagship Autonomous Logistics Experience Centre. The facility features operational high-speed conveyor lines, autonomous mobile robots (AMRs), and computer-vision quality inspection cells.',
      'Global retail and manufacturing enterprises can now rapidly prototype digital twin simulations and deploy real-time edge AI models to maximize supply chain throughput and prevent fulfillment bottlenecks.',
    ],
    quote: 'We are bridging the gap between algorithmic models and tangible, physical supply chain execution.',
    quoteAuthor: 'Dr. Marcus Vance, Global Head of AI Platforms',
  },
  {
    id: 4,
    type: 'News',
    date: 'July 15, 2026',
    title: 'Norstar and NVIDIA Collaborate on Sovereign Enterprise LLM Computing Stacks',
    image: '/images/insights_quantum.jpg',
    subtitle: 'Turnkey private accelerated compute infrastructure for regulated financial and government institutions.',
    paragraphs: [
      'Norstar Digital and NVIDIA have announced an expanded strategic collaboration to deploy sovereign AI infrastructure clusters that ensure complete data provenance and regulatory compliance.',
      'The co-engineered platform integrates Norstar’s enterprise governance mesh with high-performance GPU nodes, empowering institutions to run private LLMs with absolute data isolation.',
    ],
  },
  {
    id: 5,
    type: 'Press Release',
    date: 'July 02, 2026',
    title: 'Norstar Digital Achieves 100% Renewable Energy Milestone Across Global Cloud Hubs',
    image: '/images/ind_energy.jpg',
    subtitle: 'Advancing corporate sustainability goals with carbon-neutral hyperscale compute hubs.',
    paragraphs: [
      'Demonstrating leadership in eco-conscious technology architectures, Norstar Digital confirmed that 100% of the energy consumed across its managed datacenters now stems from certified wind, solar, and hydro generation.',
      'Algorithmic load-shifting technology also directs carbon-intensive AI model training tasks to regions with active renewable energy surpluses.',
    ],
  },
  {
    id: 6,
    type: 'Press Release',
    date: 'June 18, 2026',
    title: 'Norstar Launches Agentic Core Banking Modernization Suite with Tier-1 Financials',
    image: '/images/ind_banking.jpg',
    subtitle: 'Autonomous code-transformation agents accelerate mainframe migration timelines by 60%.',
    paragraphs: [
      'Norstar Digital has unveiled its next-generation Core Modernization Framework for tier-1 financial institutions. Utilizing autonomous code-reasoning agents, the platform decompiles legacy monolithic codebases into containerized microservices.',
      'The suite is already running in production across two premier retail banking networks, handling over 14 million daily transactions seamlessly.',
    ],
  },
]

function WhatsNewSection() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [selectedItem, setSelectedItem] = useState<WhatsNewItem | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxSlides = Math.max(0, whatsNewItems.length - itemsPerView)

  const next = () => {
    setSlideIndex((prev) => (prev < maxSlides ? prev + 1 : 0))
  }

  const prev = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : maxSlides))
  }

  return (
    <section className="relative w-full bg-[#F6F2EA] border-b border-[#E8E2D5] overflow-hidden lg:h-[calc(100vh-66px)] lg:min-h-[540px] lg:max-h-[850px] flex items-center">
      {/* 1. Subtle Corporate Isometric Diamond Grid Pattern matching Section 2 */}
      <div className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="whatsnew-iso-grid" width="100" height="173.2" patternUnits="userSpaceOnUse">
              <path
                d="M50,0 L100,28.87 L100,86.6 L50,115.47 L0,86.6 L0,28.87 Z"
                fill="none"
                stroke="#D1C9B7"
                strokeWidth="0.8"
              />
              <path
                d="M50,173.2 L100,144.33 L100,86.6 L50,57.73 L0,86.6 L0,144.33 Z"
                fill="none"
                stroke="#D1C9B7"
                strokeWidth="0.8"
              />
              <line x1="50" y1="0" x2="50" y2="173.2" stroke="#D1C9B7" strokeWidth="0.5" />
              <line x1="0" y1="28.87" x2="100" y2="86.6" stroke="#D1C9B7" strokeWidth="0.5" />
              <line x1="0" y1="86.6" x2="100" y2="28.87" stroke="#D1C9B7" strokeWidth="0.5" />
              <line x1="0" y1="144.33" x2="100" y2="86.6" stroke="#D1C9B7" strokeWidth="0.5" />
              <line x1="0" y1="86.6" x2="100" y2="144.33" stroke="#D1C9B7" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#whatsnew-iso-grid)" />
        </svg>
      </div>

      {/* 2. Main Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-10 sm:py-14 lg:py-0 relative z-10">
        {/* Section Header: Title & Subtitle on Left, Pill Arrows on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <h2 className="text-4xl sm:text-[44px] lg:text-[48px] font-bold text-[#141414] font-outfit tracking-[-0.02em] leading-tight">
              What's New
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#2C2A29] font-outfit mt-2 sm:mt-2.5 font-normal tracking-[-0.01em]">
              Stay connected with our latest updates, press releases, and upcoming events.
            </p>
          </div>

          {/* Stadium/Pill Carousel Arrows matching exact reference shape & style */}
          <div className="flex items-center space-x-3 shrink-0 self-end sm:self-auto">
            <button
              onClick={prev}
              aria-label="Previous News"
              className="w-[52px] h-[28px] sm:w-[58px] sm:h-[32px] rounded-full bg-[#26221C] hover:bg-[#DE0826] transition-all duration-200 flex items-center justify-center text-white cursor-pointer border-0 shadow-xs active:scale-95"
            >
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next News"
              className="w-[52px] h-[28px] sm:w-[58px] sm:h-[32px] rounded-full bg-[#26221C] hover:bg-[#DE0826] transition-all duration-200 flex items-center justify-center text-white cursor-pointer border-0 shadow-xs active:scale-95"
            >
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3. Cards Slider */}
        <div className="overflow-hidden -mx-3">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${slideIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {whatsNewItems.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div
                  onClick={() => setSelectedItem(item)}
                  className="group relative aspect-square w-full rounded-[2px] overflow-hidden cursor-pointer shadow-md bg-neutral-900 border-0"
                >
                  {/* Full Card Background Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Vignette Overlay matching reference */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 via-60% to-transparent pointer-events-none" />

                  {/* Top-Left Category & Date Pill Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-[#1C1C1C]/75 backdrop-blur-md px-3 py-1.5 rounded-[2px] inline-flex items-center text-[12px] sm:text-[13px] font-medium text-white/95 font-outfit tracking-wide shadow-sm border border-white/10">
                      <span>{item.type}</span>
                      <span className="mx-2 text-white/40 font-light">|</span>
                      <span className="text-white/85">{item.date}</span>
                    </div>
                  </div>

                  {/* Bottom Headline matching reference font, weight, and size */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-7 z-10">
                    <h3 className="text-[18px] sm:text-[20px] lg:text-[21px] xl:text-[22px] font-bold text-white font-outfit leading-[1.25] tracking-tight group-hover:text-[#F3475E] transition-colors duration-200 line-clamp-3">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Interactive Full Story Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#141414] border border-white/20 rounded-xl overflow-hidden shadow-2xl p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 cursor-pointer bg-transparent border-0 text-lg"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Badge */}
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#DE0826] mb-3">
              <span>{selectedItem.type}</span>
              <span>•</span>
              <span className="text-gray-400">{selectedItem.date}</span>
            </div>

            {/* Modal Title */}
            <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white mb-4 leading-snug">
              {selectedItem.title}
            </h3>

            {/* Modal Image */}
            <div className="w-full h-52 sm:h-64 rounded-lg overflow-hidden mb-6">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Subtitle & Paragraphs */}
            {selectedItem.subtitle && (
              <p className="text-sm sm:text-base font-semibold text-gray-200 mb-4 font-outfit leading-relaxed">
                {selectedItem.subtitle}
              </p>
            )}

            <div className="text-xs sm:text-sm text-gray-300 space-y-3 leading-relaxed font-sans">
              {selectedItem.paragraphs?.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {selectedItem.quote && (
              <div className="mt-6 p-4 rounded-lg bg-white/5 border-l-4 border-[#DE0826]">
                <p className="italic text-sm text-gray-200">"{selectedItem.quote}"</p>
                {selectedItem.quoteAuthor && (
                  <p className="text-xs text-[#E06380] font-semibold mt-2">
                    — {selectedItem.quoteAuthor}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

// -------------------------------------------------------------
// 9. "Capabilities" (Home Section - Overview)
// -------------------------------------------------------------
function CapabilitiesOverviewSection({ onExploreMore }: { onExploreMore: () => void }) {
  const [activeCapability, setActiveCapability] = useState(0)
  const current = allCapabilitiesList[activeCapability]

  return (
    <section id="capabilities" className="py-20 md:py-28 bg-[#38020E] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-8">
              Capabilities
            </h2>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {allCapabilitiesList.slice(0, 8).map((cap, idx) => (
                <button
                  key={cap.title}
                  onClick={() => setActiveCapability(idx)}
                  onMouseEnter={() => setActiveCapability(idx)}
                  className={`w-full py-4 text-left flex items-center justify-between transition-all duration-200 group ${
                    activeCapability === idx
                      ? 'text-white font-bold pl-3 border-l-4 border-[#DE0826] bg-white/5'
                      : 'text-gray-400 hover:text-white font-medium hover:pl-2'
                  }`}
                >
                  <span className="text-base sm:text-lg">{cap.title}</span>
                  <Icon
                    name="chevron-right"
                    className={`w-4 h-4 transition-transform ${
                      activeCapability === idx
                        ? 'text-[#DE0826] translate-x-1'
                        : 'text-gray-600 group-hover:text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={onExploreMore}
                className="inline-flex items-center space-x-2 bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold px-6 py-3.5 rounded transition-all shadow-md"
              >
                <span>View All Capabilities Matrix</span>
                <Icon name="arrow-right" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="bg-black/30 rounded-2xl p-8 border border-white/15 backdrop-blur-md">
              <div className="text-xs font-mono text-[#DE0826] font-bold uppercase tracking-wider mb-2">
                CAPABILITY 0{activeCapability + 1}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {current.title}
              </h3>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {current.services.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-white/10 text-white/90 text-xs rounded font-medium border border-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <ImageBox
                label={`Graphic • ${current.title}`}
                aspectRatio="aspect-[16/9]"
                dark={true}
                className="rounded-xl border border-white/15"
                imageSrc={current.image}
              />

              <div className="mt-6 flex justify-end">
                <button
                  onClick={onExploreMore}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-[#DE0826] hover:text-red-300 uppercase tracking-wider bg-transparent border-0 cursor-pointer"
                >
                  <span>Explore in Detail</span>
                  <Icon name="arrow-right" className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 10. "Expertise Across Industries"
// -------------------------------------------------------------
const industryList = [
  {
    icon: 'chart',
    title: 'Banking & Financial Services (BFSI)',
    desc: 'Powering cloud core banking, fraud detection with AI, Open Banking, and algorithmic risk mitigation for premier financial institutions.',
  },
  {
    icon: 'phone',
    title: 'Communications & Media',
    desc: 'Engineering autonomous 5G networks, cloud-native telecom stacks, and hyper-personalized digital streaming experiences.',
  },
  {
    icon: 'heart',
    title: 'Healthcare & Life Sciences',
    desc: 'Connecting patient health journeys, accelerating clinical trials, and ensuring robust HIPAA compliance through resilient cloud infrastructures.',
  },
  {
    icon: 'factory',
    title: 'Manufacturing & High-Tech',
    desc: 'Architecting Smart Factory 4.0, digital twin predictive maintenance, and agile global supply chain orchestration.',
  },
  {
    icon: 'shopping',
    title: 'Retail & Consumer Goods (CPG)',
    desc: 'Delivering unified omnichannel commerce, automated inventory intelligence, and next-generation customer loyalty platforms.',
  },
  {
    icon: 'zap',
    title: 'Energy & Utilities',
    desc: 'Driving smart grid modernization, carbon footprint accounting, renewable energy optimization, and predictive asset management.',
  },
]

function IndustriesSection({ onExploreMore }: { onExploreMore?: () => void }) {
  const [industrySlide, setIndustrySlide] = useState(0)
  const maxSlide = industryList.length - 3

  const next = () => {
    setIndustrySlide((prev) => (prev < maxSlide ? prev + 1 : 0))
  }

  const prev = () => {
    setIndustrySlide((prev) => (prev > 0 ? prev - 1 : maxSlide))
  }

  return (
    <section id="industries" className="py-20 md:py-28 bg-pinstripes border-b border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950">
              Expertise Across Industries
            </h2>
            <p className="text-gray-600 text-sm mt-2 max-w-lg">
              Tailored digital solutions built on decades of domain mastery and technological leadership.
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            {onExploreMore && (
              <button
                onClick={onExploreMore}
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#DE0826] hover:text-[#BE001D] border border-red-200 hover:border-[#DE0826] bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded transition-all cursor-pointer"
              >
                <span>View All 14 Industries</span>
                <Icon name="arrow-right" className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={prev}
              aria-label="Previous Industry"
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#DE0826] hover:text-[#DE0826] bg-white flex items-center justify-center text-gray-700 transition-colors shadow-sm"
            >
              <Icon name="chevron-left" className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next Industry"
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#DE0826] hover:text-[#DE0826] bg-white flex items-center justify-center text-gray-700 transition-colors shadow-sm"
            >
              <Icon name="chevron-right" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{ transform: `translateX(-${industrySlide * 33.333}%)` }}
          >
            {industryList.map((ind) => (
              <div
                key={ind.title}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div className="bg-white rounded-xl border border-gray-200/90 p-8 shadow-sm hover:shadow-md hover:border-[#DE0826] transition-all duration-200 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-lg bg-red-50 text-[#DE0826] flex items-center justify-center group-hover:bg-[#DE0826] group-hover:text-white transition-colors shadow-xs">
                        <Icon name={ind.icon as IconName} className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-gray-400 font-semibold">
                        {ind.title.split(' ')[0]}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#DE0826] transition-colors leading-snug">
                      {ind.title}
                    </h3>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                      {ind.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 group-hover:text-[#DE0826]">
                      Explore Sector
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#DE0826] text-white flex items-center justify-center shadow-xs">
                      <Icon name="arrow-right" className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 11. "Success Stories"
// -------------------------------------------------------------
const successStories = [
  {
    id: 1,
    client: 'AT&T',
    category: 'Telecommunications',
    title: 'How AT&T and Norstar Transformed Field Operations with AI',
    desc: 'Empowered 25,000+ field technicians with real-time AI guidance, reducing repeat truck rolls by 28%.',
    isVideo: true,
    image: '/images/case_consult.jpg',
  },
  {
    id: 2,
    client: 'Norstar Racing',
    category: 'Formula E Racing',
    title: 'Accelerating Norstar Racing with Real-Time AI Analytics',
    desc: 'Sub-second sensor streaming and telemetry optimization providing competitive edge on international circuits.',
    isVideo: false,
    image: '/images/home_racing.jpg',
  },
  {
    id: 3,
    client: 'Global Retail Giant',
    category: 'Retail & Omnichannel',
    title: 'Modernizing Supply Chain with Generative AI and Autonomous Fulfillment',
    desc: 'Boosted order accuracy by 40% while slashing inventory holding costs across 1,200 stores.',
    isVideo: false,
    image: '/images/case_port.jpg',
  },
  {
    id: 4,
    client: 'Top European Telecom',
    category: 'Cloud Core & 5G',
    title: 'Achieving 40% Operational Cost Optimization with Cloud Core Migration',
    desc: 'Modernized core switching network to hybrid cloud infrastructure for 18 million active subscribers.',
    isVideo: false,
    image: '/images/case_ribbon.jpg',
  },
]

function SuccessStoriesSection() {
  const [storyIndex, setStoryIndex] = useState(0)
  const maxStory = successStories.length - 2

  const next = () => {
    setStoryIndex((prev) => (prev < maxStory ? prev + 1 : 0))
  }

  const prev = () => {
    setStoryIndex((prev) => (prev > 0 ? prev - 1 : maxStory))
  }

  return (
    <section id="success-stories" className="py-20 md:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950">
              Success Stories
            </h2>
            <p className="text-gray-600 text-sm mt-2 max-w-md">
              Real-world transformation metrics delivered for global leaders across industries.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={prev}
              aria-label="Previous Story"
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#DE0826] hover:text-[#DE0826] bg-white flex items-center justify-center text-gray-700 transition-colors shadow-sm"
            >
              <Icon name="chevron-left" className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next Story"
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#DE0826] hover:text-[#DE0826] bg-white flex items-center justify-center text-gray-700 transition-colors shadow-sm"
            >
              <Icon name="chevron-right" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{ transform: `translateX(-${storyIndex * 33.333}%)` }}
          >
            {successStories.map((story) => (
              <div
                key={story.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#DE0826] hover:shadow-lg transition-all duration-200 h-full flex flex-col justify-between group">
                  <div>
                    <div className="relative">
                      <ImageBox
                        label={`Case Study • ${story.client}`}
                        aspectRatio="aspect-[16/10]"
                        dark={false}
                        imageSrc={story.image}
                      />
                      {story.isVideo && (
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#DE0826] text-white flex items-center justify-center shadow-md">
                          <Icon name="play" className="w-3.5 h-3.5 fill-current" />
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-2 text-xs text-[#DE0826] font-bold mb-2">
                        <span>{story.client}</span>
                        <span>•</span>
                        <span className="text-gray-500 font-medium">{story.category}</span>
                      </div>

                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#DE0826] transition-colors leading-snug mb-3">
                        {story.title}
                      </h3>

                      <p className="text-gray-600 text-xs leading-relaxed">
                        {story.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-800 group-hover:text-[#DE0826]">
                    <span>View Case Study</span>
                    <Icon name="arrow-right" className="w-3.5 h-3.5 text-[#DE0826]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 12. "Limitless Together"
// -------------------------------------------------------------
function LimitlessTogetherSection() {
  return (
    <section id="careers" className="py-20 md:py-24 bg-[#0B0F19] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="bg-neutral-900 rounded-2xl p-4 border border-white/10 shadow-2xl">
              <ImageBox
                label="Limitless Together • Collaborative Culture"
                aspectRatio="aspect-[16/10]"
                dark={true}
                imageSrc="/images/limitless_team.jpg"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Limitless Together
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              At Norstar, we believe that when human ingenuity connects with intelligent technology, possibilities become limitless.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Join a diverse global community of 145,000+ innovators, engineers, strategists, and creators shaping the future across 90+ nations. Discover your next milestone with us.
            </p>

            <a
              href="#careers"
              className="inline-flex items-center space-x-2 bg-white text-gray-950 hover:bg-[#DE0826] hover:text-white text-xs font-bold px-7 py-3.5 rounded transition-all shadow-lg"
            >
              <span>Explore Careers</span>
              <Icon name="arrow-right" className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 13. Enterprise Footer (Dark Navy with Geometric Accents)
// Exactly matching the screenshot!
// -------------------------------------------------------------
interface FooterProps {
  onRouteChange: (route: PageRoute) => void
}

function Footer({ onRouteChange }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0B0F19] text-gray-400 text-xs border-t border-white/10 relative overflow-hidden">
      {/* Geometric diagonal lines in background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="100%" x2="40%" y2="0" stroke="white" strokeWidth="1" />
          <line x1="30%" y1="100%" x2="70%" y2="0" stroke="white" strokeWidth="1" />
          <line x1="60%" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo & Brand Column */}
          <div className="md:col-span-4">
            <button
              onClick={() => onRouteChange('home')}
              className="flex items-center space-x-2.5 mb-4 bg-transparent border-0 p-0 cursor-pointer text-left group"
            >
              <svg
                viewBox="0 0 32 32"
                className="w-8 h-7 fill-[#DE0826] transition-transform group-hover:scale-105"
              >
                <polygon points="0,10 32,0 32,22 0,32" />
              </svg>
              <div className="flex flex-col leading-none select-none">
                <span className="font-extrabold text-base tracking-tight text-white uppercase leading-tight">
                  Nor<span className="text-[#DE0826]">star</span>
                </span>
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mt-0.5 leading-tight">
                  Digital
                </span>
              </div>
            </button>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm mb-4">
              Scale at Speed™ — Co-innovating with global organizations to enable transformative digital scale.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-3">
            <ul className="space-y-3 text-xs">
              <li>
                <button
                  onClick={() => onRouteChange('about')}
                  className="hover:text-[#DE0826] transition-colors bg-transparent border-0 p-0 text-left cursor-pointer"
                >
                  Our Brand
                </button>
              </li>
              <li><a href="#sustainability" className="hover:text-[#DE0826] transition-colors">Sustainability</a></li>
              <li><a href="#about" className="hover:text-[#DE0826] transition-colors">Corporate Citizenship</a></li>
              <li><a href="#investors" className="hover:text-[#DE0826] transition-colors">Investor Relations</a></li>
              <li><a href="#contact" className="hover:text-[#DE0826] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-3">
            <ul className="space-y-3 text-xs">
              <li><a href="#whats-new" className="hover:text-[#DE0826] transition-colors">News</a></li>
              <li><a href="#latest-thinking" className="hover:text-[#DE0826] transition-colors">Events</a></li>
              <li><a href="#careers" className="hover:text-[#DE0826] transition-colors">Careers</a></li>
              <li><a href="#about" className="hover:text-[#DE0826] transition-colors">Alumni</a></li>
              <li><a href="#sitemap" className="hover:text-[#DE0826] transition-colors">Sitemap</a></li>
              <li><a href="#cookies" className="hover:text-[#DE0826] transition-colors">Cookie Preferences</a></li>
            </ul>
          </div>

          {/* Social Icons Column */}
          <div className="md:col-span-2 flex md:justify-end items-start space-x-4 text-white">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#DE0826] transition-colors text-sm">f</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#DE0826] transition-colors text-sm font-bold">𝕏</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#DE0826] transition-colors text-sm font-bold">in</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#DE0826] transition-colors text-sm">▶</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#DE0826] transition-colors text-sm">📷</a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/5 bg-[#070B14] relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-gray-500">
            © 2026 Norstar Digital Limited. All rights reserved.
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2 text-[11px] text-gray-400 bg-white/5 px-3 py-1 rounded border border-white/10">
            <Icon name="globe" className="w-3.5 h-3.5 text-[#DE0826]" />
            <span>English (Global)</span>
            <span className="text-[9px]">▼</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-500">
            <a href="#terms" className="hover:text-gray-300">Terms of Use</a>
            <span>•</span>
            <a href="#accessibility" className="hover:text-gray-300">Accessibility</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-gray-300">Privacy</a>
            <span>•</span>
            <a href="#cookie" className="hover:text-gray-300">Cookie</a>
          </div>
        </div>
      </div>

      {/* Floating Circular Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-white hover:bg-[#DE0826] text-gray-800 hover:text-white flex items-center justify-center shadow-2xl transition-all duration-200 z-40 border border-gray-200"
        aria-label="Back to top"
      >
        <div className="transform -rotate-90">
          <Icon name="arrow-right" className="w-4 h-4" />
        </div>
      </button>
    </footer>
  )
}

// -------------------------------------------------------------
// Main Application Component with Page Routing
// -------------------------------------------------------------
export default function App() {
  const [route, setRoute] = useState<PageRoute>(() => {
    const hash = window.location.hash
    if (hash.includes('contact')) return 'contact'
    if (hash.includes('careers')) return 'careers'
    if (hash.includes('insights')) return 'insights'
    if (hash.includes('industries')) return 'industries'
    if (hash.includes('capabilities')) return 'capabilities'
    if (hash.includes('about')) return 'about'
    return 'home'
  })

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash.includes('contact')) {
        setRoute('contact')
      } else if (hash.includes('careers')) {
        setRoute('careers')
      } else if (hash.includes('insights')) {
        setRoute('insights')
      } else if (hash.includes('industries')) {
        setRoute('industries')
      } else if (hash.includes('capabilities')) {
        setRoute('capabilities')
      } else if (hash.includes('about')) {
        setRoute('about')
      } else {
        setRoute('home')
      }
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handleRouteChange = (newRoute: PageRoute) => {
    setRoute(newRoute)
    if (newRoute === 'contact') {
      window.location.hash = '#/contact'
    } else if (newRoute === 'careers') {
      window.location.hash = '#/careers'
    } else if (newRoute === 'insights') {
      window.location.hash = '#/insights'
    } else if (newRoute === 'industries') {
      window.location.hash = '#/industries'
    } else if (newRoute === 'capabilities') {
      window.location.hash = '#/capabilities'
    } else if (newRoute === 'about') {
      window.location.hash = '#/about'
    } else {
      window.location.hash = '#/home'
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 antialiased selection:bg-[#DE0826] selection:text-white">
      {/* Primary Navigation Bar with Page Toggle */}
      <Navbar currentRoute={route} onRouteChange={handleRouteChange} />

      {/* Main Content Area: Home, About Us, or Capabilities */}
      <main className="flex-grow">
        {route === 'contact' ? (
          <ContactPage />
        ) : route === 'careers' ? (
          <CareersPage />
        ) : route === 'insights' ? (
          <InsightsPage />
        ) : route === 'industries' ? (
          <IndustriesPage onNavigateToCapabilities={() => handleRouteChange('capabilities')} />
        ) : route === 'capabilities' ? (
          <CapabilitiesPage />
        ) : route === 'about' ? (
          <AboutUsPage />
        ) : (
          <>
            {/* 3. Hero Section (Full-Bleed Automated & Manual Slider) */}
            <HeroSection onRouteChange={handleRouteChange} />

            {/* 4. Brand Promise ("Scale at Speed™ with Tech Mahindra") */}
            <BrandPromiseSection onRouteChange={handleRouteChange} />

            {/* 5. Podcast Spotlight Banner ("S/N") */}
            <PodcastSection />

            {/* 6. Latest Thinking (Asymmetric Masonry Grid) */}
            <LatestThinkingSection />

            {/* 7. The Big Thinkers (WSJ Collaboration) */}
            <BigThinkersSection />

            {/* 8. What's New (Interactive Sliding Carousel) */}
            <WhatsNewSection />

            {/* 9. Capabilities Overview Section */}
            <CapabilitiesOverviewSection
              onExploreMore={() => handleRouteChange('capabilities')}
            />

            {/* 10. Expertise Across Industries (Sliding Carousel) */}
            <IndustriesSection onExploreMore={() => handleRouteChange('industries')} />

            {/* 11. Success Stories (Sliding Carousel) */}
            <SuccessStoriesSection />

            {/* 12. Limitless Together (Culture & Careers) */}
            <LimitlessTogetherSection />
          </>
        )}

        {/* Global Contact Us Section (featured in non-contact pages at footer section) */}
        {route !== 'contact' && <ContactUsSection />}
      </main>

      {/* 13. Enterprise Footer */}
      <Footer onRouteChange={handleRouteChange} />
    </div>
  )
}
