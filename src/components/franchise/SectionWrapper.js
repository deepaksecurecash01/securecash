
import React from "react";
import Divider from "../common/Divider";
import ScrollableSection from "../layout/ScrollbarSection";
import ContentScroll from "./ContentScroll";
import Typography from "../common/Typography";
import Link from "next/link";

const SectionWrapper = () =>
{
  const contentItems = [
    {
      title: "Full Time Franchise From Day One",
      subtitle: "We Have The Customers!",
      content: `We have spent the past 25 years building up a diverse and loyal customer base, servicing hundreds of customers with thousands of locations right across Australia and New Zealand. All are instantly ready to feed into our <strong>Franchise network</strong>.`,
    },
    {
      title: "Buy In From $5k to $25k",
      subtitle: "With Flexible Options!",
      content: `We want to make sure it's possible for anyone to <strong>start owning and operating their own franchise</strong>. Our <strong>Franchise buy-in costs</strong> are not only extremely great value for the income you can start generating, but we provide <strong>flexible options for how to buy your own Franchise</strong>. It is very important we have amazing motivated individuals representing SecureCash, and we wanted to make sure no one would miss out on the opportunity.`,
    },
    {
      title: "No Brick and Mortar Required",
      subtitle: "Use Your Current Vehicle!",
      content: `Our Franchisees don't require a major setup or store front, you will be going to the customers, not them coming to you. Anything office or admin-wise can either be done out on the fly or from the comfort of your own home. This also means substantially less to pay in overhead costs than other <strong>Franchise opportunities</strong>. You will require your own passenger vehicle for day-to-day transport, but there are minimal requirements in what you can use—it basically just needs to be roadworthy!`,
    },
    {
      title: "Room For Expansion",
      subtitle: "Available Across Australia & NZ!",
      content: `We have the customer base, but we aren't stopping there! On average, we are taking on 30 to 60 new locations every month across Australia and New Zealand. These are naturally fed into our existing network. This means our <strong>Franchise opportunities are also available Australia and New Zealand-wide!</strong> With our versatile marketing and strict strategies, our growth shows no signs of slowing down either. Plus, <strong>every Franchisee is welcome to get involved with on-the-ground, face-to-face marketing</strong> to continue to <strong>grow your Franchise</strong>. Not to mention there will be plenty of options to take on <strong>additional Franchise territory</strong>.`,
    },
    {
      title: "Fast Setup & Full Support",
      subtitle: "Up & Running In 14 Days!",
      content: `As soon as all the checks and balances are in place for the <strong>sale of the Franchise</strong>, we will get straight into your setup and training. This will include face-to-face and video meetings with various members of our Head Office to <strong>ensure you are confident in everything you need to run your Franchise</strong>. But it won't stop there! You will have free access to all the <strong>ongoing support from our Head Office staff whenever your Franchise needs it</strong>. You will never be alone in your <strong>Franchise Venture!</strong> <p class="mt-2.5"><strong>Don't miss your Opportunity to purchase an established Franchise...</strong></p>`,
    },
  ];

  return (
    <div className=" w-full relative">
      <div className="absolute inset-0 bg-quote-header-left bg-left-top bg-no-repeat -z-10"></div>
      <div className="absolute inset-0 bg-quote-header-right bg-right-top bg-no-repeat -z-10"></div>{" "}
      <div id="intro" className="max-w-[1366px] mx-auto flex flex-col px-5 justify-center items-center">
        <h2
          className="montBold text-[22px] leading-[30px]  768px:text-[34px] font-bold text-center mx-auto  768px:leading-[45px] max-w-[80%] text-black
"
        >
          Become Your Own Boss With A Banking Courier Franchise!
        </h2>
        <Divider
          color="primary"
          margin="my-[24px]"
          alignment="left"
          responsiveClassName="992px:mx-0 992px:text-left w-[100px] "
        />
        <div className="content-wrapper w-4/5  768px:mt-2 p-0 bg-white/70 ">
          <div id="intro-text" className="">
            <p className="text-[16px] font-light leading-[2em] text-center  768px:mt-4 m-0 text-black">
              Here at <strong>SecureCash</strong> we are extremely excited to
              grow our family and offer the opportunity to
              <strong>
                {" "}
                join Australia and New Zealand&#39;s largest banking courier
                network, with your very own Franchise!
              </strong>
            </p>
            <p className="text-[16px] font-light leading-[2em] text-center  768px:mt-4 m-0  text-black">
              A <strong>Franchise Business</strong> is ever-growing popular
              around the world, and the trend is very much prevalent in
              Australia and New Zealand. Not every Franchise is profitable, and
              in many cases, you have to start from the ground up.{" "}
              <strong>Purchasing a Franchise</strong> with{" "}
              <strong>SecureCash</strong>, the hard work has already been done!
              We have been in the security industry for over 25 years, and have
              dedicated ourselves to growing a vast and diverse customer base.
              This means you will walk into{" "}
              <strong>a Franchise that is instantly profitable!</strong>
            </p>
          </div>
        </div>
      </div>
      <div className="spacer-lg h-[30px] 768px:h-[80px] 1024px:h-[100px]"></div>
      <div id="faq" className="  inline-block w-full ">
        <div className=" inner-big w-full 992px:w-[95%] max-w-[1366px] mx-auto my-0 h-auto  992px:flex  992px:h-[545px]">
          <div className="flex flex-grow justify-center items-center  w-[96%] 480px:w-full 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1]">
            <ScrollableSection style={{ direction: "rtl" }}
              className=" h-auto w-[85%] 992px:w-full p-0 mx-auto   992px:h-full bg-white leading-[2] 1024px:px-[10%]">
              <div style={{ direction: "ltr" }}>
                <ContentScroll scrollData={contentItems} />

                <Typography
                  as="h3"
                  fontFamily="font-montserrat"
                  className="text-[26px] font-bold text-[#000] text-left my-[28px]"
                >
                  GET IN TOUCH TODAY!{" "}
                </Typography>
                <Typography
                  as="div"
                  fontFamily="font-montserrat"
                  className="text-left font-light leading-[2rem] mt-4  414px:pr-0 "
                >
                  <em>
                    <strong>
                      <span style={{ fontSize: "medium" }}>
                        You can call us on{" "}
                      </span>
                      <a
                        className="text-link hover:underline"
                        href="tel:1300732873"
                      >
                        1300 732 873
                      </a>{" "}
                      <span style={{ fontSize: "medium" }}>
                        <em>
                          <strong>
                            <span style={{ fontSize: "medium" }} />
                            or email{" "}
                            <a
                              className="text-link hover:underline"
                              href="mailto:franchise@securecash.com.au"
                            >
                              franchise@securecash.com.au
                            </a>
                            . Our friendly staff would be more than happy to
                            discuss how we can help your Franchise queries!
                          </strong>
                        </em>
                        <br />
                      </span>
                    </strong>
                  </em>{" "}
                </Typography>
                <Typography
                  as="div"
                  fontFamily="font-montserrat"
                  className="text-left font-light leading-[2rem] mt-4  414px:pr-0 "
                >
                  <em>
                    <strong>
                      <p style={{ fontSize: "medium" }}>
                        <em>
                          <span style={{ fontSize: "medium" }}>
                            <em>
                              <span style={{ fontSize: "medium" }}>
                                Want to learn more about what it&apos;s like being a part of the SecureCash team? Check out our blog
                                post on{" "}
                                <Link
                                  className="text-link hover:underline"
                                  href="/blog/office-culture/"
                                >
                                  Office Culture
                                </Link>
                              </span>

                            </em>
                          </span>
                          <span style={{ fontSize: "medium" }}>.</span>
                        </em>
                      </p>
                    </strong>{" "}
                  </em>
                </Typography>
</div>
            </ScrollableSection>
          </div>
          <div className="float-none w-full mx-auto 992px:w-1/2 992px:float-left relative left-0 flex-1 flex justify-start">
            <div className="cta-box relative  992px:w-[90%]">
              <img
                className="backdraft h-full w-full "
                src="https://www.securecash.com.au/images/franchise-square-car.jpg"
                alt="Australia Cash in Transit: Services, Business, Delivery, and Provider Australia Wide"
              />
              <div className="flex flex-col absolute top-0 left-0 h-[80%] w-[70%] bg-black px-[30px] justify-center content-center">
                <Typography
                  as="h4"
                  fontFamily="font-montserrat"
                  className="text-[33px] font-bold text-primary text-left mb-0"
                >
                  Why Choose A SecureCash Franchise?
                </Typography>
                <Divider
                  color="white"
                  margin="mt-[20px]"
                  alignment="left"
                  responsiveClassName="992px:mx-0 992px:text-left w-[100px] ml-0"
                />{" "}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SectionWrapper;
