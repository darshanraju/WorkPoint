import Image from "next/image";
import location from "../../public/location.png";
import React, { useState } from "react";
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

export interface IJobAdd {
  company: string;
  tags: Array<string>;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo: any;
  posted: number;
  type: "grad" | "intern";
  location: string;
  jobInfo?: IJobInfo;
  link: string;
}

const mockJobInfo: IJobInfo = {
  preText: [
    {
      title: "About us",
      text: [
        "We are a VC-backed, well-funded SaaS startup in Singapore.",
        "We are tackling the complex world of employee management. It's incredible how employee management processes in most organizations are still so manual and complicated as of 2022. Thousands of hours are spent on processing admin tasks and reconciling employee data across spreadsheets and different systems.",
        "The world has changed; traditional employee management systems are not built for the future of work. Omni is taking on an ambitious mission to become the “operating system” of modern organizations. We are helping our customers automate administrative workflows and create the single source of truth of employee records.",
      ],
    },
    {
      title: "What we are looking for",
      text: [
        "We are looking for a Software Engineer who wants to be deeply involved in the end-to-end delivery of a new software product. You will be responsible for both developing new modules from scratch and improving our existing features. You will work closely with the Founders, the Product Lead, and other engineers in building and shaping a product that users love and can rely on.",
        "To succeed in this role you will need to be a self-starter, think in solutions and not problems, be a team player, and have a “can do” attitude. You will be required to demonstrate competence in delivering features by calling the APIs from backend and building the frontend web applications. You will also need to understand testing and know when, what, and how to test in a startup environment.",
        "This role will be challenging, but extremely rewarding -- you will gain invaluable experience in building new modules from scratch and iterating quickly in an agile environment. Our team is invested in building the best product for our customers, and we will make every effort to provide you with a setup that spawns great creativity, innovation, and reward.",
      ],
    },
  ],
  lists: [
    {
      title: "Responsibilities",
      points: [
        "Develop and deploy the software systems that iteratively deliver business value",
        "Derive and implement non-functional requirements based on interactions with the product and business elements",
        "Establish best practices for developing processes, technologies, coding practices and architectures",
        "Maintain a DevOps culture and an Agile product development mindset in the technical team",
        "Write and maintain unit tests to ensure robustness of the product",
        "Debug and fix code based on customer incident reports and on errors found through internal testing",
        "Maintain software infrastructure and ensure optimal availability of products / services",
        "Assist in maintaining and upgrading the software architecture as new services are added to ensure ease of long-term development",
      ],
    },
  ],
};

const JobAdd = (ctx: IJobAdd) => {
  const now = Date.now();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col  duration-500 lg:border-2 border-gray-500 rounded-lg shadow-xl  motion-safe:hover:scale-105 hover:bg-slate-200 ">
      <div
        className="flex p-4 hover:cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="w-1/6 lg:w-1/6 relative">
          {/* <Image src={ctx.logo} height="80px" width="80px" alt="company_logo" /> */}
          <Image
            src={ctx.logo}
            layout="fill" // required
            objectFit="contain" // change to suit your needs
            // className="rounded-full" // just an example
            alt="company_logo"
          />
        </div>
        {/* <div className="flex flex-col"> */}
        <div className="flex px-4 lg:px-0 flex-col w-4/6 lg:w-2/6 items-start">
          <div className="font-medium lg:text-lg text-xl">{ctx.company}</div>
          <div className="font-bold lg:text-xl text-start lg:text-center">
            {ctx.role}
          </div>
          <div className="font-bold lg:text-lg pt-2 text-start lg:text-center">
            <Image
              height={15}
              width={22}
              alt="location_pointer"
              src={location}
              style={{
                paddingLeft: "5px",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
            <span className="p-1">{ctx.location}</span>
          </div>
        </div>
        <div className="flex lg:w-2/6 items-center flex-wrap hidden lg:flex">
          {ctx.tags.map((tag, idx) => (
            <Tag tag={tag} key={idx} />
          ))}
        </div>
        <div className="flex w-1/6 lg:w-1/6 items-center font-semibold justify-center">
          {snowManMethod(now, ctx.posted)}
        </div>
        <div className="flex items-center" onClick={() => 42}>
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
          role={ctx.role}
          tags={ctx.tags}
          type={ctx.type}
          link={ctx.link}
          jobInfo={mockJobInfo}
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
    // minute: 60,
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
