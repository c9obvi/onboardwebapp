import React, { useEffect, useRef, useState } from 'react'

function ChecklistItem({ icon, title, details, children }) {
  return (
    <div className="checklist-item">
      <div className="check-icon">{icon}</div>
      <div className="check-content">
        <div className="check-title">{title}</div>
        <div className="check-details">{details}{children}</div>
      </div>
    </div>
  )
}

export function Requirements() {
  return (
    <section id="requirements" className="content-section">
      <div className="section-header">
        <h2 className="section-title">Information We Need to Get Started</h2>
        <p className="section-subtitle">Please gather this information before we begin - it helps us serve you better</p>
      </div>
      <div className="checklist">
        <ChecklistItem icon={<span>✔️</span>} title="Full Name or Business Name" details="Your full name or business name" />
        <ChecklistItem icon={<span>✔️</span>} title="Administrative & Billing Contact" details="Your company name, billing contact person's name, email, and phone number" />
        <ChecklistItem icon={<span>✔️</span>} title="Technical Contact" details="The person who'll handle technical decisions and deployment questions" />
        <ChecklistItem icon={<span>✔️</span>} title="Your Hardware Details" details="Number of miners, models (like S21, S21 XP), and when you'd like them deployed" />
        <ChecklistItem icon={<span>✔️</span>} title="Your Bitcoin Receive Address" details="Where you want your mining rewards sent, plus how often you'd like payouts (we recommend weekly)" />
        <ChecklistItem icon={<span>✔️</span>} title="Mining Pool Email" details="Email address we'll use to create your Luxor mining pool access" />
      </div>
      <div className="callout callout-security">
        <div className="callout-icon">🔐</div>
        <div className="callout-content">
          <div className="callout-title">Critical Security Notice</div>
          <div><strong>Never send us your seed phrases, private keys, or 2FA codes.</strong> We only need your Bitcoin receive address for payouts. If anyone claiming to be Hashbranch asks for private information, <strong>do not share it</strong> — contact logistics@hashbranch.com immediately to verify.</div>
        </div>
      </div>
    </section>
  )
}

