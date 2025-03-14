import { notFound } from "next/navigation";
import { blogPosts } from "../../../../blogData";
import BlogHeroSection from "@/components/blog/BlogHeroSection";

export async function generateStaticParams()
{
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function BlogPost({ params })
{
  const blog = blogPosts.find((post) => post.id.toString() === params.slug);

  if (!blog) {
    notFound(); // Shows a 404 page if the blog is not found
  }

  return (

    <>
      <Head>
        <title>{blog.title} | SecureCash</title>
        <meta name="description" content={blog.title} />
      </Head>

      <BlogHeroSection title={blog.title} date={blog.date} />

      <section className="blog-single-main">
        <div className="inner">
          <div className="blog-single-main--wrap">
            <div className="blog-single-main--social">
              <ul className="blog-single-main--social__list">
                <li>
                  <a target="_blank" href={blog.socialLinks.twitter} rel="noopener">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href={blog.socialLinks.facebook} rel="noopener">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href={blog.socialLinks.linkedin} rel="noopener">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="blog-single-main--content">
              <img
                src={blog.featuredImage}
                className="blog-single-main--content__feature-img"
                alt={blog.images[0].alt}
                width={blog.images[0].width}
                height={blog.images[0].height}
              />
              <article className="blog-content-wrap">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </article>
            </div>
          </div>
          {/* This is where you'd render latest posts component */}
          <div className="blog--footer-latest-post">
            {/* Your latest posts component would go here */}
          </div>
        </div>
      </section>
    </>
  );
}
