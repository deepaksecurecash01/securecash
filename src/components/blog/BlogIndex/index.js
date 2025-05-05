import Link from "next/link";
import Typography from "@/components/common/Typography";
import Container from "@/components/layout/Container";
import { blogPosts } from "../../../../blogData";

const BlogIndex = () =>
{
    // Sort blog posts by date (newest first)
    const sortedPosts = [...blogPosts].sort((a, b) =>
    {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });


    return (
        <section className="blog-index-main mb-[90px] mt-[84px]">
            <Container className="inner-grid w-full max-[1366px]:max-w-[1280px]">
                <div className="blog-index-main--content flex flex-wrap p-0 mx-[15px] 1280px:mx-0  768px:px-[12px] 1280px:px-0">
                    {sortedPosts.map((item, index) => (
                        <div key={index} className="blog-index-main--content-item w-full 768px:w-1/2 1024px:w-1/3 px-2 mb-[38px] 1024px:px-[12px]">
                            <Link href={`/blog/${item.id}`} className="flex flex-wrap justify-center transition-all duration-200 ease-in">
                                <img
                                    src={item.featuredImage}
                                    className="blog-index-main--content-item__img blog-content-img-right h-[220px] 414px:h-[240px] 480px:h-[270px] 768px:h-[200px] 1024px:h-[240px] mb-[12px]  object-cover w-full object-[100%_100%]"
                                    alt={item.alt}
                                    width="431"
                                    height="240"
                                />
                            </Link>
                            <Typography
                                as="h4"
                                fontFamily="font-montserrat"
                                className="text-[22px] font-bold text-primary text-center 768px:text-left pb-5"
                            >
                                <Link href={`/blog/${item.id}`} className="flex flex-wrap justify-center transition-all duration-200 ease-in">{item.title}</Link>
                            </Typography>
                           
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default BlogIndex;