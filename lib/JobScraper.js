/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFile } = require("node:fs/promises");
const puppeteer = require("puppeteer");
const toScrape = require("./toScrape.json");
const scraped = require("./scraped.json");
const jobs = require("./jobs.json");
const {
  jobScraper,
  signIntoLinkedin,
  removeStaleJobs,
  appendToJobs,
  saveScrapedJobs,
  scrapeNewJobs,
  removeDuplicates,
} = require("./JobScraperUtils");
const { exit } = require("node:process");

// const setupScraper = async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await signIntoLinkedin(page);

//   // Wait for Linkedin Profil Photo to show up
//   await page.waitForXPath(
//     "/html/body/div[6]/header/div/nav/ul/li[6]/div/button/img"
//   );

//   // Remove any current jobs no longer accepting applications
//   const newJobs = await removeStaleJobs(page, jobs);
//   const scrapedJobs = [];

//   console.log("STALE JOBS HAVE BEEN REMOVED");

//   // Scrape the newly added job links
//   for (const job of toScrape) {
//     const newJob = await jobScraper(job.link, job.type, page, browser);
//     scrapedJobs.push(newJob);
//   }

//   // Aggregate current and new jobs
//   appendToJobs(scrapedJobs, newJobs);

//   // Save scraped job metadata
//   const newScraped = [...toScrape, ...scraped];
//   await writeFile("./lib/scraped.json", JSON.stringify(newScraped));

//   await browser.close();
// };

const setupScraperV2 = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  return [browser, page];
};

const start = async () => {
  removeDuplicates(jobs);
  const [browser, page] = await setupScraperV2();
  await signIntoLinkedin(page);
  // Remove any current jobs no longer accepting applications
  // const stillTakingApplicants = await removeStaleJobs(page, jobs);
  const stillTakingApplicants = jobs;
  const scrapedJobs = await scrapeNewJobs(toScrape, page, browser);
  appendToJobs(scrapedJobs, stillTakingApplicants);
  await saveScrapedJobs(toScrape, scraped);
  await browser.close();
  exit();
};

start();
