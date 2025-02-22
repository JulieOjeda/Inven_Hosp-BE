// jobs/maintenanceJob.ts
import cron from "node-cron";
import notificationService from "../shared/notification.service";

export function scheduleMaintenanceJob( ) {
    cron.schedule("0 0 * * *", async () => {
        console.log("📅 Ejecutando revisión de mantenimiento...");
        await notificationService.checkMaintenance();
    });
}
