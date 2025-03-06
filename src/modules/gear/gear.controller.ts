import { Request, Response, Router } from "express";
import { GearService } from "./gear.service";
import { GearRepository } from "./gear.repository";
import { IGear } from "./gear.model";
import notificationService from "../../shared/notification.service";
import {ReportService} from "../report/report.service";
import {ReportRepository} from "../report/report.repository";
import {IReport} from "../report/report.model";
import mongoose from "mongoose";
import {ReportStatus} from "../report/report.enums";

const gearRouter = Router();
const gearService = new GearService(new GearRepository());
const reportService = new ReportService(new ReportRepository(), new GearRepository())

gearRouter.post("/", async (req: Request, res: Response) => {
  const gear: IGear= req.body
  const gearRes = await gearService.createGear(gear);
  const newReport : any ={
    resume: "",
    gear:  gearRes._id,
    createdAt: new Date(),
    status : ReportStatus.PENDING
  }
  await reportService.createReport(newReport)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const withNotification =  notificationService.checkMaintenanceByGear(gearRes, today);
  res.json({gearRes, "withNotifications": withNotification});
});

gearRouter.get("/notifications" ,async (req: Request, res: Response) => {
  const notifications = notificationService.getNotifications();
  res.json(notifications);
  notificationService.cleanNotifications()
});

gearRouter.get("/:id", async (req: Request, res: Response) => {
  const gear = await gearService.getGearById(req.params.id);
  gear ? res.json(gear) : res.status(404).json({ message: "User not found" });
});

gearRouter.get("/", async (req: Request, res: Response) => {
  const gears = await gearService.getAllGear();
  res.json(gears);
});

export default gearRouter;
