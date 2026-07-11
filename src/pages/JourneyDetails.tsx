import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Globe,
  Phone,
  MessageSquare,
  Maximize2,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Navigation,
  ShieldCheck,
  Coffee,
  Camera,
  Car,
  BriefcaseMedical,
  Quote,
  ArrowRight
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import PremiumFooter from "../components/tourism/PremiumFooter";
import JourneyCard from "../components/tourism/JourneyCard";
import { featuredTrips } from "../data/tourismData";

// Amenities mapping
const AMENITIES = [
  { icon: ShieldCheck, label: "Luxury Stay" },
  { icon: Navigation, label: "Private Guide" },
  { icon: Coffee, label: "Premium Meals" },
  { icon: Camera, label: "Photography" },
  { icon: Car, label: "Luxury Transport" },
  { icon: BriefcaseMedical, label: "Medical Support" },
];

const JourneyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const currentTrip = featuredTrips.find((t) => t.id === id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!currentTrip) {
    return <Navigate to="/tourism" replace />;
  }

  const relatedTrips = featuredTrips.filter((t) => t.id !== id).slice(0, 3);

  // Gallery Memories (using actual gallery or fallbacks)
  const memories = currentTrip.galleryImages.map((url, idx) => ({
    id: idx,
    url,
    category: idx === 0 ? "Destination" : idx === 1 ? "Premium Stay" : "Traveler Moment",
    title: idx === 0 ? "Breathtaking Sights" : idx === 1 ? "Luxury Accommodations" : "Creating Memories",
    className: idx === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"
  }));
  // Fill if less than 5
  if (memories.length < 5) {
      memories.push({
          id: 99,
          url: "https://images.unsplash.com/photo-1542314831-c6a4d14d8387?q=80&w=1000",
          category: "Accommodation",
          title: "Resort Life",
          className: "md:col-span-1 md:row-span-1"
      });
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#2A2A2A] selection:bg-[#C89A3D] selection:text-white font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Decorative Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] mix-blend-multiply">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
      </div>

      {/* ========================
          SECTION 1: Premium Hero
          ======================== */}
      <section className="relative h-[75vh] w-full overflow-hidden flex items-end">
        {/* Parallax Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
          <img
            src={currentTrip.image}
            alt={currentTrip.title}
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" />
        </motion.div>

        {/* Back Navigation */}
        <div className="absolute top-28 left-6 md:left-12 z-20">
          <Link
            to="/tourism"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Experiences
          </Link>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px] relative z-10 pb-16 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          {/* Left Side */}
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#C89A3D] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">
                Luxury Experience
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight font-light mb-6">
                {currentTrip.title}
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                {currentTrip.overviewText.slice(0, 150)}...
              </p>
            </motion.div>

        {/* Stats Row Removed */}
          </div>

          {/* Right Side Glass Card Removed */}
        </div>
      </section>

      {/* ========================
          SECTION 2: Story & Guide
          ======================== */}
      <section className="py-[120px] container mx-auto px-6 md:px-12 max-w-[1280px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Column (65%) */}
          <div className="lg:w-[65%] space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-8 font-light">
                The Journey
              </h2>
              
              <blockquote className="relative p-8 bg-white rounded-2xl border border-[#E8E0D4] shadow-sm mb-12">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-[#C89A3D] opacity-20" />
                <p className="text-2xl font-serif text-[#2A2A2A] leading-relaxed italic relative z-10 pl-6">
                  "Not just a holiday, but a journey aligned with the rich soil, spiritual structures, and legends."
                </p>
              </blockquote>

              <div className="prose prose-lg prose-p:text-[#4A4A4A] prose-p:leading-loose max-w-none text-lg font-light">
                <p>{currentTrip.overviewText}</p>
                <p className="mt-6">{currentTrip.description}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column (35%) Sticky Guide Card */}
          <div className="lg:w-[35%] w-full lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-[#E8E0D4] shadow-xl shadow-black/5"
            >
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-6">
                  <img
                    src={currentTrip.guide.image}
                    alt={currentTrip.guide.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#F8F5EF]"
                  />
                  <div className="absolute bottom-0 right-0 bg-[#C89A3D] text-white p-2 rounded-full border-2 border-white">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
                <span className="text-[#C89A3D] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Verified Expert</span>
                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-1">{currentTrip.guide.name}</h3>
                <p className="text-[#6A6A6A] text-sm">{currentTrip.guide.experience} Experience</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-sm text-[#4A4A4A] pb-4 border-b border-[#E8E0D4]">
                  <Globe className="w-5 h-5 text-[#C89A3D]" />
                  <span>Speaks: {currentTrip.guide.languages.join(", ")}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[#4A4A4A] pb-4 border-b border-[#E8E0D4]">
                  <Star className="w-5 h-5 text-[#C89A3D] fill-[#C89A3D]" />
                  <span>{currentTrip.rating} / 5 ({currentTrip.reviews.length} reviews)</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${currentTrip.guide.phone}`}
                  className="w-full h-14 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest hover:bg-[#C89A3D] transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" />
                  Call Guide
                </a>
                <a
                  href={`https://wa.me/${currentTrip.guide.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest hover:bg-[#128C7E] transition-colors duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================
          SECTION 3: Experience Highlights
          ======================== */}
      <section className="py-[120px] bg-white relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
          <div className="text-center mb-16">
            <span className="text-[#C89A3D] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Key Features</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] font-light">Experience Highlights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentTrip.placesCoveredDetails.slice(0, 4).map((place, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-[#F8F5EF] p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-xl group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#C89A3D] transition-colors duration-500 text-[#C89A3D] group-hover:text-white">
                  <Navigation className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-3">{place.name}</h3>
                <p className="text-[#6A6A6A] text-sm leading-relaxed line-clamp-4">
                  {place.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================
          SECTION 4: Immersive Gallery
          ======================== */}
      <section className="py-[120px] container mx-auto px-6 md:px-12 max-w-[1280px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[#C89A3D] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Visual Artifacts</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] font-light">Immersive Gallery</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {memories.map((mem, idx) => (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              onClick={() => setLightboxIndex(idx)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-700 bg-black ${mem.className}`}
            >
              <img
                src={mem.url}
                alt={mem.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[#C89A3D] text-[10px] font-bold uppercase tracking-widest mb-2 block">
                  {mem.category}
                </span>
                <h3 className="text-white font-serif text-2xl">
                  {mem.title}
                </h3>
              </div>
              
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                <Maximize2 className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================
          SECTION 5: Journey Timeline
          ======================== */}
      <section className="py-[120px] bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
        
        <div className="container mx-auto px-6 md:px-12 max-w-[1000px] relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#C89A3D] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Itinerary</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light">Journey Timeline</h2>
          </div>

          <div className="space-y-16">
            {currentTrip.timeline.map((day, dayIdx) => (
              <div key={dayIdx} className="relative">
                <h3 className="text-2xl font-serif text-[#C89A3D] mb-8 flex items-center gap-4">
                  <span className="w-12 h-px bg-[#C89A3D]/50 block" />
                  Day {day.day}: {day.title}
                </h3>
                
                <div className="pl-6 md:pl-[60px] border-l border-white/10 space-y-12">
                  {day.activities.map((act, actIdx) => (
                    <motion.div
                      key={actIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: actIdx * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute -left-[31px] md:-left-[65px] w-[10px] h-[10px] rounded-full bg-[#C89A3D] shadow-[0_0_10px_rgba(200,154,61,0.5)]" />
                      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-2">
                        <span className="text-white/40 text-sm font-bold uppercase tracking-widest md:w-24 shrink-0">
                          {act.time}
                        </span>
                        <h4 className="text-xl font-serif text-white">{act.activity}</h4>
                      </div>
                      <p className="text-white/60 md:pl-32 text-base leading-relaxed">
                        {act.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================
          SECTION 6: Luxury Amenities
          ======================== */}
      <section className="py-[120px] bg-white relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
          <div className="text-center mb-16">
            <span className="text-[#C89A3D] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Inclusions</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] font-light">Luxury Amenities</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {AMENITIES.map((amenity, idx) => {
              const Icon = amenity.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center justify-center p-8 rounded-2xl bg-[#F8F5EF] hover:bg-white hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-[#E8E0D4]"
                >
                  <Icon className="w-8 h-8 text-[#1A1A1A] group-hover:text-[#C89A3D] transition-colors mb-4" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-center text-[#4A4A4A] group-hover:text-[#1A1A1A]">{amenity.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: Traveler Reviews Removed */}

      {/* ========================
          SECTION 8: Related Experiences
          ======================== */}
      <section className="py-[120px] bg-white relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#C89A3D] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Continue Exploring</span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] font-light">Related Experiences</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {relatedTrips.map((trip) => (
              <JourneyCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Call To Action Removed */}

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1A1A1A]/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-xl"
          >
            <button onClick={() => setLightboxIndex(null)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 z-[100] transition-colors">
              <X className="w-5 h-5" />
            </button>

            <button onClick={() => { const len = memories.length; setLightboxIndex((p) => (p !== null ? (p - 1 + len) % len : null)); }} className="absolute left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 z-[100] transition-colors hidden md:flex">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button onClick={() => { const len = memories.length; setLightboxIndex((p) => (p !== null ? (p + 1) % len : null)); }} className="absolute right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 z-[100] transition-colors hidden md:flex">
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.div key={lightboxIndex} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="max-w-5xl w-full max-h-[85vh] relative flex flex-col items-center justify-center">
              <img src={memories[lightboxIndex].url} alt={memories[lightboxIndex].title} className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl select-none" />
              <div className="text-center mt-8">
                <h4 className="text-white font-serif text-2xl mb-2">{memories[lightboxIndex].title}</h4>
                <span className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">
                  {memories[lightboxIndex].category} • {lightboxIndex + 1} / {memories.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PremiumFooter />
    </div>
  );
};

export default JourneyDetails;
