/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-types */
import { Dispatch, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { IJobForm } from "./AddJobForm";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

interface IOption {
  id: number;
  name: string;
  image?: string;
}

interface IJobTypeSelect {
  updateData: Dispatch<IJobForm>;
  currentData: any;
  selectOptions: Array<IOption>;
  formKey: string;
  isFlag?: boolean;
}

const JobTypeSelect = ({
  updateData,
  currentData,
  selectOptions,
  formKey,
  isFlag = false,
}: IJobTypeSelect) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [selected, setSelected] = useState(selectOptions[0]!);
  const handleChange = (newValue: { id: number; name: string }) => {
    setSelected(newValue);
    const newData = { ...currentData };
    newData[formKey]! = newValue.name;
    updateData(newData);
  };

  return (
    <div className="sm:col-span-6 lg:col-span-2">
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button className="dark:bg-[#212e4b] relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <span className="block truncate">
                  <div className="flex">
                    {selected.image && (
                      <img
                        src={selected.image}
                        className="h-6 w-6 flex-shrink-0 mr-1"
                        alt=""
                      />
                    )}
                    <div>{selected.name}</div>
                  </div>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
                <Listbox.Options className="dark:bg-[#212e4b] absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {selectOptions.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "text-white dark:bg-indigo-600"
                            : "dark:text-[#bfbfbf] bg-white",
                          "relative cursor-default select-none py-2 pl-3 pr-9 dark:bg-[#212e4b] "
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-bold" : "font-semibold",
                              "block truncate"
                            )}
                          >
                            <div className="flex">
                              {option.image && (
                                <img
                                  src={option.image}
                                  className="h-6 w-6 flex-shrink-0 mr-1"
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
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default JobTypeSelect;
