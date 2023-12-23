import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module"
import { mainConfig } from "../src/main.config";

export const createApp = async () => {
    let app: INestApplication

    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    mainConfig(app)
    await app.init();

    return app
}