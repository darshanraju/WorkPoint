/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

import { Dispatch, SetStateAction, useState } from "react";
import JobAdd from "./JobAdd";
import JobTypeSelect from "./JobTypeSelect";
import TextEditor from "./TextEditor";

const Benefits = [
  "👀 Vision Insurance",
  "🦷 Dental Insurance",
  "🚑 Medical Insurance",
  "🥳 Unlimited Vacation",
  "📆 4 day workweek",
  "⛷️ Company Retreats",
  "💰 Coworking budget",
  "👨‍🏫 Learning budget",
  "💪 Free Gym Membership",
  "🙂 Mental Wellness Budget",
  "🏠 Home Office Budget",
  "💸 Equity Compensation",
];

const jobTypes = [
  { id: 0, name: "🖥️ Software Engineer" },
  { id: 1, name: "🖌️ Frontend Engineer" },
  { id: 2, name: "🤓 Backend Engineer" },
  { id: 3, name: "👩‍💻 Fullstack Engineer" },
  { id: 4, name: "🔬 Data Scientist" },
  { id: 5, name: "👷 Devops" },
  { id: 6, name: "🎨 UX" },
];

const jobLevels = [
  { id: 0, name: "👶 Internship" },
  { id: 1, name: "💼 Graduate" },
];

export interface IJobForm {
  jobTitle?: string;
  company?: string;
  jobLocation?: string;
  primaryJobTag?: string;
  jobLink?: string;
  jobDescription?: string;
  benefits: Array<string>;
  companyEmailInvoice?: string;
  companyAddressInvoice?: string;
  companyCityInvoice?: string;
  companyCountryInvoice?: string;
}

