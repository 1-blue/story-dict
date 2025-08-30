import { PrismaClient } from "@sd/db";

import { seedUsers } from "./users";
import { seedStories } from "./stories";
import { seedComments } from "./comments";

const prisma = new PrismaClient();

async function main() {
  console.group();
  console.log(`🚀 Start seeding 🚀`);

  console.log(`✅ seeding to users ...`);
  for (const user of seedUsers) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        password: user.password,
        nickname: user.nickname,
        role: user.role,
        provider: user.provider,
      },
      create: user,
    });
  }

  console.log(`✅ seeding to stories ...`);
  for (const story of seedStories) {
    await prisma.story.upsert({
      where: { id: story.id },
      update: {
        summary: story.summary,
        content: story.content,
        category: story.category,
        thumbnailPath: story.thumbnailPath,
      },
      create: story,
    });
  }

  console.log(`✅ seeding to comments ...`);
  for (const comment of seedComments) {
    await prisma.storyComment.upsert({
      where: { id: comment.id },
      update: {
        content: comment.content,
      },
      create: comment,
    });
  }

  console.log(`🚀 Seeding finished 🚀`);
  console.groupEnd();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
