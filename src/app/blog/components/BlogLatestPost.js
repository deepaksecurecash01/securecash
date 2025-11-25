import Link from "next/link";
import Image from "next/image"; // 🚀 Import Image
import Container from "@/components/layout/Container";
import { blogPosts } from "../../../data/blogData";

const BlogLatestPost = () =>
{
  const sortedPosts = [...blogPosts].sort((a, b) =>
  {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  const limitedPosts = sortedPosts.slice(0, 3);

  return (
    <div className="blog-single-main--footer">
      <h4 className="font-bold leading-[2rem] text-center max-[414px]:text-[36px] text-[30px] z-30 mb-[20px] font-montserrat">
        Latest post
      </h4>
      <hr className="w-[100px] mt-[6px] mb-[16px] mx-auto 768px:ml-0 768px:mr-auto h-[4px] rounded-[5px] border-0 bg-primary" />
      <div className="inner-grid">
        <section className="blog-index-main blog-index-footer">
          <Container className="inner-grid w-full max-[1366px]:max-w-[1280px]">
            <div className="blog-index-main--content flex flex-wrap p-0 mx-[15px] 1280px:mx-0 768px:px-[12px] 1280px:px-0">
              {limitedPosts.map((item, index) => (
                <div
                  key={index}
                  className="blog-index-main--content-item w-full 768px:w-1/2 1024px:w-1/3 px-2 mb-[38px] 1024px:px-[12px]"
                >
                  <Link href={`/blog/${item.id}`} className="flex flex-wrap justify-center transition-all duration-200 ease-in group">
                    <div className="relative w-full h-[220px] 414px:h-[240px] 480px:h-[270px] 768px:h-[200px] 1024px:h-[240px] mb-[12px]">
                      {/* 🚀 OPTIMIZATION: next/image with fill */}
                      <Image
                        src={item.featuredImage}
                        className="object-cover w-full h-full"
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                  <h4 className="text-[22px] font-bold text-primary text-center 768px:text-left pb-5 font-montserrat">
                    <Link href={`/blog/${item.id}`} className="flex flex-wrap justify-center transition-all duration-200 ease-in">
                      {item.title}
                    </Link>
                  </h4>
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