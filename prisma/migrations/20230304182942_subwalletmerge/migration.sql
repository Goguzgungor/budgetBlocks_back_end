/*
  Warnings:

  - You are about to drop the `sub_wallet_blockchain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_wallet_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sub_wallet_user" DROP CONSTRAINT "sub_wallet_user_wallet_id_fkey";

-- AlterTable
ALTER TABLE "sub_wallet" ADD COLUMN     "blockchain_balance" DECIMAL,
ADD COLUMN     "e-mail" VARCHAR(50),
ADD COLUMN     "nmemonic_phrase" VARCHAR(100),
ADD COLUMN     "password" VARCHAR(50),
ADD COLUMN     "user_name" VARCHAR(50);

-- DropTable
DROP TABLE "sub_wallet_blockchain";

-- DropTable
DROP TABLE "sub_wallet_user";
