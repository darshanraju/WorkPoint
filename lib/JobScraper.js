/* eslint-disable @typescript-eslint/no-var-requires */
// import { writeFile } from "node:fs/promises";
// import puppeteer from "puppeteer";
const { writeFile } = require("node:fs/promises");
const puppeteer = require("puppeteer");
const XPaths = {
  company:
    "/html/body/main/section[1]/div/section[2]/div/div[1]/div/h4/div[1]/span[1]/a",
  companyV2:
    "/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[1]/span[1]/span[1]/a",
  image: "/html/body/main/section[1]/div/section[2]/div/a/img",
  imageV2:
    "/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/a/img",
  jobTitle: "/html/body/main/section[1]/div/section[2]/div/div[1]/div/h1",
  location:
    "/html/body/main/section[1]/div/section[2]/div/div[1]/div/h4/div[1]/span[2]",
  locationV2:
    "/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[1]/span[1]/span[2]",
  jobTitleV2:
    "/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/h1",
};

const sleep = async () => {
  return new Promise((resolve) => setTimeout(resolve, 5000));
};

const scrapedJobs = [];

loginSelector = "#email-or-phone";
passwordSelector = "#password";

const jobScraper = async (link, type, page) => {
  // Go to page
  await sleep();
  await page.goto(link);
  await page.waitForXPath(XPaths.jobTitleV2);

  // Get Job title
  let [xEl] = await page.$x(XPaths.jobTitleV2);
  const jobTitle = await page.evaluate((el) => el.textContent, xEl);

  // Get Image src
  [xEl] = await page.$x(XPaths.imageV2);
  const imageHandle = await xEl.getProperty("src");
  const logo = await imageHandle.jsonValue();

  // Get Location
  [xEl] = await page.$x(XPaths.locationV2);
  let location = await page.evaluate((el) => el.textContent, xEl);
  location = location.replace(/\n/, "");
  location = location.trim();

  // Get company name
  [xEl] = await page.$x(XPaths.companyV2);
  let company = await page.evaluate((el) => el.textContent, xEl);
  company = company.replace(/\n/, "");
  company = company.trim();

  const jobDesc = await page.$eval(
    "#job-details > span",
    (element) => element.innerHTML
  );

  const jobData = {
    company,
    jobTitle,
    type,
    logo,
    location,
    jobDesc,
    link,
    posted: 1662382273,
  };
  scrapedJobs.push(jobData);
};

