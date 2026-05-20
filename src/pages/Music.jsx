import React from "react";
import { Disc3 } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Music</h1>
          <p className="text-xl text-gray-400">
            Releases, singles, and more
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center py-24"
        >
          <Disc3 className="w-20 h-20 mx-auto mb-6 text-gray-700" />
          <h2 className="text-3xl font-bold mb-4 text-gray-200">Coming Soon</h2>
          <p className="text-gray-500 max-w-md mx-auto text-lg">
            Music and release information is being prepared. Check back soon.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
