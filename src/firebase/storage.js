import { getStorage, ref, getDownloadURL, uploadString } from "firebase/storage";
import app from './init.js';

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

export async function getFileCode(path){
    let fileRef = ref(storage,path);
   // console.log(fileRef, "fileRef")
    let url = await getDownloadURL(fileRef);
    //console.log(url, "url")
    let file = await fetch(url);
    let code = await file.text();
    //console.log(code, "Code")
    return code;
}

export async function setFileCode(path, code){
    let fileRef = ref(storage,path);
    //console.log(fileRef, "fileRef")
    await uploadString(fileRef, code);
    console.log("Code uploaded successfully")

}