import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase.config";
import { toast } from "react-toastify";

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
      resolve(templates);
    });

    return () => unsubscribe();
  });
};

export const saveToCollection = async (user, data) => {
  if (!user?.collections?.includes(data?._id)) {
    const docRef = doc(db, "users", user?.uid);

    await updateDoc(docRef, {
      collections: arrayUnion(data?._id),
    })
      .then(() => toast.success("Saved To Collections"))
      .catch((err) => toast.error(`Error: ${err.message}`));
  } else {
    const docRef = doc(db, "users", user?.uid);

    await updateDoc(docRef, {
      collections: arrayRemove(data?._id),
    })
      .then(() => toast.success("Removed From Collections"))
      .catch((err) => toast.error(`Error: ${err.message}`));
  }
};

export const saveToFavorite = async (user, data) => {
  if (!data?.favorites?.includes(user?.uid)) {
    const docRef = doc(db, "templates", data?._id);

    await updateDoc(docRef, {
      favorites: arrayUnion(user?.uid),
    })
      .then(() => toast.success("Added To Favorites"))
      .catch((err) => toast.error(`Error: ${err.message}`));
  } else {
    const docRef = doc(db, "templates", data?._id);

    await updateDoc(docRef, {
      favorites: arrayRemove(user?.uid),
    })
      .then(() => toast.success("Removed From Favorites"))
      .catch((err) => toast.error(`Error: ${err.message}`));
  }
};
