import { Request, Response, NextFunction } from "express";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";

export const firebaseAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (getApps().length <= 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: (process.env.PRIVATE_KEY as string).replace(/\\n/g, "\n"),
      }),
    });
  }

  const db = getFirestore();

  req.context = { ...req.context, db };
  next();
};

/* eslint-disable no-unused-vars */
declare global {
  namespace Express {
    interface Request {
      context?: {
        db: Firestore;
      };
    }
  }
}
