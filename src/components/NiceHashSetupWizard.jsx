import React, { useState, useEffect, useRef } from 'react';
import './NiceHashSetupWizard.css';

const NiceHashSetupWizard = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const contentRef = useRef(null);

  const steps = [
    {
      title: "Create Your NiceHash Account",
      content: (
        <div className="wizard-step-content">
          <div className="step-icon">👤</div>
          <h3>Step 1: Account Setup</h3>
          <p>Sign up with NiceHash and complete KYC (identity verification).</p>
          <div className="step-instructions">
            <div className="quick-links">
              <h4>Quick Links:</h4>
              <ul>
                <li><a href="https://www.nicehash.com/my/register" target="_blank" rel="noreferrer">Sign up for NiceHash</a></li>
                <li><a href="https://www.nicehash.com/" target="_blank" rel="noreferrer">NiceHash Website</a></li>
              </ul>
            </div>
            <ol>
              <li>Visit the NiceHash registration page</li>
              <li>Create your account with a strong password</li>
              <li>Complete identity verification (KYC)</li>
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
      title: "Create Organization & Invite Hashbranch",
      content: (
        <div className="wizard-step-content">
          <div className="step-icon">🏢</div>
          <h3>Step 2: Organization Setup</h3>
          <p>Create a new organization and invite Hashbranch for read-only access.</p>
          <div className="step-instructions">
            <ol>
              <li>Go to <strong>My Settings → My Organizations → Create New Org</strong></li>
              <li>Under <strong>Users and Permissions</strong>, click <strong>Invite User</strong></li>
              <li>Invite these Hashbranch team members:</li>
            </ol>
            <div className="invite-list">
              <div className="invite-item">
                <strong>Email:</strong> <code>hello@hashbranch.com</code>
              </div>
              <div className="invite-item">
                <strong>Email:</strong> <code>tom@hashbranch.com</code>
              </div>
            </div>
          </div>
          <div className="step-tip">
            <strong>🔐 Security:</strong> This gives Hashbranch read-only access to help monitor your mining operations.
          </div>
        </div>
      )
    },
    {
      title: "Configure Permissions",
      content: (
        <div className="wizard-step-content">
          <div className="step-icon">🔑</div>
          <h3>Step 3: Set Permissions</h3>
          <p>Assign the correct permissions for Hashbranch to assist with your mining setup.</p>
          <div className="step-instructions">
            <ol>
              <li>For each invited user, assign these permissions:</li>
            </ol>
            <div className="permissions-list">
              <div className="permission-item">
                <strong>Marketplace</strong> → enable <strong>Manage Pools</strong>
              </div>
              <div className="permission-item">
                <strong>Wallet</strong> → enable <strong>View balances, wallet activities, and deposit addresses</strong>
                <div className="permission-note">
                  <em>(Read-only; no withdrawal rights)</em>
                </div>
              </div>
            </div>
            <ol start="2">
              <li>Save your changes (NiceHash may prompt for password re-entry)</li>
            </ol>
          </div>
          <div className="step-tip">
            <strong>⚠️ Important:</strong> These permissions are read-only for security - Hashbranch cannot withdraw your funds.
          </div>
        </div>
      )
    },
    {
      title: "Set Up Your Rigs",
      content: (
        <div className="wizard-step-content">
          <div className="step-icon">⚙️</div>
          <h3>Step 4: Rig Configuration</h3>
          <p>Create rig profiles in NiceHash for your specific hardware.</p>
          <div className="step-instructions">
            <ol>
              <li>Navigate to <strong>Mining → Rig Manager</strong></li>
              <li>Create rigs according to your hardware type</li>
              <li>Hashbranch can assist with rig profiles for specific algorithms</li>
            </ol>
          </div>
          <div className="step-tip">
            <strong>💡 Tip:</strong> Reach out if you'd like us to prepare and optimize profiles for your rigs.
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
            <div className="contact-info">
              <h4>Contact Us:</h4>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:hello@hashbranch.com">hello@hashbranch.com</a>
              </div>
            </div>
            <p>We're here to help with:</p>
            <ul>
              <li>Rig optimization and configuration</li>
              <li>Algorithm selection and profitability</li>
              <li>Technical troubleshooting</li>
              <li>General mining questions</li>
            </ul>
          </div>
          <div className="step-tip">
            <strong>🚀 Ready to mine:</strong> You're all set! Hashbranch will monitor your operations and help optimize your setup.
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
          <h2>NiceHash Setup Wizard</h2>
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

export default NiceHashSetupWizard;
