import mongoose, { Schema, Document } from "mongoose";

// Interfaz para TypeScript
export interface IGear extends Document {
  name: string;
  deviceModel: string;
  serialNumber: string;
  manufacturer: string;
  manufacturingYear: number;
  classification: string;
  weight: number;
  screenType: string;
  screenResolution: string;
  parametersMonitored: string;
  powerSupply: string;
  battery: string;
  connectivity: string;
  alarms: string;
  accessoriesIncluded: string;
  applicableStandards: string;
  warranty: string;
  createdAt: Date;
}

// Esquema de Mongoose
const GearSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    deviceModel: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    manufacturer: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    classification: { type: String, required: true },
    weight: { type: Number, required: true },
    screenType: { type: String, required: true },
    screenResolution: { type: String, required: true },
    parametersMonitored: { type: String, required: true },
    powerSupply: { type: String, required: true },
    battery: { type: String, required: true },
    connectivity: { type: String, required: true },
    alarms: { type: String, required: true },
    accessoriesIncluded: { type: String, required: true },
    applicableStandards: { type: String, required: true },
    warranty: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Modelo de Mongoose
export default  mongoose.model<IGear>("Gear", GearSchema);
