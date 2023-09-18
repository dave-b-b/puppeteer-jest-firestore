const dotenv = require('dotenv');
dotenv.config()

const serviceAccountString = process.env.SERVICE_ACCOUNT_KEY;
const serviceAccount = JSON.parse(serviceAccountString);

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp({
	credential: cert(serviceAccount),
});
const db = getFirestore();

module.exports = {
	db,
	FieldValue,
};
