import { useState } from 'react'

export type AboutSubpage =
  | 'overview'
  | 'leadership'
  | 'brand'
  | 'sustainability'
  | 'recognition'
  | 'customer-speak'
  | 'partners'
  | 'portfolio'
  | 'citizenship'
  | 'centricity'
  | 'news'
  | 'investors'

interface AboutUsPageProps {
  activeSubpage?: AboutSubpage
  onSelectSubpage: (subpage: AboutSubpage) => void
  onNavigateRoute?: (route: any, subpage?: AboutSubpage) => void
}

// Reusable SVG Icon component
function SubIcon({ name, className = 'w-4 h-4' }: { name: string; className?: string }) {
  switch (name) {
    case 'arrow-right':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      )
    case 'check':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
        </svg>
      )
    case 'award':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V4m0 4l3-3m-3 3l-3-3m12 7a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'users':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    case 'globe':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    case 'shield':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'zap':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'cloud':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    case 'activity':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'heart':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    case 'external':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )
    default:
      return null
  }
}

// Historical Timeline Data
const timelineData = [
  {
    year: '1986',
    title: 'Pioneering Joint Venture Foundation',
    description:
      'Established as a visionary telecom engineering partnership between Mahindra & British Telecom, setting the benchmark for offshore telecom software delivery.',
    tag: 'Foundation',
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

// Navigation tab items configuration
const subpageTabs: { id: AboutSubpage; label: string }[] = [
  { id: 'overview', label: 'Corporate Overview' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'brand', label: 'Our Brand' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'customer-speak', label: 'Customer Speak' },
  { id: 'partners', label: 'Partners Ecosystem' },
  { id: 'portfolio', label: 'Portfolio Companies' },
  { id: 'citizenship', label: 'Corporate Citizenship' },
  { id: 'centricity', label: 'Customer Centricity' },
  { id: 'news', label: 'News & Media' },
  { id: 'investors', label: 'Investor Relations' },
]

export function AboutUsPage({
  activeSubpage = 'overview',
  onSelectSubpage,
}: AboutUsPageProps) {
  // Timeline state for overview
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(0)
  const currentTimeline = timelineData[selectedTimelineIndex]

  // Filter state for recognition
  const [recognitionFilter, setRecognitionFilter] = useState<'all' | 'analyst' | 'esg' | 'workplace'>('all')

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* ------------------------------------------------------------- */}
      {/* STICKY SECONDARY SUB-NAVIGATION BAR (Tech Mahindra Inspired) */}
      {/* ------------------------------------------------------------- */}
      <div className="sticky top-[58px] sm:top-[64px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2.5">
            {subpageTabs.map((tab) => {
              const isActive = activeSubpage === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectSubpage(tab.id)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`whitespace-nowrap px-3.5 py-2 text-xs sm:text-[13px] font-bold rounded-md transition-all cursor-pointer border-0 ${
                    isActive
                      ? 'bg-[#DE0826] text-white shadow-xs font-extrabold'
                      : 'bg-transparent text-gray-700 hover:text-[#DE0826] hover:bg-gray-100/70'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. CORPORATE OVERVIEW VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'overview' && (
        <div className="animate-fadeIn">
          {/* Hero Banner */}
          <section className="relative bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <span className="text-gray-600">About Us</span>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Corporate Overview</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-[#DE0826] text-xs font-bold rounded uppercase tracking-wider mb-4">
                    Enterprise Overview
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                    Scale at <span className="text-[#DE0826]">Speed™</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal mb-8 max-w-2xl">
                    We are digital changemakers – here to disrupt old ideas, blaze new trails, and help Global 2000 enterprises transform and scale with unparalleled agility.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => onSelectSubpage('leadership')}
                      className="inline-flex items-center space-x-2 bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold px-6 py-3.5 rounded transition-all shadow-md cursor-pointer"
                    >
                      <span>Meet Our Leadership</span>
                      <SubIcon name="arrow-right" className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSelectSubpage('brand')}
                      className="inline-flex items-center space-x-2 bg-white border border-gray-300 hover:border-[#DE0826] text-gray-800 hover:text-[#DE0826] text-xs font-bold px-6 py-3.5 rounded transition-all shadow-xs cursor-pointer"
                    >
                      <span>Our Brand & Rise</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-xl border-2 border-red-50">
                    <div className="aspect-[16/10] overflow-hidden rounded-xl">
                      <img
                        src="/images/about_hq.jpg"
                        alt="Norstar Global Headquarters"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 bg-white text-xs font-semibold text-gray-600 flex items-center justify-between">
                      <span>Global Headquarters • Tech Campus</span>
                      <span className="text-[#DE0826] font-bold">Est. 1986</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Enterprise Scale Statistics */}
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
                  <div className="text-[11px] text-gray-500 mt-1">Enterprise Scale</div>
                </div>
              </div>
            </div>
          </section>

          {/* Purpose, Promise & Mission */}
          <section className="py-20 bg-[#FAF8F5] border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-bold text-[#DE0826] uppercase tracking-widest">
                  Our North Star
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 mt-2 mb-4">
                  Purpose, Promise & Core Mission
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Rooted in the heritage of the Mahindra Group, we exist to unlock human potential and deliver positive, sustainable change across the globe.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Purpose Card */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-[#DE0826] transition-all hover:shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DE0826] flex items-center justify-center font-extrabold text-base mb-6">
                      01
                    </div>
                    <span className="text-xs font-bold text-[#DE0826] uppercase tracking-wider">
                      Core Purpose
                    </span>
                    <h3 className="text-xl font-bold text-gray-950 mt-1 mb-3">
                      Drive Positive Change
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      "Only when we enable others to Rise will we rise." We dedicate our intellectual capital and technological craft to driving meaningful social and economic prosperity for our communities, partners, and associates.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-gray-500">
                    <span>The Rise Philosophy</span>
                  </div>
                </div>

                {/* Promise Card */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-[#DE0826] transition-all hover:shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DE0826] flex items-center justify-center font-extrabold text-base mb-6">
                      02
                    </div>
                    <span className="text-xs font-bold text-[#DE0826] uppercase tracking-wider">
                      Enterprise Promise
                    </span>
                    <h3 className="text-xl font-bold text-gray-950 mt-1 mb-3">
                      Scale at Speed™
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Transforming global enterprises without operational disruption. By converging cloud modernization, sovereign artificial intelligence, and autonomous workflows, we turn complex digital roadmaps into rapid tangible outcomes.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-gray-500">
                    <span>Velocity with Certainty</span>
                  </div>
                </div>

                {/* Mission Card */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-[#DE0826] transition-all hover:shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DE0826] flex items-center justify-center font-extrabold text-base mb-6">
                      03
                    </div>
                    <span className="text-xs font-bold text-[#DE0826] uppercase tracking-wider">
                      Strategic Mission
                    </span>
                    <h3 className="text-xl font-bold text-gray-950 mt-1 mb-3">
                      Connected World Excellence
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      To represent the connected world by offering innovative, customer-centric IT services, cloud engineering, and digital business solutions that solve complex enterprise challenges and nurture lasting trust.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-gray-500">
                    <span>Customer Centricity</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Journey Timeline */}
          <section className="py-20 md:py-28 bg-white border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-950">
                  Our Journey Since <span className="text-[#DE0826]">1986</span>
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-3">
                  Explore the pivotal milestones that shaped Norstar from an Indian telecommunications joint venture into a global digital transformation titan.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-red-100 flex flex-col items-center justify-center bg-gradient-to-b from-[#FAF8F5] to-white shadow-2xl p-8 text-center group">
                    <div className="absolute inset-0 rounded-full border-4 border-t-[#DE0826] border-r-transparent border-b-transparent border-l-transparent animate-spin duration-10000" />
                    
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">
                      HISTORICAL ERA
                    </span>
                    
                    <div className="text-5xl sm:text-6xl font-extrabold text-[#DE0826] tracking-tighter my-2">
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
                      Select Milestone Year:
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
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. LEADERSHIP VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'leadership' && (
        <div className="animate-fadeIn">
          {/* Header Banner */}
          <section className="bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Leadership & Governance</span>
              </div>

              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-[#DE0826] text-xs font-bold rounded uppercase tracking-wider mb-4">
                  Executive Governance
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Visionary <span className="text-[#DE0826]">Leadership</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Guided by ethical leadership, deep industry experience, and customer obsession, our executive team steers over 145,000 innovators to build tomorrow's intelligent enterprises.
                </p>
              </div>
            </div>
          </section>

          {/* Strategic CEO Quote Banner */}
          <section className="bg-white py-16 border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-[#5F0229] rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
                <div className="max-w-3xl relative z-10">
                  <span className="text-xs font-bold tracking-widest text-[#DE0826] uppercase">
                    CEO Perspective
                  </span>
                  <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed my-6">
                    "In the era of autonomous cognitive intelligence, true competitive edge is not just about adopting new tech; it is about delivering scale with unmatched speed while maintaining unwavering trust, ethics, and human purpose."
                  </blockquote>
                  <div>
                    <div className="font-extrabold text-lg text-white">Mohit Joshi</div>
                    <div className="text-sm text-gray-300">Managing Director & Chief Executive Officer</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Leadership Profiles Grid */}
          <section className="py-20 bg-[#FAF8F5] border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950">
                  Executive Council & Board
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-2">
                  Meet the leaders driving enterprise growth, technology disruption, and global operational excellence.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: 'Anand Mahindra',
                    role: 'Chairman, Mahindra Group',
                    image: '/images/exec_speaker_left.png',
                    desc: 'Visionary industrialist leading the Mahindra Group into global innovation, sustainability, and the Rise movement.',
                  },
                  {
                    name: 'Mohit Joshi',
                    role: 'MD & Chief Executive Officer',
                    image: '/images/big_thinker_executive.png',
                    desc: 'Transformative technology leader spearheading Norstar’s Scale at Speed™ era and generative AI operations.',
                  },
                  {
                    name: 'Rohit Anand',
                    role: 'Chief Financial Officer',
                    image: '/images/exec_speaker_right.png',
                    desc: 'Oversees global capital allocation, shareholder value creation, financial discipline, and M&A integration.',
                  },
                  {
                    name: 'Atul Soneja',
                    role: 'Chief Operating Officer',
                    image: '/images/careers_purpose.jpg',
                    desc: 'Drives end-to-end delivery rigor, global service lines, enterprise agility, and large deal transformations.',
                  },
                  {
                    name: 'Richard Lobo',
                    role: 'Chief People Officer',
                    image: '/images/careers_diversity.jpg',
                    desc: 'Champions talent architecture, culture of learning, global diversity, and organizational effectiveness.',
                  },
                  {
                    name: 'Peeyush Dubey',
                    role: 'Chief Marketing Officer',
                    image: '/images/thinking_ribbon.jpg',
                    desc: 'Leads global brand positioning, sonic identity, demand generation, and analyst relations worldwide.',
                  },
                  {
                    name: 'Harshvendra Soin',
                    role: 'Global Strategic Advisor',
                    image: '/images/case_consult.jpg',
                    desc: 'Advises on strategic partnerships, leadership development, and individual social responsibility.',
                  },
                  {
                    name: 'Biren Sen',
                    role: 'Chief Delivery Officer',
                    image: '/images/cap_hero.jpg',
                    desc: 'Directs global delivery centers across Americas, EMEA, and APAC with zero-defect execution standards.',
                  },
                ].map((exec) => (
                  <div
                    key={exec.name}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#DE0826] transition-all group flex flex-col"
                  >
                    <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                      <img
                        src={exec.image}
                        alt={exec.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-950 group-hover:text-[#DE0826] transition-colors">
                          {exec.name}
                        </h3>
                        <div className="text-xs font-semibold text-[#DE0826] mb-3">
                          {exec.role}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {exec.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Governance & Committees */}
          <section className="py-16 bg-white border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 bg-[#FAF8F5] rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-950 text-base mb-2">Audit Committee</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Ensuring transparency, internal financial controls, and risk governance with independent oversight.
                  </p>
                </div>
                <div className="p-6 bg-[#FAF8F5] rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-950 text-base mb-2">Nomination & Remuneration</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Fostering merit-based leadership appointments and performance-linked governance structures.
                  </p>
                </div>
                <div className="p-6 bg-[#FAF8F5] rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-950 text-base mb-2">CSR & Sustainability</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Reviewing social impact programs, net-zero roadmaps, and community development allocations.
                  </p>
                </div>
                <div className="p-6 bg-[#FAF8F5] rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-950 text-base mb-2">Risk Management</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Anticipating geopolitical, cybersecurity, technological, and currency contingencies proactively.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. OUR BRAND VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'brand' && (
        <div className="animate-fadeIn">
          {/* Header Banner */}
          <section className="bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Our Brand</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-[#DE0826] text-xs font-bold rounded uppercase tracking-wider mb-4">
                    Brand Philosophy
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                    Powered by the Spirit of <span className="text-[#DE0826]">Rise</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal mb-8 max-w-xl">
                    Rise is not just a tagline. It is our guiding philosophy, a challenge to conventional thinking, and a commitment to enabling people and organizations to achieve their highest aspirations.
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="aspect-[16/11] rounded-2xl overflow-hidden shadow-xl border-2 border-red-100">
                    <img
                      src="/images/home_racing.jpg"
                      alt="Scale at Speed"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Three Pillars of Rise */}
          <section className="py-20 bg-white border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold text-[#DE0826] uppercase tracking-widest">
                  Foundational Tenets
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 mt-2">
                  The Three Pillars of Rise
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DE0826] flex items-center justify-center font-extrabold text-lg mb-6">
                    01
                  </div>
                  <h3 className="text-2xl font-bold text-gray-950 mb-3">
                    Accept No Limits
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    We question conventional boundaries and reject the idea that something cannot be done. Whether engineering autonomous networks or migrating critical banking cores, we redefine what is possible.
                  </p>
                  <div className="text-xs font-bold text-[#DE0826]">Breakthrough Mindset</div>
                </div>

                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DE0826] flex items-center justify-center font-extrabold text-lg mb-6">
                    02
                  </div>
                  <h3 className="text-2xl font-bold text-gray-950 mb-3">
                    Alternative Thinking
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    We apply fresh perspectives, cross-industry convergence, and agile engineering to solve tough problems. In an era of copy-paste tech, we pioneer differentiated value.
                  </p>
                  <div className="text-xs font-bold text-[#DE0826]">Creative Agility</div>
                </div>

                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DE0826] flex items-center justify-center font-extrabold text-lg mb-6">
                    03
                  </div>
                  <h3 className="text-2xl font-bold text-gray-950 mb-3">
                    Driving Positive Change
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    We measure our success not just by quarterly revenue, but by the tangible positive impact we create in the lives of our associates, communities, and global ecosystem.
                  </p>
                  <div className="text-xs font-bold text-[#DE0826]">Purpose in Action</div>
                </div>
              </div>
            </div>
          </section>

          {/* Sonic Identity & Promise Section */}
          <section className="py-20 bg-[#070B14] text-white border-b border-gray-900">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6">
                  <span className="text-xs font-bold text-[#DE0826] uppercase tracking-widest">
                    Acoustic Branding
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-6">
                    Introducing Norstar T!ng
                  </h2>
                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    Our new sonic identity represents the kinetic spark of human ingenuity when coupled with artificial intelligence. A distinct, memorable acoustic signature that sounds like modern acceleration.
                  </p>
                  <div className="inline-flex items-center space-x-3 px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DE0826] animate-ping" />
                    <span>Sonic Identity Active Across 90+ Countries</span>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      The Scale at Speed™ Promise
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      Enterprises today cannot afford multi-year transformation delays. Scale at Speed™ is our structured methodology ensuring that modernization happens incrementally, autonomously, and with real-time value realization.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-xs text-white">
                        <SubIcon name="check" className="w-4 h-4 text-[#DE0826]" />
                        <span>Zero-Disruption Migration Frameworks</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-white">
                        <SubIcon name="check" className="w-4 h-4 text-[#DE0826]" />
                        <span>Agentic Cognitive AI Workflows</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-white">
                        <SubIcon name="check" className="w-4 h-4 text-[#DE0826]" />
                        <span>Global Follow-the-Sun Agile Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. SUSTAINABILITY VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'sustainability' && (
        <div className="animate-fadeIn">
          {/* Header Banner */}
          <section className="bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Sustainability & ESG</span>
              </div>

              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded uppercase tracking-wider mb-4">
                  Environmental, Social & Governance
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Sustainable <span className="text-emerald-600">Enterprise</span> by Design
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Committed to achieving Net Zero by 2035 — 15 years ahead of the Paris Agreement. We empower clients and campuses with responsible green technologies, circular resource cycles, and ethical governance.
                </p>
              </div>
            </div>
          </section>

          {/* Key ESG Accolades & Badges */}
          <section className="bg-white py-12 border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <SubIcon name="award" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-950">CDP 'A' List</div>
                    <div className="text-xs font-semibold text-emerald-700">Top 2% Globally</div>
                    <p className="text-[11px] text-gray-600 mt-1">Recognized for leadership in climate transparency.</p>
                  </div>
                </div>

                <div className="p-6 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <SubIcon name="zap" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-950">Net Zero 2035</div>
                    <div className="text-xs font-semibold text-emerald-700">15 Yrs Ahead</div>
                    <p className="text-[11px] text-gray-600 mt-1">Aggressive decarbonization across Scope 1, 2, and 3.</p>
                  </div>
                </div>

                <div className="p-6 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <SubIcon name="globe" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-950">50%+ Green</div>
                    <div className="text-xs font-semibold text-emerald-700">Renewable Energy</div>
                    <p className="text-[11px] text-gray-600 mt-1">Sourced from on-campus solar and long-term PPAs.</p>
                  </div>
                </div>

                <div className="p-6 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <SubIcon name="shield" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-950">DJSI Emerging</div>
                    <div className="text-xs font-semibold text-emerald-700">Sustainability Index</div>
                    <p className="text-[11px] text-gray-600 mt-1">Consistently ranked in the Dow Jones ESG indices.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Action Pillars */}
          <section className="py-20 bg-[#FAF8F5] border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950">
                  Our ESG Action Framework
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-2">
                  Tangible initiatives driving measurable decarbonization, circular economies, and community equity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-xs">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                    01. Environment
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 mb-3">
                    Decarbonization & Green Cloud Computing
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Our proprietary algorithmic optimization frameworks help clients reduce cloud workload carbon intensity by up to 40%. All enterprise campus data centers operate under strict PUE standards.
                  </p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-center space-x-2">
                      <SubIcon name="check" className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Eco-designed software architecture</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SubIcon name="check" className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Zero-waste-to-landfill certified facilities</span>
                    </li>
                  </ul>
                </div>

                <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-xs">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                    02. Circular Economy
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 mb-3">
                    Water Stewardship & E-Waste Management
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    100% of decommissioned electronic assets are refurbished or recycled with zero toxic e-waste. Rainwater harvesting plants across major campuses make us a net water-positive corporation.
                  </p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-center space-x-2">
                      <SubIcon name="check" className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Net water-positive campus infrastructure</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SubIcon name="check" className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Elimination of single-use plastics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. RECOGNITION VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'recognition' && (
        <div className="animate-fadeIn">
          {/* Header Banner */}
          <section className="bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Awards & Recognition</span>
              </div>

              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-[#DE0826] text-xs font-bold rounded uppercase tracking-wider mb-4">
                  Analyst & Industry Accolades
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Global <span className="text-[#DE0826]">Recognition</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Our commitment to technological innovation, customer satisfaction, and ESG excellence has been repeatedly recognized by the world's leading analyst firms and industry bodies.
                </p>
              </div>
            </div>
          </section>

          {/* Filter Bar & Recognition Cards */}
          <section className="py-16 bg-white border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex flex-wrap items-center gap-3 mb-12">
                {[
                  { id: 'all', label: 'All Recognitions' },
                  { id: 'analyst', label: 'Analyst Reports' },
                  { id: 'esg', label: 'Sustainability & ESG' },
                  { id: 'workplace', label: 'Workplace & Culture' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setRecognitionFilter(f.id as any)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      recognitionFilter === f.id
                        ? 'bg-[#DE0826] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    category: 'analyst',
                    issuer: 'Gartner®',
                    title: 'Magic Quadrant™ Leader',
                    subtitle: 'Public Cloud IT Transformation Services',
                    desc: 'Positioned in the Leaders quadrant for completeness of vision and ability to execute large-scale enterprise cloud transformations.',
                    year: '2025 - 2026',
                  },
                  {
                    category: 'analyst',
                    issuer: 'Everest Group',
                    title: 'PEAK Matrix® Leader',
                    subtitle: 'Digital Workplace Services',
                    desc: 'Recognized as a Leader for visionary workplace AI integration, employee experience engineering, and zero-touch support.',
                    year: '2025',
                  },
                  {
                    category: 'analyst',
                    issuer: 'HFS Research',
                    title: 'Horizon 3 Market Leader',
                    subtitle: 'Generative AI & Autonomous Operations',
                    desc: 'Ranked in the top echelon for real-world enterprise GenAI delivery and sovereign LLM deployment frameworks.',
                    year: '2026',
                  },
                  {
                    category: 'esg',
                    issuer: 'CDP',
                    title: 'Climate "A" List Rating',
                    subtitle: 'Global Environmental Leadership',
                    desc: 'One of the few global IT powerhouses to earn the highest score for carbon transparency and aggressive emission reduction.',
                    year: '2024 - 2025',
                  },
                  {
                    category: 'workplace',
                    issuer: 'Forbes',
                    title: 'World’s Best Employers',
                    subtitle: 'Global Workforce Culture',
                    desc: 'Ranked among top global employers for associate well-being, diversity programs, and continuous reskilling opportunities.',
                    year: '2025',
                  },
                  {
                    category: 'analyst',
                    issuer: 'Everest Group',
                    title: 'PEAK Matrix® Leader',
                    subtitle: 'Telecom IT Systems & BSS Transformation',
                    desc: 'Affirmed as the global number one partner for telco operators deploying 5G cloud networks and Open RAN.',
                    year: '2025',
                  },
                  {
                    category: 'workplace',
                    issuer: 'Brandon Hall Group',
                    title: 'Gold Award for Excellence',
                    subtitle: 'Future of Work & Talent Transformation',
                    desc: 'Honored for our autonomous digital learning university and AI-driven associate career pathing systems.',
                    year: '2024',
                  },
                  {
                    category: 'workplace',
                    issuer: 'ET NOW',
                    title: 'Best Organizations for Women',
                    subtitle: 'Gender Parity & Inclusion',
                    desc: 'Recognized for creating inclusive executive career pipelines and pioneering parental flexibility benefits.',
                    year: '2025',
                  },
                ]
                  .filter((item) => recognitionFilter === 'all' || item.category === recognitionFilter)
                  .map((award, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-mono font-bold text-[#DE0826] uppercase tracking-wider">
                            {award.issuer}
                          </span>
                          <span className="px-2.5 py-0.5 bg-white border border-gray-200 text-gray-600 rounded text-[10px] font-bold">
                            {award.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-950 mb-1">
                          {award.title}
                        </h3>
                        <div className="text-xs font-semibold text-gray-700 mb-3">
                          {award.subtitle}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {award.desc}
                        </p>
                      </div>
                      <div className="mt-5 pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-[#DE0826] font-bold">
                        <span>Verified Recognition</span>
                        <SubIcon name="award" className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 6. CUSTOMER SPEAK VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'customer-speak' && (
        <div className="animate-fadeIn">
          {/* Header Banner */}
          <section className="bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Customer Speak</span>
              </div>

              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-[#DE0826] text-xs font-bold rounded uppercase tracking-wider mb-4">
                  Client Advocacy & Trust
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Customer <span className="text-[#DE0826]">Speak</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Our clients are our greatest advocates. Discover how Global 2000 leaders partner with us to engineer digital superiority, optimize mission-critical operations, and scale at speed.
                </p>
              </div>
            </div>
          </section>

          {/* Trust Metrics */}
          <section className="bg-white py-12 border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-[#DE0826] mb-1">94%</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">CSAT Score</div>
                  <div className="text-[11px] text-gray-500 mt-1">High Customer Satisfaction</div>
                </div>
                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-gray-950 mb-1">+68</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Net Promoter Score</div>
                  <div className="text-[11px] text-gray-500 mt-1">Top Quartile in IT Services</div>
                </div>
                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-[#DE0826] mb-1">12+ Yrs</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Avg Client Tenure</div>
                  <div className="text-[11px] text-gray-500 mt-1">Across Top 20 Global Clients</div>
                </div>
                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-gray-950 mb-1">1,100+</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Active Relationships</div>
                  <div className="text-[11px] text-gray-500 mt-1">Spanning Fortune 500 Enterprises</div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial Quotes Grid */}
          <section className="py-20 bg-[#FAF8F5] border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950">
                  What Global CxOs Say
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-2">
                  Direct perspectives from industry leaders who count on Norstar to power their digital futures.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    industry: 'Telecommunications',
                    quote:
                      'Norstar’s Scale at Speed™ execution model allowed us to migrate 18 million mobile subscribers to a cloud-native 5G BSS architecture nine months ahead of schedule with zero customer outage.',
                    author: 'Chief Information Officer',
                    org: 'Tier-1 North American Telco Carrier',
                  },
                  {
                    industry: 'Automotive & Mobility',
                    quote:
                      'Pininfarina and Norstar united Italian industrial elegance with next-generation in-vehicle software architecture. The result is an EV cockpit interface that sets a new industry standard for luxury.',
                    author: 'VP of Vehicle Software & UX',
                    org: 'Global Premium Automotive OEM',
                  },
                  {
                    industry: 'Banking & Financial Services',
                    quote:
                      'When migrating mission-critical payment clearance engines to modern multi-cloud, Norstar provided the flawless engineering rigor and regulatory compliance assurances our board demanded.',
                    author: 'Head of Global Technology Infrastructure',
                    org: 'Top 5 European Universal Bank',
                  },
                  {
                    industry: 'Healthcare & Life Sciences',
                    quote:
                      'Deploying generative AI in clinical analytics requires uncompromising data privacy and precision. Norstar delivered sovereign AI pipelines that increased diagnostic review speeds by 35%.',
                    author: 'Chief Digital Transformation Officer',
                    org: 'International Healthcare & Diagnostic Network',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:border-[#DE0826] transition-all hover:shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-[#DE0826] uppercase tracking-wider">
                          {item.industry}
                        </span>
                        <div className="text-yellow-400 text-sm">★★★★★</div>
                      </div>
                      <blockquote className="text-base text-gray-800 leading-relaxed font-normal mb-6 italic">
                        "{item.quote}"
                      </blockquote>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <div className="font-bold text-sm text-gray-950">{item.author}</div>
                      <div className="text-xs text-gray-500">{item.org}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 7. PARTNERS ECOSYSTEM VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'partners' && (
        <div className="animate-fadeIn">
          {/* Header Banner */}
          <section className="bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Partners Ecosystem</span>
              </div>

              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-[#DE0826] text-xs font-bold rounded uppercase tracking-wider mb-4">
                  Strategic Alliances
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Partners <span className="text-[#DE0826]">Ecosystem</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  We join forces with the world’s leading technology platforms and hyperscalers to co-engineer breakthrough solutions, build joint Centers of Excellence, and unlock extraordinary enterprise value.
                </p>
              </div>
            </div>
          </section>

          {/* Hyperscaler Alliances */}
          <section className="py-16 bg-white border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="mb-10">
                <span className="text-xs font-bold text-[#DE0826] uppercase tracking-widest">
                  Tier-1 Alliances
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
                  Global Hyperscalers
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-md">
                  <div className="h-10 font-black text-xl text-gray-900 flex items-center mb-4">
                    Amazon Web Services
                  </div>
                  <span className="px-2.5 py-1 bg-red-50 text-[#DE0826] font-bold text-xs rounded mb-3 inline-block">
                    AWS Premier Tier Partner
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    Joint Generative AI Innovation Centers, over 12,000 AWS certified engineers, and proven migration competency across financial services and telecom.
                  </p>
                  <div className="text-xs font-bold text-gray-900">12,000+ Certified Associates</div>
                </div>

                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-md">
                  <div className="h-10 font-black text-xl text-gray-900 flex items-center mb-4">
                    Microsoft Azure
                  </div>
                  <span className="px-2.5 py-1 bg-red-50 text-[#DE0826] font-bold text-xs rounded mb-3 inline-block">
                    Azure Expert MSP
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    Inner Circle Partner for business applications, Azure OpenAI enterprise integrations, and specialized zero-trust security managed services.
                  </p>
                  <div className="text-xs font-bold text-gray-900">Top-Tier Global Partner</div>
                </div>

                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-md">
                  <div className="h-10 font-black text-xl text-gray-900 flex items-center mb-4">
                    Google Cloud
                  </div>
                  <span className="px-2.5 py-1 bg-red-50 text-[#DE0826] font-bold text-xs rounded mb-3 inline-block">
                    Premier Partner
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    Recognized for specialized BigQuery data migrations, Vertex AI enterprise applications, and sovereign cloud infrastructure for public sectors.
                  </p>
                  <div className="text-xs font-bold text-gray-900">Vertex AI Specialization</div>
                </div>
              </div>
            </div>
          </section>

          {/* Enterprise Platform Titans */}
          <section className="py-16 bg-[#FAF8F5] border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="mb-10">
                <span className="text-xs font-bold text-[#DE0826] uppercase tracking-widest">
                  Enterprise Software
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
                  Platform Powerhouses
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs">
                  <div className="font-extrabold text-lg text-gray-900 mb-2">SAP</div>
                  <div className="text-xs font-bold text-[#DE0826] mb-2">Global Strategic Partner</div>
                  <p className="text-xs text-gray-600">
                    Accelerating S/4HANA migrations and RISE with SAP for manufacturing, retail, and supply chain enterprises.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs">
                  <div className="font-extrabold text-lg text-gray-900 mb-2">Salesforce</div>
                  <div className="text-xs font-bold text-[#DE0826] mb-2">Summit Tier Partner</div>
                  <p className="text-xs text-gray-600">
                    Transforming customer journeys with Agentforce, Service Cloud, and Data Cloud for omni-channel loyalty.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs">
                  <div className="font-extrabold text-lg text-gray-900 mb-2">ServiceNow</div>
                  <div className="text-xs font-bold text-[#DE0826] mb-2">Elite Partner</div>
                  <p className="text-xs text-gray-600">
                    Automating enterprise workflows across IT operations, employee experience, and customer service desks.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs">
                  <div className="font-extrabold text-lg text-gray-900 mb-2">Cisco</div>
                  <div className="text-xs font-bold text-[#DE0826] mb-2">Gold Certified Partner</div>
                  <p className="text-xs text-gray-600">
                    Enterprise SD-WAN, 5G private campus networks, and integrated multi-cloud cybersecurity architectures.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 8. PORTFOLIO COMPANIES VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'portfolio' && (
        <div className="animate-fadeIn">
          {/* Header Banner */}
          <section className="bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Portfolio Companies</span>
              </div>

              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-[#DE0826] text-xs font-bold rounded uppercase tracking-wider mb-4">
                  Specialized Ecosystem
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Portfolio <span className="text-[#DE0826]">Companies</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Our family of specialized subsidiaries brings boutique agility, iconic Italian styling, financial technology depth, and award-winning creative design backed by enterprise scale.
                </p>
              </div>
            </div>
          </section>

          {/* Portfolio Grid */}
          <section className="py-20 bg-white border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="space-y-12">
                {[
                  {
                    name: 'Pininfarina',
                    tagline: 'Iconic Italian Design & Luxury Mobility Architecture',
                    hq: 'Turin, Italy • Est. 1930',
                    desc: 'The world standard in automotive styling and industrial elegance. Pininfarina combines nearly a century of hypercar craftsmanship with advanced digital cockpit ergonomics, smart architecture, and bespoke product design.',
                    image: '/images/home_racing.jpg',
                    capabilities: ['Luxury Automotive Styling', 'Aerodynamics & Wind Tunnel Testing', 'Smart City Architecture', 'Interior & Industrial Design'],
                  },
                  {
                    name: 'Comviva',
                    tagline: 'Mobile Solutions & Next-Gen Digital Finance',
                    hq: 'New Delhi, India & Dubai, UAE',
                    desc: 'A global leader in digital financial solutions, powering mobile money transfers, digital wallets, and value-added telecommunication services for over 2 billion consumers across 100+ emerging and mature markets.',
                    image: '/images/ind_banking.jpg',
                    capabilities: ['Digital Wallets & Micro-Lending', 'Telecom VAS & Messaging Platforms', 'Customer Value Management', 'Merchant Payment Systems'],
                  },
                  {
                    name: 'Born Group & BIO Agency',
                    tagline: 'Award-Winning Digital Customer Experience & Commerce',
                    hq: 'New York, London & Singapore',
                    desc: 'A premier creative agency blending creative artistry with enterprise e-commerce engineering. Designing unforgettable brand experiences, headless commerce, and omni-channel content ecosystems.',
                    image: '/images/cap_experience.jpg',
                    capabilities: ['Customer Journey Strategy', 'Headless & Composable Commerce', 'Brand Creative & Visual Identity', 'Omnichannel Content Hubs'],
                  },
                  {
                    name: 'Target Group',
                    tagline: 'Fintech Platforms for Enterprise Lending & Servicing',
                    hq: 'Cardiff & London, United Kingdom',
                    desc: 'A leading UK fintech service provider delivering software and operational processing for over £30 Billion in assets, specializing in mortgages, personal lending, and regulatory compliance outsourcing.',
                    image: '/images/ind_privateequity.jpg',
                    capabilities: ['Mortgage Lifecycle Servicing', 'Commercial Lending Engines', 'Regulatory Compliance Automation', 'Loan Origination Software'],
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all"
                  >
                    <div className="lg:col-span-4">
                      <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-8">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="text-2xl font-extrabold text-gray-950">
                          {item.name}
                        </h3>
                        <span className="text-xs font-mono font-bold text-[#DE0826] bg-red-50 px-2.5 py-1 rounded">
                          {item.hq}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">
                        {item.tagline}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-6">
                        {item.desc}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {item.capabilities.map((cap) => (
                          <div
                            key={cap}
                            className="bg-white p-2.5 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-800 text-center"
                          >
                            {cap}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 9. CORPORATE CITIZENSHIP VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'citizenship' && (
        <div className="animate-fadeIn">
          {/* Header Banner */}
          <section className="bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Corporate Citizenship</span>
              </div>

              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-[#DE0826] text-xs font-bold rounded uppercase tracking-wider mb-4">
                  Social Impact & Foundation
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Corporate <span className="text-[#DE0826]">Citizenship</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Believing that true corporate success is inextricably linked with the welfare of society. Through our Foundation, educational institutions, and associate volunteerism, we empower communities to Rise.
                </p>
              </div>
            </div>
          </section>

          {/* Three Core Citizenship Pillars */}
          <section className="py-20 bg-white border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="space-y-16">
                {/* 1. Foundation */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7">
                    <span className="text-xs font-bold text-[#DE0826] uppercase tracking-widest">
                      Pillar 01
                    </span>
                    <h2 className="text-3xl font-extrabold text-gray-950 mt-1 mb-4">
                      Tech Mahindra Foundation / Norstar Foundation
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
                      The corporate social responsibility arm dedicated to youth empowerment, inclusive education, and disability support. Over 150,000 young people have been trained with market-relevant skills, maintaining a verified 75%+ placement track record.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-gray-200">
                        <div className="font-bold text-sm text-gray-950 mb-1">SMART Program</div>
                        <p className="text-xs text-gray-600">
                          Skills-for-Market Training for underprivileged urban youth in healthcare, IT, and retail.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-gray-200">
                        <div className="font-bold text-sm text-gray-950 mb-1">ARISE & ITEP</div>
                        <p className="text-xs text-gray-600">
                          All Round Improvement in School Education and In-service Teacher Education programs.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-red-100">
                      <img
                        src="/images/careers_purpose.jpg"
                        alt="Foundation Initiatives"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Mahindra Educational Institutions */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-10 border-t border-gray-200">
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-red-100">
                      <img
                        src="/images/ind_education.jpg"
                        alt="Mahindra Educational Institutions"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <span className="text-xs font-bold text-[#DE0826] uppercase tracking-widest">
                      Pillar 02
                    </span>
                    <h2 className="text-3xl font-extrabold text-gray-950 mt-1 mb-4">
                      Mahindra Educational Institutions
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
                      Promoting world-class higher education in India through Mahindra University in Hyderabad and École Centrale School of Engineering. Creating future-ready leaders equipped with interdisciplinary engineering, management, and artificial intelligence ethics.
                    </p>
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-gray-200">
                      <div className="font-bold text-sm text-gray-950 mb-1">Interdisciplinary Research & AI Incubators</div>
                      <p className="text-xs text-gray-600">
                        Fostering breakthrough student startups, quantum computing simulations, and sustainable mobility research in collaboration with global universities.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Individual Social Responsibility */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-10 border-t border-gray-200">
                  <div className="lg:col-span-7">
                    <span className="text-xs font-bold text-[#DE0826] uppercase tracking-widest">
                      Pillar 03
                    </span>
                    <h2 className="text-3xl font-extrabold text-gray-950 mt-1 mb-4">
                      Individual Social Responsibility (ISR)
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
                      Every associate is encouraged and supported to dedicate personal time and professional skills to social welfare. Our associates contribute more than 120,000 volunteer hours each year toward environmental greening, digital mentoring for students, and disaster relief.
                    </p>
                    <div className="flex items-center space-x-6">
                      <div>
                        <div className="text-3xl font-extrabold text-[#DE0826]">120K+</div>
                        <div className="text-xs text-gray-600 font-semibold">Volunteer Hours/Year</div>
                      </div>
                      <div className="h-10 w-px bg-gray-300" />
                      <div>
                        <div className="text-3xl font-extrabold text-gray-950">40+</div>
                        <div className="text-xs text-gray-600 font-semibold">Cities Active in ISR</div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-red-100">
                      <img
                        src="/images/careers_diversity.jpg"
                        alt="Employee Volunteering"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 10. CUSTOMER CENTRICITY VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'centricity' && (
        <div className="animate-fadeIn">
          {/* Header Banner */}
          <section className="bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Customer Centricity</span>
              </div>

              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-[#DE0826] text-xs font-bold rounded uppercase tracking-wider mb-4">
                  Customer Centricity Office
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Customer <span className="text-[#DE0826]">Centricity</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Our Customer Centricity Office (CCO) institutionalizes a "Customer First" operating ethos. Every architectural decision, project milestone, and strategic investment is calibrated against client outcomes.
                </p>
              </div>
            </div>
          </section>

          {/* 4-Pillar Operating Framework */}
          <section className="py-20 bg-white border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold text-[#DE0826] uppercase tracking-widest">
                  Operating Model
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 mt-1">
                  The Listen • Learn • Act • Delight Loop
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-[#DE0826] flex items-center justify-center font-bold text-sm mb-4">
                    01
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 mb-2">Listen</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Continuous multi-channel feedback through quarterly CxO dialogues, automated delivery sentiment surveys, and Net Promoter benchmarking.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-[#DE0826] flex items-center justify-center font-bold text-sm mb-4">
                    02
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 mb-2">Learn</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    AI-powered root-cause analysis that identifies operational friction patterns before they impact delivery timelines or SLAs.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-[#DE0826] flex items-center justify-center font-bold text-sm mb-4">
                    03
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 mb-2">Act</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Rapid Action Squads empowered to deploy senior architects, adjust resources, and resolve escalations with 48-hour executive sign-off.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-[#DE0826] flex items-center justify-center font-bold text-sm mb-4">
                    04
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 mb-2">Delight</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Proactive co-innovation value bonuses, executive account sponsorships, and annual client appreciation awards celebrating shared milestones.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 11. NEWS VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'news' && (
        <div className="animate-fadeIn">
          {/* Header Banner */}
          <section className="bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">News & Media</span>
              </div>

              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-[#DE0826] text-xs font-bold rounded uppercase tracking-wider mb-4">
                  Press Releases & Media Center
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  News & <span className="text-[#DE0826]">Press</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Stay informed with the latest corporate press releases, technological breakthroughs, earnings updates, and strategic acquisitions.
                </p>
              </div>
            </div>
          </section>

          {/* Press Releases List */}
          <section className="py-16 bg-white border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="space-y-6">
                {[
                  {
                    date: 'September 2026',
                    category: 'Artificial Intelligence',
                    title: 'Norstar Unveils Next-Generation Agentic AI Enterprise Platform for Autonomous Operations',
                    desc: 'Designed to orchestrate autonomous multi-agent systems across enterprise telecom, banking, and supply chain networks with sovereign safety guardrails.',
                  },
                  {
                    date: 'August 2026',
                    category: 'Industry Recognition',
                    title: 'Norstar Positioned as Leader in 2026 Gartner® Magic Quadrant™ for Public Cloud IT Transformation',
                    desc: 'Evaluated for completeness of vision and high client satisfaction scores in multi-cloud migration and FinOps automation.',
                  },
                  {
                    date: 'July 2026',
                    category: 'Financial Results',
                    title: 'Norstar Reports Q1 FY27 Financial Results with 8.4% YoY Constant Currency Revenue Growth',
                    desc: 'Solid operational execution and strong large deal wins in North America and Europe drive robust margin performance.',
                  },
                  {
                    date: 'June 2026',
                    category: 'Strategic Alliance',
                    title: 'Norstar Expands Hyperscaler Partnership with AWS to Launch Sovereign Generative AI Centers of Excellence',
                    desc: 'Collaborative initiative brings custom foundation model fine-tuning and secure private cloud workflows to Fortune 500 enterprises.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-[#DE0826] uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500 font-mono font-bold">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-950 mb-3 hover:text-[#DE0826] transition-colors cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 12. INVESTOR RELATIONS VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'investors' && (
        <div className="animate-fadeIn">
          {/* Header Banner */}
          <section className="bg-[#FAF8F5] border-b border-gray-200 py-16 md:py-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Investor Relations</span>
              </div>

              <div className="max-w-3xl">
                <div className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-[#DE0826] text-xs font-bold rounded uppercase tracking-wider mb-4">
                  Shareholder Center
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Investor <span className="text-[#DE0826]">Relations</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Delivering sustainable, long-term shareholder value through disciplined capital allocation, robust corporate governance, and steady revenue expansion.
                </p>
              </div>
            </div>
          </section>

          {/* Key Financial Snapshot */}
          <section className="bg-white py-12 border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-[#DE0826] mb-1">$6.5B+</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Annual Revenue (USD)</div>
                  <div className="text-[11px] text-gray-500 mt-1">Consistent High Growth</div>
                </div>
                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-gray-950 mb-1">15.2%</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">EBITDA Margin</div>
                  <div className="text-[11px] text-gray-500 mt-1">Healthy Operating Leverage</div>
                </div>
                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-[#DE0826] mb-1">3.4%</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Dividend Yield</div>
                  <div className="text-[11px] text-gray-500 mt-1">Consistent Shareholder Payouts</div>
                </div>
                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-gray-950 mb-1">AAA</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Credit Rating</div>
                  <div className="text-[11px] text-gray-500 mt-1">Highest Credit Worthiness</div>
                </div>
              </div>
            </div>
          </section>

          {/* Reports & Downloads */}
          <section className="py-20 bg-[#FAF8F5] border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950">
                  Investor Filings & Downloads
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-2">
                  Access comprehensive annual reports, quarterly investor presentations, and audited financial statements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-xs hover:border-[#DE0826] transition-all">
                  <div className="text-xs font-bold text-[#DE0826] uppercase mb-2">FY 2025 - 2026</div>
                  <h3 className="text-xl font-bold text-gray-950 mb-3">Annual Integrated Report</h3>
                  <p className="text-xs text-gray-600 mb-6">
                    Comprehensive review of business performance, ESG achievements, and corporate governance.
                  </p>
                  <button className="text-xs font-bold text-[#DE0826] flex items-center space-x-1 hover:underline cursor-pointer bg-transparent border-0 p-0">
                    <span>Download PDF (4.8 MB)</span>
                    <SubIcon name="arrow-right" className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-xs hover:border-[#DE0826] transition-all">
                  <div className="text-xs font-bold text-[#DE0826] uppercase mb-2">Q1 FY27</div>
                  <h3 className="text-xl font-bold text-gray-950 mb-3">Earnings Call Transcript</h3>
                  <p className="text-xs text-gray-600 mb-6">
                    Management commentary, analyst Q&A session, and forward guidance summary.
                  </p>
                  <button className="text-xs font-bold text-[#DE0826] flex items-center space-x-1 hover:underline cursor-pointer bg-transparent border-0 p-0">
                    <span>Download Transcript (1.2 MB)</span>
                    <SubIcon name="arrow-right" className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-xs hover:border-[#DE0826] transition-all">
                  <div className="text-xs font-bold text-[#DE0826] uppercase mb-2">Investor Deck</div>
                  <h3 className="text-xl font-bold text-gray-950 mb-3">Investor Presentation</h3>
                  <p className="text-xs text-gray-600 mb-6">
                    Strategy roadmap, sector revenue breakdown, Agentic AI investments, and margin drivers.
                  </p>
                  <button className="text-xs font-bold text-[#DE0826] flex items-center space-x-1 hover:underline cursor-pointer bg-transparent border-0 p-0">
                    <span>Download Presentation (8.4 MB)</span>
                    <SubIcon name="arrow-right" className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
