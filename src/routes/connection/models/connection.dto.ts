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
    @ApiProperty({ type: String, required: true, example:'74e0b9293f0f80f2549769f73ecc028e67071982762d2a41754c51c2657af74a'})
    private_key: string;

    @ApiProperty({ type: String, required: true, example:'0x474B661ac68B304f6f1CaFeb862023F33D500d24'})
    reciver_public_key: string;


    @ApiProperty({ type: Number, required: true, example:1000000000000000})
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
