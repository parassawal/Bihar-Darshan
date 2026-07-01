import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  Compass,
  Phone,
  Mail,
  MessageSquare,
  Check,
  X,
  AlertCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Globe,
  Maximize2
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import PremiumFooter from "../components/tourism/PremiumFooter";
import { featuredTrips } from "../data/tourismData";
import JourneyCard from "../components/tourism/JourneyCard";

const JourneyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const currentTrip = featuredTrips.find(t => t.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryDate, setInquiryDate] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const relatedTrips = featuredTrips.filter(t => t.id !== id);

  if (!currentTrip) {
    return <Navigate to="/tourism" replace />;
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryDate) return;
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setInquiryName("");
      setInquiryEmail("");
      setInquiryDate("");
      setInquiryMessage("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-brand-dark selection:bg-brand-gold selection:text-brand-dark font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Decorative Brand Textures */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-multiply">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
      </div>

      {/* ── 1. JOURNEY HERO SECTION ── */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-end">
        {/* Cover Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentTrip.image}
            alt={currentTrip.title}
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/75 via-transparent to-transparent hidden md:block" />
        </div>

        {/* Back Button — pinned top-left corner below navbar */}
        <Link
          to="/tourism"
          className="absolute top-20 left-6 z-20 inline-flex items-center gap-2 text-white/80 hover:text-brand-gold font-bold text-xs uppercase tracking-widest transition-colors duration-300 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/15"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="container mx-auto px-6 max-w-7xl relative z-10 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 text-left space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 bg-brand-gold text-brand-dark text-[10px] font-extrabold uppercase tracking-widest rounded-md">
                  {currentTrip.duration}
                </span>
                <span className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-md border border-white/10 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  Starts in {currentTrip.departureCity}
                </span>
                {currentTrip.rating && (
                  <span className="px-3.5 py-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold rounded-md border border-white/10 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                    {currentTrip.rating} / 5.0
                  </span>
                )}
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-serif text-white leading-tight font-light"
              >
                {currentTrip.title}
              </motion.h1>
            </div>

            <div className="lg:col-span-4 flex flex-col md:flex-row lg:flex-col lg:items-end justify-between gap-4 w-full">
              <div className="text-left lg:text-right">
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">
                  Guaranteed Best Pricing
                </p>
                <div className="flex items-baseline md:justify-end gap-1.5">
                  <span className="text-3xl md:text-4xl font-extrabold text-brand-gold font-mono">{currentTrip.price}</span>
                  <span className="text-white/40 text-xs font-semibold">/ person</span>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto lg:w-full">
                <a
                  href="#booking-inquiry"
                  className="flex-1 text-center py-4 bg-brand-gold hover:bg-brand-gold/90 text-brand-dark rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_12px_24px_rgba(212,160,23,0.3)]"
                >
                  Book Journey
                </a>
                <a
                  href={`https://wa.me/${currentTrip.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all duration-300 flex items-center justify-center"
                  title="Contact Guide via WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 text-green-400 fill-green-400/20" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. JOURNEY OVERVIEW + GUIDE CARD ── */}
      <section className="py-20 container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Overview */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <h2 className="text-xs font-bold text-brand-gold uppercase tracking-[0.3em] flex items-center gap-2">
                <Compass className="w-4 h-4" />
                The Cultural Chronicle
              </h2>
              <blockquote className="text-2xl md:text-3xl font-serif text-brand-dark/95 leading-relaxed font-light italic border-l-4 border-brand-gold pl-6 py-1">
                "Not just a holiday, but a journey aligned with the rich soil, spiritual structures, and legends of Bihar."
              </blockquote>
              <p className="text-brand-dark/70 text-lg leading-relaxed font-sans text-justify">
                {currentTrip.overviewText}
              </p>
            </div>
          </div>

          {/* Right Column: Guide Card */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl p-6 border border-[#E8E0D4] shadow-md space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={currentTrip.guide.image}
                  alt={currentTrip.guide.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border-2 border-brand-gold/30 shadow"
                />
                <div>
                  <span className="text-[9px] font-extrabold uppercase text-brand-gold tracking-widest block mb-0.5">
                    Your Local Expert
                  </span>
                  <h4 className="font-serif text-lg text-brand-dark font-bold leading-tight">
                    {currentTrip.guide.name}
                  </h4>
                  <p className="text-[10px] text-brand-dark/50 font-bold uppercase tracking-wider mt-0.5">
                    {currentTrip.guide.experience} Experience
                  </p>
                </div>
              </div>

              <div className="bg-brand-dark/5 p-4 rounded-2xl text-xs text-brand-dark/75 leading-relaxed">
                <p>{currentTrip.guide.intro}</p>
              </div>

              <div className="space-y-3.5 text-xs border-y border-[#E8E0D4]/50 py-4 font-medium text-brand-dark/80">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-brand-gold" />
                  <span>Languages: {currentTrip.guide.languages.join(", ")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-gold" />
                  <span>{currentTrip.guide.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-gold" />
                  <span>{currentTrip.guide.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${currentTrip.guide.phone}`}
                  className="h-11 bg-brand-dark hover:bg-brand-dark/95 text-white font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-gold" />
                  Call Guide
                </a>
                <a
                  href={`https://wa.me/${currentTrip.guide.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="h-11 bg-green-500 hover:bg-green-600 text-white font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. IMAGE GALLERY SECTION ── */}
      <section className="py-20 container mx-auto px-6 max-w-7xl space-y-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-brand-gold tracking-[0.25em] uppercase">Visual Artifacts</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light">Journey Media Gallery</h2>
          <p className="text-brand-dark/60 text-sm">
            Authentic, high-definition snapshots capturing scenic, ancient heritage ruins and nature trails of the region.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {currentTrip.galleryImages.map((imgUrl, imgIdx) => (
            <div
              key={imgIdx}
              onClick={() => setLightboxIndex(imgIdx)}
              className="break-inside-avoid relative rounded-3xl overflow-hidden border border-[#E8E0D4] cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
            >
              <img
                src={imgUrl}
                alt={`${currentTrip.title} snap ${imgIdx + 1}`}
                className="w-full h-auto object-cover max-h-[350px] transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. CONTACT & BOOKING FORM SECTION ── */}
      <section id="booking-inquiry" className="py-20 container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-[0.25em] block">
                Direct Helpdesk
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-brand-dark leading-tight">
                Secure Booking Inquiry
              </h2>
              <p className="text-brand-dark/70 text-sm leading-relaxed">
                Connect with our local experts, customize the duration matrix, query lodging standards, and handle emergency contingencies.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E8E0D4] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 text-brand-gold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-brand-dark/40 uppercase tracking-widest block">Service Hotline</span>
                  <a href={`tel:${currentTrip.phone}`} className="text-sm font-semibold text-brand-dark hover:text-brand-gold transition-colors font-mono">
                    {currentTrip.phone}
                  </a>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E0D4] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 text-brand-gold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-brand-dark/40 uppercase tracking-widest block">Email Office</span>
                  <a href={`mailto:${currentTrip.email}`} className="text-sm font-semibold text-brand-dark hover:text-brand-gold transition-colors">
                    {currentTrip.email}
                  </a>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-red-200 bg-red-50/50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest block">24/7 Backline Support</span>
                  <span className="text-sm font-semibold text-brand-dark font-mono">
                    {currentTrip.emergencyContact}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-[32px] p-8 md:p-10 border border-[#E8E0D4] shadow-xl">
            <h3 className="font-serif text-2xl font-light text-brand-dark mb-8 pb-3 border-b border-[#E8E0D4]/80">
              Submit Travel Application
            </h3>

            <form onSubmit={handleInquirySubmit} className="space-y-6">
              {inquirySuccess ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-2xl border border-green-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <span className="font-bold block mb-1 text-sm">Application Sent Successfully!</span>
                    Our lead guide, {currentTrip.guide.name}, has been briefed automatically. A response package will be dispatched to your email within 6 hours.
                  </div>
                </div>
              ) : null}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name-input" className="text-[10px] font-bold text-brand-dark/60 uppercase tracking-wider block">
                    Full Name
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full h-12 px-4 rounded-xl border border-[#E8E0D4] bg-[#F8F5EF]/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 text-sm transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email-input" className="text-[10px] font-bold text-brand-dark/60 uppercase tracking-wider block">
                    Email Address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-12 px-4 rounded-xl border border-[#E8E0D4] bg-[#F8F5EF]/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 text-sm transition-all duration-300"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="date-input" className="text-[10px] font-bold text-brand-dark/60 uppercase tracking-wider block">
                    Target Departure Date
                  </label>
                  <input
                    id="date-input"
                    type="date"
                    required
                    value={inquiryDate}
                    onChange={(e) => setInquiryDate(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-[#E8E0D4] bg-[#F8F5EF]/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 text-sm transition-all duration-300"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="msg-input" className="text-[10px] font-bold text-brand-dark/60 uppercase tracking-wider block">
                    Special Inquiries (Optional)
                  </label>
                  <textarea
                    id="msg-input"
                    rows={4}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Enter custom requests, group configurations, lodgment standards..."
                    className="w-full p-4 rounded-xl border border-[#E8E0D4] bg-[#F8F5EF]/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/40 text-sm transition-all duration-300 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-14 bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              >
                Send Inquiry Package
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ── 5. RELATED JOURNEYS SECTION ── */}
      <section className="py-20 bg-[#F0EBE0]/50 border-t border-[#E8E0D4] relative z-10">
        <div className="container mx-auto px-6 max-w-7xl space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 text-left">
              <span className="text-[10px] font-extrabold text-brand-gold tracking-widest uppercase block">
                Explore More
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-brand-dark">
                Recommended Expeditions
              </h2>
            </div>
            <Link
              to="/tourism"
              className="text-xs font-bold text-brand-gold hover:underline uppercase tracking-wider"
            >
              Browse All Experiences →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {relatedTrips.slice(0, 3).map((trip) => (
              <JourneyCard key={trip.id} trip={trip} isCenter={false} />
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX FOR IMAGE GALLERY */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-md"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 z-[100]"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() => {
                const len = currentTrip.galleryImages.length;
                setLightboxIndex(p => (p !== null ? (p - 1 + len) % len : null));
              }}
              className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 z-[100]"
              title="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => {
                const len = currentTrip.galleryImages.length;
                setLightboxIndex(p => (p !== null ? (p + 1) % len : null));
              }}
              className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 z-[100]"
              title="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-4xl max-h-[85vh] relative flex flex-col items-center justify-center"
            >
              <img
                src={currentTrip.galleryImages[lightboxIndex]}
                alt="Enlarged view"
                className="max-w-full max-h-[80vh] object-contain rounded-2xl select-none"
              />
              <span className="text-white/60 text-xs mt-4">
                {lightboxIndex + 1} / {currentTrip.galleryImages.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PremiumFooter />
    </div>
  );
};

export default JourneyDetails;
