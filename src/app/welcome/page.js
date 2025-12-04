import HeroSection from "./components/HeroSection";
import InstructionSection from "./components/InstructionSection";

export const metadata = {
  title: 'Welcome - SecureCash',
  description: 'Thank you for choosing SecureCash for your cash in transit services. Complete our online sign-up in just 10 minutes to get started with Australia\'s trusted security service provider.',
};

const WelcomePage = () =>
{
  return (
    <>
      <HeroSection />
      <InstructionSection />
    </>
  );
};

export default WelcomePage;