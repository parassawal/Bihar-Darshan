import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import ProductCard from "../components/marketplace/ProductCard";
import { product } from "../data/product";

const MarketPlace = () => {
  return (
    <div className="min-h-screen bg-brand-gray">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-brand-dark pt-32 pb-16 mb-12">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-5 inline-block cursor-pointer transition-all duration-300 hover:scale-125 hover:text-gray-100">
   Bihar<span className="text-brand-gold">  Marketplace</span>
</h1>

            <p className="text-gray-300">
              Explore authentic products crafted by artisans and businesses
              across Bihar.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20"
          >
            {product.map((item) => (
              <ProductCard
                key={item.id}
                {...item}
                onMoreInfo={(id) => {
                  console.log("Product ID:", id);
                  // navigate(`/marketplace/${id}`);
                }}
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