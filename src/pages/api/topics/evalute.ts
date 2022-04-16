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

const updateGoodBad = async (post: Topics) =>{
  const result = await prisma.topics.update({
    where:{
      id: post.id
    },
    data: {
      good: post.good,
      bad: post.bad,
    }
  })
  return result;
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === "POST"){
    updateGoodBad(req.body);
    res.status(200).json(req.body);
  }
}

export default handler;