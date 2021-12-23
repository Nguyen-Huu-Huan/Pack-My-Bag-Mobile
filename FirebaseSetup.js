import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/database";
const firebaseConfig = {
	apiKey: "AIzaSyAqXSuf1ew7AunUxl5LgqPBJFqHjle1kUE",
	authDomain: "intro-to-comsys.firebaseapp.com",
	databaseURL: "https://intro-to-comsys-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "intro-to-comsys",
	storageBucket: "intro-to-comsys.appspot.com",
	messagingSenderId: "265826025213",
	appId: "1:265826025213:web:e2d1077bf59b1f893a0894",
};
let app;

if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const database = app.database();
const storage = app.storage();

export { database, storage };
