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
    year: '2018',
    title: 'Applied AI & Neural Research Lab Founded',
    description:
      'Established as an elite artificial intelligence collective focused on deep learning, GPU kernel optimization, and high-concurrency stream scoring.',
    tag: 'Foundation',
  },
  {
    year: '2020',
    title: 'First Production Transformer Deployments',
    description:
      'Pioneered parameter-efficient fine-tuning and quantized transformer inference for tier-1 financial and telecommunications institutions.',
    tag: 'Transformer Era',
  },
  {
    year: '2022',
    title: 'Hybrid Dense-Sparse RAG Architecture',
    description:
      'Architected the industry-first multi-modal hybrid retrieval system combining BM25 lexical search with Milvus high-dimensional vector embeddings.',
    tag: 'RAG Innovation',
  },
  {
    year: '2024',
    title: 'Launch of Agent Kavacha & Agent Arogya',
    description:
      'Deployed autonomous multi-step agents in production: sub-45ms transaction fraud defense and ambient clinical EHR listening across 12 hospitals.',
    tag: 'Autonomous Agents',
  },
  {
    year: '2025',
    title: 'Sovereign Zero-Egress VPC AI Mesh',
    description:
      'Engineered complete data sovereignty frameworks allowing Global 2000 enterprises to run frontier LLMs strictly within their private clouds.',
    tag: 'Sovereign AI',
  },
  {
    year: '2026',
    title: 'The Governed Applied AI Studio',
    description:
      'Setting the global benchmark for enterprise AI with guaranteed 4–6 week pilots, deterministic evaluation harnesses, and continuous MLOps telemetry.',
    tag: 'Current Era',
  },
]

