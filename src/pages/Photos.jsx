import React, { useState, useEffect } from "react";
import { Photo } from "@/entities/all";
import { Camera, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const data = await Photo.list("-shoot_date");
    setPhotos(data);
  };

  const filteredPhotos = (filter === "all" ? photos : photos.filter(p => p.category === filter))
    .filter(p => p.image_url || p.thumbnail_url);

  const filters = [
    { value: "all", label: "All Photos" },
    { value: "promo", label: "Promo" },
    { value: "live", label: "Live" },
    { value: "studio", label: "Studio" },
    { value: "press", label: "Press" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Photos</h1>
          <p className="text-xl text-gray-400">
            Behind the scenes, on stage, and everything in between
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

        {filteredPhotos.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedPhoto(photo)}
                className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-xl"
              >
                <img
                  src={photo.thumbnail_url || photo.image_url}
                  alt={photo.title || 'Photo'}
                  className="w-full rounded-xl group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {photo.title && (
                      <p className="font-semibold mb-1">{photo.title}</p>
                    )}
                    {photo.photographer && (
                      <p className="text-xs text-gray-300">Photo by {photo.photographer}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Camera className="w-20 h-20 mx-auto mb-6 text-gray-700" />
            <h3 className="text-2xl font-bold mb-3 text-gray-300">Coming Soon</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Photos are being prepared. Check back soon for live shots, promo photos, and studio sessions.</p>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {selectedPhoto.image_url && (
                <a
                  href={selectedPhoto.image_url}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-4 right-16 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                >
                  <Download className="w-6 h-6" />
                </a>
              )}

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-6xl max-h-[90vh] relative"
              >
                <img
                  src={selectedPhoto.image_url}
                  alt={selectedPhoto.title || 'Photo'}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                {(selectedPhoto.title || selectedPhoto.photographer) && (
                  <div className="mt-4 text-center">
                    {selectedPhoto.title && (
                      <h3 className="text-xl font-bold mb-1">{selectedPhoto.title}</h3>
                    )}
                    {selectedPhoto.photographer && (
                      <p className="text-gray-400">Photo by {selectedPhoto.photographer}</p>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}