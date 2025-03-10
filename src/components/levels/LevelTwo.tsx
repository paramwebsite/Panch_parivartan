

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Heart, RefreshCcw, Users } from "lucide-react";

interface LevelTwoProps {
  onComplete: (stats: any, timeout: boolean) => void;
  onBack: () => void;
  onEndGame: () => void; // New prop to signal early ending
}

type ItemType = {
  id: string;
  type: "positive" | "negative";
  icon: string;
  value: number;
  x: number;
  y: number;
  speed: number;
  description: string;
  impact: string;
};

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const BASKET_WIDTH = 150;
const BASKET_HEIGHT = 80;
const TIME_LIMIT = 45;
const GRAVITY = 0.03;
const MAX_SPEED = 4;

const POSITIVE_ITEMS = [
  {
    icon: "/images/level2/positive/GrandmaStorytelling.png",
    value: 10,
    description: "Grandma Storytelling",
    impact: "Nurtures creativity",
  },
  {
    icon: "/images/level2/positive/EatingwithFamilyMembers.png",
    value: 8,
    description: "Eating with Family Members",
    impact: "Strengthens family bonds",
  },
  {
    icon: "/images/level2/positive/TakingBlessingsfromElders.png",
    value: 5,
    description: "Taking Blessings from Elders",
    impact: "Provides emotional support to excel",
  },
  {
    icon: "/images/level2/positive/CelebratingFestivalsTogether.png",
    value: 3,
    description: "Celebrating Festivals Together",
    impact: "Fosters family unity",
  },
  {
    icon: "/images/level2/positive/FamilyTour.png",
    value: 7,
    description: "Family Tour",
    impact: "Brings happiness and creates memories",
  },
  {
    icon: "/images/level2/positive/ParticipatinginWorship.png",
    value: 10,
    description: "Participating in Worship",
    impact: "Passes on traditions and values",
  },
  {
    icon: "/images/level2/positive/EveningFamilyBhajan.png",
    value: 8,
    description: "Evening Family Bhajan",
    impact: "Promotes mental calmness and positivity",
  },
  {
    icon: "/images/level2/positive/PreparingHomeCookedFoodTogether.png",
    value: 5,
    description: "Preparing Home-Cooked Food Together",
    impact: "Good for health",
  },
  {
    icon: "/images/level2/positive/SpendingTimewithKids.png",
    value: 3,
    description: "Spending Time with Kids",
    impact: "Reduces digital overload",
  },
  {
    icon: "/images/level2/positive/HelpingwithHouseholdChores.png",
    value: 7,
    description: "Helping with Household Chores",
    impact: "Develops a sense of equality and teamwork",
  },
  {
    icon: "/images/level2/positive/AttendingFamilyFunctions.png",
    value: 10,
    description: "Attending Family Functions",
    impact: "Builds social connections",
  },
  // {
  //   icon: "/images/level2/positive/HelpingOthers.png",
  //   value: 8,
  //   description: "Helping Others",
  //   impact: "Builds empathy",
  // },
  {
    icon: "/images/level2/positive/GiftingtoFamilyMembers.png",
    value: 5,
    description: "Gifting to Family Members",
    impact: "Teaches the value of giving",
  },
  {
    icon: "/images/level2/positive/TakingCareofElders.png",
    value: 3,
    description: "Taking Care of Elders",
    impact: "Instills a sense of responsibility",
  },
  {
    icon: "/images/level2/positive/SharingPersonalExperiences.png",
    value: 7,
    description: "Sharing Personal Experiences",
    impact: "Builds trust and emotional connection",
  },
  {
    icon: "/images/level2/positive/WatchingMoviesTogether.png",
    value: 10,
    description: "Watching Movies Together",
    impact: "Enhances shared interests and bonding",
  },
  {
    icon: "/images/level2/positive/CelebratingMilestones.png",
    value: 8,
    description: "Celebrating Milestones",
    impact: "Psychological strength, inspires to succeed",
  },
  {
    icon: "/images/level2/positive/FamilyGameNights.png",
    value: 5,
    description: "Family Game Nights",
    impact: "Makes life at ease, fun memories",
  },
  {
    icon: "/images/level2/positive/DiscussingFamilyExpenses.png",
    value: 3,
    description: "Discussing Family Expenses",
    impact: "Helps the younger generation become judicious in spending",
  },
  {
    icon: "/images/level2/positive/ExercisingTogether.png",
    value: 7,
    description: "Exercising Together",
    impact: "Encourages healthy living",
  },
  {
    icon: "/images/level2/positive/FamilyDonationtoTemple.png",
    value: 10,
    description: "Family Donation to Temple",
    impact: "Teaches social responsibility",
  },
  {
    icon: "/images/level2/positive/Visitingrelatives.png",
    value: 8,
    description: "Visiting relatives",
    impact: "Strengthens cooperation",
  },
];

