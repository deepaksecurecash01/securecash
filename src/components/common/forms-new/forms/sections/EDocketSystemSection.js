// /components/forms/ICA/sections/EDocketSystemSection.js - REFACTORED FOR useFormManager
import React from 'react';
import { FaClock } from "react-icons/fa";
import VimeoLite from "@/components/common/VimeoLite";
const IcaSectionTitle = ({ children, Icon, position = 'center' }) =>
{
  const Divider = ({
    color = "primary",
    width = "100px",
    alignment = "center",
    margin = "my-6",
    responsiveClassName = "",
    customStyle = {}, // <--- you can pass extra style here
  }) =>
  {
    // normalize width (accept number -> px, or string like '50%' or '120px')
    const resolvedWidth = typeof width === "number" ? `${width}px` : width;

    const style = {
      width: resolvedWidth,
      height: "4px",
      borderRadius: "5px",
      ...customStyle, // allow callers to override/add styles
    };

    // alignment via inline margin
    if (alignment === "left") {
      style.marginLeft = 0;
      style.marginRight = "auto";
    } else if (alignment === "right") {
      style.marginLeft = "auto";
      style.marginRight = 0;
    } else {
      // center
      style.marginLeft = "auto";
      style.marginRight = "auto";
    }

    // color handling: if hex -> inline style, else use Tailwind bg class
    let colorClass = "";
    if (typeof color === "string" && color.startsWith("#")) {
      style.backgroundColor = color;
    } else if (color) {
      colorClass = `bg-${color}`;
    }

    // keep Tailwind for border reset / margin utility string, but remove width/align classes
    return (
      <hr
        className={`border-0 ${colorClass} ${margin} ${responsiveClassName}`}
        style={style}
      />
    );
  };

  return (
    <div className="mb-2">
      <div className={`flex items-center gap-3 mb-4 justify-center ${position === 'left' ? ' 1024px:justify-start' : 'justify-center'}`}>
        {Icon && <Icon className="text-[24px] text-primary" />}
        <h3 className="text-[26px] font-semibold text-gray-800">
          {children}
        </h3>
      </div>
      <Divider
        color="primary"
        alignment={position === 'left' ? 'left' : 'center'}
        margin="mt-[20px]"
        responsiveClassName="m-0 text-left"
      />
    </div>
  );
};

const EDocketSystemSection = ({ COMPANY_INFO }) => (
  <div className="space-y-6 border-b border-dark-border/30 pb-12">
    <IcaSectionTitle Icon={FaClock}>eDocket System</IcaSectionTitle>

    <div className="bg-[rgb(242,242,242,0.9)] p-6 rounded-lg">
      <p className="text-sm text-gray-700 mb-4">
        You can start using this technology to service your own clients as an
        eDockets Licensee. We know first hand how annoying it is to have a
        mountain of paperwork cluttering your office and dealing with dozens of
        seperate spreadsheets to manage your client listings. With this system
        all the paper work is gone and yet all the information is so much easier
        to access! <br /><br />

        eDockets provides you a full database to better manage your
        Operations and providing clients with their own dedicated access to be
        able to manage their own services by booking Extra Pickups, submitting
        their Change Orders and Cancelling a service when it is no longer
        required. You are also able to completely organise your daily operations
        with Run Sheets that feed directly to the Operator in the app and
        Automated Invoicing where charges automatically generate with the
        transactions you perform and instant export at the end of the month,
        just to name a couple of the benefits! <br /><br />

        Let us know if you would like more information, simply send an email to{" "}
        <a
          href={`mailto:${COMPANY_INFO.email}`}
          className="text-primary underline"
        >
          {COMPANY_INFO.email}{" "}
        </a>
        and check out the video below!{" "}
      </p>

      <div className="aspect-video bg-gray-200 rounded-sm flex items-center justify-center">
        <div className="video-player rounded-lg overflow-hidden w-full h-full">
          <VimeoLite videoId="339048754" />
        </div>
      </div>
    </div>
  </div>
);

export default EDocketSystemSection;