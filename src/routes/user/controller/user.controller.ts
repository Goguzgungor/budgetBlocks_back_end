import { Body, Controller, Param, ParseIntPipe, Query } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";
import { ApiGet, ApiPost } from "src/core/models/default.route.decorator";
import { DbService } from '../../../core/db/db.service';
import { UserService } from "../service/user.service";
import { UserDto, RelationDto, UserCreatesSubWalletDto, SendTransactionDto, PendingTransactinDto, SendAcceptTransactionDto } from '../models/user.dto';


@ApiTags('User')
@Controller('/user')
export class UserController {
    constructor(private service: UserService) { }

    @ApiPost('create', 'Bir user yaratır.')
    async createUser(@Body() userDto: UserDto) {
        const resp = await this.service.createUser(userDto);
        return resp;
    }

    @ApiGet('create/userwallet/:user_id','Kullanıcı için bir cüzdan yaratır')
    async createWalletforUser(@Param('user_id', ParseIntPipe) user_id:number){
        const resp = await this.service.userCreatesMainWallet(user_id)
        return resp;
    }

    @ApiGet('/balance/:mainwallet_id','Gets Wallet Balance')
    async getWalletUserBalance(@Param('mainwallet_id', ParseIntPipe) mainwallet_id:number){
        const resp = await this.service.showWalletBalace(mainwallet_id)
        return {balance:resp};
    }
    @ApiGet('/balance/subwallet/:subwallet_id','Gets Wallet Balance')
    async getSubWalletUserBalance(@Param('subwallet_id', ParseIntPipe) subwallet_id:number){
        const resp = await this.service.showSubWalletBalance(subwallet_id)
        return resp;
    }
    @ApiPost('/login','Make database query for login action')
    async login(@Body() user:UserDto){
        const resp= await this.service.login(user);
        
        return resp;
        
    }
    @ApiPost('/create/subwallet','User creates subwallet')
    async userCreatesSubWallet(@Body() item:UserCreatesSubWalletDto){
        const resp= await this.service.userCreatesSubWallet(item);
        return resp;
    }


    
    @ApiPost('/create/pendingtransaction','User creates subwallet')
    async pendingTransaction(@Body() item:PendingTransactinDto){
        const resp= await this.service.pendingTransaction(item);
        return resp;
    }



    @ApiGet('/subwallet/list/:user_id','User creates subwallet')
    async getSubWalletList(@Param('user_id', ParseIntPipe) user_id:number){
        const resp= await this.service.getSubWalletList(user_id);
        return resp;
    }
    
    @ApiPost('/mainwallet/transaction/send','User creates subwallet')
    async sendTransaction(@Body() transacDto:SendTransactionDto){
        const resp= await this.service.makeTransactionMainWallet(transacDto);
        return resp;
        
    }
    
        @ApiGet('/subwallet/transactionlist/:user_id','User creates subwallet')
        async getTransactionList(@Param('user_id', ParseIntPipe) user_id:number){
            const resp= await this.service.getTransactionList(user_id);
            return resp;
        }
    
        @ApiPost('/transactions/accept','User creates subwallet')
        async acceptTransactions(@Body() transacDto:SendAcceptTransactionDto){
            const tran= await this.service.makeTransactionMainWallet(transacDto);
            const accept= await this.service.acceptTransactions(transacDto.transaction_id);
            return tran;
        }


}
