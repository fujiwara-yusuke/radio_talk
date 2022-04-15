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
  switch(req.method){
    case 'GET': {
      const result = await getRandomTopics();
      res.status(200).json(result);
      break;
    }
    case 'POST':{
      await createTopics(req.body);
      res.status(200).json(req.body);
      break;
    }
  }
}

export default handler;