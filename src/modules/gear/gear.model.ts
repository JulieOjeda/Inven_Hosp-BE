import mongoose, { Schema, Document, Model } from "mongoose";

// Interfaz para TypeScript
export interface IGear extends Document {
    _id: string;
    name: string;
    deviceModel: string;
    serialNumber: string;
    areaAssigned: string;
    manufacturer: string;
    description: string;

    screenResolution: string;
    powerSupply: string;
    weight: number;
    connectivity: string;

    manufacturingYear: number;
    warranty: string;
    extraData: string;
    photo?: string;

    startingDate: Date;
    descriptionMaintenance: string;
    responsible: string;
}

// Esquema de Mongoose
const GearSchema = new Schema<IGear>(
    {
        name: { type: String, required: true, maxlength: 100 },
        deviceModel: { type: String, required: true, maxlength: 50 },
        serialNumber: { type: String, required: true, maxlength: 50 },
        areaAssigned: { type: String, required: true, maxlength: 50 },
        manufacturer: { type: String, required: true, maxlength: 50 },
        description: { type: String, required: true, maxlength: 500 }, // Aumentado el límite

        screenResolution: { type: String, required: true, maxlength: 50 },
        powerSupply: { type: String, required: true, maxlength: 50 },
        weight: { type: Number, required: true, min: 0 },
        connectivity: { type: String, required: true, maxlength: 50 },

        manufacturingYear: { type: Number, required: true, min: 1900, max: new Date().getFullYear() },
        warranty: { type: String, required: true, maxlength: 100 },
        extraData: { type: String, required: true, maxlength: 500 },
        photo: { type: String, required: false },

        startingDate: { type: Date, required: true },
        descriptionMaintenance: { type: String, required: true, maxlength: 100 },
        responsible: { type: String, required: true, maxlength: 50 },
    },
    { timestamps: true }
);

// Modelo de Mongoose
const GearModel: Model<IGear> = mongoose.model<IGear>("Gear", GearSchema);

export default GearModel;
