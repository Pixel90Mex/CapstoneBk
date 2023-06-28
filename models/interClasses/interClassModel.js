import { Schema, model } from "mongoose";
/**Lo schema deve contenere un array dinamico di oggetti rappresentanti le classi che si formano in numero variabile di anno in anno
 * Le classi devono poter accedere al database degli studenti tramite id e classe di appartenenza per poterli catalogare al loro interno
 * Nel frontendo dovrò fare in modo che ogni alunno visualizzato (così come ogni classe) possa essere un link che porta alla scheda individuale
 * Non so se sono riuscito a creare uno schema che mi permetta di inserire infinite classi, e alunni
 * il numero di docenti è fisso perché dipende dalle materie
 */
const interClassSchema = new Schema({
    interclass: [
        {
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