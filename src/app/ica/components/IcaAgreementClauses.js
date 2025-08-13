import React from 'react';

const TermsListItem = ({ item, isAnnexure = false }) => (
    <li className={isAnnexure ? "annexure-item" : ""}>
        {item.number && <span className="tnc-number absolute left-0 text-[16px] font-semibold text-primary">{item.number}</span>}
        <p className={`${item.wide ? "bullet-wide" : ""} block leading-[2em] pl-[47px] mb-[30px]`}>{item.text}</p>
    </li>
);

const TermsSection = ({ section, isAnnexure = false }) => (
    <>
        {section.title && (
            <div className=" font-semibold leading-[1.6em] mx-auto 992px:text-[18px] pt-4 mb-[24px] 768px:text-left 768px:mx-0 font-montserrat">
                {section.title}
            </div>
        )}
        <ul className={`tnc-page-sa-clauses--content__list list-none font-light relative px-4 1024px:pr-8 ${isAnnexure ? 'annexure-list' : ''}`}>
            {section.items?.map((item, index) => (
                <TermsListItem key={index} item={item} isAnnexure={isAnnexure} />
            ))}
        </ul>
    </>
);

const IcaContractorClauses = ({ data }) =>
{
    return (
        <section className="border border-dark-border/50 py-[18px] px-5">
            <div className="h-auto w-full mx-auto max-h-[642px]   1024px:max-h-[370px] overflow-y-auto ">
                {Object.entries(data || {}).map(([key, section]) =>
                    key !== 'annexureData' && section?.items ? (
                        <TermsSection key={key} section={section} />
                    ) : null
                )}

                {Object.entries(data?.annexureData || {}).map(([key, section]) => (
                    <TermsSection key={key} section={section} isAnnexure={true} />
                ))}
            </div>
        </section>
    );
};

export default IcaContractorClauses;