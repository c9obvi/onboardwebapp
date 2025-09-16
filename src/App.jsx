import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProgressNav from './components/ProgressNav.jsx'
import NiceHashSetupWizard from './components/NiceHashSetupWizard.jsx'
import LuxorSetupWizard from './components/LuxorSetupWizard.jsx'
import { Requirements, Scenarios, Deployment, Monitoring,  AltMining,  usePageEffects } from './components/Sections.jsx'

const words = ['American','Simple','Secure','Flexible','Profitable','Extended','Efficient',]

function AnimatedWord() {
  const [index, setIndex] = useState(0)
  const longestWord = words.reduce((acc, w) => (w.length > acc.length ? w : acc), words[0])

  useEffect(() => {
    const base = 2200
    const speeds = [base, base, base-100, base-150, base-200, base-150, base-100, base]
    let t = 0
    let timer = setTimeout(function tick(){
      setIndex((i)=> (i+1) % words.length)
      t = (t+1) % speeds.length
      timer = setTimeout(tick, Math.max(600, speeds[t]))
    }, speeds[0])
    return () => clearTimeout(timer)
  }, [])

  return (
    <span className="animated-word" aria-label="rotating descriptor">
      <span className="sizer">{longestWord}</span>
      <AnimatePresence mode="sync" initial={false}>
        <motion.span
          key={index}
          className="slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function App() {
  usePageEffects()
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [isLuxorWizardOpen, setIsLuxorWizardOpen] = useState(false)

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario)
  }

  const handleOpenWizard = () => {
    setIsWizardOpen(true)
  }

  const handleCloseWizard = () => {
    setIsWizardOpen(false)
  }

  const handleOpenLuxorWizard = () => {
    setIsLuxorWizardOpen(true)
  }

  const handleCloseLuxorWizard = () => {
    setIsLuxorWizardOpen(false)
  }

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-header">
          <div className="hero-badge">Hashbranch Customer Onboarding</div>
          <img 
            src="https://ukzotulynoiiqwkbvjyo.supabase.co/storage/v1/object/public/cdn2/hash%20branch%2050x50%20logo.svg" 
            alt="Hashbranch Logo" 
            className="hero-logo"
          />
        </div>
        <h1 className="hero-title">
          <span className="title-prefix">Welcome to </span>
          <AnimatedWord />
          <br className="title-break" />
          <span className="title-suffix">ASIC Hosting</span>
        </h1>
        <p>
          Your journey from hardware ownership to profitable mining starts here. We'll guide you through our secure, streamlined process to get your ASICs deployed and hashing in our enterprise facility.
        </p>
      </section>

      <div className="main-layout">
        <ProgressNav />
        <main>
          <Requirements />
          <Scenarios onScenarioSelect={handleScenarioSelect} selectedScenario={selectedScenario} />
          <Deployment />
          <Monitoring onOpenLuxorWizard={handleOpenLuxorWizard} />
          <AltMining onOpenWizard={handleOpenWizard} />
        </main>
      </div>
      
      <NiceHashSetupWizard isOpen={isWizardOpen} onClose={handleCloseWizard} />
      <LuxorSetupWizard isOpen={isLuxorWizardOpen} onClose={handleCloseLuxorWizard} />
    </div>
  )
}
