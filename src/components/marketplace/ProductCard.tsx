import { Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: number;
  image: string;
  businessName: string;
  productName: string;
  contact: string;
  email: string;
  onMoreInfo: (id: number) => void;
}

const ProductCard = ({
  id,
  image,
  businessName,
  productName,
  contact,
  email,
  onMoreInfo,
}: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.35 }}
      className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <motion.img
          src={image}
          alt={productName}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.7 }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Product Name on Image */}
        <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 group-hover:translate-y-[-20px]">
          <h2 className="text-2xl font-bold text-white">
            {productName}
          </h2>

          <p className="text-white/80 mt-1">
            {businessName}
          </p>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="bg-white p-6 transition-all duration-500">

        <div className="space-y-4">

          <div className="flex items-center gap-3 text-gray-700">
            <Phone size={18} className="text-orange-500" />
            <span>{contact}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Mail size={18} className="text-orange-500" />
            <span className="truncate">{email}</span>
          </div>

        </div>

        {/* Learn More Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => onMoreInfo(id)}
          className="mt-6 w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg"
        >
          Learn More →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;