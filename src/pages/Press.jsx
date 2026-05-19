
import React from "react";
import { FileText, Download, Image, Mail, ExternalLink, Music, Phone, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function PressPage() {
  const pressKit = [
    {
      title: "High-Resolution Photos",
      description: "Professional band photos and promotional images",
      icon: Image,
      items: [
        { name: "Band Promo Pack 2025 (8 images)", size: "42 MB", format: "ZIP" },
        { name: "Individual Member Photos", size: "15 MB", format: "ZIP" },
        { name: "Live Performance Shots", size: "28 MB", format: "ZIP" },
        { name: "Press-Approved Images", size: "35 MB", format: "ZIP" }
      ]
    },
    {
      title: "Press Releases & Bio",
      description: "Official band information and recent news",
      icon: FileText,
      items: [
        { name: "Official Band Bio (One-Pager)", size: "180 KB", format: "PDF" },
        { name: "Extended Bio & History", size: "420 KB", format: "PDF" },
        { name: "'High Plains Thunder' Press Release", size: "250 KB", format: "PDF" },
        { name: "Tour Announcement Press Release", size: "210 KB", format: "PDF" }
      ]
    },
    {
      title: "Music & Assets",
      description: "Audio files, logos, and promotional materials",
      icon: Music,
      items: [
        { name: "Logo Pack (PNG, SVG, EPS)", size: "8 MB", format: "ZIP" },
        { name: "Sample Tracks (Hi-Res MP3)", size: "62 MB", format: "ZIP" },
        { name: "Album Artwork Collection", size: "18 MB", format: "ZIP" },
        { name: "Stage Plot & Tech Rider", size: "1.2 MB", format: "PDF" }
      ]
    }
  ];

  const mediaFeatures = [
    {
      outlet: "Fort Worth Star-Telegram",
      title: "Local Band Sol of the South Takes Texas by Storm",
      date: "September 2025",
      link: "#"
    },
    {
      outlet: "Texas Music Magazine",
      title: "High Plains Thunder: A Fresh Voice in Southern Rock",
      date: "September 2025",
      link: "#"
    },
    {
      outlet: "Dallas Observer",
      title: "5 Texas Bands You Need to Hear Right Now",
      date: "August 2024",
      link: "#"
    },
    {
      outlet: "Guitar World Online",
      title: "Trey and Jackson's Dual Guitar Attack Explained",
      date: "June 2024",
      link: "#"
    },
    {
      outlet: "Alternative Press",
      title: "Sol of the South Brings Southern Rock to New Generation",
      date: "March 2024",
      link: "#"
    }
  ];

  const quickFacts = {
    "Band Name": "Sol of the South",
    "Genre": "Southern Rock / Hard Rock",
    "Formed": "2022",
    "Location": "Fort Worth, Texas",
    "Members": "Trey, Ivey, Jackson, Bobby",
    "Latest Release": "High Plains Thunder EP (2025)",
    "Label": "Red Mesa Records",
    "Booking": "Available for festivals & venues"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Electronic Press Kit</h1>
          <p className="text-xl text-gray-400">
            Official press materials and media resources for Sol of the South
          </p>
        </motion.div>

        {/* Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-br from-red-600/10 to-orange-600/10 border border-red-600/20 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Facts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(quickFacts).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="text-sm text-gray-400 mb-1">{key}</div>
                <div className="text-lg font-semibold">{value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* One Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-white/5 rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-6">Band Bio</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Formed in Fort Worth, TX in 2022, <strong>Sol of the South</strong> brings together 
              four lifelong musicians with a shared love for heavy riffs, soulful melodies, and 
              the timeless spirit of southern rock. With Trey (vocals, guitar), Ivey (drums), 
              Jackson (guitar), and Bobby (bass), the band has quickly gained a reputation for 
              electrifying live performances and heartfelt songwriting.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Their sound blends the raw power of modern hard rock with the soul and swagger of 
              classic southern rock, creating anthems that resonate across generations. From their 
              2022 debut "Demo Sessions" to their latest release "High Plains Thunder" (2025), 
              Sol of the South has consistently pushed the boundaries while honoring their Texas roots.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              The band has toured extensively across Texas, Oklahoma, and neighboring states, 
              building a dedicated fanbase through relentless gigging and authentic connection 
              with audiences. Now signed to independent label Red Mesa Records, Sol of the South 
              is poised to bring their explosive live show to bigger stages nationwide.
            </p>
          </div>
        </motion.div>

        {/* Press Kit Downloads */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Download Press Materials</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pressKit.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-sm text-gray-400 mb-6">{category.description}</p>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <button
                      key={item.name}
                      className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                    >
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium mb-1">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.size} • {item.format}</div>
                      </div>
                      <Download className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2 text-lg">
              <Download className="w-5 h-5" />
              Download Complete Press Kit
            </button>
            <p className="text-sm text-gray-500 mt-3">Full press kit including all materials (165 MB)</p>
          </motion.div>
        </div>

        {/* Recent Media Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Recent Media Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {mediaFeatures.map((feature, index) => (
              <motion.a
                key={index}
                href={feature.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group"
              >
                <div className="flex-1">
                  <div className="text-red-500 text-sm font-semibold mb-1">{feature.outlet}</div>
                  <h3 className="font-bold mb-2 group-hover:text-red-500 transition-colors">
                    {feature.title}
                  </h3>
                  <div className="text-sm text-gray-500">{feature.date}</div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-12"
        >
          <div className="text-center mb-8">
            <Mail className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Press & Media Inquiries</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              For interviews, features, booking inquiries, or additional press materials, 
              please contact our team using the information below.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span className="font-semibold">Press & Media</span>
              </div>
              <a href="mailto:press@solofthesouth.com" className="hover:underline">
                press@solofthesouth.com
              </a>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">Booking Agent</span>
              </div>
              <a href="mailto:booking@solofthesouth.com" className="hover:underline">
                booking@solofthesouth.com
              </a>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span className="font-semibold">Management</span>
              </div>
              <a href="mailto:management@redmesarecords.com" className="hover:underline">
                management@redmesarecords.com
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-white/80">
              Response time: Usually within 24-48 hours
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
