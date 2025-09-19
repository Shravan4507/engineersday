import React, { useState, useMemo, useCallback } from 'react';
import './EventsSection.css';
import codeCookingIcon from '../assets/code_cooking.png';
import promptEngineeringIcon from '../assets/Prompt_Engineering.png';
import technicalPosterIcon from '../assets/Technical_Poster.png';
// Firebase imports removed for immediate static display
// import { getEvents, type Event as FirebaseEvent } from '../firebase/eventService';
// import { initializeDatabase } from '../firebase/initDatabase';

interface EventsSectionProps {
  onRegisterClick?: (event: string) => void;
}

// Event interface
interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  isActive: boolean;
}

// Static events data
const staticEvents: Event[] = [
  {
    id: 'code-cooking',
    name: 'Code Cooking',
    description: 'Unleash your inner developer in this fast-paced coding challenge. Whether you\'re building an app, a game, or a quirky script—start fresh, think fast, and impress the judges.',
    date: '2024-09-15',
    time: '10:00 AM',
    location: 'Computer Engineering Department, Zeal College',
    maxParticipants: 50,
    currentParticipants: 0,
    isActive: true
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    description: 'Dive into the art of prompt design and AI interaction. This non-technical event invites you to explore how language can drive intelligent outcomes—from creative storytelling to solving real-world problems.',
    date: '2024-09-15',
    time: '2:00 PM',
    location: 'Computer Engineering Department, Zeal College',
    maxParticipants: 30,
    currentParticipants: 0,
    isActive: true
  },
  {
    id: 'technical-poster',
    name: 'Technical Poster',
    description: 'Showcase your perspective on cutting-edge tech topics through hand-crafted posters. No digital tools—just your ideas, your art, and your voice.',
    date: '2024-09-15',
    time: '4:00 PM',
    location: 'Computer Engineering Department, Zeal College',
    maxParticipants: 25,
    currentParticipants: 0,
    isActive: true
  }
];

