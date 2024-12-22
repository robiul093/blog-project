import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interfacr";

const adminModelSchema = new Schema<TAdmin>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
    },
    role: {
        type: String,
        default: 'admin',
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



const Admin = model<TAdmin>('Admin', adminModelSchema);

export default Admin;