import { Router } from "express";
import * as lessonsController from "./controller";

const lessonsModule = Router();

lessonsModule.get("/", lessonsController.getLessons);
lessonsModule.get("/:id", lessonsController.getLesson);
lessonsModule.post("/", lessonsController.createLesson);
lessonsModule.patch("/:id", lessonsController.updateLesson);
lessonsModule.delete("/:id", lessonsController.deleteLesson);

export default lessonsModule;