// Memoized Event Card Component
const EventCard = React.memo(({ 
  event, 
  onRegisterClick, 
  getEventIcon, 
  getEventGradient, 
  getEventDetails 
}: {
  event: FirebaseEvent;
  onRegisterClick: (eventName: string) => void;
  getEventIcon: (eventName: string) => string;
  getEventGradient: (eventName: string) => string;
  getEventDetails: (event: FirebaseEvent) => Array<{ icon: string; text: string }>;
}) => {
  const eventDetails = useMemo(() => getEventDetails(event), [event, getEventDetails]);
  
  return (
    <div className="event-card">
      {/* Card Header */}
      <div className="event-header">
        <div className="event-icon" style={{ background: getEventGradient(event.name) }}>
          <img src={getEventIcon(event.name)} alt={event.name} className="event-icon-img" />
        </div>
        <div className="event-title-group">
          <h3 className="event-title">{event.name}</h3>
          <p className="event-subtitle">
            {event.name === 'Code Cooking' && 'Cook Your Code, Serve Your Innovation'}
            {event.name === 'Prompt Engineering' && 'Where Words Shape Worlds'}
            {event.name === 'Technical Poster' && 'Design. Express. Inspire.'}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className="event-content">
        <p className="event-description">{event.description}</p>
        
        {/* Themes (for Technical Poster) */}
        {event.name === 'Technical Poster' && (
          <div className="event-themes">
            <h4 className="themes-title">Themes:</h4>
            <ul className="themes-list">
              <li className="theme-item">• Artificial Intelligence</li>
              <li className="theme-item">• Cloud Computing</li>
              <li className="theme-item">• Cybersecurity</li>
            </ul>
          </div>
        )}

        {/* Event Details */}
        <div className="event-details">
          {eventDetails.map((detail, index) => (
            <div key={index} className="detail-item">
              <span className="detail-icon">{detail.icon}</span>
              <span className="detail-text">{detail.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Register Button */}
      <button 
        className="event-register-btn" 
        onClick={() => onRegisterClick(event.name)}
        disabled={!event.isActive || event.currentParticipants >= event.maxParticipants}
      >
        {!event.isActive ? 'Event Inactive' : 
         event.currentParticipants >= event.maxParticipants ? 'Fully Booked' : 
         'Register Now'}
      </button>
    </div>
  );
});

EventCard.displayName = 'EventCard';

function EventsSection({ onRegisterClick }: EventsSectionProps) {
  const [events, setEvents] = useState<Event[]>(staticEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    // Use static events immediately - no loading needed
    setEvents(staticEvents);
    setLoading(false);
    setError(null);
    console.log(`Using static events for immediate display`);
  }, []);

  const handleRetry = () => {
    loadEvents();
  };

  // No useEffect needed - events are loaded immediately

  const handleRegisterClick = useCallback((eventName: string) => {
    onRegisterClick?.(eventName);
  }, [onRegisterClick]);

  const getEventIcon = useCallback((eventName: string) => {
    switch (eventName) {
      case 'Code Cooking':
        return codeCookingIcon;
      case 'Prompt Engineering':
        return promptEngineeringIcon;
      case 'Technical Poster':
        return technicalPosterIcon;
      default:
        return codeCookingIcon;
    }
  }, []);

  const getEventGradient = useCallback((eventName: string) => {
    switch (eventName) {
      case 'Code Cooking':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'Prompt Engineering':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'Technical Poster':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  }, []);

  const getEventDetails = useCallback((event: FirebaseEvent) => {
    const baseDetails = [
      { icon: '📅', text: `Date: ${event.date}` },
      { icon: '⏰', text: `Time: ${event.time}` },
      { icon: '📍', text: `Venue: ${event.location}` },
      { icon: '👥', text: `Participants: ${event.currentParticipants}/${event.maxParticipants}` }
    ];

    if (event.name === 'Code Cooking') {
      return [
        ...baseDetails,
        { icon: '⏱️', text: 'Duration: 2 hours' },
        { icon: '👥', text: 'Solo or Duo participation' },
        { icon: '🏆', text: 'Judged on creativity, functionality, and code quality' }
      ];
    } else if (event.name === 'Prompt Engineering') {
      return [
        ...baseDetails,
        { icon: '⏱️', text: 'Duration: ~1 hour' },
        { icon: '👤', text: 'Solo participation' },
        { icon: '🎯', text: 'Focus on clarity, creativity, and impact' }
      ];
    } else if (event.name === 'Technical Poster') {
      return [
        ...baseDetails,
        { icon: '⏱️', text: 'Duration: 15-30 mins' },
        { icon: '👤', text: 'Solo participation' },
        { icon: '🎨', text: 'Themes: AI, Cloud Computing, Cybersecurity' }
      ];
    }

    return baseDetails;
  }, []);

  if (loading) {
    return (
      <section id="events" className="events-section">
        <div className="events-container">
          <div className="events-header">
            <h2 className="events-title">Featured Events</h2>
            <p className="events-subtitle">Loading events...</p>
          </div>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Fetching the latest events...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="events" className="events-section">
        <div className="events-container">
          {/* Section Header */}
          <div className="events-header">
            <h2 className="events-title">Featured Events</h2>
            <p className="events-subtitle">
              Three exciting challenges designed to showcase your engineering prowess.
            </p>
            {error && (
              <div className="events-error-banner">
                <div className="error-content">
                  <span className="error-icon">⚠️</span>
                  <span className="error-message">{error}</span>
                  <button 
                    className="retry-button" 
                    onClick={handleRetry}
                    disabled={loading}
                  >
                    {loading ? 'Retrying...' : 'Retry'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Events Grid */}
          <div className="events-grid">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={handleRegisterClick}
                getEventIcon={getEventIcon}
                getEventGradient={getEventGradient}
                getEventDetails={getEventDetails}
              />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

export default React.memo(EventsSection);
