import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import cultureBanner from "../../assets/culture-banner-custom.png";

const CustomiseJourney = () => {
  return (
    <section className="py-12 bg-[#FCEBD3]">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-3xl overflow-hidden bg-[#FFFFEF] border border-[#FCEBD3] shadow-sm flex flex-col md:flex-row items-center"
        >
          {/* Background Illustration Overlay */}
          <div 
            className="absolute right-0 top-0 h-full w-full md:w-2/3 bg-no-repeat bg-cover md:bg-contain bg-right opacity-60 mix-blend-multiply pointer-events-none"
            style={{ backgroundImage: `url(${cultureBanner})` }}
          />

          {/* Content */}
          <div className="relative z-10 p-10 md:p-16 md:w-1/2 flex flex-col items-start text-left">
            <span className="text-[#F4A261] text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
              TRAVEL DEEPER, EXPERIENCE MORE
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#8B3E2F] mb-4 leading-tight">
              Customise Your <br />
              <span className="italic text-[#F4A261]">Perfect</span> Journey
            </h2>
            <p className="text-[#8B3E2F] text-base mb-8 max-w-sm">
              Tell us your preference and we'll curate the best experience for you.
            </p>
            <button className="flex items-center gap-3 bg-[#8B3E2F] hover:bg-[#8B3E2F] text-white px-8 py-3 rounded-full font-bold text-sm transition-colors group shadow-md">
              Plan Your Trip 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomiseJourney;
