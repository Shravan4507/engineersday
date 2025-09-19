import { useState, useEffect } from 'react';
import './CountdownSection.css';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date: September 20, 2025
    const targetDate = new Date('2025-09-20T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
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
            September 20, 2025
          </div>
          <div className="event-location">
            Computer Engineering Department, Zeal College of Engineering and Research
          </div>
          <div className="registration-deadline">
            Registration Deadline: September 18, 2025
          </div>
        </div>

        {/* Countdown Timer */}
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
      </div>
    </section>
  );
}
