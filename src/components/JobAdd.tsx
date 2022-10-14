import Image from "next/image";
import React, { useState } from "react";
import ExpandedContent from "./ExpandedContent";
import TempCompanyLogoV2 from "../../public/questionMark.svg";
import { filterStates } from "../pages";
import { jobTypeValues } from "../utils/jobUtils";
export interface Section {
  title: string;
  text: Array<string>;
}

export interface List {
  title: string;
  points: Array<string>;
}

export interface IJobInfo {
  preText?: Array<Section>;
  lists?: Array<List>;
  postText?: Array<Section>;
}

export enum JobTypes {
  grad = "grad",
  intern = "intern",
}

export interface IJobAdd {
  company?: string;
  tags?: Array<string>;
  jobTitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo?: any;
  posted: number;
  type?: filterStates;
  location?: string;
  jobDesc?: string;
  link?: string;
  posting?: boolean;
  primaryJobTag?: jobTypeValues;
}

const showCity = (location: string) => {
  if (location.includes(",")) {
    return location.split(",")[0];
  }
  return location;
};

const JobAdd = ({
  company = "Your Company",
  jobDesc = "",
  jobTitle = "Example Job Title",
  location = "",
  link = "",
  type = filterStates.grad,
  posted,
  logo = TempCompanyLogoV2,
  tags,
  posting = false,
  primaryJobTag,
}: IJobAdd) => {
  const now = Date.now();
  const [open, setOpen] = useState<boolean>(false);
  const [seeApply, setSeeApply] = useState<boolean>(false);
  const applyClass = posting
    ? "items-center flex"
    : seeApply
    ? "items-center hidden lg:flex"
    : "items-center items-center hidden md:flex lg:invisible";

  return (
    <div
      className="dark:text-[#bfbfbf] hover:text-black flex flex-col border-t-2 md:border-2 border-gray-200 lg:rounded-lg lg:shadow-lg hover:bg-slate-200 transition ease-in-out delay-100 dark:border-[#28395c] dark:bg-[#192339] hover:dark:bg-[#212e4b] w-full min-h-100 bg-white"
      onMouseEnter={() => setSeeApply(true)}
      onMouseLeave={() => setSeeApply(false)}
    >
      <div
        className="flex pl-2 lg:p-4 hover:cursor-pointer h-full"
        onClick={() => setOpen(!open)}
      >
        {logo && (
          <div className="w-1/6 lg:w-1/7 relative flex justify-center">
            {/* <div className="flex w-3/4"> */}
            <Image
              src={logo}
              // layout="fill"
              height="100%"
              width="100%"
              objectFit="contain"
              alt="company_logo"
            />
            {/* </div> */}
          </div>
        )}
        <div className="flex pl-4 lg:px-0 flex-col w-4/6 lg:w-2/6 items-start justify-center">
          <div className="font-medium text-sm lg:text-lg text-start">
            {company}
          </div>
          <div className="font-bold lg:text-xl text-start">{jobTitle}</div>

          <div className="flex items-center font-bold text-sm lg:text-lg pt-2 text-start lg:text-center ">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <span className="p-1 hidden lg:flex">
                {location
                  ? location.replace(/, Australia$/, "")
                  : "The Job Location"}
              </span>

              <span className="p-1 md:hidden">
                {location
                  ? showCity(location.replace(/, Australia$/, ""))
                  : "The Job Location"}
              </span>
            </div>
          </div>
          <span>
            {type === "grad" ? (
              <JobTypeTag tag="💼 Graduate" />
            ) : (
              <JobTypeTag tag="👶 Internship" />
            )}
            {primaryJobTag && <PrimaryJobTag tag={primaryJobTag} />}
          </span>
        </div>
        <div className="flex items-end lg:w-2/6  flex-wrap hidden lg:flex">
          {tags?.map((tag, idx) => {
            if (tag.length > 0) {
              return <BenefitTag tag={tag} key={idx} />;
            }
          })}
        </div>
        <div className="flex lg:w-1/6 items-center font-semibold justify-center">
          {!posting && snowManMethod(now, posted)}
        </div>
        <div className={applyClass}>
          <button
            className="btn btn-sm md:btn-md btn-secondary mx-2"
            onClick={() => {
              if (link && link.length > 8) {
                console.log("Opening: ", link);
                window.open(link, "_blank");
              }
            }}
          >
            Apply
          </button>
        </div>
      </div>
      {open && company && jobTitle && (
        <ExpandedContent
          company={company}
          location={location}
          logo={logo}
          posted={posted}
          jobTitle={jobTitle}
          tags={tags}
          type={type}
          link={link}
          jobDesc={jobDesc}
          posting={posting}
          primaryJobTag={primaryJobTag}
        />
      )}
    </div>
  );
};

