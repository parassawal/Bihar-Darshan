import Navbar from "../components/layout/Navbar";
import TourismSection from "../components/tourism/TourismSection";
import Footer from "../components/layout/Footer";
import { motion } from "framer-motion";

const Tourism = () => {
  return (
    <main className="min-h-screen bg-brand-gray">
      <Navbar />

      {/* Page Hero - Compact Size Structure */}
      <section className="relative pt-40 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2000&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-50"
            alt="Bihar Tourism"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/20 to-brand-dark" />
          <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-brand-gold/20"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-brand-gold border border-brand-gold/30 rounded-full"
          >
            Travel Experts
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Explore <span className="text-brand-gold">Bihar</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Connect with local experts to discover the hidden gems and rich history of the Land of Enlightenment.
          </motion.p>
        </div>
      </section>

      {/* Tourism Partners Section */}
      <TourismSection />

      <Footer />
    </main>
  );
};

export default Tourism;
