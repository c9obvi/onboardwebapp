import React, { useState, useEffect } from 'react'

export default function ProgressNav() {
  const [activeStep, setActiveStep] = useState(0)
  const [isProcessVisible, setIsProcessVisible] = useState(false)

  const baseSteps = [
    { id: 'requirements', label: 'Gather Info', number: 1 },
    { id: 'scenarios', label: 'Choose Your Path', number: 2 },
    { id: 'process', label: 'Ship & Deploy', number: 3 },
    { id: 'deployment', label: 'Setup & Testing', number: 4 },
    { id: 'monitoring', label: 'Start Mining', number: 5 },
    { id: 'alt', label: 'Alt/Scrypt Mining', number: 6 }
  ]
  const steps = baseSteps.filter(s => s.id !== 'process' || isProcessVisible).map((step, index) => ({
    ...step,
    number: index + 1
  }))

  useEffect(() => {
    const handleActiveStep = () => {
      const y = window.scrollY + 120
      let currentIndex = 0
      // detect if process section is visible and update state
      const processEl = document.getElementById('process')
      const processVisible = !!processEl && processEl.offsetHeight > 1 && getComputedStyle(processEl).display !== 'none'
      if (processVisible !== isProcessVisible) {
        setIsProcessVisible(processVisible)
      }

      // Use the filtered steps array that matches what's actually rendered
      const visibleSteps = baseSteps.filter(s => s.id !== 'process' || processVisible)

      visibleSteps.forEach((step, index) => {
        const el = document.getElementById(step.id)
        if (!el || el.offsetHeight < 1) return
        const rect = el.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const bottom = top + rect.height
        
        // Check if we're in this section (with some buffer)
        if (y >= top - 50 && y < bottom - 50) {
          currentIndex = index
        } else if (y >= bottom - 50) {
          // If scrolled past, tentatively set to this step; later ones may override
          currentIndex = index
        }
      })
      // Force last step active when user is at (or very near) the bottom of the page
      const scrollBottom = Math.ceil(window.innerHeight + window.scrollY)
      const docHeight = Math.ceil(document.documentElement.scrollHeight)
      if (docHeight - scrollBottom <= 2) {
        currentIndex = visibleSteps.length - 1
      }
      setActiveStep(currentIndex)
    }

    window.addEventListener('scroll', handleActiveStep)
    window.addEventListener('resize', handleActiveStep)
    // Initial check
    handleActiveStep()
    return () => {
      window.removeEventListener('scroll', handleActiveStep)
      window.removeEventListener('resize', handleActiveStep)
    }
  }, [isProcessVisible])

  return (
    <nav className="progress-nav rail" aria-label="Page progress">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <a
            key={step.id}
            href={`#${step.id === 'process' && !isProcessVisible ? 'scenarios' : step.id}`}
            className={`progress-step ${activeStep === index ? 'active' : ''}`}
            aria-label={step.label}
            title={step.label}
          >
            <div className="step-indicator" />
          </a>
        ))}
      </div>
    </nav>
  )
}


