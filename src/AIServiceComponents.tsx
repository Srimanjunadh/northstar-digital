import { useState, useRef, useEffect, useCallback } from 'react'

export interface AgentProduct {
  slug: string
  name: string
  badge: string
  tagline: string
  description: string
  image: string
  techStack: string[]
  metrics: { value: string; label: string }[]
  features: { title: string; desc: string }[]
}

export const autonomousAgentsData: AgentProduct[] = [
  {
    slug: 'agent-kavacha',
    name: 'Agent Kavacha',
    badge: 'FinTech & Banking AI',
    tagline: 'Real-Time Transaction & Anti-Fraud Monitoring Agent',
    description:
      'Kavacha safeguards payment transactions with AI-powered risk detection, instant alerts, and governed automated response actions in under 50ms latency.',
    image: '/images/ai_agent_kavacha.jpg',
    techStack: ['Kafka', 'PyTorch', 'Vector DB', 'PostgreSQL', 'LangGraph'],
    metrics: [
      { value: '< 45ms', label: 'Scoring Latency' },
      { value: '99.8%', label: 'Precision Rate' },
      { value: '$4.2M+', label: 'Losses Prevented' },
      { value: 'Zero', label: 'False Pos. Friction' },
    ],
    features: [
      {
        title: 'AI-Powered Anomaly Detection',
        desc: 'Detects behavioral irregularities and sophisticated fraud vectors using graph neural networks trained on high-velocity transaction patterns.',
      },
      {
        title: 'Real-Time Step-Up Verification',
        desc: 'Triggers adaptive step-up MFA or automated quarantine queues without interrupting legitimate customer checkouts.',
      },
      {
        title: 'Audit-Proof Regulatory Lineage',
        desc: 'Generates instant explainability reports for every flagged transaction, complying with AML and regulatory mandates.',
      },
    ],
  },
  {
    slug: 'agent-arogya',
    name: 'Agent Arogya',
    badge: 'Healthcare & Clinical AI',
    tagline: 'Clinical Documentation & Ambient Healthcare Copilot',
    description:
      'Ambient clinical listening, automated EHR charting, and diagnostic cross-referencing evaluated with clinician review loops and HIPAA-aligned audit trails.',
    image: '/images/ai_agent_arogya.jpg',
    techStack: ['Claude 3.5', 'FHIR APIs', 'Azure Health', 'Speech-to-Text', 'Whisper'],
    metrics: [
      { value: '-65%', label: 'Charting Overhead' },
      { value: '2.5 hrs', label: 'Saved per Doctor/Day' },
      { value: '99.4%', label: 'Clinical Accuracy' },
      { value: 'HIPAA', label: 'Compliant & Audited' },
    ],
    features: [
      {
        title: 'Ambient Patient-Clinician Listening',
        desc: 'Transcribes consultations in real-time while distinguishing medical dialogue from casual conversation.',
      },
      {
        title: 'Structured EHR SOAP Notes',
        desc: 'Automatically drafts clean, structured clinical notes directly compatible with Epic, Cerner, and FHIR endpoints.',
      },
      {
        title: 'ICD-10 & CPT Code Assistance',
        desc: 'Suggests accurate diagnostic and billing codes with source citation to reduce claim rejections.',
      },
    ],
  },
  {
    slug: 'agent-vidya',
    name: 'Agent Vidya',
    badge: 'Education & Learning AI',
    tagline: 'Adaptive Learning & Educator Workflow Copilot',
    description:
      'Curriculum-grounded personalized tutoring, automated assignment evaluation, and differentiated lesson planning for institutions and digital academies.',
    image: '/images/ind_education.jpg',
    techStack: ['GPT-4o', 'LlamaIndex', 'React', 'ChromaDB', 'Python'],
    metrics: [
      { value: '4.8x', label: 'Student Engagement' },
      { value: '80%', label: 'Grading Time Saved' },
      { value: '100%', label: 'Curriculum Aligned' },
      { value: 'FERPA', label: 'Privacy Compliant' },
    ],
    features: [
      {
        title: 'Curriculum-Grounded Socratic Tutoring',
        desc: 'Provides guided learning prompts without leaking direct answers, adapting difficulty to individual student comprehension.',
      },
      {
        title: 'Automated Diagnostic Feedback',
        desc: 'Evaluates free-form student submissions and pinpoints conceptual misunderstandings with rubric-aligned remarks.',
      },
      {
        title: 'Differentiated Lesson Planning',
        desc: 'Generates multi-tiered lesson plans and assessments tailored to diverse learning speeds and classroom needs.',
      },
    ],
  },
]

