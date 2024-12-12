/*
  Warnings:

  - Added the required column `postId` to the `CommentReaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentId` to the `ReplyReaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `ReplyReaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentReaction" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReplyReaction" ADD COLUMN     "commentId" TEXT NOT NULL,
ADD COLUMN     "postId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReaction" ADD CONSTRAINT "ReplyReaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyReaction" ADD CONSTRAINT "ReplyReaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
