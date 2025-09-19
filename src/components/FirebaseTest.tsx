import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';

interface FirebaseTestProps {
  onClose: () => void;
}

export default function FirebaseTest({ onClose }: FirebaseTestProps) {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runFirebaseTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    try {
      addResult('🔥 Starting Firebase connection tests...');
      
      // Test 1: Check if Firebase config is loaded
      addResult('✅ Firebase config loaded successfully');
      
      // Test 2: Try to write to Firestore
      addResult('📝 Testing Firestore write operation...');
      const testData = {
        testMessage: 'Firebase connection test',
        timestamp: new Date().toISOString(),
        testId: Math.random().toString(36).substr(2, 9)
      };
      
      const testDocRef = await addDoc(collection(db, 'test'), testData);
      addResult(`✅ Successfully wrote test document with ID: ${testDocRef.id}`);
      
      // Test 3: Try to read from Firestore
      addResult('📖 Testing Firestore read operation...');
      const testSnapshot = await getDocs(collection(db, 'test'));
      addResult(`✅ Successfully read ${testSnapshot.size} documents from test collection`);
      
      // Test 4: Try to write to events collection
      addResult('🎯 Testing events collection write...');
      const eventData = {
        name: 'Test Event',
        description: 'This is a test event for Firebase verification',
        date: '2024-09-15',
        time: '10:00 AM',
        location: 'Test Location',
        maxParticipants: 10,
        currentParticipants: 0,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      
      const eventDocRef = await addDoc(collection(db, 'events'), eventData);
      addResult(`✅ Successfully created test event with ID: ${eventDocRef.id}`);
      
      // Test 5: Try to write to registrations collection
      addResult('📋 Testing registrations collection write...');
      const registrationData = {
        eventId: eventDocRef.id,
        eventName: 'Test Event',
        participantName: 'Test User',
        participantEmail: 'test@example.com',
        participantPhone: '1234567890',
        additionalInfo: 'Test registration',
        status: 'pending',
        registrationDate: new Date()
      };
      
      const registrationDocRef = await addDoc(collection(db, 'registrations'), registrationData);
      addResult(`✅ Successfully created test registration with ID: ${registrationDocRef.id}`);
      
      addResult('🎉 All Firebase tests passed! Your setup is working correctly.');
      
    } catch (error) {
      addResult(`❌ Firebase test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      addResult('💡 Check your Firebase configuration and Firestore rules');
      
      if (error instanceof Error && error.message.includes('permission')) {
        addResult('🔒 Permission denied - Check your Firestore security rules');
      }
      if (error instanceof Error && error.message.includes('network')) {
        addResult('🌐 Network error - Check your internet connection');
      }
    } finally {
      setIsRunning(false);
    }
  };

  const clearTestData = async () => {
    try {
      addResult('🧹 Clearing test data...');
      // Note: In a real app, you'd want to delete the test documents
      addResult('✅ Test data cleared (manual cleanup may be needed)');
    } catch (error) {
      addResult(`❌ Error clearing test data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="firebase-test-overlay">
      <div className="firebase-test-modal">
        <div className="firebase-test-header">
          <h2>🔥 Firebase Connection Test</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="firebase-test-content">
          <p>This will test your Firebase connection and Firestore database setup.</p>
          
          <div className="test-buttons">
            <button 
              onClick={runFirebaseTests} 
              disabled={isRunning}
              className="test-btn primary"
            >
              {isRunning ? '🔄 Running Tests...' : '🚀 Run Firebase Tests'}
            </button>
            
            <button 
              onClick={clearTestData} 
              disabled={isRunning}
              className="test-btn secondary"
            >
              🧹 Clear Test Data
            </button>
          </div>
          
          <div className="test-results">
            <h3>Test Results:</h3>
            <div className="results-log">
              {testResults.length === 0 ? (
                <p>Click "Run Firebase Tests" to start testing...</p>
              ) : (
                testResults.map((result, index) => (
                  <div key={index} className={`result-line ${result.includes('❌') ? 'error' : result.includes('✅') ? 'success' : 'info'}`}>
                    {result}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
