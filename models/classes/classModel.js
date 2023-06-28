import { Schema, model } from "mongoose";

const classSchema = new Schema({
    class: {
        sezione: String,
        teachers: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'
            }
        ],
        students: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: 'Student'
            }
        ]
    }
},{
    timestamps: true,
    strict: true
});
const classModel = new model("Class", classSchema, "/classes");

export default classModel;