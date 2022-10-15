/* eslint-disable @next/next/no-css-tags */
import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import JobAdd, { IJobAdd } from "../components/JobAdd";
import EmailSubscription from "../components/EmailSubscription";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
import jobsJson from "../../lib/jobs.json";
import Header from "../components/Header";
import Script from "next/script";
import { getBaseUrl } from "./_app";
import Navbar from "../components/Navbar";
import { getCountryMap, jobTypeValues } from "../utils/jobUtils";
export enum filterStates {
  grad = "grad",
  intern = "intern",
  both = "both",
}

export enum sortStates {
  latest = "latest",
  company = "company",
}

enum jobFilterTypes {
  JobType = "JobType",
  SortState = "sortState",
  Country = "Country",
}

export interface IJobFilter {
  JobType: filterStates;
  sortState: sortStates;
  country: string;
}

const jobs = jobsJson as unknown as Array<IJobAdd>;

const Home = ({
  viewableJobs = [],
  countriesWithJobs = [],
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const [allJobs] = useState<Array<IJobAdd>>(
    (function () {
      const clientSideStoredJobs = jobs;
      const dbJobs = viewableJobs;
      return [...dbJobs, ...clientSideStoredJobs];
    })()
  );
  const [jobFilter, setJobFilter] = useState<IJobFilter>({
    JobType: filterStates.both,
    sortState: sortStates.company,
    country: "anywhere",
  });

  const [filtedJobs, setFilteredJobs] = useState(
    allJobs.sort((a, b) => {
      if (a.company && b.company) {
        return a.company.localeCompare(b.company);
      }
      if (!a.company && !b.company) {
        return 0;
      }
      if (!b.company) {
        return 1;
      }
      return -1;
    })
  );

  const sortByAll = (jobs: Array<IJobAdd>): void => {
    let newJobs = [...jobs];

    if (
      !jobFilter.country.includes("anywhere") &&
      !jobFilter.country.includes("Anywhere")
    ) {
      //Sort by country
      newJobs = newJobs.filter((job) => {
        console.log("Current country is: ", jobFilter.country);
        console.log("Current job location: ", job.location);
        return job.location?.includes(jobFilter.country);
      });
    }

    if (jobFilter.JobType !== filterStates.both) {
      // Sort by job role
      newJobs = newJobs.filter((job) => job.type === jobFilter.JobType);
    }

    // Sort by sort by
    if (jobFilter.sortState === sortStates.latest) {
      newJobs = newJobs.sort((a, b) => b.posted - a.posted);
    } else {
      newJobs = newJobs.sort((a, b) => {
        if (a.company && b.company) {
          return a.company.localeCompare(b.company);
        }
        if (!a.company && !b.company) {
          return 0;
        }
        if (!b.company) {
          return 1;
        }
        return -1;
      });
    }

    setFilteredJobs(newJobs);
  };

  useEffect(() => {
    sortByAll(allJobs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobFilter]);

  return (
    <div className="dark:bg-gray-900 bg-slate-100">
      <Head>
        <title>CSE Gigs</title>
        <meta name="description" content="Compsci/Seng Student Gigs" />
        <meta
          property="og:image"
          content="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Femoji-of-smiley-color%2F100%2Fsmiley_nerd-512.png&f=1&nofb=1"
        />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="//github.com/downloads/lafeber/world-flags-sprite/flags32.css"
        />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen py-4 lg:px-4">
        <Navbar />
        <Header />
        <Filter
          jobFilter={jobFilter}
          setJobFilter={setJobFilter}
          countriesWithJobs={countriesWithJobs}
        />

        <div className="grid lg:gap-4 pt-6 pb-40 text-center md:grid-cols-1 w-full lg:w-3/4lg:mb-40">
          {filtedJobs.map((job, idx) => (
            <JobAdd
              company={job.company}
              jobTitle={job.jobTitle}
              tags={job.tags}
              logo={job.logo}
              posted={job.posted}
              type={job.type}
              location={job.location}
              link={job.link}
              jobDesc={job.jobDesc}
              key={idx}
            />
          ))}
        </div>
        <EmailSubscription />
        <Script src="../utils/darkMode.js" />
      </main>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/getJobPosts`;
  const jobPostsResp = await fetch(url);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jobPosts: Array<any> = await jobPostsResp.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countries: any = {};

  const viewableJobs: Array<IJobAdd> = jobPosts.map((job) => {
    if (!countries[job.JobCountry]) {
      countries[job.JobCountry] = true;
    }
    return {
      posted: new Date(job.Posted).getTime(),
      company: job.Company,
      jobDesc: job.Description,
      jobTitle: job.Title,
      link: job.ApplyLink,
      location: `${job.JobCity}, ${job.JobCountry}`,
      logo: job.CompanyLogo,
      primaryJobTag: job.PrimaryJobTag as jobTypeValues,
      type: job.Level.includes("Internship")
        ? filterStates.intern
        : filterStates.grad,
      tags: job.Benefits.split(","),
    };
  });

  const countriesWithJobs = Object.keys(countries);

  let countriesWithJobsData = getCountryMap(countriesWithJobs);
  countriesWithJobsData = [
    { id: 0, name: "🗺️ Location" },
    { id: 1, name: "🗺️ Anywhere" },
    ...countriesWithJobsData,
  ];

  return {
    props: {
      viewableJobs,
      countriesWithJobs: countriesWithJobsData,
    },
    revalidate: 18000,
  };
}
