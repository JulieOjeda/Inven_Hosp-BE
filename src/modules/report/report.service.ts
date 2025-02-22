import {IReport} from "./report.model";
import { ReportRepository } from "./report.repository";

export class ReportService {
  constructor(private reportRepository: ReportRepository) {}

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
    return this.reportRepository.update(reportUpdated)
  }
}
