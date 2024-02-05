-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "guestSlug" TEXT NOT NULL,
    "guestEventSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_id_key" ON "Note"("id");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_guestSlug_guestEventSlug_fkey" FOREIGN KEY ("guestSlug", "guestEventSlug") REFERENCES "Guest"("slug", "eventSlug") ON DELETE RESTRICT ON UPDATE CASCADE;
