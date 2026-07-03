import React, { useState, useMemo } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';

interface Personality {
  id: number;
  name: string;
  category: 'Politician' | 'Arts & Cinema' | 'Historical' | 'Literature' | 'Sports';
  district: string;
  description: string;
  imageUrl: string;
}

const personalities: Personality[] = [
  // --- HISTORICAL ---
  { 
    id: 1, name: "Samrat Ashoka", category: "Historical", district: "Patna", 
    description: "The third Mauryan Emperor who ruled almost the entire Indian subcontinent and spread Buddhism across Asia.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ashoka_the_Great.jpg/800px-Ashoka_the_Great.jpg" 
  },
  { 
    id: 2, name: "Guru Gobind Singh", category: "Historical", district: "Patna", 
    description: "The 10th Sikh Guru, born in Patna Sahib. He was a spiritual master, warrior, poet, and philosopher.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Guru_Gobind_Singh_ji.jpg/800px-Guru_Gobind_Singh_ji.jpg" 
  },
  { 
    id: 3, name: "Veer Kunwar Singh", category: "Historical", district: "Bhojpur", 
    description: "A key leader during the Indian Rebellion of 1857. At the age of 80, he led a select band of armed forces against the British.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Kunwar_Singh.jpg/800px-Kunwar_Singh.jpg" 
  },
  { 
    id: 4, name: "Aryabhata", category: "Historical", district: "Patna", 
    description: "The legendary mathematician-astronomer from the classical age. He invented 'Zero' and calculated the value of Pi.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Aryabhata_statue_at_IUCAA.jpg/800px-Aryabhata_statue_at_IUCAA.jpg" 
  },

  // --- POLITICIANS ---
  { 
    id: 5, name: "Dr. Rajendra Prasad", category: "Politician", district: "Siwan", 
    description: "The first President of the Republic of India and a major leader of the Indian Independence Movement.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Rajendra_Prasad_1950.jpg/800px-Rajendra_Prasad_1950.jpg" 
  },
  { 
    id: 6, name: "Jayaprakash Narayan", category: "Politician", district: "Saran", 
    description: "Popularly known as 'Lok Nayak'. He led the Total Revolution movement against the Indira Gandhi government in the 1970s.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Jayaprakash_Narayan.jpg" 
  },
  { 
    id: 7, name: "Nitish Kumar", category: "Politician", district: "Nalanda", 
    description: "The current and longest-serving Chief Minister of Bihar, known for his focus on infrastructure and women's empowerment.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nitish_Kumar_2015_%28cropped%29.jpg/800px-Nitish_Kumar_2015_%28cropped%29.jpg" 
  },
  { 
    id: 8, name: "Lalu Prasad Yadav", category: "Politician", district: "Gopalganj", 
    description: "Former CM of Bihar and Railway Minister of India. A charismatic leader of the RJD party known for social justice politics.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lalu_Prasad_Yadav_at_the_NDTV_Indian_of_the_Year_Awards_2008.jpg/800px-Lalu_Prasad_Yadav_at_the_NDTV_Indian_of_the_Year_Awards_2008.jpg" 
  },

  // --- ARTS & CINEMA ---
  { 
    id: 9, name: "Manoj Bajpayee", category: "Arts & Cinema", district: "West Champaran", 
    description: "A legendary powerhouse performer in Indian cinema, known for 'Gangs of Wasseypur', 'Satya', and 'The Family Man'.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Manoj_Bajpayee_promoting_Gully_Boy.jpg/800px-Manoj_Bajpayee_promoting_Gully_Boy.jpg" 
  },
  { 
    id: 10, name: "Pankaj Tripathi", category: "Arts & Cinema", district: "Gopalganj", 
    description: "Beloved actor known for his natural acting style in 'Mirzapur', 'Newton', and 'Ludo'. Proudly represents Bihar's rural roots.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pankaj_Tripathi_in_2019.jpg/800px-Pankaj_Tripathi_in_2019.jpg" 
  },
  { 
    id: 11, name: "Sushant Singh Rajput", category: "Arts & Cinema", district: "Patna", 
    description: "Late actor who rose from TV to Bollywood stardom with films like 'M.S. Dhoni: The Untold Story' and 'Chhichhore'.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sushant_Singh_Rajput_at_the_62nd_Filmfare_Awards_in_2017.jpg/800px-Sushant_Singh_Rajput_at_the_62nd_Filmfare_Awards_in_2017.jpg" 
  },
  { 
    id: 12, name: "Sharda Sinha", category: "Arts & Cinema", district: "Supaul", 
    description: "The 'Bihar Kokila', famous for her folk songs and Chhath Puja anthems which are synonymous with Bihar's culture.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sharda_Sinha.jpg/800px-Sharda_Sinha.jpg" 
  },

  // --- LITERATURE ---
  { 
    id: 13, name: "Ramdhari Singh Dinkar", category: "Literature", district: "Begusarai", 
    description: "One of the most important modern Hindi poets, known as 'Rashtrakavi'. His poem 'Rashmirathi' is a masterpiece.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Ramdhari_Singh_Dinkar.jpg/440px-Ramdhari_Singh_Dinkar.jpg" 
  },
  { 
    id: 14, name: "Phanishwar Nath Renu", category: "Literature", district: "Araria", 
    description: "Pioneer of regional Hindi literature. His novel 'Maila Anchal' is considered the greatest Hindi novel after Godaan.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Phanishwar_Nath_Renu.jpg" 
  },

  // --- SPORTS ---
  { 
    id: 15, name: "Ishan Kishan", category: "Sports", district: "Patna", 
    description: "Dynamic Indian international cricketer who holds the record for the fastest double-century in an ODI match.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Ishan_Kishan_at_the_IPL_2022.jpg/800px-Ishan_Kishan_at_the_IPL_2022.jpg" 
  },
  { 
    id: 16, name: "Pramod Bhagat", category: "Sports", district: "Vaishali", 
    description: "Professional para-badminton player who won the Gold Medal at the Tokyo 2020 Paralympics.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pramod_Bhagat_at_the_2020_Paralympics.jpg/800px-Pramod_Bhagat_at_the_2020_Paralympics.jpg" 
  },
  { 
    id: 17, name: "Karpoori Thakur", category: "Politician", district: "Samastipur", 
    description: "Former CM and Bharat Ratna recipient known as 'Jan Nayak' for his lifelong struggle for the marginalized sections of society.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Karpoori_Thakur.jpg/800px-Karpoori_Thakur.jpg"
  }
];

