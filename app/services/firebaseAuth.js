import { getApps, initializeApp } from "firebase/app";
import { OAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCwVhxwYreGP8LOC-4aGp7xmh1PqHmAJkA",
	authDomain: "innoscope-academy.firebaseapp.com",
	projectId: "innoscope-academy",
	storageBucket: "innoscope-academy.appspot.com",
	messagingSenderId: "1069284562326",
	appId: "1:1069284562326:web:b04ebfa4b8f937def0f9b7"
};

if (!getApps().length) {
	initializeApp(firebaseConfig);
}

// Create a Microsoft provider object
let provider = new OAuthProvider("microsoft.com");

provider.setCustomParameters({
	prompt: "consent",
	tenant: "09e251dc-5e87-48bf-b4d2-71b01adb984a",
})

export default provider;