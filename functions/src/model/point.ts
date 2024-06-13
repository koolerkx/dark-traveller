import { differenceInSeconds } from "date-fns";
import { Firestore } from "firebase-admin/firestore";
import { POINT_CAPTURE_COOLDOWN_SECONDS } from "../constant";
import { CapturedPointInCooldownError } from "../error/error";

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

export interface CapturedPoints {
  id: string;
  clearedAt: Date | null;
  createdAt: Date;
  pointDocId: string;
  userEmail: string;
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

  // Please use with try-catch statement
  capturePoint = async ({
    pointDocId,
    userDocId,
    userEmail,
  }: {
    pointDocId: string;
    userDocId: string;
    userEmail: string;
  }) => {
    const now = new Date();
    const capturedPointsGroupRef = this.db.collectionGroup("capturedPoints");
    const userRef = this.db.collection("users").doc(userDocId);

    await this.db.runTransaction(async (t) => {
      const capturedPointSnapshot = await t.get(
        capturedPointsGroupRef
          .where("clearedAt", "==", null)
          .orderBy("createdAt", "desc")
      );

      if (capturedPointSnapshot.docs.length > 0) {
        const capturedPoints = capturedPointSnapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
              createdAt: new Date(doc.data().createdAt),
              clearedAt: doc.data().clearedAt
                ? new Date(doc.data().clearedAt)
                : null,
            } as CapturedPoints)
        );
        const latestCapturedPoints = capturedPoints[0];

        const timeSinceLastCapture = differenceInSeconds(
          now,
          latestCapturedPoints.createdAt
        );
        if (timeSinceLastCapture < POINT_CAPTURE_COOLDOWN_SECONDS) {
          throw new CapturedPointInCooldownError(
            POINT_CAPTURE_COOLDOWN_SECONDS - timeSinceLastCapture
          );
        }

        // Clear old records
        capturedPointSnapshot.docs.forEach(async (snapshot) => {
          await snapshot.ref.update({
            clearedAt: now.toISOString(),
          });
        });
      }

      // Insert new record
      await t.set(userRef.collection("capturedPoints").doc(), {
        pointDocId,
        userEmail,
        createdAt: now.toISOString(),
        clearedAt: null,
      });
    });
  };

  // Please use with try-catch statement
  clearPoint = async ({ pointDocId }: { pointDocId: string }) => {
    const now = new Date();
    const capturedPointsGroupRef = this.db.collectionGroup("capturedPoints");

    await this.db.runTransaction(async (t) => {
      const capturedPointSnapshot = await t.get(
        capturedPointsGroupRef
          .where("pointDocId", "==", pointDocId)
          .where("clearedAt", "==", null)
          .orderBy("createdAt", "desc")
      );
      if (capturedPointSnapshot.docs.length <= 0) {
        return;
      }
      const capturedPoints = capturedPointSnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
            createdAt: new Date(doc.data().createdAt),
            clearedAt: doc.data().clearedAt
              ? new Date(doc.data().clearedAt)
              : null,
          } as CapturedPoints)
      );
      const latestCapturedPoints = capturedPoints[0];
      const timeSinceLastCapture = differenceInSeconds(
        now,
        latestCapturedPoints.createdAt
      );
      if (timeSinceLastCapture < POINT_CAPTURE_COOLDOWN_SECONDS) {
        throw new CapturedPointInCooldownError(
          POINT_CAPTURE_COOLDOWN_SECONDS - timeSinceLastCapture
        );
      }
      // Clear old records
      capturedPointSnapshot.docs.forEach(async (snapshot) => {
        await snapshot.ref.update({
          clearedAt: now.toISOString(),
        });
      });
    });
  };
}
