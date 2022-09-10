import React from "react";
import { IJobAddV3 } from "./JobAdd";
import parse from "html-react-parser";

const ExpandedContent = (ctx: IJobAddV3) => {
  return (
    <div className="p-5 lg:p-10">
      <div className="text-lg lg:text-2xl text-start">
        {ctx.company} is hiring a
      </div>
      <div className="text-xl lg:text-3xl text-start">{ctx.jobTitle}</div>
      <div className="text-start">
        {ctx.jobDesc &&
          parse(
            ctx.jobDesc
              .replace(/<ul>/g, "")
              .replace(/<\/ul>/g, "")
              .replace(/<ol>/g, "")
              .replace(/<\/ol/, "")
          )}
      </div>
      <div className=" items-center lg:hidden pt-4" onClick={() => 42}>
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

export default ExpandedContent;
