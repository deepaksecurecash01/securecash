import HeadlineContent from "./components/HeadlineContent";
import BottomBanner from "@/components/common/BottomBanner";
import ThankYouModal from "@/components/common/forms-new/forms/ThankYouModal";
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
