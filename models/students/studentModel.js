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
    role: {
        type: String,
        required: false,
        default: "user"
    },
    class: {
        type: String,
        required: true
    },
    school_subjects: {
        primo_quadrimestre :[
            {
                storia: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_primo_quadrimestre: Number
                },
                filosofia: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_primo_quadrimestre: Number
                },
                italiano: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_primo_quadrimestre: Number
                },
                matematica: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_primo_quadrimestre: Number
                },
                scienze: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_primo_quadrimestre: Number
                },
                educazione_fisica: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_primo_quadrimestre: Number
                },
                fisica: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_primo_quadrimestre: Number
                },
                comportamento: {
                    voto: Number
                }
            }
        ],
        secondo_quadrimestre :[
            {
                storia: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_secondo_quadrimestre: Number
                },
                filosofia: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_secondo_quadrimestre: Number
                },
                italiano: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_secondo_quadrimestre: Number
                },
                matematica: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_secondo_quadrimestre: Number
                },
                scienze: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_secondo_quadrimestre: Number
                },
                educazione_fisica: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_secondo_quadrimestre: Number
                },
                fisica: {
                    orale: [Number],
                    scritto: [Number],
                    media_orale: Number,
                    media_scritto: Number,
                    media_fine_secondo_quadrimestre: Number
                },
                comportamento: {
                    voto: Number
                }
            }
        ],
        Media_voti_finale :[
            {
                storia: {
                    media: Number
                },
                filosofia: {
                    media: Number
                },
                italiano: {
                    media: Number
                },
                matematica: {
                    media: Number
                },
                scienze: {
                    media: Number
                },
                educazione_fisica: {
                    media: Number
                },
                fisica: {
                    media: Number
                },
                comportamento: {
                    voto: Number
                }
            }
        ]
    } 
},
    {
        timestamps: true,
        strict: true
    }
);

const studentModel= new model("Student", studentSchema, "student");

export default studentModel;