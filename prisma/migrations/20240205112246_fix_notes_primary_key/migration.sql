/*
  Warnings:

  - The primary key for the `Note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Note` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Note_id_key";

-- AlterTable
ALTER TABLE "Note" DROP CONSTRAINT "Note_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Note_pkey" PRIMARY KEY ("guestSlug", "guestEventSlug", "type");
