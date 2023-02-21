import express from "express";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, addDoc, getDoc, query, where, updateDoc } from "firebase/firestore";
import cors from "cors"


// Import the functions you need from the SDKs you need

import { doc, setDoc } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";
import dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config()

const app = express();
app.use(express.json())
app.use(cors());


let count;
const apiKey = process.env.FIREBASECONFIG_APIKEY
const authDomain = process.env.FIREBASECONFIG_AUTHDOMAIN
const projectId = process.env.FIREBASECONFIG_PROJECTID
const storageBucket = process.env.FIREBASECONFIG_STORAGEBUCKET
const messageSenderId = process.env.FIREBASECONFIG_MESSAGINGSENDERID
const appId = process.env.FIREBASECONFIG_APPID
const measurementId = process.env.FIREBASECONFIG_MEASUREMENTID
const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messageSenderId,
    appId,
    measurementId
}

//   // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig as any);

// fetch count from database, then add one and send back to database
app.post("/", async function (req, res) {
    
   const database = getFirestore(firebaseApp);
    const docRef = await getDocs(collection(database, "count"))
    count = docRef.docs.map(doc => doc.data())
    count = count[0].count
    count = count + 1
    await setDoc(doc(database, "count", "count"), {
        count
    })
  
    res.send(count.toString())

})

// Server-side code
app.get("/", async function (req, res) {

    // const userid = req.params.userid;
    const database = getFirestore(firebaseApp);
    const docRef = await getDocs(collection(database, "count"))
    const count = docRef.docs.map(doc => doc.data())


    res.send(count);
});

app.listen(3004)