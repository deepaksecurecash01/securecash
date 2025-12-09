import BottomBanner from '@/components/common/BottomBanner';
import BlogHeroSection from '@/app/blog/components/BlogHeroSection';
import BlogIndex from '@/app/blog/components/BlogIndex';

export const metadata = {
  title: "Blog Home | Thanks For Being My Sounding Board",
  description: "Stay up to date on current SecureCash news, stories, articles, trends, and anything from Jo's Desk that can greatly help your business in Australia.",
  alternates: {
    canonical: 'https://www.securecash.com.au/blog',
  },
  openGraph: {
    title: "Blog Home | Thanks For Being My Sounding Board",
    description: "Stay up to date on current SecureCash news, stories, articles, trends, and anything from Jo's Desk that can greatly help your business in Australia.",
    url: 'https://www.securecash.com.au/blog',
    images: [
      {
        url: 'https://www.securecash.com.au/images/team.webp',
        width: 1200,
        height: 630,
        alt: 'SecureCash Blog - Team Photo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Blog Home | Thanks For Being My Sounding Board",
    description: "Stay up to date on current SecureCash news, stories, articles, trends, and anything from Jo's Desk that can greatly help your business in Australia.",
    images: ['https://www.securecash.com.au/images/team.webp'],
  },
};

const BlogPage = () =>
{
  return (
    <main>
      <BlogHeroSection title="Thanks for being my sounding board" date="News, Articles & Updates From Us" blogIndex={true} />
      <BlogIndex />
      <BottomBanner />
    </main>
  );
};

export default BlogPage;