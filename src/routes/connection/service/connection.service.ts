import { Controller, Injectable, Post } from '@nestjs/common';
import { ConfirmedSignatureInfo, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { Service } from "aws-sdk";
import * as bs58 from "bs58";
import { KeyPairDto, MnemonicDto, TransactionDto, TransactionnDto, SubWalletUpdateDto, UserWalletRelationDto } from '../models/connection.dto';
import * as bip39 from "bip39";
import { DbService } from '../../../core/db/db.service';
import { CompletedDto } from '../../../core/models/default-dto';
import { Elusiv, SEED_MESSAGE, TokenType } from '@elusiv/sdk';
import { CLUSTER, DEVNET_RPC_URL, publickey_test } from 'src/core/test_constant/example_value';
import { log } from 'console';
import { sign } from 'crypto';








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
        const keypair:Keypair = Keypair.fromSeed(seed.slice(0, 32));
        const public_key :string = keypair.publicKey.toBase58();
        const create_main_wallet_blockchain = await this.dbService.main_wallet_blockchain.create({data:{
            balance:0.0,
            nmemonic_phrase: mnemonic,
            publicKey:public_key
        }});
        
        const create_main_wallet = await this.dbService.main_wallet.create({data:{
            balance:0.0,
            main_wallet_id: create_main_wallet_blockchain.id
        }});
        const array= Uint8Array.from(seed);
        console.log(array);
        
        return {
            mnemonic:mnemonic,main_wallet_id:create_main_wallet.id,publicKey:public_key
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
                lamports: transaction.balance  ,
            })
        );
         const signature:string = await sendAndConfirmTransaction(connection, transferTransaction, [
            keyPair
        ])
        return signature;
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
    async getBalance(pubKey:PublicKey){
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        let accountBalance : number=  await connection.getBalance(pubKey) / LAMPORTS_PER_SOL; 
        console.log(accountBalance);
        return accountBalance;
    }
    
    
    async  mnemonicToGetBalance(mnemonic:string):Promise<number>{
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        const seed = await bip39.mnemonicToSeed(mnemonic);
        // Derive a keypair from the seed
        const keypair = Keypair.fromSeed(seed.slice(0, 32));
        // Get the public key
        const publicKey = keypair.publicKey;
        const balance = await this.getBalance(publicKey);
        console.log(publicKey);
        return balance;
        //return await this.getBalance(publicKey);
        
    }
    async  mnemonicToPubKey(mnemonic:string):Promise<string>{
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        const seed = await bip39.mnemonicToSeed(mnemonic);
        // Derive a keypair from the seed
        const keypair = Keypair.fromSeed(seed.slice(0, 32));
        // Get the public key
        const publicKey = keypair.publicKey.toBase58();
        return publicKey;
        
    }
    async  mnemonicToKeyPair(mnemonic:string):Promise<Keypair>{
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        const seed = await bip39.mnemonicToSeed(mnemonic);
        // Derive a keypair from the seed
        const keypair:Keypair = Keypair.fromSeed(seed.slice(0, 32));
        // Get the public key
        return keypair;
        
    }

    async updateSubWallet(item:SubWalletUpdateDto):Promise<CompletedDto>{
        const update = await this.dbService.sub_wallet.update({
            where:{
                id:item.id
            },
            data:{
                max_val:item.max_val,
                sub_wallet_name:item.sub_wallet_name
            }
        });
        return {completed:true};
    }


    async sendElusiv(
        elusiv: Elusiv,
        recipient: PublicKey,
        amount: number,
        tokenType: TokenType,
    ): Promise<ConfirmedSignatureInfo> {
        
        // Build the send transaction
        const sendTx = await elusiv.buildSendTx(amount, recipient, tokenType);
        // Send it off!
        return  await elusiv.sendElusivTx(sendTx);
    }

    async elusivCreater(publicKey:string,string_seed : string) {
        // Helper function for generating the elusiv instance
        // THIS IS NOT PART OF THE SDK, check boilerplate.ts to see what exactly it does.
        const seed_temp = bip39.mnemonicToSeedSync(string_seed, ""); // (mnemonic, password)
        const seed:Uint8Array= Uint8Array.from(seed_temp);
        const keypair_created :Keypair = await  this.mnemonicToKeyPair(string_seed);
        const { elusiv} = await this.getParams(keypair_created,seed);
    
        // Fetch our current private balance
        const topupTxData = await elusiv.buildTopUpTx(0.3*LAMPORTS_PER_SOL, 'LAMPORTS');
         topupTxData.tx.partialSign(keypair_created);
         const storeSig = await elusiv.sendElusivTx(topupTxData);
        const privateBalance = await elusiv.getLatestPrivateBalance('LAMPORTS');
        
        console.log('Current private balance: ', privateBalance);
    
        // Can't send without a private balance
        if (privateBalance > BigInt(0)) {
            console.log("kesinlikle buraya girdi");
            
            // Send half a SOL
            const sig = await this.sendElusiv(
                elusiv,
                new PublicKey(publicKey),
                0.3*LAMPORTS_PER_SOL,
                'LAMPORTS',
            );
            console.log(`Send complete with sig ${sig.signature}`);
            return sig.signature;
        }
        else {
            throw new Error("Can't send from an empty private balance");
        }
    }

    async  getParams(keypair:Keypair,seed : Uint8Array): Promise<{
        elusiv: Elusiv;
        keypair: Keypair;
        conn: Connection;
    }> {
        // Connect to devnet
        const conn = new Connection('https://api.devnet.solana.com');
    
        // Create the elusiv instance
        const elusiv = await Elusiv.getElusivInstance(
            seed,
            keypair.publicKey,
            conn,
            CLUSTER,
        );
    
        return { elusiv, keypair, conn };
    }
    
}


