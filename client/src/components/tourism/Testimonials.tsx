import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stories = [
  {
    name: "Ananya Sharma",
    location: "Delhi",
    text: "The Bodh Gaya experience was beyond words. So peaceful and soulful.",
    avatar: "https://i.pravatar.cc/150?u=ananya"
  },
  {
    name: "Rahul Verma",
    location: "Kolkata",
    text: "Exploring Nalanda and Rajgir felt like stepping back in history.",
    avatar: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    name: "Meera Iyer",
    location: "Bangalore",
    text: "Bihar's culture, food and people made our trip unforgettable.",
    avatar: "https://i.pravatar.cc/150?u=meera"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#FCEBD3]">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-[#8B3E2F] mb-3"
            >
              Traveller Stories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base text-[#8B3E2F]"
            >
              Real experiences from people who explored Bihar.
            </motion.p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-[#8B3E2F] hover:text-[#F4A261] transition-colors border border-[#8B3E2F]/20 px-4 py-2 rounded-full hover:border-[#F4A261]">
            View all stories <ArrowRight size={16} />
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[#FFFFEF] border border-[#FCEBD3] p-8 rounded-2xl flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Background decorative elements */}
              <div className="absolute right-0 bottom-0 opacity-5 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/mandala.png')] bg-cover pointer-events-none" />
              
              <div className="flex items-start gap-4 mb-6 relative z-10">
                <span className="text-4xl text-[#F4A261] font-serif leading-none mt-[-5px]">“</span>
                <p className="text-[#8B3E2F] text-sm font-medium italic leading-relaxed">
                  {story.text}
                </p>
              </div>

              <div className="mt-auto flex items-center gap-4 relative z-10">
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-12 h-12 rounded-full border-2 border-[#FCEBD3] object-cover"
                />
                <div>
                  <h4 className="font-bold text-[#8B3E2F] text-sm">{story.name}</h4>
                  <p className="text-[11px] text-[#8B3E2F] uppercase tracking-wider">{story.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