export default function Personalities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDist, setSelectedDist] = useState('All Districts');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getUniqueDistricts = () => {
    const dists = personalities.map(p => p.district);
    return ['All Districts', ...new Set(dists)];
  };

  const districts = getUniqueDistricts();

  const filteredData = useMemo(() => {
    return personalities.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDist = selectedDist === 'All Districts' || p.district === selectedDist;
      return matchSearch && matchDist;
    });
  }, [searchTerm, selectedDist]);

  return (
    <div className="min-h-screen bg-brand-gray">
      <Navbar />

      {/* Hero Banner */}
      <div 
        className="bg-brand-dark pt-32 pb-16 mb-12 relative overflow-hidden"
        style={{ backgroundImage: "url('/images/culture/hero-artwork.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-brand-dark/70"></div>
        <div className="absolute inset-0 bg-brand-gold/15 opacity-50 mix-blend-overlay"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-brand-gold/20"></div>
        <Container>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Bihar's <span className="text-brand-gold">Legends</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Discover the extraordinary personalities from Bihar who have shaped history, culture, and society. Use the filter below to explore by region.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        {/* Filters Section */}
        <div id="personalities-explore-section" className="bg-white p-3 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-12">

          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search personality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 text-sm font-medium text-gray-900 rounded-2xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
            />
          </div>

          {/* Custom District Dropdown */}
          <div className="relative w-full md:w-56 shrink-0 z-40">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-gray-50 border border-transparent hover:border-gray-200 text-brand-dark text-sm rounded-3xl pl-10 pr-10 py-2.5 font-semibold transition-all flex items-center justify-between"
            >
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <span className="truncate">{selectedDist}</span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {isDropdownOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => {
                  setIsDropdownOpen(false);
                  setSearchQuery("");
                }}
              ></div>
            )}

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-200 py-2 z-50 overflow-hidden"
                >
                  <div className="px-3 pb-2 mb-1 border-b border-gray-100">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search district..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 text-sm font-medium text-gray-900 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                      />
                    </div>
                  </div>

                  <div className="max-h-55 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                    {districts.filter((d: string) => d.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                      districts.filter((d: string) => d.toLowerCase().includes(searchQuery.toLowerCase())).map((district: string) => (
                        <button
                          key={district}
                          onClick={() => {
                            setSelectedDist(district);
                            setIsDropdownOpen(false);
                            setSearchQuery("");
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 flex items-center gap-2 ${selectedDist === district ? 'text-brand-dark bg-gray-50' : 'text-gray-600'}`}
                        >
                          {selectedDist === district && <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>}
                          <span className={selectedDist === district ? 'font-bold' : ''}>{district}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-sm text-gray-400 font-medium">
                        No districts found
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results Grid */}
        <div className="mb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDist + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {filteredData.length > 0 ? (
                filteredData.map((person) => (
                  <div
                    key={person.id}
                    className="relative flex-none h-100 rounded-3xl overflow-hidden group bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] cursor-pointer"
                  >
                    <div className="absolute top-0 left-0 right-0 h-full group-hover:h-1/2 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:delay-100 group-hover:rounded-b-2xl overflow-hidden z-0">
                      <img
                        src={person.imageUrl}
                        alt={person.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400?text=Profile"; }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700 group-hover:delay-10"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10 group-hover:p-0 group-hover:h-full group-hover:bg-white group-hover:flex group-hover:flex-col group-hover:justify-between transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                      <div className="group-hover:px-6 group-hover:pt-6">
                        <span className="text-xs font-bold text-brand-gold uppercase tracking-wide">{person.category}</span>
                        <h3 className="text-sm font-bold text-white group-hover:text-brand-dark mt-1 line-clamp-2">
                          {person.name}
                        </h3>
                        <p className="text-xs text-gray-300 group-hover:text-gray-600 mt-1 flex items-center gap-1">
                          <MapPin size={12} />
                          {person.district}
                        </p>
                      </div>
                      <p className="hidden group-hover:block text-sm text-brand-dark font-medium leading-relaxed group-hover:pb-6 group-hover:px-6">
                        {person.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-400 font-medium">No personalities found</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
