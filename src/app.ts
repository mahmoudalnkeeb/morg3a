import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "@/config";
import errorHandler from "@/middlewares/error";
import notFound from "@/middlewares/notFound";
import { db } from "@/db";
import studentsModule from "@/modules/students";
import gradesModule from "@/modules/grades";

const app = express();

db.execute("SELECT 1")
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

const apiRouter = express.Router();

apiRouter.use(cors(config.corsOptions));
apiRouter.use(
  helmet({
    hidePoweredBy: true,
    noSniff: true,
    dnsPrefetchControl: { allow: false },
  }),
);

// Register modules
apiRouter.use("/students", studentsModule);
apiRouter.use("/grades", gradesModule);

app.use("/api", apiRouter);

// Global middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
