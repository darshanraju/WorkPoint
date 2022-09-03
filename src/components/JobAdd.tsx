import Image from "next/image";
import React from "react";

export interface IJobAdd {
  company: string;
  tags: Array<string>;
  role: string;
  logo: any;
}

const JobAdd = (ctx: IJobAdd) => {
  return (
    <div className="flex p-4 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105 hover:bg-slate-200 hover:cursor-pointer">
      <div className="w-1/6">
        <Image src={ctx.logo} height="80px" width="80px" alt="company_logo" />
      </div>
      {/* <div className="flex flex-col"> */}
      <div className="flex flex-col w-2/6 items-start">
        <div className="font-medium text-lg">{ctx.company}</div>
        <div className="font-semibold text-xl">{ctx.role}</div>
      </div>
      <div className="flex w-2/6 items-center">
        {ctx.tags.map((tag, idx) => (
          <Tag tag={tag} key={idx} />
        ))}
      </div>
      <div className="flex w-1/6">posted</div>
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

    // <span className="badge badge-lg">NEW</span>
    // <span className="border-2 border-gray-500 rounded shadow-xl">{tag}</span>
  );
};

export default JobAdd;