interface ITag {
  tag: string;
}

const BenefitTag = ({ tag }: ITag) => {
  return (
    <div className="p-2 m-1 badge badge-sm badge-accent hover:badge-accent cursor-pointer">
      {tag}
    </div>
  );
};

const JobTypeTag = ({ tag }: ITag) => {
  return tag.includes("Graduate") ? (
    <div className="p-2 m-1 badge badge-md md:badge-lg badge-success bg-green-300">
      {tag}
    </div>
  ) : (
    <div className="p-2 m-1 badge badge-md md:badge-lg badge-info bg-sky-300">
      <div className="text-bold">{tag}</div>
    </div>
  );
};

const PrimaryJobTag = ({ tag }: { tag: jobTypeValues }) => {
  switch (tag) {
    case jobTypeValues.backendEngineer:
      return (
        <div className="p-2 m-1 badge badge-md md:badge-lg bg-purple-300 text-black">
          {tag}
        </div>
      );
    case jobTypeValues.consulting:
      return (
        <div className="p-2 m-1 badge badge-md md:badge-lg badge-lg bg-lime-300 text-black">
          {tag}
        </div>
      );
    case jobTypeValues.dataScientist:
      return (
        <div className="p-2 m-1 badge badge-md md:badge-lg bg-teal-300 text-black">
          {tag}
        </div>
      );
    case jobTypeValues.devops:
      return (
        <div className="p-2 m-1 badge badge-md md:badge-lg  bg-yellow-300 text-black">
          {tag}
        </div>
      );
    case jobTypeValues.frontendEngineer:
      return (
        <div className="p-2 m-1 badge badge-md md:badge-lg bg-pink-300 text-black">
          {tag}
        </div>
      );
    case jobTypeValues.fullstackEngineer:
      return (
        <div className="p-2 m-1 badge badge-md md:badge-lg bg-red-300 text-black">
          {tag}
        </div>
      );
    case jobTypeValues.softwareEngineer:
      return (
        <div className="p-2 m-1 badge badge-md md:badge-lg bg-indigo-300 text-black">
          {tag}
        </div>
      );
    case jobTypeValues.ux:
      return (
        <div className="p-2 m-1 badge badge-md md:badge-lg bg-rose-300 text-black">
          {tag}
        </div>
      );
  }
};

const snowManMethod = (date_now: number, date_posted: number) => {
  let d = Math.abs(date_now - date_posted) / 1000; // delta
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r: any = {}; // result
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s: any = {
    // structure
    // year: 31536000,
    month: 2592000,
    week: 604800, // uncomment row to ignore
    day: 86400, // feel free to add your own row
    hour: 3600,
    minute: 60,
    // second: 1,
  };

  Object.keys(s).forEach(function (key) {
    r[key] = Math.floor(d / s[key]);
    d -= r[key] * s[key];
  });

  if (r["month"] !== 0) return `${r["month"]}m`;
  if (r["week"] !== 0) return `${r["week"]}w`;
  if (r["day"] !== 0) return `${r["day"]}d`;
  if (r["hour"] !== 0) return `${r["hour"]}h`;
  return `${r["minute"]}min`;
};
export default JobAdd;
