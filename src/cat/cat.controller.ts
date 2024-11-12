import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  Query,
} from "@nestjs/common";
import { CatService } from "./cat.service";
import { Prisma } from "@prisma/client";
import { Cat } from "@prisma/client";
import { Response } from "express";

@Controller("cat")
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCatDto: Prisma.CatCreateInput) {
    return this.catService.create(createCatDto);
  }

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("pageSize") pageSize: number = 10,
  ): Promise<Cat[]> {
    return this.catService.findAll({
      take: Number(pageSize),
      skip: (Number(page) - 1) * Number(pageSize),
    });
  }

  @Get(":id")
  async findOne(
    @Res({ passthrough: true }) res: Response,
    @Param("id") id: string,
  ): Promise<Cat | undefined> {
    const found = await this.catService.findOne(id);

    if (found) {
      return found;
    } else {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }
  }

  @Patch(":id")
  @HttpCode(HttpStatus.ACCEPTED)
  async update(
    @Param("id") id: string,
    @Body() updateCatDto: Prisma.CatUpdateInput,
  ) {
    return this.catService.update(id, updateCatDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string) {
    return this.catService.remove(id);
  }
}