export const techStackCategories = [
  {
    category: 'Frameworks & Deep Learning',
    description: 'Foundation libraries for model training, optimization, and edge inference.',
    techs: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'JAX', 'Keras', 'ONNX', 'CUDA'],
  },
  {
    category: 'Language Models & Foundation APIs',
    description: 'Commercial frontier models and self-hosted open-weights architectures.',
    techs: ['GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'Llama 3.3', 'Mistral Large', 'Cohere Command R+', 'Hugging Face', 'Ollama', 'DeepSeek-V3'],
  },
  {
    category: 'Retrieval & Vector Databases',
    description: 'High-dimensional semantic search and hybrid indexing engines for RAG.',
    techs: ['LangChain', 'LlamaIndex', 'Pinecone', 'Weaviate', 'Milvus', 'Qdrant', 'ChromaDB', 'LangGraph', 'pgvector'],
  },
  {
    category: 'MLOps & Production Serving',
    description: 'Low-latency inference serving, container orchestration, and continuous observability.',
    techs: ['vLLM', 'Triton Inference', 'MLflow', 'Kubeflow', 'Prometheus', 'Grafana', 'Docker', 'Kubernetes', 'Ray'],
  },
]

export const deliveryPhases = [
  {
    step: '01',
    title: 'Discovery & Feasibility',
    desc: 'Assess use cases, data readiness, latency constraints, and ROI metrics before building. Define a fixed pilot scope with strict acceptance criteria.',
  },
  {
    step: '02',
    title: 'Architecture & Boundary Design',
    desc: 'Select model routes (commercial vs. open-weight), retrieval strategy (hybrid RAG), and private VPC network boundaries to enforce data residency.',
  },
  {
    step: '03',
    title: 'Implementation & Pipelines',
    desc: 'Deliver ingestion pipelines, vector indexing, inference endpoints, and application integrations with staged validation gates.',
  },
  {
    step: '04',
    title: 'Evaluation & Red-Teaming',
    desc: 'Run regression benchmarks, hallucination stress tests, latency profiling, and security evaluation on held-out question sets.',
  },
  {
    step: '05',
    title: 'Enterprise Integration',
    desc: 'Connect AI services to ERP, CRM, and databases with role-based access control (RBAC), audit logging, and automated rollback switches.',
  },
  {
    step: '06',
    title: 'Continuous MLOps & Observability',
    desc: 'Monitor real-time latency, model drift, token expenditure, and answer quality with automated alerts and regular review cadences.',
  },
]

export const aiFaqs = [
  {
    q: 'Which foundation models and LLMs do you support?',
    a: 'We support all major frontier providers including OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), Google (Gemini 1.5), as well as open-weights models such as Meta Llama 3.3, Mistral, and DeepSeek, hosted securely within your private cloud infrastructure.',
  },
  {
    q: 'How do you prevent model hallucinations and inaccurate outputs?',
    a: 'We implement multi-stage retrieval grounding (hybrid RAG with BM25 + dense vector embeddings), strict JSON schema-constrained generation, negative refusal constraints, and automated evaluation harnesses that continuously benchmark responses against held-out golden datasets.',
  },
  {
    q: 'Can our data remain entirely inside our own private cloud environment?',
    a: 'Yes. We design architectures for complete data sovereignty. Models can be deployed within your private AWS, Azure, or GCP VPC or on-premise GPU clusters with zero external data egress and zero training on your proprietary corporate IP.',
  },
  {
    q: 'What is the typical timeframe for an Applied AI pilot?',
    a: 'Our governed pilots are structured in rapid 4 to 6-week sprints with predefined acceptance criteria. This guarantees you have a working, evaluated, production-ready slice before committing to enterprise-wide rollout.',
  },
  {
    q: 'How do you integrate AI capabilities with existing enterprise systems?',
    a: 'We use secure REST/GraphQL APIs, event-driven streaming (Kafka/RabbitMQ), and enterprise identity layers (OAuth/SAML) with granular role-based access control, ensuring AI outputs flow seamlessly into your CRM, ERP, and internal databases.',
  },
]

