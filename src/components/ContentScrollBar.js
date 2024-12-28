import React from "react";
import ScrollableSection from "./ui/scrollable-section/ScrollableSection";

const ContentScrollBar = () => {
  const contentItems = [
    {
      title: "Plain clothes",
      content:
        "Our couriers do not wear security uniforms. This is so they blend in with the crowd. It is to avoid drawing any attention to your business (or your staff or your customers) during the cash handling process. Unmarked vehicles: The same concern underpins our decision to use regular-looking vehicles. To draw no attention to your business activities.",
    },
    {
      title: "No contracts",
      content:
        "Our focus is on delivering a reliable cash courier service that is affordably priced. We do not feel we need to lock our clients into contracts. So you can contact us on an 'as required' basis, you can cancel anytime with notice, or you can establish a regular schedule if you find our service works well for you. We think it will, by the way.",
    },
    {
      title: "Australia Wide",
      content:
        "Coast to coast, anywhere in Australia, we've got your cash security needs covered. With branches in Adelaide, Brisbane, Canberra, Melbourne, Perth, and Sydney and a network of licensed contractors covering the rest of the country, you can rely on SecureCash to get the job done.",
    },
    {
      title: "Anytime",
      content:
        "We don't keep 'office hours' because many of our clients don't either. Whatever you need, whenever you need it, we'll be there for you. After hours and public holidays included. Online bookings: You can use our website to manage your cash courier needs, 24x7. Make a booking, adjust your booking, cancel your booking. Do it all via your secure login at our website. Or you can phone us.",
    },
    {
      title: "Verify our couriers",
      content:
        "There is one feature of our website we want to be sure you know about. Anytime you want to, you can login to verify the ID of our banking courier who is handling your cash. It's all about giving you, our valued clients, peace of mind.",
    },
    {
      title: "Your peace of mind",
      content:
        "We want you to know you can trust us as we are an Australian owned and operated business. Affordable: We don't pay for expensive media advertising campaigns. And that helps us keep our pricing realistic. Phone us today to discuss your needs and learn how affordable our services are.",
    },
    {
      title: "We are specialists",
      content:
        "As a national courier company, we do one thing, and we do it well. We do 'cash in transit' - with all its permutations. Whatever your particular need, give us a call.",
    },
    {
      title: "Special events",
      content:
        "If your group is running a fundraiser or a fete or some other function that involves cash, you will be pleased to know you can order our service on a one-time basis. Tell us how much cash you need to be delivered before the big event, and tell us the closing time, and we'll be there to take care of you.",
    },
  ];

  return (
    <div className="right-contact-row  w-[96%] 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1]  992px:pl-8">
      <h3 className="prata2 font-prata text-[28px] leading-[1.6em] text-center 992px:text-left mb-4">
        Make The Right Choice
      </h3>
      <hr className="divider-2 h-[4px] border-0 mb-[24px] w-[100px] rounded-[5px] bg-[#c7a652]  divider-bottom mx-auto 992px:mx-0" />
      <h2 className="montSemiBold font-montserrat font-bold 992px:text-left text-[#c7a652] text-[40px] leading-[1.4em] text-center mb-[24px]">
        Why Choose SecureCash?
      </h2>
      <p className=" mb-[14px] 768px:mb-0 leading-[2rem] text-center 992px:text-left font-normal m-0 p-0 font-montserrat">
        For one reason: We have been established for over 25 years, since 1992
        to be exact!
      </p>
      <ScrollableSection className=" h-auto 414px:w-[85%] 992px:w-full p-0 mx-auto   992px:h-[630px] 1200px:h-[658px] 1366px:h-[740px] bg-white mt-6 leading-[2]">
        <ul className="list-none w-full">
          {contentItems.map((item, index) => (
            <li key={index}>
              <div className=" flex items-center  mb-[14px] gap-3">
                <span className=" h-[15px] inline-block w-[20px] bg-[url('/images/icons/check.png')] bg-contain bg-no-repeat relative"></span>

                <h4 className="text-[16px] mx-0 font-montserrat text-[#333333] font-bold">
                  {item.title}:
                </h4>
              </div>

              <p className=" font-montserrat font-light text-[16px] leading-8  text-left mb-[50px] mx-0 pr-4 414px:pr-0 pl-8 mt-2.5">
                {item.content}
              </p>
            </li>
          ))}
        </ul>
      </ScrollableSection>
    </div>
  );
};

export default ContentScrollBar;
