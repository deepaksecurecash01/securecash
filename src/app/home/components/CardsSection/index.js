import Image from "next/image";
import React from "react";

const ServiceRow = ({ imgSrc, link, title, description }) => (
  <div className="cash-row flex-1 mb-5 992px:mb-0 w-full px-[24px] py-0 float-none my-0 992px:w-[30%] h-auto 992px:h-[495px] 992px:px-4 992px:pb-4 mx-auto pb-6 992px:float-left 1200px:w-[320px] 1366px:w-[68%] rounded-[20px] bg-[#ffffff] 1024px:px-4 1366px:h-auto [box-shadow:-2px_10px_15px_-1px_rgba(0,_0,_0,_0.31)] 1366px:px-10 1366px:pb-[30px]">
    <div className="header-wrapper flex flex-row 992px:flex-col justify-start items-center 992px:items-start mb-[20px] 992px:mb-0">
      {/* ✅ OPTIMIZED: Added loading="lazy" and quality */}
      <Image
        width={80}
        height={80}
        src={imgSrc}
        alt={title}
        loading="lazy"
        quality={85}
        className="w-[80px] mr-[16px] pt-[35px] 992px:w-1/4 bg-brown-overlay 992px:pt-[50px]"
      />
      <h3
        className="text-[#c7a652] text-left font-bold text-[24px] mt-[18px] mb-[15px] 768px:mx-0 992px:text-[20px] font-montserrat"
      >
        <a href={link}>{title}</a>
      </h3>
    </div>

    <p
      className="text-[#3f3f3f] text-left font-light text-[16px] leading-[2em] mb-0 1280px:text-[14px] font-montserrat"
    >
      {description}
    </p>
  </div>
);

const CardsSection = () =>
{
  const services = [
    {
      imgSrc: "/images/icons/cash-collections.png",
      link: "/services/cash-collection/",
      title: "Cash Collection",
      description:
        "Our cash collection service is straight forward and simple to use; but first of all, when we refer to the term 'cash collection' we simply mean we come to your business pick up your money, both cash & cheques and take it to the bank on your behalf!",
    },
    {
      imgSrc: "/images/icons/cash-delivery.png",
      link: "/services/cash-delivery/",
      title: "Cash Delivery",
      description:
        "Another one of our popular cash in transit service that we provide is our cash delivery service. We deliver the amount of cash you require broken down into different denominations as requested, delivered direct to your organization.",
    },
    {
      imgSrc: "/images/icons/cash-counting.png",
      link: "/services/cash-counting/",
      title: "Cash Counting",
      description:
        "Our cash counting is one of the most valued and time saving services that we have to offer. Essentially the same as our cash collection service, but the difference is that the cash collected will be taken back to our depot where it will be sorted and counted.",
    },
  ];

  return (
    <>
      <div
        id="bottom-content"
        className="grid 992px:grid-cols-[50%_50%] clear-both relative h-auto 992px:h-[450px] 1366px:h-[600px] w-full mt-10 1024px:mt-[100px] mx-0 mb-auto"
      >
        <div className="bottom-row-left bg-[#c7a652] w-full mx-auto 1200px:relative">
          <div className="row-container w-[95%] mx-auto py-[40px] 992px:pl-[14px] 992px:w-[490px] mt-[32px] pt-2.5 text-center 1200px:w-[650px] 1366px:w-[683px] 1366px:mr-0 1366px:ml-auto 1024px:mt-10 1366px:mt-[80px] text-[#fff]">
            <hr
              className="w-[100px] mb-6 mx-auto 992px:ml-0 992px:mr-auto h-[4px] rounded-[5px] border-0 bg-white"
            />
            <h3
              className="text-inherit text-center text-[32px] leading-[1.4em] mb-[16px] 992px:text-left font-prata"
            >
              Your One-Stop
            </h3>

            <h2
              className="text-white text-center font-bold text-[40px] leading-[1.2em] mt-[18px] mb-[24px] mx-auto montSemiBold 414px:leading-[1.4em] 992px:text-left font-montserrat"
            >
              Secure Banking Courier Service
            </h2>

            <p
              className="text-inherit text-center text-[16px] leading-[2rem] mb-[24px] w-4/5 ml-auto mr-auto 480px:w-full 1366px:leading-4 992px:text-left font-montserrat"
            >
              SecureCash can serve your specific needs, we provide:
            </p>

            <div
              id="content-cash"
              className="relative w-[92%] 414px:w-[88%] mx-auto 992px:absolute mt-[32px] 992px:flex 992px:gap-5 transform 992px:left-1/2 992px:transform 992px:-translate-x-1/2 1200px:left-auto 1200px:transform-none 1366px:gap-10 992px:w-[900px] 1366px:w-[950px] 1366px:left-auto"
            >
              {services.map((service, index) => (
                <ServiceRow
                  key={index}
                  imgSrc={service.imgSrc}
                  link={service.link}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ✅ OPTIMIZED: Replaced bg-team-bg with Next.js Image for better performance */}
        <div className="bottom-row-right hidden 992px:block relative overflow-hidden">
          <Image
            src="/images/team.webp"
            alt="SecureCash Team at Head Office"
            fill
            loading="lazy"
            quality={80}
            sizes="(max-width: 991px) 0vw, 50vw"
            className="object-cover object-[10%] 1440px:object-[0%] -z-10"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
          />
        </div>
      </div>

      <div
        id="space-white"
        className="bg-[#fff] 1200px:min-h-[195px] clear-both float-none w-full mx-auto my-0 pr-2 1280px:pr-[52px] 992px:pb-[370px] 1366px:pb-0"
      >
        <div className="w-full max-w-[1366px] mx-auto my-0 z-40">
          <h5
            className="hidden text-[16px] text-center text-[#000000] font-normal mt-[18px] 1200px:w-full 1200px:right-0 1280px:mr-12 1200px:block 1200px:text-right font-montserrat"
          >
            The Team at Our Head Office
          </h5>
        </div>
      </div>
    </>
  );
};

export default CardsSection;