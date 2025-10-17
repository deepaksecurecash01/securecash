import Container from '@/components/layout/Container';
import Image from 'next/image';
import React from 'react';

const PrivacyPolicyPage = () =>
{


    const SectionHeader = ({ children }) => (
        <h3
      
            className={`600px:text-[20px] flex flex-row justify-start items-center gap-2 768px:gap-2 text-[40px] mb-4 leading-[30px] 600px:leading-[1.6em] mx-auto font-bold text-[#000] 992px:text-left 992px:w-full mt-8 font-montserrat`}
      >
            <strong style={{ textAlign: "left", fontWeight: "700" }}
>
                {children}:

            </strong>      </h3>
       
    );

    const SectionText = ({ children }) => (
        <p className="text-[16px] leading-[2rem] text-left mb-0 
             768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light font-montserrat" >
            {children}
        </p>
    );

    const ListItem = ({ children, index }) => (
           <div className={`flex items-start mt-[30px] ${index === 0 ? '1024px:mt-[8px]' : ' 1024px:mt-[16px]'
                                    } mb-[12px] gap-3`}>
                                <Image
                                    className="inline-block bg-contain bg-no-repeat  992px:w-[30px] 992px:h-full"
                                    src="https://www.securecash.com.au/images/icons/tick.png"
                                    alt={"check.png"}
                                    width={40}
                                    height={15}
                                    priority={true}
        
                                />
                                <h4
                                    className="text-[16px]  font-medium text-[#000] text-left mb-0 w-full font-montserrat"
                                >
                                    {children}
                                </h4>
        
                            </div>
    );

    return (
        <>
            <section className="blog-single-hero mb-[32px] bg-black text-white h-full 768px:mb-[44px] relative">
                <Container className="w-full">
                    <div className="blog-single-hero--wrap flex items-center relative">
                        <div className="blog-single-hero--head h-[290px] p-0 max-w-[900px] mx-auto flex flex-col justify-center items-center 768px:h-[340px]">
                            <h1 className={`blog-single-hero--head__title blog-index-hero--content__title text-[28px] leading-[34px] px-[10px] w-full  480px:text-[38px]  480px:leading-[36px]  480px:px-[40px] 768px:px-0 mb-[20px] text-center  768px:text-[46px] font-extrabold  768px:leading-[50px] capitalize  600px:w-[590px]`}> SKY WALLET PTY LTD</h1>
                            <hr className="w-[100px] mx-auto mt-[6px] mb-[16px] h-[4px] rounded-[5px] border-0 bg-primary" />
                            <div className="blog-index-hero--content__subtitle  mb-0">
                                <h3 className=" text-[34px] text-center font-semibold leading-[1.6em] font-montserrat"> Privacy Policy</h3>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            

            <div className="section-wrapper">
                <section className='max-w-[1024px] mx-auto' id="" color='w-full'>
                  

                    <div className='mt-[50px]'> 
                        <SectionHeader>Introduction</SectionHeader>
                        <SectionText>
                            Sky Wallet Pty Ltd regards customer privacy as an important part of our
                            relationship with our customers. The following privacy policy applies to
                            all Sky Wallet Pty Ltd users and conforms to internet privacy standards.
                            If you have questions or concerns regarding this statement, you should
                            first contact Sky Wallet Pty Ltd at 1300 732 873.
                        </SectionText>

                        <SectionHeader>Collection of Information</SectionHeader>
                        <SectionText>
                            In order to use the Sky Wallet Pty Ltd website, we may require
                            information from you in order to provide the best service possible. All
                            correspondence may also be collected and stored, particularly in regard
                            to sales, support and accounts, including Email. Any information
                            collected by Sky Wallet Pty Ltd&nbsp;is collected via correspondence
                            from you or your company. This may be via the telephone, Email, mail,
                            fax or directly through our website.
                        </SectionText>

                        <SectionHeader>Use of Collection Information</SectionHeader>
                        <SectionText>
                            Any details collected from Sky Wallet Pty Ltd&nbsp;customers is required
                            in order to provide you with our products and/or services, and a high
                            level of customer service. Correspondence is recorded in order to
                            provide service references, and to assist in our staff development.
                        </SectionText>

                        <SectionHeader>Storage of Collected Information</SectionHeader>
                        <SectionText>
                            The security of your personal information is important to us. When you
                            enter sensitive information (such as credit card numbers) on our
                            website, we encrypt that information using secure socket layer
                            technology (SSL). When Credit Card details are collected, we simply pass
                            them on in order to be processed as required. We never permanently store
                            complete Credit Card details. We follow generally accepted industry
                            standards to protect the personal information submitted to us, both
                            during transmission and once we receive it. If you have any questions
                            about security on our Website, you can contact us by using the &apos;Contact
                            Us&apos; page on our website.
                        </SectionText>

                        <SectionHeader>Access to Collected Information</SectionHeader>
                        <SectionText>
                            If your personally identifiable information changes, or if you no longer
                            desire our service, you may correct, update, delete or deactivate it by
                            using the &apos;Contact Us&apos; page on our website.
                        </SectionText>

                        <SectionHeader>Orders</SectionHeader>
                        <SectionText>
                            If you purchase a product or service from us, we may request certain
                            personally identifiable information from you. You may be required to
                            provide contact information (such as name, Email, and postal address)
                            and financial information (such as credit card number, expiration date).
                            We use this information for billing purposes and to fill your orders. If
                            we have trouble processing an order, we will use this information to
                            contact you.
                        </SectionText>

                        <SectionHeader>Communications</SectionHeader>
                        <SectionText>
                            Sky Wallet Pty Ltd uses personally identifiable information for
                            essential communications, such as Emails, accounts information, and
                            critical service details. We may also use this information for other
                            purposes, including some promotional Emails. If at any time a customer
                            wishes not to receive such correspondence, they can request to be
                            removed from any mailing lists by using the &apos;Contact Us&apos; page on our
                            website. You will be notified when your personal information is
                            collected by any third party that is not our agent/service provider, so
                            you can make an informed choice as to whether or not to share your
                            information with that party.
                        </SectionText>

                        <SectionHeader>Third Parties</SectionHeader>
                        <SectionText>
                            We reserve the right to disclose your personally identifiable
                            information as required by law and when we believe that disclosure is
                            necessary to protect our rights and/or comply with a judicial
                            proceeding, court order, or legal process served on our Website.
                        </SectionText>

                        <SectionHeader>Legal</SectionHeader>
                        <SectionText>
                            We reserve the right to disclose your personally identifiable
                            information as required by law and when we believe that disclosure is
                            necessary to protect our rights and/or comply with a judicial
                            proceeding, court order, or legal process served on our Website.
                        </SectionText>

                        <SectionHeader>Links</SectionHeader>
                        <SectionText>
                            Links on the Sky Wallet Pty Ltd&nbsp;site to external entities are not
                            covered within this policy. The terms and conditions set out in this
                            privacy statement only cover the domain name of www.securecash.com.au
                        </SectionText>

                        <SectionHeader>Changes to Privacy Policy</SectionHeader>
                        <SectionText>
                            If we decide to change our privacy policy, we will post those changes to
                            this privacy statement, the homepage, and other places we deem
                            appropriate so that you are aware of what information we collect, how we
                            use it, and under what circumstances, if any, we disclose it. We reserve
                            the right to modify this privacy statement at any time, so please review
                            it frequently. If we make material changes to this policy, we will
                            notify you here, by Email, or by means of a notice on our homepage.
                        </SectionText>

                        <SectionText>
                            Sky Wallet Pty Ltd uses the Billpower for its online credit card
                            transactions. Billpower processes online credit card transactions for
                            thousands of Australian merchants, providing a safe and secure means of
                            collecting payments via the Internet. All online credit card
                            transactions performed on this site using the Billpower gateway are
                            secured payments.
                        </SectionText>
                   </div>

                    <ul className='mt-8 mb-4'>
                        <ListItem index={0}>
                            Payments are fully automated with an immediate response.
                        </ListItem>
                        <ListItem index={1}>
                            Your complete credit card number cannot be viewed by Sky Wallet Pty
                            Ltd&nbsp;or any outside party.
                        </ListItem>
                        <ListItem index={2}>
                            All transactions are performed under 128 Bit SSL Certificate.
                        </ListItem>
                        <ListItem index={3}>
                            All transaction data is encrypted for storage within Billpower&apos;s
                            bank-grade data centre, further protecting your credit card data.
                        </ListItem>
                        <ListItem index={4}>
                            Billpower is an authorised third party processor for all the major
                            Australian banks.
                        </ListItem>
                        <ListItem>
                            Billpower at no time touches your funds; all monies are directly
                            transferred from your credit card to the merchant account held by
                            Sky Wallet Pty Ltd.
                        </ListItem>
                    </ul>

                    <div className='flex justify-center my-12 italic'>
                        <p className=" align-center"  >
                            For more information about Billpower and online credit card payments,
                            please visit{" "}
                            <a className=' text-primary hover:underline' href="https://www.billpower.co/">https://www.billpower.co/</a>.<br />

                        </p>
</div>
                   
                </section>
            </div>
        </>
    );
};

export default PrivacyPolicyPage;