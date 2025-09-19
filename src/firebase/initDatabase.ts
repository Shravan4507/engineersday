import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './config';
import { type Event } from './eventService';

// Static events data
const staticEvents: Omit<Event, 'id'>[] = [
  {
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

// Initialize database with events
export const initializeDatabase = async (): Promise<void> => {
  try {
    const eventsRef = collection(db, 'events');
    const snapshot = await getDocs(eventsRef);
    
    // Only add events if database is empty
    if (snapshot.empty) {
      console.log('Database is empty, adding initial events...');
      
      for (const event of staticEvents) {
        await addDoc(eventsRef, event);
      }
      
      console.log('Initial events added successfully');
    } else {
      console.log('Database already has events, skipping initialization');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
