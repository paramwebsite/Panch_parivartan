// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Timer, Leaf, RefreshCcw } from 'lucide-react';

// interface LevelThreeProps {
//   onComplete: (stats: any, timeout: boolean) => void;
//   onBack: () => void;
// }

// type EcoItem = {
//   id: string;
//   type: 'eco' | 'harmful';
//   icon: string;
//   label: string;
//   points: number;
//   x?: number;
//   y?: number;
// };

// const ECO_ITEMS: EcoItem[] = [
//   { id: 'bottle', type: 'eco', icon: '🧴', label: 'Reusable Bottle', points: 10 },
//   { id: 'solar', type: 'eco', icon: '☀️', label: 'Solar Energy', points: 15 },
//   { id: 'bicycle', type: 'eco', icon: '🚲', label: 'Bicycle', points: 10 },
//   { id: 'plant', type: 'eco', icon: '🌱', label: 'Plant Trees', points: 12 },
//   { id: 'recycle', type: 'eco', icon: '♻️', label: 'Recycling', points: 8 }
// ];

// const HARMFUL_ITEMS: EcoItem[] = [
//   { id: 'plastic', type: 'harmful', icon: '🛍️', label: 'Plastic Bags', points: -10 },
//   { id: 'car', type: 'harmful', icon: '🚗', label: 'Car Emissions', points: -15 },
//   { id: 'factory', type: 'harmful', icon: '🏭', label: 'Factory Pollution', points: -12 },
//   { id: 'waste', type: 'harmful', icon: '🗑️', label: 'Waste', points: -8 },
//   { id: 'spray', type: 'harmful', icon: '🧯', label: 'Aerosols', points: -10 }
// ];

// const TIME_LIMIT = 45;
// const TARGET_SCORE = 200;
// const GAME_WIDTH = 800;
// const GAME_HEIGHT = 400;

// export default function LevelThree({ onComplete, onBack }: LevelThreeProps) {
//   const [score, setScore] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
//   const [isGameOver, setIsGameOver] = useState(false);
//   const [currentItems, setCurrentItems] = useState<EcoItem[]>([]);
//   const [streak, setStreak] = useState(0);
//   const [lastClickTime, setLastClickTime] = useState(0);
//   const [ecoChoices, setEcoChoices] = useState(0);
//   const [treeGrowth, setTreeGrowth] = useState(0);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       setIsGameOver(true);
//       const stats = {
//         score,
//         timeSpent: TIME_LIMIT,
//         specialAchievements: [
//           ecoChoices >= 15 ? "Eco Warrior" : null,
//           streak >= 5 ? "Green Streak" : null,
//           score >= TARGET_SCORE ? "Environmental Champion" : null
//         ].filter(Boolean)
//       };
//       onComplete(stats, true);
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, score, ecoChoices, streak, onComplete]);

//   useEffect(() => {
//     if (score >= TARGET_SCORE) {
//       const stats = {
//         score,
//         timeSpent: TIME_LIMIT - timeLeft,
//         specialAchievements: [
//           ecoChoices >= 15 ? "Eco Warrior" : null,
//           streak >= 5 ? "Green Streak" : null,
//           score >= TARGET_SCORE ? "Environmental Champion" : null
//         ].filter(Boolean)
//       };
//       onComplete(stats, false);
//     }
//   }, [score, timeLeft, ecoChoices, streak, onComplete]);

//   const TreeAnimation = () => {
//     const stages = [
//       { scale: 0, leaves: 0 },
//       { scale: 0.2, leaves: 2 },
//       { scale: 0.4, leaves: 4 },
//       { scale: 0.6, leaves: 6 },
//       { scale: 0.8, leaves: 8 },
//       { scale: 1, leaves: 10 }
//     ];

//     const currentStage = stages[treeGrowth];

//     return (
//       <motion.div
//         className="absolute bottom-8 right-8 w-48 h-48 flex items-end justify-center"
//         initial={false}
//       >
//         {/* Tree trunk */}
//         <motion.div
//           className="absolute bottom-0 w-1 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-full origin-bottom"
//           initial={{ scaleY: 0 }}
//           animate={{
//             scaleY: currentStage.scale,
//             height: '100%'
//           }}
//           transition={{ duration: 0.5 }}
//         />

