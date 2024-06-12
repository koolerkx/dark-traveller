import { Firestore } from "firebase-admin/firestore";

export interface User {
  documentId: string;
  uid: string;
  name: string;
  email: string;
}

export class UserConnector {
  db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  getUserByEmail = async (email?: string): Promise<User> => {
    const userSnapshot = await this.db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      throw new Error("User not found");
    }

    const user = userSnapshot.docs.map(
      (doc) => ({ documentId: doc.id, ...doc.data() } as User)
    );

    return user[0];
  };
}
