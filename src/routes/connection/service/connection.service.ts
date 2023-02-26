import { Controller, Injectable } from "@nestjs/common";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { Service } from "aws-sdk";
import * as bs58 from "bs58";
import { KeyPairDto, MnemonicDto, TransactionDto } from '../models/keypair.dto';
import * as bip39 from "bip39";
import { KeyPair } from 'aws-sdk/clients/opsworkscm';








@Injectable()
export class ConnectionService {
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
        console.log(`${keypair.publicKey.toBase58()}`);
        this.requestAirDrop(keypair);
        return {
            mnemonic
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


}


