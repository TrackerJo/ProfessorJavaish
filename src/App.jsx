import { useState, useEffect } from 'react'

import './App.css'

import FilesWindow from './filesWindow/filesWindow'
import CodeWindow from './codeWindow/codeWindow'
import TopBar from './topBar/topBar'
import ConsoleWindow from './consoleWindow/consoleWindow'
import Alert from './Modals/alert'



function App() {
  const [selectedFile, setSelectedFile] = useState("")
  const [projName, setProjName] = useState("Test")
  const [files, setFiles] = useState(["main.py", "test.py", "test2.py"])
  const [fileTxt, setFileTxt] = useState("")
  const [canSave, setCanSave] = useState(false)
  const [savedCode, setSavedCode] = useState("")
  const [run, setRun] = useState(false)
  const [consoleMsgs, setConsoleMsgs] = useState([])
  const [alertMsg, setAlertMsg] = useState("")
  const [alertOpen, setAlertOpen] = useState(false)

  useEffect(() => {
    setFiles(readFilesLocally())
   

  }, [])

    
  function showAlert(msg){
     setAlertMsg(msg)
      setAlertOpen(true)
      let alertD = document.querySelector('.Alert')
      alertD.showModal()
    // setTimeout(() => {
    //   alert(msg)
    // }, 5)
    console.log(document.querySelector('.ConsoleArea').children)
    
    alert(msg)

  }
  window.showAlert = showAlert;

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
    console.log(nConsoleMsgs)
    console.log(getConsoleMsgs())
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
    consoleMsgDiv.appendChild(consoleMsgLine)
    consoleArea.appendChild(consoleMsgDiv)

    await setConsoleMsgs(nConsoleMsgs)
    console.log(consoleMsgs)
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
    console.log(nConsoleMsgs)
    console.log(getConsoleMsgs())
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
    consoleMsgDiv.appendChild(consoleMsgLine)
    consoleArea.appendChild(consoleMsgDiv)

    await setConsoleMsgs(nConsoleMsgs)
    console.log(consoleMsgs)
    setRun(false)
  }
  window.addConsoleError = addConsoleError;


  function getConsoleMsgs(){
    let msgs = []
    let consoleArea = document.querySelector('.ConsoleArea')
    let children = consoleArea.children
    console.log(consoleArea)
    console.log(children.length)

    for(let i = 0; i < children.length; i++){
      let msg = children[i].innerHTML
      let type = children[i].className.split(" ")[1]
      console.log(msg + " " + type)
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
      saveFilesLocally(nFiles)
      
    }
  }

  function saveFilesLocally(files){
    let lFiles = []
    for(let i = 0; i < files.length; i++){
      lFiles.push( projName + " " + files[i])
    }

    localStorage.setItem('files', JSON.stringify(lFiles))
  }

  function readFilesLocally(){
    let lFiles = localStorage.getItem('files')
    if(lFiles != null){
      let lFiles = JSON.parse(localStorage.getItem('files'))

      let files = []
      for(let i = 0; i < lFiles.length; i++){
        files.push(lFiles[i].split(" ")[1])
      }
      return files
    }
    return []
    
  }

  function readFileTxtLocally(fileName){
    let fileTxt = localStorage.getItem(projName + " " + fileName + " code")
    if(fileTxt != null){
      return fileTxt
    }
    return ""
  }

  function handleSelectedFile(fileName){
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
    setSavedCode(fileTxt)
    setCanSave(false)
   
  }

  return (
    <>
     <TopBar addFile={addFile} projName={projName} setProjName={setProjName} selectedFile={selectedFile} canSave={canSave} setCanSave={setCanSave} run={run} setRun={setRun}/>
      <div className='Windows'> 
        <FilesWindow handleSelectFile={handleSelectedFile} files={files}/>
        <div className='RightWindows'>
          <CodeWindow selectedFile={selectedFile} canSave={canSave} setCanSave={setCanSave} savedCode={savedCode} run={run} setSavedCode={setSavedCode}/>
          <ConsoleWindow consoleMsgs={consoleMsgs}/>
        </div>
         
      </div>
      {<dialog className="Alert">
        
          <p>
            {alertMsg}
          </p>
          <div>
            
            <button onClick={closeAlert} >Close</button>
          </div>
        
      </dialog>}
      
    </>
  )
}

export default App
