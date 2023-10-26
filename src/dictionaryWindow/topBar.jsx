import { useState, useEffect } from 'react'
import './topBar.css'
import closeIcon from '../assets/close_icon.png'
import copyIcon from '../assets/copy_icon.png'




function DicTopBar({closeDicWindow}){
   
   
    function handleBack(){
        closeDicWindow()
    }

    
    
    return (
        <>
        
        <div className='ConvertTopBar'>
            <div className='ConvertBarLeft'>
               <img src={closeIcon} alt="back" onClick={handleBack} className='CloseIconDic'/>
               
               <label htmlFor="">Javaish Dictionary</label>
            </div>
            
        </div>
        </>
    )
}

export default DicTopBar