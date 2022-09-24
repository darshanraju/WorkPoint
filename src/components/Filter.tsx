import React from "react";
import { filterStates } from "../pages";

interface IFilter {
  checked: filterStates;
  setChecked: React.Dispatch<React.SetStateAction<filterStates>>;
}

const Filter = ({ checked, setChecked }: IFilter) => {
  const classMaker = (btn: filterStates) => {
    if (checked === btn) {
      return "btn btn-sm lg:btn px-3 btn-active";
    }
    return "btn btn-sm lg:btn px-3";
  };

  const classMakerV2 = (btn: filterStates) => {
    if (checked === btn) {
      return "block w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded sm:w-auto active:text-opacity-75 hover:bg-transparent hover:text-white focus:outline-none focus:ring bg-blue-600 cursor-pointer";
    }
    return "block w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded sm:w-auto hover:bg-blue-600 active:bg-blue-500 focus:outline-none focus:ring cursor-pointer";
  };
  return (
    <div>
      <div className="text-center stat-value m-5 text-white">
        {"I'm looking for..."}
      </div>

      <div className="flex flex-wrap justify-center mt-8 gap-4">
        <a
          className={classMakerV2(filterStates.intern)}
          onClick={() => setChecked(filterStates.intern)}
        >
          An Internship
        </a>

        <a
          className={classMakerV2(filterStates.grad)}
          onClick={() => setChecked(filterStates.grad)}
        >
          A Grad Role
        </a>

        <a
          className={classMakerV2(filterStates.both)}
          onClick={() => setChecked(filterStates.both)}
        >
          BOTH!
        </a>
      </div>
    </div>
  );
};

export default Filter;
