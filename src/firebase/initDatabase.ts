import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './config';

// Initial events data
const initialEvents = [
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

export const initializeDatabase = async () => {
  try {
    console.log('Initializing Firestore database...');
    
    // Check if events already exist
    const eventsCollection = collection(db, 'events');
    const eventsSnapshot = await getDocs(eventsCollection);
    
    if (eventsSnapshot.empty) {
      console.log('No events found. Adding initial events...');
      
      // Add each event to Firestore
      for (const event of initialEvents) {
        const docRef = await addDoc(eventsCollection, event);
        console.log(`Event "${event.name}" added with ID: ${docRef.id}`);
      }
      
      console.log('Database initialized successfully!');
    } else {
      console.log('Events already exist in database.');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Function to manually initialize database (call this in browser console)
export const initDB = () => {
  initializeDatabase().then(() => {
    console.log('Database initialization complete!');
  }).catch((error) => {
    console.error('Database initialization failed:', error);
  });
};

// Make it available globally for browser console
if (typeof window !== 'undefined') {
  (window as any).initDB = initDB;
}