const NEGATIVE_ITEMS = [
  {
    icon: "/images/level2/negative/EatingAlone.png",
    value: -5,
    description: "Eating Alone",
    impact: "Leads to loneliness",
  },
  {
    icon: "/images/level2/negative/TalkingonCellphoneDuringFamilyGathering.png",
    value: -8,
    description: "Talking on Cellphone During Family Gathering",
    impact: "Causes disharmony in the family",
  },
  {
    icon: "/images/level2/negative/DisrespectingParents.png",
    value: -10,
    description: "Disrespecting Parents",
    impact: "The younger generation picks up bad examples",
  },
  {
    icon: "/images/level2/negative/WatchingMobilePhoneWhileEating.png",
    value: -3,
    description: "Watching Mobile Phone While Eating",
    impact: "Weakens emotional connection",
  },
  {
    icon: "/images/level2/negative/SpendingTimeAlone.png",
    value: -7,
    description: "Spending Time Alone",
    impact: "Leads to mental health issues",
  },
  {
    icon: "/images/level2/negative/AbstainingfromFamilyFunctions.png",
    value: -5,
    description: "Abstaining from Family Functions",
    impact: "Results in being cut off from tradition",
  },
  {
    icon: "/images/level2/negative/ArguinginFrontofChildren.png",
    value: -8,
    description: "Arguing in Front of Children",
    impact: "Creates confusion and emotional distress for kids",
  },
  {
    icon: "/images/level2/negative/UsingHarshLanguagewithFamily.png",
    value: -10,
    description: "Using Harsh Language with Family",
    impact: "Damages respect and trust within the family",
  },
  {
    icon: "/images/level2/negative/SpendingExcessiveTimeonSocialMedia.png",
    value: -3,
    description: "Spending Excessive Time on Social Media",
    impact: "Reduces quality family interactions",
  },
  {
    icon: "/images/level2/negative/TakingOutFrustrationsonFamilyMembers.png",
    value: -7,
    description: "Taking Out Frustrations on Family Members",
    impact: "Causes emotional strain and misunderstandings",
  },
  {
    icon: "/images/level2/negative/Gossiping.png",
    value: -7,
    description: "Gossiping",
    impact: "Wastes time and spreads negativity",
  },
  {
    icon: "/images/level2/negative/IgnoringFamilyHealth.png",
    value: -7,
    description: "Ignoring Family Health",
    impact: "Leads to a lack of care and concern for one another",
  },
  {
    icon: "/images/level2/negative/GivingChildrenCellPhonestoKeepThemEngaged.png",
    value: -7,
    description: "Giving Children Cell Phones to Keep Them Engaged",
    impact: "Weakens people-to-people communication",
  },
  {
    icon: "/images/level2/negative/MistreatingHouseHelp.png",
    value: -7,
    description: "Mistreating House Help",
    impact: "Teaches children discriminatory attitudes",
  },
  {
    icon: "/images/level2/negative/LeavingorWastingFoodonthePlate.png",
    value: -7,
    description: "Leaving or Wasting Food on the Plate",
    impact: "Prevents children from appreciating the value of resources",
  },
  {
    icon: "/images/level2/negative/LeavingThingsScatteredAround.png",
    value: -7,
    description: "Leaving Things Scattered Around",
    impact: "Creates disorder and a lack of discipline in life",
  },
  {
    icon: "/images/level2/negative/NotSegregatingWaste.png",
    value: -7,
    description: "Not Segregating Waste",
    impact: "Unhygienic; disrespects labor dignity",
  },
  {
    icon: "/images/level2/negative/RaisingKidsinanOverprotectiveIndoorEnvironment.png",
    value: -7,
    description: "Raising Kids in an Overprotective Indoor Environment",
    impact: "Negatively affects social behavior and adaptability",
  },
  {
    icon: "/images/level2/negative/WakingUpLateintheMorning.png",
    value: -7,
    description: "Waking Up Late in the Morning",
    impact: "Encourages laziness and diminishes time management skills",
  },
  {
    icon: "/images/level2/negative/TakingOutFrustrationsonFamilyMembers.png",
    value: -7,
    description: "Taking Out Frustrations on Family Members",
    impact: "Causes emotional strain and misunderstandings",
  },
];