export function Scenarios({ onScenarioSelect, selectedScenario }) {
  const [selected, setSelected] = useState(null)

  const handleScenarioSelect = (scenario) => {
    setSelected(scenario)
    onScenarioSelect(scenario)
  }

  // Use the prop if available, otherwise use local state
  const currentSelection = selectedScenario !== null ? selectedScenario : selected

  // After a scenario is chosen, reveal the process section and scroll to it
  useEffect(() => {
    if (currentSelection !== null) {
      const el = document.getElementById('process')
      if (el) {
        // Delay to allow DOM to paint the newly shown section
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }
    }
  }, [currentSelection])

  return (
    <section id="scenarios" className="content-section">
      <div className="section-header">
        <h2 className="section-title">What's Your Current Situation?</h2>
        <p className="section-subtitle">Choose the path that describes where your ASICs are today</p>
        {!currentSelection && (
          <div className="selection-prompt">
            <span className="prompt-icon">👆</span>
            <span className="prompt-text">Click on one of the options below to continue</span>
          </div>
        )}
      </div>
      <div className="scenario-grid">
        {[1,2,3].map((n) => (
          <div key={n} className={`scenario-card ${currentSelection===n?'selected':''} ${!currentSelection?'unselected':''}`} onClick={() => handleScenarioSelect(n)}>
            <div className="scenario-number">{n}</div>
            <h3 className="scenario-title">{n===1? 'I Own My ASICs' : n===2? 'Currently Hosted Elsewhere' : 'Buying Through Hashbranch'}</h3>
            <p className="scenario-description">{n===1? 'Your miners are currently with you, in storage, or ready to ship to our facility.' : n===2? 'Your ASICs are running at another hosting facility and you want to move them to Hashbranch.' : 'You\'re purchasing new ASICs through our procurement service for direct deployment.'}</p>
            <div className="scenario-cta">
              {currentSelection === n ? '✓ Selected' : 'Click to select'}
            </div>
          </div>
        ))}
      </div>

      <section id="process" className="content-section">
        {/* Scenario 1 */}
        <div className={`scenario-content ${currentSelection===1?'active':''}`}> 
          <div className="section-header">
            <h2 className="section-title">Shipping Your ASICs to Our Facility</h2>
            <p className="section-subtitle">Step-by-step guide for customers with ASICs ready to ship</p>
          </div>
          <h3 style={{marginBottom:'var(--space-lg)', color:'var(--text-primary)'}}>Before You Ship</h3>
          <div className="checklist">
            <ChecklistItem icon={<span>✔️</span>} title="Prepare Your Asset List" details={<span>Create a spreadsheet with your ASIC details and send to logistics@hashbranch.com<br/><strong>Include:</strong> Model, Hash Rate, Serial Number</span>} />
            <ChecklistItem icon={<span>✔️</span>} title="Get Your Shipping Address" details="We'll provide the exact facility address and any special label requirements for your boxes or pallets" />
            <ChecklistItem icon={<span>✔️</span>} title="Choose Shipping & Insurance" details={<span>Decide if you want to use our preferred carrier or arrange your own. Set insurance coverage based on your hardware value.<br/><em>If using our shipping service, we'll need total weight and dimensions</em></span>} />
          </div>
          <div className="callout callout-info">
            <div className="callout-icon">📦</div>
            <div className="callout-content">
              <div className="callout-title">Packing Your ASICs Safely</div>
              <div>Use original foam + box when possible. Always secure power cables so they can't damage fans or heatsinks. One miner per box works best. Include a printed copy of your asset list in the first box.</div>
            </div>
          </div>
          <div className="code-block">
            <div className="code-header"><div className="code-title">Email Template: Shipment Notification</div><button className="copy-btn" data-copy-target="#template1">Copy</button></div>
            <pre id="template1" className="code-content">{`To: logistics@hashbranch.com
Subject: Inbound Shipment – [Your Company] – [Number] ASICs – [Carrier/ETA]

Number of boxes/pallets: [#]
Carrier and tracking numbers: [all tracking links/numbers]
Expected arrival: [date and time window]
Shipping from: [city, state, country]
Total declared value: [insurance amount]
Asset list: attached CSV file

Special notes: [any special handling requirements]`}</pre>
          </div>
        </div>

        {/* Scenario 2 */}
        <div className={`scenario-content ${currentSelection===2?'active':''}`}>
          <div className="section-header">
            <h2 className="section-title">Moving ASICs From Another Facility</h2>
            <p className="section-subtitle">Coordinated transfer from your current hosting provider to Hashbranch</p>
          </div>
          <div className="checklist">
            <ChecklistItem icon={<span>✔️</span>} title="Prepare Your Asset List" details="Same format as Scenario 1 - we need to know exactly what equipment to expect" />
            <ChecklistItem icon={<span>✔️</span>} title="Current Facility Details" details="Contact person, email, phone number, and full facility address where your ASICs are currently hosted" />
            <ChecklistItem icon={<span>✔️</span>} title="Signed Authorization Letter" details="Use our template below to authorize equipment release to Hashbranch" />
            <ChecklistItem icon={<span>✔️</span>} title="Choose Freight Coordinator" details="Decide if Hashbranch handles pickup coordination or if your current facility will arrange shipping" />
          </div>
          <div className="code-block">
            <div className="code-header"><div className="code-title">Letter of Authorization Template</div><button className="copy-btn" data-copy-target="#template2">Copy</button></div>
            <pre id="template2" className="code-content">{`Subject: Equipment Release Authorization – [Your Company] → Hashbranch

I, [Your Name/Title], authorize the release of the attached ASIC mining equipment from [Current Facility Name] to Hashbranch's receiving team for redeployment.

Please coordinate directly with Hashbranch (logistics@hashbranch.com) for:
- Pickup timing and logistics
- Packing and palletizing requirements
- Bill of lading preparation

Company: [Your Company]
Contact: [Your Name, Email, Phone]
Equipment list: [attached CSV file]

Authorized Signature: ________________
Date: ________________`}</pre>
          </div>
        </div>

        {/* Scenario 3 */}
        <div className={`scenario-content ${currentSelection===3?'active':''}`}>
          <div className="section-header">
            <h2 className="section-title">ASICs Purchased Through Hashbranch</h2>
            <p className="section-subtitle">End-to-end procurement and deployment - we handle all the logistics</p>
          </div>
          <div className="callout callout-success">
            <div className="callout-icon">✨</div>
            <div className="callout-content">
              <div className="callout-title">White Glove Service</div>
              <div>When you purchase through Hashbranch, we handle everything from vendor coordination to final deployment. You'll receive regular updates but don't need to manage any logistics.</div>
            </div>
          </div>
        </div>
        </section>
    </section>
  )
}

export function Deployment() {
  return (
    <section id="deployment" className="content-section">
      <div className="section-header">
        <h2 className="section-title">What Happens at Our Facility</h2>
        <p className="section-subtitle">From arrival to live mining - here's our proven process</p>
      </div>
      <div className="checklist">
        <ChecklistItem icon={<span>1</span>} title="Arrival & Documentation" details="We photograph all shipments, verify serial numbers against your asset list, and log everything in our tracking system." />
        <ChecklistItem icon={<span>2</span>} title="Intake Testing" details="Every ASIC gets powered on for verification, temperature checks, hashboard detection, and stability testing. Any issues get reported immediately with photos and logs." />
        <ChecklistItem icon={<span>3</span>} title="Rack Installation" details="We schedule deployment by available power lanes and network capacity, then physically install, connect power and network, and validate firmware." />
        <ChecklistItem icon={<span>4</span>} title="Pool & Wallet Setup" details="Your Luxor sub-account gets created and configured with your payout address and frequency preferences." />
        <ChecklistItem icon={<span>5</span>} title="Go-Live Confirmation" details="You receive a 'Hashing Live' email with your worker naming convention, live miner count, and monitoring dashboard links." />
      </div>
    </section>
  )
}

export function Monitoring({ onOpenLuxorWizard }) {
  return (
    <section id="monitoring" className="content-section">
      <div className="section-header">
        <h2 className="section-title">Your Wallet & Mining Pool Setup</h2>
        <p className="section-subtitle">Security-first approach to managing your Bitcoin rewards</p>
      </div>
      <div className="callout callout-security">
        <div className="callout-icon">🛡️</div>
        <div className="callout-content">
          <div className="callout-title">We Protect Your Financial Privacy</div>
          <div><strong>Hashbranch will NEVER ask for your seed phrases, private keys, or 2FA codes.</strong> We only need your Bitcoin receive address to send your mining rewards.</div>
        </div>
      </div>

      <h3 style={{margin:'var(--space-xl) 0 var(--space-lg)', color:'var(--text-primary)'}}>Recommended Wallet Options</h3>
      <div className="checklist">
        <ChecklistItem icon={<span>📱</span>} title="Edge Wallet (Mobile)" details={<span>Open source mobile wallet great for experienced users. <a className="web-app-link" href="https://Edge.app" target="_blank" rel="noreferrer">Download at Edge.app</a> <strong>⚠️ CAUTION:</strong> Self-custodial wallet — guard your password and backup phrase carefully!</span>} />
        <ChecklistItem icon={<span>🔧</span>} title="Hardware Wallets" details="Ledger, Trezor, and similar hardware wallets offer the highest security for larger amounts" />
        <ChecklistItem icon={<span>❌</span>} title="What NOT to Use" details={<span><strong>Avoid exchange hot wallets or custodial accounts for mining payouts.</strong> You should control your private keys.</span>} />
      </div>

      <h3 style={{margin:'var(--space-xl) 0 var(--space-lg)', color:'var(--text-primary)'}}>Mining Pool Access</h3>
      <div className="checklist">
        <ChecklistItem icon={<span>✔️</span>} title="Luxor Sub-Account Creation" details="We create your personalized sub-account and send an invitation to your specified email address" />
        <ChecklistItem icon={<span>✔️</span>} title="Real-Time Dashboard" details="Monitor your workers, hashrate performance, and earning history through your personal dashboard" />
        <ChecklistItem icon={<span>✔️</span>} title="Flexible Payout Schedule" details="Choose weekly payouts (recommended to minimize transaction fees) or daily based on your preference" />
      </div>

      <div className="wizard-trigger-section">
        <div className="wizard-trigger-content">
          <h3>Need Help with Luxor Setup?</h3>
          <p>Follow our step-by-step guide to set up your Luxor sub-account and configure payouts.</p>
          <button className="wizard-trigger-btn" onClick={onOpenLuxorWizard}>
            <span className="wizard-icon">🏗️</span>
            Launch Luxor Setup Wizard
          </button>
        </div>
      </div>
    </section>
  )
}

export function AltMining({ onOpenWizard }) {
  return (
    <section id="alt" className="content-section">
      <div className="section-header">
        <h2 className="section-title">Alt/Scrypt Mining</h2>
        <p className="section-subtitle">For Litecoin/Dogecoin or other Scrypt miners</p>
      </div>

      <div className="callout callout-info">
        <div className="callout-icon">💡</div>
        <div className="callout-content">
          <div className="callout-title">Recommendation: NiceHash</div>
          <div>
            For Scrypt mining, we recommend using <a className="web-app-link" href="https://support.hashbranch.com/hc/en-us/articles/40927210527380-NiceHash-Set-up-Guide" target="_blank" rel="noreferrer">NiceHash</a>.
            It provides a simple setup experience, broad buyer liquidity, and automatic payouts in BTC.
          </div>
        </div>
      </div>

      <div className="wizard-trigger-section">
        <div className="wizard-trigger-content">
          <h3>Need Help Getting Started?</h3>
          <p>Follow our step-by-step guide to set up NiceHash with your ASIC miner.</p>
          <button className="wizard-trigger-btn" onClick={onOpenWizard}>
            <span className="wizard-icon">🧙‍♂️</span>
            Launch Setup Wizard
          </button>
        </div>
      </div>

      {/* <div className="checklist">
        <ChecklistItem icon={<span>1</span>} title="Create Your Account" details={<span>Sign up at <a className="web-app-link" href="https://www.nicehash.com" target="_blank" rel="noreferrer">NiceHash.com</a> and complete account verification.</span>} />
        <ChecklistItem icon={<span>2</span>} title="Add BTC Payout Address" details="Use the same Bitcoin receive address you control (non-custodial recommended)." />
        <ChecklistItem icon={<span>3</span>} title="Configure Your Miner" details={<span>Point your Scrypt miner to the NiceHash Scrypt stratum endpoint and use your NiceHash mining address as the username. Refer to NiceHash pool configuration docs for the latest endpoints and ports.</span>} />
      </div> */}
    </section>
  )
}

export function usePageEffects() {
  useEffect(() => {
    // Intersection observer to reveal sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e)=>{
        if(e.isIntersecting){e.target.classList.add('visible')}
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    document.querySelectorAll('.content-section').forEach(s=>observer.observe(s))

    // Smooth scroll for internal links
    const links = document.querySelectorAll('a[href^="#"]')
    const onClick = (e)=>{
      const href = e.currentTarget.getAttribute('href')
      if (!href) return
      const el = document.querySelector(href)
      if (el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}) }
    }
    links.forEach(l=>l.addEventListener('click', onClick))

    // Note: Active nav highlighting is now handled in ProgressNav component

    // Copy buttons
    const buttons = document.querySelectorAll('.copy-btn')
    const copyHandler = (e)=>{
      const target = e.currentTarget.getAttribute('data-copy-target')
      const el = target && document.querySelector(target)
      const text = el ? el.textContent : ''
      navigator.clipboard.writeText(text).then(()=>{
        const btn = e.currentTarget
        const original = btn.textContent
        btn.textContent = 'Copied!'
        btn.style.background = 'var(--accent-emerald)'
        setTimeout(()=>{ btn.textContent = original; btn.style.background = '' }, 1500)
      })
    }
    buttons.forEach(b=>b.addEventListener('click', copyHandler))

    return ()=>{
      links.forEach(l=>l.removeEventListener('click', onClick))
      buttons.forEach(b=>b.removeEventListener('click', copyHandler))
    }
  }, [])
}


