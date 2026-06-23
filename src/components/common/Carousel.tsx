import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
}

const Carousel = ({
  children,
  title,
  subtitle,
  actionLabel,
  actionHref,
}: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-8 sm:mb-10">
        <div>
          {subtitle && (
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
              {subtitle}
            </p>
          )}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-bold leading-tight">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {actionLabel && (
            <a
              href={actionHref || "#"}
              className="hidden sm:inline-flex text-sm font-medium text-gold hover:text-gold-dark transition-colors mr-4"
            >
              {actionLabel} →
            </a>
          )}
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300 cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:-mx-0 sm:px-0"
      >
        {children}
      </div>
    </div>
  );
};

export default Carousel;
