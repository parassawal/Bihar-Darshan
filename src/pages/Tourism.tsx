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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-10 bg-brand-gold/40" />
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-brand-gold">
                Exclusive Journeys
              </span>
              <div className="h-px w-10 bg-brand-gold/40" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif italic text-white mb-6">
              Discover <span className="text-brand-gold underline decoration-brand-gold/20 underline-offset-8">Bihar</span> Like Never Before
            </h1>
            <p className="max-w-2xl mx-auto text-gray-300 text-lg font-medium leading-relaxed">
              Curated travel experiences with our premium local partners.
            </p>
          </motion.div>
        </div>
      </section>
      <TourismSection />

      <Footer />
    </main>
  );
};

export default Tourism;
