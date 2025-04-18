import mongoose, {
    Document,
    Schema,
    Model, mongo
} from "mongoose";


export const enum EElement {Text='text',FirstHeading='firstHeading', SecondHeading='secondHeading',ThirdHeading='thirdHeading',Image='image',Video='video', Audio='audio', URL='url', Equation='equation',Code='code',BulletList='bulletList',NumberedList='numberedList',AlphabetList='alphabetList',ToggleList='toggleList',TodoList='todoList'}

export const EElementValues = [
    'text',
    'firstHeading',
    'secondHeading',
    'thirdHeading',
    'image',
    'video',
    'audio',
    'equation',
    'code',
    'url',
    'bulletList',
    'numberedList',
    'alphabetList',
    'toggleList',
    'todoList'
] as const;


interface ITodo {
    task: string;
    isCompleted: boolean;
}

interface IURL {
    url: string;
    text: string;
}

export interface IElement extends Document {
    elementType: string;
    text: string;
    list: string[];
    url: IURL;
    todoList: ITodo[];
    pageId: Schema.Types.ObjectId;
}

const elementSchema:Schema<IElement> = new Schema<IElement>({
    elementType: {
        type: String,
        enum: EElementValues,
        required: true
    },
    text: {
        type: String,
        default: '',
    },
    list: {
        type: [String],
        default: [],
    },
    url: {
        url: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        }
    },
    todoList: [{
        task: {
            type: String,
            default: '',
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    }],
    pageId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true})

export const Element:Model<IElement> = mongoose.model<IElement>("Element", elementSchema);