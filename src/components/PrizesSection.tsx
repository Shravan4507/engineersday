import './PrizesSection.css';

export default function PrizesSection() {
  const prizes = [
    {
      id: 1,
      icon: '🏆',
      title: 'Certificates',
      description: 'Official recognition for outstanding performance',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      icon: '🎁',
      title: 'Goodies',
      description: 'Exclusive merchandise and tech accessories',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      icon: '⭐',
      title: 'Social Media Spotlight',
      description: 'Feature on our official social media channels',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  return (
    <section id="prizes" className="prizes-section">
      <div className="prizes-container">
        {/* Section Header */}
        <div className="prizes-header">
          <h2 className="prizes-title">Prizes & Recognition</h2>
          <p className="prizes-subtitle">
            Top entries across all events will receive amazing rewards
          </p>
        </div>

        {/* Prizes Grid */}
        <div className="prizes-grid">
          {prizes.map((prize) => (
            <div key={prize.id} className="prize-card">
              {/* Card Header */}
              <div className="prize-header">
                <div className="prize-icon" style={{ background: prize.gradient }}>
                  {prize.icon}
                </div>
                <h3 className="prize-title">{prize.title}</h3>
              </div>

              {/* Card Content */}
              <div className="prize-content">
                <p className="prize-description">{prize.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
