import { useState, useEffect } from 'react'
import './topBar.css'
import playIcon from '../assets/play_icon.png'
import stopIcon from '../assets/stop_icon.png'
import saveIcon from '../assets/save_icon.png'
import account from '../assets/account.png'
import callMain from '../javaish.mjs'




function CodeTopBar({projName, selectedFile, canSave, setCanSave, run, setRun, setSavedCode, currentCode}){
   
    
   
 
 
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

    
    return (
        <div className='CodeTopBar'>
            { selectedFile != "" ? <img src={run ? stopIcon : playIcon} alt="run" className={run ? 'StopIcon' : 'RunIcon'} onClick={handleRun}/> : null}
            {canSave ? <img src={saveIcon} alt="save" className='SaveIcon' onClick={handleSaveFile}/> : null}
            {projName != "" ? <p className='FileName'>Editting: {selectedFile}</p> : null}
            <div className='TopBarRight'>
                <img src={account} alt="Account" className='AccountIcon'/>
            </div>
        </div>
    )
}

export default CodeTopBar