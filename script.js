// Questions data
const questions = [
  {
    id: "q1",
    text: "Your ideal weekday evening involves:",
    options: [
      { id: "q1a", text: "Quiet time at home with a book or show", type: 1 },
      { id: "q1b", text: "Video call with a friend", type: 2 },
      { id: "q1c", text: "Exploring a new cafe or walking route", type: 3 },
      { id: "q1d", text: "Group hangout or community event", type: 4 },
    ],
  },
  {
    id: "q2",
    text: "When you meet someone new, you usually:",
    options: [
      { id: "q2a", text: "Observe and listen more than talk", type: 1 },
      { id: "q2b", text: "Ask a few questions to get a feel for them", type: 2 },
      { id: "q2c", text: "Share a story or idea to break the ice", type: 3 },
      { id: "q2d", text: "Jump right into a lively conversation", type: 4 },
    ],
  },
  {
    id: "q3",
    text: "You'd describe your social energy as:",
    options: [
      { id: "q3a", text: "Recharged by alone time", type: 1 },
      { id: "q3b", text: "Balanced — depends on the day", type: 2 },
      { id: "q3c", text: "Energized by interesting people", type: 3 },
      { id: "q3d", text: "Thrives in groups and events", type: 4 },
    ],
  },
  {
    id: "q4",
    text: "Your weekend plans are often:",
    options: [
      { id: "q4a", text: "Low-key, maybe one small plan", type: 1 },
      { id: "q4b", text: "One social thing, one solo thing", type: 2 },
      { id: "q4c", text: "Trying something new or spontaneous", type: 3 },
      { id: "q4d", text: "Full calendar of meetups and activities", type: 4 },
    ],
  },
  {
    id: "q5",
    text: "You prefer conversations that are:",
    options: [
      { id: "q5a", text: "Deep and thoughtful", type: 1 },
      { id: "q5b", text: "A mix of light and meaningful", type: 2 },
      { id: "q5c", text: "Curious and exploratory", type: 3 },
      { id: "q5d", text: "Fast-paced and fun", type: 4 },
    ],
  },
  {
    id: "q6",
    text: "When planning an outing with someone:",
    options: [
      { id: "q6a", text: "You prefer they suggest a quiet spot", type: 1 },
      { id: "q6b", text: "You collaborate on a place you'll both enjoy", type: 2 },
      { id: "q6c", text: "You suggest something new or unique", type: 3 },
      { id: "q6d", text: "You pick a lively, popular spot", type: 4 },
    ],
  },
  {
    id: "q7",
    text: "Your approach to making friends is:",
    options: [
      { id: "q7a", text: "Slow and selective", type: 1 },
      { id: "q7b", text: "Open but intentional", type: 2 },
      { id: "q7c", text: "Curious and exploratory", type: 3 },
      { id: "q7d", text: "Outgoing and inclusive", type: 4 },
    ],
  },
  {
    id: "q8",
    text: "You feel most connected when:",
    options: [
      { id: "q8a", text: "Having meaningful one-on-one time", type: 1 },
      { id: "q8b", text: "Doing something together (like a project)", type: 2 },
      { id: "q8c", text: "Exploring ideas or places together", type: 3 },
      { id: "q8d", text: "Sharing experiences in a group", type: 4 },
    ],
  },
  {
    id: "q9",
    text: "Your texting style is:",
    options: [
      { id: "q9a", text: "Thoughtful replies, sometimes delayed", type: 1 },
      { id: "q9b", text: "Depends on my mood and the topic", type: 2 },
      { id: "q9c", text: "Quick responses with lots of ideas", type: 3 },
      { id: "q9d", text: "Constant back-and-forth, lots of emojis", type: 4 },
    ],
  },
  {
    id: "q10",
    text: "You'd describe your vibe as:",
    options: [
      { id: "q10a", text: "Calm and introspective", type: 1 },
      { id: "q10b", text: "Adaptable and easygoing", type: 2 },
      { id: "q10c", text: "Creative and curious", type: 3 },
      { id: "q10d", text: "Energetic and outgoing", type: 4 },
    ],
  },
];

// Activity suggestions
const activitySuggestions = {
  1: [
    "Coffee and deep conversation at a quiet cafe",
    "Museum or gallery visit",
    "Nature walk or park visit",
  ],
  2: [
    "Collaborative cooking or art class",
    "Board game cafe",
    "Casual lunch and explore a neighborhood",
  ],
  3: [
    "Art/cook collab or creative workshop",
    "City exploration or new restaurant",
    "Creative jam session or maker space",
  ],
  4: [
    "Group outing (trivia, sports, concert)",
    "Community event or festival",
    "Active adventure (hiking, sports, dancing)",
  ],
};

// Shader definitions
const shaders = [
  {
    id: 1,
    name: "Flowing Waves",
    fragmentShader: `
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform int hasActiveReminders;
uniform int hasUpcomingReminders;
uniform int disableCenterDimming;
varying vec2 vTextureCoord;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
  vec2 center = iResolution.xy * 0.5;
  float dist = distance(fragCoord, center);
  float radius = min(iResolution.x, iResolution.y) * 0.5;
  float centerDim = float(disableCenterDimming) > 0.5 ? 1.0 : smoothstep(radius * 0.3, radius * 0.5, dist);

  for(float i = 1.0; i < 10.0; i++){
    uv.x += 0.6 / i * cos(i * 2.5 * uv.y + iTime);
    uv.y += 0.6 / i * cos(i * 1.5 * uv.x + iTime);
  }
  
  if (hasActiveReminders > 0) {
    fragColor = vec4(vec3(0.1, 0.3, 0.6) / abs(sin(iTime - uv.y - uv.x)), 1.0);
  } else if (hasUpcomingReminders > 0) {
    fragColor = vec4(vec3(0.1, 0.5, 0.2) / abs(sin(iTime - uv.y - uv.x)), 1.0);
  } else {
    fragColor = vec4(vec3(0.1) / abs(sin(iTime - uv.y - uv.x)), 1.0);
  }
  
  if (disableCenterDimming == 0) {
    fragColor.rgb = mix(fragColor.rgb * 0.3, fragColor.rgb, centerDim);
  }
}

void main() {
  vec2 fragCoord = vTextureCoord * iResolution;
  vec2 center = iResolution * 0.5;
  float dist = distance(fragCoord, center);
  float radius = min(iResolution.x, iResolution.y) * 0.5;
  
  if (dist < radius) {
    vec4 color;
    mainImage(color, fragCoord);
    gl_FragColor = color;
  } else {
    discard;
  }
}
    `,
  },
  {
    id: 2,
    name: "Ether",
    fragmentShader: `
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform int hasActiveReminders;
uniform int hasUpcomingReminders;
uniform int disableCenterDimming;
varying vec2 vTextureCoord;

#define t iTime
mat2 m(float a){float c=cos(a), s=sin(a);return mat2(c,-s,s,c);}
float map(vec3 p, int isActive, int isUpcoming){
    p.xz*= m(t*0.4);p.xy*= m(t*0.3);
    vec3 q = p*2.+t;
    return length(p+vec3(sin(t*0.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.5 - 1.;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = fragCoord.xy/min(iResolution.x, iResolution.y) - vec2(.9, .5);
    p.x += 0.4;
    
    vec3 cl = vec3(0.);
    float d = 2.5;
    
    for(int i=0; i<=5; i++) {
        vec3 p3d = vec3(0,0,5.) + normalize(vec3(p, -1.))*d;
        float rz = map(p3d, hasActiveReminders, hasUpcomingReminders);
        float f = clamp((rz - map(p3d+.1, hasActiveReminders, hasUpcomingReminders))*0.5, -.1, 1.);
        
        vec3 baseColor;
        if(hasActiveReminders > 0) {
            baseColor = vec3(0.05, 0.2, 0.5) + vec3(4.0, 2.0, 5.0)*f;
        } else if(hasUpcomingReminders > 0) {
            baseColor = vec3(0.05, 0.3, 0.1) + vec3(2.0, 5.0, 1.0)*f;
        } else {
            baseColor = vec3(0.1, 0.3, 0.4) + vec3(5.0, 2.5, 3.0)*f;
        }
        
        cl = cl*baseColor + smoothstep(2.5, .0, rz)*.7*baseColor;
        d += min(rz, 1.);
    }
    
    float mouseInfluence = 0.0;
    if(iMouse.x > 0.0 || iMouse.y > 0.0) {
        vec2 mousePos = iMouse.xy;
        float mouseDist = length(p - (mousePos*2.0-vec2(1.0))*0.5);
        mouseInfluence = smoothstep(0.6, 0.0, mouseDist);
        
        if(hasActiveReminders > 0) {
            cl += vec3(0.2, 0.4, 1.0) * mouseInfluence * 0.3;
        } else if(hasUpcomingReminders > 0) {
            cl += vec3(0.2, 1.0, 0.4) * mouseInfluence * 0.3;
        } else {
            cl += vec3(0.5, 0.3, 0.7) * mouseInfluence * 0.3;
        }
    }
    
    vec2 center = iResolution.xy * 0.5;
    float dist = distance(fragCoord, center);
    float radius = min(iResolution.x, iResolution.y) * 0.5;
    float centerDim = float(disableCenterDimming) > 0.5 ? 1.0 : smoothstep(radius * 0.3, radius * 0.5, dist);
    
    fragColor = vec4(cl, 1.0);
    
    if (disableCenterDimming == 0) {
        fragColor.rgb = mix(fragColor.rgb * 0.3, fragColor.rgb, centerDim);
    }
}

void main() {
    vec2 fragCoord = vTextureCoord * iResolution;
    vec2 center = iResolution * 0.5;
    float dist = distance(fragCoord, center);
    float radius = min(iResolution.x, iResolution.y) * 0.5;
    
    if (dist < radius) {
        vec4 color;
        mainImage(color, fragCoord);
        gl_FragColor = color;
    } else {
        discard;
    }
}
    `,
  },
  {
    id: 3,
    name: "Shooting Stars",
    fragmentShader: `
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform int hasActiveReminders;
uniform int hasUpcomingReminders;
uniform int disableCenterDimming;
varying vec2 vTextureCoord;

void mainImage(out vec4 O, in vec2 fragCoord) {
  O = vec4(0.0, 0.0, 0.0, 1.0);
  vec2 b = vec2(0.0, 0.2);
  vec2 p;
  mat2 R = mat2(1.0, 0.0, 0.0, 1.0);
  
  vec2 center = iResolution.xy * 0.5;
  float dist = distance(fragCoord, center);
  float radius = min(iResolution.x, iResolution.y) * 0.5;
  float centerDim = float(disableCenterDimming) > 0.5 ? 1.0 : smoothstep(radius * 0.3, radius * 0.5, dist);
  
  for(int i = 0; i < 20; i++) {
    float fi = float(i) + 1.0;
    float angle = fi + 0.0;
    float c = cos(angle);
    float s = sin(angle);
    R = mat2(c, -s, s, c);
    
    float angle2 = fi + 33.0;
    float c2 = cos(angle2);
    float s2 = sin(angle2);
    mat2 R2 = mat2(c2, -s2, s2, c2);
    
    vec2 coord = fragCoord / iResolution.y * fi * 0.1 + iTime * b;
    vec2 frac_coord = fract(coord * R2) - 0.5;
    p = R * frac_coord;
    vec2 clamped_p = clamp(p, -b, b);
    
    float len = length(clamped_p - p);
    if (len > 0.0) {
      vec4 star = 1e-3 / len * (cos(p.y / 0.1 + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0);
      O += star;
    }
  }
  
  if (hasActiveReminders > 0) {
    O.rgb = mix(O.rgb, vec3(0.2, 0.4, 1.0), 0.3);
  } else if (hasUpcomingReminders > 0) {
    O.rgb = mix(O.rgb, vec3(0.2, 1.0, 0.4), 0.3);
  }
  
  if (disableCenterDimming == 0) {
    O.rgb = mix(O.rgb * 0.3, O.rgb, centerDim);
  }
}

void main() {
  vec2 fragCoord = vTextureCoord * iResolution;
  vec2 center = iResolution * 0.5;
  float dist = distance(fragCoord, center);
  float radius = min(iResolution.x, iResolution.y) * 0.5;
  
  if (dist < radius) {
    vec4 color;
    mainImage(color, fragCoord);
    gl_FragColor = color;
  } else {
    discard;
  }
}
    `,
  },
  {
    id: 4,
    name: "Wavy Lines",
    fragmentShader: `
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform int hasActiveReminders;
uniform int hasUpcomingReminders;
uniform int disableCenterDimming;
varying vec2 vTextureCoord;

#define PI 3.14159265359

float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i.x + i.y * 57.0);
    float b = hash(i.x + 1.0 + i.y * 57.0);
    float c = hash(i.x + i.y * 57.0 + 1.0);
    float d = hash(i.x + 1.0 + i.y * 57.0 + 1.0);
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for(int i = 0; i < 6; i++) {
        sum += amp * noise(p * freq);
        amp *= 0.5;
        freq *= 2.0;
    }
    return sum;
}

float lines(vec2 uv, float thickness, float distortion) {
    float y = uv.y;
    float distortionAmount = distortion * fbm(vec2(uv.x * 2.0, y * 0.5 + iTime * 0.1));
    y += distortionAmount;
    float linePattern = fract(y * 20.0);
    float line = smoothstep(0.5 - thickness, 0.5, linePattern) - 
                smoothstep(0.5, 0.5 + thickness, linePattern);
    return line;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    float aspect = iResolution.x / iResolution.y;
    uv.x *= aspect;
    
    vec2 mousePos = iMouse.xy;
    mousePos.x *= aspect;
    float mouseDist = length(uv - mousePos);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist);
    
    float baseThickness = 0.05;
    float baseDistortion = 0.2;
    float thickness = mix(baseThickness, baseThickness * 1.5, mouseInfluence);
    float distortion = mix(baseDistortion, baseDistortion * 2.0, mouseInfluence);
    
    float line = lines(uv, thickness, distortion);
    float timeOffset = sin(iTime * 0.2) * 0.1;
    float animatedLine = lines(uv + vec2(timeOffset, 0.0), thickness, distortion);
    line = mix(line, animatedLine, 0.3);
    
    vec3 backgroundColor = vec3(0.0, 0.0, 0.0);
    vec3 lineColor;
    
    if (hasActiveReminders > 0) {
        lineColor = vec3(0.2, 0.4, 1.0);
    } else if (hasUpcomingReminders > 0) {
        lineColor = vec3(0.2, 1.0, 0.4);
    } else {
        lineColor = vec3(1.0, 1.0, 1.0);
    }
    
    vec3 finalColor = mix(backgroundColor, lineColor, line);
    
    if (hasActiveReminders > 0) {
        finalColor += vec3(0.1, 0.2, 0.5) * mouseInfluence * line;
    } else if (hasUpcomingReminders > 0) {
        finalColor += vec3(0.1, 0.5, 0.2) * mouseInfluence * line;
    } else {
        finalColor += vec3(0.1, 0.1, 0.1) * mouseInfluence * line;
    }
    
    fragColor = vec4(finalColor, 1.0);
    
    vec2 center = iResolution.xy * 0.5;
    float dist = distance(fragCoord, center);
    float radius = min(iResolution.x, iResolution.y) * 0.5;
    float centerDim = float(disableCenterDimming) > 0.5 ? 1.0 : smoothstep(radius * 0.3, radius * 0.5, dist);
    
    if (disableCenterDimming == 0) {
        fragColor.rgb = mix(fragColor.rgb * 0.3, fragColor.rgb, centerDim);
    }
}

void main() {
    vec2 fragCoord = vTextureCoord * iResolution;
    vec2 center = iResolution * 0.5;
    float dist = distance(fragCoord, center);
    float radius = min(iResolution.x, iResolution.y) * 0.5;
    
    if (dist < radius) {
        vec4 color;
        mainImage(color, fragCoord);
        gl_FragColor = color;
    } else {
        discard;
    }
}
    `,
  },
];

const vertexShader = `
attribute vec4 aVertexPosition;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;
void main() {
  gl_Position = aVertexPosition;
  vTextureCoord = aTextureCoord;
}
`;

