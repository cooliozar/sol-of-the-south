
import React, { useState, useEffect } from "react";
import { Release, Track } from "@/entities/all";
import { Play, ExternalLink, Calendar, Disc3, Music2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAudio } from "../components/audio/GlobalAudioPlayer";

export default function MusicPage() {
  const [releases, setReleases] = useState([]);
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const audio = useAudio();

  useEffect(() => {
    loadReleases();
  }, []);

  const loadReleases = async () => {
    setIsLoading(true);
    const data = await Release.list("-release_date");
    setReleases(data);
    setIsLoading(false);
  };

  const loadTracks = async (releaseId) => {
    const data = await Track.filter({ release_id: releaseId }, "track_number");
    setTracks(data);
  };

  const handleReleaseClick = async (release) => {
    setSelectedRelease(release);
    await loadTracks(release.id);
  };

  const handlePlayRelease = (release, releaseTracks) => {
    if (releaseTracks.length > 0) {
      const trackList = releaseTracks.map(t => ({
        ...t,
        artist: release.artist,
        coverArt: release.cover_art_url
      }));
      audio.playTrack(trackList[0], trackList);
    }
  };

  if (selectedRelease) {
    return (
      <div className="min-h-screen bg-black">
        {/* Release Detail Hero */}
        <div className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            {selectedRelease.cover_art_url ? (
              <img
                src={selectedRelease.cover_art_url}
                alt={selectedRelease.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-black" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-end pb-12">
            <div className="flex flex-col md:flex-row gap-8 items-end">
              {selectedRelease.cover_art_url ? (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={selectedRelease.cover_art_url}
                  alt={selectedRelease.title}
                  className="w-64 h-64 object-cover rounded-lg shadow-2xl"
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-64 h-64 rounded-lg shadow-2xl bg-zinc-800 border border-white/10 flex items-center justify-center flex-shrink-0"
                >
                  <Disc3 className="w-20 h-20 text-zinc-600" />
                </motion.div>
              )}
              <div className="pb-4">
                <div className="inline-block px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-xs font-semibold mb-3 border border-red-600/30 uppercase">
                  {selectedRelease.release_type}
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  {selectedRelease.title}
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  {selectedRelease.artist} • {new Date(selectedRelease.release_date).getFullYear()}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handlePlayRelease(selectedRelease, tracks)}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Play
                  </button>
                  <button
                    onClick={() => setSelectedRelease(null)}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all backdrop-blur-sm"
                  >
                    Back to Releases
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Track List */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {selectedRelease.description && (
            <p className="text-gray-400 mb-8 max-w-2xl">
              {selectedRelease.description}
            </p>
          )}

          <h2 className="text-2xl font-bold mb-6">Tracks</h2>
          {tracks.length > 0 ? (
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <span className="text-gray-500 w-8 text-center">{track.track_number}</span>
                  <button
                    onClick={() => {
                      const trackList = tracks.map(t => ({
                        ...t,
                        artist: selectedRelease.artist,
                        coverArt: selectedRelease.cover_art_url
                      }));
                      audio.playTrack({ ...track, artist: selectedRelease.artist, coverArt: selectedRelease.cover_art_url }, trackList);
                    }}
                    className="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Play className="w-4 h-4" fill="currentColor" />
                  </button>
                  <div className="flex-1">
                    <div className="font-medium">{track.title}</div>
                    {track.is_preview && (
                      <div className="text-xs text-gray-500">Preview • {track.duration}</div>
                    )}
                    {!track.is_preview && track.duration && (
                      <div className="text-xs text-gray-500">{track.duration}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Music2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>No tracks available for this release yet.</p>
            </div>
          )}

          {/* Streaming Links */}
          {(selectedRelease.spotify_url || selectedRelease.apple_music_url || selectedRelease.bandcamp_url) && (
            <div className="mt-12 p-8 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4">Listen On</h3>
              <div className="flex flex-wrap gap-4">
                {selectedRelease.spotify_url && (
                  <a
                    href={selectedRelease.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    Spotify <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedRelease.apple_music_url && (
                  <a
                    href={selectedRelease.apple_music_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    Apple Music <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedRelease.bandcamp_url && (
                  <a
                    href={selectedRelease.bandcamp_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    Bandcamp <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black py-12 px-4">
      {/* Hero with workbench texture */}
      <div className="absolute top-20 left-0 right-0 h-64 opacity-10 pointer-events-none" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />

      {/* Turntable spin in corner */}
      <motion.div
        className="fixed bottom-8 right-8 w-32 h-32 rounded-full opacity-20 hidden lg:block pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{
          background: 'radial-gradient(circle, rgba(163, 18, 26, 0.4) 30%, transparent 70%)',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Discography</h1>
          <p className="text-xl text-gray-400">
            Explore our complete collection of releases
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-white/5 rounded-lg mb-4" />
                <div className="h-6 bg-white/5 rounded mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : releases.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {releases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleReleaseClick(release)}
                className="group cursor-pointer"
              >
                {/* Vinyl sleeve with slide-out effect */}
                <motion.div
                  className="relative overflow-visible rounded-lg mb-4 aspect-square"
                  whileHover={{ x: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Vinyl record peeking out */}
                  <motion.div
                    className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-[90%] aspect-square rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-0"
                    style={{
                      background: 'radial-gradient(circle, #0A0C0F 45%, #A3121A 48%, #0A0C0F 50%, transparent 75%)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
                    }}
                  />

                  <img
                    src={release.cover_art_url || `https://images.unsplash.com/photo-${1514320291840 + index}?w=800`}
                    alt={release.title}
                    className="relative z-10 w-full h-full object-cover rounded-lg shadow-2xl"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center z-20">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-sm text-xs font-semibold rounded-full border border-white/20 uppercase">
                      {release.release_type}
                    </span>
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-red-500 transition-colors">
                  {release.title}
                </h3>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(release.release_date).getFullYear()}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Disc3 className="w-20 h-20 mx-auto mb-6 text-gray-700" />
            <p className="text-xl text-gray-500">No releases yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
