import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './config';
import { type Event } from './eventService';
import { EVENT_CONFIG } from '../config/eventConfig';

// Static events data (using config)
const getStaticEvents = (): Omit<Event, 'id'>[] => {
  const eventDate = new Date(EVENT_CONFIG.eventDate).toISOString().split('T')[0];
  
  return [
    {
      name: 'Code Cooking',
      description: 'Unleash your inner developer in this fast-paced coding challenge. Whether you\'re building an app, a game, or a quirky script—start fresh, think fast, and impress the judges.',
      date: eventDate,
      time: EVENT_CONFIG.eventTimes['Code Cooking'],
      location: EVENT_CONFIG.eventLocation,
      maxParticipants: 50,
      currentParticipants: 0,
      isActive: true
    },
    {
      name: 'Prompt Engineering',
      description: 'Dive into the art of prompt design and AI interaction. This non-technical event invites you to explore how language can drive intelligent outcomes—from creative storytelling to solving real-world problems.',
      date: eventDate,
      time: EVENT_CONFIG.eventTimes['Prompt Engineering'],
      location: EVENT_CONFIG.eventLocation,
      maxParticipants: 30,
      currentParticipants: 0,
      isActive: true
    },
    {
      name: 'Technical Poster',
      description: 'Showcase your perspective on cutting-edge tech topics through hand-crafted posters. No digital tools—just your ideas, your art, and your voice.',
      date: eventDate,
      time: EVENT_CONFIG.eventTimes['Technical Poster'],
      location: EVENT_CONFIG.eventLocation,
      maxParticipants: 25,
      currentParticipants: 0,
      isActive: true
    }
  ];
};

// Initialize database with events
export const initializeDatabase = async (): Promise<void> => {
  try {
    const eventsRef = collection(db, 'events');
    const snapshot = await getDocs(eventsRef);
    
    // Only add events if database is empty
    if (snapshot.empty) {
      console.log('Database is empty, adding initial events...');
      
      for (const event of getStaticEvents()) {
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
