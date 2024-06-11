import * as express from "express";
import { getAllPoints } from "./controller/pointController";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Function!");
});

router.get("/points", getAllPoints);

export default router;