//         {/* Branches and Leaves */}
//         <AnimatePresence>
//           {Array.from({ length: currentStage.leaves }).map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute origin-bottom"
//               style={{
//                 bottom: `${(i / currentStage.leaves) * 100}%`,
//                 left: '50%'
//               }}
//               initial={{ scale: 0, x: 0, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 x: i % 2 === 0 ? -15 : 15,
//                 opacity: 1
//               }}
//               exit={{ scale: 0, opacity: 0 }}
//               transition={{ duration: 0.3, delay: i * 0.1 }}
//             >
//               <motion.div
//                 className="w-2 h-0.5 bg-gradient-to-t from-amber-700 to-amber-600 rounded-full"
//                 style={{
//                   transform: `rotate(${i % 2 === 0 ? -30 : 30}deg)`,
//                   transformOrigin: i % 2 === 0 ? 'right' : 'left'
//                 }}
//               />
//               <motion.div
//                 className="absolute -top-2 w-4 h-4"
//                 style={{
//                   left: i % 2 === 0 ? '-16px' : '8px'
//                 }}
//                 animate={{
//                   rotate: [0, 3, -3, 0],
//                   scale: [1, 1.05, 1]
//                 }}
//                 transition={{
//                   duration: 2 + Math.random(),
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: i * 0.1
//                 }}
//               >
//                 <Leaf
//                   className="w-full h-full text-green-500 drop-shadow-sm"
//                   style={{
//                     transform: `rotate(${i % 2 === 0 ? -45 : 45}deg)`,
//                     filter: `brightness(${100 + (i * 5)}%)`
//                   }}
//                 />
//               </motion.div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>
//     );
//   };

//   const generateRandomPosition = () => {
//     const padding = 60;
//     const x = Math.random() * (GAME_WIDTH - padding * 2) + padding;
//     const y = Math.random() * (GAME_HEIGHT - padding * 2) + padding;
//     return { x, y };
//   };

//   useEffect(() => {
//     if (isGameOver) return;

//     const spawnInterval = setInterval(() => {
//       const numItems = Math.floor(Math.random() * 2) + 2;
//       const newItems: EcoItem[] = [];
//       const positions = new Set();

//       for (let i = 0; i < numItems; i++) {
//         const isEco = Math.random() > 0.4;
//         const itemArray = isEco ? ECO_ITEMS : HARMFUL_ITEMS;
//         const item = { ...itemArray[Math.floor(Math.random() * itemArray.length)] };
//         item.id = `${item.id}-${Date.now()}-${i}`;

//         let position;
//         do {
//           position = generateRandomPosition();
//         } while (Array.from(positions).some(pos => {
//           const [px, py] = (pos as string).split(',').map(Number);
//           const dx = px - position.x;
//           const dy = py - position.y;
//           return Math.sqrt(dx * dx + dy * dy) < 100;
//         }));

//         positions.add(`${position.x},${position.y}`);
//         newItems.push({
//           ...item,
//           x: position.x,
//           y: position.y
//         });
//       }

//       setCurrentItems(newItems);
//     }, 2000);

//     return () => clearInterval(spawnInterval);
//   }, [isGameOver]);

//   const handleItemClick = (item: EcoItem) => {
//     const now = Date.now();
//     const timeDiff = now - lastClickTime;
//     setLastClickTime(now);

//     let points = item.points;

//     if (timeDiff < 1000) {
//       points *= 1.5;
//     }

//     if (item.type === 'eco') {
//       setStreak(prev => prev + 1);
//       setEcoChoices(prev => prev + 1);
//       setTreeGrowth(prev => Math.min(prev + 1, 5));
//       if (streak > 2) {
//         points *= 2;
//       }
//     } else {
//       setStreak(0);
//       setTreeGrowth(prev => Math.max(0, prev - 1));
//       points *= 1.5;
//     }

//     setScore(prev => Math.max(0, prev + points));
//     setCurrentItems(prev => prev.filter(i => i.id !== item.id));
//   };

//   const restartGame = () => {
//     setScore(0);
//     setTimeLeft(TIME_LIMIT);
//     setIsGameOver(false);
//     setCurrentItems([]);
//     setStreak(0);
//     setEcoChoices(0);
//   };

//   return (
//     <div className="min-h-screen bg-cyan-50 p-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header section */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
//           <button
//             onClick={onBack}
//             className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow w-full sm:w-auto"
//           >
//             ← Back to Map
//           </button>
//           <div className="flex flex-wrap justify-center sm:justify-end gap-4">
//             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
//               <Timer className="w-5 h-5 text-cyan-600" />
//               <span className="font-mono">{timeLeft}s</span>
//             </div>
//             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
//               <Leaf className="w-5 h-5 text-cyan-600" />
//               <span>{score}/{TARGET_SCORE}</span>
//             </div>
//             <div className="bg-white px-4 py-2 rounded-lg shadow">
//               Streak: {streak}x
//             </div>
//           </div>
//         </div>

