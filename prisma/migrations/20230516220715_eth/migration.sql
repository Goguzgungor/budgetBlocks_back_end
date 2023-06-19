-- AlterTable
ALTER TABLE "main_wallet_blockchain" ALTER COLUMN "nmemonic_phrase" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "publicKey" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "sub_wallet" ALTER COLUMN "nmemonic_phrase" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "user_name" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "public_key" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "receiver_pub_key" SET DATA TYPE VARCHAR(200);
