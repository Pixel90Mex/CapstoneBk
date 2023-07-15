import { Router } from "express";
import classModel from "../../models/classes/classModel.js";
import studentModel from "../../models/students/studentModel.js";

const router = Router();

//GET
router.get("/class", async (req, res) => {
    const { page = 1, pageSize = 13 } = req.query;

    try {
        const classes = await classModel
            .find()
            .populate("class.students")
            .limit(pageSize)
            .skip((page - 1) * pageSize);
        
        const totalClasses = await classModel.count();

        res.status(200).send({
            currentPage: +page,
            totalClasses: totalClasses,
            classes,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server",
            error: error.message,
            statusCode: 500
        })
    }
});
//GET BY SECTION
router.get("/class/:id", async (req, res) => {
    const { page = 1, pageSize = 13 } = req.query;
    const { id } = req.params;
    try {
        const SingleClass = await classModel.findById(id)
        .populate("class.students")
        .limit(pageSize)
        .skip((page - 1) * pageSize);

        console.log(SingleClass)
        res.status(200).send({
            currentPage: +page,
            SingleClass,
            statusCode:200
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Errore interno del server",
            statusCode: 500
        });
    }
});
//POST 
router.post("/class", async (req, res) => {
    const { section, students} = req.body;
    
    //ciclo con condizionale per la section su array di studenti che arriva nella request + return 
    const classToInsert = await classModel({
        class: {
            section: req.body.class.section,
            students: req.body.class.students
        }
    })
    console.log(classToInsert)
    try {
        const sectionExist = await classModel.findOne({
            $or: [{ section:req.body.class.section },{students:req.body.class.students} ]
        });
        if (sectionExist) {
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
            message: "Errore interno del server",
            error: error.message,
            statusCode: 500
        })
    }
});

router.patch("/student/patchVote/:id", async(req, res) => {
    const {value, quad, mat, type} = req.body;
    const {id} = req.params
    const updateQuery={
        $push:{
            [`school_subjects.${quad}.${mat}.${type}`]: value
        }
    }
    try {
        const VoteToUpdate = await studentModel.findByIdAndUpdate(
            id,
            updateQuery, 
            {
                new: true
            }
        )
        res.status(200).send(VoteToUpdate)
    } catch (error) {
        console.log(error)
    }
} )

export default router;