import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black py-12 px-4">
      {/* Corkboard texture */}
      <div className="absolute top-20 left-0 right-0 bottom-0 opacity-15 pointer-events-none" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />

      {/* Overhead bulb flicker */}
      <motion.div
        className="fixed top-32 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full opacity-0 pointer-events-none"
        animate={{
          opacity: [0, 0.10, 0.08, 0.10, 0.09, 0.10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          times: [0, 0.1, 0.2, 0.5, 0.7, 0.9, 1]
        }}
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2), transparent)',
          filter: 'blur(60px)'
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-400">
            Questions, bookings, or just want to say hi? Drop us a line.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form - Notepad Style */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Tape strips */}
            <div className="absolute -top-4 left-8 w-16 h-8 bg-yellow-100 opacity-60 transform -rotate-12" style={{
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }} />
            <div className="absolute -top-4 right-8 w-16 h-8 bg-yellow-100 opacity-60 transform rotate-12" style={{
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }} />

            <div className="bg-amber-50 p-8 rounded-lg" style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(200,200,200,0.3) 31px, rgba(200,200,200,0.3) 32px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-400 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                    style={{ fontFamily: 'cursive' }}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-400 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-600"
                    style={{ fontFamily: 'cursive' }}
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="6"
                    className="w-full px-0 py-2 bg-transparent border-0 text-gray-900 placeholder-gray-500 focus:outline-none resize-none"
                    style={{ fontFamily: 'cursive', lineHeight: '32px' }}
                    required
                  />
                </div>
                
                {/* Cassette eject button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98, y: 2 }}
                  className="w-full px-6 py-4 font-bold uppercase tracking-wider relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #4B5563, #1F2937)',
                    boxShadow: '0 4px 0 #0A0C0F, 0 6px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                    color: '#E5E7EB'
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </div>
                  {/* Cassette hole details */}
                  <div className="absolute top-2 left-4 w-6 h-6 rounded-full border-2 border-gray-700" style={{
                    background: 'radial-gradient(circle, transparent 40%, #1F2937 40%)'
                  }} />
                  <div className="absolute top-2 right-4 w-6 h-6 rounded-full border-2 border-gray-700" style={{
                    background: 'radial-gradient(circle, transparent 40%, #1F2937 40%)'
                  }} />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Email Us</h3>
                  <a href="mailto:info@solofthesouth.com" className="text-gray-400 hover:text-gray-200 transition-colors">
                    info@solofthesouth.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Location</h3>
                  <p className="text-gray-400">
                    Fort Worth, Texas<br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Bookings</h3>
                  <a href="mailto:booking@solofthesouth.com" className="text-gray-400 hover:text-gray-200 transition-colors">
                    booking@solofthesouth.com
                  </a>
                </div>
              </div>
            </div>

            {/* Scattered stickers and guitar picks */}
            <div className="relative mt-8 h-32">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-16 h-16 rounded-full opacity-40"
                  style={{
                    background: i === 0 ? '#A3121A' : i === 1 ? '#2EA7FF' : '#F59E0B',
                    top: `${i * 30}px`,
                    left: `${i * 60}px`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}
                  whileHover={{
                    rotate: [0, 180, 360],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold">
                    SOTS
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}