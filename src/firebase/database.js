import app from "./init.js";
import { getFirestore, setDoc,collection, doc } from "firebase/firestore";

const db = getFirestore(app);
const usersRef = collection(db,"users");

export async function createUserData(full_name, email, uid){
    const ref = doc(usersRef, uid);
   await setDoc(ref,{
        "full_name": full_name,
        "email": email, 
        "uid": uid,
        "projects": []
    })

}

