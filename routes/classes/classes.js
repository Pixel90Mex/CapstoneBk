import { Router } from "express";
import bcrypt from "bcrypt";
import classModel from "../../models/classes/classModel.js";

const router = Router();

//GET
router.get("/classes", async(req, res) => {
    const { page = 1, pageSize =3} = req.params;

    try {
        const classes = await classModel.find()
        .populate("class.students")
        .populate("class.teachers")
        .limit(pageSize)
        .skip((page -1) * pageSize);

        res.status(200).send({
            currentPage: +page,
            classes,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server",
            statusCode: 500
        })
    }
});
//POST --> tengo in considerazione che insegnanti e studenti siano già stati creati
router.post("/classes", async(req, res)=> {

    //quando monto frontend metto controllo per la section 
    //ciclo con condizionale per la section su array di studenti che arriva nella request + return 
    const classToInsert = await classModel({
        class:{
            section: req.body.class.section,
            teachers: req.body.class.teachers,
            students: req.body.class.students
        }
    })
    console.log(classToInsert)
    try {
        const sectionExist = await classModel.findOne({
            section: req.body.section
        });
        if(sectionExist) {
            return res.status(409).send({
                message: "Sezione già registrata",
                statusCode: 409
            })
        }
        const newClass = await classToInsert.save();
        res.status(201).send({
            message: "Registrazione effettuata",
            statusCode: 201,
            payload: newClass
        })
    } catch (error) {
        res.status(500).send({
            message:"Errore interno del server:" + error,//concateno errore per vedere di cosa si tratta
            statusCode: 500
        })
    }
});

export default router;