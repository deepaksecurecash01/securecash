import Divider from '@/components/common/Divider';
import Typography from '@/components/common/Typography';
import Container from '@/components/layout/Container';
import React from 'react';

const PrivacyPolicyPage = () =>
{


    const SectionHeader = ({ children }) => (
        <Typography
        as="h3"
        fontFamily="montserrat"
            className="text-[26px] font-semibold leading-[1.6em] "
      >
            <strong style={{ textAlign: "left" }}
>
                {children}
                <br />
                <br />
            </strong>      </Typography>
       
    );

    const SectionText = ({ children }) => (
        <p className="text-[#808080] pt-[15px] pb-[10px] leading-[1.5em] text-[15px] align-left" >
            {children}
        </p>
    );

    const ListItem = ({ children }) => (
        <li className="box-text align-left" >
            <span style={{ color: "#000000" }}>
                {children}
            </span>
        </li>
    );

    return (
        <>
            <div>
                <Typography
                    as="h3"
                    fontFamily="montserrat"
                    className="text-[42px] text-center font-semibold leading-[1.6em] "
                >                    <br />
                    SKY WALLET PTY LTD
                </Typography>
                <Divider
                    color="primary"
                    alignment="center"
                    margin="my-5"
                    responsiveClassName=''
                />            </div>

            <div className="section-wrapper">
                <Container id="intro" color='w-full'>
                    <Typography
                        as="h3"
                        fontFamily="montserrat"
                        className="text-[34px] text-center font-semibold leading-[1.6em] "
                    >                    
                        Privacy Policy
                    </Typography>

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

                    <ul>
                        <ListItem>
                            Payments are fully automated with an immediate response.
                        </ListItem>
                        <ListItem>
                            Your complete credit card number cannot be viewed by Sky Wallet Pty
                            Ltd&nbsp;or any outside party.
                        </ListItem>
                        <ListItem>
                            All transactions are performed under 128 Bit SSL Certificate.
                        </ListItem>
                        <ListItem>
                            All transaction data is encrypted for storage within Billpower&apos;s
                            bank-grade data centre, further protecting your credit card data.
                        </ListItem>
                        <ListItem>
                            Billpower is an authorised third party processor for all the major
                            Australian banks.
                        </ListItem>
                        <ListItem>
                            Billpower at no time touches your funds; all monies are directly
                            transferred from your credit card to the merchant account held by
                            Sky Wallet Pty Ltd.
                        </ListItem>
                    </ul>

                    <h3 className="content-wrapper" />

                    <p className="box-text align-left" >
                        For more information about Billpower and online credit card payments,
                        please visit{" "}
                        <a href="https://www.billpower.co/">https://www.billpower.co/</a>.<br />
                        <br />
                        <br />
                    </p>
                </Container>
            </div>
        </>
    );
};

export default PrivacyPolicyPage;