import Image from "next/image";
import location from "../../public/location.png";
import React from "react";

export interface IJobAdd {
  company: string;
  tags: Array<string>;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo: any;
  posted: number;
  type: "grad" | "intern";
  location: string;
}

const JobAdd = (ctx: IJobAdd) => {
  const now = Date.now();
  return (
    <div className="flex p-4 duration-500 lg:border-2 border-gray-500 rounded-lg shadow-xl motion-safe:hover:scale-105 hover:bg-slate-200 hover:cursor-pointer">
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
