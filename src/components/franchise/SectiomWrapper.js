import React from "react";

const SectionWrapper = () => {
  return (
    <div className="section-wrapper">
      <div id="intro">
        <h2 className="montBold">
          Become Your Own Boss With A Banking Courier Franchise!
        </h2>
        <hr className="center-content-divider" />
        <div className="content-wrapper">
          <div id="intro-text">
            <p>
              Here at <strong>SecureCash</strong> we are extremely excited to
              grow our family and offer the opportunity to
              <strong>
                join Australia and New Zealand&#39;s largest banking courier
                network, with your very own Franchise!
              </strong>
            </p>
            <p>
              A <strong>Franchise Business</strong> is ever-growing popular
              around the world, and the trend is very much prevalent in
              Australia and New Zealand. Not every Franchise is profitable, and
              in many cases, you have to start from the ground up.{" "}
              <strong>Purchasing a Franchise</strong>
              with <strong>SecureCash</strong>, the hard work has already been
              done! We have been in the security industry for over 25 years, and
              have dedicated ourselves to growing a vast and diverse customer
              base. This means you will walk into{" "}
              <strong>a Franchise that is instantly profitable!</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="spacer-lg"></div>

      <div id="faq">
        <div className="col-left">
          <div className="cta-box">
            <img
              className="backdraft"
              src="https://www.securecash.com.au/images/franchise-square-car.jpg"
              alt="Australia Cash in Transit: Services, Business, Delivery, and Provider Australia Wide"
            />
            <div>
              <h3 className="header-text" style={{ color: "#c7a652" }}>
                Why Choose A SecureCash Franchise?
              </h3>
              <hr className="divider" />
            </div>
          </div>
        </div>
        <div className="col-right">
          <div className="scroller">
            <div className="scrollable-content">
              {[
                {
                  title: "Full Time Franchise From Day One",
                  subtitle: "We Have The Customers!",
                  content: `We have spent the past 25 years building up a diverse and loyal
                            customer base, servicing hundreds of customers with thousands of
                            locations right across Australia and New Zealand. All are
                            instantly ready to feed into our Franchise network.`,
                },
                {
                  title: "Buy In From $5k to $25k",
                  subtitle: "With Flexible Options!",
                  content: `We want to make sure it's possible for anyone to start owning and operating their own franchise.
                            Our Franchise buy-in costs are not only extremely great value for the income you can start generating,
                            but we provide flexible options for how to buy your own Franchise.`,
                },
                {
                  title: "No Brick and Mortar Required",
                  subtitle: "Use Your Current Vehicle!",
                  content: `Our Franchisees don't require a major setup or store front, you
                            will be going to the customers, not them coming to you. Anything
                            office or admin-wise can either be done out on the fly or from
                            the comfort of your own home.`,
                },
                {
                  title: "Room For Expansion",
                  subtitle: "Available Across Australia & NZ!",
                  content: `We have the customer base, but we aren't stopping there! On average, we are taking on 30 to 60
                            new locations every month across Australia and New Zealand. This means our Franchise opportunities
                            are also available Australia and New Zealand-wide!`,
                },
                {
                  title: "Fast Setup & Full Support",
                  subtitle: "Up & Running In 14 Days!",
                  content: `As soon as all the checks and balances are in place for the sale of the Franchise,
                            we will get straight into your setup and training. This will include face-to-face and
                            video meetings with various members of our Head Office to ensure you are confident
                            in everything you need to run your Franchise.`,
                },
              ].map((item, index) => (
                <div key={index}>
                  <div className="p-header">
                    <img
                      className="icon-service"
                      src="https://www.securecash.com.au/images/icons/tick.png"
                      alt="tick"
                    />
                    <h4>{item.title}</h4>
                  </div>
                  <h5>{item.subtitle}</h5>
                  <p>{item.content}</p>
                </div>
              ))}
              <h3>GET IN TOUCH TODAY!</h3>
              <p style={{ fontSize: "medium" }}>
                <em>
                  <strong>
                    You can call us on <a href="tel:1300732873">1300 732 873</a>{" "}
                    or email
                    <a href="mailto:franchise@securecash.com.au">
                      franchise@securecash.com.au
                    </a>
                    . Our friendly staff would be more than happy to discuss how
                    we can help with your Franchise queries!
                  </strong>
                </em>
              </p>
              <p style={{ fontSize: "medium" }}>
                Want to learn more about what it&#39;s like being a part of the
                SecureCash team? Check out our blog post on{" "}
                <a href="https://www.securecash.com.au/blog/office-culture/">
                  Office Culture
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper;
