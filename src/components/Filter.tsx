import Image from "next/image";
import React from "react";
import { filterStates, IJobFilter, sortStates } from "../pages";
import { IOption } from "../utils/jobUtils";
import HomeFilterSelect from "./HomeFilterSelect";
import HorizontalScroll from "react-scroll-horizontal";
import FilterSelect from "./DefaultSelect";
import Select from "./Select";
interface IFilter {
  jobFilter: IJobFilter;
  setJobFilter: React.Dispatch<React.SetStateAction<IJobFilter>>;
  countriesWithJobs: Array<IOption>;
}

export enum filterTypes {
  JobType = "JobType",
  sortState = "sortState",
  country = "country",
}

const Filter = ({ setJobFilter, jobFilter, countriesWithJobs }: IFilter) => {
  const handleSortChange = (sortKey: string) => {
    if (sortKey.includes("Newly Added")) {
      setJobFilter({ ...jobFilter, sortState: sortStates.latest });
    } else if (sortKey.includes("Company")) {
      setJobFilter({ ...jobFilter, sortState: sortStates.company });
    }
  };

  const handleJobTypeChange = (jobType: string) => {
    console.log("Inside JobTypeChange: ", jobType);
    if (jobType.includes("Internship")) {
      setJobFilter({ ...jobFilter, JobType: filterStates.intern });
    } else if (jobType.includes("Graduate")) {
      setJobFilter({ ...jobFilter, JobType: filterStates.grad });
    } else if (jobType.includes("Intern and Grad")) {
      setJobFilter({ ...jobFilter, JobType: filterStates.both });
    }
  };

  const jobType: Array<IOption> = [
    {
      id: 0,
      name: "👶 Internship",
    },
    {
      id: 1,
      name: "💼 Graduate",
    },
    {
      id: 2,
      name: "😎 Intern and Grad",
    },
  ];

  const sortState: Array<IOption> = [
    {
      id: 0,
      name: "❓ Sort By",
    },
    {
      id: 1,
      name: "🕓 Newly Added",
    },
    {
      id: 2,
      name: "💻 Company",
    },
  ];

  return (
    <div className="w-full h-fit">
      {/* <div className="flex flex-row w-full items-center md:justify-end sm:px-0 md:px-2 overflow-x-scroll md:overflow-visible">
        <HomeFilterSelect
          selectOptions={jobType}
          defaultOption={jobType[0]}
          currentFilter={jobFilter}
          setFilter={setJobFilter}
          excludeOption="none"
          filterKey={filterTypes.JobType}
          onChange={handleJobTypeChange}
        />
        <HomeFilterSelect
          selectOptions={countriesWithJobs}
          defaultOption={countriesWithJobs[0]}
          currentFilter={jobFilter}
          setFilter={setJobFilter}
          excludeOption="Location"
          filterKey={filterTypes.country}
        />
        <HomeFilterSelect
          selectOptions={sortState}
          defaultOption={sortState[0]}
          currentFilter={jobFilter}
          setFilter={setJobFilter}
          excludeOption="xxx"
          filterKey={filterTypes.sortState}
          onChange={handleSortChange}
        />
      </div> */}

      <div className="w-full h-fit">
        <div className="flex justify-around md:justify-end overflow-x-scroll md:overflow-x-hidden pb-[12px]">
          <FilterSelect
            selectOptions={jobType}
            defaultOption={jobType[2]}
            currentFilter={jobFilter}
            setFilter={setJobFilter}
            excludeOption="none"
            filterKey={filterTypes.JobType}
            onChange={handleJobTypeChange}
          />
          <FilterSelect
            selectOptions={countriesWithJobs}
            defaultOption={countriesWithJobs[0]}
            currentFilter={jobFilter}
            setFilter={setJobFilter}
            excludeOption="Location"
            filterKey={filterTypes.country}
          />
          <FilterSelect
            selectOptions={sortState}
            defaultOption={sortState[2]}
            currentFilter={jobFilter}
            setFilter={setJobFilter}
            excludeOption="Sort By"
            filterKey={filterTypes.sortState}
            onChange={handleSortChange}
          />
          {/* <FilterSelect />
          <FilterSelect />
          <FilterSelect />
          <FilterSelect />
          <FilterSelect /> */}
        </div>
        {/* <div className="flex md:justify-end ">
          <Select />
          <Select />
          <Select />
          <Select />
        </div> */}
      </div>
    </div>
  );
};

interface ISelectOption {
  image: string;
  name: string;
}

const SelectOption = ({ image, name }: ISelectOption) => {
  console.log("Image: ", image);
  return (
    <div className="flex">
      <Image src={image} height="20px" width="20px" alt="country" />{" "}
      <option className="lg:text-xl py-3">{name} </option>
    </div>
  );
};

export default Filter;
