import { Controller, Injectable, Post } from '@nestjs/common';
import * as bip39 from "bip39";
import { DbService } from '../../../core/db/db.service';
import { UserDto, RelationDto, UserCreatesSubWalletDto, SendTransactionDto, PendingTransactinDto, SendSubTransactionDto } from '../models/user.dto';
import { ConnectionService } from '../../connection/service/connection.service';
import { CompletedDto } from '../../../core/models/default-dto';
import { HttpError } from '../../../core/validations/exception';
import { Decimal } from '@prisma/client/runtime';
import { TransactionDto } from '../../connection/models/connection.dto';
import { hdkey } from 'ethereumjs-wallet';
import Web3 from 'web3';
const { ethers } = require('ethers');
import { goerliRpcUrl } from 'src/core/constant/constants';
@Injectable()
export class UserService {

    constructor(private dbService: DbService, private conService: ConnectionService) {

    }
    async createUser(userDto: UserDto) {
        const create_user: UserDto = await this.dbService.user.create({
            data: {
                user_name: userDto.user_name,
                e_mail: userDto.e_mail,
                password: userDto.password
            }
        });

        return create_user;
    }

    async makeTransactionMainWallet(tranDto:SendTransactionDto){
        const resp = await this.dbService.main_wallet_blockchain.findFirst({
            where:{
                id:tranDto.mainwallet_id
            }

        })
        const transactionObject:TransactionDto={
            mnemonic: resp.nmemonic_phrase,
            reciver_public_key: tranDto.reciver_public_key,
            balance: tranDto.balance*1000000000
        }

        const transaction =await this.conService.transferTransaction(transactionObject);
        return {transaction_id:transaction};
    }

    async makeTransactionSubWallet(tranDto:SendSubTransactionDto){
        const resp = await this.dbService.sub_wallet.findFirst({
            where:{
                id:tranDto.mainwallet_id
            }

        })
        const transactionObject:TransactionDto={
            mnemonic: resp.nmemonic_phrase,
            reciver_public_key: tranDto.reciver_public_key,
            balance: tranDto.balance*10000
        }

        const transaction =await this.conService.transferTransaction(transactionObject);
        return {transaction_id:transaction};
    }

    async userCreatesMainWallet(user_idd: number) {

        const wallet_creation = await this.conService.createWallet();
        const update_user = await this.dbService.user.update({
            where:{
                id:user_idd
            },data:{
             mainwallet_id:wallet_creation.main_wallet_id   
            }
        })
        const balance = await this.conService.mnemonicToGetBalance(wallet_creation.mnemonic);
        console.log(balance);
        
        const split_mnemonic = wallet_creation.mnemonic.split(" ");
        const return_object = { 'mnemonic': split_mnemonic, 'mainwallet_id': wallet_creation.main_wallet_id,public_key:wallet_creation.publicKey
    }
        return return_object;
    }


    async showWalletBalace(mainwallet_id: number) {
        let sql = `select mwb.nmemonic_phrase,mwb.id,mw.id from main_wallet mw
        join main_wallet_blockchain mwb on mw.main_wallet_id = mwb.id
        where mw.id = ${mainwallet_id};`;

        const resp = await this.dbService.$queryRawUnsafe(sql);
        const mnemonic: string = resp[0].nmemonic_phrase
        console.log(mnemonic);
        const balance = await this.conService.mnemonicToGetBalance(mnemonic);
        return balance;
    }
    async showSubWalletBalance(subwallet_id: number) {

        const resp = await this.dbService.sub_wallet.findUnique({where:{
            id:subwallet_id
        },select:{
            nmemonic_phrase:true
        }})
        const mnemonic: string = resp.nmemonic_phrase
        console.log(mnemonic);
        const balance = await this.conService.mnemonicToGetBalance(mnemonic);
        return balance;
    }

