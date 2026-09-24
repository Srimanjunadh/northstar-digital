import { useState, useEffect } from 'react'

export type LegalModalType =
  | 'terms'
  | 'privacy'
  | 'cookies'
  | 'cookie-prefs'
  | 'accessibility'
  | 'sitemap'

export interface GlobalModalsProps {
  activeLegalModal: LegalModalType | null
  onCloseLegalModal: () => void
  regionModalOpen: boolean
  onCloseRegionModal: () => void
  selectedRegion: string
  onSelectRegion: (region: string) => void
  cookiePrefs: {
    necessary: boolean
    analytics: boolean
    marketing: boolean
    functional: boolean
  }
  onSaveCookiePrefs: (prefs: {
    necessary: boolean
    analytics: boolean
    marketing: boolean
    functional: boolean
  }) => void
  onNavigate: (route: any, subpage?: any) => void
}

export function GlobalModals({
  activeLegalModal,
  onCloseLegalModal,
  regionModalOpen,
  onCloseRegionModal,
  selectedRegion,
  onSelectRegion,
  cookiePrefs,
  onSaveCookiePrefs,
  onNavigate,
}: GlobalModalsProps) {
  // Local cookie prefs state while editing in modal
  const [localPrefs, setLocalPrefs] = useState(cookiePrefs)
  const [prefsSavedToast, setPrefsSavedToast] = useState(false)

  useEffect(() => {
    setLocalPrefs(cookiePrefs)
  }, [cookiePrefs])

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeLegalModal) onCloseLegalModal()
        if (regionModalOpen) onCloseRegionModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeLegalModal, regionModalOpen, onCloseLegalModal, onCloseRegionModal])

  if (!activeLegalModal && !regionModalOpen) return null

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. REGION & LANGUAGE SELECTOR MODAL */}
      {/* ------------------------------------------------------------- */}
      {regionModalOpen && (
        <div
          onClick={onCloseRegionModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onCloseRegionModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 p-2 text-xl font-bold cursor-pointer border-0 bg-transparent"
              aria-label="Close region selector"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-[#DE0826] text-xs font-bold uppercase tracking-wider mb-2">
              <span>Global Presence</span>
              <span>•</span>
              <span>90+ Countries</span>
            </div>

            <h3 className="text-2xl font-extrabold text-gray-950 mb-2">
              Select Your Global Region & Language
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              Choose your preferred regional edition for localized insights, compliance frameworks, and office contact information.
            </p>

            <div className="space-y-6">
              {/* Region Group: Global */}
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Global Standard
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { label: 'English (Global)', flag: '🌐', code: 'EN-GL' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        onSelectRegion(item.label)
                        onCloseRegionModal()
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedRegion === item.label
                          ? 'border-[#DE0826] bg-red-50/50 text-[#DE0826] font-bold'
                          : 'border-gray-200 hover:border-gray-400 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 text-xs sm:text-sm">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </div>
                      {selectedRegion === item.label && <span className="text-[#DE0826] font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region Group: North America */}
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  North America
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { label: 'United States (English)', flag: '🇺🇸', code: 'EN-US' },
                    { label: 'Canada (English)', flag: '🇨🇦', code: 'EN-CA' },
                    { label: 'Canada (Français)', flag: '🇨🇦', code: 'FR-CA' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        onSelectRegion(item.label)
                        onCloseRegionModal()
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedRegion === item.label
                          ? 'border-[#DE0826] bg-red-50/50 text-[#DE0826] font-bold'
                          : 'border-gray-200 hover:border-gray-400 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 text-xs sm:text-sm">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </div>
                      {selectedRegion === item.label && <span className="text-[#DE0826] font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region Group: Europe */}
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Europe & United Kingdom
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { label: 'United Kingdom (English)', flag: '🇬🇧', code: 'EN-GB' },
                    { label: 'Germany (Deutsch)', flag: '🇩🇪', code: 'DE-DE' },
                    { label: 'France (Français)', flag: '🇫🇷', code: 'FR-FR' },
                    { label: 'Switzerland (Deutsch / English)', flag: '🇨🇭', code: 'DE-CH' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        onSelectRegion(item.label)
                        onCloseRegionModal()
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedRegion === item.label
                          ? 'border-[#DE0826] bg-red-50/50 text-[#DE0826] font-bold'
                          : 'border-gray-200 hover:border-gray-400 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 text-xs sm:text-sm">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </div>
                      {selectedRegion === item.label && <span className="text-[#DE0826] font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region Group: Asia Pacific */}
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Asia Pacific & Middle East
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { label: 'Singapore (English)', flag: '🇸🇬', code: 'EN-SG' },
                    { label: 'Japan (日本語)', flag: '🇯🇵', code: 'JA-JP' },
                    { label: 'Australia (English)', flag: '🇦🇺', code: 'EN-AU' },
                    { label: 'India (English)', flag: '🇮🇳', code: 'EN-IN' },
                    { label: 'United Arab Emirates (English / العربية)', flag: '🇦🇪', code: 'AR-AE' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        onSelectRegion(item.label)
                        onCloseRegionModal()
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedRegion === item.label
                          ? 'border-[#DE0826] bg-red-50/50 text-[#DE0826] font-bold'
                          : 'border-gray-200 hover:border-gray-400 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 text-xs sm:text-sm">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </div>
                      {selectedRegion === item.label && <span className="text-[#DE0826] font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={onCloseRegionModal}
                className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-6 py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. PRIVACY POLICY MODAL */}
      {/* ------------------------------------------------------------- */}
      {activeLegalModal === 'privacy' && (
        <div
          onClick={onCloseLegalModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onCloseLegalModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 p-2 text-xl font-bold cursor-pointer border-0 bg-transparent"
              aria-label="Close privacy policy"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-[#DE0826] text-xs font-bold uppercase tracking-wider mb-2">
              <span>Legal & Compliance</span>
              <span>•</span>
              <span>GDPR, CCPA & ISO/IEC 27001</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-4">
              TokenWave AI Global Privacy Policy
            </h3>
            <div className="text-xs text-gray-500 mb-6 pb-4 border-b border-gray-200">
              Effective Date: January 1, 2026 | Last Updated: March 2026
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <section>
                <h4 className="font-bold text-gray-950 text-base mb-2">1. Scope and Commitment</h4>
                <p>
                  TokenWave AI Limited ("TokenWave AI", "we", "our", or "us") is committed to protecting the privacy, confidentiality, and sovereign custody of all client data, partner telemetry, and individual user information entrusted to our enterprise consulting and cloud engineering platforms.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-gray-950 text-base mb-2">2. Zero-Retention Enterprise AI Principles</h4>
                <p>
                  In delivering applied artificial intelligence, large language model integrations, and autonomous agent swarms, TokenWave AI adheres to strict zero-data-retention standards. <strong>No client data, confidential prompts, proprietary source code, or internal database records are ever used to train or fine-tune public foundation models.</strong> All workloads execute within isolated Virtual Private Clouds (VPCs) or on-premise hardware security modules.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-gray-950 text-base mb-2">3. Information We Collect</h4>
                <p>We collect information only as necessary to provide high-velocity digital services:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Contact & Business Inquiries:</strong> Name, work email address, organization, job title, and service specifications submitted via our contact and consultation portals.</li>
                  <li><strong>Technical Telemetry:</strong> Anonymized log data, browser user-agents, network latency diagnostics, and session duration to ensure resilient load balancing.</li>
                  <li><strong>Candidate Submissions:</strong> Resumes, employment histories, and certifications submitted voluntarily through our Careers portal.</li>
                </ul>
              </section>

              <section>
                <h4 className="font-bold text-gray-950 text-base mb-2">4. International Transfers & GDPR/CCPA Rights</h4>
                <p>
                  Under European General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you retain the right to request access to, rectification of, or permanent deletion of your personal data. Data transfers between our international delivery centers comply with Standard Contractual Clauses (SCCs).
                </p>
              </section>

              <section>
                <h4 className="font-bold text-gray-950 text-base mb-2">5. Privacy Officer Contact</h4>
                <p>
                  To exercise your data privacy rights or submit an inquiry regarding data processing, contact our Global Data Protection Office at: <strong className="text-gray-950">privacy@tokenwaveai.com</strong>.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={onCloseLegalModal}
                className="bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold px-6 py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. TERMS OF USE MODAL */}
      {/* ------------------------------------------------------------- */}
      {activeLegalModal === 'terms' && (
        <div
          onClick={onCloseLegalModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onCloseLegalModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 p-2 text-xl font-bold cursor-pointer border-0 bg-transparent"
              aria-label="Close terms of use"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-[#DE0826] text-xs font-bold uppercase tracking-wider mb-2">
              <span>Legal & Commercial Terms</span>
              <span>•</span>
              <span>Master Service Terms</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-4">
              TokenWave AI Terms of Use
            </h3>
            <div className="text-xs text-gray-500 mb-6 pb-4 border-b border-gray-200">
              Governing Website Usage, Deliverables, and Digital Engagement
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <section>
                <h4 className="font-bold text-gray-950 text-base mb-2">1. Agreement to Terms</h4>
                <p>
                  By accessing or navigating the TokenWave AI website, platforms, whitepapers, or interactive prototypes, you agree to comply with and be bound by these Terms of Use and all applicable laws and regulations.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-gray-950 text-base mb-2">2. Intellectual Property & Deliverables</h4>
                <p>
                  All proprietary frameworks, software architectures, case studies, graphics, and trade dress on this website are the intellectual property of TokenWave AI. Under our enterprise client engagements, customized software artifacts, repository source code, and bespoke models transition to full client ownership as outlined in individual Statements of Work (SOWs).
                </p>
              </section>

              <section>
                <h4 className="font-bold text-gray-950 text-base mb-2">3. Service Commitments and SLAs</h4>
                <p>
                  TokenWave AI delivers enterprise cloud modernization, multi-agent frameworks, and mission-critical microservice architectures backed by contractual Service Level Agreements (up to 99.999% uptime availability for managed clusters). Website content is provided for informational and engagement purposes without implied express warranties.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-gray-950 text-base mb-2">4. Limitation of Liability</h4>
                <p>
                  To the maximum extent permitted by applicable law, TokenWave AI shall not be liable for any indirect, incidental, or consequential damages arising from reliance on public website materials.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-gray-950 text-base mb-2">5. Governing Law</h4>
                <p>
                  These terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={onCloseLegalModal}
                className="bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold px-6 py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                Accept & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. ACCESSIBILITY STATEMENT MODAL */}
      {/* ------------------------------------------------------------- */}
      {activeLegalModal === 'accessibility' && (
        <div
          onClick={onCloseLegalModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onCloseLegalModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 p-2 text-xl font-bold cursor-pointer border-0 bg-transparent"
              aria-label="Close accessibility statement"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-[#DE0826] text-xs font-bold uppercase tracking-wider mb-2">
              <span>Universal Access</span>
              <span>•</span>
              <span>WCAG 2.1 Level AA</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-4">
              Accessibility Conformance Statement
            </h3>

            <div className="space-y-5 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <p>
                TokenWave AI is firmly dedicated to ensuring digital accessibility for people of all abilities. We continuously improve our user interface and apply the Web Content Accessibility Guidelines (WCAG 2.1, Level AA).
              </p>

              <div>
                <h4 className="font-bold text-gray-950 mb-2">Key Conformance Measures:</h4>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Color Contrast:</strong> Text and non-decorative UI elements meet or exceed 4.5:1 contrast ratios.</li>
                  <li><strong>Keyboard Navigation:</strong> All navigation menus, dropdowns, carousels, and forms are fully navigable via standard keyboard controls (Tab, Shift+Tab, Enter, Escape, Arrow keys).</li>
                  <li><strong>Screen Reader Compatibility:</strong> Proper semantic HTML5 tags (`&lt;main&gt;`, `&lt;nav&gt;`, `&lt;header&gt;`, `&lt;footer&gt;`), ARIA roles, and descriptive alternative text for all informational imagery.</li>
                  <li><strong>Motion Controls:</strong> Reduced motion preferences respected across animated carousels and smooth transitions.</li>
                </ul>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="font-bold text-gray-950 mb-1">Accessibility Feedback</div>
                <p className="text-xs text-gray-600">
                  If you encounter an accessibility barrier or need assistance with any content, please contact our Accessibility Remediation Team at <strong className="text-gray-900">accessibility@tokenwaveai.com</strong>.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={onCloseLegalModal}
                className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-6 py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                Close Statement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. COOKIE POLICY MODAL */}
      {/* ------------------------------------------------------------- */}
      {activeLegalModal === 'cookies' && (
        <div
          onClick={onCloseLegalModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onCloseLegalModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 p-2 text-xl font-bold cursor-pointer border-0 bg-transparent"
              aria-label="Close cookie policy"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-[#DE0826] text-xs font-bold uppercase tracking-wider mb-2">
              <span>Transparency & Control</span>
              <span>•</span>
              <span>Cookie Notice</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-4">
              Cookie Notice & Tracking Technologies
            </h3>

            <div className="space-y-5 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <p>
                This Cookie Notice explains how TokenWave AI uses cookies and similar technologies to recognize you when you visit our website, remember your preferences, and safeguard system security.
              </p>

              <div>
                <h4 className="font-bold text-gray-950 mb-1.5">1. What Are Cookies?</h4>
                <p>
                  Cookies are small text files placed on your device by websites that you visit. They are widely used to make websites work efficiently and provide business analytics to site operators.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-950 mb-1.5">2. Cookies We Deploy:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Strictly Necessary:</strong> Essential for routing, CSRF token security, and regional language settings.</li>
                  <li><strong>Performance Analytics:</strong> Aggregated, anonymized page interaction telemetry to optimize site speed.</li>
                  <li><strong>Functional Cookies:</strong> Preserve your customized preferences and form state.</li>
                </ul>
              </div>

              <p>
                You can adjust your cookie settings at any time using our Cookie Preferences panel or via your browser configuration.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => {
                  onCloseLegalModal()
                  // Open cookie preferences
                  setTimeout(() => onNavigate('cookie-prefs'), 100)
                }}
                className="text-xs font-bold text-[#DE0826] hover:underline cursor-pointer border-0 bg-transparent p-0"
              >
                Manage Cookie Preferences →
              </button>
              <button
                onClick={onCloseLegalModal}
                className="bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold px-6 py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 6. COOKIE PREFERENCES MODAL */}
      {/* ------------------------------------------------------------- */}
      {activeLegalModal === 'cookie-prefs' && (
        <div
          onClick={onCloseLegalModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onCloseLegalModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 p-2 text-xl font-bold cursor-pointer border-0 bg-transparent"
              aria-label="Close cookie preferences"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-[#DE0826] text-xs font-bold uppercase tracking-wider mb-2">
              <span>Consent Management</span>
              <span>•</span>
              <span>Privacy Preference Center</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-3">
              Cookie Preferences & Consent
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              Customize which categories of cookies you consent to. Strictly necessary cookies cannot be disabled as they are required for security and core navigation.
            </p>

            <div className="space-y-4">
              {/* Category 1: Strictly Necessary */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-start justify-between">
                <div className="pr-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-950 text-xs sm:text-sm">Strictly Necessary Cookies</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-gray-200 text-gray-700 rounded">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Essential for page routing, session security, form submission, and language persistence.
                  </p>
                </div>
                <div className="text-xs font-bold text-gray-400 select-none">Locked</div>
              </div>

              {/* Category 2: Performance & Analytics */}
              <div className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors flex items-start justify-between">
                <div className="pr-4">
                  <span className="font-bold text-gray-950 text-xs sm:text-sm">Performance & Analytics</span>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Collects aggregated metrics on page load times, device types, and navigation paths to enhance system responsiveness.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={localPrefs.analytics}
                    onChange={(e) => setLocalPrefs({ ...localPrefs, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DE0826]" />
                </label>
              </div>

              {/* Category 3: Functional Cookies */}
              <div className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors flex items-start justify-between">
                <div className="pr-4">
                  <span className="font-bold text-gray-950 text-xs sm:text-sm">Functional & Experience</span>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Remembers your regional edition, preferred view modes, and interactive case study progress.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={localPrefs.functional}
                    onChange={(e) => setLocalPrefs({ ...localPrefs, functional: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DE0826]" />
                </label>
              </div>

              {/* Category 4: Marketing & Personalization */}
              <div className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors flex items-start justify-between">
                <div className="pr-4">
                  <span className="font-bold text-gray-950 text-xs sm:text-sm">Marketing & Partner Telemetry</span>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Assists in measuring the effectiveness of industry summits, webinars, and partner ecosystem integrations.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={localPrefs.marketing}
                    onChange={(e) => setLocalPrefs({ ...localPrefs, marketing: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DE0826]" />
                </label>
              </div>
            </div>

            {prefsSavedToast && (
              <div className="mt-4 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold flex items-center space-x-2">
                <span>✓</span>
                <span>Preferences saved successfully to your browser.</span>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  const allOn = { necessary: true, analytics: true, functional: true, marketing: true }
                  setLocalPrefs(allOn)
                  onSaveCookiePrefs(allOn)
                  setPrefsSavedToast(true)
                  setTimeout(() => {
                    setPrefsSavedToast(false)
                    onCloseLegalModal()
                  }, 1200)
                }}
                className="text-xs font-bold text-gray-700 hover:text-black cursor-pointer border border-gray-300 px-4 py-2.5 rounded-lg"
              >
                Accept All
              </button>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    const essentialOnly = { necessary: true, analytics: false, functional: false, marketing: false }
                    setLocalPrefs(essentialOnly)
                    onSaveCookiePrefs(essentialOnly)
                    setPrefsSavedToast(true)
                    setTimeout(() => {
                      setPrefsSavedToast(false)
                      onCloseLegalModal()
                    }, 1200)
                  }}
                  className="text-xs font-bold text-gray-700 hover:text-black cursor-pointer border border-gray-300 px-4 py-2.5 rounded-lg"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSaveCookiePrefs(localPrefs)
                    setPrefsSavedToast(true)
                    setTimeout(() => {
                      setPrefsSavedToast(false)
                      onCloseLegalModal()
                    }, 1200)
                  }}
                  className="bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold px-6 py-2.5 rounded-lg cursor-pointer transition-colors shadow-sm"
                >
                  Save Custom Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 7. COMPREHENSIVE INTERACTIVE SITEMAP MODAL */}
      {/* ------------------------------------------------------------- */}
      {activeLegalModal === 'sitemap' && (
        <div
          onClick={onCloseLegalModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onCloseLegalModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 p-2 text-xl font-bold cursor-pointer border-0 bg-transparent"
              aria-label="Close sitemap"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-[#DE0826] text-xs font-bold uppercase tracking-wider mb-2">
              <span>Navigation Directory</span>
              <span>•</span>
              <span>Comprehensive Index</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-2">
              TokenWave AI Sitemap
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-8">
              Quickly navigate to any capability, industry solution, research viewpoint, or corporate subpage across the TokenWave AI experience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-xs sm:text-sm">
              {/* Column 1: Core Navigation & About */}
              <div>
                <h4 className="font-extrabold text-gray-950 uppercase tracking-wider text-xs mb-3 pb-2 border-b border-gray-200 text-[#DE0826]">
                  Primary Navigation
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Home Page', route: 'home' },
                    { label: 'Capabilities Overview', route: 'capabilities' },
                    { label: 'Industries We Serve', route: 'industries' },
                    { label: 'Applied AI & Research Insights', route: 'insights' },
                    { label: 'Careers & Engineering Hub', route: 'careers' },
                    { label: 'Contact Global Specialists', route: 'contact' },
                  ].map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => {
                          onCloseLegalModal()
                          onNavigate(link.route)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="text-gray-700 hover:text-[#DE0826] hover:translate-x-1 transition-all text-left bg-transparent border-0 p-0 cursor-pointer flex items-center space-x-1.5"
                      >
                        <span className="text-[#DE0826] text-xs">›</span>
                        <span>{link.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <h4 className="font-extrabold text-gray-950 uppercase tracking-wider text-xs mt-6 mb-3 pb-2 border-b border-gray-200 text-[#DE0826]">
                  Corporate Directory
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Corporate Overview', sub: 'overview' },
                    { label: 'Executive Leadership', sub: 'leadership' },
                    { label: 'Our Brand Story', sub: 'brand' },
                    { label: 'Sustainability & ESG', sub: 'sustainability' },
                    { label: 'Analyst & Industry Recognition', sub: 'recognition' },
                    { label: 'Customer Testimonials', sub: 'customer-speak' },
                  ].map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => {
                          onCloseLegalModal()
                          onNavigate('about', link.sub)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="text-gray-700 hover:text-[#DE0826] hover:translate-x-1 transition-all text-left bg-transparent border-0 p-0 cursor-pointer flex items-center space-x-1.5"
                      >
                        <span className="text-[#DE0826] text-xs">›</span>
                        <span>{link.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: About Subpages & Capabilities */}
              <div>
                <h4 className="font-extrabold text-gray-950 uppercase tracking-wider text-xs mb-3 pb-2 border-b border-gray-200 text-[#DE0826]">
                  Enterprise Ecosystem
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Partners & Hyperscalers', sub: 'partners' },
                    { label: 'Portfolio Companies & Kavacha', sub: 'portfolio' },
                    { label: 'Corporate Citizenship & CSR', sub: 'citizenship' },
                    { label: 'Customer Centricity Council', sub: 'centricity' },
                    { label: 'Newsroom & Media Releases', sub: 'news' },
                    { label: 'Investor Relations & Reports', sub: 'investors' },
                  ].map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => {
                          onCloseLegalModal()
                          onNavigate('about', link.sub)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="text-gray-700 hover:text-[#DE0826] hover:translate-x-1 transition-all text-left bg-transparent border-0 p-0 cursor-pointer flex items-center space-x-1.5"
                      >
                        <span className="text-[#DE0826] text-xs">›</span>
                        <span>{link.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <h4 className="font-extrabold text-gray-950 uppercase tracking-wider text-xs mt-6 mb-3 pb-2 border-b border-gray-200 text-[#DE0826]">
                  Key Service Areas
                </h4>
                <ul className="space-y-2.5">
                  {[
                    'Enterprise Cloud Modernization',
                    'Autonomous Agentic AI',
                    'Zero-Trust Cybersecurity Mesh',
                    'Real-Time FinTech Ledgers',
                    'Data & Knowledge Graphs',
                  ].map((cap) => (
                    <li key={cap}>
                      <button
                        onClick={() => {
                          onCloseLegalModal()
                          onNavigate('capabilities')
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="text-gray-700 hover:text-[#DE0826] hover:translate-x-1 transition-all text-left bg-transparent border-0 p-0 cursor-pointer flex items-center space-x-1.5"
                      >
                        <span className="text-[#DE0826] text-xs">›</span>
                        <span>{cap}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Industries & Legal */}
              <div>
                <h4 className="font-extrabold text-gray-950 uppercase tracking-wider text-xs mb-3 pb-2 border-b border-gray-200 text-[#DE0826]">
                  Target Industries
                </h4>
                <ul className="space-y-2.5">
                  {[
                    'Banking & Capital Markets',
                    'Communications & Media',
                    'Life Sciences & Healthcare',
                    'Retail & Consumer Goods',
                    'Energy & Utilities',
                    'Manufacturing & Logistics',
                  ].map((ind) => (
                    <li key={ind}>
                      <button
                        onClick={() => {
                          onCloseLegalModal()
                          onNavigate('industries')
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="text-gray-700 hover:text-[#DE0826] hover:translate-x-1 transition-all text-left bg-transparent border-0 p-0 cursor-pointer flex items-center space-x-1.5"
                      >
                        <span className="text-[#DE0826] text-xs">›</span>
                        <span>{ind}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <h4 className="font-extrabold text-gray-950 uppercase tracking-wider text-xs mt-6 mb-3 pb-2 border-b border-gray-200 text-[#DE0826]">
                  Legal & Governance
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Privacy Policy', type: 'privacy' as LegalModalType },
                    { label: 'Terms of Use', type: 'terms' as LegalModalType },
                    { label: 'Accessibility Statement', type: 'accessibility' as LegalModalType },
                    { label: 'Cookie Policy', type: 'cookies' as LegalModalType },
                    { label: 'Cookie Preferences', type: 'cookie-prefs' as LegalModalType },
                  ].map((leg) => (
                    <li key={leg.label}>
                      <button
                        onClick={() => {
                          onCloseLegalModal()
                          setTimeout(() => onNavigate(leg.type), 100)
                        }}
                        className="text-gray-700 hover:text-[#DE0826] hover:translate-x-1 transition-all text-left bg-transparent border-0 p-0 cursor-pointer flex items-center space-x-1.5"
                      >
                        <span className="text-[#DE0826] text-xs">›</span>
                        <span>{leg.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={onCloseLegalModal}
                className="bg-[#DE0826] hover:bg-[#BE001D] text-white text-xs font-bold px-6 py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                Close Sitemap
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
