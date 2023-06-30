import { Router } from "express";
import interClassModel from "../../models/interClasses/interClassModel.js";

const router = Router();

//GET
router.get("/interclasses", async (req, res) => {
    const { page = 1, pageSize = 3 } = req.params;

    try {
        const interclasses = await interClassModel.find()
            .populate("interclass.class.teachers")
            .populate("interclass.class.students")
            .limit(pageSize)
            .skip((page - 1) * pageSize)
        console.log(interclasses)
        res.status(200).send({
            currentPage: +page,
            interclasses,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server",
            statusCode: 500
        })
    }
});
//POST
router.post("/interclasses", async (req, res) => {

    const interClassToInsert = await interClassModel({
        interclass: [
            {
                class: {
                    section: req.body.interclass.section,
                    teachers: req.body.interclass.teachers,
                    students: req.body.interclass.students
                }
            }
        ]
    })
    console.log(interClassToInsert);
    try {
        const interClassExist = await interClassModel.findOne({
            section: req.body.section
        });
        if (interClassExist) {
            return res.status(409).send({
                message: "Interclasse già registrata",
                statusCode: 409
            })
        }
        const newInterClass = await interClassToInsert.save();
        res.status(201).send({
            message: "Registrazione effettuata",
            statusCode: 201,
            payload: newInterClass
        })
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server" + error,
            statusCode: 500
        })
    }
});

export default router;