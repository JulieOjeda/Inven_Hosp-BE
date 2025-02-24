import express from "express";
import dotenv from "dotenv";
import 'express-async-errors';
import connectDB from "../config/database";
import gearRouter from "../modules/gear/gear.controller";
import imagesRouter from "../modules/images/images.controller";
import areaRouter from "../modules/area/area.controller";
import reportRouter from "../modules/report/report.controller";
import {scheduleMaintenanceJob} from "../config/cron";
import {loggerMiddleware} from "../utils/middlewares/logger.middleware";
import userRouter from "../modules/user/user.controller";
import {errorMiddleware} from "../utils/middlewares/error.middleware";
import {verifyToken} from "../utils/middlewares/token.middleware";

const cors = require('cors');
dotenv.config();
connectDB();
scheduleMaintenanceJob()
const app = express();
app.use(cors())
app.use(express.json());
app.use(loggerMiddleware);
app.use(verifyToken)
app.use("/gear", gearRouter);
app.use("/images", imagesRouter)
app.use("/area", areaRouter)
app.use("/report", reportRouter)
app.use("/user", userRouter)
app.use(errorMiddleware);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
