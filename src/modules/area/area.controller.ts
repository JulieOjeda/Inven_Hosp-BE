import { Request, Response, Router } from "express";
import { AreaService } from "./area.service";
import { AreaRepository } from "./area.repository";
import { IArea } from "./area.model";

const areaRouter = Router();
const areaService = new AreaService(new AreaRepository());

areaRouter.post("/", async (req: Request, res: Response) => {
  const gear: IArea= req.body
  const user = await areaService.createAre(gear);
  res.json(user);
});

areaRouter.get("/:id", async (req: Request, res: Response) => {
  const gear = await areaService.getAreaById(req.params.id);
  gear ? res.json(gear) : res.status(404).json({ message: "Area not found" });
});

areaRouter.get("/", async (req: Request, res: Response) => {
  const gears = await areaService.getAllArea();
  res.json(gears);
});

areaRouter.put("/", async (req: Request, res: Response) =>{
  const reqBody: IArea= req.body
  const response = await areaService.updateArea(reqBody)
  response !== null ? res.json({ message: "Area updated" }) : res.status(404).json({ message: "Area not found" });
})

export default areaRouter;
