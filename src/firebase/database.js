import app from "./init.js";
import { getFirestore, setDoc,collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { getCurrentUser } from "./auth.js";

const db = getFirestore(app);
const usersRef = collection(db,"users");

export async function createUserData(full_name, email, uid){
    const ref = doc(usersRef, uid);
   await setDoc(ref,{
        "full_name": full_name,
        "email": email, 
        "uid": uid
    })

}

export async function getUserProjects(){
    const uid = (await getCurrentUser()).uid;
    const ref = doc(usersRef, uid);
    const projectCollection = collection(ref, "projects");
    const projects = await getDocs(projectCollection);
    let projectList = [];
    projects.forEach((project) => {
        let projObj = {
            "name": project.data().name,
            "id": project.id
        }
        projectList.push(projObj);
        
    })
    return projectList;
}

export async function getUserProject(projectName){
    const uid = (await getCurrentUser()).uid;
    const ref = doc(usersRef, uid);
    const projectCollection = collection(ref, "projects");
    const projects = await getDocs(projectCollection);
    let project = {};
    projects.forEach((proj) => {
        if(proj.data().name == projectName){
            project = proj.data();
            project.id = proj.id;
        }
    })
    return project;
}

export async function updateProjFiles(projectId, projectFiles){
    const uid = (await getCurrentUser()).uid;
    const ref = doc(usersRef, uid);
    const projectCollection = collection(ref, "projects");
    const project = doc(projectCollection, projectId);
    await updateDoc(project, {
        "files": projectFiles
    })

   
}

export async function createProject(projectName){
    const uid = (await getCurrentUser()).uid;
    const ref = doc(usersRef, uid);
    const projectCollection = collection(ref, "projects");
    await setDoc(doc(projectCollection), {
        "name": projectName,
        "files": []
    })
}

