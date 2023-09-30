import { useEffect, useState, useRef } from 'react'
import './codeWindow.css'
import TopBar from '../topBar/topBar'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css';
import { example } from '../CodeMirror/JavaishLangauge';
import { Editor } from '../CodeMirror/JavaishEditor';

function CodeWindow({selectedFile, canSave, setCanSave, savedCode,run, setSavedCode}){
   const [typingCode, setTypingCode] = useState(false)
    const [numLines, setNumLines] = useState(0)
    const [editCount, setEditCount] = useState(0)
 

    useEffect(() => {
        
       // let codeArea = document.querySelector('.CodeArea')

            if(document.querySelector('.CodeArea') != document.activeElement){
            
            if(selectedFile == ""){
              //  codeArea.innerHTML = "Select a file to edit"
            } else {
            //codeArea.innerHTML = savedCode
            }
        }
        
        if(selectedFile == ""){
            setNumLines(0)
            return
        }
        setNumLines(1)
        if(savedCode != ""){

           // let children = codeArea.childNodes
           // let numLines = children.length
           
          //  setNumLines(numLines)
        }
    }, [selectedFile, savedCode])

    useEffect(() => {
          
       
    },[selectedFile])


   function handleClick(){
        console.log('click')
        if(!typingCode){
            setTypingCode(true)
        }
    }

    function handleEdit(){
        if(!typingCode){
            return
        }
        setEditCount(editCount + 1)

       
        console.log('edit')
        if(!canSave){
            setCanSave(true)
        }
        setSavedCode(document.querySelector('.CodeArea').innerHTML)
        
    }

    function handleKeyUp(){
        console.log('keyup')
        
        setSavedCode(document.querySelector('.CodeArea').innerHTML)
        
        setEditCount(0)
    }
    
    return (
        <>
        
        <div className='CodeWindow'>
{/*         
            <div className='Code'>
                <div className='Lines'>
                    {Array.from(Array(numLines).keys()).map((num) => {
                        return (
                            <p className='Line' key={num}>{num + 1}</p>
                        )
                    })}
                </div>
                <div className='CodeArea' contentEditable={selectedFile == "" ? false : run ? false : true}  onClick={handleClick} onKeyDown={handleEdit} onKeyUp={handleKeyUp}>
                    
               </div> 
               </div>*/}
               <Editor></Editor>
               
            
            
        </div>
        </>
    )
}

export default CodeWindow