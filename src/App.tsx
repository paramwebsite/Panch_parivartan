// import React, { useState, useEffect } from 'react';
// import { MapPin, ChefHat, Users, Leaf, Target, Award } from 'lucide-react';
// import WelcomeScreen from './components/WelcomeScreen';
// import LevelMap from './components/LevelMap';
// import LevelOne from './components/levels/LevelOne';
// import LevelTwo from './components/levels/LevelTwo';
// import LevelThree from './components/levels/LevelThree';
// import LevelFour from './components/levels/LevelFour';
// import LevelFive from './components/levels/LevelFive';
// import Countdown from './components/Countdown';
// import PerformancePage from './components/PerformancePage';

// export type GameLevel = {
//   id: number;
//   title: string;
//   icon: React.ReactNode;
//   description: string;
//   color: string;
// };

// const LEVELS: GameLevel[] = [
//   {
//     id: 1,
//     title: "Samajik Samarasata",
//     icon: <Award size={24} />,
//     description: "Sort social do's and don'ts",
//     color: "#FFF0F5" // Lavender Blush
//   },
//   {
//     id: 2,
//     title: "Kutumb Prabodhan",
//     icon: <Users size={24} />,
//     description: "Catch positive family values",
//     color: "#E6E6FA" // Lavender
//   },
//   {
//     id: 3,
//     title: "Paryavaran",
//     icon: <Leaf size={24} />,
//     description: "Tap eco-friendly choices quickly",
//     color: "#F0FFF0" // Honeydew
//   },
//   {
//     id: 4,
//     title: "Swa",
//     icon: <ChefHat size={24} />,
//     description: "Match local dishes to transform foreign cuisines",
//     color: "#FFE4E1" // Misty Rose
//   },
 
  
//   {
//     id: 5,
//     title: "Nagarik Kartavya",
//     icon: <Target size={24} />,
//     description: "Eliminate non-civic obstacles",
//     color: "#F0F8FF" // Alice Blue
//   },
 
// ];

// export default function App() {
//   const [gameState, setGameState] = useState<'welcome' | 'map' | 'playing' | 'performance'>('welcome');
//   const [currentLevel, setCurrentLevel] = useState(1);
//   const [completedLevels, setCompletedLevels] = useState<number[]>([]);
//   const [isCountingDown, setIsCountingDown] = useState(false);
//   const [levelStats, setLevelStats] = useState<any[]>([]);
//   const [autoUnlockNextLevel, setAutoUnlockNextLevel] = useState(false);

//   useEffect(() => {
//     if (autoUnlockNextLevel && gameState === 'map') {
//       const nextLevel = currentLevel + 1;
//       if (nextLevel <= 5) {
//         setCurrentLevel(nextLevel);
//       }
//       setAutoUnlockNextLevel(false);
//     }
//   }, [gameState, currentLevel, autoUnlockNextLevel]);

//   const handleStartGame = () => {
//     setGameState('map');
//   };

//   const handleLevelSelect = (levelId: number) => {
//     if (levelId <= Math.max(...completedLevels, 0) + 1) {
//       setCurrentLevel(levelId);
//       setIsCountingDown(true);
//     }
//   };

//   const handleCountdownComplete = () => {
//     setIsCountingDown(false);
//     setGameState('playing');
//   };

//   // const handleLevelComplete = (levelId: number, stats: any, timeout: boolean = false) => {
//   //   if (!completedLevels.includes(levelId)) {
//   //     setCompletedLevels(prev => [...prev, levelId]);
//   //     setLevelStats(prev => [...prev, { 
//   //       levelId,
//   //       ...stats,
//   //       completionType: timeout ? 'timeout' : 'success'
//   //     }]);
//   //     setAutoUnlockNextLevel(true);
      
//   //     if (levelId === 5) {
//   //       setTimeout(() => {
//   //         setGameState('performance');
//   //       }, 3000);
//   //     } else {
//   //       setTimeout(() => {
//   //         setGameState('map');
//   //       }, 3000);
//   //     }
//   //   }
//   // };


