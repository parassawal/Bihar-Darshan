import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Compass,
  History,
  Info,
  MapPin,
  Sparkles,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import { getDistrictDetail } from '../data/districtDetailsData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const DistrictsDetails = () => {
  const { name } = useParams();
  const rawName = name ? name : 'Patna';
  const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const d = getDistrictDetail(formattedName);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [name]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#D4A017]/25">
      <Navbar forceDarkText={false} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 bg-gradient-to-br from-[#18120A] to-[#261E13] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,160,23,0.12),transparent_55%)]" />
        <Container className="relative z-10 max-w-6xl">
          <Link
            to="/districts"
            className="inline-flex items-center gap-2 text-white/45 hover:text-[#D4A017] text-[11px] font-bold uppercase tracking-[0.2em] transition-colors mb-6 group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back to Districts
          </Link>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-3">
            <span className="text-[10px] font-bold text-[#D4A017] uppercase tracking-[0.35em]">
              District Chronicles
            </span>
            <h1 className="text-6xl sm:text-8xl font-serif font-bold text-white leading-none">
              {d.name}
            </h1>
            <p className="text-xl sm:text-2xl font-signature text-[#D4A017] italic">
              {d.tagline}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── Sections — full-width single column ──────────────── */}
      <main>

        {/* 1. INTRODUCTION */}
        <section className="py-16 border-b border-[#EAE6DF]">
          <Container className="max-w-6xl">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="space-y-6"
            >
              <SectionLabel icon={<Info size={16} />} text="Introduction" />
              <p className="text-lg sm:text-xl font-serif font-light text-black/80 leading-relaxed max-w-none border-l-4 border-[#D4A017] pl-8">
                {d.introduction}
              </p>
            </motion.div>
          </Container>
        </section>

        {/* 2. RICH HISTORY */}
        <section className="py-16 bg-[#FDFBF7] border-b border-[#EAE6DF]">
          <Container className="max-w-6xl">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="space-y-6"
            >
              <SectionLabel icon={<History size={16} />} text="Rich History" />
              <p className="text-base sm:text-lg font-serif font-light text-black/75 leading-[1.85]">
                {d.richHistory}
              </p>
            </motion.div>
          </Container>
        </section>

        {/* 3. TOP TOURIST ATTRACTION */}
        <section className="py-16 bg-[#FAF6EE] border-b border-[#E8DFCA]">
          <Container className="max-w-6xl">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="space-y-4"
            >
              <SectionLabel icon={<Sparkles size={16} />} text="Top Tourist Attraction" />
              <div className="mt-4 p-8 bg-white border border-[#E8DFC6] rounded-3xl shadow-[0_4px_30px_rgba(212,160,23,0.06)]">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-3">
                  {d.topTouristAttraction.name}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
                  {d.topTouristAttraction.details}
                </p>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* 4. BEST TIME TO VISIT — seasonal table */}
        <section className="py-16 border-b border-[#EAE6DF]">
          <Container className="max-w-6xl">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="space-y-6"
            >
              <SectionLabel icon={<Calendar size={16} />} text="Best Time to Visit" />

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#EAE6DF] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <table className="w-full text-sm text-left border-collapse bg-white">
                  <thead>
                    <tr className="bg-[#FAF6EE]">
                      {["Best Time to Visit", "Months", "Weather", "Why Visit During This Time?"].map(col => (
                        <th
                          key={col}
                          className="px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#D4A017] border-b border-[#EAE6DF] whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {d.seasonalVisit.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b last:border-0 border-[#EAE6DF] transition-colors duration-200 hover:bg-[#FAF6EE]/60 ${idx % 2 === 0 ? "bg-white" : "bg-[#FDFBF7]"}`}
                      >
                        <td className="px-5 py-4 font-bold text-gray-900 whitespace-nowrap align-top">{row.season}</td>
                        <td className="px-5 py-4 text-gray-700 align-top whitespace-nowrap">{row.months}</td>
                        <td className="px-5 py-4 text-gray-600 align-top">{row.weather}</td>
                        <td className="px-5 py-4 text-gray-600 align-top">{row.whyVisit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* 5. WHY IT SHOULD BE IN YOUR TOURIST LIST */}
        <section className="py-16 bg-[#FDFBF7] border-b border-[#EAE6DF]">
          <Container className="max-w-6xl">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="space-y-6"
            >
              <SectionLabel icon={<BookOpen size={16} />} text="Why it should be in your Tourist List" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {d.whyInTouristList.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-4 items-start p-6 bg-white border border-[#EAE6DF] rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:border-[#D4A017]/30 transition-colors duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#D4A017] shrink-0 mt-2.5" />
                    <span className="text-sm sm:text-base text-gray-700 font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Container>
        </section>

        {/* 6. TOP ATTRACTION */}
        <section className="py-16 bg-[#FAF6EE]">
          <Container className="max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-8"
            >
              <SectionLabel
                icon={<Compass size={16} />}
                text="Top Attractions"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {d.topAttractions.map((attraction, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="group relative h-[560px] overflow-hidden rounded-3xl shadow-xl"
                  >
                    {/* Image */}
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                    {/* Number */}
                    <div className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center border border-white/30 text-white font-semibold">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    {/* Rating */}
                    {attraction.rating && (
                      <div className="absolute top-5 right-5 rounded-full bg-black/40 backdrop-blur-lg px-3 py-1 text-white text-sm">
                        ⭐ {attraction.rating}
                      </div>
                    )}

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-7 text-white">

                      <div className="flex items-center gap-2 text-yellow-300 mb-2">
                        <MapPin size={15} />
                        <span className="text-sm">
                          {attraction.district}
                        </span>
                      </div>

                      <h2 className="text-3xl font-bold mb-3">
                        {attraction.name}
                      </h2>

                      <p className="text-white/90 text-base leading-7 mb-4">
                        {attraction.shortDescription}
                      </p>

                      <div className="flex items-center justify-between border-t border-white/20 pt-4 text-sm">

                        <div>
                          <p className="text-white/60">Best Time</p>
                          <p>{attraction.bestTime}</p>
                        </div>

                        <button className="rounded-full bg-white text-black px-4 py-2 font-semibold transition hover:bg-yellow-400">
                          Explore
                        </button>

                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>

      </main>

      <Footer />
    </div>
  );
};

/* ── Reusable section label ── */
const SectionLabel = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2.5">
    <span className="p-2 rounded-xl bg-[#D4A017]/10 text-[#D4A017]">{icon}</span>
    <h2 className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#D4A017]">{text}</h2>
  </div>
);

export default DistrictsDetails;
