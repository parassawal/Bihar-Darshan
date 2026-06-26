import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCollection from '../hooks/useCollection';
import Container from '../components/layout/Container';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Store, Search, MapPin, ArrowDownAZ } from 'lucide-react';
import BusinessModal from '../components/marketplace/BusinessModal';
import { Link } from 'react-router-dom';

interface Shop {
  id: string;
  name: string;
  description: string;
  status: string;
  imageUrl?: string;
  contactInfo?: string;
}

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("a-z");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: shops, loading } = useCollection<Shop>("shops");
  
  const approvedShops = shops.filter(shop => shop.status === 'approved');

  const filteredShops = approvedShops
    .filter(shop => 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (shop.description && shop.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOption === "a-z") return a.name.localeCompare(b.name);
      if (sortOption === "z-a") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-black pt-28">
      <Navbar />
      
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg tracking-tight"
        >
          Discover Local <span className="text-gold">Shops</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-lg max-w-2xl mx-auto mb-8"
        >
          Support local artisans, restaurants, and businesses. Order directly from authentic vendors across Bihar.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-6 py-2.5 rounded-full inline-flex items-center gap-2 transition-all"
        >
          <Store size={18} className="text-gold" />
          List Your Business
        </motion.button>
      </div>

      <Container>
        {/* Search Bar & Sort */}
        <div className="bg-white/5 backdrop-blur-md p-3 rounded-[1.5rem] border border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center mb-12">
          <div className="relative w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search for a shop or restaurant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-transparent hover:border-white/20 focus:border-gold text-white rounded-[1.25rem] pl-12 pr-4 py-3.5 font-semibold transition-all outline-none"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-black/40 rounded-[1.25rem] px-4 py-3 w-full sm:w-auto shrink-0 border border-transparent hover:border-white/20 transition-all">
            <ArrowDownAZ size={18} className="text-white/40" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent text-white font-semibold text-sm outline-none cursor-pointer appearance-none pr-4"
            >
              <option value="a-z" className="bg-black">Name (A to Z)</option>
              <option value="z-a" className="bg-black">Name (Z to A)</option>
            </select>
          </div>
        </div>

        {/* Shop Grid */}
        <div className="mb-24">
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <motion.div
                key={searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredShops.length > 0 ? (
                  filteredShops.map((shop) => (
                    <Link
                      to={`/store/${shop.id}`}
                      key={shop.id}
                      className="group flex flex-col bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 overflow-hidden hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 shadow-xl"
                    >
                      <div className="relative h-56 overflow-hidden bg-black/40">
                        {shop.imageUrl ? (
                          <img 
                            src={shop.imageUrl} 
                            alt={shop.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20">
                            <Store size={48} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white mb-1 leading-tight group-hover:text-gold transition-colors">
                            {shop.name}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-1 bg-black/40">
                        <p className="text-sm text-white/50 mb-6 line-clamp-3 leading-relaxed">
                          {shop.description}
                        </p>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/40">
                            <MapPin size={14} /> Local Vendor
                          </div>
                          <span className="text-gold font-bold text-sm group-hover:underline">Explore Store &rarr;</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center flex flex-col items-center">
                    <Store size={48} className="text-white/20 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No shops found</h3>
                    <p className="text-white/50">Try adjusting your search query.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
      <Footer />
      <BusinessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Marketplace;
