import { useEffect, useState, useRef } from 'react'
import './codeWindowHelp.css'
import playIcon from '../assets/play_icon.png'
import saveIcon from '../assets/save_icon.png'
import convertIcon from '../assets/convert_icon.png'
import cloudSaveIcon from '../assets/cloud_save_icon.png'
import plusIcon from '../assets/add_icon.png'


function CodeWindowHelp({}){
   function handleClose(){
        document.getElementById('CodeWindowHelp').close()
   }

   
    
    return (
        <dialog className='CodeWindowHelp' id='CodeWindowHelp'>
            <h1>Help</h1>
            <div className='IconHelp'>
                <img src={playIcon} alt="play icon" className='PlayIcon'/>
                <label htmlFor=""> - Runs the code in the file</label>
            </div>
            <div className='IconHelp'>
                <img src={saveIcon} alt="save icon" className='SaveIcon'/>
                <label htmlFor=""> - Saves the changed code locally</label>
            </div>
            <div className='IconHelp'>
                <img src={convertIcon} alt="convert icon" className='ConvertIcon'/>
                <label htmlFor=""> - Converts the Javaish code to Java</label>
            </div>
            <div className='IconHelp'>
                <img src={cloudSaveIcon} alt="cloud save icon" className='CloudSaveIcon'/>
                <label htmlFor=""> - Saves the project to the cloud</label>
            </div>
            <div className='IconHelp'>
                <img src={plusIcon} alt="plus icon" className='PlusIcon'/>
                <label htmlFor=""> - Adds a file to the project</label>
            </div>
            <label htmlFor="">Select a file and hit CMD+Delete to delete a file</label>
            <br />
            <button onClick={handleClose}>Close</button>
        </dialog>
    )
}

export default CodeWindowHelp