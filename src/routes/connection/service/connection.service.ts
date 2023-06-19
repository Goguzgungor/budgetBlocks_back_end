import { Controller, Injectable, Post } from '@nestjs/common';

import { Service } from "aws-sdk";
import * as bs58 from "bs58";
import { KeyPairDto, MnemonicDto, TransactionDto, TransactionnDto, SubWalletUpdateDto, UserWalletRelationDto } from '../models/connection.dto';
import * as bip39 from "bip39";
import Web3 from 'web3';
import { DbService } from '../../../core/db/db.service';
import { CompletedDto } from '../../../core/models/default-dto';
import { goerliRpcUrl } from '../../../core/constant/constants';
import Wallet from 'ethereumjs-wallet';
const { ethers } = require('ethers');







@Injectable()
export class ConnectionService {
    constructor(private dbService: DbService) {
        
    }
    createorReplaceWallet() {

    }

    async showBalance(publicKey) {
        const web3 = new Web3(goerliRpcUrl);
        let balance = await web3.eth.getBalance(publicKey);
        console.log(`${web3.utils.fromWei(balance, 'ether')} TOMO`);
        return { balance: `${balance} WEI` };
    }
    async createWallet() {
        const provider = new Web3(goerliRpcUrl);
        const wallet  = ethers.Wallet.createRandom();

        // Mnemonic ifadeyi elde et
        const mnemonic = wallet.mnemonic.phrase;
      
        // Cüzdanın public anahtarını elde et
        const public_key = wallet.address;
      
    
    // İlk cüzdanı al
        const create_main_wallet_blockchain = await this.dbService.main_wallet_blockchain.create({data:{
            balance:0.0,
            nmemonic_phrase: mnemonic,
            publicKey:public_key
        }});
        
        const create_main_wallet = await this.dbService.main_wallet.create({data:{
            balance:0.0,
            main_wallet_id: create_main_wallet_blockchain.id
        }});
        
        return {
            mnemonic:mnemonic,main_wallet_id:create_main_wallet.id,publicKey:public_key
        }
    }
     getPrivateKeyFromMnemonic(mnemonic) {
        const provider = new Web3(goerliRpcUrl);

        // Mnemonic ifadeyi kullanarak bir cüzdan oluştur
        const wallet = ethers.Wallet.fromPhrase(mnemonic);
      
        // Cüzdandan özel anahtarı elde et
        const privateKey = wallet.privateKey;
      
        return privateKey;
      }
      async  transferTransaction(transaction:TransactionDto) {
        const web3 = new Web3(goerliRpcUrl);
        
        // Import the private key for the sender's account
        const private_key = this.getPrivateKeyFromMnemonic(transaction.mnemonic);
        const senderAccount = web3.eth.accounts.privateKeyToAccount(private_key);
      
        // Send the transaction
        const tx = {
          from: senderAccount.address,
          to: transaction.reciver_public_key,
          value: transaction.balance*10000000
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
     




    async userWalletRelationCreate(relation:UserWalletRelationDto){

        const create= await  this.dbService.user_wallet_relation.create({
            data:{
                user_id:relation.user_id,
                mainwallet_id:relation.mainwallet_id,
                sub_wallet_id:relation.sub_wallet_id,
            }
        })
    }
    
    async getBalance(pubKey:string):Promise<string>{
        const web3 = new Web3(goerliRpcUrl);
        let balance:string = await web3.eth.getBalance(pubKey);
        return balance;
    }
    
    
    async  mnemonicToGetBalance(mnemonic:string):Promise<string>{
        const web3 = new Web3(goerliRpcUrl);
        const private_key = this.getPrivateKeyFromMnemonic(mnemonic);
        const account = web3.eth.accounts.privateKeyToAccount(private_key);
        const publicKey = account.address;
        let balance = await web3.eth.getBalance(publicKey);
        console.log(`${web3.utils.fromWei(balance, 'ether')} TOMO`);
        return balance;
        //return await this.getBalance(publicKey);
        
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
}


