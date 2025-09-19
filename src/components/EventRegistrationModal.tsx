import React, { useState } from 'react';
import { eventService, EventResponse } from '../firebase/eventService';
import './EventRegistrationModal.css';

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventId: string;
}

export default function EventRegistrationModal({ 
  isOpen, 
  onClose, 
  eventName, 
  eventId 
}: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    participantName: '',
    participantEmail: '',
    participantPhone: '',
    additionalInfo: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Check if user already registered
      const alreadyRegistered = await eventService.checkExistingRegistration(
        formData.participantEmail, 
        eventId
      );

      if (alreadyRegistered) {
        setError('You have already registered for this event with this email address.');
        setIsLoading(false);
        return;
      }

      // Register for event
      await eventService.registerForEvent({
        eventId,
        eventName,
        participantName: formData.participantName,
        participantEmail: formData.participantEmail,
        participantPhone: formData.participantPhone,
        additionalInfo: formData.additionalInfo
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          participantName: '',
          participantEmail: '',
          participantPhone: '',
          additionalInfo: ''
        });
      }, 2000);

    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Register for {eventName}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Registration Successful!</h3>
            <p>You have been registered for {eventName}. We'll send you a confirmation email shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="participantName">Full Name *</label>
              <input
                type="text"
                id="participantName"
                name="participantName"
                value={formData.participantName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
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
              />
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
              />
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
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button type="button" onClick={onClose} className="btn-cancel">
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register Now'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
