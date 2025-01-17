import Banner from "@/components/common/Banner/Banner";
import BottomContent from "@/components/BottomContent";
import CompaniesSlider from "@/components/CompaniesSlider";
import ContentContact from "@/components/ContentContact";
import NewBanner from "@/components/newbanner";
import TeamContent from "@/components/TeamContent";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <>
      <Banner />
      <Welcome />
      <NewBanner />
      <ContentContact />
      <BottomContent />
      <TeamContent />
      <CompaniesSlider />
    </>
  );
}
