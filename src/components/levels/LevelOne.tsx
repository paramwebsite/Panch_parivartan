import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Check, X, RefreshCcw } from "lucide-react";
import Logo from "../logo";

interface LevelOneProps {
  onComplete: (stats: any, timeout: boolean) => void;
  onBack: () => void;
}

type SocialItem = {
  id: string;
  text: string;
  type: "do" | "dont";
  icon: string;
};

const SOCIAL_ITEMS: SocialItem[] = [
  // Do's (using image URLs)
  {
    id: "respect",
    text: "Stand when the national anthem is played",
    type: "do",
    icon: "/images/social/respect.png",
  },
  {
    id: "help",
    text: "Respect other traditions",
    type: "do",
    icon: "/images/social/help.png",
  },
  {
    id: "clean",
    text: "Make public wells accessible to all",
    type: "do",
    icon: "/images/social/clean.png",
  },
  {
    id: "share",
    text: "Help underprivileged children in your locality",
    type: "do",
    icon: "/images/social/share.png",
  },
  {
    id: "greet",
    text: "Offer help when a community organizes its local fair",
    type: "do",
    icon: "/images/social/greet.png",
  },
  {
    id: "queue",
    text: "Be aware and respectful of worshiping methods of others",
    type: "do",
    icon: "/images/social/queue.png",
  },
  {
    id: "discrimination",
    text: "No discrimination in cremation grounds",
    type: "do",
    icon: "/images/social/discrimination.png",
  },
  {
    id: "linguistic",
    text: "Help people from different linguistic backgrounds",
    type: "do",
    icon: "/images/social/linguistic.png",
  },
  {
    id: "empathetic",
    text: "Be empathetic towards the less fortunate",
    type: "do",
    icon: "/images/social/empathetic.png",
  },
  {
    id: "emergency",
    text: "Help neighbors in times of emergency",
    type: "do",
    icon: "/images/social/emergency.png",
  },
  // Don'ts (using image URLs)
  {
    id: "caste",
    text: "Ask the caste of your neighbor",
    type: "dont",
    icon: "/images/social/litter.png",
  },
  {
    id: "restrict",
    text: "Have a temple for your community and restrict others",
    type: "dont",
    icon: "/images/social/noise.png",
  },
  {
    id: "communities",
    text: "Do not take part in festivals observed by other communities",
    type: "dont",
    icon: "/images/social/rude.png",
  },
  {
    id: "invite",
    text: "Don’t invite others to the social festival organized by your community",
    type: "dont",
    icon: "/images/social/vandal.png",
  },
  {
    id: "think",
    text: "It’s your life; you don’t need to think about others in your locality",
    type: "dont",
    icon: "/images/social/cut.png",
  },
  {
    id: "Poor",
    text: "Poor kids in the locality? It is their destiny",
    type: "dont",
    icon: "/images/social/phone.png",
  },
  {
    id: "speak",
    text: "I only help people who speak my language",
    type: "dont",
    icon: "/images/social/phone.png",
  },
  {
    id: "well",
    text: "Avoid using a public well because a particular community uses it",
    type: "dont",
    icon: "/images/social/phone.png",
  },
  {
    id: "Avoid",
    text: "Avoid sending kids to places where children from other communities go",
    type: "dont",
    icon: "/images/social/phone.png",
  },
  {
    id: "visit",
    text: "You never visit temple in your locality that doesnt belong to your tradition",
    type: "dont",
    icon: "/images/social/phone.png",
  },
];

const TIME_LIMIT = 45;
const TARGET_SCORE = 75;

const timerImage = <Timer size={24} />;
const checkImage = <Check size={24} />;
const xImage = <X size={24} />;
const refreshImage = <RefreshCcw size={24} />;

