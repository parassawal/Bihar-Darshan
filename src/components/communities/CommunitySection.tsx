import { Link } from "react-router-dom";
import { communities } from "../../data/communityData";
import CommunityCard from "./CommunityCard";
import CommunityCarousel from "./CommunityCarousel";

const featuredCommunities = communities.slice(0, 5);

const CommunitySection = () => {
  return (
    <section id="community" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <CommunityCarousel
          title="Discover Community"
          subtitle="Communities"
          actionLabel="View All Communities"
          actionHref="/community"
        >
          {featuredCommunities.map((community, index) => (
            <Link key={community.id} to="/community" className="block">
              <CommunityCard
                image={community.image}
                name={community.name}
                subtitle={community.subtitle}
                index={index}
              />
            </Link>
          ))}
        </CommunityCarousel>
      </div>
    </section>
  );
};

export default CommunitySection;
