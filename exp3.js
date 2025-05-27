import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Typography from '../common/Typography';
import Divider from '../common/Divider';

// Simplified testimonial data - direct strings instead of objects with keys
const TESTIMONIALS = [
  "It makes sense for us to use SecureCash for our cash floats, cash pick-up and cash counting needs during the adelaide festival. It allowed us to concentrate on our core business in the midst of the Festival.",
  "The service is extremely discreet, punctual, safe and above all courteous. We wish we had switched to SecureCash years ago, and I would have no hesitation in recommending their services to anyone looking for an efficient banking solution.",
  "Having used SecureCash at a number of sites for banking collections, I would thoroughly recommend them. The other advantage is that we gain our working days back by not travelling to and from the bank or waiting in queues - that alone is worth it.",
  "I am very happy with the service provided by SecureCash; I find the staff to be helpful and courteous at all times and I would highly recommend their organisation to anyone who is looking for a good cash in transit service.",
  "We are very happy with the service, it's always on time and the friendly staff go out of their way to give great service. SecureCash saves our company a lot of time by going to the bank for us, and they even take our cheques to the bank to deposit them for us.",
  "Councils don't normally give testimonials, however I would like to advise that I have always found SecureCash staff to be very accommodating and professional and that our current arrangement is working well.",
  "We were unsure we even needed this type of service, as we did our own banking. We used the code J9#FREEMONEY, and we received 2 weeks free, just to try out the service and see if it was for us. We never looked back and 6 years on we are still with SecureCash",
  "We are extremely satisfied with our change to SecureCash. They are always willing to oblige, and using this service ensures safe banking and saves us a lot of valuable time. We would recommend them to any prospective client.",
];

const TestimonialsSection = () =>
{
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handlePrevTestimonial = () =>
  {
    setCurrentTestimonial((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () =>
  {
    setCurrentTestimonial((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="contact-testimonial mt-[120px]">
      <div className="inner">
        <div className="contact-testimonial--title-wrap">
          <Typography
            as="h2"
            fontFamily="font-montserrat"
            className=" text-center font-bold text-[32px] leading-[64px] mt-[18px] mb-[24px] mx-auto montSemiBold 414px:leading-[1.4em] "
          >
            Testimonials
          </Typography>


          <Divider
            color="#c7a652"
            alignment="center"
            margin="mb-10 mt-4"
          />
          <p>
            {`Don't just take our word for it. \nHear what our customers have to say about our services!`}
          </p>
        </div>
        <div className="contact-testimonial--carousel">
          <ul className="bullet-dots-container">
            {TESTIMONIALS.map((_, index) => (
              <li
                key={index}
                className={`bullet-dot ${index === currentTestimonial ? 'active-dot' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </ul>
          <div className="contact-testimonial--carousel-container">
            <div className="contact-testimonial--carousel__items">
              <div className="carousel-item">
                <div className="excerpt">
                  <Typography
                    as="p"
                    fontFamily="font-montserrat"
                    className="text-left font-light leading-[2rem] pr-4 mt-2.5 mb-6 1024px:mb-[50px] 414px:pr-0 pl-8"
                  >
                    {TESTIMONIALS[currentTestimonial]}                                    </Typography>
                </div>
              </div>
            </div>
          </div>
          <CarouselControls
            onPrev={handlePrevTestimonial}
            onNext={handleNextTestimonial}
          />
        </div>
      </div>
    </section>
  );
};

// Further component extraction for carousel controls
const CarouselControls = ({ onPrev, onNext }) =>
{
  return (
    <div className="contact-testimonial--carousel-control">
      <div className="carousel-control-left" onClick={onPrev}>
        <FiChevronLeft size={24} />
      </div>
      <div className="carousel-control-divider">&nbsp;</div>
      <div className="carousel-control-right" onClick={onNext}>
        <FiChevronRight size={24} />
      </div>
    </div>
  );
};

export default TestimonialsSection;