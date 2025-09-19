import './HomeSection.css';

interface HomeSectionProps {
  onRegisterClick?: () => void;
}

export default function HomeSection({ onRegisterClick }: HomeSectionProps) {
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
            <div className="stat-number">1</div>
            <div className="stat-label">Days Left</div>
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
