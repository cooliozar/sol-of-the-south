
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Release, Show, Post } from "@/entities/all";
import { Play, Calendar, ArrowRight, Disc3 } from "lucide-react";
import { motion } from "framer-motion";
import HeroEmblem from "../components/HeroEmblem";

export default function Home() {
  const [featuredRelease, setFeaturedRelease] = useState(null);
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const releases = await Release.filter({ featured: true }, "-release_date", 1);
    if (releases.length > 0) {
      setFeaturedRelease(releases[0]);
    } else {
      const allReleases = await Release.list("-release_date", 1);
      if (allReleases.length > 0) setFeaturedRelease(allReleases[0]);
    }

    const shows = await Show.filter({ status: "upcoming" }, "date", 3);
    setUpcomingShows(shows);

    const posts = await Post.filter({ published: true }, "-published_date", 3);
    setLatestNews(posts);
  };

  return (
    <div className="min-h-screen page--home pb-20">
      {/* Hero Section - Garage Entrance with Iconic Emblem */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Base layer - deep black */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #0A0C0F 0%, #000000 50%, #0A0C0F 100%)'
        }} />

        {/* Snakeskin/leather texture mosaic */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=1920")',
          backgroundSize: '600px',
          backgroundPosition: 'center',
        }} />

        {/* Worn leather overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1565118531258-05f9bc52d07a?w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply'
        }} />

        {/* ICONIC EMBLEM BACKGROUND */}
        <HeroEmblem />

        {/* Corner amp stacks */}
        <div className="absolute bottom-0 left-0 w-72 h-[400px] opacity-20 hidden lg:block" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3) contrast(1.2)'
        }} />

        <div className="absolute bottom-0 right-0 w-72 h-[400px] opacity-20 hidden lg:block" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scaleX(-1)',
          filter: 'brightness(0.3) contrast(1.2)'
        }} />

        {/* Wall hooks with guitars - with subtle sway */}
        <motion.div
          className="absolute top-24 left-12 w-24 h-56 opacity-15 hidden xl:block"
          animate={{
            rotate: [-10, -9, -10],
            x: [0, -2, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=300")',
            backgroundSize: 'cover',
            filter: 'brightness(0.25) saturate(0.7)'
          }}
        />

        <motion.div
          className="absolute top-32 right-16 w-24 h-56 opacity-15 hidden xl:block"
          animate={{
            rotate: [8, 9, 8],
            x: [0, 2, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=300")',
            backgroundSize: 'cover',
            filter: 'brightness(0.25) saturate(0.7)'
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo with subtle glow */}
            <div className="mb-8">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/a8cdd6157_3220DDD0-9D91-4FA9-9A65-2A1F140D95D8.png"
                alt="Sol of the South"
                className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(163, 18, 26, 0.4)) drop-shadow(0 0 60px rgba(227, 46, 46, 0.2))'
                }}
              />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight display-font text-gray-100">
              Sol of the South
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 tracking-wide font-medium">
              Heavy Riffs. Soulful Melodies. Pure Southern Rock.
            </p>
            
            {/* Stompbox CTAs with pulsing LEDs */}
            <div className="flex flex-wrap gap-6 justify-center">
              <Link
                to={createPageUrl("Music")}
                className="group relative"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-5 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-300"
                  style={{
                    background: 'linear-gradient(180deg, #A3121A 0%, #E02E2E 50%, #A3121A 100%)',
                    boxShadow: '0 0 30px rgba(163, 18, 26, 0.4), 0 6px 20px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.4)',
                    border: '3px solid #701010',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5" fill="currentColor" />
                    <span>Listen Now</span>
                  </div>
                  {/* Pulsing LED */}
                  <motion.div
                    className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"
                    animate={{
                      boxShadow: [
                        '0 0 8px rgba(239, 68, 68, 0.8), inset 0 1px 1px rgba(255,255,255,0.3)',
                        '0 0 12px rgba(239, 68, 68, 1), inset 0 1px 1px rgba(255,255,255,0.3)',
                        '0 0 8px rgba(239, 68, 68, 0.8), inset 0 1px 1px rgba(255,255,255,0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </Link>
              
              <Link
                to={createPageUrl("Shows")}
                className="group relative"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-5 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-300"
                  style={{
                    background: 'linear-gradient(180deg, #141821 0%, #1C2433 50%, #141821 100%)',
                    boxShadow: '0 0 20px rgba(46, 167, 255, 0.3), 0 6px 20px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.1), inset 0 -3px 6px rgba(0,0,0,0.5)',
                    border: '3px solid #2EA7FF',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span>Tour Dates</span>
                  </div>
                  {/* Pulsing LED */}
                  <motion.div
                    className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-blue-400"
                    animate={{
                      boxShadow: [
                        '0 0 8px rgba(96, 165, 250, 0.8), inset 0 1px 1px rgba(255,255,255,0.3)',
                        '0 0 12px rgba(96, 165, 250, 1), inset 0 1px 1px rgba(255,255,255,0.3)',
                        '0 0 8px rgba(96, 165, 250, 0.8), inset 0 1px 1px rgba(255,255,255,0.3)'
                      ]
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{
          background: 'linear-gradient(to top, #0A0C0F, transparent)'
        }} />
      </section>

      {/* Featured Release */}
      {featuredRelease && (
        <section className="py-20 px-4 relative">
          {/* Subtle vignette */}
          <div className="absolute inset-0 opacity-40" style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10, 12, 15, 0.9))'
          }} />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Album art with neon edge */}
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden group-hover:rotate-0" style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
                  border: '1px solid rgba(163, 18, 26, 0.3)',
                  transform: 'rotate(-1.5deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  <img
                    src={featuredRelease.cover_art_url || "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800"}
                    alt={featuredRelease.title}
                    className="w-full aspect-square object-cover"
                  />
                  {/* Neon edge glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
                    boxShadow: 'inset 0 0 40px rgba(227, 46, 46, 0.4)'
                  }} />
                </div>
              </div>
              
              <div>
                {/* Sticker tag */}
                <div className="inline-block px-4 py-2 mb-4 rounded-md text-xs font-bold uppercase tracking-widest"
                  style={{
                    background: 'linear-gradient(135deg, #A3121A, #E02E2E)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                    border: '1px solid #701010'
                  }}
                >
                  Latest Release
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-4 display-font text-gray-100">
                  {featuredRelease.title}
                </h2>
                
                <p className="text-lg text-gray-300 mb-6">
                  {featuredRelease.description || `${featuredRelease.release_type.toUpperCase()} • ${new Date(featuredRelease.release_date).getFullYear()}`}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={createPageUrl("Music")}
                    className="px-6 py-3 font-semibold rounded-lg transition-all flex items-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #A3121A, #E02E2E)',
                      boxShadow: '0 4px 12px rgba(163, 18, 26, 0.4)',
                      border: '1px solid #701010'
                    }}
                  >
                    <Disc3 className="w-5 h-5" />
                    View Album
                  </Link>
                  
                  {featuredRelease.spotify_url && (
                    <a
                      href={featuredRelease.spotify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 font-semibold rounded-lg transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #1DB954, #1ed760)',
                        boxShadow: '0 4px 12px rgba(29, 185, 84, 0.4)'
                      }}
                    >
                      Spotify
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Upcoming Shows */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2 display-font text-gray-100">
                Upcoming Shows
              </h2>
              <p className="text-gray-400 uppercase tracking-wide text-sm font-semibold">
                Catch us live on tour
              </p>
            </div>
            <Link
              to={createPageUrl("Shows")}
              className="text-red-500 hover:text-red-400 flex items-center gap-2 font-semibold transition-colors"
            >
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {upcomingShows.length > 0 ? (
            <div className="grid gap-4">
              {upcomingShows.map((show, index) => (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="panel group rounded-xl overflow-hidden"
                  style={{
                    background: 'rgba(16, 19, 23, 0.92)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(169, 180, 194, 0.1)'
                  }}
                >
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Date box */}
                      <div className="rounded-lg px-4 py-3 text-center min-w-[70px]" style={{
                        background: 'linear-gradient(135deg, #A3121A, #E02E2E)',
                        boxShadow: '0 2px 8px rgba(163, 18, 26, 0.4), inset 0 -2px 4px rgba(0,0,0,0.3)'
                      }}>
                        <div className="text-2xl font-bold">
                          {new Date(show.date).getDate()}
                        </div>
                        <div className="text-[10px] uppercase font-bold tracking-wider opacity-90">
                          {new Date(show.date).toLocaleString('default', { month: 'short' })}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-1 display-font group-hover:text-red-400 transition-colors">
                          {show.venue}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium">
                          {show.city}, {show.state}
                        </p>
                      </div>
                    </div>
                    
                    {show.ticket_url && (
                      <a
                        href={show.ticket_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-6 py-2.5 font-semibold rounded-lg transition-all whitespace-nowrap text-sm"
                        style={{
                          background: 'linear-gradient(135deg, #A3121A, #E02E2E)',
                          boxShadow: '0 2px 8px rgba(163, 18, 26, 0.4)',
                          border: '1px solid #701010'
                        }}
                      >
                        Get Tickets
                      </a>
                    )}
                  </div>
                  {/* Thin neon edge on hover */}
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 panel rounded-xl" style={{
              background: 'rgba(16, 19, 23, 0.6)',
              border: '1px solid rgba(169, 180, 194, 0.1)'
            }}>
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-700" />
              <p className="text-gray-500">No upcoming shows at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-2 display-font text-gray-100">
                  Latest News
                </h2>
                <p className="text-gray-400 uppercase tracking-wide text-sm font-semibold">
                  Stay updated with the band
                </p>
              </div>
              <Link
                to={createPageUrl("News")}
                className="text-red-500 hover:text-red-400 flex items-center gap-2 font-semibold transition-colors"
              >
                View All <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {latestNews.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={`${createPageUrl("News")}?post=${post.id}`}
                    className="block group"
                  >
                    <div className="relative overflow-hidden rounded-xl mb-4 aspect-video" style={{
                      boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                      border: '1px solid rgba(169, 180, 194, 0.1)'
                    }}>
                      {post.cover_image_url && (
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      {/* Neon edge on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
                        boxShadow: 'inset 0 0 30px rgba(163, 18, 26, 0.3)'
                      }} />
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 display-font group-hover:text-red-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    
                    <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide">
                      {new Date(post.published_date || post.created_date).toLocaleDateString()}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
