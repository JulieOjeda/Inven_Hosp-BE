import { Request, Response, Router } from "express";
import storageService from "../../shared/storage.service";
import express from "express";

const imagesRouter = Router();

imagesRouter.post("/", storageService.single("file"), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: "No se subió ningún archivo" });
    return;
  }
   
  res.json({ message: "Archivo subido con éxito", file: req.file });
});

imagesRouter.use("/uploads", express.static("storage"));

export default imagesRouter;
