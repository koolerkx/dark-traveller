import { Firestore } from "firebase-admin/firestore";

export interface Point {
  id: string;
  point: string;
  description: string;
  heroImage: string | null;
  location: {
    lat: number;
    long: number;
  };
  isPublic: boolean;
}

export class PointConnector {
  db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  getPoints = async (): Promise<Point[]> => {
    const pointsSnapshot = await this.db.collection("points").get();
    const points = pointsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Point)
    );

    return points;
  };

  capturePoint = async ({
    pointDocId,
    userDocId,
    userEmail,
  }: {
    pointDocId: string;
    userDocId: string;
    userEmail: string;
  }) => {
    await this.db
      .collection("users")
      .doc(userDocId)
      .collection("capturedPoints")
      .doc()
      .set({
        pointDocId,
        userEmail,
        createdAt: new Date().toISOString(),
      });
  };
}
