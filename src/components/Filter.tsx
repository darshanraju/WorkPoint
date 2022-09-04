import React from "react";
import { filterStates } from "../pages";

interface IFilter {
  checked: filterStates;
  setChecked: React.Dispatch<React.SetStateAction<filterStates>>;
}

const Filter = ({ checked, setChecked }: IFilter) => {
  return (
    <div>
      <div className="text-center stat-value m-5">{"I'm looking for"}</div>
      <div className="btn-group m-5">
        <input
          type="radio"
          name="options"
          data-title="Grad role"
          className="btn "
          checked={checked === filterStates.grad}
          onClick={() => setChecked(filterStates.grad)}
        />
        <input
          type="radio"
          name="options"
          data-title="Internship"
          className="btn"
          checked={checked === filterStates.intern}
          onClick={() => setChecked(filterStates.intern)}
        />
        <input
          type="radio"
          name="options"
          data-title="BOTH"
          className="btn"
          checked={checked === filterStates.both}
          onClick={() => setChecked(filterStates.both)}
        />
      </div>
    </div>
  );
};

export default Filter;
