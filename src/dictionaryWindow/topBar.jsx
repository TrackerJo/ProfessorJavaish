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
        
        <div className='DicTopBar'>
            
               <img src={closeIcon} alt="back" onClick={handleBack} className='CloseIconDic'/>

               


                
                <h2 className='DicTitle'>Javaish Dictionary</h2>

            
        </div>
        </>
    )
}

export default DicTopBar