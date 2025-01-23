import Banner from "@/components/homepage/BannerSection";
import Welcome from "@/components/homepage/WelcomeSection";
import MidBanner from "@/components/homepage/MidBanner";
import FormSection from "@/components/homepage/FormSection";
import CardsSection from "@/components/homepage/CardsSection";
import CompaniesSlider from "@/components/common/CompaniesSlider";
import TeamContent from "@/components/homepage/TeamSection";

export default function Home() {
  return (
    <>
      <Banner />
      <Welcome />
      <MidBanner />
      <FormSection />
      <CardsSection />
      <TeamContent />
      <CompaniesSlider />
    </>
  );
}
