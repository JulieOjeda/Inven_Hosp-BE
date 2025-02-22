import mongoose, { Schema, Document, Model } from "mongoose";

// Interfaz para TypeScript
export interface IArea extends Document {
    _id: string;
    name: string;
    createdAt : Date;
    itemsCount: number
    description : string
    imageId: string
}

// Esquema de Mongoose
const AreaSchema = new Schema<IArea>(
    {
        name: { type: String, required: true, maxlength: 100 },
        itemsCount: { type: Number, required: true, min: 0 },
        createdAt: { type: Date, required: true },
        description: { type: String, default: "" }, // Ahora sí se guardará
        imageId: { type: String, default: "" },
    },
    { timestamps: true }
);

// Modelo de Mongoose
const AreaModel: Model<IArea> = mongoose.model<IArea>("Area", AreaSchema);

export default AreaModel;
