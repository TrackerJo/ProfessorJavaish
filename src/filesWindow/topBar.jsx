import { useState, useEffect } from 'react'
import './topBar.css'

import addIcon from '../assets/add_icon.png'

import backIcon from '../assets/back_icon.png'





function FilesTopBar({addFile, projName, setProjName, exitProj}){
   
    
    const [editProjName, setEditProjName] = useState(false)
 
    function handleEditProjName(){
        
       
        console.log('editProjName:', editProjName)
        if(!editProjName){
            // setProjName(prompt("Enter new project name:"))
            let projNameLbl = document.querySelector('.ProjName')
            let projNameDiv = document.querySelector('.ProjNameDiv')
            let projNameInput = document.createElement('input')
            projNameInput.type = 'text'
            projNameInput.value = projNameLbl.innerHTML
            projNameInput.className = 'ProjNameInput'
            projNameDiv.replaceChild(projNameInput, projNameLbl)
            projNameInput.focus()
            projNameInput.addEventListener('blur', () => {
                projNameLbl.innerHTML = projNameInput.value
                projNameDiv.replaceChild(projNameLbl, projNameInput)
                setProjName(projNameInput.value)
                setEditProjName(false)
            })
        
        }
    }

    function handleAddFile(){
        addFile()
    }

    function handleBackButton(){
       exitProj()
    }
    
    return (
        <div className='FilesTopBar'> 
            {projName != "" ? <div className='FilesBarContent'>
                <img src={backIcon} className='BackIcon' alt='Back' onClick={handleBackButton}/>
                <div className='ProjNameDiv'>
                    <h2 className='ProjName'>{projName}</h2>
                    {/* <img src={editIcon} alt="edit" className='EditIcon' onClick={handleEditProjName}/> */}
                </div>

                <img src={addIcon} alt="add" className='AddIcon' onClick={handleAddFile}/>
            </div> : null}
            
        </div>
    )
}

export default FilesTopBar