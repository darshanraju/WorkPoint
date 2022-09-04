import Image from "next/image";
import location from "../../public/cursor.png";
import React from "react";

export interface IJobAdd {
  company: string;
  tags: Array<string>;
  role: string;
  logo: any;
  posted: number;
  type: "grad" | "intern";
  location: string;
}

const JobAdd = (ctx: IJobAdd) => {
  const now = Date.now();
  return (
    <div className="flex p-4 duration-500 border-2 border-gray-500 rounded-lg shadow-xl motion-safe:hover:scale-105 hover:bg-slate-200 hover:cursor-pointer">
      <div className="w-1/6">
        <Image src={ctx.logo} height="80px" width="80px" alt="company_logo" />
      </div>
      {/* <div className="flex flex-col"> */}
      <div className="flex flex-col w-2/6 items-start">
        <div className="font-medium text-lg">{ctx.company}</div>
        <div className="font-bold text-xl">{ctx.role}</div>
        <div className="font-bold text-l pt-2">
          <Image
            height={15}
            width={25}
            alt="location_pointer"
            src={location}
            style={{ paddingLeft: "5px", paddingRight: "5px" }}
          />
          <span>{ctx.location}</span>
        </div>
      </div>
      <div className="flex w-2/6 items-center">
        {ctx.tags.map((tag, idx) => (
          <Tag tag={tag} key={idx} />
        ))}
      </div>
      <div className="flex w-1/6 items-center font-semibold">
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
    <div className="badge badge-outline badge-lg hover:border-2 border-gray-500 p-3 mr-2">
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

  // for example: {year:0,month:0,week:1,day:2,hour:34,minute:56,second:7}
  console.log(r);
  if (r["month"] !== 0) return `${r["month"]}m`;
  if (r["week"] !== 0) return `${r["week"]}w`;
  if (r["day"] !== 0) return `${r["day"]}d`;
  if (r["hour"] !== 0) return `${r["hour"]}h`;
  return `${r["minute"]}min`;
};
export default JobAdd;
