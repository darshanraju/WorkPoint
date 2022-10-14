import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { IJobTypeSelect } from "../utils/jobUtils";
import { IJobFilter } from "../pages";
import { filterTypes } from "./Filter";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

interface HomeFilterSelect extends IJobTypeSelect {
  setFilter: Dispatch<SetStateAction<IJobFilter>>;
  currentFilter: IJobFilter;
  filterKey: filterTypes;
  excludeOption: string;
  onChange?: (value: string) => void;
}

const HomeFilterSelect = ({
  selectOptions,
  defaultOption,
  setFilter,
  currentFilter,
  filterKey,
  excludeOption,
  onChange = () => null,
}: HomeFilterSelect) => {
  const [selected, setSelected] = useState(
    defaultOption ? defaultOption : selectOptions[0]!
  );
  const handleChange = (newValue: { id: number; name: string }) => {
    setSelected(newValue);
    const newFilter: any = { ...currentFilter };
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // newFilter[filterKey] = newValue.name as filterTypes;
    // console.log("New filter: ", newFilter);
    // setFilter(newFilter);
    onChange(newValue.name);
  };

  return (
    <div className="cursor-pointer dark:text-white px-1 md:px-2">
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <>
            <div className="cursor-pointer relative w-max">
              <Listbox.Button className="cursor-pointer dark:bg-[#212e4b] relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm  p-5 ">
                <span className="cursor-pointer">
                  {/* <span className="block truncate cursor-pointer"> */}
                  <div className="flex items-center text-xs md:text-base">
                    {selected.image && (
                      <img src={selected.image} className="w-6 mr-1" alt="" />
                    )}
                    <div>{selected.name}</div>
                  </div>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
                  <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="cursor-pointer dark:bg-[#212e4b] fixed md:absolute z-10 mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-max">
                  {selectOptions.map((option) => {
                    if (option.name.includes(excludeOption)) return;
                    return (
                      <Listbox.Option
                        key={option.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-black dark:text-white dark:bg-indigo-600 bg-indigo-400"
                              : "dark:text-[#bfbfbf] bg-white",
                            "text-xs md:text-base	relative cursor-default select-none py-2 pl-3 pr-9 dark:bg-[#212e4b] cursor-pointer  p-5 "
                          )
                        }
                        value={option}
                      >
                        {({ selected, active }) => (
                          <div className="cursor-pointer">
                            <span
                              className={classNames(
                                selected ? "font-bold" : "font-semibold"
                              )}
                            >
                              <div className="flex items-center">
                                {option.image && (
                                  <img
                                    src={option.image}
                                    className="sm:h-3 sm:h-3 h-6 w-6 flex-shrink-0 mr-1"
                                    alt=""
                                  />
                                )}
                                {option.name}
                              </div>
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </div>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default HomeFilterSelect;
