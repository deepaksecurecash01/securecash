import BottomBanner from '@/components/common/BottomBanner';
import BlogHeroSection from '@/app/blog/components/BlogHeroSection';
import BlogIndex from '@/app/blog/components/BlogIndex';

export const metadata = {
  title: 'Blog - SecureCash',
  description: 'News, Articles & Updates From Us. Stay informed with the latest insights from SecureCash.',
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