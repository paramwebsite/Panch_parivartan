// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
// import { Timer, RefreshCcw, Check, X, Award } from 'lucide-react';

// interface LevelFourProps {
//   onComplete: (stats: any, timeout: boolean) => void;
//   onBack: () => void;
// }

// type CivicAction = {
//   id: string;
//   text: string;
//   type: 'positive' | 'negative';
//   icon: string;
//   difficulty?: 'easy' | 'medium' | 'hard';
// };

// const CIVIC_ACTIONS: CivicAction[] = [
//   // Positive Actions
//   { id: 'vote', text: 'Participating in Elections', type: 'positive', icon: '🗳️', difficulty: 'easy' },
//   { id: 'clean', text: 'Cleaning Public Spaces', type: 'positive', icon: '🧹', difficulty: 'easy' },
//   { id: 'help', text: 'Helping the Elderly', type: 'positive', icon: '👵', difficulty: 'easy' },
//   { id: 'recycle', text: 'Recycling Waste', type: 'positive', icon: '♻️', difficulty: 'easy' },
//   { id: 'report', text: 'Reporting Crime', type: 'positive', icon: '🚔', difficulty: 'medium' },
//   { id: 'volunteer', text: 'Community Service', type: 'positive', icon: '🤝', difficulty: 'medium' },
//   { id: 'donate', text: 'Blood Donation', type: 'positive', icon: '🩸', difficulty: 'medium' },
  
//   // Negative Actions
//   { id: 'litter', text: 'Littering on Streets', type: 'negative', icon: '🗑️', difficulty: 'easy' },
//   { id: 'noise', text: 'Making Loud Noise', type: 'negative', icon: '📢', difficulty: 'easy' },
//   { id: 'jaywalk', text: 'Jaywalking', type: 'negative', icon: '🚶', difficulty: 'easy' },
//   { id: 'vandal', text: 'Vandalizing Property', type: 'negative', icon: '🚫', difficulty: 'easy' },
//   { id: 'skip', text: 'Skipping Queue', type: 'negative', icon: '⏭️', difficulty: 'medium' },
//   { id: 'park', text: 'Illegal Parking', type: 'negative', icon: '🚗', difficulty: 'medium' },
  
//   // Gray Area (Medium/Hard Difficulty)
//   { id: 'protest', text: 'Peaceful Protest', type: 'positive', icon: '✊', difficulty: 'hard' },
//   { id: 'graffiti', text: 'Street Art', type: 'negative', icon: '🎨', difficulty: 'hard' },
//   { id: 'feed', text: 'Feeding Stray Animals', type: 'positive', icon: '🐕', difficulty: 'hard' }
// ];

// const TIME_LIMIT = 5;
// const SWIPE_THRESHOLD = 100;

// export default function LevelFour({ onComplete, onBack }: LevelFourProps) {
//   const [score, setScore] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
//   const [isGameOver, setIsGameOver] = useState(false);
//   const [currentAction, setCurrentAction] = useState<CivicAction | null>(null);
//   const [combo, setCombo] = useState(0);
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [showFeedback, setShowFeedback] = useState<{
//     correct: boolean;
//     message: string;
//   } | null>(null);
//   const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
//   const [spawnSpeed, setSpawnSpeed] = useState(2000);

//   const x = useMotionValue(0);
//   const background = useTransform(
//     x,
//     [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
//     ['rgb(239, 68, 68)', 'rgb(255, 255, 255)', 'rgb(34, 197, 94)']
//   );

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       setIsGameOver(true);
//       const accuracy = (correctAnswers / (correctAnswers + (combo > 0 ? combo - 1 : 0))) * 100;
//       const rating = accuracy >= 90 ? '⭐⭐⭐' : accuracy >= 75 ? '⭐⭐' : '⭐';
      
//       const stats = {
//         score,
//         timeSpent: TIME_LIMIT,
//         correctAnswers,
//         combo,
//         rating,
//         specialAchievements: [
//           combo >= 5 ? "Civic Streak Master" : null,
//           correctAnswers >= 20 ? "Dutiful Citizen" : null,
//           score >= 200 ? "Civic Champion" : null
//         ].filter(Boolean)
//       };
//       onComplete(stats, true);
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, score, correctAnswers, combo, onComplete]);

//   useEffect(() => {
//     if (!currentAction && !isGameOver) {
//       // Immediate first spawn
//       if (!currentAction) {
//         const filteredActions = CIVIC_ACTIONS.filter(action => action.difficulty === difficulty);
//         const newAction = filteredActions[Math.floor(Math.random() * filteredActions.length)];
//         setCurrentAction(newAction);
//       }

//       // Set up next spawn
//       const timer = setTimeout(() => {
//         const filteredActions = CIVIC_ACTIONS.filter(action => action.difficulty === difficulty);
//         const newAction = filteredActions[Math.floor(Math.random() * filteredActions.length)];
//         setCurrentAction(newAction);
//       }, Math.max(800, spawnSpeed - (TIME_LIMIT - timeLeft) * 15)); // Gradually decrease spawn time

