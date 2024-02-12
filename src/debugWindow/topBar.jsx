import { useState, useEffect } from 'react'
import './topBar.css'

import stopIcon from '../assets/stop_icon.png'
import forwardStepIcon from '../assets/forward_step_icon.png'
import backwardStepIcon from '../assets/backward_step_icon.png'




function DebugTopBar({runNext, runPrev, currentLine, reachedEnd, stopDebugging}){
   
    
    return (
        <div className='DebugTopBar'> 
            <div className='DebugBarContent'>
                <div className='ProjNameDiv'>
                    <h2 className='ProjName'>Debugging</h2>
                    {/* <img src={editIcon} alt="edit" className='EditIcon' onClick={handleEditProjName}/> */}
                </div>

                <div>
                    <img src={backwardStepIcon} alt="run previous line" className={'backwardStepIcon ' + (currentLine <= 0 ? "Disabled" : "")} onClick={runPrev} />
                    <img src={stopIcon} alt="stop debugging" className='stopIcon' onClick={stopDebugging}/>
                    <img src={forwardStepIcon} alt="run next line" className={'forwardStepIcon '  + (reachedEnd ? "Disabled" : "")} onClick={runNext}/>
                </div>
                

                
                
            </div>
            
        </div>
    )
}

export default DebugTopBar