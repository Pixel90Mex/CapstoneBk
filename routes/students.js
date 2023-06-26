import { Router } from "express";
import bcrypt from "bcrypt";
import studentModel from "../models/studentModel.js";

const router = Router();

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
        });
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server",
        });
    }
});

router.post("/students", async (req, res) => {
    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, genSalt);

    try {
        const student = await studentModel({
            name: req.body.name,
            surname: req.body.surname,
            birth_date: req.body.birth_date,
            email: req.body.email,
            password: hashPassword,
            fiscal_code: req.body.fiscal_code,
            school_subjects: req.body.school_subjects 
        });
        const newStudent = await student.save();
        res.status(201).send({
            message: "Registrazione effettuata",
            statusCode: 201,
            payload: newStudent
        })
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server",
        });
    }
});

export default router;