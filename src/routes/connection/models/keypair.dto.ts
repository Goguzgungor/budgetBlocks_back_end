import { ApiProperty } from "@nestjs/swagger";
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


    @ApiProperty({ type: String, required: true, example:10000})
    balance:number;
}