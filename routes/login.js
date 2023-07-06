import { Router } from "express";
import bcrypt from "bcrypt";
import teacherModel from "../models/teachers/teacherModel.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
    const user = await teacherModel.findOne({ email: req.body.email});

    if(!user) {
        return res
        .status(404)
        .send({
            message: "Utente non trovato",
            statusCode: 404
        });
    };
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
        email: user.email,
        role: user.role,
        id: user.id
        },
        process.env.SECRET_JWT_KEY,
        {
            expiresIn: "24",
        }
    );
    res.header("auth", token)
            .status(200)
            .send({
                message: "Login effettuato con successo",
                statusCode: 200,
                token
            })
});

export default router;