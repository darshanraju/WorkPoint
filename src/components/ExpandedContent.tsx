import React from "react";
import { IJobAdd } from "./JobAdd";
import parse from "html-react-parser";

const ExpandedContent = (ctx: IJobAdd) => {
  return (
    <div className="box-border px-3 w-full lg:p-10 text-start ">
      {ctx.company && ctx.jobTitle && (
        <div className="text-lg lg:text-2xl ">{ctx.company} is hiring a</div>
      )}
      <div className="text-xl lg:text-3xl text-start">{ctx.jobTitle}</div>
      <div
        style={{
          overflowWrap: "normal",
          wordBreak: "break-word",
        }}
      >
        {ctx.jobDesc &&
          parse(
            ctx.jobDesc
              .replace(/<ul>/g, "")
              .replace(/<\/ul>/g, "")
              .replace(/<ol>/g, "")
              .replace(/<\/ol/, "")
          )}
      </div>
      {ctx.link && (
        <div className="flex-col items-center pt-4 text-center">
          <button
            className="btn btn-secondary lg:w-1/3 lg:text-lg"
            onClick={() => window.open(ctx.link, "_blank")}
          >
            <div>{"Apply"}</div>
          </button>

          <div className="text-lg p-2">
            👉 Please reference you found the job on CSE Gigs, this helps us get
            more companies to post here, thanks!
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandedContent;
