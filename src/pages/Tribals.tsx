import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';

const tribesList = [
  {
    id: "santhal",
    hindiName: "संथाल",
    englishName: "Santhal Tribe",
    shortDesc: "The largest indigenous tribe of India, known for their deep connection to nature.",
    image: "/images/tribals/santhal.png" // We can use the original with background for the card preview
  },
  {
    id: "oraon",
    hindiName: "उरांव",
    englishName: "Oraon Tribe",
    shortDesc: "Celebrated for progressive agricultural practices and dynamic community life.",
    image: "/images/tribals/oraon_tribe_1782405740193.png" // We can just use the cropped images for cards later, or the full images with object-cover
  },
  {
    id: "munda",
    hindiName: "मुंडा",
    englishName: "Munda Tribe",
    shortDesc: "Famous for their rich history of rebellion and vibrant hunting and agricultural festivals.",
    image: "/images/tribals/munda.png"
  },
  {
    id: "kharwar",
    hindiName: "खरवार",
    englishName: "Kharwar Tribe",
    shortDesc: "A martial tribe known for their resilience and deep connection to the land.",
    image: "/images/tribals/kharwar.png"
  },
  {
    id: "tharu",
    hindiName: "थारू",
    englishName: "Tharu Tribe",
    shortDesc: "Residing in the Champaran region, known for their unique architecture and malaria resistance.",
    image: "/images/tribals/tharu.png"
  },
  {
    id: "gond",
    hindiName: "गोंड",
    englishName: "Gond Tribe",
    shortDesc: "Found in Siwan and Kaimur, world-renowned for their vibrant, nature-inspired dot art.",
    image: "/images/tribals/gond.png"
  },
  {
    id: "asur",
    hindiName: "आदिवासी",
    englishName: "Asur Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/asur.png"
  },
  {
    id: "baiga",
    hindiName: "आदिवासी",
    englishName: "Baiga Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/baiga.png"
  },
  {
    id: "banjara",
    hindiName: "आदिवासी",
    englishName: "Banjara Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/banjara.png"
  },
  {
    id: "bathudi",
    hindiName: "आदिवासी",
    englishName: "Bathudi Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/bathudi.png"
  },
  {
    id: "beriya",
    hindiName: "आदिवासी",
    englishName: "Beriya Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/beriya.png"
  },
  {
    id: "bhejiya",
    hindiName: "आदिवासी",
    englishName: "Bhejiya Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/bhejiya.png"
  },
  {
    id: "bhumij",
    hindiName: "आदिवासी",
    englishName: "Bhumij Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/bhumij.png"
  },
  {
    id: "binjhia",
    hindiName: "आदिवासी",
    englishName: "Binjhia Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/binjhia.png"
  },
  {
    id: "birhor",
    hindiName: "आदिवासी",
    englishName: "Birhor Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/birhor.png"
  },
  {
    id: "birjia",
    hindiName: "आदिवासी",
    englishName: "Birjia Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/birjia.png"
  },
  {
    id: "chero",
    hindiName: "आदिवासी",
    englishName: "Chero Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/chero.png"
  },
  {
    id: "chickbaraik",
    hindiName: "आदिवासी",
    englishName: "Chick Baraik Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/chickbaraik.png"
  },
  {
    id: "gorait",
    hindiName: "आदिवासी",
    englishName: "Gorait Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/gorait.png"
  },
  {
    id: "ho",
    hindiName: "आदिवासी",
    englishName: "Ho Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/ho.png"
  },
  {
    id: "karmali",
    hindiName: "आदिवासी",
    englishName: "Karmali Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/karmali.png"
  },
  {
    id: "kharia",
    hindiName: "आदिवासी",
    englishName: "Kharia Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/kharia.png"
  },
  {
    id: "khond",
    hindiName: "आदिवासी",
    englishName: "Khond Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/khond.png"
  },
  {
    id: "kisan",
    hindiName: "आदिवासी",
    englishName: "Kisan Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/kisan.png"
  },
  {
    id: "kora",
    hindiName: "आदिवासी",
    englishName: "Kora Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/kora.png"
  },
  {
    id: "korba",
    hindiName: "आदिवासी",
    englishName: "Korba Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/korba.png"
  },
  {
    id: "loharalohra",
    hindiName: "आदिवासी",
    englishName: "Lohara/Lohra Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/loharalohra.png"
  },
  {
    id: "mahli",
    hindiName: "आदिवासी",
    englishName: "Mahli Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/mahli.png"
  },
  {
    id: "malpahariya",
    hindiName: "आदिवासी",
    englishName: "Mal Pahariya Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/generic.png"
  },
  {
    id: "parhaiya",
    hindiName: "आदिवासी",
    englishName: "Parhaiya Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/generic.png"
  },
  {
    id: "sauriapaharia",
    hindiName: "आदिवासी",
    englishName: "Sauria Paharia Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/generic.png"
  },
  {
    id: "savar",
    hindiName: "आदिवासी",
    englishName: "Savar Tribe",
    shortDesc: "One of the recognized Scheduled Tribes contributing to the diverse heritage of Bihar.",
    image: "/images/tribals/generic.png"
  }
];



