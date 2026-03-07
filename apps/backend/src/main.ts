import { env } from "./config/env.js";
import { createServer } from "./server.js";

const app = createServer();

app.listen(env.port, () => {
  console.log(`[BOOT] API listening on http://localhost:${env.port}`);
});
