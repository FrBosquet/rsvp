-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "state" SET DEFAULT 'pending',
ALTER COLUMN "contacted" SET DEFAULT false;
