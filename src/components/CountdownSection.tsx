import { useState, useEffect } from 'react';
import './CountdownSection.css';
import { EVENT_CONFIG, getEventDate, getRegistrationDeadline, isRegistrationOpen, isEventLive } from '../config/eventConfig';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isEventLiveState, setIsEventLiveState] = useState(false);
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);

  useEffect(() => {
    const eventDate = getEventDate();
    const registrationDeadline = getRegistrationDeadline();

    const timer = setInterval(() => {
      const now = new Date();
      const eventTime = eventDate.getTime();
      const regTime = registrationDeadline.getTime();
      const nowTime = now.getTime();

      // Check registration status
      setIsRegistrationClosed(!isRegistrationOpen());
      
      // Check if event is live
      const eventLive = isEventLive();
      setIsEventLiveState(eventLive);

      // Calculate countdown to event
      const difference = eventTime - nowTime;

      if (difference <= 0) {
        // Event has passed or is happening now
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (eventLive) {
          // Event is live today
          clearInterval(timer);
        }
      } else {
        // Event is in the future
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown-section">
      <div className="countdown-container">
        {/* Event Details */}
        <div className="event-details">
          <div className="event-date">
            {getEventDate().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="event-location">
            {EVENT_CONFIG.eventLocation}
          </div>
          <div className={`registration-deadline ${isRegistrationClosed ? 'closed' : ''}`}>
            {isRegistrationClosed ? 'Registration Closed' : `Registration Deadline: ${getRegistrationDeadline().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}`}
          </div>
        </div>

        {/* Countdown Timer or Event Status */}
        {isEventLiveState ? (
          <div className="event-live-status">
            <div className="live-indicator">
              <div className="live-dot"></div>
              <span>Event is Live!</span>
            </div>
            <p className="live-message">
              Engineers' Day 2025 is happening right now! Join us at the Computer Engineering Department.
            </p>
          </div>
        ) : (
          <div className="countdown-timer">
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="countdown-label">Days</div>
            </div>
            
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="countdown-label">Hours</div>
            </div>
            
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="countdown-label">Minutes</div>
            </div>
            
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
