import Carousel from "../common/Carousel";
import PlaceCard from "./PlaceCard";
import useCollection from "../../hooks/useCollection";
import { useTranslation } from "react-i18next";

interface Place {
  name: string;
  district: string;
  image: string;
}

const PopularPlaces = () => {
  const { data: places, loading } = useCollection<Place>("places");
  const { t } = useTranslation();

  if (loading) {
    return (
      <section id="places" className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 flex justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (places.length === 0) return null;

  return (
    <section id="places" className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
      <Carousel title={t('sections.popular_places_title')} subtitle={t('sections.popular_places_subtitle')}>
        {places.map((place, index) => (
          <PlaceCard
            key={place.id}
            image={place.image}
            name={place.name}
            district={place.district}
            index={index}
          />
        ))}
      </Carousel>
    </section>
  );
};

export default PopularPlaces;
