import app from './init.js';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, browserSessionPersistence, setPersistence, signOut } from "firebase/auth";
import { createUserData } from './database.js';

const auth = getAuth(app);

export async function createUser(full_name, email, password){
    
    console.log("Emal: " + email + " Password: " + password)
    let user = (await createUserWithEmailAndPassword(auth,email, password)).user;
    await updateProfile(auth.currentUser, {
      displayName: full_name
    })

    await createUserData(full_name, email, user.uid)
    
    console.log("User created successfully")
    return user;
      
    
    
}

export async function signIn(email, password){
    

   await signInWithEmailAndPassword(auth, email, password)
    console.log("Signed in successfully")
    await setPersistence(auth, browserSessionPersistence)
    let user = await signInWithEmailAndPassword(auth, email, password);
    return user
}

export async function signOutUser(){
 
    await signOut(auth);
    console.log("Signed out successfully")
}

export async function isLoggedIn(){
  let loggedIn = await auth.currentUser != null;
    return loggedIn;
}

export async function getCurrentUser(){
  let user = await auth.currentUser;
  return user;
}
