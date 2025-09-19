import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './config';

// Test function to check if Firestore is working
export const testFirestoreConnection = async () => {
  try {
    console.log('Testing Firestore connection...');
    
    // Try to add a test document
    const testCollection = collection(db, 'test');
    const docRef = await addDoc(testCollection, {
      message: 'Hello from EngineersDay!',
      timestamp: new Date().toISOString(),
      test: true
    });
    
    console.log('✅ Test document written with ID:', docRef.id);
    
    // Try to read from the collection
    const snapshot = await getDocs(testCollection);
    console.log('✅ Successfully read from Firestore. Documents:', snapshot.size);
    
    return { success: true, docId: docRef.id };
  } catch (error) {
    console.error('❌ Firestore connection failed:', error);
    return { success: false, error: error.message };
  }
};

// Test function to check event responses collection
export const testEventResponse = async () => {
  try {
    console.log('Testing event response registration...');
    
    const responsesCollection = collection(db, 'eventResponses');
    const docRef = await addDoc(responsesCollection, {
      eventId: 'test-event',
      eventName: 'Test Event',
      participantName: 'Test User',
      participantEmail: 'test@example.com',
      participantPhone: '+1234567890',
      registrationDate: new Date(),
      status: 'pending',
      additionalInfo: 'This is a test registration'
    });
    
    console.log('✅ Test event response written with ID:', docRef.id);
    return { success: true, docId: docRef.id };
  } catch (error) {
    console.error('❌ Event response test failed:', error);
    return { success: false, error: error.message };
  }
};

// Make functions available globally for testing
if (typeof window !== 'undefined') {
  (window as any).testFirestoreConnection = testFirestoreConnection;
  (window as any).testEventResponse = testEventResponse;
}
