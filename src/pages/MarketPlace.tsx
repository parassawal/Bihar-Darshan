import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import ProductCard from "../components/marketplace/ProductCard";
import { product } from "../data/product";

const categories = ["All", ...Array.from(new Set(product.map((p) => p.category)))];

const MarketPlace = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? product
      : product.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-brand-gray">
      <Navbar forceDarkText={true} />

      {/* Hero Section */}
      <div className="bg-brand-dark pt-32 pb-16 mb-12 overflow-hidden">
        <Container>
          <div className="text-center max-w-2xl mx-auto">

            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{
                scale: 1.08,
                textShadow: "0px 0px 25px rgba(255,215,0,0.6)",
              }}
              className="text-5xl font-bold text-white mb-5 inline-block cursor-pointer"
            >
              Bihar
              <span className="text-brand-gold"> Marketplace</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 text-lg"
            >
              Explore authentic products crafted by artisans and businesses
              across Bihar.
            </motion.p>

          </div>
        </Container>
      </div>

      <Container>
        {/* Filter Bar */}
        <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-3 mb-10 flex flex-col sm:flex-row items-center gap-3 justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${activeCategory === cat
                  ? "bg-brand-dark text-white shadow-md"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Add Your Product Button */}
          <button
            onClick={() => navigate("/share-story")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold text-brand-dark font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all cursor-pointer shrink-0"
          >
            <Plus size={16} strokeWidth={3} />
            Add Your Product
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  {...item}
                  onMoreInfo={(id) => navigate(`/marketplace/${id}`)}
                />
              ))
            ) : (
              <div className="col-span-full py-24 text-center text-gray-400 font-semibold">
                No products found in this category.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>

      <Footer />
    </div>
  );
};

export default MarketPlace;