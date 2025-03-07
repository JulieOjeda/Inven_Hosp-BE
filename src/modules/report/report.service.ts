import {IReport} from "./report.model";
import {ReportRepository} from "./report.repository";
import {GearRepository} from "../gear/gear.repository";
import {ReportStatus} from "./report.enums";
import winston from "../../config/winston";

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

  async checkReportsExpired() {
    let gears = await this.gearRepository.findAll();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar la fecha a medianoche

    let gearsWithReport = gears.filter(gear => {
      if (!gear.maintenanceAt) return false;

      // Normalizar la fecha de mantenimiento para evitar problemas de horas
      const maintenanceDate = new Date(gear.maintenanceAt);
      maintenanceDate.setHours(0, 0, 0, 0);

      return today.getTime() === maintenanceDate.getTime();
    });

    for (const gear of gearsWithReport) {
      let report = await this.reportRepository.findByGearId(gear._id);

      if (report?.status === ReportStatus.PENDING) {
        winston.info(`CRON - REPORT EXPIRED for: ${gear.name} and report: ${report._id}`);
        report.status = ReportStatus.EXPIRED;
        await this.reportRepository.update(report);
      }
    }
  }

}
