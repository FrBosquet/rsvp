-- CreateTable
CREATE TABLE "Setting" (
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("slug","type")
);

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_slug_fkey" FOREIGN KEY ("slug") REFERENCES "Event"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
