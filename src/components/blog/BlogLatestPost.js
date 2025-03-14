import Link from "next/link";
import Typography from "@/components/common/Typography";
import Container from "@/components/layout/Container";
import { blogPosts } from "../../../blogData";
import Divider from "../common/Divider";

const BlogLatestPost = () => {
  // Sort blog posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  // Limit to only 3 posts
  const limitedPosts = sortedPosts.slice(0, 3);

  return (
      <div className="blog-single-main--footer">
          <Typography
              as="h4"
              fontFamily="montserrat"
              className=" font-bold leading-[2rem] text-center max-[414px]:text-[36px] text-[30px] z-30 mb-[20px]"
          >
Latest post          </Typography>
      <Divider
        color="primary"
        margin="mt-[6px] mb-[16px]"
        alignment="left"
        responsiveClassName="992px:mx-0 992px:text-left"
      />
      <div class="inner-grid">
        <section class="blog-index-main blog-index-footer">
          <Container className="inner-grid w-full max-[1366px]:max-w-[1280px]">
            <div className="blog-index-main--content flex flex-wrap p-0 mx-[15px] 1280px:mx-0 px-[60px] 768px:px-[12px] 1280px:px-0">
              {limitedPosts.map((item, index) => (
                <div
                  key={index}
                  className="blog-index-main--content-item w-full 768px:w-1/3 px-2 mb-[38px] 1024px:px-[12px]"
                >
                  <Link
                    href={`/blog/${item.id}`}
                    className="flex flex-wrap justify-center transition-all duration-200 ease-in"
                  >
                    <img
                      src={item.featuredImage}
                      className="blog-index-main--content-item__img blog-content-img-right h-[220px] 414px:h-[240px] 480px:h-[270px] 768px:h-[200px] 1024px:h-[240px] mb-[12px] object-cover w-full object-[100%_100%]"
                      alt={item.alt}
                      width="431"
                      height="240"
                    />
                  </Link>
                  <Typography
                    as="h4"
                    fontFamily="font-montserrat"
                    className="text-[22px] font-bold text-primary text-left pb-5"
                  >
                    <Link
                      href={`/blog/${item.id}`}
                      className="flex flex-wrap justify-center transition-all duration-200 ease-in"
                    >
                      {item.title}
                    </Link>
                  </Typography>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default BlogLatestPost;
