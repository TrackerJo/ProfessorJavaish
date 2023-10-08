import app from './init.js';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, browserSessionPersistence, setPersistence, signOut } from "firebase/auth";
import { createUserData } from './database.js';

const auth = getAuth(app);

export async function createUser(full_name, email, password){
    
    console.log("Emal: " + email + " Password: " + password)
    await createUserWithEmailAndPassword(auth,email, password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
            displayName: full_name
          }).then(async() => {
            // Profile updated!
            //Add user to database
          

            await createUserData(full_name, email, user.uid)
        
            console.log("User created successfully")
            
          }).catch((error) => {
            // An error occurred
            alert("Error when updating profile. Look in console for more info.")
            console.log("Recieved error: " + error.message + " with error code " + error.code + " when updating profile.")
          });
       
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error when registering account. Look in console for more info.")
        console.log("Recieved error: " + errorMessage + " with error code " + errorCode + " when registering account.")
    });
    
}

export async function signIn(email, password){
    

   await signInWithEmailAndPassword(auth, email, password)
    console.log("Signed in successfully")
    await setPersistence(auth, browserSessionPersistence)
    return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser(){
 
    await signOut(auth);
    console.log("Signed out successfully")
}