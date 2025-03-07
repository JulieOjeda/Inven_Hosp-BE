// jobs/maintenanceJob.ts
import cron from "node-cron";
import notificationService from "../shared/notification.service";
import {ReportService} from "../modules/report/report.service";
import {GearRepository} from "../modules/gear/gear.repository";
import {ReportRepository} from "../modules/report/report.repository";

export function scheduleMaintenanceJob( ) {

    cron.schedule("59 23 * * *", () => {
        console.log("📅 Ejecutando revisión de mantenimiento...");
       notificationService.checkMaintenance();
        let reportService = new ReportService( new ReportRepository(), new GearRepository())
        reportService.checkReportsExpired()
    });
}
