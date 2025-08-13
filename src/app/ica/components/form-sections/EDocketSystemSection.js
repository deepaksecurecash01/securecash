import { FaClock } from "react-icons/fa";
import {
  Checkbox,
  InputField,
  SelectionBox,
  FileUpload,
  SectionTitle,
} from "../FormComponents";
import VimeoLite from "@/components/VimeoLite";

const EDocketSystemSection = ({ COMPANY_INFO }) => (
  <div className="space-y-6 ">
    <SectionTitle Icon={FaClock}>eDocket System</SectionTitle>

    <div className="bg-[rgb(242,242,242,0.9)] p-6 rounded-lg">
      <p className="text-sm text-gray-700 mb-4">
        You can start using this technology to service your own clients as an
        eDockets Licensee. We know first hand how annoying it is to have a
        mountain of paperwork cluttering your office and dealing with dozens of
        seperate spreadsheets to manage your client listings. With this system
        all the paper work is gone and yet all the information is so much easier
        to access! <br /><br /> eDockets provides you a full database to better manage your
        Operations and providing clients with their own dedicated access to be
        able to manage their own services by booking Extra Pickups, submitting
        their Change Orders and Cancelling a service when it is no longer
        required. You are also able to completely organise your daily operations
        with Run Sheets that feed directly to the Operator in the app and
        Automated Invoicing where charges automatically generate with the
        transactions you perform and instant export at the end of the month,
        just to name a couple of the benefits! <br /><br /> Let us know if you would like
        more information, simply send an email to{" "}
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