// Application State
const state = {
  currentSessionCode: null,
  currentSeat: null,
  answers: {},
  canvasSize: 600,
  showStartSheet: false,
  showWaitingSheet: false,
  showConnectedSheet: false,
  showQuestionSheet: false,
  showResultSheet: false,
  selectedShader: 1,
  resultData: null,
  currentQuestionIndex: 0,
  mousePosition: [0.5, 0.5],
  waitingCheckInterval: null,
  countdownTimer: null,
  countdownSeconds: 5,
  midQuestionShown: false,
  welcomeShown: false,
  seatAvailabilityInterval: null,
  isCompleting: false,
};

// Utility Functions
function encodeState(data) {
  const json = JSON.stringify(data);
  const base64 = btoa(json);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function decodeState(encoded) {
  try {
    let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const json = atob(base64);
    return JSON.parse(json);
  } catch (error) {
    console.error("Failed to decode state:", error);
    return null;
  }
}

function generateSessionCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getDeviceId() {
  // Get or create a device ID that persists across refreshes
  let deviceId = localStorage.getItem("reconnect_device_id");
  if (!deviceId) {
    deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("reconnect_device_id", deviceId);
  }
  return deviceId;
}

// Firebase-based pairing system
const PAIRING_WINDOW_DURATION = 30000; // 30 seconds
let firebasePairingListener = null;

// Initialize Firebase pairing window
function createPairingWindow(code) {
  if (!window.firebaseDB || !window.firebaseDB.database || !window.firebaseDB.ref || !window.firebaseDB.set) {
    console.warn("⚠️ Firebase not initialized. Falling back to localStorage.");
    createPairingWindowLocal(code);
    return;
  }
  
  const { database, ref, set } = window.firebaseDB;
  const now = Date.now();
  const pairingData = {
    code: code,
    createdAt: now,
    expiresAt: now + PAIRING_WINDOW_DURATION,
    seat1Taken: true,
    seat2Taken: false
  };
  
  console.log("🚀 Creating pairing window in Firebase:", code, "Expires at:", new Date(pairingData.expiresAt).toLocaleTimeString());
  
  // Store in Firebase
  set(ref(database, `pairing_windows/${code}`), pairingData)
    .then(() => {
      console.log("✅ Pairing window created in Firebase! Code:", code);
      showToast("Pairing window active for 30 seconds", "success");
    })
    .catch((error) => {
      console.error("❌ Error creating pairing window:", error);
      showToast("Error creating pairing window", "error");
      // Fallback to localStorage
      createPairingWindowLocal(code);
    });
  
  // Keep pairing window active while session is active (don't auto-expire)
  // Only remove when Seat 2 joins or session ends
}

function removePairingWindow(code) {
  if (!window.firebaseDB) return;
  
  const { database, ref, remove } = window.firebaseDB;
  remove(ref(database, `pairing_windows/${code}`))
    .catch((error) => {
      console.error("Error removing pairing window:", error);
    });
}

// Listen for active pairing windows in real-time
function setupPairingWindowListener(callback) {
  if (!window.firebaseDB || !window.firebaseDB.database || !window.firebaseDB.ref || !window.firebaseDB.onValue) {
    // Fallback: poll localStorage
    return setInterval(() => {
      const code = findAvailablePairingWindowLocal();
      if (code) callback(code);
    }, 1000);
  }
  
  const { database, ref, onValue, query, orderByChild, startAt } = window.firebaseDB;
  const now = Date.now();
  
  // Query for active pairing windows (not expired)
  const pairingWindowsRef = ref(database, 'pairing_windows');
  const activeQuery = query(
    pairingWindowsRef,
    orderByChild('expiresAt'),
    startAt(now)
  );
  
  firebasePairingListener = onValue(activeQuery, async (snapshot) => {
    if (snapshot.exists()) {
      const windows = snapshot.val();
      // Find first available window (seat1 taken, seat2 available)
      for (const code in windows) {
        const window = windows[code];
        // Verify session exists and Seat 2 hasn't joined
        const sessionData = await loadSessionAsync(code);
        if (window.seat1Taken && !window.seat2Taken && sessionData && !sessionData.seat2DeviceId) {
          callback(code);
          break;
        }
      }
    }
  }, (error) => {
    console.error("❌ Error listening to pairing windows:", error);
  });
  
  return firebasePairingListener;
}

function stopPairingWindowListener() {
  if (firebasePairingListener && window.firebaseDB && window.firebaseDB.database && window.firebaseDB.ref && window.firebaseDB.off) {
    const { database, ref, off } = window.firebaseDB;
    off(ref(database, 'pairing_windows'));
    firebasePairingListener = null;
  }
}

// Fallback localStorage functions
function createPairingWindowLocal(code) {
  const pairingData = {
    code: code,
    createdAt: Date.now(),
    expiresAt: Date.now() + PAIRING_WINDOW_DURATION
  };
  localStorage.setItem(`pairing_window_${code}`, JSON.stringify(pairingData));
  const activeWindows = getActivePairingWindowsLocal();
  activeWindows.push(pairingData);
  localStorage.setItem('active_pairing_windows', JSON.stringify(activeWindows));
}

function getActivePairingWindowsLocal() {
  try {
    const data = localStorage.getItem('active_pairing_windows');
    if (!data) return [];
    const windows = JSON.parse(data);
    const now = Date.now();
    const active = windows.filter(w => w.expiresAt > now);
    localStorage.setItem('active_pairing_windows', JSON.stringify(active));
    return active;
  } catch (e) {
    return [];
  }
}

function findAvailablePairingWindowLocal() {
  const activeWindows = getActivePairingWindowsLocal();
  for (const window of activeWindows) {
    const sessionData = loadSession(window.code);
    if (sessionData) {
      const availability = getSeatAvailability(window.code);
      if (availability.seat1 && !availability.seat2) {
        return window.code;
      }
    }
  }
  return null;
}

// Centralized seat availability checking
function getSeatAvailability(code) {
  if (!code || !/^\d{6}$/.test(code)) {
    // No code - check if this device is in any session
    const deviceId = getDeviceId();
    // Check all localStorage sessions
    let isInAnySession = false;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('reconnect_session_')) {
        try {
          const sessionData = JSON.parse(localStorage.getItem(key));
          if (sessionData?.seat1DeviceId === deviceId || sessionData?.seat2DeviceId === deviceId) {
            isInAnySession = true;
            break;
          }
        } catch (e) {}
      }
    }
    return { seat1: isInAnySession, seat2: false, isSeat1: false, isSeat2: false };
  }
  
  const params = new URLSearchParams(window.location.search);
  const urlSeat1 = params.get("seat1") === "taken";
  const urlSeat2 = params.get("seat2") === "taken";
  const sessionData = loadSession(code);
  const deviceId = getDeviceId();
  
  // Check if this device is already in a seat
  const isSeat1 = sessionData?.seat1DeviceId === deviceId;
  const isSeat2 = sessionData?.seat2DeviceId === deviceId;
  
  // Determine seat availability (URL params are source of truth for cross-device)
  const seat1Taken = urlSeat1 || isSeat1 || !!(sessionData?.seat1DeviceId || sessionData?.seat1Connected || sessionData?.seat1Ready);
  const seat2Taken = urlSeat2 || isSeat2 || !!(sessionData?.seat2DeviceId || sessionData?.seat2Connected || sessionData?.seat2Ready);
  
  console.log("🔍 Seat availability check:", { code, seat1Taken, seat2Taken, isSeat1, isSeat2, urlSeat1, urlSeat2 });
  
  return { seat1: seat1Taken, seat2: seat2Taken, isSeat1, isSeat2 };
}

// Restore session if user is already in one
async function restoreSessionIfExists(code) {
  if (!code || !/^\d{6}$/.test(code)) return false;
  
  const sessionData = await loadSessionAsync(code);
  if (!sessionData) return false;
  
  const deviceId = getDeviceId();
  const isSeat1 = sessionData?.seat1DeviceId === deviceId;
  const isSeat2 = sessionData?.seat2DeviceId === deviceId;
  
  if (isSeat1) {
    state.currentSessionCode = code;
    state.currentSeat = "1";
    state.answers = sessionData.seat1 || {};
    updateUrlWithSeats(code, true, false);
    return true;
  } else if (isSeat2) {
    state.currentSessionCode = code;
    state.currentSeat = "2";
    state.answers = sessionData.seat2 || {};
    updateUrlWithSeats(code, true, true);
    return true;
  }
  
  return false;
}

// Update URL with seat status
function updateUrlWithSeats(code, seat1Taken, seat2Taken) {
  const baseUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();
  params.set("code", code);
  if (seat1Taken) params.set("seat1", "taken");
  if (seat2Taken) params.set("seat2", "taken");
  const url = `${baseUrl}?${params.toString()}`;
  window.history.replaceState({}, "", url);
}

function saveSession(code, data) {
  const sessionData = {
    ...data,
    lastUpdated: Date.now(),
  };
  
  // Always save to localStorage first (for immediate access)
  localStorage.setItem(`reconnect_session_${code}`, JSON.stringify(sessionData));
  
  // Also save to Firebase if available (for cross-device sync)
  if (window.firebaseDB && window.firebaseDB.database && window.firebaseDB.ref && window.firebaseDB.set) {
    const { database, ref, set } = window.firebaseDB;
    set(ref(database, `sessions/${code}`), sessionData)
      .then(() => {
        console.log("✅ Session saved to Firebase:", code);
      })
      .catch((error) => {
        console.error("❌ Error saving session to Firebase:", error);
        // localStorage already saved, so we're good
      });
  }
}

function loadSession(code) {
  // Synchronous version - returns null if Firebase, will use async version
  // This maintains backward compatibility
  if (window.firebaseDB) {
    // For sync calls, return null and let async version handle it
    // Or return from localStorage as fallback
    const localData = localStorage.getItem(`reconnect_session_${code}`);
    return localData ? JSON.parse(localData) : null;
  }
  
  // Fallback to localStorage
  const data = localStorage.getItem(`reconnect_session_${code}`);
  return data ? JSON.parse(data) : null;
}

// Async version for Firebase
async function loadSessionAsync(code) {
  // Try Firebase first (for cross-device sync)
  if (window.firebaseDB && window.firebaseDB.database && window.firebaseDB.ref && window.firebaseDB.get) {
    const { database, ref, get } = window.firebaseDB;
    try {
      const snapshot = await get(ref(database, `sessions/${code}`));
      if (snapshot.exists()) {
        const firebaseData = snapshot.val();
        console.log("✅ Loaded session from Firebase:", code, "Seat 1 answers:", !!(firebaseData?.seat1 || firebaseData?.seat1Answers));
        // Also update localStorage with latest data
        localStorage.setItem(`reconnect_session_${code}`, JSON.stringify(firebaseData));
        return firebaseData;
      }
    } catch (error) {
      console.error("❌ Error loading session from Firebase:", error);
    }
  }
  
  // Fallback to localStorage
  const data = localStorage.getItem(`reconnect_session_${code}`);
  if (data) {
    const parsed = JSON.parse(data);
    console.log("📦 Loaded session from localStorage:", code, "Seat 1 answers:", !!(parsed?.seat1 || parsed?.seat1Answers));
    return parsed;
  }
  return null;
}

function checkBothConnected(code) {
  const sessionData = loadSession(code);
  return !!(sessionData?.seat1 && sessionData?.seat2);
}

function markSeatReady(code, seat) {
  const sessionData = loadSession(code) || {};
  sessionData[`seat${seat}Ready`] = true;
  sessionData.lastUpdated = Date.now();
  saveSession(code, sessionData);
}

function calculateCompatibility(answers1, answers2) {
  const types1 = questions.map((q) => {
    const answer = answers1[q.id];
    const option = q.options.find((opt) => opt.id === answer);
    return option?.type || 2;
  });

  const types2 = questions.map((q) => {
    const answer = answers2[q.id];
    const option = q.options.find((opt) => opt.id === answer);
    return option?.type || 2;
  });

  let totalDiff = 0;
  for (let i = 0; i < types1.length; i++) {
    totalDiff += Math.abs(types1[i] - types2[i]);
  }

  const maxDiff = questions.length * 3;
  const score = Math.round(100 - (totalDiff / maxDiff) * 100);
  return score;
}

function findDominantType(answers1, answers2) {
  const typeCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };

  questions.forEach((q) => {
    const answer1 = answers1[q.id];
    const option1 = q.options.find((opt) => opt.id === answer1);
    if (option1) typeCounts[option1.type]++;

    const answer2 = answers2[q.id];
    const option2 = q.options.find((opt) => opt.id === answer2);
    if (option2) typeCounts[option2.type]++;
  });

  let dominantType = 2;
  let maxCount = 0;
  for (const [type, count] of Object.entries(typeCounts)) {
    if (count > maxCount) {
      maxCount = count;
      dominantType = parseInt(type);
    }
  }

  return dominantType;
}

// Toast System
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideDown 0.3s ease reverse";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Session Management
function createSession() {
  const code = generateSessionCode();
  const deviceId = getDeviceId();
  state.currentSessionCode = code;
  state.currentSeat = "1";
  state.answers = {};
  
  saveSession(code, { 
    seat1Connected: true, 
    seat1Ready: false,
    seat1DeviceId: deviceId,
    seat2Connected: false,
    seat2Ready: false
  });
  
  // Create a pairing window for 30 seconds
  createPairingWindow(code);
  
  updateUrlWithSeats(code, true, false);
  return code;
}

function joinSession(code) {
  let sessionData = loadSession(code);
  
  if (!sessionData) {
    sessionData = { seat1Connected: false, seat2Connected: false };
    saveSession(code, sessionData);
  }

  const deviceId = getDeviceId();
  state.currentSessionCode = code;
  state.currentSeat = "2";
  state.answers = {};
  
  const updatedData = { 
    ...sessionData, 
    seat2Connected: true, 
    seat2DeviceId: deviceId, 
    seat2Ready: false
  };
  
  saveSession(code, updatedData);
  
  // Remove pairing window since Seat 2 has joined
  removePairingWindow(code);
  
  updateUrlWithSeats(code, true, true);
  console.log("✅ Joined session as Seat 2:", code);
  return true;
}

function saveAnswer(questionId, optionId) {
  state.answers[questionId] = optionId;
  updateCenterDisplay();
}

function getProgress() {
  return Object.keys(state.answers).length;
}

function isComplete() {
  return Object.keys(state.answers).length === questions.length;
}

async function completeSession() {
  if (!state.currentSessionCode || !state.currentSeat) {
    console.error("❌ Cannot complete session: missing code or seat");
    return null;
  }

  console.log("💾 Saving session data for Seat", state.currentSeat);
  const sessionData = await loadSessionAsync(state.currentSessionCode);

  if (state.currentSeat === "1") {
    const updatedData = {
      ...sessionData,
      seat1: state.answers,
      seat1Answers: state.answers, // Save with both keys for compatibility
      seat1Ready: true,
      seat1Connected: true,
    };
    saveSession(state.currentSessionCode, updatedData);
    console.log("✅ Seat 1 answers saved:", Object.keys(state.answers).length, "questions");
    return { seat1Answers: state.answers, seat2Answers: null };
  } else {
    const updatedData = {
      ...sessionData,
      seat2: state.answers,
      seat2Answers: state.answers, // Save with both keys for compatibility
      seat2Ready: true,
      seat2Connected: true,
    };
    saveSession(state.currentSessionCode, updatedData);
    console.log("✅ Seat 2 answers saved:", Object.keys(state.answers).length, "questions");
    return {
      seat1Answers: sessionData?.seat1 || sessionData?.seat1Answers || null,
      seat2Answers: state.answers,
    };
  }
}

function resetSession() {
  state.currentSessionCode = null;
  state.currentSeat = null;
  state.answers = {};
  state.currentQuestionIndex = 0;
  state.resultData = null;
  state.midQuestionShown = false;
  
  // Clear seat availability polling
  if (state.seatAvailabilityInterval) {
    clearInterval(state.seatAvailabilityInterval);
    state.seatAvailabilityInterval = null;
  }
  
  updateCenterDisplay();
  
  // Restart seat availability polling if URL has code
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (code && /^\d{6}$/.test(code)) {
    state.seatAvailabilityInterval = setInterval(() => {
      if (!state.currentSessionCode) {
        updateJoinInterface();
      } else {
        if (state.seatAvailabilityInterval) {
          clearInterval(state.seatAvailabilityInterval);
          state.seatAvailabilityInterval = null;
        }
      }
    }, 1000);
  }
}

