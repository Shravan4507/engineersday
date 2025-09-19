import './EventsSection.css';
import codeCookingIcon from '../assets/code_cooking.png';
import promptEngineeringIcon from '../assets/Prompt_Engineering.png';
import technicalPosterIcon from '../assets/Technical_Poster.png';

interface EventsSectionProps {
  onRegisterClick?: (event: string) => void;
}

export default function EventsSection({ onRegisterClick }: EventsSectionProps) {
  const events = [
    {
      id: 1,
      icon: codeCookingIcon,
      title: 'Code Cooking',
      subtitle: 'Cook Your Code, Serve Your Innovation',
      description: 'Unleash your inner developer in this fast-paced coding challenge. Whether you\'re building an app, a game, or a quirky script—start fresh, think fast, and impress the judges.',
      details: [
        { icon: '⏱️', text: 'Duration: 2 hours' },
        { icon: '👥', text: 'Solo or Duo participation' },
        { icon: '🏆', text: 'Judged on creativity, functionality, and code quality' },
        { icon: '📍', text: 'Venue: Computer Engineering Department, Zeal College' }
      ],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      icon: promptEngineeringIcon,
      title: 'Prompt Engineering',
      subtitle: 'Where Words Shape Worlds',
      description: 'Dive into the art of prompt design and AI interaction. This non-technical event invites you to explore how language can drive intelligent outcomes—from creative storytelling to solving real-world problems.',
      details: [
        { icon: '⏱️', text: 'Duration: ~1 hour' },
        { icon: '👤', text: 'Solo participation' },
        { icon: '🎯', text: 'Focus on clarity, creativity, and impact' },
        { icon: '📍', text: 'Venue: Computer Engineering Department, Zeal College' }
      ],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      icon: technicalPosterIcon,
      title: 'Technical Poster',
      subtitle: 'Design. Express. Inspire.',
      description: 'Showcase your perspective on cutting-edge tech topics through hand-crafted posters. No digital tools—just your ideas, your art, and your voice.',
      themes: ['Artificial Intelligence', 'Cloud Computing', 'Cybersecurity'],
      details: [
        { icon: '⏱️', text: 'Duration: 15-30 mins' },
        { icon: '👤', text: 'Solo participation' },
        { icon: '📍', text: 'Venue: Computer Engineering Department, Zeal College' }
      ],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  return (
    <section id="events" className="events-section">
      <div className="events-container">
        {/* Section Header */}
        <div className="events-header">
          <h2 className="events-title">Featured Events</h2>
          <p className="events-subtitle">
            Three exciting challenges designed to showcase your engineering prowess.
          </p>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              {/* Card Header */}
              <div className="event-header">
                <div className="event-icon" style={{ background: event.gradient }}>
                  <img src={event.icon} alt={event.title} className="event-icon-img" />
                </div>
                <div className="event-title-group">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-subtitle">{event.subtitle}</p>
                </div>
              </div>

              {/* Card Content */}
              <div className="event-content">
                <p className="event-description">{event.description}</p>
                
                {/* Themes (for Technical Poster) */}
                {event.themes && (
                  <div className="event-themes">
                    <h4 className="themes-title">Themes:</h4>
                    <ul className="themes-list">
                      {event.themes.map((theme, index) => (
                        <li key={index} className="theme-item">• {theme}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Event Details */}
                <div className="event-details">
                  {event.details.map((detail, index) => (
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
                onClick={() => onRegisterClick?.(event.title)}
              >
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
