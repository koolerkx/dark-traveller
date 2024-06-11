import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as express from "express";
import router from "./router";

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

const app = express();
// app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.use("/v1", router);

export const api = onRequest(app);