//       return () => clearTimeout(timer);
//     }
//   }, [currentAction, isGameOver, difficulty, spawnSpeed, timeLeft]);

//   useEffect(() => {
//     if (timeLeft <= 40) setDifficulty('medium');
//     if (timeLeft <= 20) setDifficulty('hard');
//     setSpawnSpeed(Math.max(800, 2000 - (TIME_LIMIT - timeLeft) * 25)); // More aggressive speed increase
//   }, [timeLeft]);

//   const handleDragEnd = (event: any, info: any) => {
//     const swipe = info.offset.x;
//     const isCorrect = 
//       (swipe > SWIPE_THRESHOLD && currentAction?.type === 'positive') ||
//       (swipe < -SWIPE_THRESHOLD && currentAction?.type === 'negative');

//     if (Math.abs(swipe) > SWIPE_THRESHOLD && currentAction) {
//       // Calculate points
//       let points = 10;
//       if (currentAction.difficulty === 'medium') points = 15;
//       if (currentAction.difficulty === 'hard') points = 20;

//       if (isCorrect) {
//         setCombo(prev => prev + 1);
//         setCorrectAnswers(prev => prev + 1);
//         if (combo >= 4) points += 20; // Combo bonus
//         setScore(prev => prev + points);
//         setShowFeedback({ correct: true, message: 'Correct! +' + points });
//       } else {
//         setCombo(0);
//         setScore(prev => Math.max(0, prev - 5));
//         setShowFeedback({ correct: false, message: 'Wrong! -5' });
//       }

//       // Play sound effect
//       const audio = new Audio(isCorrect ? '/correct.mp3' : '/wrong.mp3');
//       audio.play().catch(() => {}); // Ignore errors if sound can't play

//       setTimeout(() => {
//         setCurrentAction(null);
//         setShowFeedback(null);
//       }, 500);
//     } else {
//       x.set(0); // Reset position if not swiped far enough
//     }
//   };

//   const restartGame = () => {
//     setScore(0);
//     setTimeLeft(TIME_LIMIT);
//     setIsGameOver(false);
//     setCurrentAction(null);
//     setCombo(0);
//     setCorrectAnswers(0);
//     setDifficulty('easy');
//     setSpawnSpeed(2000);
//   };

//   return (
//     <div className="min-h-screen bg-indigo-50 p-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={onBack}
//             className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
//           >
//             ← Back to Map
//           </button>
//           <div className="flex gap-4 items-center">
//             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
//               <Timer className="w-5 h-5 text-indigo-600" />
//               <span className="font-mono">{timeLeft}s</span>
//             </div>
//             <div className="bg-white px-4 py-2 rounded-lg shadow">
//               Score: {score}
//             </div>
//             <div className="bg-white px-4 py-2 rounded-lg shadow">
//               Combo: {combo}x
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px] relative">
//           {/* Swipe Instructions */}
//           <div className="absolute top-4 left-4 right-4 flex justify-between text-sm text-gray-500">
//             <div className="flex items-center gap-1">
//               <X className="w-4 h-4 text-red-500" />
//               Swipe Left for Wrong
//             </div>
//             <div className="flex items-center gap-1">
//               Swipe Right for Right
//               <Check className="w-4 h-4 text-green-500" />
//             </div>
//           </div>

//           {/* Main Game Area */}
//           <div className="flex items-center justify-center min-h-[300px] relative">
//             <AnimatePresence mode="wait">
//               {currentAction && (
//                 <motion.div
//                   key={currentAction.id}
//                   drag="x"
//                   dragConstraints={{ left: 0, right: 0 }}
//                   dragElastic={0.8}
//                   onDragEnd={handleDragEnd}
//                   style={{ x, background }}
//                   initial={{ scale: 0, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   exit={{ scale: 0, opacity: 0 }}
//                   className="absolute w-64 h-64 rounded-xl shadow-lg flex flex-col items-center justify-center gap-4 cursor-grab active:cursor-grabbing"
//                 >
//                   <span className="text-6xl">{currentAction.icon}</span>
//                   <p className="text-xl font-semibold text-center px-4">{currentAction.text}</p>
//                   {currentAction.difficulty === 'hard' && (
//                     <span className="absolute top-2 right-2 text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
//                       Complex
//                     </span>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Feedback Animation */}
//             <AnimatePresence>
//               {showFeedback && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   className={`absolute top-4 text-lg font-bold ${
//                     showFeedback.correct ? 'text-green-500' : 'text-red-500'
//                   }`}
//                 >
//                   {showFeedback.message}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Game Over Modal */}
//         <AnimatePresence>
//           {isGameOver && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
//             >
//               <div className="bg-white rounded-xl p-8 max-w-md w-full">
//                 <div className="text-center mb-6">
//                   <Award className="w-16 h-16 mx-auto text-indigo-500 mb-4" />
//                   <h2 className="text-2xl font-bold mb-2">
//                     {score >= 200 ? '🎉 Civic Champion!' : 'Game Over!'}
//                   </h2>
//                   <div className="text-4xl mb-4">
//                     {(correctAnswers / (correctAnswers + (combo > 0 ? combo - 1 : 0))) * 100 >= 90
//                       ? '⭐⭐⭐'
//                       : (correctAnswers / (correctAnswers + (combo > 0 ? combo - 1 : 0))) * 100 >= 75
//                       ? '⭐⭐'
//                       : '⭐'}
//                   </div>
//                 </div>