export default function LevelTwo({
  onComplete,
  onBack,
  onEndGame,
}: LevelTwoProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [basketPosition, setBasketPosition] = useState(GAME_WIDTH / 2);
  const [items, setItems] = useState<ItemType[]>([]);
  const [positivesCaught, setPositivesCaught] = useState(0);
  const [lastCaughtItem, setLastCaughtItem] = useState<ItemType | null>(null);
  const targetScore = 30;
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  // Spawn falling items periodically
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (!isGameOver) {
        const isPositive = Math.random() > 0.4;
        const itemArray = isPositive ? POSITIVE_ITEMS : NEGATIVE_ITEMS;
        const itemTemplate =
          itemArray[Math.floor(Math.random() * itemArray.length)];

        const newItem: ItemType = {
          id: Math.random().toString(),
          type: isPositive ? "positive" : "negative",
          icon: itemTemplate.icon,
          value: itemTemplate.value,
          x: Math.random() * (GAME_WIDTH - 40) + 20,
          y: -30,
          // speed: Math.random() * 2 + 1,
          speed: Math.random() * 1.5 + 0.5,
          description: itemTemplate.description,
          impact: itemTemplate.impact,
        };

        setItems((prev) => [...prev, newItem]);
      }
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, [isGameOver]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameOver(true);
      const stats = {
        score,
        timeSpent: TIME_LIMIT,
        specialAchievements: [
          positivesCaught >= 20 ? "Family Guardian" : null,
          score >= targetScore + 50 ? "Value Champion" : null,
        ].filter(Boolean),
      };
      onComplete(stats, true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, score, positivesCaught, onComplete]);

  // Check for win condition
  useEffect(() => {
    if (score >= targetScore) {
      const stats = {
        score,
        timeSpent: TIME_LIMIT - timeLeft,
        specialAchievements: [
          positivesCaught >= 20 ? "Family Guardian" : null,
          score >= targetScore + 50 ? "Value Champion" : null,
        ].filter(Boolean),
      };
      onComplete(stats, false);
    }
  }, [score, timeLeft, positivesCaught, onComplete]);

  // Game loop: update falling items and check for collision with basket
  useEffect(() => {
    if (isGameOver) return;

    const gameLoop = () => {
      setItems((prevItems) => {
        return prevItems
          .map((item) => {
            const newSpeed = Math.min(item.speed + GRAVITY, MAX_SPEED);
            const newY = item.y + newSpeed;

            // Check collision with basket
            if (newY > GAME_HEIGHT - BASKET_HEIGHT - 20 && newY < GAME_HEIGHT) {
              const basketLeft = basketPosition - BASKET_WIDTH / 2;
              const basketRight = basketPosition + BASKET_WIDTH / 2;

              if (item.x > basketLeft && item.x < basketRight) {
                setScore((prev) => prev + item.value);
                if (item.type === "positive") {
                  setPositivesCaught((prev) => prev + 1);
                }
                setLastCaughtItem(item);
                return { ...item, y: GAME_HEIGHT + 100 }; // Remove item from view
              }
            }

            return { ...item, y: newY, speed: newSpeed };
          })
          .filter((item) => item.y < GAME_HEIGHT + 50);
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [basketPosition, isGameOver]);

  // Handlers for moving the basket with mouse or touch
  const handleMouseMove = (e: React.MouseEvent) => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setBasketPosition(
        Math.max(BASKET_WIDTH / 2, Math.min(x, GAME_WIDTH - BASKET_WIDTH / 2))
      );
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      setBasketPosition(
        Math.max(BASKET_WIDTH / 2, Math.min(x, GAME_WIDTH - BASKET_WIDTH / 2))
      );
    }
  };

  // Function to end the level early (via the End Level button)
  const handleEndLevel = () => {
    if (isGameOver) return;
    setIsGameOver(true);
    const stats = {
      score,
      timeSpent: TIME_LIMIT - timeLeft,
      specialAchievements: [
        positivesCaught >= 20 ? "Family Guardian" : null,
        score >= targetScore + 50 ? "Value Champion" : null,
      ].filter(Boolean),
    };
    // Call onComplete to mark level completion early
    onComplete(stats, false);
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(TIME_LIMIT);
    setIsGameOver(false);
    setItems([]);
    setPositivesCaught(0);
    setLastCaughtItem(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-teal-50 p-4 flex flex-col"
    
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center gap-4 mb-6">
        <div className="flex gap-4  justify-around items-center">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            ← Back to Map
          </button>
          {/* New End Level Button */}
          <button
            onClick={handleEndLevel}
            className="px-4 py-2 bg-red-200 rounded-lg shadow hover:bg-red-300 transition-colors"
          >
            End Level
          </button>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Timer className="w-5 h-5 text-teal-600" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Heart className="w-5 h-5 text-teal-600" />
              <span>
                {score}/{targetScore}
              </span>
            </div>
            {/* <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Users className="w-5 h-5 text-teal-600" />
              <span>Caught: {positivesCaught}</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Centered Game Area */}
      <div className="flex-grow flex items-center justify-center">
        <div
          ref={gameAreaRef}
          className="relative bg-white rounded-xl shadow-lg overflow-hidden"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Falling Items */}
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                className={`absolute text-3xl transform -translate-x-1/2 -translate-y-1/2 ${
                  item.type === "positive" ? "drop-shadow-lg" : "opacity-90"
                }`}
                style={{ left: item.x, top: item.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <img
                  src={item.icon}
                  alt="icon"
                  className="w-16 h-16 sm:w-18 sm:h-18 object-contain rounded-full"
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Impact Message */}
          <AnimatePresence>
            {lastCaughtItem && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`absolute top-4 left-1/3 transform -translate-x-1/2 px-6 py-2 rounded-lg text-white text-sm ${
                  lastCaughtItem.type === "positive"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                <p className="font-semibold">{lastCaughtItem.description}</p>
                <p className="text-xs">{lastCaughtItem.impact}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Basket */}
          <motion.div
            className="absolute bottom-5 bg-teal-100 rounded-lg flex items-center justify-center shadow-md"
            style={{
              width: BASKET_WIDTH,
              height: BASKET_HEIGHT,
              left: basketPosition,
              x: `-50%`,
            }}
            animate={{ x: `-50%` }}
          >
            🧺
          </motion.div>
        </div>
      </div>

      {/* Game Over Modal */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
          >
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-center mb-4">
                {score >= targetScore
                  ? "🎉 Level Complete!"
                  : "You're on the right path! Reflect, learn, and try again!"}
              </h2>
              <div className="space-y-4 mb-6">
                <p className="text-center">Final Score: {score}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-2 bg-teal-50 rounded-lg">
                    <div className="text-sm text-gray-600">Positive Values</div>
                    <div className="text-xl font-bold text-teal-600">
                      {positivesCaught/2}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Target Score</div>
                    <div className="text-xl font-bold text-blue-600">
                      {targetScore}
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg">
                  <p className="text-sm text-gray-800 italic">
                    "Great nations can only be built on the foundation of family
                    values. Man-making or character building should start at the
                    family stage."
                  </p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={restartGame}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-lg hover:bg-teal-200 transition-colors"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Try Again
                </button>
                <button
                  onClick={onBack}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back to Map
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


