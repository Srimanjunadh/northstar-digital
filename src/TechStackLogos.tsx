import React from 'react'

export interface TechItem {
  name: string
  icon: React.ReactNode
}

export const upperTechStack: TechItem[] = [
  {
    name: 'TypeScript',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="8" fill="#3178C6" />
        <path
          d="M26.5 24.5V36H22V24.5H16V20.5H32.5V24.5H26.5ZM39.8 23.8C38.6 23.3 37.3 23 35.8 23C34.4 23 33.4 23.3 32.7 23.8C32.1 24.3 31.8 25 31.8 25.8C31.8 26.6 32.1 27.2 32.8 27.7C33.5 28.1 34.6 28.5 36.1 28.9C38.3 29.5 39.9 30.2 40.9 31.1C41.9 32 42.4 33.3 42.4 34.9C42.4 36.6 41.7 38 40.4 39.1C39.1 40.2 37.3 40.7 35 40.7C33.1 40.7 31.3 40.3 29.7 39.5L30.9 35.6C32.3 36.4 33.8 36.8 35.3 36.8C36.6 36.8 37.5 36.5 38.1 36C38.7 35.5 39 34.8 39 34C39 33.2 38.7 32.6 38 32.1C37.3 31.7 36.2 31.2 34.7 30.8C32.6 30.2 31.1 29.5 30.2 28.6C29.2 27.7 28.7 26.4 28.7 24.8C28.7 23.2 29.4 21.9 30.7 20.9C31.9 19.9 33.6 19.4 35.7 19.4C37.3 19.4 38.9 19.7 40.4 20.4L39.8 23.8Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: 'Llama 3',
    icon: (
      <svg className="w-11 h-11" viewBox="0 0 48 48" fill="none">
        <path
          d="M13.2 30.8C9.5 30.8 6.5 27.8 6.5 24.1C6.5 20.4 9.5 17.4 13.2 17.4C17.7 17.4 21.4 21.3 24 24.1C21.4 26.9 17.7 30.8 13.2 30.8ZM34.8 17.4C38.5 17.4 41.5 20.4 41.5 24.1C41.5 27.8 38.5 30.8 34.8 30.8C30.3 30.8 26.6 26.9 24 24.1C26.6 21.3 30.3 17.4 34.8 17.4Z"
          stroke="#0668E1"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'Mistral AI',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="10" width="8" height="8" fill="#FF7000" />
        <rect x="34" y="10" width="8" height="8" fill="#FF7000" />
        <rect x="6" y="18" width="16" height="8" fill="#FF7000" />
        <rect x="26" y="18" width="16" height="8" fill="#FF7000" />
        <rect x="6" y="26" width="36" height="8" fill="#FF7000" />
        <rect x="6" y="34" width="10" height="6" fill="#FF7000" />
        <rect x="19" y="34" width="10" height="6" fill="#FF7000" />
        <rect x="32" y="34" width="10" height="6" fill="#FF7000" />
      </svg>
    ),
  },
  {
    name: 'Ollama',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        {/* Cute Alpaca / Llama Outline */}
        <path
          d="M19 12V8M29 12V8M16 16C16 13.8 17.8 12 20 12H28C30.2 12 32 13.8 32 16V22H36C38.2 22 40 23.8 40 26V36C40 38.2 38.2 40 36 40H34V44H28V40H20V44H14V34L12 28L16 26V16Z"
          stroke="#1E1E1E"
          strokeWidth="2.8"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="21" cy="18" r="1.8" fill="#1E1E1E" />
        <circle cx="27" cy="18" r="1.8" fill="#1E1E1E" />
      </svg>
    ),
  },
  {
    name: 'Perplexity',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 6V42M6 24H42M11 11L37 37M37 11L11 37"
          stroke="#20B2AA"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="5" fill="#20B2AA" />
      </svg>
    ),
  },
  {
    name: 'Anthropic',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M16 38L24 10L32 38H26.5L25 32H19L17.5 38H16ZM20.2 27.5H23.8L22 20L20.2 27.5Z"
          fill="#191919"
        />
        <path
          d="M33.5 10H39V38H33.5V10Z"
          fill="#191919"
        />
      </svg>
    ),
  },
  {
    name: 'CrewAI',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="17" stroke="#FF3B30" strokeWidth="4.5" strokeDasharray="80 30" />
        <circle cx="24" cy="24" r="8" fill="#FF3B30" />
      </svg>
    ),
  },
  {
    name: 'DSPy',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <polygon points="24,6 40,15 40,33 24,42 8,33 8,15" fill="#8B0000" />
        <text
          x="24"
          y="28"
          fill="white"
          fontSize="11"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          DSPy
        </text>
      </svg>
    ),
  },
  {
    name: 'AutoGen',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <line x1="16" y1="32" x2="24" y2="16" stroke="#00A4EF" strokeWidth="3" />
        <line x1="32" y1="32" x2="24" y2="16" stroke="#00A4EF" strokeWidth="3" />
        <line x1="16" y1="32" x2="32" y2="32" stroke="#00A4EF" strokeWidth="3" />
        <circle cx="24" cy="16" r="5" fill="#00A4EF" />
        <circle cx="16" cy="32" r="5" fill="#F25022" />
        <circle cx="32" cy="32" r="5" fill="#7FBA00" />
      </svg>
    ),
  },
  {
    name: 'GPT-4o',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M38.5 21.2C38 18.2 36.2 15.6 33.6 14.1C32 13.1 30.1 12.6 28.2 12.6C27.5 12.6 26.8 12.7 26.2 12.9V9.5C26.2 7.6 24.6 6 22.7 6C21.7 6 20.8 6.4 20.1 7.1L12.5 14.7C11.8 15.4 11.4 16.3 11.4 17.3C11.4 18 11.6 18.7 11.9 19.3C10.2 20.6 9 22.6 8.7 24.8C8.3 27.8 9.5 30.8 11.8 32.7V36.5C11.8 38.4 13.4 40 15.3 40C16.3 40 17.2 39.6 17.9 38.9L25.5 31.3C26.2 30.6 26.6 29.7 26.6 28.7C26.6 28 26.4 27.3 26.1 26.7C27.8 25.4 29 23.4 29.3 21.2H38.5Z"
          fill="#101010"
        />
        <circle cx="24" cy="24" r="4" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Claude 3.5',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        {/* Anthropic Warm Terracotta Sunburst Asterisk */}
        <path
          d="M24 6V42M6 24H42M11.3 11.3L36.7 36.7M36.7 11.3L11.3 36.7M17 7.5L31 40.5M31 7.5L17 40.5M7.5 17L40.5 31M7.5 31L40.5 17"
          stroke="#CC5500"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'Gemini Pro',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        {/* Google Gemini 4-Point Radiant Sparkle Star */}
        <path
          d="M24 6C24 15.9 15.9 24 6 24C15.9 24 24 32.1 24 42C24 32.1 32.1 24 42 24C32.1 24 24 15.9 24 6Z"
          fill="url(#gemini-grad)"
        />
        <defs>
          <linearGradient id="gemini-grad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9333EA" />
            <stop offset="0.5" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Python',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M23.5 6C15.5 6 16 9.5 16 9.5L16.1 13H24.2V14.2H13.2C9.5 14.2 6 16.5 6 22C6 27.5 9.1 27.2 9.1 27.2H12.2V24C12.2 20.3 15.3 20 15.3 20H24.3C27.6 20 28.2 17.5 28.2 15V9.8C28.2 9.8 28.8 6 23.5 6ZM20.8 8.6C21.6 8.6 22.2 9.2 22.2 10C22.2 10.8 21.6 11.4 20.8 11.4C20 11.4 19.4 10.8 19.4 10C19.4 9.2 20 8.6 20.8 8.6Z"
          fill="#3776AB"
        />
        <path
          d="M24.5 42C32.5 42 32 38.5 32 38.5L31.9 35H23.8V33.8H34.8C38.5 33.8 42 31.5 42 26C42 20.5 38.9 20.8 38.9 20.8H35.8V24C35.8 27.7 32.7 28 32.7 28H23.7C20.4 28 19.8 30.5 19.8 33V38.2C19.8 38.2 19.2 42 24.5 42ZM27.2 39.4C26.4 39.4 25.8 38.8 25.8 38C25.8 37.2 26.4 36.6 27.2 36.6C28 36.6 28.6 37.2 28.6 38C28.6 38.8 28 39.4 27.2 39.4Z"
          fill="#FFD43B"
        />
      </svg>
    ),
  },
  {
    name: 'PyTorch',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M27.5 8L25.8 9.7C31.5 13.5 34.5 19.8 33 26.2C31.3 33.4 24.5 38 17.5 36.5C12.8 35.5 9 31.8 7.8 27.2C6.5 22.3 8.2 17.5 12 14.2V9.8C6 13.8 2.8 21.2 4.2 28.5C6.2 38.2 15.5 44.5 25.2 42.8C34.2 41.2 40.8 33.2 39.8 24C39 16.5 34.5 10.5 27.5 8Z"
          fill="#EE4C2C"
        />
        <circle cx="31" cy="13" r="2.8" fill="#EE4C2C" />
      </svg>
    ),
  },
  {
    name: 'LangChain',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="14" width="14" height="20" rx="7" stroke="#10B981" strokeWidth="3.5" />
        <rect x="26" y="14" width="14" height="20" rx="7" stroke="#10B981" strokeWidth="3.5" />
        <line x1="18" y1="24" x2="30" y2="24" stroke="#10B981" strokeWidth="3.5" />
      </svg>
    ),
  },
  {
    name: 'DeepSeek',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M8 28C14 20 22 14 36 12C32 20 28 26 22 34C16 34 11 32 8 28Z"
          fill="#0066FF"
        />
        <circle cx="30" cy="18" r="2.5" fill="white" />
      </svg>
    ),
  },
]

