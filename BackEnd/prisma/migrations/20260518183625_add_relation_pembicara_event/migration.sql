/*
  Warnings:

  - Added the required column `event_id` to the `pembicaras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pembicaras" ADD COLUMN     "event_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "pembicaras" ADD CONSTRAINT "pembicaras_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
