import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class CatService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CatCreateInput) {
    return this.prisma.cat.create({ data });
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

  update(id: string, data: Prisma.CatUpdateInput) {
    return this.prisma.cat.update({ data, where: { id } });
  }

  remove(id: string) {
    return this.prisma.cat.delete({ where: { id } });
  }
}
