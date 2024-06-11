import { Request, Response } from "express";
import * as logger from "firebase-functions/logger";
import { db } from "../config/firebase";

const getAllPoints = async (req: Request, res: Response) => {
  try {
    const allPoints = await db.collection("points").get();
    return res.status(200).json(allPoints.docs);
  } catch (error) {
    logger.error("error: getAllPoints", { error });
    return res
      .status(500)
      .json({ message: "Something went wrong when getting all points" });
  }
};

export { getAllPoints };