    async login(user: UserDto) {

        try {

            const sub_user_query = await this.dbService.sub_wallet.findFirst({
                where: {
                    user_name: user.user_name,
                    password: user.password
                }
            })
            if (sub_user_query != null) {
                return { data: sub_user_query, type: 'subwallet' };
            }
        } catch (error) {
            console.log(error);

        }
        try {
            const sql = `select u.id,u.user_name,u."e-mail",u.password,mw.id as mainwallet_id,mwb."publicKey"
            from "user" u
           left join main_wallet mw on u.mainwallet_id = mw.id
            left join main_wallet_blockchain mwb on mw.main_wallet_id = mwb.id where (u.password = '${user.password}') and (u.user_name = '${user.user_name}') limit 1;`;
            const main_wallet_query: any[] = await this.dbService.$queryRawUnsafe(sql);
            console.log(main_wallet_query);
            
            if (main_wallet_query.length) {
                return { data:main_wallet_query[0], type: 'mainwallet'};
            }
        } catch (error) {
            console.log(error);

        }
        return { message: 'Cannot found the user' };
    }

    async pendingTransaction(item: PendingTransactinDto) {
        const relation_id = await this.dbService.user_wallet_relation.findFirst({
            where:{
                sub_wallet_id:item.user_id
            },
            select:{
                id:true
            }
        })
        console.table(relation_id);
        
        const create_status = await this.dbService.transaction.create({
            data:{
                balance:item.balance,
                status:'WAITING',
                receiver_pub_key: item.reciver_public_key,
                user_wallet_relation_id:relation_id.id
            }
        })
        return create_status;
    }
    async userCreatesSubWallet(item: UserCreatesSubWalletDto) {

        const wallet_creation = await this.createSubWallet(item);

        const add_relation = await this.dbService.user_wallet_relation.create({
            data: {
                mainwallet_id:item.relation_obj.mainwallet_id,
                user_id:item.relation_obj.user_id,
                sub_wallet_id:wallet_creation.sub_wallet_id
            }
        });
        return add_relation;
    }
    async getTransactionList(user_id:number) {

       const sql=`select  t.*,sw.sub_wallet_name,sw.id as sub_wallet_id from transaction t
       join user_wallet_relation uwr on t.user_wallet_relation_id = uwr.id
       join "user" u on uwr.user_id = u.id
       join sub_wallet sw on uwr.sub_wallet_id = sw.id where u.id=${user_id};`
       const query = this.dbService.$queryRawUnsafe(sql);
       return query;
    }
    async createSubWallet(item: UserCreatesSubWalletDto) {

        const provider = new Web3(goerliRpcUrl);
        const wallet  = ethers.Wallet.createRandom();

        // Mnemonic ifadeyi elde et
        const mnemonic = wallet.mnemonic.phrase;
      
        // Cüzdanın public anahtarını elde et
        const public_key = wallet.address;
      
        console.log(public_key);
        const create_sub_wallet = await this.dbService.sub_wallet.create({data:{
            balance:item.balance,
            nmemonic_phrase: mnemonic,
            blockchain_balance:0,
            public_key:public_key,
            user_name:item.user_name,
            password:item.password,
            sub_wallet_name:item.sub_wallet_name,
        }});
        const find_sub_wallet = await this.dbService.sub_wallet.findFirst({where:{
            public_key:public_key
        }});
        console.table(find_sub_wallet);
        
        
        return {
            mnemonic:mnemonic,sub_wallet_id:create_sub_wallet.id
        }
    }
    async getSubWalletList(user_id:number){
        let sql = `select sw.public_key,sw.sub_wallet_name,sw.balance,uwr.id  as relation_id from user_wallet_relation uwr
        join "user" u on u.id = uwr.user_id
         join sub_wallet sw on uwr.sub_wallet_id = sw.id
        where u.id =${user_id};`;

        const resp = await this.dbService.$queryRawUnsafe(sql);
        
        return resp;
    }




    async acceptTransactions(transaction_id:number){

        const resp = await this.dbService.transaction.update({
            where:{
                id:transaction_id
            },data:{
                status:'ACCEPTED'
            }
        });

        const sql = `UPDATE sub_wallet sw
        SET balance = sw.balance-${resp.balance}
        FROM user_wallet_relation uwr
        JOIN transaction t ON t.user_wallet_relation_id = uwr.id
        WHERE uwr.sub_wallet_id = sw.id AND t.id = ${transaction_id};`;

        const update=await this.dbService.$queryRawUnsafe(sql);
        
        return resp;
    }

}
