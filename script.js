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

function saveSession(code, data) {
  const sessionData = {
    ...data,
    lastUpdated: Date.now(),
  };
  // Use localStorage so it persists across tabs
  localStorage.setItem(`reconnect_session_${code}`, JSON.stringify(sessionData));
}

function loadSession(code) {
  const data = localStorage.getItem(`reconnect_session_${code}`);
  return data ? JSON.parse(data) : null;
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
  // Mark seat 1 as connected (but not ready until they answer questions)
  saveSession(code, { 
    seat1Connected: true, 
    seat1Ready: false,
    seat1DeviceId: deviceId,
    seat2Connected: false,
    seat2Ready: false
  });
  return code;
}

function joinSession(code) {
  // Try to load session from localStorage
  let sessionData = loadSession(code);
  
  // If session doesn't exist, create it (Person 1 might be on a different device)
  // The code itself is enough to join - we'll detect Person 1 when they interact
  if (!sessionData) {
    // Create a placeholder session - Person 1 will update it when they're ready
    sessionData = { seat1Connected: false, seat2Connected: false };
    saveSession(code, sessionData);
  }

  // If Person 1 is already connected, great. If not, we'll wait for them.
  const deviceId = getDeviceId();
  state.currentSessionCode = code;
  state.currentSeat = "2";
  state.answers = {};
  
  // Mark seat 2 as connected
  saveSession(code, { 
    ...sessionData, 
    seat2Connected: true,
    seat2DeviceId: deviceId, 
    seat2Ready: false,
    seat2Joined: true 
  });
  
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

function completeSession() {
  if (!state.currentSessionCode || !state.currentSeat) return null;

  const sessionData = loadSession(state.currentSessionCode);

  if (state.currentSeat === "1") {
    saveSession(state.currentSessionCode, {
      ...sessionData,
      seat1: state.answers,
      seat1Ready: true,
    });
    return { seat1Answers: state.answers, seat2Answers: {} };
  } else {
    saveSession(state.currentSessionCode, {
      ...sessionData,
      seat2: state.answers,
      seat2Ready: true,
    });
    return {
      seat1Answers: sessionData?.seat1 || null,
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

// Center Display
function updateJoinInterface() {
  const joinInterface = document.getElementById("join-interface");
  if (!joinInterface) return;

  if (!state.currentSessionCode) {
    joinInterface.classList.remove("hidden");
    // Disable pointer events on canvas when join interface is visible
    const canvas = document.getElementById("shader-canvas");
    if (canvas) {
      canvas.style.pointerEvents = "none";
      canvas.style.cursor = "default";
    }
    
    // Check if there's a session code in URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    
    if (code && /^\d{6}$/.test(code)) {
      // Check which seats are taken (check both URL params and localStorage)
      const urlParams = new URLSearchParams(window.location.search);
      const urlSeat1 = urlParams.get("seat1") === "taken";
      const urlSeat2 = urlParams.get("seat2") === "taken";
      
      const sessionData = loadSession(code);
      
      // URL params are source of truth for cross-device, but also check device IDs
      const seat1Taken = urlSeat1 || !!(sessionData?.seat1DeviceId || sessionData?.seat1Connected || sessionData?.seat1Ready);
      const seat2Taken = urlSeat2 || !!(sessionData?.seat2DeviceId || sessionData?.seat2Connected || sessionData?.seat2Ready);
      
      // Update button states
      const seat1Btn = document.getElementById("join-seat-1");
      const seat2Btn = document.getElementById("join-seat-2");
      const seat1Status = document.getElementById("seat-1-status");
      const seat2Status = document.getElementById("seat-2-status");
      
      if (seat1Btn && seat1Status) {
        if (seat1Taken) {
          seat1Btn.disabled = true;
          seat1Btn.classList.add("seat-taken");
          seat1Status.textContent = "Taken";
        } else {
          seat1Btn.disabled = false;
          seat1Btn.classList.remove("seat-taken");
          seat1Status.textContent = "Available";
        }
      }
      
      if (seat2Btn && seat2Status) {
        if (seat2Taken) {
          seat2Btn.disabled = true;
          seat2Btn.classList.add("seat-taken");
          seat2Status.textContent = "Taken";
        } else {
          // Seat 2 is only available if Seat 1 is taken
          if (seat1Taken) {
            seat2Btn.disabled = false;
            seat2Btn.classList.remove("seat-taken");
            seat2Status.textContent = "Available";
          } else {
            seat2Btn.disabled = true;
            seat2Btn.classList.remove("seat-taken");
            seat2Status.textContent = "Wait for Seat 1";
          }
        }
      }
    } else {
      // No session code - Seat 1 can create new session, Seat 2 needs code
      const seat1Btn = document.getElementById("join-seat-1");
      const seat2Btn = document.getElementById("join-seat-2");
      const seat1Status = document.getElementById("seat-1-status");
      const seat2Status = document.getElementById("seat-2-status");
      
      if (seat1Btn && seat1Status) {
        seat1Btn.disabled = false;
        seat1Btn.classList.remove("seat-taken");
        seat1Status.textContent = "Available";
      }
      
      if (seat2Btn && seat2Status) {
        seat2Btn.disabled = true; // Seat 2 requires a session code
        seat2Btn.classList.remove("seat-taken");
        seat2Status.textContent = "Enter code";
      }
    }
  } else {
    joinInterface.classList.add("hidden");
    // Re-enable pointer events on canvas when join interface is hidden
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
  const overlay = document.getElementById(overlayId);
  if (sheet && overlay) {
    sheet.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
}

function hideSheet(sheetId, overlayId) {
  const sheet = document.getElementById(sheetId);
  const overlay = document.getElementById(overlayId);
  if (sheet && overlay) {
    sheet.classList.add("hidden");
    overlay.classList.add("hidden");
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

// Question Sheet
function renderQuestionSheet() {
  const container = document.getElementById("question-carousel-container");
  const title = document.getElementById("question-sheet-title");
  const sessionCode = document.getElementById("question-session-code");

  if (!container || !state.currentSeat || !state.currentSessionCode) return;

  if (title) title.textContent = `Seat ${state.currentSeat}`;
  if (sessionCode) sessionCode.textContent = `Session: ${state.currentSessionCode}`;

  const currentQuestion = questions[state.currentQuestionIndex];
  const progress = getProgress();
  const selectedOption = state.answers[currentQuestion.id] || null;

  container.innerHTML = `
    <div class="question-progress">
      <p>Question ${state.currentQuestionIndex + 1} of ${questions.length}</p>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${((state.currentQuestionIndex + 1) / questions.length) * 100}%"></div>
      </div>
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
          ${state.currentSeat === "1" ? "Save & Share →" : "Finish →"}
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

function handleQuestionComplete() {
  if (!isComplete()) {
    showToast("Please answer all questions before continuing.", "error");
    return;
  }

  const result = completeSession();
  if (!result) return;

  const baseUrl = window.location.origin + window.location.pathname;

  if (state.currentSeat === "1") {
    const encoded = encodeState({
      seat1Answers: result.seat1Answers,
      timestamp: Date.now(),
    });
    const joinUrl = `${baseUrl}?code=${state.currentSessionCode}&join=${encoded}`;

    showToast("Answers saved! Share the link with Person B to continue.", "success");

    window.history.replaceState({}, "", joinUrl);
    state.showQuestionSheet = false;
    hideSheet("question-sheet", "question-sheet-overlay");
  } else {
    if (!result.seat1Answers) {
      showToast("Person A's answers not found. Please use the join link they shared.", "error");
      return;
    }

    const score = calculateCompatibility(result.seat1Answers, result.seat2Answers);
    const dominantType = findDominantType(result.seat1Answers, result.seat2Answers);
    const activities = activitySuggestions[dominantType];

    const encoded = encodeState({
      seat1Answers: result.seat1Answers,
      seat2Answers: result.seat2Answers,
      timestamp: Date.now(),
    });
    const resultUrl = `${baseUrl}?result=${encoded}`;

    state.resultData = { score, activities, resultUrl };
    window.history.replaceState({}, "", resultUrl);
    state.showQuestionSheet = false;
    state.showResultSheet = true;
    hideSheet("question-sheet", "question-sheet-overlay");
    renderResultSheet();
    showSheet("result-sheet", "result-sheet-overlay");
    showToast("Compatibility calculated!", "success");
  }
}

// Result Sheet
function renderResultSheet() {
  const body = document.getElementById("result-sheet-body");
  const sessionCode = document.getElementById("result-session-code");

  if (!body || !state.resultData) return;

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
      <h4>Suggested activities:</h4>
      <ul>
        ${state.resultData.activities.map((activity) => `<li><span>•</span><span>${activity}</span></li>`).join("")}
      </ul>
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
    hideSheet("result-sheet", "result-sheet-overlay");
    showToast("Ready for a new session!", "success");
  });
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
      showSheet("result-sheet", "result-sheet-overlay");
    }
  } else if (code && /^\d{6}$/.test(code)) {
    // URL has code - check if user is already in this session (restore on refresh)
    const sessionData = loadSession(code);
    const deviceId = getDeviceId();
    
    // Check if this device is already Seat 1 or Seat 2 by comparing device IDs
    const isSeat1 = sessionData?.seat1DeviceId === deviceId;
    const isSeat2 = sessionData?.seat2DeviceId === deviceId;
    
    if (isSeat1) {
      // This device is Seat 1 - restore their session
      state.currentSessionCode = code;
      state.currentSeat = "1";
      state.answers = sessionData.seat1 || {};
      // Update URL to reflect seat 1 is taken
      const baseUrl = window.location.origin + window.location.pathname;
      const url = `${baseUrl}?code=${code}&seat1=taken`;
      window.history.replaceState({}, "", url);
    } else if (isSeat2) {
      // This device is Seat 2 - restore their session
      state.currentSessionCode = code;
      state.currentSeat = "2";
      state.answers = sessionData.seat2 || {};
      // Update URL to reflect both seats are taken
      const baseUrl = window.location.origin + window.location.pathname;
      const url = `${baseUrl}?code=${code}&seat1=taken&seat2=taken`;
      window.history.replaceState({}, "", url);
    } else {
      // User is not in this session yet - check seat availability from URL params
      const urlSeat1 = params.get("seat1") === "taken";
      const urlSeat2 = params.get("seat2") === "taken";
      
      // Use URL params as source of truth (works across devices)
      // Also check if seats have device IDs (meaning someone has joined)
      const seat1Taken = urlSeat1 || !!(sessionData?.seat1DeviceId || sessionData?.seat1Connected || sessionData?.seat1Ready);
      const seat2Taken = urlSeat2 || !!(sessionData?.seat2DeviceId || sessionData?.seat2Connected || sessionData?.seat2Ready);
      
      // If Seat 1 is taken and Seat 2 is available, automatically join as Seat 2
      if (seat1Taken && !seat2Taken) {
        const success = joinSession(code);
        if (success) {
          // Update URL to mark seat 2 as taken
          const baseUrl = window.location.origin + window.location.pathname;
          const url = `${baseUrl}?code=${code}&seat1=taken&seat2=taken`;
          window.history.replaceState({}, "", url);
          
          state.showQuestionSheet = true;
          renderQuestionSheet();
          showSheet("question-sheet", "question-sheet-overlay");
          updateJoinInterface();
          return; // Don't show join interface, go straight to questions
        }
      }
      // Otherwise, show seat selection interface
    }
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
    }
    updateJoinInterface(); // This will hide the join interface
  } else {
    // User is not in a session - show join interface
    updateJoinInterface();
    
    // Poll for seat availability updates (when no session is active but URL has code)
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code && /^\d{6}$/.test(code)) {
      // Clear any existing interval
      if (state.seatAvailabilityInterval) {
        clearInterval(state.seatAvailabilityInterval);
      }
      // Poll every 1 second to check seat availability and auto-join if needed
      state.seatAvailabilityInterval = setInterval(() => {
        if (!state.currentSessionCode) {
          // Check URL params first (works across devices)
          const currentParams = new URLSearchParams(window.location.search);
          const urlSeat1 = currentParams.get("seat1") === "taken";
          const urlSeat2 = currentParams.get("seat2") === "taken";
          
          const sessionData = loadSession(code);
          
          // URL params are source of truth for cross-device
          const seat1Taken = urlSeat1 || !!(sessionData?.seat1DeviceId || sessionData?.seat1Connected || sessionData?.seat1Ready);
          const seat2Taken = urlSeat2 || !!(sessionData?.seat2DeviceId || sessionData?.seat2Connected || sessionData?.seat2Ready);
          
          // Auto-join as Seat 2 if Seat 1 is taken and Seat 2 is available
          if (seat1Taken && !seat2Taken) {
            const success = joinSession(code);
            if (success) {
              // Stop polling
              if (state.seatAvailabilityInterval) {
                clearInterval(state.seatAvailabilityInterval);
                state.seatAvailabilityInterval = null;
              }
              // Update URL to mark seat 2 as taken
              const baseUrl = window.location.origin + window.location.pathname;
              const url = `${baseUrl}?code=${code}&seat1=taken&seat2=taken`;
              window.history.replaceState({}, "", url);
              // Go to questions automatically
              updateJoinInterface();
              state.showQuestionSheet = true;
              renderQuestionSheet();
              showSheet("question-sheet", "question-sheet-overlay");
            }
          } else {
            // Just update the interface to show current availability
            updateJoinInterface();
          }
        } else {
          // Stop polling if user has joined
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
    hideSheet("result-sheet", "result-sheet-overlay");
    updateJoinInterface();
    showToast("Returned to home", "success");
  });

  // Home button (top right)
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
    hideSheet("result-sheet", "result-sheet-overlay");
    hideSheet("waiting-sheet", "waiting-sheet-overlay");
    hideSheet("connected-sheet", "connected-sheet-overlay");
    hideSheet("start-sheet", "start-sheet-overlay");
    updateJoinInterface();
    showToast("Returned to home", "success");
  });

  // Join interface event handlers - Seat buttons
  // Use event delegation since buttons might be re-rendered
  document.addEventListener("click", (e) => {
    if (e.target.closest("#join-seat-1")) {
      e.preventDefault();
      handleJoinAsSeat1();
    } else if (e.target.closest("#join-seat-2")) {
      e.preventDefault();
      handleJoinAsSeat2();
    }
  });
}

function handleJoinAsSeat1() {
  // Stop seat availability polling
  if (state.seatAvailabilityInterval) {
    clearInterval(state.seatAvailabilityInterval);
    state.seatAvailabilityInterval = null;
  }
  
  // Check if there's already a session code in URL
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  
  if (code && /^\d{6}$/.test(code)) {
    // Check if seat 1 is already taken (check both localStorage and URL params)
    const sessionData = loadSession(code);
    const urlSeat1 = params.get("seat1") === "taken";
    const seat1Taken = urlSeat1 || !!(sessionData?.seat1DeviceId || sessionData?.seat1Connected || sessionData?.seat1Ready);
    
    if (seat1Taken) {
      showToast("Seat 1 is already taken. Please choose Seat 2.", "error");
      updateJoinInterface(); // Refresh interface
      return;
    }
    
    // Join existing session as Seat 1
    state.currentSessionCode = code;
    state.currentSeat = "1";
    state.answers = {};
    
    saveSession(code, {
      ...sessionData,
      seat1Connected: true,
      seat1Ready: false,
      seat2Connected: sessionData?.seat2Connected || false,
      seat2Ready: sessionData?.seat2Ready || false,
    });
    
    // Update URL to mark seat 1 as taken (so other devices can see it)
    const baseUrl = window.location.origin + window.location.pathname;
    const url = `${baseUrl}?code=${code}&seat1=taken`;
    window.history.replaceState({}, "", url);
  } else {
    // Create new session as Seat 1
    const newCode = createSession();
    const baseUrl = window.location.origin + window.location.pathname;
    const url = `${baseUrl}?code=${newCode}&seat1=taken`;
    window.history.replaceState({}, "", url);
  }
  
  // Hide join interface and show questions
  updateJoinInterface();
  state.showQuestionSheet = true;
  renderQuestionSheet();
  showSheet("question-sheet", "question-sheet-overlay");
}

function handleJoinAsSeat2() {
  // Stop seat availability polling
  if (state.seatAvailabilityInterval) {
    clearInterval(state.seatAvailabilityInterval);
    state.seatAvailabilityInterval = null;
  }
  
  // Check if there's a session code in URL
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  
  if (!code || !/^\d{6}$/.test(code)) {
    showToast("Please open the link shared by Person 1 (Seat 1) to join as Seat 2.", "error");
    updateJoinInterface(); // Refresh interface
    return;
  }
  
  // Check if seat 2 is already taken (check both localStorage and URL params)
  const sessionData = loadSession(code);
  const urlSeat2 = params.get("seat2") === "taken";
  const seat2Taken = urlSeat2 || !!(sessionData?.seat2DeviceId || sessionData?.seat2Connected || sessionData?.seat2Ready);
  
  if (seat2Taken) {
    showToast("Seat 2 is already taken.", "error");
    updateJoinInterface(); // Refresh interface
    return;
  }
  
  // Check if seat 1 is taken - Seat 2 can only join if Seat 1 has joined first
  const urlSeat1 = params.get("seat1") === "taken";
  const seat1Taken = urlSeat1 || !!(sessionData?.seat1DeviceId || sessionData?.seat1Connected || sessionData?.seat1Ready);
  if (!seat1Taken) {
    showToast("Please wait for Seat 1 to join first.", "error");
    updateJoinInterface(); // Refresh interface
    return;
  }
  
  // Join session as Seat 2 automatically
  const success = joinSession(code);
  if (success) {
    // Update URL to mark seat 2 as taken
    const baseUrl = window.location.origin + window.location.pathname;
    const url = `${baseUrl}?code=${code}&seat1=taken&seat2=taken`;
    window.history.replaceState({}, "", url);
    
    // Hide join interface and show questions
    updateJoinInterface();
    state.showQuestionSheet = true;
    renderQuestionSheet();
    showSheet("question-sheet", "question-sheet-overlay");
  } else {
    showToast("Could not join session. Please check the code.", "error");
    updateJoinInterface(); // Refresh interface
  }
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

