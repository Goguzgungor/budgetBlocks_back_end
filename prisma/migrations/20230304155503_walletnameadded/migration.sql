-- CreateTable
CREATE TABLE "main_wallet" (
    "id" SERIAL NOT NULL,
    "balance" DECIMAL,
    "main_wallet_name" VARCHAR(20),
    "main_wallet_id" INTEGER,

    CONSTRAINT "main_wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "main_wallet_blockchain" (
    "id" SERIAL NOT NULL,
    "balance" DECIMAL,
    "nmemonic_phrase" VARCHAR(100),

    CONSTRAINT "main_wallet_blockchain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_wallet" (
    "id" SERIAL NOT NULL,
    "balance" DECIMAL,
    "sub_wallet_blockchain_id" INTEGER,
    "max_val" DECIMAL,
    "sub_wallet_name" VARCHAR(20),

    CONSTRAINT "sub_wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_wallet_blockchain" (
    "id" SERIAL NOT NULL,
    "balance" DECIMAL,
    "nmemonic_phrase" VARCHAR(100),

    CONSTRAINT "sub_wallet_blockchain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_wallet_user" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(50),
    "e-mail" VARCHAR(50),
    "password" VARCHAR(50),
    "wallet_id" INTEGER NOT NULL,

    CONSTRAINT "sub_wallet_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "balance" DECIMAL,
    "status" VARCHAR(50),
    "user_wallet_relation_id" INTEGER,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(50),
    "e-mail" VARCHAR(50),
    "password" VARCHAR(50),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_wallet_relation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "mainwallet_id" INTEGER,
    "sub_wallet_id" INTEGER,

    CONSTRAINT "user_wallet_relation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sub_wallet_user_wallet_id_key" ON "sub_wallet_user"("wallet_id");

-- AddForeignKey
ALTER TABLE "sub_wallet_user" ADD CONSTRAINT "sub_wallet_user_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "sub_wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "FK_transaction.user_wallet_relation_id" FOREIGN KEY ("user_wallet_relation_id") REFERENCES "user_wallet_relation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_wallet_relation" ADD CONSTRAINT "FK_user_wallet_relation.mainwallet_id" FOREIGN KEY ("mainwallet_id") REFERENCES "main_wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_wallet_relation" ADD CONSTRAINT "FK_user_wallet_relation.sub_wallet_id" FOREIGN KEY ("sub_wallet_id") REFERENCES "sub_wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_wallet_relation" ADD CONSTRAINT "FK_user_wallet_relation.user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
