'use client';
import React, { useEffect, useCallback, useRef } from 'react';
import Divider from '@/components/common/Divider';

const InstructionSection = () =>
{
    const parentRef = useRef(null);
    const blackBoxRef = useRef(null);
    const instructionBoxRef = useRef(null);

    const fixWelcomeSectionHeight = useCallback(() =>
    {
        const detectWidth = window.innerWidth;
        const parentBox = parentRef.current;
        const childBox1 = blackBoxRef.current;
        const childBox2 = instructionBoxRef.current;

        console.log('Height calculation running...', {
            detectWidth,
            parentBox: !!parentBox,
            childBox1: !!childBox1,
            childBox2: !!childBox2
        });

        if (parentBox && childBox1 && childBox2) {
            if (detectWidth < 768) {
                parentBox.style.height = "auto";
                console.log('Mobile view - height set to auto');
                return;
            }

            const childBox1Height = childBox1.offsetHeight;
            const childBox2Height = childBox2.offsetHeight;

            console.log('Box heights:', {
                childBox1Height,
                childBox2Height
            });

            let highestHeight = childBox1Height > childBox2Height ? childBox1Height : childBox2Height;

            if (highestHeight === childBox2Height) {
                highestHeight += 80;
            }

            console.log('Setting parent height to:', highestHeight + 'px');
            parentBox.style.height = highestHeight + "px";
        } else {
            console.log('Elements not found or not ready');
        }
    }, []);


    useEffect(() =>
    {
        const handleResize = () => fixWelcomeSectionHeight();

        // Multiple attempts to ensure DOM is ready
        const timers = [];

        // Immediate attempt
        timers.push(setTimeout(() => fixWelcomeSectionHeight(), 0));

        // After 100ms
        timers.push(setTimeout(() => fixWelcomeSectionHeight(), 100));

        // After 500ms
        timers.push(setTimeout(() => fixWelcomeSectionHeight(), 500));

        // After 1000ms
        timers.push(setTimeout(() => fixWelcomeSectionHeight(), 1000));

        // Add event listeners
        window.addEventListener("load", fixWelcomeSectionHeight);
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () =>
        {
            timers.forEach(timer => clearTimeout(timer));
            window.removeEventListener("load", fixWelcomeSectionHeight);
            window.removeEventListener("resize", handleResize);
        };
    }, [fixWelcomeSectionHeight]);

    return (
        <section
            ref={parentRef}
            id="instruction-section"
            className="relative h-auto mt-[87px] mb-[56px] 768px:h-full 768px:my-[140px]"
        >
            <div
                ref={blackBoxRef}
                id="black-box"
                className="bg-black py-[60px] px-7 w-[96%] mx-auto 768px:mx-0 rounded-[5px] 768px:p-0 768px:max-w-[calc(50%+36px)] h-auto flex 768px:rounded-tr-[6px] 768px:rounded-br-[6px] justify-center"
            >
                <div className="content instruction-section--black-box--content max-w-[95%] 768px:py-[98px] 768px:px-7 768px:max-w-[554px] 768px:mr-[46px]">
                    <p className="text-white text-[16px] font-light leading-[2] mb-[16px]">
                        To start the set up of your service we just require your time for
                        around 10 minutes to take you through our online sign up.
                    </p>
                    <p className="text-white text-[16px] font-light leading-[2] mb-[16px]">
                        Along the way we will need to ask different questions to comply
                        with certain Government Legislation and State Laws for OH&amp;S.
                    </p>
                    <p className="text-white text-[16px] font-light leading-[2] mb-[16px]">
                        We have attempted to keep this online questionnaire as short as
                        possible and fully understand that this can be a time consuming
                        exercise, but our organization has legal obligations under the
                        Anti-Money Laundering and Counter Terrorism Financing Act 2006 and
                        this information is required.
                    </p>
                    <p className="text-white text-[16px] font-light leading-[2] mb-[16px]">
                        Once this questionnaire is completed, we will then be able to get
                        our area managers to contact you to continue the setup of your
                        service.
                    </p>
                    <p className="text-white text-[16px] font-light leading-[2] mb-[16px]">
                        If you have any questions what so ever then please do not hesitate
                        to contact us on{" "}
                        <span className="text-primary font-semibold">1300 732 873</span>
                        &nbsp;or email{" "}
                        <a href="mailto:customers@securecash.com.au">
                            <span className="text-primary font-semibold">
                                customers@securecash.com.au
                            </span>
                        </a>
                        .
                    </p>
                    <p className="text-white text-[16px] font-light leading-[2] mb-[16px]">
                        Thanks again for choosing Secure Cash, we look forward to
                        providing you with our cash in transit service.
                    </p>
                </div>
            </div>
            <div
                ref={instructionBoxRef}
                id="instruction-box"
                className="w-[90%] 414px:w-[95%] mx-auto max-w-full relative mt-14 768px:mt-0 top-0 right-0 768px:top-20 768px:w-1/2 768px:mr-[6.83px] 768px:max-w-1/2 bg-white rounded-[6px] shadow-[0_1px_6px_0_rgba(32,33,36,0.28)] 768px:absolute"
            >
                <div className="content px-[32px] pt-12 pb-[52px] 1024px:p-14">
                    <h2 className="text-[#c7a652] text-[34px] font-semibold">
                        INSTRUCTIONS:
                    </h2>
                    <Divider
                        color="#7a7a7a"
                        alignment="left"
                        margin="mt-[30px] mb-[24px]"
                        responsiveClassName="768px:text-left 768px:mx-0"
                    />
                    <div className="instruction-wrapper relative mt-[40px] pt-[8px] pb-[8px]">
                        <div className="counter absolute top-0 left-0 z-0 flex justify-center items-center w-[50px] h-[67px]">
                            <p className="relative h-full text-[88px] font-extrabold leading-[0.7] text-[#ededed] p-0 m-0">
                                1
                            </p>
                        </div>
                        <p className="text-[16px] font-light leading-[2] relative z-[1] pl-[29px] mb-[16px]">
                            Now, just click the &apos;Let&apos;s Get Started&apos; button and you will be
                            taken to each section that you need to complete one after the
                            other automatically.
                        </p>
                    </div>
                    <div className="instruction-wrapper relative mt-[40px] pt-[8px] pb-[8px]">
                        <div className="counter absolute top-0 left-0 z-0 flex justify-center items-center w-[50px] h-[67px]">
                            <p className="relative h-full text-[88px] font-extrabold leading-[0.7] text-[#ededed] p-0 m-0">
                                2
                            </p>
                        </div>
                        <p className="text-[16px] font-light leading-[2] relative z-[1] pl-[29px] mb-[16px]">
                            If you complete one section and need to complete the next
                            section a little later or at another time, then please leave
                            that page open or &apos;bookmark&apos; the page so you can come back to
                            it, the page won&apos;t expire.
                        </p>
                    </div>
                    <div className="instruction-wrapper relative mt-[40px] pt-[8px] pb-[8px]">
                        <div className="counter absolute top-0 left-0 z-0 flex justify-center items-center w-[50px] h-[67px]">
                            <p className="relative h-full text-[88px] font-extrabold leading-[0.7] text-[#ededed] p-0 m-0">
                                3
                            </p>
                        </div>
                        <p className="text-[16px] font-light leading-[2] relative z-[1] pl-[29px] mb-[16px]">
                            If at anytime you need assistance, or are unsure about what
                            information you need to enter, then please do not hesitate to
                            contact our Customer Service Team on{" "}
                            <span className="text-primary font-semibold">1300 732 873</span>
                            ,{" "}
                            <strong className="text-primary font-semibold">
                                <a
                                    href="mailto:customers@securecash.com.au"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    customers@securecash.com.au
                                </a>
                            </strong>
                            . You can also use the live chat, in the bottom right of the
                            page, at any point through the process.
                        </p>
                    </div>
                    <hr className="instruction-divider w-full border border-[#ededed] mt-[40px]" />
                    <div className="instruction-wrapper relative pt-[32px] pb-[24px] mt-[64px] quote">
                        <div className="counter absolute ml-5 top-1.5 left-0 z-0 flex justify-center items-center w-[50px] h-[67px]">
                            <p className="relative h-full text-[160px] font-extrabold leading-[0.7] text-[#ededed] p-0 m-0">
                                “
                            </p>
                        </div>
                        <p className="text-[16px] font-light leading-[2] relative z-[1] pl-[29px] mb-[16px]">
                            PLEASE NOTE: This questionnaire must be completed for each ABN
                            Number. For example if you have 3 locations (3 different shops
                            or business) that your would like us to collect or deliver money
                            to, and each location has its own ABN number, then you must
                            complete this questionnaire 3 separate times being one for each
                            ABN number.
                        </p>
                    </div>
                    <a
                        href="https://www.securecash.com.au/terms/"
                        className="bg-[#c7a652] text-white w-[248px] text-center px-[22px] py-[30px] rounded-[50px] block mx-auto shadow-[0_0_22px_-5px_#c7a652] hover:bg-black hover:text-white hover:no-underline"
                    >
                        Let&apos;s Get Started
                    </a>
                </div>
            </div>


        </section>
    );
};

export default InstructionSection;