import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface PlaceCardProps {
  image: string;
  name: string;
  district: string;
  index: number;
}

const PlaceCard = ({ image, name, district, index }: PlaceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex-shrink-0 w-[260px] sm:w-[280px] cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Plus Button */}
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-black transition-all duration-300 cursor-pointer">
          <Plus size={18} />
        </button>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-semibold text-lg leading-tight">
            {name}
          </h3>
          <p className="text-white/70 text-sm mt-1">{district}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceCard;
