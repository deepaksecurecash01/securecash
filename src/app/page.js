import Banner from "@/component/common/Banner";
import BottomContent from "@/components/BottomContent";
import CompaniesSlider from "@/components/CompaniesSlider";
import ContentContact from "@/components/ContentContact";
import NewBanner from "@/components/newbanner";
import TeamContent from "@/components/TeamContent";
import Welcome from "@/components/common/Welcome";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" ">
      <Banner />
      <Welcome />
      <NewBanner />
      <ContentContact />
      <BottomContent />
      <TeamContent />
      <CompaniesSlider />
    </div>
  );
}
