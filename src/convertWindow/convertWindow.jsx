import { useEffect, useState, useRef } from 'react'
import './convertWindow.css'

import 'highlight.js/styles/atom-one-dark.css';
import JavaEditor from '../CodeMirror/JavaEditor';
import ConvertTopBar from './topbar';
import PythonEditor from '../CodeMirror/PythonEditor';

function ConvertWindow({convertedCode, closeConvertCodeWindow, convertType}){
    const [code, setCode] = useState(convertedCode)
   
    useEffect(() => {
        setCode(convertedCode)
        console.log(convertedCode)
    }, [convertedCode])
   
    
    return (
        <>
        <ConvertTopBar closeConvertCodeWindow={closeConvertCodeWindow} code={convertedCode}/>
        <div className='CodeWindow'>
            {convertType == 'java' ? 
            <JavaEditor code={code}/>
            :
            convertType == 'python' ?
            <PythonEditor code={code}/>
            :
            <p>Invalid convert type</p>
            }

              
            
            
        </div>
        </>
    )
}

export default ConvertWindow