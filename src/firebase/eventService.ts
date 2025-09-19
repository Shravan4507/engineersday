import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';

export interface EventResponse {
  id?: string;
  eventId: string;
  eventName: string;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  registrationDate: Timestamp;
  status: 'pending' | 'confirmed' | 'cancelled';
  additionalInfo?: string;
}

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

class EventService {
  private eventsCollection = collection(db, 'events');
  private responsesCollection = collection(db, 'eventResponses');

  // Get all events
  async getEvents(): Promise<Event[]> {
    try {
      const q = query(this.eventsCollection, orderBy('date', 'asc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  }

  // Register for an event
  async registerForEvent(eventData: Omit<EventResponse, 'id' | 'registrationDate'>): Promise<string> {
    try {
      const responseData = {
        ...eventData,
        registrationDate: Timestamp.now(),
        status: 'pending' as const
      };
      
      const docRef = await addDoc(this.responsesCollection, responseData);
      
      // Update event participant count
      await this.updateEventParticipantCount(eventData.eventId, 1);
      
      return docRef.id;
    } catch (error) {
      console.error('Error registering for event:', error);
      throw error;
    }
  }

  // Get all responses for an event
  async getEventResponses(eventId: string): Promise<EventResponse[]> {
    try {
      const q = query(
        this.responsesCollection,
        orderBy('registrationDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(response => response.eventId === eventId) as EventResponse[];
    } catch (error) {
      console.error('Error getting event responses:', error);
      throw error;
    }
  }

  // Update response status
  async updateResponseStatus(responseId: string, status: EventResponse['status']): Promise<void> {
    try {
      const responseRef = doc(this.responsesCollection, responseId);
      await updateDoc(responseRef, { status });
    } catch (error) {
      console.error('Error updating response status:', error);
      throw error;
    }
  }

  // Update event participant count
  private async updateEventParticipantCount(eventId: string, change: number): Promise<void> {
    try {
      const eventRef = doc(this.eventsCollection, eventId);
      const eventDoc = await getDocs(query(this.eventsCollection));
      const event = eventDoc.docs.find(doc => doc.id === eventId);
      
      if (event) {
        const currentCount = event.data().currentParticipants || 0;
        await updateDoc(eventRef, {
          currentParticipants: currentCount + change
        });
      }
    } catch (error) {
      console.error('Error updating participant count:', error);
      throw error;
    }
  }

  // Check if user already registered for event
  async checkExistingRegistration(email: string, eventId: string): Promise<boolean> {
    try {
      const q = query(this.responsesCollection);
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.some(doc => {
        const data = doc.data();
        return data.participantEmail === email && data.eventId === eventId;
      });
    } catch (error) {
      console.error('Error checking existing registration:', error);
      throw error;
    }
  }
}

export const eventService = new EventService();