// Shader Canvas
let shaderCanvas = null;
let shaderGl = null;
let shaderProgram = null;
let shaderBuffers = null;
let shaderStartTime = null;
let shaderAnimationFrame = null;

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Unable to initialize shader program:", gl.getProgramInfoLog(program));
    return null;
  }

  return program;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function initBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [-1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  const textureCoordinates = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  const indices = [0, 1, 2, 0, 2, 3];
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
  };
}

function drawShaderScene() {
  if (!shaderGl || !shaderProgram || !shaderBuffers) return;

  const currentTime = (Date.now() - shaderStartTime) / 1000;
  const gl = shaderGl;
  const canvas = shaderCanvas;
  const selectedShader = shaders.find((s) => s.id === state.selectedShader) || shaders[0];

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
    },
    uniformLocations: {
      iResolution: gl.getUniformLocation(shaderProgram, "iResolution"),
      iTime: gl.getUniformLocation(shaderProgram, "iTime"),
      iMouse: gl.getUniformLocation(shaderProgram, "iMouse"),
      hasActiveReminders: gl.getUniformLocation(shaderProgram, "hasActiveReminders"),
      hasUpcomingReminders: gl.getUniformLocation(shaderProgram, "hasUpcomingReminders"),
      disableCenterDimming: gl.getUniformLocation(shaderProgram, "disableCenterDimming"),
    },
  };

  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.useProgram(programInfo.program);

  const hasActiveSession = !!state.currentSessionCode;
  const hasCompletedQuestions = isComplete();

  gl.uniform2f(programInfo.uniformLocations.iResolution, canvas.width, canvas.height);
  gl.uniform1f(programInfo.uniformLocations.iTime, currentTime);
  gl.uniform2f(programInfo.uniformLocations.iMouse, state.mousePosition[0], state.mousePosition[1]);
  gl.uniform1i(programInfo.uniformLocations.hasActiveReminders, hasActiveSession ? 1 : 0);
  gl.uniform1i(programInfo.uniformLocations.hasUpcomingReminders, hasCompletedQuestions ? 1 : 0);
  gl.uniform1i(programInfo.uniformLocations.disableCenterDimming, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, shaderBuffers.position);
  gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

  gl.bindBuffer(gl.ARRAY_BUFFER, shaderBuffers.textureCoord);
  gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shaderBuffers.indices);
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

  shaderAnimationFrame = requestAnimationFrame(drawShaderScene);
}

