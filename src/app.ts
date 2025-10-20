import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/index.ts";
import studentsModule from "./modules/students/index.ts";
import errorHandler from "./middlewares/error.ts";
import notFound from "./middlewares/notFound.ts";
import { db } from "./db/index.ts";

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

app.use("/api", apiRouter);

// Global middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
