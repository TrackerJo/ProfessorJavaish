/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './codeWindow.css'


import 'highlight.js/styles/atom-one-dark.css';

import Editor from '../CodeMirror/JavaishEditor';
import CodeTopBar from './topbar';
import CodeWindowHelp from './codeWindowHelp';

function CodeWindow({startingCode, setCanSave, savedCode, run, selectedFile, canSave, projName, setRun, setSavedCode, loadUser, gettingCode, setCanCloudSave, setConvertedCode, setShowConvertedWindow, loadingFiles,showDicWindow, setShowDicWindow, setIsDebugging}){
   const [code, setCode] = useState(startingCode)


    useEffect(() => {
        setCode(startingCode)
    }, [startingCode])

    useEffect(() => {
        console.log("selected file changed")
        
        setCode(startingCode)
        document.querySelector('.Code').innerHTML = startingCode
    }, [selectedFile])
    
    function codeChanged(code){
       setCanSave(true)
        setCode(code)

    }

   
    
    return (
        <>
        <CodeTopBar setIsDebugging={setIsDebugging} projName={projName} selectedFile={selectedFile} canSave={canSave} setCanSave={setCanSave} run={run} setRun={setRun} setSavedCode={setSavedCode} currentCode={code} loadUser={loadUser} setCanCloudSave={setCanCloudSave} setConvertedCode={setConvertedCode} setShowConvertedWindow={setShowConvertedWindow} showDicWindow={showDicWindow} setShowDicWindow={setShowDicWindow}/>
        <div className='CodeWindow'>
                
                {gettingCode ? <p>Getting code...</p> : loadingFiles ? <p>Loading Files...</p> : selectedFile != "" ? <Editor startingCode={startingCode} codeChanged={codeChanged} savedCode={savedCode} canEdit={!run}/> : <p>Please select a file to edit</p>}
               <div className='Code'>{code}</div>
                <div className='State'></div>
               <div className='ConvertedCode'></div>
            
            
        </div>
        <CodeWindowHelp/>
        </>
    )
}

export default CodeWindow