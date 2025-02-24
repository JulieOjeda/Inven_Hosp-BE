import mongoose, { Schema, Document, Model } from "mongoose";

// Interfaz para TypeScript
export interface IUser extends Document {
    _id: string;
    userName: string
    userId: string
    password: string
    createdAt: Date
}

// Esquema de Mongoose
const UserSchema = new Schema<IUser>(
    {
        userName: { type: String, required: true, maxlength: 50 },
        userId: { type: String, required: true, maxlength: 50 },
        createdAt: { type: Date, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

// Modelo de Mongoose
const UserName: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserName;
