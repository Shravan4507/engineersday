import React, { useState, useEffect, useRef, useCallback } from 'react';
import { registerForEvent, type EventRegistrationData } from '../firebase/eventService';
import './RegistrationModal.css';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedEvent?: string;
  onShowToast?: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

interface FormErrors {
  event?: string;
  participationType?: string;
  fullName?: string;
  rollNumber?: string;
  email?: string;
  phone?: string;
  year?: string;
  division?: string;
  member2FullName?: string;
  member2RollNumber?: string;
  member2Email?: string;
  member2Phone?: string;
  member2Year?: string;
  member2Division?: string;
  general?: string;
}

export default function RegistrationModal({ 
  isOpen, 
  onClose, 
  preselectedEvent, 
  onShowToast 
}: RegistrationModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    event: '',
    participationType: '',
    // Participant 1 (always required)
    fullName: '',
    rollNumber: '',
    email: '',
    phone: '',
    year: '',
    division: '',
    // Participant 2 (only for team events)
    member2FullName: '',
    member2RollNumber: '',
    member2Email: '',
    member2Phone: '',
    member2Year: '',
    member2Division: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLSelectElement>(null);

  const handleClose = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setFormData({
        event: '',
        participationType: '',
        fullName: '',
        rollNumber: '',
        email: '',
        phone: '',
        year: '',
        division: '',
        member2FullName: '',
        member2RollNumber: '',
        member2Email: '',
        member2Phone: '',
        member2Year: '',
        member2Division: '',
      });
      setIsSubmitted(false);
      setFormErrors({});
      setError('');
      setIsAnimating(false);
      onClose();
    }, 300);
  }, [onClose]);

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
          handleClose();
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
  }, [isOpen, handleClose]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    // Event validation
    if (!formData.event.trim()) {
      errors.event = 'Please select an event';
    }
    
    // Participation type validation (only for non-poster events)
    if (formData.event !== 'Technical Poster' && !formData.participationType.trim()) {
      errors.participationType = 'Please select participation type';
    }
    
    // Participant 1 validation
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!formData.rollNumber.trim()) {
      errors.rollNumber = 'Roll number is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s\-()]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.year.trim()) {
      errors.year = 'Year is required';
    }
    
    if (!formData.division.trim()) {
      errors.division = 'Division is required';
    }
    
    // Participant 2 validation (only for team events)
    if (formData.participationType === 'Team' && formData.event !== 'Technical Poster') {
      if (!formData.member2FullName.trim()) {
        errors.member2FullName = 'Member 2 full name is required';
      } else if (formData.member2FullName.trim().length < 2) {
        errors.member2FullName = 'Name must be at least 2 characters';
      }
      
      if (!formData.member2RollNumber.trim()) {
        errors.member2RollNumber = 'Member 2 roll number is required';
      }
      
      if (!formData.member2Email.trim()) {
        errors.member2Email = 'Member 2 email is required';
      } else if (!emailRegex.test(formData.member2Email)) {
        errors.member2Email = 'Please enter a valid email address';
      }
      
      if (!formData.member2Phone.trim()) {
        errors.member2Phone = 'Member 2 phone number is required';
      } else if (!phoneRegex.test(formData.member2Phone.replace(/[\s\-()]/g, ''))) {
        errors.member2Phone = 'Please enter a valid phone number';
      }
      
      if (!formData.member2Year.trim()) {
        errors.member2Year = 'Member 2 year is required';
      }
      
      if (!formData.member2Division.trim()) {
        errors.member2Division = 'Member 2 division is required';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    
    setIsSubmitting(true);
    setError('');
    setFormErrors({});

    try {
      console.log('Starting registration process...');
      
      // Sanitize input data
      const sanitizedData = {
        event: formData.event.trim(),
        participationType: formData.participationType.trim(),
        fullName: formData.fullName.trim(),
        rollNumber: formData.rollNumber.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        year: formData.year.trim(),
        division: formData.division.trim(),
        member2FullName: formData.member2FullName.trim(),
        member2RollNumber: formData.member2RollNumber.trim(),
        member2Email: formData.member2Email.trim().toLowerCase(),
        member2Phone: formData.member2Phone.trim(),
        member2Year: formData.member2Year.trim(),
        member2Division: formData.member2Division.trim(),
      };

      // Create registration data for Firebase
      const registrationData: Omit<EventRegistrationData, 'registrationDate'> = {
        eventId: sanitizedData.event.toLowerCase().replace(/\s+/g, '-'),
        eventName: sanitizedData.event,
        participantName: sanitizedData.fullName,
        participantEmail: sanitizedData.email,
        participantPhone: sanitizedData.phone,
        additionalInfo: `Roll Number: ${sanitizedData.rollNumber}, Year: ${sanitizedData.year}, Division: ${sanitizedData.division}${
          sanitizedData.participationType === 'Team' && sanitizedData.member2FullName 
            ? ` | Team Member: ${sanitizedData.member2FullName} (${sanitizedData.member2RollNumber}, ${sanitizedData.member2Year}${sanitizedData.member2Division})`
            : ''
        }`,
        status: 'pending'
      };

      // Try Firebase registration first
      try {
        await registerForEvent(registrationData);
        console.log('Firebase registration successful');
      } catch (firebaseError) {
        console.warn('Firebase registration failed, using local storage fallback:', firebaseError);
        
        // Fallback to local storage
        const fallbackData = {
          id: Date.now().toString(),
          ...registrationData,
          registrationDate: new Date().toISOString()
        };
        
        // Save to local storage
        const existingRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
        existingRegistrations.push(fallbackData);
        localStorage.setItem('eventRegistrations', JSON.stringify(existingRegistrations));
        
        console.log('Registration saved to local storage');
      }

      setIsSubmitted(true);
      
      // Show success toast
      onShowToast?.(
        `Successfully registered for ${sanitizedData.event}! Check your email for confirmation.`,
        'success'
      );
      
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to register. Please try again.';
      setError(errorMessage);
      
      // Show error toast
      onShowToast?.(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(false);
      if (preselectedEvent) {
        setFormData(prev => ({
          ...prev,
          event: preselectedEvent
        }));
      }
    }
  }, [isOpen, preselectedEvent]);

  // Add timeout to prevent infinite loading
  useEffect(() => {
    if (isSubmitting) {
      const timeout = setTimeout(() => {
        if (isSubmitting) {
          console.error('Registration timeout - Firebase may not be configured');
          setError('Registration timed out. Please check your internet connection and try again.');
          setIsSubmitting(false);
          onShowToast?.('Registration timed out. Please try again.', 'error');
        }
      }, 10000); // 10 second timeout

      return () => clearTimeout(timeout);
    }
  }, [isSubmitting, onShowToast]);

  if (!isOpen) return null;

  return (
    <div 
      className={`modal-overlay ${isAnimating ? 'modal-closing' : ''}`} 
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div 
        className={`modal-content ${isAnimating ? 'modal-content-closing' : ''}`} 
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <button 
          className="modal-close" 
          onClick={handleClose}
          aria-label="Close registration modal"
          type="button"
        >
          ×
        </button>
        
        {isSubmitted ? (
          <div className="success-content" role="alert" aria-live="polite">
            <div className="success-icon" aria-hidden="true">✅</div>
            <h2 id="modal-title">Registration Successful!</h2>
            <p id="modal-description">Thank you for registering for Engineers' Day 2025.</p>
            <button className="close-btn" onClick={handleClose}>Close</button>
          </div>
        ) : (
          <div className="form-content">
            <h2 id="modal-title">Engineers' Day 2025 Registration</h2>
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="event">Select Event *</label>
                <select
                  ref={firstInputRef}
                  id="event"
                  name="event"
                  value={formData.event}
                  onChange={handleInputChange}
                  required
                  className={formErrors.event ? 'error' : ''}
                  aria-invalid={!!formErrors.event}
                  aria-describedby={formErrors.event ? 'event-error' : undefined}
                >
                  <option value="">Choose Event</option>
                  <option value="Code Cooking">Code Cooking</option>
                  <option value="Prompt Engineering">🧠 Prompt Engineering Challenge</option>
                  <option value="Technical Poster">🎨 Technical Poster Presentation</option>
                </select>
                {formErrors.event && (
                  <span id="event-error" className="field-error" role="alert">
                    {formErrors.event}
                  </span>
                )}
              </div>

              {formData.event !== 'Technical Poster' && (
                <div className="form-group">
                  <label htmlFor="participationType">Participation Type *</label>
                  <select
                    id="participationType"
                    name="participationType"
                    value={formData.participationType}
                    onChange={handleInputChange}
                    required
                    className={formErrors.participationType ? 'error' : ''}
                    aria-invalid={!!formErrors.participationType}
                    aria-describedby={formErrors.participationType ? 'participationType-error' : undefined}
                  >
                    <option value="">Choose Type</option>
                    <option value="Solo">Solo</option>
                    <option value="Team">Team (2 Members)</option>
                  </select>
                  {formErrors.participationType && (
                    <span id="participationType-error" className="field-error" role="alert">
                      {formErrors.participationType}
                    </span>
                  )}
                </div>
              )}

              {formData.event === 'Technical Poster' && (
                <div className="event-info">
                  <p>📝 <strong>Note:</strong> Technical Poster Presentation is open to everyone and can be registered for independently of other events.</p>
                </div>
              )}

              <div className="participant-section">
                <h3>
                  {formData.event === 'Technical Poster' 
                    ? 'Participant Details' 
                    : formData.participationType === 'Solo' 
                      ? "Participant's Details"
                      : formData.participationType === 'Team'
                        ? 'Participant 1 Details'
                        : 'Participant Details'
                  }
                </h3>
                
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className={formErrors.fullName ? 'error' : ''}
                    aria-invalid={!!formErrors.fullName}
                    aria-describedby={formErrors.fullName ? 'fullName-error' : undefined}
                    autoComplete="name"
                  />
                  {formErrors.fullName && (
                    <span id="fullName-error" className="field-error" role="alert">
                      {formErrors.fullName}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="rollNumber">Roll Number *</label>
                  <input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    required
                    className={formErrors.rollNumber ? 'error' : ''}
                    aria-invalid={!!formErrors.rollNumber}
                    aria-describedby={formErrors.rollNumber ? 'rollNumber-error' : undefined}
                  />
                  {formErrors.rollNumber && (
                    <span id="rollNumber-error" className="field-error" role="alert">
                      {formErrors.rollNumber}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email ID *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={formErrors.email ? 'error' : ''}
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                    autoComplete="email"
                  />
                  {formErrors.email && (
                    <span id="email-error" className="field-error" role="alert">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={formErrors.phone ? 'error' : ''}
                    aria-invalid={!!formErrors.phone}
                    aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                    autoComplete="tel"
                  />
                  {formErrors.phone && (
                    <span id="phone-error" className="field-error" role="alert">
                      {formErrors.phone}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="year">Year *</label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className={formErrors.year ? 'error' : ''}
                    aria-invalid={!!formErrors.year}
                    aria-describedby={formErrors.year ? 'year-error' : undefined}
                  >
                    <option value="">Select Year</option>
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>
                  </select>
                  {formErrors.year && (
                    <span id="year-error" className="field-error" role="alert">
                      {formErrors.year}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="division">Division *</label>
                  <select
                    id="division"
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    required
                    className={formErrors.division ? 'error' : ''}
                    aria-invalid={!!formErrors.division}
                    aria-describedby={formErrors.division ? 'division-error' : undefined}
                  >
                    <option value="">Select Division</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                  {formErrors.division && (
                    <span id="division-error" className="field-error" role="alert">
                      {formErrors.division}
                    </span>
                  )}
                </div>
              </div>

              {formData.participationType === 'Team' && formData.event !== 'Technical Poster' && (
                <>
                  <div className="team-member-section">
                    <h3>Participant 2 Details</h3>
                    
                    <div className="form-group">
                      <label htmlFor="member2FullName">Full Name *</label>
                      <input
                        type="text"
                        id="member2FullName"
                        name="member2FullName"
                        value={formData.member2FullName}
                        onChange={handleInputChange}
                        required
                        className={formErrors.member2FullName ? 'error' : ''}
                        aria-invalid={!!formErrors.member2FullName}
                        aria-describedby={formErrors.member2FullName ? 'member2FullName-error' : undefined}
                        autoComplete="name"
                      />
                      {formErrors.member2FullName && (
                        <span id="member2FullName-error" className="field-error" role="alert">
                          {formErrors.member2FullName}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="member2RollNumber">Roll Number *</label>
                      <input
                        type="text"
                        id="member2RollNumber"
                        name="member2RollNumber"
                        value={formData.member2RollNumber}
                        onChange={handleInputChange}
                        required
                        className={formErrors.member2RollNumber ? 'error' : ''}
                        aria-invalid={!!formErrors.member2RollNumber}
                        aria-describedby={formErrors.member2RollNumber ? 'member2RollNumber-error' : undefined}
                      />
                      {formErrors.member2RollNumber && (
                        <span id="member2RollNumber-error" className="field-error" role="alert">
                          {formErrors.member2RollNumber}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="member2Email">Email ID *</label>
                      <input
                        type="email"
                        id="member2Email"
                        name="member2Email"
                        value={formData.member2Email}
                        onChange={handleInputChange}
                        required
                        className={formErrors.member2Email ? 'error' : ''}
                        aria-invalid={!!formErrors.member2Email}
                        aria-describedby={formErrors.member2Email ? 'member2Email-error' : undefined}
                        autoComplete="email"
                      />
                      {formErrors.member2Email && (
                        <span id="member2Email-error" className="field-error" role="alert">
                          {formErrors.member2Email}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="member2Phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="member2Phone"
                        name="member2Phone"
                        value={formData.member2Phone}
                        onChange={handleInputChange}
                        required
                        className={formErrors.member2Phone ? 'error' : ''}
                        aria-invalid={!!formErrors.member2Phone}
                        aria-describedby={formErrors.member2Phone ? 'member2Phone-error' : undefined}
                        autoComplete="tel"
                      />
                      {formErrors.member2Phone && (
                        <span id="member2Phone-error" className="field-error" role="alert">
                          {formErrors.member2Phone}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="member2Year">Year *</label>
                      <select
                        id="member2Year"
                        name="member2Year"
                        value={formData.member2Year}
                        onChange={handleInputChange}
                        required
                        className={formErrors.member2Year ? 'error' : ''}
                        aria-invalid={!!formErrors.member2Year}
                        aria-describedby={formErrors.member2Year ? 'member2Year-error' : undefined}
                      >
                        <option value="">Select Year</option>
                        <option value="SE">SE</option>
                        <option value="TE">TE</option>
                        <option value="BE">BE</option>
                      </select>
                      {formErrors.member2Year && (
                        <span id="member2Year-error" className="field-error" role="alert">
                          {formErrors.member2Year}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="member2Division">Division *</label>
                      <select
                        id="member2Division"
                        name="member2Division"
                        value={formData.member2Division}
                        onChange={handleInputChange}
                        required
                        className={formErrors.member2Division ? 'error' : ''}
                        aria-invalid={!!formErrors.member2Division}
                        aria-describedby={formErrors.member2Division ? 'member2Division-error' : undefined}
                      >
                        <option value="">Select Division</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                      {formErrors.member2Division && (
                        <span id="member2Division-error" className="field-error" role="alert">
                          {formErrors.member2Division}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}

              {error && (
                <div className="error-message" role="alert" aria-live="polite">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className="submit-btn" 
                disabled={isSubmitting}
                aria-describedby={isSubmitting ? 'submit-loading' : undefined}
              >
                {isSubmitting ? 'Submitting...' : 'Register Now'}
                {isSubmitting && <span id="submit-loading" className="sr-only">Please wait while we process your registration</span>}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
