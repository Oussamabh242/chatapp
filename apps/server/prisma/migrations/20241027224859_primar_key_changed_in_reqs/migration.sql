/*
  Warnings:

  - The primary key for the `Request` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Request" DROP CONSTRAINT "Request_pkey",
ADD CONSTRAINT "Request_pkey" PRIMARY KEY ("senderId", "recivedId");
