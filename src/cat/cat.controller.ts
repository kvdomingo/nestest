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
  ParseIntPipe,
  DefaultValuePipe,
  NotFoundException,
} from "@nestjs/common";
import { CatService } from "./cat.service";
import { Cat } from "@prisma/client";
import { Response } from "express";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { CatEntity } from "./entities/cat.entity";

@Controller("cat")
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @ApiCreatedResponse({ type: CatEntity })
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  @ApiOkResponse({ type: CatEntity, isArray: true })
  async findAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("pageSize", new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ): Promise<Cat[]> {
    return this.catService.findAll({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  @Get(":id")
  @ApiOkResponse({ type: CatEntity })
  async findOne(
    @Res({ passthrough: true }) res: Response,
    @Param("id") id: string,
  ): Promise<Cat | undefined> {
    const found = await this.catService.findOne(id);

    if (found) {
      return found;
    } else {
      throw new NotFoundException(`Cat with id ${id} not found.`);
    }
  }

  @Patch(":id")
  @ApiAcceptedResponse({ type: CatEntity })
  async update(@Param("id") id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(id, updateCatDto);
  }

  @Delete(":id")
  @ApiNoContentResponse()
  async remove(@Param("id") id: string) {
    return this.catService.remove(id);
  }
}
