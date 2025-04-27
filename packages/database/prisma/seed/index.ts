import { PrismaClient } from "@sd/db";

import { seedUsers } from "./users";
import { seedStories } from "./stories";
import { seedComments } from "./comments";

const prisma = new PrismaClient();

async function main() {
  console.group();
  console.log(`🚀 Start seeding 🚀`);

  console.log(`✅ seeding to users ...`);
  await prisma.user.createMany({
    data: seedUsers,
    skipDuplicates: true,
  });

  console.log(`✅ seeding to stories ...`);
  await prisma.story.createMany({
    data: seedStories,
    skipDuplicates: true,
  });

  console.log(`✅ seeding to comments ...`);
  await prisma.storyComment.createMany({
    data: seedComments,
    skipDuplicates: true,
  });

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
