/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { filterStates } from "../pages";
import {
  Benefits,
  countriesWithFlags,
  jobLevels,
  jobPostDuration,
  jobTypes,
  jobTypeValues,
} from "../utils/jobUtils";
import { trpc } from "../utils/trpc";
import JobAdd from "./JobAdd";
import JobTypeSelect from "./JobTypeSelect";
import Modal from "./Modal";
import TextEditor from "./TextEditor";

export interface IJobForm {
  jobTitle: string;
  company: string;
  primaryJobTag: jobTypeValues;
  jobLevel: string;
  jobCity: string;
  jobCountry: string;
  jobLink: string;
  companyLogo: string;

  jobDescription: string;
  jobPostDuration: string;
  benefits: Array<string>;
  companyEmailInvoice: string;
  companyAddressInvoice: string;
  companyCityInvoice: string;
  companyCountryInvoice: string;
  feedback: string;
}

const AddJobForm = () => {
  const jobCountries = countriesWithFlags();

  const darkClasses =
    "flex flex-col border-t-2 md:border-2 border-gray-200 lg:rounded-lg lg:shadow-lg hover:bg-slate-100 transition ease-in-out delay-100 dark:border-[#28395c] dark:bg-[#192339] dark:text-[#bfbfbf]";
  const defaultClass = "bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6 ";
  const classNameMerged = `${darkClasses} ${defaultClass}`;
  const [file, setFile] = useState<string>();
  const [fileV2, setFileV2] = useState<File>();
  const [postedJob, setPostedJob] = useState<boolean>(false);
  const defaultJobForm = {
    benefits: [],
    primaryJobTag: jobTypes[0]!.name,
    jobLevel: jobLevels[0]!.name,
    jobCountry: jobCountries[13]!.name,
    jobPostDuration: jobPostDuration[2].name,
    company: "",
    companyAddressInvoice: "",
    companyCityInvoice: "",
    companyCountryInvoice: jobCountries[13]?.name,
    companyEmailInvoice: "",
    companyLogo: "",
    feedback: "",
    jobCity: "",
    jobDescription: "",
    jobLink: "",
    jobTitle: "",
  };
  const [data, setData] = useState<IJobForm>(defaultJobForm);

  const handleChange = (e: any) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFileV2(e.currentTarget.files[0]);
  };

  const updateData = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const postJob = trpc.useMutation("postJob");
  const generateDirectUploadUrl = trpc.useMutation("generateDirectUploadUrl");

  const uploadCompanyLogo = async (directUpload: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(directUpload, {
      method: "POST",
      body: formData,
    });
    const respJson = await response.json();
    return respJson.result.id;
  };

  const [disableSubmit, setDisableSubmit] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileV2) return;
    setDisableSubmit(true);
    const { uploadUrl } = await generateDirectUploadUrl.mutateAsync();
    console.log("UploadURL: " + uploadUrl);
    const imageId = await uploadCompanyLogo(uploadUrl, fileV2);
    console.log("ImageID: " + imageId);
    const imageUrl = `https://imagedelivery.net/XmlBAUGCN5tyuiiZB4aVVw/${imageId}/public`;
    const formDataWithImageId = { ...data, companyLogo: imageUrl };
    formDataWithImageId.jobLink =
      formDataWithImageId.jobLink.startsWith("http://") ||
      formDataWithImageId.jobLink.startsWith("https://")
        ? formDataWithImageId.jobLink
        : `https://${formDataWithImageId.jobLink}`;
    await postJob.mutateAsync(formDataWithImageId);
    setDisableSubmit(false);
  };

  useEffect(() => {
    if (postJob.isSuccess) {
      setPostedJob(true);
      setData(defaultJobForm);
      postJob.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postJob]);

  return (
    <div className="flex">
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
                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label htmlFor="jobTitle" className="block text-sm font-bold">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-[#212e4b]"
                    onChange={updateData}
                    required
                    value={data.jobTitle}
                  />
                </div>

                <div className="col-span-6 lg:col-span-3">
                  <label htmlFor="company" className="block text-sm font-bold">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-[#212e4b]"
                    onChange={updateData}
                    required
                    value={data.company}
                  />
                </div>

                <div className="col-span-6 lg:col-span-3">
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
                    defaultOption={jobTypes[0]}
                  />
                </div>

                <div className="col-span-6 lg:col-span-3">
                  <label htmlFor="jobLevel" className="block text-sm font-bold">
                    Job Level
                  </label>
                  <JobTypeSelect
                    currentData={data}
                    updateData={setData}
                    selectOptions={jobLevels}
                    formKey="jobLevel"
                    defaultOption={jobLevels[0]}
                  />
                </div>

                <div className="col-span-6 lg:col-span-3">
                  <label htmlFor="jobCity" className="block text-sm font-bold">
                    Job City
                  </label>
                  <input
                    type="text"
                    name="jobCity"
                    id="jobCity"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-[#212e4b]"
                    onChange={updateData}
                    required
                    value={data.jobCity}
                  />
                </div>

                <div className="col-span-6 lg:col-span-3">
                  <label
                    htmlFor="jobCountry"
                    className="block text-sm font-bold"
                  >
                    Job Country
                  </label>
                  <JobTypeSelect
                    currentData={data}
                    updateData={setData}
                    selectOptions={jobCountries}
                    formKey="jobCountry"
                    defaultOption={jobCountries[13]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-3">
                  <label htmlFor="jobLink" className="block text-md font-bold">
                    Apply Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm  dark:bg-[#212e4b] ">
                      https://
                    </span>
                    <input
                      type="text"
                      name="jobLink"
                      id="jobLink"
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-[#212e4b]"
                      placeholder="www.example.com"
                      onChange={updateData}
                      required
                      value={data.jobLink}
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

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-bold">
                    Company Logo
                  </label>
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
                          <div className="badge badge-accent bg-green-300">
                            Upload a file
                          </div>
                          <input
                            id="fileUpload"
                            name="fileUpload"
                            type="file"
                            className="sr-only"
                            onChange={handleChange}
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs">PNG, JPG 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <div>
                    <label className="block text-sm font-bold">
                      Job Post Duration
                    </label>
                    <JobTypeSelect
                      currentData={data}
                      updateData={setData}
                      selectOptions={jobPostDuration}
                      formKey="jobPostDuration"
                      defaultOption={jobPostDuration[2]}
                    />
                    <p>It's currently free to post a job 😃</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <JobAdd
          company={data.company}
          jobTitle={data.jobTitle}
          link={
            data.jobLink.startsWith("http://") ||
            data.jobLink.startsWith("https://")
              ? data.jobLink
              : `https://${data.jobLink}`
          }
          location={data.jobCountry}
          posted={Date.now()}
          logo={file}
          type={
            data.jobLevel.includes("Internship")
              ? filterStates.intern
              : filterStates.grad
          }
          jobDesc={data.jobDescription}
          key="toPost"
          tags={data.benefits}
          posting={true}
          primaryJobTag={data.primaryJobTag}
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
                    required
                    value={data.companyEmailInvoice}
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
                    required
                    value={data.companyAddressInvoice}
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
                    required
                    value={data.companyCityInvoice}
                  />
                </div>
                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    htmlFor="companyCountryInvoice"
                    className="block text-md font-bold"
                  >
                    Country
                  </label>
                  <JobTypeSelect
                    currentData={data}
                    updateData={setData}
                    selectOptions={jobCountries}
                    formKey="companyCountryInvoice"
                    defaultOption={jobCountries[13]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classNameMerged}>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="font-bold lg:text-xl leading-6 text-gray-900 dark:text-white">
                Feedback
              </h3>
              <p className="mt-1 font-medium text-sm lg:text-lg">
                Let us know how we improve your job posting experience even
                more.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <textarea
                    rows={4}
                    name="feedback"
                    id="feedback"
                    className="dark:bg-[#212e4b] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={""}
                    value={data.feedback}
                    onChange={updateData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <button
            type="submit"
            className="btn md:btn-lg bg-indigo-600 #my-modal-2"
            disabled={disableSubmit}
          >
            Post for {data.jobPostDuration}
          </button>
          {/* {postedJob && (
            <div className="modal" id="my-modal-2">
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Congratulations random Internet user!
                </h3>
                <p className="py-4">
                  You've been selected for a chance to get one year of
                  subscription to use Wikipedia for free!
                </p>
                <div className="modal-action">
                  <a href="#" className="btn">
                    Yay!
                  </a>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </form>
      {postedJob && (
        <Modal
          button1Text="Go to Job Board"
          button2Text="Post Another Job!"
          header="Thanks for Posting!"
          setShowModal={setPostedJob}
          showModal={postedJob}
          subText="We'll verify the job post soon and let you know once it's posted!"
        />
      )}
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
    ? "p-4 m-1 badge badge-xs md:badge-md badge-accent hover:badge-accent cursor-pointer"
    : "p-4 m-1 badge badge-xs md:badge-md badge-accent badge-outline hover:badge-accent cursor-pointer";
  return (
    <div className={classNameContainer} onClick={handleChange}>
      <div className="hover:text-black font-bold">{text}</div>
    </div>
  );
};

export default AddJobForm;
