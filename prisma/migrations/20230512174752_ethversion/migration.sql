/*
  Warnings:

  - You are about to drop the column `nmemonic_phrase` on the `main_wallet_blockchain` table. All the data in the column will be lost.
  - You are about to drop the column `nmemonic_phrase` on the `sub_wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "main_wallet_blockchain" DROP COLUMN "nmemonic_phrase",
ADD COLUMN     "private_key" VARCHAR(100);

-- AlterTable
ALTER TABLE "sub_wallet" DROP COLUMN "nmemonic_phrase",
ADD COLUMN     "private_key" VARCHAR(100);
