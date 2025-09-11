import HeadlineContent from "./components/HeadlineContent";
import FormSection from "./components/FormSection";
import BottomBanner from "@/components/about-us/BottomBanner";
import BusinessTypeModal from "./components/BusinessTypeModal";
import ThankYouModal from "../../components/common/forms-new/forms/ThankYouModal";
import SiteInfoForm from "@/components/common/forms-new/forms/SiteInfoForm";

const Page = () =>
{

  return (
    <div>
      <ThankYouModal type="Business" />
      <HeadlineContent />
      <SiteInfoForm />
      <BottomBanner />
    </div>
  );
};

export default Page;
