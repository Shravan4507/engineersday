import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCjUaYIb2M30Uuq6FjA5LzQOl3NPmEcxYU",
  authDomain: "engineersday-2025.firebaseapp.com",
  projectId: "engineersday-2025",
  storageBucket: "engineersday-2025.firebasestorage.app",
  messagingSenderId: "870456039908",
  appId: "1:870456039908:web:c12a010e2a6640e27ccff1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
