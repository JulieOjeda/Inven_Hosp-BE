import { IGear } from "./gear.model";
import { GearRepository } from "./gear.repository";

export class GearService {
  constructor(private gearRepository: GearRepository) {}

  async createGear(newGear: IGear): Promise<IGear> {
    return this.gearRepository.create(newGear);
  }

  async getGearById(id: string): Promise<IGear | null> {
    return this.gearRepository.findById(id);
  }

  async getAllGear(): Promise<IGear[]> {
    return this.gearRepository.findAll();
  }
}
