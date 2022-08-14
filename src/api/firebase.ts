import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAupLLqr90XxEG5x_XybSGMIFtmevJgIzo",
  authDomain: "the-game-keeper.firebaseapp.com",
  databaseURL: "https://the-game-keeper.firebaseio.com",
  projectId: "the-game-keeper",
  storageBucket: "the-game-keeper.appspot.com",
  messagingSenderId: "580632191659",
  appId: "1:580632191659:web:786d9fd7f358c065d88dee",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