//                 <div className="space-y-4 mb-6">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="text-center p-2 bg-indigo-50 rounded-lg">
//                       <div className="text-sm text-gray-600">Final Score</div>
//                       <div className="text-xl font-bold text-indigo-600">{score}</div>
//                     </div>
//                     <div className="text-center p-2 bg-purple-50 rounded-lg">
//                       <div className="text-sm text-gray-600">Correct Actions</div>
//                       <div className="text-xl font-bold text-purple-600">{correctAnswers}</div>
//                     </div>
//                   </div>

//                   <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
//                     <p className="text-sm text-gray-800 italic">
//                       "A nation's culture resides in the hearts and in the soul of its people. Our civic duties shape the future of our society."
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-4 justify-center">
//                   <button
//                     onClick={restartGame}
//                     className="flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
//                   >
//                     <RefreshCcw className="w-5 h-5" />
//                     Try Again
//                   </button>
//                   <button
//                     onClick={onBack}
//                     className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                   >
//                     Back to Map
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

// interface LevelFourProps {
//   onComplete: (stats: any, timeout: boolean) => void;
//   onBack: () => void;
// }

// type CivicAction = {
//   id: string;
//   text: string;
//   type: 'positive' | 'negative';
//   icon: string;
//   difficulty?: 'easy' | 'medium' | 'hard';
// };

// const CIVIC_ACTIONS: CivicAction[] = [
//   // Positive Actions
//   { id: 'respect', text: 'Stand when the national anthem is played', type: 'positive', icon: '/images/level5/positive/Stand_when_the_national_anthem_is_played.png', difficulty: 'easy' },
//   { id: 'queue', text: 'Let elders stand ahead in the queue', type: 'positive', icon: '/images/level5/positive/Let_elders_stand_ahead_in_the_queue.png', difficulty: 'easy' },
//   { id: 'headphones', text: 'Use headphones in public spaces', type: 'positive', icon: '/images/level5/positive/Use_headphones_in_public_spaces.png', difficulty: 'easy' },
//   { id: 'Flush', text: 'Flush after using a public toilet', type: 'positive', icon: '/images/level5/positive/Flush_after_using_a_public_toilet.png', difficulty: 'easy' },
//   { id: 'Vote', text: 'Vote without fail', type: 'positive', icon: '/images/level5/positive/Vote_without_fail.png', difficulty: 'medium' },
//   { id: 'streetlights', text: 'Inform authorities when streetlights are on during the day', type: 'positive', icon: '/images/level5/positive/Inform_authorities_when_streetlights_are_on_during_the_day.png', difficulty: 'medium' },
//   { id: 'graciously', text: 'Speak graciously in public', type: 'positive', icon: '/images/level5/positive/Speak_graciously_in_public.png', difficulty: 'medium' },
//   { id: 'national', text: 'Be aware of national symbols and respect them', type: 'positive', icon: '/images/level5/positive/Be_aware_of_national_symbols_and_respect_them.png', difficulty: 'medium' },
//   { id: 'signals', text: 'Follow traffic signals', type: 'positive', icon: '/images/level5/positive/Follow_traffic_signals.png', difficulty: 'medium' },
//   { id: 'cleanliness', text: 'Maintain cleanliness in public places', type: 'positive', icon: '/images/level5/positive/Maintain_cleanliness_in_public_places.png', difficulty: 'medium' },
//   { id: 'needy', text: 'Help the needy', type: 'positive', icon: '/images/level5/positive/Help_the_needy.png', difficulty: 'medium' },
//   { id: 'ambulances', text: 'Give way to ambulances', type: 'positive', icon: '/images/level5/positive/Give_way_to_ambulances.png', difficulty: 'medium' },
//   { id: 'taxes', text: 'Pay taxes regularly', type: 'positive', icon: '/images/level5/positive/Pay_taxes_regularly.png', difficulty: 'medium' },
//   { id: 'victims', text: 'Help victims of road accidents', type: 'positive', icon: '/images/level5/positive/Help_victims_of_road_accidents.png', difficulty: 'medium' },
//   { id: 'water', text: 'Inform the authorities when the public water supply is broken.', type: 'positive', icon: '/images/level5/positive/Inform_the_authorities_when_the_public_water_supply_is_broken.png', difficulty: 'medium' },

