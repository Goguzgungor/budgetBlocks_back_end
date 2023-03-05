/*
  Warnings:

  - A unique constraint covering the columns `[sub_wallet_id]` on the table `user_wallet_relation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_wallet_relation_sub_wallet_id_key" ON "user_wallet_relation"("sub_wallet_id");
