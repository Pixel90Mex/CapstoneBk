import { Router } from "express";
import bcrypt from "bcrypt";
import studentModel from "../../models/students/studentModel.js";
//OPERAZIONI DI CRUD PER CREARE, CARICARE, MODIFICARE E CANCELLARE SINGOLI UTENTI DAL DATABASE
const router = Router();
//GET
router.get("/students", async (req, res) => {
    const { page = 1, pageSize = 3 } = req.query;
    try {
        const students = await studentModel.find()
            //.populate("posts")
            .limit(pageSize)
            .skip((page - 1) * pageSize);

        const totalStudents = await studentModel.count();

        res.status(200).send({
            count: totalStudents,
            currentPage: +page,
            totalPage: Math.ceil(totalStudents / pageSize),
            students,
            statusCode:200
        });
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server",
            statusCode: 500
        });
    }
});
//POST
router.post("/students", async (req, res) => {
    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, genSalt);

    const student = await studentModel({
        name: req.body.name,
        surname: req.body.surname,
        birth_date: req.body.birth_date,
        email: req.body.email,
        password: hashPassword,
        fiscal_code: req.body.fiscal_code,
        role: req.body.role,
        class: req.body.class,
        school_subjects: req.body.school_subjects
    });
    try {
        const studentExist = await studentModel.findOne({
            $or: [{ email: req.body.email }, { fiscal_code: req.body.fiscal_code }]
        });
        if (studentExist) {
            return res.status(409).send({
                message: "Utente già registrato nel database",
                statusCode: 409
            });
        }
        const newStudent = await student.save();
        res.status(201).send({
            message: "Registrazione effettuata",
            statusCode: 201,
            payload: newStudent
        })
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server",
            statusCode: 500
        });
    }
});
//PATCH
router.patch('/students/:id', async (req, res) => {
    const { id } = req.params;
    const studentExist = await studentModel.findById(id);
    if (!studentExist) {
        return res.status(404).send({
            message: "Utente inesistente",
            statusCode: 404
        });
    }
    try {
        const studentID = id;
        const dataUpdated = req.body;
        const options = { new: true };
        const result = await studentModel.findByIdAndUpdate(
            studentID,
            dataUpdated,
            options
        );
        res.status(200).send({
            message: "Modifica effettuata con successo",
            payload: result,
            statusCode: 200
        });
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server",
            statusCode: 500
        });
    }
});
//DELETE
router.delete('/students/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const studentExist = await studentModel.findByIdAndDelete(id);
        if (!studentExist) {
            return res.status(404).send({
                message: "Utente non trovato",
                statusCode: 404
            });
        }
        res.status(200).send({
            message: `Cancellazione di utente con ${id} effettuata con successo`,
            statusCode: 200
        });
    } catch (error) {
        res.status(404).send({
            message: "Errore interno del server",
            statusCode: 404
        })
    }
})

export default router;