/*
  Warnings:

  - Made the column `image` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "image" SET NOT NULL;
