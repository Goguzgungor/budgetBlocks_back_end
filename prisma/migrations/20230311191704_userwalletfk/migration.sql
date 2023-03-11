/*
  Warnings:

  - A unique constraint covering the columns `[main_wallet_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `main_wallet_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "main_wallet_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_main_wallet_id_key" ON "user"("main_wallet_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "FK_transaction.user_wallet_relation_id" FOREIGN KEY ("main_wallet_id") REFERENCES "main_wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
