import Banner from "@/components/bnr";
import BottomContent from "@/components/BottomContent";
import ContentContact from "@/components/ContentContact";
import NewBanner from "@/components/newbanner";
import TeamContent from "@/components/TeamContent";
import Welcome from "@/components/Welcome";
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
    </div>
  );
}
