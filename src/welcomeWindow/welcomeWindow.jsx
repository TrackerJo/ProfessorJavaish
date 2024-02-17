import { useEffect, useState, useRef } from 'react'
import './welcomeWindow.css'
import CodeTopBar from '../codeWindow/topbar'



function WelcomeWindow({setProjName, setFiles, readFiles, setShowWelcome, loadUser, projects, readFBFiles, setLoadingFiles, showInfoWindow}){
   
    
    const [createProjName, setCreateProjName] = useState("")

    useEffect(() => {
        console.log('projects changed')
        console.log(projects)
    }, [projects])
    
    async function handleSelectProj(e){
        setShowWelcome(false)
        setLoadingFiles(true)
        let selectedProj = e.target.innerHTML
        console.log(selectedProj)
        localStorage.setItem("currentProj", selectedProj)
        let lcoalProj = localStorage.getItem("projects-" + selectedProj)
        setProjName(selectedProj)
        if(lcoalProj == null){
            let fbFiles = await readFBFiles()
            console.log(fbFiles + " - " + selectedProj)
            let project = {
                name: selectedProj,
                files: fbFiles,
                synced: true,
                firebase: true,
                loadedFiles: false
            }
            console.log(JSON.stringify(project))
            localStorage.setItem("projects-" + selectedProj, JSON.stringify(project))
        }
        let files = await readFiles()
        console.log(files)
        //Check if proj is in firebase
      
       
        
        setFiles(files)
        console.log(selectedProj + " - selectedproj dialog")
        setLoadingFiles(false)
    }

    async function handleCreateProj(){

        let projects = localStorage.getItem("projects")
        if(projects == null){
            projects = []
        }
        projects = JSON.parse(projects)
        projects.push(createProjName)
        console.log(projects)
        localStorage.setItem("projects", JSON.stringify(projects))
        let project = {
            name: createProjName,
            files: [],
            synced: false
        }
        localStorage.setItem("projects-" + createProjName, JSON.stringify(project))
        let createProjDialog = document.querySelector('.CreateProject')
        createProjDialog.close()
        setProjName(createProjName)
        localStorage.setItem("currentProj", createProjName)
        let files = await readFiles()
        setFiles(files)
        setShowWelcome(false)
    }

    function handleShowCreateProj(){
        let createProjDialog = document.querySelector('.CreateProject')
        createProjDialog.showModal()
    }

    
    return (
        <>
        <CodeTopBar projName={""} selectedFile={""} canSave={false} setCanSave={() => {}} run={false} setRun={() => {}} setSavedCode={() => {}} currentCode={""} loadUser={loadUser}/>
        <div className='WelcomeWindow'>
                <h1>Welcome to Professor Javaish!</h1>
                <p>Professor Javaish is a simple IDE for a custom language Javaish.
                    It is designed to be a simple way to learn the basics of programming.
                    To get started, create a new project or open an existing one.
                    If you want to learn more about the language, click <a className='InfoLink' onClick={showInfoWindow}>here</a>
                </p>
                <label className='ProjectsLabel'>Projects: </label>
                <div className='Projects'>
                    {projects.map((project) => {
                        return <label key={project} onClick={handleSelectProj} className='ProjectLabel'>{project}</label>
                    })}
                    <a className='CreateProjectBtn' onClick={handleShowCreateProj}>Create New Project...</a>
                    </div>
            
            
        </div>

        <dialog className="CreateProject">
            <div className='CreateProjectDiv'>
                <h2 className="CreateProjectTitle">Enter Project Name</h2>
                <input type="text" className='CreateProjectInput' onChange={(e) => setCreateProjName(e.target.value)}/>
                <br />
                <button className="CreateProjectButton" onClick={handleCreateProj}>Create Project</button>
            </div>
        </dialog>
        </>
    )
}

export default WelcomeWindow