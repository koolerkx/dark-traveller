import * as express from "express";
import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";
import router from "./router";

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

const app = express();

app.use("/v1", router);

export const api = onRequest(app);
