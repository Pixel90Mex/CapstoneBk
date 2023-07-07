import { Router } from "express";
import bcrypt from "bcrypt";
import teacherModel from "../../models/teachers/teacherModel.js";

const router = Router();
//GET
router.get("/teacher", async (req, res) => {
    const { page = 1, pageSize = 3 } = req.query;
    try {
        const teachers = await teacherModel.find()
            .populate("class_group.classes")
            .limit(pageSize)
            .skip((page - 1) * pageSize);

        const totalTeachers = await teacherModel.count();

        res.status(200).send({
            count: totalTeachers,
            currentPage: +page,
            totalPage: Math.ceil(totalTeachers / pageSize),
            teachers,
            statusCode: 200
        });
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server",
            statusCode: 500
        });
    }
});
//POST
router.post("/teacher", async (req, res) => {
    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, genSalt);

    const teacher = await teacherModel({
        name: req.body.name,
        surname: req.body.surname,
        birth_date: req.body.birth_date,
        email: req.body.email,
        password: hashPassword,
        fiscal_code: req.body.fiscal_code,
        role: req.body.role,
        school_subject: req.body.school_subject,
        class_group: req.body.class_group
    });
    try {
        const teacherExist = await teacherModel.findOne({
            $or: [{ email: req.body.email }, { fiscal_code: req.body.fiscal_code }]
        });
        if (teacherExist) {
            return res.status(409).send({
                message: "Utente già registrato nel database",
                statusCode: 409
            });
        }
        const newTeacher = await teacher.save();
        res.status(201).send({
            message: "Registrazione effettuata",
            statusCode: 201,
            payload: newTeacher
        })
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server",
            statusCode: 500
        });
    }
});
//PATCH
router.patch('/teacher/:id', async (req, res) => {
    const { id } = req.params;
    const teacherExist = await teacherModel.findById(id);
    if (!teacherExist) {
        return res.status(404).send({
            message: "Utente inesistente",
            statusCode: 404
        });
    }
    try {
        const teacherID = id;
        const dataUpdated = req.body;
        const options = { new: true };
        const result = await teacherModel.findByIdAndUpdate(
            teacherID,
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
router.delete('/teacher/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const teacherExist = await teacherModel.findByIdAndDelete(id);
        if (!teacherExist) {
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