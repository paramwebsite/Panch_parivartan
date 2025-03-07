import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowLeft, Star, Medal, Trophy, Target } from 'lucide-react';

interface PerformancePageProps {
  levelStats: {
    levelId: number;
    score: number;
    timeSpent: number;
    specialAchievements?: string[];
  }[];
  onBackToMap: () => void;
}

const LEVEL_BADGES = [
  {
    title: "Culinary Master",
    icon: "🍱",
    color: "from-orange-400 to-red-400",
    description: "Mastered the art of local cuisine transformation"
  },
  {
    title: "Family Guardian",
    icon: "👨‍👩‍👧‍👦",
    color: "from-teal-400 to-cyan-400",
    description: "Protected and nurtured family values"
  },
  {
    title: "Eco Warrior",
    icon: "🌱",
    color: "from-green-400 to-emerald-400",
    description: "Champion of environmental consciousness"
  },
  {
    title: "Civic Champion",
    icon: "⚖️",
    color: "from-blue-400 to-indigo-400",
    description: "Upholder of civic duties and responsibilities"
  },
  {
    title: "Harmony Keeper",
    icon: "🕊️",
    color: "from-purple-400 to-pink-400",
    description: "Maintainer of social harmony and unity"
  }
];

export default function PerformancePage({ levelStats, onBackToMap }: PerformancePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={onBackToMap}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Map
          </button>
          <h1 className="text-3xl font-bold text-indigo-900">Journey Performance</h1>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {LEVEL_BADGES.map((badge, index) => {
            const levelStat = levelStats[index];
            const isUnlocked = levelStat && levelStat.score > 0;
            
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-xl overflow-hidden ${
                  isUnlocked ? 'bg-white' : 'bg-gray-100'
                } shadow-lg`}
              >
                <div className={`h-24 bg-gradient-to-r ${badge.color} flex items-center justify-center`}>
                  <span className="text-4xl filter drop-shadow-lg">{badge.icon}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{badge.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                  {isUnlocked && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm">Score: {levelStat.score}</span>
                      </div>
                      {levelStat.specialAchievements?.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                    <Medal className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Overall Progress */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-6 text-center"
        >
          <div className="flex justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Journey Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-indigo-600">
                {levelStats.filter(stat => stat.score > 0).length}/5
              </div>
              <div className="text-sm text-gray-600">Levels Completed</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">
                {levelStats.reduce((acc, stat) => acc + (stat.specialAchievements?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Achievements Earned</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-pink-600">
                {levelStats.reduce((acc, stat) => acc + stat.score, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Score</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}