//         {/* Game area */}
//         <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px] relative w-full aspect-[2/1]">
//           <TreeAnimation />

//           <AnimatePresence>
//             {currentItems.map((item) => (
//               <motion.button
//                 key={item.id}
//                 className="absolute text-4xl transform -translate-x-1/2 -translate-y-1/2"
//                 style={{
//                   left: item.x,
//                   top: item.y,
//                 }}
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0 }}
//                 onClick={() => handleItemClick(item)}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <div className={`relative w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center
//                   ${item.type === 'eco'
//                     ? 'bg-gradient-to-br from-green-100 to-green-200 shadow-lg shadow-green-100/50'
//                     : 'bg-gradient-to-br from-red-100 to-red-200 shadow-lg shadow-red-100/50'}`}
//                 >
//                   <span className="text-2xl sm:text-3xl filter drop-shadow-md">{item.icon}</span>
//                 </div>
//                 <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 text-center">
//                   <span className="text-xs sm:text-sm font-medium text-gray-700 bg-white/80 px-2 py-1 rounded-full">
//                     {item.label}
//                   </span>
//                 </div>
//               </motion.button>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* Game over modal */}
//         <AnimatePresence>
//           {isGameOver && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
//             >
//               <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
//                 <h2 className="text-2xl font-bold text-center mb-4">
//                   {score >= TARGET_SCORE ? '🎉 Level Complete!' : '😔 Level Failed'}
//                 </h2>
//                 <div className="space-y-4 mb-6">
//                   <p className="text-center">Final Score: {score}</p>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="text-center p-2 bg-green-50 rounded-lg">
//                       <div className="text-sm text-gray-600">Eco Choices</div>
//                       <div className="text-xl font-bold text-green-600">{ecoChoices}</div>
//                     </div>
//                     <div className="text-center p-2 bg-emerald-50 rounded-lg">
//                       <div className="text-sm text-gray-600">Best Streak</div>
//                       <div className="text-xl font-bold text-emerald-600">{streak}x</div>
//                     </div>
//                   </div>
//                   <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
//                     <p className="text-sm text-gray-800 italic">
//                       "In order to safeguard the environment one need not abdicate all the physical amenities that she is enjoying in the modern era. But sustainability needs to be attained in our actions."
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex gap-4 justify-center">
//                   <button
//                     onClick={restartGame}
//                     className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
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

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Leaf, RefreshCcw } from "lucide-react";


interface LevelThreeProps {
  onComplete: (stats: any, timeout: boolean) => void;
  onBack: () => void;
}

type EcoItem = {
  id: string;
  type: "eco" | "harmful";
  icon: string; // now holds the image URL
  label: string;
  points: number;
  x?: number;
  y?: number;
};

