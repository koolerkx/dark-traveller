import { NextFunction, Request, Response } from "express";
import { ConnectorNotExistError } from "../error/error";

export const getAllPoints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.connector) return next(new ConnectorNotExistError());

  const points = await req.connector.point.getPoints();

  return res.status(200).json(points);
};
