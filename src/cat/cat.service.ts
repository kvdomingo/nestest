import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";

@Injectable()
export class CatService {
  constructor(private prisma: PrismaService) {}

  create(createCatDto: CreateCatDto) {
    return this.prisma.cat.create({ data: createCatDto });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CatWhereUniqueInput;
    where?: Prisma.CatWhereInput;
    orderBy?: Prisma.CatOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.cat.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: string) {
    return this.prisma.cat.findUnique({
      where: { id },
    });
  }

  update(id: string, updateCatDto: UpdateCatDto) {
    return this.prisma.cat.update({ data: updateCatDto, where: { id } });
  }

  remove(id: string) {
    return this.prisma.cat.delete({ where: { id } });
  }
}
