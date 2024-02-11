-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_guestSlug_guestEventSlug_fkey";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_guestSlug_guestEventSlug_fkey" FOREIGN KEY ("guestSlug", "guestEventSlug") REFERENCES "Guest"("slug", "eventSlug") ON DELETE CASCADE ON UPDATE CASCADE;
