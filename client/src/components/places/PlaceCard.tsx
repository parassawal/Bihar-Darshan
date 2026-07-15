
interface PlaceCardProps {
  image: string;
  name: string;
  district: string;
  description: string;
  index: number;
}

const PlaceCard = ({ image, name, district, description }: PlaceCardProps) => {
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

        {/* Gradient overlay — deepens on hover for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-all duration-500 group-hover:from-black/85 group-hover:via-black/40" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-semibold text-lg leading-tight">
            {name}
          </h3>
          <p className="text-white/70 text-sm mt-1">{district}</p>

          {/* Description — slides up and fades in on hover */}
          <p
            className="
              text-white/85 text-xs leading-relaxed mt-3
              max-h-0 overflow-hidden opacity-0
              translate-y-3
              transition-all duration-500 ease-out
              group-hover:max-h-24 group-hover:opacity-100 group-hover:translate-y-0
            "
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;

