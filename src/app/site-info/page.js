import HeadlineContent from "./components/HeadlineContent";
import BottomBanner from "@/components/common/BottomBanner";
import ThankYouModal from "@/components/common/forms-new/forms/ThankYouModal";
import SiteInfoForm from "@/components/common/forms-new/forms/SiteInfoForm";

export const metadata = {
  title: "Site Information - Secure Cash",
  description: "Provide your location information for secure cash collection and delivery services.",
};

const Page = () =>
{
  return (
    <>
      <ThankYouModal type="Business" />
      <HeadlineContent />
      <SiteInfoForm />
      <BottomBanner />
    </>
  );
};

export default Page;