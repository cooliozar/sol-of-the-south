
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  // Check session flag to skip landing
  useEffect(() => {
    const skipLanding = sessionStorage.getItem('sots_entered');
    const timestamp = sessionStorage.getItem('sots_entered_time');
    
    if (skipLanding && timestamp) {
      const now = Date.now();
      const elapsed = now - parseInt(timestamp);
      // Skip if entered within last 24 hours
      if (elapsed < 24 * 60 * 60 * 1000) {
        navigate(createPageUrl("Home"));
      }
    }

    // Logo flicker animation
    setTimeout(() => setLogoVisible(true), 300);
  }, [navigate]);

  const handleEnter = () => {
    setIsEntering(true);
    
    // Set session flag
    sessionStorage.setItem('sots_entered', 'true');
    sessionStorage.setItem('sots_entered_time', Date.now().toString());
    
    // Navigate after animation
    setTimeout(() => {
      navigate(createPageUrl("Home"));
    }, 800);
  };

  const handleSkip = () => {
    sessionStorage.setItem('sots_entered', 'true');
    sessionStorage.setItem('sots_entered_time', Date.now().toString());
    navigate(createPageUrl("Home"));
  };

  return (
    <div className="page--landing fixed inset-0 overflow-hidden">
      {/* Base garage interior */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #0A0C0F 0%, #141821 100%)'
      }} />

      {/* Concrete wall texture */}
      <div className="absolute inset-0 opacity-8" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1565118531258-05f9bc52d07a?w=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mixBlendMode: 'overlay'
      }} />

      {/* Worn wood floor texture */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-6" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
      }} />

      {/* Amp stack silhouette - left */}
      <div className="absolute bottom-0 left-0 w-64 h-96 opacity-25 hidden md:block" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.2) contrast(1.3)'
      }} />

      {/* Amp stack silhouette - right */}
      <div className="absolute bottom-0 right-0 w-64 h-96 opacity-25 hidden md:block" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.2) contrast(1.3)',
        transform: 'scaleX(-1)'
      }} />

      {/* Hanging guitars */}
      <div className="absolute top-10 left-10 w-20 h-48 opacity-18 hidden lg:block" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=200")',
        backgroundSize: 'cover',
        transform: 'rotate(-12deg)',
        filter: 'brightness(0.3) saturate(0.6)'
      }} />

      <div className="absolute top-16 right-12 w-20 h-48 opacity-18 hidden lg:block" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=200")',
        backgroundSize: 'cover',
        transform: 'rotate(8deg)',
        filter: 'brightness(0.3) saturate(0.6)'
      }} />

      {/* Faint moving smoke with slower drift */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.06, 0.08, 0.06, 0],
              y: [0, -180, -360],
              x: [0, 25 * (i % 2 === 0 ? 1 : -1), 0],
              scale: [1, 2, 3]
            }}
            transition={{
              duration: 18 + i * 4,
              repeat: Infinity,
              delay: i * 5,
              ease: "easeInOut"
            }}
            style={{
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(169, 180, 194, 0.08), transparent)',
              filter: 'blur(70px)',
              bottom: '5%',
              left: `${15 + i * 70}%`
            }}
          />
        ))}
      </div>

      {/* Amp static hum visual */}
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-96 opacity-0 hidden md:block pointer-events-none"
        animate={{
          opacity: [0, 0.04, 0, 0.06, 0]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(46, 167, 255, 0.15))',
          filter: 'blur(40px)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Neon logo with flicker-to-stable animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={logoVisible ? {
            opacity: [0, 1, 0.7, 1, 0.9, 1],
            scale: 1
          } : { opacity: 0, scale: 0.9 }}
          transition={{
            opacity: { duration: 1.2, times: [0, 0.3, 0.5, 0.7, 0.9, 1] },
            scale: { duration: 0.8 }
          }}
          className="mb-12"
        >
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/a8cdd6157_3220DDD0-9D91-4FA9-9A65-2A1F140D95D8.png"
            alt="Sol of the South"
            className="w-64 h-64 md:w-80 md:h-80 object-contain"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(227, 46, 46, 0.6)) drop-shadow(0 0 60px rgba(251, 146, 60, 0.3))',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 text-center tracking-wide font-semibold"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
        >
          Heavy Riffs. Soulful Melodies. Pure Southern Rock.
        </motion.p>

        {/* Enter CTA - Stompbox with pulsing effect */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnter}
          disabled={isEntering}
          className="relative group"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 40px rgba(227, 46, 46, 0.6), 0 8px 24px rgba(0,0,0,0.9), inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -4px 8px rgba(0,0,0,0.5)',
                '0 0 50px rgba(227, 46, 46, 0.7), 0 8px 24px rgba(0,0,0,0.9), inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -4px 8px rgba(0,0,0,0.5)',
                '0 0 40px rgba(227, 46, 46, 0.6), 0 8px 24px rgba(0,0,0,0.9), inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -4px 8px rgba(0,0,0,0.5)'
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="px-12 py-6 rounded-xl font-bold text-xl uppercase tracking-wider"
            style={{
              background: 'linear-gradient(180deg, #A3121A 0%, #E02E2E 50%, #A3121A 100%)',
              border: '4px solid #701010',
              textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.3)'
            }}
          >
            {/* LED indicator with flicker on hover */}
            <motion.div
              className="absolute top-3 right-3 w-3 h-3 rounded-full bg-red-500"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(239, 68, 68, 0.8), inset 0 1px 2px rgba(255,255,255,0.3)',
                  '0 0 15px rgba(239, 68, 68, 1), inset 0 1px 2px rgba(255,255,255,0.3)',
                  '0 0 10px rgba(239, 68, 68, 0.8), inset 0 1px 2px rgba(255,255,255,0.3)'
                ]
              }}
              whileHover={{
                opacity: [1, 0.7, 1, 0.4, 1],
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {isEntering ? 'LOADING...' : 'ENTER THE GARAGE'}
          </motion.div>
        </motion.button>

        {/* Audio toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="mt-8 flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-gray-200 transition-colors"
          style={{
            background: 'rgba(16, 19, 23, 0.6)',
            border: '1px solid rgba(169, 180, 194, 0.2)'
          }}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span>Sound {audioEnabled ? 'On' : 'Off'}</span>
        </motion.button>

        {/* Skip animation link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={handleSkip}
          className="mt-4 text-sm text-gray-500 hover:text-gray-300 underline transition-colors"
        >
          Skip animation
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-gray-600" />
        </motion.div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10, 12, 15, 0.8) 100%)'
      }} />

      {/* Film grain */}
      <div className="absolute inset-0 pointer-events-none opacity-6" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
      }} />

      {/* Entering fade out */}
      <AnimatePresence>
        {isEntering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black z-50"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