//   const handleLevelComplete = (levelId: number, stats: any, timeout: boolean = false) => {
//     if (!completedLevels.includes(levelId)) {
//       setCompletedLevels(prev => [...prev, levelId]);
//       setLevelStats(prev => [...prev, { 
//         levelId,
//         ...stats,
//         completionType: timeout ? 'timeout' : 'success'
//       }]);
//       setAutoUnlockNextLevel(true);
      
//       // Check if the level completed is Level Five
//       if (levelId === 5) {
//         setTimeout(() => {
//           setGameState('performance'); // Transition to performance page
//         }, 3000);
//       } else {
//         setTimeout(() => {
//           setGameState('map'); // Transition back to map for other levels
//         }, 3000);
//       }
//     }
//   };
//   const handleBackToMap = () => {
//     // handleNewUser ();
//     setGameState('map');
    
//   };

//   const handleEndGame = () => {
//     setGameState('welcome');
//     setCurrentLevel(1);
//   };

//   const handleNewUser = () => {
//     setGameState('welcome');
//     setCompletedLevels([]);
//     setCurrentLevel(1);
//     setLevelStats([]);
//   };

//   const renderLevel = () => {
//     const commonProps = {
//       onComplete: (stats: any, timeout: boolean) => handleLevelComplete(currentLevel, stats, timeout),
//       onBack: handleBackToMap,
//       onEndGame: handleEndGame
//     };

//     switch (currentLevel) {
//       case 1:
//         return <LevelOne {...commonProps} />;
//       case 2:
//         return <LevelTwo {...commonProps} />;
//       case 3:
//         return <LevelThree {...commonProps} />;
//       case 4:
//         return <LevelFour {...commonProps} />;
//       case 5:
//         return <LevelFive {...commonProps} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
//       {gameState === 'welcome' && (
//         <WelcomeScreen onStart={handleStartGame} />
//       )}
      
//       {gameState === 'map' && (
//         <LevelMap
//           levels={LEVELS}
//           completedLevels={completedLevels}
//           currentLevel={currentLevel}
//           onLevelSelect={handleLevelSelect}
//           onNewUser={handleNewUser}
//         />
//       )}

//       {isCountingDown && (
//         <Countdown onComplete={handleCountdownComplete} />
//       )}

//       {gameState === 'playing' && renderLevel()}

//       {gameState === 'performance' && (
//         <PerformancePage
//           levelStats={levelStats}
//           onBackToMap={handleBackToMap}
//         />
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { MapPin, ChefHat, Users, Leaf, Target, Award } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import LevelMap from './components/LevelMap';
import LevelOne from './components/levels/LevelOne';
import LevelTwo from './components/levels/LevelTwo';
import LevelThree from './components/levels/LevelThree';
import LevelFour from './components/levels/LevelFour';
import LevelFive from './components/levels/LevelFive';
import Countdown from './components/Countdown';
import PerformancePage from './components/PerformancePage';

export type GameLevel = {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
};

const LEVELS: GameLevel[] = [
  {
    id: 1,
    title: "Samajik Samarasata",
    icon: <Award size={24} />,
    description: "Sort social do's and don'ts",
    color: "#FFF0F5" // Lavender Blush
  },
  {
    id: 2,
    title: "Kutumb Prabodhan",
    icon: <Users size={24} />,
    description: "Catch positive family values",
    color: "#E6E6FA" // Lavender
  },
  {
    id: 3,
    title: "Paryavaran",
    icon: <Leaf size={24} />,
    description: "Tap eco-friendly choices quickly",
    color: "#F0FFF0" // Honeydew
  },
  {
    id: 4,
    title: "Swa",
    icon: <ChefHat size={24} />,
    description: "Match local dishes to transform foreign cuisines",
    color: "#FFE4E1" // Misty Rose
  },
  {
    id: 5,
    title: "Nagarik Kartavya",
    icon: <Target size={24} />,
    description: "Eliminate non-civic obstacles",
    color: "#F0F8FF" // Alice Blue
  },
];

