import { Module } from "@nestjs/common";
import { CatService } from "./cat.service";
import { CatController } from "./cat.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [CatController],
  providers: [CatService],
  imports: [PrismaModule],
})
export class CatModule {}
