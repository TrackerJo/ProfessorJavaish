import { useEffect, useState, useRef } from 'react'
import './codeWindow.css'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css';
import { example } from '../CodeMirror/JavaishLangauge';
import Editor from '../CodeMirror/JavaishEditor';
import CodeTopBar from './topbar';
import CodeWindowHelp from './codeWindowHelp';

function CodeWindow({startingCode, setCanSave, savedCode, run, selectedFile, canSave, projName, setRun, setSavedCode, loadUser, gettingCode, setCanCloudSave, setConvertedCode, setShowConvertedWindow, loadingFiles}){
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
        <CodeTopBar projName={projName} selectedFile={selectedFile} canSave={canSave} setCanSave={setCanSave} run={run} setRun={setRun} setSavedCode={setSavedCode} currentCode={code} loadUser={loadUser} setCanCloudSave={setCanCloudSave} setConvertedCode={setConvertedCode} setShowConvertedWindow={setShowConvertedWindow}/>
        <div className='CodeWindow'>
                
                {gettingCode ? <p>Getting code...</p> : loadingFiles ? <p>Loading Files...</p> : selectedFile != "" ? <Editor startingCode={startingCode} codeChanged={codeChanged} savedCode={savedCode} canEdit={!run}/> : <p>Please select a file to edit</p>}
               <div className='Code'>{code}</div>
               <div className='ConvertedCode'></div>
            
            
        </div>
        <CodeWindowHelp/>
        </>
    )
}

export default CodeWindow