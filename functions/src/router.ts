import * as express from "express";
import { getAllPoints } from "./controller/pointController";
import { firebaseAdminMiddleware } from "./middleware/firebaseAdminMiddleware";
import { firebaseAuthMiddleware } from "./middleware/firebaseAuthMiddleware";
import { connectorMiddleware } from "./middleware/connectorMiddleware";

const authRouter = express.Router();

authRouter.use(firebaseAdminMiddleware);
authRouter.use(firebaseAuthMiddleware);
authRouter.use(connectorMiddleware);

authRouter.get("/points", getAllPoints);

const publicRouter = express.Router();

publicRouter.get("/", (req, res) => {
  res.send("Hello Function!");
});

export { authRouter, publicRouter };
