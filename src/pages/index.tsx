import type { NextPage } from "next";
import Head from "next/head";
import JobAdd, { IJobAddV2, IJobAddV3 } from "../components/JobAdd";
import EmailSubscription from "../components/EmailSubscription";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
import jobsJson from "../../lib/jobs.json";
import Header from "../components/Header";
import wave from "../../public/wave.svg";
import moon from "../../public/moon.svg";
import sun from "../../public/sun.svg";
import Image from "next/image";
import Script from "next/script";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const arraySort = require("array-sort");

export enum filterStates {
  grad = "grad",
  intern = "intern",
  both = "both",
}

export enum sortStates {
  latest = "latest",
  company = "company",
}

export interface IJobFilter {
  JobType: filterStates;
  sortState: sortStates;
}

const jobs = jobsJson as unknown as Array<IJobAddV3>;

const Home: NextPage = () => {
  const currentTheme = (): boolean => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cseGigsTheme") === "dark") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    const resp = currentTheme();
    setDarkMode(resp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window]);

  const [darkMode, setDarkMode] = useState(currentTheme());

  const [jobFilter, setJobFilter] = useState<IJobFilter>({
    JobType: filterStates.both,
    sortState: sortStates.company,
  });

  const [filtedJobs, setFilteredJobs] = useState(
    jobs.sort((a, b) => a.company.localeCompare(b.company))
  );

  const sortByAll = (jobs: Array<IJobAddV3>): void => {
    let newJobs = [...jobs];

    // Sort by job role
    if (jobFilter.JobType !== filterStates.both) {
      newJobs = newJobs.filter((job) => job.type === jobFilter.JobType);
    }

    // Sort by sort by
    if (jobFilter.sortState === sortStates.latest) {
      newJobs = newJobs.sort((a, b) => b.posted - a.posted);
    } else {
      newJobs = newJobs.sort((a, b) => a.company.localeCompare(b.company));
    }

    setFilteredJobs(newJobs);
  };

  const sortByLatest = (jobsToSort: Array<IJobAddV3>): void => {
    console.log(jobsToSort.sort((a, b) => a.posted - b.posted));
    setFilteredJobs(jobsToSort.sort((a, b) => a.posted - b.posted));
  };

  const sortByCompany = (jobsToSort: Array<IJobAddV3>): void => {
    setFilteredJobs(
      jobsToSort.sort((a, b) => a.company.localeCompare(b.company))
    );
  };

  useEffect(() => {
    sortByAll(jobs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobFilter]);

  return (
    <div className="bg-white dark:bg-gray-900">
      <Head>
        <title>CSE Gigs</title>
        <meta name="description" content="Compsci/Seng Student Gigs" />
        <meta
          property="og:image"
          content="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Femoji-of-smiley-color%2F100%2Fsmiley_nerd-512.png&f=1&nofb=1"
        />

        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen py-4 lg:px-4">
        <div className="flex justify-end w-full">
          {darkMode ? (
            <div className="mx-4 lg-mx-0">
              <Image
                className="sun cursor-pointer"
                height="40px"
                width="40px"
                alt="sun"
                src={sun}
                onClick={() => {
                  localStorage.setItem("cseGigsTheme", "light");
                  document.documentElement.classList.remove("dark");
                  setDarkMode(false);
                }}
              />
            </div>
          ) : (
            <div className="mx-4 lg-mx-0">
              <Image
                className="moon cursor-pointer px-4"
                alt="moon"
                src={moon}
                color="white"
                height="40px"
                width="40px"
                onClick={(e) => {
                  localStorage.setItem("cseGigsTheme", "dark");
                  document.documentElement.classList.add("dark");
                  setDarkMode(true);
                }}
              />
            </div>
          )}
        </div>
        <Header />
        <Filter
          sorts={{ company: sortByCompany, latest: sortByLatest }}
          jobs={filtedJobs}
          jobFilter={jobFilter}
          setJobFilter={setJobFilter}
        />{" "}
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