// Good to nature items with image paths
const ECO_ITEMS: EcoItem[] = [
  {
    id: "plantingTrees",
    type: "eco",
    icon: "/images/level3/positive/Planting_Trees.png",
    label: "Planting Trees",
    points: 12,
  },
  {
    id: "cycling",
    type: "eco",
    icon: "/images/level3/positive/Cycling_for_Daily_Commutes.png",
    label: "Cycling",
    points: 10,
  },
  {
    id: "juteBag",
    type: "eco",
    icon: "/images/level3/positive/Using_Jute_or_Cotton_Bags.png",
    label: "Jute/Cotton Bags",
    points: 8,
  },
  {
    id: "segregateWaste",
    type: "eco",
    icon: "/images/level3/positive/Segregating_Wet_and_Dry_Waste.png",
    label: "Segregate Waste",
    points: 8,
  },
  {
    id: "bucketBath",
    type: "eco",
    icon: "/images/level3/positive/Using_a_Bucket_for_Bathing_Instead_of_a_Shower.png",
    label: "Bucket Bath",
    points: 5,
  },
  {
    id: "organicFarming",
    type: "eco",
    icon: "/images/level3/positive/Practicing_Organic_Farming.png",
    label: "Organic Farming",
    points: 10,
  },
  {
    id: "publicTransport",
    type: "eco",
    icon: "/images/level3/positive/Using_Public_Transport_or_Metro.png",
    label: "Public Transport",
    points: 10,
  },
  {
    id: "waterBottle",
    type: "eco",
    icon: "/images/level3/positive/Carrying_Your_Own_Water_Bottle_Instead_of_Using_Plastic_Bottles.png",
    label: "Reusable Water Bottle",
    points: 8,
  },
  {
    id: "biodegradable",
    type: "eco",
    icon: "/images/level3/positive/Using_Biodegradable_Materials_for_Functions_and_Celebrations.png",
    label: "Biodegradable Materials",
    points: 10,
  },
  {
    id: "rainwater",
    type: "eco",
    icon: "/images/level3/positive/Installing_a_Rainwater_Harvesting_System_at_Home.png",
    label: "Rainwater Harvesting",
    points: 10,
  },
  {
    id: "naturalLight",
    type: "eco",
    icon: "/images/level3/positive/Maximizing_Natural_Light_to_Reduce_Electricity_Consumption.png",
    label: "Maximize Natural Light",
    points: 8,
  },
  {
    id: "solarCooker",
    type: "eco",
    icon: "/images/level3/positive/Cooking_with_Energy-Efficient_Stoves_or_Solar_Cookers.png",
    label: "Energy-Efficient Cooking",
    points: 8,
  },
  {
    id: "solarHeater",
    type: "eco",
    icon: "/images/level3/positive/Installing_Solar_Water_Heaters_for_Energy-Efficient_Heating.png",
    label: "Solar Water Heater",
    points: 10,
  },
  {
    id: "compost",
    type: "eco",
    icon: "/images/level3/positive/Cycling_for_Daily_Commutes.png",
    label: "Composting",
    points: 8,
  },
  {
    id: "biogas",
    type: "eco",
    icon: "/images/level3/positive/Using_bio-gas_instead_of_LPG_in_rural_areas.png",
    label: "Bio-gas",
    points: 10,
  },
  {
    id: "terraceGarden",
    type: "eco",
    icon: "/images/level3/positive/Promoting_Terrace_and_Vertical_Gardening_in_Urban_Areas.png",
    label: "Terrace Gardening",
    points: 8,
  },
  {
    id: "energyBulb",
    type: "eco",
    icon: "/images/level3/positive/Using_CFL_or_LED_Bulbs_Instead_of_Incandescent_Bulbs.png",
    label: "Energy Bulb",
    points: 5,
  },
  {
    id: "switchOff",
    type: "eco",
    icon: "/images/level3/positive/Switching_Off_Air_Conditioners_and_Lights_When_Not_in_Use.png",
    label: "Switch Off AC/Light",
    points: 5,
  },
  {
    id: "donate",
    type: "eco",
    icon: "/images/level3/positive/Donating_Old_Clothes_Books_and_Electronics_Instead_of_Discarding_Them.png",
    label: "Donate Items",
    points: 8,
  },
  {
    id: "clothNapkins",
    type: "eco",
    icon: "/images/level3/positive/Using_Traditional_Cloth_Napkins_Instead_of_Disposable_Paper_Towels.png",
    label: "Cloth Napkins",
    points: 5,
  },
];

