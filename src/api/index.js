import { doc, onSnapshot, setDoc } from "firebase/firestore";
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



// import { doc, onSnapshot, setDoc } from "firebase/firestore";
// import { auth, db } from "../config/firebase.config";

// export const getUserDetail = async () => {
//   try {
//     const userCred = await auth.onAuthStateChanged();
//     if (!userCred) {
//       throw new Error("User is not authenticated");
//     }

//     const userData = userCred.providerData[0];
//     const userDocRef = doc(db, "users", userData?.uid);

//     const _doc = onSnapshot(userDocRef);
//     if (_doc.exists()) {
//       return _doc.data();
//     } else {
//       await setDoc(userDocRef, userData);
//       return userData;
//     }
//   } catch (error) {
//     throw error;
//   }
// };