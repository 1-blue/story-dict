import { PrismaClient, StoryCategory } from '@prisma/client'

const prisma = new PrismaClient()

// 시스템 봇 유저 ID
const STORY_BOT_USER_ID = '00000000-0000-4000-8000-100000000000'

const words: {
  category: StoryCategory
  title: string
  summary: string
  content: string
  thumbnailPath: string
}[] = [
  {
    "category": "GENERAL_KNOWLEDGE",
    "title": "멀미는 왜 생길까?",
    "summary": "감각 불일치로 발생하는 멀미의 원리",
    "content": "## ✨ 의미\n멀미는 우리 몸의 감각 기관이 서로 다른 정보를 보낼 때 발생하는 불쾌한 증상입니다. 주로 메스꺼움, 구토, 어지럼증 등을 동반하며, 배, 차, 비행기 등 움직이는 환경에서 흔히 나타납니다.\n\n## 📌 원리\n우리 몸의 균형 감각은 눈, 귀의 전정기관, 그리고 근육과 관절의 고유수용성 감각이 협력하여 작동합니다. 예를 들어, 배 안에서 책을 읽을 때 눈은 고정된 실내를 보고 있지만, 전정기관은 배의 흔들림을 감지합니다. 이처럼 뇌로 들어오는 시각 정보와 균형 감각 정보가 서로 일치하지 않을 때, 뇌는 혼란을 느끼고 이를 독성 물질에 대한 반응으로 오인하여 멀미 증상을 유발합니다.\n\n## 📮 참고\n멀미를 예방하기 위해서는 시선을 먼 곳에 고정하거나, 신선한 공기를 쐬는 것이 좋습니다. 또한 멀미약은 뇌의 혼란을 줄여주는 역할을 하며, 충분한 휴식과 가벼운 식사도 도움이 될 수 있습니다.",
    "thumbnailPath": null
  }
]

async function main() {
  console.log('Seeding stories...')

  for (const word of words) {
    await prisma.story.upsert({
      where: { title: word.title },
      update: {
        summary: word.summary,
        content: word.content,
        thumbnailPath: word.thumbnailPath,
        category: word.category as StoryCategory,
      },
      create: {
        title: word.title,
        summary: word.summary,
        content: word.content,
        thumbnailPath: word.thumbnailPath,
        category: word.category as StoryCategory,
        userId: STORY_BOT_USER_ID,
      },
    })
    console.log(`✅ Upserted: [${word.category}] ${word.title}`)
  }

  console.log(`\n🎉 Seeding complete! Total: ${words.length}개`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
