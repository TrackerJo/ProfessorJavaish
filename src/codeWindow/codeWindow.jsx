import { useEffect, useState, useRef } from 'react'
import './codeWindow.css'
import TopBar from '../topBar/topBar'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css';
import { example } from '../CodeMirror/JavaishLangauge';
import Editor from '../CodeMirror/JavaishEditor';

function CodeWindow({startingCode, allowSave, savedCode, run, selectedFile}){
   const [code, setCode] = useState(startingCode)

    useEffect(() => {
        setCode(startingCode)
    }, [startingCode])

    useEffect(() => {
        console.log("selected file changed")
        console.log(startingCode)
        setCode(startingCode)
        document.querySelector('.Code').innerHTML = startingCode
    }, [selectedFile])
    
    function codeChanged(code){
       allowSave(code)
        setCode(code)

    }

   
    
    return (
        <>
        
        <div className='CodeWindow'>
                {selectedFile != "" ? <Editor startingCode={startingCode} codeChanged={codeChanged} savedCode={savedCode} canEdit={!run}/> : <p>Please select a file to edit</p>}
               <div className='Code'>{code}</div>
            
            
        </div>
        </>
    )
}

export default CodeWindow