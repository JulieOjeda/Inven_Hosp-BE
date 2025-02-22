import mongoose, { Schema, Document, Model } from "mongoose";
import {ReportStatus} from "./report.enums";

// Interfaz para TypeScript
export interface IReport extends Document {
    _id : string
    resume: string
    gear:  mongoose.Types.ObjectId
    createdAt: Date
    resolvedAt : Date
    status : ReportStatus
}

// Esquema de Mongoose
const ReportSchema = new Schema<IReport>(
    {
        resume: { type: String, maxlength: 200 },
        gear : {
            type: Schema.Types.ObjectId,
            ref: "Gear",  // Referencia a la colección "Hospital"
            required: true  // ⚠️ Asegura que siempre tenga un hospital asociado
        },
        createdAt: { type: Date, required: true },
        resolvedAt: { type: Date, required: false },
        status: {
            type: String,
            enum: Object.values(ReportStatus),  // Usamos el enum para definir los valores permitidos
            required: true,
        }
    },
    { timestamps: true }
);

// Modelo de Mongoose
const ReportModel: Model<IReport> = mongoose.model<IReport>("Report", ReportSchema);

export default ReportModel;
