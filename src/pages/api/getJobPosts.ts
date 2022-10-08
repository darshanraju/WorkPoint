import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db/client";

const getJobPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!prisma) {
    res.status(400);
    return;
  }
  const jobPosts = await prisma.jobPost.findMany({
    // where: {
    //   verified: true,
    // },
  });
  // console.log("👾👾👾👾👾👾👾👾");
  // console.log(jobPosts);
  res.json(jobPosts);
  res.status(200);
};

export default getJobPosts;
