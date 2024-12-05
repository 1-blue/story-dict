import { PrismaClient } from "@prisma/client";

import { seedCats } from "./cats";
import { seedUsers } from "./users";
import { seedPosts } from "./posts";
import { seedComments } from "./comments";
// import { postReactions } from "./postReactions";
// import { commentReactions } from "./commentReactions";

const prisma = new PrismaClient();

async function main() {
  console.group();
  console.log(`🚀 Start seeding 🚀`);

  console.log(`✅ seeding to cats ...`);
  await prisma.cat.createMany({
    data: seedCats,
    skipDuplicates: true,
  });

  console.log(`✅ seeding to users ...`);
  await prisma.user.createMany({
    data: seedUsers,
    skipDuplicates: true,
  });

  console.log(`✅ seeding to posts ...`);
  await prisma.post.createMany({
    data: seedPosts,
    skipDuplicates: true,
  });

  console.log(`✅ seeding to comments ...`);
  await prisma.comment.createMany({
    data: seedComments,
    skipDuplicates: true,
  });

  // console.log(`✅ seeding to postReactions ...`);
  // await prisma.postReaction.createMany({
  //   data: postReactions,
  //   skipDuplicates: true,
  // });

  // console.log(`✅ seeding to commentReactions ...`);
  // await prisma.commentReaction.createMany({
  //   data: commentReactions,
  //   skipDuplicates: true,
  // });

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
    process.exit(1);
  });
