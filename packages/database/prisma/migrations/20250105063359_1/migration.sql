/*
  Warnings:

  - You are about to drop the column `thumbnailId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Cat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_thumbnailId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imageId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "thumbnailId",
ADD COLUMN     "thumbnailPath" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageId",
ADD COLUMN     "imagePath" TEXT;

-- DropTable
DROP TABLE "Cat";

-- DropTable
DROP TABLE "Image";

-- DropEnum
DROP TYPE "ImagePurpose";

-- DropEnum
DROP TYPE "ImageStatus";
