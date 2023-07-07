import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import studentsRoute from "./routes/students/students.js";
import teachersRoute from "./routes/teachers/teacher.js";
import classesRoute from "./routes/classes/classes.js";
import loginRoute from "./routes/login/login.js";

const PORT = 5050;

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.use("/", studentsRoute);
server.use("/", teachersRoute);
server.use("/", classesRoute);
server.use("/", loginRoute);

mongoose.connect('mongodb+srv://andre90mexican:kKGF8EsYVNsejPJU@corsoepicode.91bakel.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Errore di connessione al database...'));
db.once('open', () => {
  console.log('Connessione al database effettuata con successo...');
});

server.listen(PORT, () => console.log(`Server avviato alla posta ${PORT}`));

