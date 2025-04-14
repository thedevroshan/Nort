import mongoose, {
    Document,
    Model,
    Schema
} from 'mongoose'

export interface IRole extends Document{
    pageId: Schema.Types.ObjectId;
    roleName: string;
    assignedTo: Schema.Types.ObjectId[];
    color: string;
}

const roleSchema = new Schema<IRole>({
    pageId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    roleName: {
        type: String,
        required: true
    },
    assignedTo: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    color: {
        type: String,
        default: '#ffffff'
    }
}, {timestamps: true});

export const Role:Model<IRole> = mongoose.model<IRole>('Role', roleSchema);