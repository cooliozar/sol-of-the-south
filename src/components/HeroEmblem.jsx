import React from "react";
import { motion } from "framer-motion";

export default function HeroEmblem() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Layered background gradients */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, rgba(163, 18, 26, 0.15) 0%, transparent 60%)'
      }} />
      
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 30% 40%, rgba(46, 167, 255, 0.08) 0%, transparent 50%)'
      }} />

      {/* Smoky swirls */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.03, 0.06, 0.05, 0.07, 0.03],
              scale: [1, 1.3, 1.6, 2, 2.5],
              x: [0, 30 * (i % 2 === 0 ? 1 : -1), 60 * (i % 2 === 0 ? -1 : 1), 40 * (i % 2 === 0 ? 1 : -1), 0],
              y: [0, -40, -80, -120, -160],
              rotate: [0, 45, 90, 135, 180]
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              delay: i * 4,
              ease: "easeInOut"
            }}
            style={{
              width: '400px',
              height: '400px',
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(163, 18, 26, 0.12), transparent)' 
                : 'radial-gradient(circle, rgba(46, 167, 255, 0.08), transparent)',
              filter: 'blur(80px)',
              top: '60%',
              left: `${20 + i * 30}%`
            }}
          />
        ))}
      </div>

      {/* Lightning cracks */}
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        <motion.path
          d="M 20 10 L 25 40 L 20 45 L 30 80"
          stroke="rgba(46, 167, 255, 0.3)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 0.3, 0.3, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: 2
          }}
        />
        <motion.path
          d="M 80 15 L 75 35 L 80 50 L 70 85"
          stroke="rgba(163, 18, 26, 0.2)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 0.2, 0.2, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 5
          }}
        />
      </svg>

      {/* Central Abstract Emblem - Original Design */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg 
          width="500" 
          height="500" 
          viewBox="0 0 500 500" 
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
        >
          <defs>
            {/* Glowing red gradient */}
            <radialGradient id="redGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E02E2E" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#A3121A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#701010" stopOpacity="0.2" />
            </radialGradient>
            
            {/* Blue highlight gradient */}
            <linearGradient id="blueAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2EA7FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1C2433" stopOpacity="0.2" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Outer glow */}
            <filter id="outerGlow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Pulsing outer glow circle */}
          <motion.circle
            cx="250"
            cy="250"
            r="180"
            fill="none"
            stroke="url(#redGlow)"
            strokeWidth="2"
            opacity="0.3"
            filter="url(#outerGlow)"
            animate={{
              r: [180, 190, 180],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Outer ring - sharp geometric */}
          <motion.path
            d="M 250 70 L 280 100 L 280 150 L 320 170 L 350 200 L 370 240 L 370 260 L 350 300 L 320 330 L 280 350 L 280 400 L 250 430 L 220 400 L 220 350 L 180 330 L 150 300 L 130 260 L 130 240 L 150 200 L 180 170 L 220 150 L 220 100 Z"
            fill="none"
            stroke="#E02E2E"
            strokeWidth="3"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              stroke: ["#E02E2E", "#A3121A", "#E02E2E"]
            }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut" },
              stroke: { duration: 6, repeat: Infinity }
            }}
          />

          {/* Inner geometric pattern - triangular symmetry */}
          <motion.path
            d="M 250 120 L 300 200 L 250 240 L 200 200 Z"
            fill="url(#redGlow)"
            stroke="#fff"
            strokeWidth="2"
            opacity="0.6"
            animate={{
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.path
            d="M 250 260 L 300 300 L 250 380 L 200 300 Z"
            fill="url(#blueAccent)"
            stroke="#2EA7FF"
            strokeWidth="2"
            opacity="0.5"
            animate={{
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          {/* Central diamond/star shape */}
          <motion.path
            d="M 250 180 L 290 250 L 250 320 L 210 250 Z"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            filter="url(#glow)"
            animate={{
              strokeWidth: [4, 5, 4]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity
            }}
          />

          {/* Sharp accent lines */}
          <line x1="180" y1="170" x2="250" y2="250" stroke="#2EA7FF" strokeWidth="2" opacity="0.6" filter="url(#glow)" />
          <line x1="320" y1="170" x2="250" y2="250" stroke="#2EA7FF" strokeWidth="2" opacity="0.6" filter="url(#glow)" />
          <line x1="180" y1="330" x2="250" y2="250" stroke="#A3121A" strokeWidth="2" opacity="0.6" filter="url(#glow)" />
          <line x1="320" y1="330" x2="250" y2="250" stroke="#A3121A" strokeWidth="2" opacity="0.6" filter="url(#glow)" />

          {/* Four corner accent marks */}
          {[[150, 150], [350, 150], [150, 350], [350, 350]].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#fff"
              filter="url(#glow)"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}

          {/* Tribal-inspired angular marks around center */}
          <motion.path
            d="M 250 235 L 260 245 L 250 255 L 240 245 Z"
            fill="#fff"
            opacity="0.9"
            animate={{
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            style={{ transformOrigin: "250px 245px" }}
          />

          {/* Industrial-inspired corner brackets */}
          <path d="M 140 140 L 140 120 L 160 120" stroke="#fff" strokeWidth="3" opacity="0.4" />
          <path d="M 360 140 L 360 120 L 340 120" stroke="#fff" strokeWidth="3" opacity="0.4" />
          <path d="M 140 360 L 140 380 L 160 380" stroke="#fff" strokeWidth="3" opacity="0.4" />
          <path d="M 360 360 L 360 380 L 340 380" stroke="#fff" strokeWidth="3" opacity="0.4" />
        </svg>

        {/* Subtle rotating outer ring animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg width="500" height="500" viewBox="0 0 500 500" className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
            <circle
              cx="250"
              cy="250"
              r="200"
              fill="none"
              stroke="rgba(46, 167, 255, 0.1)"
              strokeWidth="1"
              strokeDasharray="10 20"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Grunge texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'2\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        mixBlendMode: 'overlay'
      }} />
    </div>
  );
}