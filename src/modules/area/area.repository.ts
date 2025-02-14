import Area, { IArea } from "./area.model";
import { BaseRepository } from "../../shared/base.repository";

export class AreaRepository extends BaseRepository<IArea> {
  async create(data: IArea): Promise<IArea> {
    return Area.create(data);
  }

  async findById(id: string): Promise<IArea | null> {
    return Area.findById(id);
  }

  async findAll(): Promise<IArea[]> {
    return Area.find();
  }
}
