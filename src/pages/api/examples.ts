// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "../../server/db/client";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200);
};

export default examples;
