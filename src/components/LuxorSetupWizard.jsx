import React, { useState, useEffect, useRef } from 'react';
import './LuxorSetupWizard.css';

const LuxorSetupWizard = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const contentRef = useRef(null);

  const steps = [
    {
      title: "Create Your Luxor Account",
      content: (
        <div className="wizard-step-content">
          <div className="step-icon">🏗️</div>
          <h3>Step 1: Account Setup</h3>
          <p>Sign up with Luxor and complete account verification.</p>
          <div className="step-instructions">
            <div className="quick-links">
              <h4>Get Started:</h4>
              <ul>
                <li><a href="https://sso.luxor.tech/en/login" target="_blank" rel="noreferrer">Sign up for Luxor</a></li>
              </ul>
            </div>
            <ol>
              <li>Visit the Luxor registration page</li>
              <li>Create your account with a strong password</li>
              <li>Complete email verification</li>
              <li>Enable 2FA for additional security</li>
            </ol>
          </div>
          <div className="step-tip">
            <strong>💡 Pro Tip:</strong> Use a strong password and enable 2FA for security.
          </div>
        </div>
      )
    },
    {
      title: "Provide Account Information",
      content: (
        <div className="wizard-step-content">
          <div className="step-icon">📧</div>
          <h3>Step 2: Share Your Details</h3>
          <p>Send us your Luxor account email so we can create your sub-account.</p>
          <div className="step-instructions">
            <div className="contact-info">
              <h4>Send us your information:</h4>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:hello@hashbranch.com">hello@hashbranch.com</a></li>
                <li><strong>Subject:</strong> "Luxor Sub-Account Setup"</li>
              </ul>
            </div>
            <ol>
              <li>Email us your Luxor account email address</li>
              <li>Include your preferred payout schedule (weekly recommended)</li>
              <li>Provide your Bitcoin wallet address for payouts</li>
              <li>We'll create your sub-account and send an invitation</li>
            </ol>
          </div>
          <div className="step-tip">
            <strong>💡 Pro Tip:</strong> Weekly payouts minimize transaction fees while keeping cash flow regular.
          </div>
        </div>
      )
    },
    {
      title: "Accept Sub-Account Invitation",
      content: (
        <div className="wizard-step-content">
          <div className="step-icon">📨</div>
          <h3>Step 3: Accept Invitation</h3>
          <p>Check your email and accept the sub-account invitation from Hashbranch.</p>
          <div className="step-instructions">
            <ol>
              <li>Check your email for invitation from Luxor</li>
              <li>Click the invitation link to accept</li>
              <li>Log in with your Luxor credentials</li>
              <li>Confirm you want to join the Hashbranch organization</li>
            </ol>
            <div className="invite-list">
              <h4>What you'll get:</h4>
              <ul>
                <li>Access to our sub-account with better pool rates</li>
                <li>Your own dashboard to monitor performance</li>
                <li>Direct communication with our support team</li>
              </ul>
            </div>
          </div>
          <div className="step-tip">
            <strong>💡 Pro Tip:</strong> Check your spam folder if you don't see the invitation email.
          </div>
        </div>
      )
    },
    {
      title: "Configure Payout Settings",
      content: (
        <div className="wizard-step-content">
          <div className="step-icon">💰</div>
          <h3>Step 4: Set Up Payouts</h3>
          <p>Configure your Bitcoin wallet address and payout frequency.</p>
          <div className="step-instructions">
            <ol>
              <li>Navigate to your Luxor dashboard</li>
              <li>Go to Settings → Payout Settings</li>
              <li>Add your Bitcoin wallet address</li>
              <li>Set payout frequency to Weekly (recommended)</li>
              <li>Set minimum payout threshold</li>
            </ol>
            <div className="permissions-list">
              <h4>Recommended Settings:</h4>
              <ul>
                <li><strong>Payout Frequency:</strong> Weekly</li>
                <li><strong>Minimum Payout:</strong> 0.001 BTC</li>
                <li><strong>Wallet Type:</strong> Bitcoin (BTC)</li>
              </ul>
            </div>
          </div>
          <div className="step-tip">
            <strong>💡 Pro Tip:</strong> Weekly payouts balance regular income with lower transaction fees.
          </div>
        </div>
      )
    },
    {
      title: "Complete & Get Support",
      content: (
        <div className="wizard-step-content">
          <div className="step-icon">🤝</div>
          <h3>Step 5: Complete! Need Help?</h3>
          <p>You're all set! Contact Hashbranch anytime for assistance with your mining setup.</p>
          <div className="step-instructions">
            <h4>What's Next:</h4>
            <ul>
              <li>Start mining with your ASIC hardware</li>
              <li>Monitor performance through your Luxor dashboard</li>
              <li>Receive weekly Bitcoin payouts</li>
              <li>Contact us for any optimization needs</li>
            </ul>
            
            <div className="contact-info">
              <h4>Need Help? We're Here!</h4>
              <p><strong>Email:</strong> <a href="mailto:hello@hashbranch.com">hello@hashbranch.com</a></p>
              <p><strong>Services:</strong> Pool optimization, hardware monitoring, payout assistance, and 24/7 support</p>
              <div className="step-tip">
                <strong>💡 Pro Tip:</strong> Bookmark your Luxor dashboard and set up notifications for payout confirmations.
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
    } else {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  // Check if content is scrollable and add class
  useEffect(() => {
    if (contentRef.current) {
      const checkScrollable = () => {
        const element = contentRef.current;
        if (element.scrollHeight > element.clientHeight) {
          element.classList.add('scrollable');
        } else {
          element.classList.remove('scrollable');
        }
      };
      
      checkScrollable();
      // Check again after a short delay to ensure content is rendered
      const timeout = setTimeout(checkScrollable, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentStep, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="wizard-overlay">
      <div className="wizard-modal">
        <div className="wizard-header">
          <h2>Luxor Setup Wizard</h2>
          <button className="wizard-close" onClick={onClose}>×</button>
        </div>
        
        <div className="wizard-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="step-indicators">
            {steps.map((step, index) => (
              <button
                key={index}
                className={`step-indicator ${index === currentStep ? 'active' : ''} ${completedSteps.has(index) ? 'completed' : ''}`}
                onClick={() => handleStepClick(index)}
              >
                {completedSteps.has(index) ? '✓' : index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="wizard-content" ref={contentRef}>
          {steps[currentStep].content}
        </div>

        <div className="wizard-footer">
          <button className="wizard-btn secondary" onClick={handleSkip}>
            Skip Guide
          </button>
          <div className="wizard-nav">
            <button 
              className="wizard-btn secondary" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button className="wizard-btn primary" onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxorSetupWizard;
