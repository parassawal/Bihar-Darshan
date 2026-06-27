import { Phone, Mail } from "lucide-react";

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
    <div className="relative h-[420px] rounded-[24px] overflow-hidden bg-white shadow-lg group cursor-pointer">

      {/* Image */}
      <div
        className="
          absolute top-0 left-0 right-0 h-full
          group-hover:h-[48%]
          transition-all duration-700
          ease-[cubic-bezier(0.25,1,0.5,1)]
          overflow-hidden
        "
      >
        <img
          src={image}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-700" />
      </div>

      {/* Content */}
      <div
        className="
          absolute left-0 right-0 bottom-0
          bg-white rounded-t-3xl
          p-5
          translate-y-[72%]
          group-hover:translate-y-0
          transition-all duration-700
          ease-[cubic-bezier(0.25,1,0.5,1)]
        "
      >
        {/* Always Visible */}
        <h3 className="text-2xl font-bold text-gray-900">
          {productName}
        </h3>

        {/* Hidden on normal, visible on hover */}
        <div
          className="
            opacity-0
            max-h-0
            overflow-hidden
            group-hover:opacity-100
            group-hover:max-h-[300px]
            transition-all
            duration-500
            delay-150
          "
        >
          {/* Business Name */}
          <p className="text-orange-500 font-semibold mt-2">
            {businessName}
          </p>

          {/* Contact */}
          <div className="flex items-center gap-2 mt-4 text-gray-600">
            <Phone size={18} />
            <span>{contact}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 mt-3 text-gray-600">
            <Mail size={18} />
            <span className="truncate">{email}</span>
          </div>

          {/* Button */}
          <button
            onClick={() => onMoreInfo(id)}
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;