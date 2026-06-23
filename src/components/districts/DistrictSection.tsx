import Carousel from "../common/Carousel";
import DistrictCard from "./DistrictCard";

import nalandaImg from "../../assets/nalanda.png";
import patnaImg from "../../assets/patna-district.png";
import gayaImg from "../../assets/gaya-district.png";
import bhagalpurImg from "../../assets/bhagalpur-district.png";
import muzaffarpurImg from "../../assets/muzaffarpur-district.png";
import darbhangaImg from "../../assets/darbhanga-district.png";

const districts = [
  { name: "Nalanda", image: nalandaImg },
  { name: "Patna", image: patnaImg },
  { name: "Gaya", image: gayaImg },
  { name: "Bhagalpur", image: bhagalpurImg },
  { name: "Muzaffarpur", image: muzaffarpurImg },
  { name: "Darbhanga", image: darbhangaImg },
];

const DistrictSection = () => {
  return (
    <section id="districts" className="py-16 sm:py-20 lg:py-24 bg-bg-section">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          title="Districts of Bihar"
          subtitle="Discover"
          actionLabel="View All Districts"
          actionHref="#districts"
        >
          {districts.map((district, index) => (
            <DistrictCard
              key={district.name}
              image={district.image}
              name={district.name}
              index={index}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default DistrictSection;
