import { useEffect, useState, useRef } from 'react'
import './convertWindow.css'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css';
import { example } from '../CodeMirror/JavaishLangauge';
import JavaEditor from '../CodeMirror/JavaEditor';
import CodeTopBar from './topbar';
import ConvertTopBar from './topbar';

function ConvertWindow({convertedCode, closeConvertCodeWindow}){
    const [code, setCode] = useState(convertedCode)
   
    useEffect(() => {
        setCode(convertedCode)
        console.log(convertedCode)
    }, [convertedCode])
   
    
    return (
        <>
        <ConvertTopBar closeConvertCodeWindow={closeConvertCodeWindow} code={convertedCode}/>
        <div className='CodeWindow'>
                
            <JavaEditor code={code}/>
              
            
            
        </div>
        </>
    )
}

export default ConvertWindow