import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    birth_date: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fiscal_code: {
        type: String,
        required: true,
        max: 15
    },
    school_subjects: [
        {
            storia: {
                orale: [Number],
                scritto: [Number]
            },
            filosofia: {
                orale: [Number],
                scritto: [Number]
            },
            italiano: {
                orale: [Number],
                scritto: [Number]
            },
            matematica: {
                orale: [Number],
                scritto: [Number]
            },
            scienze: {
                orale: [Number],
                scritto: [Number]
            },
            educazione_fisica: {
                orale: [Number],
                scritto: [Number]
            },
            fisica: {
                orale: [Number],
                scritto: [Number]
            },
        }
    ]
},
    {
        timestamps: true,
        strict: true
    }
);

const studentModel= new model("Student", studentSchema, "students");

export default studentModel;