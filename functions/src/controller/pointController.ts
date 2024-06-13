import { NextFunction, Request, Response } from "express";
import {
  CapturedPointInCooldownError,
  ConnectorNotExistError,
  RequestParamsMissingError,
} from "../error/error";

export const getAllPoints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.connector) return next(new ConnectorNotExistError());

  const points = await req.connector.point.getPoints();

  return res.status(200).json(points);
};

export const capturePoint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.connector) return next(new ConnectorNotExistError());
  if (!req.body.pointDocId)
    return next(new RequestParamsMissingError(["pointDocId"]));

  const user = await req.connector.user.getUserByEmail(req.user!.email);

  try {
    await req.connector.point.capturePoint({
      userDocId: user.documentId,
      userName: user.name,
      userEmail: user.email,
      pointDocId: req.body.pointDocId,
    });
  } catch (error) {
    if (error instanceof CapturedPointInCooldownError) {
      return res
        .status(400)
        .json({ message: error.message, info: error.messageInfo() });
    }
    return next(error);
  }

  return res.sendStatus(204);
};

export const clearPoint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.connector) return next(new ConnectorNotExistError());
  if (!req.body.pointDocId)
    return next(new RequestParamsMissingError(["pointDocId"]));

  try {
    await req.connector.point.clearPoint({ pointDocId: req.body.pointDocId });
  } catch (error) {
    if (error instanceof CapturedPointInCooldownError) {
      return res
        .status(400)
        .json({ message: error.message, info: error.messageInfo() });
    }
    return next(error);
  }

  return res.sendStatus(204);
};
