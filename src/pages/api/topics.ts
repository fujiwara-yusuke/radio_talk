import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

interface Topics {
  id:        number,
  name:      string,
  theme:     string,
  good:      number,
  bad:       number,
  createdAt: Date
}

const prisma = new PrismaClient();

const getRandomTopics = async () =>{
  const result = await prisma.$queryRaw<Topics[]>`select * from Topics order by RAND() limit 10;`
  return result;
}

const createTopics = async (post: {name: string, theme: string}) => {
  const result = await prisma.topics.create({data: post});
  return result;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const result = await getRandomTopics();
    res.status(200).json(result);
  } else if(req.method === 'POST') {
    await createTopics(req.body);
    res.status(200).json(req.body);
  }
}

export default handler;