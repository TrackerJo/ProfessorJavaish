import { useState } from 'react'
import './filesWindow.css'
import FileTile from './Components/fileTile'
import FilesTopBar from './topBar'

function FilesWindow({handleSelectFile, files, addFile, projName, setProjName, exitProj}){

    
    
    return (
        <div className='FilesWindow'>
            <FilesTopBar addFile={addFile} projName={projName} setProjName={setProjName} exitProj={exitProj}/>
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