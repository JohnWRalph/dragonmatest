"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const cors_1 = __importDefault(require("cors"));
// Import the functions you need from the SDKs you need
const firestore_2 = require("firebase/firestore");
// import { collection, addDoc } from "firebase/firestore";
const dotenv_1 = __importDefault(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
let errorMessage;
let count;
const apiKey = process.env.FIREBASECONFIG_APIKEY;
const authDomain = process.env.FIREBASECONFIG_AUTHDOMAIN;
const projectId = process.env.FIREBASECONFIG_PROJECTID;
const storageBucket = process.env.FIREBASECONFIG_STORAGEBUCKET;
const messageSenderId = process.env.FIREBASECONFIG_MESSAGINGSENDERID;
const appId = process.env.FIREBASECONFIG_APPID;
const measurementId = process.env.FIREBASECONFIG_MEASUREMENTID;
const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messageSenderId,
    appId,
    measurementId
};
//   // Initialize Firebase
const firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
// fetch count from database, then add one and send back to database
app.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const database = (0, firestore_1.getFirestore)(firebaseApp);
        const docRef = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(database, "count"));
        count = docRef.docs.map(doc => doc.data());
        count = count[0].count;
        count = count + 1;
        yield (0, firestore_2.setDoc)((0, firestore_2.doc)(database, "count", "count"), {
            count
        });
        res.send(count.toString());
    });
});
// Server-side code
app.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const userid = req.params.userid;
        const database = (0, firestore_1.getFirestore)(firebaseApp);
        const docRef = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(database, "count"));
        const count = docRef.docs.map(doc => doc.data());
        res.send(count);
    });
});
app.listen(3004);