//   // Negative Actions
//   { id: 'loud-music', text: 'Play loud music.', type: 'negative', icon: '/images/level5/negative/Play_loud_music.png', difficulty: 'easy' },
//   { id: 'metro-door', text: 'Stand at the door of the metro.', type: 'negative', icon: '/images/level5/negative/Stand_at_the_door_of_the_metro.png', difficulty: 'easy' },
//   { id: 'write-currency', text: 'Write on currency notes.', type: 'negative', icon: '/images/level5/negative/Write_on_currency_notes.png', difficulty: 'easy' },
//   { id: 'inscribe-monument', text: 'Inscribe your name on monuments.', type: 'negative', icon: '/images/level5/negative/Inscribe_your_name_on_monuments.png', difficulty: 'easy' },
//   { id: 'nameplates', text: 'Nameplates on roads are the best place to paste posters.', type: 'negative', icon: '/images/level5/negative/Nameplates_on_roads_are_the_best_place_to_paste_posters.png', difficulty: 'easy' },
//   { id: 'bribe', text: 'Bribe when necessary.', type: 'negative', icon: '/images/level5/negative/Bribe_when_necessary.png', difficulty: 'easy' },
//   { id: 'empty-trash', text: 'Empty the trash from your home onto the roads.', type: 'negative', icon: '/images/level5/negative/Empty_the_trash_from_your_home_onto_the_roads.png', difficulty: 'easy' },
//   { id: 'shop-walkway', text: 'Set up a shop on the walkway.', type: 'negative', icon: '/images/level5/negative/Set_up_a_shop_on_the_walkway.png', difficulty: 'easy' },
//   { id: 'jump-queue', text: 'Jump the queue to reach early.', type: 'negative', icon: '/images/level5/negative/Jump_the_queue_to_reach_early.png', difficulty: 'easy' },
//   { id: 'cellphone-temple', text: 'Entertain yourself with your cellphone in the temple.', type: 'negative', icon: '/images/level5/negative/Entertain_yourself_with_your_cellphone_in_the_temple.png', difficulty: 'easy' },
//   { id: 'personal-calls', text: 'Finish all your personal calls while you’re on public transport.', type: 'negative', icon: '/images/level5/negative/Finish_all_your_personal_calls_while_you_are_on_public_transport.png', difficulty: 'easy' },
//   { id: 'fight-commuters', text: 'Fight with fellow commuters to make your way.', type: 'negative', icon: '/images/level5/negative/Fight_with_fellow_commuters_to_make_your_way.png', difficulty: 'easy' },
//   { id: 'throw-trash', text: 'Always throw out trash outside your vehicle while traveling.', type: 'negative', icon: '/images/level5/negative/Always_throw_out_trash_outside_your_vehicle_while_traveling.png', difficulty: 'easy' },
//   { id: 'smoke-break', text: 'Take a smoke break on the footpath.', type: 'negative', icon: '/images/level5/negative/Take_a_smoke_break_on_the_footpath.png', difficulty: 'easy' }
// ];
// const TIME_LIMIT = 30;
// const SWIPE_THRESHOLD = 100;

// export default function LevelFour({ onComplete, onBack }: LevelFourProps) {
//   const [score, setScore] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
//   const [isGameOver, setIsGameOver] = useState(false);
//   const [currentAction, setCurrentAction] = useState<CivicAction | null>(null);
//   const [combo, setCombo] = useState(0);
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [showFeedback, setShowFeedback] = useState<{
//     correct: boolean;
//     message: string;
//   } | null>(null);
//   const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
//   const [spawnSpeed, setSpawnSpeed] = useState(2000);

//   const x = useMotionValue(0);
//   const background = useTransform(
//     x,
//     [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
//     ['rgb(239, 68, 68)', 'rgb(255, 255, 255)', 'rgb(34, 197, 94)']
//   );

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       setIsGameOver(true);
//       const accuracy = (correctAnswers / (correctAnswers + (combo > 0 ? combo - 1 : 0))) * 100;
//       const rating = accuracy >= 90 ? '⭐⭐⭐' : accuracy >= 75 ? '⭐⭐' : '⭐';
      
//       const stats = {
//         score,
//         timeSpent: TIME_LIMIT,
//         correctAnswers,
//         combo,
//         rating,
//         specialAchievements: [
//           combo >= 5 ? "Civic Streak Master" : null,
//           correctAnswers >= 20 ? "Dutiful Citizen" : null,
//           score >= 200 ? "Civic Champion" : null
//         ].filter(Boolean)
//       };
//       onComplete(stats, true);
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, score, correctAnswers, combo, onComplete]);

//   useEffect(() => {
//     if (!currentAction && !isGameOver) {
//       // Immediate first spawn
//       if (!currentAction) {
//         const filteredActions = CIVIC_ACTIONS.filter(action => action.difficulty === difficulty);
//         const newAction = filteredActions[Math.floor(Math.random() * filteredActions.length)];
//         setCurrentAction(newAction);
//       }

