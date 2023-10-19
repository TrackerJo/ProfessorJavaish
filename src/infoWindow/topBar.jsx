import { useState, useEffect } from 'react'
import './topBar.css'
import backIcon from '../assets/back_icon.png'
import copyIcon from '../assets/copy_icon.png'




function InfoTopBar({closeInfoWinow}){
   
   
    function handleBack(){
        closeInfoWinow()
    }

    return (
        <>
        
        <div className='InfoTopBar'>
            <div className='InfoBarLeft'>
               <img src={backIcon} alt="back" onClick={handleBack} className='BackIcon'/>
               
            </div>
            
        </div>
        </>
    )
}

export default InfoTopBar