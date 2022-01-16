import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "../config";
import "firebase/storage";

firebase.initializeApp(config);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