// Subtle Isometric Wireframe Pattern matching Homepage BrandPromiseSection
function IsoGridPattern({ id = 'about-iso-pattern', opacity = 'opacity-45' }: { id?: string; opacity?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${opacity} z-0`}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={id}
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
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}

export function AboutUsPage({
  activeSubpage = 'overview',
  onSelectSubpage,
}: AboutUsPageProps) {
  // Timeline state for overview
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(0)
  const currentTimeline = timelineData[selectedTimelineIndex]

  // Filter state for recognition
  const [recognitionFilter, setRecognitionFilter] = useState<'all' | 'analyst' | 'esg' | 'workplace'>('all')
  const [downloadToast, setDownloadToast] = useState<string | null>(null)

  const handleDownloadReport = (title: string, filename: string) => {
    const content = `Northstar Digital - ${title}\nGenerated on: ${new Date().toLocaleDateString()}\nDocument: ${filename}\nStatus: Official Verified Distribution\n\nScale at Speed™ — Co-innovating with global organizations.`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setDownloadToast(`Downloaded: ${title}`)
    setTimeout(() => setDownloadToast(null), 3500)
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen relative">
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B0F19] text-white px-5 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center space-x-3 animate-fadeIn">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold">{downloadToast}</span>
        </div>
      )}
      {/* ------------------------------------------------------------- */}
      {/* 1. CORPORATE OVERVIEW VIEW */}
      {/* ------------------------------------------------------------- */}
      {activeSubpage === 'overview' && (
        <div className="animate-fadeIn">
          {/* Hero Banner - Full-Bleed Photographic Background (Matching Home Page Hero) */}
          <section className="relative w-full overflow-hidden bg-neutral-950 min-h-[520px] lg:min-h-[580px] lg:h-[calc(100vh-140px)] lg:max-h-[800px] flex items-center select-none border-b border-white/10">
            {/* Full-bleed background image */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <img
                src="/images/about_hq.jpg"
                alt="Norstar Global Headquarters Tech Campus"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Gradient overlay for superior contrast and readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/65 to-black/35 pointer-events-none" />

            {/* Main content */}
            <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-16 flex flex-col justify-center h-full">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-xs text-gray-300 mb-6 font-medium tracking-wide">
                <a href="#/home" className="hover:text-white transition-colors">Home</a>
                <span className="text-gray-500">/</span>
                <span className="text-gray-300">About Us</span>
                <span className="text-gray-500">/</span>
                <span className="text-[#DE0826] font-bold">Corporate Overview</span>
              </div>

              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
                  Applied AI <span className="text-[#DE0826]">Engineering</span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-gray-200/90 leading-relaxed font-normal mb-8 max-w-2xl">
                  We are an Applied AI Engineering studio. We design, benchmark, and deploy governed retrieval systems, specialized autonomous agents, and sovereign foundation models for Global 2000 enterprises.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onSelectSubpage('leadership')}
                    className="inline-flex items-center space-x-2 bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded transition-all shadow-lg hover:shadow-red-600/30 cursor-pointer"
                  >
                    <span>Meet Our Leadership</span>
                    <SubIcon name="arrow-right" className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectSubpage('brand')}
                    className="inline-flex items-center space-x-2 border border-white/70 hover:border-white text-white uppercase text-xs sm:text-sm font-semibold tracking-wider px-7 py-3.5 bg-black/30 hover:bg-white/15 transition-all duration-300 backdrop-blur-xs rounded cursor-pointer"
                  >
                    <span>Our Brand & Rise</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Subtle bottom border line */}
            <div className="absolute bottom-0 inset-x-0 h-[1px] bg-white/10 z-20 pointer-events-none" />
          </section>

          {/* Key Enterprise Scale Statistics */}
          <section className="bg-white py-12 border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-[#DE0826] mb-1">500+</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Governed AI Pilots</div>
                  <div className="text-[11px] text-gray-500 mt-1">Production-Hardened Systems</div>
                </div>

                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-gray-950 mb-1">&lt; 45ms</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Scoring Latency</div>
                  <div className="text-[11px] text-gray-500 mt-1">Sub-Second Inline Inference</div>
                </div>

                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-[#DE0826] mb-1">99.8%</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Model Precision</div>
                  <div className="text-[11px] text-gray-500 mt-1">Zero False-Positive Abandonment</div>
                </div>

                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-gray-950 mb-1">Zero</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Data Egress</div>
                  <div className="text-[11px] text-gray-500 mt-1">Sovereign Client VPC Enclaves</div>
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
                  As an Applied AI Engineering studio, we exist to unlock human and computational potential, deploying sovereign, governed, and high-impact artificial intelligence systems across the enterprise.
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
                      Sovereignty & Model Governance
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We deploy models strictly within your private AWS, Azure, GCP VPC or on-premise GPU clusters with zero external data leakage, zero customer IP training, and audit-proof SHAP explainability.
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
                  Our Journey in <span className="text-[#DE0826]">Enterprise AI</span>
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
          <section className="relative bg-[#FAF7F2] border-b border-[#EAE5D9] overflow-hidden py-16 md:py-20">
            <IsoGridPattern id="about-leadership-grid" />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Leadership & Governance</span>
              </div>

              <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Visionary <span className="text-[#DE0826]">Leadership</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Guided by leading AI scientists, systems architects, and governance pioneers, our leadership council guides enterprise organizations from experimental prototypes to mission-critical production deployments.
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
                    "In the era of generative intelligence, competitive dominance belongs to organizations that deploy governed, hallucination-resistant models tied to active production pipelines with measurable ROI."
                  </blockquote>
                  <div>
                    <div className="font-extrabold text-lg text-white">Marcus Vance</div>
                    <div className="text-sm text-gray-300">Chief Technology Officer & AI Studio Lead</div>
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
                  AI Research & Systems Leadership Council
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-2">
                  Meet the researchers, architects, and engineering leaders driving frontier AI models and autonomous agent breakthroughs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: 'Dr. Elena Rostova',
                    role: 'Chief AI Scientist & Head of Research',
                    image: '/images/exec_speaker_left.png',
                    objectPos: 'object-top',
                    desc: 'World-renowned researcher in parameter-efficient fine-tuning (LoRA/QLoRA), dense-sparse retrieval embeddings, and model alignment benchmarks.',
                  },
                  {
                    name: 'Marcus Vance',
                    role: 'Chief Technology Officer & Head of Autonomous Systems',
                    image: '/images/big_thinker_executive.png',
                    objectPos: 'object-top',
                    desc: 'Pioneering multi-step autonomous agent swarms, durable execution state machines, scoped tool calling, and sub-45ms inference serving fabrics.',
                  },
                  {
                    name: 'Vikram Choudhury',
                    role: 'Head of Enterprise RAG & Knowledge Systems',
                    image: '/images/exec_speaker_right.png',
                    objectPos: 'object-top',
                    desc: 'Architecting high-dimensional vector search, hybrid Colbert reranking, permission-aware retrieval, and zero-egress VPC deployments.',
                  },
                  {
                    name: 'Dr. Sarah Jenkins',
                    role: 'VP of AI Safety, Ethics & Red-Teaming',
                    image: '/images/careers_purpose.jpg',
                    objectPos: 'object-center',
                    desc: 'Directs automated hallucination regression benchmarks, safety guardrails, prompt injection defenses, and EU AI Act compliance manifests.',
                  },
                  {
                    name: 'Rohit Anand',
                    role: 'Chief Financial Officer',
                    image: '/images/careers_diversity.jpg',
                    objectPos: 'object-center',
                    desc: 'Oversees capital allocation, GPU cluster infrastructure financing, compute unit economics, and enterprise AI recurring revenue growth.',
                  },
                  {
                    name: 'Atul Soneja',
                    role: 'Chief Operating Officer & Pilot Delivery',
                    image: '/images/thinking_ribbon.jpg',
                    objectPos: 'object-center',
                    desc: 'Drives our governed 4–6 week pilot methodology, ensuring deterministic milestone acceptance, data readiness, and enterprise SLA fulfillment.',
                  },
                  {
                    name: 'Harshvendra Soin',
                    role: 'Global AI Ecosystem Alliances Director',
                    image: '/images/case_consult.jpg',
                    objectPos: 'object-center',
                    desc: 'Manages strategic co-engineering partnerships with NVIDIA, OpenAI, Anthropic, Milvus / Zilliz & Vector Search Vertex AI, and AWS Bedrock.',
                  },
                  {
                    name: 'Biren Sen',
                    role: 'Chief MLOps & Platform Officer',
                    image: '/images/cap_hero.jpg',
                    objectPos: 'object-center',
                    desc: 'Leads distributed GPU serving clusters (vLLM, Triton), automated circuit breakers, token telemetry, and 24/7 cluster health monitoring.',
                  },
                ].map((exec) => (
                  <div
                    key={exec.name}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#DE0826] transition-all group flex flex-col"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden relative">
                      <img
                        src={exec.image}
                        alt={exec.name}
                        className={`w-full h-full object-cover ${exec.objectPos || 'object-top'} origin-top group-hover:scale-105 transition-transform duration-500`}
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
          <section className="relative bg-[#FAF7F2] border-b border-[#EAE5D9] overflow-hidden py-16 md:py-20">
            <IsoGridPattern id="about-brand-grid" />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Our Brand</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                    The Northstar AI Promise: <span className="text-[#DE0826]">Governed Intelligence</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal mb-8 max-w-xl">
                    We believe artificial intelligence should never be an unpredictable black box. We engineer deterministic guardrails, citation-grounded retrieval, and sub-45ms execution into every enterprise system.
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="aspect-[16/11] rounded-2xl overflow-hidden shadow-xl border-2 border-red-100">
                    <img
                      src="/images/ai_hero_neural.jpg"
                      alt="Enterprise Digital Transformation"
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
                  Engineering Standards
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 mt-2">
                  Three Pillars of Applied AI Engineering
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DE0826] flex items-center justify-center font-extrabold text-lg mb-6">
                    01
                  </div>
                  <h3 className="text-2xl font-bold text-gray-950 mb-3">
                    Zero-Hallucination Grounding
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    We mandate strict multi-stage retrieval grounding, dense-sparse lexical verification, and negative refusal constraints to eliminate hallucination in mission-critical applications.
                  </p>
                  <div className="text-xs font-bold text-[#DE0826]">Breakthrough Mindset</div>
                </div>

                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DE0826] flex items-center justify-center font-extrabold text-lg mb-6">
                    02
                  </div>
                  <h3 className="text-2xl font-bold text-gray-950 mb-3">
                    Sub-45ms Real-Time Performance
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
          <section className="relative bg-[#FAF7F2] border-b border-[#EAE5D9] overflow-hidden py-16 md:py-20">
            <IsoGridPattern id="about-sustainability-grid" />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Sustainability & ESG</span>
              </div>

              <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Green Compute & <span className="text-[#DE0826]">Energy-Efficient AI</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Pioneering energy-efficient machine intelligence through model distillation, FP8 quantization, carbon-aware inference routing, and serverless scale-to-zero GPU clusters.
                </p>
              </div>
            </div>
          </section>

          {/* Key ESG Accolades & Badges */}
          <section className="bg-white py-12 border-b border-gray-200">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-red-50/30 rounded-xl border border-red-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#DE0826] text-white flex items-center justify-center shrink-0">
                    <SubIcon name="award" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-950">FP8 / INT4 Quant.</div>
                    <div className="text-xs font-semibold text-[#DE0826]">-65% Energy Draw</div>
                    <p className="text-[11px] text-gray-600 mt-1">Quantized serving reduces thermal wattage and carbon output per million tokens.</p>
                  </div>
                </div>

                <div className="p-6 bg-red-50/30 rounded-xl border border-red-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#DE0826] text-white flex items-center justify-center shrink-0">
                    <SubIcon name="zap" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-950">Scale-to-Zero</div>
                    <div className="text-xs font-semibold text-[#DE0826]">Zero Idle GPU Wattage</div>
                    <p className="text-[11px] text-gray-600 mt-1">Serverless inference fabrics spin down inactive GPU pods to eliminate idle power draw.</p>
                  </div>
                </div>

                <div className="p-6 bg-red-50/30 rounded-xl border border-red-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#DE0826] text-white flex items-center justify-center shrink-0">
                    <SubIcon name="globe" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-950">Clean Energy GPUs</div>
                    <div className="text-xs font-semibold text-[#DE0826]">100% Hydro/Geothermal</div>
                    <p className="text-[11px] text-gray-600 mt-1">Batch model fine-tuning and evaluation clusters routed exclusively to renewable datacenters.</p>
                  </div>
                </div>

                <div className="p-6 bg-red-50/30 rounded-xl border border-red-100 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#DE0826] text-white flex items-center justify-center shrink-0">
                    <SubIcon name="shield" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-950">DJSI Emerging</div>
                    <div className="text-xs font-semibold text-[#DE0826]">Sustainability Index</div>
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
                  <div className="text-xs font-bold text-[#DE0826] uppercase tracking-wider mb-2">
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
                      <SubIcon name="check" className="w-3.5 h-3.5 text-[#DE0826]" />
                      <span>Eco-designed software architecture</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SubIcon name="check" className="w-3.5 h-3.5 text-[#DE0826]" />
                      <span>Zero-waste-to-landfill certified facilities</span>
                    </li>
                  </ul>
                </div>

                <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-xs">
                  <div className="text-xs font-bold text-[#DE0826] uppercase tracking-wider mb-2">
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
                      <SubIcon name="check" className="w-3.5 h-3.5 text-[#DE0826]" />
                      <span>Net water-positive campus infrastructure</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SubIcon name="check" className="w-3.5 h-3.5 text-[#DE0826]" />
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
          <section className="relative bg-[#FAF7F2] border-b border-[#EAE5D9] overflow-hidden py-16 md:py-20">
            <IsoGridPattern id="about-recognition-grid" />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Awards & Recognition</span>
              </div>

              <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Global <span className="text-[#DE0826]">Recognition</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Our breakthrough work in Retrieval-Augmented Generation (RAG), autonomous multi-agent systems, and low-latency model serving has established Northstar as the premier Applied AI benchmark.
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
                    subtitle: 'Enterprise AI & Applied RAG Engineering',
                    desc: 'Positioned in the Leaders quadrant for completeness of vision in hybrid vector search, hallucination regression gates, and governed pilot delivery.',
                    year: '2025 - 2026',
                  },
                  {
                    category: 'analyst',
                    issuer: 'Everest Group',
                    title: 'PEAK Matrix® Leader',
                    subtitle: 'Generative AI Services & Autonomous Agents',
                    desc: 'Recognized as a Leader for production agent swarms, clinical EHR ambient listening copilots, and real-time transaction defense.',
                    year: '2025',
                  },
                  {
                    category: 'analyst',
                    issuer: 'HFS Research',
                    title: 'Horizon 3 Market Leader',
                    subtitle: 'Applied Cognitive Systems & MLOps Platforms',
                    desc: 'Ranked in the top echelon for zero-egress private cloud foundation model deployments and sub-45ms inference latency.',
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
          <section className="relative bg-[#FAF7F2] border-b border-[#EAE5D9] overflow-hidden py-16 md:py-20">
            <IsoGridPattern id="about-customer-speak-grid" />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Customer Speak</span>
              </div>

              <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Customer <span className="text-[#DE0826]">Speak</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Discover how enterprise CISOs, Chief Medical Officers, and Heads of AI deploy Agent Kavacha, Agent Arogya, and our Enterprise RAG Mesh to eliminate risk and unlock operational leverage.
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
                  Enterprise CxO Perspectives on Production AI
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-2">
                  Verifiable outcomes from technology leaders who trust Northstar AI in mission-critical environments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    industry: 'Telecommunications',
                    quote:
                      'Agent Kavacha changed how our risk team operates. We stopped chasing false positives and gained a real-time autonomous shield that evaluates every transaction in under 38ms with 99.8% precision.',
                    author: 'Chief Information Officer',
                    org: 'Apex Global Payments & FinTech',
                  },
                  {
                    industry: 'Enterprise Cloud & Digital Engineering',
                    quote:
                      'Norstar Digital transformed our core business infrastructure into an agile, cloud-native digital mesh. Their engineering rigor, delivery velocity, and commitment to zero downtime set a gold standard for digital consulting.',
                    author: 'Chief Technology Officer',
                    org: 'Global Fortune 100 Technology Group',
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
          <section className="relative bg-[#FAF7F2] border-b border-[#EAE5D9] overflow-hidden py-16 md:py-20">
            <IsoGridPattern id="about-partners-grid" />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Partners Ecosystem</span>
              </div>

              <div className="max-w-3xl">
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
                    NVIDIA AI Enterprise
                  </div>
                  <span className="px-2.5 py-1 bg-red-50 text-[#DE0826] font-bold text-xs rounded mb-3 inline-block">
                    Elite Technology Alliance
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    Joint engineering on DGX SuperPOD architectures, Triton Inference Server optimization, and TensorRT-LLM low-latency acceleration.
                  </p>
                  <div className="text-xs font-bold text-gray-900">DGX & Triton Co-Engineered</div>
                </div>

                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-md">
                  <div className="h-10 font-black text-xl text-gray-900 flex items-center mb-4">
                    Microsoft Azure
                  </div>
                  <span className="px-2.5 py-1 bg-red-50 text-[#DE0826] font-bold text-xs rounded mb-3 inline-block">
                    Frontier LLM Alliance
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    Enterprise private endpoints, zero-data retention agreements, and schema-constrained structured outputs on Claude 3.5 Sonnet and GPT-4o.
                  </p>
                  <div className="text-xs font-bold text-gray-900">Zero-Retention Private APIs</div>
                </div>

                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#DE0826] transition-all hover:shadow-md">
                  <div className="h-10 font-black text-xl text-gray-900 flex items-center mb-4">
                    Milvus / Zilliz & Vector Search
                  </div>
                  <span className="px-2.5 py-1 bg-red-50 text-[#DE0826] font-bold text-xs rounded mb-3 inline-block">
                    High-Dimensional Vector Alliance
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
          <section className="relative bg-[#FAF7F2] border-b border-[#EAE5D9] overflow-hidden py-16 md:py-20">
            <IsoGridPattern id="about-portfolio-grid" />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Portfolio Companies</span>
              </div>

              <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 mb-6 leading-tight">
                  Applied AI <span className="text-[#DE0826]">Platforms & Products</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  Our catalog of enterprise-grade AI platforms combines production-tested autonomous agents, high-dimensional vector search meshes, and low-latency MLOps serving stacks.
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
                    name: 'Agent Kavacha Platform',
                    tagline: 'Autonomous Real-Time Anti-Fraud & Transaction Defense',
                    hq: 'FinTech & Banking AI • Sub-45ms Latency',
                    desc: 'The global benchmark in autonomous financial crime defense and high-velocity transaction security. Agent Kavacha Platform protects Tier-1 global banks and fintech networks with sub-45ms real-time fraud mitigation, neural transaction lineage, and automated regulatory reporting.',
                    image: '/images/ai_agent_kavacha.jpg',
                    capabilities: ['Real-Time Transaction Defense', 'Algorithmic Anti-Money Laundering', 'Adaptive Biometric Verification', 'Zero-Downtime Payment Mesh'],
                  },
                  {
                    name: 'Agent Arogya Healthcare Suite',
                    tagline: 'Ambient Clinical Consultation Listening & EHR Charting',
                    hq: 'Healthcare & Clinical AI • HIPAA Audited',
                    desc: 'Ambient clinical listening copilot powered by medical foundation models. Eliminates doctor pajama time by automatically drafting structured SOAP notes, cross-referencing ICD-10 codes, and syncing via FHIR.',
                    image: '/images/ind_banking.jpg',
                    capabilities: ['Digital Wallets & Micro-Lending', 'Telecom VAS & Messaging Platforms', 'Customer Value Management', 'Merchant Payment Systems'],
                  },
                  {
                    name: 'Northstar Enterprise RAG Mesh',
                    tagline: 'Hybrid Dense-Sparse Vector Search & Source Attribution',
                    hq: 'Knowledge & Semantic Search • < 800ms Query',
                    desc: 'Permission-aware enterprise knowledge engine combining Milvus vector search with lexical BM25 indexing. Guarantees 99.6% answer faithfulness with exact coordinate citations and zero hallucination risk.',
                    image: '/images/cap_experience.jpg',
                    capabilities: ['Customer Journey Strategy', 'Headless & Composable Commerce', 'Brand Creative & Visual Identity', 'Omnichannel Content Hubs'],
                  },
                  {
                    name: 'Northstar MLOps Command Stack',
                    tagline: 'Low-Latency Triton Inference Serving & Model Drift Telemetry',
                    hq: 'Production AI Infrastructure • Kubernetes & Ray',
                    desc: 'Distributed model serving fabrics on Kubernetes and Ray with automated hallucination regression testing, real-time token expenditure monitoring, and automated circuit breaker rollback controls.',
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
          <section className="relative bg-[#FAF7F2] border-b border-[#EAE5D9] overflow-hidden py-16 md:py-20">
            <IsoGridPattern id="about-citizenship-grid" />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Corporate Citizenship</span>
              </div>

              <div className="max-w-3xl">
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
                      Northstar AI Innovation Foundation
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

                {/* 2. Northstar AI Institute & Academy */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-10 border-t border-gray-200">
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-red-100">
                      <img
                        src="/images/ind_education.jpg"
                        alt="Northstar AI Institute & Academy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <span className="text-xs font-bold text-[#DE0826] uppercase tracking-widest">
                      Pillar 02
                    </span>
                    <h2 className="text-3xl font-extrabold text-gray-950 mt-1 mb-4">
                      Northstar AI Institute & Academy
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
                      Promoting world-class AI literacy and engineering talent through university research partnerships. Empowering future-ready leaders in deep learning, LLM safety, and responsible machine intelligence.
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
          <section className="relative bg-[#FAF7F2] border-b border-[#EAE5D9] overflow-hidden py-16 md:py-20">
            <IsoGridPattern id="about-centricity-grid" />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Customer Centricity</span>
              </div>

              <div className="max-w-3xl">
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
          <section className="relative bg-[#FAF7F2] border-b border-[#EAE5D9] overflow-hidden py-16 md:py-20">
            <IsoGridPattern id="about-news-grid" />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">News & Media</span>
              </div>

              <div className="max-w-3xl">
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
                    title: 'Northstar AI Unveils Agent Kavacha: Real-Time Anti-Fraud Agent Scoring 120M+ Transactions in Sub-45ms',
                    desc: 'Protects $4.2B+ in annual transaction flow using graph neural network anomaly detection with zero checkout friction and audit-proof explainability.',
                  },
                  {
                    date: 'August 2026',
                    category: 'Industry Recognition',
                    title: 'Northstar AI Positioned as Leader in 2026 IDC MarketScape for Enterprise RAG & Autonomous Agent Platforms',
                    desc: 'Evaluated for benchmark answer faithfulness in hybrid dense-sparse retrieval, clinical EHR automation, and zero-egress VPC deployments.',
                  },
                  {
                    date: 'July 2026',
                    category: 'Financial Results',
                    title: 'Northstar AI Expands GPU Cluster Infrastructure with NVIDIA H100 & B200 Accelerators for Sovereign Model Serving',
                    desc: 'Provides dedicated zero-egress GPU enclaves for healthcare, defense, and banking clients requiring on-premise foundation model fine-tuning.',
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
          <section className="relative bg-[#FAF7F2] border-b border-[#EAE5D9] overflow-hidden py-16 md:py-20">
            <IsoGridPattern id="about-investors-grid" />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6 font-medium">
                <a href="#/home" className="hover:text-[#DE0826]">Home</a>
                <span>/</span>
                <button onClick={() => onSelectSubpage('overview')} className="hover:text-[#DE0826]">About Us</button>
                <span>/</span>
                <span className="text-[#DE0826] font-bold">Investor Relations</span>
              </div>

              <div className="max-w-3xl">
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
                  <div className="text-3xl md:text-5xl font-extrabold text-[#DE0826] mb-1">$1.2B+</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Enterprise AI Pipeline (USD)</div>
                  <div className="text-[11px] text-gray-500 mt-1">Consistent High Growth</div>
                </div>
                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-gray-950 mb-1">74.8%</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Autonomous Platform Gross Margin</div>
                  <div className="text-[11px] text-gray-500 mt-1">Healthy Operating Leverage</div>
                </div>
                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-[#DE0826] mb-1">3.4x</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">YoY Governed Pilot Growth</div>
                  <div className="text-[11px] text-gray-500 mt-1">Consistent Shareholder Payouts</div>
                </div>
                <div className="px-4">
                  <div className="text-3xl md:text-5xl font-extrabold text-gray-950 mb-1">99.8%</div>
                  <div className="text-xs md:text-sm font-semibold text-gray-800">Enterprise Client Retention</div>
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
                  <button
                    onClick={() => handleDownloadReport('Annual Integrated Report FY 2025-2026', 'Norstar_Annual_Integrated_Report_FY26.pdf')}
                    className="text-xs font-bold text-[#DE0826] flex items-center space-x-1 hover:underline cursor-pointer bg-transparent border-0 p-0"
                  >
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
                  <button
                    onClick={() => handleDownloadReport('Earnings Call Transcript Q1 FY27', 'Norstar_Q1_FY27_Earnings_Call_Transcript.pdf')}
                    className="text-xs font-bold text-[#DE0826] flex items-center space-x-1 hover:underline cursor-pointer bg-transparent border-0 p-0"
                  >
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
                  <button
                    onClick={() => handleDownloadReport('Investor Presentation Strategy Roadmap', 'Norstar_Investor_Deck_FY26_27.pdf')}
                    className="text-xs font-bold text-[#DE0826] flex items-center space-x-1 hover:underline cursor-pointer bg-transparent border-0 p-0"
                  >
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
