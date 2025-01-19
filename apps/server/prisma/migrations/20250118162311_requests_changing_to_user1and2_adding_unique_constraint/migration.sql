/*
  Warnings:

  - You are about to drop the column `recivedId` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Request` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user1Id,user2Id]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user1Id` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_recivedId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_senderId_fkey";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "recivedId",
DROP COLUMN "senderId",
ADD COLUMN     "user1Id" TEXT NOT NULL,
ADD COLUMN     "user2Id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Request_user1Id_user2Id_key" ON "Request"("user1Id", "user2Id");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
