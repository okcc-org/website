/*
  Warnings:

  - You are about to drop the column `isActive` on the `programs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "programs" DROP COLUMN "isActive",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false;
