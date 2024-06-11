import * as express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Function!");
});

export default router;
