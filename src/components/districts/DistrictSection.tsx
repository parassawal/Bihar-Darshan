import Carousel from "../common/Carousel";
import DistrictCard from "./DistrictCard";
import useCollection from "../../hooks/useCollection";
import { useTranslation } from "react-i18next";

interface District {
  name: string;
  image: string;
}

const DistrictSection = () => {
  const { t } = useTranslation();
  const { data: districts, loading } = useCollection<District>("districts");

  if (loading) {
    return (
      <section id="districts" className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 flex justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (districts.length === 0) return null;

  return (
    <section id="districts" className="pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
      <Carousel
        title={t('sections.districts_title')}
        subtitle={t('sections.districts_subtitle')}
        actionLabel={t('sections.districts_action')}
        actionHref="#districts"
      >
        {districts.map((district, index) => (
          <DistrictCard
            key={district.id}
            image={district.image}
            name={district.name}
            index={index}
          />
        ))}
      </Carousel>
    </section>
  );
};

export default DistrictSection;
