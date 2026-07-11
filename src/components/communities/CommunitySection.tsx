import { Link } from "react-router-dom";
import { communities } from "../../data/communityData";
import CommunityCard from "./CommunityCard";
import Carousel from "../common/Carousel";

const featuredCommunities = communities.slice(0, 5);

const CommunitySection = () => {
  return (
    <section id="community" className="py-16 sm:py-20 lg:py-24 overflow-hidden">
      <Carousel
        title="Discover Community"
        subtitle="Communities"
        actionLabel="View All Communities"
        actionHref="/community"
      >
        {featuredCommunities.map((community, index) => (
          <Link key={community.id} to={`/community?id=${community.id}`} className="block">
            <CommunityCard
              image={community.image}
              name={community.name}
              subtitle={community.subtitle}
              index={index}
            />
          </Link>
        ))}
      </Carousel>
    </section>
  );
};

export default CommunitySection;
