import app from "./app.ts";
import { config } from "./config/index.ts";

const port = config.app.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
