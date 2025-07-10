/*
  Warnings:

  - You are about to drop the `programs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_programs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sub_programs" DROP CONSTRAINT "sub_programs_program_id_fkey";

-- DropTable
DROP TABLE "programs";

-- DropTable
DROP TABLE "sub_programs";

-- DropEnum
DROP TYPE "ClassType";
