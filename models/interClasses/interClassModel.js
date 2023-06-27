import { Schema, model } from "mongoose";
/**Lo schema deve contenere un array dinamico di oggetti rappresentanti le classi che si formano in numero variabile di anno in anno
 * Le classi devono poter accedere al database degli studenti tramite id e classe di appartenenza per poterli catalogare al loro interno
 * Nel frontendo dovrò fare in modo che ogni alunno visualizzato (così come ogni classe) possa essere un link che porta alla scheda individuale
 */
const interClassSchema = new Schema({
    interclass: [
        {
            class: {
                
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
                students: [
                    {
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
                    }
                ] 
            }
        }
    ]
},
    {
        timestamps: true,
        strict: true
    }
);

const interClassModel = new model("InterClass", interClassSchema, "interclasses");

export default interClassModel;