import mongoose, {
    Document,
    Schema,
    Model, mongo
} from "mongoose";


export const enum ETextBasedElement {Text='text',FirstHeading='firstHeading', SecondHeading='secondHeading',ThirdHeading='thirdHeading', Equation='equation',Code='code'}

export const enum EMediaBasedElement {
    Image='image',Video='video', Audio='audio',
}

export const enum EListBasedElement {
    BulletList='bulletList',NumberedList='numberedList',AlphabetList='alphabetList',ToggleList='toggleList',TodoList='todoList'
}

export const enum EURLBasedElement {
    URL='url'
}

export const EElementValues = [
    'text',
    'firstHeading',
    'secondHeading',
    'thirdHeading',
    'equation',
    'code',
    'image',
    'video',
    'audio',
    'url',
    'bulletList',
    'numberedList',
    'alphabetList',
    'toggleList',
    'todoList'
];

export const TextBasedElementValues = [
    'text',
    'firstHeading',
    'secondHeading',
    'thirdHeading',
    'equation',
    'code',
]

export const ListBasedElementValues = [
    'bulletList',
    'numberedList',
    'alphabetList',
    'toggleList',
    'todoList'
]

export const MediaBasedElementValues = [
    'image',
    'video',
    'audio',
]

export const URLBasedElementValues = [
    'url'
]



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
    bold: boolean;
    italic: boolean;
    underline: boolean;
    color: string;
    media: string;
    listName: string;
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
    media:{
        type: String,
        default: '',
    },
    listName: {
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