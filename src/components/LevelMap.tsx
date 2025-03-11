import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GameLevel } from "../App";
import {
  ChefHat,
  Users,
  Leaf,
  Target,
  Award,
  Sparkles,
  X,
  LogOut,
} from "lucide-react";
import Logo from "./logo";

interface LevelMapProps {
  levels: GameLevel[];
  completedLevels: number[];
  currentLevel: number;
  onLevelSelect: (levelId: number) => void;
  onNewUser: () => void;
}

const LEVEL_INSTRUCTIONS = [
  {
    title: "Samajik Samarasata",
    description: "Sort social do's and don'ts to maintain community harmony.",
    tips: [
      "Select 'Do' for positive actions",
      "Select 'Don't' for negative actions",
      "Build harmony streaks",
    ],
    icon: "🤝",
  },
  {
    title: "Kutumb Prabodhan",
    description:
      "Catch positive family values while avoiding negative influences.",
    tips: [
      "Swipe left and right to move",
      "Catch positive items",
      "Avoid negative ones",
    ],
    icon: "👨‍👩‍👧‍👦",
  },
  {
    title: "Paryavaran ",
    description: "Quickly tap eco-friendly choices to protect the environment.",
    tips: ["Tap green choices", "Avoid harmful items", "Build combo streaks"],
    icon: "🌱",
  },
  {
    title: "Swa",
    description:
      "Test your knowledge of Indian culture! Answer questions by selecting the correct state on the map. The more you get right, the higher you score!",
    tips: [
      "Read the question carefully",
      "Tap the correct state on the map",
      "Earn points for correct answers",
    ],
    icon: "📍",
  },
  {
    title: "Nagarik Kartavya",
    description:
      "Strengthen your civic awareness! Swipe right for correct civic rights and left for incorrect statements.",
    tips: [
      "Read each statement carefully",
      "Swipe right if it's a valid civic right",
      "Swipe left if it's incorrect",
      "Build a streak to boost your score",
    ],
    icon: "⚖️",
  },
];

