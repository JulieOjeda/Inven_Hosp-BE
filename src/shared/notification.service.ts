import {GearRepository} from "../modules/gear/gear.repository";

export interface Notification{
    message: string
    gearId: string
    createdAt: Date
}

export class NotificationService{
    private gearRepository: GearRepository
    private notifications : Notification[] = [{
        message: `Le falta un dia para terminar un reporte pendiente`,
        createdAt: new Date(),
        gearId: "67bfd33a72a99b188daa39a8"
    }]
    constructor(gearRepository: GearRepository) {
        this.gearRepository = gearRepository
    }

    async checkMaintenance(): Promise<void> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const gears = await this.gearRepository.findAll();

        for (const gear of gears) {
            if (!gear.frequencyMaintenance) continue;
            const nextMaintenance = new Date(gear.startingDate);
            nextMaintenance.setDate(nextMaintenance.getDate() + gear.frequencyMaintenance);

            if (today.getTime() === nextMaintenance.getTime()) {
                this.notifications.push({
                    message: `Le falta un dia para terminar un reporte pendiente`,
                    createdAt: new Date(),
                    gearId: gear._id
                });
            }
        }
    }

    getNotifications(): Notification[]{
        return this.notifications
    }

    cleanNotifications(){
    }
}

const notificationService = new NotificationService(new GearRepository());
export default notificationService