import { NextFunction, Request, Response } from "express";
import { logger } from "firebase-functions/v1";
import { ErrorWithMessageInfo } from "./error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  if (err instanceof ErrorWithMessageInfo) {
    logger.error(
      {
        error: err.name,
        message: err.message,
        info: err.messageInfo(),
      },
      { structuredData: true }
    );

    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
      info: err.messageInfo(),
    });
  } else {
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
  }
};
