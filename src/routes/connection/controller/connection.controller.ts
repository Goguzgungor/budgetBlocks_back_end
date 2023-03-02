import { Body, Controller, Param, Query } from "@nestjs/common";
import { ConnectionService } from '../service/connection.service';
import { ApiTags } from "@nestjs/swagger";
import { ApiGet, ApiPost } from "src/core/models/default.route.decorator";
import { MnemonicDto, TransactionDto } from '../models/connection.dto';
import { DbService } from '../../../core/db/db.service';


@ApiTags('Connection')
@Controller('/connection')
export class ConnectionController{
    constructor(private service:ConnectionService) {

        
    }
    
    @ApiGet('create','Bir cüzdan yaratıp, public ve private key getirir.')
    async createWallet(){
        return await this.service.createWallet();
    }



    @ApiPost('import','Var olan bir cüzdanı bağlar')
    async importWallet(@Body() mnemonic:MnemonicDto){
        const resp = await this.service.importWallet(mnemonic);
        return resp;
    }
    @ApiPost('transaction','2 hesap arasında transaction yapar')
    async transaction(@Body() transaction:TransactionDto){
        const resp = await this.service.transferTransaction(transaction);
        return resp;
    }
    @ApiGet('/transaction/:publicKey','2 hesap arasında transaction yapar')
    async showBalance(@Query('publicKey') publicKey:string){
        const resp = await this.service.showBalance(publicKey);
        return resp;
    }
}
