import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../app/config";


const userModelSchema = new Schema<TUser>({
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
        enum: ['user','admin'],
        default: 'user',
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


userModelSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;

    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )
    
    next();
})


const User = model<TUser>('User', userModelSchema)

export default User;