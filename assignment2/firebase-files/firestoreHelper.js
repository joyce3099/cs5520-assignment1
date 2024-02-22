import { collection, addDoc, deleteDoc,doc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";

export async function writeToDB(data){
    try{
    const docRef = await addDoc(collection(database,"activities"),data)
} catch(e){
    console.log("error",e)
}
}