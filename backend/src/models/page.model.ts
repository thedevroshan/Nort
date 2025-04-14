import mongoose, {
    Document,
    Model,
    Schema
} from "mongoose";

export const enum EModels {"Text"='text', "FirstHeading"='firstheading', "SecondHeading"='secondheading', "ThirdHeading"='thirdheading',"Image"='image',"Video"='video',"Audio"='audio',"Link"='link'}

export interface IPage extends Document {
    title: string,
    description: string,
    icon: string,
    banner: string,
    isTemplate: boolean,
    elements: [{
        elementId: Schema.Types.ObjectId,
        kind: EModels,
    }],
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
    elements: [{
        elementId: {
            type: Schema.Types.ObjectId,
        },
        kind: {
            type: String,
            enum: Array<EModels>,
        },
    }],
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