/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import JobAdd, { JobTypes } from "./JobAdd";
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

export enum jobTypeValues {
  softwareEngineer = "🖥️ Software Engineer",
  frontendEngineer = "🖌️ Frontend Engineer",
  backendEngineer = "🤓 Backend Engineer",
  fullstackEngineer = "👩‍💻 Fullstack Engineer",
  dataScientist = "🔬 Data Scientist",
  devops = "👷 Devops",
  consulting = "🕴 Consulting",
  ux = "🎨 UX",
}

const jobTypes = [
  { id: 0, name: jobTypeValues.softwareEngineer },
  { id: 1, name: jobTypeValues.frontendEngineer },
  { id: 2, name: jobTypeValues.backendEngineer },
  { id: 3, name: jobTypeValues.fullstackEngineer },
  { id: 4, name: jobTypeValues.dataScientist },
  { id: 5, name: jobTypeValues.devops },
  { id: 6, name: jobTypeValues.consulting },
  { id: 7, name: jobTypeValues.ux },
];

const jobLevels: Array<any> = [
  { id: "intern", name: "👶 Internship" },
  { id: "grad", name: "💼 Graduate" },
];

const jobCountries: Array<any> = [
  { name: "Afghanistan", id: "AF" },
  { name: "Åland Islands", id: "AX" },
  { name: "Albania", id: "AL" },
  { name: "Algeria", id: "DZ" },
  { name: "American Samoa", id: "AS" },
  { name: "Andorra", id: "AD" },
  { name: "Angola", id: "AO" },
  { name: "Anguilla", id: "AI" },
  { name: "Antarctica", id: "AQ" },
  { name: "Antigua and Barbuda", id: "AG" },
  { name: "Argentina", id: "AR" },
  { name: "Armenia", id: "AM" },
  { name: "Aruba", id: "AW" },
  { name: "Australia", id: "AU" },
  { name: "Austria", id: "AT" },
  { name: "Azerbaijan", id: "AZ" },
  { name: "Bahamas", id: "BS" },
  { name: "Bahrain", id: "BH" },
  { name: "Bangladesh", id: "BD" },
  { name: "Barbados", id: "BB" },
  { name: "Belarus", id: "BY" },
  { name: "Belgium", id: "BE" },
  { name: "Belize", id: "BZ" },
  { name: "Benin", id: "BJ" },
  { name: "Bermuda", id: "BM" },
  { name: "Bhutan", id: "BT" },
  { name: "Bolivia", id: "BO" },
  { name: "Bosnia and Herzegovina", id: "BA" },
  { name: "Botswana", id: "BW" },
  { name: "Bouvet Island", id: "BV" },
  { name: "Brazil", id: "BR" },
  { name: "British Indian Ocean Territory", id: "IO" },
  { name: "Brunei Darussalam", id: "BN" },
  { name: "Bulgaria", id: "BG" },
  { name: "Burkina Faso", id: "BF" },
  { name: "Burundi", id: "BI" },
  { name: "Cambodia", id: "KH" },
  { name: "Cameroon", id: "CM" },
  { name: "Canada", id: "CA" },
  { name: "Cape Verde", id: "CV" },
  { name: "Cayman Islands", id: "KY" },
  { name: "Central African Republic", id: "CF" },
  { name: "Chad", id: "TD" },
  { name: "Chile", id: "CL" },
  { name: "China", id: "CN" },
  { name: "Christmas Island", id: "CX" },
  { name: "Cocos (Keeling) Islands", id: "CC" },
  { name: "Colombia", id: "CO" },
  { name: "Comoros", id: "KM" },
  { name: "Congo", id: "CG" },
  { name: "Congo, The Democratic Republic of the", id: "CD" },
  { name: "Cook Islands", id: "CK" },
  { name: "Costa Rica", id: "CR" },
  { name: "Cote D'Ivoire", id: "CI" },
  { name: "Croatia", id: "HR" },
  { name: "Cuba", id: "CU" },
  { name: "Cyprus", id: "CY" },
  { name: "Czech Republic", id: "CZ" },
  { name: "Denmark", id: "DK" },
  { name: "Djibouti", id: "DJ" },
  { name: "Dominica", id: "DM" },
  { name: "Dominican Republic", id: "DO" },
  { name: "Ecuador", id: "EC" },
  { name: "Egypt", id: "EG" },
  { name: "El Salvador", id: "SV" },
  { name: "Equatorial Guinea", id: "GQ" },
  { name: "Eritrea", id: "ER" },
  { name: "Estonia", id: "EE" },
  { name: "Ethiopia", id: "ET" },
  { name: "Falkland Islands (Malvinas)", id: "FK" },
  { name: "Faroe Islands", id: "FO" },
  { name: "Fiji", id: "FJ" },
  { name: "Finland", id: "FI" },
  { name: "France", id: "FR" },
  { name: "French Guiana", id: "GF" },
  { name: "French Polynesia", id: "PF" },
  { name: "French Southern Territories", id: "TF" },
  { name: "Gabon", id: "GA" },
  { name: "Gambia", id: "GM" },
  { name: "Georgia", id: "GE" },
  { name: "Germany", id: "DE" },
  { name: "Ghana", id: "GH" },
  { name: "Gibraltar", id: "GI" },
  { name: "Greece", id: "GR" },
  { name: "Greenland", id: "GL" },
  { name: "Grenada", id: "GD" },
  { name: "Guadeloupe", id: "GP" },
  { name: "Guam", id: "GU" },
  { name: "Guatemala", id: "GT" },
  { name: "Guernsey", id: "GG" },
  { name: "Guinea", id: "GN" },
  { name: "Guinea-Bissau", id: "GW" },
  { name: "Guyana", id: "GY" },
  { name: "Haiti", id: "HT" },
  { name: "Heard Island and Mcdonald Islands", id: "HM" },
  { name: "Holy See (Vatican City State)", id: "VA" },
  { name: "Honduras", id: "HN" },
  { name: "Hong Kong", id: "HK" },
  { name: "Hungary", id: "HU" },
  { name: "Iceland", id: "IS" },
  { name: "India", id: "IN" },
  { name: "Indonesia", id: "ID" },
  { name: "Iran, Islamic Republic Of", id: "IR" },
  { name: "Iraq", id: "IQ" },
  { name: "Ireland", id: "IE" },
  { name: "Isle of Man", id: "IM" },
  { name: "Israel", id: "IL" },
  { name: "Italy", id: "IT" },
  { name: "Jamaica", id: "JM" },
  { name: "Japan", id: "JP" },
  { name: "Jersey", id: "JE" },
  { name: "Jordan", id: "JO" },
  { name: "Kazakhstan", id: "KZ" },
  { name: "Kenya", id: "KE" },
  { name: "Kiribati", id: "KI" },
  { name: "Korea, Democratic People'S Republic of", id: "KP" },
  { name: "Korea, Republic of", id: "KR" },
  { name: "Kuwait", id: "KW" },
  { name: "Kyrgyzstan", id: "KG" },
  { name: "Lao People'S Democratic Republic", id: "LA" },
  { name: "Latvia", id: "LV" },
  { name: "Lebanon", id: "LB" },
  { name: "Lesotho", id: "LS" },
  { name: "Liberia", id: "LR" },
  { name: "Libyan Arab Jamahiriya", id: "LY" },
  { name: "Liechtenstein", id: "LI" },
  { name: "Lithuania", id: "LT" },
  { name: "Luxembourg", id: "LU" },
  { name: "Macao", id: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", id: "MK" },
  { name: "Madagascar", id: "MG" },
  { name: "Malawi", id: "MW" },
  { name: "Malaysia", id: "MY" },
  { name: "Maldives", id: "MV" },
  { name: "Mali", id: "ML" },
  { name: "Malta", id: "MT" },
  { name: "Marshall Islands", id: "MH" },
  { name: "Martinique", id: "MQ" },
  { name: "Mauritania", id: "MR" },
  { name: "Mauritius", id: "MU" },
  { name: "Mayotte", id: "YT" },
  { name: "Mexico", id: "MX" },
  { name: "Micronesia, Federated States of", id: "FM" },
  { name: "Moldova, Republic of", id: "MD" },
  { name: "Monaco", id: "MC" },
  { name: "Mongolia", id: "MN" },
  { name: "Montserrat", id: "MS" },
  { name: "Morocco", id: "MA" },
  { name: "Mozambique", id: "MZ" },
  { name: "Myanmar", id: "MM" },
  { name: "Namibia", id: "NA" },
  { name: "Nauru", id: "NR" },
  { name: "Nepal", id: "NP" },
  { name: "Netherlands", id: "NL" },
  { name: "Netherlands Antilles", id: "AN" },
  { name: "New Caledonia", id: "NC" },
  { name: "New Zealand", id: "NZ" },
  { name: "Nicaragua", id: "NI" },
  { name: "Niger", id: "NE" },
  { name: "Nigeria", id: "NG" },
  { name: "Niue", id: "NU" },
  { name: "Norfolk Island", id: "NF" },
  { name: "Northern Mariana Islands", id: "MP" },
  { name: "Norway", id: "NO" },
  { name: "Oman", id: "OM" },
  { name: "Pakistan", id: "PK" },
  { name: "Palau", id: "PW" },
  { name: "Palestinian Territory, Occupied", id: "PS" },
  { name: "Panama", id: "PA" },
  { name: "Papua New Guinea", id: "PG" },
  { name: "Paraguay", id: "PY" },
  { name: "Peru", id: "PE" },
  { name: "Philippines", id: "PH" },
  { name: "Pitcairn", id: "PN" },
  { name: "Poland", id: "PL" },
  { name: "Portugal", id: "PT" },
  { name: "Puerto Rico", id: "PR" },
  { name: "Qatar", id: "QA" },
  { name: "Reunion", id: "RE" },
  { name: "Romania", id: "RO" },
  { name: "Russian Federation", id: "RU" },
  { name: "RWANDA", id: "RW" },
  { name: "Saint Helena", id: "SH" },
  { name: "Saint Kitts and Nevis", id: "KN" },
  { name: "Saint Lucia", id: "LC" },
  { name: "Saint Pierre and Miquelon", id: "PM" },
  { name: "Saint Vincent and the Grenadines", id: "VC" },
  { name: "Samoa", id: "WS" },
  { name: "San Marino", id: "SM" },
  { name: "Sao Tome and Principe", id: "ST" },
  { name: "Saudi Arabia", id: "SA" },
  { name: "Senegal", id: "SN" },
  { name: "Serbia and Montenegro", id: "CS" },
  { name: "Seychelles", id: "SC" },
  { name: "Sierra Leone", id: "SL" },
  { name: "Singapore", id: "SG" },
  { name: "Slovakia", id: "SK" },
  { name: "Slovenia", id: "SI" },
  { name: "Solomon Islands", id: "SB" },
  { name: "Somalia", id: "SO" },
  { name: "South Africa", id: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", id: "GS" },
  { name: "Spain", id: "ES" },
  { name: "Sri Lanka", id: "LK" },
  { name: "Sudan", id: "SD" },
  { name: "Suriname", id: "SR" },
  { name: "Svalbard and Jan Mayen", id: "SJ" },
  { name: "Swaziland", id: "SZ" },
  { name: "Sweden", id: "SE" },
  { name: "Switzerland", id: "CH" },
  { name: "Syrian Arab Republic", id: "SY" },
  { name: "Taiwan, Province of China", id: "TW" },
  { name: "Tajikistan", id: "TJ" },
  { name: "Tanzania, United Republic of", id: "TZ" },
  { name: "Thailand", id: "TH" },
  { name: "Timor-Leste", id: "TL" },
  { name: "Togo", id: "TG" },
  { name: "Tokelau", id: "TK" },
  { name: "Tonga", id: "TO" },
  { name: "Trinidad and Tobago", id: "TT" },
  { name: "Tunisia", id: "TN" },
  { name: "Turkey", id: "TR" },
  { name: "Turkmenistan", id: "TM" },
  { name: "Turks and Caicos Islands", id: "TC" },
  { name: "Tuvalu", id: "TV" },
  { name: "Uganda", id: "UG" },
  { name: "Ukraine", id: "UA" },
  { name: "United Arab Emirates", id: "AE" },
  { name: "United Kingdom", id: "GB" },
  {
    name: "United States",
    id: "US",
    synonym: ["USA", "United States of America"],
  },
  { name: "United States Minor Outlying Islands", id: "UM" },
  { name: "Uruguay", id: "UY" },
  { name: "Uzbekistan", id: "UZ" },
  { name: "Vanuatu", id: "VU" },
  { name: "Venezuela", id: "VE" },
  { name: "Viet Nam", id: "VN" },
  { name: "Virgin Islands, British", id: "VG" },
  { name: "Virgin Islands, U.S.", id: "VI" },
  { name: "Wallis and Futuna", id: "WF" },
  { name: "Western Sahara", id: "EH" },
  { name: "Yemen", id: "YE" },
  { name: "Zambia", id: "ZM" },
  { name: "Zimbabwe", id: "ZW" },
];

export interface IJobForm {
  jobTitle?: string;
  company?: string;
  primaryJobTag: jobTypeValues;
  jobLevel: string;
  jobCity?: string;
  jobCountry: string;
  jobLink?: string;
  jobDescription?: string;
  benefits: Array<string>;
  companyEmailInvoice?: string;
  companyAddressInvoice?: string;
  companyCityInvoice?: string;
  companyCountryInvoice?: string;
}

const AddJobForm = () => {
  for (let i = 0; i < jobCountries.length; i++) {
    jobCountries[i]["image"] =
      "https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.10/svg/" +
      jobCountries[i].id.toLowerCase() +
      ".svg";
  }

  const darkClasses =
    "flex flex-col border-t-2 md:border-2 border-gray-200 lg:rounded-lg lg:shadow-lg hover:bg-slate-100 transition ease-in-out delay-100 dark:border-[#28395c] dark:bg-[#192339] dark:text-[#bfbfbf]";
  const defaultClass = "bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6 ";
  const classNameMerged = `${darkClasses} ${defaultClass}`;
  const [file, setFile] = useState<string>();
  const [data, setData] = useState<IJobForm>({
    benefits: [],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    primaryJobTag: jobTypes[0]!.name,
    jobLevel: jobLevels[0]!.name,
    jobCountry: jobCountries[13]!.name,
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
                    placeholder="Sydney"
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
                        <div className="badge badge-accent bg-green-300">
                          Upload a file
                        </div>
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
          location={data.jobCountry}
          posted={Date.now()}
          logo={file}
          type={
            data.jobLevel.includes("Internship")
              ? JobTypes.intern
              : JobTypes.grad
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
                    name="Feedback"
                    id="Feedback"
                    className="dark:bg-[#212e4b] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={""}
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
