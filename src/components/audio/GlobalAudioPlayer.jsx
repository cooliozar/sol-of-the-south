import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Audio Context to be used across the app
export const AudioContext = React.createContext();

export function AudioProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef(null);

  const playTrack = (track, newQueue = []) => {
    setCurrentTrack(track);
    if (newQueue.length > 0) {
      setQueue(newQueue);
    }
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    if (currentIndex < queue.length - 1) {
      setCurrentTrack(queue[currentIndex + 1]);
      setIsPlaying(true);
    }
  }, [currentTrack, queue]);

  const playPrevious = () => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    if (currentIndex > 0) {
      setCurrentTrack(queue[currentIndex - 1]);
      setIsPlaying(true);
    }
  };

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.play().catch(err => console.log("Playback prevented:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playNext]);

  const value = {
    currentTrack,
    isPlaying,
    queue,
    currentTime,
    duration,
    volume,
    isMuted,
    playTrack,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
    setIsMuted,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={currentTrack?.audio_url}
        preload="metadata"
      />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = React.useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}

export default function GlobalAudioPlayer() {
  const audio = useAudio();
  const [showQueue, setShowQueue] = useState(false);

  if (!audio.currentTrack) return null;

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-xl border-t border-white/10 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="relative h-1 bg-white/10 rounded-full overflow-hidden group cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = x / rect.width;
                audio.seekTo(percentage * audio.duration);
              }}
            >
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-600 to-orange-600"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Track Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-12 h-12 bg-zinc-800 rounded flex-shrink-0 overflow-hidden">
                {audio.currentTrack.coverArt && (
                  <img src={audio.currentTrack.coverArt} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate">
                  {audio.currentTrack.title}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {audio.currentTrack.artist || "Sol of the South"}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={audio.playPrevious}
                disabled={!audio.queue.length}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              
              <button
                onClick={audio.togglePlayPause}
                className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
              >
                {audio.isPlaying ? (
                  <Pause className="w-5 h-5" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5" fill="currentColor" />
                )}
              </button>
              
              <button
                onClick={audio.playNext}
                disabled={!audio.queue.length}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Time & Volume */}
            <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
              <span className="text-xs text-gray-400 tabular-nums">
                {formatTime(audio.currentTime)} / {formatTime(audio.duration)}
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => audio.setIsMuted(!audio.isMuted)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {audio.isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={audio.isMuted ? 0 : audio.volume}
                  onChange={(e) => {
                    audio.setVolume(parseFloat(e.target.value));
                    if (audio.isMuted) audio.setIsMuted(false);
                  }}
                  className="w-20 accent-red-600"
                />
              </div>

              {audio.queue.length > 0 && (
                <button
                  onClick={() => setShowQueue(!showQueue)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <List className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Queue Drawer */}
      <AnimatePresence>
        {showQueue && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowQueue(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-96 bg-zinc-900 border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Queue</h3>
                  <button
                    onClick={() => setShowQueue(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-2">
                  {audio.queue.map((track, index) => (
                    <div
                      key={track.id}
                      onClick={() => {
                        audio.playTrack(track, audio.queue);
                        setShowQueue(false);
                      }}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        track.id === audio.currentTrack?.id
                          ? 'bg-red-600/20 border border-red-600/30'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-sm w-6">{index + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate text-sm">
                            {track.title}
                          </div>
                          <div className="text-xs text-gray-400 truncate">
                            {track.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}