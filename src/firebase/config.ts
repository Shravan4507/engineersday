import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXD_uzdeDGqeQ5ZBims2QTIDzB9eC8BYg",
  authDomain: "engineersday-d8a09.firebaseapp.com",
  projectId: "engineersday-d8a09",
  storageBucket: "engineersday-d8a09.firebasestorage.app",
  messagingSenderId: "732468539975",
  appId: "1:732468539975:web:71c3cb703215649aef3762",
  measurementId: "G-FEYN8JPHHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;