export default function App() {
  const [gameState, setGameState] = useState<'welcome' | 'map' | 'playing' | 'performance'>('welcome');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [levelStats, setLevelStats] = useState<any[]>([]);
  const [autoUnlockNextLevel, setAutoUnlockNextLevel] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (autoUnlockNextLevel && gameState === 'map') {
      const nextLevel = currentLevel + 1;
      if (nextLevel <= 5) {
        setCurrentLevel(nextLevel);
      }
      setAutoUnlockNextLevel(false);
    }
  }, [gameState, currentLevel, autoUnlockNextLevel]);

  const handleStartGame = () => {
    setGameState('map');
  };

  const handleLevelSelect = (levelId: number) => {
    if (levelId <= Math.max(...completedLevels, 0) + 1) {
      setCurrentLevel(levelId);
      setIsCountingDown(true);
    }
  };

  const handleCountdownComplete = () => {
    setIsCountingDown(false);
    setGameState('playing');
  };

  const handleLevelComplete = (levelId: number, stats: any, timeout: boolean = false) => {
    if (levelId === 5) {
      if (completedLevels.includes(levelId)) {
        // Replay scenario for level five:
        // Show a dialog box and return to the start screen after 3 seconds.
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          setGameState('welcome');
        }, 3000);
        return;
      } else {
        // First-time completion for level five:
        setCompletedLevels(prev => [...prev, levelId]);
        setLevelStats(prev => [
          ...prev,
          { 
            levelId,
            ...stats,
            completionType: timeout ? 'timeout' : 'success'
          }
        ]);
        setTimeout(() => {
          setGameState('performance'); // Show performance page.
        }, 3000);
        return;
      }
    } else {
      // For levels other than five:
      if (!completedLevels.includes(levelId)) {
        setCompletedLevels(prev => [...prev, levelId]);
        setLevelStats(prev => [
          ...prev,
          { 
            levelId,
            ...stats,
            completionType: timeout ? 'timeout' : 'success'
          }
        ]);
        setAutoUnlockNextLevel(true);
        setTimeout(() => {
          setGameState('map'); // Return to map screen.
        }, 3000);
      }
    }
  };

  const handleBackToMap = () => {
    setGameState('map');
  };

  const handleEndGame = () => {
    setGameState('welcome');
    setCurrentLevel(1);
  };

  const handleNewUser = () => {
    setGameState('welcome');
    setCompletedLevels([]);
    setCurrentLevel(1);
    setLevelStats([]);
  };

  const renderLevel = () => {
    const commonProps = {
      onComplete: (stats: any, timeout: boolean) => handleLevelComplete(currentLevel, stats, timeout),
      onBack: handleBackToMap,
      onEndGame: handleEndGame
    };

    switch (currentLevel) {
      case 1:
        return <LevelOne {...commonProps} />;
      case 2:
        return <LevelTwo {...commonProps} />;
      case 3:
        return <LevelThree {...commonProps} />;
      case 4:
        return <LevelFour {...commonProps} />;
      case 5:
        return <LevelFive {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      {gameState === 'welcome' && (
        <WelcomeScreen onStart={handleStartGame} />
      )}
      
      {gameState === 'map' && (
        <LevelMap
          levels={LEVELS}
          completedLevels={completedLevels}
          currentLevel={currentLevel}
          onLevelSelect={handleLevelSelect}
          onNewUser={handleNewUser}
        />
      )}

      {isCountingDown && (
        <Countdown onComplete={handleCountdownComplete} />
      )}

      {gameState === 'playing' && renderLevel()}

      {gameState === 'performance' && (
        <PerformancePage
          levelStats={levelStats}
          onBackToMap={handleBackToMap}
        />
      )}

      {/* Dialog overlay for replaying level five */}
      {showDialog && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-50 rounded-xl p-8 max-w-md w-full text-center">
        <p className="text-lg font-semibold mb-4">
          All levels completed. Returning to start screen...
        </p>
      </div>
    </div>
    
      )}
    </div>
  );
}
