/*
  Warnings:

  - You are about to drop the column `highestBidId` on the `Items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_highestBidId_fkey";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "highestBidId";
