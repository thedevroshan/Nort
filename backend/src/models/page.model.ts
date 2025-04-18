import mongoose, {
    Document,
    Model,
    Schema
} from "mongoose";

export const enum EModels {"Text"='text', "Heading"='heading',"Image"='image',"Video"='video',"Audio"='audio',"Link"='link'}

export interface IPage extends Document {
    title: string,
    description: string,
    icon: string,
    banner: string,
    isTemplate: boolean,
    members: Schema.Types.ObjectId[],
    owner: Schema.Types.ObjectId,
}

const pageSchema = new Schema<IPage>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    banner: {
        type: String,
        default: ''
    },
    isTemplate: {
        type: Boolean,
        default: false
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

export const Page:Model<IPage> = mongoose.model<IPage>("Page", pageSchema);