import { Controller, Injectable, Post } from '@nestjs/common';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { Service } from "aws-sdk";
import * as bs58 from "bs58";
import * as bip39 from "bip39";
import { KeyPair } from 'aws-sdk/clients/opsworkscm';
import { DbService } from '../../../core/db/db.service';
import { createSecureServer } from 'http2';
import { UserDto } from '../models/user.dto';
import { ConnectionService } from '../../connection/service/connection.service';
import { CompletedDto } from '../../../core/models/default-dto';
@Injectable()
export class UserService {
    constructor(private dbService: DbService,private conService:ConnectionService) {

    }
   async createUser(userDto:UserDto){
        const create_user :UserDto= await this.dbService.user.create({data:{
            user_name : userDto.user_name,
             e_mail: userDto.e_mail,
             password:userDto.password
        }});

        return {completed:true};
    }

    async userCreatesMainWallet(user_id:number){
        const wallet_creation = await this.conService.createWallet();
        const add_relation = await this.dbService.user_wallet_relation.create({
            data:{
                mainwallet_id:wallet_creation.main_wallet_id
            }
        })
    }

    async userCreatesSubWallet(mainwallet_id:number,user_wallet_relation_id:number){
        //önce bir sub wallet yaratıp sonra da bunu user_wallet_relation tablosuna ekler
    }
}
