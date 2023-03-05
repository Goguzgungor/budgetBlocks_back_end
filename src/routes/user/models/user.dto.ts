import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime";
import { PublicKey } from "@solana/web3.js";
import { String } from "aws-sdk/clients/batch";
import { TransactionDto } from '../../connection/models/connection.dto';

export class UserDto {

    @ApiProperty({ type: String, required: true, example: 1 })
    id: number;
    @ApiProperty({ type: String, required: true, example: 'user_name' })
    user_name: string;

    @ApiProperty({ type: String, required: true, example: 'e_mail' })
    e_mail: string;

    @ApiProperty({ type: String, required: true, example: 'password' })
    password: string;

}
export class RelationRequestDto {

    @ApiProperty({ type: String, required: true, example: 1 })
    user_id: number;

    @ApiProperty({ type: String, required: true, example: 1 })
    mainwallet_id: number;
    
}
export class SendTransactionDto {
    
    @ApiProperty({ type: String, required: true, example: 1 })
    reciver_public_key:string;
    @ApiProperty({ type: Number, required: true, example: 1 })
    balance:number;
    
    @ApiProperty({ type: Number, required: true, example: 1 })
    mainwallet_id:number;
    
}
export class SendAcceptTransactionDto {
    
    @ApiProperty({ type: String, required: true, example: 1 })
    reciver_public_key:string;
    @ApiProperty({ type: Number, required: true, example: 1 })
    balance:number;
    
    @ApiProperty({ type: Number, required: true, example: 1 })
    mainwallet_id:number;
    
    @ApiProperty({ type: Number, required: true, example: 1 })
    transaction_id:number;
}
export class PendingTransactinDto {
    
    @ApiProperty({ type: String, required: true, example: 1 })
    reciver_public_key:string;
    @ApiProperty({ type: Number, required: true, example: 1 })
    balance:number;
    @ApiProperty({ type: Number, required: true, example: 1 })
    user_id:number;
    
}
export class RelationDto {

    @ApiProperty({ type: String, required: true, example: 1 })
    id: number;
    @ApiProperty({ type: String, required: true, example: 1 })
    user_id: number;

    @ApiProperty({ type: String, required: true, example: 1 })
    mainwallet_id: number;

    @ApiProperty({ type: String, required: true, example: 1 })
    sub_wallet_id: number;

}

export class UserCreatesSubWalletDto {

    @ApiProperty({ type: String, required: true, example: "user_name" })
    user_name: string;
    
    @ApiProperty({ type: String, required: true, example: "password" })
    password: string;

    @ApiProperty({ type: Decimal, required: true, example: 10 })
    balance: Decimal;

    @ApiProperty({ type: String, required: true, example: "Example Sub Wallet" })
    sub_wallet_name: string;

    @ApiProperty({ type: RelationRequestDto, required: true, example:  RelationRequestDto})
    relation_obj: RelationRequestDto;
    
}


