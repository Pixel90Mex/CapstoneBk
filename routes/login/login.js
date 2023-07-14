import { Router } from "express";
import bcrypt from "bcrypt";
import teacherModel from "../../models/teachers/teacherModel.js";
import studentModel from "../../models/students/studentModel.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
    const userTeacher = await teacherModel.findOne({ email: req.body.email});
    const userStudent = await studentModel.findOne({email: req.body.email});
    let user = null;
    if(!userTeacher && !userStudent) {
        return res
        .status(404)
        .send({
            message: "Utente non trovato",
            statusCode: 404
        });
    };
    if(userTeacher){
        user = userTeacher;
    } else {
        user = userStudent;
    }
    const validPw = await bcrypt.compare(req.body.password, user.password);
    if (!validPw) {
        return res
            .status(400)
            .send({ 
                message: "Password errata",
                statusCode: 400
            });
    };
    const token = jwt.sign(
        {
        name: user.name,
        surname: user.surname,
        birth_date: user.birth_date,
        fiscal_code: user.fiscale_code,
        school_subject: user.school_subject,
        email: user.email,
        role: user.role,
        id: user._id,
        class_group: user.class_group
        },
        process.env.SECRET_JWT_KEY,
        {
            expiresIn: "24",
        }
    );
    console.log(user);
    res.header("auth", token)
            .status(200)
            .send({
                message: "Login effettuato con successo",
                statusCode: 200,
                role: user.role,
                token
            })
});

export default router;