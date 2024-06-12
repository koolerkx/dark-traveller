import { Request, Response, NextFunction } from "express";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";

// This middleware must put after firebaseAdminMiddleware
export const firebaseAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
    return;
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

/* eslint-disable no-unused-vars */
declare global {
  namespace Express {
    interface Request {
      user?: DecodedIdToken;
    }
  }
}
