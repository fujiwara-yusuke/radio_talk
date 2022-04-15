import { PrismaClient } from '@prisma/client'

interface Topics {
  name: string,
  theme: string
}


const prisma = new PrismaClient();

const testTopics:Topics[] = [
  {name: "ゆすけ_管理者", theme: "学生時代"},
  {name: "ゆすけ_管理者", theme: "好きな音楽について"},
  {name: "ゆすけ_管理者", theme: "tan1度は有理数なのか"},
  {name: "ゆすけ_管理者", theme: "休日の過ごし方"},
  {name: "ゆすけ_管理者", theme: "好きなラジオ"},
  {name: "ゆすけ_管理者", theme: "勉強法について"},
];

const createRecord = async (topics: Topics) => {
  await prisma.topics.create({data: topics});
}
testTopics.forEach(topics => {
  createRecord(topics)
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
})
