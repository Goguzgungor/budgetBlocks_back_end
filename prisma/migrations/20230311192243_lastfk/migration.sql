-- AlterTable
ALTER TABLE "user" ADD COLUMN     "mainwallet_id" INTEGER;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "FK_user_wallet_relation.mainwallet_id" FOREIGN KEY ("mainwallet_id") REFERENCES "main_wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
