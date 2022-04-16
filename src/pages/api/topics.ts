import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

interface Topics {
  id:        number,
  name:      string,
  theme:     string,
  good:      number,
  bad:       number,
  createdAt: Date
}

const prisma = new PrismaClient();

const getRandomTopics = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await prisma.$queryRaw<Topics[]>`select * from Topics order by RAND() limit 10;`
  res.status(200).json(result);
}

const createTopics = async (req: NextApiRequest, res: NextApiResponse, post: {name: string, theme: string}) => {
  try{
    await prisma.topics.create({data: post});
    res.status(200).json(post);
  }catch(err){
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        res.status(500).send({ errorCode: err.code })
      }
    }else{
      throw err;
    }
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method){
    case 'GET': {
      getRandomTopics(req, res);
      break;
    }
    case 'POST':{
      createTopics(req, res, req.body);
      break;
    }
  }
}

export default handler;