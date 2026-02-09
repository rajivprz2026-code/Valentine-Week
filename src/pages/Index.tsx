import HeroSection from "../components/HeroSection";
import ValentineWeek from "../components/ValentineWeek";
import FlowerGallery from "../components/FlowerGallery";
import RoseFooter from "../components/RoseFooter";
import BackgroundMusic from "../components/BackgroundMusic";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <BackgroundMusic />
      <HeroSection />
      <ValentineWeek />
      <FlowerGallery />
      <RoseFooter />
    </div>
  );
};

export default Index;
