import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDagLWp_FfU9ixILhiH_zopld9oMJQCHUo",
  authDomain: "crown-db-9c297.firebaseapp.com",
  projectId: "crown-db-9c297",
  storageBucket: "crown-db-9c297.appspot.com",
  messagingSenderId: "527085123920",
  appId: "1:527085123920:web:06aab253ae95394f421455",
  measurementId: "G-7ZFB2S664P",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return userRef;
};

export const createUserProfileCart = async (userId, cartItems) => {
  if (!userId) return;

  const cartRef = firestore.doc(`carts/${userId}`);

  const snapShot = await cartRef.get();

  if (!snapShot.exists) {
    try {
      await cartRef.set({
        cartItems: cartItems,
      });
    } catch (err) {
      console.log("error creating cart", err.message);
    }
  }

  return cartRef;
};

export const setUserCartitems = async (cartItems, id) => {
  if (!id) return;

  const cartRef = firestore.doc(`carts/${id}`);

  try {
    await cartRef.set({
      cartItems: cartItems,
    });
  } catch (err) {
    console.log("error saving cart", err.message);
  }
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accum, collection) => {
    accum[collection.title.toLowerCase()] = collection;
    return accum;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
