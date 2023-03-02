import { ApiProperty } from "@nestjs/swagger";
import { PublicKey } from "@solana/web3.js";
import { String } from "aws-sdk/clients/batch";

export class UserDto{
    
        @ApiProperty({ type: String, required: true, example:1})
        id:number;
    @ApiProperty({ type: String, required: true, example:'user_name'})
    user_name: string;

    @ApiProperty({ type: String, required: true, example:'e_mail'})
    e_mail: string;

    @ApiProperty({ type: String, required: true, example:'password'})
    password: string;

}