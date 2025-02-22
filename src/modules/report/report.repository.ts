import Report, { IReport } from "./report.model";
import { BaseRepository } from "../../shared/base.repository";

export class ReportRepository extends BaseRepository<IReport> {
  async create(data: IReport): Promise<IReport> {
    return Report.create(data);
  }

  async findById(id: string): Promise<IReport | null> {
    return Report.findById(id);
  }

  async findAll(): Promise<IReport[]> {
    return Report.find();
  }

  async update(report: IReport): Promise<void | null> {
    let updatedGear = await Report.findByIdAndUpdate(report._id, report,{
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
