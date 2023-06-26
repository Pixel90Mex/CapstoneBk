import { Schema, Model } from "mongoose";

const interClassSchema = new Schema({
    interclass: [
        {
            class: {
                type: String,
                students: [
                    
                ]
            }
        }
    ]
})