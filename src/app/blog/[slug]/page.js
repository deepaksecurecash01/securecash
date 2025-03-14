import { notFound } from "next/navigation";
import { blogPosts } from "../../../../blogData";
import BlogHeroSection from "@/components/blog/BlogHeroSection";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Container from "@/components/layout/Container";
import BlogLatestPost from "@/components/blog/BlogLatestPost";
import BottomBanner from "@/components/about-us/BottomBanner";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id.toString(),
  }));
}
export async function generateMetadata({ params }) {
  const { slug } = params;
  const blog = blogPosts.find((post) => post.id.toString() === slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  return {
    title: `${blog.title} | SecureCash`,
    description: blog.title,
  };
}
export default async function BlogPost({ params }) {
  // Make the component async
  const { slug } = params; // Destructure params first

  const blog = blogPosts.find((post) => post.id.toString() === slug);

  if (!blog) {
    notFound(); // Shows a 404 page if the blog is not found
  }

  return (
    <>
      <BlogHeroSection title={blog.title} date={blog.date} />

      <section className="blog-single-main">
        <Container className="inner w-full">
          <div className="blog-single-main--wrap">
            <div className="blog-single-main--social">
              <ul className="blog-single-main--social__list">
                <li>
                  <a
                    target="_blank"
                    href={blog.socialLinks.twitter}
                    rel="noopener"
                  >
                    <FaTwitter size={20} className=" text-primary" />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href={blog.socialLinks.facebook}
                    rel="noopener"
                  >
                    <FaFacebookF size={20} className=" text-primary" />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href={blog.socialLinks.linkedin}
                    rel="noopener"
                  >
                    <FaLinkedinIn size={20} className=" text-primary" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="blog-single-main--content">
              <Image
                src={blog.featuredImage}
                className="blog-single-main--content__feature-img"
                alt={blog.images[0].alt}
                width={blog.images[0].width}
                height={blog.images[0].height}
                priority={true}
              />
              <article className="blog-content-wrap">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                <p>
                  <br />
                  <Link href="/blog/">&lt;&lt; Blog Home</Link>
                </p>
              </article>
            </div>
          </div>
          {/* This is where you'd render latest posts component */}
            <BlogLatestPost/>
        </Container>

      </section>
      <BottomBanner />

    </>
  );
}
