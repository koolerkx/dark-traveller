import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

const emulatorHost = process.env.FIREBASE_FIRESTORE_EMULATOR_HOST; // Firestore emulator host
const useEmulator = process.env.FIRESTORE_EMULATOR === "true";

if (
  !process.env.PROJECT_ID ||
  !process.env.CLIENT_EMAIL ||
  !process.env.PRIVATE_KEY
) {
  throw new Error("Please set firebase credentials in .env file");
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: (process.env.PRIVATE_KEY as string).replace(/\\n/g, "\n"),
  }),
});

const db = admin.firestore();

if (useEmulator) {
  console.log(emulatorHost);
  admin.firestore().settings({
    host: emulatorHost,
    ssl: false,
  });
}

const deleteCollection = async (collectionPath: string, batchSize: number) => {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
};

const deleteQueryBatch = async (
  db: FirebaseFirestore.Firestore,
  query: FirebaseFirestore.Query,
  resolve: any
) => {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
};

const seedData = async () => {
  const dataDir = path.resolve(__dirname, "../data");
  const files = fs.readdirSync(dataDir);

  for (const file of files) {
    const collectionName = path.basename(file, path.extname(file));
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Delete the existing collection
    await deleteCollection(collectionName, 100);

    // Seed new data
    const batch = db.batch();
    for (const [docId, docData] of Object.entries(data)) {
      const docRef = db.collection(collectionName).doc(docId);
      batch.set(docRef, docData);
    }

    try {
      await batch.commit();
      console.log(`Seeding ${collectionName} successful`);
    } catch (error) {
      console.error(`Error seeding data for ${collectionName}:`, error);
    }
  }
};

seedData().catch(console.error);
