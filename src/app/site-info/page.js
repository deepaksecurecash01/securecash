import HeadlineContent from "./components/HeadlineContent";
import FormSection from "./components/FormSection";
import BottomBanner from "@/components/about-us/BottomBanner";
import BusinessTypeModal from "./components/BusinessTypeModal";
import ThankYouModal from "./components/ThankYouModal";

const Page = () =>
{

  return (
    <div>
      <ThankYouModal type="Business" />
      <HeadlineContent />
      <FormSection />
      <BottomBanner />
    </div>
  );
};

export default Page;