export default function LevelMap({
  levels,
  completedLevels,
  currentLevel,
  onLevelSelect,
  onNewUser,
}: LevelMapProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const getPathPoints = () => {
    const baseWidth = 800;
    const baseHeight = 400;
    const scale = Math.min(window.innerWidth / baseWidth, 1);

    // More natural horizontal path points
    return [
      { x: 80 * scale, y: 200 * scale }, // Start left
      { x: 240 * scale, y: 140 * scale }, // Up
      { x: 400 * scale, y: 260 * scale }, // Down
      { x: 560 * scale, y: 140 * scale }, // Up
      { x: 720 * scale, y: 200 * scale }, // End right
    ];
  };

  const createPath = () => {
    const points = getPathPoints();
    let path = `M ${points[0].x},${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];

      if (i < points.length - 1) {
        // More pronounced curves for a natural flow
        const cp1x = prev.x + (curr.x - prev.x) * 0.6;
        const cp1y = prev.y + (curr.y - prev.y) * 0.1;
        const cp2x = curr.x - (next.x - curr.x) * 0.6;
        const cp2y = curr.y - (next.y - curr.y) * 0.1;

        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
      } else {
        const cp1x = prev.x + (curr.x - prev.x) * 0.6;
        const cp1y = prev.y + (curr.y - prev.y) * 0.1;
        path += ` Q ${cp1x},${cp1y} ${curr.x},${curr.y}`;
      }
    }

    return path;
  };

  const handleLevelClick = (levelId: number, isUnlocked: boolean) => {
    if (isUnlocked) {
      setSelectedLevel(levelId);
    }
  };

  const handleStartLevel = () => {
    if (selectedLevel !== null) {
      onLevelSelect(selectedLevel);
      setSelectedLevel(null);
    }
  };

  const levelThemes = [
    {
      gradient: "from-orange-500 to-red-500",
      bgLight: "from-orange-100 to-red-100",
      pathColor: "#f97316",
    },
    {
      gradient: "from-teal-500 to-cyan-500",
      bgLight: "from-teal-100 to-cyan-100",
      pathColor: "#14b8a6",
    },
    {
      gradient: "from-green-500 to-emerald-500",
      bgLight: "from-green-100 to-emerald-100",
      pathColor: "#10b981",
    },
    {
      gradient: "from-blue-500 to-indigo-500",
      bgLight: "from-blue-100 to-indigo-100",
      pathColor: "#6366f1",
    },
    {
      gradient: "from-purple-500 to-pink-500",
      bgLight: "from-purple-100 to-pink-100",
      pathColor: "#d946ef",
    },
  ];

  const getLevelIcon = (index: number) => {
    const icons = [ChefHat, Users, Leaf, Target, Award];
    const Icon = icons[index];
    return <Icon className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Add New User Button */}
      <div className="absolute top-4 right-4 z-50">
        <motion.button
          onClick={onNewUser}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg
                     hover:bg-white transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut className="w-5 h-5 text-purple-600" />
          <span className="text-purple-600 font-medium">New User</span>
        </motion.button>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 ">
        <div
          className="min-h-screen relative overflow-hidden "
          style={{
            backgroundImage: "url('/images/background/civic_duties.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "multiply",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/80 via-orange-950/70 to-yellow-900/80" />
      <div className="absolute top-4 left-4 z-50">
        <Logo /> {/* Replace with your actual component */}
      </div>
      {/* Instructions Modal */}
      <AnimatePresence>
        {selectedLevel !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedLevel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedLevel(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <span className="text-4xl mb-4 block">
                  {LEVEL_INSTRUCTIONS[selectedLevel - 1].icon}
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {LEVEL_INSTRUCTIONS[selectedLevel - 1].title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {LEVEL_INSTRUCTIONS[selectedLevel - 1].description}
                </p>
              </div>

              <div className="bg-indigo-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-indigo-900 mb-2">Tips:</h4>
                <ul className="space-y-2">
                  {LEVEL_INSTRUCTIONS[selectedLevel - 1].tips.map(
                    (tip, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-indigo-700"
                      >
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                        {tip}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <button
                onClick={handleStartLevel}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl
                         font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors"
              >
                Start Level {selectedLevel}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative p-4">
        <motion.h2
          className="text-3xl font-bold text-center text-white mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-300">
            Panch Parivartan Journey
          </span>
        </motion.h2>

        <div className="max-w-4xl mx-auto relative min-h-[400px]">
          {/* Path Layer (Behind) */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full">
              <defs>
                <linearGradient
                  id="pathGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  {levelThemes.map((theme, index) => (
                    <stop
                      key={index}
                      offset={`${index * 25}%`}
                      stopColor={theme.pathColor}
                      stopOpacity="0.3"
                    />
                  ))}
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base Path */}
              <path
                d={createPath()}
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="40"
                strokeLinecap="round"
                className="opacity-10"
              />

              {/* Glowing Path */}
              <motion.path
                d={createPath()}
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Level Icons Layer */}
          <div className="relative z-10">
            {levels.map((level, index) => {
              const points = getPathPoints();
              const point = points[index];
              const isCompleted = completedLevels.includes(level.id);
              const isUnlocked =
                level.id <= Math.max(...completedLevels, 0) + 1;
              const isCurrent = currentLevel === level.id;
              const theme = levelThemes[index];

              return (
                <motion.div
                  key={level.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: point.x, top: point.y }}
                >
                  <motion.button
                    onClick={() => handleLevelClick(level.id, isUnlocked)}
                    className={`relative group ${
                      !isUnlocked ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    whileHover={isUnlocked ? { scale: 1.1 } : {}}
                    whileTap={isUnlocked ? { scale: 0.95 } : {}}
                  >
                    {/* Background Glow */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${
                        theme.gradient
                      } blur-xl opacity-50
                        ${isCurrent ? "animate-pulse" : ""}`}
                      initial={false}
                      animate={
                        isCurrent ? { scale: [1, 1.2, 1] } : { scale: 1 }
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Main Icon Container */}
                    <div
                      className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${theme.gradient}
                      flex items-center justify-center shadow-lg border border-white/20
                      backdrop-blur-sm`}
                    >
                      <div className="text-white">{getLevelIcon(index)}</div>

                      {/* Level Number */}
                      <div
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-lg
                        flex items-center justify-center text-sm font-bold text-gray-800
                        border-2 border-purple-200"
                      >
                        {level.id}
                      </div>

                      {/* Completion Star */}
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -left-2 text-xl"
                        >
                          ⭐
                        </motion.div>
                      )}
                    </div>

                    {/* Level Title */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32">
                      <motion.div
                        className={`text-sm font-bold text-white bg-gradient-to-r ${theme.gradient}
                          rounded-full px-3 py-1 shadow-lg text-center backdrop-blur-sm
                          border border-white/20`}
                        whileHover={{ y: -2 }}
                      >
                        {level.title}
                      </motion.div>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
