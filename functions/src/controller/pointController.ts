import { NextFunction, Request, Response } from "express";
import {
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

  req.connector.point.capturePoint({
    userDocId: user.documentId,
    userEmail: user.email,
    pointDocId: req.body.pointDocId,
  });

  return res.status(200).json({});
};
