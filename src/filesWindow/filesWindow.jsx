import { useState, useEffect } from 'react'
import './filesWindow.css'
import FileTile from './Components/fileTile'
import FilesTopBar from './topBar'

function FilesWindow({handleSelectFile, files, addFile, projName, setProjName, exitProj, canCloudSave, cloudSave}){
    useEffect(() => {
        console.log('files changed')
        console.log(files)
    }
    , [files])
    
    
    return (
        <div className='FilesWindow'>
            <FilesTopBar addFile={addFile} projName={projName} setProjName={setProjName} exitProj={exitProj} canCloudSave={canCloudSave} cloudSave={cloudSave}/>
            <div className='Files'>
                {files.map((file, index) => {
                    return (
                    <FileTile fileName={file} key={index} handleSelectFile={handleSelectFile}/>
                    )
                })}
            </div>
            
            
        </div>
    )
}



export default FilesWindow