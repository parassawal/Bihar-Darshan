import { motion } from "framer-motion";
import heroImage from "../../assets/hero.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Hero Background */}
      <img
        src={heroImage}
        alt="Bihar Heritage Monument"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[1.1] tracking-tight">
            Discover the
            <br />
            Soul of{" "}
            <span className="text-gold italic">Bihar</span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 sm:mt-10"
          >
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
              Explore ancient heritage, vibrant culture, and timeless beauty
              across 38 districts
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#places"
              className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-dark text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              Explore Places
            </a>
            <a
              href="#districts"
              className="px-8 py-3.5 rounded-full border border-white/25 text-white font-medium text-sm tracking-wide hover:bg-white/10 transition-all duration-300"
            >
              View Districts
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default HeroSection;
