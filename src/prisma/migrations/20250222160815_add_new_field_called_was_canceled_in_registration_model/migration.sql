-- DropIndex
DROP INDEX "Events_location_key";

-- AlterTable
ALTER TABLE "Registrations" ADD COLUMN     "wasCanceled" BOOLEAN NOT NULL DEFAULT false;
