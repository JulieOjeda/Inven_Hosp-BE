import {GearRepository} from "../modules/gear/gear.repository";
import {IGear} from "../modules/gear/gear.model";

export interface Notification{
    message: string
    gearId: string
    createdAt: Date
}

export class NotificationService{
    private gearRepository: GearRepository
    private notifications : Notification[] = []
    constructor(gearRepository: GearRepository) {
        this.gearRepository = gearRepository
    }

    async checkMaintenance(): Promise<void> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const gears = await this.gearRepository.findAll();

        for (const gear of gears) {
            this.checkMaintenanceByGear(gear, today)
        }
    }


    checkMaintenanceByGear(gear: IGear, compareDate: Date): boolean {
        if (!gear.frequencyMaintenance) return false;

        const nextMaintenance = new Date(gear.maintenanceAt);
        nextMaintenance.setDate(nextMaintenance.getDate() + gear.frequencyMaintenance);

        // Restamos un día y normalizamos la fecha
        const oneDayBefore = new Date(nextMaintenance);
        oneDayBefore.setDate(oneDayBefore.getDate() - 1);
        oneDayBefore.setHours(0, 0, 0, 0); // Normalizamos horas

        // Normalizamos compareDate para que solo tenga la fecha
        const normalizedCompareDate = new Date(compareDate);
        normalizedCompareDate.setHours(0, 0, 0, 0);

        console.log(`Comparando: ${normalizedCompareDate.toDateString()} con ${oneDayBefore.toDateString()}`);

        if (normalizedCompareDate.getTime() === oneDayBefore.getTime()) {
            this.notifications.push({
                message: `Falta un día para el mantenimiento del equipo.`,
                createdAt: new Date(),
                gearId: gear._id
            });
            return true;
        }

        return false;
    }

    getNotifications(): Notification[]{
        return this.notifications
    }

    cleanNotifications(){
        this.notifications = []
    }
}

const notificationService = new NotificationService(new GearRepository());
export default notificationService