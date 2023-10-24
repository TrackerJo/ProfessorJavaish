import { useState, useEffect } from 'react'
import './topBar.css'

import addIcon from '../assets/add_icon.png'

import backIcon from '../assets/back_icon.png'
import cloudSaveIcon from '../assets/cloud_save_icon.png'
import { isLoggedIn } from '../firebase/auth'




function FilesTopBar({addFile, projName, setProjName, exitProj, canCloudSave, cloudSave}){
   
    
    const [editProjName, setEditProjName] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        async function loadAuth(){
            let signedIn = await isLoggedIn()
            setLoggedIn(signedIn)
        }
        loadAuth()
    })
 
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

    async function handleBackButton(){
       await exitProj()
    }
    
    return (
        <div className='FilesTopBar'> 
            {projName != "" ? <div className='FilesBarContent'>
                <img src={backIcon} className='BackIcon' alt='Back' onClick={handleBackButton}/>
                <div className='ProjNameDiv'>
                    <h2 className='ProjName'>{projName}</h2>
                    {/* <img src={editIcon} alt="edit" className='EditIcon' onClick={handleEditProjName}/> */}
                </div>
                <div className='ProjIcons'>
                    {canCloudSave && loggedIn ? <img src={cloudSaveIcon} alt="cloud save" className='CloudSaveIcon' onClick={cloudSave}/> : null}
                    <img src={addIcon} alt="add" className='AddIcon' onClick={handleAddFile}/>
                </div>
                
            </div> : null}
            
        </div>
    )
}

export default FilesTopBar