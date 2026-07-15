import { Link } from "react-router-dom";

interface DistrictGridCardProps {
  name: string;
  image: string;
}

const DistrictGridCard = ({ name, image }: DistrictGridCardProps) => {
  return (
    <Link
      to={`/districts/${name.toLowerCase()}`}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer"
    >
      {/* Image — fills all available vertical space */}
      <div className="relative flex-1 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content — name + Explore button */}
      <div className="px-4 pt-3.5 pb-4 flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-bold text-gray-900 leading-tight truncate">
          {name}
        </h3>

        <span className="flex-shrink-0 px-4 py-1.5 rounded-full bg-gold text-white text-[11px] font-bold uppercase tracking-wider shadow-sm group-hover:bg-gold-dark transition-colors duration-300">
          Explore
        </span>
      </div>
    </Link>
  );
};

export default DistrictGridCard;
