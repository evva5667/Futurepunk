# Firebase Setup Instructions

This app uses Firebase Realtime Database for cross-device pairing. Follow these steps to set it up:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard (you can skip Google Analytics if you want)

## Step 2: Enable Realtime Database

1. In your Firebase project, go to **Realtime Database** in the left sidebar
2. Click **Create Database**
3. Choose a location (closest to your users)
4. Start in **test mode** (we'll add security rules later)
5. Click **Enable**

## Step 3: Get Your Firebase Config

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select **Project settings**
3. Scroll down to "Your apps" section
4. Click the **</>** (web) icon to add a web app
5. Register your app (give it a nickname like "Reconnect Booth")
6. Copy the `firebaseConfig` object

## Step 4: Update index.html

Open `index.html` and find this section (around line 11-25):

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Replace the placeholder values with your actual Firebase config values.

## Step 5: Set Up Security Rules (Important!)

1. In Firebase Console, go to **Realtime Database** > **Rules**
2. Replace the default rules with:

```json
{
  "rules": {
    "pairing_windows": {
      ".read": true,
      ".write": true,
      ".indexOn": ["expiresAt"]
    },
    "sessions": {
      ".read": true,
      ".write": true
    }
  }
}
```

3. Click **Publish**

**Note:** These rules allow public read/write access. For production, you should add authentication. For now, this works for testing.

## Step 6: Test It!

1. Open your app in two different browser windows/tabs (or devices)
2. In Window 1: Click "Start Session" (Seat 1)
3. In Window 2: Click "Join Session" (Seat 2) within 30 seconds
4. They should automatically pair!

## How It Works

- **Pairing Windows**: When Person 1 starts a session, a 30-second pairing window is created in Firebase
- **Real-time Listeners**: Person 2's app listens for active pairing windows in real-time
- **Automatic Pairing**: When Person 2 clicks "Join", they automatically find and join Person 1's session
- **Cross-Device**: Works across different devices, browsers, and networks!

## Troubleshooting

- **"Firebase not initialized"**: Check that you've added your Firebase config correctly
- **Can't find pairing window**: Make sure both people are clicking within 30 seconds
- **Database errors**: Check that Realtime Database is enabled and rules are published

## Fallback Mode

If Firebase isn't configured, the app automatically falls back to localStorage (works on same device only).