const Tribals = () => {
  return (
    <div className="min-h-screen bg-[#f4ebd0] text-[#3e2723] font-serif overflow-x-hidden relative">
      <Navbar />

      {/* Global Parchment Background Texture */}
      <div 
        className="fixed inset-0 z-0 opacity-100 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "url('/images/tribals/parchment_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Main Content Wrapper */}
      <div className="relative z-10 pt-32 pb-20 max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Header Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl text-[#5d4037] mb-2 tracking-widest font-bold">आदिवासी</h2>
          <h1 className="text-5xl md:text-7xl uppercase tracking-[0.2em] text-[#3e2723] border-b border-[#3e2723]/30 pb-4 inline-block">
            Tribal Heritage
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto italic text-[#4e342e]">
            Discover the rich, ancient cultures, arts, and traditions of Bihar's indigenous communities.
          </p>
        </motion.div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {tribesList.map((tribe, index) => (
            <motion.div
              key={tribe.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/tribals/${tribe.id}`} className="block group">
                <div className="bg-[#e8dec0]/80 rounded-2xl overflow-hidden border border-[#3e2723]/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="h-64 overflow-hidden relative bg-white">
                    <img 
                      src={tribe.image} 
                      alt={tribe.englishName} 
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 opacity-90"
                      onError={(e) => {
                         // Fallback to nobg if original doesn't exist
                         if (tribe.id === 'oraon') e.currentTarget.src = '/images/tribals/oraon_nobg.png';
                         if (tribe.id === 'santhal') e.currentTarget.src = '/images/tribals/santhal_nobg.png';
                         if (tribe.id === 'munda') e.currentTarget.src = '/images/tribals/munda_nobg.png';
                         if (tribe.id === 'kharwar') e.currentTarget.src = '/images/tribals/kharwar_nobg.png';
                         if (tribe.id === 'tharu') e.currentTarget.src = '/images/tribals/tharu_nobg.png';
                         if (tribe.id === 'gond') e.currentTarget.src = '/images/tribals/gond_nobg.png';
                         if (tribe.id === 'asur') e.currentTarget.src = '/images/tribals/asur_nobg.png';
                         if (tribe.id === 'baiga') e.currentTarget.src = '/images/tribals/baiga_nobg.png';
                         if (tribe.id === 'banjara') e.currentTarget.src = '/images/tribals/banjara_nobg.png';
                         if (tribe.id === 'bathudi') e.currentTarget.src = '/images/tribals/bathudi_nobg.png';
                         if (tribe.id === 'beriya') e.currentTarget.src = '/images/tribals/beriya_nobg.png';
                         if (tribe.id === 'bhejiya') e.currentTarget.src = '/images/tribals/bhejiya_nobg.png';
                         if (tribe.id === 'bhumij') e.currentTarget.src = '/images/tribals/bhumij_nobg.png';
                         if (tribe.id === 'binjhia') e.currentTarget.src = '/images/tribals/binjhia_nobg.png';
                         if (tribe.id === 'birhor') e.currentTarget.src = '/images/tribals/birhor_nobg.png';
                         if (tribe.id === 'birjia') e.currentTarget.src = '/images/tribals/birjia_nobg.png';
                         if (tribe.id === 'chero') e.currentTarget.src = '/images/tribals/chero_nobg.png';
                         if (tribe.id === 'chickbaraik') e.currentTarget.src = '/images/tribals/chickbaraik_nobg.png';
                         if (tribe.id === 'gorait') e.currentTarget.src = '/images/tribals/gorait_nobg.png';
                         if (tribe.id === 'ho') e.currentTarget.src = '/images/tribals/ho_nobg.png';
                         if (tribe.id === 'karmali') e.currentTarget.src = '/images/tribals/karmali_nobg.png';
                         if (tribe.id === 'kharia') e.currentTarget.src = '/images/tribals/kharia_nobg.png';
                         if (tribe.id === 'khond') e.currentTarget.src = '/images/tribals/khond_nobg.png';
                         if (tribe.id === 'kisan') e.currentTarget.src = '/images/tribals/kisan_nobg.png';
                         if (tribe.id === 'kora') e.currentTarget.src = '/images/tribals/kora_nobg.png';
                         if (tribe.id === 'korba') e.currentTarget.src = '/images/tribals/korba_nobg.png';
                         if (tribe.id === 'loharalohra') e.currentTarget.src = '/images/tribals/loharalohra_nobg.png';
                         if (tribe.id === 'mahli') e.currentTarget.src = '/images/tribals/mahli_nobg.png';
                         if (tribe.id === 'malpahariya') e.currentTarget.src = '/images/tribals/generic_nobg.png';
                         if (tribe.id === 'parhaiya') e.currentTarget.src = '/images/tribals/generic_nobg.png';
                         if (tribe.id === 'sauriapaharia') e.currentTarget.src = '/images/tribals/generic_nobg.png';
                         if (tribe.id === 'savar') e.currentTarget.src = '/images/tribals/generic_nobg.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#e8dec0] to-transparent opacity-80" />
                  </div>
                  <div className="p-8 text-center -mt-12 relative z-10">
                    <div className="bg-[#f4ebd0] inline-block px-6 py-2 rounded-full border border-[#3e2723]/20 shadow-sm mb-4">
                      <h3 className="text-xl font-bold tracking-widest text-[#5d4037]">{tribe.hindiName}</h3>
                    </div>
                    <h2 className="text-2xl uppercase tracking-wider text-[#3e2723] mb-3 font-bold">{tribe.englishName}</h2>
                    <p className="text-[#4e342e] italic">
                      {tribe.shortDesc}
                    </p>
                    <div className="mt-6 flex justify-center">
                      <span className="text-[#b71c1c] uppercase tracking-widest text-sm font-bold group-hover:underline underline-offset-4">Explore →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        </div>

      <Footer />
    </div>
  );
};

export default Tribals;