//       // Set up next spawn
//       const timer = setTimeout(() => {
//         const filteredActions = CIVIC_ACTIONS.filter(action => action.difficulty === difficulty);
//         const newAction = filteredActions[Math.floor(Math.random() * filteredActions.length)];
//         setCurrentAction(newAction);
//       }, Math.max(800, spawnSpeed - (TIME_LIMIT - timeLeft) * 15)); // Gradually decrease spawn time

//       return () => clearTimeout(timer);
//     }
//   }, [currentAction, isGameOver, difficulty, spawnSpeed, timeLeft]);

//   useEffect(() => {
//     if (timeLeft <= 40) setDifficulty('medium');
//     if (timeLeft <= 20) setDifficulty('hard');
//     setSpawnSpeed(Math.max(800, 2000 - (TIME_LIMIT - timeLeft) * 25)); // More aggressive speed increase
//   }, [timeLeft]);

//   const handleDragEnd = (event: any, info: any) => {
//     const swipe = info.offset.x;
//     const isCorrect = 
//       (swipe > SWIPE_THRESHOLD && currentAction?.type === 'positive') ||
//       (swipe < -SWIPE_THRESHOLD && currentAction?.type === 'negative');

//     if (Math.abs(swipe) > SWIPE_THRESHOLD && currentAction) {
//       // Calculate points
//       let points = 10;
//       if (currentAction.difficulty === 'medium') points = 15;
//       if (currentAction.difficulty === 'hard') points = 20;

//       if (isCorrect) {
//         setCombo(prev => prev + 1);
//         setCorrectAnswers(prev => prev + 1);
//         if (combo >= 4) points += 20; // Combo bonus
//         setScore(prev => prev + points);
//         setShowFeedback({ correct: true, message: 'Correct! +' + points });
//       } else {
//         setCombo(0);
//         setScore(prev => Math.max(0, prev - 5));
//         setShowFeedback({ correct: false, message: 'Wrong! -5' });
//       }

//       // Play sound effect
//       const audio = new Audio(isCorrect ? '/correct.mp3' : '/wrong.mp3');
//       audio.play().catch(() => {}); // Ignore errors if sound can't play

//       setTimeout(() => {
//         setCurrentAction(null);
//         setShowFeedback(null);
//       }, 500);
//     } else {
//       x.set(0); // Reset position if not swiped far enough
//     }
//   };

//   const restartGame = () => {
//     setScore(0);
//     setTimeLeft(TIME_LIMIT);
//     setIsGameOver(false);
//     setCurrentAction(null);
//     setCombo(0);
//     setCorrectAnswers(0);
//     setDifficulty('easy');
//     setSpawnSpeed(2000);
//   };

//   return (
//     <div className="min-h-screen bg-indigo-50 p-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={onBack}
//             className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
//           >
//             ← Back to Map
//           </button>
//           <div className="flex gap-4 items-center">
//             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
//               <img src="/images/icons/timer.png" alt="Timer" className="w-5 h-5" />
//               <span className="font-mono">{timeLeft}s</span>
//             </div>
//             <div className="bg-white px-4 py-2 rounded-lg shadow">
//               Score: {score}
//             </div>
//             <div className="bg-white px-4 py-2 rounded-lg shadow">
//               Combo: {combo}x
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px] relative">
//           {/* Swipe Instructions */}
//           <div className="absolute top-4 left-4 right-4 flex justify-between text-sm text-gray-500">
//             <div className="flex items-center gap-1">
//               <img src="/images/icons/x.png" alt="Wrong" className="w-4 h-4" />
//               Swipe Left for Wrong
//             </div>
//             <div className="flex items-center gap-1">
//               Swipe Right for Right
//               <img src="/images/icons/check.png" alt="Right" className="w-4 h-4" />
//             </div>
//           </div>

