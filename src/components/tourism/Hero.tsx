import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Headphones, 
  Map, 
  Palmtree, 
  Castle, 
  Coffee, 
  CalendarDays, 
  Compass
} from "lucide-react";
import tourismMain from "../../assets/tourism main.png";

const categories = [
  { icon: <Compass className="w-5 h-5 text-brand-gold" />, title: "Spiritual Trails", subtitle: "Temples & Heritage" },
  { icon: <Map className="w-5 h-5 text-brand-gold" />, title: "Cultural Tours", subtitle: "Festivals & Traditions" },
  { icon: <Palmtree className="w-5 h-5 text-brand-gold" />, title: "Nature Escapes", subtitle: "Rivers, Wildlife & Parks" },
  { icon: <Castle className="w-5 h-5 text-brand-gold" />, title: "Historical Places", subtitle: "Museums & Monuments" },
  { icon: <CalendarDays className="w-5 h-5 text-brand-gold" />, title: "Weekend Getaways", subtitle: "Short Trips" },
  { icon: <Coffee className="w-5 h-5 text-brand-gold" />, title: "Food & Local", subtitle: "Experiences" }
];

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col pt-32 pb-24 md:pb-0 justify-center">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={tourismMain}
          alt="Bihar Tourism"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col h-full justify-center mt-[-8vh]">
        {/* Main Content */}
        <div className="w-full md:w-3/5 lg:w-1/2 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 block font-sans">
              EXPLORE THE SOUL OF BIHAR
            </span>

            <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-6">
              Journeys That <br /> Stay <span className="text-brand-gold italic font-light">With You</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl max-w-md mb-10 font-medium leading-relaxed">
              From ancient temples to peaceful riversides, Bihar welcomes you with stories, spirituality and culture.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold bg-black/20 backdrop-blur-sm">
                  <ShieldCheck size={18} />
                </div>
                <div className="text-white leading-tight">
                  <p className="text-sm font-bold text-white/90">Trusted Local</p>
                  <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Partners</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold bg-black/20 backdrop-blur-sm">
                  <ShieldCheck size={18} />
                </div>
                <div className="text-white leading-tight">
                  <p className="text-sm font-bold text-white/90">Verified &</p>
                  <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Safe</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold bg-black/20 backdrop-blur-sm">
                  <Headphones size={18} />
                </div>
                <div className="text-white leading-tight">
                  <p className="text-sm font-bold text-white/90">24/7 Travel</p>
                  <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Support</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Category Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-4 z-20 hidden md:block"
      >
        <div className="bg-[#FAF8F5] rounded-2xl shadow-xl p-2 px-6 flex justify-between items-center border border-brand-gold/20 divide-x divide-gray-200">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-3 px-4 py-4 hover:bg-white transition-colors cursor-pointer rounded-lg group">
              <div className="p-2 rounded-full bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors">
                {cat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-brand-dark leading-tight">{cat.title}</span>
                <span className="text-[10px] text-gray-500 mt-0.5">{cat.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
