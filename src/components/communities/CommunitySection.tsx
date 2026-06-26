import Carousel from "../common/Carousel";
import CommunityCard from "./CommunityCard";
import useCollection from "../../hooks/useCollection";
import { useTranslation } from "react-i18next";

interface Community {
  name: string;
  subtitle: string;
  image: string;
  id: string;
}

const CommunitySection = () => {
  const { t } = useTranslation();
  const { data: communities, loading } = useCollection<Community>("communities");

  if (loading) {
    return (
      <section id="community" className="py-16 sm:py-20 lg:py-24 flex justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (communities.length === 0) return null;

  return (
    <section id="community" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          title={t('sections.communities_title')}
          subtitle={t('sections.communities_subtitle')}
          actionLabel={t('sections.communities_action')}
          actionHref="/community"
        >
          {communities.map((community, index) => (
            <CommunityCard
              key={community.id}
              image={community.image}
              name={community.name}
              subtitle={community.subtitle}
              index={index}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default CommunitySection;
