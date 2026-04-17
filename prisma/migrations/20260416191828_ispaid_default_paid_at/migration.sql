/*
  Warnings:

  - You are about to drop the column `paidAd` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paidAd",
ADD COLUMN     "paidAt" TIMESTAMP(3),
ALTER COLUMN "isPaid" SET DEFAULT false;
