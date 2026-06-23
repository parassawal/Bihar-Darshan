import Carousel from "../common/Carousel";
import CommunityCard from "./CommunityCard";

// Reuse some existing images for communities
import bodhGayaImg from "../../assets/bodh-gaya.png";
import nalandaImg from "../../assets/nalanda.png";
import rajgirImg from "../../assets/rajgir.png";
import vaishaliImg from "../../assets/vaishali.png";
import patnaSahibImg from "../../assets/patna-sahib.png";
import pawapuriImg from "../../assets/pawapuri.png";

const communities = [
  {
    name: "Bhumihar Community",
    subtitle: "Traditions of the Land",
    image: bodhGayaImg,
  },
  {
    name: "Yadav Community",
    subtitle: "Strength in Heritage",
    image: nalandaImg,
  },
  {
    name: "Kayastha Community",
    subtitle: "Scholars & Writers",
    image: rajgirImg,
  },
  {
    name: "Mishra Community",
    subtitle: "Pillars of Knowledge",
    image: vaishaliImg,
  },
  {
    name: "Rajput Community",
    subtitle: "Legacy of Valor",
    image: patnaSahibImg,
  },
  {
    name: "Paswan Community",
    subtitle: "Voices of Change",
    image: pawapuriImg,
  },
];

const CommunitySection = () => {
  return (
    <section id="community" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          title="Discover Community"
          subtitle="Communities"
          actionLabel="View All Communities"
          actionHref="#community"
        >
          {communities.map((community, index) => (
            <CommunityCard
              key={community.name}
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
