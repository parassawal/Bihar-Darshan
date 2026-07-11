import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../layout/Container';

interface DistrictAboutProps {
  districtName: string;
  image: string;
}

const DistrictAbout = ({ districtName, image }: DistrictAboutProps) => {
  return (
    <section className="relative py-24 bg-[#F8F5EF] overflow-hidden">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-7xl font-serif font-bold text-[#1A1A1A] mb-6 leading-tight">
              The Timeless Capital <br />
              of <span className="italic">Bihar</span>
            </h2>

            <div className="w-24 h-1.5 bg-[#D4A017] mb-10" />

            <div className="space-y-6 text-[#1A1A1A]/70 leading-relaxed text-lg lg:text-xl font-light mb-12 max-w-xl">
              <p>
                {districtName}, one of the world's oldest continuously inhabited
                places, stands as a testament to India's glorious past. From the
                golden era of the Maurya Empire to its modern transformation,
                the city remains the heartbeat of Bihar.
              </p>

              <p>
                Explore a landscape where ancient monuments meet bustling
                modern life, and every street tells stories of emperors,
                scholars, and spiritual heritage.
              </p>
            </div>

            {/* <motion.button
              whileHover={{
                backgroundColor: '#D4A017',
                color: '#FFFFFF',
              }}
              className="px-10 py-4 rounded-full border border-[#D4A017] text-[#D4A017] font-bold text-sm tracking-widest uppercase flex items-center gap-3 transition-all duration-300 group"
            >
              Explore {districtName}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button> */}
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative h-[550px] lg:h-[700px]"
          >
            <div className="absolute inset-0 bg-[#D4A017]/10 blur-[100px] rounded-full scale-125" />

            {/* <div className="relative h-full rounded-[32px] overflow-hidden shadow-2xl group"> */}
              {/* <img
                src={image}
                alt={districtName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              /> */}

              {/* <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A017]/10 via-transparent to-transparent" />

              <div className="absolute inset-4 border border-white/20 rounded-[24px]" />
            </div> */}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default DistrictAbout;