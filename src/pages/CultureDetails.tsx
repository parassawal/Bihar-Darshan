import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { cultureData } from '../data/cultureData';
import { MapPin, Utensils, PartyPopper } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CultureDetails = () => {
  const { id } = useParams<{ id: string }>();
  const cultureItem = cultureData.find((item) => item.id.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!cultureItem) {
    return <Navigate to="/culture" />;
  }

  return (
    <div className="min-h-screen bg-brand-gray text-brand-dark font-sans overflow-x-hidden relative">
      <Navbar />

      {/* Main Content Wrapper */}
      <div className="relative z-10 pt-32 pb-20 max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/culture" className="inline-flex items-center text-gray-500 hover:text-brand-dark font-bold uppercase transition-colors text-sm tracking-wide">
            <span className="mr-2">←</span> Back to Culture
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-center">
          {/* Left: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-brand-gold px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 text-brand-dark shadow-sm">
                {cultureItem.type === "Festival" ? <PartyPopper size={14} /> : <Utensils size={14} />}
                {cultureItem.type}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-bold text-gray-500">
                <MapPin size={16} />
                {cultureItem.district}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {cultureItem.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {cultureItem.longDescription || cultureItem.description}
            </p>

            {cultureItem.extendedDetails && cultureItem.extendedDetails.length > 0 && (
              <div className="space-y-4 mb-8">
                {cultureItem.extendedDetails.map((detail, index) => (
                  <p key={index} className="text-lg text-gray-600 leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Featured Image/Video */}
          {/* Right: Featured Image (Video Removed) */}
<motion.div 
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="lg:col-span-7 relative"
>
  <div className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100 group">
    <img 
      src={cultureItem.image} 
      alt={cultureItem.title} 
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
    />
    {/* Subtle overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  </div>
  
  {/* Decorative background blobs - kept these for the style */}
  <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute -z-10 -top-8 -left-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
</motion.div>
        </div>

        {/* Gallery Section */}
        {cultureItem.galleryImages && cultureItem.galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-16"
          >
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 inline-block relative">
                Gallery
                <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-brand-gold rounded-full" />
              </h2>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-sm">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="w-full !pb-16"
              >
                {cultureItem.galleryImages.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md group aspect-[4/3] cursor-pointer">
                      <img
                        src={src}
                        alt={`${cultureItem.title} Gallery ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CultureDetails;
