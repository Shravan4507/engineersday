# Fix Firestore Database - Registration Not Saving

## 🔧 **Quick Fix: Update Firestore Security Rules**

The issue is that your Firestore security rules are preventing writes. Here's how to fix it:

### **Step 1: Go to Firebase Console**
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `engineersday-d8a09`
3. Go to **"Firestore Database"** in the left sidebar
4. Click on **"Rules"** tab

### **Step 2: Update Security Rules**
Replace the current rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to events
    match /events/{document} {
      allow read: if true;
      allow write: if true; // Allow writes for development
    }
    
    // Allow read/write access to event responses
    match /eventResponses/{document} {
      allow read, write: if true; // Allow all access for development
    }
    
    // Allow read/write access to test collection
    match /test/{document} {
      allow read, write: if true;
    }
  }
}
```

### **Step 3: Publish Rules**
1. Click **"Publish"** button
2. Confirm the changes

## 🧪 **Test the Fix**

### **Method 1: Browser Console Test**
1. Open your website: http://localhost:5175/
2. Open browser console (F12)
3. Run these commands:

```javascript
// Test basic connection
testFirestoreConnection()

// Test event registration
testEventResponse()
```

### **Method 2: Manual Registration Test**
1. Go to Events section
2. Click "Register Now" on any event
3. Fill out the form and submit
4. Check browser console for any errors
5. Check Firestore database for new documents

## 🔍 **Debug Steps**

### **Check Console Errors**
Look for these common errors:
- `Permission denied` → Security rules issue
- `Missing or insufficient permissions` → Security rules issue
- `Firebase: Error (auth/network-request-failed)` → Network issue
- `Firebase: Error (auth/invalid-api-key)` → Config issue

### **Check Firestore Database**
1. Go to Firebase Console → Firestore Database
2. Look for these collections:
   - `events` - Should contain your 3 events
   - `eventResponses` - Should contain user registrations
   - `test` - Should contain test documents

## 🚨 **Common Issues & Solutions**

### **Issue 1: Permission Denied**
**Solution**: Update security rules (see Step 2 above)

### **Issue 2: Network Error**
**Solution**: Check internet connection and Firebase project status

### **Issue 3: Invalid API Key**
**Solution**: Verify your Firebase config in `src/firebase/config.ts`

### **Issue 4: Collection Not Found**
**Solution**: The app will auto-create collections on first write

## 🔒 **Production Security Rules**

For production, use these more secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Events - read only for public
    match /events/{document} {
      allow read: if true;
      allow write: if false; // Only admin can write
    }
    
    // Event responses - allow writes but with validation
    match /eventResponses/{document} {
      allow read, write: if request.auth != null; // Require authentication
      // Or for public access:
      // allow read, write: if true;
    }
  }
}
```

## ✅ **Verification Checklist**

- [ ] Security rules updated and published
- [ ] No console errors
- [ ] Test functions work in browser console
- [ ] Registration form submits successfully
- [ ] Data appears in Firestore database
- [ ] Events load from database

## 🆘 **Still Not Working?**

If the issue persists:

1. **Check Firebase Project Status**: Ensure your project is active
2. **Verify Billing**: Some features require a paid plan
3. **Check Quotas**: Ensure you haven't exceeded free tier limits
4. **Contact Support**: Use Firebase support if needed

## 📞 **Quick Test Commands**

Run these in browser console to test:

```javascript
// Test 1: Basic connection
testFirestoreConnection().then(console.log)

// Test 2: Event registration
testEventResponse().then(console.log)

// Test 3: Check collections
import { collection, getDocs } from 'firebase/firestore';
import { db } from './src/firebase/config';
getDocs(collection(db, 'events')).then(snap => console.log('Events:', snap.size));
```

Your registration system should work after updating the security rules! 🎉
