import { Injectable, OnModuleInit, OnModuleDestroy, INestApplication } from '@nestjs/common';
import { PrismaUniversal } from 'prisma-decimal/lib/prisma.universal';


@Injectable()
export class DbService
  extends PrismaUniversal
  implements OnModuleInit {
  async onModuleInit() {
    // optional: this.models = ['table'];
    this.$use(this.convertDecimal);
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  // async onModuleDestroy() {
  //   await this.$disconnect();
  // }
}