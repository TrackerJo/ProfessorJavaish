import { useState, useEffect } from 'react'
import './topBar.css'
import playIcon from '../assets/play_icon.png'
import stopIcon from '../assets/stop_icon.png'
import saveIcon from '../assets/save_icon.png'
import convertIcon from '../assets/convert_icon.png'
import account from '../assets/account.png'
import helpIcon from '../assets/help_icon.png'
import AccountPopup from '../AccountPopup/accountPopup'
import callMain from '../javaish.mjs'
import dicIcon from '../assets/dic_icon.png'



function CodeTopBar({projName, selectedFile, canSave, setCanSave, run, setRun, setSavedCode, currentCode, loadUser, setCanCloudSave, setConvertedCode, setShowConvertedWindow, showDicWindow, setShowDicWindow}){
    const [showAccPopup, setShowAccPopup] = useState(false)
    
   
    
 
    async function handleRun(){
        await setRun(!run)

        if(run){
            return
        }
        document.querySelector('.ConsoleArea').innerHTML = ""
        //Wait 1 second for the server to start
        document.getElementById("root").classList.add("run")
       callMain(true)
       document.getElementById("root").classList.remove("run")
       
       
        
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
        project.synced = false
        let files = project.files
        for(let i = 0; i < files.length; i++){
            if(files[i].name == selectedFile){
                files[i].code = currentCode
                files[i].synced = false
            }
        }
        project.files = files
        localStorage.setItem("projects-" + projName, JSON.stringify(project))
        setCanCloudSave(true)

    }

    useEffect(() => {
        saveShortcut()
        console.log('canSave:', canSave)
       
    
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

    function handleAccClick() {
        console.log('Clicked Acc Popup: ' + !showAccPopup)
        setShowAccPopup(!showAccPopup)
    
    }

    function handleConvert(){
        if(canSave){
            handleSaveFile()
        }
        callMain(true)
        let convertedCode = document.querySelector('.ConvertedCode').textContent
        
        setConvertedCode(convertedCode)
        setShowConvertedWindow(true)
    }

    function unescapeHTML(escapedHTML) {
        return escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    }

    function hideAccPopup(show){
        console.log('hide acc popup')
        setShowAccPopup(show)
    }

    function showHelp(){
        let helpWindow = document.querySelector('.CodeWindowHelp')
        helpWindow.showModal()
    }
    
    function handleDicClick(){
        setShowDicWindow(!showDicWindow)
    }

    return (
        <>
        
        <div className='CodeTopBar'>
            <div className='CodeBarLeft'>
                { selectedFile != "" ? <img src={run ? stopIcon : playIcon} alt="run" className={run ? 'StopIcon' : 'RunIcon'} onClick={handleRun}/> : null}
                {canSave ? <img src={saveIcon} alt="save" className='SaveIcon' onClick={handleSaveFile}/> : null}
                
                {selectedFile != "" ? <p className='FileName'>Editting: {selectedFile}</p> : null}
                {selectedFile != "" ? <img src={convertIcon} alt='convert' className='ConvertIcon' onClick={handleConvert}/> : null}
                {selectedFile != "" ? <img src={dicIcon} alt='dictionary' className='DicIcon' onClick={handleDicClick}/> : null}
            </div>
            <div className='TopBarRight'>
                {projName != "" ? <img src={helpIcon} alt="help" className='HelpIcon' onClick={showHelp}/> : null}
                <div className='AccountDiv'>
                    <img src={account} alt="Account" className='AccountIcon' onClick={handleAccClick}/>
                    {showAccPopup ? <AccountPopup setShowAccPopup={hideAccPopup} loadUser={loadUser}/> : null}
                </div>
            </div>
        </div>
        </>
    )
}

export default CodeTopBar