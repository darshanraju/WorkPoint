import { Dispatch, SetStateAction } from "react";
import { IJobFilter } from "../pages";
import { IJobTypeSelect } from "../utils/jobUtils";
import { filterTypes } from "./Filter";

interface HomeFilterSelect extends IJobTypeSelect {
  setFilter: Dispatch<SetStateAction<IJobFilter>>;
  currentFilter: IJobFilter;
  filterKey: filterTypes;
  excludeOption: string;
  onChange?: (value: string) => void;
}

export default function Example({
  selectOptions,
  defaultOption,
  setFilter,
  currentFilter,
  filterKey,
  excludeOption,
  onChange = () => null,
}: HomeFilterSelect) {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <div className="px-1 md:px-2">
      <select
        onChange={handleChange}
        defaultValue={defaultOption?.name}
        id="countries"
        className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 md:p-2.5  dark:bg-[#212e4b] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-4"
      >
        {selectOptions.map((option, idx) => {
          if (option.name.includes(excludeOption)) return;

          return (
            <option
              value={option.name}
              key={idx}
              className="text-xs md:text-lg"
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
