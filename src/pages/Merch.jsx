
import React, { useState, useEffect } from "react";
import { MerchItem } from "@/entities/all";
import { ShoppingBag, ExternalLink, Package } from "lucide-react";
import { motion } from "framer-motion";

export default function MerchPage() {
  const [merchItems, setMerchItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMerch();
  }, []);

  const loadMerch = async () => {
    setIsLoading(true);
    const data = await MerchItem.list();
    setMerchItems(data);
    setIsLoading(false);
  };

  const filteredItems = filter === "all" 
    ? merchItems 
    : merchItems.filter(item => item.category === filter);

  const filters = [
    { value: "all", label: "All Items" },
    { value: "apparel", label: "Apparel" },
    { value: "vinyl", label: "Vinyl" },
    { value: "cd", label: "CDs" },
    { value: "accessories", label: "Accessories" },
    { value: "bundles", label: "Bundles" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black py-12 px-4">
      {/* Merch booth texture */}
      <div className="absolute top-20 left-0 right-0 h-96 opacity-10 pointer-events-none" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />

      {/* Flickering neon edge light */}
      <motion.div
        className="fixed top-1/3 right-0 w-2 h-64 opacity-0 pointer-events-none hidden lg:block"
        animate={{
          opacity: [0, 0.6, 0, 0.8, 0],
          boxShadow: [
            '0 0 20px rgba(46, 167, 255, 0)',
            '0 0 40px rgba(46, 167, 255, 0.8)',
            '0 0 20px rgba(46, 167, 255, 0)',
            '0 0 50px rgba(46, 167, 255, 1)',
            '0 0 20px rgba(46, 167, 255, 0)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'linear-gradient(180deg, transparent, #2EA7FF, transparent)'
        }}
      />

      {/* Logo Watermark */}
      <div className="fixed top-24 left-4 opacity-5 pointer-events-none hidden lg:block z-0">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/0d7907283_FCDB9AAD-1FD5-4546-A1F8-DBA06A128464.png"
          alt=""
          className="w-32 h-32 object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Official Merch</h1>
          <p className="text-xl text-gray-400">
            Support the band and wear your fandom with pride
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                filter === value
                  ? "bg-red-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-white/5 rounded-xl mb-4" />
                <div className="h-6 bg-white/5 rounded mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative"
              >
                {/* Hanger sway effect */}
                <motion.div
                  animate={{
                    rotate: [0, 0.5, 0, -0.5, 0], // Subtle sway
                    y: [0, -1, 0] // Subtle up/down
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                >
                  {/* Sol of the South Certified Badge */}
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="relative">
                      <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/0d7907283_FCDB9AAD-1FD5-4546-A1F8-DBA06A128464.png"
                        alt="SOTS Certified"
                        className="w-12 h-12 object-contain"
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                      />
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-zinc-900">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700">
                        <Package className="w-20 h-20" />
                      </div>
                    )}
                    {!item.in_stock && (
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <span className="px-4 py-2 bg-red-600 rounded-lg font-semibold">
                          Sold Out
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-black/80 backdrop-blur-sm text-xs font-semibold rounded-full border border-white/20 uppercase">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors">
                    {item.name}
                  </h3>
                  
                  {item.description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {item.sizes && item.sizes.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.sizes.map(size => (
                        <span key={size} className="px-2 py-1 bg-white/5 rounded text-xs">
                          {size}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-500">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.purchase_url ? (
                      <motion.a
                        href={item.purchase_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 relative overflow-hidden ${
                          item.in_stock
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-white/10 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={!item.in_stock ? (e) => e.preventDefault() : undefined}
                      >
                        {/* Laminated crinkle effect on hover */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                          style={{
                            background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                          }}
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        {item.in_stock ? (
                          <>
                            Buy Now
                            <ExternalLink className="w-4 h-4" />
                          </>
                        ) : (
                          "Sold Out"
                        )}
                      </motion.a>
                    ) : (
                      <button className="px-4 py-2 bg-white/10 text-gray-500 rounded-lg font-semibold cursor-not-allowed">
                        Coming Soon
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-gray-700" />
            <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
            <p className="text-gray-500 mb-8">
              {filter === "all"
                ? "Merch is currently being prepared. Check back soon."
                : "Nothing in this category yet. More items on the way."}
            </p>
          </div>
        )}

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-600/30 rounded-2xl p-8 text-center"
        >
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h3 className="text-2xl font-bold mb-2">Looking for More?</h3>
          <p className="text-gray-300 mb-4">
            Visit our shows for exclusive tour merchandise and limited edition items!
          </p>
          <p className="text-sm text-gray-400">
            All proceeds directly support the band and help us bring you more music and shows.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
