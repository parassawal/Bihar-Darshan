import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import biharHeritage from "../../assets/bihar-heritage.png";
import DistrictsPageMap from "../districts/DistrictsPageMap";

const BiharMapSection = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMapSelect = (name: string | null) => {
    if (name) {
      navigate(`/districts/${name.toLowerCase()}`);
    } else {
      setSelectedDistrict(null);
    }
  };

  const handleMapHover = () => {
    // No-op for hovering on the main page
  };

  return (
    <section id="map" className="relative bihar-map-section py-0 overflow-hidden">
      {/* Dark heritage background matching Districts page */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={biharHeritage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1510]/92 via-[#1e1912]/88 to-[#15110d]/92" />
        {/* Subtle warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#D4A017]/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 bihar-map-container">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Header */}
            <div className="mb-8 sm:mb-10 text-center">
              <p className="text-gold-light text-sm font-semibold uppercase tracking-widest mb-2">
                Interactive
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight">
                Bihar District Map
              </h2>
              <p className="text-white/60 mt-3 text-sm sm:text-base max-w-xl mx-auto">
                Hover to explore and click to select a district.
              </p>
            </div>

            {/* Map Container */}
            <div className="relative mx-auto max-w-[1000px] rounded-2xl overflow-hidden select-none">
              <DistrictsPageMap
                selectedDistrict={selectedDistrict}
                hoveredCardDistrict={null}
                onSelectDistrict={handleMapSelect}
                onHoverDistrict={handleMapHover}
              />
            </div>

            {/* Selected District Info */}
            {selectedDistrict && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="w-3 h-3 rounded-full bg-gold" />
                  <span className="text-white font-semibold text-lg">
                    {selectedDistrict}
                  </span>
                  <button
                    onClick={() => setSelectedDistrict(null)}
                    className="ml-2 text-white/50 hover:text-white transition-colors text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BiharMapSection;
