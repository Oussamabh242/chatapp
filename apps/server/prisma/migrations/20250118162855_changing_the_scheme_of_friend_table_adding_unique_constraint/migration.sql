/*
  Warnings:

  - You are about to drop the column `user1` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `user2` on the `Friend` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user1Id,user2Id]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user1Id` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_user1_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_user2_fkey";

-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "user1",
DROP COLUMN "user2",
ADD COLUMN     "user1Id" TEXT NOT NULL,
ADD COLUMN     "user2Id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Friend_user1Id_user2Id_key" ON "Friend"("user1Id", "user2Id");

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
