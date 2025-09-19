// Event Configuration
// Update these dates as needed for future events

export const EVENT_CONFIG = {
  // Event date - when the actual event happens
  eventDate: '2025-09-22T00:00:00Z', // September 29, 2025 UTC
  
  // Registration deadline - when registration closes
  registrationDeadline: '2025-09-20T23:59:59Z', // September 28, 2025 UTC
  
  // Event details
  eventName: "Engineers' Day 2025",
  eventLocation: "Computer Engineering Department, Zeal College of Engineering and Research",
  
  // Event times
  eventTimes: {
    'Code Cooking': '10:00 AM',
    'Prompt Engineering': '2:00 PM', 
    'Technical Poster': '4:00 PM'
  }
} as const;

// Helper functions
export const getEventDate = () => new Date(EVENT_CONFIG.eventDate);
export const getRegistrationDeadline = () => new Date(EVENT_CONFIG.registrationDeadline);

// Check if registration is open
export const isRegistrationOpen = () => {
  const now = new Date();
  const deadline = getRegistrationDeadline();
  return now < deadline;
};

// Check if event is live (happening today)
export const isEventLive = () => {
  const now = new Date();
  const eventDate = getEventDate();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  return today.getTime() === eventDay.getTime();
};

// Get days remaining until deadline
export const getDaysUntilDeadline = () => {
  const now = new Date();
  const deadline = getRegistrationDeadline();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Get days remaining until event date
export const getDaysUntilEvent = () => {
  const now = new Date();
  const eventDate = getEventDate();
  const diffTime = eventDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays); // Never return negative days
};
