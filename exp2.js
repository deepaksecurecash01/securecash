import Link from "next/link";
import Typography from "@/components/common/Typography";
import Container from "@/components/layout/Container";

const BlogIndex = () =>
{
  const blogPosts = [
    {
      id: "banking-updates-april-2021",
      href: "https://www.securecash.com.au/blog/banking-updates-april-2021/",
      imgSrc: "https://www.securecash.com.au/images/blog/banking-updates-april-2021-featured-img.jpg",
      alt: "Banking Updates April 2021",
      title: "Banking Updates April 2021",
    },
    {
      id: "differences-between-cit-models",
      href: "https://www.securecash.com.au/blog/differences-between-cit-models/",
      imgSrc: "https://www.securecash.com.au/images/blog/differences-between-cit-models-featured-img.jpg",
      alt: "Differences Between... CIT Models",
      title: "Differences Between... CIT Models",
    },
    {
      id: "history-of-banks-part-2",
      href: "https://www.securecash.com.au/blog/history-of-banks-part-2/",
      imgSrc: "https://www.securecash.com.au/images/blog/history-of-banks-img-2.jpg",
      alt: "History of Banks - Part 2",
      title: "History of Banks - Part 2",
    },
    {
      id: "history-of-banks-part-1",
      href: "https://www.securecash.com.au/blog/history-of-banks-part-1/",
      imgSrc: "https://www.securecash.com.au/images/blog/history-of-banks-featured-img.jpg",
      alt: "History of Banks - Part 1",
      title: "History of Banks - Part 1",
    },
    {
      id: "creating-online-services",
      href: "https://www.securecash.com.au/blog/creating-online-services/",
      imgSrc: "https://www.securecash.com.au/images/blog/creating-online-services-featured-img.jpg",
      alt: "Creating Online Services",
      title: "Creating Online Services",
    },
    {
      id: "what-covid-changes-are-you-keeping",
      href: "https://www.securecash.com.au/blog/what-covid-changes-are-you-keeping/",
      imgSrc: "https://www.securecash.com.au/images/blog/what-covid-changes-are-you-keeping-featured-img.jpg",
      alt: "What Covid Changes are you Keeping?",
      title: "What Covid Changes are you Keeping?",
    },
    {
      id: "paradigm-shifts",
      href: "https://www.securecash.com.au/blog/paradigm-shifts/",
      imgSrc: "https://www.securecash.com.au/images/blog/paradigm-shifts-featured-img.jpg",
      alt: "Paradigm Shifts",
      title: "Paradigm Shifts",
    },
    {
      id: "history-of-cash-in-transit",
      href: "https://www.securecash.com.au/blog/history-of-cash-in-transit/",
      imgSrc: "https://www.securecash.com.au/images/blog/history-of-cash-in-transit-featured-img.jpg",
      alt: "History of Cash in Transit",
      title: "History of Cash in Transit",
    },
    {
      id: "bank-cyber-safety",
      href: "https://www.securecash.com.au/blog/bank-cyber-safety/",
      imgSrc: "https://www.securecash.com.au/images/blog/bank-cyber-safety-featured-img.jpg",
      alt: "Bank Cyber Safety",
      title: "Bank Cyber Safety",
    },
    {
      id: "merry-christmas-2020",
      href: "https://www.securecash.com.au/blog/merry-christmas-2020/",
      imgSrc: "https://www.securecash.com.au/images/blog/merry-christmas-2020-featured-img.jpg",
      alt: "Merry Christmas 2020",
      title: "Merry Christmas 2020",
    },
    {
      id: "terminology-of-cash-in-transit",
      href: "https://www.securecash.com.au/blog/terminology-of-cash-in-transit/",
      imgSrc: "https://www.securecash.com.au/images/blog/blog-terminology-of-cit-featured-img.jpg",
      alt: "Terminology of Cash in Transit",
      title: "Terminology of Cash in Transit",
    },
    {
      id: "differences-between-banks",
      href: "https://www.securecash.com.au/blog/differences-between-banks/",
      imgSrc: "https://www.securecash.com.au/images/blog/differences-between-banks-featured-img.jpg",
      alt: "Differences Between... Banks",
      title: "Differences Between... Banks",
    },
    {
      id: "negative-interest-rates",
      href: "https://www.securecash.com.au/blog/negative-interest-rates/",
      imgSrc: "https://www.securecash.com.au/images/blog/laptop.jpg",
      alt: "Negative Interest Rates",
      title: "Negative Interest Rates",
    },
    {
      id: "the-relevance-of-cash",
      href: "https://www.securecash.com.au/blog/the-relevance-of-cash/",
      imgSrc: "https://www.securecash.com.au/images/blog/relevance-of-cash-featured-img.jpg",
      alt: "The Relevance of Cash",
      title: "The Relevance of Cash",
    },
    {
      id: "office-culture",
      href: "https://www.securecash.com.au/blog/office-culture/",
      imgSrc: "https://www.securecash.com.au/images/blog/featured-img-office-culture.jpg",
      alt: "Office Culture",
      title: "Office Culture",
    },
  ];



  return (
    <section className="blog-index-main mb-[90px] mt-[84px]">
      <Container className="inner-grid w-full max-[1366px]:max-w-[1280px]">
        <div className="blog-index-main--content flex flex-wrap p-0 mx-[15px] 1280px:mx-0 px-[60px] 768px:px-[12px] 1280px:px-0">
          {blogPosts.map((item, index) => (
            <div key={index} className="blog-index-main--content-item w-full  768px:w-1/3 px-2 mb-[38px]  1024px:px-[12px] ">
              <Link href={`/blog/${item.id}`} className="flex flex-wrap justify-center transition-all duration-200 ease-in">
                <img
                  src={item.imgSrc}
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
                <a href={item.href} className="flex flex-wrap justify-center transition-all duration-200 ease-in">{item.title}</a>
              </Typography>

            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BlogIndex;
