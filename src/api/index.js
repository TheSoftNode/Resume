import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.config";

export const getUserDetail = () => {
  return new Promise((resolve, reject) => {
    const unsubscribeAuth = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        const userData = userCred.providerData[0];
        const userDocRef = doc(db, "users", userData?.uid);

        const unsubscribeSnapshot = onSnapshot(
          userDocRef,
          (_doc) => {
            if (_doc.exists()) {
              resolve(_doc.data());
            } else {
              setDoc(userDocRef, userData).then(() => {
                resolve(userData);
              });
            }
          },
          (error) => {
            reject(error);
          }
        );

        // Unsubscribe from the onSnapshot listener when no longer needed
        return () => unsubscribeSnapshot();
      } else {
        reject(new Error("User is not authenticated"));
      }
    });

    // Unsubscribe from the onAuthStateChanged listener when no longer needed
    return () => unsubscribeAuth();
  });
};

export const getTemplates = () => {
  return new Promise((resolve, reject) => {
   const templateQuery = query(
    collection(db, "templates"),
    orderBy("timestamp", "asc")
   );

   const unsubscribe = onSnapshot(templateQuery, (querySnap) => {
    const templates = querySnap.docs.map((doc) => doc.data());
    resolve(templates)
   });

   return () => unsubscribe();
  });
};

