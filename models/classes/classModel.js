import { Schema, model } from "mongoose";

const classSchema = new Schema({
    _id: Schema.type.ObjectId,
    name: {
        type: String,
        required: true
    },
    teachers: [
       {
        storia: {
            name: String
        },
        filosofia: {
            name: String,
        },
        italiano: {
            name: String
        },
        matematica: {
            name: String
        },
        scienze: {
            name: String
        },
        educazione_fisica: {
            name: String
        },
        fisica: {
            name: String
        }
       }
    ],
    students: [ObjectId]
})