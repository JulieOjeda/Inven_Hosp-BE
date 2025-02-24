import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err); // Puedes loggear el error si lo deseas
    res.status(500).json({ message: err.message || "Internal Server Error" });
};