import { Schema, model } from "mongoose";

const teacherSchema = new Schema({
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
    role: {
        type: String,
        required: false,
        default: "user"
    },
    school_subject: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        strict: true
    }
);

const teacherModel = new model("Teacher", teacherSchema, "teacher");

export default teacherModel;