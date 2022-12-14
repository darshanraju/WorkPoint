import React from "react";
import { filterStates, IJobFilter, sortStates } from "../pages";
import { IJobAddV3 } from "./JobAdd";
interface IFilter {
  jobFilter: IJobFilter;
  setJobFilter: React.Dispatch<React.SetStateAction<IJobFilter>>;
  sorts: {
    latest: (jobsToSort: Array<IJobAddV3>) => void;
    company: (jobsToSort: Array<IJobAddV3>) => void;
  };
  jobs: IJobAddV3[];
}

const Filter = ({ sorts, jobs, setJobFilter, jobFilter }: IFilter) => {
  const classMakerV2 = (btn: filterStates) => {
    const common =
      "text-center lock px-4 lg:px-12 py-3 text-sm font-medium dark:text-white border border-blue-600 rounded sm:w-auto ";
    if (jobFilter.JobType === btn) {
      return (
        common +
        "active:text-opacity-75 text-white dark:hover:text-white focus:outline-none focus:ring bg-blue-600 cursor-pointer"
      );
    }
    return (
      common +
      "hover:bg-blue-600 active:bg-blue-500 hover:text-white focus:outline-none focus:ring cursor-pointer"
    );
  };

  const handleSortChange = (sortKey: string) => {
    console.log("TRYING TO SORT", sortKey);
    if (sortKey.includes("Newly Added")) {
      setJobFilter({ ...jobFilter, sortState: sortStates.latest });
    } else if (sortKey.includes("Company")) {
      setJobFilter({ ...jobFilter, sortState: sortStates.company });
    }
  };

  const handleJobTypeChange = (jobType: string) => {
    if (jobType.includes("Internship")) {
      setJobFilter({ ...jobFilter, JobType: filterStates.intern });
    } else if (jobType.includes("Graduate")) {
      setJobFilter({ ...jobFilter, JobType: filterStates.grad });
    } else if (jobType.includes("Intern and Grad")) {
      setJobFilter({ ...jobFilter, JobType: filterStates.both });
    }
  };

  return (
    <div className="w-full">
      {/* <div className="text-center text-xl font-bold lg:text-3xl m-5 dark:text-white">
        {"I'm looking for..."}
      </div> */}

      {/* <div className="flex flex-wrap justify-center mt-4 space-x-1 md:space-x-4 pb-8">
        <a
          className={classMakerV2(filterStates.intern)}
          onClick={() =>
            setJobFilter({ ...jobFilter, JobType: filterStates.intern })
          }
        >
          An Internship
        </a>

        <a
          className={classMakerV2(filterStates.grad)}
          onClick={() =>
            setJobFilter({ ...jobFilter, JobType: filterStates.grad })
          }
        >
          A Grad Role
        </a>

        <a
          className={classMakerV2(filterStates.both)}
          onClick={() =>
            setJobFilter({ ...jobFilter, JobType: filterStates.both })
          }
        >
          BOTH!
        </a>
      </div> */}

      <div className="flex w-full justify-between items-end px-2 ">
        <select
          className="select select-success max-w-xs bg-white dark:bg-[#222222] dark:text-[#bfbfbf] lg:text-xl"
          onChange={(e) => handleJobTypeChange(e.target.value)}
        >
          {/* <option disabled selected className="lg:text-xl py-3">
            ???? Job Type
          </option> */}
          <option className="lg:text-xl py-3">???? Internship</option>
          <option className="lg:text-xl py-3">???? Graduate</option>
          <option selected className="lg:text-xl py-3">
            ???? Intern and Grad
          </option>
        </select>
        <select
          className="select select-success max-w-xs bg-white dark:bg-[#222222] dark:text-[#bfbfbf] lg:text-xl"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option disabled selected className="lg:text-xl py-3">
            ??? Sort by
          </option>
          <option className="lg:text-xl py-3">???? Newly Added</option>
          <option className="lg:text-xl py-3">???? Company</option>
        </select>
        {/* <select className="select select-success  max-w-xs">
          <option disabled selected>
            Location
          </option>
          <option>Australia</option>
          <option>Ireland</option>
          <option>United States</option>
          <option>Germany</option>
          <option>India</option>
        </select> */}
        {/* <select className="select select-success  max-w-xs">
          <option disabled selected>
            Search
          </option>
          <option>Software Developer</option>
          <option>Frontend Engineer</option>
          <option>Backend Engineer</option>
          <option>Data Scientist</option>
          <option>Data Analyst</option>
          <option>Golang</option>
          <option>C#</option>
          <option>C++</option>
          <option>Most Applied</option>
        </select> */}
      </div>
    </div>
  );
};

export default Filter;
