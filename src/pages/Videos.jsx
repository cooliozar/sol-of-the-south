import React, { useState, useEffect } from "react";
import { Video } from "@/entities/all";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const data = await Video.list("-published_date");
    setVideos(data);
  };

  const filteredVideos = filter === "all" 
    ? videos 
    : videos.filter(v => v.video_type === filter);

  const getEmbedUrl = (video) => {
    if (video.youtube_id) {
      return `https://www.youtube.com/embed/${video.youtube_id}`;
    }
    if (video.vimeo_id) {
      return `https://player.vimeo.com/video/${video.vimeo_id}`;
    }
    return null;
  };

  const filters = [
    { value: "all", label: "All Videos" },
    { value: "music_video", label: "Music Videos" },
    { value: "live_performance", label: "Live" },
    { value: "behind_the_scenes", label: "Behind the Scenes" },
    { value: "interview", label: "Interviews" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Videos</h1>
          <p className="text-xl text-gray-400">
            Music videos, live performances, and more
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === value
                  ? "bg-red-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {filteredVideos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl aspect-video bg-zinc-900 mb-3">
                  {video.thumbnail_url ? (
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-16 h-16 text-gray-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/80 backdrop-blur-sm text-xs font-semibold rounded uppercase">
                      {video.video_type?.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold mb-1 group-hover:text-red-500 transition-colors">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {video.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Play className="w-20 h-20 mx-auto mb-6 text-gray-700" />
            <h3 className="text-2xl font-bold mb-3 text-gray-300">Coming Soon</h3>
            <p className="text-gray-500 max-w-sm mx-auto">We're currently editing footage. Check back soon for music videos and live performances.</p>
          </div>
        )}

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedVideo(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-5xl"
                >
                  <div className="aspect-video rounded-xl overflow-hidden mb-4">
                    {getEmbedUrl(selectedVideo) ? (
                      <iframe
                        src={getEmbedUrl(selectedVideo)}
                        title={selectedVideo.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : selectedVideo.video_url ? (
                      <video
                        key={selectedVideo.id}
                        src={selectedVideo.video_url}
                        poster={selectedVideo.thumbnail_url || undefined}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-contain bg-black"
                        preload="metadata"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 relative flex items-center justify-center">
                        {selectedVideo.thumbnail_url && (
                          <img
                            src={selectedVideo.thumbnail_url}
                            alt={selectedVideo.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                          />
                        )}
                        <div className="relative z-10 text-center px-6">
                          <Play className="w-14 h-14 mx-auto mb-4 text-gray-500" />
                          <p className="text-gray-300 font-semibold text-lg mb-1">Full video coming soon</p>
                          <p className="text-gray-500 text-sm">Video hosting is being set up. Check back shortly.</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                  {selectedVideo.description && (
                    <p className="text-gray-400">{selectedVideo.description}</p>
                  )}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}