import { useState, useEffect, useRef } from 'react'
import './topBar.css'
import playIcon from '../assets/play_icon.png'
import stopIcon from '../assets/stop_icon.png'
import saveIcon from '../assets/save_icon.png'
import convertIcon from '../assets/convert_icon.png'
import account from '../assets/account.png'
import helpIcon from '../assets/help_icon.png'
import AccountPopup from '../AccountPopup/accountPopup'
// import { callMain } from '../javaish.mjs'
import dicIcon from '../assets/dic_icon.png'
import debugIcon from '../assets/debug_icon.png'
import robotIcon from '../assets/robot_icon.png'



function CodeTopBar({projName, selectedFile, canSave, setCanSave, run, setRun, setSavedCode, currentCode, loadUser, setCanCloudSave, setConvertedCode, setShowConvertedWindow, showDicWindow, setShowDicWindow, setIsDebugging, setRobotIP, robotIP}){
    const [showAccPopup, setShowAccPopup] = useState(false)
    const convertToDialogRef = useRef()
    const [convertType, setConvertType] = useState("java")
    const robotIPDialogRef = useRef()
   
    
 
    async function handleRun(){
        await setRun(!run)

        if(run){
            return
        }
        document.querySelector('.ConsoleArea').innerHTML = ""
        //Wait 1 second for the server to start
        document.getElementById("root").classList.add("run")
        // callMain(true)
        main()
        document.getElementById("root").classList.remove("run")
       
       
        
    }

    async function handleRunRobot(){
        await setRun(!run)

        if(run){
            return
        }
        document.querySelector('.ConsoleArea').innerHTML = ""
        //Wait 1 second for the server to start
        document.getElementById("root").classList.add("run-robot")
        // callMain(true)
        main()
        document.getElementById("root").classList.remove("run-robot")
       
       
        
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
        document.querySelector('.ConsoleArea').innerHTML = ""
        //Wait 1 second for the server to start
        document.getElementById("root").classList.add("parse")
        // callMain(true)
        main()
        document.getElementById("root").classList.remove("parse")

    }

    useEffect(() => {
        saveShortcut()
        console.log('canSave:', canSave)
       
    
    }, [canSave, currentCode])

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

    function handleConvert(type){
        if(canSave){
            handleSaveFile()
        }
        document.getElementById("root").classList.add("convert-" + type)
        
        main(true)
        document.getElementById("root").classList.remove("convert-" + type)

        let convertedCode = document.querySelector('.ConvertedCode').textContent
        
        setConvertedCode(convertedCode)

        setShowConvertedWindow(type)
    }

    function handleDebug(){
        if(canSave){
            handleSaveFile()
        }
        document.querySelector('.ConsoleArea').innerHTML = ""
        setIsDebugging(true)
       

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
                    
                    {selectedFile != "" ? <p className='FileName'>Editing: {selectedFile}</p> : null}
                    {selectedFile != "" ? <img src={convertIcon} alt='convert' className='ConvertIcon' onClick={() => convertToDialogRef.current.show()}/> : null}
                    {selectedFile != "" ? <img src={debugIcon} alt='debug' className='DebugIcon' onClick={handleDebug}/> : null}

                    {selectedFile != "" ? <img src={dicIcon} alt='dictionary' className='DicIcon' onClick={handleDicClick}/> : null}
                    {selectedFile != "" ? <img src={robotIcon} alt='robot' className='RobotIcon' onClick={() => robotIPDialogRef.current.show()}/> : null}
                    
                </div>
                <div className='TopBarRight'>
                    {projName != "" ? <img src={helpIcon} alt="help" className='HelpIcon' onClick={showHelp}/> : null}
                    <div className='AccountDiv'>
                        <img src={account} alt="Account" className='AccountIcon' onClick={handleAccClick}/>
                        {showAccPopup ? <AccountPopup setShowAccPopup={hideAccPopup} loadUser={loadUser}/> : null}
                    </div>
                </div>
            </div>
            <dialog className='ConvertToDialog' ref={convertToDialogRef}>
                <p className='ConvertToTitle'>Convert to:</p>
                <div className='ConvertToOptions'>
                    <button className='ConvertToOption' onClick={() => { convertToDialogRef.current.close(); handleConvert("java")}}>Java</button>
                    <br />
                    <br />
                    <button className='ConvertToOption' onClick={() => {convertToDialogRef.current.close(); handleConvert("python")}}>Python</button>
                    
                </div>
            </dialog>
            <dialog className='RobotIPDialog' ref={robotIPDialogRef}>
                <p className='RobotIPTitle'>Enter Robot IP:</p>
                <input type='text' className='RobotIPInput' value={robotIP} onChange={(e) => setRobotIP(e.target.value)}/>
                <br />
                <br />
                <button className='RobotIPButton' onClick={() => {
                    
                    robotIPDialogRef.current.close()
                    handleRunRobot()
                }}>Run</button>
            </dialog>

        </>
    )
}

export default CodeTopBar