function initShaderCanvas() {
  shaderCanvas = document.getElementById("shader-canvas");
  if (!shaderCanvas) return;

  shaderGl = shaderCanvas.getContext("webgl");
  if (!shaderGl) {
    console.error("WebGL not supported");
    return;
  }

  const selectedShader = shaders.find((s) => s.id === state.selectedShader) || shaders[0];
  shaderProgram = initShaderProgram(shaderGl, vertexShader, selectedShader.fragmentShader);
  if (!shaderProgram) return;

  shaderBuffers = initBuffers(shaderGl);
  shaderStartTime = Date.now();

  const handleResize = () => {
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.7;
    state.canvasSize = size;
    shaderCanvas.width = size;
    shaderCanvas.height = size;
    shaderCanvas.style.width = size + "px";
    shaderCanvas.style.height = size + "px";
    shaderGl.viewport(0, 0, size, size);
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  shaderCanvas.addEventListener("mousemove", (e) => {
    const rect = shaderCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    state.mousePosition = [x, y];
  });

  shaderCanvas.addEventListener("mouseleave", () => {
    state.mousePosition = [0.5, 0.5];
  });

  shaderCanvas.addEventListener("click", handleCanvasClick);

  drawShaderScene();
}

function updateShader() {
  if (!shaderGl || !shaderCanvas) return;

  if (shaderProgram) {
    shaderGl.deleteProgram(shaderProgram);
  }
  if (shaderAnimationFrame) {
    cancelAnimationFrame(shaderAnimationFrame);
  }

  const selectedShader = shaders.find((s) => s.id === state.selectedShader) || shaders[0];
  shaderProgram = initShaderProgram(shaderGl, vertexShader, selectedShader.fragmentShader);
  if (!shaderProgram) return;

  shaderStartTime = Date.now();
  drawShaderScene();
}

// Check Firebase for active pairing windows (async)
async function checkActivePairingWindows() {
  if (!window.firebaseDB || !window.firebaseDB.database || !window.firebaseDB.ref || !window.firebaseDB.get) {
    const found = findAvailablePairingWindowLocal() !== null;
    if (found) console.log("🔍 Found pairing window (localStorage)");
    return found;
  }
  
  try {
    const { database, ref, get, query, orderByChild, startAt } = window.firebaseDB;
    const now = Date.now();
    // Look for windows that haven't expired yet (expiresAt > now)
    // Don't limit to futureTime, just check if they're not expired
    const pairingWindowsRef = ref(database, 'pairing_windows');
    const activeQuery = query(
      pairingWindowsRef,
      orderByChild('expiresAt'),
      startAt(now)
    );
    
    const snapshot = await get(activeQuery);
    if (snapshot.exists()) {
      const windows = snapshot.val();
      console.log("🔍 Checking pairing windows:", Object.keys(windows).length, "found");
      // Check if any window has seat1 taken and seat2 available
      for (const code in windows) {
        const window = windows[code];
        // Also check if the session still exists and Seat 2 hasn't joined
        const sessionData = await loadSessionAsync(code);
        if (window.seat1Taken && !window.seat2Taken && sessionData && !sessionData.seat2DeviceId) {
          console.log("✅ Active pairing window found! Code:", code);
          return true;
        }
      }
    } else {
      console.log("🔍 No active pairing windows found");
    }
    return false;
  } catch (error) {
    console.error("❌ Error checking pairing windows:", error);
    return findAvailablePairingWindowLocal() !== null;
  }
}

// Center Display
async function updateJoinInterface() {
  const joinInterface = document.getElementById("join-interface");
  if (!joinInterface) return;

  if (!state.currentSessionCode) {
    joinInterface.classList.remove("hidden");
    joinInterface.style.pointerEvents = "auto";
    joinInterface.style.zIndex = "100";
    const canvas = document.getElementById("shader-canvas");
    if (canvas) {
      canvas.style.pointerEvents = "none";
      canvas.style.cursor = "default";
    }
    
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const availability = getSeatAvailability(code);
    
    // Check for active pairing windows (async)
    const hasActivePairing = await checkActivePairingWindows();
    console.log("🔄 UI Update - Has active pairing:", hasActivePairing);
    
    const seat1Btn = document.getElementById("join-seat-1");
    const seat2Btn = document.getElementById("join-seat-2");
    const seat1Status = document.getElementById("seat-1-status");
    const seat2Status = document.getElementById("seat-2-status");
    
    console.log("🔘 Buttons found:", {
      seat1Btn: !!seat1Btn,
      seat2Btn: !!seat2Btn,
      seat1Disabled: seat1Btn?.disabled,
      seat2Disabled: seat2Btn?.disabled
    });
    
    // Update Seat 1
    if (seat1Btn && seat1Status) {
      if (availability.seat1) {
        seat1Btn.disabled = true;
        seat1Btn.classList.add("seat-taken");
        seat1Status.textContent = "Taken";
      } else {
        seat1Btn.disabled = false;
        seat1Btn.classList.remove("seat-taken");
        seat1Btn.style.pointerEvents = "auto";
        seat1Btn.style.cursor = "pointer";
        seat1Status.textContent = "START SESSION";
      }
    }
    
    // Update Seat 2
    if (seat2Btn && seat2Status) {
      if (availability.seat2) {
        seat2Btn.disabled = true;
        seat2Btn.classList.add("seat-taken");
        seat2Status.textContent = "Taken";
      } else if (code && /^\d{6}$/.test(code)) {
        // Has code in URL - check if Seat 1 is taken
        if (availability.seat1) {
          seat2Btn.disabled = false;
          seat2Btn.classList.remove("seat-taken");
          seat2Btn.style.pointerEvents = "auto";
          seat2Btn.style.cursor = "pointer";
          seat2Status.textContent = "JOIN SESSION";
        } else {
          seat2Btn.disabled = true;
          seat2Btn.classList.remove("seat-taken");
          seat2Status.textContent = "NO ACTIVE SESSION";
        }
      } else if (hasActivePairing) {
        // No code but there's an active pairing window
        console.log("✅ Active pairing found - enabling Seat 2 button");
        seat2Btn.disabled = false;
        seat2Btn.classList.remove("seat-taken");
        seat2Btn.style.pointerEvents = "auto";
        seat2Btn.style.cursor = "pointer";
        seat2Status.textContent = "JOIN SESSION";
      } else {
        // No code and no active pairing
        console.log("⏳ No active pairing window - waiting...");
        seat2Btn.disabled = true;
        seat2Btn.classList.remove("seat-taken");
        seat2Status.textContent = "NO ACTIVE SESSION";
      }
    }
  } else {
    joinInterface.classList.add("hidden");
    const canvas = document.getElementById("shader-canvas");
    if (canvas) {
      canvas.style.pointerEvents = "auto";
      canvas.style.cursor = "pointer";
    }
  }
}

function updateCenterDisplay() {
  const display = document.getElementById("center-display");
  if (!display) return;

  display.innerHTML = "";

  if (!state.currentSessionCode) {
    updateJoinInterface();
    return;
  }

  updateJoinInterface();
  const progress = getProgress();
  const isComplete = progress === questions.length;

  if (isComplete) {
    const completeDiv = document.createElement("div");
    completeDiv.className = "center-display-complete";

    const iconDiv = document.createElement("div");
    iconDiv.className = "center-display-complete-icon";
    iconDiv.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
    `;

    const textDiv = document.createElement("div");
    textDiv.className = "center-display-complete-text";
    textDiv.innerHTML = `
      <p>All questions answered!</p>
      ${state.currentSeat === "1" 
        ? '<p class="subtext">Tap to share with Person B</p>'
        : '<p class="subtext">Tap to see results</p>'}
    `;

    completeDiv.appendChild(iconDiv);
    completeDiv.appendChild(textDiv);
    display.appendChild(completeDiv);
  } else {
    const activeDiv = document.createElement("div");
    activeDiv.className = "center-display-item";

    const sessionBadge = document.createElement("div");
    sessionBadge.className = "center-display-badge";
    sessionBadge.innerHTML = `
      <span class="label">Session:</span>
      <span class="value">${state.currentSessionCode}</span>
    `;

    const seatBadge = document.createElement("div");
    seatBadge.className = "center-display-badge";
    seatBadge.innerHTML = `
      <span class="label">Seat:</span>
      <span class="seat-value">${state.currentSeat}</span>
    `;

    const progressBadge = document.createElement("div");
    progressBadge.className = "center-display-badge";
    progressBadge.innerHTML = `
      <span class="label">${progress}/${questions.length} answered</span>
    `;

    const tapText = document.createElement("p");
    tapText.className = "center-display-badge";
    tapText.style.cssText = "font-size: 0.75rem; color: rgba(255, 255, 255, 0.7); margin-top: 0.5rem;";
    tapText.textContent = "Tap to continue";

    activeDiv.appendChild(sessionBadge);
    activeDiv.appendChild(seatBadge);
    activeDiv.appendChild(progressBadge);
    activeDiv.appendChild(tapText);
    display.appendChild(activeDiv);
  }
}

// Shader Selector
function initShaderSelector() {
  const selector = document.getElementById("shader-selector");
  if (!selector) return;

  selector.innerHTML = "";

  // Add "Worlds" label
  const worldsLabel = document.createElement("div");
  worldsLabel.className = "shader-selector-label";
  worldsLabel.textContent = "Worlds";
  selector.appendChild(worldsLabel);

  shaders.forEach((shader) => {
    const shaderContainer = document.createElement("div");
    shaderContainer.className = "shader-selector-item";
    const button = document.createElement("button");
    button.className = `shader-preview-button ${state.selectedShader === shader.id ? "selected" : ""}`;
    button.setAttribute("aria-label", `Select ${shader.name} shader`);

    const canvas = document.createElement("canvas");
    canvas.width = 40;
    canvas.height = 40;

    const gl = canvas.getContext("webgl", { alpha: true });
    if (gl) {
      const program = initShaderProgram(gl, vertexShader, shader.fragmentShader);
      if (program) {
        const buffers = initBuffers(gl);
        gl.viewport(0, 0, 40, 40);
        const startTime = Date.now();

        const render = () => {
          const currentTime = (Date.now() - startTime) / 1000;
          const programInfo = {
            program,
            attribLocations: {
              vertexPosition: gl.getAttribLocation(program, "aVertexPosition"),
              textureCoord: gl.getAttribLocation(program, "aTextureCoord"),
            },
            uniformLocations: {
              iResolution: gl.getUniformLocation(program, "iResolution"),
              iTime: gl.getUniformLocation(program, "iTime"),
              iMouse: gl.getUniformLocation(program, "iMouse"),
              hasActiveReminders: gl.getUniformLocation(program, "hasActiveReminders"),
              hasUpcomingReminders: gl.getUniformLocation(program, "hasUpcomingReminders"),
              disableCenterDimming: gl.getUniformLocation(program, "disableCenterDimming"),
            },
          };

          gl.clearColor(0.0, 0.0, 0.0, 0.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.useProgram(program);
          gl.uniform2f(programInfo.uniformLocations.iResolution, 40, 40);
          gl.uniform1f(programInfo.uniformLocations.iTime, currentTime);
          gl.uniform2f(programInfo.uniformLocations.iMouse, 0.5, 0.5);
          gl.uniform1i(programInfo.uniformLocations.hasActiveReminders, 0);
          gl.uniform1i(programInfo.uniformLocations.hasUpcomingReminders, 0);
          gl.uniform1i(programInfo.uniformLocations.disableCenterDimming, 1);

          gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
          gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

          gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
          gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
          gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

          requestAnimationFrame(render);
        };
        render();
      }
    }

    button.appendChild(canvas);
    button.addEventListener("click", () => {
      state.selectedShader = shader.id;
      localStorage.setItem("selectedShader", shader.id.toString());
      initShaderSelector();
      updateShader();
    });

    shaderContainer.appendChild(button);

    // Add world name label for each shader
    const worldNames = {
      1: "Echo Chamber",
      2: "Signal Drift",
      3: "Starfield Nexus",
      4: "Lumen Curve"
    };

    const worldLabel = document.createElement("div");
    worldLabel.className = "shader-selector-name";
    worldLabel.textContent = worldNames[shader.id] || shader.name;
    shaderContainer.appendChild(worldLabel);

    selector.appendChild(shaderContainer);
  });
}

// Sheet Management
function showSheet(sheetId, overlayId) {
  const sheet = document.getElementById(sheetId);
  if (sheet) {
    sheet.classList.remove("hidden");
    
    // Handle overlay if provided
    if (overlayId) {
      const overlay = document.getElementById(overlayId);
      if (overlay) {
        overlay.classList.remove("hidden");
      }
    }
    
    // Hide main shader canvas when question sheet is shown
    if (sheetId === "question-sheet") {
      const mainShaderContainer = document.querySelector(".shader-container");
      const mainLayout = document.querySelector(".main-layout");
      if (mainShaderContainer) mainShaderContainer.style.display = "none";
      if (mainLayout) mainLayout.style.display = "none";
    }
    
    // Hide main shader when result sheet is shown
    if (sheetId === "result-sheet") {
      const mainShaderContainer = document.querySelector(".shader-container");
      const mainLayout = document.querySelector(".main-layout");
      if (mainShaderContainer) mainShaderContainer.style.display = "none";
      if (mainLayout) mainLayout.style.display = "none";
    }
  }
}

function hideSheet(sheetId, overlayId) {
  const sheet = document.getElementById(sheetId);
  if (sheet) {
    sheet.classList.add("hidden");
    
    // Handle overlay if provided
    if (overlayId) {
      const overlay = document.getElementById(overlayId);
      if (overlay) {
        overlay.classList.add("hidden");
      }
    }
    
    // Clean up question sheet shader when hiding
    if (sheetId === "question-sheet") {
      cleanupQuestionSheetShader();
      
      // Show main shader canvas again when question sheet is hidden
      const mainShaderContainer = document.querySelector(".shader-container");
      const mainLayout = document.querySelector(".main-layout");
      if (mainShaderContainer) mainShaderContainer.style.display = "";
      if (mainLayout) mainLayout.style.display = "";
    }
    
    // Show main shader when result sheet is hidden
    if (sheetId === "result-sheet") {
      const mainShaderContainer = document.querySelector(".shader-container");
      const mainLayout = document.querySelector(".main-layout");
      if (mainShaderContainer) mainShaderContainer.style.display = "";
      if (mainLayout) mainLayout.style.display = "";
    }
  }
}

// Start Sheet
function renderStartSheet() {
  const body = document.getElementById("start-sheet-body");
  if (!body) return;

  if (!state.showStartSheet) {
    body.innerHTML = "";
    return;
  }

  body.innerHTML = `
    <div class="start-options">
      <p>Choose how you want to join:</p>
      <button class="btn btn-gradient btn-lg" id="start-new-session" style="width: 100%; padding: 1rem;">
        Start a new session (Seat 1)
      </button>
      
      <div class="divider">
        <span>or</span>
      </div>
      
      <input type="text" class="input" id="join-input" placeholder="Paste link or code..." />
      <button class="btn btn-secondary btn-lg" id="join-session" style="width: 100%;" disabled>
        Join (Seat 2)
      </button>
    </div>
  `;

  const joinInput = document.getElementById("join-input");
  const joinBtn = document.getElementById("join-session");

  if (joinInput && joinBtn) {
    joinInput.addEventListener("input", (e) => {
      joinBtn.disabled = !e.target.value.trim();
    });

    joinInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && joinInput.value.trim()) {
        handleJoinSession();
      }
    });

    joinBtn.addEventListener("click", handleJoinSession);
  }

  document.getElementById("start-new-session")?.addEventListener("click", handleStartSession);
}

function handleStartSession() {
  const code = createSession();
  const baseUrl = window.location.origin + window.location.pathname;
  const url = `${baseUrl}?code=${code}`;

  // Update URL to include the code
  window.history.replaceState({}, "", url);

  state.showStartSheet = false;
  state.showWaitingSheet = false;
  hideSheet("start-sheet", "start-sheet-overlay");
  hideSheet("waiting-sheet", "waiting-sheet-overlay");
  updateJoinInterface();
  
  // Go directly to questions - no waiting needed
  state.showQuestionSheet = true;
  renderQuestionSheet();
  showSheet("question-sheet", "question-sheet-overlay");
  // Initialize shader after sheet is shown - wait longer to ensure DOM is ready
  setTimeout(() => {
    console.log("🔄 Attempting to initialize question sheet shader...");
    initQuestionSheetShader();
  }, 800);
}

function handleJoinSession() {
  const input = document.getElementById("join-input")?.value || "";
  let code = "";

  if (input.includes("?")) {
    try {
      // Handle both full URLs and relative URLs
      let urlString = input;
      if (!input.startsWith("http")) {
        // If it's a relative URL, try to construct a full URL
        urlString = window.location.origin + (input.startsWith("/") ? input : "/" + input);
      }
      const url = new URL(urlString);
      const params = new URLSearchParams(url.search);
      code = params.get("code") || "";
    } catch (e) {
      // Try to extract code from URL string directly
      const match = input.match(/[?&]code=(\d{6})/);
      if (match) {
        code = match[1];
      }
    }
  }

  if (!code) {
    code = input.trim();
  }

  if (!/^\d{6}$/.test(code)) {
    showToast("Invalid session code. Please enter a 6-digit code or paste the full link.", "error");
    return;
  }

  const success = joinSession(code);
  if (success) {
    // Update URL to include the code
    const baseUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, "", `${baseUrl}?code=${code}`);
    
    state.showStartSheet = false;
    hideSheet("start-sheet", "start-sheet-overlay");
    updateJoinInterface();
    
    // Go directly to questions - no waiting needed
    state.showQuestionSheet = true;
    renderQuestionSheet();
    showSheet("question-sheet", "question-sheet-overlay");
    setTimeout(() => {
      console.log("🔄 Attempting to initialize question sheet shader...");
      initQuestionSheetShader();
    }, 800);
  } else {
    showToast("Could not join session. Please check the code and try again.", "error");
  }
}

// Waiting Sheet (Person 1 waiting for Person 2) - Simplified, not used in automatic flow
function renderWaitingSheet() {
  const body = document.getElementById("waiting-sheet-body");
  if (!body) return;

  const code = state.currentSessionCode;

  body.innerHTML = `
    <div class="waiting-content">
      <div class="waiting-animation">
        <div class="spinner"></div>
      </div>
      <h2>Session Started</h2>
      <p class="waiting-description">Session Code: <strong>${code}</strong></p>
      <p class="waiting-description">You can start answering questions now. Person 2 can join anytime by entering this code.</p>
    </div>
  `;
}

// Person 1 Waiting Sheet (Person 2 sees this) - Simplified, not used in automatic flow
function renderPerson1WaitingSheet() {
  const body = document.getElementById("person1-waiting-sheet-body");
  if (!body) return;

  body.innerHTML = `
    <div class="waiting-content">
      <div class="waiting-animation">
        <div class="spinner"></div>
      </div>
      <h2>Joined Session!</h2>
      <p class="waiting-description">You can start answering questions now.</p>
    </div>
  `;
}

// Connected Sheet (shown when both are connected)
function renderConnectedSheet() {
  const body = document.getElementById("connected-sheet-body");
  if (!body) return;

  body.innerHTML = `
    <div class="connected-content">
      <div class="connected-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      </div>
      <h2>You both are connected!</h2>
      <p class="connected-description">The session will begin in:</p>
      <div class="countdown-display">
        <span id="countdown-number" class="countdown-number">5</span>
      </div>
    </div>
  `;
  
  // Initialize countdown display
  state.countdownSeconds = 5;
  updateCountdownDisplay();
}

// Countdown functions
function startCountdown() {
  state.countdownSeconds = 5;
  updateCountdownDisplay();
  
  if (state.countdownTimer) {
    clearInterval(state.countdownTimer);
  }
  
  state.countdownTimer = setInterval(() => {
    state.countdownSeconds--;
    updateCountdownDisplay();
    
    if (state.countdownSeconds <= 0) {
      clearInterval(state.countdownTimer);
      state.countdownTimer = null;
      // Both connected, start questions
      state.showConnectedSheet = false;
      state.showQuestionSheet = true;
      hideSheet("connected-sheet", "connected-sheet-overlay");
      renderQuestionSheet();
      showSheet("question-sheet", "question-sheet-overlay");
      setTimeout(() => {
        initQuestionSheetShader();
      }, 100);
      showToast("Let's begin!", "success");
    }
  }, 1000);
}

function updateCountdownDisplay() {
  const countdownEl = document.getElementById("countdown-number");
  if (countdownEl) {
    countdownEl.textContent = state.countdownSeconds;
  }
}

// Polling functions
function startWaitingCheck() {
  if (state.waitingCheckInterval) {
    clearInterval(state.waitingCheckInterval);
  }

  state.waitingCheckInterval = setInterval(() => {
    const sessionData = loadSession(state.currentSessionCode);
    if (sessionData?.seat2Connected || sessionData?.seat2Joined) {
      // Person 2 has joined! Show connected screen
      clearInterval(state.waitingCheckInterval);
      state.waitingCheckInterval = null;
      state.showWaitingSheet = false;
      state.showConnectedSheet = true;
      hideSheet("waiting-sheet", "waiting-sheet-overlay");
      renderConnectedSheet();
      showSheet("connected-sheet", "connected-sheet-overlay");
      startCountdown();
    }
  }, 1000); // Check every second
}

function startPerson1WaitingCheck() {
  if (state.waitingCheckInterval) {
    clearInterval(state.waitingCheckInterval);
  }

  state.waitingCheckInterval = setInterval(() => {
    const sessionData = loadSession(state.currentSessionCode);
    // Check if both are connected
    const bothConnected = (sessionData?.seat1Connected || sessionData?.seat1Ready) && 
                          (sessionData?.seat2Connected || sessionData?.seat2Joined);
    
    if (bothConnected) {
      clearInterval(state.waitingCheckInterval);
      state.waitingCheckInterval = null;
      state.showConnectedSheet = true;
      hideSheet("person1-waiting-sheet", "person1-waiting-sheet-overlay");
      renderConnectedSheet();
      showSheet("connected-sheet", "connected-sheet-overlay");
      startCountdown();
    }
  }, 1000); // Check every second
}

// Mid-Question Message
function showMidQuestionMessage() {
  const overlay = document.getElementById("mid-question-overlay");
  const message = document.getElementById("mid-question-message");
  const content = document.getElementById("mid-question-content");
  const questionSheet = document.getElementById("question-sheet");
  
  if (!overlay || !message || !content) return;
  
  // Hide the question sheet in the background
  if (questionSheet) {
    questionSheet.style.opacity = "0";
    questionSheet.style.pointerEvents = "none";
  }
  
  // Show overlay and message
  overlay.classList.remove("hidden");
  message.classList.remove("hidden");
  
  // Step 1: Show "I hope you are enjoying"
  content.innerHTML = `
    <p class="mid-question-text" id="enjoying-text">I hope you are enjoying</p>
  `;
  
  // Animate text appearing
  setTimeout(() => {
    const textEl = document.getElementById("enjoying-text");
    if (textEl) {
      textEl.classList.add("visible");
    }
  }, 100);
  
  // Step 2: After 3 seconds, fade out and show second message
  setTimeout(() => {
    const textEl = document.getElementById("enjoying-text");
    if (textEl) {
      textEl.classList.remove("visible");
      textEl.classList.add("fade-out");
    }
    
    setTimeout(() => {
      // Step 3: Show "If you are sure you want to continue" word by word
      const secondMessage = "If you are sure you want to continue";
      const words = secondMessage.split(" ");
      content.innerHTML = `<p class="mid-question-text" id="continue-text"></p>`;
      
      const continueTextEl = document.getElementById("continue-text");
      let wordIndex = 0;
      
      const showNextWord = () => {
        if (wordIndex < words.length && continueTextEl) {
          // Build HTML with orange active word and white completed words
          let html = "";
          for (let i = 0; i < words.length; i++) {
            if (i < wordIndex) {
              // Already typed - white
              html += `<span class="word-typed">${words[i]}</span>`;
            } else if (i === wordIndex) {
              // Currently typing - orange
              html += `<span class="word-typing">${words[i]}</span>`;
            } else {
              // Not yet typed - hidden
              html += `<span class="word-pending" style="display: none;">${words[i]}</span>`;
            }
            if (i < words.length - 1) {
              html += " ";
            }
          }
          continueTextEl.innerHTML = html;
          wordIndex++;
          
          if (wordIndex < words.length) {
            setTimeout(showNextWord, 150); // Show next word every 150ms
          } else {
            // All words shown, convert last word to white
            setTimeout(() => {
              const lastWord = continueTextEl.querySelector(".word-typing");
              if (lastWord) {
                lastWord.classList.remove("word-typing");
                lastWord.classList.add("word-typed");
              }
              
              // Now show continue button
              setTimeout(() => {
                const button = document.createElement("button");
                button.className = "btn btn-gradient btn-lg mid-question-continue";
                button.textContent = "Continue";
                button.id = "mid-question-continue-btn";
                button.style.opacity = "0";
                button.style.transform = "translateY(20px)";
                content.appendChild(button);
                
                // Animate button emerging
                setTimeout(() => {
                  button.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                  button.style.opacity = "1";
                  button.style.transform = "translateY(0)";
                }, 100);
                
                // Add click handler
                button.addEventListener("click", () => {
                  hideMidQuestionMessage();
                  if (state.currentQuestionIndex < questions.length - 1) {
                    state.currentQuestionIndex++;
                    renderQuestionSheet();
                  }
                });
              }, 300);
            }, 150);
          }
        }
      };
      
      setTimeout(() => {
        continueTextEl.classList.add("visible");
        showNextWord();
      }, 300);
    }, 500);
  }, 3000);
}

function hideMidQuestionMessage() {
  const overlay = document.getElementById("mid-question-overlay");
  const message = document.getElementById("mid-question-message");
  const questionSheet = document.getElementById("question-sheet");
  
  if (overlay) overlay.classList.add("hidden");
  if (message) message.classList.add("hidden");
  
  // Restore question sheet visibility
  if (questionSheet) {
    questionSheet.style.opacity = "1";
    questionSheet.style.pointerEvents = "auto";
  }
}

// Initialize shader canvas for question sheet
let questionSheetShaderGl = null;
let questionSheetShaderProgram = null;
let questionSheetShaderBuffers = null;
let questionSheetShaderStartTime = null;
let questionSheetShaderAnimationFrame = null;

function initQuestionSheetShader() {
  console.log("🔧 initQuestionSheetShader called");
  
  // Check if question sheet is actually visible
  const questionSheet = document.getElementById("question-sheet");
  if (!questionSheet || questionSheet.classList.contains("hidden")) {
    console.warn("⚠️ Question sheet is hidden, retrying in 200ms...");
    setTimeout(initQuestionSheetShader, 200);
    return;
  }
  
  const canvas = document.getElementById("question-sheet-shader-canvas");
  const worldNameEl = document.getElementById("question-sheet-world-name");
  
  if (!canvas) {
    console.error("❌ Question sheet shader canvas not found");
    console.log("Available canvas elements:", document.querySelectorAll("canvas"));
    console.log("Question sheet element:", questionSheet);
    return;
  }
  
  console.log("✅ Canvas found:", canvas);
  console.log("Canvas dimensions:", canvas.offsetWidth, "x", canvas.offsetHeight);
  console.log("Canvas computed style:", window.getComputedStyle(canvas).display);
  
  // Get selected shader
  const selectedShader = shaders.find(s => s.id === state.selectedShader) || shaders[0];
  console.log("Selected shader:", selectedShader.name, "ID:", selectedShader.id);
  
  // Update world name
  const worldNames = {
    1: "Echo Chamber",
    2: "Signal Drift",
    3: "Starfield Nexus",
    4: "Lumen Curve"
  };
  if (worldNameEl) {
    worldNameEl.textContent = worldNames[state.selectedShader] || selectedShader.name;
    console.log("World name set to:", worldNameEl.textContent);
  } else {
    console.warn("World name element not found");
  }
  
  // Clean up previous shader
  if (questionSheetShaderAnimationFrame) {
    cancelAnimationFrame(questionSheetShaderAnimationFrame);
    questionSheetShaderAnimationFrame = null;
  }
  
  // Initialize WebGL
  questionSheetShaderGl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  
  if (!questionSheetShaderGl) {
    console.error("❌ WebGL not supported for question sheet shader");
    return;
  }
  
  console.log("✅ WebGL context created");
  
  // Set canvas size - ensure it has dimensions
  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    console.log("📐 Canvas rect:", rect.width, "x", rect.height);
    if (rect.width === 0 || rect.height === 0) {
      console.warn("⚠️ Canvas has zero size, retrying in 100ms...");
      setTimeout(resizeCanvas, 100);
      return false;
    }
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(rect.width * dpr, 1);
    const height = Math.max(rect.height * dpr, 1);
    canvas.width = width;
    canvas.height = height;
    if (questionSheetShaderGl) {
      questionSheetShaderGl.viewport(0, 0, width, height);
    }
    console.log("✅ Canvas resized to:", width, "x", height, "(rect:", rect.width, "x", rect.height + ", dpr:", dpr + ")");
    return true; // Success
  };
  
  // Also set up resize handler for window resize events
  const resizeHandler = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      if (questionSheetShaderGl) {
        questionSheetShaderGl.viewport(0, 0, canvas.width, canvas.height);
      }
    }
  };
  window.addEventListener("resize", resizeHandler);
  
  // Define initializeShaderAfterResize first
  const initializeShaderAfterResize = () => {
    if (!canvas || !questionSheetShaderGl) {
      console.error("❌ Canvas or GL context missing");
      return;
    }
    
    // Get selected shader
    const selectedShader = shaders.find(s => s.id === state.selectedShader) || shaders[0];
    console.log("Initializing shader:", selectedShader.name);
    
    // Create a modified shader that renders full screen (no circular mask)
    // The shaders have a pattern where main() checks if dist < radius and discards if not
    // We need to replace the entire main() function with a full-screen version
    let fullScreenShader = selectedShader.fragmentShader;
    
    // Find the start and end of the main() function
    // Look for "void main()" and find the matching closing brace
    const mainStart = fullScreenShader.indexOf('void main()');
    if (mainStart !== -1) {
      // Find the opening brace after "void main()"
      let bracePos = fullScreenShader.indexOf('{', mainStart);
      if (bracePos !== -1) {
        // Count braces to find the matching closing brace
        let braceCount = 1;
        let endPos = bracePos + 1;
        while (braceCount > 0 && endPos < fullScreenShader.length) {
          const char = fullScreenShader[endPos];
          if (char === '{') braceCount++;
          else if (char === '}') braceCount--;
          endPos++;
        }
        
        if (braceCount === 0) {
          // Found the complete main() function, replace it
          const beforeMain = fullScreenShader.substring(0, mainStart);
          const afterMain = fullScreenShader.substring(endPos);
          fullScreenShader = beforeMain + `void main() {
  vec2 fragCoord = vTextureCoord * iResolution;
  vec4 color;
  mainImage(color, fragCoord);
  gl_FragColor = color;
}` + afterMain;
          console.log("✅ Replaced circular mask with full-screen rendering");
        } else {
          console.warn("⚠️ Could not find matching closing brace for main(), using original shader");
        }
      } else {
        console.warn("⚠️ Could not find opening brace for main()");
      }
    } else {
      console.warn("⚠️ Could not find main() function, using original shader");
    }
    
    // Initialize shader program with full-screen version
    questionSheetShaderProgram = initShaderProgram(questionSheetShaderGl, vertexShader, fullScreenShader);
    if (!questionSheetShaderProgram) {
      console.error("❌ Failed to initialize shader program");
      return;
    }
    console.log("✅ Shader program initialized");
    
    // Set up attribute locations (same as main shader)
    questionSheetShaderProgram.attribLocations = {
      vertexPosition: questionSheetShaderGl.getAttribLocation(questionSheetShaderProgram, "aVertexPosition"),
      textureCoord: questionSheetShaderGl.getAttribLocation(questionSheetShaderProgram, "aTextureCoord"),
    };
    
    questionSheetShaderBuffers = initBuffers(questionSheetShaderGl);
    if (!questionSheetShaderBuffers) {
      console.error("❌ Failed to initialize buffers");
      return;
    }
    questionSheetShaderStartTime = Date.now();
    
    // Render loop
    const render = () => {
      if (!questionSheetShaderGl || !questionSheetShaderProgram || !questionSheetShaderBuffers) {
        console.error("❌ Missing shader components, stopping render");
        return;
      }
      
      const gl = questionSheetShaderGl;
      const currentTime = (Date.now() - questionSheetShaderStartTime) / 1000;
      
      // Clear the canvas
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // Enable blending for transparency
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      gl.useProgram(questionSheetShaderProgram);
      
      // Set uniforms
      const resolutionLocation = gl.getUniformLocation(questionSheetShaderProgram, "iResolution");
      const timeLocation = gl.getUniformLocation(questionSheetShaderProgram, "iTime");
      const mouseLocation = gl.getUniformLocation(questionSheetShaderProgram, "iMouse");
      const hasActiveRemindersLocation = gl.getUniformLocation(questionSheetShaderProgram, "hasActiveReminders");
      const hasUpcomingRemindersLocation = gl.getUniformLocation(questionSheetShaderProgram, "hasUpcomingReminders");
      const disableCenterDimmingLocation = gl.getUniformLocation(questionSheetShaderProgram, "disableCenterDimming");
      
      if (resolutionLocation) {
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      }
      if (timeLocation) {
        gl.uniform1f(timeLocation, currentTime);
      }
      if (mouseLocation) {
        gl.uniform2f(mouseLocation, 0, 0);
      }
      if (hasActiveRemindersLocation) {
        gl.uniform1i(hasActiveRemindersLocation, 0);
      }
      if (hasUpcomingRemindersLocation) {
        gl.uniform1i(hasUpcomingRemindersLocation, 0);
      }
      if (disableCenterDimmingLocation) {
        gl.uniform1i(disableCenterDimmingLocation, 1); // Disable center dimming for question sheet
      }
      
      // Draw
      gl.bindBuffer(gl.ARRAY_BUFFER, questionSheetShaderBuffers.position);
      gl.vertexAttribPointer(questionSheetShaderProgram.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(questionSheetShaderProgram.attribLocations.vertexPosition);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, questionSheetShaderBuffers.textureCoord);
      gl.vertexAttribPointer(questionSheetShaderProgram.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(questionSheetShaderProgram.attribLocations.textureCoord);
      
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, questionSheetShaderBuffers.indices);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      
      // Check for errors
      const error = gl.getError();
      if (error !== gl.NO_ERROR && error !== 0) {
        console.error("WebGL error:", error);
      }
      
      questionSheetShaderAnimationFrame = requestAnimationFrame(render);
    };
    
    render();
    console.log("✅ Question sheet shader render loop started");
  };
  
  // Try to resize immediately, and retry if needed (up to 10 times)
  let resizeAttempts = 0;
  const tryResize = () => {
    if (resizeCanvas()) {
      // Success - continue with initialization
      initializeShaderAfterResize();
    } else if (resizeAttempts >= 10) {
      console.error("❌ Failed to resize canvas after 10 attempts");
    } else {
      resizeAttempts++;
      setTimeout(tryResize, 100);
    }
  };
  
  // Start the resize process
  tryResize();
}

function cleanupQuestionSheetShader() {
  if (questionSheetShaderAnimationFrame) {
    cancelAnimationFrame(questionSheetShaderAnimationFrame);
    questionSheetShaderAnimationFrame = null;
  }
  
  // Clear the canvas
  const canvas = document.getElementById("question-sheet-shader-canvas");
  if (canvas && questionSheetShaderGl) {
    questionSheetShaderGl.clearColor(0.0, 0.0, 0.0, 1.0);
    questionSheetShaderGl.clear(questionSheetShaderGl.COLOR_BUFFER_BIT);
  }
  
  questionSheetShaderGl = null;
  questionSheetShaderProgram = null;
  questionSheetShaderBuffers = null;
  questionSheetShaderStartTime = null;
}

// Question Sheet
function renderQuestionSheet() {
  const container = document.getElementById("question-carousel-container");
  const title = document.getElementById("question-sheet-title");
  const sessionCode = document.getElementById("question-session-code");

  if (!container) {
    console.error("❌ Question carousel container not found");
    return;
  }
  
  if (!state.currentSeat) {
    console.error("❌ No seat assigned in state.currentSeat");
    return;
  }
  
  if (!state.currentSessionCode) {
    console.error("❌ No session code in state.currentSessionCode");
    return;
  }

  console.log("📝 Rendering question sheet for Seat", state.currentSeat, "Session:", state.currentSessionCode);

  if (title) title.textContent = `Seat ${state.currentSeat}`;
  if (sessionCode) sessionCode.textContent = `Session: ${state.currentSessionCode}`;

  const currentQuestion = questions[state.currentQuestionIndex];
  const progress = getProgress();
  const selectedOption = state.answers[currentQuestion.id] || null;

  container.innerHTML = `
    <div class="question-progress">
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${((state.currentQuestionIndex + 1) / questions.length) * 100}%"></div>
      </div>
      <p>Question ${state.currentQuestionIndex + 1} of ${questions.length}</p>
    </div>

    <div class="question-card-container">
      <div class="question-card">
        <h3>${currentQuestion.text}</h3>
        <div class="question-options">
          ${currentQuestion.options
            .map(
              (option) => `
            <button class="question-option ${selectedOption === option.id ? "selected" : ""}" 
                    data-option-id="${option.id}">
              ${option.text}
              ${selectedOption === option.id ? `
                <div class="question-option-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              ` : ""}
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    </div>

    <div class="question-navigation">
      <button class="btn btn-ghost btn-sm" id="prev-question" ${state.currentQuestionIndex === 0 ? "disabled" : ""}>
        ← Previous
      </button>
      
      <div class="question-dots">
        ${questions
          .map(
            (_, idx) => `
          <button class="question-dot ${idx === state.currentQuestionIndex ? "active" : ""} ${state.answers[questions[idx].id] ? "answered" : ""}" 
                  data-question-index="${idx}"></button>
        `
          )
          .join("")}
      </div>

      ${state.currentQuestionIndex === questions.length - 1 ? `
        <button class="btn btn-gradient" id="complete-questions" ${!selectedOption ? "disabled" : ""}>
          Finish →
        </button>
      ` : `
        <button class="btn btn-ghost btn-sm" id="next-question" ${state.currentQuestionIndex === questions.length - 1 ? "disabled" : ""}>
          Next →
        </button>
      `}
    </div>
  `;

  // Event listeners
  container.querySelectorAll(".question-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const optionId = btn.dataset.optionId;
      saveAnswer(currentQuestion.id, optionId);
      
      // Check if 5 questions are answered and show mid-question message
      const answeredCount = Object.keys(state.answers).length;
      if (answeredCount === 5 && !state.midQuestionShown) {
        state.midQuestionShown = true;
        showMidQuestionMessage();
        return; // Don't advance yet, wait for user to continue
      }
      
      if (state.currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          state.currentQuestionIndex++;
          renderQuestionSheet();
        }, 300);
      } else {
        renderQuestionSheet();
      }
    });
  });

  container.querySelectorAll(".question-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      state.currentQuestionIndex = parseInt(dot.dataset.questionIndex);
      renderQuestionSheet();
    });
  });

  document.getElementById("prev-question")?.addEventListener("click", () => {
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      renderQuestionSheet();
    }
  });

  document.getElementById("next-question")?.addEventListener("click", () => {
    if (state.currentQuestionIndex < questions.length - 1) {
      state.currentQuestionIndex++;
      renderQuestionSheet();
    }
  });

  document.getElementById("complete-questions")?.addEventListener("click", handleQuestionComplete);
}

async function handleQuestionComplete() {
  console.log("🎯 handleQuestionComplete called for Seat", state.currentSeat);
  console.log("Current answers count:", Object.keys(state.answers).length);
  console.log("Questions count:", questions.length);
  console.log("Is complete?", isComplete());
  
  // Prevent multiple clicks
  if (state.isCompleting) {
    console.log("⏳ Already processing completion...");
    return;
  }
  
  if (!isComplete()) {
    showToast("Please answer all questions before continuing.", "error");
    return;
  }

  if (!state.currentSeat) {
    console.error("❌ No seat assigned!");
    showToast("Error: No seat assigned. Please refresh and try again.", "error");
    return;
  }

  // Set flag to prevent multiple completions
  state.isCompleting = true;
  
  // Disable the button
  let completeBtnEl = document.getElementById("complete-questions");
  if (completeBtnEl) {
    completeBtnEl.disabled = true;
    completeBtnEl.textContent = "Processing...";
  }

  console.log("✅ Completing session for Seat", state.currentSeat);
  const result = await completeSession();
  if (!result) {
    state.isCompleting = false;
    if (completeBtnEl) {
      completeBtnEl.disabled = false;
      completeBtnEl.textContent = "Finish →";
    }
    showToast("Error saving answers. Please try again.", "error");
    return;
  }

  // Save answers and mark as ready
  const sessionData = await loadSessionAsync(state.currentSessionCode);
  const updatedData = {
    ...sessionData,
    [`seat${state.currentSeat}`]: state.answers,
    [`seat${state.currentSeat}Answers`]: state.answers,
    [`seat${state.currentSeat}Ready`]: true,
    [`seat${state.currentSeat}Shader`]: state.selectedShader, // Save selected shader/world
  };
  saveSession(state.currentSessionCode, updatedData);
  console.log(`✅ Seat ${state.currentSeat} answers saved to session:`, state.currentSessionCode);
  console.log(`📊 Saved ${Object.keys(state.answers).length} answers for Seat ${state.currentSeat}`);
  console.log(`🌍 Saved shader ${state.selectedShader} for Seat ${state.currentSeat}`);

  // Wait a moment for Firebase to sync (if using Firebase)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Function to check if both are ready
  const checkBothReady = async () => {
    const latestSessionData = await loadSessionAsync(state.currentSessionCode);
    const otherSeat = state.currentSeat === "1" ? "2" : "1";
    
    // ALWAYS use current user's answers (we just saved them)
    const seat1Answers = state.currentSeat === "1" 
      ? state.answers 
      : (latestSessionData?.seat1 || latestSessionData?.seat1Answers);
    const seat2Answers = state.currentSeat === "2" 
      ? state.answers 
      : (latestSessionData?.seat2 || latestSessionData?.seat2Answers);
    const seat1Ready = state.currentSeat === "1" 
      ? true 
      : (latestSessionData?.seat1Ready || false);
    const seat2Ready = state.currentSeat === "2" 
      ? true 
      : (latestSessionData?.seat2Ready || false);

    console.log(`🔍 Checking if both ready:`);
    console.log("  Seat 1 ready:", seat1Ready, "answers:", seat1Answers ? Object.keys(seat1Answers).length : 0);
    console.log("  Seat 2 ready:", seat2Ready, "answers:", seat2Answers ? Object.keys(seat2Answers).length : 0);

    // Check if both are ready and have answers
    if (seat1Ready && seat2Ready && 
        seat1Answers && Object.keys(seat1Answers).length > 0 &&
        seat2Answers && Object.keys(seat2Answers).length > 0) {
      // Both have finished! Show results immediately
      console.log("✅✅✅ BOTH SEATS COMPLETED! Showing results...");
      console.log("Seat 1 answers:", Object.keys(seat1Answers).length);
      console.log("Seat 2 answers:", Object.keys(seat2Answers).length);
      showResults(seat1Answers, seat2Answers);
      return true;
    }
    return false;
  };

  // Check multiple times (up to 5 times with increasing delays)
  let attempts = 0;
  let found = false;
  
  while (attempts < 5 && !found) {
    found = await checkBothReady();
    if (found) {
      return; // Exit the function - results are showing
    }
    
    attempts++;
    if (attempts < 5) {
      const delay = 500 + (attempts * 200); // Increasing delays: 500ms, 700ms, 900ms, 1100ms
      console.log(`⏳ Attempt ${attempts} failed, waiting ${delay}ms before next check...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // If we get here, the other person hasn't finished yet
  const otherSeat = state.currentSeat === "1" ? "2" : "1";
  console.log(`⏳ After ${attempts} attempts, still waiting for Seat ${otherSeat} to finish...`);
  console.log(`📊 Starting continuous check for Seat ${state.currentSeat}`);
  
  // Re-enable button (though they shouldn't need it)
  state.isCompleting = false;
  completeBtnEl = document.getElementById("complete-questions");
  if (completeBtnEl) {
    completeBtnEl.disabled = false;
    completeBtnEl.textContent = "Finish →";
  }
  
  showWaitingForCompletion(otherSeat);
  // Start checking for the other person's completion - this MUST work!
  startCheckingForCompletion();
}

function showResults(seat1Answers, seat2Answers) {
  if (!seat1Answers || !seat2Answers || 
      Object.keys(seat1Answers).length === 0 || 
      Object.keys(seat2Answers).length === 0) {
    console.error("❌ Cannot show results: missing answers");
    console.log("Seat 1 answers:", seat1Answers ? Object.keys(seat1Answers).length : 0);
    console.log("Seat 2 answers:", seat2Answers ? Object.keys(seat2Answers).length : 0);
    showToast("Error: Missing answers. Please try again.", "error");
    state.isCompleting = false; // Reset flag
    return;
  }

  try {
    // Clear the completion flag
    state.isCompleting = false;
    
    // Re-enable button if it exists
    const completeBtnEl = document.getElementById("complete-questions");
    if (completeBtnEl) {
      completeBtnEl.disabled = false;
      completeBtnEl.textContent = "Finish →";
    }
    
    const score = calculateCompatibility(seat1Answers, seat2Answers);
    const dominantType = findDominantType(seat1Answers, seat2Answers);
    const activities = activitySuggestions[dominantType];

    const baseUrl = window.location.origin + window.location.pathname;
    const encoded = encodeState({
      seat1Answers: seat1Answers,
      seat2Answers: seat2Answers,
      timestamp: Date.now(),
    });
    const resultUrl = `${baseUrl}?result=${encoded}`;

    state.resultData = { score, activities, resultUrl };
    window.history.replaceState({}, "", resultUrl);
    
    // IMPORTANT: Hide ALL other sheets first
    console.log("🔄 Hiding all sheets and showing results...");
    hideSheet("waiting-sheet", "waiting-sheet-overlay");
    hideSheet("question-sheet", "question-sheet-overlay");
    hideSheet("start-sheet", "start-sheet-overlay");
    hideSheet("connected-sheet", "connected-sheet-overlay");
    
    // Update state
    state.showQuestionSheet = false;
    state.showWaitingSheet = false;
    state.showResultSheet = true;
    
    // Stop any checking intervals
    if (state.waitingCheckInterval) {
      clearInterval(state.waitingCheckInterval);
      state.waitingCheckInterval = null;
    }
    
    // Render and show result sheet
    renderResultSheet();
    showSheet("result-sheet", null);
    showToast("Compatibility calculated!", "success");
    console.log("✅✅✅ Results displayed successfully for Seat", state.currentSeat);
    console.log("✅ Question sheet hidden, result sheet shown");
  } catch (error) {
    console.error("❌ Error showing results:", error);
    showToast("Error calculating results. Please try again.", "error");
    state.isCompleting = false; // Reset flag on error
  }
}

function showWaitingForCompletion(otherSeat) {
  const body = document.getElementById("waiting-sheet-body");
  const title = document.getElementById("waiting-sheet-title");
  const description = document.getElementById("waiting-sheet-description");
  
  if (!body) return;

  body.innerHTML = `
    <div class="waiting-content">
      <div class="waiting-animation">
        <div class="spinner"></div>
      </div>
      <h2>Waiting for Seat ${otherSeat}</h2>
      <p class="waiting-description">You've finished answering all questions!</p>
      <p class="waiting-description">Waiting for the other person to complete their questions...</p>
    </div>
  `;

  // Update the waiting sheet title and description
  if (title) {
    title.textContent = `Waiting for Seat ${otherSeat}`;
  }
  if (description) {
    description.textContent = "Waiting for the other person to finish...";
  }

  // Hide question sheet and show waiting sheet
    state.showQuestionSheet = false;
    hideSheet("question-sheet", "question-sheet-overlay");
  showSheet("waiting-sheet", "waiting-sheet-overlay");
}

function startCheckingForCompletion() {
  // Clear any existing interval
  if (state.waitingCheckInterval) {
    clearInterval(state.waitingCheckInterval);
    state.waitingCheckInterval = null;
  }

  const otherSeat = state.currentSeat === "1" ? "2" : "1";
  console.log(`🔄 Starting completion check for Seat ${state.currentSeat}, waiting for Seat ${otherSeat}`);
  console.log(`📊 Seat ${state.currentSeat} has ${Object.keys(state.answers).length} answers ready`);
  
  // Check immediately and frequently
  const checkCompletion = async () => {
    if (!state.currentSessionCode) {
      console.log("❌ No session code, stopping check");
      if (state.waitingCheckInterval) {
        clearInterval(state.waitingCheckInterval);
        state.waitingCheckInterval = null;
      }
      return;
    }

    try {
      const sessionData = await loadSessionAsync(state.currentSessionCode);
      
      // Get both seats' answers - ALWAYS use current user's answers since we just saved them
      const seat1Answers = state.currentSeat === "1" 
        ? state.answers 
        : (sessionData?.seat1 || sessionData?.seat1Answers);
      const seat2Answers = state.currentSeat === "2" 
        ? state.answers 
        : (sessionData?.seat2 || sessionData?.seat2Answers);
      const seat1Ready = state.currentSeat === "1" 
        ? true 
        : (sessionData?.seat1Ready || false);
      const seat2Ready = state.currentSeat === "2" 
        ? true 
        : (sessionData?.seat2Ready || false);

      console.log(`🔍 [Seat ${state.currentSeat}] Checking completion:`);
      console.log("  Seat 1 ready:", seat1Ready, "answers:", seat1Answers ? Object.keys(seat1Answers).length : 0);
      console.log("  Seat 2 ready:", seat2Ready, "answers:", seat2Answers ? Object.keys(seat2Answers).length : 0);

      // Check if both are ready and have answers
      const bothReady = seat1Ready && seat2Ready;
      const bothHaveAnswers = seat1Answers && Object.keys(seat1Answers).length > 0 &&
                              seat2Answers && Object.keys(seat2Answers).length > 0;
      
      if (bothReady && bothHaveAnswers) {
        // Both have finished! STOP checking and show results
        if (state.waitingCheckInterval) {
          clearInterval(state.waitingCheckInterval);
          state.waitingCheckInterval = null;
        }
        
        console.log("✅✅✅✅✅ BOTH SEATS COMPLETED! Showing results for Seat", state.currentSeat);
        console.log("Seat 1 answers:", Object.keys(seat1Answers).length);
        console.log("Seat 2 answers:", Object.keys(seat2Answers).length);
        
        // Make absolutely sure we have valid answers
        if (seat1Answers && seat2Answers && 
            Object.keys(seat1Answers).length > 0 && 
            Object.keys(seat2Answers).length > 0) {
          showResults(seat1Answers, seat2Answers);
        } else {
          console.error("❌ Invalid answers data, retrying...");
        }
      } else {
        console.log(`⏳ [Seat ${state.currentSeat}] Still waiting...`);
        if (!seat1Ready) console.log("  ❌ Seat 1 not ready");
        if (!seat2Ready) console.log("  ❌ Seat 2 not ready");
        if (!seat1Answers || Object.keys(seat1Answers).length === 0) console.log("  ❌ Seat 1 has no answers");
        if (!seat2Answers || Object.keys(seat2Answers).length === 0) console.log("  ❌ Seat 2 has no answers");
      }
    } catch (error) {
      console.error("❌ Error checking completion:", error);
    }
  };
  
  // Check immediately (after short delay for sync)
  setTimeout(async () => {
    await checkCompletion();
  }, 500);
  
  // Then check every 1 second (more frequent)
  state.waitingCheckInterval = setInterval(checkCompletion, 1000);

  // Stop checking after 10 minutes
  setTimeout(() => {
    if (state.waitingCheckInterval) {
      clearInterval(state.waitingCheckInterval);
      state.waitingCheckInterval = null;
      console.log("⏰ Stopped checking for completion (timeout)");
    }
  }, 600000);
}

// Keep checking for Seat 1's answers (for Seat 2)
async function checkForSeat1Answers() {
  if (!state.currentSessionCode || state.currentSeat !== "2") return;
  
  const sessionData = await loadSessionAsync(state.currentSessionCode);
  const seat1Answers = sessionData?.seat1 || sessionData?.seat1Answers;
  
  if (seat1Answers && Object.keys(seat1Answers).length > 0) {
    // Found them! Calculate results now
    const result = await completeSession();
    if (result) {
      const score = calculateCompatibility(seat1Answers, result.seat2Answers);
      const dominantType = findDominantType(seat1Answers, result.seat2Answers);
    const activities = activitySuggestions[dominantType];

    const encoded = encodeState({
        seat1Answers: seat1Answers,
      seat2Answers: result.seat2Answers,
      timestamp: Date.now(),
    });
      const baseUrl = window.location.origin + window.location.pathname;
    const resultUrl = `${baseUrl}?result=${encoded}`;

    state.resultData = { score, activities, resultUrl };
    window.history.replaceState({}, "", resultUrl);
    state.showQuestionSheet = false;
    state.showResultSheet = true;
    hideSheet("question-sheet", "question-sheet-overlay");
    renderResultSheet();
    showSheet("result-sheet", null);
    showToast("Compatibility calculated!", "success");
  }
  } else {
    // Keep checking
    setTimeout(() => checkForSeat1Answers(), 2000);
  }
}

// Check if results are ready (for Seat 1)
function checkForResults() {
  if (!state.currentSessionCode || state.currentSeat !== "1") return;
  
  console.log("🔍 Seat 1: Checking for Seat 2's completion...");
  const checkInterval = setInterval(async () => {
    const sessionData = await loadSessionAsync(state.currentSessionCode);
    const seat2Answers = sessionData?.seat2 || sessionData?.seat2Answers;
    const seat1Answers = sessionData?.seat1 || sessionData?.seat1Answers;
    
    if (seat2Answers && sessionData?.seat2Ready && Object.keys(seat2Answers).length > 0 && seat1Answers) {
      clearInterval(checkInterval);
      
      console.log("✅ Both seats completed! Showing results...");
      // Both have completed - show results
      const score = calculateCompatibility(seat1Answers, seat2Answers);
      const dominantType = findDominantType(seat1Answers, seat2Answers);
      const activities = activitySuggestions[dominantType];
      
      const encoded = encodeState({
        seat1Answers: seat1Answers,
        seat2Answers: seat2Answers,
        timestamp: Date.now(),
      });
      const baseUrl = window.location.origin + window.location.pathname;
      const resultUrl = `${baseUrl}?result=${encoded}`;
      
      state.resultData = { score, activities, resultUrl };
      window.history.replaceState({}, "", resultUrl);
      state.showResultSheet = true;
      renderResultSheet();
      showSheet("result-sheet", null);
      showToast("Results ready!", "success");
    } else {
      console.log("⏳ Still waiting for Seat 2 to complete...");
    }
  }, 2000);
  
  // Stop checking after 5 minutes
  setTimeout(() => {
    clearInterval(checkInterval);
    console.log("⏰ Stopped checking for results (timeout)");
  }, 300000);
}

// Result Sheet
function renderResultSheet() {
  const body = document.getElementById("result-sheet-body");
  const sessionCode = document.getElementById("result-session-code");

  if (!body) {
    console.error("❌ Result sheet body not found!");
    return;
  }
  
  if (!state.resultData) {
    console.error("❌ No result data to display!");
    return;
  }

  console.log("✅ Rendering result sheet with score:", state.resultData.score);

  if (sessionCode) sessionCode.textContent = `Session: ${state.currentSessionCode || ""}`;

  const isGoodMatch = state.resultData.score >= 55;

  body.innerHTML = `
    <div class="result-score-card">
      <div class="result-score-circle">
        <span>${state.resultData.score}</span>
      </div>
      <div class="result-score-text">
        <h3>Match score: <strong>${state.resultData.score}%</strong></h3>
        <p>${isGoodMatch ? "Good match — consider connecting!" : "Lower match — but everyone brings unique value!"}</p>
      </div>
    </div>

    <div class="result-activities">
      <button class="btn btn-gradient btn-lg friendship-reclaim-btn" id="friendship-reclaim-btn" style="width: 100%;">
        Open me to reclaim your friendship
      </button>
    </div>
    
    <!-- Deals Modal (hidden by default) -->
    <div id="deals-modal-overlay" class="deals-modal-overlay hidden"></div>
    <div id="deals-modal" class="deals-modal hidden">
      <div class="deals-modal-header">
        <h2>Reclaim Your Friendship</h2>
        <button class="deals-modal-close" id="deals-modal-close">×</button>
      </div>
      <div class="deals-modal-content" id="deals-cards-container">
        <!-- Deal cards will be inserted here -->
      </div>
    </div>

    <div class="result-share">
      <h4>Share this result</h4>
      <p>Both people can open this link to view the result:</p>
      <input type="text" class="input" value="${state.resultData.resultUrl}" readonly 
             onclick="this.select()" style="font-family: monospace; font-size: 0.75rem;" />
      <div class="link-actions">
        <div class="link-actions-row">
          <button class="btn btn-secondary btn-sm" id="copy-result-link" style="flex: 1;">
            Copy Link
          </button>
          <button class="btn btn-secondary btn-sm" id="toggle-qr-result">
            Show QR
          </button>
          <button class="btn btn-secondary btn-sm" id="open-result-link">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </button>
        </div>
        <div class="qr-container hidden" id="result-qr-container">
          <canvas class="qr-code" id="result-qr-code"></canvas>
        </div>
      </div>
    </div>

    <button class="btn btn-gradient btn-lg" id="done-result" style="width: 100%;">
      Done
    </button>
  `;

  let qrVisible = false;
  document.getElementById("toggle-qr-result")?.addEventListener("click", () => {
    qrVisible = !qrVisible;
    const container = document.getElementById("result-qr-container");
    const btn = document.getElementById("toggle-qr-result");
    if (container && btn) {
      container.classList.toggle("hidden", !qrVisible);
      btn.textContent = qrVisible ? "Hide QR" : "Show QR";
      if (qrVisible) {
        generateQRCode("result-qr-code", state.resultData.resultUrl, 220);
      }
    }
  });

  document.getElementById("copy-result-link")?.addEventListener("click", () => {
    navigator.clipboard.writeText(state.resultData.resultUrl);
    const btn = document.getElementById("copy-result-link");
    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 0.5rem;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>Copied!';
      setTimeout(() => {
        btn.innerHTML = original;
      }, 2000);
    }
  });

  document.getElementById("open-result-link")?.addEventListener("click", () => {
    window.open(state.resultData.resultUrl, "_blank");
  });

  document.getElementById("done-result")?.addEventListener("click", () => {
    state.showResultSheet = false;
    state.resultData = null;
    resetSession();
    window.history.replaceState({}, "", window.location.origin + window.location.pathname);
    hideSheet("result-sheet", null);
    showToast("Ready for a new session!", "success");
  });

  // Friendship reclaim button
  document.getElementById("friendship-reclaim-btn")?.addEventListener("click", () => {
    showDealsModal();
  });

  // Deals modal close button
  document.getElementById("deals-modal-close")?.addEventListener("click", () => {
    hideDealsModal();
  });

  // Close modal when clicking overlay
  document.getElementById("deals-modal-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "deals-modal-overlay") {
      hideDealsModal();
    }
  });
}

// Generate ONE deal based on session code (deterministic - same deal for both people)
function generateDeal(sessionCode) {
  // Use session code as seed for deterministic deal selection
  const seed = parseInt(sessionCode) || 0;
  const deals = [
    {
      name: "Arabica Cafe",
      discount: "20%",
      description: "Get 20% off when you visit together. Experience the perfect blend of friendship and flavor.",
      location: "123 Main St, Downtown",
      phone: "555-0123",
      email: "info@arabicacafe.com",
      validUntil: "Valid for 30 days",
      patternColor: "#8B4513",
      originText: "100% PREMIUM FRIENDSHIP OFFER"
    },
    {
      name: "The Book Nook",
      discount: "15%",
      description: "15% off on books and coffee for two. Share stories over pages and cups.",
      location: "456 Oak Avenue",
      phone: "555-0456",
      email: "hello@booknook.com",
      validUntil: "Valid for 30 days",
      patternColor: "#6B4423",
      originText: "100% PREMIUM FRIENDSHIP OFFER"
    },
    {
      name: "Sunset Cinema",
      discount: "Buy 1 Get 1",
      description: "Buy one ticket, get one free for your friend. Create memories together under the stars.",
      location: "789 Theater Lane",
      phone: "555-0789",
      email: "tickets@sunsetcinema.com",
      validUntil: "Valid for 30 days",
      patternColor: "#A0522D",
      originText: "100% PREMIUM FRIENDSHIP OFFER"
    },
    {
      name: "Artisan Bakery",
      discount: "25%",
      description: "25% off on pastries and drinks for two. Sweet moments made sweeter together.",
      location: "321 Baker Street",
      phone: "555-0321",
      email: "contact@artisanbakery.com",
      validUntil: "Valid for 30 days",
      patternColor: "#CD853F",
      originText: "100% PREMIUM FRIENDSHIP OFFER"
    },
    {
      name: "Zen Garden Restaurant",
      discount: "10%",
      description: "10% off on dinner for two. Find peace and connection over a shared meal.",
      location: "654 Peaceful Way",
      phone: "555-0654",
      email: "reservations@zengarden.com",
      validUntil: "Valid for 30 days",
      patternColor: "#8B7355",
      originText: "100% PREMIUM FRIENDSHIP OFFER"
    },
    {
      name: "Adventure Park",
      discount: "30%",
      description: "30% off on admission for two. Adventure awaits when you explore together.",
      location: "987 Adventure Road",
      phone: "555-0987",
      email: "info@adventurepark.com",
      validUntil: "Valid for 30 days",
      patternColor: "#654321",
      originText: "100% PREMIUM FRIENDSHIP OFFER"
    },
    {
      name: "Cozy Corner Bistro",
      discount: "18%",
      description: "18% off on brunch for two. Start your day with warmth and good company.",
      location: "147 Maple Drive",
      phone: "555-0147",
      email: "hello@cozycorner.com",
      validUntil: "Valid for 30 days",
      patternColor: "#7A5230",
      originText: "100% PREMIUM FRIENDSHIP OFFER"
    },
    {
      name: "Jazz Lounge",
      discount: "2 Free Drinks",
      description: "Two free drinks when you visit together. Let the music bring you closer.",
      location: "258 Music Street",
      phone: "555-0258",
      email: "events@jazzlounge.com",
      validUntil: "Valid for 30 days",
      patternColor: "#5C4033",
      originText: "100% PREMIUM FRIENDSHIP OFFER"
    },
    {
      name: "Mountain View Hiking",
      discount: "25%",
      description: "25% off on guided tours for two. Reach new heights of friendship together.",
      location: "369 Trail Road",
      phone: "555-0369",
      email: "bookings@mountainview.com",
      validUntil: "Valid for 30 days",
      patternColor: "#6F4E37",
      originText: "100% PREMIUM FRIENDSHIP OFFER"
    },
    {
      name: "Craft Workshop",
      discount: "Buy 1 Get 1",
      description: "One person pays, both participate. Create something beautiful together.",
      location: "741 Creative Lane",
      phone: "555-0741",
      email: "workshops@craftstudio.com",
      validUntil: "Valid for 30 days",
      patternColor: "#8B6F47",
      originText: "100% PREMIUM FRIENDSHIP OFFER"
    }
  ];

  // Select ONE random deal based on session code (deterministic)
  const selectedIndex = seed % deals.length;
  return deals[selectedIndex];
}

async function showDealsModal() {
  const overlay = document.getElementById("deals-modal-overlay");
  const modal = document.getElementById("deals-modal");
  const container = document.getElementById("deals-cards-container");
  
  if (!overlay || !modal || !container) return;
  
  // Get session data to find both seats' shaders
  const sessionCode = state.currentSessionCode || "000000";
  const sessionData = await loadSessionAsync(sessionCode);
  const deal = generateDeal(sessionCode);
  
  // Get shaders for both seats
  const seat1Shader = sessionData?.seat1Shader || 1;
  const seat2Shader = sessionData?.seat2Shader || 1;
  
  // World names mapping
  const worldNames = {
    1: "Echo Chamber",
    2: "Signal Drift",
    3: "Starfield Nexus",
    4: "Lumen Curve"
  };
  
  const seat1World = worldNames[seat1Shader] || "Echo Chamber";
  const seat2World = worldNames[seat2Shader] || "Echo Chamber";
  
  // Show minimalist black card
  container.innerHTML = `
    <div class="friendship-card">
      <div class="friendship-worlds">
        <div class="world-circle world-seat1">
          <canvas class="world-shader-canvas" id="world-shader-1" width="120" height="120"></canvas>
          <div class="world-name">${seat1World}</div>
        </div>
        <div class="world-separator">×</div>
        <div class="world-circle world-seat2">
          <canvas class="world-shader-canvas" id="world-shader-2" width="120" height="120"></canvas>
          <div class="world-name">${seat2World}</div>
        </div>
      </div>
      <div class="friendship-message">
        <h3>Reclaim Your Friendship</h3>
        <p>If you go together, you can reclaim your friendship</p>
      </div>
      <div class="friendship-deal">
        <div class="deal-name">${deal.name}</div>
        <div class="deal-discount">${deal.discount} OFF</div>
        <div class="deal-info">
          <div class="deal-location">📍 ${deal.location}</div>
          <div class="deal-contact">📞 ${deal.phone}</div>
          <div class="deal-validity">${deal.validUntil}</div>
        </div>
        <div class="deal-description">${deal.description}</div>
      </div>
    </div>
  `;
  
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
  
  // Initialize shader canvases for both worlds
  setTimeout(() => {
    initWorldShader(seat1Shader, "world-shader-1");
    initWorldShader(seat2Shader, "world-shader-2");
    
    const card = container.querySelector(".friendship-card");
    if (card) {
      card.classList.add("card-reveal");
    }
  }, 200);
}

// Initialize shader for world circle
function initWorldShader(shaderId, canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error("Canvas not found:", canvasId);
    return;
  }
  
  const gl = canvas.getContext("webgl", { 
    alpha: false, 
    antialias: false,
    preserveDrawingBuffer: false 
  }) || canvas.getContext("experimental-webgl");
  
  if (!gl) {
    console.error("WebGL not supported for", canvasId);
    return;
  }
  
  const selectedShader = shaders.find(s => s.id === shaderId) || shaders[0];
  
  // Set canvas size
  const size = 120;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";
  gl.viewport(0, 0, canvas.width, canvas.height);
  
  // Create a modified shader that renders in a circle (no center dimming)
  let circleShader = selectedShader.fragmentShader;
  
  // Replace main() to render in a circle
  const mainStart = circleShader.indexOf('void main()');
  if (mainStart !== -1) {
    let bracePos = circleShader.indexOf('{', mainStart);
    if (bracePos !== -1) {
      let braceCount = 1;
      let endPos = bracePos + 1;
      while (braceCount > 0 && endPos < circleShader.length) {
        if (circleShader[endPos] === '{') braceCount++;
        if (circleShader[endPos] === '}') braceCount--;
        endPos++;
      }
      
      if (braceCount === 0) {
        const beforeMain = circleShader.substring(0, mainStart);
        const afterMain = circleShader.substring(endPos);
        circleShader = beforeMain + `void main() {
          vec2 fragCoord = vTextureCoord * iResolution;
          vec2 center = iResolution * 0.5;
          float dist = distance(fragCoord, center);
          float radius = min(iResolution.x, iResolution.y) * 0.5;
          
          if (dist < radius) {
            vec4 color;
            mainImage(color, fragCoord);
            gl_FragColor = color;
          } else {
            discard;
          }
        }` + afterMain;
      }
    }
  }
  
  // Initialize shader program
  const program = initShaderProgram(gl, vertexShader, circleShader);
  if (!program) {
    console.error("Failed to initialize shader program");
    return;
  }
  
  // Set up attribute locations
  program.attribLocations = {
    vertexPosition: gl.getAttribLocation(program, "aVertexPosition"),
    textureCoord: gl.getAttribLocation(program, "aTextureCoord"),
  };
  
  const buffers = initBuffers(gl);
  if (!buffers) {
    console.error("Failed to initialize buffers");
    return;
  }
  
  const startTime = Date.now();
  
  // Render loop
  const render = () => {
    if (!gl || !program || !buffers) return;
    
    const currentTime = (Date.now() - startTime) / 1000;
    
    // Clear with black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Enable blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    gl.useProgram(program);
    
    // Set uniforms
    const resolutionLocation = gl.getUniformLocation(program, "iResolution");
    const timeLocation = gl.getUniformLocation(program, "iTime");
    const mouseLocation = gl.getUniformLocation(program, "iMouse");
    const hasActiveRemindersLocation = gl.getUniformLocation(program, "hasActiveReminders");
    const hasUpcomingRemindersLocation = gl.getUniformLocation(program, "hasUpcomingReminders");
    const disableCenterDimmingLocation = gl.getUniformLocation(program, "disableCenterDimming");
    
    if (resolutionLocation) {
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    }
    if (timeLocation) {
      gl.uniform1f(timeLocation, currentTime);
    }
    if (mouseLocation) {
      gl.uniform2f(mouseLocation, canvas.width / 2, canvas.height / 2);
    }
    if (hasActiveRemindersLocation) {
      gl.uniform1i(hasActiveRemindersLocation, 0);
    }
    if (hasUpcomingRemindersLocation) {
      gl.uniform1i(hasUpcomingRemindersLocation, 0);
    }
    if (disableCenterDimmingLocation) {
      gl.uniform1i(disableCenterDimmingLocation, 1); // Disable center dimming for circles
    }
    
    // Draw
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(program.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(program.attribLocations.vertexPosition);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(program.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(program.attribLocations.textureCoord);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    
    requestAnimationFrame(render);
  };
  
  render();
}

function hideDealsModal() {
  const overlay = document.getElementById("deals-modal-overlay");
  const modal = document.getElementById("deals-modal");
  
  if (overlay) overlay.classList.add("hidden");
  if (modal) modal.classList.add("hidden");
}

// QR Code Generator
function generateQRCode(canvasId, text, size) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = size;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  const gridSize = 21;
  const moduleSize = Math.floor(size / gridSize);
  const padding = (size - moduleSize * gridSize) / 2;

  const hash = (str, seed) => {
    let h = seed;
    for (let i = 0; i < str.length; i++) {
      h = (h * 33) ^ str.charCodeAt(i);
    }
    return Math.abs(h);
  };

  ctx.fillStyle = "#000000";
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const isFinderPattern =
        (row < 7 && col < 7) ||
        (row < 7 && col >= gridSize - 7) ||
        (row >= gridSize - 7 && col < 7);

      if (isFinderPattern) {
        const inOuter =
          (row === 0 || row === 6 || col === 0 || col === 6) &&
          ((row < 7 && col < 7) ||
            (row < 7 && col >= gridSize - 7) ||
            (row >= gridSize - 7 && col < 7));
        const inInner =
          row >= 2 && row <= 4 && col >= 2 && col <= 4 && row < 7 && col < 7;
        const inInner2 =
          row >= 2 &&
          row <= 4 &&
          col >= gridSize - 5 &&
          col <= gridSize - 3 &&
          row < 7;
        const inInner3 =
          row >= gridSize - 5 &&
          row <= gridSize - 3 &&
          col >= 2 &&
          col <= 4 &&
          col < 7;

        if (inOuter || inInner || inInner2 || inInner3) {
          ctx.fillRect(
            padding + col * moduleSize,
            padding + row * moduleSize,
            moduleSize,
            moduleSize
          );
        }
      } else {
        const seed = hash(text, row * gridSize + col);
        if (seed % 2 === 0) {
          ctx.fillRect(
            padding + col * moduleSize,
            padding + row * moduleSize,
            moduleSize,
            moduleSize
          );
        }
      }
    }
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(size * 0.25, size * 0.85, size * 0.5, size * 0.12);
  ctx.fillStyle = "#000000";
  ctx.font = `${size * 0.06}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("RECONNECT", size / 2, size * 0.91);
}

// Canvas Click Handler
function handleCanvasClick() {
  if (!state.currentSessionCode) {
    // Don't open sheet, join interface is already visible
    return;
  } else if (!state.showQuestionSheet && !state.showResultSheet) {
    // Go directly to questions - no waiting needed
        state.showQuestionSheet = true;
        renderQuestionSheet();
        showSheet("question-sheet", "question-sheet-overlay");
    // Wait a bit longer to ensure DOM is ready
    setTimeout(() => {
      initQuestionSheetShader();
    }, 300);
  }
}

// Welcome Message
function showWelcomeMessage() {
  const overlay = document.getElementById("welcome-overlay");
  const message = document.getElementById("welcome-message");
  const content = document.getElementById("welcome-content");
  
  if (!overlay || !message || !content) return;
  
  // Show overlay and message
  overlay.classList.remove("hidden");
  message.classList.remove("hidden");
  
  // Step 1: Show introduction
  content.innerHTML = `
    <p class="mid-question-text" id="welcome-text-1">Welcome to Reconnect Booth</p>
  `;
  
  setTimeout(() => {
    const textEl = document.getElementById("welcome-text-1");
    if (textEl) {
      textEl.classList.add("visible");
    }
  }, 100);
  
  // Step 2: After 2 seconds, show purpose
  setTimeout(() => {
    const textEl = document.getElementById("welcome-text-1");
    if (textEl) {
      textEl.classList.remove("visible");
      textEl.classList.add("fade-out");
    }
    
    setTimeout(() => {
      content.innerHTML = `
        <p class="mid-question-text" id="welcome-text-2">Discover your compatibility through meaningful questions</p>
      `;
      
      setTimeout(() => {
        const textEl2 = document.getElementById("welcome-text-2");
        if (textEl2) {
          textEl2.classList.add("visible");
        }
      }, 100);
    }, 500);
  }, 2000);
  
  // Step 3: After 3 more seconds, show worlds message
  setTimeout(() => {
    const textEl2 = document.getElementById("welcome-text-2");
    if (textEl2) {
      textEl2.classList.remove("visible");
      textEl2.classList.add("fade-out");
    }
    
    setTimeout(() => {
      content.innerHTML = `
        <p class="mid-question-text" id="welcome-text-3">You have 4 worlds to choose from your vibe</p>
      `;
      
      setTimeout(() => {
        const textEl3 = document.getElementById("welcome-text-3");
        if (textEl3) {
          textEl3.classList.add("visible");
        }
      }, 100);
      
      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        const textEl3 = document.getElementById("welcome-text-3");
        if (textEl3) {
          textEl3.classList.remove("visible");
          textEl3.classList.add("fade-out");
        }
        
        setTimeout(() => {
          hideWelcomeMessage();
        }, 500);
      }, 3000);
    }, 500);
  }, 5000);
}

function hideWelcomeMessage() {
  const overlay = document.getElementById("welcome-overlay");
  const message = document.getElementById("welcome-message");
  
  if (overlay) overlay.classList.add("hidden");
  if (message) message.classList.add("hidden");
  
  state.welcomeShown = true;
}

// Initialize App
function initApp() {
  // Set dark mode
  document.documentElement.classList.add("dark");

  // Load shader preference
  const savedShader = localStorage.getItem("selectedShader");
  if (savedShader) {
    state.selectedShader = parseInt(savedShader, 10);
  }
  
  // Wait for Firebase to initialize (if using module script)
  const checkFirebase = () => {
    if (window.firebaseDB && window.firebaseDB.database) {
      console.log("✅ Firebase is connected!");
      showToast("Firebase connected", "success");
      return true;
    } else {
      console.warn("⚠️ Firebase not connected - using localStorage fallback");
      return false;
    }
  };
  
  // Check immediately
  if (!checkFirebase()) {
    // Wait for Firebase to load (module scripts load asynchronously)
    window.addEventListener('firebaseReady', () => {
      checkFirebase();
      // Re-initialize join interface once Firebase is ready
      updateJoinInterface();
    });
    
    // Also check after a short delay in case event doesn't fire
    setTimeout(() => {
      if (checkFirebase()) {
        updateJoinInterface();
      }
    }, 1000);
  }
  
  // Show welcome message on first load
  showWelcomeMessage();

  // Check URL parameters
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const joinData = params.get("join");
  const resultData = params.get("result");

  if (resultData) {
    const decoded = decodeState(resultData);
    if (decoded && decoded.seat1Answers && decoded.seat2Answers) {
      console.log("✅ Loading results from URL");
      const score = calculateCompatibility(decoded.seat1Answers, decoded.seat2Answers);
      const dominantType = findDominantType(decoded.seat1Answers, decoded.seat2Answers);
      const activities = activitySuggestions[dominantType];

      state.resultData = {
        score,
        activities,
        resultUrl: window.location.href,
      };
      state.showResultSheet = true;
      renderResultSheet();
      showSheet("result-sheet", null);
      console.log("✅ Results sheet displayed");
    } else {
      console.error("❌ Invalid result data in URL");
    }
  } else if (code && /^\d{6}$/.test(code)) {
    // Try to restore session if user is already in it (async)
    (async () => {
      const restored = await restoreSessionIfExists(code);
      if (restored) {
        // Session restored - will show questions below
        if (Object.keys(state.answers).length > 0) {
        state.showQuestionSheet = true;
        renderQuestionSheet();
        showSheet("question-sheet", "question-sheet-overlay");
          setTimeout(() => {
            initQuestionSheetShader();
          }, 100);
      }
    } else {
        // User is not in this session - don't auto-join, let them choose their seat
        console.log("📋 Session exists but user not in it - showing join interface");
        updateJoinInterface();
    }
    })();
  }

  // Initialize components
  initShaderCanvas();
  initShaderSelector();
  updateCenterDisplay();
  
  // If user is already in a session (restored from refresh), show their current state
  if (state.currentSessionCode) {
    // User is already in a session - show questions if they have progress, or let them continue
    if (Object.keys(state.answers).length > 0) {
      state.showQuestionSheet = true;
      renderQuestionSheet();
      showSheet("question-sheet", "question-sheet-overlay");
      setTimeout(() => {
        initQuestionSheetShader();
      }, 100);
    }
    updateJoinInterface(); // This will hide the join interface
  } else {
    // User is not in a session - show join interface
    updateJoinInterface();
    
    // Poll for pairing windows and seat availability
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    
    // Clear any existing interval
    if (state.seatAvailabilityInterval) {
      clearInterval(state.seatAvailabilityInterval);
    }
    
    // Set up real-time listener for pairing windows (Firebase) or poll (localStorage)
    if (window.firebaseDB) {
      // Use Firebase real-time listener to update UI when pairing windows become available
      setupPairingWindowListener((availableCode) => {
        // Update UI to show "Join Now" when pairing window is available
        if (!state.currentSessionCode) {
          updateJoinInterface();
        }
      });
      
      // Also poll to update UI periodically
      state.seatAvailabilityInterval = setInterval(() => {
        if (!state.currentSessionCode) {
          updateJoinInterface();
        }
      }, 2000); // Update every 2 seconds
    } else {
      // Fallback: poll every 1 second
      state.seatAvailabilityInterval = setInterval(() => {
        if (!state.currentSessionCode) {
          // If URL has code, check that session
          if (code && /^\d{6}$/.test(code)) {
            loadSessionAsync(code).then((sessionData) => {
              const availability = getSeatAvailability(code);
              
              // Auto-join as Seat 2 if Seat 1 is taken and Seat 2 is available
              if (availability.seat1 && !availability.seat2) {
                const success = joinSession(code);
                if (success) {
                  if (state.seatAvailabilityInterval) {
                    clearInterval(state.seatAvailabilityInterval);
                    state.seatAvailabilityInterval = null;
                  }
                  updateJoinInterface();
                  state.showQuestionSheet = true;
                  renderQuestionSheet();
                  showSheet("question-sheet", "question-sheet-overlay");
                  setTimeout(() => {
                    initQuestionSheetShader();
                  }, 100);
                }
              } else {
                updateJoinInterface();
              }
            });
          } else {
            // No code in URL - check for active pairing windows
            const availableCode = findAvailablePairingWindowLocal();
            if (availableCode) {
              const success = joinSession(availableCode);
              if (success) {
                if (state.seatAvailabilityInterval) {
                  clearInterval(state.seatAvailabilityInterval);
                  state.seatAvailabilityInterval = null;
                }
                showToast("Successfully paired! Joining session...", "success");
                updateUrlWithSeats(availableCode, true, true);
                updateJoinInterface();
                state.showQuestionSheet = true;
                renderQuestionSheet();
                showSheet("question-sheet", "question-sheet-overlay");
                setTimeout(() => {
                  initQuestionSheetShader();
                }, 100);
              }
            } else {
              updateJoinInterface();
            }
          }
        } else {
          if (state.seatAvailabilityInterval) {
            clearInterval(state.seatAvailabilityInterval);
            state.seatAvailabilityInterval = null;
          }
        }
      }, 1000);
    }
  }

  // Sheet close handlers
  document.querySelectorAll(".sheet-close").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const sheet = e.target.closest(".sheet");
      if (sheet) {
        const sheetId = sheet.id;
        const overlayId = sheetId + "-overlay";
        hideSheet(sheetId, overlayId);
        if (sheetId === "start-sheet") state.showStartSheet = false;
        if (sheetId === "waiting-sheet") {
          state.showWaitingSheet = false;
          if (state.waitingCheckInterval) {
            clearInterval(state.waitingCheckInterval);
            state.waitingCheckInterval = null;
          }
        }
        if (sheetId === "person1-waiting-sheet") {
          if (state.waitingCheckInterval) {
            clearInterval(state.waitingCheckInterval);
            state.waitingCheckInterval = null;
          }
        }
        if (sheetId === "connected-sheet") {
          state.showConnectedSheet = false;
          if (state.countdownTimer) {
            clearInterval(state.countdownTimer);
            state.countdownTimer = null;
          }
        }
        if (sheetId === "question-sheet") state.showQuestionSheet = false;
        if (sheetId === "result-sheet") state.showResultSheet = false;
      }
    });
  });

  // Overlay click handlers
  document.querySelectorAll(".sheet-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        const sheetId = overlay.id.replace("-overlay", "");
        hideSheet(sheetId, overlay.id);
        if (sheetId === "start-sheet") state.showStartSheet = false;
        if (sheetId === "waiting-sheet") {
          state.showWaitingSheet = false;
          if (state.waitingCheckInterval) {
            clearInterval(state.waitingCheckInterval);
            state.waitingCheckInterval = null;
          }
        }
        if (sheetId === "person1-waiting-sheet") {
          if (state.waitingCheckInterval) {
            clearInterval(state.waitingCheckInterval);
            state.waitingCheckInterval = null;
          }
        }
        if (sheetId === "connected-sheet") {
          state.showConnectedSheet = false;
          if (state.countdownTimer) {
            clearInterval(state.countdownTimer);
            state.countdownTimer = null;
          }
        }
        if (sheetId === "question-sheet") state.showQuestionSheet = false;
        if (sheetId === "result-sheet") state.showResultSheet = false;
      }
    });
  });

  // Go home button
  document.getElementById("question-go-home")?.addEventListener("click", () => {
    state.showQuestionSheet = false;
    state.showStartSheet = false;
    state.showResultSheet = false;
    state.resultData = null;
    resetSession();
    window.history.replaceState({}, "", window.location.origin + window.location.pathname);
    hideSheet("question-sheet", "question-sheet-overlay");
    hideSheet("result-sheet", null);
    updateJoinInterface();
    showToast("Returned to home", "success");
  });

  // Home button (top right)
  // Home button (Reconnect Booth title)
  document.getElementById("home-button")?.addEventListener("click", () => {
    state.showQuestionSheet = false;
    state.showStartSheet = false;
    state.showResultSheet = false;
    state.showWaitingSheet = false;
    state.showConnectedSheet = false;
    state.resultData = null;
    resetSession();
    window.history.replaceState({}, "", window.location.origin + window.location.pathname);
    hideSheet("question-sheet", "question-sheet-overlay");
    hideSheet("result-sheet", null);
    hideSheet("waiting-sheet", "waiting-sheet-overlay");
    hideSheet("connected-sheet", "connected-sheet-overlay");
    hideSheet("start-sheet", "start-sheet-overlay");
    updateJoinInterface();
    showToast("Returned to home", "success");
  });
  
  // Reset button (debug)
  document.getElementById("reset-button")?.addEventListener("click", () => {
    console.log("🔄 Resetting everything...");
    
    // Clear all localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('reconnect_') || key.startsWith('pairing_window_')) {
        localStorage.removeItem(key);
        console.log("Cleared:", key);
      }
    });
    localStorage.removeItem('active_pairing_windows');
    
    // Clear Firebase pairing windows
    if (window.firebaseDB) {
      const { database, ref, get, remove } = window.firebaseDB;
      get(ref(database, 'pairing_windows')).then((snapshot) => {
        if (snapshot.exists()) {
          const windows = snapshot.val();
          Object.keys(windows).forEach(code => {
            remove(ref(database, `pairing_windows/${code}`));
          });
        }
      });
    }
    
    // Reset state
    resetSession();
    window.history.replaceState({}, "", window.location.origin + window.location.pathname);
    
    // Update UI
    updateJoinInterface();
    showToast("Everything reset! Try again.", "success");
    console.log("✅ Reset complete!");
  });

  // Join interface event handlers - Seat buttons
  // Use event delegation since buttons might be re-rendered
  document.addEventListener("click", (e) => {
    const seat1Btn = e.target.closest("#join-seat-1");
    const seat2Btn = e.target.closest("#join-seat-2");
    
    if (seat1Btn && !seat1Btn.disabled) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Seat 1 clicked");
      handleJoinAsSeat1();
    } else if (seat2Btn && !seat2Btn.disabled) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Seat 2 clicked");
      handleJoinAsSeat2();
    }
  });
}

async function handleJoinAsSeat1() {
  console.log("✅ handleJoinAsSeat1 called");
  
  if (state.seatAvailabilityInterval) {
    clearInterval(state.seatAvailabilityInterval);
    state.seatAvailabilityInterval = null;
  }
  
  stopPairingWindowListener();
  
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  
  if (code && /^\d{6}$/.test(code)) {
    const availability = getSeatAvailability(code);
    
    if (availability.seat1) {
      showToast("Seat 1 is already taken. Please choose Seat 2.", "error");
      updateJoinInterface();
      return;
    }
    
    // Join existing session as Seat 1
    const deviceId = getDeviceId();
    const sessionData = await loadSessionAsync(code);
    state.currentSessionCode = code;
    state.currentSeat = "1";
    state.answers = sessionData?.seat1 || {};
    
    const updatedData = {
      ...sessionData,
      seat1Connected: true,
      seat1Ready: false,
      seat1DeviceId: deviceId,
      seat2Connected: sessionData?.seat2Connected || false,
      seat2Ready: sessionData?.seat2Ready || false,
    };
    
    saveSession(code, updatedData);
    console.log("✅ Joined as Seat 1, deviceId:", deviceId);
    
    // Create pairing window for this session
    createPairingWindow(code);
    
    updateUrlWithSeats(code, true, sessionData?.seat2Connected || false);
  } else {
    // Create new session and start pairing window
    const newCode = createSession();
    console.log("✅ Created new session as Seat 1:", newCode);
    showToast("Session started! Person 2 has 30 seconds to join.", "success");
  }
  
  updateJoinInterface();
  state.showQuestionSheet = true;
  renderQuestionSheet();
  showSheet("question-sheet", "question-sheet-overlay");
  setTimeout(() => {
    console.log("🔄 Attempting to initialize question sheet shader...");
    initQuestionSheetShader();
  }, 800);
}

async function handleJoinAsSeat2() {
  console.log("✅ handleJoinAsSeat2 called");
  
  if (state.seatAvailabilityInterval) {
    clearInterval(state.seatAvailabilityInterval);
    state.seatAvailabilityInterval = null;
  }
  
  stopPairingWindowListener();
  
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  
  // If there's a code in URL, use it
  if (code && /^\d{6}$/.test(code)) {
    const sessionData = await loadSessionAsync(code);
    const availability = getSeatAvailability(code);
    
    if (availability.seat2) {
      showToast("Seat 2 is already taken.", "error");
      updateJoinInterface();
      return;
    }
    
    if (!availability.seat1) {
      showToast("Please wait for Seat 1 to join first.", "error");
      updateJoinInterface();
      return;
    }
    
    const deviceId = getDeviceId();
    state.currentSessionCode = code;
    state.currentSeat = "2";
    state.answers = sessionData?.seat2 || {};
    
    const updatedData = {
      ...sessionData,
      seat2Connected: true,
      seat2Ready: false,
      seat2DeviceId: deviceId,
    };
    
    saveSession(code, updatedData);
    console.log("✅ Joined as Seat 2, deviceId:", deviceId);
    
    // Remove pairing window since Seat 2 has joined
    removePairingWindow(code);
    
    // Update Firebase pairing window
    if (window.firebaseDB && window.firebaseDB.database && window.firebaseDB.ref && window.firebaseDB.set) {
      const { database, ref, set } = window.firebaseDB;
      set(ref(database, `pairing_windows/${code}/seat2Taken`), true);
    }
    
    updateUrlWithSeats(code, true, true);
    updateJoinInterface();
    state.showQuestionSheet = true;
    renderQuestionSheet();
    showSheet("question-sheet", "question-sheet-overlay");
    setTimeout(() => {
      console.log("🔄 Attempting to initialize question sheet shader...");
      initQuestionSheetShader();
    }, 800);
    return;
  }
  
  // No code in URL - try to find an active pairing window from Firebase
  if (window.firebaseDB && window.firebaseDB.database && window.firebaseDB.ref && window.firebaseDB.get) {
    try {
      const { database, ref, get, query, orderByChild, startAt, endAt, set } = window.firebaseDB;
      const now = Date.now();
      // Look for any active pairing windows (not expired)
      const pairingWindowsRef = ref(database, 'pairing_windows');
      const activeQuery = query(
        pairingWindowsRef,
        orderByChild('expiresAt'),
        startAt(now)
      );
      
      const snapshot = await get(activeQuery);
      if (snapshot.exists()) {
        const windows = snapshot.val();
        console.log("🔍 Found pairing windows in Firebase:", Object.keys(windows));
        // Find first available window
        for (const windowCode in windows) {
          const window = windows[windowCode];
          // Double-check the session exists and Seat 2 hasn't joined
          const sessionData = await loadSessionAsync(windowCode);
          if (window.seat1Taken && !window.seat2Taken && sessionData && !sessionData.seat2DeviceId) {
            console.log("✅ Joining session:", windowCode);
            const success = joinSession(windowCode);
            if (success) {
              // Update Firebase pairing window
              set(ref(database, `pairing_windows/${windowCode}/seat2Taken`), true);
              
              showToast("Successfully paired! Joining session...", "success");
              updateUrlWithSeats(windowCode, true, true);
              updateJoinInterface();
              state.showQuestionSheet = true;
              renderQuestionSheet();
              showSheet("question-sheet", "question-sheet-overlay");
              setTimeout(() => {
                console.log("🔄 Attempting to initialize question sheet shader...");
                initQuestionSheetShader();
              }, 800);
              return;
            }
          }
        }
      } else {
        console.log("🔍 No pairing windows found in Firebase");
      }
    } catch (error) {
      console.error("❌ Error querying Firebase:", error);
      // Fall through to localStorage fallback
    }
  } else {
    console.log("⚠️ Firebase not available, using localStorage fallback");
  }
  
  // Fallback to localStorage
  const availableCode = findAvailablePairingWindowLocal();
  if (availableCode) {
    const success = joinSession(availableCode);
    if (success) {
      showToast("Successfully paired! Joining session...", "success");
      updateUrlWithSeats(availableCode, true, true);
      updateJoinInterface();
      state.showQuestionSheet = true;
      renderQuestionSheet();
      showSheet("question-sheet", "question-sheet-overlay");
      setTimeout(() => {
        console.log("🔄 Attempting to initialize question sheet shader...");
        initQuestionSheetShader();
      }, 800);
      return;
    }
  }
  
  // No active pairing window found
  showToast("No active session found. Ask Person 1 to start a session, then try again within 30 seconds.", "error");
  updateJoinInterface();
}

function handleJoinFromInterface() {
  const input = document.getElementById("join-input-field")?.value || "";
  let code = "";

  if (input.includes("?")) {
    try {
      let urlString = input;
      if (!input.startsWith("http")) {
        urlString = window.location.origin + (input.startsWith("/") ? input : "/" + input);
      }
      const url = new URL(urlString);
      const params = new URLSearchParams(url.search);
      code = params.get("code") || "";
    } catch (e) {
      const match = input.match(/[?&]code=(\d{6})/);
      if (match) {
        code = match[1];
      }
    }
  }

  if (!code) {
    code = input.trim();
  }

  if (!/^\d{6}$/.test(code)) {
    showToast("Invalid session code. Please enter a 6-digit code or paste the full link.", "error");
    return;
  }

  const success = joinSession(code);
  if (success) {
    const baseUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, "", `${baseUrl}?code=${code}`);
    updateJoinInterface();
    
    // Go directly to questions - no waiting needed
    state.showQuestionSheet = true;
    renderQuestionSheet();
    showSheet("question-sheet", "question-sheet-overlay");
    setTimeout(() => {
      console.log("🔄 Attempting to initialize question sheet shader...");
      initQuestionSheetShader();
    }, 800);
  } else {
    showToast("Could not join session. Please check the code and try again.", "error");
  }
}

// Start app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

