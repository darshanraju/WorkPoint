import Image from "next/image";
import React, { useMemo, useState } from "react";
import ExpandedContent from "./ExpandedContent";

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

interface headingOrText {
  type: "heading" | "text";
  content: string;
}

interface points {
  type: "list";
  content: Array<string>;
}

// interface part {
//   type: "heading" | "text" | "list";
//   content: string | Array<string>;
// }

type part = headingOrText | points;

export interface IJobAdd {
  company: string;
  tags?: Array<string>;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo: any;
  posted: number;
  type: "grad" | "intern";
  location: string;
  jobInfo?: IJobInfo;
  link: string;
}

export interface IJobAddV2 {
  company: string;
  tags?: Array<string>;
  jobTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo: any;
  posted: number;
  type: "grad" | "intern";
  location: string;
  jobDesc?: Array<part>;
  link: string;
}

export interface IJobAddV3 {
  company: string;
  tags?: Array<string>;
  jobTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo: any;
  posted: number;
  type: "grad" | "intern";
  location: string;
  jobDesc?: string;
  link: string;
}

const JobAdd = (ctx: IJobAddV3) => {
  const now = Date.now();
  const [open, setOpen] = useState<boolean>(false);
  const [seeApply, setSeeApply] = useState<boolean>(false);

  const applyClass = seeApply
    ? "items-center sm:hidden lg:flex"
    : "items-center sm:hidden lg:invisible lg:flex";

  return (
    <div
      className="dark:text-white hover:text-black flex flex-col lg:border-2 border-gray-200 rounded-lg shadow-lg hover:bg-slate-100 transition ease-in-out delay-100"
      onMouseEnter={() => setSeeApply(true)}
      onMouseLeave={() => setSeeApply(false)}
    >
      <div
        className="flex p-4 hover:cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="w-1/6 lg:w-1/6 relative">
          <Image
            src={ctx.logo}
            layout="fill"
            objectFit="contain"
            alt="company_logo"
          />
        </div>
        <div className="flex px-4 lg:px-0 flex-col w-4/6 lg:w-3/6 items-start">
          <div className="font-medium text-sm lg:text-lg text-start">
            {ctx.company}
          </div>
          <div className="font-bold lg:text-xl text-start">{ctx.jobTitle}</div>
          <div className="flex items-center font-bold text-sm lg:text-lg pt-2 text-start lg:text-center">
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
            <span className="p-1">
              {ctx.location?.replace(/, Australia$/, "")}
            </span>
          </div>
        </div>
        <div className="flex lg:w-1/6 items-center flex-wrap hidden lg:flex">
          {ctx.tags?.map((tag, idx) => (
            <Tag tag={tag} key={idx} />
          ))}
        </div>
        <div className="flex w-1/6 lg:w-1/6 items-center font-semibold justify-center">
          {snowManMethod(now, ctx.posted)}
        </div>
        <div className={applyClass} onClick={() => 42}>
          <button
            className="btn btn-secondary"
            onClick={() => window.open(ctx.link, "_blank")}
          >
            Apply
          </button>
        </div>
      </div>
      {open && (
        <ExpandedContent
          company={ctx.company}
          location={ctx.location}
          logo={ctx.logo}
          posted={ctx.posted}
          jobTitle={ctx.jobTitle}
          tags={ctx.tags}
          type={ctx.type}
          link={ctx.link}
          jobDesc={ctx.jobDesc}
        />
      )}
    </div>
  );
};

interface ITag {
  tag: string;
}

const Tag = ({ tag }: ITag) => {
  return (
    <div className="badge badge-outline badge-lg hover:border-2 border-gray-500 lg:p-3 lg:mr-2 ">
      {tag}
    </div>
  );
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
