import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Award, ShieldCheck, Star } from "lucide-react";

interface TourOperator {
  id: number;
  companyName: string;
  guideName: string;
  experience: string;
  locations: string[];
  description: string;
  mobile: string;
  email: string;
  website: string;
  image: string;
}

const operators: TourOperator[] = [
  {
    id: 1,
    companyName: "Magadh Heritage Travels",
    guideName: "Rakesh Kumar",
    experience: "12 Years in Buddhist Circuit",
    locations: ["Gaya", "Nalanda", "Rajgir", "Vaishali"],
    description: "Specializing in spiritual and historical tours of Bihar, focusing on the rich Buddhist heritage and ancient university ruins. We provide deep historical insights and comfortable logistics.",
    mobile: "+91 98765 43210",
    email: "contact@magadhheritage.com",
    website: "www.magadhheritage.com",
    image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    companyName: "Mithila Cultural Tours",
    guideName: "Sunita Mishra",
    experience: "8 Years in Art & Culture Tours",
    locations: ["Madhubani", "Darbhanga", "Sitamari"],
    description: "Immerse yourself in the world-famous Madhubani art and Mithila culture. We organize workshops with local artists and village visits for an authentic cultural experience.",
    mobile: "+91 87654 32109",
    email: "info@mithilatours.in",
    website: "www.mithilatours.in",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    companyName: "Vishwa Shanti Expeditions",
    guideName: "Amit Singh",
    experience: "15 Years Adventure & Wildlife",
    locations: ["Valmiki Tiger Reserve", "Kaimur Hills", "Kakolat"],
    description: "Explore the wild side of Bihar. From tiger sightings in Valmiki to the breathtaking waterfalls of Kakolat, we bring you closer to nature with professional safety standards.",
    mobile: "+91 76543 21098",
    email: "expeditions@vishwashanti.com",
    website: "www.vishwashanti.com",
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    companyName: "Patna City Walkers",
    guideName: "Deepak Varma",
    experience: "10 Years Urban History",
    locations: ["Patna Sahib", "Golghar", "Bihar Museum"],
    description: "Discover the layers of history in the ancient city of Pataliputra. We offer curated walking tours through the heritage streets and modern landmarks of Patna.",
    mobile: "+91 65432 10987",
    email: "walks@patnacity.com",
    website: "www.advaita.com",
    image: "https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?q=80&w=800&auto=format&fit=crop",
  },
];

const TourismSection = () => {
  return (
    <section className="py-20 px-6 sm:px-10 bg-brand-gray min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-gold/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-brand-gold/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-brand-gold/40" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-gold">
              Tourism Partners
            </span>
            <div className="h-px w-8 bg-brand-gold/40" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif italic text-brand-dark mb-4">
            Official <span className="text-brand-gold">Bihar</span> Partners
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 text-base font-medium leading-relaxed">
            Reliable guides for an authentic experience.
          </p>
        </motion.div>

        {/* 2 boxes per row grid - Balanced Structure */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10">
          {operators.map((op, idx) => (
            <motion.div
              key={op.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col md:flex-row min-h-[380px]"
            >
              {/* Image Side - Moderate Structure */}
              <div className="md:w-[38%] relative overflow-hidden min-h-[240px] md:min-h-full">
                <img
                  src={op.image}
                  alt={op.companyName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-6 left-6">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-white/20 flex items-center gap-2">
                    <Star size={12} className="fill-brand-gold text-brand-gold" />
                    <span className="text-[9px] font-bold text-brand-dark uppercase tracking-wider">Top Rated</span>
                  </div>
                </div>
              </div>

              {/* Content Side - Proportional & Clean */}
              <div className="md:w-[62%] p-8 lg:p-10 flex flex-col justify-between relative">
                <div>
                  <div className="flex items-center gap-2 text-brand-gold mb-2">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Verified</span>
                  </div>
                  <h3 className="text-2xl font-serif text-brand-dark mb-3 group-hover:text-brand-gold transition-colors duration-500 leading-tight">
                    {op.companyName}
                  </h3>
                  <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 text-[11px] font-bold text-gray-500 mb-5">
                    <Award size={14} className="text-brand-gold" />
                    {op.experience.split(' ')[0]} Yrs Exp
                  </div>

                  <p className="text-gray-500 text-xs leading-relaxed mb-6 italic line-clamp-2">
                    "{op.description}"
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
                        <MapPin size={16} className="text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Destinations</p>
                        <p className="text-[13px] font-bold text-brand-dark truncate max-w-[200px]">{op.locations.join(", ")}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                          <Phone size={14} className="text-brand-gold" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Mobile</p>
                          <p className="text-[13px] font-bold text-brand-dark">{op.mobile.split(' ')[1]}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                          <Mail size={14} className="text-brand-gold" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Email</p>
                          <p className="text-[13px] font-bold text-brand-dark truncate">{op.email.split('@')[0]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-brand-dark text-white flex items-center justify-center text-xs font-bold ring-4 ring-gray-50">
                      {op.guideName.charAt(0)}
                    </div>
                    <span className="text-[11px] font-bold text-brand-dark">{op.guideName}</span>
                  </div>
                  <button className="h-11 px-6 rounded-xl bg-brand-dark text-white font-bold text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all duration-500 shadow-lg active:scale-95">
                    Enquire
                  </button>
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute top-0 right-0 p-10 pointer-events-none">
                <div className="w-32 h-32 bg-brand-gold/5 blur-3xl rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourismSection;
