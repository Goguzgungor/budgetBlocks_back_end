import { Module } from "@nestjs/common";
import {  UserController } from "./controller/user.controller";
import { DbService } from '../../core/db/db.service';
import { UserService } from "./service/user.service";
import { ConnectionService } from "../connection/service/connection.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService,DbService,ConnectionService],
    exports: [],
  })
  export class UserModule {}