export default function LevelOne({ onComplete, onBack }: LevelOneProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentItem, setCurrentItem] = useState<SocialItem | null>(null);
  const [streak, setStreak] = useState(0);
  const [correctChoices, setCorrectChoices] = useState(0);
  const [perfectChoices, setPerfectChoices] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [hasAnswerd,sethasanswered]=useState(false)
  const [remainingItems, setRemainingItems] = useState<SocialItem[]>([
    ...SOCIAL_ITEMS,
  ]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameOver(true);
      const stats = {
        score,
        timeSpent: TIME_LIMIT,
        correctChoices,
        perfectChoices,
        streak,
        specialAchievements: [
          correctChoices >= 20 ? "Social Sage" : null,
          perfectChoices >= 10 ? "Perfect Harmony" : null,
          streak >= 5 ? "Harmony Streak" : null,
          score >= TARGET_SCORE + 50 ? "Value Master" : null,
        ].filter(Boolean),
      };
      onComplete(stats, true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, correctChoices, perfectChoices, streak, onComplete]);

  // Check for score completion
  useEffect(() => {
    if (isGameOver) return;
    if (score >= TARGET_SCORE) {
      setIsGameOver(true);
      const stats = {
        score,
        timeSpent: TIME_LIMIT - timeLeft,
        correctChoices,
        perfectChoices,
        streak,
        specialAchievements: [
          correctChoices >= 20 ? "Social Sage" : null,
          perfectChoices >= 10 ? "Perfect Harmony" : null,
          streak >= 5 ? "Harmony Streak" : null,
          score >= TARGET_SCORE + 50 ? "Value Master" : null,
        ].filter(Boolean),
      };
      onComplete(stats, false);
    }
  }, [
    score,
    timeLeft,
    correctChoices,
    perfectChoices,
    streak,
    onComplete,
    isGameOver,
  ]);

  // Initial spawn
  useEffect(() => {
    if (isGameOver) return;
    spawnNewItem();
  }, [isGameOver]);

  // Spawn a random item; if no items remain, end the game.
  const spawnNewItem = () => {
    setRemainingItems((prev) => {
      if (prev.length === 0) {
        setIsGameOver(true);
        const stats = {
          score,
          timeSpent: TIME_LIMIT - timeLeft,
          correctChoices,
          perfectChoices,
          streak,
          specialAchievements: [
            correctChoices >= 20 ? "Social Sage" : null,
            perfectChoices >= 10 ? "Perfect Harmony" : null,
            streak >= 5 ? "Harmony Streak" : null,
            score >= TARGET_SCORE + 50 ? "Value Master" : null,
          ].filter(Boolean),
        };
        onComplete(stats, false);
        return prev;
      }
      const randomIndex = Math.floor(Math.random() * prev.length);
      const newItem = prev[randomIndex];
      setCurrentItem(newItem);
      return prev.filter((_, i) => i !== randomIndex);
    });
  };

  // Handle a choice (Do or Don't)
  const handleChoice = (choice: "do" | "dont") => {
    if (hasAnswerd || !currentItem) return;
     sethasanswered(true)
    const isCorrect = choice === currentItem.type;
    let points = 10;

    if (isCorrect) {
      setConsecutiveCorrect((prev) => prev + 1);
      setCorrectChoices((prev) => prev + 1);
      if (consecutiveCorrect >= 2) {
        setPerfectChoices((prev) => prev + 1);
        points *= 2; // Double points for perfect timing
      }
      setStreak((prev) => prev + 1);
    } else {
      setConsecutiveCorrect(0);
      setStreak(0);
      points = -5;
    }

    setScore((prev) => Math.max(0, prev + points));

    // Brief delay for feedback, then spawn next item.
    // setTimeout(spawnNewItem, 500);
    setTimeout(()=>{
      spawnNewItem();
      sethasanswered(false);
    },500)
  };

  // End Level early: mark game as over and call onComplete.
  const handleEndLevel = () => {
    if (isGameOver) return;
    setIsGameOver(true);
    const stats = {
      score,
      timeSpent: TIME_LIMIT - timeLeft,
      correctChoices,
      perfectChoices,
      streak,
      specialAchievements: [
        correctChoices >= 20 ? "Social Sage" : null,
        perfectChoices >= 10 ? "Perfect Harmony" : null,
        streak >= 5 ? "Harmony Streak" : null,
        score >= TARGET_SCORE + 50 ? "Value Master" : null,
      ].filter(Boolean),
    };
    onComplete(stats, false);
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(TIME_LIMIT);
    setIsGameOver(false);
    setStreak(0);
    setCorrectChoices(0);
    setPerfectChoices(0);
    setConsecutiveCorrect(0);
    setRemainingItems([...SOCIAL_ITEMS]);
    spawnNewItem();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-yellow-200 to-yellow-100 p-6"
      style={{
        backgroundImage: "url('/images/background/social_harmony1.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/80 to-yellow-200/80"></div>
      <div className="absolute top-4 left-4 z-50">
        <Logo /> {/* Replace with your actual component */}
      </div>
      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
              <button
                onClick={onBack}
                className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Back to Map
              </button>
            </div>
            {/* End Level Button */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
              <button
                onClick={handleEndLevel}
                className="text-lg font-medium text-red-600 hover:text-red-800 transition-colors"
              >
                End Level
              </button>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
              <Timer className="w-6 h-6" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg text-lg font-semibold">
              Score: {score}/{TARGET_SCORE}
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg text-lg font-semibold">
              Streak: {streak}x
            </div>
          </div>
        </div>

        {/* Game Card */}
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="bg-white rounded-3xl shadow-2xl p-16 w-full max-w-4xl">
            <AnimatePresence mode="wait">
              {currentItem && (
                <motion.div
                  key={currentItem.id}
                  className="flex flex-col items-center justify-center gap-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                >
                  <h3 className="text-3xl font-bold text-gray-800 text-center">
                    {currentItem.text}
                  </h3>
                  <div className="flex gap-8 mt-8">
                    <motion.button
                      className="flex items-center gap-3 px-12 py-4 bg-green-500 text-white text-xl rounded-full shadow-lg hover:bg-green-600 transition-all"
                      onClick={() => handleChoice("do")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Check className="w-8 h-8" />
                      <span>Do</span>
                    </motion.button>
                    <motion.button
                      className="flex items-center gap-3 px-12 py-4 bg-red-500 text-white text-xl rounded-full shadow-lg hover:bg-red-600 transition-all"
                      onClick={() => handleChoice("dont")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-8 h-8" />
                      <span>Don't</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Game Over Modal */}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-6">
                  {score >= TARGET_SCORE
                    ? "🎉 Level Complete!"
                    : "You're on the right path! Reflect, learn, and try again!"}
                </h2>
                <div className="space-y-4 mb-6">
                  <p className="text-center text-xl">Final Score: {score}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-purple-100 rounded-xl">
                      <div className="text-sm text-purple-700">
                        Correct Choices
                      </div>
                      <div className="text-2xl font-bold text-purple-900">
                        {correctChoices}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-pink-100 rounded-xl">
                      <div className="text-sm text-pink-700">Best Streak</div>
                      <div className="text-2xl font-bold text-pink-900">
                        {streak}x
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <p className="text-center text-md text-gray-700 italic">
                      "Hindus should be united and live in harmony while
                      practicing their different traditions and path of
                      worship."
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 justify-center">
                  <button
                    onClick={restartGame}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-full shadow hover:bg-indigo-600 transition-colors"
                  >
                    <RefreshCcw className="w-6 h-6" />
                    <span className="text-lg">Try Again</span>
                  </button>
                  <button
                    onClick={onBack}
                    className="px-6 py-3 bg-gray-300 text-gray-800 rounded-full shadow hover:bg-gray-400 transition-colors"
                  >
                    Back to Map
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
