import Link from "next/link";

const FreeChangeOrderService = () =>
{
    return (
        <article>
            <header className="text-center">
                <h1 className="montBold text-[42px] leading-[45px] font-semibold mx-auto 768px:leading-[60px] text-black mt-8">
                    Free Change Order Service
                </h1>
                <hr className="w-[100px] mt-5 h-[4px] rounded-[5px] border-0 bg-primary mx-auto" />
            </header>

            <div className="relative">
                <div className="absolute opacity-20 inset-0 bg-quote-header-left bg-left-top bg-no-repeat -z-10" />
                <div className="absolute opacity-20 inset-0 bg-quote-header-right bg-right-top bg-no-repeat -z-10" />

                <div className="max-w-[1366px] mx-auto flex flex-col px-5 items-center">
                    <div className="w-4/5 mt-12">
                        <p className="mb-4 text-black text-left">
                            <strong>SecureCash</strong> can provide a{" "}
                            <em><strong>FREE</strong></em>{" "}
                            <strong>
                                <Link
                                    className="text-primary hover:underline"
                                    href="/services/cash-delivery"
                                >
                                    change order service
                                </Link>
                            </strong>{" "}
                            to your organisation for the next 2 months, given that it is made in
                            conjunction with a paying{" "}
                            <strong>
                                <Link
                                    className="text-primary hover:underline"
                                    href="/services/cash-in-transit"
                                >
                                    cash-in-transit service
                                </Link>
                            </strong>{" "}
                            and subject to the following:
                        </p>

                        <ul className="768px:pl-12 mt-4 list-disc">
                            <li className="mb-6">
                                Your change orders can be no more than $1,000 in cash.
                            </li>
                            <li className="mb-6">
                                You must request your <strong>change order service</strong> via our{" "}
                                <strong>
                                    <Link
                                        className="text-primary hover:underline"
                                        href="https://service.securecash.com.au/"
                                    >
                                        online services
                                    </Link>
                                </strong>{" "}
                                48hrs prior to delivery.
                            </li>
                            <li className="mb-6">
                                Change orders can only be delivered on the same day as your cash
                                collection service.
                            </li>
                            <li className="mb-6">
                                You will be required to reimburse the change order (cash only, no
                                cheques) upon delivery.
                            </li>
                        </ul>
                    </div>

                    <div className="w-4/5 mt-12 text-center">
                        <h2 className="text-[26px] text-primary">
                            <Link
                                className="text-primary hover:underline"
                                href="/quote"
                            >
                                GET A QUOTE HERE
                            </Link>
                        </h2>
                        <p className="mb-4 mt-2 text-black">
                            Provide the codeword &quot;FreeChange2021&quot;
                        </p>
                    </div>

                    <div className="h-[30px] md:h-[100px]" />
                </div>
            </div>
        </article>
    );
};

export default FreeChangeOrderService;