const toScrape = [
  {
    link: "https://www.linkedin.com/jobs/view/3203155381/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=xFoih9i4c34fvrCpOLGlzg%3D%3D&trackingId=E0jxDXtnIJSY6hYOOlW7QQ%3D%3D&trk=flagship3_search_srp_jobs",
    type: "grad",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3030803962/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SKILL_ASSESSMENTS&refId=RAAZzE14ZpzTp%2BX1P%2BSG3A%3D%3D&trackingId=wy6Cq%2BILcfhhzPHTVYhHdA%3D%3D&trk=flagship3_search_srp_jobs",
    type: "grad",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3030814717/?alternateChannel=search&refId=zhP%2FlANWeSt31QaWTZAEOw%3D%3D&trackingId=tHsSmj8X18uLHVCkrfS%2Fxw%3D%3D",
    type: "grad",
  },
  {
    link: "https://www.linkedin.com/jobs/view/graduate-optical-network-engineer-at-amazon-web-services-aws-3086745606/",
    type: "grad",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3219950596/?alternateChannel=search&refId=S8p74XimCbaVLzNGpxdOPA%3D%3D&trackingId=Z4mKhjMkc85rIxZ2iGuoXw%3D%3D",
    type: "grad",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3213055569/?alternateChannel=search&refId=hXUjMoosE3z4K%2FcL3ALvMA%3D%3D&trackingId=SfjWv%2BTLFRYE1kiorhHjnA%3D%3D",
    type: "grad",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3204644314/?alternateChannel=search&refId=ypceBYGmf1yvgqyw07dvLA%3D%3D&trackingId=1xbaxj5YSanRr9XPgaxtPw%3D%3D",
    type: "grad",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3178155107/?alternateChannel=search&refId=Hw7z8XXMD3FSdDPDzplkGw%3D%3D&trackingId=q%2FruQgbpmYbZ2v0aAzcamw%3D%3D",
    type: "intern",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3234258588/?alternateChannel=search&refId=ZV48qR5Ah%2FIihn6t3JGYcg%3D%3D&trackingId=zx2YGgf%2BaH2HJHsiPKVZ7w%3D%3D",
    type: "intern",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3237733495/?eBP=CwEAAAGDJkz9k_jrsV6JngsFDqDRiRbEDXrEKz88rz9cjYUQKR9XGRdUvKCivD-A5gh1HdAdY1CO8irk6MBg66wMc10BST6F27y6yBeiHSq5FDcuioSjI-tyA4pVPKMli1bz5KI1jWD9bo--Zg3jzKMD346NU1owjKD3QZPSuaHliq8Tb-_xqHYkgBbvNEP4MR077FNCnbbgxhvRWOBX2xF0YAUu7lakI4oo4-D-uxHX8EdBfIwWoNgp0bJAjw21IIfkpGSNaE2NWofC5jWfALKDrj8spVz4hUZfjRGjY0WAOmMcevznaSfOZl1Ek0uLpA_iBpmTiTUKCKW22U5WVS4qPMRWGIuQNvCm9B4vTaMRySeq7YMgoCTzoelGip7-GdE&recommendedFlavor=JOB_SEEKER_QUALIFIED&refId=uE%2BopRlZOtDok6ayCwKPmA%3D%3D&trackingId=FALR%2BJhW3vm9D6pTkK9XdQ%3D%3D&trk=flagship3_search_srp_jobs",
    type: "intern",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3241459033/?alternateChannel=search&refId=7szdTDJszi7XpUyjAobOaA%3D%3D&trackingId=Km9V%2FkvXkfmaTKQHj57QZQ%3D%3D",
    type: "intern",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3251622167/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=hhW0bG05n%2B4iSuBr3Ap0eA%3D%3D&trackingId=%2FXB3PYzjW1gfy%2FUZC2SZuA%3D%3D&trk=flagship3_search_srp_jobs",
    type: "intern",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3233046218/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=hhW0bG05n%2B4iSuBr3Ap0eA%3D%3D&trackingId=%2BMIj7AhmcFkiC1ikAfqfTQ%3D%3D&trk=flagship3_search_srp_jobs",
    type: "intern",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3251983878/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=1qS9JXopkGZuN%2FpI8MZS5A%3D%3D&trackingId=eWeTiXUPLxHEjajPJS%2Fuew%3D%3D&trk=flagship3_search_srp_jobs",
    type: "intern",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3127426836/?alternateChannel=search&refId=Di0jbHxxp5ECGdryaVg%2FHg%3D%3D&trackingId=JJ3uxHZatvff7H%2FTFZn9Xg%3D%3D",
    type: "grad",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3251672724/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=%2BSqsHET3ZN8kOLkpduACHw%3D%3D&trackingId=sxBOqmFiTBPen9pIg3Kp2w%3D%3D&trk=flagship3_search_srp_jobs",
    type: "grad",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3221146078/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=ACTIVELY_HIRING_COMPANY&refId=%2BSqsHET3ZN8kOLkpduACHw%3D%3D&trackingId=Z4uqm%2F%2Fvf72AyipyXQQmXw%3D%3D&trk=flagship3_search_srp_jobs",
    type: "grad",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3231271651/?eBP=CwEAAAGDJlKLBifx_h7A8BoRfS02CO7p2lJMoCWhTJqPn0bodLctozk3_jdtbFdN8ChD5iKXycg7xPMIe2wqt4KuVA0pAebzHAKDyG0uaLGX1O3CqToA2J_X1-if2YpteAhzQjZacce8-_D8LQ4hL_HkSS_IZT8GH2VicsSko_EPiLqR0LNUoX2tlJZPW64j5YsqUnBcZuBUZfJEfOudgcp_rR4idgsfsv7AaO8ynj7YeGtUKh30hr0xX0rbPQmaSOg3QEsWom0xDlE1vVBlGflxvyQjDi87KxkOBV4sFihudAKkPPZjbmHyrLBrWgKC_Yi7Cfk_3AuEQGYO4F87SKHBjZu38A&recommendedFlavor=SCHOOL_RECRUIT&refId=wGfZKQmRNyVjKXgZdE79iQ%3D%3D&trackingId=zaTZE%2FzD0qiB0tUzZaxJTQ%3D%3D&trk=flagship3_search_srp_jobs",
    type: "grad",
  },
  {
    link: "https://www.linkedin.com/jobs/view/3214167414/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=SKILL_ASSESSMENTS&refId=wGfZKQmRNyVjKXgZdE79iQ%3D%3D&trackingId=MJlEgWInBlHIAhZEg2DM0Q%3D%3D&trk=flagship3_search_srp_jobs",
    type: "grad",
  },
];

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

const setupScraper = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await signIntoLinkedin(page);
  page.click();
  await page.waitForXPath(
    "/html/body/div[5]/header/div/nav/ul/li[6]/div/button/img"
  );
  for (const job of toScrape) {
    await jobScraper(job.link, job.type, page);
  }
  await writeFile("./lib/jobs.json", JSON.stringify(scrapedJobs));
  browser.close();
};
// #organic-div > form > div.login__form_action_container > button
setupScraper();
