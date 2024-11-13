import { Cat } from "@prisma/client";

export class CatEntity implements Cat {
  id: string;
  name: string;
  color: string;
  address: string;
  civilStatus: string;
}
