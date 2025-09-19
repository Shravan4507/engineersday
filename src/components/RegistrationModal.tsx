import React, { useState, useEffect } from 'react';
import './RegistrationModal.css';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedEvent?: string;
  onShowToast?: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

export default function RegistrationModal({ isOpen, onClose, preselectedEvent, onShowToast }: RegistrationModalProps) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Show success toast
      onShowToast?.(
        `Successfully registered for ${formData.event}! Check your email for confirmation.`,
        'success'
      );
    } catch {
      setIsSubmitting(false);
      onShowToast?.(
        'Registration failed. Please try again later.',
        'error'
      );
    }
  };

  const handleClose = () => {
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
      setIsAnimating(false);
      onClose();
    }, 300);
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

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isAnimating ? 'modal-closing' : ''}`} onClick={handleClose}>
      <div className={`modal-content ${isAnimating ? 'modal-content-closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>×</button>
        
        {isSubmitted ? (
          <div className="success-content">
            <div className="success-icon">✅</div>
            <h2>Registration Successful!</h2>
            <p>Thank you for registering for Engineers' Day 2025.</p>
            <button className="close-btn" onClick={handleClose}>Close</button>
          </div>
        ) : (
          <div className="form-content">
            <h2>Engineers' Day 2025 Registration</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Event *</label>
                <select
                  name="event"
                  value={formData.event}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose Event</option>
                  <option value="Code Cooking">Code Cooking</option>
                  <option value="Prompt Engineering">🧠 Prompt Engineering Challenge</option>
                  <option value="Technical Poster">🎨 Technical Poster Presentation</option>
                </select>
              </div>

              {formData.event !== 'Technical Poster' && (
                <div className="form-group">
                  <label>Participation Type *</label>
                  <select
                    name="participationType"
                    value={formData.participationType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose Type</option>
                    <option value="Solo">Solo</option>
                    <option value="Team">Team (2 Members)</option>
                  </select>
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
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Roll Number *</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email ID *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Year *</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Division *</label>
                  <select
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Division</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>

              {formData.participationType === 'Team' && formData.event !== 'Technical Poster' && (
                <>
                  <div className="team-member-section">
                    <h3>Participant 2 Details</h3>
                    
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="member2FullName"
                        value={formData.member2FullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Roll Number *</label>
                      <input
                        type="text"
                        name="member2RollNumber"
                        value={formData.member2RollNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email ID *</label>
                      <input
                        type="email"
                        name="member2Email"
                        value={formData.member2Email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="member2Phone"
                        value={formData.member2Phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Year *</label>
                      <select
                        name="member2Year"
                        value={formData.member2Year}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Year</option>
                        <option value="SE">SE</option>
                        <option value="TE">TE</option>
                        <option value="BE">BE</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Division *</label>
                      <select
                        name="member2Division"
                        value={formData.member2Division}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Division</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Register Now'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
