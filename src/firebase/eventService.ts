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
  id?: string; // Optional ID for when retrieved from Firestore
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
    // Check if Firebase is configured
    if (!db) {
      console.warn('⚠️ Firebase not configured - returning empty events array');
      return [];
    }

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
    // Check if Firebase is configured
    if (!db) {
      console.warn('⚠️ Firebase not configured - registration will be simulated');
      console.log('📝 Registration data (simulated):', registrationData);
      
      // Simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('✅ Registration simulated successfully');
      return;
    }

    // Firebase is properly configured with hardcoded values

    console.log('🔥 Firebase: Starting registration process...');
    console.log('🔥 Firebase: Database reference:', db);
    console.log('🔥 Firebase: Database project ID:', db._databaseId.projectId);
    
    const registrationsRef = collection(db, 'registrations');
    console.log('🔥 Firebase: Collection reference created');
    
    const data = {
      ...registrationData,
      registrationDate: Timestamp.now()
    };
    console.log('🔥 Firebase: Data to save:', data);
    
    try {
      const docRef = await addDoc(registrationsRef, data);
      console.log('✅ Firebase: Registration successful with ID:', docRef.id);
      console.log('✅ Firebase: Document saved to Firestore');
    } catch (firestoreError) {
      console.error('❌ Firebase: Firestore error:', firestoreError);
      throw firestoreError;
    }
  } catch (error) {
    console.error('❌ Firebase: Error registering for event:', error);
    console.error('❌ Firebase: Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      details: (error as any)?.details,
      stack: error instanceof Error ? error.stack : undefined
    });
    throw new Error(`Failed to register for event: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      } as EventRegistrationData);
    });
    
    return registrations;
  } catch (error) {
    console.error('Error getting registrations:', error);
    throw new Error('Failed to fetch registrations');
  }
};
