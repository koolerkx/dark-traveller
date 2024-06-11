import * as admin from "firebase-admin";

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: (process.env.PRIVATE_KEY as string).replace(/\\n/g, "\n"),
    }),
  });
} catch (e: unknown) {
  admin.initializeApp();
}

const db = admin.firestore();

export { admin, db };
