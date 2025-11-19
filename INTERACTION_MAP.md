# Reconnect Booth - Interaction Map

## 🎯 Main Screens & States

### 1. **HOME SCREEN** (No Active Session)
**Visual Elements:**
- Shader circle (animated) in center
- Join Interface overlay on shader (centered)
- "Reconnect Booth" title (top left)
- "Home" button (top right)
- "Worlds" selector (right side) with 4 shader options

**Interactions:**

#### Join Interface (Center)
- **"Start a new session (Seat 1)" button**
  - → Creates session code
  - → Updates URL with `?code=XXXXXX`
  - → Hides join interface
  - → **Goes to: Question Sheet (Seat 1)**

- **"Paste link or code..." input field**
  - Accepts: 6-digit code OR full URL with code
  - Enables "Join (Seat 2)" button when text entered

- **"Join (Seat 2)" button** (enabled when input has text)
  - → Validates code
  - → Joins session
  - → Updates URL with `?code=XXXXXX`
  - → Hides join interface
  - → **Goes to: Question Sheet (Seat 2)**

#### Shader Canvas (Center Circle)
- **Click on shader** (when no session)
  - → Does nothing (join interface already visible)

#### Worlds Selector (Right Side)
- **Click on any shader preview circle**
  - → Changes active shader
  - → Updates main shader animation
  - → Saves preference to localStorage

#### Home Button (Top Right)
- **Click "Home"**
  - → Resets session
  - → Clears URL parameters
  - → Shows join interface
  - → Returns to HOME SCREEN

---

### 2. **QUESTION SHEET** (Active Session)
**Visual Elements:**
- Bottom sheet sliding up from bottom
- Header: "Seat 1" or "Seat 2", session code, "Home" button
- Question carousel with 10 questions
- Navigation: Previous, dots, Next/Complete buttons

**Interactions:**

#### Question Options
- **Click any answer option**
  - → Saves answer
  - → Auto-advances to next question (after 300ms)
  - → **Special:** After 5th question answered, shows mid-question message overlay

#### Navigation
- **"← Previous" button**
  - → Goes to previous question
  - → Disabled on first question

- **Question dots (1-10)**
  - → Jump to any question by clicking dot
  - → Dots show: active (current), answered (filled)

- **"Next →" button**
  - → Goes to next question
  - → Disabled on last question

- **"Save & Share →" button** (Seat 1, last question)
  - → Validates all questions answered
  - → Saves answers
  - → Generates join URL with encoded answers
  - → Updates URL: `?code=XXXXXX&join=ENCODED_DATA`
  - → Hides question sheet
  - → **Goes to: HOME SCREEN** (with session active, shows center display)

- **"Finish →" button** (Seat 2, last question)
  - → Validates all questions answered
  - → Calculates compatibility score
  - → Generates result URL
  - → Updates URL: `?result=ENCODED_DATA`
  - → Hides question sheet
  - → **Goes to: RESULT SHEET**

#### Header Actions
- **"Home" button** (top right of sheet)
  - → Resets session
  - → Clears URL parameters
  - → Hides question sheet
  - → **Goes to: HOME SCREEN**

#### Shader Canvas (when session active)
- **Click on shader circle**
  - → Opens question sheet (if not already open)

---

### 3. **RESULT SHEET** (After Seat 2 Completes)
**Visual Elements:**
- Bottom sheet with compatibility results
- Score display (percentage)
- Activity suggestions
- "Done" button

**Interactions:**

- **"Done" button**
  - → Resets session
  - → Clears URL parameters
  - → Hides result sheet
  - → **Goes to: HOME SCREEN**

- **Close button (×)**
  - → Same as "Done" button

---

### 4. **WELCOME OVERLAY** (Initial Load)
**Visual Elements:**
- Full-screen dark overlay
- Centered text messages

**Flow:**
1. "Welcome to Reconnect Booth" (2 seconds)
2. "Discover your compatibility through meaningful questions" (3 seconds)
3. "You have 4 worlds to choose from your vibe" (3 seconds)
4. Auto-dismisses → **Goes to: HOME SCREEN**

**Interactions:**
- None (auto-dismisses)

---

### 5. **MID-QUESTION MESSAGE** (After 5th Question)
**Visual Elements:**
- Full-screen dark overlay
- Centered text message

**Flow:**
1. "Are you enjoying this experience?" (3 seconds)
2. "If you are sure you want to continue" (word-by-word typing animation)
3. Auto-dismisses → Returns to Question Sheet