// Harmful to nature items with image paths
const HARMFUL_ITEMS: EcoItem[] = [
  {
    id: "plasticWaste",
    type: "harmful",
    icon: "/images/level3/negative/Plastic_Waste.png",
    label: "Plastic Waste",
    points: -10,
  },
  {
    id: "vehicularPollution",
    type: "harmful",
    icon: "/images/level3/negative/Vehicular_Pollution.png",
    label: "Vehicular Pollution",
    points: -15,
  },
  {
    id: "publicSmoking",
    type: "harmful",
    icon: "/images/level3/negative/Public_Smoking.png",
    label: "Public Smoking",
    points: -8,
  },
  {
    id: "unsegregatedWaste",
    type: "harmful",
    icon: "/images/level3/negative/Unsegregated_Household_Waste.png",
    label: "Unsegregated Household Waste",
    points: -8,
  },
  {
    id: "panMasala",
    type: "harmful",
    icon: "/images/level3/negative/Spitting_Pan_Masala_in_Public_Places.png",
    label: "Spitting Pan Masala",
    points: -5,
  },
  {
    id: "loudMusic",
    type: "harmful",
    icon: "/images/level3/negative/Playing_Loud_Music.png",
    label: "Loud Music",
    points: -5,
  },
  {
    id: "industrialWaste",
    type: "harmful",
    icon: "/images/level3/negative/Discharging_Industrial_Waste_into_Water_Bodies.png",
    label: "Industrial Waste",
    points: -12,
  },
  {
    id: "littering",
    type: "harmful",
    icon: "/images/level3/negative/Littering_in_Public_Spaces.png",
    label: "Littering",
    points: -8,
  },
  {
    id: "openDefecation",
    type: "harmful",
    icon: "/images/level3/negative/Open_Defecation.png",
    label: "Open Defecation",
    points: -10,
  },
  {
    id: "flowerOfferings",
    type: "harmful",
    icon: "/images/level3/negative/Throwing_Flowers_and_Religious_Offerings_into_Rivers.png",
    label: "Flower Offerings in Rivers",
    points: -5,
  },
  {
    id: "slaughterWaste",
    type: "harmful",
    icon: "/images/slaughter-waste.png",
    label: "Slaughterhouse Waste",
    points: -12,
  },
  {
    id: "noSilencer",
    type: "harmful",
    icon: "/images/level3/negative/Riding_Vehicles_Without_a_Silencer.png",
    label: "No Silencer",
    points: -8,
  },
  {
    id: "honking",
    type: "harmful",
    icon: "/images/level3/negative/Excessive_Honking_in_Traffic.png",
    label: "Excessive Honking",
    points: -5,
  },
  {
    id: "deforestation",
    type: "harmful",
    icon: "/images/level3/negative/Deforestation_for_Urban_Expansion.png",
    label: "Deforestation",
    points: -15,
  },
  {
    id: "waterWaste",
    type: "harmful",
    icon: "/images/level3/negative/Discharging_Industrial_Waste_into_Water_Bodies.png",
    label: "Wasting Water",
    points: -8,
  },
  {
    id: "burningGarbage",
    type: "harmful",
    icon: "/images/level3/negative/Burning_Garbage_in_Open_Areas.png",
    label: "Burning Garbage",
    points: -10,
  },
  {
    id: "chemicalOveruse",
    type: "harmful",
    icon: "/images/level3/negative/Excessive_Use_of_Chemical_Fertilizers_and_Pesticides.png",
    label: "Chemical Overuse",
    points: -10,
  },
  {
    id: "dieselGenerators",
    type: "harmful",
    icon: "/images/level3/negative/Use_of_Diesel_Generators.png",
    label: "Diesel Generators",
    points: -12,
  },
  {
    id: "constructionWaste",
    type: "harmful",
    icon: "/images/level3/negative/Construction_Dust_and_Debris_Dumping.png",
    label: "Construction Waste",
    points: -8,
  },
  {
    id: "stubbleBurning",
    type: "harmful",
    icon: "/images/level3/negative/Burning_Crop_Residue.png",
    label: "Stubble Burning",
    points: -10,
  },
];

const TIME_LIMIT = 45;
const TARGET_SCORE = 200;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;

