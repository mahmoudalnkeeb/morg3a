import { config } from "./config/env";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";

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

app.use("/api", routes);

const port = config.app.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
