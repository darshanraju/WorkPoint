import type { NextPage } from "next";
import Head from "next/head";
import JobAdd, { IJobAdd } from "../components/JobAdd";
// import { trpc } from "../utils/trpc";
import companyLogo from "../../public/companies/Microsoft.png";
import EmailSubscription from "../components/EmailSubscription";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
// import Stats from "../components/Stats";
const jobs: Array<IJobAdd> = [
  {
    company: "Lyft",
    role: "Software Engineer Grad",
    tags: ["remote", "react", "saas"],
    logo: companyLogo,
    posted: 1659312000000,
    type: "grad",
    location: "Sydney - Australia",
    link: "https://boards.greenhouse.io/embed/job_app?token=6200801002&gh_src=uwvxb4jc2&s=LinkedIn&source=LinkedIn",
  },
  {
    company: "Uber",
    role: "Software Engineer Intern",
    tags: ["remote", "managing", "saas"],
    logo: companyLogo,
    posted: 1662078009000,
    type: "intern",
    location: "Melbourne - Australia",
    link: "https://boards.greenhouse.io/embed/job_app?token=6200801002&gh_src=uwvxb4jc2&s=LinkedIn&source=LinkedIn",
  },
  {
    company: "Tesla",
    role: "CEO Intern",
    tags: ["hybrid", "react", "saas"],
    logo: companyLogo,
    posted: 1662085209000,
    type: "intern",
    location: "Melbourne - Australia",
    link: "https://boards.greenhouse.io/embed/job_app?token=6200801002&gh_src=uwvxb4jc2&s=LinkedIn&source=LinkedIn",
  },
  {
    company: "Lyft",
    role: "Software Engineer Intern",
    tags: ["remote", "react", "saas"],
    logo: companyLogo,
    posted: 1659406809000,
    type: "intern",
    location: "Perth - Australia",
    link: "https://boards.greenhouse.io/embed/job_app?token=6200801002&gh_src=uwvxb4jc2&s=LinkedIn&source=LinkedIn",
  },
  {
    company: "Lyft",
    role: "Software Engineer Grad",
    tags: ["remote", "react", "saas"],
    logo: companyLogo,
    posted: 1660962009000,
    type: "grad",
    location: "Perth - Australia",
    link: "https://boards.greenhouse.io/embed/job_app?token=6200801002&gh_src=uwvxb4jc2&s=LinkedIn&source=LinkedIn",
  },
  {
    company: "Lyft",
    role: "Software Engineer Grad",
    tags: ["remote", "react", "saas"],
    logo: companyLogo,
    posted: 1661134809000,
    type: "grad",
    location: "Sydney - Australia",
    link: "https://boards.greenhouse.io/embed/job_app?token=6200801002&gh_src=uwvxb4jc2&s=LinkedIn&source=LinkedIn",
  },
  {
    company: "Uber",
    role: "Software Engineer Intern",
    tags: ["remote", "managing", "saas"],
    logo: companyLogo,
    posted: 1661480409000,
    type: "intern",
    location: "Remote - Australia",
    link: "https://boards.greenhouse.io/embed/job_app?token=6200801002&gh_src=uwvxb4jc2&s=LinkedIn&source=LinkedIn",
  },
  {
    company: "CSE Gigs",
    role: "Intern",
    tags: ["hybrid", "react", "saas"],
    logo: companyLogo,
    posted: 1661473209000,
    type: "intern",
    location: "Remote - Australia",
    link: "https://boards.greenhouse.io/embed/job_app?token=6200801002&gh_src=uwvxb4jc2&s=LinkedIn&source=LinkedIn",
  },
  {
    company: "Microsoft",
    role: "Software Engineer Intern",
    tags: ["remote", "react", "saas"],
    logo: companyLogo,
    posted: 1661127609000,
    type: "intern",
    location: "Remote - Australia",
    link: "https://boards.greenhouse.io/embed/job_app?token=6200801002&gh_src=uwvxb4jc2&s=LinkedIn&source=LinkedIn",
  },
  {
    company: "Lyft",
    role: "Software Engineer Intern",
    tags: ["remote", "react", "saas"],
    logo: companyLogo,
    posted: 1661138409000,
    type: "intern",
    location: "Remote - Australia",
    link: "https://boards.greenhouse.io/embed/job_app?token=6200801002&gh_src=uwvxb4jc2&s=LinkedIn&source=LinkedIn",
  },
];

export enum filterStates {
  grad = "grad",
  intern = "intern",
  both = "both",
}

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const [checked, setChecked] = useState(filterStates.both);
  const [filtedJobs, setFilteredJobs] = useState(jobs);
  useEffect(() => {
    if (checked === filterStates.both) {
      setFilteredJobs(jobs);
      return;
    }
    setFilteredJobs(jobs.filter((job) => job.type === checked));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <div className="bg-stone-100">
      <Head>
        <title>CSE Gigs</title>
        <meta name="description" content="Compsci/Seng Student Gigs" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700 select-none">
          CSE <span className="text-purple-300">Gigs</span>
        </h1>
        {/* <Stats /> */}
        <Filter checked={checked} setChecked={setChecked} />
        <div className="grid lg:gap-4 pt-6 pb-40 text-center md:grid-cols-1 w-full lg:w-3/4lg:mb-40">
          {filtedJobs.map((job, idx) => (
            <JobAdd
              company={job.company}
              role={job.role}
              tags={job.tags}
              logo={job.logo}
              posted={job.posted}
              type={job.type}
              location={job.location}
              link={job.link}
              key={idx}
            />
          ))}
        </div>
        <EmailSubscription />
      </main>
    </div>
  );
};

export default Home;
