import { Test, TestingModule } from "@nestjs/testing";
import { DbModule } from "./db.module";
import { DbService } from "./db.service";

describe("Db -> Test", () => {

  let dbService: DbService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DbModule],
      providers: [DbService],
    }).compile();
    dbService = app.get<DbService>(DbService);
  });

  it("Db Connect", async () => {
    const res = await dbService.onModuleInit();
    expect(res)
  });

  it("Db onModuleDestroy", async () => {
    const res = await dbService.onModuleDestroy();
    expect(res)
  });

});
