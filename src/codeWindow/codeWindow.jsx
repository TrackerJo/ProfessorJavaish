import { useEffect, useState, useRef } from 'react'
import './codeWindow.css'
import TopBar from '../topBar/topBar'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css';
import { example } from '../CodeMirror/JavaishLangauge';
import Editor from '../CodeMirror/JavaishEditor';

function CodeWindow({startingCode, allowSave, savedCode}){
   
    
    function codeChanged(code){
       allowSave(code)
     

    }

   
    
    return (
        <>
        
        <div className='CodeWindow'>
               <Editor startingCode={startingCode} codeChanged={codeChanged} savedCode={savedCode}/>
               
            
            
        </div>
        </>
    )
}

export default CodeWindow