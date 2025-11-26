import AIAssistant from "@/components/home/AIAssistant";
import { CtaSection } from "@/components/home/CtaAction";
import { FavoriteTours } from "@/components/home/FavoriteTours";
import Hero from "@/components/home/Hero";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { SpecialPromotions } from "@/components/home/SpecialPromotions";
import { TourSearchForm } from "@/components/home/TourSearchForm";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="px-20 relative">
        <TourSearchForm />
      </div>
      <PopularDestinations />
      <FavoriteTours />
      <SpecialPromotions />
      <CtaSection />
      <AIAssistant />
    </div>
  );
};

export default Home;
