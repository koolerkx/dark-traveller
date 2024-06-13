import * as express from "express";
import {
  capturePoint,
  clearPoint,
  getAllPoints,
  getPoint,
} from "./controller/pointController";
import { firebaseAdminMiddleware } from "./middleware/firebaseAdminMiddleware";
import { firebaseAuthMiddleware } from "./middleware/firebaseAuthMiddleware";
import { connectorMiddleware } from "./middleware/connectorMiddleware";

const authRouter = express.Router();

authRouter.use(firebaseAdminMiddleware);
authRouter.use(firebaseAuthMiddleware);
authRouter.use(connectorMiddleware);

authRouter.get("/points/:pointDocId", getPoint);
authRouter.get("/points", getAllPoints);
authRouter.post("/points/capture", capturePoint);
authRouter.post("/points/clear", clearPoint);

const publicRouter = express.Router();

publicRouter.get("/", (req, res) => {
  res.send("Hello Function!");
});

export { authRouter, publicRouter };
