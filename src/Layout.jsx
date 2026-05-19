import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Music, Calendar, Video, Camera, Newspaper, Users, FileText, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import GlobalAudioPlayer, { AudioProvider } from "./components/audio/GlobalAudioPlayer";

function LayoutContent({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Hide layout on landing page
  const isLandingPage = location.pathname === createPageUrl("Landing") || location.pathname === "/";

  // Set favicons and meta
  React.useEffect(() => {
    const existingIcons = document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"]');
    existingIcons.forEach(icon => icon.remove());

    const head = document.head;

    const faviconIco = document.createElement('link');
    faviconIco.rel = 'icon';
    faviconIco.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/5c43e95f6_IMG_0447.png';
    faviconIco.sizes = 'any';
    head.appendChild(faviconIco);

    const favicon32 = document.createElement('link');
    favicon32.rel = 'icon';
    favicon32.type = 'image/png';
    favicon32.sizes = '32x32';
    favicon32.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/5c43e95f6_IMG_0447.png';
    head.appendChild(favicon32);

    const favicon64 = document.createElement('link');
    favicon64.rel = 'icon';
    favicon64.type = 'image/png';
    favicon64.sizes = '64x64';
    favicon64.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/a44741d7f_IMG_0448.png';
    head.appendChild(favicon64);

    const favicon128 = document.createElement('link');
    favicon128.rel = 'icon';
    favicon128.type = 'image/png';
    favicon128.sizes = '128x128';
    favicon128.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/25022e75c_IMG_0450.png';
    head.appendChild(favicon128);

    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.sizes = '180x180';
    appleTouchIcon.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/57e50bf05_FCDB9AAD-1FD5-4546-A1F8-DBA06A128464.png';
    head.appendChild(appleTouchIcon);

    document.title = 'Sol of the South - Heavy Riffs. Soulful Melodies.';

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = '#0A0C0F';

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      head.appendChild(ogImage);
    }
    ogImage.content = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/a8cdd6157_3220DDD0-9D91-4FA9-9A65-2A1F140D95D8.png';

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      head.appendChild(ogTitle);
    }
    ogTitle.content = 'Sol of the South';

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      head.appendChild(ogDescription);
    }
    ogDescription.content = 'Heavy Riffs. Soulful Melodies. Pure Southern Rock from Fort Worth, Texas.';
  }, []);

  const navigation = [
    { name: "Home", path: createPageUrl("Home"), icon: null },
    { name: "Music", path: createPageUrl("Music"), icon: Music },
    { name: "Shows", path: createPageUrl("Shows"), icon: Calendar },
    { name: "Videos", path: createPageUrl("Videos"), icon: Video },
    { name: "Photos", path: createPageUrl("Photos"), icon: Camera },
    { name: "News", path: createPageUrl("News"), icon: Newspaper },
    { name: "About", path: createPageUrl("About"), icon: Users },
    { name: "Merch", path: createPageUrl("Merch"), icon: ShoppingBag },
    { name: "Press", path: createPageUrl("Press"), icon: FileText },
  ];

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (isLandingPage) {
    return children;
  }

  return (
    <>
      {/* Navigation - Amp Head Style */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{
        background: 'linear-gradient(180deg, #0A0C0F 0%, #101317 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.9), inset 0 -1px 0 rgba(169, 180, 194, 0.1)',
        borderBottom: '2px solid #1C1F26'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/0d7907283_FCDB9AAD-1FD5-4546-A1F8-DBA06A128464.png"
                  alt="Sol of the South"
                  className="h-12 w-12 object-contain hidden md:block transition-transform group-hover:scale-105"
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(163, 18, 26, 0.4))' }}
                />
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/0d7907283_FCDB9AAD-1FD5-4546-A1F8-DBA06A128464.png"
                  alt="SOTS"
                  className="h-10 w-10 object-contain md:hidden transition-transform group-hover:scale-105"
                />
              </div>
              <div className="hidden lg:block">
                <h1 className="text-lg font-bold tracking-tight text-gray-100">
                  Sol of the South
                </h1>
                <p className="text-[10px] text-gray-500 tracking-widest uppercase font-semibold">Fort Worth, Texas</p>
              </div>
            </Link>

            {/* Desktop Navigation - Amp Knobs */}
            <div className="hidden lg:flex items-center gap-3">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 group"
                    style={{
                      background: isActive ? 'rgba(163, 18, 26, 0.15)' : 'transparent',
                      border: '1px solid ' + (isActive ? 'rgba(163, 18, 26, 0.3)' : 'transparent')
                    }}
                  >
                    {item.icon && <item.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors" />}
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-200 transition-colors uppercase tracking-wide">
                      {item.name}
                    </span>
                    {/* LED indicator */}
                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-gray-700'}`} />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button - Guitar Pick Style */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 rounded-lg transition-colors"
              style={{
                background: 'linear-gradient(135deg, #141821, #0A0C0F)',
                border: '1px solid rgba(169, 180, 194, 0.2)'
              }}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-800"
              style={{
                background: 'linear-gradient(180deg, #101317, #0A0C0F)'
              }}
            >
              <div className="px-4 py-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
                      style={{
                        background: isActive ? 'rgba(163, 18, 26, 0.15)' : 'transparent',
                        border: '1px solid ' + (isActive ? 'rgba(163, 18, 26, 0.3)' : 'transparent'),
                        color: isActive ? '#E5E7EB' : '#9CA3AF'
                      }}
                    >
                      {item.icon && <item.icon className="w-5 h-5" />}
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer - Guitar Case Sticker Strip */}
      <footer className="relative mt-20" style={{
        background: 'linear-gradient(180deg, #0A0C0F, #141821)',
        boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.8)',
        borderTop: '2px solid #1C1F26'
      }}>
        {/* Flight case edge detail */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{
          background: 'repeating-linear-gradient(90deg, #2C3038 0px, #2C3038 8px, #1C1F26 8px, #1C1F26 16px)'
        }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68db427c63bc74db5bf8280e/a8cdd6157_3220DDD0-9D91-4FA9-9A65-2A1F140D95D8.png"
              alt="Sol of the South"
              className="h-24 w-24 object-contain opacity-90"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 text-center md:text-left">
              <h3 className="text-lg font-bold mb-4 text-gray-200 uppercase tracking-wider">
                Sol of the South
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Southern rock band bringing heavy riffs and soulful melodies to stages worldwide.
              </p>
              
              {/* Social stickers */}
              <div className="flex gap-3 justify-center md:justify-start">
                {[
                  { name: 'YouTube',   url: 'http://www.youtube.com/@SoloftheSouth',        bg: '#FF0000' },
                  { name: 'Instagram', url: 'https://www.instagram.com/solofthesouth/',     bg: '#E4405F' },
                  { name: 'Facebook',  url: 'https://www.facebook.com/solofthesouth',       bg: '#1877F2' },
                  { name: 'TikTok',    url: 'https://www.tiktok.com/@solofthesouth',        bg: '#010101' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded flex items-center justify-center transition-transform hover:scale-110"
                    style={{
                      background: social.bg,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
                    }}
                    aria-label={social.name}
                  >
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-gray-300 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2">
                {['Music', 'Shows', 'Merch', 'Press'].map((link) => (
                  <li key={link}>
                    <Link 
                      to={createPageUrl(link)} 
                      className="text-gray-400 hover:text-gray-200 transition-colors text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-gray-300 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>booking@solofthesouth.com</li>
                <li>press@solofthesouth.com</li>
                <li>info@solofthesouth.com</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
            <p>&copy; {new Date().getFullYear()} Sol of the South. All rights reserved.</p>
            <p className="mt-1 text-gray-600">Fort Worth, Texas • Est. 2020</p>
          </div>
        </div>
      </footer>

      {/* Global Audio Player */}
      <GlobalAudioPlayer />
    </>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen text-white" style={{ background: '#0A0C0F' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        h1, h2, h3, h4, h5, h6, .display-font {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
        }

        /* Film grain overlay */
        body::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.06;
          pointer-events: none;
          z-index: 9998;
          mix-blend-mode: overlay;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #0A0C0F;
          border-left: 1px solid #1C1F26;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #2C3038, #1C1F26);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #3C4048, #2C3038);
        }

        /* Focus states for accessibility */
        *:focus-visible {
          outline: 2px solid #E02E2E;
          outline-offset: 2px;
        }
      `}</style>

      <AudioProvider>
        <LayoutContent>{children}</LayoutContent>
      </AudioProvider>
    </div>
  );
}