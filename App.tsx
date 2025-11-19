import { useState, useEffect } from "react";
import { ShaderCanvas } from "./components/ShaderCanvas";
import { ShaderSelector } from "./components/ShaderSelector";
import { StartSheet } from "./components/StartSheet";
import { JoinInterface } from "./components/JoinInterface";
import { QuestionSheet } from "./components/QuestionSheet";
import { ResultSheet } from "./components/ResultSheet";
import { CenterSessionDisplay } from "./components/CenterSessionDisplay";
import { SonnerToastProvider } from "./components/SonnerToastProvider";
import { motion } from "framer-motion";
import { toast } from "sonner@2.0.3";
import { Home } from "lucide-react";
import {
  useReconnectManager,
  encodeState,
  decodeState,
  questions,
  calculateCompatibility,
  findDominantType,
  activitySuggestions,
} from "./components/ReconnectManager";
import "./styles/sonner-fixes.css";
import "./styles/input-fixes.css";

export default function App() {
  const {
    currentSessionCode,
    currentSeat,
    answers,
    createSession,
    joinSession,
    saveAnswer,
    completeSession,
    resetSession,
    getProgress,
    isComplete,
  } = useReconnectManager();

  const [canvasSize, setCanvasSize] = useState(600);
  const [showStartSheet, setShowStartSheet] = useState(false);
  const [showQuestionSheet, setShowQuestionSheet] = useState(false);
  const [showResultSheet, setShowResultSheet] = useState(false);
  const [selectedShader, setSelectedShader] = useState(1);
  const [resultData, setResultData] = useState<{
    score: number;
    activities: string[];
    resultUrl: string;
  } | null>(null);

  // Set dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Adjust canvas size based on window size
  useEffect(() => {
    const handleResize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.7;
      setCanvasSize(size);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Load shader preference from localStorage on initial load
  useEffect(() => {
    const savedShader = localStorage.getItem("selectedShader");
    if (savedShader) {
      setSelectedShader(parseInt(savedShader, 10));
    }
  }, []);

  // Check URL parameters on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const joinData = params.get("join");
    const resultData = params.get("result");

    if (resultData) {
      // Direct result URL
      const decoded = decodeState(resultData);
      if (decoded && decoded.seat1Answers && decoded.seat2Answers) {
        const score = calculateCompatibility(
          decoded.seat1Answers,
          decoded.seat2Answers
        );
        const dominantType = findDominantType(
          decoded.seat1Answers,
          decoded.seat2Answers
        );
        const activities = activitySuggestions[dominantType];

        setResultData({
          score,
          activities,
          resultUrl: window.location.href,
        });
        setShowResultSheet(true);
      }
    } else if (code && joinData) {
      // Join URL with seat 1 answers
      const decoded = decodeState(joinData);
      if (decoded && decoded.seat1Answers) {
        const success = joinSession(code, decoded.seat1Answers);
        if (success) {
          toast.success("Joined session! You can now answer questions.");
          setShowQuestionSheet(true);
        }
      }
    } else if (code) {
      // Just a session code
      const success = joinSession(code);
      if (success) {
        setShowQuestionSheet(true);
      } else {
        toast.error(
          "Session not found. Ask Person A to share their join link."
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle sheet visibility when clicking on shader
  const handleCanvasClick = () => {
    if (!currentSessionCode) {
      // Don't open sheet, join interface is already visible
      return;
    } else if (!showQuestionSheet && !showResultSheet) {
      setShowQuestionSheet(true);
    }
  };

  // Handle shader selection
  const handleSelectShader = (id: number) => {
    setSelectedShader(id);
    localStorage.setItem("selectedShader", id.toString());
  };

  // Handle start session
  const handleStartSession = (): { code: string; url: string } => {
    const code = createSession();
    const baseUrl = window.location.origin + window.location.pathname;
    const url = `${baseUrl}?code=${code}`;

    toast.success("Session created! Share the link with Person B.");

    // Close start sheet and open question sheet
    setTimeout(() => {
      setShowStartSheet(false);
      setShowQuestionSheet(true);
    }, 1500);

    return { code, url };
  };

  // Handle join session
  const handleJoinSession = (input: string): boolean => {
    // Try to extract session code and join data from input
    let code = "";
    let seat1Answers = undefined;

    // Check if it's a full URL
    if (input.includes("?")) {
      try {
        const url = new URL(
          input.startsWith("http") ? input : `https://example.com${input}`
        );
        const params = new URLSearchParams(url.search);
        code = params.get("code") || "";
        const joinData = params.get("join");
        if (joinData) {
          const decoded = decodeState(joinData);
          seat1Answers = decoded?.seat1Answers;
        }
      } catch (e) {
        // Not a valid URL
      }
    }

    // If not found in URL, treat as session code
    if (!code) {
      code = input.trim();
    }

    // Validate code (6 digits)
    if (!/^\d{6}$/.test(code)) {
      toast.error("Invalid session code. Please enter a 6-digit code.");
      return false;
    }

    const success = joinSession(code, seat1Answers);
    if (success) {
      toast.success("Joined session!");
      setShowQuestionSheet(true);
      return true;
    } else {
      toast.error(
        "Session not found. Make sure Person A has shared their link."
      );
      return false;
    }
  };

  // Handle question complete
  const handleQuestionComplete = () => {
    if (!isComplete()) {
      toast.error("Please answer all questions before continuing.");
      return;
    }

    const result = completeSession();
    if (!result) return;

    const baseUrl = window.location.origin + window.location.pathname;

    if (currentSeat === "1") {
      // Seat 1: Generate join link
      const encoded = encodeState({
        seat1Answers: result.seat1Answers,
        timestamp: Date.now(),
      });
      const joinUrl = `${baseUrl}?code=${currentSessionCode}&join=${encoded}`;

      toast.success(
        "Answers saved! Share the link with Person B to continue.",
        {
          duration: 5000,
        }
      );

      // Update URL to join URL
      window.history.replaceState({}, "", joinUrl);

      // Close question sheet
      setShowQuestionSheet(false);
    } else {
      // Seat 2: Calculate result
      if (!result.seat1Answers) {
        toast.error(
          "Person A's answers not found. Please use the join link they shared."
        );
        return;
      }

      const score = calculateCompatibility(
        result.seat1Answers,
        result.seat2Answers
      );
      const dominantType = findDominantType(
        result.seat1Answers,
        result.seat2Answers
      );
      const activities = activitySuggestions[dominantType];

      // Encode both answers in result URL
      const encoded = encodeState({
        seat1Answers: result.seat1Answers,
        seat2Answers: result.seat2Answers,
        timestamp: Date.now(),
      });
      const resultUrl = `${baseUrl}?result=${encoded}`;

      setResultData({
        score,
        activities,
        resultUrl,
      });

      // Update URL
      window.history.replaceState({}, "", resultUrl);

      // Show result
      setShowQuestionSheet(false);
      setShowResultSheet(true);

      toast.success("Compatibility calculated!");
    }
  };

  // Handle done from result screen
  const handleDone = () => {
    setShowResultSheet(false);
    setResultData(null);
    resetSession();
    window.history.replaceState(
      {},
      "",
      window.location.origin + window.location.pathname
    );
    toast.success("Ready for a new session!");
  };

  // Handle go home from question sheet
  const handleGoHome = () => {
    setShowQuestionSheet(false);
    setShowStartSheet(false);
    setShowResultSheet(false);
    setResultData(null);
    resetSession();
    window.history.replaceState(
      {},
      "",
      window.location.origin + window.location.pathname
    );
    toast.success("Returned to home");
  };

  // Determine shader state
  const hasActiveSession = !!currentSessionCode;
  const hasCompletedQuestions = isComplete();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative">
      {/* Sonner Toast Provider */}
      <SonnerToastProvider />

      {/* Top Left: Reconnect Booth Title */}
      <div className="fixed top-6 left-6 z-30">
        <h1 className="text-white font-serif text-xl">Reconnect Booth</h1>
      </div>

      {/* Top Right: Home Link */}
      <button
        onClick={handleGoHome}
        className="fixed top-6 right-6 z-30 flex items-center gap-2 text-white font-serif text-sm hover:opacity-80 transition-opacity"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>

      {/* Shader Selector - Fixed on the right */}
      <ShaderSelector
        selectedShader={selectedShader}
        onSelectShader={handleSelectShader}
      />

      {/* Main layout container with shader */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Shader Circle */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <ShaderCanvas
            size={canvasSize}
            onClick={handleCanvasClick}
            hasActiveReminders={hasActiveSession}
            hasUpcomingReminders={hasCompletedQuestions}
            shaderId={selectedShader}
            disablePointerEvents={!currentSessionCode}
          />

          {/* Center Session Display - Only show when there's an active session */}
          {currentSessionCode && (
            <CenterSessionDisplay
              sessionCode={currentSessionCode}
              currentSeat={currentSeat}
              progress={getProgress()}
              totalQuestions={questions.length}
              size={canvasSize}
            />
          )}

          {/* Join Interface - Show when no active session */}
          {!currentSessionCode && (
            <JoinInterface
              onStartSession={handleStartSession}
              onJoinSession={handleJoinSession}
            />
          )}
        </motion.div>

        {/* Start Sheet - Keep for session info display */}
        <StartSheet
          open={showStartSheet}
          onOpenChange={setShowStartSheet}
          onStartSession={handleStartSession}
          onJoinSession={handleJoinSession}
        />

        {/* Question Sheet */}
        <QuestionSheet
          open={showQuestionSheet}
          onOpenChange={setShowQuestionSheet}
          onAnswer={saveAnswer}
          answers={answers}
          onComplete={handleQuestionComplete}
          currentSeat={currentSeat}
          sessionCode={currentSessionCode}
          onGoHome={handleGoHome}
        />

        {/* Result Sheet */}
        {resultData && (
          <ResultSheet
            open={showResultSheet}
            onOpenChange={setShowResultSheet}
            score={resultData.score}
            activities={resultData.activities}
            resultUrl={resultData.resultUrl}
            sessionCode={currentSessionCode || ""}
            onDone={handleDone}
          />
        )}
      </div>
    </div>
  );
}