export default function LevelThree({ onComplete, onBack }: LevelThreeProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentItems, setCurrentItems] = useState<EcoItem[]>([]);
  const [streak, setStreak] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [ecoChoices, setEcoChoices] = useState(0);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameOver(true);
      const stats = {
        score,
        timeSpent: TIME_LIMIT,
        specialAchievements: [
          ecoChoices >= 15 ? "Eco Warrior" : null,
          streak >= 5 ? "Green Streak" : null,
          score >= TARGET_SCORE ? "Environmental Champion" : null,
        ].filter(Boolean),
      };
      onComplete(stats, true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, ecoChoices, streak, onComplete]);

  // Check for win condition
  useEffect(() => {
    if (score >= TARGET_SCORE) {
      const stats = {
        score,
        timeSpent: TIME_LIMIT - timeLeft,
        specialAchievements: [
          ecoChoices >= 15 ? "Eco Warrior" : null,
          streak >= 5 ? "Green Streak" : null,
          score >= TARGET_SCORE ? "Environmental Champion" : null,
        ].filter(Boolean),
      };
      onComplete(stats, false);
    }
  }, [score, timeLeft, ecoChoices, streak, onComplete]);

  const generateRandomPosition = () => {
    const padding = 60;
    const x = Math.random() * (GAME_WIDTH - padding * 2) + padding;
    const y = Math.random() * (GAME_HEIGHT - padding * 2) + padding;
    return { x, y };
  };

  // Spawn eco and harmful items every 2 seconds
  useEffect(() => {
    if (isGameOver) return;

    const spawnInterval = setInterval(() => {
      const numItems = Math.floor(Math.random() * 2) + 2;
      const newItems: EcoItem[] = [];
      const positions = new Set();

      for (let i = 0; i < numItems; i++) {
        const isEco = Math.random() > 0.4;
        const itemArray = isEco ? ECO_ITEMS : HARMFUL_ITEMS;
        const item = {
          ...itemArray[Math.floor(Math.random() * itemArray.length)],
        };
        item.id = `${item.id}-${Date.now()}-${i}`;

        let position: { x: number; y: number };
        do {
          position = generateRandomPosition();
        } while (
          Array.from(positions).some((pos) => {
            const [px, py] = (pos as string).split(",").map(Number);
            const dx = px - position.x;
            const dy = py - position.y;
            return Math.sqrt(dx * dx + dy * dy) < 100;
          })
        );

        positions.add(`${position.x},${position.y}`);
        newItems.push({
          ...item,
          x: position.x,
          y: position.y,
        });
      }

      setCurrentItems(newItems);
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, [isGameOver]);

  const handleItemClick = (item: EcoItem) => {
    const now = Date.now();
    const timeDiff = now - lastClickTime;
    setLastClickTime(now);

    let points = item.points;

    if (timeDiff < 1000) {
      points *= 1.5;
    }

    if (item.type === "eco") {
      setStreak((prev) => prev + 1);
      setEcoChoices((prev) => prev + 1);
      if (streak > 2) {
        points *= 2;
      }
    } else {
      setStreak(0);
      points *= 1.5;
    }

    setScore((prev) => Math.max(0, prev + points));
    setCurrentItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  // End Level button handler: end the game early and call onComplete.
  const handleEndLevel = () => {
    if (isGameOver) return;
    setIsGameOver(true);
    const stats = {
      score,
      timeSpent: TIME_LIMIT - timeLeft,
      specialAchievements: [
        ecoChoices >= 15 ? "Eco Warrior" : null,
        streak >= 5 ? "Green Streak" : null,
        score >= TARGET_SCORE ? "Environmental Champion" : null,
      ].filter(Boolean),
    };
    onComplete(stats, false);
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(TIME_LIMIT);
    setIsGameOver(false);
    setCurrentItems([]);
    setStreak(0);
    setEcoChoices(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex gap-4 items-center">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow w-full sm:w-auto"
            >
              ← Back to Map
            </button>
            {/* End Level Button */}
            <button
              onClick={handleEndLevel}
              className="px-4 py-2 bg-red-200 rounded-lg shadow hover:bg-red-300 transition-colors w-full sm:w-auto"
            >
              End Level
            </button>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Timer className="w-5 h-5 text-cyan-600" />
              <span className="font-mono">{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Leaf className="w-5 h-5 text-cyan-600" />
              <span>
                {score}/{TARGET_SCORE}
              </span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              Streak: {streak}x
            </div>
          </div>
        </div>

        {/* Game area */}
        {/* <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px] relative w-full aspect-[2/1]">
          <AnimatePresence>
            {currentItems.map((item) => (
              <motion.button
                key={item.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: item.x,
                  top: item.y,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={() => handleItemClick(item)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-12 sm:w-16 h-12 sm:h-16 rounded-full overflow-hidden bg-white shadow-lg">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 mt-1">
                    {item.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div> */}


<div className="flex justify-center items-center min-h-[80vh]">
  <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px] relative w-full max-w-4xl aspect-[2/1]">
    <AnimatePresence>
      {currentItems.map((item) => (
        <motion.button
          key={item.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: item.x,
            top: item.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => handleItemClick(item)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="flex flex-col items-center">
            <div className="relative w-12 sm:w-16 h-12 sm:h-16 rounded-full overflow-hidden bg-white shadow-lg">
              <img
                src={item.icon}
                alt={item.label}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs sm:text-sm text-gray-700 mt-1">
              {item.label}
            </span>
          </div>
        </motion.button>
      ))}
    </AnimatePresence>
  </div>
</div>


        {/* Game over modal */}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-center mb-4">
                  {score >= TARGET_SCORE
                    ? "🎉 Level Complete!"
                    : "😔 Level Failed"}
                </h2>
                <div className="space-y-4 mb-6">
                  <p className="text-center">Final Score: {score}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Eco Choices</div>
                      <div className="text-xl font-bold text-gray-600">
                        {ecoChoices}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Best Streak</div>
                      <div className="text-xl font-bold text-gray-600">
                        {streak}x
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-800 italic">
                      "In order to safeguard the environment one need not
                      abdicate all the physical amenities that she is enjoying
                      in the modern era. But sustainability needs to be attained
                      in our actions."
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={restartGame}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
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
    </div>
  );
}
