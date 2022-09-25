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
      "block w-full px-12 py-3 text-sm font-medium dark:text-white border border-blue-600 rounded sm:w-auto ";
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
    switch (sortKey) {
      case "Newly Added":
        setJobFilter({ ...jobFilter, sortState: sortStates.latest });
        // sorts.latest(jobs);
        break;
      case "Company":
        setJobFilter({ ...jobFilter, sortState: sortStates.company });

        // sorts.company(jobs);
        break;
    }
  };

  return (
    <div className="w-full">
      <div className="text-center stat-value m-5 dark:text-white">
        {"I'm looking for..."}
      </div>

      <div className="flex flex-wrap justify-center mt-4 gap-4 pb-8">
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
      </div>

      <div className="flex w-full justify-end">
        <select
          className="select select-success max-w-xs"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option disabled selected>
            Sort by
          </option>
          <option>Newly Added</option>
          <option>Company</option>
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
