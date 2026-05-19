
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Award, Users, MapPin } from "lucide-react";

export default function AboutPage() {
  const [spotlightPos, setSpotlightPos] = useState(0);

  // Spotlight sweep animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotlightPos(prev => (prev + 1) % 100);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const milestones = [
    { 
      year: "2022", 
      event: "Band Formation & Debut EP", 
      description: "Four Fort Worth musicians unite with a shared vision. Released 'Demo Sessions' EP, capturing raw southern rock energy." 
    },
    { 
      year: "2023", 
      event: "Midnight Revival Album & First Tour", 
      description: "Debut full-length album 'Midnight Revival' drops. First regional tour across Texas and Oklahoma, building a dedicated fanbase." 
    },
    { 
      year: "2024", 
      event: "Festival Circuit & Label Deal", 
      description: "Played major Texas festivals. Signed with independent label Red Mesa Records. Sold out shows across the Southwest." 
    },
    { 
      year: "2025", 
      event: "High Plains Thunder EP", 
      description: "Released 'High Plains Thunder' EP, showcasing evolved sound. Planning biggest tour yet with expanded reach across the South." 
    }
  ];

  const bandMembers = [
    {
      name: "Trey",
      role: "Vocals & Guitar",
      bio: "The driving force behind Sol of the South, Trey's powerful vocals and commanding guitar work anchor the band's signature sound. A Fort Worth native with deep roots in southern rock.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400"
    },
    {
      name: "Ivey",
      role: "Drums",
      bio: "The heartbeat of the band, Ivey's explosive drumming brings raw energy and precision. Known for thunderous live performances that shake venues to their core.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    {
      name: "Jackson",
      role: "Guitar",
      bio: "A guitar virtuoso with blues and country influences, Jackson's soulful solos and intricate riffs add depth and emotion to every track.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
    },
    {
      name: "Bobby",
      role: "Bass",
      bio: "The foundation of Sol of the South's heavy sound, Bobby's bass lines drive the rhythm with power and groove, holding down the low end with authority.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Hero Section with graffiti wall */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Concrete wall texture */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1565118531258-05f9bc52d07a?w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />

        {/* Spotlight sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent ${spotlightPos - 15}%, rgba(255,255,255,0.08) ${spotlightPos}%, transparent ${spotlightPos + 15}%)`
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{
              textShadow: '3px 3px 0 #A3121A, 6px 6px 0 rgba(0,0,0,0.3)'
            }}>About the Band</h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Born from the fiery spirit of Southern rock and forged in the crucible of modern heavy music, 
              Sol of the South delivers a sound that's both timeless and revolutionary.
            </p>
          </motion.div>
        </div>

        {/* Floating posters with flutter */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-48 opacity-10 hidden lg:block pointer-events-none"
            animate={{
              rotate: [2 * (i - 1), 3 * (i - 1), 2 * (i - 1)],
              y: [0, -3, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            style={{
              background: 'rgba(163, 18, 26, 0.3)',
              border: '2px solid rgba(163, 18, 26, 0.5)',
              top: `${20 + i * 25}%`,
              [i % 2 === 0 ? 'left' : 'right']: '5%'
            }}
          />
        ))}
      </section>

      {/* Bio Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Formed in Fort Worth, TX in 2022, Sol of the South brings together four lifelong 
              musicians with a shared love for heavy riffs, soulful melodies, and the timeless 
              spirit of southern rock. With Trey (vocals, guitar), Ivey (drums), Jackson (guitar), 
              and Bobby (bass), the band has quickly gained a reputation for electrifying live 
              performances and heartfelt songwriting.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Drawing inspiration from the Texas landscape and the rich tradition of southern rock, 
              Sol of the South crafts music that's both powerful and authentic. Their sound blends 
              crushing riffs with melodic hooks, creating anthems that resonate with anyone who's 
              ever felt the call of the open road.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              From their debut EP "Demo Sessions" to their latest release "High Plains Thunder," 
              the band has consistently pushed themselves to grow while staying true to their roots. 
              Whether playing intimate clubs or festival stages, Sol of the South delivers 
              performances that leave audiences wanting more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Band Members with hover effects */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The Lineup</h2>
            <p className="text-xl text-gray-400">Four musicians, one vision</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bandMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                {/* Polaroid-style photo with tilt and tape curl on hover */}
                <motion.div
                  className="relative"
                  whileHover={{ rotate: [-1, 3, -2, 4], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Tape at top */}
                  <motion.div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-yellow-100 opacity-60 z-10"
                    style={{
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      transform: 'rotate(-2deg)'
                    }}
                    whileHover={{
                      scaleY: [1, 0.9, 1.1, 1],
                      rotate: [-2, -3, -1, -2]
                    }}
                  />
                  
                  <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-white p-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Duct tape name tag */}
                  <div className="absolute bottom-4 left-0 right-0 mx-4 px-2 py-1 text-center font-bold text-xs"
                    style={{
                      background: 'linear-gradient(180deg, #6B7280, #4B5563)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                    }}
                  >
                    <span className="text-white">{member.name} - {member.role}</span>
                  </div>
                </motion.div>
                
                <p className="text-gray-400 text-sm mt-4">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400">From Fort Worth to the world</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 via-orange-600 to-red-600 hidden md:block" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-8 items-start"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center font-bold text-sm relative z-10">
                    {milestone.year}
                  </div>
                  <div className="flex-1 bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold mb-2">{milestone.event}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Music, label: "Releases", value: "3" },
              { icon: MapPin, label: "States Toured", value: "4" },
              { icon: Users, label: "Shows Played", value: "50+" },
              { icon: Award, label: "Years Rocking", value: "3" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MapPin className="w-16 h-16 mx-auto mb-6 text-red-500" />
            <h2 className="text-3xl font-bold mb-4">Fort Worth, Texas</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Proud to call Fort Worth home. The spirit of Texas flows through every song we write 
              and every show we play. From the local clubs where we cut our teeth to stages across 
              the country, we carry the Lone Star State with us everywhere we go.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