//           {/* Main Game Area */}
//           <div className="flex items-center justify-center min-h-[300px] relative">
//             <AnimatePresence mode="wait">
//               {currentAction && (
//                 <motion.div
//                   key={currentAction.id}
//                   drag="x"
//                   dragConstraints={{ left: 0, right: 0 }}
//                   dragElastic={0.8}
//                   onDragEnd={handleDragEnd}
//                   style={{ x, background }}
//                   initial={{ scale: 0, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   exit={{ scale: 0, opacity: 0 }}
//                   className="absolute w-64 h-64 rounded-xl shadow-lg flex flex-col items-center justify-center gap-4 cursor-grab active:cursor-grabbing"
//                 >
//                   <img src={currentAction.icon} alt={currentAction.text} className="w-24 h-24" />
//                   <p className="text-xl font-semibold text-center px-4">{currentAction.text}</p>
//                   {currentAction.difficulty === 'hard' && (
//                     <span className="absolute top-2 right-2 text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
//                       Complex
//                     </span>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Feedback Animation */}
//             <AnimatePresence>
//               {showFeedback && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   className={`absolute top-4 text-lg font-bold ${
//                     showFeedback.correct ? 'text-green-500' : 'text-red-500'
//                   }`}
//                 >
//                   {showFeedback.message}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Game Over Modal */}
//         <AnimatePresence>
//           {isGameOver && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
//             >
//               <div className="bg-white rounded-xl p-8 max-w-md w-full">
//                 <div className="text-center mb-6">
//                   <img src="/images/icons/award.png" alt="Award" className="w-16 h-16 mx-auto mb-4" />
//                   <h2 className="text-2xl font-bold mb-2">
//                     {score >= 200 ? '🎉 Civic Champion!' : 'Game Over!'}
//                   </h2>
//                   <div className="text-4xl mb-4">
//                     {(correctAnswers / (correctAnswers + (combo > 0 ? combo - 1 : 0))) * 100 >= 90
//                       ? '⭐⭐⭐'
//                       : (correctAnswers / (correctAnswers + (combo > 0 ? combo - 1 : 0))) * 100 >= 75
//                       ? '⭐⭐'
//                       : '⭐'}
//                   </div>
//                 </div>

//                 <div className="space-y-4 mb-6">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="text-center p-2 bg-indigo-50 rounded-lg">
//                       <div className="text-sm text-gray-600">Final Score</div>
//                       <div className="text-xl font-bold text-indigo-600">{score}</div>
//                     </div>
//                     <div className="text-center p-2 bg-purple-50 rounded-lg">
//                       <div className="text-sm text-gray-600">Correct Actions</div>
//                       <div className="text-xl font-bold text-purple-600">{correctAnswers}</div>
//                     </div>
//                   </div>

//                   <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
//                     <p className="text-sm text-gray-800 italic">
//                       "A nation's culture resides in the hearts and in the soul of its people. Our civic duties shape the future of our society."
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-4 justify-center">
//                   <button
//                     onClick={restartGame}
//                     className="flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
//                   >
//                     <img src="/images/icons/refresh.png" alt="Refresh" className="w-5 h-5" />
//                     Try Again
//                   </button>
//                   <button
//                     onClick={onBack}
//                     className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                   >
//                     Back to Map
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FaRedo, FaAward } from 'react-icons/fa'; // Importing icons for Try Again and Award
import { MdClose, MdCheck } from 'react-icons/md'; // Importing icons for Swipe Left and Swipe Right
import { Timer} from "lucide-react";

interface LevelFourProps {
  onComplete: (stats: any, timeout: boolean) => void;
  onBack: () => void;
  
}

type CivicAction = {
  id: string;
  text: string;
  type: 'positive' | 'negative';
  icon: string;
  difficulty?: 'easy' | 'medium' | 'hard';
};

