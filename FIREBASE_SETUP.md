# Firebase Setup Guide for EngineersDay

This guide will help you set up Firebase for your EngineersDay project to store user event registrations.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `engineersday` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database
5. Click "Done"

## Step 3: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (</>)
4. Register your app with a nickname
5. Copy the Firebase configuration object

## Step 4: Update Firebase Configuration

1. Open `src/firebase/config.ts`
2. Replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id",
  measurementId: "your-actual-measurement-id"
};
```

## Step 5: Set Up Firestore Security Rules

1. Go to Firestore Database > Rules
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to events
    match /events/{document} {
      allow read: if true;
      allow write: if false; // Only allow through admin SDK
    }
    
    // Allow read/write access to event responses
    match /eventResponses/{document} {
      allow read, write: if true; // For development
    }
  }
}
```

## Step 6: Test the Integration

1. Run your development server: `npm run dev`
2. Navigate to the Events section
3. Click "Register Now" on any event
4. Fill out the registration form
5. Check your Firestore database to see the data

## Database Structure

### Events Collection (`events`)
```javascript
{
  id: "code-cooking",
  name: "Code Cooking",
  description: "Unleash your inner developer...",
  date: "2024-09-15",
  time: "10:00 AM",
  location: "Computer Engineering Department, Zeal College",
  maxParticipants: 50,
  currentParticipants: 0,
  isActive: true
}
```

### Event Responses Collection (`eventResponses`)
```javascript
{
  id: "auto-generated-id",
  eventId: "code-cooking",
  eventName: "Code Cooking",
  participantName: "John Doe",
  participantEmail: "john@example.com",
  participantPhone: "+1234567890",
  registrationDate: "2024-09-19T10:30:00Z",
  status: "pending",
  additionalInfo: "Any additional information"
}
```

## Features Included

- ✅ User registration for events
- ✅ Duplicate registration prevention
- ✅ Real-time participant count updates
- ✅ Event status management (active/inactive)
- ✅ Capacity management (max participants)
- ✅ Registration status tracking
- ✅ Responsive registration modal
- ✅ Error handling and validation

## Security Considerations

For production deployment, consider:

1. **Authentication**: Add user authentication
2. **Security Rules**: Implement proper Firestore security rules
3. **Validation**: Add server-side validation
4. **Rate Limiting**: Implement rate limiting for registrations
5. **Data Privacy**: Ensure GDPR compliance

## Troubleshooting

### Common Issues:

1. **Firebase not initialized**: Check your config values
2. **Permission denied**: Check Firestore security rules
3. **Network error**: Check internet connection and Firebase project status
4. **Build errors**: Ensure all dependencies are installed

### Debug Mode:

Add this to your Firebase config for debugging:
```typescript
import { connectFirestoreEmulator } from 'firebase/firestore';

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

## Next Steps

1. Set up Firebase hosting for production
2. Add email notifications for registrations
3. Implement admin dashboard for managing events
4. Add analytics and reporting features
5. Set up automated backups

Your EngineersDay project is now ready to collect and store user event registrations! 🎉
