import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { CatModule } from "./cat/cat.module";

@Module({
  imports: [ConfigModule.forRoot(), CatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
