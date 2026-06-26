import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { MapPin, ShoppingBag, Phone, ArrowLeft, Search, ArrowDownAZ } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Storefront() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shop, setShop] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    if (id) {
      fetchStoreData();
    }
  }, [id]);

  const fetchStoreData = async () => {
    try {
      // Fetch shop details
      const shopRef = doc(db, "shops", id!);
      const shopSnap = await getDoc(shopRef);
      if (!shopSnap.exists() || shopSnap.data().status !== "approved") {
        navigate("/marketplace");
        return;
      }
      setShop({ id: shopSnap.id, ...shopSnap.data() });

      // Fetch shop products
      const q = query(collection(db, "marketplace"), where("shopId", "==", id));
      const prodSnap = await getDocs(q);
      const prodList: any[] = [];
      prodSnap.forEach(doc => prodList.push({ id: doc.id, ...doc.data() }));
      setProducts(prodList);
    } catch (err) {
      console.error("Error fetching store data:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products
    .filter(item => {
      const matchCategory = activeCategory === "All" || item.category === activeCategory;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "a-z") return a.title.localeCompare(b.title);
      return 0; // newest/default
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!shop) return null;

  return (
    <div className="min-h-screen bg-black pb-24">
      <Navbar />

      {/* Store Cover Header */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <img 
          src={shop.heroImage || shop.imageUrl || "/images/bihar-mountains.png"} 
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute top-24 left-4 md:left-8 z-10">
          <button 
            onClick={() => navigate("/marketplace")}
            className="flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold transition-colors border border-white/10"
          >
            <ArrowLeft size={16} /> Back to Directory
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">{shop.name}</h1>
            <p className="text-white/80 max-w-2xl text-lg mb-6 leading-relaxed line-clamp-3">
              {shop.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-white/60">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <MapPin size={14} className="text-gold" />
                Local Vendor
              </span>
              {shop.contactInfo && (
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                  <Phone size={14} className="text-gold" />
                  {shop.contactInfo}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12">
        {/* Search and Filters */}
        <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-xl py-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b border-white/10">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all shrink-0 ${activeCategory === category
                  ? "bg-gold text-black shadow-lg shadow-gold/20"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold text-white text-sm rounded-full pl-11 pr-4 py-2.5 outline-none transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 w-full sm:w-auto shrink-0 border border-white/10 hover:border-white/20 transition-all">
              <ArrowDownAZ size={16} className="text-white/40" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent text-white font-semibold text-sm outline-none cursor-pointer appearance-none pr-2"
              >
                <option value="newest" className="bg-black">Recommended</option>
                <option value="price-asc" className="bg-black">Price: Low to High</option>
                <option value="price-desc" className="bg-black">Price: High to Low</option>
                <option value="a-z" className="bg-black">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Menu (Zomato Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={product.id}
                  className="bg-white/5 border border-white/10 rounded-3xl p-5 flex gap-4 hover:border-gold/30 transition-all duration-300 group"
                >
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gold mb-2 uppercase tracking-wider bg-gold/10 inline-block px-2 py-1 rounded">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gold transition-colors">{product.title}</h3>
                    <p className="text-white/50 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="font-black text-xl text-white">₹{product.price}</div>
                  </div>
                  
                  <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 relative rounded-2xl overflow-hidden bg-black/40 border border-white/5">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <button 
                      onClick={() => alert("Added to cart! (Demo)")}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-black font-black text-sm uppercase tracking-wider px-6 py-2 rounded-xl shadow-xl hover:bg-gold transition-colors flex items-center justify-center gap-1 min-w-[80%] hover:scale-105 active:scale-95"
                    >
                      Add <ShoppingBag size={14} className="ml-1" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <ShoppingBag size={48} className="mx-auto text-white/20 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No items found</h3>
                <p className="text-white/50">This store has not added any products matching your search.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}