**Interactions:**
- None (auto-dismisses)

---

## 🔄 Complete User Flows

### Flow A: Person 1 (Starts Session)
```
HOME SCREEN
  ↓ [Click "Start a new session (Seat 1)"]
QUESTION SHEET (Seat 1)
  ↓ [Answer 10 questions]
  ↓ [Click "Save & Share →"]
HOME SCREEN (with session active)
  ↓ [Wait for Person 2 to join and complete]
  ↓ [Person 2 completes → Results available via URL]
```

### Flow B: Person 2 (Joins Session)
```
HOME SCREEN
  ↓ [Enter code in "Paste link or code..."]
  ↓ [Click "Join (Seat 2)"]
QUESTION SHEET (Seat 2)
  ↓ [Answer 10 questions]
  ↓ [Click "Finish →"]
RESULT SHEET
  ↓ [View compatibility score & activities]
  ↓ [Click "Done"]
HOME SCREEN
```

### Flow C: Direct URL Access
```
URL with ?code=XXXXXX
  ↓ [Auto-joins session]
QUESTION SHEET (Seat 2)

URL with ?code=XXXXXX&join=ENCODED_DATA
  ↓ [Auto-joins with Person 1's answers]
QUESTION SHEET (Seat 2)

URL with ?result=ENCODED_DATA
  ↓ [Shows results directly]
RESULT SHEET
```

---

## 🎨 Visual States

### Shader Circle States
- **No Session:** Shows join interface overlay, pointer-events disabled
- **Active Session:** Shows center display (session code, seat, progress), clickable
- **Questions Complete:** Shows checkmark icon with "All questions answered!"

### Center Display (when session active)
- **During Questions:** Shows session code, seat number, progress (X/10 answered)
- **All Answered:** Shows checkmark with "Tap to share" (Seat 1) or "Tap to see results" (Seat 2)

### Join Interface Visibility
- **Visible:** When `state.currentSessionCode === null`
- **Hidden:** When session is active

---

## 🔑 Key Functions

| Function | Trigger | Action |
|----------|---------|--------|
| `handleStartSession()` | "Start a new session" button | Creates session, goes to questions |
| `handleJoinSession()` | "Join (Seat 2)" button | Joins session, goes to questions |
| `handleQuestionComplete()` | "Save & Share" or "Finish" button | Saves answers, calculates results |
| `handleCanvasClick()` | Click shader circle | Opens question sheet (if session active) |
| `handleGoHome()` | "Home" button | Resets session, returns to home |
| `handleDone()` | "Done" button (results) | Resets session, returns to home |

---

## 📱 Sheet Management

**Sheets (Bottom Slide-up Modals):**
- `start-sheet` - Not used in automatic flow
- `waiting-sheet` - Simplified, not used
- `person1-waiting-sheet` - Simplified, not used
- `connected-sheet` - Not used in automatic flow
- `question-sheet` - **Active during questions**
- `result-sheet` - **Active when showing results**

**Overlays (Full-screen):**
- `welcome-overlay` - Initial welcome messages
- `mid-question-overlay` - Mid-question message

---

## 🎯 Session States

1. **No Session** (`currentSessionCode === null`)
   - Shows: Join Interface
   - Canvas: Not clickable

2. **Active Session - Seat 1** (`currentSeat === "1"`)
   - Shows: Center Display with progress
   - Canvas: Clickable → Opens Question Sheet
   - After completion: Returns to home, URL updated with join data

3. **Active Session - Seat 2** (`currentSeat === "2"`)
   - Shows: Center Display with progress
   - Canvas: Clickable → Opens Question Sheet
   - After completion: Shows Result Sheet

---

## 🔄 State Transitions

```
HOME (no session)
  → Start Session → QUESTIONS (Seat 1)
  → Join Session → QUESTIONS (Seat 2)

QUESTIONS (Seat 1)
  → Complete → HOME (with session, waiting for Person 2)

QUESTIONS (Seat 2)
  → Complete → RESULTS

RESULTS
  → Done → HOME (no session)
```

---

## 🎨 UI Elements Always Visible

1. **Top Left:** "Reconnect Booth" title
2. **Top Right:** "Home" button (returns to home from anywhere)
3. **Right Side:** "Worlds" selector with 4 shader options
4. **Center:** Shader circle (always animated)
5. **Center Overlay:** Join Interface (when no session) OR Center Display (when session active)

