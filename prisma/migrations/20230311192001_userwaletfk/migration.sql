/*
  Warnings:

  - You are about to drop the column `main_wallet_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "FK_transaction.user_wallet_relation_id";

-- DropIndex
DROP INDEX "user_main_wallet_id_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "main_wallet_id";
