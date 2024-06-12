import { NextFunction, Request, Response } from "express";
import { logger } from "firebase-functions/v1";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  logger.error(
    {
      error: err.name,
      message: err.message,
    },
    { structuredData: true }
  );

  return res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
};
