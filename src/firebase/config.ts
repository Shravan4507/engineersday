import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Firebase configuration - hardcoded for reliability
const firebaseConfig = {
  apiKey: 'AIzaSyCjUaYIb2M30Uuq6FjA5LzQOl3NPmEcxYU',
  authDomain: 'engineersday-2025.firebaseapp.com',
  projectId: 'engineersday-2025',
  storageBucket: 'engineersday-2025.firebasestorage.app',
  messagingSenderId: '870456039908',
  appId: '1:870456039908:web:c12a010e2a6640e27ccff1'
};

// Debug environment variables
console.log('🔍 Environment variables check:');
console.log('VITE_FIREBASE_PROJECT_ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log('VITE_FIREBASE_API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY ? 'Present' : 'Missing');
console.log('Final projectId:', firebaseConfig.projectId);

// Check if Firebase is properly configured
const isFirebaseConfigured = true; // Always true since we're using hardcoded config

if (!isFirebaseConfigured) {
  console.warn('⚠️ Firebase not configured - using demo configuration');
  console.warn('To enable Firebase features, create a .env file with your Firebase credentials');
  console.warn('See .env.example for required variables');
}

// Initialize Firebase
let app: FirebaseApp | undefined;
let db: Firestore | null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('✅ Firebase initialized successfully');
  console.log('🔍 Firebase config used:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    apiKey: firebaseConfig.apiKey ? 'Present' : 'Missing'
  });
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  // Create a mock db object for development
  db = null;
}

export { db };
export default app;
