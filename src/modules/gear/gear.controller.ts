import { Request, Response, Router } from "express";
import { GearService } from "./gear.service";
import { GearRepository } from "./gear.repository";
import { IGear } from "./gear.model";

const gearRouter = Router();
const gearService = new GearService(new GearRepository());

gearRouter.post("/", async (req: Request, res: Response) => {
  const gear: IGear= req.body
  gear.id = gear.serialNumber
  const user = await gearService.createGear(gear);
  res.json(user);
});

gearRouter.get("/:id", async (req: Request, res: Response) => {
  const user = await gearService.getGearById(req.params.id);
  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

gearRouter.get("/", async (req: Request, res: Response) => {
  const users = await gearService.getAllGear();
  res.json(users);
});

export default gearRouter;
