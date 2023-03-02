import { Controller, Injectable, Post } from '@nestjs/common';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { Service } from "aws-sdk";
import * as bs58 from "bs58";
import { KeyPairDto, MnemonicDto, TransactionDto, TransactionnDto, UserWalletRelationDto } from '../models/connection.dto';
import * as bip39 from "bip39";
import { KeyPair } from 'aws-sdk/clients/opsworkscm';
import { DbService } from '../../../core/db/db.service';








@Injectable()
export class ConnectionService {
    constructor(private dbService: DbService) {
        
    }
    createorReplaceWallet() {

    }

    async showBalance(publicKey:string){
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        let wallet = new PublicKey(publicKey);
        let balance = await connection.getBalance(wallet);
    console.log(`${balance / LAMPORTS_PER_SOL} SOL`);
    return {balance:`${balance} LAMPORTS`};
    }
    async createWallet() {
        const connection = new Connection('https://api.devnet.solana.com');
        const mnemonic = bip39.generateMnemonic();
        const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
        const keypair = Keypair.fromSeed(seed.slice(0, 32));
        const create_main_wallet_blockchain = await this.dbService.main_wallet_blockchain.create({data:{
            balance:100,
            nmemonic_phrase: mnemonic,
        }});
        
        const create_main_wallet = await this.dbService.main_wallet.create({data:{
            balance:100,
            main_wallet_id: create_main_wallet_blockchain.id
        }});
        
        return {
            mnemonic:mnemonic,main_wallet_id:create_main_wallet.id
        }
    }
    async generateKeyPair() {
        const mainAccount: Keypair = await Keypair.generate();
        const publicKey: string = mainAccount.publicKey.toBase58();
        const secretKey = mainAccount.secretKey
        return { mainAccount };
    }

    async transferTransaction(transaction: TransactionDto) {

        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

        const keyPair: Keypair = await this.importMnemonic(transaction.mnemonic)
        const transferTransaction = await new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: keyPair.publicKey,
                toPubkey: new PublicKey(transaction.reciver_public_key),
                lamports: transaction.balance,
            })
        );
        await sendAndConfirmTransaction(connection, transferTransaction, [
            keyPair
        ])

    }
    
    importWallet(mnemonic: MnemonicDto) {

        const seed = bip39.mnemonicToSeedSync(mnemonic.mnemonic, ""); // (mnemonic, password)
        const mainAccount = Keypair.fromSeed(seed.slice(0, 32));
        const publicKey: string = mainAccount.publicKey.toBase58();
        const privateKey: string = bs58.encode(mainAccount.secretKey);
        return { publicKey, privateKey };
    }
    async importMnemonic(mnemonic: string): Promise<Keypair> {

        const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
        const mainAccount = await Keypair.fromSeed(seed.slice(0, 32));
        return mainAccount;

    }

    async generateSeed() {
        const mnemonic = await bip39.generateMnemonic();
        const seed = await bip39.mnemonicToSeed(mnemonic);
        return seed.slice(0, 32);
    }

    async requestAirDrop(keypair:Keypair){
        
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL
  );

  await connection.confirmTransaction(airdropSignature);

    }


 async createSubWallet() {
        const connection = new Connection('https://api.devnet.solana.com');
        const mnemonic = bip39.generateMnemonic();
        const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
        const keypair = Keypair.fromSeed(seed.slice(0, 32));
        console.log(`${keypair.publicKey.toBase58()}`);
        this.requestAirDrop(keypair);
        const create_sub_wallet_blockchain = await this.dbService.sub_wallet_blockchain.create({data:{
            balance:100,
            nmemonic_phrase: mnemonic,
        }});
        
        const create_main_wallet = await this.dbService.sub_wallet.create({data:{
            balance:100,
            sub_wallet_blockchain_id: create_sub_wallet_blockchain.id
        }});
        
        return {
            mnemonic
        }
    }

    async userWalletRelationCreate(relation:UserWalletRelationDto){

        const create= await  this.dbService.user_wallet_relation.create({
            data:{
                user_id:relation.user_id,
                mainwallet_id:relation.mainwallet_id,
                sub_wallet_id:relation.sub_wallet_id,
            }
        })
    }
    

    sendTransactionRequest(transaction:TransactionnDto){

    }

}


