import { useState, useEffect } from 'react'
import './topBar.css'
import playIcon from '../assets/play_icon.png'
import addIcon from '../assets/add_icon.png'
import stopIcon from '../assets/stop_icon.png'
import editIcon from '../assets/edit_icon.png'
import saveIcon from '../assets/save_icon.png'
import backIcon from '../assets/back_icon.png'
import callMain from '../javaish.mjs'




function TopBar({addFile, projName, setProjName, selectedFile, canSave, setCanSave, run, setRun, setSavedCode, currentCode, exitProj}){
   
    
    const [editProjName, setEditProjName] = useState(false)
 
 
    async function handleRun(){
        await setRun(!run)

        if(run){
            return
        }
        document.querySelector('.ConsoleArea').innerHTML = ""
        //Wait 1 second for the server to start
        setTimeout(() => {

            callMain();
            //setRun(false)
        }, 50)

       
       
        
    }

    function finishRun(){
        setRun(false)
    }
    window.finishRun = finishRun

    function handleSaveFile(){
        console.log('save file')
        
        setCanSave(false)
        setSavedCode(currentCode)
        let project = JSON.parse(localStorage.getItem("projects-" + projName))
        let files = project.files
        for(let i = 0; i < files.length; i++){
            if(files[i].name == selectedFile){
                files[i].code = currentCode
            }
        }
        project.files = files
        localStorage.setItem("projects-" + projName, JSON.stringify(project))


    }

    useEffect(() => {
        saveShortcut()
       
    
      }, [canSave])
    
      function saveShortcut(){
        document.addEventListener('keydown', (e) => {
          if(e.metaKey && e.key == "s"){
            e.preventDefault()
            console.log('save shortcut')
            if(canSave){
                handleSaveFile()
            }
          }
        }
        )
      }

    function handleEditProjName(){
        
       
        console.log('editProjName:', editProjName)
        if(!editProjName){
        // setProjName(prompt("Enter new project name:"))
        let projNameLbl = document.querySelector('.ProjName')
        let projNameDiv = document.querySelector('.ProjNameDiv')
        let projNameInput = document.createElement('input')
        projNameInput.type = 'text'
        projNameInput.value = projNameLbl.innerHTML
        projNameInput.className = 'ProjNameInput'
        projNameDiv.replaceChild(projNameInput, projNameLbl)
        projNameInput.focus()
        projNameInput.addEventListener('blur', () => {
            projNameLbl.innerHTML = projNameInput.value
            projNameDiv.replaceChild(projNameLbl, projNameInput)
            setProjName(projNameInput.value)
            setEditProjName(false)
        }
        )
       
        }
    }

    function handleAddFile(){
        addFile()
    }

    function handleBackButton(){
       exitProj()
    }
    
    return (
        <div className='TopBar'>
            
            <div className='ProjTitle'> 
                <img src={backIcon} className='BackIcon' alt='Back' onClick={handleBackButton}/>
                <div className='ProjNameDiv'>
                    <h2 className='ProjName'>{projName}</h2>
                    {/* <img src={editIcon} alt="edit" className='EditIcon' onClick={handleEditProjName}/> */}
                </div>
                
                <img src={addIcon} alt="add" className='AddIcon' onClick={handleAddFile}/>
            </div>
            { selectedFile != "" ? <img src={run ? stopIcon : playIcon} alt="run" className={run ? 'StopIcon' : 'RunIcon'} onClick={handleRun}/> : null}
            {canSave ? <img src={saveIcon} alt="save" className='SaveIcon' onClick={handleSaveFile}/> : null}
            <p className='FileName'>Editting: {selectedFile}</p>
        </div>
    )
}

export default TopBar