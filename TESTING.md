# Testing Your App

## Option 1: Test Locally (Easiest - Start Here!)

### Using a Local Server

You can't just open `index.html` directly in a browser because of CORS restrictions with Firebase. You need a local server:

#### Method A: Using Python (if you have it installed)
```bash
# Navigate to your project folder
cd /Users/iqrabano/Downloads/FuturePunkFinal

# Python 3
python3 -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000` in your browser

#### Method B: Using Node.js (if you have it installed)
```bash
# Install a simple server globally (one time)
npm install -g http-server

# Then run it
cd /Users/iqrabano/Downloads/FuturePunkFinal
http-server
```

#### Method C: Using VS Code
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Testing the Pairing System

1. **Open the app in two different browser windows** (or use incognito mode for the second one)
   - Window 1: `http://localhost:8000`
   - Window 2: `http://localhost:8000` (or incognito)

2. **In Window 1 (Person 1):**
   - Click "Start Session" or "Join as SEAT 1"
   - You should see a toast: "Session started! Person 2 has 30 seconds to join."

3. **In Window 2 (Person 2):**
   - Within 30 seconds, click "Join Session" or "Join as SEAT 2"
   - It should automatically find and pair with Person 1's session
   - You should see: "Successfully paired! Joining session..."

4. **Both should now see the question sheet!**

---

## Option 2: Deploy to GitHub Pages (For Real Cross-Device Testing)

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `reconnect-booth` or `future-punk`
3. Don't initialize with README (you already have files)

### Step 2: Push Your Code

```bash
# Navigate to your project
cd /Users/iqrabano/Downloads/FuturePunkFinal

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit with Firebase integration"

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source", select **main** branch
5. Click **Save**
6. Wait a few minutes, then your app will be live at:
   `https://YOUR_USERNAME.github.io/REPO_NAME/`

### Step 4: Test Cross-Device

1. Open the GitHub Pages URL on your phone
2. Open it on your computer (or another device)
3. Test the pairing system - it should work across devices now!

---

## Troubleshooting

### "Firebase not initialized" error
- Check that your Firebase config in `index.html` is correct
- Make sure you've enabled Realtime Database in Firebase Console
- Check browser console (F12) for specific errors

### Pairing doesn't work
- Make sure both people click within 30 seconds
- Check Firebase Console > Realtime Database to see if data is being written
- Check browser console for errors

### CORS errors
- Make sure you're using a local server, not opening `file://` directly
- Check Firebase security rules are published

### Can't see pairing window
- Check Firebase Console > Realtime Database > Data tab
- You should see `pairing_windows` and `sessions` nodes being created

---

## Quick Test Checklist

- [ ] Firebase config added to `index.html`
- [ ] Realtime Database enabled in Firebase Console
- [ ] Security rules published in Firebase Console
- [ ] App opens in browser (via local server)
- [ ] Person 1 can start session
- [ ] Person 2 can join within 30 seconds
- [ ] Both see question sheet
- [ ] Answers save correctly
- [ ] Results show after both complete

