import CompaniesSlider from "@/components/common/CompaniesSlider";
import FranchiseForm from "@/app/franchise/FormSection";
import HeroImage from "@/app/franchise/HeroImage";
import SectionWrapper from "@/app/franchise/SectionWrapper";

export const metadata = {
  title: 'Franchise Opportunities - SecureCash',
  description: 'Join Australia and New Zealand\'s largest banking courier network with your own SecureCash franchise. Full-time franchise from day one with buy-in from $5k to $25k.',
};

const FranchisePage = () =>
{
  return (
    <>
      <main id="content">
        <HeroImage />
        <div className="spacer-lg h-[30px] 768px:h-[100px]" id="read-more" />
        <SectionWrapper />
      </main>
      <div className="spacer-lg h-[30px] 768px:h-[80px] 1024px:h-[100px]" id="franchise-form" />
      <FranchiseForm />
      <CompaniesSlider />
    </>
  );
};

export default FranchisePage;