import { useCallback, useEffect, useRef, useState } from 'react'
import { AboutUsPage, type AboutSubpage } from './AboutPages'

// Configuration for image placeholder mode
const TEMP_IMAGE_SRC = '/temp-image.png'

type PageRoute = 'home' | 'about' | 'capabilities' | 'industries' | 'insights' | 'careers' | 'contact' | 'case-study'

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
  activeAboutSubpage?: AboutSubpage
  onRouteChange: (route: PageRoute, subpage?: AboutSubpage, targetItem?: string) => void
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

  const handleNavClick = (route: PageRoute, subpage?: AboutSubpage, targetItem?: string) => {
    setOpenMenu(null)
    setSearchOpen(false)
    setMobileOpen(false)
    onRouteChange(route, subpage, targetItem)
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
                    <button
                      onClick={() => handleNavClick('about', 'overview')}
                      className="font-bold text-[14px] text-gray-950 mb-3.5 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                    >
                      Corporate Overview
                    </button>
                    <ul className="space-y-2 text-[13px] text-gray-700">
                      {[
                        { label: 'Leadership', subpage: 'leadership' as AboutSubpage },
                        { label: 'Our Brand', subpage: 'brand' as AboutSubpage },
                        { label: 'Sustainability', subpage: 'sustainability' as AboutSubpage },
                        { label: 'Recognition', subpage: 'recognition' as AboutSubpage },
                        { label: 'Customer Speak', subpage: 'customer-speak' as AboutSubpage },
                        { label: 'Partners Ecosystem', subpage: 'partners' as AboutSubpage },
                        { label: 'Portfolio Companies', subpage: 'portfolio' as AboutSubpage },
                      ].map((item) => (
                        <li key={item.label}>
                          <button
                            onClick={() => handleNavClick('about', item.subpage)}
                            className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left font-normal"
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Middle Column 2: News, IR, Citizenship, Centricity */}
                  <div className="col-span-4 space-y-4">
                    <div>
                      <button
                        onClick={() => handleNavClick('about', 'news')}
                        className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                      >
                        News
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() => handleNavClick('about', 'investors')}
                        className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                      >
                        Investor Relations
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() => handleNavClick('about', 'citizenship')}
                        className="font-bold text-[14px] text-gray-950 mb-2 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                      >
                        Corporate Citizenship
                      </button>
                      <ul className="space-y-1.5 text-[13px] text-gray-700">
                        {[
                          'Tech Mahindra Foundation',
                          'Mahindra Educational Institutions',
                          'Individual Social Responsibility',
                        ].map((item) => (
                          <li key={item}>
                            <button
                              onClick={() => handleNavClick('about', 'citizenship')}
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
                        onClick={() => handleNavClick('about', 'centricity')}
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
                      onClick={() => handleNavClick('about', 'brand')}
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
                      onClick={() => handleNavClick('capabilities')}
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
                <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Heading */}
                  <div className="col-span-12 lg:col-span-3">
                    <h3 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                      Our Services
                    </h3>
                  </div>

                  {/* 3 Equal Columns */}
                  <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
                    {/* Column 1: Consulting & Applications */}
                    <div className="space-y-4">
                      <div>
                        <button
                          onClick={() => handleNavClick('capabilities', undefined, 'TechM Consulting')}
                          className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block mb-3"
                        >
                          TechM Consulting
                        </button>
                      </div>

                      <div>
                        <button
                          onClick={() => handleNavClick('capabilities', undefined, 'Application Services')}
                          className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block mb-2"
                        >
                          Application Services
                        </button>
                        <ul className="space-y-1.5 text-[13px] text-gray-700">
                          {[
                            'Agentic Development and Modernization Services',
                            'Intelligent Automation',
                            'Testing Services',
                            'Performance Engineering',
                          ].map((item) => (
                            <li key={item}>
                              <button
                                onClick={() => handleNavClick('capabilities', undefined, item)}
                                className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left font-normal leading-snug"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 space-y-3">
                        <button
                          onClick={() => handleNavClick('capabilities', undefined, 'Experience Services')}
                          className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                        >
                          Experience Services
                        </button>

                        <button
                          onClick={() => handleNavClick('capabilities', undefined, 'Sustainability Services')}
                          className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                        >
                          Sustainability Services
                        </button>
                      </div>
                    </div>

                    {/* Column 2: Digital Core, AI & Engineering */}
                    <div className="space-y-4">
                      <div>
                        <button
                          onClick={() => handleNavClick('capabilities', undefined, 'Digital Core Services')}
                          className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block mb-2"
                        >
                          Digital Core Services
                        </button>
                        <ul className="space-y-1.5 text-[13px] text-gray-700">
                          {[
                            'Cloud & Infrastructure Services',
                            'Cloud Consulting',
                            'Network Services',
                            'Cyber Security',
                          ].map((item) => (
                            <li key={item}>
                              <button
                                onClick={() => handleNavClick('capabilities', undefined, item)}
                                className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left font-normal"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 space-y-3">
                        <button
                          onClick={() => handleNavClick('capabilities', undefined, 'Artificial Intelligence')}
                          className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                        >
                          Artificial Intelligence
                        </button>

                        <button
                          onClick={() => handleNavClick('capabilities', undefined, 'Data Analytics')}
                          className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                        >
                          Data Analytics
                        </button>

                        <button
                          onClick={() => handleNavClick('capabilities', undefined, 'Engineering Services')}
                          className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                        >
                          Engineering Services
                        </button>
                      </div>
                    </div>

                    {/* Column 3: Digital Enterprise Applications & Integrated Offerings */}
                    <div className="space-y-4">
                      <div>
                        <button
                          onClick={() => handleNavClick('capabilities', undefined, 'Digital Enterprise Applications')}
                          className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block mb-2"
                        >
                          Digital Enterprise Applications
                        </button>
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
                                onClick={() => handleNavClick('capabilities', undefined, item)}
                                className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left font-normal"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 space-y-3">
                        <button
                          onClick={() => handleNavClick('capabilities', undefined, 'Business Process Services')}
                          className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                        >
                          Business Process Services
                        </button>

                        <div>
                          <button
                            onClick={() => handleNavClick('capabilities', undefined, 'Integrated Offerings')}
                            className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block mb-1"
                          >
                            Integrated Offerings
                          </button>
                          <button
                            onClick={() => handleNavClick('capabilities', undefined, 'Global Capability Centers')}
                            className="text-[13px] text-gray-700 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block font-normal"
                          >
                            Global Capability Centers
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Spotlight */}
                <div className="pt-6 border-t border-gray-100 grid grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="col-span-12 lg:col-span-3">
                    <h3 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                      Spotlight
                    </h3>
                  </div>

                  <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
                    <div>
                      <button
                        onClick={() => handleNavClick('capabilities', undefined, 'Products & Platforms')}
                        className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                      >
                        Products & Platforms
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() => handleNavClick('capabilities', undefined, 'Innovation, R&D - Makers Lab')}
                        className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                      >
                        Innovation, R&D - Makers Lab
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() => handleNavClick('capabilities', undefined, 'Scale at Speed™')}
                        className="font-bold text-[14px] text-gray-950 hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                      >
                        Scale at Speed™
                      </button>
                    </div>
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
                            onClick={() => handleNavClick('industries', undefined, item)}
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
                            onClick={() => handleNavClick('industries', undefined, item)}
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
                      onClick={() => handleNavClick('industries', undefined, 'Retail & Consumer Goods')}
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
                      onClick={() => handleNavClick('industries', undefined, 'Hi Tech')}
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
              <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-7">
                <div className="grid grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left Column: Heading */}
                  <div className="col-span-12 lg:col-span-2">
                    <h3 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                      Insights
                    </h3>
                  </div>

                  {/* Middle Column: Links in 2 Columns (2 to 3 rows) */}
                  <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-6 text-[14px] font-bold text-gray-950">
                    <ul className="space-y-3.5">
                      {['Case Studies', 'Views', 'Analyst Insights'].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => handleNavClick('insights', undefined, item)}
                            className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-3.5">
                      {['News', 'Events'].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => handleNavClick('insights', undefined, item)}
                            className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: 2 Featured Cards Side-by-Side (Decreased Size) */}
                  <div className="col-span-12 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Card 1: Press Release */}
                    <div
                      onClick={() => handleNavClick('insights', undefined, 'News')}
                      className="relative h-[130px] overflow-hidden group cursor-pointer bg-black"
                    >
                      <img
                        src="/images/insights_hero.jpg"
                        alt="Q1 EBIT Press Release"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-3.5 flex flex-col justify-between">
                        <span className="text-[10px] font-semibold text-white/90 border-b border-white/60 pb-0.5 inline-block self-start uppercase tracking-wider">
                          Featured Press Release
                        </span>
                        <div>
                          <h5 className="text-[11px] sm:text-xs font-bold text-white leading-snug line-clamp-2">
                            Tech Mahindra Q1 FY27 EBIT rises to ₹2,264 crores, up 53.3% YoY; deal-wins at USD 1,078 Mn
                          </h5>
                          <span className="text-[9px] font-extrabold text-white tracking-wider uppercase mt-1 inline-block group-hover:underline">
                            READ MORE
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Dreamforce Event */}
                    <div
                      onClick={() => handleNavClick('insights', undefined, 'Events')}
                      className="relative h-[130px] overflow-hidden group cursor-pointer bg-black"
                    >
                      <img
                        src="/images/event_dreamforce.jpg"
                        alt="Dreamforce 2026"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-3.5 flex flex-col justify-between">
                        <span className="text-[10px] font-semibold text-white/90 border-b border-white/60 pb-0.5 inline-block self-start uppercase tracking-wider">
                          Featured Event
                        </span>
                        <div>
                          <h5 className="text-[11px] sm:text-xs font-bold text-white leading-snug line-clamp-2">
                            Tech Mahindra at Dreamforce 2026: Turning AI into a Co-Worker
                          </h5>
                          <span className="text-[9px] font-extrabold text-white tracking-wider uppercase mt-1 inline-block group-hover:underline">
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
              <div className="max-w-[1440px] mx-auto px-8 sm:px-12 py-7">
                <div className="grid grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left Column: Heading */}
                  <div className="col-span-12 lg:col-span-2">
                    <h3 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                      Careers
                    </h3>
                  </div>

                  {/* Middle Column: Links List */}
                  <div className="col-span-12 lg:col-span-5">
                    <ul className="space-y-3.5 text-[14px] font-bold text-gray-950">
                      {['The TechM Way', 'Diversity & Inclusion', 'Join Us'].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => handleNavClick('careers', undefined, item)}
                            className="hover:text-[#DE0826] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left block"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: 2 Featured Cards Side-by-Side (Decreased Size) */}
                  <div className="col-span-12 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Card 1: Rubicon Case Study */}
                    <div
                      onClick={() => handleNavClick('careers')}
                      className="relative h-[130px] overflow-hidden group cursor-pointer bg-black"
                    >
                      <img
                        src="/images/story_racing.jpg"
                        alt="Rubicon 2.0"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-3.5 flex flex-col justify-between">
                        <span className="text-[10px] font-semibold text-white/90 border-b border-white/60 pb-0.5 inline-block self-start uppercase tracking-wider">
                          Featured Case Study
                        </span>
                        <div>
                          <h5 className="text-[11px] sm:text-xs font-bold text-white leading-snug line-clamp-2">
                            Outpacing Change with Rubicon 2.0
                          </h5>
                          <span className="text-[9px] font-extrabold text-white tracking-wider uppercase mt-1 inline-block group-hover:underline">
                            READ MORE
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Stockmann Case Study */}
                    <div
                      onClick={() => handleNavClick('careers')}
                      className="relative h-[130px] overflow-hidden group cursor-pointer bg-black"
                    >
                      <img
                        src="/images/case_ribbon.jpg"
                        alt="Stockmann Case Study"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-3.5 flex flex-col justify-between">
                        <span className="text-[10px] font-semibold text-white/90 border-b border-white/60 pb-0.5 inline-block self-start uppercase tracking-wider">
                          Featured Case Study
                        </span>
                        <div>
                          <h5 className="text-[11px] sm:text-xs font-bold text-white leading-snug line-clamp-2">
                            Stockmann Cuts Supplier Onboarding from Weeks to Hours
                          </h5>
                          <span className="text-[9px] font-extrabold text-white tracking-wider uppercase mt-1 inline-block group-hover:underline">
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
                    <div
                      onClick={() => handleNavClick('about', 'overview')}
                      className="font-semibold text-gray-900 cursor-pointer hover:text-[#DE0826]"
                    >
                      Corporate Overview
                    </div>
                    {[
                      { label: 'Leadership', subpage: 'leadership' as AboutSubpage },
                      { label: 'Our Brand', subpage: 'brand' as AboutSubpage },
                      { label: 'Sustainability', subpage: 'sustainability' as AboutSubpage },
                      { label: 'Recognition', subpage: 'recognition' as AboutSubpage },
                      { label: 'Customer Speak', subpage: 'customer-speak' as AboutSubpage },
                      { label: 'Partners Ecosystem', subpage: 'partners' as AboutSubpage },
                      { label: 'Portfolio Companies', subpage: 'portfolio' as AboutSubpage },
                    ].map((i) => (
                      <div
                        key={i.label}
                        onClick={() => handleNavClick('about', i.subpage)}
                        className="cursor-pointer hover:text-[#DE0826]"
                      >
                        {i.label}
                      </div>
                    ))}
                    <div
                      onClick={() => handleNavClick('about', 'citizenship')}
                      className="font-semibold text-gray-900 pt-2 cursor-pointer hover:text-[#DE0826]"
                    >
                      Corporate Citizenship
                    </div>
                    <div
                      onClick={() => handleNavClick('about', 'citizenship')}
                      className="cursor-pointer hover:text-[#DE0826]"
                    >
                      Tech Mahindra Foundation
                    </div>
                    <div
                      onClick={() => handleNavClick('about', 'centricity')}
                      className="font-semibold text-gray-900 pt-2 cursor-pointer hover:text-[#DE0826]"
                    >
                      Customer Centricity
                    </div>
                    <div
                      onClick={() => handleNavClick('about', 'news')}
                      className="cursor-pointer hover:text-[#DE0826]"
                    >
                      News & Press
                    </div>
                    <div
                      onClick={() => handleNavClick('about', 'investors')}
                      className="cursor-pointer hover:text-[#DE0826]"
                    >
                      Investor Relations
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
                      'Experience Services',
                      'Sustainability Services',
                      'Digital Core Services',
                      'Artificial Intelligence',
                      'Data Analytics',
                      'Engineering Services',
                      'Digital Enterprise Applications',
                      'Business Process Services',
                      'Integrated Offerings',
                      'Products & Platforms',
                      'Innovation, R&D - Makers Lab',
                      'Scale at Speed™',
                    ].map((i) => (
                      <div
                        key={i}
                        onClick={() => handleNavClick('capabilities', undefined, i)}
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
                      'Education',
                      'Energy & Utilities',
                      'Healthcare & Life Sciences',
                      'Hi Tech',
                      'Insurance',
                      'Manufacturing',
                      'Media & Entertainment',
                      'Oil & Gas',
                      'Private Equity',
                      'Professional Services',
                      'Retail & Consumer Goods',
                      'Travel, Transportation, Logistics & Hospitality',
                    ].map((i) => (
                      <div
                        key={i}
                        onClick={() => handleNavClick('industries', undefined, i)}
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
    title: 'Cloud & Infrastructure Services',
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

export const allExtendedCapabilities: CapabilityItem[] = [
  ...allCapabilitiesList,
  {
    id: 101,
    title: 'TechM Consulting',
    category: 'Strategic Advisory & Enterprise Architecture',
    gradient: 'from-[#DE0826] via-[#9B113B] to-[#4A081A]',
    iconType: 'magenta-mesh',
    image: '/images/case_consult.jpg',
    description:
      'Architecting end-to-end enterprise digital transformations, business model innovation, C-suite advisory, and organizational agility designed to unlock exponential shareholder value.',
    services: [
      'Digital Business Strategy & Transformation Roadmaps',
      'Enterprise Architecture & Cloud Advisory',
      'Agile Operating Model & Workforce Redesign',
      'Technology Due Diligence & M&A Synergy Integration',
    ],
  },
  {
    id: 102,
    title: 'Application Services',
    category: 'Modern Software & Microservices Engineering',
    gradient: 'from-[#1E40AF] via-[#1D4ED8] to-[#172554]',
    iconType: 'blue-streak',
    image: '/images/cap_agentic.jpg',
    description:
      'Full-lifecycle software engineering, cloud-native modernization, intelligent test automation, and autonomous SDLC acceleration across mission-critical enterprise systems.',
    services: [
      'Agentic Software Development & Automated Refactoring',
      'Composable Microservices Architecture Migration',
      'Autonomous DevOps & Continuous Delivery Pipelines',
      'Legacy Modernization & Technical Debt Elimination',
    ],
  },
  {
    id: 103,
    title: 'Intelligent Automation',
    category: 'Cognitive RPA & Autonomous Operations',
    gradient: 'from-[#0284C7] via-[#0369A1] to-[#075985]',
    iconType: 'floating-spheres',
    image: '/images/cap_ai.jpg',
    description:
      'Unifying robotic process automation (RPA), generative AI, document intelligence, and autonomous bots to streamline high-volume operations and eliminate manual friction.',
    services: [
      'Enterprise Robotic Process Automation (RPA)',
      'Cognitive Document Intelligence & Vision Extraction',
      'Autonomous Workflow Decisioning & Exception Handling',
      'Process Mining, Task Discovery & Optimization',
    ],
  },
  {
    id: 104,
    title: 'Performance Engineering',
    category: 'Scalability, Chaos & Reliability Engineering',
    gradient: 'from-[#4338CA] via-[#3730A3] to-[#312E81]',
    iconType: 'indigo-crescent',
    image: '/images/cap_testing.jpg',
    description:
      'Maximizing high-throughput scalability, chaos resilience, latency reduction, and 24/7 mission-critical uptime for high-volume consumer and financial platforms.',
    services: [
      'High-Throughput Concurrency & Load Stress Testing',
      'Chaos Engineering & Fault Injection Simulation',
      'Full-Stack Telemetry, APM & Observability Optimization',
      'Cloud-Native FinOps & Compute Resource Tuning',
    ],
  },
  {
    id: 105,
    title: 'Sustainability Services',
    category: 'ESG Engineering & Green Computing',
    gradient: 'from-[#DE0826] via-[#B91C1C] to-[#7F1D1D]',
    iconType: 'green-ribbon',
    image: '/images/ind_energy.jpg',
    description:
      'Accelerating enterprise Net Zero trajectories through green cloud software optimization, algorithmic carbon accounting platforms, and circular asset lifecycle management.',
    services: [
      'Green Cloud Computing & Algorithmic Carbon Optimization',
      'Enterprise ESG Reporting & Scope 1/2/3 Analytics',
      'Circular Asset Management & E-Waste Elimination',
      'Clean Energy Grid & Campus Microgrid Integration',
    ],
  },
  {
    id: 106,
    title: 'Digital Core Services',
    category: 'Cloud, Infrastructure & Cyber Resilience',
    gradient: 'from-[#4C1D95] via-[#3B0764] to-[#1E1B4B]',
    iconType: 'floating-spheres',
    image: '/images/cap_cloud.jpg',
    description:
      'Building hyper-resilient, hybrid multi-cloud foundations, automated software-defined networks, and proactive zero-trust cyber defense for modern digital enterprises.',
    services: [
      'Hybrid & Multi-Cloud Infrastructure Modernization',
      'Cloud Strategy, Architecture & Advisory Consulting',
      'Software-Defined Network Services (SD-WAN & SASE)',
      'Enterprise Cyber Security & Proactive SOC Defense',
    ],
  },
  {
    id: 107,
    title: 'Cloud Consulting',
    category: 'Cloud Strategy, Migration & FinOps',
    gradient: 'from-[#2563EB] via-[#1D4ED8] to-[#1E40AF]',
    iconType: 'floating-spheres',
    image: '/images/cap_cloud.jpg',
    description:
      'Independent advisory guiding multi-cloud adoption, zero-trust cloud architecture, containerization, and FinOps cloud spend governance across AWS, Azure, and Google Cloud.',
    services: [
      'Multi-Cloud Readiness & Zero-Downtime Migration',
      'Automated FinOps & Cost Governance Frameworks',
      'Enterprise Kubernetes & Container Orchestration',
      'Cloud Governance, Risk & Regulatory Compliance',
    ],
  },
  {
    id: 108,
    title: 'Cyber Security',
    category: 'Zero-Trust Defense & Threat Resilience',
    gradient: 'from-[#7F1D1D] via-[#450A0A] to-[#1C1917]',
    iconType: 'turbine-blade',
    image: '/images/cap_testing.jpg',
    description:
      'Comprehensive enterprise defense incorporating 24/7 autonomous SOC monitoring, zero-trust network access, cloud security posture defense, and cyber risk management.',
    services: [
      'Zero-Trust Architecture & Identity Access Management (IAM)',
      '24/7 Managed Detection & Response (MDR & SOC)',
      'Cloud Security Posture Management (CSPM & CNAPP)',
      'Threat Intelligence & Autonomous Incident Recovery',
    ],
  },
  {
    id: 109,
    title: 'Data Analytics',
    category: 'Enterprise Data Mesh & Real-Time Insights',
    gradient: 'from-[#0D9488] via-[#0F766E] to-[#115E59]',
    iconType: 'geometric-lavender',
    image: '/images/cap_digital.jpg',
    description:
      'Modernizing legacy data silos into intelligent data meshes, real-time streaming pipelines, self-service visual analytics, and AI-ready enterprise data foundations.',
    services: [
      'Modern Data Lakehouse & Snowflake Architecture',
      'Real-Time Streaming & Kafka Event Pipelines',
      'Self-Service BI & Visual Analytics Dashboards',
      'Data Governance, Lineage & Quality Automation',
    ],
  },
  {
    id: 110,
    title: 'Microsoft Business Applications',
    category: 'Dynamics 365, Power Platform & Copilot',
    gradient: 'from-[#0078D4] via-[#106EBE] to-[#004578]',
    iconType: 'geometric-lavender',
    image: '/images/cap_digital.jpg',
    description:
      'Enterprise implementation and bespoke solution engineering across Microsoft Dynamics 365, Power Platform low-code automation, and Azure Copilot extensions.',
    services: [
      'Dynamics 365 Finance, Supply Chain & CRM Modernization',
      'Power Apps & Power Automate Workflow Automation',
      'Microsoft Copilot Enterprise Integration & Extension',
      'Azure Data & Power BI Business Intelligence Fabric',
    ],
  },
  {
    id: 111,
    title: 'Enterprise Digital Solutions',
    category: 'Composable Architectures & API Ecosystems',
    gradient: 'from-[#6D28D9] via-[#5B21B6] to-[#4C1D95]',
    iconType: 'geometric-lavender',
    image: '/images/cap_digital.jpg',
    description:
      'Delivering end-to-end digital engineering, bespoke enterprise portals, headless commerce journeys, and API-first business integration.',
    services: [
      'API-First Integration & Microservices Ecosystems',
      'B2B/B2C Enterprise Portals & Native Mobile Apps',
      'Headless Omnichannel Digital Commerce Platforms',
      'Legacy Decoupling & Modern Web Engineering',
    ],
  },
  {
    id: 112,
    title: 'SAP',
    category: 'S/4HANA & Clean Core Transformation',
    gradient: 'from-[#0A6ED1] via-[#0854A0] to-[#043363]',
    iconType: 'geometric-lavender',
    image: '/images/cap_digital.jpg',
    description:
      'Guiding global enterprises through RISE with SAP, S/4HANA Cloud migrations, clean core architectures, and AI-infused supply chain planning.',
    services: [
      'RISE with SAP & S/4HANA Cloud Migration',
      'SAP Business Technology Platform (BTP) Innovation',
      'SAP Ariba, SuccessFactors & Concur Integration',
      'Clean Core Customization & Automated Regression',
    ],
  },
  {
    id: 113,
    title: 'ServiceNow',
    category: 'Enterprise Workflow Orchestration',
    gradient: 'from-[#293E40] via-[#1B292B] to-[#032D42]',
    iconType: 'architectural-fan',
    image: '/images/cap_bps.jpg',
    description:
      'Transforming enterprise service operations with ServiceNow IT Service Management (ITSM), HR Service Delivery, Customer Workflows, and Now Assist AI.',
    services: [
      'ITSM, ITOM & ITAM Enterprise Deployment',
      'Now Assist Generative AI Automation',
      'Customer Service Management (CSM) Workflows',
      'HR Service Delivery & Unified Employee Portals',
    ],
  },
  {
    id: 114,
    title: 'Oracle',
    category: 'ERP, SCM & Autonomous Database',
    gradient: 'from-[#C74634] via-[#A82B1B] to-[#801B0E]',
    iconType: 'geometric-lavender',
    image: '/images/cap_digital.jpg',
    description:
      'Modernizing mission-critical financial backbones with Oracle Fusion Cloud ERP, HCM, Supply Chain Management, and Autonomous Database platforms.',
    services: [
      'Oracle Fusion Cloud ERP & EPM Financials',
      'Oracle HCM Talent Architecture & Global Payroll',
      'Oracle Supply Chain Management (SCM) & Logistics',
      'Oracle Cloud Infrastructure (OCI) High-Speed Migration',
    ],
  },
  {
    id: 115,
    title: 'Salesforce',
    category: 'Agentforce, Data Cloud & Customer 360',
    gradient: 'from-[#00A1E0] via-[#0081B4] to-[#032D42]',
    iconType: 'green-ribbon',
    image: '/images/cap_experience.jpg',
    description:
      'Empowering sales, service, and marketing teams with Salesforce Data Cloud, Agentforce autonomous agents, Einstein 1 AI, and Service Cloud.',
    services: [
      'Salesforce Data Cloud & Einstein 1 AI Modernization',
      'Agentforce Autonomous Customer Service Agents',
      'Sales & Service Cloud Modernization at Global Scale',
      'Marketing Cloud Omnichannel Engagement Journeys',
    ],
  },
  {
    id: 116,
    title: 'Pega',
    category: 'Low-Code & Real-Time Decisioning',
    gradient: 'from-[#002B49] via-[#001D31] to-[#00101C]',
    iconType: 'blue-streak',
    image: '/images/cap_agentic.jpg',
    description:
      'Maximizing customer lifetime value and operating efficiency with Pegasystems 1:1 Customer Engagement, Customer Decision Hub, and low-code case management.',
    services: [
      'Pega Customer Decision Hub (CDH) Optimization',
      '1:1 Real-Time Next-Best-Action Decisioning Engines',
      'Pega Infinity Low-Code Case Management',
      'Intelligent KYC & Omnichannel Onboarding Automation',
    ],
  },
  {
    id: 117,
    title: 'Integrated Offerings',
    category: 'End-to-End Enterprise Convergence',
    gradient: 'from-[#9B113B] via-[#7B0D2E] to-[#4A081A]',
    iconType: 'magenta-mesh',
    image: '/images/cap_hero_mesh.jpg',
    description:
      'Combining deep domain expertise, proprietary IP, strategic hyperscaler alliances, and GCC frameworks into unified turnkey business solutions.',
    services: [
      'Global Capability Centers (GCC) Setup & Scale',
      'Industry Convergence Turnkey Platforms',
      'End-to-End IT-OT Integrated Operations',
      'Multi-Tower Managed Transformation Services',
    ],
  },
  {
    id: 118,
    title: 'Global Capability Centers',
    category: 'GCC-as-a-Service & Turnkey Innovation',
    gradient: 'from-[#1E3A8A] via-[#172554] to-[#0F172A]',
    iconType: 'blue-streak',
    image: '/images/about_hq.jpg',
    description:
      'Enabling Fortune 500 multinationals to design, incubate, scale, and operate world-class Global Capability Centers across premier global talent hubs.',
    services: [
      'Turnkey GCC Incubation & BOT (Build-Operate-Transfer)',
      'Talent Architecture & Deep Tech Centers of Excellence',
      'Regulatory, Real Estate & Operational Compliance',
      'Digital Core & AI Lab Integration for Global Scale',
    ],
  },
  {
    id: 119,
    title: 'Products & Platforms',
    category: 'Proprietary IP & SaaS Solutions',
    gradient: 'from-[#DE0826] via-[#B91C1C] to-[#881337]',
    iconType: 'magenta-mesh',
    image: '/images/cap_hero.jpg',
    description:
      'Award-winning suite of industry-specific software products, AI platforms, telecom network orchestrators, and digital customer engagement tools.',
    services: [
      'netOps AI Network Orchestration Platform',
      'Cognitive Operations & Smart Ticketing Fabric',
      'Sovereign AI Foundation Platforms',
      'Industry 4.0 IoT Edge Orchestration Engines',
    ],
  },
  {
    id: 120,
    title: 'Innovation, R&D - Makers Lab',
    category: 'Applied Research, Quantum & Edge AI',
    gradient: 'from-[#7C3AED] via-[#5B21B6] to-[#2E1065]',
    iconType: 'geometric-lavender',
    image: '/images/cap_wave.jpg',
    description:
      'Our dedicated R&D innovation engine pioneering breakthrough applications in quantum computing, neuromorphic hardware, generative design, and spatial web.',
    services: [
      'Quantum Computing & Post-Quantum Cryptography',
      'Applied Generative AI & Sovereign LLM Research',
      'Edge AI, Robotics & Sensor Convergence',
      'Metaverse, Spatial UX & Industrial Digital Twins',
    ],
  },
  {
    id: 121,
    title: 'Scale at Speed™',
    category: 'Next-Generation Operating Model',
    gradient: 'from-[#DE0826] via-[#B91C1C] to-[#450A0A]',
    iconType: 'magenta-mesh',
    image: '/images/home_racing.jpg',
    description:
      'Our defining strategic promise: fusing agility with enterprise scale to turn emerging innovations into measurable business outcomes at accelerated speed.',
    services: [
      'Rapid Prototype-to-Production Velocity',
      'Composable Architecture Frameworks',
      'Autonomous Delivery Automation',
      'Continuous Value Realization Metrics',
    ],
  },
]

export function getCapabilityByName(query: string): CapabilityItem | null {
  if (!query) return null
  const qTrim = query.trim().toLowerCase()

  // 1. Direct exact match (case-insensitive)
  const exact = allExtendedCapabilities.find((item) => item.title.trim().toLowerCase() === qTrim)
  if (exact) return exact

  // 2. Normalized match ('&' converted to 'and', non-alphanumerics removed)
  const norm = (str: string) => str.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '')
  const qNorm = norm(query)

  const exactNorm = allExtendedCapabilities.find((item) => norm(item.title) === qNorm)
  if (exactNorm) return exactNorm

  // 3. Substring matching
  const prefixMatch = allExtendedCapabilities.find((item) => norm(item.title).startsWith(qNorm) || qNorm.startsWith(norm(item.title)))
  if (prefixMatch) return prefixMatch

  const found = allExtendedCapabilities.find((item) => {
    const itemNorm = norm(item.title)
    return itemNorm.includes(qNorm) || qNorm.includes(itemNorm)
  })
  if (found) return found

  // 4. Keyword fallbacks mapped to exact original titles
  if (qNorm.includes('consult')) return allExtendedCapabilities.find((c) => c.title === 'TechM Consulting') || null
  if (qNorm.includes('sap')) return allExtendedCapabilities.find((c) => c.title === 'SAP') || null
  if (qNorm.includes('salesforce')) return allExtendedCapabilities.find((c) => c.title === 'Salesforce') || null
  if (qNorm.includes('servicenow')) return allExtendedCapabilities.find((c) => c.title === 'ServiceNow') || null
  if (qNorm.includes('oracle')) return allExtendedCapabilities.find((c) => c.title === 'Oracle') || null
  if (qNorm.includes('pega')) return allExtendedCapabilities.find((c) => c.title === 'Pega') || null
  if (qNorm.includes('microsoft')) return allExtendedCapabilities.find((c) => c.title === 'Microsoft Business Applications') || null
  if (qNorm.includes('cyber') || qNorm.includes('security')) return allExtendedCapabilities.find((c) => c.title === 'Cyber Security') || null
  if (qNorm.includes('cloud')) return allExtendedCapabilities.find((c) => c.title === 'Cloud & Infrastructure Services') || null
  if (qNorm.includes('ai') || qNorm.includes('intelligence')) return allExtendedCapabilities.find((c) => c.title === 'Artificial Intelligence') || null
  if (qNorm.includes('data') || qNorm.includes('analytics')) return allExtendedCapabilities.find((c) => c.title === 'Data Analytics') || null
  if (qNorm.includes('auto')) return allExtendedCapabilities.find((c) => c.title === 'Intelligent Automation') || null
  if (qNorm.includes('gcc') || qNorm.includes('global')) return allExtendedCapabilities.find((c) => c.title === 'Global Capability Centers') || null
  if (qNorm.includes('maker') || qNorm.includes('rd') || qNorm.includes('lab')) return allExtendedCapabilities.find((c) => c.title === 'Innovation, R&D - Makers Lab') || null
  if (qNorm.includes('scale') || qNorm.includes('speed')) return allExtendedCapabilities.find((c) => c.title === 'Scale at Speed™') || null

  return allExtendedCapabilities[0] || null
}


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
    name: 'Banking & Financial Services',
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
    name: 'Energy & Utilities',
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
    name: 'Healthcare & Life Sciences',
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
    name: 'Hi Tech',
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
    name: 'Insurance',
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
    name: 'Media & Entertainment',
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
    name: 'Oil & Gas',
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
    name: 'Retail & Consumer Goods',
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
    name: 'Travel, Transportation, Logistics & Hospitality',
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

export function getIndustryByName(query: string): IndustryItem | null {
  if (!query) return null
  const qTrim = query.trim().toLowerCase()

  // 1. Direct exact match
  const exact = allIndustriesList.find((item) => item.name.trim().toLowerCase() === qTrim)
  if (exact) return exact

  // 2. Normalized match ('&' converted to 'and', non-alphanumerics removed)
  const norm = (str: string) => str.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '')
  const qNorm = norm(query)

  const exactNorm = allIndustriesList.find((item) => norm(item.name) === qNorm)
  if (exactNorm) return exactNorm

  // 3. Substring matching
  const prefixMatch = allIndustriesList.find((item) => norm(item.name).startsWith(qNorm) || qNorm.startsWith(norm(item.name)))
  if (prefixMatch) return prefixMatch

  const found = allIndustriesList.find((item) => {
    const itemNorm = norm(item.name)
    return itemNorm.includes(qNorm) || qNorm.includes(itemNorm)
  })
  if (found) return found

  // 4. Keyword fallbacks
  if (qNorm.includes('bank') || qNorm.includes('finan')) return allIndustriesList.find((i) => i.id === 'banking-financial') || null
  if (qNorm.includes('comm') || qNorm.includes('telecom') || qNorm.includes('telco')) return allIndustriesList.find((i) => i.id === 'communications') || null
  if (qNorm.includes('edu')) return allIndustriesList.find((i) => i.id === 'education') || null
  if (qNorm.includes('energy') || qNorm.includes('util')) return allIndustriesList.find((i) => i.id === 'energy-utilities') || null
  if (qNorm.includes('health') || qNorm.includes('life')) return allIndustriesList.find((i) => i.id === 'healthcare-life-sciences') || null
  if (qNorm.includes('hitech') || qNorm.includes('tech')) return allIndustriesList.find((i) => i.id === 'hi-tech') || null
  if (qNorm.includes('insur')) return allIndustriesList.find((i) => i.id === 'insurance-technology') || null
  if (qNorm.includes('manuf')) return allIndustriesList.find((i) => i.id === 'manufacturing') || null
  if (qNorm.includes('media') || qNorm.includes('entertain')) return allIndustriesList.find((i) => i.id === 'media-entertainment') || null
  if (qNorm.includes('oil') || qNorm.includes('gas')) return allIndustriesList.find((i) => i.id === 'oil-gas') || null
  if (qNorm.includes('equity') || qNorm.includes('pe')) return allIndustriesList.find((i) => i.id === 'private-equity') || null
  if (qNorm.includes('prof') || qNorm.includes('service')) return allIndustriesList.find((i) => i.id === 'professional-services') || null
  if (qNorm.includes('retail') || qNorm.includes('consum')) return allIndustriesList.find((i) => i.id === 'retail-consumer-goods') || null
  if (qNorm.includes('travel') || qNorm.includes('logist') || qNorm.includes('trans') || qNorm.includes('hospital')) return allIndustriesList.find((i) => i.id === 'travel-transportation') || null

  return allIndustriesList[0] || null
}

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

interface CareersPageProps {
  targetCareer?: string | null
  onClearTarget?: () => void
}

function CareersPage({ targetCareer, onClearTarget }: CareersPageProps) {
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null)
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [appliedRole, setAppliedRole] = useState<string>('')
  const [applySubmitted, setApplySubmitted] = useState(false)
  const [purposeModalOpen, setPurposeModalOpen] = useState(false)
  const [diversityModalOpen, setDiversityModalOpen] = useState(false)
  const [alumniModalOpen, setAlumniModalOpen] = useState(false)
  const [roleSearch, setRoleSearch] = useState('')

  useEffect(() => {
    if (targetCareer) {
      const clean = targetCareer.toLowerCase()
      if (clean.includes('way') || clean.includes('purpose') || clean.includes('culture')) {
        setPurposeModalOpen(true)
      } else if (clean.includes('divers') || clean.includes('inclus')) {
        setDiversityModalOpen(true)
      } else if (clean.includes('join') || clean.includes('role') || clean.includes('job') || clean.includes('apply')) {
        setTimeout(() => {
          const el = document.getElementById('open-roles-section')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      }
    }
  }, [targetCareer])

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

interface InsightsPageProps {
  targetInsight?: string | null
  onClearTarget?: () => void
}

function InsightsPage({ targetInsight, onClearTarget }: InsightsPageProps) {
  const [selectedCase, setSelectedCase] = useState<CaseStudyItem | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [newsModalOpen, setNewsModalOpen] = useState(false)
  const [viewsModalOpen, setViewsModalOpen] = useState(false)
  const [regModalOpen, setRegModalOpen] = useState(false)
  const [regSubmitted, setRegSubmitted] = useState(false)

  useEffect(() => {
    if (targetInsight) {
      const clean = targetInsight.toLowerCase()
      if (clean.includes('news') || clean.includes('press')) {
        setNewsModalOpen(true)
      } else if (clean.includes('view') || clean.includes('analyst')) {
        setViewsModalOpen(true)
      } else if (clean.includes('event')) {
        setTimeout(() => {
          const el = document.getElementById('upcoming-events')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      } else if (clean.includes('case')) {
        setTimeout(() => {
          const el = document.getElementById('insights-case-studies')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      }
    }
  }, [targetInsight])

  return (
    <div className="bg-[#FAF8F5] text-gray-900 min-h-screen">
      {/* 1. Hero Section ("Insights") - True Full-Page (100vh) Viewport */}
      <section className="relative w-full overflow-hidden bg-neutral-950 min-h-[calc(100vh-66px)] h-[calc(100vh-66px)] flex items-center select-none border-b border-white/10">
        {/* Full-bleed background photo */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src="/images/insights_hero.jpg"
            alt="Norstar Digital Insights"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* High-contrast gradient scrim for optimal readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/70 to-black/35 pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-12 flex flex-col justify-center h-full">
          {/* Breadcrumb Header */}
          <div className="flex items-center space-x-2 text-xs font-medium text-gray-300 mb-6 tracking-wide">
            <a href="#/home" className="hover:text-white transition-colors">Home</a>
            <span className="text-gray-500">/</span>
            <span className="text-[#DE0826] font-bold">Insights</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              Latest <span className="text-[#DE0826]">Insights</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-200/90 leading-relaxed font-normal mb-8 max-w-2xl">
              Dive in here for our latest corporate announcements, case studies, executive viewpoints, podcasts, industry whitepapers, and upcoming global tech events.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#featured-insights"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('featured-insights')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center space-x-2 bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded transition-all shadow-lg hover:shadow-red-600/30 cursor-pointer"
              >
                <span>Explore Featured Stories</span>
                <Icon name="arrow-right" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Center Scroll to Explore Indicator */}
        <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center pointer-events-auto">
          <a
            href="#featured-insights"
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('featured-insights')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex flex-col items-center text-white/60 hover:text-white transition-colors group cursor-pointer"
            aria-label="Scroll to Featured Insights"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-white/50 group-hover:text-white">
              Explore Articles
            </span>
            <svg
              className="w-4 h-4 animate-bounce text-[#DE0826]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

        {/* Subtle bottom border line */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-white/10 z-20 pointer-events-none" />
      </section>

      {/* 2. Featured Press Release: Cisco Cyber Resilience Fabric */}
      <section id="featured-insights" className="py-16 md:py-24 bg-[#FAF8F5] border-b border-gray-200">
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
      <section id="insights-case-studies" className="py-16 md:py-24 bg-[#FAF8F5] border-b border-gray-200">
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
      <section id="upcoming-events" className="py-16 md:py-24 bg-[#EBE7DF] border-b border-gray-200">
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

interface IndustriesPageProps {
  onNavigateToCapabilities?: () => void
  targetIndustry?: string | null
  onClearTarget?: () => void
}

function IndustriesPage({
  onNavigateToCapabilities,
  targetIndustry,
  onClearTarget,
}: IndustriesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeModal, setActiveModal] = useState<IndustryItem | null>(null)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  useEffect(() => {
    if (targetIndustry) {
      const match = getIndustryByName(targetIndustry)
      if (match) {
        setActiveModal(match)
        setTimeout(() => {
          const el = document.getElementById('industries-grid')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      }
    }
  }, [targetIndustry])

  const closeModal = () => {
    setActiveModal(null)
    onClearTarget?.()
  }

  const filteredIndustries =
    selectedCategory === 'all'
      ? allIndustriesList
      : allIndustriesList.filter((item) => item.category === selectedCategory)

  return (
    <div className="bg-[#FAF8F5] text-gray-900 min-h-screen">
      {/* 1. Hero Section ("Industries") - True Full-Page (100vh) Viewport */}
      <section className="relative w-full overflow-hidden bg-neutral-950 min-h-[calc(100vh-66px)] h-[calc(100vh-66px)] flex items-center select-none border-b border-white/10">
        {/* Full-bleed background mesh image */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src="/images/ind_hero_mesh.jpg"
            alt="Norstar Industries Convergence"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* High-contrast gradient scrim for optimal readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/70 to-black/40 pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-12 flex flex-col justify-center h-full">
          {/* Breadcrumb Header */}
          <div className="flex items-center space-x-2 text-xs font-medium text-gray-300 mb-6 tracking-wide">
            <a href="#/home" className="hover:text-white transition-colors">Home</a>
            <span className="text-gray-500">/</span>
            <span className="text-[#DE0826] font-bold">Industries</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              Expertise Across <span className="text-[#DE0826]">Industries</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-200/90 leading-relaxed font-normal mb-8 max-w-2xl">
              As industries converge and new industries emerge, we are re-imagining our strategy, solutions, and platforms across 14 global industry domains.
            </p>

            {/* Quick Jump Categories */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'all', label: 'All Industries (14)' },
                { id: 'financial', label: 'Financial & Capital Markets' },
                { id: 'tech', label: 'Communications & Hi-Tech' },
                { id: 'industrial', label: 'Energy & Industrial' },
                { id: 'consumer', label: 'Healthcare, Retail & Services' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedCategory(tab.id)
                    const el = document.getElementById('industries-grid')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`text-xs px-4 py-2.5 rounded font-semibold transition-all cursor-pointer backdrop-blur-xs ${
                    selectedCategory === tab.id
                      ? 'bg-[#DE0826] text-white border border-[#DE0826] shadow-md shadow-red-600/30'
                      : 'bg-black/30 text-gray-200 border border-white/20 hover:border-white hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Center Scroll to Explore Indicator */}
        <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center pointer-events-auto">
          <a
            href="#industries-grid"
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('industries-grid')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex flex-col items-center text-white/60 hover:text-white transition-colors group cursor-pointer"
            aria-label="Scroll to Industries Grid"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-white/50 group-hover:text-white">
              Explore 14 Sectors
            </span>
            <svg
              className="w-4 h-4 animate-bounce text-[#DE0826]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

        {/* Subtle bottom border line */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-white/10 z-20 pointer-events-none" />
      </section>

      {/* 2. 14 Industries Grid (Matching Reference Screenshot) */}
      <section id="industries-grid" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-gray-200">
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
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-2xl w-full rounded-xl shadow-2xl border border-gray-200 overflow-hidden relative animate-scaleUp"
          >
            {/* Modal Header */}
            <div
              className={`bg-gradient-to-r ${activeModal.gradient} text-white p-6 sm:p-8 relative`}
            >
              <button
                onClick={closeModal}
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
                    closeModal()
                    setContactModalOpen(true)
                  }}
                  className="flex-1 bg-[#DE0826] text-white py-3 px-5 rounded font-bold text-xs hover:bg-[#BE001D] transition-colors shadow-sm text-center cursor-pointer border-0"
                >
                  Inquire About {activeModal.name} Solutions
                </button>
                <button
                  onClick={closeModal}
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

interface CapabilitiesPageProps {
  targetCapability?: string | null
  onClearTarget?: () => void
}

function CapabilitiesPage({ targetCapability, onClearTarget }: CapabilitiesPageProps) {
  const [activeModal, setActiveModal] = useState<CapabilityItem | null>(null)

  useEffect(() => {
    if (targetCapability) {
      const match = getCapabilityByName(targetCapability)
      if (match) {
        setActiveModal(match)
        setTimeout(() => {
          const el = document.getElementById('capabilities-grid')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      }
    }
  }, [targetCapability])

  const closeModal = () => {
    setActiveModal(null)
    onClearTarget?.()
  }

  return (
    <div className="bg-[#FAF8F5] text-gray-900 min-h-screen">
      {/* 1. Hero Section ("Our Capabilities") - True Full-Page (100vh) Viewport */}
      <section className="relative w-full overflow-hidden bg-neutral-950 min-h-[calc(100vh-66px)] h-[calc(100vh-66px)] flex items-center select-none border-b border-white/10">
        {/* Full-bleed background mesh image */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src="/images/cap_hero_mesh.jpg"
            alt="Norstar Enterprise Capabilities Architecture"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* High-contrast gradient scrim for optimal readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/70 to-black/40 pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-12 flex flex-col justify-center h-full">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs text-gray-300 mb-6 font-medium tracking-wide">
            <a href="#/home" className="hover:text-white transition-colors">Home</a>
            <span className="text-gray-500">/</span>
            <span className="text-[#DE0826] font-bold">Capabilities</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              Our <span className="text-[#DE0826]">Capabilities</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-200/90 leading-relaxed font-normal mb-8 max-w-2xl">
              Our portfolio of offerings spans competencies, specialisms, and application services that align with our customers' rapidly changing worlds.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#capabilities-grid"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('capabilities-grid')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center space-x-2 bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded transition-all shadow-lg hover:shadow-red-600/30 cursor-pointer"
              >
                <span>Explore Capabilities</span>
                <Icon name="arrow-right" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Center Scroll to Explore Indicator */}
        <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center pointer-events-auto">
          <a
            href="#capabilities-grid"
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('capabilities-grid')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex flex-col items-center text-white/60 hover:text-white transition-colors group cursor-pointer"
            aria-label="Scroll to Capabilities Grid"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-white/50 group-hover:text-white">
              Explore Offerings
            </span>
            <svg
              className="w-4 h-4 animate-bounce text-[#DE0826]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

        {/* Subtle bottom border line */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-white/10 z-20 pointer-events-none" />
      </section>

      {/* 2. 3x3 Capabilities Grid (Matching Reference Screenshot) */}
      <section id="capabilities-grid" className="py-20 md:py-28 bg-[#F5F3ED] border-b border-gray-200">
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
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-red-100"
          >
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
                onClick={closeModal}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
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
                  onClick={closeModal}
                  className="inline-flex items-center space-x-2 bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold px-6 py-3 rounded transition-colors shadow-sm"
                >
                  <span>Connect with a Specialist</span>
                  <Icon name="arrow-right" className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={closeModal}
                  className="text-xs font-semibold text-gray-600 hover:text-black py-2 px-4 cursor-pointer"
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
// (Imported from ./AboutPages with full subpages system)
// -------------------------------------------------------------

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
interface ThinkingCard {
  id: string
  badge: string
  title: string
  image: string
  tall?: boolean
  category: string
  readTime: string
  date: string
  author: {
    name: string
    role: string
  }
  subtitle: string
  summary: string
  paragraphs: string[]
  keyHighlights: {
    title: string
    description: string
  }[]
  metrics: {
    value: string
    label: string
    desc: string
  }[]
  takeaways: string[]
  tags: string[]
}

const thinkingColumns: {
  col1: ThinkingCard[]
  col2: ThinkingCard[]
  col3: ThinkingCard[]
} = {
  col1: [
    {
      id: 'ai-adoption',
      badge: 'ARTICLE | ARTIFICIAL INTELLIGENCE',
      title: 'From AI Adoption to AI Advantage',
      image: '/images/thinking_robot.jpg',
      tall: true,
      category: 'Artificial Intelligence',
      readTime: '6 min read',
      date: 'October 2024',
      author: {
        name: 'Dr. Julian Vance',
        role: 'Global Lead - Cognitive & Agentic Systems',
      },
      subtitle: 'Moving beyond pilot purgatory to build compounding autonomous business value.',
      summary:
        'While 87% of Global 2000 enterprises have deployed initial generative AI pilots, fewer than 14% have achieved measurable enterprise-scale margin expansion. The chasm lies between surface-level workflow automation and foundational architectural advantage.',
      paragraphs: [
        'Most organizations treat artificial intelligence as a tactical productivity plug-in—embedding chatbots into email or summarizers into spreadsheets. However, high-performing enterprises view AI not as a feature layer, but as an autonomous operational fabric that rewires decision loops, supply coordination, and predictive risk underwriting.',
        'To capture true competitive advantage, enterprise architectures must transition from isolated large language models to orchestrated multi-agent reasoning chains. These multi-agent ecosystems operate on deterministic enterprise graphs, ensuring rigorous mathematical guardrails, automated compliance audits, and real-time operational self-correction.',
      ],
      keyHighlights: [
        {
          title: 'Compound Reasoning Architecture',
          description:
            'Shift from single-prompt interactions to asynchronous multi-agent coordination loops with deterministic verification.',
        },
        {
          title: 'Proprietary World Models',
          description:
            'Transform fragmented internal operational logs and supply chains into fine-tuned, sovereign enterprise reasoning engines.',
        },
        {
          title: 'Algorithmic Risk Governance',
          description:
            'Implement sub-millisecond safety guardrails and auditable decision tracing for regulatory compliance.',
        },
      ],
      metrics: [
        { value: '+340%', label: 'Processing Velocity', desc: 'Accelerated complex multi-party underwriting' },
        { value: '62%', label: 'Cycle Time Reduction', desc: 'Slashed operational latency across workflows' },
        { value: '4.8x', label: 'Measured ROI', desc: 'Documented return on engineering capital invested' },
      ],
      takeaways: [
        'Prioritize end-to-end autonomous loops over human-in-the-loop chat interfaces.',
        'Build domain-specific retrieval pipelines anchored in sovereign private datasets.',
        'Deploy active token telemetry to monitor latency, cost, and hallucination bounds.',
      ],
      tags: ['Generative AI', 'Agentic Systems', 'Autonomous Enterprise', 'Digital Strategy'],
    },
    {
      id: 'invisible-ai',
      badge: 'ARTICLE | ARTIFICIAL INTELLIGENCE',
      title: 'Invisible AI: Enabling Frictionless Customer Experiences in Europe',
      image: '/images/thinking_spheres.jpg',
      tall: false,
      category: 'Customer Experience & AI',
      readTime: '5 min read',
      date: 'September 2024',
      author: {
        name: 'Elena Rostova',
        role: 'Managing Director - Digital Experience Europe',
      },
      subtitle: 'How ambient intelligence and zero-UI workflows are redefining omnichannel customer loyalty.',
      summary:
        'The most powerful artificial intelligence is the one the consumer never perceives. Leading European enterprises are abandoning clunky conversational chatbots in favor of predictive, ambient systems that eradicate friction before the user even encounters it.',
      paragraphs: [
        'Across European retail, telecommunications, and financial hubs, customer tolerance for latency and convoluted navigational menus has collapsed. Modern consumer expectations demand instant, context-aware service delivery that anticipates intent seamlessly across devices.',
        'By uniting streaming event telemetry with localized privacy-first machine learning, organizations are creating zero-UI journeys: automated micro-refunds, instantaneous baggage tracking, and dynamic pricing models that adapt in sub-50-millisecond response windows while strictly adhering to the EU AI Act and GDPR directives.',
      ],
      keyHighlights: [
        {
          title: 'Predictive Intent Orchestration',
          description:
            'Detecting subtle behavioral indicators of customer frustration and executing automated resolutions in real time.',
        },
        {
          title: 'Sovereign EU Privacy Compliance',
          description:
            'Engineered from the ground up for strict alignment with EU AI Act risk categories and localized data custody.',
        },
        {
          title: 'Zero-UI Friction Elimination',
          description:
            'Removing form fills and support queues through proactive event streaming and verified biometric authentication.',
        },
      ],
      metrics: [
        { value: '+41 pts', label: 'NPS Enhancement', desc: 'Measured across tier-1 European retail networks' },
        { value: '78%', label: 'First-Contact Autonomy', desc: 'Customer queries resolved without human intervention' },
        { value: '-45%', label: 'Support Ticket Inflow', desc: 'Permanent reduction in repetitive inbound complaints' },
      ],
      takeaways: [
        'Eliminate intrusive conversational widgets; embed intelligence directly into transaction flows.',
        'Establish federated learning clusters to preserve customer data sovereignty across borders.',
        'Unify physical storefront and digital mobile application state into a single customer event broker.',
      ],
      tags: ['Customer Experience', 'Zero-UI', 'EU AI Act', 'Ambient Computing'],
    },
  ],
  col2: [
    {
      id: 'open-banking',
      badge: 'ARTICLE | BANKING AND FINANCIAL SERVICES',
      title: 'Open Banking at an Inflection Point: Why Banks Must Act Now',
      image: '/images/thinking_open_banking.jpg',
      tall: false,
      category: 'Banking & Financial Services',
      readTime: '7 min read',
      date: 'August 2024',
      author: {
        name: 'Marcus Sterling',
        role: 'Practice Head - FinTech & Capital Markets',
      },
      subtitle: 'Capitalizing on PSD3, real-time payments, and embedded finance ecosystems.',
      summary:
        'Open Banking has evolved from a regulatory mandate into the central battleground for institutional liquidity, customer acquisition, and transactional velocity.',
      paragraphs: [
        'Financial institutions that treated PSD2 and Open Banking as mere compliance tick-boxes are now facing margin compression from agile neobanks and non-bank payment rails. The upcoming PSD3 and Open Finance frameworks mandate broader access to insurance, pensions, and commercial credit data.',
        'Forward-looking tier-1 banks are turning their core ledger APIs into commercial platforms—offering embedded lending, instant account-to-account (A2A) settlements, and programmable corporate treasury services that generate recurring software revenue.',
      ],
      keyHighlights: [
        {
          title: 'High-Margin API Monetization',
          description:
            'Transforming standard compliance gateways into enterprise-grade paid developer platforms and treasury integrations.',
        },
        {
          title: 'Real-Time Graph Fraud Detection',
          description:
            'Analyzing billions of cross-institutional payment flows to stop authorized push payment (APP) fraud in sub-second windows.',
        },
        {
          title: 'Embedded B2B Credit Rails',
          description:
            'Injecting instant merchant credit scoring directly into enterprise point-of-sale and procurement software.',
        },
      ],
      metrics: [
        { value: '$1.4B+', label: 'Monthly Payment Volume', desc: 'Handled via Northstar-engineered A2A rails' },
        { value: '< 65ms', label: 'API Response Latency', desc: 'High-throughput core banking microservices' },
        { value: '99.999%', label: 'System Uptime', desc: 'Resilient multi-cloud settlement architecture' },
      ],
      takeaways: [
        'De-risk legacy mainframe modernization by wrapping cores with reactive event streams.',
        'Launch specialized developer hubs with instant sandbox provisioning and SDK libraries.',
        'Partner directly with large enterprise platforms to embed white-label lending at checkout.',
      ],
      tags: ['FinTech', 'Open Banking', 'PSD3', 'Embedded Finance', 'Core Modernization'],
    },
    {
      id: 'security-by-design',
      badge: 'PERSPECTIVE | CYBER SECURITY',
      title: 'Security by Design: A New Model for Trust and Growth',
      image: '/images/thinking_ribbon.jpg',
      tall: false,
      category: 'Cyber Security',
      readTime: '6 min read',
      date: 'October 2024',
      author: {
        name: 'Sarah Jenkins',
        role: 'Chief Information Security Officer & Partner',
      },
      subtitle: 'Transforming cybersecurity from an organizational bottleneck into an operational growth catalyst.',
      summary:
        'In an era of hyper-connected supply chains and automated cyber threat vectors, bolting on security defenses after software deployment is an unacceptable liability. Modern security must be baked into every architectural boundary.',
      paragraphs: [
        'Traditional perimeter-based defense models have collapsed under the weight of distributed remote workforces, hybrid cloud infrastructure, and third-party SaaS dependencies. Today, organizations face automated algorithmic reconnaissance and prompt-injection threats that exploit the slightest configuration oversight.',
        'Security by Design flips the paradigm: by integrating continuous zero-trust attestation, immutable infrastructure pipelines, and automated adversarial red-teaming into developer workflows, enterprises eliminate vulnerabilities before production release while simultaneously accelerating deployment frequency.',
      ],
      keyHighlights: [
        {
          title: 'Zero-Trust Runtime Attestation',
          description:
            'Continuous cryptographic verification of service mesh identities, containers, and data access permissions.',
        },
        {
          title: 'Automated Adversarial AI Testing',
          description:
            'Deploying autonomous synthetic red teams to probe LLM endpoints and APIs for privilege escalation vulnerabilities.',
        },
        {
          title: 'Post-Quantum Cryptographic Migration',
          description:
            'Upgrading fundamental key-exchange protocols and cipher suites to resist emergent quantum decryption threats.',
        },
      ],
      metrics: [
        { value: '-85%', label: 'MTTR Slashed', desc: 'Mean time to detect and remediate perimeter breaches' },
        { value: '100%', label: 'Pipeline Coverage', desc: 'Automated policy-as-code enforcement in CI/CD pipelines' },
        { value: 'Zero', label: 'Production Outages', desc: 'Zero downtime during critical zero-day threat mitigations' },
      ],
      takeaways: [
        'Enforce immutable infrastructure where production servers cannot be modified after deployment.',
        'Shift security testing into IDEs and git pre-commit hooks to catch flaws at the source.',
        'Establish strict cryptographic isolation for model weights and proprietary enterprise data.',
      ],
      tags: ['Cyber Security', 'Zero Trust', 'DevSecOps', 'Quantum Resilience', 'Cloud Governance'],
    },
    {
      id: 'prepaid-growth',
      badge: 'PERSPECTIVE | TELECOM & NETWORKS',
      title: 'Bold Moves in Prepaid: A New Growth Path for Developed Markets',
      image: '/images/thinking_mobile_calling.jpg',
      tall: false,
      category: 'Telecom & Networks',
      readTime: '5 min read',
      date: 'September 2024',
      author: {
        name: 'Tariq Al-Mansoor',
        role: 'Senior Partner - Global Telecommunications',
      },
      subtitle: 'How digital eSIMs, flexible micro-bundles, and AI personalization are revitalizing prepaid revenue.',
      summary:
        'Saturated postpaid markets in North America and Western Europe have reached growth ceilings. Forward-thinking mobile operators are reinventing prepaid as a digital-first, high-margin subscriber engine driven by instant eSIM activation.',
      paragraphs: [
        'For decades, prepaid subscriptions were treated as an afterthought—associated with budget consumers and low margins. However, shifts in consumer behavior toward financial flexibility and digital nomadism have created a massive appetite for premium, contract-free connectivity.',
        'Telcos that deploy 100% digital eSIM provisioning apps allow international travelers and cost-conscious domestic consumers to activate service in under two minutes. Coupled with dynamic micro-bundling and real-time top-up rewards, operators are seeing prepaid average revenue per user (ARPU) approach parity with postpaid tiers.',
      ],
      keyHighlights: [
        {
          title: 'Instant 90-Second eSIM Provisioning',
          description:
            'Eliminating plastic SIM logistics and physical store visits with instant digital credential delivery.',
        },
        {
          title: 'Contextual AI Micro-Bundling',
          description:
            'Dynamically offering streaming passes, gaming boosters, and international roaming packs when users need them most.',
        },
        {
          title: 'Predictive Churn Interception',
          description:
            'Machine learning algorithms forecasting balance exhaustion to deliver tailored renewal incentives.',
        },
      ],
      metrics: [
        { value: '+28%', label: 'ARPU Growth', desc: 'Surge in average revenue per user within 90 days' },
        { value: '92%', label: 'eSIM Self-Activation', desc: 'Customers completed onboarding without call center contact' },
        { value: '-34%', label: 'Subscriber Churn', desc: 'Lower attrition compared to legacy retail SIM cards' },
      ],
      takeaways: [
        'Replace cumbersome in-store identity checks with AI-assisted digital identity verification.',
        'Introduce dynamic credit wallet balances that can be shared across family or IoT devices.',
        'Leverage carrier billing integrations with global streaming and gaming platforms.',
      ],
      tags: ['Telecommunications', '5G & eSIM', 'Customer Retention', 'Digital Channels'],
    },
  ],
  col3: [
    {
      id: 'agentic-ai-energy',
      badge: 'CASE STUDY | ENERGY & UTILITIES',
      title: 'Agentic AI for Oil and Gas Upstream Operations',
      image: '/images/thinking_energy_engineer.jpg',
      tall: false,
      category: 'Energy & Utilities',
      readTime: '8 min read',
      date: 'August 2024',
      author: {
        name: 'David Chen, PE',
        role: 'Principal Consultant - Industrial Automation & Energy',
      },
      subtitle: 'Deploying autonomous sensor networks and agentic predictive maintenance on offshore assets.',
      summary:
        'A global offshore energy operator faced escalating unplanned downtime and maintenance costs across deepwater extraction platforms. Northstar Digital deployed autonomous industrial AI agents capable of monitoring thousands of SCADA telemetry feeds in real time.',
      paragraphs: [
        'Deepwater offshore platforms represent some of the most unforgiving operational environments on earth. A single unexpected compressor failure can result in millions of dollars in lost throughput per day, while severe weather frequently prevents onshore technical personnel from reaching offshore assets.',
        'Northstar engineered an edge-deployed agentic reasoning mesh directly on the platform servers. These autonomous agents continuously evaluate high-frequency acoustic, vibration, and thermal sensor streams against physics-based digital twins, identifying mechanical fatigue 72 hours before catastrophic failures occur.',
      ],
      keyHighlights: [
        {
          title: 'Autonomous Acoustic & Vibration Telemetry',
          description:
            'Edge AI inference models detecting sub-harmonic bearing defects weeks ahead of conventional threshold alarms.',
        },
        {
          title: 'Closed-Loop Choke Optimization',
          description:
            'Automated gas-lift valve modulation that maximizes hydrocarbon recovery while strictly respecting reservoir safety limits.',
        },
        {
          title: 'AR-Enabled Digital Twin Guidance',
          description:
            'Equipping offshore field technicians with augmented reality headsets and interactive spatial schematics.',
        },
      ],
      metrics: [
        { value: '$48M', label: 'Cost Savings', desc: 'Direct savings achieved across deepwater platforms in year one' },
        { value: '99.4%', label: 'Compressor Uptime', desc: 'Near-zero unplanned downtime on high-criticality equipment' },
        { value: '-31%', label: 'Flaring Emissions Slashed', desc: 'Optimized gas recovery significantly reduced greenhouse flaring' },
      ],
      takeaways: [
        'Deploy compute models at the operational edge to guarantee autonomy during satellite connectivity outages.',
        'Foster cross-functional collaboration between legacy OT plant engineers and digital data scientists.',
        'Incorporate deterministic thermodynamic rules into deep learning models to eliminate spurious predictions.',
      ],
      tags: ['Industrial AI', 'Edge Computing', 'Energy & Utilities', 'Digital Twins', 'Predictive Maintenance'],
    },
    {
      id: 'autonomous-enterprise',
      badge: 'REPORT | ARTIFICIAL INTELLIGENCE',
      title: 'Engineering Autonomous Enterprise',
      image: '/images/thinking_cubes.jpg',
      tall: true,
      category: 'Enterprise Strategy & Architecture',
      readTime: '10 min read',
      date: 'October 2024',
      author: {
        name: 'Dr. Julian Vance & Northstar Research',
        role: 'Enterprise Architecture Practice',
      },
      subtitle: 'The comprehensive blueprint for transitioning from software-assisted to fully autonomous enterprise operations.',
      summary:
        'The next era of organizational architecture is defined by autonomous execution loops: systems that self-heal, self-optimize, and execute strategic intent with deterministic precision and zero human latency.',
      paragraphs: [
        'Over the last two decades, enterprise IT was organized around workflow software: humans typed into systems of record (ERP, CRM, SCM), and software recorded the actions. Autonomous enterprise architecture flips this relationship: autonomous software agents execute operational tasks, and human leaders supervise strategic objectives and boundary constraints.',
        'Drawing on comprehensive field implementations across manufacturing, logistics, and capital markets, this flagship Northstar report lays out the core architectural blueprint—covering event meshes, knowledge graphs, deterministic verification layers, and real-time capital routing protocols.',
      ],
      keyHighlights: [
        {
          title: 'The Cognitive Enterprise Fabric',
          description:
            'A federated semantic layer connecting disparate databases into a unified, queryable enterprise state graph.',
        },
        {
          title: 'Autonomous DevOps & SRE Self-Healing',
          description:
            'Agent swarms that monitor logs, pinpoint root causes, generate code fixes, and deploy verified canary updates autonomously.',
        },
        {
          title: 'Algorithmic Capital & Talent Routing',
          description:
            'Real-time allocation of organizational compute, capital, and labor resources based on shifting market opportunities.',
        },
      ],
      metrics: [
        { value: '10x', label: 'Delivery Velocity', desc: 'Accelerated software release cycles across complex core platforms' },
        { value: '74%', label: 'Manual Task Eradication', desc: 'Routine administrative workflows fully automated' },
        { value: '99.98%', label: 'SLA Adherence', desc: 'Uninterrupted performance across mission-critical systems' },
      ],
      takeaways: [
        'Re-architect enterprise applications around asynchronous events rather than synchronous API polls.',
        'Establish a clear hierarchy of agent permissions with cryptographically signed operational scopes.',
        'Invest heavily in semantic data models; agents are only as capable as the enterprise knowledge they navigate.',
      ],
      tags: ['Autonomous Enterprise', 'Knowledge Graphs', 'System Architecture', 'Next-Gen IT'],
    },
  ],
}

const allThinkingCards: ThinkingCard[] = [
  thinkingColumns.col1[0], // From AI Adoption to AI Advantage
  thinkingColumns.col2[0], // Open Banking at an Inflection Point
  thinkingColumns.col3[0], // Agentic AI for Oil and Gas Upstream Operations
  thinkingColumns.col2[1], // Security by Design: A New Model for Trust and Growth
  thinkingColumns.col1[1], // Invisible AI: Enabling Frictionless Customer Experiences
  thinkingColumns.col2[2], // Bold Moves in Prepaid
  thinkingColumns.col3[1], // Engineering Autonomous Enterprise
]

function LatestThinkingSection() {
  const [activeMobileCard, setActiveMobileCard] = useState(0)
  const [selectedCard, setSelectedCard] = useState<ThinkingCard | null>(null)
  const mobileScrollRef = useRef<HTMLDivElement>(null)

  // Keyboard navigation & body scroll lock when modal is open
  useEffect(() => {
    if (!selectedCard) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCard(null)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedCard])

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return
    const { scrollLeft, clientWidth } = mobileScrollRef.current
    const cardWidth = clientWidth * 0.84 + 16
    const index = Math.round(scrollLeft / cardWidth)
    setActiveMobileCard(Math.max(0, Math.min(index, allThinkingCards.length - 1)))
  }

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

        {/* 1. Desktop & Tablet: Asymmetric 3-Column Bento Grid Architecture (md and up) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {/* Column 1: Tall Card (Top) + Landscape Card (Bottom) */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {thinkingColumns.col1.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card)}
                role="button"
                tabIndex={0}
                aria-label={`Expand article: ${card.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedCard(card)
                  }
                }}
                className={`relative overflow-hidden group cursor-pointer bg-neutral-950 shadow-xs hover:shadow-2xl transition-all duration-300 ring-0 hover:ring-2 hover:ring-[#DE0826]/70 rounded-xs select-none ${
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
                  <span className="inline-flex items-center px-2 py-0.5 bg-black/70 backdrop-blur-xs border border-white/20 text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase select-none">
                    {card.badge}
                  </span>
                </div>
                {/* Hover Expand Badge */}
                <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-md text-gray-950 text-[10px] font-bold tracking-wider uppercase rounded-full shadow-lg border border-white/30">
                    <span>Expand</span>
                    <Icon name="arrow-right" className="w-2.5 h-2.5 text-[#DE0826]" />
                  </span>
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-4 sm:p-5 lg:p-6 pointer-events-none">
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-[17px] leading-snug group-hover:text-red-300 transition-colors">
                    {card.title}
                  </h3>
                  <div className="flex items-center text-[11px] sm:text-xs font-semibold text-red-400 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <span>Read Full Insight</span>
                    <Icon name="arrow-right" className="w-3 h-3 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: 3 Landscape Cards Stacked Vertically */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {thinkingColumns.col2.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card)}
                role="button"
                tabIndex={0}
                aria-label={`Expand article: ${card.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedCard(card)
                  }
                }}
                className="relative overflow-hidden group cursor-pointer bg-neutral-950 shadow-xs hover:shadow-2xl transition-all duration-300 ring-0 hover:ring-2 hover:ring-[#DE0826]/70 rounded-xs select-none h-[180px] sm:h-[190px] lg:h-[195px]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 z-20">
                  <span className="inline-flex items-center px-2 py-0.5 bg-black/70 backdrop-blur-xs border border-white/20 text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase select-none">
                    {card.badge}
                  </span>
                </div>
                {/* Hover Expand Badge */}
                <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-md text-gray-950 text-[10px] font-bold tracking-wider uppercase rounded-full shadow-lg border border-white/30">
                    <span>Expand</span>
                    <Icon name="arrow-right" className="w-2.5 h-2.5 text-[#DE0826]" />
                  </span>
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-4 sm:p-5 lg:p-6 pointer-events-none">
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-[17px] leading-snug group-hover:text-red-300 transition-colors">
                    {card.title}
                  </h3>
                  <div className="flex items-center text-[11px] sm:text-xs font-semibold text-red-400 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <span>Read Full Insight</span>
                    <Icon name="arrow-right" className="w-3 h-3 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: Landscape Card (Top) + Tall Card (Bottom) */}
          <div className="flex flex-col gap-5 lg:gap-6 md:col-span-2 lg:col-span-1">
            {thinkingColumns.col3.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card)}
                role="button"
                tabIndex={0}
                aria-label={`Expand article: ${card.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedCard(card)
                  }
                }}
                className={`relative overflow-hidden group cursor-pointer bg-neutral-950 shadow-xs hover:shadow-2xl transition-all duration-300 ring-0 hover:ring-2 hover:ring-[#DE0826]/70 rounded-xs select-none ${
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
                  <span className="inline-flex items-center px-2 py-0.5 bg-black/70 backdrop-blur-xs border border-white/20 text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase select-none">
                    {card.badge}
                  </span>
                </div>
                {/* Hover Expand Badge */}
                <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-md text-gray-950 text-[10px] font-bold tracking-wider uppercase rounded-full shadow-lg border border-white/30">
                    <span>Expand</span>
                    <Icon name="arrow-right" className="w-2.5 h-2.5 text-[#DE0826]" />
                  </span>
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-4 sm:p-5 lg:p-6 pointer-events-none">
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-[17px] leading-snug group-hover:text-red-300 transition-colors">
                    {card.title}
                  </h3>
                  <div className="flex items-center text-[11px] sm:text-xs font-semibold text-red-400 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <span>Read Full Insight</span>
                    <Icon name="arrow-right" className="w-3 h-3 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Mobile View: Horizontal Side-Scrolling Carousel (Only visible on mobile < md) */}
        <div className="block md:hidden">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto gap-4 pb-4 pt-1 -mx-6 px-6 scroll-smooth snap-x snap-mandatory hide-scrollbar"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {allThinkingCards.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card)}
                role="button"
                tabIndex={0}
                aria-label={`Expand article: ${card.title}`}
                className="relative flex-shrink-0 w-[84vw] max-w-[320px] h-[360px] rounded-[2px] overflow-hidden group cursor-pointer bg-neutral-950 shadow-md snap-start"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 z-20">
                  <span className="inline-flex items-center px-2 py-0.5 bg-black/65 backdrop-blur-xs border border-white/20 text-white text-[9px] font-bold tracking-widest uppercase select-none">
                    {card.badge}
                  </span>
                </div>
                <div className="absolute top-3.5 right-3.5 z-20">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/90 text-gray-950 text-[9px] font-bold uppercase rounded-full shadow">
                    <span>Expand</span>
                    <Icon name="arrow-right" className="w-2 h-2 text-[#DE0826]" />
                  </span>
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-5 pointer-events-none">
                  <h3 className="text-white font-bold text-[16px] leading-snug group-hover:text-red-300 transition-colors">
                    {card.title}
                  </h3>
                  <div className="flex items-center text-xs font-semibold text-red-400 mt-2">
                    <span>Tap to open insight</span>
                    <Icon name="arrow-right" className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipe Indicators & Insight Counter */}
          <div className="flex items-center justify-between mt-3 px-1 text-xs text-gray-500">
            <div className="flex items-center space-x-1.5">
              {allThinkingCards.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeMobileCard ? 'w-5 bg-[#DE0826]' : 'w-1.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-medium text-gray-400">
              {activeMobileCard + 1} / {allThinkingCards.length}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Article Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white max-w-4xl w-full max-h-[92vh] rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col relative text-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Banner with Hero Image */}
            <div className="relative h-[220px] sm:h-[280px] lg:h-[310px] w-full flex-shrink-0 bg-neutral-950 overflow-hidden">
              <img
                src={selectedCard.image}
                alt={selectedCard.title}
                className={`w-full h-full object-cover ${
                  selectedCard.tall ? 'object-[center_20%]' : 'object-center'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/35" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                aria-label="Close insight"
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black text-white hover:scale-105 transition-all cursor-pointer border border-white/20 shadow-lg"
              >
                <Icon name="close" className="w-5 h-5" />
              </button>

              {/* Title and date overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 z-20">
                <div className="text-white/80 text-xs font-medium mb-1.5 flex items-center gap-2">
                  <span>{selectedCard.date}</span>
                  <span>•</span>
                  <span>Northstar Strategic Insights</span>
                </div>
                <h2 className="text-white font-extrabold text-xl sm:text-2xl lg:text-[28px] leading-tight font-heading max-w-3xl">
                  {selectedCard.title}
                </h2>
              </div>
            </div>

            {/* Scrollable Content Body (scrollbar hidden for clean UI) */}
            <div className="overflow-y-auto hide-scrollbar p-6 sm:p-8 lg:p-10 space-y-8 flex-1">
              {/* Subtitle / Lead Quote Callout */}
              <div className="p-4 sm:p-5 bg-red-50/60 border-l-4 border-[#DE0826] rounded-r-xl">
                <p className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                  "{selectedCard.subtitle}"
                </p>
                <p className="text-sm text-gray-600 mt-2 font-normal leading-relaxed">
                  {selectedCard.summary}
                </p>
              </div>

              {/* Narrative Deep-Dive */}
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold tracking-wider uppercase text-gray-400 font-heading">
                  Executive Analysis & Strategic Context
                </h3>
                {selectedCard.paragraphs.map((p, idx) => (
                  <p key={`para-${selectedCard.id}-${idx}`} className="text-gray-700 text-sm sm:text-[15px] leading-relaxed font-normal">
                    {p}
                  </p>
                ))}
              </div>

              {/* Key Metrics Grid */}
              <div>
                <h3 className="text-xs font-extrabold tracking-wider uppercase text-gray-400 mb-3 font-heading">
                  Measurable Impact & Transformation Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedCard.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="bg-white border border-red-100 rounded-xl p-4 sm:p-5 shadow-xs hover:border-red-300 transition-colors"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-[#DE0826] font-heading tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-900 mt-1">
                        {metric.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 leading-normal">
                        {metric.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Insights Pillars */}
              <div>
                <h3 className="text-xs font-extrabold tracking-wider uppercase text-gray-400 mb-3 font-heading">
                  Core Strategic Pillars
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedCard.keyHighlights.map((hl, idx) => (
                    <div key={hl.title} className="bg-gray-50/80 border border-gray-200/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
                      <div>
                        <span className="inline-block text-[11px] font-extrabold text-[#DE0826] uppercase tracking-wider mb-1.5">
                          Pillar 0{idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-gray-950 mb-2 leading-snug">
                          {hl.title}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {hl.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Executive Takeaways */}
              <div className="bg-neutral-950 text-white rounded-xl p-6 sm:p-7">
                <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-4 font-heading flex items-center gap-2">
                  <Icon name="check" className="w-4 h-4 text-[#DE0826]" />
                  Actionable Executive Recommendations
                </h3>
                <div className="space-y-3">
                  {selectedCard.takeaways.map((takeaway, idx) => (
                    <div key={`takeaway-${selectedCard.id}-${idx}`} className="flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-white/10 text-red-400 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                        {takeaway}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics / Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-semibold text-gray-400 mr-2">Topics:</span>
                {selectedCard.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-full transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Sticky Footer with Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3 flex-shrink-0">
              <button
                onClick={() => setSelectedCard(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold rounded-lg cursor-pointer border-0 transition-colors"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => setSelectedCard(null)}
                className="px-4 py-2 bg-[#DE0826] hover:bg-[#b5061e] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-xs inline-flex items-center space-x-1.5"
              >
                <span>Discuss with Specialist</span>
                <Icon name="arrow-right" className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
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
                Marcus Chen
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
                alt="Marcus Chen"
                className="w-14 h-14 rounded-full object-cover object-top border border-[#DE0826]"
              />
              <div>
                <h4 className="font-bold text-white text-sm">Marcus Chen</h4>
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
    quoteAuthor: 'Marcus Chen, Chief Technology & AI Officer',
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

const extendedWhatsNew = [...whatsNewItems, ...whatsNewItems, ...whatsNewItems]

function WhatsNewSection() {
  const baseCount = whatsNewItems.length
  const [currentIndex, setCurrentIndex] = useState(baseCount)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [selectedItem, setSelectedItem] = useState<WhatsNewItem | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const isAnimatingRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  const handleTransitionEnd = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    isAnimatingRef.current = false
    setCurrentIndex((curr) => {
      if (curr >= 2 * baseCount) {
        setIsTransitioning(false)
        return curr - baseCount
      }
      if (curr < baseCount) {
        setIsTransitioning(false)
        return curr + baseCount
      }
      return curr
    })
  }, [baseCount])

  useEffect(() => {
    if (!isTransitioning) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true)
        })
        return () => cancelAnimationFrame(raf2)
      })
      return () => cancelAnimationFrame(raf1)
    }
  }, [isTransitioning])

  const next = useCallback(() => {
    if (isAnimatingRef.current || !isTransitioning) return
    isAnimatingRef.current = true
    setCurrentIndex((prev) => prev + 1)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      handleTransitionEnd()
    }, 650)
  }, [isTransitioning, handleTransitionEnd])

  const prev = useCallback(() => {
    if (isAnimatingRef.current || !isTransitioning) return
    isAnimatingRef.current = true
    setCurrentIndex((prev) => prev - 1)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      handleTransitionEnd()
    }, 650)
  }, [isTransitioning, handleTransitionEnd])

  // Automatic slide rotation every 5 seconds in one continuous forward flow, paused on hover or modal open
  useEffect(() => {
    if (isHovered || selectedItem !== null) return
    const timer = setInterval(() => {
      next()
    }, 5000)
    return () => clearInterval(timer)
  }, [isHovered, selectedItem, next])

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
        <div
          className="overflow-hidden -mx-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              transition: isTransitioning
                ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)'
                : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedWhatsNew.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
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
interface HomeCapabilityItem {
  title: string
  image: string
}

const homeCapabilitiesList: HomeCapabilityItem[] = [
  {
    title: 'Artificial Intelligence',
    image: '/images/cap_ribbon_ai.jpg',
  },
  {
    title: 'Cloud & Infrastructure Services',
    image: '/images/cap_ribbon_cloud.jpg',
  },
  {
    title: 'Digital Enterprise Applications',
    image: '/images/cap_ribbon_digital.jpg',
  },
  {
    title: 'Business Process Services',
    image: '/images/cap_ribbon_bps.jpg',
  },
  {
    title: 'Engineering Services',
    image: '/images/cap_ribbon_eng.jpg',
  },
  {
    title: 'TechM Consulting',
    image: '/images/cap_ribbon_consulting.jpg',
  },
  {
    title: 'Experience Services',
    image: '/images/cap_ribbon_exp.jpg',
  },
  {
    title: 'Network Services',
    image: '/images/cap_ribbon_net.jpg',
  },
]

function CapabilitiesOverviewSection({ onExploreMore }: { onExploreMore: () => void }) {
  const [activeCapability, setActiveCapability] = useState(0)
  const current = homeCapabilitiesList[activeCapability]

  return (
    <section id="capabilities" className="py-20 md:py-28 bg-[#5F0229] text-white">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Title & Clean Typography List */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-8 sm:mb-10 font-outfit">
              Capabilities
            </h2>

            <div className="space-y-3.5 sm:space-y-4">
              {homeCapabilitiesList.map((cap, idx) => {
                const isActive = activeCapability === idx
                return (
                  <div
                    key={cap.title}
                    onMouseEnter={() => setActiveCapability(idx)}
                    onClick={() => setActiveCapability(idx)}
                    className={`cursor-pointer transition-all duration-200 select-none py-1 flex items-center group ${
                      isActive
                        ? 'text-white font-bold pl-3.5 border-l-[3px] border-[#DE0826]'
                        : 'text-white/60 hover:text-white font-medium pl-3.5 border-l-[3px] border-transparent'
                    }`}
                  >
                    <span className="text-lg sm:text-xl md:text-[22px] tracking-tight transition-transform duration-200 group-hover:translate-x-1">
                      {cap.title}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 sm:mt-12">
              <button
                onClick={onExploreMore}
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-5 py-2.5 rounded transition-all shadow-md group"
              >
                <span>Explore All Capabilities</span>
                <Icon name="arrow-right" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Subtitle Text & Square Artwork Showcase */}
          <div className="lg:col-span-6 lg:pt-2 flex flex-col items-start">
            <p className="text-white/85 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-xl font-normal">
              We bring the solutions and platforms that actually move the needle. Better customer experiences. Real business outcomes. Transformation that happens at the pace your business demands.
            </p>

            {/* Square/Rectangular Artwork (Matching reference screenshot exactly: NO circle) */}
            <div
              onClick={onExploreMore}
              className="relative w-full max-w-[420px] aspect-square overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65)] border border-white/15 bg-black/30 cursor-pointer group"
              title={`Explore ${current.title}`}
            >
              <img
                key={current.image}
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover animate-fadeIn transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 10. "Expertise Across Industries" (Reference-Matched Infinite Carousel)
// -------------------------------------------------------------
interface IndustryCarouselCard {
  id: string
  title: string
  iconType: string
}

const industriesCarouselData: IndustryCarouselCard[] = [
  { id: 'insurance', title: 'INSURANCE', iconType: 'insurance' },
  { id: 'manufacturing', title: 'MANUFACTURING', iconType: 'manufacturing' },
  { id: 'media', title: 'MEDIA & ENTERTAINMENT', iconType: 'media' },
  { id: 'oil-gas', title: 'OIL & GAS', iconType: 'oil-gas' },
  { id: 'private-equity', title: 'PRIVATE EQUITY', iconType: 'private-equity' },
  { id: 'banking', title: 'BANKING & FINANCIAL', iconType: 'banking' },
  { id: 'telecom', title: 'TELECOMMUNICATIONS', iconType: 'telecom' },
  { id: 'healthcare', title: 'HEALTHCARE & LIFE SCIENCES', iconType: 'healthcare' },
  { id: 'retail', title: 'RETAIL & CONSUMER GOODS', iconType: 'retail' },
  { id: 'automotive', title: 'AUTOMOTIVE & MOBILITY', iconType: 'automotive' },
  { id: 'logistics', title: 'TRAVEL & LOGISTICS', iconType: 'logistics' },
  { id: 'energy', title: 'ENERGY & UTILITIES', iconType: 'energy' },
  { id: 'hi-tech', title: 'HI-TECH & SOFTWARE', iconType: 'hi-tech' },
  { id: 'public-sector', title: 'PUBLIC SECTOR', iconType: 'public-sector' },
]

function IndustryLineIcon({ type }: { type: string }) {
  switch (type) {
    case 'insurance':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          <path
            d="M10 12V28C10 40 18 48 28 51C38 48 46 40 46 28V12H10Z"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 18V28C16 37 21.5 43.5 28 46C34.5 43.5 40 37 40 28V18H16Z"
            fill="url(#industry-red-hatch)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'manufacturing':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          {/* Two tapering towers on left */}
          <path d="M12 36L14 18H18L20 36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 36L24 18H28L30 36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Slanted roof building on right filled with red hatch */}
          <path d="M30 26L46 14V36H30V26Z" fill="url(#industry-red-hatch)" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Base building */}
          <rect x="8" y="36" width="40" height="12" strokeWidth="1.75" />
          {/* Door on right */}
          <rect x="40" y="40" width="4" height="8" strokeWidth="1.5" fill="white" />
        </svg>
      )
    case 'media':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          {/* Screen outline open at bottom */}
          <path d="M18 40H8V14H48V40H38" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          {/* Upright triangle play shape filled with red hatch */}
          <polygon points="28,24 20,40 36,40" fill="url(#industry-red-hatch)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    case 'oil-gas':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          {/* Ground line */}
          <line x1="6" y1="46" x2="44" y2="46" strokeWidth="1.75" strokeLinecap="round" />
          {/* Silo tank with curved top filled with red hatch */}
          <path d="M14 46V16C14 12 18 10 24 10C30 10 34 12 34 16V46H14Z" fill="url(#industry-red-hatch)" strokeWidth="1.75" strokeLinejoin="round" />
          {/* Horizontal ring line on tank */}
          <line x1="14" y1="18" x2="34" y2="18" strokeWidth="1.5" />
          {/* Pipeline to the right */}
          <path d="M34 20H42V36H38" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'private-equity':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          {/* 3 ascending bar chart columns with 3D tops */}
          <path d="M10 44V34L14 30L18 34V44H10Z" fill="url(#industry-red-hatch)" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="14" y1="30" x2="14" y2="44" strokeWidth="1.25" />
          <path d="M20 44V26L24 22L28 26V44H20Z" fill="url(#industry-red-hatch)" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="24" y1="22" x2="24" y2="44" strokeWidth="1.25" />
          <path d="M30 44V18L34 14L38 18V44H30Z" fill="url(#industry-red-hatch)" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="34" y1="14" x2="34" y2="44" strokeWidth="1.25" />
          {/* Trendline with arrow */}
          <path d="M8 22L16 16L24 20L34 10M34 10H27M34 10V17" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'banking':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          <path d="M8 20L28 8L48 20H8Z" fill="url(#industry-red-hatch)" strokeWidth="1.75" strokeLinejoin="round" />
          <line x1="6" y1="20" x2="50" y2="20" strokeWidth="1.75" />
          <line x1="13" y1="20" x2="13" y2="38" strokeWidth="2" />
          <line x1="23" y1="20" x2="23" y2="38" strokeWidth="2" />
          <line x1="33" y1="20" x2="33" y2="38" strokeWidth="2" />
          <line x1="43" y1="20" x2="43" y2="38" strokeWidth="2" />
          <rect x="6" y="38" width="44" height="6" strokeWidth="1.75" />
          <line x1="4" y1="44" x2="52" y2="44" strokeWidth="1.75" />
        </svg>
      )
    case 'telecom':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          <path d="M28 10V46M20 46L28 14L36 46" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="28" cy="10" r="3" fill="url(#industry-red-hatch)" strokeWidth="1.5" />
          <path d="M18 18C14 22 14 30 18 34" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M38 18C42 22 42 30 38 34" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 12C6 20 6 36 12 42" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M44 12C50 20 50 36 44 42" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'healthcare':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          <path
            d="M22 10H34V20H44V32H34V42H22V32H12V20H22V10Z"
            fill="url(#industry-red-hatch)"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M10 46H18L23 38L29 52L34 42L39 46H46"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'retail':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          <path
            d="M12 18L16 46H40L44 18H12Z"
            fill="url(#industry-red-hatch)"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M20 20V12C20 7.5 23.5 4 28 4C32.5 4 36 7.5 36 12V20"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'automotive':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          <path
            d="M8 34L14 22H34L44 30H50C51 30 52 31 52 33V38H6V34Z"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 22L20 30H34L32 22H16Z"
            fill="url(#industry-red-hatch)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="40" r="4.5" strokeWidth="1.75" fill="white" />
          <circle cx="42" cy="40" r="4.5" strokeWidth="1.75" fill="white" />
        </svg>
      )
    case 'logistics':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          <path
            d="M28 8L32 22L48 27L46 32L32 28L30 40L36 44L34 48L28 46L22 48L20 44L26 40L24 28L10 32L8 27L24 22L28 8Z"
            fill="url(#industry-red-hatch)"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'energy':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          <path d="M28 24V48M24 48H32" strokeWidth="1.75" strokeLinecap="round" />
          <path
            d="M28 24L18 12C20 10 24 12 28 24ZM28 24L38 18C40 20 38 24 28 24ZM28 24L30 36C28 38 26 36 28 24Z"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <polygon
            points="42,12 34,24 40,24 36,36 48,20 40,20"
            fill="url(#industry-red-hatch)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'hi-tech':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          <rect x="16" y="16" width="24" height="24" rx="2" fill="url(#industry-red-hatch)" strokeWidth="1.75" />
          <rect x="22" y="22" width="12" height="12" strokeWidth="1.5" fill="white" />
          <line x1="20" y1="10" x2="20" y2="16" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="28" y1="10" x2="28" y2="16" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="36" y1="10" x2="36" y2="16" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="40" x2="20" y2="46" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="28" y1="40" x2="28" y2="46" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="36" y1="40" x2="36" y2="46" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10" y1="20" x2="16" y2="20" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10" y1="28" x2="16" y2="28" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10" y1="36" x2="16" y2="36" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="40" y1="20" x2="46" y2="20" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="40" y1="28" x2="46" y2="28" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="40" y1="36" x2="46" y2="36" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'public-sector':
      return (
        <svg viewBox="0 0 56 56" className="w-11 h-11 stroke-[#111827]" fill="none">
          <path d="M28 10C20 10 16 16 16 22H40C40 16 36 10 28 10Z" fill="url(#industry-red-hatch)" strokeWidth="1.75" />
          <line x1="28" y1="6" x2="28" y2="10" strokeWidth="1.75" />
          <rect x="12" y="22" width="32" height="4" strokeWidth="1.5" />
          <line x1="18" y1="26" x2="18" y2="38" strokeWidth="2" />
          <line x1="24" y1="26" x2="24" y2="38" strokeWidth="2" />
          <line x1="32" y1="26" x2="32" y2="38" strokeWidth="2" />
          <line x1="38" y1="26" x2="38" y2="38" strokeWidth="2" />
          <rect x="10" y="38" width="36" height="5" strokeWidth="1.75" />
          <line x1="6" y1="43" x2="50" y2="43" strokeWidth="1.75" />
        </svg>
      )
    default:
      return null
  }
}

function IndustriesSection({ onExploreMore }: { onExploreMore?: () => void }) {
  // Triple items list for infinite seamless wrap
  const extendedIndustries = [
    ...industriesCarouselData,
    ...industriesCarouselData,
    ...industriesCarouselData,
  ]

  const [currentIndex, setCurrentIndex] = useState(industriesCarouselData.length)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [itemsPerView, setItemsPerView] = useState(5)

  // Dynamically adapt cards visible per viewport
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return
      if (window.innerWidth < 640) setItemsPerView(1.25)
      else if (window.innerWidth < 768) setItemsPerView(2)
      else if (window.innerWidth < 1024) setItemsPerView(3)
      else if (window.innerWidth < 1280) setItemsPerView(4)
      else setItemsPerView(5)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-advance sliding smoothly from right to left every 2.8s when not hovered
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setCurrentIndex((prev) => prev + 1)
    }, 2800)
    return () => clearInterval(interval)
  }, [isHovered])

  // Seamless reset on boundary transition end (infinite marquee effect)
  const handleTransitionEnd = () => {
    if (currentIndex >= industriesCarouselData.length * 2) {
      setIsTransitioning(false)
      setCurrentIndex(currentIndex - industriesCarouselData.length)
    } else if (currentIndex < industriesCarouselData.length) {
      setIsTransitioning(false)
      setCurrentIndex(currentIndex + industriesCarouselData.length)
    }
  }

  const next = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }

  const prev = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }

  return (
    <section id="industries" className="py-20 md:py-28 bg-pinstripes border-b border-neutral-200 overflow-hidden relative">
      {/* Global Pattern Definition for Red Diagonal Hatching */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <pattern
            id="industry-red-hatch"
            width="6"
            height="6"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke="#DE0826" strokeWidth="1.25" />
          </pattern>
        </defs>
      </svg>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header with Left Text and Top-Right Pill Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 font-outfit">
              Expertise Across Industries
            </h2>
            <p className="text-gray-700 text-sm sm:text-base mt-3 max-w-2xl font-normal leading-relaxed">
              Our expertise spans 14 industries, including banking, insurance, telecommunications, media, entertainment, distribution, and retail.
            </p>
          </div>

          {/* Top-Right Capsule/Pill Arrow Controls matching reference screenshot */}
          <div className="flex items-center space-x-2.5 mt-6 md:mt-0">
            <button
              onClick={prev}
              aria-label="Previous Industry"
              className="w-11 h-8 rounded-full bg-[#181818] hover:bg-[#DE0826] flex items-center justify-center text-white transition-colors duration-200 shadow-sm cursor-pointer"
            >
              <Icon name="arrow-right" className="w-3.5 h-3.5 rotate-180" />
            </button>
            <button
              onClick={next}
              aria-label="Next Industry"
              className="w-11 h-8 rounded-full bg-[#181818] hover:bg-[#DE0826] flex items-center justify-center text-white transition-colors duration-200 shadow-sm cursor-pointer"
            >
              <Icon name="arrow-right" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Carousel Container with Overflow Clipping */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex -mx-2 sm:-mx-2.5 will-change-transform"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              transition: isTransitioning
                ? 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)'
                : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedIndustries.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex-shrink-0 px-2 sm:px-2.5"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div
                  onClick={onExploreMore}
                  className="group relative bg-white rounded-[2px] p-6 sm:p-7 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full min-h-[300px] sm:min-h-[320px] flex flex-col justify-between cursor-pointer select-none overflow-hidden"
                >
                  {/* Subtle 45-degree faint red lines at bottom-right corner */}
                  <svg
                    className="absolute bottom-0 right-0 w-36 h-28 pointer-events-none overflow-hidden"
                    viewBox="0 0 144 112"
                    fill="none"
                  >
                    <path
                      d="M0 112L144 40M16 112L144 48M32 112L144 56M48 112L144 64M64 112L144 72M80 112L144 80M96 112L144 88M112 112L144 96M128 112L144 104"
                      stroke="#DE0826"
                      strokeOpacity="0.22"
                      strokeWidth="1"
                    />
                  </svg>

                  {/* Top: Icon with red diagonal hatch lines */}
                  <div className="relative z-10">
                    <IndustryLineIcon type={item.iconType} />
                  </div>

                  {/* Middle: Uppercase bold title matching reference */}
                  <div className="relative z-10 my-6">
                    <h3 className="text-[13px] sm:text-[14px] font-bold tracking-wider uppercase text-gray-950 font-outfit leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Bottom: Hover Button Reveal (Circle smoothly expands into a generous red pill with text) */}
                  <div className="relative z-10 flex items-center justify-start">
                    <div className="h-9 w-9 group-hover:w-36 sm:group-hover:w-[150px] rounded-full bg-[#DE0826] text-white flex items-center justify-center group-hover:justify-between px-2.5 group-hover:px-4 transition-all duration-300 ease-out overflow-hidden shadow-xs cursor-pointer">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[85px] overflow-hidden transition-all duration-300 font-outfit leading-none">
                        Explore
                      </span>
                      <Icon
                        name="arrow-right"
                        className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                      />
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
interface SuccessStory {
  id: number
  slug: string
  client: string
  category: string
  title: string
  desc: string
  subtitle: string
  timeline: string
  location: string
  scope: string
  challenge: string
  challengePoints: string[]
  solution: string
  solutionPillars: {
    title: string
    desc: string
  }[]
  implementationRoadmap: {
    phase: string
    title: string
    detail: string
  }[]
  metrics: {
    value: string
    label: string
    desc: string
  }[]
  keyOutcomes: string[]
  quote: string
  quoteAuthor: string
  quoteRole?: string
  tags: string[]
  isVideo?: boolean
  image: string
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    slug: 'att-field-ops',
    client: 'AT&T',
    category: 'Telecommunications',
    title: 'How AT&T and Norstar Transformed Field Operations with AI',
    desc: 'Empowered 25,000+ field technicians with real-time AI guidance, reducing repeat truck rolls by 28%.',
    subtitle: 'Empowering 25,000+ field technicians with real-time AI guidance and diagnostic copilots.',
    timeline: '14-Month Enterprise Rollout',
    location: 'United States Nationwide',
    scope: 'Field Service Automation, Multimodal AI & Computer Vision',
    challenge:
      'With a dispersed national workforce managing millions of complex fiber optic and wireless installations, AT&T faced rising operational dispatch costs, inconsistent first-time resolution rates, and lengthy knowledge transfer cycles for junior field technicians.',
    challengePoints: [
      'High repeat dispatch rates (28% repeat truck rolls) costing millions annually in redundant fleet miles.',
      'Offline field environments (basements, remote towers) preventing reliance on standard cloud-hosted knowledge portals.',
      'Disparate legacy wiring schematics and legacy copper-fiber splice documentation across 50 regional operating units.',
    ],
    solution:
      'Northstar Digital architected a multimodal edge AI copilot running on technician tablets. Leveraging computer vision, real-time spatial schematics, and retrieval-augmented historical repair logs, the system provides step-by-step diagnostic verification and AR-guided fiber splicing assistance even in offline basement environments.',
    solutionPillars: [
      {
        title: 'Edge Computer Vision Diagnostic Suite',
        desc: 'Trained localized deep vision models capable of identifying fiber splice misalignments, bent optical cables, and improper port patchings through tablet cameras in under 2 seconds.',
      },
      {
        title: 'Offline-First Hybrid RAG Knowledge Engine',
        desc: 'Synchronized 40 years of engineering documentation and wiring schematics into a compressed on-device vector database that functions smoothly even in subterranean basements with zero cellular coverage.',
      },
      {
        title: 'Voice-First Hands-Free Guidance Interface',
        desc: 'Implemented hands-free acoustic voice assistants allowing technicians wearing protective gear to query schematics and dictate inspection checklists without touching their devices.',
      },
    ],
    implementationRoadmap: [
      {
        phase: 'Phase 01',
        title: 'Field Discovery & Model Training',
        detail: 'Curated 1.2M historical dispatch records and 85,000 photographic splice examples to train domain-specific vision and text copilots.',
      },
      {
        phase: 'Phase 02',
        title: 'Pilot in 4 Regional Hubs',
        detail: 'Deployed prototype tablets with 1,500 technicians in Dallas, Atlanta, Chicago, and Phoenix, achieving a 22% initial fix-rate lift.',
      },
      {
        phase: 'Phase 03',
        title: 'Nationwide 25,000+ Technician Scale',
        detail: 'Completed nationwide rollout integrated with enterprise dispatch dispatchers, SAP ERP, and inventory management.',
      },
    ],
    metrics: [
      { value: '-28%', label: 'Truck Rolls Reduced', desc: 'Eliminated unnecessary repeat field dispatches across regions' },
      { value: '25,000+', label: 'Technicians Onboarded', desc: 'Active daily users navigating fiber and 5G field installations' },
      { value: '94%', label: 'First-Time Fix Rate', desc: 'All-time company record across broadband & commercial nodes' },
      { value: '$140M', label: 'Annual Operational Savings', desc: 'Saved in vehicle fuel, fleet maintenance, and repeat labor hours' },
    ],
    keyOutcomes: [
      'Equipped field workforce with voice-activated hands-free diagnostic copilots.',
      'Reduced average time per service call from 84 minutes to 51 minutes.',
      'Saved an estimated $140M annually in repeat vehicle dispatch and labor expenses.',
      'Accelerated junior technician onboarding curve from 9 months down to 10 weeks.',
    ],
    quote:
      '"The AI copilot developed with Northstar has become the single most valued tool in our field force\'s toolkit. It turns every technician into our top 1% veteran engineer."',
    quoteAuthor: 'SVP, Network Field Engineering, AT&T',
    quoteRole: 'AT&T Network & Field Engineering Operations',
    tags: ['Telecommunications', 'Field Service AI', 'Computer Vision', 'Offline RAG', 'Edge Computing', 'Operational Efficiency'],
    isVideo: true,
    image: '/images/case_consult.jpg',
  },
  {
    id: 2,
    slug: 'norstar-racing',
    client: 'Norstar Racing',
    category: 'Formula E Racing',
    title: 'Accelerating Norstar Racing with Real-Time AI Analytics',
    desc: 'Sub-second sensor streaming and telemetry optimization providing competitive edge on international circuits.',
    subtitle: 'Sub-second telemetry streaming and predictive powertrain optimization for international motorsport.',
    timeline: '8-Month Rapid Deployment',
    location: 'Global FIA Circuits (16 Cities)',
    scope: 'Edge Computing, Real-Time Telemetry & Predictive AI',
    challenge:
      'In electric single-seater motorsport, race strategy is decided in fractions of a second. The team needed to ingest millions of high-frequency CAN bus telemetry metrics per lap—battery thermal dynamics, tire graining, regenerative braking recovery—and provide deterministic tactical advice to the pit wall.',
    challengePoints: [
      'High latency (>800ms) over legacy RF links caused blind spots during critical pit strategy windows.',
      'Complex battery thermal degradation profiles required non-linear multi-variable physics modeling.',
      'Zero room for compute failure: trackside hardware must endure extreme temperatures, RF interference, and rapid circuit tear-downs.',
    ],
    solution:
      'Northstar engineered an ultra-low latency edge compute telemetry broker deployed directly in the race garage. Powered by neural differential equations and real-time probabilistic simulations, the platform models 10,000 synthetic race scenarios every lap to recommend precise battery state-of-charge targets and overtake mode timing.',
    solutionPillars: [
      {
        title: 'Sub-Millisecond Trackside Telemetry Mesh',
        desc: 'Engineered a dual-redundant 5G-private and high-gain Wi-Fi 6E telemetry bridge between moving vehicles and pit lane edge compute, dropping latency from 800ms to under 45ms with zero packet loss.',
      },
      {
        title: 'Physics-Informed Neural Battery Twin',
        desc: 'Developed hybrid physics-informed neural network (PINN) models simulating battery electrochemical kinetics and thermal dissipation, predicting pack temperature 4 laps in advance with 99.4% accuracy.',
      },
      {
        title: 'Autonomous Pitwall Strategy Copilot',
        desc: 'Built an interactive engineer console that models 10,000 simulated race trajectories per lap, dynamically alerting engineers when to switch driver maps, deploy Attack Mode, and maximize regenerative capture.',
      },
    ],
    implementationRoadmap: [
      {
        phase: 'Phase 01',
        title: 'Telemetry Audit & Pipeline Harmonization',
        detail: 'Benchmarked 200+ sensor channels across dyno test rigs and wind tunnels, establishing standardized binary serialization protocols.',
      },
      {
        phase: 'Phase 02',
        title: 'Edge Hardware & AI Twin Deployment',
        detail: 'Fabricated ruggedized trackside edge server racks and containerized neural battery models tested across pre-season Valencia trials.',
      },
      {
        phase: 'Phase 03',
        title: 'Live Championship Race Integration',
        detail: 'Deployed real-time pitwall copilot across 16 global E-Prix rounds with instantaneous continuous learning post-session.',
      },
    ],
    metrics: [
      { value: '+0.42s', label: 'Lap Pace Advantage', desc: 'Measured pace gain over race stints under active competition' },
      { value: '12,000', label: 'Data Points / Sec', desc: 'Ingested and analyzed in real time per single-seater vehicle' },
      { value: '100%', label: 'Thermal Safety', desc: 'Zero battery derating events across the entire championship season' },
      { value: '< 45ms', label: 'Telemetry Latency', desc: 'Sub-second response loop between track sensors and pit wall' },
    ],
    keyOutcomes: [
      'Engineered sub-50ms live telemetry pipeline between trackside edge and remote simulation factory.',
      'Automated regenerative braking energy recovery strategies adapting dynamically to weather and safety cars.',
      'Delivered 3 podium finishes and a championship contention through algorithmic pit-stop timing.',
      'Streamlined post-race telemetry analysis turnaround from 6 hours to less than 15 minutes.',
    ],
    quote:
      '"Racing in Formula E is an engineering war of energy management. Northstar\'s predictive AI platform gives our drivers and race engineers an unfair tactical edge on every lap."',
    quoteAuthor: 'Team Principal & Technical Director, Norstar Racing',
    quoteRole: 'Norstar Racing Technical Department',
    tags: ['Motorsport Tech', 'Real-Time Telemetry', 'Edge Computing', 'Battery Optimization', 'Neural Models', 'Kubernetes'],
    isVideo: false,
    image: '/images/home_racing.jpg',
  },
  {
    id: 3,
    slug: 'global-retail-giant',
    client: 'Global Retail Giant',
    category: 'Retail & Omnichannel',
    title: 'Modernizing Supply Chain with Generative AI and Autonomous Fulfillment',
    desc: 'Boosted order accuracy by 40% while slashing inventory holding costs across 1,200 stores.',
    subtitle: 'Transforming distributed logistics with AI-driven demand forecasting and robotic warehouse orchestration.',
    timeline: '12-Month Enterprise Rollout',
    location: 'Europe & North America (1,200 Stores)',
    scope: 'Supply Chain Mesh, Demand Forecasting & Automated Replenishment',
    challenge:
      'Operating over 1,200 hypermarket stores and 45 distribution centers across 8 countries, the retailer struggled with stockouts on high-demand perishables, excessive safety stock buffers, and disjointed cross-docking schedules during peak holiday surges.',
    challengePoints: [
      'Fragmented inventory data across 12 legacy ERP instances created 3-day visibility delays.',
      'Excessive safety stock buffers tied up hundreds of millions in idle working capital.',
      'Frequent perishable stock-outs eroded customer loyalty and incurred high disposal waste penalties.',
    ],
    solution:
      'Northstar built a unified Autonomous Supply Mesh combining transformer-based hyper-local demand forecasting with dynamic automated routing algorithms. The platform dynamically recalculates delivery routes, balances distribution center inventory, and auto-generates purchase orders based on real-time foot traffic and weather data.',
    solutionPillars: [
      {
        title: 'Hyper-Local Transformer Demand Forecasting',
        desc: 'Trained hierarchical transformer neural networks processing 400+ demand covariates, including hyperlocal weather forecasts, holiday calendars, road closures, and social trends.',
      },
      {
        title: 'Autonomous Multi-Echelon Replenishment',
        desc: 'Automated procurement purchase orders across 45 distribution centers directly to supplier APIs, dynamically rebalancing safety stock based on supplier lead times.',
      },
      {
        title: 'Robotic Cross-Docking Orchestration',
        desc: 'Integrated automated guided vehicles (AGVs) and warehouse management systems to shrink dock-to-stock turnaround from 18 hours to 4 hours.',
      },
    ],
    implementationRoadmap: [
      {
        phase: 'Phase 01',
        title: 'Data Lakehouse & Schema Unification',
        detail: 'Integrated 12 disparate ERP systems into an enterprise Apache Iceberg data mesh on cloud with real-time CDC.',
      },
      {
        phase: 'Phase 02',
        title: 'Demand AI Calibration & Pilot Hubs',
        detail: 'Calibrated forecasting algorithms across 3 pilot distribution centers supplying 80 retail hypermarkets.',
      },
      {
        phase: 'Phase 03',
        title: 'Automated Procurement Network Scale',
        detail: 'Scaled autonomous replenishment across all 1,200 stores and 45 logistics nodes with full supplier API integrations.',
      },
    ],
    metrics: [
      { value: '+40%', label: 'Order Accuracy', desc: 'Surge in fulfillment precision across all regional distribution hubs' },
      { value: '-28%', label: 'Holding Costs Slashed', desc: 'Substantial working capital released back to retail operations' },
      { value: '99.2%', label: 'On-Shelf Availability', desc: 'Near-zero out-of-stock incidents on essential grocery lines' },
      { value: '$65M', label: 'Waste Spoilage Saved', desc: 'Annual reduction in perishables spoilage across distribution hubs' },
    ],
    keyOutcomes: [
      'Replaced manual weekly forecasting spreadsheets with autonomous multi-echelon replenishment.',
      'Reduced average warehouse dock-to-stock turnaround time from 18 hours to 4 hours.',
      'Eliminated over $65M in annual perishable inventory spoilage and landfill fees.',
      'Achieved 99.2% on-shelf product availability during peak Black Friday and holiday surges.',
    ],
    quote:
      '"Northstar connected our fragmented warehouses into a single intelligent ecosystem. We eliminated stockouts while holding significantly less safety inventory."',
    quoteAuthor: 'Chief Supply Chain Officer, Global Retail Giant',
    quoteRole: 'Global Supply Chain & Logistics Operations',
    tags: ['Retail Supply Chain', 'Autonomous Fulfillment', 'Demand Forecasting', 'Warehouse Logistics', 'Cloud Mesh'],
    isVideo: false,
    image: '/images/case_port.jpg',
  },
  {
    id: 4,
    slug: 'european-telecom',
    client: 'Top European Telecom',
    category: 'Cloud Core & 5G',
    title: 'Achieving 40% Operational Cost Optimization with Cloud Core Migration',
    desc: 'Modernized core switching network to hybrid cloud infrastructure for 18 million active subscribers.',
    subtitle: 'De-risking legacy telco switching cores through carrier-grade cloud-native 5G architecture.',
    timeline: '18-Month Zero-Downtime Migration',
    location: 'Pan-European (Germany, Austria, Switzerland)',
    scope: 'Cloud-Native 5G Core, Telco Cloud, Kubernetes CNFs',
    challenge:
      'Managing 18 million active mobile subscribers across three nations, the telecom operator was constrained by expensive proprietary hardware appliances, inflexible vendor lock-in, and multi-day maintenance windows required for basic network slice updates.',
    challengePoints: [
      'Rigid legacy hardware appliances incurring escalating annual maintenance and energy costs.',
      'Multi-month lead times (180+ days) to launch custom 5G private network slices for industrial customers.',
      'High risk of catastrophic downtime during legacy subscriber core migration.',
    ],
    solution:
      'Northstar Digital orchestrated a phased zero-downtime migration of the operator\'s core packet network into a carrier-grade hybrid cloud environment. Leveraging containerized network functions (CNFs), GitOps infrastructure-as-code, and automated canary routing, the new core scales dynamically with traffic demand.',
    solutionPillars: [
      {
        title: 'Carrier-Grade Kubernetes CNF Architecture',
        desc: 'Containerized critical telco user plane (UPF) and control plane functions on distributed Kubernetes clusters with SR-IOV and DPDK kernel bypass for line-rate packet throughput.',
      },
      {
        title: 'Zero-Downtime Canary Traffic Handover',
        desc: 'Developed intelligent algorithmic BGP route steering that migrated 18 million subscribers in batches of 50,000 during live hours with continuous automated SLA telemetry.',
      },
      {
        title: 'Automated GitOps & Dynamic Slicing Platform',
        desc: 'Automated 5G network slicing orchestration via declarative GitOps pipelines, slashing enterprise private slice deployment times from 6 months to under 48 hours.',
      },
    ],
    implementationRoadmap: [
      {
        phase: 'Phase 01',
        title: 'Target Architecture & Cloud Infrastructure Prep',
        detail: 'Staged carrier-grade hybrid cloud nodes with hardware security modules (HSM) and automated test suites.',
      },
      {
        phase: 'Phase 02',
        title: 'Dual-Stack Shadow Traffic Verification',
        detail: 'Mirrored live production telco traffic through containerized CNFs for 90 days to validate jitter, latency, and failover.',
      },
      {
        phase: 'Phase 03',
        title: 'Canary Migration of 18M Subscribers',
        detail: 'Migrated 18 million active subscribers across three nations with zero network outages and seamless billing parity.',
      },
    ],
    metrics: [
      { value: '40%', label: 'OpEx Optimization', desc: 'Annual operational infrastructure savings post cloud migration' },
      { value: '18M', label: 'Subscribers Migrated', desc: 'Zero downtime during nationwide subscriber traffic handover' },
      { value: '< 15ms', label: '5G Core Latency', desc: 'Low-latency user plane packet routing across cell sites' },
      { value: '48 Hrs', label: 'Service Turnaround', desc: 'Enterprise 5G slice provisioning down from 6 months' },
    ],
    keyOutcomes: [
      'Transitioned legacy monolithic network functions to resilient cloud-native microservices.',
      'Accelerated new enterprise 5G private network deployment times from 6 months to 48 hours.',
      'Attained 99.999% carrier-grade availability with automated multi-zone failover.',
      'Reduced datacenter energy footprint and power consumption by 55%.',
    ],
    quote:
      '"Migrating an active core telecom network serving 18 million users is like changing jet engines mid-flight. Northstar executed it flawlessly with zero subscriber disruptions."',
    quoteAuthor: 'Chief Technology & Network Officer, Top European Telecom',
    quoteRole: 'European Telco Network Architecture & Technology Division',
    tags: ['5G Core', 'Cloud Migration', 'Kubernetes CNFs', 'Carrier-Grade Infrastructure', 'GitOps'],
    isVideo: false,
    image: '/images/case_ribbon.jpg',
  },
]

const extendedSuccessStories = [...successStories, ...successStories, ...successStories]

interface SuccessStoriesSectionProps {
  onOpenCaseStudy?: (slug: string) => void
}

function SuccessStoriesSection({ onOpenCaseStudy }: SuccessStoriesSectionProps = {}) {
  const baseCount = successStories.length
  const [currentIndex, setCurrentIndex] = useState(baseCount)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [isHovered, setIsHovered] = useState(false)

  const isAnimatingRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
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

  const handleTransitionEnd = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    isAnimatingRef.current = false
    setCurrentIndex((curr) => {
      if (curr >= 2 * baseCount) {
        setIsTransitioning(false)
        return curr - baseCount
      }
      if (curr < baseCount) {
        setIsTransitioning(false)
        return curr + baseCount
      }
      return curr
    })
  }, [baseCount])

  useEffect(() => {
    if (!isTransitioning) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true)
        })
        return () => cancelAnimationFrame(raf2)
      })
      return () => cancelAnimationFrame(raf1)
    }
  }, [isTransitioning])

  const next = useCallback(() => {
    if (isAnimatingRef.current || !isTransitioning) return
    isAnimatingRef.current = true
    setCurrentIndex((prev) => prev + 1)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      handleTransitionEnd()
    }, 650)
  }, [isTransitioning, handleTransitionEnd])

  const prev = useCallback(() => {
    if (isAnimatingRef.current || !isTransitioning) return
    isAnimatingRef.current = true
    setCurrentIndex((prev) => prev - 1)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      handleTransitionEnd()
    }, 650)
  }, [isTransitioning, handleTransitionEnd])

  // Automatic slide rotation every 5 seconds, paused on hover
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      next()
    }, 5000)
    return () => clearInterval(timer)
  }, [isHovered, next])

  return (
    <section id="success-stories" className="py-20 md:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950 font-heading">
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
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#DE0826] hover:text-[#DE0826] bg-white flex items-center justify-center text-gray-700 transition-colors shadow-xs cursor-pointer"
            >
              <Icon name="chevron-left" className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next Story"
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#DE0826] hover:text-[#DE0826] bg-white flex items-center justify-center text-gray-700 transition-colors shadow-xs cursor-pointer"
            >
              <Icon name="chevron-right" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div
            className="flex -mx-3"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              transition: isTransitioning
                ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)'
                : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSuccessStories.map((story, idx) => (
              <div
                key={`${story.id}-${idx}`}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div
                  onClick={() => {
                    if (onOpenCaseStudy) {
                      onOpenCaseStudy(story.slug)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open full case study for ${story.client}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      if (onOpenCaseStudy) {
                        onOpenCaseStudy(story.slug)
                      }
                    }
                  }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#DE0826] hover:shadow-xl transition-all duration-200 h-full flex flex-col justify-between group cursor-pointer select-none"
                >
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

                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#DE0826] transition-colors leading-snug mb-3 font-heading">
                        {story.title}
                      </h3>

                      <p className="text-gray-600 text-xs leading-relaxed">
                        {story.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-800 group-hover:text-[#DE0826]">
                    <span>View Full Case Study</span>
                    <Icon name="arrow-right" className="w-3.5 h-3.5 text-[#DE0826] group-hover:translate-x-1 transition-transform" />
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
// Full-Page Enterprise Case Study View
// -------------------------------------------------------------
interface CaseStudyPageProps {
  storySlug: string
  onBack: () => void
  onSelectStory: (slug: string) => void
  onNavigateToContact: () => void
}

const pipelineData: Record<string, { label: string; detail: string }[]> = {
  'att-field-ops': [
    { label: 'Field Video & Optical Feeds', detail: 'Real-time 60fps high-res capture from technician tablets' },
    { label: 'Edge Computer Vision Classifier', detail: 'Sub-2s microscopic fiber splice fault detection' },
    { label: 'Offline Vector RAG Engine', detail: '40 years of wiring schematics in on-device SQLite vector DB' },
    { label: 'Technician Voice Copilot', detail: 'Hands-free acoustic guidance with 94% first-time fix rate' },
  ],
  'norstar-racing': [
    { label: '12,000 CAN Bus Points / Sec', detail: 'High-frequency telemetry streaming per single-seater car' },
    { label: 'Trackside Garage 5G Broker', detail: 'Dual-redundant telemetry edge with sub-50ms roundtrip' },
    { label: 'Neural ODE Battery Simulator', detail: '10,000 simulated race scenarios executed per lap' },
    { label: 'Pitwall Tactical HUD', detail: 'Deterministic Attack Mode & energy recovery recommendations' },
  ],
  'global-retail-giant': [
    { label: 'Hyperlocal Demand Signals', detail: 'Real-time POS, foot-traffic, weather & calendar covariates' },
    { label: 'Transformer Forecasting Mesh', detail: 'Multi-echelon dynamic safety stock recalculation' },
    { label: 'Autonomous Supplier APIs', detail: 'Direct PO auto-dispatch to 45 regional logistics centers' },
    { label: 'Robotic Cross-Docking AGVs', detail: 'Warehouse dock-to-stock turnaround compressed to 4 hours' },
  ],
  'european-telecom': [
    { label: '18M Active Mobile Subscribers', detail: 'Carrier-grade nationwide traffic routing with zero downtime' },
    { label: 'Kubernetes Telco CNF Core', detail: 'Containerized UPF/SMF functions with DPDK kernel bypass' },
    { label: 'GitOps Infrastructure as Code', detail: 'Automated canary traffic migration in 50k user batches' },
    { label: 'Automated 5G Slicing Hub', detail: 'Private network slice provisioning shrunk from 6mo to 48h' },
  ],
}

function CaseStudyPage({
  storySlug,
  onBack,
  onSelectStory,
  onNavigateToContact,
}: CaseStudyPageProps) {
  const [copied, setCopied] = useState(false)
  const story =
    successStories.find((s) => s.slug === storySlug) ||
    successStories.find((s) => s.slug === 'norstar-racing') ||
    successStories[0]
  const otherStories = successStories.filter((s) => s.id !== story.id)

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const pipeline = pipelineData[story.slug] || pipelineData['norstar-racing']

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-gray-900 selection:bg-[#DE0826] selection:text-white">
      {/* 1. Sticky Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-xs font-bold text-gray-700 hover:text-[#DE0826] bg-gray-100 hover:bg-red-50 px-3.5 py-2 rounded-lg transition-colors border border-gray-200 cursor-pointer"
            >
              <div className="rotate-180">
                <Icon name="arrow-right" className="w-3.5 h-3.5 text-[#DE0826]" />
              </div>
              <span>Back to All Success Stories</span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="hidden md:inline-flex items-center space-x-1.5 text-xs font-bold text-gray-700 hover:text-[#DE0826] bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-lg transition-colors border border-gray-200 cursor-pointer"
            >
              <Icon name="external" className="w-3.5 h-3.5 text-[#DE0826]" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="hidden md:inline-flex items-center space-x-1.5 text-xs font-bold text-gray-700 hover:text-[#DE0826] bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-lg transition-colors border border-gray-200 cursor-pointer"
            >
              <Icon name="chart" className="w-3.5 h-3.5 text-[#DE0826]" />
              <span>PDF</span>
            </button>
            <button
              onClick={onNavigateToContact}
              className="inline-flex items-center space-x-1.5 bg-[#DE0826] hover:bg-[#b5061e] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-xs cursor-pointer border-0"
            >
              <span>Discuss Your Project</span>
              <Icon name="arrow-right" className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hero Section: Dark Cinematic Presentation */}
      <section className="relative bg-[#0B0F19] text-white py-16 md:py-24 border-b border-white/10 overflow-hidden">
        {/* Geometric Background Grid Accent */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cs-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cs-grid)" />
          </svg>
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#DE0826]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          {/* Headline & Subtitle */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight max-w-4xl font-heading">
            {story.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed mb-10 font-normal">
            {story.subtitle}
          </p>

          {/* Metadata Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 px-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mb-10 max-w-4xl">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                Industry
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white mt-0.5 block">
                {story.category}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                Deployment Timeline
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white mt-0.5 block">
                {story.timeline}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                Geography
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white mt-0.5 block">
                {story.location}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                Delivery Scope
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white mt-0.5 block truncate" title={story.scope}>
                {story.scope}
              </span>
            </div>
          </div>

          {/* Cinematic Hero Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-900 aspect-[16/8] sm:aspect-[21/9] max-h-[520px]">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-black/30" />
          </div>
        </div>
      </section>

      {/* 3. Transformation Metrics Strip */}
      <section className="bg-white py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {story.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 hover:border-[#DE0826] transition-all duration-200 shadow-xs hover:shadow-md"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#DE0826] tracking-tight font-heading">
                  {metric.value}
                </div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-gray-900 mt-2.5">
                  {metric.label}
                </div>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Executive Overview & Project Snapshot (Balanced 2-Column Section) */}
      <section className="py-16 bg-[#FAF8F5] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Executive Premise */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl border-l-4 border-[#DE0826] border-y border-r border-gray-200 shadow-sm flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight font-heading mb-4">
                Executive Overview
              </h2>
              <p className="text-base sm:text-lg font-bold text-gray-950 leading-relaxed mb-4">
                {story.subtitle}
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                {story.desc} Co-innovating closely with {story.client}, Northstar Digital designed and engineered an end-to-end resilient architecture tailored to high-scale mission-critical operations, unlocking measurable ROI, dramatic latency reduction, and sustained performance gains.
              </p>
            </div>

            {/* Right: Project Snapshot Card */}
            <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-950 pb-3 border-b border-gray-100 font-heading mb-4">
                  Project Snapshot
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 block font-medium mb-0.5">Client Organization</span>
                    <span className="text-gray-900 font-bold text-sm">{story.client}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium mb-0.5">Industry Sector</span>
                    <span className="text-gray-900 font-bold text-sm">{story.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium mb-0.5">Delivery Timeline</span>
                    <span className="text-gray-800 font-medium text-xs sm:text-sm">{story.timeline}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium mb-0.5">Deployment Region</span>
                    <span className="text-gray-800 font-medium text-xs sm:text-sm">{story.location}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400 block font-medium mb-0.5">Engagement Scope</span>
                    <span className="text-gray-800 font-medium text-xs sm:text-sm">{story.scope}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <span className="text-gray-500 text-xs block font-bold mb-2">
                  Core Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {story.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[11px] font-semibold rounded-md"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Strategic Challenge (Balanced Full-Width Layout) */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight font-heading mb-4">
                The Strategic Challenge
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
                {story.challenge}
              </p>
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 leading-relaxed">
                <span className="font-bold text-gray-900 block mb-1">Operational Imperative</span>
                Legacy architectures could no longer sustain high-scale concurrency demands. A ground-up paradigm shift was required to meet mission-critical SLAs.
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3.5">
              {story.challengePoints.map((point, pIdx) => (
                <div key={pIdx} className="flex items-start space-x-4 p-5 bg-red-50/50 rounded-xl border border-red-100">
                  <span className="w-6 h-6 rounded-full bg-[#DE0826]/15 text-[#DE0826] flex items-center justify-center flex-shrink-0 text-xs font-black mt-0.5">
                    !
                  </span>
                  <div>
                    <span className="text-sm sm:text-base text-gray-900 leading-relaxed font-semibold block">
                      Constraint 0{pIdx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-700 leading-relaxed mt-1 block">
                      {point}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Architectural Blueprint & 3-Column Solution Grid */}
      <section className="py-16 md:py-24 bg-[#FAF8F5] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight font-heading mb-4">
              Architectural Blueprint & Northstar Solution
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {story.solution}
            </p>
          </div>

          {/* 3 Full-Width Solution Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {story.solutionPillars.map((pillar, pilIdx) => (
              <div
                key={pilIdx}
                className="p-7 rounded-2xl bg-white border border-gray-200 hover:border-[#DE0826] hover:shadow-xl transition-all duration-200 flex flex-col justify-between shadow-xs group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#DE0826] text-white flex items-center justify-center text-sm font-black font-heading mb-5 group-hover:scale-105 transition-transform">
                    0{pilIdx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-950 mb-3 group-hover:text-[#DE0826] transition-colors leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-bold text-[#DE0826]">
                  <span>Pillar Capability Verified</span>
                  <Icon name="check" className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            ))}
          </div>

          {/* High-Tech End-to-End Pipeline Data Flow Visualizer */}
          <div className="bg-[#0B0F19] rounded-2xl p-6 sm:p-8 text-white border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  End-to-End System Architecture Dataflow
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Sub-millisecond data loop deployed in production for {story.client}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-800/60">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">Live Production Pipeline</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pipeline.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 relative"
                >
                  <div className="text-[10px] font-mono text-[#DE0826] font-bold mb-1.5">
                    STAGE 0{sIdx + 1}
                  </div>
                  <div className="text-sm font-bold text-white mb-1.5">
                    {step.label}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Phased Implementation Roadmap (Full-Width 3-Column Milestone Flow) */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight font-heading mb-3">
              Phased Implementation Roadmap
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              A disciplined execution methodology de-risked rollout and accelerated delivery of measurable milestones:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {story.implementationRoadmap.map((item, rIdx) => (
              <div
                key={rIdx}
                className="p-7 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 relative overflow-hidden flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-[#DE0826] tracking-wider uppercase bg-red-50 px-3 py-1 rounded-md border border-red-100">
                      Phase 0{rIdx + 1}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">Milestone Complete</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-950 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Delivered Enterprise Outcomes (Full-Width 2x2 Outcome Grid) */}
      <section className="py-16 md:py-24 bg-[#0B0F19] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading mb-3">
              Delivered Enterprise Outcomes
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              Validated operational impact achieved across {story.client}'s global operations:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {story.keyOutcomes.map((outcome, oIdx) => (
              <div
                key={oIdx}
                className="flex items-start space-x-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#DE0826]/60 transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-[#DE0826] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                  ✓
                </span>
                <span className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
                  {outcome}
                </span>
              </div>
            ))}
          </div>

          {/* Full-Width Executive Testimonial Quote */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-white/15 rounded-3xl relative overflow-hidden">
            <div className="text-[#DE0826]/15 text-9xl font-serif absolute -bottom-10 right-8 select-none pointer-events-none">
              “
            </div>
            <p className="text-lg sm:text-xl md:text-2xl italic font-normal text-white leading-relaxed mb-8 relative z-10 max-w-4xl">
              {story.quote}
            </p>
            <div className="relative z-10 flex items-center space-x-4 border-t border-white/10 pt-6">
              <div className="w-12 h-12 rounded-full bg-[#DE0826] text-white flex items-center justify-center font-bold text-base shadow-lg">
                {story.client.charAt(0)}
              </div>
              <div>
                <div className="text-base font-bold text-white">{story.quoteAuthor}</div>
                <div className="text-xs text-gray-400 mt-0.5">{story.quoteRole || story.client}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Full-Width Action & Consultation Banner */}
      <section className="py-16 bg-gradient-to-r from-neutral-900 via-[#0B0F19] to-neutral-900 text-white border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading mb-4">
            Accelerate Your Enterprise Transformation
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8">
            Connect with our {story.category} practice leadership to evaluate how this architecture can be tailored to your enterprise roadmap.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateToContact}
              className="px-8 py-3.5 bg-[#DE0826] hover:bg-[#b5061e] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center space-x-2 cursor-pointer border-0"
            >
              <span>Schedule Solution Briefing</span>
              <Icon name="arrow-right" className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20 flex items-center space-x-2 cursor-pointer"
            >
              <Icon name="chart" className="w-3.5 h-3.5" />
              <span>Download PDF Summary</span>
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20 flex items-center space-x-2 cursor-pointer"
            >
              <Icon name="external" className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share Case Study'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 10. Explore More Success Stories Grid */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 font-heading">
              Explore More Success Stories
            </h2>
            <button
              onClick={onBack}
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold text-[#DE0826] hover:underline cursor-pointer bg-transparent border-0"
            >
              <span>View All Stories</span>
              <Icon name="arrow-right" className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherStories.map((other) => (
              <div
                key={other.slug}
                onClick={() => {
                  onSelectStory(other.slug)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelectStory(other.slug)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#DE0826] hover:shadow-xl transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={other.image}
                      alt={other.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#DE0826] transition-colors leading-snug mb-2 line-clamp-2 font-heading">
                      {other.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {other.desc}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-800 group-hover:text-[#DE0826]">
                  <span>Read Full Case Study</span>
                  <Icon name="arrow-right" className="w-3.5 h-3.5 text-[#DE0826] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
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
  const parseHash = () => {
    const hash = window.location.hash
    if (hash.includes('case-study')) {
      const parts = hash.split('/')
      const slug = parts[2]?.replace(/[?#].*$/, '') || 'norstar-racing'
      return { route: 'case-study' as PageRoute, subpage: 'overview' as AboutSubpage, caseStudySlug: slug }
    }
    if (hash.includes('contact')) return { route: 'contact' as PageRoute, subpage: 'overview' as AboutSubpage, caseStudySlug: 'norstar-racing' }
    if (hash.includes('careers')) {
      const parts = hash.split('/')
      const item = parts[2] ? decodeURIComponent(parts[2].replace(/[?#].*$/, '')) : undefined
      return { route: 'careers' as PageRoute, subpage: 'overview' as AboutSubpage, caseStudySlug: 'norstar-racing', targetCareer: item }
    }
    if (hash.includes('insights')) {
      const parts = hash.split('/')
      const item = parts[2] ? decodeURIComponent(parts[2].replace(/[?#].*$/, '')) : undefined
      return { route: 'insights' as PageRoute, subpage: 'overview' as AboutSubpage, caseStudySlug: 'norstar-racing', targetInsight: item }
    }
    if (hash.includes('industries')) {
      const parts = hash.split('/')
      const item = parts[2] ? decodeURIComponent(parts[2].replace(/[?#].*$/, '')) : undefined
      return { route: 'industries' as PageRoute, subpage: 'overview' as AboutSubpage, caseStudySlug: 'norstar-racing', targetIndustry: item }
    }
    if (hash.includes('capabilities')) {
      const parts = hash.split('/')
      const item = parts[2] ? decodeURIComponent(parts[2].replace(/[?#].*$/, '')) : undefined
      return { route: 'capabilities' as PageRoute, subpage: 'overview' as AboutSubpage, caseStudySlug: 'norstar-racing', targetCapability: item }
    }
    if (hash.includes('about')) {
      const parts = hash.split('/')
      const sub = parts[2]?.replace(/[?#].*$/, '') as AboutSubpage
      const validSubpages: AboutSubpage[] = [
        'overview',
        'leadership',
        'brand',
        'sustainability',
        'recognition',
        'customer-speak',
        'partners',
        'portfolio',
        'citizenship',
        'centricity',
        'news',
        'investors',
      ]
      if (validSubpages.includes(sub)) {
        return { route: 'about' as PageRoute, subpage: sub, caseStudySlug: 'norstar-racing' }
      }
      return { route: 'about' as PageRoute, subpage: 'overview' as AboutSubpage, caseStudySlug: 'norstar-racing' }
    }
    return { route: 'home' as PageRoute, subpage: 'overview' as AboutSubpage, caseStudySlug: 'norstar-racing' }
  }

  const [route, setRoute] = useState<PageRoute>(() => parseHash().route)
  const [aboutSubpage, setAboutSubpage] = useState<AboutSubpage>(() => parseHash().subpage)
  const [selectedCaseStudySlug, setSelectedCaseStudySlug] = useState<string>(() => parseHash().caseStudySlug)
  const [targetCapability, setTargetCapability] = useState<string | null>(() => parseHash().targetCapability || null)
  const [targetIndustry, setTargetIndustry] = useState<string | null>(() => parseHash().targetIndustry || null)
  const [targetInsight, setTargetInsight] = useState<string | null>(() => parseHash().targetInsight || null)
  const [targetCareer, setTargetCareer] = useState<string | null>(() => parseHash().targetCareer || null)

  useEffect(() => {
    const handleHash = () => {
      const { route: newRoute, subpage: newSubpage, caseStudySlug, targetCapability: tc, targetIndustry: ti, targetInsight: tin, targetCareer: tcar } = parseHash()
      setRoute(newRoute)
      setAboutSubpage(newSubpage)
      if (caseStudySlug) {
        setSelectedCaseStudySlug(caseStudySlug)
      }
      if (tc !== undefined) setTargetCapability(tc || null)
      if (ti !== undefined) setTargetIndustry(ti || null)
      if (tin !== undefined) setTargetInsight(tin || null)
      if (tcar !== undefined) setTargetCareer(tcar || null)
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handleOpenCaseStudy = (slug: string) => {
    setSelectedCaseStudySlug(slug)
    setRoute('case-study')
    window.location.hash = `#/case-study/${slug}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRouteChange = (newRoute: PageRoute, subpage?: AboutSubpage, targetItem?: string) => {
    setRoute(newRoute)
    if (newRoute === 'case-study') {
      window.location.hash = `#/case-study/${selectedCaseStudySlug || 'norstar-racing'}`
    } else if (newRoute === 'about') {
      const targetSub = subpage || 'overview'
      setAboutSubpage(targetSub)
      window.location.hash = `#/about/${targetSub}`
    } else if (newRoute === 'contact') {
      window.location.hash = '#/contact'
    } else if (newRoute === 'careers') {
      setTargetCareer(null)
      if (targetItem) {
        setTimeout(() => setTargetCareer(targetItem), 10)
        window.location.hash = `#/careers/${encodeURIComponent(targetItem)}`
      } else {
        window.location.hash = '#/careers'
      }
    } else if (newRoute === 'insights') {
      setTargetInsight(null)
      if (targetItem) {
        setTimeout(() => setTargetInsight(targetItem), 10)
        window.location.hash = `#/insights/${encodeURIComponent(targetItem)}`
      } else {
        window.location.hash = '#/insights'
      }
    } else if (newRoute === 'industries') {
      setTargetIndustry(null)
      if (targetItem) {
        setTimeout(() => setTargetIndustry(targetItem), 10)
        window.location.hash = `#/industries/${encodeURIComponent(targetItem)}`
      } else {
        window.location.hash = '#/industries'
      }
    } else if (newRoute === 'capabilities') {
      setTargetCapability(null)
      if (targetItem) {
        setTimeout(() => setTargetCapability(targetItem), 10)
        window.location.hash = `#/capabilities/${encodeURIComponent(targetItem)}`
      } else {
        window.location.hash = '#/capabilities'
      }
    } else {
      window.location.hash = '#/home'
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 antialiased selection:bg-[#DE0826] selection:text-white">
      {/* Primary Navigation Bar with Page Toggle */}
      <Navbar
        currentRoute={route}
        activeAboutSubpage={aboutSubpage}
        onRouteChange={handleRouteChange}
      />

      {/* Main Content Area: Home, About Us, Capabilities, or Case Study */}
      <main className="flex-grow">
        {route === 'case-study' ? (
          <CaseStudyPage
            storySlug={selectedCaseStudySlug}
            onBack={() => {
              handleRouteChange('home')
              setTimeout(() => {
                const el = document.getElementById('success-stories')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }}
            onSelectStory={handleOpenCaseStudy}
            onNavigateToContact={() => handleRouteChange('contact')}
          />
        ) : route === 'contact' ? (
          <ContactPage />
        ) : route === 'careers' ? (
          <CareersPage
            targetCareer={targetCareer}
            onClearTarget={() => setTargetCareer(null)}
          />
        ) : route === 'insights' ? (
          <InsightsPage
            targetInsight={targetInsight}
            onClearTarget={() => setTargetInsight(null)}
          />
        ) : route === 'industries' ? (
          <IndustriesPage
            onNavigateToCapabilities={() => handleRouteChange('capabilities')}
            targetIndustry={targetIndustry}
            onClearTarget={() => setTargetIndustry(null)}
          />
        ) : route === 'capabilities' ? (
          <CapabilitiesPage
            targetCapability={targetCapability}
            onClearTarget={() => setTargetCapability(null)}
          />
        ) : route === 'about' ? (
          <AboutUsPage
            activeSubpage={aboutSubpage}
            onSelectSubpage={(sub) => handleRouteChange('about', sub)}
            onNavigateRoute={handleRouteChange}
          />
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
            <SuccessStoriesSection onOpenCaseStudy={handleOpenCaseStudy} />

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
