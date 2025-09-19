import './HomeSection.css';
import { useState, useEffect } from 'react';
import { getDaysUntilDeadline, isRegistrationOpen } from '../config/eventConfig';

interface HomeSectionProps {
  onRegisterClick?: () => void;
}

export default function HomeSection({ onRegisterClick }: HomeSectionProps) {
  const [daysUntilDeadline, setDaysUntilDeadline] = useState(0);
  const [isRegistrationOpenState, setIsRegistrationOpenState] = useState(true);

  useEffect(() => {
    const updateStats = () => {
      setDaysUntilDeadline(getDaysUntilDeadline());
      setIsRegistrationOpenState(isRegistrationOpen());
    };

    // Update immediately
    updateStats();

    // Update every minute
    const interval = setInterval(updateStats, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section id="home" className="home-section">
      <div className="home-container">
        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Engineers' Day
            <br />
            2025
          </h1>
          
          <h2 className="hero-subtitle">
            Innovate. Create. Celebrate.
          </h2>
          
          <p className="hero-description">
            Join us for a dynamic celebration of engineering brilliance! This year's Engineers' Day features three exciting events designed to spark creativity, challenge minds, and showcase innovation.
          </p>
          
          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn-primary" onClick={onRegisterClick}>
              Register Now
            </button>
            <button 
              className="btn-secondary"
              onClick={() => {
                const eventsSection = document.getElementById('events');
                if (eventsSection) {
                  eventsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              View Events
            </button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">3</div>
            <div className="stat-label">Events</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">
              {daysUntilDeadline > 0 ? daysUntilDeadline : 0}
            </div>
            <div className="stat-label">
              {daysUntilDeadline > 0 ? 'Days Left' : 'Registration\nClosed'}
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">∞</div>
            <div className="stat-label">Possibilities</div>
          </div>
        </div>
      </div>
    </section>
  );
}
