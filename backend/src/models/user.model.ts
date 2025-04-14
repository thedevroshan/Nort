import {
    Schema,
    Document,
    Model
} from 'mongoose';
import mongoose from 'mongoose';

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    profile_pic: string;
    verified: boolean;
}

const userSchema:Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profile_pic: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    }
},{timestamps:true});

export const User:Model<IUser> = mongoose.model<IUser>("User", userSchema);
