import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime";
import { PublicKey } from "@solana/web3.js";
import { String } from "aws-sdk/clients/batch";

export class KeyPairDto{
    publicKey: string;
    secretKey:string;
}
export class MnemonicDto{
    @ApiProperty({ type: MnemonicDto, required: true, example:'above dwarf insect candy green gather venture gaze glare spirit casino among'})
    mnemonic: string;
}
export class TransactionDto{
    @ApiProperty({ type: String, required: true, example:'above dwarf insect candy green gather venture gaze glare spirit casino among'})
    mnemonic: string;

    @ApiProperty({ type: String, required: true, example:'8WjXrdfsLKt9kk58w3AHMLdm4GNigRW3ub8SHy88KSTp'})
    reciver_public_key: string;


    @ApiProperty({ type: Number, required: true, example:10000})
    balance:number;
}
export class UserWalletRelationDto{

    @ApiProperty({ type: String, required: true, example:1})
    id:number;


    @ApiProperty({ type: String, required: true, example:1})
    user_id:number;


    @ApiProperty({ type: String, required: true, example:1})
    mainwallet_id:number;


    @ApiProperty({ type: String, required: true, example:1})
    sub_wallet_id:number;

}
export class TransactionnDto{


    @ApiProperty({ type: String, required: true, example:1})
    id:number;

    @ApiProperty({ type: String, required: true, example:2.00})
    balance:Decimal;

    @ApiProperty({ type: String, required: true, example:'WAITING'})
    status:string;


    @ApiProperty({ type: String, required: true, example:1})
    user_wallet_relation_id:number;

}
export class SubWalletUpdateDto{
    @ApiProperty({ type:Number, required: true, example:1})
    id:number;

    @ApiProperty({ type: Decimal, required: true, example:2.00})
    max_val:Decimal;

    @ApiProperty({ type: String, required: true, example:'my vallet name'})
    sub_wallet_name:String;

}
