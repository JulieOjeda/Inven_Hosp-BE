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

  async update(area: IArea): Promise<void | null> {
    let updatedGear = await Area.findByIdAndUpdate(area._id, area,{
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
