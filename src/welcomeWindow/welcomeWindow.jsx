import { useEffect, useState, useRef } from 'react'
import './welcomeWindow.css'
import CodeTopBar from '../codeWindow/topbar'



function WelcomeWindow({setProjName, setFiles, readFilesLocally, setShowWelcome}){
   
    const [projects, setProjects] = useState([])
    const [createProjName, setCreateProjName] = useState("")
    
    useEffect(() => {
        let projects = localStorage.getItem("projects")
       
        if(projects != null){
            projects = JSON.parse(projects)
            console.log(projects)
            setProjects(projects)
            
        }
    }, [])

    function handleSelectProj(e){
        let selectedProj = e.target.innerHTML
        setProjName(selectedProj)
        localStorage.setItem("currentProj", selectedProj)
        setFiles(readFilesLocally())
        console.log(selectedProj + " - selectedproj dialog")
        setShowWelcome(false)
    }

    function handleCreateProj(){

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
            files: []
        }
        localStorage.setItem("projects-" + createProjName, JSON.stringify(project))
        let createProjDialog = document.querySelector('.CreateProject')
        createProjDialog.close()
        setProjName(createProjName)
        localStorage.setItem("currentProj", createProjName)
        setFiles(readFilesLocally())
        setShowWelcome(false)
    }

    function handleShowCreateProj(){
        let createProjDialog = document.querySelector('.CreateProject')
        createProjDialog.showModal()
    }

    
    return (
        <>
        <CodeTopBar projName={""} selectedFile={""} canSave={false} setCanSave={() => {}} run={false} setRun={() => {}} setSavedCode={() => {}} currentCode={""}/>
        <div className='WelcomeWindow'>
                <h1>Welcome to Professor Java!</h1>
                <p>Professor Java is a simple IDE for a custom language Javaish.
                    It is designed to be a simple way to learn the basics of programming.
                    To get started, create a new project or open an existing one.
                    If you want to learn more about the language, click <a className='InfoLink'>here</a>
                </p>
                <label className='ProjectsLabel'>Projects: </label>
                <div className='Projects'>
                    {projects.map((project) => {
                        return <p key={project} onClick={handleSelectProj} className='ProjectLabel'>{project}</p>
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