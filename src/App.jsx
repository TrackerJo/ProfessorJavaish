import { useState, useEffect } from 'react'

import './App.css'

import FilesWindow from './filesWindow/filesWindow'
import CodeWindow from './codeWindow/codeWindow'
import TopBar from './topBar/topBar'
import ConsoleWindow from './consoleWindow/consoleWindow'

import SelectProject from './SelectProject/SelectProject'
import WelcomeWindow from './welcomeWindow/welcomeWindow'
import { createUserData } from './firebase/database'



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

  useEffect(() => {
    let selectedProj = localStorage.getItem("currentProj")
    if(selectedProj != null && selectedProj != ""){
      setProjName(selectedProj)
      setFiles(readFilesLocally())
      setShowWelcome(false)
    } 
    createUserData("test", "test", "test");
    
   

  }, [])

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
    let filesList = project.files
    let file = {
      name: fileName,
      code: code
    }
    filesList.push(file)
    project.files = filesList
    localStorage.setItem("projects-" + projName, JSON.stringify(project))
  }


  function readFilesLocally(){
    let selectedProj = localStorage.getItem("currentProj")
    console.log(selectedProj + " - selected proj")
    let project = localStorage.getItem("projects-" + selectedProj)
    if(project != null){
      project = JSON.parse(project)
      let files = project.files
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

  function handleSelectedFile(fileName){
    
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
    let fileTxt = readFileTxtLocally(fileName)
    setStartingCode(fileTxt)
    setSavedCode(fileTxt)
    setCanSave(false)
    
   
  }



  function exitProj(){
    setProjName("")
    setFiles([])
    setSelectedFile("")
    localStorage.setItem("currentProj", "")
    setShowWelcome(true)
  }

  return (
    <>
      <div className='Windows'> 
        <FilesWindow handleSelectFile={handleSelectedFile} files={files} addFile={addFile} projName={projName} setProjName={setProjName} exitProj={exitProj}/>
        <div className='RightWindows'>
          {showWelcome ? <WelcomeWindow setProjName={setProjName} setFiles={setFiles} readFilesLocally={readFilesLocally} setShowWelcome={setShowWelcome}/> : <CodeWindow projName={projName} setRun={setRun} setSavedCode={setSavedCode} setCanSave={setCanSave} startingCode={startingCode} canSave={canSave} savedCode={savedCode} run={run} selectedFile={selectedFile}/> }
          
          <ConsoleWindow consoleMsgs={consoleMsgs}/>
        </div>
         
      </div>
      
      
    </>
  )
}

export default App
