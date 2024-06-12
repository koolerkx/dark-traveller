import * as express from "express";
import { getAllPoints } from "./controller/pointController";
import { firebaseAdminMiddleware } from "./middleware/firebaseAdminMiddleware";

const authRouter = express.Router();

authRouter.use(firebaseAdminMiddleware);

authRouter.get("/points", getAllPoints);

const publicRouter = express.Router();

publicRouter.get("/", (req, res) => {
  res.send("Hello Function!");
});

export { authRouter, publicRouter };
