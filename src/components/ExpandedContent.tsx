import React from "react";
import { IJobAdd, Section } from "./JobAdd";

const ExpandedContent = (ctx: IJobAdd) => {
  return (
    <div className="p-10">
      <div className="text-2xl text-start">{ctx.company} is hiring a</div>
      <div className="text-3xl text-start">{ctx.role}</div>
      {ctx.jobInfo?.preText?.map((section, idx) => {
        return <Section text={section.text} title={section.title} key={idx} />;
      })}
    </div>
  );
};

const Section = ({ title, text }: Section) => {
  return (
    <div className="py-5">
      <div className="text-start font-bold lg:text-l">{title}</div>
      {text.map((part, idx) => {
        return (
          <div key={idx} className="text-start py-2">
            {part}
          </div>
        );
      })}
    </div>
  );
};

export default ExpandedContent;
