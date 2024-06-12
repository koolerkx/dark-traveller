import { Request, Response } from "express";

export const getAllPoints = async (req: Request, res: Response) => {
  if (!req.connector)
    return res.status(500).json({ message: "Connector not in context" });

  const points = await req.connector.point.getPoints();

  return res.status(200).json(points);
};
