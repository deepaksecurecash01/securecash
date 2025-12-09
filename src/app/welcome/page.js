import HeroSection from "./components/HeroSection";
import InstructionSection from "./components/InstructionSection";

export const metadata = {
  title: "Welcome | SecureCash",
  description: "To commence our services we require our 3 step signup to be completed. These steps provide us with all details we need to perform our services to your business.",
  robots: "noindex, follow",
  alternates: {
    canonical: 'https://www.securecash.com.au/welcome',
  },
  openGraph: {
    title: "Welcome | SecureCash",
    description: "To commence our services we require our 3 step signup to be completed. These steps provide us with all details we need to perform our services to your business.",
    url: 'https://www.securecash.com.au/welcome',
    images: [
      {
        url: 'https://www.securecash.com.au/images/welcome/welcome-hero-img.jpg',
        width: 1200,
        height: 630,
        alt: 'Welcome to SecureCash Signup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Welcome | SecureCash",
    description: "To commence our services we require our 3 step signup to be completed. These steps provide us with all details we need to perform our services to your business.",
    images: ['https://www.securecash.com.au/images/welcome/welcome-hero-img.jpg'],
  },
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