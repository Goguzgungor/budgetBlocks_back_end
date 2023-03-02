import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './routes/connection/connection.module';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [ConnectionModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
