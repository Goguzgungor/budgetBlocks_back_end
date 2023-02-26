import { Module } from "@nestjs/common";
import { ConnectionController } from "./controller/connection.controller";
import { ConnectionService } from "./service/connection.service";

@Module({
    imports: [],
    controllers: [ConnectionController],
    providers: [ConnectionService],
    exports: [],
  })
  export class ConnectionModule {}