// -------------------------------------------------------------
// Autonomous Agents Showcase Component (Strict Right-to-Left Continuous Scrolling Track)
// -------------------------------------------------------------
export function AutonomousAgentsSection({ onExploreCaseStudy }: { onExploreCaseStudy?: (slug: string) => void }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftState, setScrollLeftState] = useState(0)

  const totalCount = autonomousAgentsData.length
  // 4 identical sets for seamless infinite forward looping strictly from right to left
  const loopCards = [
    ...autonomousAgentsData,
    ...autonomousAgentsData,
    ...autonomousAgentsData,
    ...autonomousAgentsData,
  ]

  // Initial mount: position at the start of middle buffer
  useEffect(() => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const cardWidth = container.offsetWidth
    if (cardWidth > 0) {
      container.scrollLeft = totalCount * cardWidth
    }
  }, [totalCount])

  // Scroll forward to a specific agent (always moving forward right-to-left)
  const scrollToAgent = useCallback((targetRelIdx: number) => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const cardWidth = container.offsetWidth
    if (cardWidth <= 0) return

    const currentSlideIdx = Math.round(container.scrollLeft / cardWidth)
    const currentRelIdx = ((currentSlideIdx % totalCount) + totalCount) % totalCount

    let forwardDelta = targetRelIdx - currentRelIdx
    if (forwardDelta <= 0) {
      forwardDelta += totalCount
    }
    const targetSlideIdx = currentSlideIdx + forwardDelta
    container.scrollTo({
      left: targetSlideIdx * cardWidth,
      behavior: 'smooth',
    })
    setActiveIdx(targetRelIdx)
  }, [totalCount])

  // Right-to-Left smooth scroll animation (strictly forward: content moves left ←, next card enters from right)
  const scrollRightToLeft = useCallback(() => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const cardWidth = container.offsetWidth
    if (cardWidth <= 0) return

    container.scrollBy({
      left: cardWidth,
      behavior: 'smooth',
    })
  }, [])

  // Optional step backward if user explicitly clicks previous
  const scrollLeftStep = useCallback(() => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const cardWidth = container.offsetWidth
    if (cardWidth <= 0) return

    container.scrollBy({
      left: -cardWidth,
      behavior: 'smooth',
    })
  }, [])

  // Auto-scroll animation running strictly from RIGHT TO LEFT (never comes back)
  useEffect(() => {
    if (isHovered || isDragging) return
    const timer = setInterval(() => {
      scrollRightToLeft()
    }, 5000)

    return () => clearInterval(timer)
  }, [isHovered, isDragging, scrollRightToLeft])

  // Sync active index and handle seamless infinite forward wrapping without any reverse jump
  const handleScroll = useCallback(() => {
    if (!carouselRef.current || isDragging) return
    const container = carouselRef.current
    const scrollLeft = container.scrollLeft
    const cardWidth = container.offsetWidth
    if (cardWidth <= 0) return

    const slideIdx = Math.round(scrollLeft / cardWidth)
    const normalizedIdx = ((slideIdx % totalCount) + totalCount) % totalCount

    if (normalizedIdx !== activeIdx) {
      setActiveIdx(normalizedIdx)
    }

    // Seamless forward wrap:
    // When scrollLeft crosses the 2nd buffer set, seamlessly reset backward by 1 set width
    // Since the content is identical, the forward right-to-left motion continues smoothly forever without coming back!
    const wrapThreshold = totalCount * 2 * cardWidth
    if (scrollLeft >= wrapThreshold) {
      container.scrollLeft = scrollLeft - totalCount * cardWidth
    } else if (scrollLeft < cardWidth * 0.5) {
      container.scrollLeft = scrollLeft + totalCount * cardWidth
    }
  }, [activeIdx, isDragging, totalCount])

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeftState(carouselRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    carouselRef.current.scrollLeft = scrollLeftState - walk
  }

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      handleScroll()
    }
  }

  return (
    <section id="autonomous-agents" className="py-20 md:py-28 bg-[#090D16] text-white relative overflow-hidden border-b border-gray-800">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#DE0826]/15 via-blue-600/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#DE0826]/20 border border-[#DE0826]/40 rounded-full text-[#DE0826] text-xs font-extrabold uppercase tracking-widest mb-4">
              <span>Autonomous Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
              Enterprise Autonomous <span className="text-[#DE0826]">Agents</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mt-4 font-normal">
              Multi-step autonomous agents with scoped tools, durable execution loops, human handoffs, and operational kill switches designed for mission-critical enterprise workflows.
            </p>
          </div>

          {/* Controls: Slide Counter & Prev/Next Arrows */}
          <div className="flex items-center space-x-4 shrink-0">
            <div className="text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg flex items-center space-x-1.5">
              <span className="text-[#DE0826] font-bold">0{activeIdx + 1}</span>
              <span>/</span>
              <span>0{totalCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={scrollLeftStep}
                aria-label="Previous Agent"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-[#DE0826] hover:border-[#DE0826] text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                ←
              </button>
              <button
                type="button"
                onClick={scrollRightToLeft}
                aria-label="Next Agent (Right-to-Left)"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-[#DE0826] hover:border-[#DE0826] text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Animation Track (Strictly Right to Left, Never Comes Back) */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            handleMouseUpOrLeave()
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          className={`flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-6 lg:gap-8 pb-4 cursor-grab ${
            isDragging ? 'cursor-grabbing select-none' : ''
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loopCards.map((agent, loopIdx) => {
            const relIdx = loopIdx % totalCount
            const isActive = activeIdx === relIdx
            return (
              <div
                key={`${agent.slug}-${loopIdx}`}
                className="w-full shrink-0 snap-center min-w-full"
              >
                <div
                  className={`bg-neutral-900/90 border rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-md transition-all duration-500 ${
                    isActive
                      ? 'border-[#DE0826]/40 shadow-red-950/20'
                      : 'border-white/10 opacity-90'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                      <div>
                        <div className="mb-2">
                          <span className="text-xs font-bold text-[#DE0826] uppercase tracking-wider">
                            {agent.badge}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-3 font-heading">
                          {agent.tagline}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                          {agent.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-4 mb-8">
                          {agent.features.map((feat, i) => (
                            <div key={i} className="flex items-start space-x-3">
                              <div className="w-5 h-5 rounded-full bg-[#DE0826]/20 text-[#DE0826] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                                ✓
                              </div>
                              <div>
                                <h5 className="text-sm font-bold text-white leading-snug">{feat.title}</h5>
                                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{feat.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Metrics Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-black/40 border border-white/5 mb-6">
                          {agent.metrics.map((m, i) => (
                            <div key={i} className="text-center">
                              <div className="text-xl sm:text-2xl font-black text-white">{m.value}</div>
                              <div className="text-[10px] text-gray-400 uppercase font-semibold mt-0.5 tracking-wider">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-xs text-gray-400 font-medium">Stack:</span>
                          {agent.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs rounded bg-white/5 border border-white/10 text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-8 pt-6 border-t border-white/10 flex items-center space-x-4">
                        <button
                          type="button"
                          onClick={() => onExploreCaseStudy?.(agent.slug)}
                          className="inline-flex items-center space-x-2 bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded transition-all shadow-md cursor-pointer"
                        >
                          <span>Explore Agent Architecture</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Media (Clean without badges or overlays) */}
                    <div className="lg:col-span-6">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 shadow-2xl group">
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Scrolling Navigation Indicators */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="text-[#DE0826]">→</span>
            <span>Scrolling strictly right to left · Continuous loop</span>
          </div>

          <div className="flex items-center space-x-2">
            {autonomousAgentsData.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToAgent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIdx === idx ? 'w-8 bg-[#DE0826]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// AI Technology Stack Matrix Component
// -------------------------------------------------------------
export function AITechStackSection() {
  return (
    <section id="ai-tech-stack" className="py-20 md:py-28 bg-[#FAF8F5] text-gray-900 border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#DE0826]">
            Engineering Foundations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-950 mt-2 font-heading">
            Enterprise AI <span className="text-[#DE0826]">Technology Stack</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mt-4 font-normal">
            Production-grade tooling spanning deep learning runtimes, frontier language models, vector indexes, and low-latency MLOps infrastructure.
          </p>
        </div>

        {/* 4-Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {techStackCategories.map((group, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-[#DE0826]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-950 group-hover:text-[#DE0826] transition-colors">
                    {group.category}
                  </h3>
                  <span className="font-mono text-xs text-gray-400 font-bold">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
                  {group.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {group.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-800 hover:bg-[#DE0826] hover:border-[#DE0826] hover:text-white transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 6-Phase Governed Delivery Methodology Component
// -------------------------------------------------------------
export function AIDeliveryProcessSection() {
  return (
    <section id="ai-process" className="py-20 md:py-28 bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#DE0826]">
            Delivery Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-950 mt-2 font-heading">
            6-Stage Governed <span className="text-[#DE0826]">AI Lifecycle</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mt-4 font-normal">
            A repeatable, risk-mitigated delivery discipline that takes enterprise AI initiatives from initial feasibility to hardened production integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {deliveryPhases.map((phase) => (
            <div
              key={phase.step}
              className="bg-[#FAF8F5] border border-gray-200 rounded-xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between hover:border-[#DE0826] hover:shadow-lg transition-all duration-300"
            >
              <div>
                <span className="text-3xl font-black text-[#DE0826]/30 font-mono block mb-2">
                  {phase.step}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-gray-950 mb-2.5 leading-snug">
                  {phase.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {phase.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-400 font-medium">
                <span>Phase {phase.step}</span>
                <span className="text-[#DE0826]">Governed Gate →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// AI FAQs Section Component
// -------------------------------------------------------------
export function AIFAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="ai-faqs" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-gray-200">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#DE0826]">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2 font-heading">
            Enterprise AI Questions & Answers
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Insights on model security, privacy guarantees, hallucination mitigation, and pilot execution.
          </p>
        </div>

        <div className="space-y-4">
          {aiFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-gray-50/70 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-gray-950 pr-4">
                    {faq.q}
                  </span>
                  <span className="text-lg font-bold text-[#DE0826] shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
