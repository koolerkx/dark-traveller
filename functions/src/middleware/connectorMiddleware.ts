import { Request, Response, NextFunction } from "express";
import { PointConnector } from "../model/point";
import { ContextNotExistError } from "../error/error";
import { UserConnector } from "../model/user";

// This middleware must put after firebaseAdminMiddleware
export const connectorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.context) {
    throw new ContextNotExistError();
  }

  req.connector = {
    point: new PointConnector(req.context.db),
    user: new UserConnector(req.context.db),
  };

  next();
};

/* eslint-disable no-unused-vars */
declare global {
  namespace Express {
    interface Request {
      connector?: {
        point: PointConnector;
        user: UserConnector;
      };
    }
  }
}
