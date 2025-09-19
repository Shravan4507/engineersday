# Firebase Firestore Setup Guide

## 🔥 How to Check if Firebase is Working

### 1. **Test Firebase Connection**
After deployment, you'll see a red "🔥 Test Firebase" button in the bottom-right corner of your website. Click it to run comprehensive tests.

### 2. **Check Firestore Security Rules**

Go to your Firebase Console: https://console.firebase.google.com/

1. **Select your project**: `engineersday-2025`
2. **Go to Firestore Database** → **Rules** tab
3. **Make sure your rules allow read/write access**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents (for testing)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Important**: The above rules allow anyone to read/write to your database. For production, you should use more restrictive rules.

### 3. **Check Collections**

In Firestore Database → **Data** tab, you should see these collections:
- `events` - For storing event information
- `registrations` - For storing user registrations
- `test` - For testing (created by the test component)

### 4. **Test Registration**

1. **Open your website**: `https://shravan4507.github.io/engineersday/`
2. **Click "Register"** on any event
3. **Fill out the form** and submit
4. **Check Firestore** - you should see a new document in the `registrations` collection

### 5. **Common Issues & Solutions**

#### Issue: "Permission denied"
**Solution**: Update Firestore rules to allow read/write access

#### Issue: "Network error"
**Solution**: Check your internet connection and Firebase project status

#### Issue: "Missing environment variables"
**Solution**: Verify all 6 Firebase secrets are added to GitHub repository

#### Issue: "Collection doesn't exist"
**Solution**: The test will create the collections automatically

### 6. **Firebase Console URLs**

- **Project Overview**: https://console.firebase.google.com/project/engineersday-2025
- **Firestore Database**: https://console.firebase.google.com/project/engineersday-2025/firestore
- **Authentication**: https://console.firebase.google.com/project/engineersday-2025/authentication
- **Project Settings**: https://console.firebase.google.com/project/engineersday-2025/settings/general

### 7. **Test Data Structure**

The test will create documents like this:

**Events Collection:**
```json
{
  "name": "Test Event",
  "description": "This is a test event for Firebase verification",
  "date": "2024-09-15",
  "time": "10:00 AM",
  "location": "Test Location",
  "maxParticipants": 10,
  "currentParticipants": 0,
  "isActive": true,
  "createdAt": "2024-09-15T10:00:00.000Z"
}
```

**Registrations Collection:**
```json
{
  "eventId": "event_doc_id",
  "eventName": "Test Event",
  "participantName": "Test User",
  "participantEmail": "test@example.com",
  "participantPhone": "1234567890",
  "additionalInfo": "Test registration",
  "status": "pending",
  "registrationDate": "2024-09-15T10:00:00.000Z"
}
```

### 8. **Production Security Rules**

For production, use these more secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Events can be read by anyone, written by admins
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Registrations can be read by admins, written by anyone
    match /registrations/{registrationId} {
      allow read: if request.auth != null && request.auth.token.admin == true;
      allow write: if true;
    }
  }
}
```

## 🎯 Quick Test Checklist

- [ ] Firebase test button appears on website
- [ ] Test runs without errors
- [ ] Collections are created in Firestore
- [ ] Registration form works without getting stuck
- [ ] Data appears in Firestore after registration
- [ ] No console errors in browser

## 🆘 Need Help?

If tests fail, check:
1. **Firebase Console** - Is the project active?
2. **GitHub Secrets** - Are all 6 secrets added?
3. **Firestore Rules** - Do they allow read/write?
4. **Browser Console** - Any error messages?
5. **Network Tab** - Any failed requests?
