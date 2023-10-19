import { useState, useEffect } from 'react'

import './App.css'

import FilesWindow from './filesWindow/filesWindow'
import CodeWindow from './codeWindow/codeWindow'
import TopBar from './topBar/topBar'
import ConsoleWindow from './consoleWindow/consoleWindow'

import SelectProject from './SelectProject/SelectProject'
import WelcomeWindow from './welcomeWindow/welcomeWindow'
import { createProject, createUserData, getUserProject, getUserProjects, updateProjFiles } from './firebase/database'
import { isLoggedIn } from './firebase/auth'
import { getFileCode, setFileCode } from './firebase/storage'
import ConvertWindow from './convertWindow/convertWindow'
import InfoWindow from './infoWindow/infoWindow'



function App() {
  const [selectedFile, setSelectedFile] = useState("")
  const [projName, setProjName] = useState("")
  const [files, setFiles] = useState([])
  const [fileTxt, setFileTxt] = useState("")
  const [canSave, setCanSave] = useState(false)
  const [startingCode, setStartingCode] = useState("")
  const [run, setRun] = useState(false)
  const [consoleMsgs, setConsoleMsgs] = useState([])
  const [alertMsg, setAlertMsg] = useState("")
  const [alertOpen, setAlertOpen] = useState(false)
  const [savedCode, setSavedCode] = useState("")
  const [showWelcome, setShowWelcome] = useState(true)
  const [projects, setProjects] = useState([])
  const [loadedProjs, setLoadedProjs] = useState(false)
  const [gettingCode, setGettingCode] = useState(false)
  const [canCloudSave, setCanCloudSave] = useState(false)
  const [convertedCode, setConvertedCode] = useState("")
  const [showConvertWindow, setShowConvertWindow] = useState(false)
  const [loadingFiles, setLoadingFiles] = useState(false)
  const [showInfoWindow, setShowInfoWindow] = useState(false)

  useEffect(() => {
   
  
    function loadAuth(){
     
        console.log("Projects loaded")
        //Wait 100 ms
        setTimeout(() => {
          loadProjects()
        }, 1000)
      
    }

    loadAuth()
    

    
   

  }, [])

 async function loadProjects(){
  let loggedIn = await isLoggedIn()
  console.log(loggedIn)
  let fbProjects = []
  if(loggedIn){
    fbProjects = await loadFBUser()
  }
  let sProjects = localStorage.getItem("projects")
  console.log(sProjects)
      
  if(sProjects != null){
    sProjects = JSON.parse(sProjects)
      console.log(sProjects)
      console.log(projects)
      setProjects([...fbProjects, ...sProjects])
      let newProj = [...fbProjects, ...sProjects]
      console.log(newProj)

      
  } else {
    setProjects([])
  }
  let selectedProj = localStorage.getItem("currentProj")
  if(selectedProj != null && selectedProj != ""){
    setShowWelcome(false)
    setLoadingFiles(true)
    setProjName(selectedProj)
    //Check if proj is in firebase
    let localProj = localStorage.getItem("projects-" + selectedProj)
    console.log("Reading if proj is in firebase")
   localProj = JSON.parse(localProj)
    if(localProj.firebase && loggedIn){
      console.log("Loading from fb")
      let fbFiles = await readFBFiles()
      let project = {
          name: selectedProj,
          files: fbFiles,
          synced: true,
          firebase: true,
          loadedFiles: false
      }
      console.log(JSON.stringify(project))
      localStorage.setItem("projects-" + selectedProj, JSON.stringify(project))
    } else if(localProj.firebase){
      alert("You are not logged in. Please log in to access your cloud projects")
    }
    
          
    let files = await readFiles()
    setFiles(files)
    setLoadingFiles(false)
    
  } 
  

 }

  useEffect(() => {
    keybinds()
  }, [selectedFile])

  function keybinds(){
    document.addEventListener('keydown', (e) => {
      
      if(e.keyCode == 8 && e.metaKey){
        let proj = localStorage.getItem("currentProj")
        let project = JSON.parse(localStorage.getItem("projects-" + proj))
        let files = project.files
        let newFiles = []
        for(let i = 0; i < files.length; i++){
          
          if(files[i].name != selectedFile){
            newFiles.push(files[i])
          }
        }
        project.files = newFiles
        localStorage.setItem("projects-" + proj, JSON.stringify(project))
        setFiles(readFilesLocally())
        setSelectedFile("")
        setStartingCode("")
        setSavedCode("")
        setCanSave(false)
      }
    })
  }
    
  

  function closeAlert(){
    let alert = document.querySelector('.Alert')
    alert.close("animalNotChosen")
    setAlertMsg("")
    setAlertOpen(false)
  }

  function hasClosedAlert(){
    return !alertOpen ? 1 : 0
  }
  window.hasClosedAlert = hasClosedAlert;

  async function addConsoleLog(message){
    console.log("Adding console log - " + message)
    let consoleMsg = {
      msg: message[0],
      type: "normal",
      line: message[1]
    }

    let nConsoleMsgs = [...getConsoleMsgs(), consoleMsg]
    
    let consoleArea = document.querySelector('.ConsoleArea')
    let consoleMsgDiv = document.createElement('div')
    consoleMsgDiv.className = 'ConsoleMsg normal' 
    let consoleMsgTxt = document.createElement('div')
    consoleMsgTxt.className = 'ConsoleMsgTxt'
    consoleMsgTxt.innerHTML = message[0]
    consoleMsgDiv.appendChild(consoleMsgTxt)
    let consoleMsgLine = document.createElement('div')
    consoleMsgLine.className = 'ConsoleMsgLine'
    consoleMsgLine.innerHTML = "Line: " + message[1]
    console.log("Adding click event")
    consoleMsgLine.onclick = () => {
      let code = document.querySelector('.CodeEditor .cm-editor .cm-scroller .cm-content')
      console.log("CLICK")
      let lines = code.children
      console.log(lines)
      for(let i = 0; i < lines.length; i++){
        console.log(i + 1 + " " + message[1] )
        console.log(i + 1 == parseInt(message[1]))
       if(i + 1 == parseInt(message[1])){
          console.log("Scrolling to line " + i)
          lines[i].scrollIntoView()
          
          document.querySelector('.CodeEditor .cm-editor .cm-scroller .cm-content .cm-activeLine').classList.remove('cm-activeLine')
          if(document.querySelector('.CodeEditor .cm-editor .cm-scroller .cm-content .cm-focusLine') != null){
            document.querySelector('.CodeEditor .cm-editor .cm-scroller .cm-content .cm-focusLine').classList.remove('cm-focusLine')
          }
          lines[i].classList.add('cm-activeLine')
          lines[i].classList.add('cm-focusLine')
          //Set focus to line
          
        }
      }
    }
    consoleMsgDiv.appendChild(consoleMsgLine)
    consoleArea.appendChild(consoleMsgDiv)

    await setConsoleMsgs(nConsoleMsgs)
  }
  window.addConsoleLog = addConsoleLog;

  async function addConsoleError(message){
    console.log("Adding console log - " + message)
    let consoleMsg = {
      msg: message[0],
      type: "error",
      line: message[1]
    }

    let nConsoleMsgs = [...getConsoleMsgs(), consoleMsg]
 
    let consoleArea = document.querySelector('.ConsoleArea')
    let consoleMsgDiv = document.createElement('div')
    consoleMsgDiv.className = 'ConsoleMsg error' 
    let consoleMsgTxt = document.createElement('div')
    consoleMsgTxt.className = 'ConsoleMsgTxt'
    consoleMsgTxt.innerHTML = message[0]
    consoleMsgDiv.appendChild(consoleMsgTxt)
    let consoleMsgLine = document.createElement('div')
    consoleMsgLine.className = 'ConsoleMsgLine'
    consoleMsgLine.innerHTML = "Line: " + message[1]
    consoleMsgLine.onclick = () => {
      let code = document.querySelector('.CodeEditor .cm-editor .cm-scroller .cm-content')
      console.log("CLICK")
      let lines = code.children
      console.log(lines)
      for(let i = 0; i < lines.length; i++){
        console.log(i + 1 + " " + message[1] )
        console.log(i + 1 == parseInt(message[1]))
       if(i + 1 == parseInt(message[1])){
          console.log("Scrolling to line " + i)
          lines[i].scrollIntoView()
        
          document.querySelector('.CodeEditor .cm-editor .cm-scroller .cm-content .cm-activeLine').classList.remove('cm-activeLine')
          if(document.querySelector('.CodeEditor .cm-editor .cm-scroller .cm-content .cm-focusLine') != null){
            document.querySelector('.CodeEditor .cm-editor .cm-scroller .cm-content .cm-focusLine').classList.remove('cm-focusLine')
          }
          lines[i].classList.add('cm-activeLine')
          //Set focus to line
          lines[i].classList.add('cm-focusLine')
          
        }
      }
    }
    
    consoleMsgDiv.appendChild(consoleMsgLine)
    consoleArea.appendChild(consoleMsgDiv)

    await setConsoleMsgs(nConsoleMsgs)

    setRun(false)
  }
  window.addConsoleError = addConsoleError;


  function getConsoleMsgs(){
    let msgs = []
    let consoleArea = document.querySelector('.ConsoleArea')
    let children = consoleArea.children


    for(let i = 0; i < children.length; i++){
      let msg = children[i].innerHTML
      let type = children[i].className.split(" ")[1]
      
      msgs.push({
        msg: msg,
        type: type
      })
    }

    return msgs
  }

  function addFile() {
    let fileName = prompt("Enter file name:")

    if(fileName){
      if(!fileName.includes(".javaish")){
        fileName += ".javaish"
      }
      if(files.includes(fileName)){
        alert("File already exists")
        return
      }
      setSelectedFile(fileName)
      let nFiles = [...files, fileName]
      setFiles(nFiles)
      saveFileLocally(fileName, "")
      
    }
  }

  function saveFileLocally(fileName, code){
    let project = JSON.parse(localStorage.getItem("projects-" + projName))
    project.synced = false
    setCanCloudSave(true)
    let filesList = project.files
    let file = {
      name: fileName,
      code: code,
      synced: false
    }
    filesList.push(file)
    project.files = filesList
    localStorage.setItem("projects-" + projName, JSON.stringify(project))
  }

  async function readFBFiles(){
    console.log("Reading files from firebase")
    let files = []
    let projName = localStorage.getItem("currentProj")
    let proj = await getUserProject(projName)
    let projFiles = proj.files
    console.log(projFiles)
    for (const file of projFiles) {
      console.log(file)
      let fileName = file.split("/")[1]
      let filePath = projName + "/" + fileName
      let fileTxt = await getFileCode(filePath)
      let fileObj = {
        name: fileName,
        code: fileTxt,
        synced: true
      }
      files.push(fileObj)
    }
    console.log("Read files from firebase")
    console.log(files)
    return files
  }

  async function readFiles(){
    let fileNames = readFilesLocally()
    return fileNames

  }


  function readFilesLocally(){
    let selectedProj = localStorage.getItem("currentProj")
    console.log(selectedProj + " - selected proj")
    let project = localStorage.getItem("projects-" + selectedProj)
    if(project != null){
      project = JSON.parse(project)
      console.log(project)
      let files = project.files
      console.log(files)
      let fileNames = []
      for(let i = 0; i < files.length; i++){
        fileNames.push(files[i].name)
      }
      
      return fileNames
    }
    return []
    
  }

  function readFileTxtLocally(fileName){
    let project = localStorage.getItem("projects-" + projName)
    if(project != null){
      project = JSON.parse(project)
      let files = project.files
      for(let i = 0; i < files.length; i++){
        if(files[i].name == fileName){
          return files[i].code
        }
      }
    }
      
    return ""
  }

  async function handleSelectedFile(fileName){
    
    if(selectedFile == fileName){
      return
    }
    if(canSave){
      let save = window.confirm("Save file?")
      if(save){
        let file = document.querySelector('.CodeArea')
        let fileTxt = file.innerHTML
        setCanSave(false)
        localStorage.setItem(projName + " " + selectedFile + " code", fileTxt)
      }
    }
    setSelectedFile(fileName)
    setGettingCode(true)
    let projName = localStorage.getItem("currentProj")
    let filePath = projName + "/" + fileName
    //Check if file exists locally
    let localProj = localStorage.getItem("projects-" + projName)
    console.log(localProj)
    if(localProj == null || localProj.firebase){
      let fileTxt = await getFileCode(filePath)
      setStartingCode(fileTxt)
      setSavedCode(fileTxt)
    } else {
      let fileTxt = readFileTxtLocally(fileName)
      setStartingCode(fileTxt)
      setSavedCode(fileTxt)
    }
    setGettingCode(false)
    setCanSave(false)
    
   
  }

  async function syncFile(fileName){
    let projName = localStorage.getItem("currentProj")
    let filePath = projName + "/" + fileName
    let fileTxt = readFileTxtLocally(fileName)
    // console.log(fileTxt)
    let userProj = await getUserProject(projName)
    // console.log(userProj)
    let files = userProj.files
    if(files.includes(filePath)){
      //Update File
      await setFileCode(filePath, fileTxt)
    } else {
      //Create File
      await setFileCode(filePath, fileTxt)
      userProj.files.push(filePath)
      await updateProjFiles(userProj.id, userProj.files)
    }

  }

  async function syncProj(){
    let projName = localStorage.getItem("currentProj")
    let proj = JSON.parse(localStorage.getItem("projects-" + projName))

    let files = proj.files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if(!file.synced){
        await syncFile(file.name)
        file.synced = true
      }
      
    }
    proj.synced = true
    localStorage.setItem("projects-" + projName, JSON.stringify(proj))
    setCanCloudSave(false)


  }



  async function exitProj(){
    let projName = localStorage.getItem("currentProj")
    let proj = JSON.parse(localStorage.getItem("projects-" + projName))
    let loggedIn = await isLoggedIn()
    //TODO - check if synced
    if(loggedIn){
      if(!proj.firebase){
        //Upload to firebase
        await createProject(projName)
        proj.firebase = true
      }
      if(!proj.synced){
        console.log("Syncing project")
        await syncProj()
        proj.synced = true
      }
      if(proj.firebase){
        //Delete from local storage
        localStorage.removeItem("projects-" + projName)
        let localProjects = localStorage.getItem("projects")
        localProjects = JSON.parse(localProjects)
        let newProjects = []
        for(let i = 0; i < localProjects.length; i++){
          if(localProjects[i] != projName){
            newProjects.push(localProjects[i])
          }
        }
        localStorage.setItem("projects", JSON.stringify(newProjects))
      }
    }
    setProjName("")
    setFiles([])
    setSelectedFile("")
    localStorage.setItem("currentProj", "")
    await loadProjects()
    setShowWelcome(true)
  }

  async function loadFBUser(){
    let uProjects = await getUserProjects()
    console.log(uProjects)
    if(uProjects == null){
      return
    }
    let projNames = []
    for(let i = 0; i < uProjects.length; i++){
      projNames.push(uProjects[i].name)
    }
    console.log(projNames)
    setProjects(...projects, projNames)
    return projNames
  }

  function closeConvertedCodeWindow(){
    setShowConvertWindow(false)
    setStartingCode(savedCode)
  }

  function closeInfoWinow(){
    setShowInfoWindow(false)

  }

  function handleShowInfoWindow(){
    setShowInfoWindow(true)
  }

  return (
    <>
      <div className='Windows'> 
        <FilesWindow handleSelectFile={handleSelectedFile} files={files} addFile={addFile} projName={projName} setProjName={setProjName} exitProj={exitProj} canCloudSave={canCloudSave} cloudSave={syncProj}/>
        <div className='RightWindows'>
          {showInfoWindow ?  <InfoWindow closeInfoWinow={closeInfoWinow}/> : showWelcome ? <WelcomeWindow setProjName={setProjName} setFiles={setFiles} readFiles={readFiles} setShowWelcome={setShowWelcome} loadUser={loadFBUser} projects={projects} readFBFiles={readFBFiles} setLoadingFiles={setLoadingFiles} showInfoWindow={handleShowInfoWindow}/> : showConvertWindow ?  <ConvertWindow convertedCode={convertedCode} closeConvertCodeWindow={closeConvertedCodeWindow}/> : <CodeWindow projName={projName} setRun={setRun} setSavedCode={setSavedCode} setCanSave={setCanSave} startingCode={startingCode} canSave={canSave} savedCode={savedCode} run={run} selectedFile={selectedFile} loadUser={loadFBUser} gettingCode={gettingCode} setCanCloudSave={setCanCloudSave} setConvertedCode={setConvertedCode} setShowConvertedWindow={setShowConvertWindow} loadingFiles={loadingFiles}/>}
          
          {!showWelcome && !showConvertWindow ? <ConsoleWindow consoleMsgs={consoleMsgs}/> : null}
        </div>
         
      </div>
      
      
    </>
  )
}

export default App