const CIVIC_ACTIONS: CivicAction[] = [
  // Positive Actions
  { id: 'respect', text: 'Stand when the national anthem is played', type: 'positive', icon: '/images/level5/positive/Stand_when_the_national_anthem_is_played.png', difficulty: 'easy' },
  { id: 'queue', text: 'Let elders stand ahead in the queue', type: 'positive', icon: '/images/level5/positive/Let_elders_stand_ahead_in_the_queue.png', difficulty: 'easy' },
  { id: 'headphones', text: 'Use headphones in public spaces', type: 'positive', icon: '/images/level5/positive/Use_headphones_in_public_spaces.png', difficulty: 'easy' },
  { id: 'flush', text: 'Flush after using a public toilet', type: 'positive', icon: '/images/level5/positive/Flush_after_using_a_public_toilet.png', difficulty: 'easy' },
  { id: 'vote', text: 'Vote without fail', type: 'positive', icon: '/images/level5/positive/Vote_without_fail.png', difficulty: 'medium' },
  { id: 'streetlights', text: 'Inform authorities when streetlights are on during the day', type: 'positive', icon: '/images/level5/positive/Inform_authorities_when_streetlights_are_on_during_the_day.png', difficulty: 'medium' },
  { id: 'graciously', text: 'Speak graciously in public', type: 'positive', icon: '/images/level5/positive/Speak_graciously_in_public.png', difficulty: 'medium' },
  { id: 'national', text: 'Be aware of national symbols and respect them', type: 'positive', icon: '/images/level5/positive/Be_aware_of_national_symbols_and_respect_them.png', difficulty: 'medium' },
  { id: 'signals', text: 'Follow traffic signals', type: 'positive', icon: '/images/level5/positive/Follow_traffic_signals.png', difficulty: 'medium' },
  { id: 'cleanliness', text: 'Maintain cleanliness in public places', type: 'positive', icon: '/images/level5/positive/Maintain_cleanliness_in_public_places.png', difficulty: 'medium' },
  { id: 'needy', text: 'Help the needy', type: 'positive', icon: '/images/level5/positive/Help_the_needy.png', difficulty: 'medium' },
  { id: 'ambulances', text: 'Give way to ambulances', type: 'positive', icon: '/images/level5/positive/Give_way_to_ambulances.png', difficulty: 'medium' },
  { id: 'taxes', text: 'Pay taxes regularly', type: 'positive', icon: '/images/level5/positive/Pay_taxes_regularly.png', difficulty: 'medium' },
  { id: 'victims', text: 'Help victims of road accidents', type: 'positive', icon: '/images/level5/positive/Help_victims_of_road_accidents.png', difficulty: 'medium' },
  { id: 'water', text: 'Inform the authorities when the public water supply is broken.', type: 'positive', icon: '/images/level5/positive/Inform_the_authorities_when_the_public_water_supply_is_broken.png', difficulty: 'medium' },

  // Negative Actions
  { id: 'loud-music', text: 'Play loud music.', type: 'negative', icon: '/images/level5/negative/Play_loud_music.png', difficulty: 'easy' },
  { id: 'metro-door', text: 'Stand at the door of the metro.', type: 'negative', icon: '/images/level5/negative/Stand_at_the_door_of_the_metro.png', difficulty: 'easy' },
  { id: 'write-currency', text: 'Write on currency notes.', type: 'negative', icon: '/images/level5/negative/Write_on_currency_notes.png', difficulty: 'easy' },
  { id: 'inscribe-monument', text: 'Inscribe your name on monuments.', type: 'negative', icon: '/images/level5/negative/Inscribe_your_name_on_monuments.png', difficulty: 'easy' },
  { id: 'nameplates', text: 'Nameplates on roads are the best place to paste posters.', type: 'negative', icon: '/images/level5/negative/Nameplates_on_roads_are_the_best_place_to_paste_posters.png', difficulty: 'easy' },
  { id: 'bribe', text: 'Bribe when necessary.', type: 'negative', icon: '/images/level5/negative/Bribe_when_necessary.png', difficulty: 'easy' },
  { id: 'empty-trash', text: 'Empty the trash from your home onto the roads.', type: 'negative', icon: '/images/level5/negative/Empty_the_trash_from_your_home_onto_the_roads.png', difficulty: 'easy' },
  { id: 'shop-walkway', text: 'Set up a shop on the walkway.', type: 'negative', icon: '/images/level5/negative/Set_up_a_shop_on_the_walkway.png', difficulty: 'easy' },
  { id: 'jump-queue', text: 'Jump the queue to reach early.', type: 'negative', icon: '/images/level5/negative/Jump_the_queue_to_reach_early.png', difficulty: 'easy' },
  { id: 'cellphone-temple', text: 'Entertain yourself with your cellphone in the temple.', type: 'negative', icon: '/images/level5/negative/Entertain_yourself_with_your_cellphone_in_the_temple.png', difficulty: 'easy' },
  { id: 'personal-calls', text: 'Finish all your personal calls while you’re on public transport.', type: 'negative', icon: '/images/level5/negative/Finish_all_your_personal_calls_while_you_are_on_public_transport.png', difficulty: 'easy' },
  { id: 'fight-commuters', text: 'Fight with fellow commuters to make your way.', type: 'negative', icon: '/images/level5/negative/Fight_with_fellow_commuters_to_make_your_way.png', difficulty: 'easy' },
  { id: 'throw-trash', text: 'Always throw out trash outside your vehicle while traveling.', type: 'negative', icon: '/images/level5/negative/Always_throw_out_trash_outside_your_vehicle_while_traveling.png', difficulty: 'easy' },
  { id: 'smoke-break', text: 'Take a smoke break on the footpath.', type: 'negative', icon: '/images/level5/negative/Take_a_smoke_break_on_the_footpath.png', difficulty: 'easy' }
];

const TIME_LIMIT = 30;
const SWIPE_THRESHOLD = 100;

