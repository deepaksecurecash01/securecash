"use client";
import React, { useState } from "react";
import Container from "@/components/layout/Container";
import Link from "next/link";
import TermsFormControllerVersion from "@/components/common/forms-new/forms/TermsForm";

const FormSection = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [abn, setAbn] = useState("");

  return (
    <section className="tnc-page-sa-form my-[90px] px-5 mb-10 1024px:mb-[112px]">
      <Container className="inner w-full">
        <div className="tnc-page-sa-form--wrap flex flex-wrap flex-col 1024px:flex-row">
          <div className="tnc-page-sa-form--content self-center 1024px:pl-[18px] 1024px:w-1/2 order-2 1024px:order-1">
        

            {/* PARTIES SECTION */}
            <h3 className="tnc-page-sa-form--content__title text-[20px] font-bold uppercase mt-[56px] mb-[20px]">
              PARTIES
            </h3>

            <h4 className="text-[18px] font-bold mb-2">Principal</h4>
            <p className="font-light text-[16px] leading-[2em] mb-6">
              Sky Wallet Pty Ltd
              <br />
              ABN 39 668 299 027
              <br />
              30 Church Hill Road, Old Noarlunga SA 5168
              <br />
              Trading under licence as <strong>SecureCash</strong>
              <br />
              (including its permitted contractors, franchisees, agents and
              assigns) (<strong>Principal</strong>)
            </p>

            <h4 className="text-[18px] font-bold mb-2">Customer</h4>
            <p className="font-light text-[16px] leading-[2em] mb-4">
              <span className="sa-form--content-name">{name || "Name"}</span> (
              <span className="sa-form--content-position">
                {position || "Position"}
              </span>
              ) of{" "}
              <span className="sa-form--content-org">
                {organisation || "Organisation"}
              </span>{" "}
              ABN{" "}
              <span className="sa-form--content-abn-num">
                {abn || "Number"}
              </span>{" "}
              (<strong>Customer</strong>) together with the Principal and the
              Customer are referred to as &quot;the Parties&quot;)
            </p>

            {/* COMMENCEMENT SECTION */}
            <h3 className="tnc-page-sa-form--content__title text-[20px] font-bold uppercase mt-[40px] mb-[20px]">
              COMMENCEMENT AND TERM
            </h3>
            <p className="font-light text-[16px] leading-[2em] mb-4">
              This Agreement commences on the date the Customer accepts these
              Terms and continues until terminated in accordance with this
              Agreement.
            </p>
            <p className="font-light text-[16px] leading-[2em]">
              Acceptance may occur by written signature, electronic acceptance,
              or continued use of the Services.
            </p>

            <p className="text-[16px] leading-[2rem] text-left 768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light flex flex-col gap-4 mt-8 font-montserrat">
              <strong>
                <Link className="text-primary hover:underline" href="/welcome">
                  &lt;&lt; Previous
                </Link>
              </strong>
            </p>
          </div>
          <div className="tnc-page-sa-form--form 1024px:w-1/2 order-1 1024px:order-2">
            <p className="tnc-page-sa-form--content__text-alt font-light text-[16px] text-center p-5 leading-[2em] 1024px:hidden">
              We ask that you now take the time to read through these terms and
              conditions and if you are happy with the content then simply fill
              out the form and click &apos;
              <span className="text-primary italic">
                I agree with the above Terms &amp; Conditions.
              </span>
              &apos; to move on the next step.
            </p>
            <TermsFormControllerVersion
              setName={setName}
              setPosition={setPosition}
              setOrganisation={setOrganisation}
              setAbn={setAbn}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FormSection;
