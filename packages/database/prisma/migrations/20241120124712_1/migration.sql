/*
  Warnings:

  - Made the column `commentId` on table `CommentReaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `PostReaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `replyId` on table `ReplyReaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CommentReaction" ALTER COLUMN "commentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "PostReaction" ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ReplyReaction" ALTER COLUMN "replyId" SET NOT NULL;
