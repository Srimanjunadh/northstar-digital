import { useEffect, useState } from 'react'

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
// 1. Utility Top Bar (Crisp White & Red Theme)
// -------------------------------------------------------------
function UtilityBar() {
  return (
    <div className="bg-[#F8F9FA] text-gray-700 text-[11px] tracking-wide border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-9 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="font-bold text-gray-900 tracking-wider text-[11px] flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-sm bg-[#DE0826]" />
            <span>NORSTAR</span>
          </span>
          <div className="hidden sm:flex items-center space-x-4 text-gray-500">
            <a href="#investors" className="hover:text-[#DE0826] transition-colors">
              Investors
            </a>
            <span className="text-gray-300">|</span>
            <a href="#media" className="hover:text-[#DE0826] transition-colors">
              Media
            </a>
            <span className="text-gray-300">|</span>
            <a href="#sustainability" className="hover:text-[#DE0826] transition-colors">
              Sustainability
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-1.5 text-gray-600 hover:text-[#DE0826] transition-colors">
            <Icon name="globe" className="w-3.5 h-3.5 text-[#DE0826]" />
            <span>Global | EN</span>
          </button>
          <a
            href="#contact"
            className="text-gray-600 hover:text-[#DE0826] transition-colors font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// 2. Main Navigation Header (Clean White & Red)
// -------------------------------------------------------------
interface NavbarProps {
  currentRoute: PageRoute
  onRouteChange: (route: PageRoute) => void
}

function Navbar({ currentRoute, onRouteChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-gray-900 border-b border-gray-100'
          : 'bg-white py-4 text-gray-900 border-b border-gray-100'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo in Red & Black */}
        <button
          onClick={() => onRouteChange('home')}
          className="flex items-center space-x-3 group cursor-pointer border-0 bg-transparent text-left"
        >
          <div className="w-8 h-8 bg-[#DE0826] rounded flex items-center justify-center p-1.5 shadow-sm group-hover:bg-[#BE001D] transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-xl leading-none text-gray-950 font-heading">
              Nor<span className="text-[#DE0826]">star</span>
            </span>
            <span className="text-[9px] tracking-widest text-gray-400 font-semibold uppercase">
              Digital
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-[13px] font-semibold tracking-wide text-gray-800">
          <button
            onClick={() => onRouteChange('about')}
            className={`relative py-2 transition-colors cursor-pointer border-0 bg-transparent ${
              currentRoute === 'about'
                ? 'text-[#DE0826] font-bold'
                : 'text-gray-800 hover:text-[#DE0826]'
            }`}
          >
            About Us
            {currentRoute === 'about' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DE0826]" />
            )}
          </button>

          <button
            onClick={() => onRouteChange('capabilities')}
            className={`relative py-2 transition-colors cursor-pointer border-0 bg-transparent ${
              currentRoute === 'capabilities'
                ? 'text-[#DE0826] font-bold'
                : 'text-gray-800 hover:text-[#DE0826]'
            }`}
          >
            Capabilities
            {currentRoute === 'capabilities' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DE0826]" />
            )}
          </button>

          <button
            onClick={() => onRouteChange('industries')}
            className={`relative py-2 transition-colors cursor-pointer border-0 bg-transparent ${
              currentRoute === 'industries'
                ? 'text-[#DE0826] font-bold'
                : 'text-gray-800 hover:text-[#DE0826]'
            }`}
          >
            Industries
            {currentRoute === 'industries' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DE0826]" />
            )}
          </button>

          <button
            onClick={() => onRouteChange('insights')}
            className={`relative py-2 transition-colors cursor-pointer border-0 bg-transparent ${
              currentRoute === 'insights'
                ? 'text-[#DE0826] font-bold'
                : 'text-gray-800 hover:text-[#DE0826]'
            }`}
          >
            Insights
            {currentRoute === 'insights' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DE0826]" />
            )}
          </button>

          <button
            onClick={() => onRouteChange('careers')}
            className={`relative py-2 transition-colors cursor-pointer border-0 bg-transparent ${
              currentRoute === 'careers'
                ? 'text-[#DE0826] font-bold'
                : 'text-gray-800 hover:text-[#DE0826]'
            }`}
          >
            Careers
            {currentRoute === 'careers' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DE0826]" />
            )}
          </button>

          <button
            onClick={() => onRouteChange('contact')}
            className={`relative py-2 transition-colors cursor-pointer border-0 bg-transparent ${
              currentRoute === 'contact'
                ? 'text-[#DE0826] font-bold'
                : 'text-gray-800 hover:text-[#DE0826]'
            }`}
          >
            Contact Us
            {currentRoute === 'contact' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DE0826]" />
            )}
          </button>
        </nav>

        {/* Actions in White & Red */}
        <div className="flex items-center space-x-5">
          <button
            aria-label="Search"
            className="p-2 text-gray-600 hover:text-[#DE0826] transition-colors"
          >
            <Icon name="search" className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRouteChange('contact')}
            className="hidden sm:inline-flex items-center space-x-2 bg-[#DE0826] text-white text-[12px] font-bold px-5 py-2.5 rounded transition-all duration-200 hover:bg-[#BE001D] shadow-sm hover:shadow-md cursor-pointer border-0"
          >
            <span>Let's Talk</span>
            <Icon name="arrow-right" className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#DE0826]"
            aria-label="Toggle navigation"
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-white border-b border-gray-200 shadow-2xl p-6 transition-all z-50">
          <div className="flex flex-col space-y-4 text-base font-medium text-gray-800">
            <button
              onClick={() => {
                onRouteChange('about')
                setMobileOpen(false)
              }}
              className="py-2 border-b border-gray-100 flex items-center justify-between text-left hover:text-[#DE0826]"
            >
              <span>About Us</span>
              <Icon name="chevron-right" className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => {
                onRouteChange('capabilities')
                setMobileOpen(false)
              }}
              className="py-2 border-b border-gray-100 flex items-center justify-between text-left hover:text-[#DE0826]"
            >
              <span>Capabilities</span>
              <Icon name="chevron-right" className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => {
                onRouteChange('home')
                setMobileOpen(false)
              }}
              className="py-2 border-b border-gray-100 flex items-center justify-between text-left hover:text-[#DE0826]"
            >
              <span>Home</span>
              <Icon name="chevron-right" className="w-4 h-4 text-gray-400" />
            </button>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 bg-[#DE0826] text-white py-3 rounded text-center font-bold text-sm"
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </header>
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
        name: 'Dallas Headquarters',
        address: '6000 Connection Drive, Irving, TX 75039',
        phone: '+1 (800) 246-8324',
        email: 'usa@norstar-digital.com',
      },
      {
        name: 'San Jose Innovation Lab',
        address: '2880 Zanker Road, Suite 203, San Jose, CA 95134',
        phone: '+1 (408) 555-0199',
        email: 'sanjose@norstar-digital.com',
      },
      {
        name: 'New York Financial Hub',
        address: '1350 Avenue of the Americas, Floor 22, New York, NY 10019',
        phone: '+1 (212) 555-0182',
        email: 'nyc@norstar-digital.com',
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
        email: 'australia@norstar-digital.com',
      },
      {
        name: 'Melbourne Delivery Hub',
        address: 'Level 22, 500 Collins Street, Melbourne, VIC 3000',
        phone: '+61 3 9000 5678',
        email: 'melbourne@norstar-digital.com',
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
        email: 'vienna@norstar-digital.com',
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
        email: 'me@norstar-digital.com',
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
        email: 'belgium@norstar-digital.com',
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
        email: 'latam@norstar-digital.com',
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
        email: 'uk@norstar-digital.com',
      },
      {
        name: 'Milton Keynes Tech Campus',
        address: 'Exchange House, 450 Midsummer Blvd, Milton Keynes MK9 2EA',
        phone: '+44 1908 555 000',
        email: 'mk@norstar-digital.com',
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
        email: 'india@norstar-digital.com',
      },
      {
        name: 'Bengaluru AI Center',
        address: 'Electronics City Phase 1, Hosur Road, Bengaluru 560100',
        phone: '+91 80 4000 2000',
        email: 'blr@norstar-digital.com',
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
        email: 'apac@norstar-digital.com',
      },
    ],
  },
]

function ContactPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<OfficeLocation>(globalOfficesData[0])
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

  const filteredOffices = globalOfficesData.filter((item) =>
    item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.cities.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!privacyAgreed) {
      alert('Please agree to the Privacy Policy to submit your enquiry.')
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="bg-[#FAF8F5] text-gray-900 min-h-screen font-sans">
      {/* 1. Hero Banner ("Contact Us") */}
      <section className="relative bg-[#FAF8F5] bg-pinstripes border-b border-gray-200 overflow-hidden py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 mb-6 uppercase tracking-wider">
            <span className="hover:text-[#DE0826] cursor-pointer">Home</span>
            <span>/</span>
            <span className="text-[#DE0826]">Contact Us</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-4 leading-tight font-heading">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
            We would love to hear from you!
          </p>
        </div>
      </section>

      {/* 2. 5-Item Accordion Section */}
      <section className="py-16 md:py-20 bg-[#EBE7DF] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                title: 'Request for Service',
                description:
                  'Accelerate your digital transformation, modernize legacy core systems, or co-create AI-first enterprise architectures with Norstar specialized engineering teams.',
                cta: 'Initiate Service Inquiry',
                contact: 'solutions@norstar-digital.com | +1 (800) 246-8324',
              },
              {
                title: 'Join Norstar',
                description:
                  'Explore high-impact career pathways across 90+ global delivery hubs. Discover how you can Rise to new heights with our collaborative global innovators.',
                cta: 'Explore Open Positions',
                contact: 'careers@norstar-digital.com',
              },
              {
                title: 'Vendor Registration',
                description:
                  'Partner with us as an accredited technology, hardware, or cloud supplier. We value innovative partners who share our commitment to sustainability and zero-defect delivery.',
                cta: 'Access Vendor Onboarding Portal',
                contact: 'procurement@norstar-digital.com',
              },
              {
                title: 'Investor Information',
                description:
                  'Access quarterly financial earnings, annual reports, shareholder governance filings, ESG sustainability disclosures, and investor relations briefings.',
                cta: 'View Investor Releases',
                contact: 'investors@norstar-digital.com',
              },
              {
                title: 'Other Requests',
                description:
                  'For global media inquiries, press interviews, keynote speaker requests, analyst relations, or Corporate Social Responsibility community partnerships.',
                cta: 'Submit General Inquiry',
                contact: 'press@norstar-digital.com',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border-b border-gray-400/60 pb-4 transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between py-4 text-left group cursor-pointer border-0 bg-transparent"
                >
                  <span className="text-xl sm:text-2xl font-bold text-gray-950 group-hover:text-[#DE0826] transition-colors font-heading">
                    {item.title}
                  </span>
                  <span className="text-2xl text-gray-700 group-hover:text-[#DE0826] transition-colors font-light">
                    {openAccordion === idx ? '−' : '+'}
                  </span>
                </button>
                {openAccordion === idx && (
                  <div className="pt-2 pb-6 text-gray-700 text-sm sm:text-base leading-relaxed animate-fadeIn">
                    <p className="mb-4">{item.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white/70 rounded-lg border border-gray-300">
                      <span className="text-xs font-semibold text-gray-600">
                        Direct Channel: <strong className="text-gray-950">{item.contact}</strong>
                      </span>
                      <button
                        onClick={() => {
                          const el = document.getElementById('get-in-touch-form')
                          if (el) el.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="bg-[#DE0826] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded hover:bg-[#BE001D] transition-colors cursor-pointer border-0 shrink-0"
                      >
                        {item.cta}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Norstar's Global Offices Section */}
      <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Office Search & Country Directory */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mb-6 font-heading">
                Norstar's Global Offices
              </h2>

              {/* Search bar */}
              <div className="relative mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by city or country..."
                  className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded focus:border-[#DE0826] focus:outline-none shadow-xs"
                />
                <div className="absolute left-3 top-3.5 text-gray-400">
                  <Icon name="search" className="w-4 h-4" />
                </div>
              </div>

              {/* Interactive Country List */}
              <div className="max-h-[380px] overflow-y-auto pr-2 space-y-1.5 border border-gray-200 rounded-lg p-2 bg-white">
                {filteredOffices.map((office) => (
                  <button
                    key={office.country}
                    onClick={() => setSelectedCountry(office)}
                    className={`w-full text-left px-4 py-3 rounded text-xs sm:text-sm font-semibold transition-all cursor-pointer border-0 flex items-center justify-between ${
                      selectedCountry.country === office.country
                        ? 'bg-red-50 text-[#DE0826] font-bold'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#DE0826]'
                    }`}
                  >
                    <span>{office.country}</span>
                    <span className="text-xs text-gray-400">
                      {office.cities.length} {office.cities.length === 1 ? 'hub' : 'hubs'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Office Details Card */}
              {selectedCountry && (
                <div className="mt-6 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-xs uppercase tracking-wider font-bold text-[#DE0826] mb-2">
                    {selectedCountry.country} Facilities
                  </div>
                  <div className="space-y-4">
                    {selectedCountry.cities.map((city, cIdx) => (
                      <div key={cIdx} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                        <div className="font-bold text-sm text-gray-950">{city.name}</div>
                        <div className="text-xs text-gray-600 mt-0.5">{city.address}</div>
                        <div className="text-xs text-[#DE0826] mt-1 font-semibold">
                          📞 {city.phone} • ✉️ {city.email}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: World Map Visual matching screenshot */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-300 group">
                <img
                  src="/images/contact_world_map.jpg"
                  alt="Norstar Global Office Network"
                  className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay Badge Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-wrap items-center justify-between gap-4 text-white">
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#DE0826]">
                      90+ Countries
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-300">
                      Global Client Delivery Footprint
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-extrabold font-mono text-white">
                      150+ Hubs
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-300">
                      CoEs & Engineering Centers
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance / Regulatory Notice matching screenshot footer bar */}
              <p className="text-[11px] text-gray-500 mt-4 leading-relaxed font-normal">
                Global delivery centers comply with ISO 27001, SOC 2 Type II, HIPAA, and regional sovereign cloud data mandates. For facility security clearances and scheduled client visits, contact regional reception directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full-Width Get In Touch Form (Deep Burgundy Background #4E0519) */}
      <section id="get-in-touch-form" className="py-20 md:py-28 bg-[#4E0519] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Headline & Response Time Promise */}
            <div className="lg:col-span-5">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 font-heading">
                Get In Touch
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-md font-normal mb-8">
                Need more information?
                <br />
                We will take approximately <strong>2 - 3 working days</strong> to respond to your enquiry.
              </p>
              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 max-w-md">
                <div className="text-xs uppercase tracking-wider font-bold text-red-300 mb-2">
                  Direct Response Guarantee
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  All enterprise submissions are directly routed to the appropriate vertical solution architects and regional directors.
                </p>
              </div>
            </div>

            {/* Right: The Enterprise Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 text-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4 border border-green-500/40">
                    <Icon name="check" className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                    Thank You, {firstName || 'Partner'}!
                  </h3>
                  <p className="text-sm text-white/80 max-w-md mx-auto mb-6">
                    Your enquiry regarding <strong>{enquiryType}</strong> has been received. Our sector specialist will reach out within 2-3 business days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFirstName('')
                      setLastName('')
                      setEmail('')
                      setMessage('')
                    }}
                    className="bg-white text-[#4E0519] font-bold text-xs uppercase tracking-widest px-8 py-3 rounded hover:bg-gray-100 transition-colors"
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
                      SUBMIT
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
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
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-[11px] font-bold tracking-widest text-[#DE0826] uppercase mb-3">
                <span>[ OPPORTUNITIES AT NORSTAR ]</span>
              </div>
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
                <span className="text-xs font-bold text-[#DE0826] tracking-wider uppercase block mb-3">
                  News
                </span>
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
                <span className="text-xs font-bold text-[#DE0826] tracking-wider uppercase block mb-3">
                  Views
                </span>
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
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-[11px] font-bold tracking-widest text-[#DE0826] uppercase mb-4">
                <span>[ SECTOR SPECIALIZATION ]</span>
              </div>
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
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-[11px] font-bold tracking-widest text-[#DE0826] uppercase mb-4">
              <span>[ WHERE HORIZONS BLUR ]</span>
            </div>
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
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white rounded-full border border-red-200 text-[#DE0826] text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
                <span>DIGITAL CHANGEMAKERS</span>
              </div>

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
              <span className="text-xs font-bold text-[#DE0826] tracking-wider uppercase block mb-3">
                OUR PURPOSE & VALUES
              </span>
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
            <span className="text-xs font-bold text-[#DE0826] tracking-wider uppercase block mb-2">
              MILESTONES OF TRANSFORMATION
            </span>
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
// 3. Hero Section (Home)
// -------------------------------------------------------------
const heroSlides = [
  {
    eyebrow: 'SONIC IDENTITY & ARTIFICIAL INTELLIGENCE',
    title: 'Introducing Norstar T!ng',
    subtitle:
      'Amplifying Human Ingenuity with Sound and Artificial Intelligence. Experience our new sonic identity marking the next phase of enterprise transformation.',
    cta: 'Explore Norstar T!ng',
    badge: 'Sonic Launch',
    image: '/images/home_hero.jpg',
  },
  {
    eyebrow: 'ENTERPRISE EXCELLENCE',
    title: 'Scale at Speed™',
    subtitle:
      'Delivering transformative scale at unparalleled speed across 90+ countries with digital consulting, cloud architectures, and autonomous workflows.',
    cta: 'Discover Scale at Speed',
    badge: 'Core Promise',
    image: '/images/home_racing.jpg',
  },
  {
    eyebrow: 'ALL SIGNAL. NO NOISE.',
    title: 'Sovereign AI for Tomorrow',
    subtitle:
      'Why open ecosystem collaboration beats closed control. Discover how visionary leaders are navigating technological sovereignty.',
    cta: 'Listen to Podcast',
    badge: 'S/N Series',
    image: '/images/insights_cyber.jpg',
  },
]

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section
      className="relative bg-[#F4F5F7] text-gray-900 overflow-hidden border-b border-gray-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 200 C300 100, 600 350, 1000 180 C1300 80, 1500 250, 1600 300"
            stroke="#DE0826"
            strokeWidth="1.5"
            strokeOpacity="0.12"
            fill="none"
          />
          <path
            d="M-100 280 C350 200, 700 420, 1100 240 C1400 140, 1550 320, 1600 350"
            stroke="#DE0826"
            strokeWidth="1"
            strokeOpacity="0.08"
            fill="none"
          />
          <circle cx="950" cy="220" r="180" fill="url(#acousticGlow)" />
          <defs>
            <radialGradient id="acousticGlow" cx="0.5" cy="0.5" r="0.5">
              <stop stopColor="#DE0826" stopOpacity="0.06" />
              <stop offset="1" stopColor="#DE0826" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 min-h-[560px] lg:min-h-[620px] flex flex-col justify-between z-20">
        <div className="relative overflow-hidden w-full">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroSlides.map((slide, idx) => (
              <div
                key={slide.title}
                className="w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-8">
                  <div className="inline-flex items-center space-x-2.5 px-3 py-1 bg-white rounded-full border border-red-200 text-[#DE0826] text-[11px] font-bold tracking-wider uppercase mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#DE0826] animate-pulse" />
                    <span>{slide.eyebrow}</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-[1.08]">
                    {slide.title}
                  </h1>

                  <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed font-normal">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="#about"
                      className="inline-flex items-center space-x-3 bg-[#DE0826] hover:bg-[#BE001D] text-white text-[13px] font-bold px-7 py-3.5 rounded transition-all shadow-md hover:shadow-lg"
                    >
                      <span>{slide.cta}</span>
                      <Icon name="arrow-right" className="w-4 h-4" />
                    </a>
                    <a
                      href="#capabilities"
                      className="inline-flex items-center space-x-2 px-6 py-3.5 bg-white border border-gray-300 hover:border-[#DE0826] text-gray-800 hover:text-[#DE0826] text-[13px] font-semibold rounded transition-all shadow-sm"
                    >
                      <span>Learn More</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <div className="w-full max-w-md relative">
                    <div className="relative rounded-2xl overflow-hidden border-2 border-red-100 bg-white shadow-2xl p-6">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4 text-xs">
                        <span className="font-bold text-gray-800">{slide.badge}</span>
                        <span className="text-[#DE0826] font-bold font-mono">0{idx + 1} / 03</span>
                      </div>

                      <ImageBox
                        label={`Hero Visual • ${slide.title}`}
                        aspectRatio="aspect-[4/3]"
                        dark={false}
                        imageSrc={slide.image}
                      />

                      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#DE0826] inline-block animate-ping" />
                          <span className="font-medium text-gray-700">Interactive Acoustic Stage</span>
                        </div>
                        <span className="text-[#DE0826] font-semibold">Norstar Sonic</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-bold text-[#DE0826]">0{currentSlide + 1}</span>
            <div className="flex space-x-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === i
                      ? 'w-10 bg-[#DE0826]'
                      : 'w-4 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-gray-400 font-bold">03</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:border-[#DE0826] hover:text-[#DE0826] flex items-center justify-center text-gray-700 transition-colors shadow-sm"
            >
              <Icon name="chevron-left" className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:border-[#DE0826] hover:text-[#DE0826] flex items-center justify-center text-gray-700 transition-colors shadow-sm"
            >
              <Icon name="chevron-right" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 4. "with Norstar" Split Feature Section
// -------------------------------------------------------------
function BrandPromiseSection() {
  return (
    <section className="py-20 md:py-24 bg-[#FAF8F5] border-b border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center space-x-2 text-[#DE0826] text-xs font-bold tracking-wider uppercase mb-3">
              <span>NORSTAR RACING & ENTERPRISE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
              with Nor<span className="text-[#DE0826]">star</span>
              <span className="text-[#DE0826] ml-1 text-2xl font-light">★</span>
            </h2>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              From the racetrack of the ABB FIA Formula E World Championship to the boardroom of Fortune 500 enterprises, we co-innovate with ambitious organizations to push technological boundaries, optimize operational efficiency, and deliver sustainable speed.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Leveraging race-grade real-time telemetry, advanced engineering simulations, and AI-powered digital twins, we translate high-stakes performance into enterprise-grade scale.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#capabilities"
                className="inline-flex items-center space-x-2 bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold px-6 py-3 rounded transition-all shadow-sm"
              >
                <span>Explore Solutions</span>
                <Icon name="arrow-right" className="w-3.5 h-3.5" />
              </a>
              <a
                href="#success-stories"
                className="inline-flex items-center space-x-2 text-gray-900 hover:text-[#DE0826] text-xs font-bold px-4 py-3 transition-colors"
              >
                <span>Watch the Video</span>
                <Icon name="chevron-right" className="w-3.5 h-3.5 text-[#DE0826]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-xl border-2 border-red-50 hover:border-red-200 transition-all">
              <ImageBox
                label="Norstar High Velocity Enterprise"
                aspectRatio="aspect-[16/10]"
                dark={false}
                imageSrc="/images/home_racing.jpg"
              />
              <div className="p-4 bg-white flex items-center justify-between border-t border-gray-100">
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    Zero Emission • Maximum Velocity
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Gen3 Racing Simulator & AI Telemetry Stack
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-[#DE0826] font-bold">
                  <Icon name="activity" className="w-4 h-4" />
                  <span>320 km/h Peak</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 5. Podcast Spotlight ("S/N: All Signal. No Noise.")
// -------------------------------------------------------------
function PodcastSection() {
  return (
    <section className="relative bg-[#1E060D] text-white overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] bg-[#DE0826]/40 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#5C061D]/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 z-10">
        <div className="bg-gradient-to-r from-[#2B0813] to-[#4D0819] rounded-3xl p-8 md:p-14 border-2 border-red-500/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-[#DE0826] text-white text-[11px] font-mono font-bold rounded">
                  S/N 01
                </span>
                <span className="px-3 py-1 bg-white/10 text-white text-[11px] font-semibold rounded tracking-wider uppercase border border-white/20">
                  PODCAST
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 leading-snug">
                Sovereign AI: Why Collaboration{' '}
                <span className="text-[#DE0826] underline decoration-2 decoration-[#DE0826] underline-offset-4">
                  Beats
                </span>{' '}
                Control
              </h2>

              <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Tune into the inaugural episode of <em>S/N: All Signal. No Noise.</em> where industry pioneers explore why locking into closed stacks creates fragility, and why ecosystem collaboration delivers true sovereignty in the AI era.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={() => alert('Playing S/N Podcast Episode 01: Sovereign AI')}
                  className="inline-flex items-center space-x-3 bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold px-6 py-3.5 rounded-full transition-all shadow-lg hover:scale-105"
                >
                  <Icon name="play" className="w-4 h-4 fill-current" />
                  <span>Listen to Episode</span>
                </button>

                <div className="flex items-end space-x-1.5 h-6">
                  <span className="w-1.5 bg-[#DE0826] rounded-full animate-wave-1" />
                  <span className="w-1.5 bg-white rounded-full animate-wave-2" />
                  <span className="w-1.5 bg-[#DE0826] rounded-full animate-wave-3" />
                  <span className="w-1.5 bg-white rounded-full animate-wave-4" />
                  <span className="w-1.5 bg-[#DE0826] rounded-full animate-wave-5" />
                </div>
                <span className="text-xs text-white/70 font-mono">24:18 Episode</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-xs font-mono text-white/80 uppercase tracking-wider mb-4 text-center font-bold">
                  Featured Leaders in Discussion
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-black/20 border border-white/10">
                    <ImageBox
                      label="Rainer Deutschmann"
                      aspectRatio="aspect-square"
                      dark={true}
                      className="w-20 h-20 rounded-full mb-3"
                      imageSrc="/images/podcast_rainer.jpg"
                    />
                    <span className="text-xs font-bold text-white leading-tight">
                      Dr. Rainer Deutschmann
                    </span>
                    <span className="text-[10px] text-white/70 mt-1">
                      Group Strategy & Transformation Officer, Axiata
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-black/20 border border-white/10">
                    <ImageBox
                      label="Amol Phadke"
                      aspectRatio="aspect-square"
                      dark={true}
                      className="w-20 h-20 rounded-full mb-3"
                      imageSrc="/images/podcast_amol.jpg"
                    />
                    <span className="text-xs font-bold text-white leading-tight">
                      Amol Phadke
                    </span>
                    <span className="text-[10px] text-white/70 mt-1">
                      Chief Transformation Officer, Norstar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 6. "Latest Thinking" Section
// -------------------------------------------------------------
const thinkingArticles = [
  {
    id: 1,
    category: 'Supply Chain • AI',
    title: 'Future-Ready Supply Chains: Next Horizon in Autonomous Operations',
    readTime: '6 min read',
    tall: true,
    image: '/images/thinking_robot.jpg',
  },
  {
    id: 2,
    category: 'BFSI • Generative AI',
    title: 'GenAI in Insurance: Claims, Fraud, and Platform Modernization',
    readTime: '4 min read',
    tall: false,
    image: '/images/thinking_ribbon.jpg',
  },
  {
    id: 3,
    category: 'Energy • Automation',
    title: 'Agentic AI in Oil and Gas: Autonomous Engineering at Scale',
    readTime: '5 min read',
    tall: false,
    image: '/images/case_consult.jpg',
  },
  {
    id: 4,
    category: 'Cloud • Healthcare',
    title: 'From Silos to Cloud: Hybrid Model for Healthcare SaaS',
    readTime: '4 min read',
    tall: false,
    image: '/images/thinking_cubes.jpg',
  },
  {
    id: 5,
    category: 'Aerospace • Digital',
    title: "Engineering Tomorrow's Aerospace and Autonomous Systems",
    readTime: '5 min read',
    tall: false,
    image: '/images/cap_hero.jpg',
  },
  {
    id: 6,
    category: 'Leadership & Culture',
    title: 'The Human Factor: Leadership in the Age of Intelligent Automation',
    readTime: '7 min read',
    tall: false,
    image: '/images/careers_diversity.jpg',
  },
]

function LatestThinkingSection() {
  return (
    <section id="latest-thinking" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-gray-200">
          <div>
            <span className="text-xs font-bold text-[#DE0826] tracking-wider uppercase block mb-2">
              THOUGHT LEADERSHIP & INSIGHTS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950">
              Latest Thinking
            </h2>
          </div>
          <p className="text-gray-600 text-sm md:text-base max-w-md mt-4 md:mt-0">
            Insights, trends, and strategic perspectives from across the globe to help you navigate tomorrow with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {thinkingArticles.map((article) => (
            <article
              key={article.id}
              className={`group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#DE0826] hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                article.tall ? 'md:row-span-2' : ''
              }`}
            >
              <div>
                <ImageBox
                  label={`Insight 0${article.id} • ${article.category}`}
                  aspectRatio={article.tall ? 'aspect-[4/3] md:aspect-[4/4]' : 'aspect-[16/9]'}
                  dark={false}
                  imageSrc={article.image}
                />

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3 font-medium">
                    <span className="text-[#DE0826] font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#DE0826] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs font-bold text-gray-800 group-hover:text-[#DE0826]">
                <span>Read Article</span>
                <Icon
                  name="arrow-right"
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#DE0826]"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 7. "the Big Thinkers" Full-Width Banner
// -------------------------------------------------------------
function BigThinkersSection() {
  return (
    <section className="bg-gradient-to-r from-[#5C061D] via-[#7F0E2A] to-[#5C061D] text-white py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-block px-3.5 py-1.5 bg-black/40 rounded text-xs font-serif italic text-white tracking-wide mb-6 border border-white/20">
              the <span className="font-bold font-sans not-italic text-white">Big</span> Thinkers
              <span className="text-[10px] ml-2 font-mono text-white/80">
                • In partnership with WSJ
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Businesses' Next Competitive Advantage — Data Discipline
            </h2>

            <p className="text-white/90 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              "Data only becomes valuable when it informs better, faster decision-making. High-performing enterprises are moving beyond data volume to data rigor."
            </p>

            <div className="flex items-center space-x-4 mb-8">
              <div className="w-10 h-1 bg-white" />
              <div>
                <span className="font-bold text-sm block text-white">
                  Babu Kuttala
                </span>
                <span className="text-xs text-white/80">
                  Chief Data & Analytics Officer, ABB
                </span>
              </div>
            </div>

            <a
              href="#latest-thinking"
              className="inline-flex items-center space-x-2 bg-white text-[#DE0826] hover:bg-neutral-100 text-xs font-bold px-7 py-3.5 rounded transition-all shadow-lg"
            >
              <span>Read WSJ Feature</span>
              <Icon name="external" className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-sm">
              <ImageBox
                label="Executive Spotlight • Babu Kuttala (ABB)"
                aspectRatio="aspect-[4/5]"
                dark={true}
                imageSrc="/images/spotlight_babu.jpg"
              />
              <div className="mt-3 text-center text-xs font-semibold text-white/80">
                The Big Thinkers Executive Series
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 8. "What's New" Interactive Sliding Carousel
// -------------------------------------------------------------
const whatsNewItems = [
  {
    id: 1,
    tag: 'Alliances & Smart Factory',
    title: 'Norstar and AVEVA Join Hands to Deliver Next-Gen Smart Factory Solutions',
    date: 'April 2026',
    image: '/images/whatsnew_coiled.jpg',
  },
  {
    id: 2,
    tag: 'Quantum & AI',
    title: 'Strategic Alliance with Quantum Computing Pioneer to Boost Enterprise AI',
    date: 'March 2026',
    image: '/images/whatsnew_mesh.jpg',
  },
  {
    id: 3,
    tag: 'Cloud Modernization',
    title: 'Leading Global Bank Selects Norstar for End-to-End Core Cloud Migration',
    date: 'March 2026',
    image: '/images/whatsnew_wave.jpg',
  },
  {
    id: 4,
    tag: '5G Telco Labs',
    title: 'Next-Gen 5G Telco Cloud Innovation Lab Launched with Leading Tier-1 Carrier',
    date: 'February 2026',
    image: '/images/event_semicon.jpg',
  },
  {
    id: 5,
    tag: 'Sustainability & ESG',
    title: 'Norstar Recognized as Global Leader in Corporate Sustainability by CDP',
    date: 'January 2026',
    image: '/images/event_dreamforce.jpg',
  },
]

function WhatsNewSection() {
  const [slideIndex, setSlideIndex] = useState(0)
  const maxSlides = whatsNewItems.length - 2

  const next = () => {
    setSlideIndex((prev) => (prev < maxSlides ? prev + 1 : 0))
  }

  const prev = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : maxSlides))
  }

  return (
    <section className="py-20 md:py-24 bg-[#FAF8F5] border-b border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-[#DE0826] tracking-wider uppercase block mb-1">
              PRESS & ANNOUNCEMENTS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950">
              What's New
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={prev}
              aria-label="Previous News"
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#DE0826] hover:text-[#DE0826] bg-white flex items-center justify-center text-gray-700 transition-colors shadow-sm"
            >
              <Icon name="chevron-left" className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next News"
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#DE0826] hover:text-[#DE0826] bg-white flex items-center justify-center text-gray-700 transition-colors shadow-sm"
            >
              <Icon name="chevron-right" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{ transform: `translateX(-${slideIndex * 33.333}%)` }}
          >
            {whatsNewItems.map((item) => (
              <div
                key={item.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#DE0826] hover:shadow-md transition-all duration-200 h-full flex flex-col justify-between">
                  <div>
                    <ImageBox
                      label={`News 0${item.id} • ${item.tag}`}
                      aspectRatio="aspect-[16/10]"
                      dark={false}
                      imageSrc={item.image}
                    />

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="font-bold text-[#DE0826]">{item.tag}</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 line-clamp-3 leading-snug hover:text-[#DE0826] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <a
                      href="#news"
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#DE0826] hover:underline"
                    >
                      <span>Read Announcement</span>
                      <Icon name="arrow-right" className="w-3 h-3" />
                    </a>
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
            <span className="text-xs font-bold text-[#DE0826] tracking-wider uppercase block mb-2">
              WHAT WE DO
            </span>
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
            <span className="text-xs font-bold text-[#DE0826] tracking-wider uppercase block mb-2">
              SECTOR DEPTH
            </span>
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
            <span className="text-xs font-bold text-[#DE0826] tracking-wider uppercase block mb-2">
              PROVEN RESULTS
            </span>
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
            <span className="text-xs font-bold text-[#DE0826] tracking-wider uppercase block mb-3">
              CULTURE & CAREERS
            </span>

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
              className="flex items-center space-x-3 mb-4 bg-transparent border-0 p-0 cursor-pointer text-left"
            >
              <div className="w-8 h-8 bg-[#DE0826] rounded flex items-center justify-center p-1.5 shadow-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                </svg>
              </div>
              <span className="font-extrabold text-white tracking-tight text-lg font-sans">
                Nor<span className="text-[#DE0826]">star</span>
              </span>
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
      {/* 1. Top Utility Navigation Bar */}
      <UtilityBar />

      {/* 2. Primary Navigation Bar with Page Toggle */}
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
            {/* 3. Hero Section (White/Silver 3D with Red Accents) */}
            <HeroSection />

            {/* 4. Brand Promise ("with Norstar") */}
            <BrandPromiseSection />

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
      </main>

      {/* 13. Enterprise Footer */}
      <Footer onRouteChange={handleRouteChange} />
    </div>
  )
}