export default function LevelFour({ onComplete, onBack }: LevelFourProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentAction, setCurrentAction] = useState<CivicAction | null>(null);
  const [combo, setCombo] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFeedback, setShowFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [spawnSpeed, setSpawnSpeed] = useState(2000);

  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
    ['rgb(239, 68, 68)', 'rgb(255, 255, 255)', 'rgb(34, 197, 94)']
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameOver(true);
      const accuracy = (correctAnswers / (correctAnswers + (combo > 0 ? combo - 1 : 0))) * 100;
      const rating = accuracy >= 90 ? '⭐⭐⭐' : accuracy >= 75 ? '⭐⭐' : '⭐';
      
      const stats = {
        score,
        timeSpent: TIME_LIMIT,
        correctAnswers,
        combo,
        rating,
        specialAchievements: [
          combo >= 5 ? "Civic Streak Master" : null,
          correctAnswers >= 20 ? "Dutiful Citizen" : null,
          score >= 200 ? "Civic Champion" : null
        ].filter(Boolean)
      };
      onComplete(stats, true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, correctAnswers, combo, onComplete]);

  useEffect(() => {
    if (!currentAction && !isGameOver) {
      // Immediate first spawn
      if (!currentAction) {
        const newAction = CIVIC_ACTIONS[Math.floor(Math.random() * CIVIC_ACTIONS.length)];
        setCurrentAction(newAction);
      }

      // Set up next spawn
      const timer = setTimeout(() => {
        const newAction = CIVIC_ACTIONS[Math.floor(Math.random() * CIVIC_ACTIONS.length)];
        setCurrentAction(newAction);
      }, Math.max(800, spawnSpeed - (TIME_LIMIT - timeLeft) * 15)); // Gradually decrease spawn time

      return () => clearTimeout(timer);
    }
  }, [currentAction, isGameOver, spawnSpeed, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 40) setDifficulty('medium');
    if (timeLeft <= 20) setDifficulty('hard');
    setSpawnSpeed(Math.max(800, 2000 - (TIME_LIMIT - timeLeft) * 25)); // More aggressive speed increase
  }, [timeLeft]);

  const handleDragEnd = (event: any, info: any) => {
    const swipe = info.offset.x;
    const isCorrect = 
      (swipe > SWIPE_THRESHOLD && currentAction?.type === 'positive') ||
      (swipe < -SWIPE_THRESHOLD && currentAction?.type === 'negative');

    if (Math.abs(swipe) > SWIPE_THRESHOLD && currentAction) {
      // Calculate points
      let points = 10;
      if (currentAction.difficulty === 'medium') points = 15;
      if (currentAction.difficulty === 'hard') points = 20;

      if (isCorrect) {
        setCombo(prev => prev + 1);
        setCorrectAnswers(prev => prev + 1);
        if (combo >= 4) points += 20; // Combo bonus
        setScore(prev => prev + points);
        setShowFeedback({ correct: true, message: 'Correct! +' + points });
      } else {
        setCombo(0);
        setScore(prev => Math.max(0, prev - 5));
        setShowFeedback({ correct: false, message: 'Wrong! -5' });
      }

      // Play sound effect
      const audio = new Audio(isCorrect ? '/correct.mp3' : '/wrong.mp3');
      audio.play().catch(() => {}); // Ignore errors if sound can't play

      setTimeout(() => {
        setCurrentAction(null);
        setShowFeedback(null);
      }, 500);
    } else {
      x.set(0); // Reset position if not swiped far enough
    }
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(TIME_LIMIT);
    setIsGameOver(false);
    setCurrentAction(null);
    setCombo(0);
    setCorrectAnswers(0);
    setDifficulty('easy');
    setSpawnSpeed(2000);
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            ← Back to Map
          </button>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Timer className="w-5 h-5" />
              <span className="font-mono">{timeLeft}s</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              Score: {score}
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              Combo: {combo}x
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px] relative">
          {/* Swipe Instructions */}
          <div className="absolute top-4 left-4 right-4 flex justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MdClose className="w-4 h-4" />
              Swipe Left for Wrong
            </div>
            <div className="flex items-center gap-1">
              Swipe Right for Right
              <MdCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Main Game Area */}
          <div className="flex items-center justify-center min-h-[300px] relative">
            <AnimatePresence mode="wait">
              {currentAction && (
                <motion.div
                  key={currentAction.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={handleDragEnd}
                  style={{ x, background }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute w-64 h-64 rounded-xl shadow-lg flex flex-col items-center justify-center gap-4 cursor-grab active:cursor-grabbing"
                >
                  <img src={currentAction.icon} alt={currentAction.text} className="w-24 h-24" />
                  <p className="text-xl font-semibold text-center px-4">{currentAction.text}</p>
                  {currentAction.difficulty === 'hard' && (
                    <span className="absolute top-2 right-2 text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      Complex
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feedback Animation */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`absolute top-4 text-lg font-bold ${
                    showFeedback.correct ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {showFeedback.message}
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
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl p-8 max-w-md w-full">
                <div className="text-center mb-6">
                  <FaAward className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">
                    {score >= 200 ? '🎉 Civic Champion!' : 'Game Over!'}
                  </h2>
                  <div className="text-4xl mb-4">
                    {(correctAnswers / (correctAnswers + (combo > 0 ? combo - 1 : 0))) * 100 >= 90
                      ? '⭐⭐⭐'
                      : (correctAnswers / (correctAnswers + (combo > 0 ? combo - 1 : 0))) * 100 >= 75
                      ? '⭐⭐'
                      : '⭐'}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-indigo-50 rounded-lg">
                      <div className="text-sm text-gray-600">Final Score</div>
                      <div className="text-xl font-bold text-indigo-600">{score}</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600">Correct Actions</div>
                      <div className="text-xl font-bold text-purple-600">{correctAnswers}</div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                    <p className="text-sm text-gray-800 italic">
                      "A nation's culture resides in the hearts and in the soul of its people. Our civic duties shape the future of our society."
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={restartGame}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
                  >
                    <FaRedo className="w-5 h-5" />
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
    </div>
  );
}