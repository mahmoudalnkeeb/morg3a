import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/index.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(config.corsOptions));
app.use(
  helmet({
    hidePoweredBy: true,
    noSniff: true,
    dnsPrefetchControl: { allow: false },
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default app;
