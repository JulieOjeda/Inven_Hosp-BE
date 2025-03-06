import {IReport} from "./report.model";
import {ReportRepository} from "./report.repository";
import {GearRepository} from "../gear/gear.repository";
import {ReportStatus} from "./report.enums";

export class ReportService {
  constructor(private reportRepository: ReportRepository,
              private gearRepository: GearRepository) {}

  async createReport(newReport: IReport): Promise<IReport> {
    return this.reportRepository.create(newReport);
  }

  async getReportById(id: string): Promise<IReport | null> {
    return this.reportRepository.findById(id);
  }

  async getAllReport(): Promise<IReport[]> {
    return this.reportRepository.findAll();
  }

  async updateReport(reportUpdated: IReport): Promise<void | null>{
    if(reportUpdated.status === ReportStatus.COMPLETED){
      const gear = await this.gearRepository.findById(reportUpdated.gear.toString());
      if (!gear) throw new Error("Equipo no encontrado");

      const newMaintenanceDate = new Date(); // Fecha de mantenimiento actual
      newMaintenanceDate.setHours(0, 0, 0, 0);

      // Sumamos la frecuencia de mantenimiento al día actual
      newMaintenanceDate.setDate(newMaintenanceDate.getDate() + gear.frequencyMaintenance);
      gear.maintenanceAt = newMaintenanceDate
      await this.gearRepository.update(gear);
    }
    return await this.reportRepository.update(reportUpdated)
  }
}
