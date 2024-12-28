import Banner from "@/components/bnr";
import ContentContact from "@/components/ContentContact";
import NewBanner from "@/components/newbanner";
import Welcome from "@/components/Welcome";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" ">
      <Banner />
      <Welcome />
      <NewBanner />
      <ContentContact />
    </div>
  );
}
