import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";

const Tribals = () => {
  return (
    <div className="min-h-screen bg-brand-gray">
      <Navbar />
      <div className="pt-32 pb-20">
        <Container>
          <div className="text-center py-40">
            <h1 className="text-5xl font-serif text-brand-dark mb-6">Tribes of Bihar</h1>
            <p className="text-gray-500 text-xl italic">Something beautiful is in the works. Stay tuned!</p>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Tribals;
