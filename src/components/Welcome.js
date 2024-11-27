'use client'
import React, { useState } from "react";

const Welcome = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State for showing/hiding content

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };
 
  return (
    <div id="welcome" className="content-bg">
      <div className="inner">
        <div id="content">
          <div className="center-content">
            <h4 className="header-times" style={{ textAlign: "center" }}>
              Welcome to
            </h4>
            <img
              src="https://www.securecash.com.au/images/SecureCash.png"
              alt="SecureCash"
              id="content-logo"
            />
            <hr className="divider-2 divider-gold divider-bottom" />
            <p id="header-content" className=" font-montserrat font-light">
              Do you need cash in transit services? SecureCash specialises in
              picking up your money and banking it. Wherever you are, anywhere
              in Australia, any time of the day or night, seven days a week, we
              can collect your takings and deposit them at your bank. Whether
              you need cash collection, cash counting, or cash delivery,
              SecureCash has got you covered.&nbsp;
            </p>
          </div>
          <div className="content-columns align-left">
            <div className="leftside-column">
              <div className="main-content-scroll">
                <div className="scrollable-content">
                  <h3
                    style={{ textAlign: "left" }}
                    className=" font-montserrat font-bold text-[26px]"
                  >
                    Our Cash In Transit Services
                  </h3>
                  <p className=" font-montserrat font-light">
                    What cash in transit service does your business need? As one
                    of the largest and most respected cash logistics companies
                    in Australia, SecureCash can serve your specific needs, we
                    provide:
                    <a
                      className={`read-more-link ${isExpanded && "hidden"}`}
                      onClick={toggleContent}
                    >
                      Read More{" "}
                    </a>
                  </p>
                  <div
                    id="intro-more-content"
                    className={`${isExpanded && "block"}`}
                  >
                    <div className="item-box align-left">
                      <div className="p-header font-montserrat font-semibold">
                        <img
                          className="icon-service"
                          src="https://www.securecash.com.au/images/contentpageicons/cashcollection.png"
                          alt="cash collection"
                        />
                        <h4>Cash Collection Services</h4>
                      </div>
                      <p className=" font-montserrat font-light">
                        Our plain clothes staff will visit your premises at an
                        agreed time, pick up and secure your takings, drive them
                        to your bank in one of our unmarked vehicles and deposit
                        them in your account. At a later time, we will deliver
                        the bank deposit records back to your office. We call
                        this our "Banking Courier Service" and we can collect
                        your cash takings (including cheques) any hour or any
                        day or night. That includes weekends and public holidays
                        because our number one priority is ensuring the cash
                        security of our clients.
                      </p>
                    </div>
                    <div className="item-box align-left">
                      <div className="p-header font-montserrat font-semibold">
                        <img
                          className="icon-service"
                          src="https://www.securecash.com.au/images/contentpageicons/cashdelivery.png"
                          alt="cash collection"
                        />
                        <h4>Cash Delivery Services</h4>
                      </div>
                      <p className=" font-montserrat font-light">
                        When you want cash delivered to your organisation, just
                        order our cash delivery service. We call it a "Change
                        Order Service" because often our clients are ordering
                        small change to meets their trading needs. So we pick up
                        the needed amount of change, in whatever denominations
                        you require.
                      </p>
                    </div>
                    <div className="item-box align-left">
                      <div className="p-header font-montserrat font-semibold">
                        <img
                          className="icon-service"
                          src="https://www.securecash.com.au/images/cashcounting.png"
                          alt="cash collection"
                        />
                        <h4>Cash Counting Services</h4>
                      </div>
                      <p className=" font-montserrat font-light">
                        If you don't want your staff to have to deal with
                        counting the takings, our cash counting service can
                        assist. We collect your cash and count it before
                        depositing it into your bank account.{" "}
                        <a className="read-more-link" onClick={toggleContent}>
                          {" "}
                          Show Less{" "}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rightside-column">
              <iframe
                src="https://player.vimeo.com/video/312442368?autoplay=0&title=0&byline=0&portrait=0"
                frameBorder={0}
                allowFullScreen=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
