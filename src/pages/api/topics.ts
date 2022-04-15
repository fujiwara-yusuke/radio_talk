import type { NextApiRequest, NextApiResponse } from 'next'

const testTopis = [
  {name: "test", theme: "ああああああああああああああああああああああああああああああ"},
  {name: "test", theme: "test1test2test3test4test5test6"},
  {name: "test", theme: "test1test2test3test4test5test6"},
  {name: "test", theme: "test1test2test3test4test5test6"},
  {name: "test", theme: "test1test2test3test4test5test6"},
  {name: "test", theme: "test1test2test3test4test5test6"},
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(testTopis);
  } else if(req.method === 'POST') {
    res.status(200).json(req.body);
  }
}