import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ShareStorySection from "../components/cta/ShareStorySection";
import Hero from "../components/tourism/Hero";
import FeaturedJourneys from "../components/tourism/FeaturedJourneys";
import TopDestinations from "../components/tourism/TopDestinations";
import TravelGuide from "../components/tourism/TravelGuide";

const Tourism = () => {
  return (
    <main className="bg-[#F8F5EF] selection:bg-brand-gold selection:text-brand-dark font-sans relative overflow-x-hidden">
      <Navbar />

      <Hero />

      <FeaturedJourneys />


      <TopDestinations />

      <TravelGuide />

      <ShareStorySection />
      <Footer />

      {/* Global Aesthetics Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-multiply">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
      </div>
    </main>
  );
};

export default Tourism;
