/*
  Warnings:

  - You are about to drop the column `sub_wallet_blockchain_id` on the `sub_wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sub_wallet" DROP COLUMN "sub_wallet_blockchain_id",
ADD COLUMN     "public_key" VARCHAR(100);
