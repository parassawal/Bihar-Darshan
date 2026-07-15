import { motion } from "framer-motion";
import { Landmark, Map, Utensils, Sparkles, MessageSquare, ArrowRight, Compass, Play } from "lucide-react";
import heroVideo from "../../assets/hero-video.mp4";
import type { SiteSettings } from "../../data/AdminContext";

interface HeroSectionProps {
  settings?: SiteSettings;
}

const HeroSection = ({ settings }: HeroSectionProps) => {
  return (
    <section id="home" className="relative min-h-screen lg:h-screen py-24 lg:py-0 overflow-hidden">
      {/* Hero Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] lg:h-full text-center px-4 pb-12 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="font-display italic text-5xl sm:text-7xl lg:text-[100px] text-white leading-[1.1] tracking-normal drop-shadow-2xl">
            {settings ? settings.heroTitle : "Discover the Soul of"}
            <br />
            <span className="text-brand-gold block mt-2">{settings ? settings.heroSubtitle : "Bihar"}</span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-6 sm:mt-8"
          >
            <p className="text-white/95 text-base sm:text-lg md:text-xl max-w-4xl mx-auto font-normal leading-relaxed drop-shadow-lg px-4">
              {settings ? settings.heroDescription : "Ancient ruins, sacred temples, breathtaking landscapes, living festivals, authentic cuisines and stories waiting to be explored through immersive storytelling."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a
              href="#places"
              className="px-10 py-4 rounded-[2rem] bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Explore Places
            </a>
            <a
              href="#districts"
              className="px-10 py-4 rounded-[2rem] border border-white/50 text-white font-semibold text-base hover:bg-white/10 transition-all duration-300 hover:border-white backdrop-blur-sm"
            >
              View Districts
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Stats Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="relative lg:absolute mt-8 lg:mt-0 lg:bottom-10 left-0 lg:left-1/2 lg:-translate-x-1/2 w-full max-w-7xl px-4 z-20"
      >
        <div className="border border-white/20 rounded-[2rem] lg:rounded-[3rem] py-6 lg:py-8 px-6 lg:px-16 flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-4 transition-all duration-500 hover:border-white/40">
          <StatItem icon={<Landmark size={24} strokeWidth={1.2} />} value="500+" label="Attractions" />
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <StatItem icon={<Map size={24} strokeWidth={1.2} />} value="38" label="Districts" />
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <StatItem icon={<Utensils size={24} strokeWidth={1.2} />} value="100+" label="Local Foods" />
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <StatItem icon={<Sparkles size={24} strokeWidth={1.2} />} value="50+" label="Festivals" />
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <StatItem icon={<MessageSquare size={24} strokeWidth={1.2} />} value="1000+" label="Stories" />
        </div>
      </motion.div>
    </section>
  );
};

const StatItem = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => (
  <div className="flex items-center gap-3 group">
    <div className="text-gold flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
      {icon}
    </div>
    <div className="flex flex-col">
      <p className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none mb-0.5">{value}</p>
      <p className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em]">{label}</p>
    </div>
  </div>
);

export default HeroSection;
