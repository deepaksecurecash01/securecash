import { notFound } from "next/navigation";
import { blogPosts } from "../../../data/blogData";
import BlogHeroSection from "@/app/blog/components/BlogHeroSection";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Container from "@/components/layout/Container";
import BlogLatestPost from "@/app/blog/components/BlogLatestPost";
import BottomBanner from "@/components/common/BottomBanner";
import { parseHtml } from "@/utils/htmlParser";
import './blog-single.css';

export async function generateStaticParams()
{
  return blogPosts.map((post) => ({
    slug: post.id.toString(),
  }));
}

export async function generateMetadata({ params })
{
  const paramsData = await params;
  const { slug } = paramsData;
  const blog = blogPosts.find((post) => post.id.toString() === slug);

  if (!blog) {
    return { title: "Blog Post Not Found", description: "The requested blog post could not be found" };
  }

  return { title: `${blog.title} | SecureCash`, description: blog.title };
}

export default async function BlogPost({ params })
{
  const paramsData = await params;
  const { slug } = paramsData;
  const blog = blogPosts.find((post) => post.id.toString() === slug);

  if (!blog) notFound();

  return (
    <>
      <BlogHeroSection title={blog.title} date={blog.date} />

      <section className="blog-single-main">
        <Container className="inner w-full">
          <div className="blog-single-main--wrap">
            <div className="blog-single-main--social mb-[60px] 480px:mb-0 top-[10px] w-full 1024px:w-[18%] 1024px:top-[58px] absolute z-[10]">
              <ul className="blog-single-main--social__list list-none flex-row w-[200px] 1024px:w-auto justify-around 1024px:justify-normal mx-auto 1024px:mx-0 flex items-center 1024px:flex-col">
                <li className="mb-[26px]">
                  <a
                    target="_blank"
                    href={blog.socialLinks.twitter}
                    rel="noopener"
                    className="group bg-[#f2f2f2] rounded-full h-[36px] w-[36px] flex justify-center items-center transition-all duration-150 ease-in hover:bg-black hover:text-white hover:no-underline"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter size={20} className="text-primary group-hover:text-white" />
                  </a>
                </li>
                <li className="mb-[26px]">
                  <a
                    target="_blank"
                    href={blog.socialLinks.facebook}
                    rel="noopener"
                    className="group bg-[#f2f2f2] rounded-full h-[36px] w-[36px] flex justify-center items-center transition-all duration-150 ease-in hover:bg-black hover:text-white hover:no-underline"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebookF size={20} className="text-primary group-hover:text-white" />
                  </a>
                </li>
                <li className="mb-[26px]">
                  <a
                    target="_blank"
                    href={blog.socialLinks.linkedin}
                    rel="noopener"
                    className="group bg-[#f2f2f2] rounded-full h-[36px] w-[36px] flex justify-center items-center transition-all duration-150 ease-in hover:bg-black hover:text-white hover:no-underline"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedinIn size={20} className="text-primary group-hover:text-white" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="blog-single-main--content">
              <Image
                src={blog.featuredImage}
                className="blog-single-main--content__feature-img"
                alt={blog.images?.[0]?.alt || blog.title}
                width={blog.images?.[0]?.width || 900}
                height={blog.images?.[0]?.height || 420}
                priority
              />
              <article className="blog-content-wrap">
                {parseHtml(blog.content)}
                <p>
                  <br />
                  <Link href="/blog/">&lt;&lt; Blog Home</Link>
                </p>
              </article>
            </div>
          </div>
          <BlogLatestPost />
        </Container>
      </section>
      <BottomBanner />
    </>
  );
}