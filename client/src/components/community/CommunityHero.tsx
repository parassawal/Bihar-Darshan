import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import bgImage from '../../assets/community-banner.jpg';

interface CommunityHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const CommunityHero = ({ searchQuery, onSearchChange }: CommunityHeroProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] w-full flex flex-col pt-32 pb-24 md:pb-0 justify-center">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Bihar Community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col h-full justify-center">
        {/* Main Content */}
        <div className="w-full md:w-3/5 lg:w-1/2 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 block font-sans">
              CONNECT & SHARE
            </span>

            <h1 className="font-display font-bold text-5xl md:text-7xl text-white leading-[1.1] mb-6">
              Bihar Darshan
              <span className="text-brand-gold italic font-light block mt-2">Community</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl max-w-md mb-8 font-medium leading-relaxed">
              Connect with fellow travellers, locals and explorers. Join communities, ask questions and share your experiences.
            </p>

            {/* Search Bar */}
            <div
              className={`relative flex items-center bg-white/10 backdrop-blur-md border rounded-xl transition-all duration-300 max-w-md mb-10 ${
                focused
                  ? 'border-brand-gold bg-white/15 shadow-[0_0_20px_rgba(212,160,23,0.15)]'
                  : 'border-white/20'
              }`}
            >
              <Search
                size={18}
                className={`ml-4 shrink-0 transition-colors duration-300 ${
                  focused ? 'text-brand-gold' : 'text-white/50'
                }`}
              />
              <input
                type="text"
                placeholder="Search communities, topics..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="flex-1 bg-transparent text-white placeholder-white/40 px-3 py-3.5 text-sm outline-none"
              />
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHero;
