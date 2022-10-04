/* eslint-disable @next/next/no-css-tags */
import type { NextPage } from "next";
import Head from "next/head";
import JobAdd, { IJobAdd } from "../components/JobAdd";
import EmailSubscription from "../components/EmailSubscription";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
import jobsJson from "../../lib/jobs.json";
import Header from "../components/Header";
import Script from "next/script";
import DarkModeToggle from "../components/DarkModeToggle";
import Navbar from "../components/Navbar";

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

const jobs = jobsJson as unknown as Array<IJobAdd>;

const Home: NextPage = () => {
  const [jobFilter, setJobFilter] = useState<IJobFilter>({
    JobType: filterStates.both,
    sortState: sortStates.company,
  });

  const [filtedJobs, setFilteredJobs] = useState(
    jobs.sort((a, b) => {
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

    // Sort by job role
    if (jobFilter.JobType !== filterStates.both) {
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

  const sortByLatest = (jobsToSort: Array<IJobAdd>): void => {
    console.log(jobsToSort.sort((a, b) => a.posted - b.posted));
    setFilteredJobs(jobsToSort.sort((a, b) => a.posted - b.posted));
  };

  const sortByCompany = (jobsToSort: Array<IJobAdd>): void => {
    setFilteredJobs(
      jobsToSort.sort((a, b) => {
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
        {/* <Navbar /> */}
        <DarkModeToggle />
        <Header />
        <Filter
          sorts={{ company: sortByCompany, latest: sortByLatest }}
          jobs={filtedJobs}
          jobFilter={jobFilter}
          setJobFilter={setJobFilter}
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
