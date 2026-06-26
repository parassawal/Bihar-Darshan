import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";

interface PlaceCardProps {
  image: string;
  name: string;
  district: string;
  index: number;
}

const PlaceCard = ({ image, name, district }: PlaceCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="group flex-shrink-0 w-[260px] sm:w-[280px] cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />


        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-semibold text-lg leading-tight">
            {name}
          </h3>
          <p className="flex items-center gap-1.5 text-white/80 text-[13px] font-medium tracking-wide mt-1">
            <MapPin size={14} className="text-gold" />
            {t(`districts.${district}`, district)}
          </p>
        </div>
      </div>
    </div>
  );
};


export default PlaceCard;
