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
  return (
    <div>
      <div className="text-center stat-value m-5">{"I'm looking for"}</div>
      <div className="btn-group m-5 w-full">
        <button
          onClick={() => setChecked(filterStates.grad)}
          className={classMaker(filterStates.grad)}
        >
          a Grad role
        </button>
        <button
          onClick={() => setChecked(filterStates.intern)}
          className={classMaker(filterStates.intern)}
        >
          an Internship
        </button>
        <button
          onClick={() => setChecked(filterStates.both)}
          className={classMaker(filterStates.both)}
        >
          BOTH!
        </button>
        {/* <input
          type="radio"
          name="options"
          data-title="a Grad role"
          // className="btn btn-xs md:btn-sm xl:btn px-3"
          className="btn btn-sm xl:btn px-3"
          checked={checked === filterStates.grad}
          onClick={() => setChecked(filterStates.grad)}
        />
        <input
          type="radio"
          name="options"
          data-title="an Internship"
          // className="btn btn-xs md:btn-sm xl:btn px-3"
          className="btn btn-sm xl:btn px-3"
          checked={checked === filterStates.intern}
          onClick={() => setChecked(filterStates.intern)}
        />
        <input
          type="radio"
          name="options"
          data-title="BOTH!"
          // className="btn btn-xs md:btn-sm xl:btn px-3"
          className=" btn-sm lg:btn px-3"
          checked={checked === filterStates.both}
          onClick={() => setChecked(filterStates.both)}
        /> */}
      </div>
    </div>
  );
};

export default Filter;
