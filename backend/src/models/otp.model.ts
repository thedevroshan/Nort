import mongoose, {
    Document,
    Model,
    Schema
} from "mongoose";

export interface IOTP extends Document {
    otp: string;
    userId: string;
    expiration: number;
}

const otpSchema:Schema<IOTP> = new Schema<IOTP>({
    otp: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    expiration: {
        type: Number,
        required: true,
    }
}, {timestamps: true});


export const OTP:Model<IOTP> = mongoose.model<IOTP>("OTP", otpSchema);