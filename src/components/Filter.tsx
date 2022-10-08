import React from "react";
import { filterStates, IJobFilter, sortStates } from "../pages";
interface IFilter {
  jobFilter: IJobFilter;
  setJobFilter: React.Dispatch<React.SetStateAction<IJobFilter>>;
}

const Filter = ({ setJobFilter, jobFilter }: IFilter) => {
  const handleSortChange = (sortKey: string) => {
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
      <div className="flex w-full justify-between items-end px-2 ">
        <select
          className="select select-success max-w-xs bg-white dark:bg-[#222222] dark:text-[#bfbfbf] lg:text-xl"
          onChange={(e) => handleJobTypeChange(e.target.value)}
        >
          <option className="lg:text-xl py-3">👶 Internship</option>
          <option className="lg:text-xl py-3">💼 Graduate</option>
          <option selected className="lg:text-xl py-3">
            😎 Intern and Grad
          </option>
        </select>
        <select
          className="select select-success max-w-xs bg-white dark:bg-[#222222] dark:text-[#bfbfbf] lg:text-xl"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option disabled selected className="lg:text-xl py-3">
            ❓ Sort by
          </option>
          <option className="lg:text-xl py-3">🕓 Newly Added</option>
          <option className="lg:text-xl py-3">💻 Company</option>
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
