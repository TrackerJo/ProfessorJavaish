import { useState, useEffect } from 'react'
import './topBar.css'
import backIcon from '../assets/back_icon.png'
import copyIcon from '../assets/copy_icon.png'




function ConvertTopBar({closeConvertCodeWindow, code}){
   
   
    function handleBack(){
        closeConvertCodeWindow()
    }

    async function handleCopy(){
        await navigator.clipboard.writeText(code)
        alert('Copied to clipboard!')
    }
    
    return (
        <>
        
        <div className='ConvertTopBar'>
            <div className='ConvertBarLeft'>
               <img src={backIcon} alt="back" onClick={handleBack} className='BackIcon'/>
               <img src={copyIcon} alt="copy" onClick={handleCopy} className='CopyIcon'/>
            </div>
            
        </div>
        </>
    )
}

export default ConvertTopBar