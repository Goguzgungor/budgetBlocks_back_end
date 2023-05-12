import { Controller, Injectable, Post } from '@nestjs/common';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import * as bs58 from "bs58";
import { KeyPairDto, MnemonicDto, TransactionDto, TransactionnDto, SubWalletUpdateDto, UserWalletRelationDto } from '../models/connection.dto';
import * as bip39 from "bip39";
import { DbService } from '../../../core/db/db.service';
import { CompletedDto } from '../../../core/models/default-dto';
import Web3 from 'web3';
import { goerliRpcUrl } from '../../../core/constant/constants';
import { get } from 'http';









@Injectable()
export class ConnectionService {
    constructor(private dbService: DbService) {

    }

    createorReplaceWallet() {
        ;

    }

    async showBalance(publicKey) {
        const web3 = new Web3(goerliRpcUrl);
        let balance = await web3.eth.getBalance(publicKey);
        console.log(`${web3.utils.fromWei(balance, 'ether')} TOMO`);
        return { balance: `${balance} WEI` };
    }




    async createWallet() {
        const web3 = new Web3(goerliRpcUrl);

        // Rastgele bir özel anahtar oluştur
        const privateKey = web3.eth.accounts.create().privateKey;

        // Özel anahtardan hesap adresi türet
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        const publicKey = account.address;

        console.log('Private key: ', privateKey);
        console.log('Public key: ', publicKey);
        const create_main_wallet_blockchain = await this.dbService.main_wallet_blockchain.create({
            data: {
                balance: 0.0,
                private_key: privateKey,
                publicKey: publicKey
            }
        });

        const create_main_wallet = await this.dbService.main_wallet.create({
            data: {
                balance: 0.0,
                main_wallet_id: create_main_wallet_blockchain.id
            }
        });

        return {
            mnemonic: privateKey, main_wallet_id: create_main_wallet.id, publicKey: publicKey
        }
    }

    async  transferTransactioneth(transaction:TransactionDto) {
        const web3 = new Web3(goerliRpcUrl);
        
        // Import the private key for the sender's account
        const senderAccount = web3.eth.accounts.privateKeyToAccount(transaction.private_key);
      
        // Send the transaction
        const tx = {
          from: senderAccount.address,
          to: transaction.reciver_public_key,
          value: transaction.balance
        };
        const gas = await web3.eth.estimateGas(tx);
        const gasPrice = await web3.eth.getGasPrice();
        const nonce = await web3.eth.getTransactionCount(senderAccount.address);
        const signedTx = await senderAccount.signTransaction({
          ...tx,
          gas,
          gasPrice,
          nonce,
        });
        const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return txReceipt.transactionHash;
      }




    async userWalletRelationCreate(relation: UserWalletRelationDto) {

        const create = await this.dbService.user_wallet_relation.create({
            data: {
                user_id: relation.user_id,
                mainwallet_id: relation.mainwallet_id,
                sub_wallet_id: relation.sub_wallet_id,
            }
        })
    }

    async getBalance(pubKey: PublicKey) {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        let accountBalance: number = await connection.getBalance(pubKey) / LAMPORTS_PER_SOL;
        console.log(accountBalance);
        return accountBalance;
    }



    async privateKeyToBalance(privateKey: string): Promise<string> {
        const web3 = new Web3(goerliRpcUrl);
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        const publicKey = account.address;
        let balance = await web3.eth.getBalance(publicKey);
        console.log(`${web3.utils.fromWei(balance, 'ether')} TOMO`);
        return balance;
    }

    async updateSubWallet(item: SubWalletUpdateDto): Promise<CompletedDto> {
        const update = await this.dbService.sub_wallet.update({
            where: {
                id: item.id
            },
            data: {
                max_val: item.max_val,
                sub_wallet_name: item.sub_wallet_name
            }
        });
        return { completed: true };
    }
}


