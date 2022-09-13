import type { NextPage } from "next";
import Head from "next/head";
import JobAdd, { IJobAddV2, IJobAddV3 } from "../components/JobAdd";
import EmailSubscription from "../components/EmailSubscription";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
import jobsJson from "../../lib/jobs.json";

export enum filterStates {
  grad = "grad",
  intern = "intern",
  both = "both",
}

const jobs = jobsJson as unknown as Array<IJobAddV3>;

const sortByLatest = (jobsToSort: Array<IJobAddV3>): Array<IJobAddV3> =>
  jobsToSort.sort((a, b) => b.posted - a.posted);

const Home: NextPage = () => {
  const [checked, setChecked] = useState(filterStates.both);
  const [filtedJobs, setFilteredJobs] = useState(sortByLatest(jobs));
  useEffect(() => {
    if (checked === filterStates.both) {
      setFilteredJobs(sortByLatest(jobs));
      return;
    }

    setFilteredJobs(sortByLatest(jobs.filter((job) => job.type === checked)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <div className="bg-stone-100">
      <Head>
        <title>CSE Gigs</title>
        <meta name="description" content="Compsci/Seng Student Gigs" />
        <meta
          property="og:image"
          content="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Femoji-of-smiley-color%2F100%2Fsmiley_nerd-512.png&f=1&nofb=1"
        />

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
      </main>
    </div>
  );
};

export default Home;
