import { useState } from 'react';
import { Search } from 'lucide-react';
import bgImage from '../../assets/bihar-folk-dance.png';

interface CommunityHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const CommunityHero = ({ searchQuery, onSearchChange }: CommunityHeroProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <section className="relative min-h-[400px] flex items-center overflow-hidden pt-32 pb-16">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Bihar Community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-1">
            Bihar Darshan
          </h1>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            <span className="text-amber-400">Community</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-8 leading-relaxed">
            Connect with fellow travellers, locals and explorers.
            <br />
            Join communities, ask questions and share your experiences.
          </p>

          {/* Search */}
          <div
            className={`relative flex items-center bg-white/10 backdrop-blur-md border rounded-xl transition-all duration-300 ${focused
                ? 'border-amber-400 bg-white/15 shadow-lg shadow-amber-400/10'
                : 'border-white/20'
              }`}
          >
            <Search
              size={18}
              className={`ml-4 shrink-0 transition-colors duration-300 ${focused ? 'text-amber-400' : 'text-white/50'
                }`}
            />
            <input
              type="text"
              placeholder="Search communities, topics or keywords..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 bg-transparent text-white placeholder-white/40 px-3 py-3.5 text-sm outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHero;