const AddJobForm = () => {
  const darkClasses =
    "flex flex-col border-t-2 md:border-2 border-gray-200 lg:rounded-lg lg:shadow-lg hover:bg-slate-100 transition ease-in-out delay-100 dark:border-[#28395c] dark:bg-[#192339] dark:text-[#bfbfbf]";
  const defaultClass = "bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6 ";
  const classNameMerged = `${darkClasses} ${defaultClass}`;
  const [file, setFile] = useState<string>();
  const [data, setData] = useState<IJobForm>({
    benefits: [],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    primaryJobTag: jobTypes[0]!.name,
  });
  const handleChange = (e: any) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const updateData = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div>
      <form className="space-y-6" action="#" onSubmit={handleSubmit}>
        <div className={classNameMerged}>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="font-bold lg:text-xl leading-6 text-gray-900 dark:text-white">
                About the Job
              </h3>
              <p className="mt-1 font-medium text-sm lg:text-lg">
                This information will be displayed publicly on the job post.
              </p>
            </div>
            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3 sm:col-span-6 lg:col-span-3">
                  <label htmlFor="jobTitle" className="block text-sm font-bold">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-[#212e4b]"
                    onChange={updateData}
                  />
                </div>

                <div className="col-span-3 sm:col-span-6 lg:col-span-3">
                  <label htmlFor="company" className="block text-sm font-bold">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-[#212e4b]"
                    onChange={updateData}
                  />
                </div>

                <div className="col-span-3 sm:col-span-6 lg:col-span-3">
                  <label
                    htmlFor="primaryJobTag"
                    className="block text-sm font-bold"
                  >
                    Primary Job Tag
                  </label>
                  <JobTypeSelect
                    currentData={data}
                    updateData={setData}
                    selectOptions={jobTypes}
                    formKey="primaryJobTag"
                  />
                </div>

                <div className="col-span-3 sm:col-span-6 lg:col-span-3">
                  <label htmlFor="jobLevel" className="block text-sm font-bold">
                    Job Level
                  </label>
                  <JobTypeSelect
                    currentData={data}
                    updateData={setData}
                    selectOptions={jobLevels}
                    formKey="jobLevel"
                  />
                </div>

                <div className="col-span-3 sm:col-span-6 lg:col-span-3">
                  <label
                    htmlFor="jobLocation"
                    className="block text-sm font-bold"
                  >
                    Job Location
                  </label>
                  <input
                    type="text"
                    name="jobLocation"
                    id="jobLocation"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-[#212e4b]"
                    onChange={updateData}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-3">
                  <label htmlFor="jobLink" className="block text-md font-bold">
                    Job Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm  dark:bg-[#212e4b] ">
                      http://
                    </span>
                    <input
                      type="text"
                      name="jobLink"
                      id="jobLink"
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-[#212e4b]"
                      placeholder="www.example.com"
                      onChange={updateData}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                <label
                  htmlFor="jobDescription"
                  className="block text-sm font-bold"
                >
                  Job Description
                </label>
                <TextEditor currentData={data} updateData={setData} />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="benefits" className="block text-sm font-bold">
                  Benefits
                </label>
                {Benefits.map((benefit) => (
                  <Badge
                    text={benefit}
                    key={benefit}
                    updateData={setData}
                    currentData={data}
                  />
                ))}
              </div>
              <div>
                <label className="block text-sm font-bold">Company Logo</label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm">
                      <label
                        htmlFor="fileUpload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 bg-transparent"
                      >
                        <div className="badge badge-accent">Upload a file</div>
                        <input
                          id="fileUpload"
                          name="fileUpload"
                          type="file"
                          className="sr-only"
                          onChange={handleChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs">PNG, JPG 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <JobAdd
          company={data.company}
          jobTitle={data.jobTitle}
          link={data.jobLink}
          location={data.jobLocation}
          posted={Date.now()}
          logo={file}
          type="grad"
          jobDesc={data.jobDescription}
          key="toPost"
          tags={data.benefits}
        />

        <div className={classNameMerged}>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="font-bold lg:text-xl leading-6 text-gray-900 dark:text-white">
                Company
              </h3>
              <p className="mt-1 font-medium text-sm lg:text-lg">
                This will not be posted, but used for sending you a job post
                invoice.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="companyEmailInvoice"
                    className="block text-sm text-md font-bold"
                  >
                    Company Email
                  </label>
                  <input
                    type="email"
                    name="companyEmailInvoice"
                    id="companyEmailInvoice"
                    autoComplete="email"
                    className="dark:bg-[#212e4b] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={updateData}
                  />
                  <p>Make sure this email is accessible to you.</p>
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="companyAddressInvoice"
                    className="block text-md font-bold"
                  >
                    Company Address
                  </label>
                  <input
                    type="text"
                    name="companyAddressInvoice"
                    id="companyAddressInvoice"
                    autoComplete="street-address"
                    className="dark:bg-[#212e4b] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={updateData}
                  />
                </div>
                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    htmlFor="companyCityInvoice"
                    className="block text-md font-bold"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="companyCityInvoice"
                    id="companyCityInvoice"
                    autoComplete="address-level2"
                    className="dark:bg-[#212e4b] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={updateData}
                  />
                </div>
                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    htmlFor="companyCountryInvoice"
                    className="block text-md font-bold"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="companyCountryInvoice"
                    id="companyCountryInvoice"
                    autoComplete="address-level2"
                    className="dark:bg-[#212e4b] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={updateData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

const Badge = ({
  text,
  updateData,
  currentData,
}: {
  text: string;
  updateData: Dispatch<SetStateAction<IJobForm>>;
  currentData: IJobForm;
}) => {
  const [selected, setSelected] = useState(false);
  const handleChange = () => {
    const newData = { ...currentData };
    if (!selected) {
      newData.benefits.push(text);
      updateData(newData);
    } else {
      const newBenefits = newData.benefits.filter((badge) => badge !== text);
      newData.benefits = newBenefits;
      updateData(newData);
    }
    setSelected(!selected);
  };
  const classNameContainer = selected
    ? "p-4 m-1 badge badge-accent hover:badge-accent cursor-pointer"
    : "p-4 m-1 badge badge-accent badge-outline hover:badge-accent cursor-pointer";
  return (
    <div className={classNameContainer} onClick={handleChange}>
      <div className="hover:text-black font-bold">{text}</div>
    </div>
  );
};

export default AddJobForm;
