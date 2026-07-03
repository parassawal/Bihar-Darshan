import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import ProductCard from "../components/marketplace/ProductCard";
import { product } from "../data/product";

const MarketPlace = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-gray">
      <Navbar />

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
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20"
          >
            {product.map((item) => (
              <ProductCard
                key={item.id}
                {...item}
                onMoreInfo={(id) => navigate(`/marketplace/${id}`)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>

      <Footer />
    </div>
  );
};

export default MarketPlace;