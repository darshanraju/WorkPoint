/* eslint-disable @typescript-eslint/no-var-requires */
// import { writeFile, readFile } from "node:fs/promises";
// import puppeteer from "puppeteer";
const { writeFile, readFile } = require("node:fs/promises");
const puppeteer = require("puppeteer");
const toScrape = require("./toScrape.json");
const scraped = require("./scraped.json");
const jobs = require("./jobs.json");

const XPaths = {
  companyOld:
    "/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[1]/span[1]/span[1]/a",
  company:
    "/html/body/div[6]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[1]/span[1]/span[1]/a",
  imageOld:
    "/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/a/img",
  image:
    "/html/body/div[6]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/a/img",
  locationOld:
    "/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[1]/span[1]/span[2]",
  location:
    "/html/body/div[6]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[1]/span[1]/span[2]",
  jobTitleOld:
    "/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/h1",
  jobTitle:
    "/html/body/div[6]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/h1",
};

const appendToJobs = async (scrapedJobs, existingJobs) => {
  existingJobs.push(...scrapedJobs);
  existingJobs = removeDuplicates(existingJobs);
  await writeFile("./lib/jobsV2.json", JSON.stringify(existingJobs));
};

const sleep = async (sleepDuration = 5000) => {
  return new Promise((resolve) => setTimeout(resolve, sleepDuration));
};

const stillTakingApplicants = async (page) => {
  try {
    const noLongerXPath =
      "/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[3]/div/span";
    await page.waitForXPath(noLongerXPath, { visible: true, timeout: 5000 });
    return false;
  } catch {
    return true;
  }
};

const scrapedJobs = [];

loginSelector = "#email-or-phone";
passwordSelector = "#password";

const newPagePromise = (browser) => {
  return new Promise((x) =>
    browser.once("targetcreated", (target) => x(target.page()))
  );
};

const jobScraper = async (link, type, page, browser) => {
  console.log("Scraping");
  console.log(link);
  // Go to page
  await sleep();
  await page.goto(link);
  await page.waitForXPath(XPaths.jobTitle);

  const canApply = await stillTakingApplicants(page);
  if (!canApply) {
    return;
  }

  // Get Job title
  let [xEl] = await page.$x(XPaths.jobTitle);
  const jobTitle = await page.evaluate((el) => el.textContent, xEl);

  // Get Image src
  [xEl] = await page.$x(XPaths.image);
  const imageHandle = await xEl.getProperty("src");
  const logo = await imageHandle.jsonValue();

  // Get Location
  [xEl] = await page.$x(XPaths.location);
  let location = await page.evaluate((el) => el.textContent, xEl);
  location = location.replace(/\n/, "");
  location = location.trim();

  // Get company name
  [xEl] = await page.$x(XPaths.company);
  let company = await page.evaluate((el) => el.textContent, xEl);
  company = company.replace(/\n/, "");
  company = company.trim();

  // Get Job Description
  const jobDesc = await page.$eval(
    "#job-details > span",
    (element) => element.innerHTML
  );

  const easyApply = await isEasyApply(page);
  let jobLink;
  if (!easyApply) {
    const applyButtonXpath =
      "/html/body/div[6]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[3]/div/div/div/button/span";
    const [applyButtonElement] = await page.$x(applyButtonXpath);
    await applyButtonElement.click();
    // await page.click(applyButton, { delay: 500 });
    const newPage = await newPagePromise(browser);
    await sleep(3000);
    jobLink = await newPage.evaluate(() => document.location.href);
    await newPage.close();
  } else {
    jobLink = link;
  }

  const jobData = {
    company,
    jobTitle,
    type,
    logo,
    location,
    jobDesc,
    link: jobLink,
    linkedinLink: link,
    posted: Date.now() - 86400,
  };
  scrapedJobs.push(jobData);
};

const isEasyApply = async (page) => {
  const easyApplyXPath =
    "/html/body/div[6]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[3]/div/div/div/button/span";

  [xEl] = await page.$x(easyApplyXPath);
  const innerText = await page.evaluate((el) => el.textContent, xEl);
  if (innerText.includes("Easy Apply")) {
    return true;
  }
  return false;
};

const signIntoLinkedin = async (page) => {
  await page.goto(
    "https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin"
  );
  await page.type("#username", "jerklosapj@gmail.com", { delay: 150 });
  await page.type("#password", "Kurrykid123", { delay: 150 });
  await page.click(
    "#organic-div > form > div.login__form_action_container > button",
    { delay: 500 }
  );
};

const trimLinkedinLink = (link) => {
  return link.replace(/\/\?refId.*/, "");
};

const removeStaleJobs = async (page) => {
  const newJobs = [];
  for (const job of jobs) {
    if (
      job.linkedinLink ||
      job.link.includes("https://www.linkedin.com/jobs")
    ) {
      await sleep();
      let link;

      link = job.linkedinLink || job.link;
      link = trimLinkedinLink(link);
      await page.goto(link);
      if ((await page.content()).includes("No longer accepting applications")) {
        console.log("Removing: ", job.jobTitle, " @ ", job.company);
      } else {
        console.log("Can apply to: ", job.jobTitle, " @ ", job.company);
        newJobs.push(job);
      }
    } else {
      console.log("Manually Check: ", job.jobTitle, " @ ", job.company);
      newJobs.push(job);
    }
  }
  return newJobs;
};

const setupScraper = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await signIntoLinkedin(page);

  await page.waitForXPath(
    "/html/body/div[6]/header/div/nav/ul/li[6]/div/button/img"
  );

  // Remove any current jobs no longer accepting applications
  // const newJobs = await removeStaleJobs(page);
  const newJobs = [...jobs];

  // Scrape the newly added job links
  for (const job of toScrape) {
    await jobScraper(job.link, job.type, page, browser);
  }

  // Aggregate current and new jobs
  appendToJobs(scrapedJobs, newJobs);

  // Save scraped job metadata
  const newScraped = [...toScrape, ...scraped];
  await writeFile("./lib/scraped.json", JSON.stringify(newScraped));

  await browser.close();
};

const removeDuplicates = (jobs) => {
  const duplicatedRemoved = [];
  const seenLinks = {};
  for (const job of jobs) {
    if (!seenLinks[job.link]) {
      duplicatedRemoved.push(job);
      seenLinks[job.link] = true;
    }
  }
  return duplicatedRemoved;
};

const checkForDups = () => {
  const jobs = require("./jobsV2.json");
  for (const job of jobs) {
    const t = howMany(jobs, job);
    if (t != 1) {
      console.log("Exists: ", t);
      console.log(job.link);
      console.log(job.jobTitle);
    }
  }
};

const howMany = (jobs, job) => {
  let count = 0;
  for (const jobCounter of jobs) {
    if (jobCounter.link === job.link) {
      count++;
    }
  }
  return count;
};

checkForDups();

// setupScraper();

/**
 * 1. Remove all jobs that are stale
 *   a. Iterate through all jobs
 *   b. For each job, get either the linkedinLink or jobLink (if it starts with linkedin)
 *   c. Check if the "No Longer Taking Applicants"
 */
