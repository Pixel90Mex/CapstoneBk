import {Router} from "express";
import bcrypt from "bcrypt";
import interClassModel from "../../models/interClasses/interClassModel";

const router = Router();

//GET
router.get("/interclasses", async (req, res) => {
    const { page = 1, pageSize = 3} = req.query;

    try {
        const 
    } catch (error) {
        
    }
})
