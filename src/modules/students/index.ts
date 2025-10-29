import { Router } from "express";
import * as studentsController from "./controller";

const studentsModule = Router();

studentsModule.get("/", studentsController.getStudents);
studentsModule.get("/:id", studentsController.getStudent);
studentsModule.post("/", studentsController.createStudent);
studentsModule.patch("/:id", studentsController.updateStudent);
studentsModule.delete("/:id", studentsController.deleteStudent);

export default studentsModule;
