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

  async update(gear: IGear): Promise<void | null> {
    let updatedGear = await Gear.findByIdAndUpdate(gear._id, gear,{
      new: true,
      runValidators: true,
    })
    if (!updatedGear) {
      console.log("Gear no encontrado");
      return null;
    }

    return
  }


}
