import Gear, { IGear } from "./gear.model";
import { BaseRepository } from "../../shared/base.repository";

export class GearRepository extends BaseRepository<IGear> {
  async create(data: IGear): Promise<IGear> {
    return Gear.create(data);
  }

  async findById(id: string): Promise<IGear | null> {
    return Gear.findById(id);
  }

  async findAll(): Promise<IGear[]> {
    return Gear.find();
  }
}