export const lowerTechStack: TechItem[] = [
  {
    name: 'Azure',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M10 38L24 10L30 22L17 38H10ZM25 24L31 12L38 38H30L25 24Z"
          fill="#0078D4"
        />
      </svg>
    ),
  },
  {
    name: 'GCP',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M34 20.5C33.3 15.8 29.3 12 24.5 12C20.8 12 17.5 14.3 16 17.7C11.5 18.5 8 22.4 8 27C8 32 12 36 17 36H34C37.9 36 41 32.9 41 29C41 25.3 38.1 22.1 34 20.5Z"
          fill="#4285F4"
        />
      </svg>
    ),
  },
  {
    name: 'Pinecone',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <rect x="16" y="16" width="16" height="16" rx="2" fill="#111827" />
        <path
          d="M24 8V12M24 36V40M8 24H12M36 24H40M13 13L16 16M32 32L35 35M35 13L32 16M16 32L13 35"
          stroke="#111827"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'Qdrant',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="28" height="28" rx="8" stroke="#DC2626" strokeWidth="4.5" />
        <line x1="28" y1="28" x2="40" y2="40" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Milvus',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 10C16.3 10 10 16.3 10 24C10 31.7 16.3 38 24 38C31.7 38 38 31.7 38 24C38 16.3 31.7 10 24 10Z"
          stroke="#00BFFF"
          strokeWidth="3.8"
        />
        <circle cx="24" cy="24" r="6" fill="#00BFFF" />
      </svg>
    ),
  },
  {
    name: 'Weaviate',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="10" width="5.5" height="28" rx="2.5" transform="rotate(-15 10 10)" fill="#EF4444" />
        <rect x="22" y="8" width="5.5" height="28" rx="2.5" transform="rotate(-15 22 8)" fill="#EF4444" />
        <rect x="34" y="6" width="5.5" height="28" rx="2.5" transform="rotate(-15 34 6)" fill="#EF4444" />
      </svg>
    ),
  },
  {
    name: 'Datadog',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="10" fill="#632CA6" />
        <path
          d="M20 16C16 16 14 18 14 22V28H20V32L26 28H32C34 28 36 26 36 24V20C36 18 34 16 32 16H20Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: 'Confluent',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" stroke="#0072CE" strokeWidth="3.5" />
        <path d="M24 12V36M12 24H36M15 15L33 33M33 15L15 33" stroke="#0072CE" strokeWidth="3" />
      </svg>
    ),
  },
  {
    name: 'Terraform',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <polygon points="10,8 22,14 22,28 10,22" fill="#844FBA" />
        <polygon points="26,16 38,22 38,36 26,30" fill="#844FBA" />
        <polygon points="10,26 22,32 22,46 10,40" fill="#844FBA" />
        <polygon points="26,2 38,8 38,20 26,14" fill="#5C4EE5" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <rect x="12" y="16" width="5" height="5" rx="1" fill="#0db7ed" />
        <rect x="18" y="16" width="5" height="5" rx="1" fill="#0db7ed" />
        <rect x="24" y="16" width="5" height="5" rx="1" fill="#0db7ed" />
        <rect x="18" y="10" width="5" height="5" rx="1" fill="#0db7ed" />
        <rect x="24" y="10" width="5" height="5" rx="1" fill="#0db7ed" />
        <path
          d="M8 23C8 23 10 21 16 21C22 21 26 23 34 23C38 23 42 21 44 19C44 26 39 33 28 33C17 33 8 28 8 23Z"
          fill="#0db7ed"
        />
      </svg>
    ),
  },
  {
    name: 'Kubernetes',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" stroke="#326CE5" strokeWidth="4" />
        <circle cx="24" cy="24" r="5" fill="#326CE5" />
        <path
          d="M24 8V19M24 29V40M8 24H19M29 24H40"
          stroke="#326CE5"
          strokeWidth="3.2"
        />
      </svg>
    ),
  },
  {
    name: 'React',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="24" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="2.8" />
        <ellipse cx="24" cy="24" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="2.8" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="2.8" transform="rotate(120 24 24)" />
        <circle cx="24" cy="24" r="3.5" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        {/* PostgreSQL Elephant outline */}
        <path
          d="M24 10C17 10 12 14 12 20C12 24 14 26 15 28C14 31 12 34 9 36C13 36 17 34 19 32C20.5 32.5 22.2 33 24 33C31 33 36 29 36 23C36 15 31 10 24 10ZM24 28C22 28 20 26 20 24C20 22 22 20 24 20C26 20 28 22 28 24C28 26 26 28 24 28Z"
          fill="#336791"
        />
      </svg>
    ),
  },
  {
    name: 'AWS',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <text
          x="24"
          y="24"
          fill="#232F3E"
          fontSize="15"
          fontWeight="900"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          aws
        </text>
        <path
          d="M12 29C18 34 30 34 36 29"
          stroke="#FF9900"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M34 28L37 29L35 32"
          stroke="#FF9900"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'vLLM',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="8" fill="#0F172A" />
        <path d="M12 18L24 32L36 18" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Triton',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="8" fill="#111827" />
        <path
          d="M16 14V34M32 14V34M24 10V38M16 22H32"
          stroke="#76B900"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]
