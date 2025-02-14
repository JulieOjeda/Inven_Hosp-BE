import { IArea } from "./area.model";
import { AreaRepository } from "./area.repository";

export class AreaService {
  constructor(private areaRepository: AreaRepository) {}

  async createAre(newGear: IArea): Promise<IArea> {
    return this.areaRepository.create(newGear);
  }

  async getAreaById(id: string): Promise<IArea | null> {
    return this.areaRepository.findById(id);
  }

  async getAllArea(): Promise<IArea[]> {
    return this.areaRepository.findAll();
  }
}
