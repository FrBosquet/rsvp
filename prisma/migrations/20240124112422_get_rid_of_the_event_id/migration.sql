/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `Guest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eventId` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `UserOnEvent` table. All the data in the column will be lost.
  - Added the required column `eventSlug` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventSlug` to the `UserOnEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_eventId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnEvent" DROP CONSTRAINT "UserOnEvent_eventId_fkey";

-- DropIndex
DROP INDEX "Event_id_key";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("slug");

-- AlterTable
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_pkey",
DROP COLUMN "eventId",
ADD COLUMN     "eventSlug" TEXT NOT NULL,
ADD CONSTRAINT "Guest_pkey" PRIMARY KEY ("eventSlug", "slug");

-- AlterTable
ALTER TABLE "UserOnEvent" DROP COLUMN "eventId",
ADD COLUMN     "eventSlug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserOnEvent" ADD CONSTRAINT "UserOnEvent_eventSlug_fkey" FOREIGN KEY ("eventSlug") REFERENCES "Event"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_eventSlug_fkey" FOREIGN KEY ("eventSlug") REFERENCES "Event"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
