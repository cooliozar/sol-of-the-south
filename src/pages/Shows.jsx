
import React, { useState, useEffect } from "react";
import { Show } from "@/entities/all";
import { Calendar, MapPin, ExternalLink, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function ShowsPage() {
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [pastShows, setPastShows] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    loadShows();
  }, []);

  const loadShows = async () => {
    const upcoming = await Show.filter({ status: "upcoming" }, "date");
    const past = await Show.filter({ status: "past" }, "-date", 20);
    setUpcomingShows(upcoming);
    setPastShows(past);
  };

  const ShowCard = ({ show, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative"
    >
      {/* Stapled flyer effect with ripple */}
      <motion.div
        className="absolute -top-2 left-8 w-6 h-6 bg-gray-600 rounded-full z-10"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, 0, -2, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
        animate={{
          rotate: [0, 0.3, 0, -0.3, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5
        }}
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Date Badge */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex flex-col items-center justify-center text-center shadow-lg">
                <div className="text-2xl font-bold">
                  {format(new Date(show.date), 'd')}
                </div>
                <div className="text-xs uppercase tracking-wider">
                  {format(new Date(show.date), 'MMM')}
                </div>
              </div>
            </div>

            {/* Show Info */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                {show.venue}
              </h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{show.city}, {show.state} {show.country !== 'USA' && `• ${show.country}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{format(new Date(show.date), 'EEEE, MMMM d, yyyy • h:mm a')}</span>
                </div>
              </div>
              {show.notes && (
                <p className="mt-3 text-sm text-gray-500">{show.notes}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              {show.ticket_url && (
                <motion.a
                  href={show.ticket_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap relative overflow-hidden group/ticket"
                  style={{
                    background: 'linear-gradient(135deg, #A3121A, #E02E2E)',
                    boxShadow: '0 2px 8px rgba(163, 18, 26, 0.4)',
                    border: '1px solid #701010'
                  }}
                >
                  {/* Ticket perforation glow on hover */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover/ticket:opacity-100"
                    style={{
                      background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 4px, transparent 4px, transparent 8px)',
                      boxShadow: '0 0 8px rgba(255,255,255,0.5)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  Get Tickets
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
              {show.venue_url && (
                <a
                  href={show.venue_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  Venue Info
                </a>
              )}
              {show.map_url && (
                <a
                  href={show.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  Directions
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black py-12 px-4">
      {/* Gig wall texture */}
      <div className="absolute top-0 left-0 right-0 h-screen opacity-15 pointer-events-none" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1551622045-4c7445ecabf5?w=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Tour Dates</h1>
          <p className="text-xl text-gray-400">
            Catch us live - Get your tickets now
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === "upcoming"
                ? "text-red-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Upcoming Shows
            {activeTab === "upcoming" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === "past"
                ? "text-red-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Past Shows
            {activeTab === "past" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
              />
            )}
          </button>
        </div>

        {/* Show Lists */}
        {activeTab === "upcoming" && (
          <div className="space-y-4">
            {upcomingShows.length > 0 ? (
              upcomingShows.map((show, index) => (
                <ShowCard key={show.id} show={show} index={index} />
              ))
            ) : (
              <div className="text-center py-20">
                <Calendar className="w-20 h-20 mx-auto mb-6 text-gray-700" />
                <h3 className="text-2xl font-bold mb-2">No Upcoming Shows</h3>
                <p className="text-gray-500">Check back soon for new tour dates!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "past" && (
          <div className="space-y-4">
            {pastShows.length > 0 ? (
              pastShows.map((show, index) => (
                <ShowCard key={show.id} show={show} index={index} />
              ))
            ) : (
              <div className="text-center py-20">
                <Calendar className="w-20 h-20 mx-auto mb-6 text-gray-700" />
                <p className="text-gray-500">No past shows recorded yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
