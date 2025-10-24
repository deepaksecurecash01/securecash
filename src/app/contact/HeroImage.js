import React from "react";

const HeroImage = () =>
{
  return (
    <div
      id="hero-image"
      className="flex flex-col justify-center items-center bg-[60%] bg-cover  768px:min-h-[50vh]  h-[70vh]  480px:bg-[position:50%] min-h-[40vh]  1024px:min-h-[40vh]  600px:bg-cover bg-no-repeat  992px:bg-center 1070px:h-[55vh]"
      style={{
        backgroundImage:
          "-webkit-linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url('/images/contact-page/Header-Image.png')",
      }}
    >
      <h2 className="text-[24px] 600px:text-[40px] mb-3 leading-[30px] 768px:leading-[56px] text-white">
        Get a Reply Back
      </h2>
      <h1
        className="text-white font-bold text-center text-[32px] leading-[36px]  600px:leading-[78px]  600px:text-[56px] [text-shadow:2px_2px_6px_#111111] px-[25px] 1070px:mt-0"
      >
        Within 45 Minutes
      </h1>

      <hr
     
        className="mx-auto h-[4px] rounded-[5px] border-0 bg-primary mt-[21px] mb-[24px] w-[100px]"
      />   <div
        className=" w-4/5 768px:w-[75%] mx-auto"
      >
        <p
          className="text-[16px] text-white font-normal leading-[32px] text-center mb-0 
              768px:w-[55%] mx-auto 
             [text-shadow:2px_2px_6px_#111111] font-montserrat"
        >
          <strong>
            No problem is too big or too small, our team is here to make sure your services go as plan.
            Simply select the team you need help from and we will get back to you in a timely manner.
            You can always call us on <a className=" text-primary" href="tel:1300732873">1300 SECURE</a> if it is more convenient for you!
          </strong>          </p>
      </div>

    </div>
  );
};

export default HeroImage;
