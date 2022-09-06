import React from "react";
import { IJobAdd, Section, List } from "./JobAdd";

const ExpandedContent = (ctx: IJobAdd) => {
  return (
    <div className="p-5 lg:p-10">
      <div className="text-lg lg:text-2xl text-start">
        {ctx.company} is hiring a
      </div>
      <div className="text-xl lg:text-3xl text-start">{ctx.role}</div>
      {ctx.jobInfo?.preText?.map((section, idx) => {
        return <Section text={section.text} title={section.title} key={idx} />;
      })}
      {ctx.jobInfo?.lists?.map((list, idx) => {
        return <List points={list.points} title={list.title} key={idx} />;
      })}
      {ctx.jobInfo?.postText?.map((section, idx) => {
        return <Section text={section.text} title={section.title} key={idx} />;
      })}
      <div className=" items-center lg:hidden" onClick={() => 42}>
        <button
          className="btn btn-secondary"
          onClick={() => window.open(ctx.link, "_blank")}
        >
          Apply
        </button>
      </div>
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

const List = ({ title, points }: List) => {
  return (
    <div className="py-5">
      <div className="text-start font-bold lg:text-l">{title}</div>
      {points.map((point, idx) => {
        return (
          <li key={idx} className="text-start py-2">
            {point}
          </li>
        );
      })}
    </div>
  );
};

export default ExpandedContent;
