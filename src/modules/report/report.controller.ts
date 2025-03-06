import { Request, Response, Router } from "express";
import { ReportService } from "./report.service";
import { ReportRepository } from "./report.repository";
import { IReport} from "./report.model";
import {GearRepository} from "../gear/gear.repository";

const reportRouter = Router();
const reportService = new ReportService(new ReportRepository(), new GearRepository());

reportRouter.post("/", async (req: Request, res: Response) => {
  const report: IReport= req.body
  const user = await reportService.createReport(report);
  res.json(user);
});

reportRouter.get("/:id", async (req: Request, res: Response) => {
  const report = await reportService.getReportById(req.params.id);
  report ? res.json(report) : res.status(404).json({ message: "Report not found" });
});

reportRouter.get("/", async (req: Request, res: Response) => {
  const reports = await reportService.getAllReport();
  res.json(reports);
});

reportRouter.put("/", async (req: Request, res: Response) =>{
  const reqBody: IReport= req.body
  const response = await reportService.updateReport(reqBody)
  response !== null ? res.json({ message: "Report updated" }) : res.status(404).json({ message: "Area not found" });
})

export default reportRouter;
