import Head from "next/head";
import HeroSection from "./components/HeroSection";
import WelcomeSection from "./components/WelcomeSection";
import MidBanner from "./components/MidBanner";
import FormSection from "./components/FormSection";
import CardsSection from "./components/CardsSection";
import CompaniesSlider from "@/components/common/CompaniesSlider";
import TeamContent from "./components/TeamSection";

export default function HomePage()
{
  return (
    <>
      {/* ✅ CRITICAL: Preload first slide images */}
      <Head>
        <link
          rel="preload"
          as="image"
          href="/images/banner/Slide-1-mobile.jpg"
          media="(max-width: 479px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/banner/Slide-1-tablet.jpg"
          media="(min-width: 480px) and (max-width: 1023px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/banner/Slide-1-web.jpg"
          media="(min-width: 1024px)"
          fetchPriority="high"
        />
      </Head>

      <div className="overflow-hidden">
        <HeroSection />
        <WelcomeSection />
        <MidBanner />
        <FormSection />
        <CardsSection />
        <TeamContent />
        <CompaniesSlider />
      </div>
    </>
  );
}