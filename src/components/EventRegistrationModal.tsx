import React, { useState, useEffect, useRef } from 'react';
import './EventRegistrationModal.css';
import { registerForEvent } from '../firebase/eventService';

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventId: string;
  onShowToast?: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

interface FormErrors {
  participantName?: string;
  participantEmail?: string;
  participantPhone?: string;
  general?: string;
}

export default function EventRegistrationModal({ 
  isOpen, 
  onClose, 
  eventName, 
  eventId,
  onShowToast
}: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    participantName: '',
    participantEmail: '',
    participantPhone: '',
    additionalInfo: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    // Name validation
    if (!formData.participantName.trim()) {
      errors.participantName = 'Name is required';
    } else if (formData.participantName.trim().length < 2) {
      errors.participantName = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.participantEmail.trim()) {
      errors.participantEmail = 'Email is required';
    } else if (!emailRegex.test(formData.participantEmail)) {
      errors.participantEmail = 'Please enter a valid email address';
    }
    
    // Phone validation
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!formData.participantPhone.trim()) {
      errors.participantPhone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.participantPhone.replace(/[\s\-()]/g, ''))) {
      errors.participantPhone = 'Please enter a valid phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Focus management and keyboard navigation
  useEffect(() => {
    if (isOpen) {
      // Focus first input when modal opens
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
      
      // Trap focus within modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'Tab') {
          const modal = modalRef.current;
          if (!modal) return;
          
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    setFormErrors({});

    try {
      // Sanitize input data
      const sanitizedData = {
        participantName: formData.participantName.trim(),
        participantEmail: formData.participantEmail.trim().toLowerCase(),
        participantPhone: formData.participantPhone.trim(),
        additionalInfo: formData.additionalInfo.trim()
      };

      // Register for event using Firebase
      await registerForEvent({
        eventId,
        eventName,
        participantName: sanitizedData.participantName,
        participantEmail: sanitizedData.participantEmail,
        participantPhone: sanitizedData.participantPhone,
        additionalInfo: sanitizedData.additionalInfo,
        status: 'pending' as const
      });

      console.log('Registration successful:', {
        eventId,
        eventName,
        participantName: sanitizedData.participantName,
        participantEmail: sanitizedData.participantEmail
      });

      setSuccess(true);
      
      // Show success toast
      onShowToast?.(
        `Successfully registered for ${eventName}! Check your email for confirmation.`,
        'success'
      );
      
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          participantName: '',
          participantEmail: '',
          participantPhone: '',
          additionalInfo: ''
        });
        setFormErrors({});
      }, 2000);

    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to register. Please try again.';
      setError(errorMessage);
      
      // Show error toast
      onShowToast?.(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()} ref={modalRef}>
        <div className="modal-header">
          <h2 id="modal-title">Register for {eventName}</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label="Close registration modal"
            type="button"
          >
            ×
          </button>
        </div>

        {success ? (
          <div className="success-message" role="alert" aria-live="polite">
            <div className="success-icon" aria-hidden="true">✓</div>
            <h3>Registration Successful!</h3>
            <p id="modal-description">You have been registered for {eventName}. We'll send you a confirmation email shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="registration-form" noValidate>
            <div className="form-group">
              <label htmlFor="participantName">Full Name *</label>
              <input
                ref={firstInputRef}
                type="text"
                id="participantName"
                name="participantName"
                value={formData.participantName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className={formErrors.participantName ? 'error' : ''}
                aria-invalid={!!formErrors.participantName}
                aria-describedby={formErrors.participantName ? 'participantName-error' : undefined}
                autoComplete="name"
              />
              {formErrors.participantName && (
                <span id="participantName-error" className="field-error" role="alert">
                  {formErrors.participantName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="participantEmail">Email Address *</label>
              <input
                type="email"
                id="participantEmail"
                name="participantEmail"
                value={formData.participantEmail}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
                className={formErrors.participantEmail ? 'error' : ''}
                aria-invalid={!!formErrors.participantEmail}
                aria-describedby={formErrors.participantEmail ? 'participantEmail-error' : undefined}
                autoComplete="email"
              />
              {formErrors.participantEmail && (
                <span id="participantEmail-error" className="field-error" role="alert">
                  {formErrors.participantEmail}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="participantPhone">Phone Number *</label>
              <input
                type="tel"
                id="participantPhone"
                name="participantPhone"
                value={formData.participantPhone}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
                className={formErrors.participantPhone ? 'error' : ''}
                aria-invalid={!!formErrors.participantPhone}
                aria-describedby={formErrors.participantPhone ? 'participantPhone-error' : undefined}
                autoComplete="tel"
              />
              {formErrors.participantPhone && (
                <span id="participantPhone-error" className="field-error" role="alert">
                  {formErrors.participantPhone}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="additionalInfo">Additional Information</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Any additional information or special requirements"
                rows={3}
                aria-describedby="additionalInfo-help"
              />
              <small id="additionalInfo-help" className="form-help-text">
                Optional: Share any special requirements or additional information
              </small>
            </div>

            {error && (
              <div className="error-message" role="alert" aria-live="polite">
                {error}
              </div>
            )}

            <div className="form-actions">
              <button 
                type="button" 
                onClick={onClose} 
                className="btn-cancel"
                aria-label="Cancel registration"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={isLoading}
                aria-describedby={isLoading ? 'submit-loading' : undefined}
              >
                {isLoading ? 'Registering...' : 'Register Now'}
                {isLoading && <span id="submit-loading" className="sr-only">Please wait while we process your registration</span>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
