import { Request, Response } from "express";
import * as logger from "firebase-functions/logger";
import { ContextNotExistError } from "../error";

export const getAllPoints = async (req: Request, res: Response) => {
  if (!req.context) {
    throw new ContextNotExistError();
  }

  try {
    const { db } = req.context;

    const allPoints = await db.collection("points").get();

    return res.status(200).json(allPoints.docs);
  } catch (error) {
    logger.error("error: getAllPoints", { error });
    return res
      .status(500)
      .json({ message: "Something went wrong when getting all points" });
  }
};
