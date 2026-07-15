import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import bodhGaya from "../../assets/bodh-gaya.png";
import patna from "../../assets/patna-district.png"; // Let's try to use this or a generic
import rajgir from "../../assets/rajgir.png";
import nalanda from "../../assets/nalanda.png";
import vaishali from "../../assets/vaishali.png";
import sasaram from "../../assets/S.jpg"; // Based on earlier list

const destinations = [
  { image: bodhGaya, name: "Bodh Gaya", desc: "The land of enlightenment" },
  { image: patna, name: "Patna", desc: "The historic capital" },
  { image: rajgir, name: "Rajgir", desc: "Nature, history & spirituality" },
  { image: nalanda, name: "Nalanda", desc: "Where knowledge began" },
  { image: vaishali, name: "Vaishali", desc: "Land of peace and heritage" },
  { image: sasaram, name: "Sasaram", desc: "The City of Sher Shah" },
];

const TopDestinations = () => {
  return (
    <section className="py-24 bg-[#F8F5EF]">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-3"
            >
              <span className="text-[#c19a5b] text-[11px] font-bold uppercase tracking-[0.2em]">
                TOP DESTINATIONS
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif text-[#3e2723] flex items-center gap-4"
            >
              Places You Must Visit
              <div className="hidden md:block h-[2px] w-12 bg-[#c19a5b]" />
            </motion.h2>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-[#3e2723] hover:text-[#c19a5b] transition-colors border border-[#3e2723]/20 px-4 py-2 rounded-full hover:border-[#c19a5b]">
            View all destinations <ArrowRight size={16} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Bihar+Destination'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1e16]/90 via-[#2c1e16]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white text-left z-10">
                <h3 className="text-2xl font-bold font-serif mb-1">{dest.name}</h3>
                <p className="text-sm font-medium text-white/80">{dest.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;
