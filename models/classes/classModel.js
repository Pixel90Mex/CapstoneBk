import { Schema, model } from "mongoose";

const classSchema = new Schema({
    class: {
        section: {
            type: String,
            required: true
        },
        teachers: [
            {
                type: Schema.Types.ObjectId, ref: 'Teacher'
            }
        ],
        students: [
            {
                type: Schema.Types.ObjectId, ref: 'Student'
            }
        ]
    }
},{
    timestamps: true,
    strict: true
});
const classModel = new model("Class", classSchema, "classes");

export default classModel;