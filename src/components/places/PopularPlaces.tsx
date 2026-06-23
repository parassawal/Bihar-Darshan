import Carousel from "../common/Carousel";
import PlaceCard from "./PlaceCard";

import bodhGayaImg from "../../assets/bodh-gaya.png";
import nalandaImg from "../../assets/nalanda.png";
import rajgirImg from "../../assets/rajgir.png";
import vaishaliImg from "../../assets/vaishali.png";
import patnaSahibImg from "../../assets/patna-sahib.png";
import pawapuriImg from "../../assets/pawapuri.png";

const places = [
  { name: "Bodh Gaya", district: "Gaya District", image: bodhGayaImg },
  { name: "Nalanda", district: "Nalanda District", image: nalandaImg },
  { name: "Rajgir", district: "Nalanda District", image: rajgirImg },
  { name: "Vaishali", district: "Vaishali District", image: vaishaliImg },
  { name: "Patna Sahib", district: "Patna District", image: patnaSahibImg },
  { name: "Pawapuri", district: "Nalanda District", image: pawapuriImg },
];

const PopularPlaces = () => {
  return (
    <section id="places" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          title="Popular Places You Must Visit"
          subtitle="Explore"
        >
          {places.map((place, index) => (
            <PlaceCard
              key={place.name}
              image={place.image}
              name={place.name}
              district={place.district}
              index={index}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default PopularPlaces;
