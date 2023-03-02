import { Module } from "@nestjs/common";
import { ConnectionController } from "./controller/connection.controller";
import { ConnectionService } from "./service/connection.service";
import { DbService } from '../../core/db/db.service';

@Module({
    imports: [],
    controllers: [ConnectionController],
    providers: [ConnectionService,DbService],
    exports: [],
  })
  export class ConnectionModule {}