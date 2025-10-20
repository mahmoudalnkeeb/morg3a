import { Router } from "express";
import type { Request, Response, NextFunction } from "express";

const studentsModule = Router();

studentsModule.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Students module" });
});

export default studentsModule;
