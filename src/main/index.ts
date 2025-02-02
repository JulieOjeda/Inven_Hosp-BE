import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/database";
import gearRouter from "../modules/gear/gear.controller";

const cors = require('cors');
dotenv.config();
connectDB();

const app = express();
app.use(cors())
app.use(express.json());

app.use("/gear", gearRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
