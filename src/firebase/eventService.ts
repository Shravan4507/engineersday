import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';

// Event interface
export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  isActive: boolean;
}

// Registration data interface
export interface EventRegistrationData {
  eventId: string;
  eventName: string;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  additionalInfo: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  registrationDate: Timestamp;
}

// Get all events
export const getEvents = async (): Promise<Event[]> => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, orderBy('name'));
    const querySnapshot = await getDocs(q);
    
    const events: Event[] = [];
    querySnapshot.forEach((doc) => {
      events.push({
        id: doc.id,
        ...doc.data()
      } as Event);
    });
    
    return events;
  } catch (error) {
    console.error('Error getting events:', error);
    throw new Error('Failed to fetch events');
  }
};

// Register for an event
export const registerForEvent = async (registrationData: Omit<EventRegistrationData, 'registrationDate'>): Promise<void> => {
  try {
    const registrationsRef = collection(db, 'registrations');
    
    const data = {
      ...registrationData,
      registrationDate: Timestamp.now()
    };
    
    await addDoc(registrationsRef, data);
    console.log('Registration successful');
  } catch (error) {
    console.error('Error registering for event:', error);
    throw new Error('Failed to register for event');
  }
};

// Get all registrations (for admin/export purposes)
export const getAllRegistrations = async (): Promise<EventRegistrationData[]> => {
  try {
    const registrationsRef = collection(db, 'registrations');
    const q = query(registrationsRef, orderBy('registrationDate', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const registrations: EventRegistrationData[] = [];
    querySnapshot.forEach((doc) => {
      registrations.push({
        id: doc.id,
        ...doc.data()
      } as EventRegistrationData & { id: string });
    });
    
    return registrations;
  } catch (error) {
    console.error('Error getting registrations:', error);
    throw new Error('Failed to fetch registrations');
  }
};
