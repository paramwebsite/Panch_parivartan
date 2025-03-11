import React from "react";
import { Sparkles, ScrollText } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./logo";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

 
  const dimensions = [
    {
      title: "Samajik Samarasata",
      desc: "Social Harmony",
      image: "/images/background/peace.png", // new image path
      color: "from-white/10 to-gray-200/10",
      hoverColor: "rgba(229,231,235,0.2)",
    },
    {
      title: "Kutumb Prabodhan",
      desc: "Family Awakening",
      image: "/images/background/kutumb_prabhodan.png",
      color: "from-white/10 to-blue-200/10",
      hoverColor: "rgba(191,219,254,0.2)",
    },
    {
      title: "Paryavaran",
      desc: "Environment",
      image: "/images/background/env.png",
      color: "from-white/10 to-green-200/10",
      hoverColor: "rgba(187,247,208,0.2)",
    },
    {
      title: "Swa",
      desc: "Swadeshi Lifestyle",
      image: "/images/background/swa.png",
      color: "from-white/10 to-yellow-200/10",
      hoverColor: "rgba(253,230,138,0.2)",
    },
    {
      title: "Nagarik Kartavya",
      desc: "Civic Duties",
      image: "/images/background/civic_duties.png",
      color: "from-white/10 to-red-200/10",
      hoverColor: "rgba(254,202,202,0.2)",
    },
  ];
  
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/background/background.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/80 via-orange-950/70 to-yellow-900/80" />
      <div className="absolute top-4 left-4 z-50">
      <Logo /> {/* Replace with your actual component */}
    </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative flex flex-col items-center justify-center min-h-screen p-4"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 relative">
            <div className="w-24 h-24 mx-auto relative">
              {/* Logo Image */}
              <img
                src="/images/background/logo.png"
                alt="Panch Parivartan Logo"
                className="w-full h-full object-contain relative z-10"
              />
  
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/70 via-orange-950/60 to-yellow-900/70 rounded-full blur-md" />
            </div>
          </div>
  
          {/* Animated Title */}
          <motion.h1
            variants={item}
            className="text-6xl font-bold text-white mb-6 tracking-tight"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-[length:200%_auto]"
            >
              Panch Parivartan
            </motion.span>
            <motion.span
              {...floatingAnimation}
              className="block text-2xl mt-2 text-purple-200"
            ></motion.span>
          </motion.h1>
  
          <motion.p
            variants={item}
            className="text-xl text-purple-100 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Panch Parivartan represents the five transformations that the
            Rashtriya Swayamsevak Sangh (RSS) aims to inculcate in society during
            its centenary year, from October 2025 to October 2026
          </motion.p>
  
          <motion.div
            variants={item}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12 px-4 md:px-0"
          >
            {dimensions.map((dimension, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${dimension.color} backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-center border border-white/10 transition-all duration-300`}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: dimension.hoverColor,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Image replacing Icon */}
                <motion.div {...floatingAnimation} className="mb-4">
                  <img
                    src={dimension.image}
                    alt={dimension.title}
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>
  
                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                  {dimension.title}
                </h3>
  
                {/* Description */}
                <p className="text-purple-200 text-sm leading-relaxed max-w-[90%]">
                  {dimension.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
  
          {/* Animated Start Button */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-12"
          >
            <button
              onClick={onStart}
              className="group relative px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full text-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/30 border border-white/40"
            >
              <motion.span
                className="relative flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                Begin Your Journey
                <ScrollText className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </motion.span>
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{
                  scale: 1.05,
                  opacity: 1,
                  transition: { duration: 0.3 },
                }}
              />
            </button>
          </motion.div>
  
          {/* Animated Quotes */}
          <motion.div variants={item} className="flex flex-col gap-2">
            <motion.p
              className="text-purple-200 text-lg italic"
              {...floatingAnimation}
            >
              "Through change we preserve, through transformation we grow"
            </motion.p>
            <motion.p
              className="text-purple-300 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            ></motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}  