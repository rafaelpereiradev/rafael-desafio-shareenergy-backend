import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true

        },
        password: {
            type: String,
            required: true,
            select: false
        }
    }
)

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

export default mongoose.model('User', UserSchema)